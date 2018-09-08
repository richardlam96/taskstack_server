exports.errorHandler = function(error, req, res, next) {
  return res.status(error.status || 500).json({
    status: error.status,
    message: error.message || 'Something went wrong in the server.',
  });
}
