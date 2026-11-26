const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware');
let events = [
  {
    id: 1,
    title: 'Seminar Nasional AI & Masa Depan',
    category: 'seminar',
    location: 'Auditorium Utama',
    date: '2026-12-05',
    quota: 200,
  },
  {
    id: 2,
    title: 'Workshop UI/UX Design untuk Pemula',
    category: 'workshop',
    location: 'Lab Komputer 3',
    date: '2026-12-10',
    quota: 40,
  },
  {
    id: 3,
    title: 'Lomba Hackathon Antar Fakultas',
    category: 'kompetisi',
    location: 'Gedung Rektorat Lt. 2',
    date: '2026-12-15',
    quota: 100,
  },
  {
    id: 4,
    title: 'Campus Acoustic Night & Bazaar',
    category: 'hiburan',
    location: 'Lapangan Tengah Kampus',
    date: '2026-12-20',
    quota: 350,
  },
  {
    id: 5,
    title: 'Pelatihan Public Speaking Mahasiswa',
    category: 'workshop',
    location: 'Ruang Seminar B',
    date: '2026-12-22',
    quota: 60,
  },
];
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: events.length,
    data: events,
  });
});
router.get('/search', (req, res) => {
  const { title } = req.query;
  if (!title) {
    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  }

  const filtered = events.filter((event) =>
    event.title.toLowerCase().includes(title.toLowerCase())
  );

  res.status(200).json({
    success: true,
    count: filtered.length,
    data: filtered,
  });
});
router.get('/category{/:name}', (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  }

  const filtered = events.filter(
    (event) => event.category.toLowerCase() === name.toLowerCase()
  );

  res.status(200).json({
    success: true,
    count: filtered.length,
    data: filtered,
  });
});
router.post('/', (req, res, next) => {
  const { title, category, location, date, quota } = req.body || {};
  if (!title || !category || !location || !date || quota === undefined) {
    const err = new Error(
      'Semua field wajib diisi: title, category, location, date, dan quota'
    );
    err.status = 400;
    return next(err);
  }

  if (typeof quota !== 'number' || quota <= 0) {
    const err = new Error('Field quota harus berupa angka lebih dari 0');
    err.status = 400;
    return next(err);
  }

  const newId = events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1;

  const newEvent = {
    id: newId,
    title,
    category,
    location,
    date,
    quota,
  };

  events.push(newEvent);

  res.status(201).json({
    success: true,
    message: 'Event kampus berhasil ditambahkan',
    data: newEvent,
  });
});
router
  .route('/:id')
  .get(async (req, res) => {
    const id = parseInt(req.params.id);
    const event = events.find((e) => e.id === id);

    if (!event) {
      const err = new Error(`Event dengan ID ${id} tidak ditemukan`);
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  })
  .put(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const event = events.find((e) => e.id === id);

    if (!event) {
      const err = new Error(`Event dengan ID ${id} tidak ditemukan`);
      err.status = 404;
      throw err;
    }

    const { title, category, location, date, quota } = req.body || {};

    if (!title || !category || !location || !date || quota === undefined) {
      const err = new Error(
        'Semua field wajib diisi untuk update: title, category, location, date, dan quota'
      );
      err.status = 400;
      return next(err);
    }

    event.title = title;
    event.category = category;
    event.location = location;
    event.date = date;
    event.quota = quota;

    res.status(200).json({
      success: true,
      message: 'Event kampus berhasil diperbarui',
      data: event,
    });
  })
  // DELETE /events/:id -> Dilindungi middleware requireAuth
  .delete(requireAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    const index = events.findIndex((e) => e.id === id);

    if (index === -1) {
      const err = new Error(`Event dengan ID ${id} tidak ditemukan`);
      err.status = 404;
      throw err;
    }

    const deletedEvent = events.splice(index, 1)[0];

    res.status(200).json({
      success: true,
      message: 'Event kampus berhasil dihapus',
      data: deletedEvent,
    });
  });

module.exports = router;