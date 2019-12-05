'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const findElementByFieldName = (form,name) => [...form.getElementsByTagName("*")].filter(x=>x.attributes.name &&  x.attributes.name.nodeValue===name)[0];

const resolveLeadingZeroes = input => {
    if ((typeof input === "string" && input.length === 1) || (typeof input === "number" && input < 10)) {
        return "0" + input;
    }
    return "" + input;
};

const formats = {
    asDate: {
        "yyyy-mm-dd"(date){
            const split = date.split("-");
            const day = resolveLeadingZeroes(parseInt(split[2]));
            const month = resolveLeadingZeroes(parseInt(split[1]));
            const year = split[0];
            return new Date(`${year}-${month}-${day}T00:00:00Z`);
        }
    },
    asString: {
        "yyyy-mm-dd": (day,month,year) => `${year}-${resolveLeadingZeroes(month+1)}-${resolveLeadingZeroes(day)}`,
        "dd/mm/yyyy":(day,month,year) => `${resolveLeadingZeroes(day)}/${resolveLeadingZeroes(month+1)}/${year}`
    }
};

const resolveDateAsString = (date = new Date(),format = "yyyy-mm-dd") => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const mins = date.getMinutes();
    const secs = date.getSeconds();
    return formats.asString[format](day,month,year,hour,mins,secs);
};

const resolveStringAsDate = (date,format = "yyyy-mm-dd") => formats.asDate[format](date);

const resolveDateForField = date => resolveDateAsString(date);

const resolveDateForTable = date => resolveDateAsString(resolveStringAsDate(date),"dd/mm/yyyy");

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

const loggerService = {
    warn: loggerBase("Warning",warnStyles),
    error: loggerBase("Error",errorStyles)
};

const RootInheritorData = function(){};

const inheritor = function(data,parent){
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
    };
    if (parent) {
        InheritorData.prototype = parent;
    }
    else {
        InheritorData.prototype = new RootInheritorData();
    }
    return new InheritorData();
};

const evaluate = function(element, rule){
	const form = element.form;

	if (rule.type === "required"
		&& (
			rule.not
				? element.value !== ""
				: element.value === ""
		)
	) {
		element.nextElementSibling && (element.nextElementSibling.innerText = rule.message);
		element.classList.add("error");
		return false;
	}

	if (rule.type === "same"
		&& (
			rule.not
				? element.value === findElementByFieldName(form,rule.target).value
				: element.value !== findElementByFieldName(form,rule.target).value
		)
	) {
		element.nextElementSibling && (element.nextElementSibling.innerText = rule.message);
		element.classList.add("error");
		return false;
	}

	if (rule.type === "min"
		&& (
			rule.not
				? rule.length < parseInt(element.value, 10)
				: rule.length > parseInt(element.value, 10)
	)) {
		element.nextElementSibling && (element.nextElementSibling.innerText = rule.message);
		element.classList.add("error");
		return false;
	}

	if (rule.type === "max"
		&& (
			rule.not
				? rule.length > parseInt(element.value, 10)
				: rule.length < parseInt(element.value, 10)
	)) {
		element.nextElementSibling && (element.nextElementSibling.innerText = rule.message);
		element.classList.add("error");
		return false;
	}

	if (rule.type === "minlength"
		&& (
			rule.not
				? rule.length < element.value.length
				: rule.length > element.value.length
	)) {
		element.nextElementSibling && (element.nextElementSibling.innerText = rule.message);
		element.classList.add("error");
		return false;
	}

	if (rule.type === "maxlength"
		&& (
			rule.not
				? rule.length > element.value.length
				: rule.length < element.value.length
	)) {
		element.nextElementSibling && (element.nextElementSibling.innerText = rule.message);
		element.classList.add("error");
		return false;
	}

	if (rule.type === "match"
		&& (
			rule.not
				? element.value.match(rule.pattern) !== null
				: element.value.match(rule.pattern) === null
		)
	) {
		element.nextElementSibling && (element.nextElementSibling.innerText = rule.message);
		element.classList.add("error");
		return false;
	}

	if (rule.type === "matches-email"
		&& (
			rule.not
				? element.value.match(/[a-zA-Z]{1}[a-zA-Z0-9._-]+[@]{1}[a-zA-Z]{1}[a-zA-Z0-9_-]*[.]{1}[a-zA-Z.]+/g) !== null
				: element.value.match(/[a-zA-Z]{1}[a-zA-Z0-9._-]+[@]{1}[a-zA-Z]{1}[a-zA-Z0-9_-]*[.]{1}[a-zA-Z.]+/g) === null
		)
	) {
		element.nextElementSibling && (element.nextElementSibling.innerText = rule.message);
		element.classList.add("error");
		return false;
	}

	return true;
};

const ValidationBuilder = function(){
	let not = false;
	this.rules = [];

	Object.defineProperty(this,"not",{
		get(){
			not = true;
			return this;
		}
	});

	this.reset = function(){
		const _not = not;
		not = false;
		return _not;
	};
};

ValidationBuilder.prototype = {
	processRules(element){
		let i = 0;
		let validState = true;
		const keys = Object.keys(this.rules);
		while (i < keys.length && validState) {
			validState = evaluate(element, this.rules[keys[i]]);
			i++;
		}
		return validState;
	},
	required(message){
		this.rules.push({type:"required",message,not:this.reset()});
		return this;
	},
	same(target,message){
		this.rules.push({type:"same",target,message,not:this.reset()});
		return this;
	},
	min(length,message){
		this.rules.push({type:"min",length,message,not:this.reset()});
		return this;
	},
	max(length,message){
		this.rules.push({type:"max",length,message,not:this.reset()});
		return this;
	},
	minlength(length,message){
		this.rules.push({type:"minlength",length,message,not:this.reset()});
		return this;
	},
	maxlength(length,message){
		this.rules.push({type:"maxlength",length,message,not:this.reset()});
		return this;
	},
	matches(pattern,message){
		this.rules.push({type:"match",pattern,message,not:this.reset()});
		return this;
	},
	matchesEmail(message){
		this.rules.push({type:"matches-email",message,not:this.reset()});
		return this;
	}
};

/*
 -- List of possible validators -- 
required
same
min
max
minlength
maxlength
matches
matchesEmail
*/


const validation = function(form,options){
	if (form === undefined) {
		return new ValidationBuilder();
	}
	if (!(form instanceof HTMLFormElement)) {
		throw new Error("You must pass a form element to instantiate validation");
	}
	let i = 0;
	let validState = true;
	const keys = Object.keys(options);

	while(i < keys.length){
		findElementByFieldName(form,keys[i]).nextElementSibling && (findElementByFieldName(form,keys[i]).nextElementSibling.innerText = "");
		i++;
	}
	i = 0;

	while (i < keys.length && validState) {
		validState = options[keys[i]].processRules(findElementByFieldName(form,keys[i]));
		i++;
	}
	return validState;
};

const CustomProperty = function(){
	this.items = Array.prototype.map.apply(arguments,[x => x]);
	Object.freeze(this);
};
CustomProperty.prototype = {
	evaluate(name,model){
		this.items.forEach(x => x(name,model));
	}
};

const preloaded = {
    email: new CustomProperty(
        (name,model) => model.type(name,"string"),
        (name,model) => model.htmlType(name,"email"),
        (name,model) => model.validator(name,"matchesEmail","Not a valid email address")
    )
};

const LookUp = function(a,b){
    this[0] = a;
    this[1] = b;
};

const lookup =(a,b) => new LookUp(a,b);

const define = function(){
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
                };
        }
        if (setter !== null) {
            output.set = setter instanceof Function
                ? setter
                : function(value){
                    return _value = value;
                };
        }
        Object.defineProperty(obj,prop,output);
    };
    define.lookup = lookup;
    return define;
}();

const get = function(){
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
            };
        Object.defineProperty(obj,prop,output);
    };
    get.lookup = lookup;
    return get;
}();

const set= function(){
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
                };
        }
        Object.defineProperty(obj,prop,output);
    };
    return set;
}();

// const singleExceptions = [Date];

// export const addToSingleExceptions = Item => {
// 	if (!(Item instanceof Single)) {
// 		loggerService.warn("Add to Single Exceptions - you must pass a function");
// 		return;
// 	}
// 	if (singleExceptions.indexOf(Item) > -1) {
// 		loggerService.warn("Add to Single Exceptions - item passed in already in list, ignored here");
// 		return;
// 	}
// 	singleExceptions.push(Item);
// 	// console.log("List: ", singleExceptions);
// }

const Single = function(context
	// , reset
	,options,
	output
	){
	// console.log(" - test - ", context, singleExceptions);
	if (
		// (typeof context !== "function" || !(new context() instanceof Modeller))
			// && singleExceptions.indexOf(context) === -1
			!(context instanceof Function)
			// || !(new context() instanceof Modeller)
	) {
		throw new Error("You must pass an instance of an object created using modeller.ModelBuilder as the context for a new Single.");
	}

	// console.log("Hit me upL: ", context, options, output);

	Object.defineProperty(this,"context",{
		get(){
			return context;
		}
	});
	// Object.defineProperty(this,"reset",{
	// 	get(){
	// 		return reset;
	// 	}
	// });
	Object.defineProperty(this,"options",{
		get(){
			return options;
		}
	});
	Object.defineProperty(this,"output",{
		get(){
			return output;
		}
	});
};

const List = function(context){
	if (
		// (typeof context !== "function" || !(new context() instanceof Modeller))
			// && singleExceptions.indexOf(context) === -1
		!(context instanceof Function)
	) {
		throw new Error("You must pass an instance of an object created using modeller.ModelBuilder as the context for a new List.");
	}

	Object.defineProperty(this,"context",{
		get(){
			return context;
		}
	});
};
List.prototype = [];

const modelTypes = {
	"abstract": "abstract"
};

const Options = function(){
	const options = arguments[0];
	Object.keys(options).forEach(x=>{
		get(this,x,get.lookup(options,x));
	});
};

const Modeller = function(options,validators,aliases,htmlTypes){

// These properties must be defined in this way so that then are inenumerable (can't be looped over by the for in in the extract method).
	define(this,"getOptions",()=>()=>options);
	define(this,"getValidators",()=>()=>validators);
	define(this,"getAliases",()=>()=>aliases);
	define(this,"getHtmlTypes",()=>()=>htmlTypes);

	define(this,"extract",()=>function(type,prop){
		const output = {};
		const context = new this.constructor();
		for (let key in context) {
			if (this[key] instanceof Single && context[key].context === type) {
				output[key] = null;
			}
			else {
				output[key] = this[key] instanceof type
					? this[key][prop]
					: this[key];
			}
		}		return output;
	});
};

const ModelBuilder = function(modelType){
	const items = [];
	const options = {};
	const validators = {};
	const aliases = {};
	const htmlTypes = {};

	this.add = (name,type,_options) => {
		if (items.find(x => x.name === name) !== undefined) {
			return loggerService.warn("AFS-Services - modeller function - add method",`This property (${name}) has already been added, will be ignored here.`);
		}
		items.push({name,type});
		aliases[name] = name;
		if (_options !== undefined) {
			if (!(_options instanceof Options)) {
				return loggerService.error("AFS-Services - modeller function - add method",`You must pass an modeller.Options object when providing options (e.g model.add("Example","string",new modeller.Options({type:"email"}))).`);
			}
			options[name] = _options;
		}
	};
	this.type = (targetName,type) => {
		const item = items.find(x => x.name === targetName);
		if (item === undefined) {
			return loggerService.error("AFS-Services - modeller - type method","This name was not found");
		}
		item.type = type;
	};
	this.alias = (targetName,alias) => {
		const item = items.find(x => x.name === targetName);
		if (item === undefined) {
			return loggerService.error("AFS-Services - modeller - alias method","This name was not found");
		}
		aliases[targetName] = alias;
	};
	this.htmlType = (targetName,type) => {
		const item = items.find(x => x.name === targetName);
		if (item === undefined) {
			return loggerService.error("AFS-Services - modeller - htmlType method","This name was not found");
		}
		htmlTypes[targetName] = type;
	};
	this.validator = (name,type,value,message) => {
		if (!validators[name]) {
			validators[name] = validation();
		}
		if (value === undefined) {
			value = `${name} is ${type}`;
		}
		if (message === undefined) {
			message = `${aliases[name]} is ${type}`;
		}
		if (!validators[name][type]) {
			return loggerService.warn("This validator: " + type + " does not exist.");
		}
		validators[name][type](value, message);
	};
	this.custom = (name,custom) => {
		if (!(custom instanceof CustomProperty)) {
			return loggerService.error("AFS-Services - modeller - custom property method","You must pass an instance of CustomProperty as the second argument.");
		}
		this.add(name);
		custom.evaluate(name,this);
	};
	this.create = (ParentModel) => {
		if (ParentModel !== undefined && !((new ParentModel()) instanceof Modeller)) {
			return loggerService.error("AFS-Services - modeller - .create() method","You must pass an instance of Modeller or undefined as the only argument.");
		}

		const Model = function(){
			const args = arguments;
			items.forEach((x,i) => {
				if (args[i] === null) {
					return this[x.name] = null;
				}
				if (x.type === "number"
					|| x.type === "string"
					|| x.type === "boolean") {
					if (typeof args[i] !== x.type) {
						if (args[i] !== undefined && args[i] !== null) {
							console.warn(`The type you have passed in: ${typeof args[i]} is not of the expected type: ${x.type}. Reverting to default type.`);
						}
						if (options[x.name] && options[x.name].hasOwnProperty("defaultValue")) {
							this[x.name] = options[x.name].defaultValue;
						}
						else {
							this[x.name] = x.type === "number"
								? 0
								: x.type === "string"
									? ""
									: false;
						}
					}
					else {
						this[x.name] = args[i];
					}
				}
				if (x.type instanceof Single) {
					if (!(args[i] instanceof x.type.context)) {
						this[x.name] = (options[x.name] && options[x.name].hasOwnProperty("defaultValue"))
							? options[x.name].defaultValue
							: new Single(x.type.context,x.type.options,x.type.output);
					}
					else {
						this[x.name] = args[i];
					}
                }
                else if (x.type instanceof List) {

                    if (!(args[i] instanceof Array)) {
                        this[x.name] = (options[x.name] && options[x.name].hasOwnProperty("defaultValue"))
							? options[x.name].defaultValue
							: new List(x.type.context);
					}
					else {
						this[x.name] = args[i].filter(y => {
                            const output = x.type.context === String
                            || x.type.context === Number
                            || x.type.context === Boolean
                                ? typeof y === x.type.context.name.toLowerCase()
                                : y instanceof x.type.context;
                            return output;
                        });
					}
                }
			});
		};

		if (!!modelTypes[modelType]) {
			Model.type = modelType;
		}

		Model.options = options;
		Model.validators = validators;
		Model.aliases = aliases;

		if (!!ParentModel) {
			Model.prototype = new ParentModel();
			Object.keys(ParentModel.options).forEach(key=>Model.options[key]=ParentModel.options[key]);
			Object.keys(ParentModel.validators).forEach(key=>Model.validators[key]=ParentModel.validators[key]);
			Object.keys(ParentModel.aliases).forEach(key=>Model.aliases[key]=ParentModel.aliases[key]);
		}
		else {
			Model.prototype = new Modeller(options,validators,aliases,htmlTypes);
		}
		Model.prototype.constructor = Model;
		return Model;
	};
};

const modeller = {
	Single,
	List,
	ModelBuilder,
	Modeller,
	preloaded,
	CustomProperty,
	Options
};

const goError = (location,error) => {
    loggerService.error(location,error);
    throw new Error(location + " " + error);
};

const rules = {
    "required":(value,rule) => value === "" || value === null || value === undefined
        ? ({valid:false,message:rule.message})
        : ({valid:true,message:""}),
    "minlength":(value,rule) => value.length < rule.length
            ? ({valid:false,message:rule.message})
            : ({valid:true,message:""}),
    "maxlength":(value,rule) => value.length > rule.length
        ? ({valid:false,message:rule.message})
        : ({valid:true,message:""}),
    "min":(value,rule) => value < rule.length
            ? ({valid:false,message:rule.message})
            : ({valid:true,message:""}),
    "max":(value,rule) => value > rule.length
        ? ({valid:false,message:rule.message})
        : ({valid:true,message:""})
};

const validation2 = (values,model,validChecks) => {
    if (!(values instanceof modeller.Modeller)) {
        goError("AFS-Services - validation - values","You must pass an instance created using modeller as the values");
    }
    if (!(model.prototype instanceof modeller.Modeller)) {
        goError("AFS-Services - validation - model","You must pass a model created using modeller as the model");
    }

    const context = new model();
    const validators = context.getValidators();

    Object.keys(validators).forEach(key=>{
        validChecks[key].valid = true;
        validChecks[key].message = "";
        validators[key].rules.forEach(rule=>{
            if (!validChecks[key].valid) {
                return;
            }
            const result = rules[rule.type] && rules[rule.type](values[key],rule);
            validChecks[key].valid = result.valid;
            validChecks[key].message = result.message;
        });
    });

    return Object.assign({},validChecks);
};

const createEle = name => document.createElement(name.toUpperCase());

const getToastRack = () => [...document.body.children].filter(x=>x.nodeName==="DIV"&&x.classList.contains("toasty-rack"))[0];

const getCurrentToast = currentToast => getToastRack() ? [...getToastRack().children].filter(x=>x===currentToast) : {};

const getNewToast = function(message){
	const toastRack = function(){
		const element = createEle("div");
		element.classList.add("toasty-rack");
		return element;
	}();
	const toastElement = createEle("div");
	const toastMessageElement = createEle("p");
	const toastButtonElement = function(){
		const container = createEle("div");
		const button = createEle("button");
		container.appendChild(button);
		return container;
	}();
	if (getToastRack() === undefined) {
		document.body.appendChild(toastRack);
	}
	toastElement.classList.add("toasty");
	toastMessageElement.innerText = message;
	toastElement.appendChild(toastMessageElement);
	toastElement.appendChild(toastButtonElement);
	const clickToClose = ()=>{
		toastElement.classList.add("closing");
		setTimeout(()=>{
			const toastRack = getToastRack();
			if (getCurrentToast(toastElement).length === 1) {
				toastRack.removeChild(toastElement);
				if (toastRack.children.length === 0) {
					document.body.removeChild(toastRack);
				}
			}
		},300);
	};
	toastElement.addEventListener("click",clickToClose);
	toastButtonElement.addEventListener("click",clickToClose);
	return toastElement;
};

const toastService = {
	popToast: function(type, message){
		if (typeof type !== "number" && typeof type !== "string" && typeof message !== "string") {
			return;
		}
		const useTypeAsMessage = typeof type === "string" && message === undefined;
		const newToast = getNewToast(useTypeAsMessage ? type : message);
		const toastType = type === 1 || type === "standard" || type === undefined || useTypeAsMessage
			? "standard"
			: type === 2 || type === "danger" || type === "strawberry_jam_toast"
				? "danger"
				: type === 3 || type === "warning" || type === "cheese_toast"
					? "warning"
					: type === 4 || type === "success" || type === "pesto_toast"
						? "success"
						: type === 5 || type === "highlight" || type === "buttered_toast"
							? "highlight"
							: "";
		newToast.classList.add(toastType);
		getToastRack().appendChild(newToast);
		setTimeout(()=>{
			newToast.classList.add("show");
		},0);
		setTimeout(()=>{
			if (getCurrentToast(newToast).length === 0) {
				return;
			}
			newToast.classList.add("closing");
			setTimeout(()=>{
				const toastRack = getToastRack();
				if (getCurrentToast(newToast).length === 1) {
					toastRack.removeChild(newToast);
					if (toastRack.children.length === 0) {
						document.body.removeChild(toastRack);
					}
				}
			},300);
		},3000);
	}
};

const path = new function(){
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
};

const findElementByFieldName$1 = findElementByFieldName;
const resolveDateForField$1 = resolveDateForField;
const resolveDateForTable$1 = resolveDateForTable;
const inheritor$1 = inheritor;
const RootInheritorData$1 = RootInheritorData;
const modeller$1 = modeller;
const CustomProperty$1 = () => CustomProperty$1;
const preloaded$1 = preloaded;
const validation$1 = validation;
const validation2$1 = validation2;
const toastService$1 = toastService;
const loggerService$1 = loggerService;
const goError$1 = goError;
const path$1 = path;
const define$1 = define;
const get$1 = get;
const set$1 = set;

exports.CustomProperty = CustomProperty$1;
exports.RootInheritorData = RootInheritorData$1;
exports.define = define$1;
exports.findElementByFieldName = findElementByFieldName$1;
exports.get = get$1;
exports.goError = goError$1;
exports.inheritor = inheritor$1;
exports.loggerService = loggerService$1;
exports.modeller = modeller$1;
exports.path = path$1;
exports.preloaded = preloaded$1;
exports.resolveDateForField = resolveDateForField$1;
exports.resolveDateForTable = resolveDateForTable$1;
exports.set = set$1;
exports.toastService = toastService$1;
exports.validation = validation$1;
exports.validation2 = validation2$1;
