"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Settings, LogOut, Loader2, Save, CheckCircle, AlertCircle, MessageCircle, TestTube2 } from "lucide-react";

interface User {
  id: string;
  phoneNumber: string;
  name: string;
  email: string | null;
  callbackUrl: string | null;
}

export default function UserSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testingWebhook, setTestingWebhook] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [callbackUrl, setCallbackUrl] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      const response = await fetch("/api/user/settings");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setCallbackUrl(data.user.callbackUrl || "");
      } else if (response.status === 401) {
        console.log("🔐 [SETTINGS] Unauthorized, redirecting to login");
        router.push("/user/login");
      } else {
        console.error("❌ [SETTINGS] Failed to fetch settings:", response.status);
        router.push("/user/login");
      }
    } catch (error) {
      console.error("❌ [SETTINGS] Error fetching settings:", error);
      router.push("/user/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ callbackUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update settings");
      }

      setUser(data.user);
      setMessage({ type: "success", text: "Pengaturan berhasil disimpan!" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Terjadi kesalahan",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    // Clear session cookie
    document.cookie = "next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/user/login");
  };

  const handleTestWebhook = async () => {
    setTestingWebhook(true);
    setMessage(null);

    try {
      const response = await fetch("/api/user/test-webhook", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to test webhook");
      }

      if (data.success) {
        setMessage({
          type: "success",
          text: `✅ Test webhook berhasil! Payload terkirim ke ${callbackUrl}. Response: ${JSON.stringify(data.response)}`,
        });
      } else {
        setMessage({
          type: "error",
          text: data.error || "Test webhook gagal",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Terjadi kesalahan saat test webhook",
      });
    } finally {
      setTestingWebhook(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat pengaturan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Catatan Duit</h1>
              <p className="text-xs text-gray-500">Pengaturan Webhook</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">Keluar</span>
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-emerald-600">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-sm text-gray-600">{user?.phoneNumber}</p>
              {user?.email && (
                <p className="text-xs text-gray-500">{user.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* Settings Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Pengaturan Webhook
              </h3>
              <p className="text-sm text-gray-600">
                Atur URL callback untuk menerima notifikasi transaksi
              </p>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                message.type === "success"
                  ? "bg-emerald-50 border border-emerald-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <p
                className={`text-sm font-medium ${
                  message.type === "success"
                    ? "text-emerald-900"
                    : "text-red-900"
                }`}
              >
                {message.text}
              </p>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label
                htmlFor="callbackUrl"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Callback URL
              </label>
              <input
                id="callbackUrl"
                type="url"
                value={callbackUrl}
                onChange={(e) => setCallbackUrl(e.target.value)}
                placeholder="https://your-server.com/webhook"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-base"
              />
              <p className="mt-2 text-xs text-gray-500">
                URL ini akan menerima notifikasi setiap kali ada transaksi baru.
                Pastikan server Anda dapat menerima POST request.
              </p>

              {/* Test Webhook Button */}
              {callbackUrl && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleTestWebhook}
                    disabled={testingWebhook}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    {testingWebhook ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Mengirim test webhook...
                      </>
                    ) : (
                      <>
                        <TestTube2 className="w-4 h-4" />
                        Test Webhook
                      </>
                    )}
                  </button>
                  <p className="mt-2 text-xs text-gray-500">
                    Klik tombol ini untuk mengirim payload test ke URL callback Anda.
                  </p>
                </div>
              )}
            </div>

            {/* Example Webhook Payload */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-900 mb-2">
                Contoh Payload Webhook:
              </p>
              <pre className="text-xs text-gray-700 overflow-x-auto">
                {`{
  "transactionId": "uuid",
  "type": "income|expense",
  "amount": 100000,
  "category": "Makanan",
  "note": "Nasi padang",
  "transactionDate": "2024-02-28",
  "userId": "uuid",
  "phoneNumber": "6281234567890"
}`}
              </pre>
            </div>

            {/* Instructions */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900">
                Persyaratan URL Callback:
              </h4>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                <li>Harus menggunakan protokol HTTPS (untuk production)</li>
                <li>Harus menerima POST request dengan JSON body</li>
                <li>Harus merespon dengan status 200 OK</li>
                <li>URL akan dipanggil setiap kali ada transaksi baru</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-base"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Simpan Pengaturan
                </>
              )}
            </button>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Butuh Bantuan?
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Jika Anda mengalami masalah dengan webhook, pastikan:
          </p>
          <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
            <li>URL callback dapat diakses dari internet</li>
            <li>Firewall tidak memblokir request dari server kami</li>
            <li>Server Anda merespon dengan status 200 OK</li>
            <li>Request timeout diset cukup lama (minimal 30 detik)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
