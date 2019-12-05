
import { findElementByFieldName } from "../common/find-element-by-field-name";

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
}

export const ValidationBuilder = function(){
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
	}
}

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
}

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


export const validation = function(form,options){
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
		i++
	}
	i = 0;

	while (i < keys.length && validState) {
		validState = options[keys[i]].processRules(findElementByFieldName(form,keys[i]));
		i++;
	}
	return validState;
};
