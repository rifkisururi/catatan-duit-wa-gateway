import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
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

      {/* Privacy Content */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Kebijakan Privasi
            </h1>
            <p className="text-lg text-gray-600">
              Terakhir diperbarui: 28 Februari 2026
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Pendahuluan</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Selamat datang di Kebijakan Privasi NyatetDuit. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, melindungi, dan mengelola informasi pribadi Anda saat menggunakan layanan pencatatan keuangan berbasis WhatsApp kami.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Kami berkomitmen untuk melindungi privasi Anda dan memastikan bahwa informasi pribadi Anda ditangani dengan aman dan sesuai dengan hukum yang berlaku di Indonesia, termasuk Undang-Undang Perlindungan Data Pribadi (UU PDP).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Informasi yang Kami Kumpulkan</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Kami mengumpulkan informasi berikut untuk menyediakan dan meningkatkan layanan kami:
              </p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li><strong>Informasi Akun:</strong> Nama, nomor telepon WhatsApp, dan alamat email (opsional).</li>
                <li><strong>Informasi Transaksi:</strong> Catatan keuangan yang Anda kirim melalui WhatsApp, termasuk jenis transaksi (pemasukan/pengeluaran), jumlah, kategori, catatan, dan tanggal transaksi.</li>
                <li><strong>Informasi Pesan:</strong> Pesan yang Anda kirim dan terima melalui WhatsApp untuk keperluan layanan kami.</li>
                <li><strong>Informasi Teknis:</strong> Alamat IP, jenis perangkat, browser, dan informasi log lainnya untuk keperluan keamanan dan analisis.</li>
                <li><strong>Informasi Pembayaran:</strong> Informasi pembayaran yang diperlukan untuk pemrosesan langganan (jika berlaku).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cara Kami Mengumpulkan Informasi</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Kami mengumpulkan informasi melalui cara-cara berikut:
              </p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li><strong>WhatsApp:</strong> Pesan yang Anda kirim ke nomor WhatsApp kami untuk pencatatan transaksi.</li>
                <li><strong>Formulir Pendaftaran:</strong> Informasi yang Anda berikan saat mendaftar akun.</li>
                <li><strong>Cookies dan Teknologi Serupa:</strong> Untuk meningkatkan pengalaman pengguna dan analisis.</li>
                <li><strong>Integrasi Pihak Ketiga:</strong> Melalui integrasi dengan layanan seperti Google Sheet (jika Anda mengaktifkannya).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cara Kami Menggunakan Informasi Anda</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Kami menggunakan informasi yang dikumpulkan untuk tujuan-tujuan berikut:
              </p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li><strong>Penyediaan Layanan:</strong> Untuk mencatat dan mengelola transaksi keuangan Anda.</li>
                <li><strong>Penyimpanan Data:</strong> Untuk menyimpan data transaksi Anda di sistem kami atau Google Sheet yang Anda hubungkan.</li>
                <li><strong>Komunikasi:</strong> Untuk mengirimkan notifikasi, konfirmasi, dan pesan terkait layanan melalui WhatsApp.</li>
                <li><strong>Peningkatan Layanan:</strong> Untuk menganalisis penggunaan dan meningkatkan kualitas layanan kami.</li>
                <li><strong>Keamanan:</strong> Untuk mendeteksi dan mencegah aktivitas yang mencurigakan atau penyalahgunaan layanan.</li>
                <li><strong>Kepatuhan Hukum:</strong> Untuk mematuhi kewajiban hukum dan regulasi yang berlaku.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Penyimpanan dan Keamanan Data</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Kami mengambil langkah-langkah berikut untuk melindungi informasi Anda:
              </p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li><strong>Enkripsi:</strong> Data disimpan dengan enkripsi standar industri.</li>
                <li><strong>Akses Terbatas:</strong> Hanya personel yang berwenang yang dapat mengakses data Anda.</li>
                <li><strong>Google Sheet:</strong> Jika Anda menghubungkan Google Sheet, data disimpan di akun Google Anda sendiri dengan kontrol penuh.</li>
                <li><strong>Backup:</strong> Data di-backup secara berkala untuk mencegah kehilangan data.</li>
                <li><strong>Pembaruan Keamanan:</strong> Sistem kami diperbarui secara berkala untuk menjaga keamanan.</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Namun, harap diingat bahwa tidak ada metode transmisi atau penyimpanan data yang 100% aman. Kami berusaha untuk menggunakan cara yang dapat diterima secara komersial untuk melindungi data pribadi Anda.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Berbagi Informasi dengan Pihak Ketiga</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Kami tidak menjual, menyewakan, atau memperdagangkan informasi pribadi Anda. Kami hanya membagikan informasi Anda dalam situasi berikut:
              </p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside mb-4">
                <li><strong>Dengan Persetujuan Anda:</strong> Jika Anda memberikan persetujuan eksplisit untuk berbagi informasi tertentu.</li>
                <li><strong>Layanan Pihak Ketiga:</strong> Dengan layanan yang Anda gunakan melalui integrasi, seperti Google Sheet (data disimpan di akun Anda sendiri).</li>
                <li><strong>Penyedia Layanan:</strong> Dengan penyedia layanan yang membantu kami mengoperasikan layanan (misalnya, hosting, analisis, komunikasi), namun hanya sebatas yang diperlukan.</li>
                <li><strong>Kewajiban Hukum:</strong> Jika diwajibkan oleh hukum, perintah pengadilan, atau regulasi yang berlaku.</li>
                <li><strong>Perlindungan Hak:</strong> Untuk melindungi hak, properti, atau keselamatan kami, pengguna, atau publik.</li>
              </ul>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <h4 className="text-sm font-bold text-green-900 mb-2">Penggunaan WhatsApp Business API (Meta)</h4>
                <p className="text-sm text-green-800 mb-3">
                  Layanan kami menggunakan WhatsApp Business API dari Meta Platforms, Inc. Berikut adalah informasi tentang bagaimana data Anda ditangani melalui WhatsApp:
                </p>
                <ul className="text-sm text-green-800 space-y-2 list-disc list-inside">
                  <li><strong>Data WhatsApp:</strong> Nomor telepon WhatsApp Anda digunakan untuk mengirim dan menerima pesan terkait layanan kami.</li>
                  <li><strong>Konten Pesan:</strong> Pesan yang Anda kirim melalui WhatsApp diproses untuk mencatat transaksi keuangan Anda.</li>
                  <li><strong>Enkripsi:</strong> Pesan WhatsApp dienkripsi secara end-to-end oleh Meta. Kami hanya dapat mengakses konten pesan yang Anda kirim ke nomor WhatsApp kami.</li>
                  <li><strong>Kebijakan Meta:</strong> Penggunaan data WhatsApp dilindungi oleh Kebijakan Privasi Meta dan Kebijakan Penggunaan WhatsApp Business API.</li>
                  <li><strong>Penyimpanan:</strong> Kami menyimpan riwayat pesan yang relevan dengan transaksi keuangan untuk keperluan layanan dan dukungan.</li>
                  <li><strong>Penghapusan:</strong> Anda dapat meminta penghapusan data pesan WhatsApp Anda dengan menghubungi kami.</li>
                </ul>
                <p className="text-sm text-green-800 mt-3">
                  Untuk informasi lengkap tentang kebijakan privasi Meta, silakan kunjungi:
                  <a href="https://www.facebook.com/about/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-600">
                    https://www.facebook.com/about/privacy
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Hak Anda atas Data Pribadi</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Sesuai dengan Undang-Undang Perlindungan Data Pribadi, Anda memiliki hak-hak berikut:
              </p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside mb-4">
                <li><strong>Hak Akses:</strong> Meminta salinan data pribadi yang kami miliki tentang Anda.</li>
                <li><strong>Hak Koreksi:</strong> Meminta perbaikan data pribadi yang tidak akurat atau tidak lengkap.</li>
                <li><strong>Hak Penghapusan:</strong> Meminta penghapusan data pribadi Anda (dengan beberapa pengecualian).</li>
                <li><strong>Hak Pembatasan:</strong> Meminta pembatasan pengolahan data pribadi Anda.</li>
                <li><strong>Hak Portabilitas:</strong> Meminta transfer data pribadi Anda dalam format yang dapat dibaca mesin.</li>
                <li><strong>Hak Penolakan:</strong> Menolak pengolahan data pribadi Anda untuk tujuan tertentu.</li>
                <li><strong>Hak Menarik Persetujuan:</strong> Menarik persetujuan yang telah Anda berikan kapan saja.</li>
              </ul>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
                <h4 className="text-sm font-bold text-orange-900 mb-2">Hak Opt-out WhatsApp</h4>
                <p className="text-sm text-orange-800 mb-3">
                  Anda memiliki hak penuh untuk mengontrol komunikasi WhatsApp dari layanan kami:
                </p>
                <ul className="text-sm text-orange-800 space-y-2 list-disc list-inside">
                  <li><strong>Berhenti Menerima Pesan:</strong> Anda dapat berhenti menerima pesan dari kami kapan saja dengan membalas "STOP" atau "BERHENTI" ke nomor WhatsApp kami.</li>
                  <li><strong>Blokir Nomor:</strong> Anda dapat memblokir nomor WhatsApp kami langsung dari aplikasi WhatsApp Anda.</li>
                  <li><strong>Hapus Akun:</strong> Menghapus akun Anda akan menghentikan semua komunikasi WhatsApp dari layanan kami.</li>
                  <li><strong>Hubungi Support:</strong> Anda dapat menghubungi support kami untuk meminta penghapusan data WhatsApp Anda.</li>
                </ul>
                <p className="text-sm text-orange-800 mt-3">
                  Setelah opt-out, kami akan menghentikan pengiriman pesan WhatsApp ke nomor Anda dalam waktu 24 jam.
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed mt-4">
                Untuk menggunakan hak-hak ini, silakan hubungi kami melalui email: support@pedagangpulsa.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Retensi Data</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Kami menyimpan data Anda selama diperlukan untuk tujuan yang dijelaskan dalam kebijakan ini, kecuali jika diwajibkan oleh hukum untuk menyimpannya lebih lama.
              </p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li><strong>Saat Akun Aktif:</strong> Data disimpan selama akun Anda aktif.</li>
                <li><strong>Setelah Penghapusan Akun:</strong> Data akan dihapus dari sistem kami dalam waktu 30 hari, kecuali jika diwajibkan oleh hukum.</li>
                <li><strong>Data Transaksi:</strong> Disimpan sesuai dengan kebutuhan layanan dan preferensi Anda.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies dan Teknologi Pelacakan</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Kami menggunakan cookies dan teknologi serupa untuk:
              </p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Mengingat preferensi dan pengaturan Anda.</li>
                <li>Menganalisis penggunaan layanan untuk meningkatkan kualitas.</li>
                <li>Menyediakan fitur keamanan dan mencegah penyalahgunaan.</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Anda dapat mengelola preferensi cookie melalui pengaturan browser Anda. Namun, menonaktifkan cookie dapat mempengaruhi fungsionalitas layanan.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Perubahan Kebijakan Privasi</h2>
              <p className="text-gray-600 leading-relaxed">
                Kami berhak untuk mengubah kebijakan privasi ini kapan saja dengan memposting versi yang diperbarui di situs web kami. Perubahan signifikan akan diberitahukan melalui WhatsApp atau email. Penggunaan lanjutan layanan setelah perubahan dianggap sebagai penerimaan kebijakan privasi yang diperbarui.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Perlindungan Data Anak</h2>
              <p className="text-gray-600 leading-relaxed">
                Layanan kami tidak ditujukan untuk anak di bawah usia 18 tahun. Kami tidak sengaja mengumpulkan informasi pribadi dari anak di bawah usia 18 tahun. Jika kami mengetahui bahwa kami telah mengumpulkan informasi dari anak di bawah usia 18 tahun tanpa persetujuan orang tua, kami akan mengambil langkah untuk menghapus informasi tersebut segera.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Transfer Data Internasional</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Informasi Anda dapat ditransfer dan disimpan di server yang terletak di luar Indonesia. Kami mengambil langkah-langkah yang wajar untuk memastikan bahwa data Anda tetap dilindungi sesuai dengan kebijakan privasi ini dan hukum yang berlaku.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <h4 className="text-sm font-bold text-yellow-900 mb-2">Transfer Data ke Meta</h4>
                <p className="text-sm text-yellow-800 mb-3">
                  Melalui penggunaan WhatsApp Business API, beberapa data Anda dapat ditransfer ke server Meta Platforms, Inc. yang terletak di berbagai yurisdiksi internasional:
                </p>
                <ul className="text-sm text-yellow-800 space-y-2 list-disc list-inside">
                  <li><strong>Data yang Ditransfer:</strong> Nomor telepon WhatsApp, konten pesan yang Anda kirim, dan metadata terkait.</li>
                  <li><strong>Lokasi Server:</strong> Data dapat disimpan di server Meta yang berlokasi di Amerika Serikat, Eropa, atau wilayah lain.</li>
                  <li><strong>Perlindungan Data:</strong> Meta menerapkan standar keamanan dan privasi yang ketat sesuai dengan GDPR dan regulasi lainnya.</li>
                  <li><strong>Hak Anda:</strong> Hak Anda atas data pribadi tetap berlaku meskipun data ditransfer ke server internasional.</li>
                </ul>
                <p className="text-sm text-yellow-800 mt-3">
                  Untuk informasi lebih lanjut tentang transfer data internasional oleh Meta, silakan baca Kebijakan Privasi Meta.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Kontak Kami</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Jika Anda memiliki pertanyaan, kekhawatiran, atau permintaan terkait kebijakan privasi ini atau perlindungan data pribadi Anda, silakan hubungi kami:
              </p>
              <ul className="text-gray-600 space-y-2">
                <li><strong>Email:</strong> support@pedagangpulsa.com</li>
                <li><strong>WhatsApp:</strong> [Nomor WhatsApp yang tersedia]</li>
                <li><strong>Website:</strong> https://nyatetduit.pedagangpulsa.com</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Kami akan merespons pertanyaan Anda dalam waktu yang wajar, sesuai dengan ketentuan hukum yang berlaku.
              </p>
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
