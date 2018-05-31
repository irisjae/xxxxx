var Oo = window .Oo
var oo = window .oo

window .L = require ('partial.lenses')
window .R = require ('ramda')
window .S = require ('s-js')
window .Z = require ('sanctuary') .create ({ checkTypes: true, env: require ('sanctuary') .env });
window .Surplus = require ('surplus')

var R = window .R
var Z = window .Z

var defined
window .defined = defined

window .number = defined
window .string = defined
window .list = a => defined
window .maybe = a => defined
window .id = window .string

window .data = constructors => Oo (constructors,
  oo (R .mapObjIndexed ((fn, key) => {
    var args_slice = fn .toString() .match (/\((.*?)\)/) [1]
    var portions = args_slice .split (',')
    return (...vals) => 
      R .objOf (key, Z .fromPairs (R .zip (portions, vals)))})))



window .fro = (from_nothing, from_just) => (maybe = maybe) => 
  Z .reduce ((_, x) => from_just (x), from_nothing, maybe)


document .addEventListener ('DOMContentLoaded', _ => {;
	;; document .body .appendChild (window .view)
})
