function errorboundary(err,req,res,next){
    const status = err.statusCode || 400
    return res.status(status).json({
        message : err.message ||  "internal server error",
        errors : err.errors || []
    })
}

module.exports = {
    errorboundary
}