
const styles = (colour1,colour2) => 
    // "width:300px;"
    "display: block;"
    +"width: 100%;"
    +"padding: 5px 7px;"
    +`background-color: ${colour1};`
    +`border: 2px solid ${colour2};`
    +"border-radius: 5px;"
    +"font-weight: bold;"
    +"color :white;"
    +"font-family: sans-serif;"
    +"line-height: 28px;"
    +"font-size: 18px;"
    +"text-align: center;";

const warnStyles = styles("orange","orange");
const errorStyles = styles("tomato","red");

const loggerBase = function(){
    let fired = false;
    return (type,styles) => (functionName, message) => {
        if (message === undefined) {
            message = functionName;
            functionName = null;
        }
        if (fired) {
            return;
        }
        fired = true;
        // console.log("Logger ", type);
        console.log("%c" + `${functionName === null ? "" : (type + " at: " + functionName)}`,styles);
        console.log(`%cMessage: ${message}`,styles);
        console.log("%c - Generated from afs-services - ",styles);
        // if (type === "Error") {
        //     throw new Error(message + " See console for more details");
        // }
        // else {
        //     console.trace();
        // }
    }
}();

export const loggerService = {
    warn: loggerBase("Warning",warnStyles),
    error: loggerBase("Error",errorStyles)
}
