var {
  Oo, xx, oo, R, L, S, Z,
  defined, data, do_,
  number, string, list, maybe, id,
  fro, shuffle, every,
  post, api,
  board, rendition, rules, setup,
  teacher_app, student_app, io, message, consensus, 
  default_questions, default_rules,
  as_maybe,
  app_ready, app_during, app_done, app_setup,
  app_students, app_room, app_board, app_history,
  setup_room, setup_questions, setup_rules,
  io_inert, io_connecting,
  consensus_questions,
  log_consensus } = window .stuff




//var app_state = S .data (state .ready (Z .Nothing))
var app_state = S .data (student_app .ready (Z .Just (setup .setup ('test', default_questions, default_rules))))
var io_state = S .data (io .inert)




var board_view = board => history => <div> </div>


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
	{ !! (L .isDefined (app_during, app_state ()))
    ? Oo (board_view,
      xx (L .get (app_board, app_state ())),
      xx (L .get (app_history, app_state ())))
    : !! (L .isDefined (app_during, app_state ()))
    ? !! (L .isDefined (io_connecting, io_state ()))
      ? 'Trying to connect...'
      : Oo (L .get ([app_room, as_maybe], app_state ()),
        oo (fro (
          <input fn={ pipeline_room_input } />,
          x => 'Connected to room ' + x)))
    : defined}
</div>)
