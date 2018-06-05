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






var student = id
var question = string
var progress = number


var rules = data ({ rules: (time_limit = number, size = number) => defined })
var default_rules = rules .rules (10, 10)

var setup = data ({ setup: ( room = room, questions = list (question), rules = rules ) => defined })

var state = data ({
	prepare: ( setup = maybe (setup) ) => defined,
	during: ( stats, completed_questions = progress, setup = setup ) => defined,
	done: () => defined })
var io_state = data ({
  inert: () => defined,
  connecting: () => defined })


var the_state = S .data (state .prepare (Z .Nothing))
var the_io_state = S .data (io_state .inert)



var the_setup = ['setup']
var the_room = ['room', L .define (Z .Nothing), L .rewrite (x => Z .Just (x))]
var setup_room = [the_setup, the_room]

var the_inert = ['inert']
var the_connecting = ['connecting']



var pipeline_room_input = input => {;
  input .addEventListener ('keypress', e => {;
    if (e .keyCode === 13) {
      var value = input .value
      ;input .value = ''
      ;get_room (value) }})} 


var get_room = id => {;
  ;the_io_state (io_state .connecting)
  do_ 
	.then (_ =>
    api (id)
    .then (x => {; if (x .length === 0) { ;throw new Error ('empty') } else return x }) )
	.then (x => {; 
    var consensus = log_consensus (x)
    var questions = L .get (consensus_questions, consensus)
    ;the_state (state .prepare (setup .setup (id, questions, default_rules))) })
	.catch (e => { ;console .error (e) })
  .then (_ => {;the_io_state (io_state .inert)})} 

var consensus_questions = ['setup', 'questions'] 

var log_consensus = msgs =>
  R .reduce (R .mergeDeepRight, {}, msgs)

window .view = S .root (() => <div>
	{ !! (L .isDefined (the_connecting, the_io_state ()))
    ? 'Trying to connect...'
    : Oo (L .get (setup_room, the_state ()), oo (fro (
      <input fn={ pipeline_room_input } />,
      x => 'Connected to room ' + x))) }
</div>)
