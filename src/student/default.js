var {
  xx, oo, Oo, L, R, S, Z, Z_, Z$, sanc, memoize, TimelineMax,
  where, go, defined,
  data, data_lens, data_iso, data_kind,
  map_just, from_just, maybe_all,
  every, delay,
  bool, number, timestamp, string,
  list, map, maybe, nat, id, v,
  shuffle, uuid, api, post,
  student, question, answer, latency, ping, position,
  attempt, rendition, board, rules, setup,
  teacher_app, student_app, student_lookbehind,
  board_viewer,
  io, message, ensemble, 
  default_questions, default_rules,
  as_maybe, from_maybe,
  app_get_ready, app_playing, app_game_over,
  board_viewer_board, board_viewer_questions, board_viewer_history,
  lookbehind_nothing, lookbehind_bad_room, lookbehind_attempting, 
  io_inert, io_connecting,
  ensemble_questions, ensemble_rules,
  ensemble_ping, ensemble_start, ensemble_abort,
  ensemble_student_pings, ensemble_student_starts,
  ensemble_student_boards, ensemble_student_histories,
  app_setup, app_student, app_students, app_room,
  app_board, app_history,
  lookbehind_room, lookbehind_since, lookbehind_blocked,
  rendition_attempts,
  rules_size, setup_size,
  cell_answer, student_name,
  history_stepped,
  message_encoding, messages_encoding,
  assemble_students, schedule_start,
  teacher_app_get_ready_to_playing, 
  student_app_get_ready_to_playing, student_app_next_playing,
  student_app_to_board_viewer,
  board_viewer_current_question,
  board_viewer_crossed_answers, board_viewer_bingoes
} = window .stuff



var app_state = S .data (student_app .get_ready (Z .Nothing, Z .Nothing))
var lookbehind_state = S .data (student_lookbehind .nothing)
var ensemble_state = S .data (undefined)
var io_state = S .data (io .inert)










var clicking = ['click']


var pipeline_room_entry = _dom => {{
  var _input = _dom .querySelector ('input')
  var _button = _dom .querySelector ('button')
  ;_input .addEventListener ('keypress', _e => {{
    if (_e .keyCode === 13) {
      var value = _input .value
      ;_input .value = ''
      ;record_room (value) } }})
  ;clicking .forEach (click => {{
    ;_button .addEventListener (click, _e => {{
      var value = _input .value
      ;_input .value = ''
      ;record_room (value) }}) }}) }} 

var pipeline_name_entry = _dom => {{
  var _input = _dom .querySelector ('input')
  var _button = _dom .querySelector ('button')
  ;_input .addEventListener ('keypress', _e => {{
    if (_e .keyCode === 13) {
      var value = _input .value
      ;_input .value = ''
      ;go
      .then (_ => record_student (value))
      .then (_ => connect_room ()) } }})
  ;clicking .forEach (click => {{
    ;_button .addEventListener (click, _e => {{
      var value = _input .value
      ;_input .value = ''
      ;go
      .then (_ => record_student (value))
      .then (_ => connect_room ()) }}) }}) }} 

var pipeline_board_cell = cell => _dom => {{
  ;clicking .forEach (click => {{
    ;_dom .addEventListener (click, _ => {{
      ;attempt_question (L .get (cell_answer, cell)) }}) }}) }}
          
var room_entry_view = <room-entry-etc>
  <code fn={ pipeline_room_entry } >
    <input placeholder="Enter a room code" />
    <button> Go </button> </code>
  { !! L .isDefined (lookbehind_bad_room) (lookbehind_state ())
    ? where ((
        bad_room = Oo (lookbehind_state (), oo (L .get (lookbehind_room)))) =>
      <message>{bad_room} is not a valid room</message> )
    : [] } </room-entry-etc>
  
var student_entry_view = <student-entry-etc>
  <name fn={ pipeline_name_entry } >
    <input placeholder="Enter your name" />
    <button> Go </button>
  </name> </student-entry-etc>

var get_ready_view = _ => <get-ready-etc>
  { Oo (app_state (),
    oo (L .get (L .pick ({
      room: [app_room, as_maybe],
      student: [app_student, as_maybe] }))),
    oo (({ room, student }) =>
      !! Z .isNothing (room)
      ? !! (L .isDefined (io_inert, io_state ()))
        ? room_entry_view
        : !! (L .isDefined (io_connecting, io_state ()))
        ? 'Finding room...'
        : undefined
      : !! Z .isNothing (student)
      ? !! (L .isDefined (io_inert, io_state ()))
        ? student_entry_view
        : !! (L .isDefined (io_connecting, io_state ()))
        ? 'Trying to join room...'
        : undefined
      : where ((
        { plain_room, plain_student } = from_just (maybe_all ({ plain_room: room, plain_student: student })) ) =>
      [ <room> {'Connected to room ' + plain_room } </room>
      , 'Waiting for game to start...' ]
      .map (_x => <div>{ _x }</div>)))) } </get-ready-etc>

var crossed = _x => <s>{ _x }</s>
var bold_crossed = _x => <s><b>{ _x }</b></s>
var board_view = _ => <board-etc>
  { Oo (app_state (), oo (student_app_to_board_viewer),
    oo (Z_ .maybe ([]) (_board_viewer =>
      where ((
        board = Oo (_board_viewer, oo (L .get (board_viewer_board))),
        current_question = Oo (_board_viewer, oo (board_viewer_current_question)),
        crossed_answers = Oo (_board_viewer, oo (board_viewer_crossed_answers)),
        bingoes = Oo (_board_viewer, oo (board_viewer_bingoes)),
        game_tick = game_tick_sampler () ) => 
      [ Oo (current_question,
        oo (Z_ .maybe ('') (_x => <question>{ _x }</question>))) 
      , <ticker>{ Oo (game_tick, oo (Z_ .maybe ('') (t => 10 - t))) }</ticker>
      , <board> { Oo (board, oo (Z_ .map (row => 
        <row> { Oo (row, oo (Z_ .map (cell => Oo (cell,
          oo (L .get (cell_answer)),
          oo (_x => !! (R .any (Z .elem (_x)) (bingoes))
            ? <cell>{ bold_crossed (_x) }</cell>
            : !! (Z .elem (_x) (crossed_answers))
            ? <cell>{ crossed (_x) }</cell>
            : <cell fn={ pipeline_board_cell (cell) }>{ _x }</cell> )))))
        } </row> ))) } </board> ])))) } </board-etc>



window .view = <student-app>
	{ !! (L .isDefined (app_get_ready) (app_state ()))
    ? get_ready_view
    : !! (L .isDefined (app_playing) (app_state ()))
    ? board_view
    : !! (L .isDefined (app_game_over) (app_state ()))
    ? board_view
    : undefined } </student-app>














/*
var lookbehind_latency = _ => {
    var now = game_clock .time ()
    var start = Oo (game_clock .getLabelTime ('next'),
      oo (_x => !! (_x === -1) ? 0 : _x))
    return now - start }
*/
       
       
       
       
       
var record_room = _room => {{
  var _student = Oo (app_state (), oo (L .get ([ app_student, as_maybe ])))
  ;go 
  .then (_ =>
    (io_state (io .connecting), api (_room) .then (_x => {{
      if (Z .equals (_x) ({})) {
        ;throw new Error ('empty') }
      else {
        var _ensemble = Oo (_x,
          oo (L .get (L .getInverse (data_iso (ensemble .ensemble)))))
        var _questions = Oo (_ensemble, oo (L .get (ensemble_questions)))
        var _rules = Oo (_ensemble, oo (L .get (ensemble_rules)))
        var _setup = setup .setup (_room, _questions, default_rules)
        ;app_state (
          student_app .get_ready ( _student, _setup )) } }})) )
    .catch (_e => {{
      ;lookbehind_state (student_lookbehind .bad_room (_room))
      ;console .error (_e) }})
    .then (_ => {{
      ;io_state (io .inert) }}) }}

var record_student = _name => {{
  var _setup = Oo (app_state (), oo (L .get ([ app_setup, as_maybe ])))
  ;app_state (
    student_app .get_ready (
      Z .Just ([ uuid (), _name ])
      ,_setup )) }}

var connect_room = _ => {{
  ;Oo (app_state (), oo (L .get (L .pick ({
    _student: [ app_student, as_maybe ],
    _room: [ app_room, as_maybe ] }))),
  oo (maybe_all),
  oo (map_just (({ _student, _room }) => {{
    var _setup
    ;return go 
    .then (_ =>
      (io_state (io .connecting), api (_room) .then (_x => {{
        if (Z .equals (_x) ({})) {
          ;throw new Error ('empty') }
        else {
          var _ensemble = Oo (_x,
            oo (L .get (L .getInverse (data_iso (ensemble .ensemble)))))
          var _questions = Oo (_ensemble, oo (L .get (ensemble_questions)))
          var _rules = Oo (_ensemble, oo (L .get (ensemble_rules)))
          ;_setup = setup .setup (_room, _questions, default_rules)
          return _x } }})) )
    .then (_ =>
      api (_room, post (message_encoding (
        message .student_ping (_student, [0, 0, 0]) ))) .then (_x => {{
        if (! _x .ok) {
          ;throw new Error ('not ok') }
        else return _x }}) )
    .then (_ => {{ 
      ;app_state (
        student_app .get_ready (Z .Just (_student), Z .Just (_setup))) }})
    .catch (_e => {{
      ;lookbehind_state (student_lookbehind .bad_room (_room))
      ;console .error (_e) }})
    .then (_ => {{
      ;io_state (io .inert) }}) }}))) }} 

var attempt_question = _answer => {{
  Oo (app_state (), oo (student_app_to_board_viewer),
    oo (Z_ .maybe (Z .Nothing) (board_viewer_current_question)),
    oo (map_just (_question => {{
      if (! L .get (lookbehind_blocked) (lookbehind_state ())) {
        var latency = game_clock .time () //lookbehind_latency ()
        if (Z .equals (_answer) (_question)) {
          ;Oo (app_state (),
            oo (L .set
              ([app_history, L .last, rendition_attempts, L .append])
              ([_answer, latency])),
            oo (student_app_next_playing),
            oo (_x => {{ ;app_state (_x) }})) }
        else {
          ;Oo (app_state (),
            oo (L .set
              ([app_history, L .last, rendition_attempts, L .append])
              ([_answer, latency])),
            oo (_x => {{ ;app_state (_x) }}))
          ;lookbehind_state (student_lookbehind .attempting (game_clock .time (), true)) } } }}))) }}

var timesup_question = _ => {{
  ;app_state (student_app_next_playing (app_state ())) }}












var game_clock = new TimelineMax
var game_tick_sampler = S .data (Z .Nothing)
;game_clock .add (timesup_question, 10)
;Oo (R .range (0, 10 + 1),
  oo (R .forEach (t => game_clock .add (_ => {{ ;game_tick_sampler (Z .Just (t)) }}, t))))


var reping_period = 3
var heartbeat = S .data (reping_period) 

var connection = S (_ => {{
  ;return Oo (app_state (),
    oo (L .get ([ app_room, as_maybe ])),
    oo (Z_ .maybe (undefined) (_room => {{
      if (! connection [_room]) {
        ;connection [_room] = S .data ()
        ;api .listen_ping (_room) (connection [_room]) }
      return connection [_room] () && where ((
        [mean, variance, n, timestamp] = connection [_room] () ) =>
      [timestamp, mean, Math .sqrt (variance)]) }} ))) }})



S (_ => {{
  if (L .isDefined (lookbehind_bad_room) (lookbehind_state ())) {
    ;var forget = setTimeout (_ => {{
      ;lookbehind_state (student_lookbehind .nothing) }}
    , 1500)
    ;S .cleanup (_ => {{
      ;clearTimeout (forget) }}) } }})
S (last_app => {{
  if (! L .isDefined (app_room) (last_app)) {
    if (L .isDefined (app_room) (app_state ())) {
      ;lookbehind_state (student_lookbehind .nothing) } }
  return app_state () }}
  , app_state ())
S (last_app => {{
  var last_history = Oo (last_app, oo (L .get ([app_history]))) || []
  var history = Oo (app_state (), oo (L .get ([app_history])))
  if (L .isDefined (app_playing) (app_state ())) {
    if (history_stepped (last_history) (history)) {
      ;lookbehind_state (0, false) } }
  return app_state () }}
  , app_state ())
S (_ => {{
  if (L .get (lookbehind_blocked) (lookbehind_state ())) {
    ;var forget = setTimeout (_ => {{
      var _since = Oo (lookbehind_state (), oo (L .get (lookbehind_since)))
      ;lookbehind_state (student_lookbehind .attempting (_since, false)) }}
    , 3000)
    ;S .cleanup (_ => {{
      ;clearTimeout (forget) }}) } }})


S (_ => {{
  if (L .isDefined (app_get_ready) (app_state ())) {
    ;game_clock .pause () } }})
S (last_state => {{
  var last_history = Oo (last_state, oo (L .get ([app_history]))) || []
  var history = Oo (app_state (), oo (L .get ([app_history])))
  if (L .isDefined (app_playing) (app_state ())) {
    if (history_stepped (last_history) (history)) {
      ;game_clock .seek (0) }
    ;game_clock .play () }
  return app_state () }}
  , app_state ())
S (_ => {{
  if (L .isDefined (app_game_over) (app_state ())) {
    ;game_clock .pause () } }})


S (last_ensemble => {{
  ;Oo ({
    last_ensemble: last_ensemble,
    _app: S .sample (app_state),
    _ensemble: ensemble_state () },
  oo (({ last_ensemble, _app, _ensemble }) => {{
    if (L .isDefined (app_get_ready) (_app)) {
      if (! L .get (ensemble_start) (last_ensemble)) {
        if (L .get (ensemble_start) (_ensemble)) {
          var start = Oo (_ensemble, oo (L .get (ensemble_start)))
          var now = (new Date) .getTime ()
          
          var playing_app = student_app_get_ready_to_playing (_app)
          if (start > now) {
            ;app_state (playing_app) }
          else {
            ;setTimeout (_ => {{
              ;app_state (playing_app) }}
            , start - now) }
          
          var _room = Oo (_app, oo (L .get (app_room)))
          var _student = Oo (_app, oo (L .get (app_student)))
          ;(io_state (io .messaging), api (_room, post (
            message_encoding (
              message .student_start (_student, start)))))
          .catch (_e => {{
            ;console .error (_e) }})
          .then (_ => {{
            ;io_state (io .inert) }}) } } } }}))
  return ensemble_state () }}
  , ensemble_state ())


S (_ => {{
  ;Oo (app_state (), oo (L .get (L .pick ({
    _student: [ app_student, as_maybe ],
    _room: [ app_room, as_maybe ] }))),
  oo (maybe_all),
  oo (map_just (({ _student, _room }) => {{
    var phase = heartbeat ()
    var critical = phase === 1
    go
    .then (_ =>
      !! critical && S .sample (connection)
      ? (io_state (io .messaging), api (_room, 
        post (messages_encoding (
          Z_ .concat
            ([ message .student_ping (_student, S .sample (connection)) ])
            (Oo (app_state (), oo (L .get (L .pick ({
                _board: [ app_board, as_maybe ],
                _history: [ app_history, as_maybe ] }))),
              oo (maybe_all),
              oo (Z_ .maybe ([]) (({ _board, _history }) => 
                [ message .student_join (_student, _board)
                , message .student_update (_student, _history) ] )))) ))))
      : (io_state (io .heartbeat), api (_room)
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