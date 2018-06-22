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
var T = _x => _fn_obj =>
  !! Z_ .is (Z$ .Array (Z$ .Any)) (_fn_obj)
  ? !! (Z_ .equals ([]) (_fn_obj))
    ? _x
    : T (R .head (_fn_obj) (_x)) (R .tail (_fn_obj))
  : !! Z_ .is (Z$ .AnyFunction) (_fn_obj)
  ? _fn_obj (_x)
  : undefined















var defined
var where = x => x ()
var go = Promise .resolve ()


















var data = constructors => T (constructors)
  (R .mapObjIndexed ((fn, key) => 
    where ((
      args_slice = fn .toString () .match (/\(((?:.|\s)*?)\)\s*=>/) [1]
    ) =>
      !! (args_slice)
      ? where ((
        portions = args_slice .split (',') .map (x => x .match (/([^\s=]+)\s*(?:=.+)?/) [1])) =>
        T ((...vals) => 
          R .objOf (key) (R .fromPairs (R .zip (portions, vals)))) (
        R .tap (_x => {{
          ;__data_length .set (_x, portions .length)
          ;__data_lens .set (_x, [key]) }}))) 
      : T (R .objOf (key) ({})) (
        R .tap (_x => {{
          ;__data_length .set (_x, 0)
          ;__data_lens .set (_x, [key]) }})) )))

var data_lens = data =>
  where ((
    lens = __data_lens .get (data)) =>  
  !! Z .is (Z$ .AnyFunction) (data)
  ? where ((
      instance_template = data .apply (null, R .range (1, __data_length .get (data) + 1)),
      records = R .keys (R .head (R .values (instance_template))),
      _ = T (records) (R .forEach (_x => {{ ;lens [_x] = [lens, _x] }}))) =>
    lens)
  : lens)

var data_iso = data =>
  where ((
    instance_template = !! Z .is (Z$ .AnyFunction) (data)
      ? data .apply (null, R .range (1, __data_length .get (data) + 1))
      : data,
    //factors = T (instance_template) ([ R .values, R .head, R .keys]),
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
    _ = T (ordered_factors) (R .map (_x => {{
      ;lens [_x] = [ lens, _x ] }}))) =>
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










var n_reducer = binary => n => 
  !! (n === 1)
  ? _a => _a
  : _a => _b =>
      n_reducer (binary) (n - 1) (binary (_a) (_b))

var pair_zip_n = reducer => n_reducer (pair_zip (reducer))

var pair_zip = reducer => a => b =>
  where ((
    pair_zip_fst_head = fst => snd =>
      T (maybe_all ({
        fst_head: Z_ .head (fst),
        snd_head: Z_ .head (snd),
        snd_tail: Z_ .tail (snd) })) (
        Z_ .chain (({ fst_head, snd_head, snd_tail }) =>
          where ((
            fst_head_key = Z_ .fst (fst_head),
            snd_head_key = Z_ .fst (snd_head),
            fst_head_value = Z_ .snd (fst_head),
            snd_head_value = Z_ .snd (snd_head) ) =>
          !! (Z_ .equals (fst_head_key) (snd_head_key))
          ? Z .Just ({ zip_head:
                Z_ .Pair
                  (fst_head_key) (reducer (fst_head_value) (snd_head_value)),
              snd_zipper: snd_tail })
          : T (pair_zip_fst_head (fst) (snd_tail)
          ) (Z_ .map (({ zip_head, snd_zipper }) => (
              { zip_head: zip_head,
                snd_zipper:
                  Z_ .prepend
                   (snd_head) (snd_zipper) }) )) ))) ) =>
  !! (Z_ .size (a) === 0 || Z_ .size (b) === 0)
  ? []
  : where ((
      maybe_zip_head = pair_zip_fst_head (a) (b) ) =>
    T (maybe_zip_head) (Z_ .maybe_
      (_ =>
        pair_zip (reducer) (R .tail (a)) (b))
      (({ zip_head, snd_zipper }) =>
        Z_ .prepend
         (zip_head)
         (pair_zip (reducer) (R .tail (a)) (snd_zipper))))) )


var pair_projection = key_projection => val_projection =>
  _x => Z_ .Pair (L .get (key_projection) (_x)) (L .get (val_projection) (_x))



  
  
  
  
  
  
  
  
  
  
var from_just = _x =>
  Z_ .fromMaybe_ (_ => {}) (_x)
var maybe_all_list = list => where ((
  maybe_head = Z_ .head (list),
  maybe_tail = Z_ .tail (list)) =>
  T (maybe_head) (Z_ .maybe (Z .Just ([]))
    (plain_head => where ((
      plain_tail = from_just (maybe_tail),
      recursion = maybe_all_list (plain_tail)) =>
      T (plain_head) (Z_ .maybe (Z .Nothing)
        (just_head => T (recursion) (Z_ .maybe (Z .Nothing)
          (just_tail =>
            Z_ .Just (Z_ .prepend (just_head) (just_tail))))))))))
var maybe_all = _x =>
  !! Z .is (Z$ .Array (Z$ .Any)) (_x)
  ? maybe_all_list (_x)
  : !! Z .is (Z$ .Object) (_x)
  ? T (_x) ([ R .toPairs,
    R .map (L .modify (L .first) (_x => Z_ .Just (_x))),
    R .map (maybe_all_list),
    maybe_all_list,
    Z_ .map (R .fromPairs) ])
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
  T, L, R, S, Z, Z_, Z$, sanc, memoize, TimelineMax,
  where, go, defined,
  data, data_lens, data_iso, data_kind,
  from_just, maybe_all,
  every, delay }