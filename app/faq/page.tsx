import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FAQPage() {
  const faqs = [
    {
      question: "Apa itu NyatetDuit?",
      answer: "NyatetDuit adalah layanan pencatatan keuangan berbasis WhatsApp yang memungkinkan Anda mencatat transaksi keuangan hanya dengan mengirim pesan WhatsApp. Data akan otomatis tersimpan di Google Sheet Anda."
    },
    {
      question: "Bagaimana cara kerja NyatetDuit?",
      answer: "Cukup daftar akun, login, dan Anda akan mendapatkan nomor WhatsApp khusus. Kirim catatan keuangan Anda dengan format sederhana, dan data akan otomatis tersimpan di Google Sheet yang terhubung."
    },
    {
      question: "Apakah NyatetDuit gratis?",
      answer: "Ya, NyatetDuit menyediakan paket gratis dengan fitur dasar: 1 user dan 100 catatan teks per bulan. Untuk fitur lebih lengkap seperti unlimited catatan teks dan support gambar, Anda bisa upgrade ke paket berbayar."
    },
    {
      question: "Bagaimana cara upgrade paket?",
      answer: "Login ke akun Anda, masuk ke menu Settings, dan pilih paket yang diinginkan. Pembayaran dapat dilakukan melalui berbagai metode yang tersedia."
    },
    {
      question: "Apakah data saya aman?",
      answer: "Ya, data Anda aman. Data tersimpan di Google Sheet yang terenkripsi dan hanya dapat diakses oleh Anda. Kami tidak membagikan data Anda kepada pihak ketiga."
    },
    {
      question: "Apakah saya bisa mengirim gambar struk?",
      answer: "Ya, paket Standar dan Premium mendukung pengiriman gambar struk atau bukti transaksi melalui WhatsApp. Paket Gratis hanya mendukung catatan teks."
    },
    {
      question: "Apakah bisa digunakan dalam grup WhatsApp?",
      answer: "Fitur grup WhatsApp hanya tersedia untuk paket Premium. Ini memungkinkan beberapa anggota grup untuk mencatat keuangan bersama-sama."
    },
    {
      question: "Bagaimana jika saya mencapai batas catatan?",
      answer: "Jika Anda mencapai batas catatan, sistem akan memberitahu Anda. Anda bisa upgrade paket untuk mendapatkan batas yang lebih tinggi atau unlimited catatan."
    },
    {
      question: "Apakah ada batasan waktu penggunaan?",
      answer: "Tidak ada batasan waktu penggunaan. Anda bisa menggunakan layanan kapan saja selama 24 jam sehari, 7 hari seminggu."
    },
    {
      question: "Bagaimana cara menghubungi support?",
      answer: "Anda bisa menghubungi support kami melalui WhatsApp di nomor yang tersedia atau melalui email support@pedagangpulsa.com. Pengguna paket Premium mendapatkan prioritas support."
    },
    {
      question: "Apakah bisa membatalkan langganan?",
      answer: "Ya, Anda bisa membatalkan langganan kapan saja melalui menu Settings. Setelah dibatalkan, paket akan berakhir pada akhir periode berlangganan saat ini."
    },
    {
      question: "Bagaimana cara memformat pesan catatan?",
      answer: "Format pesan sederhana: [tipe] [jumlah] [keterangan]. Contoh: 'pemasukan 50000 gaji bulanan' atau 'pengeluaran 25000 makan siang'. Sistem akan otomatis memproses dan menyimpannya."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-green-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">💰</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-green-700">NyatetDuit</h1>
              <p className="text-xs text-gray-500">by pedagangpulsa.com</p>
            </div>
          </Link>
          <Link href="/user/login">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Masuk
            </Button>
          </Link>
        </div>
      </header>

      {/* FAQ Content */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              FAQ
            </h1>
            <p className="text-lg text-gray-600">
              Pertanyaan yang sering ditanyakan tentang NyatetDuit
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  {faq.question}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Masih memiliki pertanyaan?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/user/login">
                <Button className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
                  Hubungi Support
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 w-full sm:w-auto">
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </div>
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
                <li><Link href="/" className="hover:text-white transition-colors">Harga</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
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
