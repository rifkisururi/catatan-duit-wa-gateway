# FinanceBot - WhatsApp Financial Tracker

Sistem catatan keuangan berbasis WhatsApp Business API dengan AI (Google Gemini) untuk ekstraksi transaksi otomatis.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL via Neon (serverless)
- **ORM**: Prisma v7 + @prisma/adapter-neon
- **AI**: Google Gemini 1.5 Flash
- **Auth**: NextAuth.js v5 (credentials provider)
- **Styling**: Tailwind CSS + shadcn/ui
- **Deployment**: Vercel (free plan)
- **WhatsApp**: Meta Cloud API (WhatsApp Business Official)

## Fitur

- 🤖 **AI Extraction**: Gemini AI mengekstrak data transaksi dari pesan WhatsApp informal
- 📊 **Admin Dashboard**: Panel admin untuk monitoring semua user dan transaksi
- 💬 **Chat History**: Lihat riwayat percakapan per user dengan bubble chat
- 📱 **Manual Reply**: Admin bisa kirim pesan manual ke user
- 🔄 **Auto Polling**: Chat refresh otomatis setiap 5 detik
- 📈 **Transaction Reports**: Filter dan laporan transaksi lengkap

## Setup

### 1. Clone & Install

```bash
git clone <repo>
cd financebot
npm install
```

### 2. Environment Variables

Copy `.env.example` ke `.env.local` dan isi semua nilai:

```bash
cp .env.example .env.local
```

**Model Gemini yang Tersedia:**
- `gemini-1.5-pro` - Model terbaru dan paling akurat (default)
- `gemini-1.5-flash` - Model lebih cepat dan hemat biaya
- `gemini-1.0-pro` - Model stabil dan teruji

Set `GEMINI_MODEL` di `.env` untuk memilih model yang ingin digunakan.

| Variable | Keterangan |
|----------|-----------|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `GEMINI_API_KEY` | Google AI Studio API key |
| `GEMINI_MODEL` | Model Gemini (opsional, default: gemini-1.5-pro) |
| `WA_ACCESS_TOKEN` | WhatsApp Business API access token |
| `WA_PHONE_NUMBER_ID` | WhatsApp phone number ID dari Meta |
| `WA_VERIFY_TOKEN` | Token verifikasi webhook (buat sendiri) |
| `NEXTAUTH_SECRET` | Secret untuk JWT (min 32 chars) |
| `NEXTAUTH_URL` | Opsional - URL aplikasi production (auto-detect untuk dev) |

### 3. Setup Database (Neon)

1. Buat akun di [neon.tech](https://neon.tech)
2. Buat project baru
3. Copy connection string ke `DATABASE_URL`
4. Jalankan SQL dari `prisma/migrations/init.sql` di Neon SQL Editor

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run Development

```bash
npm run dev
```

Admin default akan dibuat otomatis:
- Email: `admin@financebot.com`
- Password: `admin123`

⚠️ **Penting**: Ganti password setelah login pertama untuk keamanan!

Buka [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

### 6. Setup WhatsApp Webhook (Opsional)

1. Buka [Meta Developer Console](https://developers.facebook.com/apps/)
2. Buat/pilih app WhatsApp Business
3. Di Webhooks, tambahkan URL: `https://your-app.vercel.app/api/webhook`
4. Verify token: sama dengan `WA_VERIFY_TOKEN` di `.env.local`
5. Subscribe ke event: `messages`

### 7. Run Development (Opsional - sudah dijalankan di step 5)

```bash
npm run dev
```

## Deployment ke Vercel

1. Push ke GitHub
2. Import project di [vercel.com](https://vercel.com)
3. Tambahkan semua environment variables
   - Untuk production, tambahkan `NEXTAUTH_URL` dengan domain Vercel Anda
   - Contoh: `NEXTAUTH_URL=https://your-app.vercel.app`
4. Deploy!

## Struktur Folder

```
/app
  /api/webhook/route.ts          # WhatsApp webhook (GET + POST)
  /api/send-message/route.ts     # Kirim pesan manual
  /api/chat-logs/route.ts        # Ambil chat logs
  /api/transactions/route.ts     # Ambil transaksi
  /api/users/route.ts            # List users
  /api/auth/[...nextauth]/route.ts  # NextAuth handler
  /api/auth/setup/route.ts       # Setup admin pertama
  /admin/login/page.tsx          # Halaman login
  /admin/dashboard/page.tsx      # Dashboard utama
  /admin/users/[userId]/chat/page.tsx  # Chat per user
  /admin/transactions/page.tsx   # Laporan transaksi
/lib
  /db.ts          # Prisma client singleton (Neon adapter)
  /gemini.ts      # Gemini AI extraction
  /whatsapp.ts    # WhatsApp send message
  /auth.ts        # NextAuth config
/components/admin
  Sidebar.tsx
  ChatWindow.tsx
  ChatBubble.tsx
  TransactionBadge.tsx
  UserList.tsx
/middleware.ts    # Protect /admin/* routes
/prisma
  schema.prisma
  migrations/init.sql
```

## Format Pesan WhatsApp

Bot menerima pesan informal dalam Bahasa Indonesia atau Inggris:

**Pengeluaran:**
- "makan siang 25rb"
- "bayar bensin 50000"
- "beli baju 150k"

**Pemasukan:**
- "gajian 5jt"
- "terima freelance 1.5jt"
- "dapat bonus 500rb"

**Balasan bot:**
```
✅ *Pengeluaran tercatat!*
💰 Rp25.000
🏷️ food
📝 Makan siang
📅 2026-02-28
```

## API Endpoints

| Method | Endpoint | Auth | Keterangan |
|--------|----------|------|-----------|
| GET | `/api/webhook` | - | Verifikasi webhook Meta |
| POST | `/api/webhook` | - | Terima pesan WA |
| POST | `/api/send-message` | ✅ | Kirim pesan manual |
| GET | `/api/chat-logs?userId=` | ✅ | Chat logs per user |
| GET | `/api/transactions` | ✅ | Semua transaksi |
| GET | `/api/users` | ✅ | List semua users |
| POST | `/api/auth/setup` | - | Setup admin (sekali pakai) |
