var Oo = window .Oo
var oo = window .oo
var R = window .R
var L = window .L
var S = window .S
var Z = window .Z
var data = window .data
var fro = window .fro
var defined = window .defined
var number = window .number
var string = window .string
var list = window .list
var maybe = window .maybe
var id = window .id
var do_ = window .do_
var api = window .api
var shuffle = window .shuffle






var student = id
var question = string
var progress = number


var rules = data ({ rules: (time_limit = number, size = number) => defined })
var default_rules = rules .rules (10, 10)

var setup = data ({ setup: ( room = room, questions = list (question), rules = rules ) => defined })

var state = data ({
	ready: ( setup = maybe (setup) ) => defined,
	during: ( stats, completed_questions = progress, setup = setup ) => defined,
	done: () => defined })
var io_state = data ({
  inert: () => defined,
  connecting: () => defined })


//var the_state = S .data (state .ready (Z .Nothing))
var the_state = S .data (state .ready (Z .Just (setup .setup ('test', shuffle ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'), default_rules))))
var io_state = S .data (io_state .inert)




var state_ready = ['ready']
var state_during = ['during']
var state_done = ['done']
var state_setup = [L .choices ('ready', 'during'), 'setup']
var setup_room = ['setup', 'room']
var setup_questions = ['setup', 'questions']
var setup_rules = ['setup', 'rules']
var state_students = [L .choices ('ready', 'during'), 'students']

var io_inert = ['inert']
var io_connecting = ['connecting']

var state_room = [ state_setup, setup_room ]
var as_maybe = [L .reread (x => Z .Just (x)), L .defaults (Z .Nothing)]



var pipeline_room_input = input => {;
  input .addEventListener ('keypress', e => {;
    if (e .keyCode === 13) {
      var value = input .value
      ;input .value = ''
      ;get_room (value) }})} 


var get_room = id => {;
  ;io_state (io_state .connecting)
  do_ 
	.then (_ =>
    api (id)
    .then (x => {; if (x .length === 0) { ;throw new Error ('empty') } else return x }) )
	.then (x => {; 
    var consensus = log_consensus (x)
    var questions = L .get (consensus_questions, consensus)
    ;the_state (state .ready (setup .setup (id, questions, default_rules))) })
	.catch (e => { ;console .error (e) })
  .then (_ => {;io_state (io_state .inert)})} 

var consensus_questions = ['setup', 'questions'] 

var log_consensus = msgs =>
  R .reduce (R .mergeDeepRight, {}, msgs)

window .view = S .root (() => <div>
	{ !! (L .isDefined (io_connecting, io_state ()))
    ? 'Trying to connect...'
    : Oo (L .get ([state_room, as_maybe], the_state ()), oo (fro (
      <input fn={ pipeline_room_input } />,
      x => 'Connected to room ' + x))) }
</div>)
