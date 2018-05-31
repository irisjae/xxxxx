var Oo = window .Oo
var oo = window .oo
var R = window .R
var S = window .S
var Z = window .sanctuary

var defined

var number = defined
var string = defined
var list = a => defined
var maybe = a => defined
var id = string

var data = constructors => Oo (constructors,
  oo (R .map ((fn, key) => {
    var args_slice = fn .toString() .match (/\((.+?)\)/) [1]
    var portions = args_slice .split (',')
    return (...vals) => 
      R .objOf (key, Z .fromPairs (R .zip (portions, vals)))})))



var fro = (from_nothing, from_just) => (maybe = maybe) => 
  Z .reduce ((_, x) => from_just (x), from_nothing, maybe)


document .addEventListener ('DOMContentLoaded', _ => {;
	;; document .body .appendChild (window .view)
})
