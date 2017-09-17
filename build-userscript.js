var babel = require("babel-core");
var fs = require("fs");
var tpl = fs.readFileSync('./userscript/tpl.js').toString();
var code = babel.transformFileSync("./userscript/main.js").code;

var nano = function(template, data) {
        return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
            let keys = key.split("."),
                v = data[keys.shift()];
            for (let i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
            return (typeof v !== "undefined" && v !== null) ? v : "";
        });
    };

var ujs = nano(tpl,{
	code:code,
	time:(+new Date())
});

var outFile = './dist/show-site-all-userjs.user.js';

fs.writeFile('./dist/show-site-all-userjs.user.js',ujs,function(err){
	if(err){
		return console.log(err);
	}
	return console.log( 'build-out:' + outFile);
});