var WritableStream = require('stream').Writable;
var statusCodes = require('http-status-codes');
var ws = require('ws');

var K = x => y => x

class Response extends WritableStream {
	constructor (socket, head) {
		;super ()

		var self = this

		;self .upgraded = false
		;self .socket = socket
		;self .head = head
		;self .finished = false
		;self .headersSent = false
		;self .headers = {}
		;self .statusCode = 200
		;self .statusMessage = undefined
		;self .sendDate = true

		;self .on ('finish', _ => {
			;self ._write (null, null, K ())
			;self .finished = true }) }

	_write (chunk, encoding, callback) {
		if (! this .headersSent) {
			;this .writeHead (this .statusCode, this .statusMessage, this .headers) }
		if (this .upgraded){
			/* if (this .websocket && ! chunk && this .websocket .readyState == ws .OPEN) {
				;this .websocket .close (this .statusCode == 500 ? 1011 : 1000) } */
			;callback () }
		else {
			if (! chunk) {
				;this .socket .end (callback) }
			else {
				;this .socket .write (chunk, encoding, callback) } } }

	addTrailers () {}

	getHeader (name) {
		return this .headers [name] }

	removeHeader (name){
		if (this .headersSent) {
			;throw new Error ('Headers have already been sent') }
		;delete this .headers [name] }

	setHeader (name, value){
		if (this .headersSent) {
			;throw new Error ('Headers have already been sent') }
		;this .headers [name] = value }

	setTimeout (ms, cb) {}

	writeContinue () {}

	writeHead (code, message, headers) {
		if (this .headersSent) {
			;throw new Error('Headers have already been sent') }
		if (!this .upgraded){
			;this .socket .write ('HTTP/1.1 ' + code + ' ' + (message || statusCodes .getStatusText (code)) + '\r\n')
			for (var header in headers) {
				;this .socket .write (header + ': ' + headers [header] + '\r\n') }
			;this .socket .write ('\r\n') }
		;this.headersSent = true }

	upgrade (req) {
		var self = this

		if (self .headersSent) {
			;throw new Error ('Headers have already been sent') }

		;self .upgraded = true
		return new Promise ((resolve, reject) => {
			var failure = _ => {;reject (new Error ('Upgrade failed'))}

			;self .socket .on ('finish', failure)
			;( new ws .Server ({ noServer: true })
			) .handleUpgrade (req, self .socket, self .head, conn => {
				;self .socket .removeListener ('finish', failure)
				;self .websocket = conn
				;resolve (conn) }) }) } }

module .exports = Response;
