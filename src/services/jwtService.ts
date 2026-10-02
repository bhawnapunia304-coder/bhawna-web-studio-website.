import { DecodedJWT, JWTPayload, User, UserRole } from '../types';

const JWT_SECRET = 'luminous-precision-studio-jwt-secret-key-2026';
const TOKEN_STORAGE_KEY = 'luminous_studio_jwt_token';

// Helper to base64url encode strings and Uint8Array
function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlEncodeUint8(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return base64UrlEncode(binary);
}

function base64UrlDecode(str: string): string {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw new Error('Illegal base64url string');
  }
  return atob(output);
}

// Convert secret string to CryptoKey
async function getCryptoKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(JWT_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export const PRESET_USERS: Record<UserRole, User> = {
  admin: {
    id: 'usr_admin_01',
    name: 'Bhawna Punia',
    email: 'bhawnawebstudio@gmail.com',
    role: 'admin',
    title: 'Founder & Principal Engineer',
    company: 'Luminous Precision Studio',
  },
  manager: {
    id: 'usr_mgr_02',
    name: 'Elena Rostova',
    email: 'elena@luminous.studio',
    role: 'manager',
    title: 'Design Director & Sprint Lead',
    company: 'Luminous Precision Studio',
  },
  client: {
    id: 'usr_client_03',
    name: 'Julian Moreau',
    email: 'julian@maison27.dev',
    role: 'client',
    title: 'Restaurateur & Client Partner',
    company: 'Maison 27 Bistro',
  },
};

export const JWTService = {
  /**
   * Signs and returns a real HMAC-SHA256 JWT token
   */
  async generateToken(user: User, durationSeconds = 3600 * 24): Promise<string> {
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    const now = Math.floor(Date.now() / 1000);
    const payload: JWTPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      title: user.title,
      iat: now,
      exp: now + durationSeconds,
      iss: 'luminous.precision.studio',
      permissions:
        user.role === 'admin'
          ? ['all:read', 'all:write', 'leads:manage', 'projects:manage', 'billing:manage']
          : user.role === 'manager'
          ? ['projects:write', 'leads:read', 'analytics:read']
          : ['projects:read', 'analytics:view'],
    };

    const headerEncoded = base64UrlEncode(JSON.stringify(header));
    const payloadEncoded = base64UrlEncode(JSON.stringify(payload));
    const unsignedToken = `${headerEncoded}.${payloadEncoded}`;

    const enc = new TextEncoder();
    const key = await getCryptoKey();
    const signatureBuffer = await crypto.subtle.sign('HMAC', key, enc.encode(unsignedToken));
    const signatureEncoded = base64UrlEncodeUint8(new Uint8Array(signatureBuffer));

    return `${unsignedToken}.${signatureEncoded}`;
  },

  /**
   * Verifies and decodes a JWT token using Web Crypto
   */
  async verifyAndDecode(rawToken: string): Promise<DecodedJWT | null> {
    try {
      const parts = rawToken.split('.');
      if (parts.length !== 3) return null;

      const [headerB64, payloadB64, signatureB64] = parts;
      const headerStr = base64UrlDecode(headerB64);
      const payloadStr = base64UrlDecode(payloadB64);

      const header = JSON.parse(headerStr);
      const payload = JSON.parse(payloadStr) as JWTPayload;

      const enc = new TextEncoder();
      const unsignedToken = `${headerB64}.${payloadB64}`;
      const key = await getCryptoKey();

      // Decode the signature back to Uint8Array
      const rawSigStr = base64UrlDecode(signatureB64);
      const sigBytes = new Uint8Array(rawSigStr.length);
      for (let i = 0; i < rawSigStr.length; i++) {
        sigBytes[i] = rawSigStr.charCodeAt(i);
      }

      const isValidSignature = await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(unsignedToken));
      const now = Math.floor(Date.now() / 1000);
      const isExpired = payload.exp < now;
      const expiresInSeconds = Math.max(0, payload.exp - now);

      return {
        header,
        payload,
        signature: signatureB64,
        rawToken,
        isValid: isValidSignature && !isExpired,
        expiresInSeconds,
      };
    } catch (e) {
      console.error('Failed to decode/verify JWT:', e);
      return null;
    }
  },

  /**
   * Store token in localStorage
   */
  setStoredToken(token: string): void {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  },

  /**
   * Get token from localStorage
   */
  getStoredToken(): string | null {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },

  /**
   * Clear token from localStorage
   */
  clearStoredToken(): void {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  },
};
