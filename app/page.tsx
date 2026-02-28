import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-green-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">💰</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-green-700">NyatetDuit</h1>
              <p className="text-xs text-gray-500">by pedagangpulsa.com</p>
            </div>
          </div>
          <Link href="/user/login">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Masuk
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="text-xl">📱</span>
            <span>Catat keuangan lewat WhatsApp</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Catat Keuangan dengan <span className="text-green-600">WhatsApp</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            Simpan catatan keuangan Anda langsung ke Google Sheet hanya dengan mengirim pesan WhatsApp. Praktis, cepat, dan otomatis!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/user/login">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto px-8 py-6 text-lg">
                Mulai Gratis Sekarang
              </Button>
            </Link>
            <Link href="/faq">
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 w-full sm:w-auto px-8 py-6 text-lg">
                Pelajari Lebih Lanjut
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Tidak perlu instalasi</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Otomatis ke Google Sheet</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Support gambar</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cara Kerja */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Cara Kerja
          </h3>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Tiga langkah mudah untuk mulai mencatat keuangan Anda
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">1️⃣</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Daftar & Login</h4>
              <p className="text-gray-600">
                Buat akun gratis dan login untuk mendapatkan nomor WhatsApp khusus
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">2️⃣</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Kirim Pesan WA</h4>
              <p className="text-gray-600">
                Kirim catatan keuangan Anda melalui WhatsApp dengan format sederhana
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">3️⃣</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Otomatis Tersimpan</h4>
              <p className="text-gray-600">
                Data otomatis tersimpan di Google Sheet dan bisa dilihat kapan saja
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fitur Utama */}
      <section id="features" className="bg-green-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Fitur Utama
          </h3>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Semua yang Anda butuhkan untuk mencatat keuangan dengan mudah
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">📱</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">WhatsApp Integration</h4>
              <p className="text-gray-600 text-sm">
                Catat keuangan langsung dari WhatsApp tanpa perlu buka aplikasi lain
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">📊</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Google Sheet Sync</h4>
              <p className="text-gray-600 text-sm">
                Data otomatis tersinkronisasi ke Google Sheet untuk analisis lebih lanjut
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">🖼️</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Support Gambar</h4>
              <p className="text-gray-600 text-sm">
                Kirim foto struk atau bukti transaksi langsung melalui WhatsApp
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">👥</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Multi User (Premium)</h4>
              <p className="text-gray-600 text-sm">
                Gunakan dalam grup WhatsApp untuk catatan keuangan bersama tim
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">⚡</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Cepat & Praktis</h4>
              <p className="text-gray-600 text-sm">
                Format pesan sederhana, diproses secara otomatis dalam hitungan detik
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">🔒</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Aman & Terpercaya</h4>
              <p className="text-gray-600 text-sm">
                Data Anda aman dan tersimpan di cloud Google Sheet yang terenkripsi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Pilih Paket yang Sesuai
          </h3>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Mulai gratis atau upgrade untuk fitur lebih lengkap
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="border-2 border-gray-200 rounded-2xl p-6 hover:border-green-300 transition-colors">
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Gratis</h4>
                <div className="text-4xl font-bold text-green-600 mb-2">Rp 0</div>
                <p className="text-gray-500 text-sm">Selamanya</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">1 User</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">100 catatan teks/bulan</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Sinkronisasi Google Sheet</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Support dasar</span>
                </li>
              </ul>
              
              <Link href="/user/login" className="block">
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  Mulai Gratis
                </Button>
              </Link>
            </div>
            
            {/* Standard Plan */}
            <div className="border-2 border-green-500 rounded-2xl p-6 relative bg-green-50/50">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                ⭐ Paling Populer / Best Value
              </div>
              
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Standar</h4>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  Rp 12K
                  <span className="text-lg font-normal text-gray-500">/bulan</span>
                </div>
                <p className="text-gray-500 text-sm">atau Rp 60K/tahun (hemat 17%)</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">1 User</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Unlimited catatan teks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">50 catatan gambar/bulan</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Sinkronisasi Google Sheet</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Support prioritas</span>
                </li>
              </ul>
              
              <Link href="/user/login" className="block">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Pilih Standar
                </Button>
              </Link>
            </div>
            
            {/* Premium Plan */}
            <div className="border-2 border-purple-500 rounded-2xl p-6 relative bg-purple-50/50">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Terbaik
              </div>
              
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Premium</h4>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  Rp 15K
                  <span className="text-lg font-normal text-gray-500">/bulan</span>
                </div>
                <p className="text-gray-500 text-sm">atau Rp 75K/tahun (hemat 17%)</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span className="text-gray-700">1 User</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span className="text-gray-700">Unlimited catatan teks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span className="text-gray-700">300 catatan gambar/bulan</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span className="text-gray-700">Multi user input dalam grup</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span className="text-gray-700">Dapat digunakan di grup WA</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span className="text-gray-700">Support prioritas</span>
                </li>
              </ul>
              
              <Link href="/user/login" className="block">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Pilih Premium
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Mulai Mencatat Keuangan?
          </h3>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pengguna yang telah mempermudah pencatatan keuangan mereka dengan NyatetDuit
          </p>
          <Link href="/user/login">
            <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-6 text-lg">
              Daftar Sekarang - Gratis!
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">💰</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">NyatetDuit</h4>
                  <p className="text-xs text-gray-500">by pedagangpulsa.com</p>
                </div>
              </div>
              <p className="text-sm">
                Catat keuangan dengan mudah melalui WhatsApp dan simpan otomatis di Google Sheet.
              </p>
            </div>
            
            <div>
              <h5 className="text-white font-bold mb-4">Produk</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/user/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><Link href="/#pricing" className="hover:text-white transition-colors">Harga</Link></li>
                <li><Link href="/#features" className="hover:text-white transition-colors">Fitur</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-bold mb-4">Bantuan</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Kontak</a></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 NyatetDuit by pedagangpulsa.com. All rights reserved.</p>
            <p className="mt-2 text-gray-500">
              Kami menggunakan API WA official dari Meta
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
