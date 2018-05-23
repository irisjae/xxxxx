var debug = true

var hostname = 'glitch' || 'localhost'
var port = process .env .PORT || 8080

var static_path = require ('path') .join (__dirname, 'static')



var rooms = {}

var clean_rooms = _ => {
	var cleaning_time = new Date () .getTime ()

	for (var i in rooms) {
		var ref_time = (rooms [i] || {}) .ref_time || 0

		if (cleaning_time > ref_time + 60 * 60 * 1000) {
			; delete rooms [i] }}
}


;; require ('koa-qs') (new (require ('koa')) ())
	.use (require ('koa-compress') ())
	.use (require ('koa-cors') ())
	.use (function (ctx, next) {
		return next ()
			.catch (function (err) {
				;; console .error (err)
				
				;; ctx .type = 'application/json'
				;; ctx .status = /*err .code || */500
				//;; ctx .message = err .message || 'Internal Server Error'
				;; ctx .body = {
					error : err .message
				}
				if (debug) {
					;; ctx .body .stack = err .stack
				}
			})
	})
	.use (require ('koa-morgan') ('combined'))
	.use (require ('koa-bodyparser') ())
	.use (require ('koa-json') ())
	.use (require ('koa-static') (static_path))
	.use (require ('koa-router') () .post ('/log/:room', (ctx, next) => {
		return Promise .resolve ()
		.then (x => ctx .request .body)
		.then (x => {
			var id = ctx .params .room

			if (! rooms [id]) {
				; rooms [id] = { logs: [] } }
			; rooms [id] .ref_time = new Date () .getTime ()
			; rooms [id] .logs .push (x) })
		.then (x => ({ ok: true }))
		.catch (x => {
			;; console .error (x)
			return { error: 'An unexpected error occured' } })
		.then (x => { ;; ctx .body = x })
	}) .get ('/log/:room', (ctx, next) => {
		return Promise .resolve ()
		.then (_ => {
			var id = ctx .params .room

			return (rooms [id] || {}) .logs || [] })
		.catch (x => {
			;; console .error (x)
			return { error: 'An unexpected error occured' } })
		.then (x => { ;; ctx .body = x })
	}) .routes ())
	
	.listen (port)

;; console .log ('Listening at ' + hostname + ':' + port + '...')
