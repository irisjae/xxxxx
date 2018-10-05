var L = require ('partial.lenses')
var R = require ('ramda')
var S = require ('s-js')
var sanc = require ('sanctuary')
var Z$ = require ('sanctuary-def')
var Z = sanc .create ({ checkTypes: !true, env: sanc .env })
var Z_ = Z .unchecked
var Surplus = require ('surplus')
var memoize = require ('fast-memoize')
var TimelineMax = window .TimelineMax
var T = _x => _fn_obj =>
	!! Z_ .is (Z$ .Array (Z$ .Any)) (_fn_obj)
	? !! (Z_ .equals ([]) (_fn_obj))
		? _x
		: T (T (_x) (R .head (_fn_obj))) (R .tail (_fn_obj))
	: !! Z_ .is (Z$ .AnyFunction) (_fn_obj)
		? _fn_obj (_x)
		: panic ('T requires a function as its input')
var $ = form =>
  x =>
    T (x) (form)
var apply = fn => arg_list =>
  fn .apply (null, arg_list)










var panic = err => {{
	; throw new Error (err) }}
var panic_on = cases =>
	_x =>
		so ((
		take
		, triggered_case = T (cases) (R .find (([cond, _]) => cond (_x))) ) =>
		!! (triggered_case === undefined)
		? _x
		: T (triggered_case
			) (([_, err]) => {{
				;throw new Error (err) }}) )





var just_now = _temporary => _temporary ()
var temporary = x =>
  so ((_=_=>
  _temporary,
  where 
  , _temporary = _ => {;
      if (! _gone ()) {
        return x }
      else {
        ;_temporary = _ => panic ('value is gone') } }
  , _gone = S .data ()
  , $$1= _gone (true) )=>_)











//TODO: check form of fn_form
var so = fn_form => 
	!! (fn_form .toString () .endsWith ('=>_'))
	? fn_form () ()
	: fn_form ()
var by = _meta_fn => x => T (x) (_meta_fn (x))
var go = Promise .resolve ()

















var fiat
var data = cons_definitions =>
	T (cons_definitions
	) (R .mapObjIndexed ((def_fn, cons_name) => 
		so ((
		take
		, args_slice = def_fn .toString () .match (/\(((?:.|\s)*?)\)\s*=>/) [1] )=>
		!! (args_slice) ? so ((_=_=> 
      faux_cons,
      where
      , faux_cons = (...vals) => 
          R .objOf (cons_name) (R .fromPairs (R .zip (portions, vals)))
			, portions = args_slice .split (',') .map (x => x .match (/([^\s=]+)\s*(?:=.+)?/) [1])
      , $$1= __data_length .set (faux_cons, portions .length)
      , $$2= __data_lens .set (faux_cons, [cons_name]) )=>_)  
		: so ((_=_=> 
      faux_cons,
      where
      , faux_cons = {}
      , $$1= __data_length .set (faux_cons, 0)
      , $$2= __data_lens .set (faux_cons, [cons_name]) )=>_))))

var data_lens = data =>
	so ((_=_=>
	lens,
	where
	, lens = __data_lens .get (data)
	, $$1=
    !! (Z .is (Z$ .AnyFunction) (data)) ? so ((
      take
      , instance_template = so ((_=_=> so ((_=_=>
          T (data) (
          [ apply
          , T (factors) ]),
          where
          , factors = R .range (1, data_length + 1) )=>_),
          where
          , data_length = __data_length .get (data) )=>_)
      , records = T (instance_template) ([ R .values, R .head, R .keys ]) )=>
      T (records) (R .forEach (_x => {{ ;lens [_x] = [lens, _x] }})) )
    : 'nothing' )=>_)

var data_iso = data =>
	so ((_=_=>
	lens,
	where
	, instance_template =
    !! Z .not (Z .is (Z$ .AnyFunction) (data)) ? data
    : so ((_=_=> so ((_=_=>
      T (data) (
      [ apply
      , T (factors) ]),
      where
      , factors = R .range (1, data_length + 1) )=>_),
      where
      , data_length = __data_length .get (data) )=>_)
	//, factors = T (instance_template) ([ R .values, R .head, R .keys])
	, inverted_template = T (instance_template) ([ R .values, R .head, R .invert ])
	, ordered_factors = T (inverted_template) ([ R .toPairs, R .sortBy (R .head), R .map (R .last) ])
	, constructor_prefix = R .head (R .keys (instance_template))
	, read = data =>
		L .get (constructor_prefix) (data)
	, write = record =>
		so ((_=_=>
		data .apply (null, records_list),
		where
		, records_list = ordered_factors .map (_x => record [_x]) )=>_)
	, lens = L .iso (read) (write)
	, $$X = T (ordered_factors) (R .forEach (_x => {{
		;lens [_x] = [ lens, _x ] }})) )=>_)
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
	? _x => _x
	: _a => _b =>
			n_reducer (binary) (n - 1) (binary (_a) (_b))

var pair_zip_n = reducer => n_reducer (pair_zip (reducer))

var pair_zip = reducer => 
	so ((_=_=>
	a => b =>
		T (Z_ .tail (a)) (Z_ .maybe ([]) (a_tail =>
			T (pair_zip_fst_head (a) (b)) (Z_ .maybe_
				(_ =>
					pair_zip (reducer) (a_tail) (b))
				(({ zip_head, snd_zipper }) =>
					Z_ .prepend
					 (zip_head)
					 (pair_zip (reducer) (a_tail) (snd_zipper)))))),
	where
	, pair_zip_fst_head = fst => snd =>
		T (maybe_all ({
			fst_head: Z_ .head (fst),
			snd_head: Z_ .head (snd),
			snd_tail: Z_ .tail (snd) }
		)) (Z_ .chain (({ fst_head, snd_head, snd_tail }) =>
			so ((_=_=>
			!! (Z_ .equals (fst_head_key) (snd_head_key))
			? Z .Just ({
					zip_head:
						Z_ .Pair (fst_head_key)
							(reducer (fst_head_value) (snd_head_value)),
					snd_zipper: snd_tail })
			: T (pair_zip_fst_head (fst) (snd_tail)
				) (Z_ .map (({ zip_head, snd_zipper }) => (
					{ zip_head: zip_head,
						snd_zipper:
							Z_ .prepend (snd_head) (snd_zipper) }) )),
			where
			, fst_head_key = Z_ .fst (fst_head)
			, snd_head_key = Z_ .fst (snd_head)
			, fst_head_value = Z_ .snd (fst_head)
			, snd_head_value = Z_ .snd (snd_head) )=>_)) ) )=>_)


var pair_projection = key_projection => val_projection =>
	_x => Z_ .Pair (L .get (key_projection) (_x)) (L .get (val_projection) (_x))

	
	
	
	
	
	
	
	
	
	
var map_defined = fn => _x =>
	!! (_x === undefined)
	? undefined
	: fn (_x)
var from_just = _x =>
	Z_ .fromMaybe (undefined) (_x)
/*var maybe_all_list = list =>
	where ((
		_head = Z_ .head (list),
		_tail = Z_ .tail (list)) =>
	T (_head) (Z_ .maybe (Z .Just ([]))
		(maybe_head =>
			where ((
				maybe_tail = from_just (_tail) ) =>
			T (maybe_head) (Z_ .chain (bare_head =>
				T (maybe_all_list (maybe_tail)) (Z_ .chain (bare_tail =>
					Z_ .Just (Z_ .prepend (bare_head) (bare_tail))))))))))
var maybe_all = _x =>
	!! Z .is (Z$ .Array (Z$ .Any)) (_x)
	? maybe_all_list (_x)
	: !! Z .is (Z$ .Object) (_x)
	? T (_x) ([
			R .toPairs,
			Z_ .map (L .modify (L .first) (_x => Z_ .Just (_x))),
			Z_ .map (maybe_all_list),
			maybe_all_list,
			Z_ .map (R .fromPairs) ])
	: undefined
*/
var maybe_all = Z_ .sequence (Z .Maybe)


/*
var as_list = template =>
	L .iso
		(_x => template .map (lens => L .get (lens) (_x)))
		(_x => ({ px: _x [0], py: _x [1], vx :_x [2], vy: _x [3] }))
*/










var every = _x =>
	so ((
	take
	, every = S .data (false)
	, next = _ => {{
			;every (true)
			;setTimeout (next, _x) }}
	, $$X = setTimeout (next, _x) ) =>
	every)
var delay = time => {{
	var done = S .data (false)
	;setTimeout (_ => {{
		;done (true) }}
	, time)
	return done }}











document .addEventListener ('DOMContentLoaded', _ => {{
	;document .body .appendChild (window .view)
}})














window .Surplus = Surplus
window .stuff = { ...window .stuff,
	T, $, L, R, S, Z, Z_, Z$, sanc, memoize, TimelineMax,
	so, by, 
	go, panic, panic_on,
  just_now, temporary,
	fiat, data, data_lens, data_iso, data_kind,
	n_reducer, pair_zip_n, pair_zip, pair_projection,
	map_defined, from_just, maybe_all,
	every, delay }