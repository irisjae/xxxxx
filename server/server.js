var R = require ('ramda')
var L = require ('partial.lenses')

var debug = true

var static_path = require ('path') .join (__dirname, '../static')



var where = _x => _x ()
var go = Promise .resolve ()
var equals = a => b => R .equals (a) (b)
var impure = fn => fn
var jinx = _fn => {;_fn ()}
var K = x => y => x
var T = _x => _fn_obj =>
	        !! (_fn_obj .constructor === Array)
        ? !! equals ([]) (_fn_obj)
                ? _x
                : T (T (_x) (R .head (_fn_obj))) (R .tail (_fn_obj))
        : !! (_fn_obj .constructor === Function)
                ? _fn_obj (_x)
        : panic ('T requires a function as its input')
var $ = form => x => T (x) (form)
var suppose = fn_form => fn_form ()





var rooms = {}

var clean_rooms = _ => {
	var cleaning_time = (new Date) .getTime ()

	for (var i in rooms) {
		var ref_time = (rooms [i] || {}) .ref_time || 0

		if (cleaning_time > ref_time + 60 * 60 * 1000) {
			;delete rooms [i] }}

	;setTimeout (clean_rooms, 5 * 60 * 1000) }
;clean_rooms ()

var post_room = room => _x => {
	;rooms [room] = (
		L .remove (L .satisfying (equals (null)))
		) (
		{ ... R .mergeDeepRight (rooms [room]) (_x)
		, ref_time : + (new Date) } ) }
var get_room = room => (
	{ ... rooms [room]
	, ref_time : undefined } )


module .exports = (app => (require ('./koa-upgrade') (app), app)) (require ('koa-qs') (new (require ('koa'))))
	.use (require ('koa-compress') ())
	.use (require ('koa-cors') ())
	.use ((ctx, next) =>
		go .then (next)
		.catch (err => {
			;console .error (err)
			
			;ctx .type = 'application/json'
			;ctx .status = /*err .code || */500
			//;; ctx .message = err .message || 'Internal Server Error'
			;ctx .body = { error : err .message }
			if (debug) {
				;ctx .body .stack = err .stack } } ) )
	.use (require ('koa-morgan') ('combined'))
	.use (require ('koa-bodyparser') ({ strict : false }))
	.use (require ('koa-json') ())
	.use (require ('koa-static') (static_path))
	.use (require ('koa-router') ()
	.use ('/room/:room', (ctx, next) => {
		var id = ctx .params .room
		//TODO: add cleanup heartbeat code (necessary? maybe not)
		//TODO: try catch
		if (ctx .get ('Connection') == 'upgrade') {
			return go
				.then (impure (ctx .upgrade))
				.then (connection => {
					;connection .on ('message', _message => {
						var message = JSON .parse (_message)
						var track_id = message .id
						var method = message .method
						var body = message .body
						if (method === 'GET') {
							var _reply = get_room (id) }
						else if (method === 'POST') {
							;post_room (id) (body)
							var _reply = { ok : true } }
						;connection .send (JSON .stringify ({ id : track_id, body : _reply })) }) }) }
		else {
			return go .then (next) } })
	.post ('/room/:room', impure ((ctx, next) => 
		go
		.then (K (ctx .request .body))
		.then (
			suppose (
			( id = ctx .params .room
			) =>
			impure (post_room (id)) ) )
		.then (K ({ ok : true }))
		.catch ($ (
			[ err => {;console .error (err)}
			, K ({ error: 'An unexpected error occured' }) ] ) )
		.then (x => {;ctx .body = x}) ) )
	.get ('/room/:room', impure ((ctx, next) => 
		go
		.then (K (
			suppose (
			( id = ctx .params .room
			) =>
			get_room (id) ) ))
		//(rooms [id] || {}) .logs || [] ))
		.catch ($ (
			[ err => {;console .error (err)}
			, K ({ error: 'An unexpected error occured' }) ] ) )
		.then (x => {;ctx .body = x}) )
	.get ('/peephole', impure ((ctx, next) => 
		go
		.then (K (rooms))
		.then (x => {;ctx .body = x}) ))
	.routes ())
