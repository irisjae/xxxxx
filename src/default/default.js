var L = require ('partial.lenses')
var R = require ('ramda')
var S = require ('s-js')
var sanc = require ('sanctuary')
var Z$ = require ('sanctuary-def')
var Z = sanc .create ({ checkTypes: true, env: sanc .env })
var Z_ = Z .unchecked
var Surplus = require ('surplus')
var memoize = require ('fast-memoize')
var TimelineMax = window .TimelineMax
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















var defined
var where = x => x ()
var go = Promise .resolve ()


















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
          ;__data_lens .set (_x, [key]) }}))) ) 
      : Oo (R .objOf (key) ({}),
        oo (R .tap (_x => {{
          ;__data_length .set (_x, 0)
          ;__data_lens .set (_x, [key]) }}))) ))))

var data_lens = data =>
  where ((
    lens = __data_lens .get (data)) =>  
  !! Z .is (Z$ .AnyFunction) (data)
  ? where ((
      instance_template = data .apply (null, R .range (1, __data_length .get (data) + 1)),
      records = R .keys (R .head (R .values (instance_template))),
      _ = Oo (records, oo (R .forEach (_x => {{ ;lens [_x] = [lens, _x] }})))) =>
    lens)
  : lens)

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
    write = record =>
      where ((
        records_list = ordered_factors .map (_x => record [_x])) =>
      data .apply (null, records_list)),
    lens = L .iso (read) (write),
    _ = Oo (ordered_factors, oo (R .map (_x => {{
      ;lens [_x] = [ lens, _x ] }})))) =>
  lens)
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
var data_kind = data =>
  R .head (Z_ .keys (data))

var WeakMap = window .WeakMap
var __data_length = new WeakMap
var __data_lens = new WeakMap












var pair_zip = a => b =>
  where ((
    zip_init = list => mates =>
      !! (Z_ .size (list) === 0 || Z_ .size (mates) === 0)
      ? Z .Nothing
      : where ((
          list_head = R .head (list),
          mates_head = R .head (mates),
          list_head_key = list_head [0],
          mates_head_key = mates_head [0],
          list_head_value = list_head [1],
          mates_head_value = mates_head [1] ) =>
        !! (Z_ .equals (list_head_key) (mates_head_key))
        ? Z_ .Just (
            [ [ list_head_key, [ list_head_value, mates_head_value ] ]
            , R .tail (mates) ])
        : Oo (zip_init (list) (R .tail (mates)),
          oo (Z_ .map (([projection, tail_residue]) =>
            [projection, Z_ .prepend (mates_head) (tail_residue)] ))) ) ) =>
  !! (Z_ .size (a) === 0 || Z_ .size (b) === 0)
  ? []
  : where ((
      maybe_zip_head = zip_init (a) (b) ) =>
    Oo (maybe_zip_head, oo (Z_ .maybe_
      (_ =>
        pair_zip (R .tail (a)) (b)) 
      (([_zip_head, _mates_residue]) =>
        Z_ .prepend
         (_zip_head)
         (pair_zip (R .tail (a)) (_mates_residue)))))) )


var pair_projection = key_projection => val_projection =>
  _x => [L .get (key_projection) (_x), L .get (val_projection) (_x)]



  
  
  
  
  
  
  
  
  
  
var from_just = _x =>
  Z_ .fromMaybe_ (_ => {}) (_x)
var maybe_all_list = list => where ((
  maybe_head = Z_ .head (list),
  maybe_tail = Z_ .tail (list)) =>
  Oo (maybe_head, oo (Z_ .maybe (Z .Just ([]))
    (plain_head => where ((
      plain_tail = from_just (maybe_tail),
      recursion = maybe_all_list (plain_tail)) =>
      Oo (plain_head, oo (Z_ .maybe (Z .Nothing)
        (just_head => Oo (recursion, oo (Z_ .maybe (Z .Nothing)
          (just_tail =>
            Z_ .Just (Z_ .prepend (just_head) (just_tail)))))))))))))
var maybe_all = _x =>
  !! Z .is (Z$ .Array (Z$ .Any)) (_x)
  ? maybe_all_list (_x)
  : !! Z .is (Z$ .Object) (_x)
  ? Oo (_x, oo (R .toPairs),
    oo (R .map (L .modify (L .first) (_x => Z_ .Just (_x)))),
    oo (R .map (maybe_all_list)),
    oo (maybe_all_list),
    oo (Z_ .map (R .fromPairs)))
  : undefined


/*
var as_list = template =>
  L .iso
    (_x => template .map (lens => L .get (lens) (_x)))
    (_x => ({ px: _x [0], py: _x [1], vx :_x [2], vy: _x [3] }))
*/










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
  xx, oo, Oo, L, R, S, Z, Z_, Z$, sanc, memoize, TimelineMax,
  where, go, defined,
  data, data_lens, data_iso, data_kind,
  projection_zip, 
  from_just, maybe_all,
  every, delay }