var debug = true

var hostname = 'glitch' || 'localhost'
var port = process .env .PORT || 8080

var static_path = require ('path') .join (__dirname, 'static')



var rooms = {}



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
	.use (function (ctx, next) {

	})
	.use (require ('koa-static') (static_path))
	
	.listen (port)

;; console .log ('Listening at ' + hostname + ':' + port + '...')
