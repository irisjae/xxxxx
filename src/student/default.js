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




//var app_state = S .data (state .ready (Z .Nothing))
var app_state = S .data (student_app .ready (Z .Just (setup .setup ('test', default_questions, default_rules))))
var io_state = S .data (io .inert)

var pipeline_room_input = input => {;
  input .addEventListener ('keypress', e => {;
    if (e .keyCode === 13) {
      var value = input .value
      ;input .value = ''
      ;get_room (value) }})} 


var get_room = id => {;
  ;io_state (io .connecting)
  do_ 
	.then (_ =>
    api (id)
    .then (x => {; if (x .length === 0) { ;throw new Error ('empty') } else return x }) )
	.then (x => {; 
    var consensus = log_consensus (x)
    var questions = L .get (consensus_questions, consensus)
    ;app_state (student_app .ready (setup .setup (id, questions, default_rules))) })
	.catch (e => { ;console .error (e) })
  .then (_ => {;io_state (io .inert)})} 

window .view = S .root (() => <div>
	{ !! (L .isDefined (state_during, app_state ()))
    ? board ()
    : !! (L .isDefined (state_during, app_state ()))
    ? !! (L .isDefined (io_connecting, io_state ()))
      ? 'Trying to connect...'
      : Oo (L .get ([state_room, as_maybe], app_state ()),
        oo (fro (
          <input fn={ pipeline_room_input } />,
          x => 'Connected to room ' + x)))
    : defined}
</div>)
