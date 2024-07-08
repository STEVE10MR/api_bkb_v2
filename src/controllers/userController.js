import * as userService from '../services/userService.js';
import * as authService from '../services/authService.js';
import catchAsync from '../utils/catchAsync.js';
import appError from '../utils/appError.js';
import sendEmail from '../utils/sendEmail.js';
import resSend from '../utils/resSend.js';
import translatorNext from '../utils/translatorNext.js';
import requireField from '../utils/requireField.js';
import resetUrl from '../utils/resetUrl.js';



export const obtenerInformacion = catchAsync(async(req,res,next)=>{
  req.params.id=req.user._id
  next()
})


export const registrarUsuario= catchAsync(async (req,res,next)=>{

  const {email ,firtName,lastName} = req.body

 
  if(requireField(email,firtName,lastName)){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }
  console.log("DDD")
  const userObject = await userService.crearUserService(email ,firtName,lastName);
 
  if(requireField(userObject.user,userObject.token,userObject.password)){
    return next(new appError(translatorNext(req,userObject.messageError),400))
  }

  const user = userObject.user
  const token = userObject.token
  const password = userObject.password

  const message = "ignore"
  try {
    await sendEmail({
      email: user.email,
      subject: translatorNext(req,'RESET_TOKEN_EMAIL_SUBJECT'),
      message,
      url:resetUrl(req,`auth/verification/${token}`),
      req,
      passwordTemp:password,
      typeTemplate:2
    });

    let tokenVerify = userObject.token

    if(process.env.NODE_ENV !== 'development') tokenVerify = undefined

    return res.status(200).json({
      status: 'success',
      message: translatorNext(req,'TOKEN_SENT_SUCCESS'),
      tokenVerify
    });
  }catch (err) {
    
    console.log(err)
    await authService.sendResetPasswordErrorService(user)

    return next(
      new appError(translatorNext(req,'EMAIL_SEND_ERROR')),
      500
    );
  }
})

export const obtenerUsuario = catchAsync(async(req,res,next)=>{
  let _id = req.params.id

  const data=await userService.obtenerUserService(_id)

  resSend(res,{statusCode:201,status:"success",data})
})


export const listarUsuarios = catchAsync(async (req,res,next)=>{

  let filter = {...req.body}

  const data=await userService.listarUserService(filter,req.query)

  resSend(res,{statusCode:201,status:"success",data})
  
})

export const activarUsuario = catchAsync(async(req,res,next)=>{

  let _id = req.params.id

  if(!_id){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }

  const data=await userService.activarUserService(_id)

  resSend(res,{statusCode:201,status:"success",data})
})

export const desactivarUsuario = catchAsync(async(req,res,next)=>{
  let _id = req.params.id
  if(!_id){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }
  const data=await userService.desactivarUserService(_id)

  resSend(res,{statusCode:201,status:"success",data})
})


export const editarPasswordUsuario = catchAsync(async (req, res, next) => {

  let _id = req.params.id

  const { passwordCurrent,passwordNew,passwordNewConfirm } = req.body;

  if (requireField(_id,passwordCurrent,passwordNew,passwordNewConfirm)) {
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'), 400));
  }
  const data = await userService.editarPasswordUserService(_id,passwordCurrent,passwordNew,passwordNewConfirm)

  if(typeof data === 'string'){
    return next(new appError(req.t(data),400))
  }
  resSend(res,{statusCode:201,status:"success",data})
});

export const editarNameUsuario = catchAsync(async(req,res,next)=>{
  let _id = req.params.id
  const {firtName , lastName} = req.body

  console.log(firtName , lastName)
  if(requireField(_id,firtName,lastName)){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }
  
  const data=await userService.editarNameUserService(_id,firtName,lastName)

  resSend(res,{statusCode:201,status:"success",data})
})


export const editarUsuario = catchAsync(async(req,res,next)=>{
  let _id = req.params.id
  const {firtName , lastName} = req.body
  console.log(req.body)
  if(requireField(_id,firtName,lastName)){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }
  const data=await userService.editarUserService(_id,firtName,lastName)

  resSend(res,{statusCode:201,status:"success",data})
})


export const listarEquipoProyecto  = catchAsync(async (req,res,next)=>{

  const {_id:user_id} = req.user
  if(requireField(user_id)){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }
  const data=await userService.listarEquipoProyectoUserService(user_id)
  resSend(res,{statusCode:201,status:"success",data})
    
})

export const listarProyectoPorRolEquipo  = catchAsync(async (req,res,next)=>{

  const {_id:user_id} = req.user
  const {rolEquipo_id}= req.params
  console.log(user_id,rolEquipo_id)
  if(requireField(user_id,rolEquipo_id)){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }
  const data=await userService.listarProyectoPorRolEquipoUserService(user_id,rolEquipo_id)
  resSend(res,{statusCode:201,status:"success",data})
    
})


export const listarMiembroCambio  = catchAsync(async (req,res,next)=>{

  const {_id:user_id} = req.user
  if(requireField(user_id)){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }
  const data=await userService.listarMiembroCambioUserService(user_id)
  resSend(res,{statusCode:201,status:"success",data})
    
})


export const editarRoleUser = catchAsync(async(req,res,next)=>{
  let _id = req.params.id
  const {role} = req.body

  if(requireField(_id,role)){

    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }
  
  const data=await userService.editarRoleUserService(_id,role)

  if(typeof data === 'string'){
    return next(new appError(req.t(data),400))
  }

  resSend(res,{statusCode:201,status:"success",data})
})


export const registrarAdmin = catchAsync(async (req,res,next)=>{

  const {firtName,lastName,password} = req.body

  if(requireField(firtName,lastName,password)){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }

  const data = userService.createUserAdmin(firtName,lastName,password)

  resSend(res,{statusCode:201,status:"success",data})
})