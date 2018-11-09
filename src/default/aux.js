var {
	T, $, apply, L, R, S, Z, Z_, Z$, sanc, memoize, TimelineMax,
	so, by, and_by, under,
	tap, go, never, panic, panic_on,
  just_now, temporary,
	fiat, data, data_lens, data_iso, data_kind,
	n_reducer, pair_zip_n, pair_zip, pair_projection,
	map_defined_, map_defined, from_just, maybe_all,
	as_sole, sole, every, delay	 
} = window .stuff

var tap = _fn => x => (_fn (x), x)

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
		so ((
		take
		, r = Math .random () * 16 | 0
		, v = c == 'x' ? r : (r & 0x3 | 0x8)) =>
		v .toString (16) ))



var _ping_cache = {}
var _ping_listeners = {}

/*var api = (room, _x) => {;
	var begin = performance .now ()
	return fetch ('/room/' + room, _x) .then (_x => {;{
		var end = performance .now ()
		var sample = end - begin
		;_ping_cache [room] = T (_ping_cache [room]) (update_pings (sample))
		;(_ping_listeners [room] || []) .forEach (fn => {{;fn (_ping_cache [room])}})
		return _x .json () }}) }*/
//add retire code for sockets?
var api = so ((_=_=>
  (room, _x) => {;
    ;_x = _x || { method: 'GET' }
    if (_x .body) {
      ;_x .body = JSON .parse (_x .body) }

    var [ continuation, signal ] = api .new_continuation ()
    var id = new_id ()

    ;api .continuations [id] = signal
    ;continuation .catch (Z_ .I) .then (_=> {;delete api .continuations [id]})

    if (! api .sockets [room]) {
      ;api .sockets [room] = new_socket (room) }
    ;api .sockets [room] .refresh ()

    var begin, end
    ;go
    .then (Z_ .K (api .sockets [room] .ready))
    .then (_=> {;api .sockets [room] .send (JSON .stringify ({ ..._x, id: id }))})
    .then (_=> {;begin = performance .now ()})
    .then (Z_ .K (continuation))
    .then (_=> {;end = performance .now ()})
    .then (_=> {;
      var sample = end - begin
      ;_ping_cache [room] = T (_ping_cache [room]) (update_pings (sample))
      ;(_ping_listeners [room] || []) .forEach (fn => {;fn (_ping_cache [room])}) })
    .catch (_ => {})
    
    return continuation },
where
, new_id = _ => {
    var id = '' + Math .floor (1000000 * Math .random ())
    return !! Z_ .not (api .continuations [id])
    ? id
    : new_id () }
//TODO: make this more elegant
, new_socket = room => so ((_=_=>(
    rec =
    { _socket: _
    , ready: _
    , refresh: refresh
    , send: _x => _socket .send (_x) } , refresh (), rec),
    where
    , rec = _
    , _socket = _
    , refresh = _ => {;
        if (! (_socket instanceof WebSocket)
        || _socket .readyState === WebSocket .CLOSED
        || _socket .readyState === WebSocket .CLOSING) {
          ;_socket = new WebSocket ('wss://' + window .location .host + '/room/' + room)
          rec ._socket = _socket
          rec .ready = new Promise ((resolve, reject) => {;
            _socket .onopen = _ => {;resolve ()} })
          _socket .onmessage = _event => {;
            var _packet = JSON .parse (_event .data)
            var id = _packet .id
            var data = _packet .body
            if (api .continuations [id]) {;
               ;api .continuations [id] (data) } } } } )=>_)
      
, update_pings = sample =>
  $ (
  [ L .get (L .valueOr ([0, 0, 0, 0]))
  , ([ mean, sqr_mean, n, _ ]) => so ((_=_=>
    [ mean * carry + sample / (n + 1)
    , sqr_mean * carry + (sample * sample) / (n + 1)
    , n + 1
    , (new Date) .getTime () ],
    where 
    , carry = n / (n + 1) )=>_) ]))=>_) 
;api .listen_ping = room => fn => {{ 
	if (! _ping_listeners [room]) {
		;_ping_listeners [room] = [] }
	;_ping_listeners [room] .push (fn)
	if (_ping_cache [room]) {
		;fn (_ping_cache [room]) } }}
;api .sockets = []
;api .continuations = {}
;api .new_continuation = timeout => {;
  ;timeout = timeout || 5000
                                     
  var resolve, reject
  var done = false
  var faux_resolve = _x => {
    if (! done) {
      ;resolve (_x) } }
  
  var continuation = (new Promise ((_resolve, _reject) => {;
    ;resolve = _resolve
    ;reject = _reject }))
  ;continuation .catch (Z_ .I) .then (_ => {;done = true})
  
  ;setTimeout (_ => {;reject ({ error: 'timeout' })}, timeout)
  
  return [ continuation, faux_resolve ] }



var post = x => ({
	method: 'POST',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json' },
	body: JSON .stringify (x) })




//--------------------TYPES--------------------

var bool = fiat
var number = fiat
var timestamp = number
var string = fiat
var list = a => fiat
var map = a => (...b) => list (v (a, ...b))
var maybe = a => fiat
var nat = fiat
var id = string
var v = (...types) => fiat
var piece = (...types) => fiat

var room = string
var student = v (id, string)
var choice = string
var answer = string
var problem = v (string, list (choice))
var timeinterval = number
var latency = timeinterval
var position = v (nat, nat)
var ping = v (timestamp, latency, latency)

var attempt = v (position, timeinterval)
var point = data ({ point: (problem =~ problem, attempts =~ list (attempt)) => point })
var past = data ({ past: (points =~ list (point)) => past })

var board = data ({ board: (choice =~ map (position) (choice)) => board })

var rules = data ({ rules: (time_limit =~ number, size =~ nat) => rules })
var settings = data ({ settings: ( problems =~ list (problem), rules =~ rules ) => settings })


var teacher_app = data ({
  setup: ( settings =~ settings ) => teacher_app,
	get_ready: ( room =~ room, settings =~ settings, students =~ list (student) ) => teacher_app,
	playing: ( room =~ room, settings =~ settings, students =~ map (student) (board, past) ) => teacher_app,
	game_over: ( room =~ room, settings =~ settings, students =~ map (student) (board, past) ) => teacher_app })

var student_app = data ({
	get_ready: ( room =~ maybe (room), settings =~ maybe (settings), student =~ maybe (student) ) => student_app,
	playing: ( room =~ room, settings =~ settings, student =~ student, board =~ board, past =~ past ) => student_app,
	game_over: ( room =~ room, settings =~ settings, student =~ student, board =~ board, past =~ past ) => student_app })

/*
var teacher_lookbehind = data ({
	nothing: () => teacher_lookbehind,
	bad_room: () => teacher_lookbehind })
*/

var io = data ({
	inert: () => io,
	connecting: () => io,
	messaging: () => io,
	heartbeat: () => io })


var message = data ({
	teacher_settings: ( settings =~ settings ) => message,
	teacher_ping: ( ping =~ ping ) => message,
	teacher_start: ( synchronization =~ timestamp ) => message,
	teacher_abort: ( synchronization =~ timestamp ) => message,
	student_ping: ( student =~ student, ping =~ ping ) => message,
	student_start: ( student =~ student, synchronization =~ timestamp ) => message,
	student_join: ( student =~ student, board =~ board ) => message,
	student_update: ( student =~ student, past =~ past ) => message })
var ensemble = data ({
	ensemble: (
		ping =~ ping,
		settings =~ settings,
		start =~ timestamp,
		abort =~ maybe (timestamp),
		student_pings =~ map (student) (ping),
		student_starts =~ map (student) (timestamp),
		student_boards =~ map (student) (board),
		student_histories =~ map (student) (past) ) => ensemble })




//--------------------DEFAULTS--------------------



/*/var default_problems = shuffle ('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
/*/ var default_problems = shuffle ([
	['1/2', ['2/4', '3/6']],
	['1/3', ['2/6', '3/9']],
	['2/3', ['4/6', '6/9']],
	['1/4', ['2/8', '3/12']],
	['2/4', ['1/2', '3/6']],
	['3/4', ['6/8', '9/12']],
	['1/5', ['2/10', '3/15']],
	['2/5', ['4/10', '6/15']],
	['3/5', ['6/10', '9/15']],
	['4/5', ['8/10', '12/15']],
	['1/6', ['2/12', '3/18']],
	['2/6', ['1/3', '3/9']],
	['3/6', ['1/2', '2/4']],
	['4/6', ['2/3', '6/9']],
	['5/6', ['10/12', '15/18']],
  ['1/7', ['2/14', '3/21']] ])
//*/
//var default_filler = shuffle ('1234567890!@#$%^&*()+=_-|\~`<,>.?/{[}]')
var default_rules = rules .rules (10, 4)

var default_settings = settings .settings (default_problems, default_rules)



var to_maybe = default_fn => _x => 
	!! (Z .is (Z .MaybeType (Z$ .Any))) (_x)
	? _x
	: default_fn (_x)




//--------------------LENSES--------------------



var pair_as_v = L .iso (
  _pair => !! Z_ .is (Z .PairType (Z$ .Any) (Z$ .Any)) (_pair) ? [ Z_ .fst (_pair), Z_ .snd (_pair) ] : undefined,
  _v => !! Z .and (Z_ .is (Z$ .Array) (_v), Z_ .size (_v) === 2) ? Z_ .Pair (_v [0]) (_v [1]) : undefined)

var as_maybe = [L .reread (to_maybe (_x => Z_ .Just (_x))), L .defaults (Z .Nothing)]
var as_defined = [L .reread (to_maybe (_ => Z .Nothing)), L .reread (Z_ .maybe (undefined) (_x => _x)), L .required (Z .Nothing)]
var as_defined_ = L .ifElse ($ (Z_ .is (Z .MaybeType (Z$ .Any)))) (as_defined) (L .identity)

var as_complete = L .reread (_x => !! R .all (_x => _x !== undefined) (Z_ .values (_x)) ? _x : undefined)
var complete_ = lens_shape =>
  [ L .reread ($ ([Z_ .flip (T (lens_shape) (Z_ .map (L .get))), L .get (as_complete)]))
  , L .identity // implement rewrite
  ]


var app_as_setup = data_iso (teacher_app .setup)
var app_as_get_ready = L .choices (data_iso (teacher_app .get_ready), data_iso (student_app .get_ready))
var app_as_playing = L .choices (data_iso (teacher_app .playing), data_iso (student_app .playing))
var app_as_game_over = L .choices (data_iso (teacher_app .game_over), data_iso (student_app .game_over))

var app_as_settings = [ L .choices ('setup', 'get_ready', 'playing', 'game_over'), 'settings', as_defined_ ]
var app_as_student = [ L .choices ('get_ready', 'playing', 'game_over'), 'student', as_defined_ ]
var app_as_room = [ L .choices ('get_ready', 'playing', 'game_over'), 'room', as_defined_ ]
var app_as_students = [ L .choices ('get_ready', 'playing', 'game_over'), 'students' ]
var app_as_board = [ L .choices ('playing', 'game_over'), 'board' ]
var app_as_past = [ L .choices ('playing', 'game_over'), 'past' ]

var io_as_inert = data_iso (io .inert)
var io_as_connecting = data_iso (io .connecting)
var io_as_heartbeat = data_iso (io .heartbeat)

var message_as_teacher_settings = data_iso (message .teacher_settings)
var message_as_teacher_ping = data_iso (message .teacher_ping) 
var message_as_teacher_start = data_iso (message .teacher_start) 
var message_as_teacher_abort = data_iso (message .teacher_abort) 
var message_as_student_ping = data_iso (message .student_ping) 
var message_as_student_join = data_iso (message .student_join) 
var message_as_student_start = data_iso (message .student_start) 
var message_as_student_update = data_iso (message .student_update) 

var message_as_student = [L .choices (message_as_student_ping, message_as_student_join, message_as_student_start, message_as_student_update), 'student']
var message_as_ping = [L .choices (message_as_teacher_ping, message_as_student_ping), 'ping']
var message_as_board = message_as_student_join .board
var message_as_past = message_as_student_update .past
	
var ensemble_as_settings = data_iso (ensemble .ensemble) .settings 
var ensemble_as_ping = data_iso (ensemble .ensemble) .ping 
var ensemble_as_start = data_iso (ensemble .ensemble) .start 
var ensemble_as_abort = data_iso (ensemble .ensemble) .abort 
var ensemble_as_student_pings = data_iso (ensemble .ensemble) .student_pings 
var ensemble_as_student_boards = data_iso (ensemble .ensemble) .student_boards 
var ensemble_as_student_starts = data_iso (ensemble .ensemble) .student_starts 
var ensemble_as_student_histories = data_iso (ensemble .ensemble) .student_histories 

var attempt_as_position = [ 0 ]
var attempt_as_latency = [ 1 ]
var point_as_problem = data_lens (point .point) .problem
var point_as_attempts = data_lens (point .point) .attempts
var point_as_position = [ point_as_attempts, L .last, attempt_as_position ] 
var past_as_points = data_lens (past .past) .points
		
var settings_as_problems = data_lens (settings .settings) .problems
var settings_as_rules = data_lens (settings .settings) .rules
var app_as_problems = [ app_as_settings, settings_as_problems ]
var app_as_point = [ app_as_past, past_as_points, L .last ]

var rules_as_size = data_lens (rules .rules) .size
var rules_as_time_limit = data_lens (rules .rules) .time_limit
var settings_as_size = [settings_as_rules, rules_as_size]
var settings_as_time_limit = [settings_as_rules, rules_as_time_limit]

var problem_as_question = [ 0 ]
var problem_as_answers = [ 1 ]

var cell_as_position = L .reread (_x => [ _x [0], _x [1] ])
var cell_as_choice = [ 2 ]

var as_position = ([x, y]) => [x - 1, y - 1]

var pair_as_list = L .cond (
	[ _x => Z_ .is (Z .PairType (Z$ .Any) (Z$ .Any)) (_x)
	, [ L .rewrite (_x => Z_ .Pair (R .head (_x)) (R .last (_x)))
		, L .reread (_x => [ Z_ .fst (_x), Z_ .snd (_x) ]) ] ] /**/, [L .zero]/**/)

//var pair_as_first = [ L .ifElse ($ (Z_ .is (Z .PairType (Z$ .Any) (Z$ .Any)))) (L .reread (Z_ .fst)) (L .zero),  ]
var pair_as_first = [ pair_as_list, L .first ]
var pair_as_second = [ pair_as_list, L .last ]

//report: var pair = L .cond ([ (_x => _x .length === 2), [] ])
//var pair = L .cond ([ (_x => _x .length === 2), [] ], [L .zero])
var student_name = L .choices ( [ pair_as_list, L .first, 'name' ], 'name' )

var ping_as_mean = [ 1 ]

var students_as_mapping = 
	[ L .keyed
	, L .reread (
			Z_ .map (pair => so ((_=_=>
				Z_ .Pair ({ id: id, name: name }) (val),
				where
				, id = R .head (pair)
				, inner_pair = R .head (R .toPairs (R .last (pair)))
				, name = R .head (inner_pair)
				, val = R .last (inner_pair) )=>_)))
	, L .elems ]
var map_as_students = [ students_as_mapping, pair_as_list, L .first ]
var mapping_as_students = [ students_as_mapping, pair_as_list, L .last ]




//--------------------TRANSITIONS--------------------





var generate_board = size => problems =>
	so ((_=_=>
	T (Z .range (1) (size + 1)) (
		Z_ .map (row => T (Z .range (1) (size + 1)) (
			Z_ .map (column => [row, column, cell (row) (column)] )))),
	where 
	, cells = shuffle (problems .slice (0, size * size))
	, cell = y => x =>
			T (cells) (L .get ([
				(x - 1) * size + (y - 1),
				problem_as_answers,
				L .reread (shuffle),
				L .first ])) )=>_)


var teacher_app_get_ready_to_playing = by (_app =>
  under (complete_ (
    { _room: app_as_room
    , _settings: app_as_settings
    , _students: app_as_students })
  ) (({ _room, _settings, _students }) => 
    teacher_app .playing (_room, _settings, _students .map (x => Z_ .Pair (x) (undefined)) )))

var student_app_get_ready_to_playing = by (_app =>
  under (complete_ (
		{	_room: app_as_room
    , _student: app_as_student
		,	_settings: app_as_settings })
  ) (({ _room, _student, _settings }) =>
		so ((_=_=>
		student_app .playing (_room, _settings, _student, random_board, fresh_past),
		where 
		, _size = L .get (settings_as_size) (_settings)
		, _problems = L .get (settings_as_problems) (_settings)
    , random_board = generate_board (_size) (_problems)
    , first_problem = L .get (L .first) (_problems)
		, fresh_past = past .past ([point .point (first_problem, [])]) )=>_)))

var student_app_playing_to_next = 
	by (_app => 
		so ((_=_=>
		!! Z .not (game_over_ok)
		? L .set ([ app_as_past, past_as_points, L .appendTo ]) (point .point (next_problem, []))
		: L .get (
				[ data_iso (student_app .playing)
				, L .inverse (data_iso (student_app .game_over)) ]),
		where
		, board_size = T (_app) (L .get ([app_as_settings, settings_as_size]))
		, past_size = T (_app) ([ L .get ([app_as_past, past_as_points]), Z_ .size ])
    , next_problem = T (_app) (L .get ([ app_as_problems, L .index (past_size) ]))
    , game_over_ok = false || Z_ .equals (next_problem) (undefined) )=>_)) 
				 
var problem_choice_matches = problem => choice =>
	so ((_=_=>
	Z .elem (choice) (correct_answers),
	where
	, correct_answers = T (problem) (L .get (problem_as_answers)) )=>_)


var size_patterns = memoize (size =>
	so ((_=_=>
	n_reducer (Z .concat) (3)
		(vertical_patterns)
		(horizontal_patterns)
		(diagonal_patterns),
	where
	, range = Z .range (1) (size + 1)
	, vertical_patterns =
			T (range) (Z .map (x =>
				T (range) (Z .map (y =>
					[x, y] ))))
	, horizontal_patterns =
			T (range) (Z .map (y =>
				T (range) (Z .map (x =>
					[x, y] ))))
	, diagonal_patterns =
      [ T (range) (Z .map (_x => [_x, _x]))
      , T (range) (Z .map (_x => [_x, (size - 1) - _x])) ] )=>_))

var current_problem = by (_problems => and_by (_past =>
  $ (
  [ L .get (past_as_points)
  // convert into lens
  , _points =>
    so ((_=_=>
    L .get (current_problem_index),
    where
    , current_problem_index = Z_ .size (_points) - 1 )=>_) ])))

var attempted_positions = by (_past =>
  L .collect ([ past_as_points, L .elems, point_as_position ]))


var answered_positions = _problems => _board => _past => so ((_=_=>
  T (Z .zip (_points) (_problems)
  ) (
  Z .chain (under (pair_as_v
  ) (([_point, _problem]) => so ((_=_=>
    !! (problem_choice_matches (_problem) (_choice))
    ? [ _position ]
    : [],
    where
    , _position = T (_point) (L .get (point_as_position))
    , _choice = T (_position) (map_defined (_position =>
        T (_board) (L .get ([ as_position (_position), cell_as_choice ]))))  )=>_)))),
  where
  , _points = T (_past) (L .get (past_as_points)) )=>_)

var bingoed_positions = _problems => _board => _past => 
	so ((_=_=> so ((_=_=>
	T (bingo_patterns
  ) (
  Z_ .filter (R .all (T (_answered_positions) (Z .flip (Z_ .elem))))),
//no need to expand patterns???? 
	where
	, bingo_patterns = size_patterns (_size) )=>_),
  where
	, _size = T (_board) (Z_ .size)
	, _answered_positions = answered_positions (_problems) (_board) (_past) )=>_)



var past_stepped = old_past => curr_past =>
  so ((_=_=>
  Z_ .size (curr) > Z_ .size (old),
  where
  , old = T (old_past) (L .get (past_as_points))
  , curr = T (curr_past) (L .get (past_as_points)) )=>_)
    


var message_encoding = by (message => 
	so ((_=_=>
	$ (
  [ Z .flip (cases)
  , L .collect (L .elems)
  , sole
	, L .get (data_iso (ensemble .ensemble))
	, strip ]),
	where
	, strip = $ ([ JSON .stringify, JSON .parse ]) 
  , student = T (message) (L .get (message_as_student))
  , cases = 
      [ under (message_as_teacher_settings
        ) (L .getInverse (data_iso (ensemble .ensemble))) 
      , under (message_as_teacher_ping
        ) (L .getInverse (ensemble_as_ping))
      , under (message_as_teacher_start
        ) (L .getInverse (ensemble_as_start))
      , under (message_as_teacher_abort
        ) (L .getInverse (ensemble_as_abort)) 
      , under (message_as_student_ping. ping
        ) (L .getInverse ([ ensemble_as_student_pings, student ]))
      , under (message_as_student_join. board
        ) (L .getInverse ([ ensemble_as_student_boards, student ]))
      , under (message_as_student_start .synchronization
        ) (L .getInverse ([ ensemble_as_student_starts, student ]))
      , under (message_as_student_update .past
        ) (L .getInverse ([ ensemble_as_student_histories, student ])) ] )=>_))

var messages_encoding = list =>
	Z_ .reduce (R .mergeDeepRight) ({}) (list .map (message_encoding))

var assemble_students = by (_app => //and_by (_ensemble =>
  so ((_=_=>
  $ ([ Z .flip (cases), L .collect (L .elems), L .get ([ as_sole, L .valueOr (Z_ .K (undefined)) ]) ]),
  where
  , cases =
      [ under (app_as_get_ready
        ) (
        Z_ .K (
        by (_ensemble =>
          L .collect ([ ensemble_as_student_pings, map_as_students ]))))
      , under (L .choice (app_as_playing, app_as_game_over)
        ) (
        Z_ .K (
        by (_ensemble =>
          $ (
          [ Z_ .flip (
            { boards: L .collect ([ ensemble_as_student_boards, students_as_mapping ])
            , histories: L .collect ([ ensemble_as_student_histories, students_as_mapping ]) })
          , /*under (as_complete)*/ (({ boards, histories }) =>
            pair_zip (_a => _b => [_a, _b]) (boards) (histories) ) ])
        //collect this instead of get!
          /*under (L .pick (
            { boards: [ ensemble_as_student_boards, students_as_mapping ]
            , histories: [ ensemble_as_student_histories, students_as_mapping ] })
          ) (({ boards, histories }) =>
            pair_zip (_a => _b => [_a, _b]) (boards) (histories) )*/
           ))) ] )=>_))

var schedule_start = _ensemble =>
	so ((_=_=>
	(new Date) .getTime () + confidence_interval,
	where
	, teacher_ping = T (_ensemble) (L .get (ensemble_as_ping))
	, student_pings = T (_ensemble) (L .collect ([ ensemble_as_student_pings, mapping_as_students ]))
	, pings = T (Z .prepend (teacher_ping) (student_pings)) (Z .map (L .get (ping_as_mean)))
	, confidence_interval = Z .reduce (Z .max) (0) (pings) )=>_)




window .stuff = { ...window .stuff,
	bool, number, timestamp, string,
	list, map, maybe, nat, id, v, piece,
	shuffle, uuid, api, post,
	student, problem, choice, answer, latency, ping, position,
	attempt, point, past, board, rules, settings,
	teacher_app, student_app,
	io, message, ensemble, 
	default_problems, default_rules, default_settings,
	as_maybe, as_defined, as_complete, complete_,
	app_as_setup, app_as_get_ready, app_as_playing, app_as_game_over,
	settings_as_problems, settings_as_rules,
	io_as_inert, io_as_connecting, io_as_heartbeat,
	ensemble_as_ping, ensemble_as_settings, ensemble_as_start, ensemble_as_abort,
	ensemble_as_student_pings, ensemble_as_student_starts,
	ensemble_as_student_boards, ensemble_as_student_histories,
  attempt_as_position, attempt_as_latency, point_as_attempts, point_as_position, past_as_points,
	app_as_settings, app_as_student, app_as_students, app_as_room,
	app_as_board, app_as_past, app_as_problems,
  app_as_point, point_as_attempts,
	rules_as_size, rules_as_time_limit, settings_as_size, settings_as_time_limit,
	problem_as_question, problem_as_answers,
	cell_as_position, as_position,
	cell_as_choice, student_name,
  pair_as_list, pair_as_first, pair_as_second,
	message_encoding, messages_encoding,
	assemble_students, schedule_start,
	teacher_app_get_ready_to_playing, 
	student_app_get_ready_to_playing, student_app_playing_to_next,
	past_stepped,
  current_problem, problem_choice_matches,
  attempted_positions, answered_positions, bingoed_positions }