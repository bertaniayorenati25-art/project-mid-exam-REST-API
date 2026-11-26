const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
const requireAuth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token || token !== 'Bearer rahasia123') {
    const err = new Error('Unauthorized: Token tidak valid atau tidak ditemukan');
    err.status = 401;
    return next(err);
  }

  next();
};
const notFound = (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} tidak ditemukan`);
  err.status = 404;
  next(err);
};
const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || 'Terjadi kesalahan pada server',
  });
};

module.exports = {
  logger,
  requireAuth,
  notFound,
  errorHandler,
};