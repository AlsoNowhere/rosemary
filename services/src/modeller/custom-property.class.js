
export const CustomProperty = function(){
	this.items = Array.prototype.map.apply(arguments,[x => x]);
	Object.freeze(this);
}
CustomProperty.prototype = {
	evaluate(name,model){
		this.items.forEach(x => x(name,model));
	}
}
