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
var go = Promise .resolve ()


var defined
var data = constructors => Oo (constructors,
  oo (R .mapObjIndexed ((fn, key) => 
    where ((
      args_slice = fn .toString() .match (/\((.*?)\)\s*=>/) [1]
    ) =>
      !! (args_slice)
      ? where ((
        portions = args_slice .split (',') .map (x => x .match (/([^\s=]+)\s*(?:=.+)?/) [1]),
        base_constructor = (...vals) => 
          R .objOf (key, R .fromPairs (R .zip (portions, vals)))) =>
        R .tap (_x => {{
          _x .__length = portions .length }}) (base_constructor) ) 
      : R .objOf (key, {}) ))))
var data_iso = data =>
  where ((
    read = where ((
      instance_template = data .apply (null, R .range (1, data .__length + 1)),
      inverted_object = R .invert (R .head (R .values (instance_template))),
      inversion_lens = R .from,
      disjoint_type = R .head (R .keys (instance_template)),
      records_list = ) =>
      instance =>
        records_list .map (lens => L .get (lens) (instance) )),
    write = list =>
      data .apply (null, list) ) =>
    L .iso (read) (write))




var fro = (from_nothing, from_just) => (maybe = maybe) => 
  !! (Z .isJust (maybe))
  ? from_just (Z .fromMaybe_ (_ => {}) (maybe))
  : from_nothing
var map_just = fn => fro (Z .Nothing, _x => Z .Just (fn (_x)))

var every = x => where ((
    every = S .data (),
    next = _ => {;
      ;every (defined)
      ;setTimeout (next, x)},
    _ = setTimeout (next, x)
  ) =>
  every)











document .addEventListener ('DOMContentLoaded', _ => {;
	;; document .body .appendChild (window .view)
})














window .Surplus = Surplus
window .stuff = { ...window .stuff,
  xx, oo, Oo, L, R, S, Z, memoize, TimelineMax,
  where, go, defined, data,
  fro, map_just , every }