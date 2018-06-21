var {
  xx, oo, Oo, L, R, S, Z, Z_, Z$, sanc, memoize, TimelineMax,
  where, go, defined,
  data, data_lens, data_iso, data_kind,
  projection_zip,
  map_just, from_just, maybe_all,
  every, delay 
} = window .stuff


var shuffle = list => {
  var array = []
  for (var i in list) {
    ;array .push (list [i])}
  for (var i = array. length - 1; i > 0; i --) {
    var j = Math .floor (Math .random () * (i + 1))
    var arr_i = array [i]
    var arr_j = array [j]
    ;array [i] = arr_j
    ;array [j] = arr_i }
  
  return array }




var uuid = _ =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' .replace (/[xy]/g, c =>
    where ((
      r = Math .random () * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8)) =>
    v .toString (16) ))



var _ping_cache = {}
var _ping_listeners = {}

var api = (room, _x) => {{
  var begin = performance .now ()
  return fetch ('/room/' + room, _x) .then (_x => {{
    var end = performance .now ()
    var sample = end - begin
    if (! _ping_cache [room]) {
      ;_ping_cache [room] = [0, 0, 0, 0]}
    ;_ping_cache [room] = Oo (_ping_cache [room],
      oo (L .get (L .pick ({
        mean: 0,
        sqr_mean: 1,
        n: 2 }))),
      oo (({mean, sqr_mean, n}) => where ((
        carry = n / (n + 1) ) =>
      [ mean * carry + sample / (n + 1)
      , sqr_mean * carry + (sample * sample) / (n + 1)
      , n + 1
      , (new Date) .getTime () ])))
    ;(_ping_listeners [room] || []) .forEach (fn => {{ ;fn (_ping_cache [room]) }})
    return _x .json () }}) }}
;api .listen_ping = room => fn => {{ 
  if (! _ping_listeners [room]) {
    ;_ping_listeners [room] = [] }
  ;_ping_listeners [room] .push (fn)
  if (_ping_cache [room]) {
    ;fn (_ping_cache [room]) } }}



var post = x => ({
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json' },
  body: JSON .stringify (x) })




//--------------------TYPES--------------------

var bool = defined
var number = defined
var timestamp = number
var string = defined
var list = a => defined
var map = a => (...b) => list (v (a, ...b))
var maybe = a => defined
var nat = defined
var id = string
var v = (...types) => defined

var student = v (id, string)
var question = v (string, list (answer))
var answer = question
var timeinterval = number
var latency = timeinterval
var position = v (nat, nat)
var ping = v (timestamp, latency, latency)

var attempt = v (answer, timeinterval)


var rendition = data ({ rendition: (attempts =~ list (attempt)) => defined })
var board = data ({ board: (answers =~ map (position) (answer)) => defined})

var rules = data ({ rules: (time_limit =~ number, size =~ nat) => defined })
var setup = data ({ setup: ( room =~ room, questions =~ list (question), rules =~ rules ) => defined })


var teacher_app = data ({
	get_ready: ( setup =~ setup, students =~ list (student) ) => defined,
	playing: ( setup =~ setup, students =~ map (student) (board, list (rendition)) ) => defined,
	game_over: ( setup =~ setup, students =~ map (student) (board, list (rendition)) ) => defined })

var student_app = data ({
	get_ready: ( student =~ maybe (student), setup =~ maybe (setup) ) => defined,
	playing: ( student =~ student, setup =~ setup, board =~ board, history =~ list (rendition) ) => defined,
	game_over: ( student =~ student, setup =~ setup, board =~ board, history =~ list (list (rendition)) ) => defined })

/*
var teacher_lookbehind = data ({
  nothing: () => defined,
  bad_room: () => defined })
*/

var student_lookbehind = data ({
  nothing: () => defined,
  bad_room: (room =~ room) => defined,
  attempting: (since =~ latency, blocked =~ bool) => defined })

var io = data ({
  inert: () => defined,
  connecting: () => defined,
  messaging: () => defined,
  heartbeat: () => defined })


var message = data ({
  teacher_setup: ( questions =~ list (question), rules =~ rules ) => defined,
  teacher_ping: ( ping =~ ping ) => defined,
  teacher_start: ( synchroziation =~ timestamp ) => defined,
  teacher_abort: ( synchroziation =~ timestamp ) => defined,
  student_ping: ( student =~ student, ping =~ ping ) => defined,
  student_start: ( student =~ student, synchronization =~ timestamp ) => defined,
  student_join: ( student =~ student, board =~ board ) => defined,
  student_update: ( student =~ student, history =~ list (rendition) ) => defined })
var ensemble = data ({
  ensemble: (
    ping =~ ping,
    questions =~ list (question),
    rules =~ rules,
    start =~ timestamp,
    abort =~ maybe (timestamp),
    student_starts =~ map (student) (timestamp),
    student_pings =~ map (student) (ping),
    student_boards =~ map (student) (board),
    student_histories =~ map (student) (history) ) => defined })


var board_viewer = data ({
  board_viewer: (board =~ board, questions =~ list (question), history =~ history) => defined })


//--------------------DEFAULTS--------------------



var default_questions = shuffle ('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
/* var default_questions = shuffle ([
  ['1/2', ['2/4', '3/6']],
  ['1/3', ['2/6', '3/9']],
  ['2/3', ['4/6', '6/9']],
  ['1/4', ['2/8', '3/12']],
  ['3/4', ['6/8', '9/12']],
  ['1/5', ['2/10', '3/15']],
  ['2/5', ['4/10', '6/15']],
  ['3/5', ['6/10', '9/15']],
  ['4/5', ['8/10', '12/15']]
  [])
*/
//var default_filler = shuffle ('1234567890!@#$%^&*()+=_-|\~`<,>.?/{[}]')
var default_rules = rules .rules (10, 3)



var to_maybe = default_fn => _x => 
  !! (Z .is (Z .MaybeType (Z$ .Any))) (_x)
  ? _x
  : default_fn (_x)




//--------------------LENSES--------------------



var as_maybe = [L .reread (to_maybe (_x => Z_ .Just (_x))), L .defaults (Z .Nothing)]
var from_maybe = [L .reread (to_maybe (_ => Z .Nothing)), L .reread (Z_ .maybe (undefined) (_x => _x)), L .required (Z .Nothing)]


var app_get_ready = L .choices (data_iso (teacher_app .get_ready), data_iso (student_app .get_ready))
var app_playing = L .choices (data_iso (teacher_app .playing), data_iso (student_app .playing))
var app_game_over = L .choices (data_iso (teacher_app .game_over), data_iso (student_app .game_over))

var app_student = [ L .choices (app_get_ready, app_playing, app_game_over), L .choices (['student', from_maybe], 'student') ]
var app_setup = [L .choices (app_get_ready, app_playing, app_game_over), L .choices ([ 'setup', from_maybe ], 'setup')]
var app_board = [ L .choices (app_playing, app_game_over), 'board' ]
var app_history = L .choices ( data_lens (student_app .playing) .history, data_lens (student_app .game_over) .history )

var app_students = [L .choices (app_get_ready, app_playing, app_game_over), 'students']


var board_viewer_board = data_lens (board_viewer .board_viewer) .board
var board_viewer_questions = data_lens (board_viewer .board_viewer) .questions
var board_viewer_history = data_lens (board_viewer .board_viewer) .history

var setup_room = data_lens (setup .setup) .room
var setup_questions = data_lens (setup .setup) .questions
var setup_rules = data_lens (setup .setup) .rules
var app_room = [ app_setup, setup_room ]
var app_questions = [ app_setup, setup_questions ]

var lookbehind_nothing = data_iso (student_lookbehind .nothing)
var lookbehind_bad_room = data_iso (student_lookbehind .bad_room)
var lookbehind_attempting = data_iso (student_lookbehind .attempting)

var lookbehind_room = data_lens (student_lookbehind .bad_room) .room
var lookbehind_since = data_lens (student_lookbehind .attempting) .since
var lookbehind_blocked = data_lens (student_lookbehind .attempting) .blocked

var io_inert = data_iso (io .inert)
var io_connecting = data_iso (io .connecting)

var message_teacher_setup = data_iso (message .teacher_setup)
var message_teacher_ping = data_iso (message .teacher_ping) 
var message_teacher_start = data_iso (message .teacher_start) 
var message_teacher_abort = data_iso (message .teacher_abort) 
var message_student_ping = data_iso (message .student_ping) 
var message_student_join = data_iso (message .student_join) 
var message_student_start = data_iso (message .student_start) 
var message_student_update = data_iso (message .student_update) 

var message_student = [L .choices (message_student_ping, message_student_join, message_student_start, message_student_update), 'student']
var message_ping = [L .choices (message_teacher_ping, message_student_ping), 'ping']
var message_synchronization = L .choices (message_teacher_start, message_teacher_abort, message_student_start .synchronization)
var message_board = message_student_join .board
var message_history = message_student_update .history
  
var ensemble_questions = data_iso (ensemble .ensemble) .questions 
var ensemble_rules = data_iso (ensemble .ensemble) .rules 
var ensemble_ping = data_iso (ensemble .ensemble) .ping 
var ensemble_start = data_iso (ensemble .ensemble) .start 
var ensemble_abort = data_iso (ensemble .ensemble) .abort 
var ensemble_student_pings = data_iso (ensemble .ensemble) .student_pings 
var ensemble_student_boards = data_iso (ensemble .ensemble) .student_boards 
var ensemble_student_starts = data_iso (ensemble .ensemble) .student_starts 
var ensemble_student_histories = data_iso (ensemble .ensemble) .student_histories 

var rendition_attempts = data_lens (rendition .rendition) .attempts
    
var rules_size = data_lens (rules .rules) .size
var setup_size = [setup_rules, rules_size]

var cell_answer = [ 2 ]

var pair = L .cond ([ (_x => _x .length === 2), [] ], [L .zero])
var student_name = L .choices ( [ pair, L .first, pair, L .last ], [ pair, L .last ] )

var ping_mean = [ 1 ]

var students_mapping = 
  [ L .reread (map => Oo (map,
    oo (R .toPairs), oo (Z_ .map (pair => where ((
        id = R .head (pair),
        inner_pair = R .head (R .toPairs (R .last (pair))),
        name = R .head (inner_pair),
        val = R .last (inner_pair) ) =>
      [[id, name], val] ) ))))
  , L .elems ]
var map_students = [ students_mapping, L .first ]
var mapping_students = [ students_mapping, L .last ]




//--------------------TRANSITIONS--------------------





var generate_board = size => questions =>
  where ((
    cells = shuffle (questions .slice (0, size * size)),
    cell = y => x =>
      cells [(x - 1) * size + (y - 1)]) =>
  Oo (Z .range (1) (size + 1),
    oo (Z_ .map (row => Oo (Z .range (1) (size + 1),
      oo (Z_ .map (column => [row, column, cell (row) (column)] )))))))


var teacher_app_get_ready_to_playing = _app =>
  Oo (_app,
    oo (L .get (L .pick ({
      _setup: L .get ([ app_setup, as_maybe ]) }))),
    oo (maybe_all),
    oo (map_just (({ _setup }) => 
      teacher_app .playing (_setup, []) ) ))

var student_app_get_ready_to_playing = _app =>
  Oo (_app,
    oo (L .get (L .pick ({
      student: L .get ([ app_student, as_maybe ]),
      setup: L .get ([ app_setup, as_maybe ]) }))),
    oo (maybe_all),
    oo (Z_ .maybe (undefined) (({student, setup}) => 
      where ((
        _size = L .get (setup_size) (setup),
        _questions = L .get (setup_questions) (setup),
        fresh_history = [rendition .rendition ([])] ) =>
      student_app .playing
        (student, setup, generate_board (_size) (_questions), fresh_history)) )))

var student_app_next_playing = _app =>
  where ((
    board_size = Oo (_app, oo (L .get ([app_setup, setup_size]))),
    history_size = Oo (_app, oo (L .get (app_history)), oo (Z .size))) =>
  !! (history_size < board_size * board_size)
  ? Oo (_app,
    oo (L .set ([app_history, L .append]) (rendition .rendition ([]))))
  : Oo (_app,
    oo (L .get (data_iso (student_app .playing))),
    oo (L .get (L .getInverse (data_iso (student_app .game_over))))) )
         
var student_app_to_board_viewer = _app =>
  Oo (_app, oo (L .get (L .pick ({
    _board: [ app_board, as_maybe ],
    _questions: [ app_questions, as_maybe ],
    _history: [ app_history, as_maybe ] }))),
  oo (maybe_all),
  oo (map_just (({ _board, _questions, _history }) => 
    board_viewer .board_viewer (_board, _questions, _history) )))

var size_patterns = memoize (size =>
  where ((
    range = Z .range (0) (size),
    vertical_patterns = Oo (range, oo (Z .map (_x =>
      Oo (range, oo (Z .map (_y => [_x, _y] )))))),
    horizontal_patterns = Oo (range, oo (Z .map (_y =>
      Oo (range, oo (Z .map (_x => [_x, _y] )))))),
    diagonal_patterns = [
      Oo (range, oo (Z .map (_x => [_x, _x])))
    , Oo (range, oo (Z .map (_x => [_x, (size - 1) - _x]))) ] ) =>
  Z .reduce (Z .concat) ([]) ([
      vertical_patterns
    , horizontal_patterns
    , diagonal_patterns ]) ))


var board_viewer_current_question = _board_viewer =>
  where ((
    history = Oo (_board_viewer, oo (L .get (board_viewer_history))),
    current_question_index = Z .size (history) - 1) =>
  Oo (_board_viewer, oo (L .get ([board_viewer_questions, current_question_index, as_maybe]))))

var board_viewer_crossed_answers = _board_viewer => 
  where ((
    final_attempts = Oo (_board_viewer, oo (L .get (board_viewer_history)),
      oo (Z_ .map (L .get ([rendition_attempts, L .last, 0, as_maybe])))),
    actual_answers = Oo (_board_viewer, oo (L .get (board_viewer_questions)))) =>
  Oo (Z .zip (final_attempts) (actual_answers),
    oo (Z .map (pair =>
      where ((
        maybe_attempt = Z .fst (pair),
        maybe_answer = Z .Just (Z .snd (pair))) =>
      !! (Z .equals (maybe_attempt) (maybe_answer))
      ? maybe_attempt
      : Z .Nothing))),
    oo (Z .justs)))

var board_viewer_bingoes = _board_viewer =>
  where ((
    _board = Oo (_board_viewer, oo (L .get (board_viewer_board))),
    _size = Oo (_board, oo (Z_ .size)),
    _crossed_answers = Oo (_board_viewer, oo (board_viewer_crossed_answers)) ) =>
  Oo (size_patterns (_size),
    oo (Z_ .map (_pattern =>
      _pattern .map (_lens => L .get ([_lens, cell_answer]) (_board)) )),
    oo (Z_ .map (_pattern =>
      !! (Oo (_pattern,
        oo (R .all (_answer => Z_ .elem (_answer) (_crossed_answers)))))
      ? Z .Just (_pattern)
      : Z .Nothing)),
    oo (Z .justs)) )


var history_stepped = old => curr =>
  Z .size (curr) > Z .size (old)


var message_encoding = message =>
  where ((
    strip = _x => JSON .parse (JSON .stringify (_x)),
    student = Oo (message, oo (L .get (message_student))) ) =>
  !! L .isDefined (message_teacher_setup) (message)
  ? Oo (message,
    oo (L .get (message_teacher_setup)),
    oo (strip))
  : !! L .isDefined (message_teacher_ping) (message)
  ? Oo (message,
    oo (L .get (message_ping)),
    oo (L .get (L .getInverse ([ ensemble_ping ]))),
    oo (L .get (data_iso (ensemble .ensemble))),
    oo (strip))
  : !! L .isDefined (message_teacher_start) (message)
  ? Oo (message,
    oo (L .get (message_synchronization)),
    oo (L .get (L .getInverse ([ ensemble_start ]))),
    oo (L .get (data_iso (ensemble .ensemble))),
    oo (strip))
  : !! L .isDefined (message_teacher_abort) (message)
  ? Oo (message,
    oo (L .get (message_synchronization)),
    oo (L .get (L .getInverse ([ ensemble_abort ]))),
    oo (L .get (data_iso (ensemble .ensemble))),
    oo (strip))
  : !! L .isDefined (message_student_ping) (message)
  ? Oo (message,
    oo (L .get (message_ping)),
    oo (L .get (L .getInverse ([ ensemble_student_pings, student ]))),
    oo (L .get (data_iso (ensemble .ensemble))),
    oo (strip))
  : !! L .isDefined (message_student_join) (message)
  ? Oo (message,
    oo (L .get (message_board)),
    oo (L .get (L .getInverse ([ ensemble_student_boards, student ]))),
    oo (L .get (data_iso (ensemble .ensemble))),
    oo (strip))
  : !! L .isDefined (message_student_start) (message)
  ? Oo (message,
    oo (L .get (message_synchronization)),
    oo (L .get (L .getInverse ([ ensemble_student_starts, student ]))),
    oo (L .get (data_iso (ensemble .ensemble))),
    oo (strip))
  : !! L .isDefined (message_student_update) (message)
  ? Oo (message,
    oo (L .get (message_history)),
    oo (L .get (L .getInverse ([ ensemble_student_histories, student ]))),
    oo (L .get (data_iso (ensemble .ensemble))),
    oo (strip))
  : undefined)

var messages_encoding = list =>
  Z_ .reduce (R .mergeDeepRight) ({}) (list .map (message_encoding))

var assemble_students = kind => ensemble =>
  !! (kind === 'get_ready')
  ? Oo (ensemble, oo (L .collect ([ ensemble_student_pings, map_students ])))
  : !! (kind === 'playing') || (kind === 'game_over')
  ? where ((
      boards = Oo (ensemble,
        oo (L .collect ([ ensemble_student_boards, students_mapping ]))),
      histories = Oo (ensemble,
        oo (L .collect ([ ensemble_student_histories, students_mapping ]))) ) =>
    projection_zip (R .head) (R .last) (boards) (histories))
  : undefined

var schedule_start = _ensemble =>
  where ((
    teacher_ping = Oo (_ensemble, oo (L .get (ensemble_ping))),
    student_pings = Oo (_ensemble, oo (L .collect ([ ensemble_student_pings, mapping_students ]))),
    pings = Oo (Z .prepend (teacher_ping) (student_pings), oo (Z .map (L .get (ping_mean)))),
    confidence_interval = Z .reduce (Z .max) (0) (pings) ) =>
  (new Date) .getTime () + confidence_interval)




window .stuff = { ...window .stuff,
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
  setup_room, setup_questions, setup_rules,
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
  board_viewer_crossed_answers, board_viewer_bingoes }