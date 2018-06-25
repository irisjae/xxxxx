var {
  T, L, R, S, Z, Z_, Z$, sanc, memoize, TimelineMax,
  where, go, defined,
  data, data_lens, data_iso, data_kind,
  from_just, maybe_all,
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
  question_view, question_answers,
  cell_position, position_lens,
  cell_answer, student_name,
  history_stepped,
  message_encoding, messages_encoding,
  assemble_students, schedule_start,
  teacher_app_get_ready_to_playing, 
  student_app_get_ready_to_playing, student_app_next_playing,
  student_app_to_board_viewer,
  matches_question_answer,
  board_viewer_current_question,
  board_viewer_crossed_positions, board_viewer_bingoed_positions
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
      ;attempt_question (T (cell) (L .get (cell_position))) }}) }}) }}
          
var room_entry_view = <room-entry-etc>
  <code fn={ pipeline_room_entry } >
    <input placeholder="Enter a room code" />
    <button> Go </button> </code>
  { !! L .isDefined (lookbehind_bad_room) (lookbehind_state ())
    ? where ((
        bad_room = T (lookbehind_state ()) (L .get (lookbehind_room))) =>
      <message>{bad_room} is not a valid room</message> )
    : [] } </room-entry-etc>
  
var name_entry_view = <student-entry-etc>
  <name fn={ pipeline_name_entry } >
    <input placeholder="Enter your name" />
    <button> Go </button>
  </name> </student-entry-etc>

var get_ready_view = _ => <get-ready-etc>
  { T (app_state ()) ([
    L .get (L .pick ({
      room: [app_room, as_maybe],
      student: [app_student, as_maybe] })),
    ({ room, student }) =>
      !! Z .isNothing (room)
      ? !! (L .isDefined (io_inert) (io_state ()))
        ? room_entry_view
        : !! (L .isDefined (io_connecting) (io_state ()))
        ? 'Finding room...'
        : undefined
      : !! Z .isNothing (student)
      ? !! (L .isDefined (io_inert) (io_state ()))
        ? name_entry_view
        : !! (L .isDefined (io_connecting) (io_state ()))
        ? 'Trying to join room...'
        : undefined
      : where ((
        { plain_room, plain_student } = from_just (maybe_all ({ plain_room: room, plain_student: student })) ) =>
      [ <room> {'Connected to room ' + plain_room } </room>
      , 'Waiting for game to start...' ]
      .map (_x => <div>{ _x }</div>)) ]) } </get-ready-etc>

var crossed = _x => <s>{ _x }</s>
var bold_crossed = _x => <s><b>{ _x }</b></s>
var playing_view = _ => <playing-etc>
  { T (app_state ()) ([ student_app_to_board_viewer,
    Z_ .maybe ([]) (_board_viewer =>
      where ((
        _board = T (_board_viewer) (L .get (board_viewer_board)),
        current_question = T (_board_viewer) (board_viewer_current_question),
        crossed_positions = T (_board_viewer) (board_viewer_crossed_positions),
        bingoed_positions = T (_board_viewer) (board_viewer_bingoed_positions),
        game_tick = game_tick_sampler () ) => 
      [ T (current_question)
        (Z_ .maybe ('') (_x => <question>{ _x }</question>))
      , <ticker>{ T (game_tick) (Z_ .maybe ('') (t => 10 - t)) }</ticker>
      , <board> { T (_board) (Z_ .map (row => 
        <row> { T (row) (Z_ .map (_cell =>
          where ((
            _cell_position = T (_cell) (L .get (cell_position)),
            _cell_answer = T (_cell) (L .get (cell_answer)),
            _cell_crossed = Z .elem (_cell_position) (crossed_positions),
            _cell_bingo = R .any (Z .elem (_cell_position)) (bingoed_positions) ) =>
          !! _cell_bingo
          ? <cell>{ bold_crossed (_cell_answer) }</cell>
          : !! _cell_crossed
          ? <cell>{ crossed (_cell_answer) }</cell>
          : <cell fn={ pipeline_board_cell (_cell) }>{ _cell_answer }</cell>) ))
          } </row> )) } </board> ] )) ]) } </playing-etc>

var game_over_view = _ =>
  where ((
    bingo_img = 'https://cdn.glitch.com/5a2d172b-0714-405a-b94f-6c906d8839cc%2Fimage5.png?1529492559081' ,
    student_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fimage18.png') =>
  <game-over-etc>
    <result-etc>
      <tabs>
        <button> Overview </button>
        <button> Question </button>
        </tabs>
      <id><img src={ student_img } />  (name) </id>
      <div a-logo> <img src={ bingo_img } /> </div>
      <table a-result>
        <tr>
          <th>Question</th>
          <th>Attempts</th>
          <th>Avg. Time</th>
          </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          </tr>
          </table>
          </result-etc>
          </game-over-etc>)         


window .view = <student-app>
	{ !! (L .isDefined (app_get_ready) (app_state ()))
    ? get_ready_view
    : !! (L .isDefined (app_playing) (app_state ()))
    ? playing_view
    : !! (L .isDefined (app_game_over) (app_state ()))
    ? game_over_view
    : undefined } </student-app>














/*
var lookbehind_latency = _ => {
    var now = game_clock .time ()
    var start = T (game_clock .getLabelTime ('next'))
      (_x => !! (_x === -1) ? 0 : _x)
    return now - start }
*/
       
       
       
       
       
var record_room = _room => {{
  var _student = T (app_state ()) (L .get ([ app_student, as_maybe ]))
  ;go 
  .then (_ =>
    (io_state (io .connecting), api (_room) .then (_x => {{
      if (Z .equals (_x) ({})) {
        ;throw new Error ('empty') }
      else {
        var _ensemble = T (_x)
          (L .get (L .getInverse (data_iso (ensemble .ensemble))))
        var _questions = T (_ensemble) (L .get (ensemble_questions))
        var _rules = T (_ensemble) (L .get (ensemble_rules))
        var _setup = setup .setup (_room, _questions, default_rules)
        ;app_state (
          student_app .get_ready ( _student, _setup )) } }})) )
    .catch (_e => {{
      ;lookbehind_state (student_lookbehind .bad_room (_room))
      ;console .error (_e) }})
    .then (_ => {{
      ;io_state (io .inert) }}) }}

var record_student = _name => {{
  var _setup = T (app_state ()) (L .get ([ app_setup, as_maybe ]))
  ;app_state (
    student_app .get_ready (
      Z .Just ([ uuid (), _name ])
      , _setup )) }}

var connect_room = _ => {{
  ;T (app_state ()) ([
    L .get (L .pick ({
      _student: [ app_student, as_maybe ],
      _room: [ app_room, as_maybe ] })),
    maybe_all,
    Z_ .map (({ _student, _room }) => {{
      var _setup
      ;return go 
      .then (_ =>
        (io_state (io .connecting), api (_room) .then (_x => {{
          if (Z .equals (_x) ({})) {
            ;throw new Error ('empty') }
          else {
            var _ensemble = T (_x)
              (L .get (L .getInverse (data_iso (ensemble .ensemble))))
            var _questions = T (_ensemble) (L .get (ensemble_questions))
            var _rules = T (_ensemble) (L .get (ensemble_rules))
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
        ;io_state (io .inert) }}) }}) ]) }} 

var attempt_question = _position => {{
  T (app_state ()) ([ student_app_to_board_viewer,
    Z_ .map (_board_viewer => {{
    //Z_ .chain (board_viewer_current_question),
      var _question = T (_board_viewer) ([ board_viewer_current_question, from_just  ])
      var _board = T (_board_viewer) (L .get (board_viewer_board))
      var _answer = T (_board) (L .get ([ position_lens (_position), cell_answer ]))
      if (! L .get (lookbehind_blocked) (lookbehind_state ())) {
        var latency = game_clock .time () //lookbehind_latency ()
        if (matches_question_answer (_question) (_answer)) {
          ;T (app_state ()) ([
            L .set
              ([app_history, L .last, rendition_attempts, L .append])
              ([_position, latency]),
            student_app_next_playing,
            _x => {{ ;app_state (_x) }} ]) }
        else {
          ;T (app_state ()) ([
            L .set
              ([app_history, L .last, rendition_attempts, L .append])
              ([_position, latency]),
            _x => {{ ;app_state (_x) }} ])
          ;lookbehind_state (student_lookbehind .attempting (game_clock .time (), true)) } } }}) ]) }}

var timesup_question = _ => {{
  ;app_state (student_app_next_playing (app_state ())) }}












var game_clock = new TimelineMax
var game_tick_sampler = S .data (Z .Nothing)
;game_clock .add (timesup_question, 10)
;T (R .range (0, 10 + 1)) (
  R .forEach (t => game_clock .add (_ => {{ ;game_tick_sampler (Z .Just (t)) }}, t)))


var reping_period = 3
var heartbeat = S .data (reping_period) 

var connection = S (_ => {{
  ;return T (app_state ()) ([
    L .get ([ app_room, as_maybe ]),
    Z_ .maybe (undefined) (_room => {{
      if (! connection [_room]) {
        ;connection [_room] = S .data ()
        ;api .listen_ping (_room) (connection [_room]) }
      return connection [_room] () && where ((
        [mean, variance, n, timestamp] = connection [_room] () ) =>
      [timestamp, mean, Math .sqrt (variance)]) }}) ]) }})



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
  var last_history = T (last_app) (L .get ([app_history])) || []
  var history = T (app_state ()) (L .get ([app_history]))
  if (L .isDefined (app_playing) (app_state ())) {
    if (history_stepped (last_history) (history)) {
      ;lookbehind_state (student_lookbehind .attempting (0, false)) } }
  return app_state () }}
  , app_state ())
S (_ => {{
  if (L .get (lookbehind_blocked) (lookbehind_state ())) {
    ;var forget = setTimeout (_ => {{
      var _since = T (lookbehind_state ()) (L .get (lookbehind_since))
      ;lookbehind_state (student_lookbehind .attempting (_since, false)) }}
    , 3000)
    ;S .cleanup (_ => {{
      ;clearTimeout (forget) }}) } }})


S (_ => {{
  if (L .isDefined (app_get_ready) (app_state ())) {
    ;game_clock .pause () } }})
S (last_state => {{
  var last_history = T (last_state) (L .get ([app_history, L .valueOr ([])]))
  var history = T (app_state ()) (L .get ([app_history]))
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
  ;T ({
    last_ensemble: last_ensemble,
    _app: S .sample (app_state),
    _ensemble: ensemble_state () }
  ) (({ last_ensemble, _app, _ensemble }) => {{
    if (L .isDefined (app_get_ready) (_app)) {
      if (! L .get (ensemble_start) (last_ensemble)) {
        if (L .get (ensemble_start) (_ensemble)) {
          var start = T (_ensemble) (L .get (ensemble_start))
          var now = (new Date) .getTime ()
          
          var playing_app = student_app_get_ready_to_playing (_app)
          if (start > now) {
            ;app_state (playing_app) }
          else {
            ;setTimeout (_ => {{
              ;app_state (playing_app) }}
            , start - now) }
          
          var _room = T (_app) (L .get (app_room))
          var _student = T (_app) (L .get (app_student))
          ;(io_state (io .messaging), api (_room, post (
            message_encoding (
              message .student_start (_student, start)))))
          .catch (_e => {{
            ;console .error (_e) }})
          .then (_ => {{
            ;io_state (io .inert) }}) } } } }})
  return ensemble_state () }}
  , ensemble_state ())


S (_ => {{
  ;T (app_state ()) ([
  L .get (L .pick ({
    _student: [ app_student, as_maybe ],
    _room: [ app_room, as_maybe ] })),
  maybe_all,
  Z_ .map (({ _student, _room }) => {{
    var phase = heartbeat ()
    var critical = phase === 1
    go
    .then (_ =>
      !! critical && S .sample (connection)
      ? (io_state (io .messaging), api (_room, 
        post (messages_encoding (
          Z_ .concat
            ([ message .student_ping (_student, S .sample (connection)) ])
            (where ((
              { _board, _history, not_playing } = T (app_state ()) ([
                L .get (L .pick ({
                  _board: [ app_board, as_maybe ],
                  _history: [ app_history, as_maybe ] })),
                maybe_all, Z .fromMaybe ({ not_playing: {} }) ]) ) =>
            !! (not_playing)
            ? []
            : [ message .student_join (_student, _board)
              , message .student_update (_student, _history) ]))
                 ))) )
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
      ;io_state (io .inert) }}) }}) ]) }})