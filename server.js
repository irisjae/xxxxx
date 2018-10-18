var R = require ('ramda')

var debug = true

var static_path = require ('path') .join (__dirname, 'static')



var where = _x => _x ()
var go = Promise .resolve ()





var rooms = {}

var clean_rooms = _ => {;
	var cleaning_time = (new Date) .getTime ()

	for (var i in rooms) {
		var ref_time = (rooms [i] || {}) .ref_time || 0

		if (cleaning_time > ref_time + 60 * 60 * 1000) {
			;delete rooms [i] }}

	;setTimeout (clean_rooms, 5 * 60 * 1000) }
;clean_rooms ()

var post_room = room => _x => {;
  ;rooms [room] =
  { ... R .mergeDeepRight (rooms [room]) (_x)
  , ref_time : (new Date) .getTime () } }
var get_room = room =>0||
  { ...rooms [room]
  , ref_time : undefined }


module .exports = (app => (require ('./koa-upgrade') (app), app)) (require ('koa-qs') (new (require ('koa'))))
	.use (require ('koa-compress') ())
	.use (require ('koa-cors') ())
	.use (function (ctx, next) {
		return next ()
			.catch (function (err) {;
				{;console .error (err)}
				
				;ctx .type = 'application/json'
				;ctx .status = /*err .code || */500
				//;; ctx .message = err .message || 'Internal Server Error'
				;ctx .body = { error : err .message }
				if (debug) {
					;ctx .body .stack = err .stack } }) })
	.use (require ('koa-morgan') ('combined'))
	.use (require ('koa-bodyparser') ({ strict : false }))
	.use (require ('koa-json') ())
	.use (require ('koa-static') (static_path))
	.use (require ('koa-router') ()
    .use ('/room/:room', (ctx, next) => {;
      var id = ctx .params .room
      //TODO: add cleanup heartbeat code
      //TODO: try catch
      ;console .log ('websocket singing, connection is ' + ctx .get ('Connection'))
      if (ctx .get ('Connection') == 'upgrade'){
        ;console .log ('connection trying upgrade...')
        ;ctx .upgrade ()
        .then (connection => {;
          ;connection .on ('message', message => {;
            ;console .log ('connection received message ' + message + '...')
            ;message = JSON .parse (message)
            var track_id = message .id
            var method = message .method
            var body = message .body
            if (method === 'GET') {
              var _reply = get_room (id) }
            else if (method === 'POST') {
              ;post_room (id) (body)
              var _reply = { ok : true } }
            ;connection .send (JSON .stringify ({ id : track_id, body : _reply }), _error => {;console .error (_error)})
            ;console .log ('connection replied ', _reply) }) }) }
      else {
        /*var _error = 'A upgrade request was expected'
        {;console .error (_error)}
        ;ctx .body = { error : _error }*/ } })
    .post ('/room/:room', (ctx, next) => {;
      return go
      .then (_ => ctx .request .body)
      .then (_x => {;
        var id = ctx .params .room

        ;post_room (id) (_x)
        /*if (! rooms [id]) {
          ;rooms [id] = { logs: [] } }
        ;rooms [id] .ref_time = (new Date) .getTime ()
        ;rooms [id] .logs .push (_x) }})*/
      .then (_ => ({ ok : true }))
      .catch (_x => {;
        {;console .error (_x)}
        
        return { error: 'An unexpected error occured' } })
      .then (_x => {;ctx .body = _x})}) })
    .get ('/room/:room', (ctx, next) => {;
      return go
      .then (_ =>
        where ((
          id = ctx .params .room) =>
        get_room (id) ))
          //(rooms [id] || {}) .logs || [] ))
      .catch (_x => {;
        {;console .error (_x)}
        
        return { error: 'An unexpected error occured' } })
      .then (x => {;ctx .body = x})})
    .get ('/peephole', (ctx, next) => {;
      return go
      .then (_ => rooms)
      .then (_x => {;ctx .body = _x})})
    .routes ())