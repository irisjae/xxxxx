var L = require ('partial.lenses')
var R = require ('ramda')
var S = require ('s-js')
var sanc = require ('sanctuary')
var Z$ = require ('sanctuary-def')
var Z = sanc .create ({ checkTypes: false, env: [] })
var Z_ = Z .unchecked
var Surplus = require ('surplus')
//report to adam haile
//var S = require ('s-js/dist/withsubclocks')
//;Surplus .S = S
//;Surplus .S .effect = S
var memoize = require ('fast-memoize')
var T = _x => _fn_obj =>
	!! (_fn_obj .constructor === Array) //Z_ .is (Z$ .Array (Z$ .Any)) (_fn_obj)
	? !! equals ([]) (_fn_obj)
		? _x
		: T (T (_x) (R .head (_fn_obj))) (R .tail (_fn_obj))
	: !! (_fn_obj .constructor === Function) //Z_ .is (Z$ .AnyFunction) (_fn_obj)
		? _fn_obj (_x)
  : panic ('T requires a function as its input')
var $ = form =>
  x =>
    T (x) (form)
var apply = fn => arg_list =>
  fn .apply (null, arg_list)

var I = _x => _x // = L .get ([]) = Z_ .I
var K = _x => _ => _x // = L .set ([]) = Z_ .K
var not = _x => ! _x
var equals = R .equals



var as_sole = L .singleton
var sole = list =>
  !! (list .length === 1) ? list [0]
  : panic (list + ' is not sole')









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





//TODO: check form of fn_form
var so = fn_form => 
	!! (fn_form .toString () .endsWith ('=>_'))
	? fn_form () ()
	: fn_form ()
var by = _meta_fn => x => T (x) (_meta_fn (x))
//var and_by = $ ([ by, Z .flip ])
var under = _lens => _fn => $ ([ L .get (_lens), map_defined (_fn) ])
var go = Promise .resolve ()
var never = new Promise (_ => {})
















var WeakMap = window .WeakMap
var __data_length = new WeakMap
var __data_lens = new WeakMap

var fiat = {}
var data = cons_definitions =>
	T (cons_definitions
	) (L .modify (L .values) ((def_fn, cons_label) => 
		so ((
		take
		, args_match = def_fn .toString () .match (/\(((?:.|\s)*?)\)\s*=>/) [1] )=>
		!! args_match ? so ((_=_=> 
      faux_cons,
      where
      , faux_cons = (...vals) => (
          { [cons_label]: R .fromPairs (R .zip (arg_labels, vals)) } )
			, arg_labels = args_match .split (/\(.+?\)/g) .join ('') .split (',') .map (x => x .match (/([^\s=]+)\s*(?:=.+)?/) [1])
      , $$1= __data_length .set (faux_cons, arg_labels .length)
      , $$2= __data_lens .set (faux_cons, [cons_label]) )=>_)
		: so ((_=_=> 
      faux_cons,
      where
      , faux_cons = { [cons_label]: {} }
      , $$1= __data_length .set (faux_cons, 0)
      , $$2= __data_lens .set (faux_cons, [cons_label]) )=>_))))

var cons_memoize = cons => 
  memoize (cons
  , { serializer: cons => {;
        if (! cons_memoize .ids .get (cons)) {
          ;var id = cons_memoize .next_id = (cons_memoize .next_id || 0) + 1
          ;cons_memoize .ids .set (cons, id) }
        return cons_memoize .ids .get (cons) } })
;cons_memoize .ids = new WeakMap

var data_lens = cons_memoize (cons =>
	so ((_=_=>
	faux_lens,
	where
	, faux_lens = __data_lens .get (cons)
	, $$1=
    !! not ((Z .is (Z$ .AnyFunction) (cons))) ? 'nothing'
    : so ((
      define
      , template = so ((_=_=> 
          T (cons) ([ apply, T (factors) ]),
          where
          , cons_length = __data_length .get (cons)
          , factors = Z_ .range (1) (cons_length + 1) )=>_)
      , records = T (template) ([ R .values, sole, R .keys ]) )=>
      T (records
      ) (
      R .forEach (_x => {;faux_lens [_x] = [faux_lens, _x]})) ))=>_))

var data_iso = cons_memoize (cons =>
	so ((_=_=>
	faux_lens,
	where
  //, cons_as_fn = 
	, template =
      !! not (Z .is (Z$ .AnyFunction) (cons)) ? cons
      : so ((_=_=> 
        T (cons) ([ apply, T (factors) ]),
        where
        , cons_length = __data_length .get (cons)
        , factors = Z_ .range (1) (cons_length + 1) )=>_)
	, inverted_template = T (template) ([ L .get ([ L .values, as_sole ]), R .invert ])
	, ordered_factors = T (inverted_template) (L .collect ([ L .keyed, R .sortBy (L .get (L .first)), L .elems, L .last ]))
  , order_record = record => T (ordered_factors) (L .modify () (_factor => record [_factor]))
	, cons_label = sole (R .keys (template))
	, read = _x =>
      L .get (cons_label) (_x)
	, write = record =>
      !! not (Z .is (Z$ .AnyFunction) (cons)) ? cons
      : so ((_=_=>
        T (cons) ([ apply, T (record_list) ]),
        where
        , record_list = ordered_factors .map (_x => record [_x]) )=>_)
	, faux_lens = L .iso (read) (write)
	, $$X = T (ordered_factors) (R .forEach (_x => {{
      ;faux_lens [_x] = [ faux_lens, _x ] }})) )=>_))
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
var data_kind = by (data =>
	L .get ([ L .keys, L .first ]))

var focused_iso_ = lens => point => 
  L .iso (L .get (lens), _x => L .set (lens) (_x) (point))











var n_reducer = binary => n => 
	!! (n === 1)
	? _x => _x
	: _a => _b =>
			n_reducer (binary) (n - 1) (binary (_a) (_b))
	
var l_sum = traversals =>
  [ L .pick (T (traversals) (L .get ([ L .indexed, L .inverse (L .keyed) ]))), L .values ]
	
	
	
	
	
	
	
	
	
var map_defined_ = default_ => fn => _x =>
	!! (_x === undefined)
	? default_
	: fn (_x)
var map_defined = map_defined_ (undefined)
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
//var maybe_all = Z_ .sequence (Z .Maybe)
/* var to_maybe = so ((_=_=>
  default_fn => _x => 
    !! (Z_ .is (maybe_type_$)) (_x)
    ? _x
    : default_fn (_x),
  where
  , maybe_type_$ = Z_ .MaybeType (Z$ .Any) )=>_) */






/*
var as_list = template =>
	L .iso
		(_x => template .map (lens => L .get (lens) (_x)))
		(_x => ({ px: _x [0], py: _x [1], vx :_x [2], vy: _x [3] }))
*/









//TODO: polyfill for S.sample as well
var just_now = _temporal => _temporal () .ref ()
var temporal = _init_val => so ((_=_=>
  faux_temporal,
  where 
  , _backing = S .data ({ ref: _ => _init_val })
  , _gone = S .data ({})
  , faux_temporal = (...args) => {;
      if (args .length) {
        ;_backing ({ ref: _ => args [0] }) }
      else {
        return _backing () } }
        //return _backing () && _backing () .ref () } }
  , $$1= S (_ => {;
      _gone (_backing (), {}) })
  , $$2= S (_ => {;
      // disable for now
      /*_gone (), S .sample (_backing) && (S .sample (_backing) .ref = _ => {;panic ('value is gone')})*/ }) )=>_)












/*var every = _x =>
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
	return done }}*/
var shuffle = list => {
	var array = []
	for (var i in list) {
		;array .push (list [i])}
	for (var i = array .length - 1; i > 0; i --) {
		var j = Math .floor (Math .random () * (i + 1))
		var arr_i = array [i]
		var arr_j = array [j]
		;array [i] = arr_j
		;array [j] = arr_i }
	
	return array }













document .addEventListener ('DOMContentLoaded', _ => {;
  var view = window .view .cloneNode (false)
  ;Object .keys (window) .filter (R .test (/^on/)) .map (R .slice (2, Infinity)) .forEach (event => {;
    ;view .addEventListener (event, e => {;
      var path = R .reverse (
        R .unfold (node => node != view && [ [... node .parentNode .children] .indexOf (node), node .parentNode ]
        , e .target))
      var target = R .reduce ((node, index) => node && node .children [index] || R .reduced (undefined), window .view, path) 
      if (target && event === 'input') {
        ;target .value = e .target .value }
      ;target && target .dispatchEvent (new e .constructor (e .type, e)) }) })
                                                      

  
	;document .body .appendChild (view)
  var dd = new (require ('diff-dom')) ({ valueDiffing: false })
  //var morphdom = require ('morph-dom')
  //var nanomorph = require ('nanomorph')
  var morph = goals => {;
    ;dd .apply (view, dd .diff (view, goals))
    ;[] .forEach .call (document .querySelectorAll ('input'), _input => {;_input .dispatchEvent (new Event ('input', { bubbles: true }))}) } 
  
    //;morphdom (view, goals) } 
    //;nanomorph (view, goals) }
  ;morph (window .view), (new MutationObserver (mutations => {;
    ;morph (window .view) }))
  .observe (window .view,
    { attributes: true
    , characterData: true
    , childList: true
    , subtree: true
    , attributeOldValue: true
    , characterDataOldValue: true })
  
  ;(new MutationObserver (mutations => {;
    ;mutations .forEach (mutation => {;
      if (mutation .type == 'attributes' && mutation .attributeName === 'z-identity') {;
        ;mutation .target .parentNode .insertBefore (mutation .target, mutation .target) } }) }))
  .observe (view, { attributes: true, subtree: true }) })






window .Surplus = Surplus
window .stuff = { ...window .stuff,
	T, $, apply, L, R, S, Z, Z_, Z$, sanc, memoize, 
	so, by, under,
	go, never, panic, panic_on,
  just_now, temporal,
	fiat, data, data_lens, data_iso, data_kind,
  focused_iso_,
	n_reducer, l_sum,
	map_defined_, map_defined, from_just, 
	as_sole, sole, shuffle,
  I, K, not, equals }