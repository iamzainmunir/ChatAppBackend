/*
* Require Validation
* Help to validate the data
*/
import mongoose from 'mongoose';

module.exports = (types: Array<any>, data: any)=>{
    try{
        let hasError = false,
            loopIndex = 0,
            message = "",
            verfiedData: any = {};
        while (types.length > loopIndex && !hasError) {
            let key = types[loopIndex].key.toString(),
                required = true;

            if(types[loopIndex].optional){
                required = data[key] === undefined? false: true;
            }

            switch (types[loopIndex].type) {
                case "object": {
                    if ((!isValidType(data[key], Object)) && required) {
                        hasError = true;
                        message = key + " must be " + types[loopIndex].type;
                    }else if(data[key] !== undefined){
                        verfiedData[key] = data[key]
                    }

                    break;
                }
                case "array": {
                    if ((!isValidType(data[key], Array)) && required) {
                        hasError = true;
                        message = key + " must be " + types[loopIndex].type;
                    }else if(data[key] !== undefined){
                        verfiedData[key] = data[key]
                    }
                    break;
                }
                case "number": {
                    if (isNaN(data[key]) && required) {
                        hasError = true;
                        message = key + " must be " + types[loopIndex].type;
                    }else if(data[key] !== undefined){
                        verfiedData[key] = data[key]
                    }
                    break;
                }
                case "string": {
                    if ((data[key] === undefined || typeof data[key] !== "string") && required) {
                        hasError = true;
                        message = key + " must be " + types[loopIndex].type;
                    }else if(data[key] !== undefined){
                        verfiedData[key] = data[key]
                    }
                    break;
                }
                case "mongoose-object-id": {
                    if ((!isValidType(data[key], 'mongoose-object-id')) && required) {
                        hasError = true;
                        message = key + " is invalid format";
                    }else if(data[key] !== undefined){
                        verfiedData[key] = data[key]
                    }
                    break;
                }
                case 'dateTime':{
                    if ((data[key] === undefined || new Date(data[key]).getTime()<0 ) && required) {
                        hasError = true;
                        message = key + " must be UTC date time format";
                    }else if(data[key] !== undefined){
                        verfiedData[key] = data[key]
                    }
                    break;
                }
                case 'array-of-mongoose-object-id':{
                    if ((!isValidType(data[key], Array)) && required) {
                        hasError = true;
                        message = key + " must be " + types[loopIndex].type;
                        break;
                    }
                    verfiedData[key] = [];
                    for(var i=0; i<data[key].length; i++){
                        if ((!isValidType(data[key][i], 'mongoose-object-id'))) {
                            hasError = true;
                            message = 'Invalid format of id inside the array';
                            break;
                        }else if(data[key][i] !== undefined){
                            verfiedData[key][i] = data[key][i];
                        }   
                    }
                    break;
                }
            }
            loopIndex++
        }

        if (hasError) {
            return {
                error: true,
                message: message
            };
        } else {
            return {
                error: false,
                message: null,
                data: verfiedData
            };
        }
    }catch(error){
        return {
            error: true,
            message: error.message
        };
    }
}


const isValidType=(value: any, type: any)=>{
    try{
        if (value !== undefined) {
            if(type === 'mongoose-object-id'){
                return mongoose.Types.ObjectId.isValid(value);
            }
            return value.constructor === type;
        }
        return false;
    }catch(error){
        throw {
            message: "Ref id validation failed"
        };
    }
}