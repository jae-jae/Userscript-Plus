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

var renderOut = function(outFile,ljs){
	var ujs = nano(tpl, {
		ljs: ljs,
		code: code,
		time: (+new Date())
	});

	fs.writeFile(outFile, ujs, function(err) {
		if (err) {
			return console.log(err);
		}
		return console.log('build-out:' + outFile);
	});
};

var ljs = `// @require     https://raw.githubusercontent.com/jae-jae/l.js/master/userjs/l.userjs.min.js
// @require     https://gist.githubusercontent.com/jae-jae/35a1833079d26e6c9d9c6d5bed982353/raw/userjs-base.js`;

var ljs_GF = `// @require      https://greasyfork.org/scripts/23419-l-js/code/ljs.js?version=148792
// @require      https://greasyfork.org/scripts/23420-userjs-base-js/code/userjs-basejs.js?version=214700`;


renderOut('./dist/show-site-all-userjs.user.js',ljs);
//greasyfork version
renderOut('./dist/show-site-all-userjs.gf.user.js',ljs_GF);