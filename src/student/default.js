var {
  xx, oo, Oo, L, R, S, Z, Z_, Z$, sanc, memoize, TimelineMax,
  where, go, defined,
  data, data_lens, data_iso,
  map_just, from_just, maybe_all,
  every, delay,
  bool, number, timestamp, string,
  list, map, maybe, nat, id, v,
  shuffle, uuid, api, post,
  student, question, answer, latency, ping, position,
  attempt, rendition, board, rules, setup,
  teacher_app, teacher_lookbehind,
  student_app, student_lookbehind,
  io, message, ensemble, 
  default_questions, default_rules,
  as_maybe, from_maybe,
  app_get_ready, app_playing, app_game_over,
  setup_room, setup_questions, setup_rules,
  lookbehind_bad_attempt, lookbehind_bad_room, lookbehind_nothing,
  io_inert, io_connecting,
  ensemble_questions, ensemble_rules, ensemble_ping, ensemble_start, ensemble_abort,
  ensemble_student_pings, ensemble_student_boards, ensemble_student_starts, ensemble_student_histories,
  app_setup, app_student, app_students, app_room,
  app_board, app_history,
  lookbehind_room,
  rendition_attempts,
  rules_size, setup_size,
  cell_answer, student_name,
  message_encoding, messages_encoding,
  assemble_students, 
  student_app_get_ready_to_playing, student_app_next_playing,
  crossed_answers, current_question 
} = window .stuff



var app_state = S .data (student_app .get_ready (Z .Nothing, Z .Nothing))
var lookbehind_state = S .data (student_lookbehind .nothing)
var ensemble_state = S .data (undefined)
var io_state = S .data (io .inert)










var clicking = ['click']

var pipeline_student_input = input => {;
  ;input .addEventListener ('keypress', e => {;
    if (e .keyCode === 13) {
      var value = input .value
      ;input .value = ''
      ;make_student (value) }})} 

var pipeline_room_input = input => {;
  ;input .addEventListener ('keypress', e => {;
    if (e .keyCode === 13) {
      var value = input .value
      ;input .value = ''
      ;connect_room (value) }})} 

var pipeline_board_cell = cell => _dom => {;
  ;clicking .forEach (click => {;
    ;_dom .addEventListener (click, _ => {;
      ;attempt_question (L .get (cell_answer, cell)) }) }) }

var enter_student_view = <input fn={ pipeline_student_input } placeholder="Enter your name" />
          
var enter_room_view = <input fn={ pipeline_room_input } placeholder="Enter a room code" />
  
var get_ready_view = <get-ready-etc>
  { Oo (app_state (),
    oo (L .get (L .pick ({
      room: [app_room, as_maybe],
      student: [app_student, as_maybe] }))),
    oo (({ room, student }) =>
      !! Z .isNothing (student)
      ? enter_student_view
      : !! Z .isNothing (room)
        ? !! (L .isDefined (io_connecting, io_state ()))
          ? 'Trying to connect...'
          : Oo ([enter_room_view],
            oo (!! L .isDefined (lookbehind_bad_room) (lookbehind_state ())
              ? where ((
                  bad_room = Oo (lookbehind_state (), oo (L .get (lookbehind_room)))) =>
                Z .prepend (<warning>{bad_room} is not a valid room</warning>))
              : R .identity))
      : where ((
        { plain_room, plain_student } = from_just (maybe_all ({ plain_room: room, plain_student: student })) ) =>
      [ 'Connected to room ' + plain_room
      , 'Waiting for game to start...' ]
      .map (_x => <div>{ _x }</div>)))) } </get-ready-etc>

var crossed = _x => <s>{ _x }</s>
var board_view = board => history => <board-etc>
  { Oo (app_state (), oo (current_question), oo (Z_ .maybe ('') (_x => <question>{ _x }</question>))) }
  <ticker>{ Oo (tick_sampler, Z_ .maybe ('') (t => 10 - t)) }</ticker>
  <board> { Oo (board, oo (R .map (row => 
    <div> { Oo (row, oo (R .map (cell => Oo (cell,
      oo (L .get (cell_answer)),
      oo (_x => !! (Z .elem (_x) (crossed_answers (app_state ())))
        ? <cell>{ crossed (_x) }</cell>
        : <cell fn={ pipeline_board_cell (cell) }>{ _x }</cell> ))))) } </div> ))) } </board> </board-etc>

window .view = <student-app>
	{ where ((
      x = app_state ()) =>
    !! (L .isDefined (app_get_ready, x))
    ? get_ready_view
    : !! (L .isDefined (app_playing, x))
      ? board_view (L .get (app_board, x)) (L .get (app_history, x))
    : undefined) }
</student-app>














var make_student = name => {{
  ;app_state (student_app .get_ready (Z .Just ([ uuid (), name ]), L .get ([ app_setup, as_maybe ], app_state ()))) }}

var connect_room = room => {{
  Oo (app_state (), oo (L .get (app_student)), oo (_student => {{
    if (_student) {
      ;return go 
      .then (_ =>
        (io_state (io .connecting), api (room) .then (_x => {{
          if (Z .equals (_x) ({})) {
            ;throw new Error ('empty') }
          else return _x }})) )
      .then (_ =>
        api (room, post (message_encoding (
          message .student_ping (_student, [0, 0, 0]) ))) .then (_x => {{
          if (! _x .ok) {
            ;throw new Error ('not ok') }
          else return _x }}) )
      .then (_ensemble => {{ 
        var questions = Oo (_ensemble, oo (L .get (ensemble_questions)))
        var student = Oo (app_state (), oo (L .get ([ app_student, as_maybe ])))
        ;app_state (
          student_app .get_ready (student
          , Z .Just (setup .setup (room, questions, default_rules))))
        ;lookbehind_state (student_lookbehind .nothing) }})
      .catch (_e => {{
        ;lookbehind_state (student_lookbehind .bad_room (room))
        ;console .error (_e) }})
      .then (_ => {{
        ;io_state (io .inert) }}) } }})) }} 

/*
var valid_attempt = _ => 
  !! (where ((
      current_rendition_attempts = Oo (app_state (),
        oo (L .get ([app_history, L .last, rendition_attempts, as_maybe])),
        oo (Z .fromMaybe ([])))) =>
      Z .size (current_rendition_attempts) === 0))
  ? true
  : get_latency (clock .time ()) > 3
*/

var attempt_question = _x => {{
  if (L .isDefined (lookbehind_bad_attempt) (lookbehind_state ())) {
    var now = clock .time ()
    var latency = get_latency (now)
    if (Z .equals (Z .Just (_x)) (current_question (app_state ()))) {
      ;Oo (app_state (),
        oo (L .set ([app_history, L .last, rendition_attempts, L .append]) ([_x, latency])),
        oo (student_app_next_playing),
        oo (_x => {;app_state (_x)}))}
    else {
      ;Oo (app_state (),
        oo (L .set ([app_history, L .last, rendition_attempts, L .append]) ([_x, latency])),
        oo (_x => {;app_state (_x)}))
      ;clock .add ('next', now) } } }}

var timesup_question = _ => {{
  ;app_state (student_app_next_playing (app_state ())) }}










var reping_period = 3
var heartbeat = S .data (reping_period) 

var clock = new TimelineMax
clock .add (timesup_question, 10)
Oo (R .range (0, 10 + 1),
  oo (R .forEach (t => clock .add (_ => {;tick_sampler (Z .just (t))}, t))))

var tick_sampler = S .data (Z .Nothing)

var get_latency = now => {
    var start = Oo (clock .getLabelTime ('next'),
      oo (_x => !! (_x === -1) ? 0 : _x))
    return now - start }


S (lookbehind_key => {{
  if (lookbehind_key) {
    ;clearTimeout (lookbehind_key) }
  if (L .isDefined (data_iso (student_lookbehind .bad_room)) (lookbehind_state ())) {
    ;return setTimeout (_ => {{
       ;lookbehind_state (student_lookbehind .nothing) }}
    , 1500) }}})


S (_ => {{
  if (L .isDefined (app_get_ready, app_state ())) {
    ;clock .pause () } }})
S (last_state => {{
  if (L .isDefined (app_playing, app_state ())) {
    var last_history = Oo (last_state, oo (L .get ([app_history, as_maybe])), oo (Z .fromMaybe ([])))
    var history = Oo (app_state (), oo (L .get (app_history)))
    if (! Z .equals (Z .size (last_history)) (Z .size (history))) {
      ;clock .seek (0)
      ;clock .remove ('fail')}
    ;clock .play () }
  return app_state () }}
  , app_state ())
S (_ => {{
  if (L .isDefined (app_game_over, app_state ())) {
    ;clock .pause () } }})

S (_ => {{
  ;Oo (app_state (), oo (L .get (L .pick ({
      student: [ app_student, as_maybe ],
      room: [ app_room, as_maybe ] }))),
    oo (maybe_all),
    oo (map_just (({ student, room }) => {{
      var phase = heartbeat ()
      var critical = phase === 1
      go
      .then (_ =>
        !! critical && S .sample (connection)
        ? (io_state (io .messaging), api (room, 
            post (message_encoding (
              message .student_ping (student, S .sample (connection))))))
        : (io_state (io .heartbeat), api (room)
          .then (_x => {{
            ;ensemble_state (
              L .get (L .getInverse (data_iso (ensemble .ensemble))) (_x)) }})) )
      .then (_ => {{
        ;setTimeout (_ => {{
          ;heartbeat (!! critical ? reping_period : phase - 1) }}
        , 300) }})
      .catch (_e => {{
        ;console .error (_e)
        ;setTimeout (_ => {{
          ;heartbeat (phase) }}
        , 300) }})
      .then (_ => {{
        ;io_state (io .inert) }}) }}))) }})


var connection = S (_ => {{
  ;return Oo (app_state (),
    oo (L .get ([ app_room, as_maybe ])),
    oo (Z_ .maybe (undefined) (_room => {{
      if (! connection [_room]) {
        ;connection [_room] = S .data ()
        ;api .listen_ping (_room) (connection [_room]) }
      return connection [_room] () && where ((
        [mean, variance, n, timestamp] = connection [_room] () ) =>
      [timestamp, mean, Math .sqrt (variance)])  
    }} ))) }})