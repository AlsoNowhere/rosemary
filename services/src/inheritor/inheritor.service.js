import { loggerService } from "../logger/logger.service";

export const RootInheritorData = function(){};

export const inheritor = function(data,parent){
    const InheritorData = function(){
        Object.keys(data).forEach(key=>{
            Object.defineProperty(this,key,{
                get(){
                    return data[key][0];
                },
                set(value){
                    if (typeof data[key][1] !== "function") {
                        loggerService.error("inheritor service - set", "No setter function added for update state. Please add this like so: <Copo _inheritence={{ example: [example,updateExample] }} />");
                    }
                    data[key][1](value);
                }
            });
        });
    }
    if (parent) {
        InheritorData.prototype = parent;
    }
    else {
        InheritorData.prototype = new RootInheritorData();
    }
    return new InheritorData();
}
