var {
  Oo, xx, oo, R, L, S, Z, TimelineMax,
  defined, data, do_,
  number, string, list, maybe, id,
  fro, map_just, shuffle, every,
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
  rendition_attempts,
  rules_size, setup_size,
  cell_answer, 
  log_consensus,
  student_app_ready_to_during, student_app_next_during,
  crossed_answers, current_question } = window .stuff




var app_state = S .data (student_app .ready (Z .Nothing))
var io_state = S .data (io .inert)











var crossed = _x => <s>{ _x }</s>
var board_view = board => history => <div>
  <ticker>{ 10 - tick_sampler () }</ticker>
  <board> { Oo (board, oo (R .map (row => 
    <div> { Oo (row, oo (R .map (cell => Oo (cell,
      oo (L .get (cell_answer)),
      oo (_x => !! (Z .elem (_x) (crossed_answers (app_state ())))
        ? <span>{ crossed (_x) }</span>
        : <span fn={ pipeline_cell_attempt (cell) }>{ _x }</span> ))))) } </div> ))) } </board> </div>




var clicking = ['click']

var pipeline_cell_attempt = cell => span => {;
  ;clicking .forEach (click => {;
    ;span .addEventListener (click, _ => {;
      ;question_attempt (L .get (cell_answer, cell)) }) }) }

var pipeline_room_input = input => {;
  input .addEventListener ('keypress', e => {;
    if (e .keyCode === 13) {
      var value = input .value
      ;input .value = ''
      ;get_room (value) }})} 

window .view = <div>
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
</div>














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

var get_latency = now => {
    var last_fail = clock .getLabelTime ('fail')
    if (last_fail === -1) last_fail = 0
    return now - last_fail }

var valid_attempt = _ => {
  if (Z .size (Z .fromMaybe ([]) (L .get ([app_history, L .last, rendition_attempts, as_maybe], app_state ()))) === 0)
    return true
  else {
    return get_latency (clock .time ()) > 3}}

var question_attempt = _x => {
  if (valid_attempt ()) {
    var now = clock .time ()
    var latency = get_latency (now)
    if (Z .equals (Z .Just (_x)) (current_question (app_state ()))) {
      ;Oo (app_state (),
        oo (L .set ([app_history, L .last, rendition_attempts, L .append], [_x, latency])),
        oo (student_app_next_during),
        oo (_x => {;app_state (_x)}))}
    else {
      ;Oo (app_state (),
        oo (L .set ([app_history, L .last, rendition_attempts, L .append], [_x, latency])),
        oo (_x => {;app_state (_x)}))
      ;clock .add ('fail', now) } } }

var question_timesup = _ => {
  ;app_state (student_app_next_during (app_state ()))}






var clock = new TimelineMax
clock .add (question_timesup, 10)
Oo (R .range (0, 10 + 1),
  oo (R .forEach (t => clock .add (_ => {;tick_sampler (t)}, t))))

var tick_sampler = S .data (Z .Nothing)

S (_ => {
  if (L .isDefined (app_ready, app_state ())) {
    ;clock .pause () } })
S (last_state => {
  if (L .isDefined (app_during, app_state ())) {
    if (! Z .equals (Z .size (Z .fromMaybe ([]) (L .get ([app_history, as_maybe], last_state)))) (Z .size (L .get (app_history, app_state ())))) {
      ;clock .seek (0)
      ;clock .remove ('fail')}
    ;clock .play () }
  return app_state () }
  , app_state ())
S (_ => {
  if (L .isDefined (app_done, app_state ())) {
    ;clock .pause () }})

Oo (student_app_ready_to_during (
    student_app .ready (Z .Just (setup .setup ('test', default_questions, default_rules)))),
  oo (map_just (_x => {;app_state (_x)})))