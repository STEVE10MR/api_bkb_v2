export default (res,{statusCode,...options})=>{
    res.status(statusCode).json(options)
}