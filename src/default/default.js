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



var L = require ('partial.lenses')
var R = require ('ramda')
var S = require ('s-js')
var Z = require ('sanctuary') .create ({ checkTypes: true, env: require ('sanctuary') .env });
var Surplus = require ('surplus')
var memoize = require ('fast-memoize')
var TimelineMax = window .TimelineMax




var where = x => x ()
var do_ = Promise .resolve ()


var defined
var data = constructors => Oo (constructors,
  oo (R .mapObjIndexed ((fn, key) => 
    where ((
      args_slice = fn .toString() .match (/\((.*?)\)\s*=>/) [1]
    ) =>
      !! (args_slice)
      ? where ((
        portions = args_slice .split (',') .map (x => x .match (/([^\s=]+)\s*(?:=.+)?/) [1])
      ) =>
        (...vals) => 
        R .objOf (key, R .fromPairs (R .zip (portions, vals))))
      : R .objOf (key, {}) ))))





var fro = (from_nothing, from_just) => (maybe = maybe) => 
  !! (Z .isJust (maybe))
  ? from_just (Z .fromMaybe_ (_ => {}) (maybe))
  : from_nothing
var map_just = fn => fro (Z .Nothing, fn)

var every = x => where ((
  
  ) => every){
  var every = S .data ()
  var next = _ => {;
    ;every (defined)
    ;setTimeout (next, x)}
  ;setTimeout (next, x)
  return every}









document .addEventListener ('DOMContentLoaded', _ => {;
	;; document .body .appendChild (window .view)
})














window .Surplus = Surplus
window .stuff = { ...window .stuff,
  xx, oo, Oo, L, R, S, Z, memoize, TimelineMax,
  where, do_, defined, data,
  fro, map_just , every }