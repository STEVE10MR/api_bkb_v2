const translatorNextIO = require('./translatorNextIO')
const { List } = require('whatsapp-web.js');

module.exports = (fn)=> {
    return async (client,message,options) => {
        try {
            const result = await fn(client,message,options);
            console.log(result)
            if(typeof result.res === 'string') client.sendMessage(options.from, translatorNextIO(result.res,undefined,result.lng));
            else{
                (result.res).forEach(async(response) => {
                    switch (response.type) {
                        case 'string':
                          await client.sendMessage(options.from, translatorNextIO(response.code, {placeholder:response.placeholder}, result.lng));
                          break;
                        case 'list':

                            switch(response.style ){
                                case 'menu':
                                    (response.listResponse).forEach(async(element,index) => {
                                        await client.sendMessage(options.from,`🍽️${index}.-${element.title}🍽️\n\n👉 Click : ${element.link}`);
                                    });
                                    break
                                case 'address':


                                    
                                    /*
                                    (response.listResponse).forEach(async(element,index) => {
                                        console.log(element)
                                        await client.sendMessage(options.from,`${index}.-${element.typepayment.method[`${result.lng}`]}`);
                                    });
                                    */
                                    break
                                case 'product':
                                    (response.listResponse).forEach(async(element,index) => {
                                        await client.sendMessage(options.from,translatorNextIO(response.code, {name:element.name,price:element.price,quantity:element.quantity,total:element.total}, result.lng));
                                        if(element.quantity >= 5) await client.sendMessage(options.from,translatorNextIO('PRODUCT_WARNING_MAX', result.lng));
                                    });
                                    break
                                case 'payment':
                                    (response.listResponse).forEach(async(element,index) => {
                                        await client.sendMessage(options.from,`${index+1}.-${element.typepayment.method.get(`${result.lng}`)}`);
                                    });
                                    break
                                case 'order':
                                    (response.listResponse).forEach(async(element,index) => {
                                        if(element.type === 'string') return await client.sendMessage(options.from,translatorNextIO(element.code,{placeholder:element.placeholder}, result.lng));
                                        return await client.sendMessage(options.from,translatorNextIO(response.code,{name:element.products[0].name,quantity:element.products[0].quantity,total:element.products[0].total}, result.lng));
                                    });
                                    break
                            }
                          break;
                    }
                });
            }
        } catch (err) {
            console.log(err)
            client.sendMessage(options.from, translatorNextIO(err.message || 'ERROR_MESSAGE',undefined,'es'));
        }
    };
};

