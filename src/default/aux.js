var {
	T, $, apply, L, R, S, Z, Z_, Z$, sanc, memoize, 
	so, by, and_by, under,
	tap, go, never, panic, panic_on,
  just_now, temporary,
	fiat, data, data_lens, data_iso, data_kind,
  focused_iso_,
	n_reducer, 
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





// rewrite functionally?
var map_zip = mash => a => b => {
  var projections = new Map
  ;T (a) (R .forEach (([ _key, _val ]) => {;
    ;projections .set (_key, _val) }))
  
  var _zip = []
  ;T (b) (R .forEach (([ _key, _val ]) => {;
    if (projections .has (_key)) {
      _zip = _zip .concat ([ [ _key, mash (projections .get (_key)) (_val) ] ]) } }))
  
  return _zip }






var timer = _ => {;
  var _timer = S .data ()
  var _flowing = S .data (true)
  //var _flowing_ok = S .subclock (_=> {
  //  var val = S .value (_flowing ())
  //  ;S (_=> {;val (_flowing ())})
  //  return val })
  //var _S = fn => S (x => !! _flowing_ok () ? fn (x) : x)
  var tick_S = fn => S (x => !! _flowing () ? fn (x) : x)
  ;tick_S (_=> {;
    ;_timer (+ (new Date))
    ;requestAnimationFrame (_ => {;
      ;_flowing (_flowing ()) }) })
  return [ _timer, _flowing, ] } //_S, tick_S ] }
var timer_since = _timer => S .subclock (_=> {;
  var _since = S .data ()
	;S (_=> {;
    ;_since (_since .next || - Infinity)
    ;_since .next = _timer () })
  return _since })
var time_intervals = _timer => so ((_=_=>
  S (_ => time_interval .time_interval (_timer_since (), _timer ())),
  where
  , _timer_since = timer_since (_timer) )=>_)








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
//TODO: all the maps in this project are fake!
var map = a => (...b) => list (v (a, ...b))
var maybe = a => fiat
var nat = fiat
var integer = fiat
var id = string
var v = (...types) => fiat
var piece = (...types) => fiat

var room = string
var choice = string
var answer = string
var problem = v (string, list (choice))

var time_interval = data ({ time_interval: (from =~ timestamp, to =~ timestamp) => time_interval })

var time_amount = number
var latency = time_amount
var position = v (nat, nat)
var ping = v (timestamp, latency, latency)

var progress = v (nat, timestamp)

var attempt = v (position, time_amount)
var point = data ({ point: (problem =~ problem, attempts =~ list (attempt)) => point })
var past = data ({ past: (points =~ list (point)) => past })

var board = data ({ board: (choice =~ map (position) (choice)) => board })

var win_rule = data ({ first_bingo: () => win_rule })
var rules = data ({ rules: (time_limit =~ number, size =~ nat, win_rule =~ win_rule) => rules })
var settings = data ({ settings: ( problems =~ list (problem), rules =~ rules ) => settings })

var avatar = data ({ 
  lion: () => avatar,
  bunny: () => avatar })
var student = data ({
  student: (id =~ id, name =~ string, icon =~ avatar) => student })

var teacher_app = data ({
  setup: ( settings =~ settings ) => teacher_app,
	get_ready: ( room =~ room, settings =~ settings, students =~ list (student) ) => teacher_app,
	playing: ( room =~ room, settings =~ settings, students =~ list (student), progress =~ progress
           , boards =~ map (student) (board), pasts =~ map (student) (past), progresses =~ map (student) (progress) ) => teacher_app,
	game_over: ( room =~ room, settings =~ settings, students =~ list (student)
             , boards =~ map (student) (board), pasts =~ map (student) (past) ) => teacher_app })

var student_app = data ({
	get_ready: ( room =~ maybe (room), settings =~ maybe (settings), student =~ maybe (student) ) => student_app,
	playing: ( room =~ room, settings =~ settings, student =~ student, board =~ board, past =~ past, progress =~ progress ) => student_app,
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
	teacher_ping: ( ping =~ ping ) => message,
	teacher_settings: ( settings =~ settings ) => message,
	teacher_progress: ( progress =~ progress ) => message,
	student_ping: ( student =~ student, ping =~ ping ) => message,
	student_join: ( student =~ student, board =~ board ) => message,
	student_progress: ( student =~ student, progress =~ progress ) => message,
	student_update: ( student =~ student, past =~ past ) => message })
var ensemble = data ({
	ensemble: (
		ping =~ ping,
		settings =~ settings,
    progress =~ progress,
		pings =~ map (student) (ping),
		boards =~ map (student) (board),
		progresses =~ map (student) (timestamp),
		pasts =~ map (student) (past) ) => ensemble })




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
var default_rules = rules .rules (10, 4, win_rule .first_bingo)

var default_settings = settings .settings (default_problems, default_rules)



var to_maybe = so ((_=_=>
  default_fn => _x => 
    !! (Z_ .is (maybe_type_$)) (_x)
    ? _x
    : default_fn (_x),
  where
  , maybe_type_$ = Z_ .MaybeType (Z$ .Any) )=>_) 




//--------------------LENSES--------------------

var pair_as_v = so ((_=_=>
  L .iso (
  _pair => !! Z_ .is (pair_type_$) (_pair) ? [ Z_ .fst (_pair), Z_ .snd (_pair) ] : undefined,
  _v => !! Z_ .and (Z_ .is (array_type_$) (_v), Z_ .size (_v) === 2) ? Z_ .Pair (_v [0]) (_v [1]) : undefined),
  where
  , pair_type_$ = Z_ .PairType (Z$ .Any) (Z$ .Any)
  , array_type_$ = Z$ .Array (Z$ .Any) )=>_)
var pair_as_list = pair_as_v

//var pair_as_first = [ L .ifElse ($ (Z_ .is (Z .PairType (Z$ .Any) (Z$ .Any)))) (L .reread (Z_ .fst)) (L .zero),  ]
var pair_as_first = [ pair_as_list, L .first ]
var pair_as_second = [ pair_as_list, L .last ]

var list_as_pair = L .getInverse (pair_as_v)

var map_as_keys = [ L .elems, L .first ]
var map_as_values = [ L .elems, L .last ]
var as_value_of = key => 
  [ L .elems, L .when (([ _key, _val ]) => Z_ .equals (key) (_key)), L .valueOr ([ key, undefined ]), L .last ]

var as_maybe = [L .reread (to_maybe (_x => Z_ .Just (_x))), L .defaults (Z_ .Nothing)]
var as_defined = [L .reread (to_maybe (_ => Z_ .Nothing)), L .reread (Z_ .maybe (undefined) (_x => _x)), L .required (Z_ .Nothing)]
var as_defined_ = so ((_=_=>
  L .ifElse ($ (Z_ .is (maybe_type_$))) (as_defined) (L .identity),
  where
  , maybe_type_$ = Z_ .MaybeType (Z$ .Any) )=>_)

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
var app_as_progress = [ 'playing', 'progress' ]
var app_as_progresses = [ 'playing', 'progresses' ]
var app_as_board = [ L .choices ('playing', 'game_over'), 'board' ]
var app_as_past = [ L .choices ('playing', 'game_over'), 'past' ]
var app_as_boards = [ L .choices ('playing', 'game_over'), 'boards' ]
var app_as_pasts = [ L .choices ('playing', 'game_over'), 'pasts' ]

var io_as_inert = data_iso (io .inert)
var io_as_connecting = data_iso (io .connecting)
var io_as_heartbeat = data_iso (io .heartbeat)

var message_as_teacher_settings = data_iso (message .teacher_settings)
var message_as_teacher_ping = data_iso (message .teacher_ping) 
var message_as_teacher_progress = data_iso (message .teacher_progress) 
var message_as_student_ping = data_iso (message .student_ping) 
var message_as_student_join = data_iso (message .student_join) 
var message_as_student_progress = data_iso (message .student_progress) 
var message_as_student_update = data_iso (message .student_update) 

var message_as_student = [ L .choices (message_as_student_ping, message_as_student_join, message_as_student_progress, message_as_student_update), 'student' ]
var message_as_ping = [ L .choices (message_as_teacher_ping, message_as_student_ping), 'ping' ]
var message_as_board = message_as_student_join .board
var message_as_past = message_as_student_update .past
	
var ensemble_as_settings = data_iso (ensemble .ensemble) .settings 
var ensemble_as_ping = data_iso (ensemble .ensemble) .ping 
var ensemble_as_progress = data_iso (ensemble .ensemble) .progress 
var ensemble_as_pings = data_iso (ensemble .ensemble) .pings 
var ensemble_as_boards = data_iso (ensemble .ensemble) .boards 
var ensemble_as_progresses = data_iso (ensemble .ensemble) .progresses 
var ensemble_as_pasts = data_iso (ensemble .ensemble) .pasts 

var avatar_as_lion = data_iso (avatar .lion)
var avatar_as_bunny = data_iso (avatar .bunny)

var student_as_student = data_iso (student .student)

var student_as_id = data_lens (student .student) .id
var student_as_name = data_lens (student .student) .name
var student_as_icon = data_lens (student .student) .icon

var progress_as_step = [ 0 ]
var progress_as_timestamp = [ 1 ]

var attempt_as_position = [ 0 ]
var attempt_as_latency = [ 1 ]
var point_as_problem = data_lens (point .point) .problem
var point_as_attempts = data_lens (point .point) .attempts
var point_as_position = [ point_as_attempts, L .last, attempt_as_position ] 
var past_as_points = data_lens (past .past) .points
		
var settings_as_problems = data_lens (settings .settings) .problems
var settings_as_rules = data_lens (settings .settings) .rules
var app_as_problems = [ app_as_settings, settings_as_problems ]
var app_as_last_point = [ app_as_past, past_as_points, L .last ]

var rules_as_size = data_lens (rules .rules) .size
var rules_as_time_limit = data_lens (rules .rules) .time_limit
var rules_as_win_rule = data_lens (rules .rules) .win_rule
var settings_as_size = [ settings_as_rules, rules_as_size ]
var settings_as_time_limit = [ settings_as_rules, rules_as_time_limit ]
var settings_as_win_rule = [ settings_as_rules, rules_as_win_rule ]

var problem_as_question = [ 0 ]
var problem_as_answers = [ 1 ]

var cell_as_position = L .reread (_x => [ _x [0], _x [1] ])
var cell_as_choice = [ 2 ]

var as_position = ([x, y]) => [x - 1, y - 1]

//report: var pair = L .cond ([ (_x => _x .length === 2), [] ])
//var pair = L .cond ([ (_x => _x .length === 2), [] ], [L .zero])
//var student_name = L .choices ( [ pair_as_list, L .first, 'name' ], 'name' )

var ping_as_mean = [ 1 ]




//--------------------TRANSITIONS--------------------





var generate_board = size => problems =>
	so ((_=_=>
	T (Z_ .range (1) (size + 1)) (
		Z_ .map (row => T (Z_ .range (1) (size + 1)) (
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
    teacher_app .playing (_room, _settings, _students .map (x => Z_ .Pair (x) (undefined)), 0)))

var teacher_app_playing_to_next = 
	by (_app => 
		so ((_=_=>
		!! Z_ .not (game_over_ok)
		? L .set (app_as_progress) (progress + 1)
		: teacher_app_playing_to_game_over,
		where
		, progress = T (_app) (L .get (app_as_progress))
    , next_problem = T (_app) (L .get ([ app_as_problems, progress + 1 ]))
    , game_over_ok = Z_ .equals (next_problem) (undefined) )=>_)) 

var teacher_app_playing_to_game_over =  by (_app => 
  L .get (
    [ data_iso (teacher_app .playing)
    , L .inverse (data_iso (teacher_app .game_over)) ])) 

var student_app_get_ready_to_playing = by (_app =>
  under (complete_ (
		{	_room: app_as_room
    , _student: app_as_student
		,	_settings: app_as_settings })
  ) (({ _room, _student, _settings }) =>
		so ((_=_=>
		student_app .playing (_room, _settings, _student, random_board, fresh_past, 0),
		where 
		, _size = L .get (settings_as_size) (_settings)
		, _problems = L .get (settings_as_problems) (_settings)
    , random_board = generate_board (_size) (_problems)
    , first_problem = L .get (L .first) (_problems)
		, fresh_past = past .past ([point .point (first_problem, [])]) )=>_)))

var student_app_playing_to_next = 
	by (_app => 
		so ((_=_=>
		!! Z_ .not (game_over_ok)
		? $ (
      [ L .set (app_as_progress) (progress + 1)
      , L .set ([ app_as_past, past_as_points, L .appendTo ]) (point .point (next_problem, [])) ] )
		: student_app_playing_to_game_over,
		where
		, progress = T (_app) (L .get (app_as_progress))
    , next_problem = T (_app) (L .get ([ app_as_problems, progress + 1 ]))
    , game_over_ok = Z_ .equals (next_problem) (undefined) )=>_)) 
				 
var student_app_playing_to_game_over =  by (_app => 
  L .get (
    [ data_iso (student_app .playing)
    , L .inverse (data_iso (student_app .game_over)) ]))
				 

var ast = data ({
  normal: (numerator =~ integer, denominator =~ integer) => ast,
  add: (left =~ ast, right =~ ast) => ast,
  minus: (left =~ ast, right =~ ast) => ast,
  multiply: (left =~ ast, right =~ ast) => ast,
  divide: (left =~ ast, right =~ ast) => ast })

// TODO: simplify this
var problem_choice_matches = so ((_=_=>
  _problem => _choice => so ((_=_=>
    Z_ .equals (normalize (_question)) (normalize (_choice)),
    where
    , _question = T (_problem) (L .get (problem_as_question)) )=>_),
  where
  , str_parse = so ((
      define
      , order = [ '+', '-', '*', '/' ]
      , operation = 
          { '+': 'add'
          , '-': 'minus'
          , '*': 'multiply'
          , '/': 'divide' } ) =>
      L .get (apply (L .cond) (Z_ .concat (T (order) (Z_ .map (symbol => 
        [ R .includes (symbol), [ str => so ((_=_=>
            ast [operation [symbol]] (left, right),
            where
            , at = R .indexOf (symbol) (str) 
            , left = str_parse (str .slice (0, at))                                      
            , right = str_parse (str .slice (at + 1, Infinity)) )=>_) ] ] ))
        ) ([ [ str => ast .normal ( str * 1, 1 ) ] ]) ) )) //assuming str is integer
  , ast_as_normal = data_iso (ast .normal)
  , ast_as_add = data_iso (ast .add)
  , ast_as_minus = data_iso (ast .minus)
  , ast_as_multiply = data_iso (ast .multiply)
  , ast_as_divide = data_iso (ast .divide)
  , ast_normalize = L .get (L .cond (
      [ L .isDefined (ast_as_normal), [] ],
      [ L .isDefined (ast_as_add), under (ast_as_add) (({ left, right }) => so ((
          define
          , { numerator: left_numerator, denominator: left_denominator } = L .get (ast_as_normal) (ast_normalize (left))
          , { numerator: right_numerator, denominator: right_denominator } = L .get (ast_as_normal) (ast_normalize (right))
          , n = left_numerator * right_denominator + right_numerator * left_denominator
          , d = left_denominator * right_denominator
          , factor = gcd (n) (d) ) =>
          ast .normal (n / factor, d / factor) )) ],
      [ L .isDefined (ast_as_minus), under (ast_as_minus) (({ left, right }) => so ((
          define
          , { numerator: left_numerator, denominator: left_denominator } = L .get (ast_as_normal) (ast_normalize (left))
          , { numerator: right_numerator, denominator: right_denominator } = L .get (ast_as_normal) (ast_normalize (right))
          , n = left_numerator * right_denominator - right_numerator * left_denominator
          , d = left_denominator * right_denominator
          , factor = gcd (n) (d) ) =>
          ast .normal (n / factor, d / factor) )) ],
      [ L .isDefined (ast_as_multiply), under (ast_as_multiply) (({ left, right }) => so ((
          define
          , { numerator: left_numerator, denominator: left_denominator } = L .get (ast_as_normal) (ast_normalize (left))
          , { numerator: right_numerator, denominator: right_denominator } = L .get (ast_as_normal) (ast_normalize (right))
          , n = left_numerator * right_numerator
          , d = left_denominator * right_denominator
          , factor = gcd (n) (d) ) =>
          ast .normal (n / factor, d / factor) )) ],
      [ L .isDefined (ast_as_divide), under (ast_as_divide) (({ left, right }) => so ((
          define
          , { numerator: left_numerator, denominator: left_denominator } = L .get (ast_as_normal) (ast_normalize (left))
          , { numerator: right_numerator, denominator: right_denominator } = L .get (ast_as_normal) (ast_normalize (right))
          , n = left_numerator * right_denominator
          , d = left_denominator * right_numerator
          , factor = gcd (n) (d) ) =>
          ast .normal (n / factor, d / factor) )) ],
       //hack
       [ L .zero ] )) 
  , normalize = $ ([ str_parse, ast_normalize ])
  , gcd = a => b =>
      !! Z_ .equals (b) (0)
      ? a
      : gcd (b) (a % b) )=>_)


var size_patterns = memoize (size =>
	so ((_=_=>
	n_reducer (Z_ .concat) (3)
		(vertical_patterns)
		(horizontal_patterns)
		(diagonal_patterns),
	where
	, range = Z_ .range (1) (size + 1)
	, vertical_patterns =
			T (range) (Z_ .map (x =>
				T (range) (Z_ .map (y =>
					[x, y] ))))
	, horizontal_patterns =
			T (range) (Z_ .map (y =>
				T (range) (Z_ .map (x =>
					[x, y] ))))
	, diagonal_patterns =
      [ T (range) (Z_ .map (_x => [_x, _x]))
      , T (range) (Z_ .map (_x => [_x, (size + 1) - _x])) ] )=>_))

var local_patterns = memoize (patterns =>
	so ((_=_=>
  T (patterns
  ) (
  $ (L .foldl
  ) (
  map_zip (Z_ .concat)
  ) (
  T (_positions) (Z_ .map (_pos => [ _pos, [] ]))
  ) (
  [ L .elems
  , _pattern => T (_positions) (Z_ .map (_pos => [ _pos, Z_ .elem (_pos) (_pattern) ? [ _pattern ] : [] ] )) ])),
	where
	, _positions = Z_ .reduce (R .union) ([]) (patterns) )=>_))

// var current_problem = by (_past =>
//     L .get ([ past_as_points, L .last, point_as_problem ]))
var current_problem = by (_app =>
  so ((_=_=>
  L .get ([ app_as_problems, progress ]),
  where
  , progress = T (_app) (L .get (app_as_progress)) )=>_))
var current_problem_solved = _app =>
  so ((_=_=>
  Z_ .equals (Z_ .size (L .get (past_as_points))) (progress + 1),
  where
  , progress = T (_app) (L .get (app_as_progress)) )=>_)

var attempted_positions = by (_past =>
  L .collect ([ past_as_points, L .elems, point_as_position ]))


// make this more elegant
var solved_positions = _board => _past => so ((_=_=>
  T (_points
  ) (
  Z_ .chain (_point => so ((_=_=>
    !! (_position && problem_choice_matches (_problem) (_choice))
    ? [ _position ]
    : [],
    where
    , _problem = T (_point) (L .get (point_as_problem))
    , _position = T (_point) (L .get (point_as_position))
    , _choice = _position && T (_board) (L .get ([ as_position (_position), cell_as_choice ])) )=>_))),
  where
  , _points = T (_past) (L .get (past_as_points)) )=>_)

var bingoed_positions = _board => _past => 
	so ((_=_=> so ((_=_=>
	T (bingo_patterns
  ) (
  [ Z_ .filter (R .all (T (_solved_positions) (Z_ .flip (Z_ .elem))))
  , Z_ .join ]),
	where
	, bingo_patterns = size_patterns (_size) )=>_),
  where
	, _size = T (_board) (Z_ .size)
	, _solved_positions = solved_positions (_board) (_past) )=>_)

var bingoes = _board => _past => 
  so ((_=_=>
  T (_past) ([ L .collect ([ past_as_points, L .elems, point_as_position ])
  , $ (Z_ .reduce
    ) (
    ([ solved_positions, solved_patterns ]) => _position => so ((_=_=>
      [ positions, Z_ .append (solved_local_patterns) (solved_patterns) ],
      where
      , positions = Z_ .append (_position) (solved_positions)
      , solved_local_patterns = 
          T (_local_patterns
          ) (
          [ L .get (as_value_of (_position))
          , Z_ .filter (R .all (T (positions) (Z_ .flip (Z_ .elem)))) ]) )=>_)
    ) (
    [ [], [] ])
  , L .get (L .last) ]),
  where
  , _solved_positions = solved_positions (_board) (_past)
	, _size = T (_board) (Z_ .size)
  , _local_patterns = local_patterns (size_patterns (_size)) )=>_)



//optimizing this
var message_encoding = by (message => 
	so ((_=_=>
	$ (
  [ L .get ([ L .choices (...cases), data_iso (ensemble .ensemble) ])
	, strip ]),
	where
	, strip = $ ([ JSON .stringify, JSON .parse ]) 
  , _student = T (message) (L .get (message_as_student))
  , _student_id = T (_student) (L .get (student_as_id))
  , cases = 
      [ [ message_as_teacher_ping, map_defined (L .getInverse (ensemble_as_ping)) ]
      , [ message_as_teacher_settings, map_defined (L .getInverse (data_iso (ensemble .ensemble))) ]
      , [ message_as_teacher_progress, map_defined (L .getInverse (ensemble_as_progress)) ]
      , [ message_as_student_ping .ping
        , map_defined (L .getInverse ([ ensemble_as_pings, '' + _student_id, focused_iso_ ([ L .last ]) ([ _student, fiat ]) ])) ]
      , [ message_as_student_join .board
        , map_defined (L .getInverse ([ ensemble_as_boards, '' + _student_id, focused_iso_ ([ L .last ]) ([ _student, fiat ]) ])) ]
      , [ message_as_student_progress .progress
        , map_defined (L .getInverse ([ ensemble_as_progresses, '' + _student_id, focused_iso_ ([ L .last ]) ([ _student, fiat ]) ])) ]
      , [ message_as_student_update .past, map_defined (L .getInverse ([ ensemble_as_pasts, '' + _student_id, focused_iso_ ([ L .last ]) ([ _student, fiat ]) ])) ] ] )=>_))

var messages_encoding = list =>
	Z_ .reduce (R .mergeDeepRight) ({}) (list .map (message_encoding))

var schedule_start = _ensemble =>
	so ((_=_=>
	(new Date) .getTime () + confidence_interval,
	where
	, teacher_ping = T (_ensemble) (L .get (ensemble_as_ping))
	, student_pings = T (_ensemble) (L .collect ([ ensemble_as_pings, map_as_values ]))
	, pings = T (Z_ .prepend (teacher_ping) (student_pings)) (L .collect ([ L .elems, ping_as_mean ]))
	, confidence_interval = Z_ .min (3) (Z_ .reduce (Z_ .max) (0) (pings)) )=>_)



window .stuff = { ...window .stuff,
	bool, number, timestamp, string,
	list, map, maybe, nat, id, v, piece,
	shuffle, uuid, map_zip, api, post,
  timer, timer_since, time_intervals, 
	avatar, student, problem, choice, answer, latency, ping, position,
	attempt, point, past, board, win_rule, rules, settings,
	teacher_app, student_app,
	io, message, ensemble, 
	default_problems, default_rules, default_settings,
  pair_as_v, pair_as_list, pair_as_first, pair_as_second,
  list_as_pair, map_as_keys, map_as_values, as_value_of,
	as_maybe, as_defined, as_complete, complete_,
	app_as_setup, app_as_get_ready, app_as_playing, app_as_game_over, app_as_progress,
	settings_as_problems, settings_as_rules,
  settings_as_size, settings_as_time_limit, settings_as_win_rule,
	io_as_inert, io_as_connecting, io_as_heartbeat,
	ensemble_as_ping, ensemble_as_settings, ensemble_as_progress, 
	ensemble_as_pings, ensemble_as_progresses, ensemble_as_boards, ensemble_as_pasts,
  progress_as_step, progress_as_timestamp, 
  attempt_as_position, attempt_as_latency, point_as_attempts, point_as_position, past_as_points,
	app_as_settings, app_as_student, app_as_students, app_as_room, app_as_problems,
	app_as_board, app_as_past, app_as_progress,
	app_as_boards, app_as_pasts, app_as_progresses,
  app_as_last_point, point_as_attempts,
  avatar_as_lion, avatar_as_bunny, 
  student_as_student, student_as_id, student_as_name, student_as_icon, 
	rules_as_size, rules_as_time_limit, settings_as_size, settings_as_time_limit,
	problem_as_question, problem_as_answers,
	cell_as_position, as_position, cell_as_choice, 
	message_encoding, messages_encoding, schedule_start,
	teacher_app_get_ready_to_playing, teacher_app_playing_to_next, teacher_app_playing_to_game_over,
	student_app_get_ready_to_playing, student_app_playing_to_next, student_app_playing_to_game_over,
  current_problem, problem_choice_matches,
  attempted_positions, solved_positions, bingoed_positions, bingoes }