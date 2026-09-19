const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    return res.status(statusCode).json({
        status: false,
        message: statusCode === 500 ? 'Internal Server Error' : err.message
    })
}

module.exports = errorMiddleware