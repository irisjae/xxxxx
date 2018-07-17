var server = require ('./server')

var hostname = 'glitch' || 'localhost'
var port = process .env .PORT || 8080


{;server .listen (port)}
{;console .log ('Listening at ' + hostname + ':' + port + '...')}