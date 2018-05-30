var xx = function (x) {
	return { xx: x } }
var pp = function (x) {
	return { pp: x } }

var Xx = function () {
	if ('pp' in arguments [1]) {
		var answer = arguments [0]
		for (var i = 1; i < arguments .length; i ++) {
			;answer = arguments [i] (answer) }
		return answer }
	else if ('xx' in arguments [1]) {
		var answer = arguments [0]
		for (var i = 1; i < arguments .length; i ++) {
			;answer = answer (arguments [i]) }
		return answer }
	else {
		;throw 'Syntax Error; no pp or xx after focus Xx;' } }