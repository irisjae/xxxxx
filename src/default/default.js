var xx = function (x) {
	return { xx: x } }
var oo = function (x) {
	return { oo: x } }

var Oo = function () {
	if ('oo' in arguments [1]) {
		var answer = arguments [0]
		for (var i = 1; i < arguments .length; i ++) {
			;answer = arguments [i] .oo (answer) }
		return answer }
	else if ('xx' in arguments [1]) {
		var answer = arguments [0]
		for (var i = 1; i < arguments .length; i ++) {
			;answer = answer (arguments [i] .xx) }
		return answer }
	else {
		;throw 'Syntax Error; no oo or xx after focus Oo;' } }

window .xx = xx
window .oo = oo
window .Oo = Oo



window .L = require ('partial.lenses')
window .R = require ('ramda')
window .S = require ('s-js')
window .Z = require ('sanctuary') .create ({ checkTypes: true, env: require ('sanctuary') .env });
window .Surplus = require ('surplus')



var S = window .S
var R = window .R
var Z = window .Z


window .do_ = Promise .resolve ()

var defined
window .defined = defined

window .number = defined
window .string = defined
window .list = a => defined
window .maybe = a => defined
window .id = window .string

var maybe = window .maybe

window .data = constructors => Oo (constructors,
  oo (R .mapObjIndexed ((fn, key) => {
    var args_slice = fn .toString() .match (/\((.*?)\)\s*=>/) [1]
    if (args_slice) {
      var portions = args_slice .split (',') .map (x => x .match (/([^\s=]+)\s*(?:=.+)?/) [1])
      return (...vals) => 
        R .objOf (key, R .fromPairs (R .zip (portions, vals)))}
    else
      return R .objOf (key, {})})))



window .fro = (from_nothing, from_just) => (maybe = maybe) => 
  Z .reduce (_ => x => from_just (x), from_nothing, maybe)

window .every = x => {
  var every = S .data ()
  var next = _ => {;
    ;every (defined)
    ;setTimeout (next, x)}
  ;setTimeout (next, x)
  return every}



window .api = (room, x) => fetch ('/log/' + room, x) .then (x => x .json ())




document .addEventListener ('DOMContentLoaded', _ => {;
	;; document .body .appendChild (window .view)
})
