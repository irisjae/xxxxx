var L = require ('partial.lenses')
var R = require ('ramda')
//var S = require ('s-js')
var sanc = require ('sanctuary')
var Z$ = require ('sanctuary-def')
var Z = sanc .create ({ checkTypes: false, env: [] })
var Z_ = Z .unchecked
var Surplus = require ('surplus')
//var S = require ('s-js/dist/withsubclocks')
var { L_, S 
, T, Y, $, apply, I, K, not, equals, impure, jinx, panic, panic_on, by, suppose
, faith, belief, show, mark, please } = require ('camarche')
;Surplus .S = S
;Surplus .S .effect = S		 
var memoize = require ('fast-memoize')



var as_sole = L .singleton
var sole = list =>
	!! (list .length === 1) ? list [0]
	: panic (list + ' is not sole')




//TODO: check form of fn_form
var so = fn_form => 
	!! (fn_form .toString () .endsWith ('=>_'))
	? fn_form () ()
	: fn_form ()
var go = Promise .resolve ()
var never = new Promise (_ => {})
















var Map = window .Map
var __data_length = new Map
var __data_lens = new Map

var fiat = {}
var data = cons_definitions =>
	T (cons_definitions
	) (
	L .modify (L .values) ((def_fn, cons_label) => 
		suppose (
		( args_match = def_fn .toString () .match (/\(((?:.|\s)*?)\)\s*=>/) [1]
		) =>
		!! args_match
		?
			suppose (
			( _cons = (...vals) => (
					{ [cons_label]: R .fromPairs (R .zip (arg_labels, vals)) } )
			, arg_labels = args_match .split (/\(.+?\)/g) .join ('') .split (',') .map (x => x .match (/([^\s=]+)\s*(?:=.+)?/) [1])
			, $__record_arglength = __data_length .set (_cons, arg_labels .length)
			, $__record_lens = __data_lens .set (_cons, [cons_label])
			) =>
			_cons )
		:
			suppose (
			( _cons = { [cons_label]: {} }
			, $__record_arglength = __data_length .set (_cons, 0)
			, $__record_lens = __data_lens .set (_cons, [cons_label])
			) =>
			_cons ) ) ))

var cons_memoize = cons => 
	memoize (cons
	, { serializer: cons => {
		if (! cons_memoize .ids .get (cons)) {
			;cons_memoize .next_id = (cons_memoize .next_id || 0) + 1
			var id = cons_memoize .next_id
			;cons_memoize .ids .set (cons, id) }
		return cons_memoize .ids .get (cons) } })
;cons_memoize .ids = new Map

var data_lens = cons_memoize (cons =>
	suppose (
	( _lens = __data_lens .get (cons)
	, $__sub_lenses =
		!! not (cons .constructor === Function) ? 'nothing'
		: 
			suppose (
			( marked_template = so ((_=_=> 
					T (cons) ([ apply, T (markers) ]),
					where
					, cons_length = __data_length .get (cons)
					, markers = R .range (1) (cons_length + 1) )=>_)
			, factors = T (marked_template) ([ R .values, sole, R .keys ])
			) =>
			T (factors) (R .forEach (_x => {
				;_lens [_x] = [ _lens, _x ] })) )
	) =>
	_lens ) )

var data_iso = cons_memoize (cons =>
	suppose (
	( cons_fn = factors =>
		!! not (cons .constructor === Function) ? cons
		: T (cons) ([ apply, T (factors) ])
	, marked_template = suppose (
		( cons_length = __data_length .get (cons)
		, markers = R .range (1) (cons_length + 1)
		) =>
		cons_fn (markers) )
	, marked_factors = T (marked_template) ([ R .values, sole, R .invert ])
	, ordered_factors = T (marked_factors) (L .collect ([ L .keyed, R .sortBy (L .get (L .first)), L .elems, L .last ]))
	, record_to_factors = record => T (ordered_factors) (L .modify (L .elemsTotal) (_factor => L .get (_factor) (record)))
	, cons_label = sole (R .keys (marked_template))
	, _iso = L .iso (L .get (cons_label)) ($ ([ record_to_factors, cons_fn ]))
	, $__sub_lenses =
		T (ordered_factors) (R .forEach (_x => {
			;_iso [_x] = [ _iso, _x ] }))
	) =>
	_iso ) )


var data_kind = by (data =>
	L .get ([ L .keys, L .first ]))





/*var focused_iso_ = lens => point => 
	L .iso (L .get (lens), _x => L .set (lens) (_x) (point))*/
var l_point_sum = (... traversals) => x =>
	L .and ([ L .elems, _trav => L .isEmpty (_trav) (x) ]) (traversals)











var n_reducer = binary => n => 
	!! (n === 1)
	? _x => _x
	: _a => _b =>
			n_reducer (binary) (n - 1) (binary (_a) (_b))
	
var l_sum = traversals =>
	[ L .pick (T (traversals) (L .get ([ L .indexed, L .inverse (L .keyed) ]))), L .values ]

var pinpoint = L .forEach (I)
	
	
	
	
	
	
	
	
	
var map_defined_ = default_ => fn => _x =>
	!! (_x === undefined)
	? default_
	: fn (_x)
var map_defined = map_defined_ (undefined)
var from_just = _x =>
	Z_ .fromMaybe (undefined) (_x)










var last_n = n => memoize (signal => S .root (_ => S (([ _, ...last_n_less_one ]) => [ ...last_n_less_one, signal () ], (new Array (n)) )))



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











document .addEventListener ('DOMContentLoaded', _ => {
	var preload = _img => {;(new Image) .src = _img}
	;Object .values (window .stuff .img) .forEach (preload)
																											
	var view = window .view .cloneNode (false)
	;Object .keys (window) .filter (R .test (/^on/)) .map (R .slice (2, Infinity)) .forEach (event => {
		;view .addEventListener (event, e => {
			var path = R .reverse (
				R .unfold (node => node != view && [ [... node .parentNode .children] .indexOf (node), node .parentNode ]
				, e .target))
			var target = R .reduce ((node, index) => node && node .children [index] || R .reduced (undefined), window .view, path) 
			if (target && event === 'input') {
				;target .value = e .target .value }
			;target && target .dispatchEvent (new e .constructor (e .type, e)) }) })
																											

	
	;document .body .appendChild (view)
	var dd = new (require ('diff-dom')) ({ valueDiffing: false })
	var morph = goals => {
		;dd .apply (view, dd .diff (view, goals))
		;[] .forEach .call (document .querySelectorAll ('input'), _input => {;_input .dispatchEvent (new Event ('input', { bubbles: true }))}) } 
	
	;morph (window .view), (new MutationObserver (mutations => {
		;morph (window .view) }))
	.observe (window .view,
		{ attributes: true
		, characterData: true
		, childList: true
		, subtree: true
		, attributeOldValue: true
		, characterDataOldValue: true })
	
	;(new MutationObserver (mutations => {
		;mutations .forEach (mutation => {
			if (mutation .type == 'attributes' && mutation .attributeName === 'z-identity') {
				;mutation .target .parentNode .insertBefore (mutation .target, mutation .target) } }) }))
	.observe (view, { attributes: true, subtree: true }) })






window .Surplus = Surplus
window .stuff = { ... window .stuff,
	T, $, apply, L, L_, R, S, Z, Z_, Z$, sanc, memoize, 
	faith, belief, show, mark, please, 
	Y, impure, jinx, suppose,
	so, by, 
	go, never, panic, panic_on,
	fiat, data, data_lens, data_iso, data_kind,
	last_n, n_reducer, l_sum, l_point_sum, pinpoint,
	map_defined_, map_defined, from_just, 
	as_sole, sole, shuffle,
	I, K, not, equals }
