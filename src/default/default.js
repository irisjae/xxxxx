var xx = function (x) {
	return { xx: x } }
var oo = function (x) {
	return { oo: x } }

var Oo = function () {
	if ('oo' in arguments [1]) {
		var answer = arguments [0]
		for (var i = 1; i < arguments .length; i ++) {
			;answer = arguments [i] .oo (answer) }
		return answer }
	else if ('xx' in arguments [1]) {
		var answer = arguments [0]
		for (var i = 1; i < arguments .length; i ++) {
			;answer = answer (arguments [i] .xx) }
		return answer }
	else {
		;throw 'Syntax Error; no oo or xx after focus Oo;' } }



var L = require ('partial.lenses')
var R = require ('ramda')
var S = require ('s-js')
var Z = require ('sanctuary') .create ({ checkTypes: true, env: require ('sanctuary') .env });
var Surplus = require ('surplus')




var do_ = Promise .resolve ()


var defined
var data = constructors => Oo (constructors,
  oo (R .mapObjIndexed ((fn, key) => {
    var args_slice = fn .toString() .match (/\((.*?)\)\s*=>/) [1]
    if (args_slice) {
      var portions = args_slice .split (',') .map (x => x .match (/([^\s=]+)\s*(?:=.+)?/) [1])
      return (...vals) => 
        R .objOf (key, R .fromPairs (R .zip (portions, vals)))}
    else
      return R .objOf (key, {})})))





var fro = (from_nothing, from_just) => (maybe = maybe) => 
  !! (Z .isJust (maybe))
  ? from_just (Z .fromMaybe_ (_ => {}, maybe))
  : from_nothing

var every = x => {
  var every = S .data ()
  var next = _ => {;
    ;every (defined)
    ;setTimeout (next, x)}
  ;setTimeout (next, x)
  return every}





var api = (room, x) => fetch ('/log/' + room, x) .then (x => x .json ())




document .addEventListener ('DOMContentLoaded', _ => {;
	;; document .body .appendChild (window .view)
})














//--------------------TYPES--------------------

var number = defined
var string = defined
var list = a => defined
var maybe = a => defined
var id = window .string

var student = id
var question = string
var answer = question
var latency = number
var v = (...types) => defined


var attempt = data ({ attempt: (guess = answer, time = latency) => defined })
var performance = data ({ performance: (attempts = list (attempt)) => defined })
var history = data ({ history: (performances = list (performance)) => defined })

var rules = data ({ rules: (time_limit = number, size = number) => defined })

var setup = data ({ setup: ( room = room, questions = list (question), rules = rules ) => defined })


var teacher_app = data ({
	ready: ( setup = setup ) => defined,
	during: ( setup = setup, completed_questions = history ) => defined,
	done: ( setup = setup, completed_questions = history ) => defined })
var student_app = data ({
	ready: ( setup = maybe (setup) ) => defined,
	during: ( setup = setup, completed_questions = progress ) => defined,
	done: () => defined })
var io = data ({
  inert: () => defined,
  connecting: () => defined })


var message = data ({
  setup: ( questions = list (question), rules = rules ) => defined })
var consensus = data ({
  consensus: ( students = list (v (student, latency, history)), latency ) => defined })





var default_questions = shuffle ('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
var default_rules = rules .rules (10, 10)


var as_maybe = [L .reread (x => Z .Just (x)), L .defaults (Z .Nothing)]


var state_setup = [L .choices ('ready', 'during'), 'setup']
var setup_room = ['setup', 'room']
var setup_questions = ['setup', 'questions']
var setup_rules = ['setup', 'rules']
var state_students = [L .choices ('ready', 'during'), 'students']

var state_room = [ state_setup, setup_room ]
var as_maybe = [L .reread (x => Z .Just (x)), L .defaults (Z .Nothing)]

var state_ready = ['ready']
var state_during = ['during']
var state_done = ['done']
var state_setup = [L .choices (state_ready, state_during), 'setup']
var setup_room = ['setup', 'room']
var setup_questions = ['setup', 'questions']
var setup_rules = ['setup', 'rules']

var io_inert = ['inert']
var io_connecting = ['connecting']

var state_room = [ state_setup, setup_room ]


var consensus_questions = ['setup', 'questions'] 






var log_consensus = msgs =>
  R .reduce (R .mergeDeepRight, {}, msgs)







window .Surplus = Surplus
window .stuff = { ...window .stuff,
  xx, oo, Oo, L, R, S, Z, 
  do_, defined, data,
  number, string, list, maybe, id,
  fro, api, every }