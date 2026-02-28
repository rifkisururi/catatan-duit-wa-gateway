"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MessageCircle, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function UserLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenData, setTokenData] = useState<{ token: string; waLink: string } | null>(null);
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate login token");
      }

      setTokenData(data);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove non-digit characters
    const cleaned = value.replace(/\D/g, "");
    return cleaned;
  };

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "missing_token":
        return "Token login tidak ditemukan";
      case "invalid_token":
        return "Token login tidak valid atau sudah kadaluarsa";
      case "server_error":
        return "Terjadi kesalahan server. Silakan coba lagi.";
      default:
        return "Terjadi kesalahan. Silakan coba lagi.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Catatan Duit
          </h1>
          <p className="text-gray-600">
            Masuk untuk mengatur webhook callback Anda
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">
                {getErrorMessage(error)}
              </p>
            </div>
          </div>
        )}

        {/* API Error */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">{apiError}</p>
            </div>
          </div>
        )}

        {!tokenData ? (
          /* Login Form */
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Masuk dengan WhatsApp
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nomor WhatsApp
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(formatPhoneNumber(e.target.value))
                  }
                  placeholder="6281234567890"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-base"
                  required
                  disabled={loading}
                />
                <p className="mt-2 text-xs text-gray-500">
                  Masukkan nomor WhatsApp Anda dengan kode negara (contoh:
                  6281234567890)
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || phoneNumber.length < 10}
                className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Kirim Token Login"
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-semibold text-sm">1</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    Masukkan nomor WhatsApp Anda
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 mt-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-semibold text-sm">2</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    Klik link WhatsApp yang muncul
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 mt-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-semibold text-sm">3</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    Kirim pesan &quot;login &#123;token&#125;&quot; ke sistem
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 mt-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-semibold text-sm">4</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    Klik link login yang dikirim via WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Token Generated */
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Token Login Terkirim!
              </h2>
              <p className="text-gray-600">
                Token Anda:{" "}
                <span className="font-mono font-bold text-emerald-600 text-lg">
                  {tokenData.token}
                </span>
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-sm font-medium text-emerald-900 mb-2">
                  Langkah selanjutnya:
                </p>
                <ol className="text-sm text-emerald-800 space-y-2 list-decimal list-inside">
                  <li>Klik tombol WhatsApp di bawah</li>
                  <li>
                    Kirim pesan:{" "}
                    <code className="bg-emerald-100 px-2 py-1 rounded font-mono">
                      login {tokenData.token}
                    </code>
                  </li>
                  <li>Tunggu balasan dengan link login</li>
                  <li>Klik link login untuk masuk</li>
                </ol>
              </div>

              <a
                href={tokenData.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-4 focus:ring-green-500/20 transition-all flex items-center justify-center gap-2 text-base"
              >
                <MessageCircle className="w-5 h-5" />
                Buka WhatsApp
              </a>

              <button
                onClick={() => setTokenData(null)}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 focus:ring-4 focus:ring-gray-500/20 transition-all text-base"
              >
                Kembali
              </button>
            </div>

            <p className="mt-6 text-xs text-center text-gray-500">
              Token ini berlaku selama 5 menit
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
