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
  rules_size,  
  log_consensus, student_app_ready_to_during, crossed_answers } = window .stuff




//var app_state = S .data (state .ready (Z .Nothing))
var app_state = S .data (
  fro (undefined, x => x) (student_app_ready_to_during (
    student_app .ready (Z .Just (
      setup .setup ('test', default_questions, default_rules))))))
var io_state = S .data (io .inert)




var crossed = _x => <s>{ _x }</s>
var board_view = board => history =>
<div> { Oo (board, oo (R .map (row => 
    <span> { Oo (row, oo (R .map (cell =>
      <span> { Oo (cell [2],
        oo (_x => !! (Z .elem (_x) (crossed_answers (app_state ())))
          ? crossed (_x)
          : _x )) } </span>))) } </span> ))) } </div>


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
    ? board_view (L .get (app_board, app_state ())) (L .get (app_history, app_state ()))
    : !! (L .isDefined (app_ready, app_state ()))
    ? !! (L .isDefined (io_connecting, io_state ()))
      ? 'Trying to connect...'
      : Oo (L .get ([app_room, as_maybe], app_state ()),
        oo (fro (
          <input fn={ pipeline_room_input } />,
          x => 'Connected to room ' + x)))
    : defined}
</div>)
