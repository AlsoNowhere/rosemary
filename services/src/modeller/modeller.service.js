
import { validation } from "../validation/validation";
import { loggerService } from "../logger/logger.service";

import { CustomProperty } from "./custom-property.class";

import { preloaded } from "./preloaded-properties.service";
import { get, define } from "../common/getterSetter";

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
}

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
}
List.prototype = [];

const modelTypes = {
	"abstract": "abstract"
};

const Options = function(){
	const options = arguments[0];
	Object.keys(options).forEach(x=>{
		get(this,x,get.lookup(options,x));
	});
}

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
		};
		return output;
	});
}

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
	}
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
	}
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
	}
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
	}
}

export const modeller = {
	Single,
	List,
	ModelBuilder,
	Modeller,
	preloaded,
	CustomProperty,
	Options
};
