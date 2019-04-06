var ws = require ('ws')
var Response = require ('./response')

var impure = fn => fn

module .exports = app => {
	var listen = app .listen
	var createContext = app .createContext
	//var server = new ws.Server({noServer:true});
	;app .listen = (... args) => {
		var server = listen .apply (app, args)
		;server .on ('upgrade', (req, sock, head) => {;server .emit ('request', req, new Response (sock, head))}) }
	;app .createContext = (req, res) => {
		var context = createContext .call (app, req, res)
		;context .upgrade = impure (_ => res .upgrade (req))
		return context } }
