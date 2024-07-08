import APIFeatures from './../utils/apiFeatures.js'

const optionsUpdate = {
    new: true, 
    upsert: true, 
    runValidators: true
}

const filterObject = (body,filterFields)=>{
    let bodyFilter = new Map()
    Object.entries(body).map(([key,value]) =>{
        if(filterFields.includes(key)){
            bodyFilter.set(key,value)
        }
    })
    return Object.fromEntries(bodyFilter)
}

export const getOneId= (model)=>async (id,popOptions) =>{
    let query = model.findById(id).populate(popOptions)
    //if(popOptions) query = query.populate(popOptions)
    return query
}
export const getOne= (model)=>async (filter,popOptions,selectOptions,popSelect) =>{
    let query = model.findOne(filter)
    if(selectOptions) query = query.select(selectOptions)
    if(popSelect) query = query.populate({path:popOptions,select:popSelect})
    else query = query.populate(popOptions)
    return query
}
export const getAll=(model)=>async (filter,query,popOptions)=>{
    console.log(filter)
    const features = new APIFeatures(model.find(filter), query,popOptions).execute()
    return features
}
export const createOne=(model)=>(body,optionsValidator)=>{

    const objectValue = new model(body)
    //const filterFields= objectValue.getFields()
    //const bodyFilter=filterObject(body,objectValue)
    
    return objectValue.save(optionsValidator)
    
}

export const updateSaveOne=(model)=>async (objectQuery)=>{
    return objectQuery.save({
        runValidators: false
    })
    
}

export const updateOne=(model)=>async (filter,body,selectOptions,optionsValidator)=>{

    let validator = { new: true}

    if (optionsValidator) validator = optionsUpdate

    return model.findOneAndUpdate(filter,body,optionsValidator).select(selectOptions)
}
export const deleteOne=(model)=>async (_id)=>{
    return model.findByIdAndUpdate(_id,{active:false},{ new: true })
}
export const clearOne=(model)=>async (_id)=>{
    return model.findByIdAndDelete(_id,{ new: true })
}
export const activeOne=(model)=>async (_id)=>{
    return model.findByIdAndUpdate(_id,{active:true},{ new: true })
}
export const countDocuments=(model)=>async (filter)=>{
    return model.countDocuments(filter)
}
export const getCountArrayAgregate=(model)=>async(fieldName, fieldValue,name)=>{

    return model.aggregate([
        { $match: { 
            [fieldName]: fieldValue 
        } },
        { $project: 
            { count: 
                { $size: `$${name}` 
            } 
        } }
    ])
}
export const getModelAggregate=(model)=>{
    return model
}
export const getModel=(model)=>{
    return new model()
}

export const getModelConstructor=(model)=>(values)=>{
    return new model(values)
}