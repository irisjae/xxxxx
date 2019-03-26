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
//var and_by = $ ([ by, Z .flip ])
var go = Promise .resolve ()
var never = new Promise (_ => {})
















var Map = window .Map
var __data_length = new Map
var __data_lens = new Map

var fiat = {}
var data = cons_definitions =>
	T (cons_definitions
	) (L .modify (L .values) ((def_fn, cons_label) => 
		so ((
		suppose
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
	, { serializer: cons => {
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
	, $$X=
		!! not (Z .is (Z$ .AnyFunction) (cons)) ? 'nothing'
		: so ((
			suppose
			, marked_template = so ((_=_=> 
					T (cons) ([ apply, T (markers) ]),
					where
					, cons_length = __data_length .get (cons)
					, markers = R .range (1) (cons_length + 1) )=>_)
			, factors = T (marked_template) ([ R .values, sole, R .keys ]) )=>
			T (factors) (R .forEach (_x => {
				;faux_lens [_x] = [ faux_lens, _x ]})) ))=>_))

var data_iso = cons_memoize (cons =>
	so ((_=_=>
	faux_lens,
	where
	, cons_fn = factors =>
			!! not (Z .is (Z$ .AnyFunction) (cons)) ? cons
			: T (cons) ([ apply, T (factors) ])
	, marked_template = so ((_=_=> 
			cons_fn (markers),
			where
			, cons_length = __data_length .get (cons)
			, markers = R .range (1) (cons_length + 1) )=>_)
	, marked_factors = T (marked_template) ([ R .values, sole, R .invert ])
	, ordered_factors = T (marked_factors) (L .collect ([ L .keyed, R .sortBy (L .get (L .first)), L .elems, L .last ]))
	, record_to_factors = record => T (ordered_factors) (L .modify (L .elemsTotal) (_factor => record [_factor]))
	, cons_label = sole (R .keys (marked_template))
	, faux_lens = L .iso (L .get (cons_label)) ($ ([ record_to_factors, cons_fn ]))
	, $$X=
		T (ordered_factors) (R .forEach (_x => {
			;faux_lens [_x] = [ faux_lens, _x ] })) )=>_))
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

var pinpoint = L .forEach (I)
	
	
	
	
	
	
	
	
	
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










var last_n = n => memoize (signal => S .root (_ => S (([ _, ...last_n_less_one ]) => [ ...last_n_less_one, signal () ], (new Array (n)) )))



/*var every = _x =>
	so ((
	suppose
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











var assets =
	[ 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F10-secs.png?1541802334313'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F20-secs.png?1541802333656'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F30-secs.png?1541802334360'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fplay-to-win.png?1541802334914'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ffree-play.png?1550392925661'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftime-limit-play.png?1550392930019'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F3x3-off.png?1550827377940'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F3x3-on.png?1550827378072'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F4x4-off.png?1550827378248'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F4x4-on.png?1550827378011'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F5x5-off.png?1550827379773'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F5x5-on.png?1550827377693'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fmusic-off.png?1547792522660'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fmusic-on.png?1546759646100'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flion-title-bar.png?1547404084265'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flion-icon-bar.png?1546360012587'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fbunny-icon-bar.png?1546360012503'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fsolved.png?1541818699728'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fbingo-b.png?1547109352146'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fbingo-i.png?1547145040476'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fbingo-n.png?1547109352409'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fbingo-g.png?1547109352295'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fbingo-o.png?1547109352202'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fconfirm.png?1541818699969'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fcancel.png?1541818700002'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-preview.png?1541802334729'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fend-game.png?1541802334772'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-start.png?1541802335124'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fview-students.png?1541802335642'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fconnect.png?1543381404627'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fjoin.png?1543381404734'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fshow-problem.png?1543385405259'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-01.png?1551418719974'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-02.png?1551418720246'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-03.png?1551418718368'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-04.png?1551418719719'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-05.png?1551418717084'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-06.png?1551418716071'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-07.png?1551418715724'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-08.png?1551418715504'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-09.png?1551418714885'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-10.png?1551418714335'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-11.png?1551418713882'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-12.png?1551418713432'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-13.png?1551418713081'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-14.png?1551418712479'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-15.png?1551418711525'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-16.png?1551418710773'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-17.png?1551418709978'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-18.png?1551418708978'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-19.png?1551418707820'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-20.png?1551418706968'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-21.png?1551418704300'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-22.png?1551418702559'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-23.png?1551418701239'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-24.png?1551418706671'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-25.png?1551418706209'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-26.png?1551418705894'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-27.png?1551418704883'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-28.png?1551418700089'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-29.png?1551418701615'
	, 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-30.png?1551418700665' ]
var preload = _img => {;(new Image ()) .src = _img}


document .addEventListener ('DOMContentLoaded', _ => {
	;assets .forEach (preload)																											
																											
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
	//var morphdom = require ('morph-dom')
	//var nanomorph = require ('nanomorph')
	var morph = goals => {
		;dd .apply (view, dd .diff (view, goals))
		;[] .forEach .call (document .querySelectorAll ('input'), _input => {;_input .dispatchEvent (new Event ('input', { bubbles: true }))}) } 
	
		//;morphdom (view, goals) } 
		//;nanomorph (view, goals) }
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
window .stuff = { ...window .stuff,
	T, $, apply, L, L_, R, S, Z, Z_, Z$, sanc, memoize, 
	faith, belief, show, mark, please, 
	Y, impure, jinx, suppose,
	so, by, 
	go, never, panic, panic_on,
	fiat, data, data_lens, data_iso, data_kind,
	focused_iso_,
	last_n, n_reducer, l_sum, pinpoint,
	map_defined_, map_defined, from_just, 
	as_sole, sole, shuffle,
	I, K, not, equals }
