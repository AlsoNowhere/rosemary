import { loggerService } from "../logger/logger.service";

export const LookUp = function(a,b){
    this[0] = a;
    this[1] = b;
};

const lookup =(a,b) => new LookUp(a,b);

export const define = function(){
    const define = (obj,prop,getter=null,setter=null,options={},defaultValue) => {
        const output = {...options};
        let _value = defaultValue;
        if (getter !== null) {
            output.get = getter instanceof Function
                ? getter
                : function(){
                    return getter instanceof LookUp
                        ? getter[0][getter[1]] 
                        : getter !== undefined
                        ? getter
                        : _value;
                }
        }
        if (setter !== null) {
            output.set = setter instanceof Function
                ? setter
                : function(value){
                    return _value = value;
                }
        }
        Object.defineProperty(obj,prop,output);
    }
    define.lookup = lookup;
    return define;
}();

export const get = function(){
    const get = (obj,prop,getter,options={},defaultValue) => {
        if (getter === null) {
            return loggerService.error("You cannot pass null to a .get function");
        }
        const output = {...options};
        let _value = defaultValue;
        output.get = getter instanceof Function
            ? getter
            : function(){
                return getter instanceof LookUp
                    ? getter[0][getter[1]] 
                    : getter !== undefined
                    ? getter
                    : _value;
            }
        Object.defineProperty(obj,prop,output);
    }
    get.lookup = lookup;
    return get;
}();

export const set= function(){
    const set = (obj,prop,setter,options={}) => {
        if (setter === null) {
            return loggerService.error("You cannot pass null to a .set function");
        }
        if (!(setter instanceof Function)) {
            return loggerService.error("You must pass a Function to the setter argument in a .set function");
        }
        const output = {...options};
        if (setter !== null) {
            output.set = setter instanceof Function
                ? setter
                : function(value){
                    return _value = value;
                }
        }
        Object.defineProperty(obj,prop,output);
    }
    return set;
}();
