
const fileReader = require("fs");

const complete = output => {
	fileReader.writeFile(fileOutput,output,(err,response) => {
		console.log("Success, closing");
	});
}

const newAttribute = content => {
	if (content === "Required") {
		return ["required"];
	}
	if (content.substr(0,9) === "MinLength"
		|| content.substr(0,9) === "MaxLength") {
		return [content.substring(0,content.indexOf("(")).toLowerCase(),parseInt(content.substring(content.indexOf("(")+1,content.indexOf(")")))];
	}
	return content;
}

const runScript = function(){
	const currentValidators = [];
	fileReader.readFile(fileInput,"utf8",function(err,response){
		const output = 'import { modeller } from "./modeller";\nconst model = new modeller.ModelBuilder();\n' + response
			.replace(/ { get; set; }/g,"")
			.replace(/public /g,"")
			.split("\n")
			.map(x=>{
				const splits = x.split(" ");
				if (splits.length < 2) {
					const content = splits[0];
					if (content.length > 2 && content.substr(0,1) === "[" && content.substr(content.length-2,1) === "]") {
						currentValidators.push(newAttribute(content.substring(1,content.length-2)));
					}
					return "";
				}
				let str = '';
				let name = '';
				splits[1] = splits[1].replace(new RegExp("\r","g"),"")
				if (splits[0].substr(0,5) === "List<") {
					name = splits[0].substring(5,splits[0].length-1);
					str = `model.add("${splits[1]}",new modeller.List(${name}));`;
				}
				else if (splits[0].substr(0,1).toLowerCase() !== splits[0].substr(0,1)) {
					name = splits[0].replace("DateTime","Date");
					str = `model.add("${splits[1]}",new modeller.Single(${name}));`;
				}
				else {
					name = splits[1];
					if (splits[0] === "int") str = `model.add("${splits[1]}","number");`;
					if (splits[0] === "double") str = `model.add("${splits[1]}","number");`;
					if (splits[0] === "string") str = `model.add("${splits[1]}","string");`;
					if (splits[0] === "bool") str = `model.add("${splits[1]}","boolean");`;
				}
				currentValidators.forEach(y=>{
					str += `\nmodel.validator("${name}","${y[0]}",${y[1]});`;
				});
				currentValidators.length = 0;
				return str;
			})
			.filter(x=>x!=="")
			.join("\n")
			+ `\nexport const ${fileInput.replace(".cs","")} = model.create();`;
		complete(output);
	});
}

let fileInput = "./example";
let fileOutput = "./dist/guide";

(function(){
	const argInput = process.argv[2];
	const argOutput = process.argv[3];
	if (argInput !== undefined) {
		fileInput = argInput + (argInput.substr(argInput.length-3,3) === ".cs" ? "" : ".cs");
	}
	if (argOutput !== undefined) {
		fileOutput = argOutput + (argOutput.substr(argOutput.length-3,3) === ".js" ? "" : ".js");
	}
}());

console.log("Running... | C# input file: ", fileInput, " JS output file: ", fileOutput);

runScript();
