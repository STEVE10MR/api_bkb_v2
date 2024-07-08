export default (req,code,placeholders,lngOptional)=>{
    req.i18n.changeLanguage(lngOptional || 'es')
    return req.t(code,placeholders)
}