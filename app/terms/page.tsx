import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
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

      {/* Terms Content */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Syarat & Ketentuan
            </h1>
            <p className="text-lg text-gray-600">
              Terakhir diperbarui: 28 Februari 2026
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Pendahuluan</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Selamat datang di NyatetDuit, layanan pencatatan keuangan berbasis WhatsApp yang disediakan oleh pedagangpulsa.com. Dengan menggunakan layanan kami, Anda menyetujui syarat dan ketentuan yang tercantum di bawah ini.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Harap baca syarat dan ketentuan ini dengan seksama sebelum menggunakan layanan NyatetDuit. Jika Anda tidak menyetujui syarat dan ketentuan ini, jangan gunakan layanan kami.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Definisi</h2>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li><strong>&quot;Layanan&quot;</strong> merujuk pada layanan pencatatan keuangan berbasis WhatsApp yang disediakan oleh NyatetDuit.</li>
                <li><strong>&quot;Pengguna&quot;</strong> merujuk pada individu atau entitas yang menggunakan Layanan NyatetDuit.</li>
                <li><strong>&quot;Akun&quot;</strong> merujuk pada akun yang dibuat oleh Pengguna untuk mengakses Layanan.</li>
                <li><strong>&quot;Data&quot;</strong> merujuk pada informasi keuangan dan transaksi yang dikirimkan oleh Pengguna melalui Layanan.</li>
                <li><strong>&quot;Google Sheet&quot;</strong> merujuk pada layanan spreadsheet online yang disediakan oleh Google LLC.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Penerimaan Syarat dan Ketentuan</h2>
              <p className="text-gray-600 leading-relaxed">
                Dengan mengakses atau menggunakan Layanan, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak menyetujui syarat dan ketentuan ini, Anda tidak boleh menggunakan Layanan.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Kelayakan Penggunaan</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Untuk menggunakan Layanan, Anda harus:
              </p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Minimal berusia 18 tahun atau telah mencapai usia mayoritas di yurisdiksi Anda.</li>
                <li>Memiliki kapasitas hukum untuk mengikat diri Anda sendiri pada syarat dan ketentuan ini.</li>
                <li>Memiliki akun WhatsApp yang aktif.</li>
                <li>Memiliki akun Google untuk mengakses Google Sheet.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Pendaftaran Akun</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Untuk menggunakan Layanan, Anda harus mendaftar dan membuat akun. Anda setuju untuk:
              </p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Memberikan informasi yang akurat, lengkap, dan terkini saat mendaftar.</li>
                <li>Menjaga kerahasiaan informasi akun Anda dan tidak membagikannya kepada pihak ketiga.</li>
                <li>Memberitahu kami segera jika Anda mengetahui penggunaan akun Anda yang tidak sah.</li>
                <li> Bertanggung jawab atas semua aktivitas yang terjadi di akun Anda.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Paket Layanan dan Biaya</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                NyatetDuit menawarkan beberapa paket layanan dengan fitur dan biaya yang berbeda:
              </p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside mb-4">
                <li><strong>Paket Gratis:</strong> Rp 0 selamanya, 1 user, 100 catatan teks/bulan.</li>
                <li><strong>Paket Standar:</strong> Rp 12K/bulan atau Rp 60K/tahun, 1 user, unlimited catatan teks, 50 catatan gambar/bulan.</li>
                <li><strong>Paket Premium:</strong> Rp 15K/bulan atau Rp 75K/tahun, 1 user, unlimited catatan teks, 300 catatan gambar/bulan, multi user input dalam grup.</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                Biaya langganan akan ditagihkan secara bulanan atau tahunan sesuai paket yang dipilih. Anda dapat mengubah atau membatalkan langganan kapan saja melalui menu Settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Penggunaan Layanan</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Anda setuju untuk menggunakan Layanan hanya untuk tujuan yang sah dan sesuai dengan syarat dan ketentuan ini. Anda tidak boleh:
              </p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside mb-4">
                <li>Menggunakan Layanan untuk tujuan ilegal atau tidak sah.</li>
                <li>Mengirim konten yang melanggar hukum, menyinggung, atau merugikan pihak lain.</li>
                <li>Mencoba mengakses atau mengganggu sistem Layanan secara tidak sah.</li>
                <li>Menggunakan Layanan untuk mengirim spam atau pesan yang tidak diinginkan.</li>
                <li>Menyalin, memodifikasi, atau mendistribusikan Layanan tanpa izin.</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <h4 className="text-sm font-bold text-blue-900 mb-2">Kebijakan Penggunaan WhatsApp Business API (Meta)</h4>
                <p className="text-sm text-blue-800 mb-3">
                  Layanan kami menggunakan WhatsApp Business API dari Meta Platforms, Inc. Dengan menggunakan layanan kami, Anda setuju untuk mematuhi kebijakan penggunaan WhatsApp Business API:
                </p>
                <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside">
                  <li><strong>Pesan yang Diinginkan:</strong> Anda hanya boleh mengirim pesan yang diinginkan oleh penerima. Pesan harus terkait dengan konteks bisnis atau transaksi yang relevan.</li>
                  <li><strong>Konten yang Dilarang:</strong> Dilarang mengirim konten yang melanggar kebijakan Meta, termasuk konten ilegal, berbahaya, atau menyesatkan.</li>
                  <li><strong>Opt-in dan Opt-out:</strong> Pengguna harus memberikan persetujuan eksplisit (opt-in) untuk menerima pesan bisnis. Pengguna dapat memilih untuk berhenti menerima pesan kapan saja (opt-out).</li>
                  <li><strong>Rate Limiting:</strong> Kami menerapkan batas pengiriman pesan untuk mencegah spam dan mematuhi kebijakan Meta.</li>
                  <li><strong>Template Pesan:</strong> Pesan yang dikirim ke pengguna baru harus menggunakan template yang telah disetujui oleh Meta.</li>
                  <li><strong>Privasi Data:</strong> Data pengguna WhatsApp dilindungi oleh kebijakan privasi Meta. Kami tidak menyimpan atau membagikan data pengguna WhatsApp selain yang diperlukan untuk layanan kami.</li>
                  <li><strong>Pelanggaran Kebijakan:</strong> Pelanggaran kebijakan Meta dapat mengakibatkan pembatasan atau penghentian akses WhatsApp Business API untuk akun Anda.</li>
                </ul>
                <p className="text-sm text-blue-800 mt-3">
                  Untuk informasi lengkap tentang kebijakan WhatsApp Business API, silakan kunjungi:
                  <a href="https://developers.facebook.com/docs/whatsapp/policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">
                    https://developers.facebook.com/docs/whatsapp/policy
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Privasi dan Keamanan Data</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Privasi dan keamanan data Anda adalah prioritas kami. Kami berkomitmen untuk:
              </p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Menyimpan data Anda di Google Sheet yang terenkripsi dan aman.</li>
                <li>Tidak membagikan data Anda kepada pihak ketiga tanpa izin Anda.</li>
                <li>Menggunakan data Anda hanya untuk tujuan penyediaan Layanan.</li>
                <li>Mengambil langkah-langkah keamanan yang wajar untuk melindungi data Anda.</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Untuk informasi lebih lanjut tentang bagaimana kami mengelola data Anda, silakan baca Kebijakan Privasi kami.
              </p>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4">
                <h4 className="text-sm font-bold text-purple-900 mb-2">Kepatuhan Kebijakan Meta</h4>
                <p className="text-sm text-purple-800 mb-3">
                  Layanan kami mematuhi semua kebijakan dan regulasi yang berlaku dari Meta Platforms, Inc. terkait penggunaan WhatsApp Business API:
                </p>
                <ul className="text-sm text-purple-800 space-y-2 list-disc list-inside">
                  <li><strong>WhatsApp Business Terms of Service:</strong> Kami mematuhi Syarat dan Ketentuan WhatsApp Business yang dapat diakses di developers.facebook.com.</li>
                  <li><strong>Commerce Policy:</strong> Layanan kami mematuhi Kebijakan Perdagangan Meta untuk transaksi yang diproses melalui WhatsApp.</li>
                  <li><strong>WhatsApp Business Policy:</strong> Kami mengikuti kebijakan penggunaan WhatsApp Business untuk memastikan pengalaman pengguna yang positif.</li>
                  <li><strong>Branding Policy:</strong> Penggunaan logo dan merek dagang WhatsApp dilakukan sesuai dengan panduan branding Meta.</li>
                  <li><strong>Data Use Policy:</strong> Penggunaan data pengguna dilakukan sesuai dengan Kebijakan Penggunaan Data Meta.</li>
                </ul>
                <p className="text-sm text-purple-800 mt-3">
                  Dengan menggunakan layanan kami, Anda juga menyetujui untuk mematuhi kebijakan Meta yang berlaku.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Pembatasan Tanggung Jawab</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Dalam batas maksimum yang diizinkan oleh hukum yang berlaku, NyatetDuit dan pedagangpulsa.com tidak bertanggung jawab atas:
              </p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Kehilangan data atau kerusakan yang disebabkan oleh kesalahan teknis atau gangguan layanan.</li>
                <li>Kehilangan atau kerusakan yang disebabkan oleh kelalaian atau kesalahan Pengguna.</li>
                <li>Kehilangan atau kerusakan yang disebabkan oleh pihak ketiga, termasuk WhatsApp dan Google.</li>
                <li>Kerugian tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan Layanan.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Pengakhiran Layanan</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Kami berhak untuk mengakhiri atau menangguhkan akses Anda ke Layanan kapan saja, dengan atau tanpa alasan, dengan atau tanpa pemberitahuan sebelumnya.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Anda juga dapat mengakhiri penggunaan Layanan kapan saja dengan:
              </p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Membatalkan langganan Anda melalui menu Settings.</li>
                <li>Menghapus akun Anda melalui menu Settings.</li>
                <li>Menghubungi support kami untuk meminta penghapusan akun.</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                Setelah pengakhiran, data Anda akan dihapus dari sistem kami dalam waktu 30 hari, kecuali jika diwajibkan oleh hukum untuk menyimpannya lebih lama.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Perubahan Syarat dan Ketentuan</h2>
              <p className="text-gray-600 leading-relaxed">
                Kami berhak untuk mengubah syarat dan ketentuan ini kapan saja dengan memposting versi yang diperbarui di situs web kami. Perubahan akan berlaku segera setelah diposting. Penggunaan Lanjutan Layanan setelah perubahan dianggap sebagai penerimaan syarat dan ketentuan yang diperbarui.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Hukum yang Berlaku</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. Setiap sengketa yang timbul dari atau berkaitan dengan syarat dan ketentuan ini akan tunduk pada yurisdiksi eksklusif pengadilan di Indonesia.
              </p>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                <h4 className="text-sm font-bold text-red-900 mb-2">Kepatuhan Hukum dan Regulasi</h4>
                <p className="text-sm text-red-800 mb-3">
                  Layanan kami mematuhi semua hukum dan regulasi yang berlaku di Indonesia dan internasional:
                </p>
                <ul className="text-sm text-red-800 space-y-2 list-disc list-inside">
                  <li><strong>UU Perlindungan Data Pribadi (UU PDP):</strong> Kami mematuhi Undang-Undang No. 27 Tahun 2022 tentang Perlindungan Data Pribadi.</li>
                  <li><strong>UU ITE:</strong> Layanan kami mematuhi Undang-Undang No. 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik.</li>
                  <li><strong>GDPR:</strong> Untuk pengguna di Uni Eropa, kami mematuhi General Data Protection Regulation.</li>
                  <li><strong>Meta Terms:</strong> Kami mematuhi semua syarat dan ketentuan Meta Platforms, Inc. terkait penggunaan WhatsApp Business API.</li>
                  <li><strong>Regulasi Kominfo:</strong> Layanan kami mematuhi regulasi dari Kementerian Komunikasi dan Informatika Republik Indonesia.</li>
                </ul>
                <p className="text-sm text-red-800 mt-3">
                  Kami akan memperbarui kebijakan kami secara berkala untuk memastikan kepatuhan terhadap perubahan hukum dan regulasi.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Kontak Kami</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Jika Anda memiliki pertanyaan atau kekhawatiran tentang syarat dan ketentuan ini, silakan hubungi kami:
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>Email: support@pedagangpulsa.com</li>
                <li>WhatsApp: [Nomor WhatsApp yang tersedia]</li>
                <li>Website: https://nyatetduit.pedagangpulsa.com</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 text-center">
            <Link href="/user/login">
              <Button className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
                Mulai Sekarang
              </Button>
            </Link>
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
