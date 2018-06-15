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
var sanc = require ('sanctuary')
var Z$ = require ('sanctuary-def')
var Z = sanc .create ({ checkTypes: true, env: sanc .env })
var Surplus = require ('surplus')
var memoize = require ('fast-memoize')
var TimelineMax = window .TimelineMax




var where = x => x ()
var go = Promise .resolve ()

var WeakMap = window .WeakMap
var __data_length = new WeakMap
var __data_lens = new WeakMap

var defined
var data = constructors => Oo (constructors,
  oo (R .mapObjIndexed ((fn, key) => 
    where ((
      args_slice = fn .toString () .match (/\(((?:.|\s)*?)\)\s*=>/) [1]
    ) =>
      !! (args_slice)
      ? where ((
        portions = args_slice .split (',') .map (x => x .match (/([^\s=]+)\s*(?:=.+)?/) [1])) =>
        Oo ((...vals) => 
          R .objOf (key) (R .fromPairs (R .zip (portions, vals))),
        oo (R .tap (_x => {{
          ;__data_length .set (_x, portions .length)
          ;__data_lens .set (_x, key) }}))) ) 
      : R .objOf (key) ({}) ))))

var data_lens = data =>
  __data_lens .get (data)
var data_iso = data =>
  where ((
    instance_template = !! Z .is (Z$ .AnyFunction) (data)
      ? data .apply (null, R .range (1, __data_length .get (data) + 1))
      : data,
    //factors = Oo (instance_template, oo (R .values), oo (R .head), oo (R .keys)),
    inverted_template = R .invert (R .head (R .values (instance_template))),
    ordered_factors = R .map (R .last) (R .sortBy (R .head) (R .toPairs (inverted_template))),
    constructor_prefix = R .head (R .keys (instance_template)),
    read = data =>
      L .get (constructor_prefix) (data),
    write = records =>
      where ((
        records_list = ordered_factors .map (_x => records [_x])) =>
      data .apply (null, records_list)) ) =>
  L .iso (read) (write))
/*
var data_iso = data =>
  where ((
    read = where ((
      instance_template = data .apply (null, R .range (1, data .__length + 1)),
      inverted_template = R .invert (R .head (R .values (instance_template))),
      ordered_factors = R .map (R .last) (R .sortBy (R .head) (R .toPairs (inverted_template))),
      constructor_prefix = R .head (R .keys (instance_template)),
      lenses = ordered_factors .map (_x => [constructor_prefix, _x])) =>
      instance =>
        lenses .map (lens => L .get (lens) (instance) )),
    write = list =>
      data .apply (null, list) ) =>
    L .iso (read) (write))
*/


var from_just = _x =>
  Z .unchecked .fromMaybe_ (_ => {}) (_x)
var fro = (nothing_val, just_val) => (maybe = maybe) => 
  !! (Z .isJust (maybe))
  ? just_val (from_just (maybe))
  : nothing_val
var map_just = fn => fro (Z .Nothing, _x => Z .Just (fn (_x)))
var maybe_all_list = list => where ((
  maybe_head = Z .unchecked .head (list),
  maybe_tail = Z .unchecked .tail (list)) =>
  Oo (maybe_head, oo (fro (Z .Just ([]),
    plain_head => where ((
      plain_tail = from_just (maybe_tail),
      recursion = maybe_all_list (plain_tail)) =>
      Oo (plain_head, oo (fro (Z .Nothing,
        just_head => Oo (recursion, oo (fro (Z .Nothing,
          just_tail =>
            Z .Just (Z .unchecked .prepend (just_head) (just_tail)))))))))))))
var maybe_recurse = L .lazy (rec =>
  L .cond (
    [ R .is (Array), [L .elems, rec] ],
    [ R .is (Object), [L .values, rec] ],
    [ L .identity ]))


var every = _x => where ((
    every = S .data (false),
    next = _ => {{
      ;every (true)
      ;setTimeout (next, _x) }},
    _ = setTimeout (next, _x)
  ) =>
  every)
var delay = time => {{
  var done = S .data (false)
  ;setTimeout (_ => {{
    ;done (true) }}
  , time)
  return done }}











document .addEventListener ('DOMContentLoaded', _ => {;
	;; document .body .appendChild (window .view)
})














window .Surplus = Surplus
window .stuff = { ...window .stuff,
  xx, oo, Oo, L, R, S, Z, Z$, sanc, memoize, TimelineMax,
  where, go, defined,
  data, data_lens, data_iso,
  fro, map_just, from_just, maybe_all,
  every, delay }