# Campus Events REST API

Proyek Midterm REST API menggunakan Node.js dan Express 5 untuk mengelola data informasi event kampus (disimpan dalam array JavaScript tanpa database).

## Identitas Mahasiswa
- **Nama:** Bertania
- **NIM:** 20250040130
- **Tema:** Informasi Event Kampus (`/events`)

## Cara Menjalankan Proyek

1. Pastikan Node.js sudah terinstal di komputer.
2. Buka terminal di dalam folder proyek `midterm-20250040130-bertania`.
3. Instal seluruh dependensi:
   ```bash
   npm install

```

4. Jalankan server dalam mode development:
```bash
npm run dev

```


5. Server akan berjalan di `http://localhost:3000`.

## Daftar Endpoints

| No | Method | Endpoint | Deskripsi | Auth | Status Sukses |
| --- | --- | --- | --- | --- | --- |
| 1 | `GET` | `/` | Menampilkan pesan selamat datang, nama, NIM, dan tema proyek | Tidak | `200 OK` |
| 2 | `GET` | `/events` | Menampilkan seluruh daftar event kampus | Tidak | `200 OK` |
| 3 | `GET` | `/events/:id` | Menampilkan detail 1 event berdasarkan ID (`404` jika tidak ada) | Tidak | `200 OK` |
| 4 | `GET` | `/events/category{/:name}` | Filter event berdasarkan kategori (menampilkan semua jika kosong) | Tidak | `200 OK` |
| 5 | `GET` | `/events/search?title=...` | Mencari event berdasarkan kata kunci judul (query string) | Tidak | `200 OK` |
| 6 | `POST` | `/events` | Menambahkan event kampus baru dengan ID otomatis (`400` jika input kurang/salah) | Tidak | `201 Created` |
| 7 | `PUT` | `/events/:id` | Memperbarui data event berdasarkan ID (`404` jika ID tidak ada) | Tidak | `200 OK` |
| 8 | `DELETE` | `/events/:id` | Menghapus event berdasarkan ID (`401` jika tanpa token) | **Ya** | `200 OK` |
| 9 | `GET` | `/files/*path` | Menampilkan parameter wildcard path dalam bentuk array | Tidak | `200 OK` |
| 10 | `ALL` | `/*` (Unknown URL) | Menangani rute yang tidak terdaftar dengan error 404 | Tidak | `404 Not Found` |

## Autentikasi (Untuk Endpoint DELETE)

Endpoint `DELETE /events/:id` dilindungi oleh middleware `requireAuth`. Sertakan header berikut saat melakukan request:

* **Key:** `Authorization`
* **Value:** `Bearer rahasia123`

## Contoh Request Body (`POST` & `PUT`)

```json
{
  "title": "Donor Darah Kampus Peduli",
  "category": "sosial",
  "location": "Klinik Kampus",
  "date": "2026-12-28",
  "quota": 80
}

