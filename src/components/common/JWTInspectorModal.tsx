import React, { useState, useEffect } from 'react';
import { Shield, Key, RefreshCw, Copy, Check, X, Clock, UserCheck, AlertCircle } from 'lucide-react';
import { DecodedJWT, UserRole } from '../../types';
import { JWTService, PRESET_USERS } from '../../services/jwtService';

interface JWTInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentToken: string | null;
  onTokenUpdate: (newToken: string) => void;
}

export const JWTInspectorModal: React.FC<JWTInspectorModalProps> = ({
  isOpen,
  onClose,
  currentToken,
  onTokenUpdate,
}) => {
  const [decoded, setDecoded] = useState<DecodedJWT | null>(null);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [customDuration, setCustomDuration] = useState<number>(3600); // 1 hour

  useEffect(() => {
    if (currentToken) {
      JWTService.verifyAndDecode(currentToken).then(setDecoded);
    }
  }, [currentToken]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (currentToken) {
      navigator.clipboard.writeText(currentToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSwitchUser = async (role: UserRole) => {
    setGenerating(true);
    const user = PRESET_USERS[role];
    const token = await JWTService.generateToken(user, customDuration);
    JWTService.setStoredToken(token);
    onTokenUpdate(token);
    const newDecoded = await JWTService.verifyAndDecode(token);
    setDecoded(newDecoded);
    setGenerating(false);
  };

  const handleRefreshToken = async () => {
    if (!decoded) return;
    setGenerating(true);
    const user = PRESET_USERS[decoded.payload.role];
    const token = await JWTService.generateToken(user, customDuration);
    JWTService.setStoredToken(token);
    onTokenUpdate(token);
    const newDecoded = await JWTService.verifyAndDecode(token);
    setDecoded(newDecoded);
    setGenerating(false);
  };

  const formatExpiry = (seconds: number) => {
    if (seconds <= 0) return 'Expired';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
    return `${mins}m ${secs}s`;
  };

  // Split raw token into colored parts
  const tokenParts = currentToken ? currentToken.split('.') : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  JWT Security & Claims Inspector
                </h2>
                {decoded?.isValid ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[11px] font-medium">
                    <Check className="w-3 h-3" />
                    Cryptographically Valid
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 text-[11px] font-medium">
                    <AlertCircle className="w-3 h-3" />
                    Invalid / Expired
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Web Crypto API HMAC-SHA256 authenticated user claims
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Quick Role Switcher Buttons */}
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                Switch Authenticated Persona & Role
              </span>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <Clock className="w-3.5 h-3.5" />
                <span>Expires in: {decoded ? formatExpiry(decoded.expiresInSeconds) : 'N/A'}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {(['admin', 'manager', 'client'] as UserRole[]).map((r) => {
                const isSelected = decoded?.payload.role === r;
                const user = PRESET_USERS[r];
                return (
                  <button
                    key={r}
                    onClick={() => handleSwitchUser(r)}
                    disabled={generating}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-700 text-purple-900 dark:text-purple-200 shadow-xs'
                        : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-750'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold capitalize text-xs">{r}</span>
                      {isSelected && <UserCheck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />}
                    </div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate mt-0.5">{user.name}</div>
                    <div className="text-[10px] text-stone-400 dark:text-stone-500 truncate">{user.title}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Encoded JWT String Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                Raw Encoded JWT Token (Compact Serialization)
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Token'}</span>
              </button>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-900 text-stone-100 font-mono text-[11px] break-all border border-stone-800 leading-relaxed max-h-28 overflow-y-auto">
              {tokenParts.length === 3 ? (
                <>
                  <span className="text-rose-400">{tokenParts[0]}</span>
                  <span className="text-stone-500">.</span>
                  <span className="text-purple-400">{tokenParts[1]}</span>
                  <span className="text-stone-500">.</span>
                  <span className="text-sky-400">{tokenParts[2]}</span>
                </>
              ) : (
                currentToken || 'No active token'
              )}
            </div>
            <div className="flex items-center gap-4 text-[10px] text-stone-500 dark:text-stone-400 pt-0.5">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-400 inline-block"></span> Header (Algorithm)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-400 inline-block"></span> Payload (Claims &amp; Roles)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-400 inline-block"></span> Signature (HMAC-SHA256)
              </span>
            </div>
          </div>

          {/* Decoded Views (Header & Payload) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Header Block */}
            <div className="p-4 rounded-xl bg-stone-50/70 dark:bg-stone-850/60 border border-stone-200 dark:border-stone-800 space-y-2">
              <div className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                Decoded Header
              </div>
              <pre className="font-mono text-xs text-stone-800 dark:text-stone-200 p-2.5 rounded bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-x-auto">
                {JSON.stringify(decoded?.header, null, 2)}
              </pre>
            </div>

            {/* Payload Claims Block */}
            <div className="p-4 rounded-xl bg-stone-50/70 dark:bg-stone-850/60 border border-stone-200 dark:border-stone-800 space-y-2">
              <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                Decoded Payload Claims
              </div>
              <pre className="font-mono text-xs text-stone-800 dark:text-stone-200 p-2.5 rounded bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-x-auto max-h-48">
                {JSON.stringify(decoded?.payload, null, 2)}
              </pre>
            </div>
          </div>

          {/* Granular Permissions Matrix */}
          {decoded?.payload.permissions && (
            <div className="p-4 rounded-xl bg-stone-50/70 dark:bg-stone-850/60 border border-stone-200 dark:border-stone-800 space-y-2">
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 block">
                Granted Scope &amp; Permissions in Token
              </span>
              <div className="flex flex-wrap gap-1.5">
                {decoded.payload.permissions.map((p) => (
                  <span
                    key={p}
                    className="font-mono text-[11px] px-2.5 py-1 rounded bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 flex items-center justify-between">
          <button
            onClick={handleRefreshToken}
            disabled={generating}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-medium hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${generating ? 'animate-spin' : ''}`} />
            <span>Regenerate &amp; Sign Fresh Token</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-purple-600 text-white font-medium text-xs hover:bg-purple-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
