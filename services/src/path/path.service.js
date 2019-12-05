
export const path = new function(){
    Object.defineProperty(this,"path",{
        get(){
            return window.location.hash.split("/").filter(x => x !== "#").map(x => x.replace(/%20/g," "));
        },
        set(value){
            if (!(value instanceof Array)) {
                return;
            }
            window.location.hash = value.join("/");
        }
    });
}
