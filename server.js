var R = require ('ramda')

var debug = true

var static_path = require ('path') .join (__dirname, 'static')



var where = _x => _x ()
var go = Promise .resolve ()





var rooms = {}

var clean_rooms = _ => {{
	var cleaning_time = (new Date) .getTime ()

	for (var i in rooms) {
		var ref_time = (rooms [i] || {}) .ref_time || 0

		if (cleaning_time > ref_time + 60 * 60 * 1000) {
			;delete rooms [i] }}

	;setTimeout (clean_rooms, 5 * 60 * 1000)
}}
;clean_rooms ()


module .exports = require ('koa-qs') (new (require ('koa')))
	.use (require ('koa-compress') ())
	.use (require ('koa-cors') ())
	.use (function (ctx, next) {
		return next ()
			.catch (function (err) {{
				{;console .error (err)}
				
				;ctx .type = 'application/json'
				;ctx .status = /*err .code || */500
				//;; ctx .message = err .message || 'Internal Server Error'
				;ctx .body = {
					error : err .message
				}
				if (debug) {
					;ctx .body .stack = err .stack
				}
			}})
	})
	.use (require ('koa-morgan') ('combined'))
	.use (require ('koa-bodyparser') ({ strict : false }))
	.use (require ('koa-json') ())
	.use (require ('koa-static') (static_path))
	.use (require ('koa-router') ()
    .post ('/room/:room', (ctx, next) => {{
      return go
      .then (_ => ctx .request .body)
      .then (_x => {{
        var id = ctx .params .room

        ;rooms [id] = { ... R .mergeDeepRight (rooms [id]) (_x), ref_time: (new Date) .getTime () } }})
        /*if (! rooms [id]) {
          ;rooms [id] = { logs: [] } }
        ;rooms [id] .ref_time = (new Date) .getTime ()
        ;rooms [id] .logs .push (_x) }})*/
      .then (_ => ({ ok: true }))
      .catch (_x => {{
        {;console .error (_x)}
        
        return ({ error: 'An unexpected error occured' }) }})
      .then (_x => {{;ctx .body = _x}})}})
    .get ('/room/:room', (ctx, next) => {{
      return go
      .then (_ =>
        where ((
          id = ctx .params .room) => (
        { ...rooms [id], ref_time: undefined } )))
          //(rooms [id] || {}) .logs || [] ))
      .catch (_x => {{
        {;console .error (_x)}
        
        return { error: 'An unexpected error occured' } }})
      .then (x => {{ ;ctx .body = x }})}})
    .get ('/peephole', (ctx, next) => {{
      return go
      .then (_ => rooms)
      .then (_x => {{;ctx .body = _x}})}})
    .routes ())