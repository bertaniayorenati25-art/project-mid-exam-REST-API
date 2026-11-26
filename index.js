const express = require('express');
const { logger, notFound, errorHandler } = require('./middleware');
const eventsRouter = require('./routes/events');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Selamat datang di Campus Events REST API!',
    student: {
      name: 'Bertania',
      nim: '20250040130',
    },
    theme: 'Informasi Event Kampus (/events)',
  });
});
app.get('/files/*path', (req, res) => {
  res.status(200).json({
    success: true,
    path: req.params.path,
  });
});
app.use('/events', eventsRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});