var app = require ('koa-websocket') (new require ('koa'))

app
.ws
.use(function(ctx, next) {
  // return `next` to pass the context (ctx) on to the next ws middleware
  return next(ctx);
})
.use(route.all('/test/:id', function (ctx) {
  ctx.websocket.send('Hello World');
  ctx.websocket.on('message', function(message) {
    console.log(message);
  });
}))
 
app.listen(3000);