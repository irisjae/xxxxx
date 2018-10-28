var {
	T, $, L, R, S, Z, Z_, Z$, sanc, memoize, TimelineMax,
	so, by, under,
	tap, go, never, panic, panic_on,
  just_now, temporary,
	fiat, data, data_lens, data_iso, data_kind,
	n_reducer, pair_zip_n, pair_zip, pair_projection,
	map_defined, from_just, maybe_all,
	sole, every, delay	 
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
    
    return continuation },
where
, new_id = _ => {
    var id = '' + Math .floor (1000000 * Math .random ())
    return !! Z_ .not (api .continuations [id])
    ? id
    : new_id () }
, new_socket = room => so ((_=_=>_||
    { ready: new Promise ((resolve, reject) => {;
        _socket .onopen = _ => {;resolve ()} })
    , send: _x => _socket .send (_x) },
    where
    , _socket = new WebSocket ('wss://' + window .location .host + '/room/' + room)
    ,$=
    _socket .onmessage = _event => {;
        var _packet = JSON .parse (_event .data)
        var id = _packet .id
        var data = _packet .body
        if (api .continuations [id]) {;
           ;api .continuations [id] (data) } } )=>_)
      
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

var room = string
var student = v (id, string)
var choice = string
var answer = string
var question = v (string, list (choice))
var timeinterval = number
var latency = timeinterval
var position = v (nat, nat)
var ping = v (timestamp, latency, latency)

var attempt = v (position, timeinterval)
var opportunity = data ({ opportunity: (attempts =~ list (attempt)) => opportunity })
var past = data ({ past: (opportunities =~ list (opportunity)) => past })

var board = data ({ board: (choice =~ map (position) (choice)) => board })

var rules = data ({ rules: (time_limit =~ number, size =~ nat) => rules })
var setup = data ({ setup: ( room =~ room, questions =~ list (question), rules =~ rules ) => setup })


var teacher_app = data ({
  nothing: () => teacher_app,
	get_ready: ( setup =~ setup, students =~ list (student) ) => teacher_app,
	playing: ( setup =~ setup, students =~ map (student) (board, past) ) => teacher_app,
	game_over: ( setup =~ setup, students =~ map (student) (board, past) ) => teacher_app })

var student_app = data ({
	get_ready: ( student =~ maybe (student), setup =~ maybe (setup) ) => student_app,
	playing: ( student =~ student, setup =~ setup, board =~ board, past =~ past ) => student_app,
	game_over: ( student =~ student, setup =~ setup, board =~ board, past =~ past ) => student_app })

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
	teacher_setup: ( questions =~ list (question), rules =~ rules ) => message,
	teacher_ping: ( ping =~ ping ) => message,
	teacher_start: ( synchronization =~ timestamp ) => message,
	teacher_abort: ( synchronization =~ timestamp ) => message,
	student_ping: ( student =~ student, ping =~ ping ) => message,
	student_start: ( student =~ student, synchronization =~ timestamp ) => message,
	student_join: ( student =~ student, board =~ board ) => message,
	student_update: ( student =~ student, past =~ past ) => message })
var ensemble = data ({
  nothing: () => ensemble,
	ensemble: (
		ping =~ ping,
		questions =~ list (question),
		rules =~ rules,
		start =~ timestamp,
		abort =~ maybe (timestamp),
		student_starts =~ map (student) (timestamp),
		student_pings =~ map (student) (ping),
		student_boards =~ map (student) (board),
		student_histories =~ map (student) (past) ) => ensemble })


var board_viewer = data ({
	board_viewer: (board =~ board, questions =~ list (question), past =~ past) => board_viewer })



//--------------------DEFAULTS--------------------



/*/var default_questions = shuffle ('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
/*/ var default_questions = shuffle ([
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



var to_maybe = default_fn => _x => 
	!! (Z .is (Z .MaybeType (Z$ .Any))) (_x)
	? _x
	: default_fn (_x)




//--------------------LENSES--------------------



var pair_to_v = L .iso (
  _pair => !! Z_ .is (Z .PairType (Z$ .Any) (Z$ .Any)) (_pair) ? [ Z_ .fst (_pair), Z_ .snd (_pair) ] : undefined,
  _v => !! Z .and (Z_ .is (Z$ .Array) (_v), Z_ .size (_v) === 2) ? Z_ .Pair (_v [0]) (_v [1]) : undefined)

var as_maybe = [L .reread (to_maybe (_x => Z_ .Just (_x))), L .defaults (Z .Nothing)]
var from_maybe = [L .reread (to_maybe (_ => Z .Nothing)), L .reread (Z_ .maybe (undefined) (_x => _x)), L .required (Z .Nothing)]

//var as_complete = L .reread (_x => !! R .all (_x => _x !== undefined) (Z_ .values (_x)) ? _x : undefined)
var complete_ => lenses =>
  [ L .reread (Z .flip () )
  ]


var app_nothing = data_iso (teacher_app .nothing)
var app_get_ready = L .choices (data_iso (teacher_app .get_ready), data_iso (student_app .get_ready))
var app_playing = L .choices (data_iso (teacher_app .playing), data_iso (student_app .playing))
var app_game_over = L .choices (data_iso (teacher_app .game_over), data_iso (student_app .game_over))

var app_student = [ L .choices (app_get_ready, app_playing, app_game_over), 'student', L .ifElse ($ (Z_ .is (Z .MaybeType (Z$ .Any)))) (from_maybe) (L .identity) ]
var app_setup = [ L .choices (app_get_ready, app_playing, app_game_over), 'setup', L .ifElse ($ (Z_ .is (Z .MaybeType (Z$ .Any)))) (from_maybe) (L .identity) ]
var app_board = [ L .choices (app_playing, app_game_over), 'board' ]
var app_past = L .choices ( data_lens (student_app .playing) .past, data_lens (student_app .game_over) .past )

var app_students = [L .choices (app_get_ready, app_playing, app_game_over), 'students']


var board_viewer_board = data_lens (board_viewer .board_viewer) .board
var board_viewer_questions = data_lens (board_viewer .board_viewer) .questions
var board_viewer_past = data_lens (board_viewer .board_viewer) .past

var setup_room = data_lens (setup .setup) .room
var setup_questions = data_lens (setup .setup) .questions
var setup_rules = data_lens (setup .setup) .rules
var app_room = [ app_setup, setup_room ]
var app_questions = [ app_setup, setup_questions ]

var io_inert = data_iso (io .inert)
var io_connecting = data_iso (io .connecting)
var io_heartbeat = data_iso (io .heartbeat)

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
var message_past = message_student_update .past
	
var ensemble_questions = data_iso (ensemble .ensemble) .questions 
var ensemble_rules = data_iso (ensemble .ensemble) .rules 
var ensemble_ping = data_iso (ensemble .ensemble) .ping 
var ensemble_start = data_iso (ensemble .ensemble) .start 
var ensemble_abort = data_iso (ensemble .ensemble) .abort 
var ensemble_student_pings = data_iso (ensemble .ensemble) .student_pings 
var ensemble_student_boards = data_iso (ensemble .ensemble) .student_boards 
var ensemble_student_starts = data_iso (ensemble .ensemble) .student_starts 
var ensemble_student_histories = data_iso (ensemble .ensemble) .student_histories 

var attempt_position = [ 0 ]
var attempt_latency = [ 1 ]
var opportunity_attempts = data_lens (opportunity .opportunity) .attempts
var opportunity_position = [ opportunity_attempts, L .last, attempt_position ] 
var past_opportunities = data_lens (past .past) .opportunities
		
var rules_size = data_lens (rules .rules) .size
var setup_size = [setup_rules, rules_size]

var question_view = [ 0 ]
var question_answers = [ 1 ]

var cell_position = L .reread (_x => [ _x [0], _x [1] ])
var cell_choice = [ 2 ]

var position_lens = ([x, y]) => [x - 1, y - 1]

var pair_as_list = L .cond (
	[ _x => Z_ .is (Z .PairType (Z$ .Any) (Z$ .Any)) (_x)
	, [ L .rewrite (_x => Z_ .Pair (R .head (_x)) (R .last (_x)))
		, L .reread (_x => [ Z_ .fst (_x), Z_ .snd (_x) ]) ] ] /**/, [L .zero]/**/)

//report: var pair = L .cond ([ (_x => _x .length === 2), [] ])
//var pair = L .cond ([ (_x => _x .length === 2), [] ], [L .zero])
var student_name = L .choices ( [ pair_as_list, L .first, 'name' ], 'name' )

var ping_mean = [ 1 ]

var students_mapping = 
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
var map_students = [ students_mapping, pair_as_list, L .first ]
var mapping_students = [ students_mapping, pair_as_list, L .last ]




//--------------------TRANSITIONS--------------------





var generate_board = size => questions =>
	so ((_=_=>
	T (Z .range (1) (size + 1)) (
		Z_ .map (row => T (Z .range (1) (size + 1)) (
			Z_ .map (column => [row, column, cell (row) (column)] )))),
	where 
	, cells = shuffle (questions .slice (0, size * size))
	, cell = y => x =>
			T (cells) (L .get ([
				(x - 1) * size + (y - 1),
				question_answers,
				L .reread (shuffle),
				L .first ])) )=>_)


var teacher_app_get_ready_to_playing = by (_app =>
  under (app_setup
  ) (_setup  => 
    teacher_app .playing (_setup, [])))

var student_app_get_ready_to_playing =
  under ([ L .pick ({
			_student: L .get (app_student),
			_setup: L .get (app_setup) }), as_complete ]
  ) (({ _student, _setup }) =>
		so ((_=_=>
		student_app .playing
			(_student, _setup, generate_board (_size) (_questions), fresh_past),
		where 
		, _size = L .get (setup_size) (_setup)
		, _questions = L .get (setup_questions) (_setup)
		, fresh_past = past .past ([opportunity .opportunity ([])]) )=>_))

var student_app_playing_to_next = 
	by (_app => 
		so ((_=_=>
		!! (past_size < board_size * board_size)
		? L .set ([app_past, past_opportunities, L .append]) (opportunity .opportunity ([]))
		: L .get (
				[ data_iso (student_app .playing)
				, L .inverse (data_iso (student_app .game_over)) ]),
		where
		, board_size = T (_app) (L .get ([app_setup, setup_size]))
		, past_size = T (_app) ([ L .get ([app_past, past_opportunities]), Z_ .size ]) )=>_)) 
				 
var question_choice_matches = question => choice =>
	so ((_=_=>
	Z .elem (choice) (correct_answers),
	where
	, correct_answers = T (question) (L .get (question_answers)) )=>_)

var student_app_to_board_viewer =
	under ([ L .pick ({
    _board: app_board,
    _questions: app_questions,
    _past: app_past }), as_complete ]
  ) (({ _board , _questions , _past }) =>
		board_viewer .board_viewer (_board, _questions, _past))


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

var current_question = by (_questions => Z .flip (by (_past =>
  $ (
  [ L .get (past_opportunities)
  , _opportunities =>
    so ((_=_=>
    L .get ([current_question_index, as_maybe]),
    where
    , current_question_index = Z_ .size (_opportunities) - 1 )=>_) ]))))

var board_viewer_current_question = _board_viewer =>
	so ((_=_=>
	current_question (_questions) (_past),
	where
	, _questions = T (_board_viewer) (L .get (board_viewer_questions))
	, _past = T (_board_viewer) (L .get (board_viewer_past)) )=>_)

var attempted_positions = by (_past =>
  L .collect ([ past_opportunities, L .elems, opportunity_position ]))

var board_viewer_attempted_positions = by (_board_viewer =>
	under (board_viewer_past
  ) (
  attempted_positions))

var answered_positions = _questions => _board => _past => so ((_=_=>
  T (Z .zip (_opportunities) (_questions)
  ) (
  Z .chain (under (pair_to_v
  ) (([_opportunity, _question]) => so ((_=_=>
    !! (question_choice_matches (_question) (_choice))
    ? [ _position ]
    : [],
    where
    , _position = T (_opportunity) (L .get (opportunity_position))
    , _choice = T (_position) (map_defined (_position =>
        T (_board) (L .get ([ position_lens (_position), cell_choice ]))))  )=>_)))),
  where
  , _opportunities = T (_past) (L .get (past_opportunities)) )=>_)

var board_viewer_answered_positions = _board_viewer =>
  so ((_=_=>
  answered_positions (_questions) (_board) (_past),
  where
  , _questions = T (_board_viewer) (L .get (board_viewer_questions))
  , _board = T (_board_viewer) (L .get (board_viewer_board))
  , _past = T (_board_viewer) (L .get (board_viewer_past)) )=>_)

var bingoed_positions = _questions => _board => _past => 
	so ((_=_=> so ((_=_=>
	T (bingo_patterns
  ) (
  Z_ .filter (R .all (T (_answered_positions) (Z .flip (Z_ .elem))))),
//no need to expand patterns???? 
	where
	, bingo_patterns = size_patterns (_size) )=>_),
  where
	, _size = T (_board) (Z_ .size)
	, _answered_positions = answered_positions (_questions) (_board) (_past) )=>_)

var board_viewer_bingoed_positions = _board_viewer =>
  so ((_=_=>
  bingoed_positions (_questions) (_board) (_past),
  where
  , _questions = T (_board_viewer) (L .get (board_viewer_questions))
  , _board = T (_board_viewer) (L .get (board_viewer_board))
  , _past = T (_board_viewer) (L .get (board_viewer_past)) )=>_)


var past_stepped = old => curr =>
	Z_ .size (curr) > Z_ .size (old)


var message_encoding = by (message => 
	so ((_=_=>
	L .get (
  [ cases
	, data_iso (ensemble .ensemble)
	, strip ]),
	where
	, strip = [ L .reread ($ ([ JSON .stringify, JSON .parse ])) ]
  , cases = so ((_=_=>
      T (L .cond) (T (apply (
        T (([pattern, encoding]) =>
          [L .isDefined (pattern), encoding] )
        ) (x => Z_ .map (x) (encodings)))),
      where
      , student = T (message) (L .get (message_student))
      , encodings = 
        [ [ message_teacher_setup , 
            [ message_teacher_setup, L .getInverse (data_iso (ensemble .ensemble)) ] ]
        , [ message_teacher_ping , 
            [ message_ping, L .getInverse (ensemble_ping) ] ]
        , [ message_teacher_start , 
            [ message_synchronization, L .getInverse (ensemble_start) ] ]
        , [ message_teacher_abort , 
            [ message_synchronization, L .getInverse (ensemble_abort) ] ]
        , [ message_student_ping , 
            [ message_ping, L .getInverse ([ ensemble_student_pings, student ]) ] ]
        , [ message_student_join , 
            [ message_board, L .getInverse ([ ensemble_student_boards, student ]) ] ]
        , [ message_student_start , 
            [ message_synchronization, L .getInverse ([ ensemble_student_starts, student ]) ] ]
        , [ message_student_update , 
            [ message_past, L .getInverse ([ ensemble_student_histories, student ]) ] ] ] )=>_) )=>_))

var messages_encoding = list =>
	Z_ .reduce (R .mergeDeepRight) ({}) (list .map (message_encoding))

var assemble_students = kind => ensemble =>
	!! (kind === 'nothing')
  ? undefined
	: !! (kind === 'get_ready')
	? T (ensemble) (L .collect ([ ensemble_student_pings, map_students ]))
	: !! (kind === 'playing' || kind === 'game_over')
	? so ((_=_=>
		pair_zip (_a => _b => [_a, _b]) (boards) (histories),
		where
		, boards = T (ensemble
        ) (L .collect ([ ensemble_student_boards, students_mapping ]))
		, histories = T (ensemble
        ) (L .collect ([ ensemble_student_histories, students_mapping ])) )=>_)
	: panic ('unknown student kind')

var schedule_start = _ensemble =>
	so ((_=_=>
	(new Date) .getTime () + confidence_interval,
	where
	, teacher_ping = T (_ensemble) (L .get (ensemble_ping))
	, student_pings = T (_ensemble) (L .collect ([ ensemble_student_pings, mapping_students ]))
	, pings = T (Z .prepend (teacher_ping) (student_pings)) (Z .map (L .get (ping_mean)))
	, confidence_interval = Z .reduce (Z .max) (0) (pings) )=>_)




window .stuff = { ...window .stuff,
	bool, number, timestamp, string,
	list, map, maybe, nat, id, v,
	shuffle, uuid, api, post,
	student, question, choice, answer, latency, ping, position,
	attempt, opportunity, past, board, rules, setup,
	teacher_app, student_app,
	board_viewer,
	io, message, ensemble, 
	default_questions, default_rules,
	as_maybe, from_maybe, as_complete,
	app_nothing, app_get_ready, app_playing, app_game_over,
	setup_room, setup_questions, setup_rules,
	board_viewer_board, board_viewer_questions, board_viewer_past,
	io_inert, io_connecting, io_heartbeat,
	ensemble_questions, ensemble_rules,
	ensemble_ping, ensemble_start, ensemble_abort,
	ensemble_student_pings, ensemble_student_starts,
	ensemble_student_boards, ensemble_student_histories,
	app_setup, app_student, app_students, app_room,
	app_board, app_past, app_questions,
	opportunity_attempts,
	rules_size, setup_size,
	question_view, question_answers,
	cell_position, position_lens,
	cell_choice, student_name,
	past_stepped,
	message_encoding, messages_encoding,
	assemble_students, schedule_start,
	teacher_app_get_ready_to_playing, 
	student_app_get_ready_to_playing, student_app_playing_to_next,
	student_app_to_board_viewer,
  current_question,
	question_choice_matches, 
	board_viewer_current_question,
	board_viewer_answered_positions, board_viewer_bingoed_positions }