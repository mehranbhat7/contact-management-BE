const errorHandler = (err, req, res, next) => {
  const errStatus = res.errStatus ? res.errStatus : 500;
  res.json({ message: err.message, stackTrace: err.stackTrace });
};

module.exports = errorHandler;
