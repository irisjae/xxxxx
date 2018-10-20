var {
	T, $, L, R, S, Z, Z_, Z$, sanc, memoize, TimelineMax,
	so, by, 
	go, panic, panic_on,
  just_now, temporary,
	fiat, data, data_lens, data_iso, data_kind,
	n_reducer, pair_zip_n, pair_zip, pair_projection,
	map_defined, from_just, maybe_all,
	sole, every, delay	 
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
		so ((
		take
		, r = Math .random () * 16 | 0
		, v = c == 'x' ? r : (r & 0x3 | 0x8)) =>
		v .toString (16) ))



var _ping_cache = {}
var _ping_listeners = {}

/*var api = (room, _x) => {;{
	var begin = performance .now ()
	return fetch ('/room/' + room, _x) .then (_x => {;{
		var end = performance .now ()
		var sample = end - begin
		if (! _ping_cache [room]) {
			;_ping_cache [room] = [0, 0, 0, 0]}
		;_ping_cache [room] = T (_ping_cache [room]) (_x => 
			so ((_=_=>
			[ mean * carry + sample / (n + 1)
			, sqr_mean * carry + (sample * sample) / (n + 1)
			, n + 1
			, (new Date) .getTime () ],
			where 
			, {mean, sqr_mean, n} = T (_x) (L .get (L .pick ({
					mean: 0,
					sqr_mean: 1,
					n: 2 })))
			, carry = n / (n + 1) )=>_))
		;(_ping_listeners [room] || []) .forEach (fn => {{ ;fn (_ping_cache [room]) }})
		return _x .json () }}) }}*/
//add retire code for sockets?
var api = so ((_=_=>
  (room, _x) => {;
    ;_x = _x || { method: 'GET' }
    if (_x .body) {
      ;_x .body = JSON .parse (_x .body) }

    var [ continuation, signal ] = api .new_continuation ()

    while (! id || api .continuations [id]) {
      ;var id = '' + Math .floor (1000000 * Math .random ()) }

    ;api .continuations [id] = signal
    ;continuation .catch (Z_ .I) .then (_ => {;delete api .continuations [id]})

    if (! api .sockets [room]) {
      ;api .sockets [room] = new WebSocket ('wss://' + window .location .host + '/room/' + room)
      ;api .sockets [room] .ok = new Promise ((resolve, reject) => {;
        ;api .sockets [room] .onopen = _ => {;resolve ()} })
      ;api .sockets [room] .onmessage = _event => {;
        var _packet = JSON .parse (_event .data)
        var id = _packet .id
        var data = _packet .body
        if (api .continuations [id]) {;
           ;api .continuations [id] (data) } } }

    var begin
    ;return api .sockets [room] .ok
    .then (_ => {;
      ;api .sockets [room] .send (JSON .stringify ({ ..._x, id: id }))
      ;begin = performance .now ()
      return continuation })
    .then (R .tap (_ => {;
      ;var end = performance .now ()
      var sample = end - begin
      if (! _ping_cache [room]) {
        ;_ping_cache [room] = [0, 0, 0, 0]}
      ;_ping_cache [room] = T (_ping_cache [room]) (_x => 
        so ((_=_=>
        [ mean * carry + sample / (n + 1)
        , sqr_mean * carry + (sample * sample) / (n + 1)
        , n + 1
        , (new Date) .getTime () ],
        where 
        , {mean, sqr_mean, n} = T (_x) (L .get (L .pick ({
            mean: 0,
            sqr_mean: 1,
            n: 2 })))
        , carry = n / (n + 1) )=>_))
      ;(_ping_listeners [room] || []) .forEach (fn => {{ ;fn (_ping_cache [room]) }}) })) },
               
)=>_) 
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
    ;reject = _reject })) .then (R .tap (_ => {;done = true}))
  
  ;setTimeout (_ => {;reject ({ error: 'timeout' })}, timeout)
  
  return [continuation, faux_resolve] }



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
var answer = string
var question = v (string, list (answer))
var timeinterval = number
var latency = timeinterval
var position = v (nat, nat)
var ping = v (timestamp, latency, latency)

var attempt = v (position, timeinterval)


var rendition = data ({ rendition: (attempts =~ list (attempt)) => rendition })
var board = data ({ board: (answers =~ map (position) (answer)) => board })

var rules = data ({ rules: (time_limit =~ number, size =~ nat) => rules })
var setup = data ({ setup: ( room =~ room, questions =~ list (question), rules =~ rules ) => setup })


var teacher_app = data ({
  nothing: () => teacher_app,
	get_ready: ( setup =~ setup, students =~ list (student) ) => teacher_app,
	playing: ( setup =~ setup, students =~ map (student) (board, list (rendition)) ) => teacher_app,
	game_over: ( setup =~ setup, students =~ map (student) (board, list (rendition)) ) => teacher_app })

var student_app = data ({
	get_ready: ( student =~ maybe (student), setup =~ maybe (setup) ) => student_app,
	playing: ( student =~ student, setup =~ setup, board =~ board, history =~ list (rendition) ) => student_app,
	game_over: ( student =~ student, setup =~ setup, board =~ board, history =~ list (list (rendition)) ) => student_app })

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
	student_update: ( student =~ student, history =~ list (rendition) ) => message })
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
		student_histories =~ map (student) (history) ) => ensemble })


//TODO: history is not a real type
var board_viewer = data ({
	board_viewer: (board =~ board, questions =~ list (question), history =~ history) => board_viewer })



//--------------------DEFAULTS--------------------



/*/var default_questions = shuffle ('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
/*/ var default_questions = shuffle ([
	['1/2', ['2/4', '3/6']],
	['1/3', ['2/6', '3/9']],
	['2/3', ['4/6', '6/9']],
	['1/4', ['2/8', '3/12']],
	['3/4', ['6/8', '9/12']],
	['1/5', ['2/10', '3/15']],
	['2/5', ['4/10', '6/15']],
	['3/5', ['6/10', '9/15']],
	['4/5', ['8/10', '12/15']] ])
//*/
//var default_filler = shuffle ('1234567890!@#$%^&*()+=_-|\~`<,>.?/{[}]')
var default_rules = rules .rules (10, 3)



var to_maybe = default_fn => _x => 
	!! (Z .is (Z .MaybeType (Z$ .Any))) (_x)
	? _x
	: default_fn (_x)




//--------------------LENSES--------------------



var as_maybe = [L .reread (to_maybe (_x => Z_ .Just (_x))), L .defaults (Z .Nothing)]
var from_maybe = [L .reread (to_maybe (_ => Z .Nothing)), L .reread (Z_ .maybe (undefined) (_x => _x)), L .required (Z .Nothing)]


var app_nothing = data_iso (teacher_app .nothing)
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

var question_view = [ 0 ]
var question_answers = [ 1 ]

var cell_position = L .reread (_x => [ _x [0], _x [1] ])
var cell_answer = [ 2 ]

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


var teacher_app_get_ready_to_playing = _app =>
	T (_app) ([
		L .get ([ app_setup, as_maybe ]),
		Z_ .map (_setup  => 
			teacher_app .playing (_setup, [])) ])

var student_app_get_ready_to_playing = _app => 
	so ((
	take
	, exists = maybe_all (T (_app) (L .get (L .pick ({
			_student: L .get ([ app_student, as_maybe ]),
			_setup: L .get ([ app_setup, as_maybe ]) })))) ) =>
	T (exists) (Z_ .map (({ _student, _setup }) =>
		so ((_=_=>
		student_app .playing
			(_student, _setup, generate_board (_size) (_questions), fresh_history),
		where 
		, _size = L .get (setup_size) (_setup)
		, _questions = L .get (setup_questions) (_setup)
		, fresh_history = [rendition .rendition ([])] )=>_))))

var student_app_playing_to_next = 
	by (_app => 
		so ((_=_=>
		!! (history_size < board_size * board_size)
		? L .set ([app_history, L .append]) (rendition .rendition ([]))
		: L .get (
				[ data_iso (student_app .playing)
				, L .inverse (data_iso (student_app .game_over)) ]),
		where
		, board_size = T (_app) (L .get ([app_setup, setup_size]))
		, history_size = T (_app) ([ L .get (app_history), Z_ .size ]) )=>_)) 
				 
var question_answer_matches = question => answer =>
	so ((_=_=>
	Z .elem (answer) (correct_answers),
	where
	, correct_answers = T (question) (L .get (question_answers)) )=>_)

var student_app_to_board_viewer = _app => 
	so ((
	take
	, exists = maybe_all (T (_app) (L .get (L .pick ({
			_board: [ app_board, as_maybe ],
			_questions: [ app_questions, as_maybe ],
			_history: [ app_history, as_maybe ] })))) ) =>
	T (exists) (Z_ .map (({ _board , _questions , _history }) =>
		board_viewer .board_viewer (_board, _questions, _history)) ))


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
	, diagonal_patterns = [
			T (range) (Z .map (_x => [_x, _x])),
			T (range) (Z .map (_x => [_x, (size - 1) - _x]))
		] )=>_))

var current_question = _history =>
	so ((_=_=>
	L .get ([current_question_index, as_maybe]),
	where
	, current_question_index = Z_ .size (_history) - 1 )=>_)

var board_viewer_current_question = by (_board_viewer =>
	so ((_=_=>
	$ (
  [ L .get (board_viewer_questions)
  , current_question (history) ]),
	where
	, history = T (_board_viewer) (L .get (board_viewer_history)) )=>_))

var board_viewer_attempted_positions = 
	$ ([
		L .get (board_viewer_history),
		Z_ .map (L .get ([rendition_attempts, L .last, 0, as_maybe])) ])

var board_viewer_crossed_positions = _board_viewer => 
	so ((_=_=>
	T (Z .zip (attempted_positions) (questions)) ([
		Z .map (pair =>
			so ((_=_=>
			T (attempt_answer_maybe) (Z .chain (attempt_answer =>
				!! (question_answer_matches (question) (attempt_answer))
				? Z .Just (position)
				: Z .Nothing )),
			where
			, attempt_position_maybe = Z .fst (pair)
			, position = from_just (attempt_position_maybe)
			, attempt_answer_maybe = T (attempt_position_maybe) (Z .map (_position =>
					T (board) (L .get ([ position_lens (_position), cell_answer ]))))
			, question = Z .snd (pair) )=>_)),
		Z .justs ]),
	where
	, board = T (_board_viewer) (L .get (board_viewer_board))
	, questions = T (_board_viewer) (L .get (board_viewer_questions))
	, attempted_positions = T (_board_viewer) (board_viewer_attempted_positions) )=>_)

var board_viewer_bingoed_positions = _board_viewer =>
	so ((_=_=> so ((_=_=>
	T (bingo_patterns) ([
		Z_ .map (_pattern =>
			!! (T (_pattern
				) (R .all (_position => Z_ .elem (_position) (_crossed_positions))))
			? Z .Just (_pattern)
			: Z .Nothing),
		Z .justs ]),
	where
	, bingo_patterns = size_patterns (_size) )=>_),
  where
	, _board = T (_board_viewer) (L .get (board_viewer_board))
	, _size = T (_board) (Z_ .size)
	, _crossed_positions = T (_board_viewer) (board_viewer_crossed_positions) )=>_)


var history_stepped = old => curr =>
	Z_ .size (curr) > Z_ .size (old)


var message_encoding = by (message => 
	so ((_=_=>
	[ R .cond (cases)
	, L .get (data_iso (ensemble .ensemble)) 
	, strip ],
	where
	, strip = Z_ .compose (JSON .parse) (JSON .stringify)
  , cases = so ((_=_=>
      T (encodings) (Z_ .map (([pattern, encoding]) =>
        [L .isDefined (pattern), L .get (encoding)] )),
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
            [ message_history, L .getInverse ([ ensemble_student_histories, student ]) ] ] ] )=>_) )=>_))

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
	student, question, answer, latency, ping, position,
	attempt, rendition, board, rules, setup,
	teacher_app, student_app,
	board_viewer,
	io, message, ensemble, 
	default_questions, default_rules,
	as_maybe, from_maybe,
	app_nothing, app_get_ready, app_playing, app_game_over,
	setup_room, setup_questions, setup_rules,
	board_viewer_board, board_viewer_questions, board_viewer_history,
	io_inert, io_connecting, io_heartbeat,
	ensemble_questions, ensemble_rules,
	ensemble_ping, ensemble_start, ensemble_abort,
	ensemble_student_pings, ensemble_student_starts,
	ensemble_student_boards, ensemble_student_histories,
	app_setup, app_student, app_students, app_room,
	app_board, app_history, app_questions,
	rendition_attempts,
	rules_size, setup_size,
	question_view, question_answers,
	cell_position, position_lens,
	cell_answer, student_name,
	history_stepped,
	message_encoding, messages_encoding,
	assemble_students, schedule_start,
	teacher_app_get_ready_to_playing, 
	student_app_get_ready_to_playing, student_app_playing_to_next,
	student_app_to_board_viewer,
  current_question,
	question_answer_matches, 
	board_viewer_current_question,
	board_viewer_crossed_positions, board_viewer_bingoed_positions }