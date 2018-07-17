var go = Promise .resolve ()
var app = require ('koa-websocket') (new require ('koa'))

app
.ws
  .use ((ctx, next) => 
    go
    .then (next (ctx)))
  .use (require ('koa-router') ()
    .all ('/test/:id', ctx => {{
      ;ctx .websocket .send ('Hello World')
      ;ctx .websocket .on ('message', message => {{
        ;console .log (message) }}) }}))
 
app.listen(3000)