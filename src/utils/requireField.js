export default(...fields)=>{
    return fields.some(field => !field)
}