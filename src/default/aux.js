var {
	T, $, apply, L, L_, R, S, Z, Z_, Z$, sanc, memoize, 
	faith, belief, show, mark, please, 
	Y, impure, jinx, suppose,
	so, by, 
	go, never, panic, panic_on,
	just_now, temporal,
	fiat, data, as_in, as, data_kind,
	focused_iso_,
	last_n, n_reducer,
	l_sum, l_undefined,
	pin, pin_first, pinpoint,
	map_defined_, map_defined, from_just, 
	as_reduction, as_point, as_points_on, as_points, points_, pointed_, pointed_I,
	as_sole, sole, shuffle,
	I, K, not, equals
} = window .stuff



//--------------------TYPES--------------------

var uniq = _ => (uniq ._count = (uniq ._count || 0) + 1)
	
var bool = fiat
var nat = fiat
var integer = fiat
var string = fiat

var list = a => fiat
var map = a => (...b) => list (v (a, ...b))
var v = (...types) => fiat
var piece = (...types) => fiat
var maybe = a => fiat
var order = props => list// (v (... props, 'ascending' | 'descending'))

var number = fiat
var timestamp = number
var id = string
var url = string

var time_amount = number
var latency = time_amount
var ping = v (timestamp, latency, latency)
var time_interval = data ({ time_interval: (from =~ timestamp, to =~ timestamp) => time_interval })

var choice = string
var question = data ({
	text: (text =~ string) => question,
	image: (image =~ url, solution =~ choice) => question })
var problem = v (question, list (choice))

var ast = data ({
	normal: (numerator =~ integer, denominator =~ integer) => ast,
	add: (left =~ ast, right =~ ast) => ast,
	minus: (left =~ ast, right =~ ast) => ast,
	multiply: (left =~ ast, right =~ ast) => ast,
	divide: (left =~ ast, right =~ ast) => ast })

var position = v (nat, nat)
var attempt = v (problem, position, time_amount)
var past = data ({ past: (attempts =~ list (attempt)) => past })

var board = data ({ board: (choice =~ map (position) (choice)) => board })
	
var room = string

var avatar = data ({ 
	lion: () => avatar,
	bunny: () => avatar })
var student = data ({
	student: (id =~ id, name =~ string, icon =~ avatar) => student })

var win_rule = data ({ first_bingo: () => win_rule, limit_time: (time_limit =~ time_amount) => win_rule, all_problems: () => win_rule })
var rules = data ({ rules: (time_limit =~ number, size =~ nat, win_rule =~ win_rule) => rules })
var settings = data ({ settings: ( problems =~ list (problem), rules =~ rules ) => settings })

var progress = v (nat, timestamp)
var progression = data ({
	unended: (start =~ timestamp, progress =~ progress) => progression,
	ended: (start =~ timestamp, end =~ timestamp) => progression })

var teacher_app = data ({
	setup: ( settings =~ settings ) => teacher_app,
	get_ready: ( room =~ room, settings =~ settings, students =~ list (student) ) => teacher_app,
	playing: ( room =~ room, settings =~ settings, students =~ list (student)
		 , boards =~ map (student) (board), pasts =~ map (student) (past), progression =~ progression ) => teacher_app,
	game_over: ( room =~ room, settings =~ settings, students =~ list (student)
		 , boards =~ map (student) (board), pasts =~ map (student) (past), progression =~ progression ) => teacher_app })

var student_app = data ({
	setup: ( room =~ maybe (room), settings =~ maybe (settings), student =~ maybe (student) ) => student_app,
	get_ready: ( room =~ room, settings =~ settings, student =~ student ) => student_app,
	playing: ( room =~ room, settings =~ settings, student =~ student, board =~ board, past =~ past, progression =~ progression ) => student_app,
	game_over: ( room =~ room, settings =~ settings, student =~ student, board =~ board, past =~ past, progression =~ progression ) => student_app })

/*
var teacher_lookbehind = data ({
	nothing: () => teacher_lookbehind,
	bad_room: () => teacher_lookbehind })
*/

var io = data ({
	inert: () => io,
	messaging: () => io })


var message = data ({
	teacher_ping: ( ping =~ ping ) => message,
	teacher_settings: ( settings =~ settings ) => message,
	teacher_progression: ( progression =~ progression ) => message,
	student_ping: ( student =~ student, ping =~ ping ) => message,
	student_join: ( student =~ student, board =~ board ) => message,
	student_update: ( student =~ student, past =~ past ) => message })
var ensemble = data ({
	ensemble: (
		ping =~ ping,
		pings =~ map (student) (ping),
		settings =~ settings,
		progression =~ progression,
		boards =~ map (student) (board),
		pasts =~ map (student) (past) ) => ensemble })







//--------------------LENSES--------------------
var map_v_as_key = L .first
var map_v_as_value = L .last
var as_value_of = key => 
	[ L .elems, L .when (([ _key, _val ]) => equals (key) (_key)), L .valueOr ([ key, undefined ]), L .last ]

var as_complete = L .when (L .none (equals (undefined)) (L .values))
var complete_ = L .get (as_complete)

var app_as_in_setup = L .choice (as_in (teacher_app .setup), as_in (student_app .setup))
var app_as_in_get_ready = L .choice (as_in (teacher_app .get_ready), as_in (student_app .get_ready))
var app_as_in_playing = L .choice (as_in (teacher_app .playing), as_in (student_app .playing))
var app_as_in_game_over = L .choice (as_in (teacher_app .game_over), as_in (student_app .game_over))

var app_as_settings = [ L .choice ('setup', 'get_ready', 'playing', 'game_over'), 'settings' ]
var app_as_student = [ L .choice ('setup', 'get_ready', 'playing', 'game_over'), 'student' ]
var app_as_room = [ L .choice ('setup', 'get_ready', 'playing', 'game_over'), 'room' ]
var app_as_students = [ L .choice ('get_ready', 'playing', 'game_over'), 'students' ]
var app_as_progression = [ L .choice ('playing', 'game_over'), 'progression' ]
var app_as_board = [ L .choice ('playing', 'game_over'), 'board' ]
var app_as_past = [ L .choice ('playing', 'game_over'), 'past' ]
var app_as_boards = [ L .choice ('playing', 'game_over'), 'boards' ]
var app_as_pasts = [ L .choice ('playing', 'game_over'), 'pasts' ]

var progress_as_step = [ 0 ]
var progress_as_timestamp = [ 1 ]

var attempt_as_problem = [ 0 ]
var attempt_as_position = [ 1 ]
var attempt_as_latency = [ 2 ]
		
var app_as_problems = [ app_as_settings, as (settings) .problems ]
var app_as_last_attempt = [ app_as_past, as (past) .attempts, L .last ]

var settings_as_size = [ as (settings) .rules, as (rules) .size ]
var settings_as_time_limit = [ as (settings) .rules, as (rules) .time_limit ]
var settings_as_win_rule = [ as (settings) .rules, as (rules) .win_rule ]

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





var teacher_app_get_ready_to_playing = by (_app =>
	suppose (
	( timestamp = + (new Date)
	) =>
	pinpoint (
	[	[ as_in (teacher_app .get_ready)
		, L .inverse (as_in (teacher_app .playing)) ]
	// implementation detail... how come i am leaking it!???
	// (as in, maps are not supposed to have order, but this is being implemented to solve order issues
	, by (_app => so ((_=_=>
		// pictoral programming is PARAMOUNT
		$ (
		[ L .set (app_as_boards) (R .map (_student => [ _student, undefined ]) (_students))
		, L .set (app_as_pasts) (R .map (_student => [ _student, undefined ]) (_students)) ]),
		where
		, _students = L .get (app_as_students) (_app) )=>_) )
	, L .set (app_as_progression) (progression .unended (timestamp, [ 0, timestamp ])) ] ) ) )

var teacher_app_playing_to_next = by (_app => so ((_=_=>
	!! not (game_over_yes) ? L .set ([ app_as_progression, as (progression) .progress ]) ([ progress_step + 1, progress_timestamp + time_limit * 1000 ])
	: teacher_app_playing_to_game_over,
	where
	, time_limit = T (_app) (L .get ([ app_as_settings, settings_as_time_limit ]))
	, [ progress_step, progress_timestamp ] = T (_app) (L .get ([ app_as_progression, as (progression) .progress ]))
	, _size = T (_app) (L .get ([ app_as_settings, settings_as_size ]))
	, game_over_yes = progress_step + 1 >= _size * _size )=>_))

var teacher_app_playing_to_game_over = by (_app => 
	pinpoint (
	[ as_in (teacher_app .playing)
	, L .inverse (as_in (teacher_app .game_over))
	, L .modify (app_as_progression
		) (
		pinpoint (
		[ as_in (progression .unended)
		, L .inverse (as_in (progression .ended)) ] ) ) ] ) ) 

var student_app_setup_to_get_ready = by (_app => 
	pinpoint (
	[ as_in (student_app .setup)
	, L .inverse (as_in (student_app .get_ready)) ] ) ) 

var student_app_get_ready_to_playing = by (_app => so ((_=_=>
	pinpoint (
	[ 	[ as_in (student_app .get_ready)
		, L .inverse (as_in (student_app .playing)) ]
	, L .set (app_as_board) (random_board)
	, L .set (app_as_past) (fresh_past)
	, L .set (app_as_progress) ([ 0, fiat ]) ]),
	where 
	, _settings = L .get (app_as_settings) (_app)
	, _size = L .get (settings_as_size) (_settings)
	, _problems = L .get (as (settings) .problems) (_settings)
	, random_board = generate_board (_size) (_problems)
	, first_problem = L .get (L .first) (_problems)
	, fresh_past = past .past ([]) )=>_))

var student_app_playing_to_next = by (_app => 
	so ((_=_=>
	!! not (game_over_yes) ? L .set (app_as_progress) ([ progress_step + 1, progress_timestamp + time_limit * 1000 ])
	: student_app_playing_to_game_over,
	where
	, time_limit = T (_app) (L .get ([ app_as_settings, settings_as_time_limit ]))
	, [ progress_step, progress_timestamp ] = T (_app) (L .get (app_as_progress))
	, _size = T (_app) (L .get ([ app_as_settings, settings_as_size ]))
	, game_over_yes = progress_step + 1 >= _size * _size )=>_))

var student_app_playing_to_game_over = by (_app => 
	pinpoint (
	[ as_in (student_app .playing)
	, L .inverse (as_in (student_app .game_over)) ] ) )











var generate_board = size => problems => so ((_=_=>
	T (R .range (1) (size + 1)) (
		R .map (row => T (R .range (1) (size + 1)) (
			R .map (column => [row, column, cell (row) (column)] )))),
	where 
	, cells = shuffle (problems .slice (0, size * size))
	, cell = y => x =>
		T (cells) (L .get (
			[ (x - 1) * size + (y - 1)
			, problem_as_answers
			, L .reread (shuffle)
			, L .first ])) )=>_)

var size_patterns = memoize (size =>
	so ((_=_=>
	n_reducer (R .concat) (3)
		(vertical_patterns)
		(horizontal_patterns)
		(diagonal_patterns),
	where
	, range = R .range (1) (size + 1)
	, vertical_patterns =
		T (range) (R .map (x =>
			T (range) (R .map (y =>
				[x, y] ))))
	, horizontal_patterns =
		T (range) (R .map (y =>
			T (range) (R .map (x =>
				[x, y] ))))
	, diagonal_patterns =
		[ T (range) (R .map (_x => [_x, _x]))
		, T (range) (R .map (_x => [_x, (size + 1) - _x])) ] )=>_))

var local_patterns = memoize (patterns =>
	so ((_=_=>
	T (patterns
	) (
	$ (L .foldl
	) (
	(a, b) => map_zip (R .concat) (a) (b)
	) (
	T (_positions) (R .map (_pos => [ _pos, [] ]))
	) (
	[ L .elems
	, _pattern => T (_positions) (R .map (_pos => [ _pos, R .includes (_pos) (_pattern) ? [ _pattern ] : [] ] )) ])),
	where
	, _positions = R .reduce (R .union) ([]) (patterns) )=>_))



var nth_letter = by (nth =>
	pinpoint (
	as_points (
	[ [ 1, 'b' ]
	, [ 2, 'i' ]
	, [ 3, 'n' ]
	, [ 4, 'g' ]
	, [ 5, 'o' ] ] ) ) )
var pattern_shape = _pattern =>
	suppose (
	( [ first_y, first_x ] = L .get (L .first) (_pattern)
	, [ last_y, last_x ] = L .get (L .last) (_pattern)
	) =>
	!! equals (first_x) (last_x) ? 'vertical'
	: equals (first_y) (last_y) ? 'horizontal'
	: (first_x < last_x) ? 'diagonal-down'
	: (first_x > last_x) ? 'diagonal-up'
	: undefined )



var board_choice = _board => _position =>
	T (_board) (L .get ([ as_position (_position), cell_as_choice ]))


var as_metapl = lens_fn => from_lens => [ from_lens, L .choose ((value, index) => K (value === undefined ? L .zero : lens_fn (value, index))) ]
var as_lens = traversal => L .lens (L .get (traversal)) (L .set (traversal))
var by_lens = $ ([ L .get, L .choose ])

var current_problem = by (_app =>
	L .get (
	by_lens (
	as_metapl (_progress_step =>
		[ app_as_problems, _progress_step ] 
	) (
	as_lens ([ app_as_progress, progress_as_step ]) ) ) ) )


var current_problem_completed = _problem => _board => _attempt => so ((_=_=>
	T (
	{ _problem
	, _board
	, _attempt }
	) (
	pinpoint (
	[ as_complete
	, ({ _problem, _board, _attempt }) => 
		T (_attempt) (pinpoint ([ join ([ attempt_as_position, board_choice (_board), problem_choice_matches (_problem) ]), L .valueOr (false) ])) ] ) ),
	where
	, join_2 = map_a => map_b => L .chain (K (map_b)) (map_a)
	, join = R .reduce ((a, b) => join_2 (a) (b)) ([]) )=>_)
		

var as_solved_on = memoize (_board =>
	L .when (by (_attempt =>
		pinpoint (
		[ attempt_as_position
		, L .when (I)
		, _position => so ((_=_=>
			problem_choice_matches (_problem) (_choice),
			where
			, _problem = T (_attempt) (L .get (attempt_as_problem))
			, _choice = T (_board) (L .get ([ as_position (_position), cell_as_choice ])) )=>_) ] ) )) )

var solved_positions = _board => by (_past => 
	L .collect ([ as (past) .attempts, L .elems, as_solved_on (_board), attempt_as_position ]))

var bingoed_positions = _board => _past => 
	L .collect ([ L .elems, L .elems ]) (bingoes (_board) (_past))

var bingoes = _board => _past => so ((_=_=>
	final_solved_patterns,
	where
	, _solved_positions = solved_positions (_board) (_past)
	, _size = T (_board) (R .length)
	, _local_patterns = local_patterns (size_patterns (_size))
	, [ , final_solved_patterns ] = T (_solved_positions) (T ([ [], [] ]
		) (
		R .reduce (memoize (([ solved_positions, solved_patterns ], _position) => so ((_=_=>
			[ positions, [ ...solved_patterns, ...solved_local_patterns ] ],
			where
			, positions = [ ...solved_positions, _position ]
			, solved_local_patterns = 
				T (_local_patterns
				) (
				L .collect ([ as_value_of (_position), L .elems, L .when (L .isEmpty ([ L .elems, L .unless (R .flip (R .includes) (positions)) ])) ]) ) )=>_))) ) ) )=>_)






var problem_choice_matches = _problem => _choice => so ((_=_=>
	!! L .isDefined (as (question) .text) (_question) 
	? equals (normal_parse_problem (_text)) (normal_parse_problem (_choice))
	: L .isDefined (as (question) .image) (_question) 
	? equals (_solution) (_choice)
	: panic ('bad question'),
	where
	, _question = T (_problem) (L .get (problem_as_question))
	, _text = T (_question) (L .get (as (question) .text))
	, _solution = T (_question) (L .get (as (question) .solution)) )=>_)





																	
var ast_simplify = n => d =>
	suppose (
	( factor = gcd (n) (d)
	) =>
	ast .normal (n / factor, d / factor) )
var ast_recursive_normalized = by (ast =>
	pinpoint (
	[ L .choice (as_in (ast .add), as_in (ast .minus), as_in (ast .multiply), as_in (ast .divide))
	, ({ left, right }) => 
		suppose (
		( { numerator: l_n, denominator: l_d } = L .get (as_in (ast .normal)) (normalize_ast (left))
		, { numerator: r_n, denominator: r_d } = L .get (as_in (ast .normal)) (normalize_ast (right))
		) =>
		{ l_n, l_d, r_n, r_d } ) ] ) )
var normalize_ast = by (ast =>
	pinpoint (
	L .choice 
	( L .when (as_in (ast .normal))
	, (
		[ L .choice
			( [ L .when (as_in (ast .add)), ast_recursive_normalized, ({ l_n, l_d, r_n, r_d }) => (
				{ n = left_numerator * right_denominator + right_numerator * left_denominator
				, d = left_denominator * right_denominator } ) ]
			, [ L .when (as_in (ast .minus)), ast_recursive_normalized, ({ l_n, l_d, r_n, r_d }) => (
				{ n = left_numerator * right_denominator - right_numerator * left_denominator
				, d = left_denominator * right_denominator } ) ]
			, [ L .when (as_in (ast .multiply)), ast_recursive_normalized, ({ l_n, l_d, r_n, r_d }) => (
				{ n = left_numerator * right_numerator
				, d = left_denominator * right_denominator } ) ]
			, [ L .when (as_in (ast .divide)), ast_recursive_normalized, ({ l_n, l_d, r_n, r_d }) => (
				{ n = left_numerator * right_denominator
				, d = left_denominator * right_numerator } ) ] )
		, L .when (I)
		, ({ n, d }) => ast_simplify (n) (d) ] ) ) ) )
var analyze_to_ast = symbol => cons => str => 
	suppose (
	( loc = R .indexOf (symbol) (str) 
	, left = parse_to_ast (str .slice (0, loc))																			 
	, right = parse_to_ast (str .slice (loc + 1, Infinity))
	) =>
	cons (left, right) )
var parse_to_ast = by (str => so ((_=_=>
	!! matched_symbol
	? analyze_to_ast (matched_symbol) (matched_cons)
	: str => ast .normal (str * 1, 1), // assuming str is integer
	where
	, operation = 
		{ '+': 'add'
		, '-': 'minus'
		, '*': 'multiply'
		, '/': 'divide' }
	, operation_order = [ '+', '-', '*', '/' ]
	, matched_symbol = R .find (symbol => R .includes (symbol) (str)) (operation_order)
	, matched_cons = ast [operation [matched_symbol]] )=>_) )
var normal_parse_problem = $ ([ parse_to_ast, normalize_ast ])
var gcd = a => b =>
	!! equals (b) (0)
	? a
	: gcd (b) (a % b)






var message_encoding = by (message => 
	so ((_=_=>
	pinpoint (
	[ L .choice ( ... 
		[ [ as_in (message .teacher_ping) .ping, L .when (I), L .getInverse (as (ensemble) .ping) ]
		, [ as_in (message .teacher_settings) .settings, L .when (I), L .getInverse (as (ensemble) .settings) ]
		, [ as_in (message .teacher_progression) .progression, L .when (I), L .getInverse (as (ensemble) .progression) ]
		, [ as_in (message .student_ping) .ping, L .when (I), L .getInverse ([ as (ensemble) .pings, wrapped_with_student ]) ]
		, [ as_in (message .student_join) .board, L .when (I), L .getInverse ([ as (ensemble) .boards, wrapped_with_student ]) ]
		, [ as_in (message .student_update) .past, L .when (I), L .getInverse ([ as (ensemble) .pasts, wrapped_with_student ]) ] ] )
	, as_in (ensemble .ensemble)
	, strip ] ),
	where
	, strip = L .modify (L .satisfying (equals ())) (L_ .remove)
	, _student = T (message) (L .get (as (message) .student))
	, _student_id = '' + T (_student) (L .get (as (student) .id))
	, wrapped_with_student = [ _student_id, L .mapping (val => [ [ _student, val ], val ] ) ] )=>_))

var messages_encoding = list =>
	R .reduce (R .mergeDeepRight) ({}) (list .map (message_encoding))

var decode_to_ensemble =
	pinpoint (
	[ L .inverse (as_in (ensemble .ensemble))
	, L .modify (as (ensemble) .pings) (L .collect (L .values))
	, L .modify (as (ensemble) .boards) (L .collect (L .values))
	, L .modify (as (ensemble) .pasts) (L .collect (L .values)) ] )







var ticker = reference_state => _precision => 
	suppose (
	( _flow
	, _ticker_state = belief (_reference => {
			var reflow = _ => {
				// rewrite with monads
				;_flow = requestAnimationFrame (_ => {
					var _reference = show (reference_state)
					var _tick = Math .floor (((+ (new Date)) - _reference) / _precision)
					if (L_ .isDefined (_reference) && not (equals (_tick) (show (_ticker_state))) && _tick >= 0) {
						;please (I) (_ticker_state) }
					else {
						;reflow () } } ) }

			;reflow ()
			;S .cleanup (_ => {;cancelAnimationFrame (_flow)})

			return ((+ (new Date)) - _reference) / _precision }
		) (
		reference_state )
	) =>
	_ticker_state )
var protocol = _continue => {
	;_continue ('read') (_continue => {
		;_continue ('read') (_continue => {
			;_continue ('write') (_continue => {
				;protocol (_continue) }) }) }) }
var consensus = _ =>
	suppose (
	( next_deal = S .data ()
	, deal = S .on (next_deal, suppose (
		( deals_to_do = protocol
		, _deal = _ => {
			var next
			;deals_to_do (_head => _tail => {
				;next = _head 
				;deals_to_do = _tail })
			return next }
		) =>
		_deal ) )
	) =>
	[ deal, next_deal ] )








// add retire code for sockets?
var _api = so ((_=_=>
	(room, req) => {
		;req = req || { method: 'GET' }
		if (req .body) {
			;req .body = JSON .parse (req .body) }

		var [ continuation, signal ] = _api .new_continuation ()
		var id = new_id ()

		;_api .continuations [id] = signal
		;continuation .catch (I) .then (_=> {;delete _api .continuations [id]})

		if (! _api .sockets [room]) {
			;_api .sockets [room] = new_socket (room) }
		;_api .sockets [room] .refresh ()

		;suppose (
		( begin, end
		) =>
		go
		.then (K (_api .sockets [room] .ready))
		.then (_=> {;_api .sockets [room] .send (JSON .stringify ({ ... req, id: id }))})
		.then (_=> {;begin = performance .now ()})
		.then (K (continuation))
		.then (_=> {;end = performance .now ()})
		.then (impure (_ => 
			T (_api .ping (room)
			) (
			[ S .sample
			, update_ping (end - begin)
			, _api .ping (room) ] ) ) )
		.catch (K ()) )
		
		return continuation },
	where
	, new_id = _ =>
		suppose (
		( id = '' + Math .floor (1000000 * Math .random ())
		) =>
		!! not (_api .continuations [id])
		? id
		: new_id () )
	//TODO: make this more elegant
	, new_socket = room => so ((_=_=>
		( rec =
			{ _socket: _
			, ready: _
			, refresh: refresh
			, send: req => _socket .send (req) }
		, refresh ()
		, rec ),
		where
		, rec = _
		, _socket = _
		, refresh = _ => {
			if (! (_socket instanceof WebSocket)
			|| _socket .readyState === WebSocket .CLOSED
			|| _socket .readyState === WebSocket .CLOSING) {
				;_socket = new WebSocket ('wss://' + window .location .host + '/room/' + room)
				rec ._socket = _socket
				rec .ready = new Promise ((resolve, reject) => {
					;_socket .onopen = _ => {;resolve ()} })
				_socket .onmessage = _event => {
					var _packet = JSON .parse (_event .data)
					var id = _packet .id
					var data = _packet .body
					if (_api .continuations [id]) {
						 ;_api .continuations [id] (data) } } } } )=>_)

	, update_ping = sample => by (ping_info =>
		pinpoint (
		[ L .valueOr ([0, 0, 0, 0])
		, ([ mean, sqr_mean, n, _ ]) => so ((_=_=>
			[ mean * carry + sample / (n + 1)
			, sqr_mean * carry + (sample * sample) / (n + 1)
			, n + 1
			, (new Date) .getTime () ],
			where 
			, carry = n / (n + 1) )=>_) ] ) ) )=>_)
var _pings = {}
;_api .ping = room => {
	if (! _pings [room]) {
		;_pings [room] = S .data () }
	return _pings [room] } 
;_api .sockets = []
;_api .continuations = {}
;_api .new_continuation = timeout => {
	;timeout = timeout || 3000
																		 
	var resolve, reject
	var done = false
	var faux_resolve = _x => {
		if (! done) {
			;resolve (_x) } }
	
	var continuation = (new Promise ((_resolve, _reject) => {
		;resolve = _resolve
		;reject = _reject }))
	;continuation .catch (I) .then (_ => {;done = true})
	
	;setTimeout (_ => {;reject ({ error: 'timeout' })}, timeout)
	
	return [ continuation, faux_resolve ] }



var order_sort = _ordering => by (list => so ((_=_=>
	R .sortWith (comp),
	where
	, comp = T (_ordering) (R .map (([ prop, direction ]) =>
		!! equals (direction) ('ascending') ? R .ascend (prop)
		: equals (direction) ('descending') ? R .descend (prop)
		: panic ('unknown direction') )) )=>_))
var direction_opposite = _direction =>
	!! equals (_direction) ('ascending') ? 'descending'
	: equals (_direction) ('descending') ? 'ascending'
	: panic ('unknown direction')
var toggle_order = prop => _ordering => so ((_=_=>
	[ [prop, opposite_direction], ... irrelevant_orderings ],
	where
	, irrelevant_orderings = T (_ordering) (R .filter (([_prop, _]) => not (equals (prop) (_prop))))
	, opposite_direction = T (_ordering) (pinpoint ([ R .find (([_prop, _]) => equals (prop) (_prop)), L .last, L .valueOr ('ascending'), direction_opposite ])) )=>_)


var api = so ((_=_=> impure ((room, req) =>
	(!! req ? _api (room, encode (req))
	: _api (room))
	.then (decode) ),
	where
	, post = x => (
		{ method: 'POST'
		, headers:
			{ 'Accept': 'application/json'
			, 'Content-Type': 'application/json' }
		, body: JSON .stringify (x) })
	, encode = 
		suppose (
		( as_list = 'length' // HACK
		) =>
		by (_message =>
			[ !! L .isDefined (as_list) (_message)
				? messages_encoding
				: message_encoding
			, post ] ) )
	, decode = pinpoint (
		L .choices
		( L .when (L .isDefined ('error'))
		, L .when (L .isDefined ('ok'))
		, decode_to_ensemble ) ) )=>_)
;api .ping = _api .ping




var room_status = by (_room =>
	pinpoint (
	[ L .when (I)
	, _room => api .ping (_room) ()
	, L .when (I)
	, ([ mean, variance, n, timestamp ]) => 
		[ timestamp, mean, Math .sqrt (variance) ] ] ) )



// not compositional
var with_io = _then =>
	go
	.then (_ => {
		;please (L_ .set (io .on)) (io_state) })
	.then (_then)
	.catch (_e => {
		;console .error (_e) })
	.then (_ => {
		;please (L_ .set (io .off)) (io_state) })




// rewrite functionally?
var map_zip = zipper => a => b => {
	var _zip = []
	;T (b) (R .forEach (([ _key, _val ]) => {
		for (var i = 0; i < a .length; i ++) {
			var [ k, v ] = a [i]
			if (equals (k) (_key)) {
				;_zip = _zip .concat ([ [ _key, zipper (v) (_val) ] ]) } } }))
	return _zip }

// difference between belief and S; belief is lazy, S is eager
// belief has a truly synchronous timeline (one true faith)
// polytypic once said: 'reducers compose; lenses decompose'
// this is true because data is the free object
// and decompositions are the one true expression of operations on the free object
// this should also apply to S .data s
var last_n = memoize (n => T () (memoize (state => 
	S (_last_n =>
		[ ... R .tail (_last_n), mark (state) ]
	, [ ... R .map ( K ()
		) (
		R .range (0) (n) ) ] ) ) ) )

var mean = by (memoize (state =>
	suppose (
	( running_means = S ($ ([ pinpoint (L .valueOr ([ 0, 0 ])), ([ last_mean, n ]) =>
		[ (last_mean * n + state ()) / (n + 1), n + t ] ]))
	, mean = S (_ =>
		suppose (
		( [ _mean, _ ] = running_means ()
		) =>
		_mean ) )
	) =>
	mean ) ) )


var el = x => !! equals (x) (undefined) ? [] : x
var attrs_ = pinpoint (L .modify (L .values) (L .get (L .cond ([ I, K ('') ]))))
var on_ = ([ events, handler ]) => impure (_el =>
	if (_el) {
		;events .forEach (_event => {
			;_el .addEventListener (_event, handler) } ) } )
var View = ({ children }) => ({ children }) => <html>{ children }</html> .firstChild


var uuid = _ =>
	'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' .replace (/[xy]/g, c =>
		suppose (
		( r = Math .random () * 16 | 0
		, v = c == 'x' ? r : (r & 0x3 | 0x8)
		) =>
		v .toString (16) ))



//--------------------RESOURCES--------------------



var clicking = ['click', 'touchstart'] .filter (_e => 'on' + _e in window) .slice (0, 1)
var play = impure (by (([ play, pause ]) => play))
var pause = impure (by (([ play, pause ]) => pause))
var delay = time =>
	suppose (
	( _ready
	, promise = new Promise (ok => {;_ready = ok})
	, $__delay = jinx (_ => {;setTimeout (_ready, time)})
	) =>
	promise )
var audio_from = (url, loop = false) =>
	suppose (
	( el = new Audio (url)
	, ready_yet
	, ready = new Promise (ok => {;ready_yet = ok})
	, $__preload = jinx (_ => {
		;el .volume = 0
		var _load = impure (_ =>
			go
			.then (_ => {
				;el .play () })
			.catch (_ => 
				delay (50)
				.then (_load) ) )
		;go
		.then (_load)
		.then (ready_yet) })
	, $__loop = jinx (_ => {
		;el .loop = loop })
	, _play = _ => {
		;el .currentTime = 0
		;el .volume = 1
		;ready .then (_ => {
			;el .play () }) }
	, _pause = _ => {
		;el .volume = 0 }
	) =>
	[ _play, _pause ] )





//--------------------RESOURCES--------------------


var audio = 
	{ correct: audio_from ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudent-correct.mp3?1546277231570')
	, incorrect: audio_from ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudent-incorrect.mp3?1546277231539')
	, student_bingo: audio_from ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudent-bingo.mp3?1546277231054')
	, countdown: audio_from ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fquestion-countdown.mp3?1546277335320')
	, teacher_bingo: audio_from ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fteacher-bingo.mp3?1553677919629')
	, background: audio_from ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fbackground.mp3?1546277343019', true) } 

var img = T (
	{ logo: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flogo.png' 

	, join: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fjoin.png'

	, lion_avatar: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flion-avatar.png'
	, bunny_avatar: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fbunny-avatar.png'

	, connect: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fconnect.png' 

	, music_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fmusic-on.png'
	, music_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fmusic-off.png'

	, prev: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fcounter-prev.png'
	, next: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fcounter-next.png'

	, three_by_three_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F3x3-off.png'
	, three_by_three_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F3x3-on.png'
	, four_by_four_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F4x4-on.png'
	, four_by_four_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F4x4-off.png'
	, five_by_five_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F5x5-on.png'
	, five_by_five_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F5x5-off.png'

	, ten_secs: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F10-secs.png'
	, twenty_secs: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F20-secs.png'
	, thirty_secs: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F30-secs.png'

	, time_limit_play: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftime-limit-play.png'
	, play_to_win: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fplay-to-win.png'
	, free_play: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ffree-play.png'

	, view_students: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fview-students.png'
	, show_problem: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fshow-problem.png'
	, end_game: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fend-game.png'
	, cancel: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fcancel.png'
	, confirm: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fconfirm.png'

	, show_results_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fshow-results-on.png'
	, show_results_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fshow-results-off.png'
	, overall_analysis_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foverall-analysis-on.png'															
	, overall_analysis_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foverall-anlysis-off.png'														 
	, students_analysis_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudents-analysis-on.png'
	, students_analysis_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudents-analysis-off.png'
	, problems_analysis_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fproblems-analysis-on.png'
	, problems_analysis_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fproblems-analysis-off.png'

	, toggle_ordering: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Forder-icon.png'														
	, play_again: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fplay-again.png'
	
	
	




	, analysis_box: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fanalysis-box.png'
	, counter_background: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fcounter-background.png'
	, counter_go_minus: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fcounter-go-minus.png'
	, counter_go_plus: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fcounter-go-plus.png'
	, go_back: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-back.png'
	, go_cancel: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-cancel.png'
	, go_confirm: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-confirm.png'
	, go_connect: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-connect.png'
	, go_end_game: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-end-game.png'
	, go_join: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-join.png'
	, go_play_again: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-play-again.png'
	, go_preview: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-preview.png'
	, go_save_report: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-save-report.png'
	, go_show_problem: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-show-problem.png'
	, go_start: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-start.png'
	, go_view_students: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-view-students.png'
	, label_10_mins: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flabel-10-mins.png'
	, label_answers: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flabel-answers.png'
	, label_average_solved_time: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flabel-average-solved-time.png'
	, label_number_of_attempted: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flabel-number-of-attempted.png'
	, label_number_of_solved: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flabel-number-of-solved.png'
	, label_questions: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flabel-questions.png'
	, label_second: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flabel-second.png'
	, mode_competitive_play: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fmode-competitive-play.png'
	, mode_free_play: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fmode-free-play.png'
	, mode_time_limit: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fmode-time-limit.png'
	, overall_analysis_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foverall-analysis-off.png'
	, overall_analysis_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foverall-analysis-on.png'
	, preview_box: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fpreview-box.png'
	, problems_analysis_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fproblems-analysis-off.png'
	, problems_analysis_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fproblems-analysis-on.png'
	, question_box: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fquestion-box.png'
	, show_results_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fshow-results-off.png'
	, show_results_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fshow-results-on.png'
	, students_analysis_box: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudents-analysis-box.png'
	, students_analysis_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudents-analysis-off.png'
	, students_analysis_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudents-analysis-on.png'
	, text_average_number_of_attempts: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftext-average-number-of-attempts.png'
	, text_average_solved_time: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftext-average-solved-time.png'
	, text_bingo: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftext-bingo.png'
	, text_game_mode: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftext-game-mode.png'
	, text_name: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftext-name.png'
	, text_nth: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftext-nth.png'
	, text_number_of_attempts: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftext-number-of-attempts.png'
	, text_number_of_solved: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftext-number-of-solved.png'
	, text_number_of_solvers: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftext-number-of-solvers.png'
	, text_number_of_students_is: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftext-number-of-students-is.png'
	, text_problem: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftext-problem.png'
	, text_question: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftext-question.png'
	, text_room_number: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftext-room-number.png'
	, text_room_number_is: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftext-room-number-is.png'
	, text_solved_time: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftext-solved-time.png'
	, text_terminate_game: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftext-terminate-game.png'
	, text_time_limit: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftext-time-limit.png'
	, text_waiting_message: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftext-waiting-message.png'
	, time_10_secs: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftime-10-secs.png'
	, timer: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftimer.png'

	, oup_question_01: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-01.png'
	, oup_question_02: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-02.png'
	, oup_question_03: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-03.png'
	, oup_question_04: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-04.png'
	, oup_question_05: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-05.png'
	, oup_question_06: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-06.png'
	, oup_question_07: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-07.png'
	, oup_question_08: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-08.png'
	, oup_question_09: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-09.png'
	, oup_question_10: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-10.png'
	, oup_question_11: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-11.png'
	, oup_question_12: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-12.png'
	, oup_question_13: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-13.png'
	, oup_question_14: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-14.png'
	, oup_question_15: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-15.png'
	, oup_question_16: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-16.png'
	, oup_question_17: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-17.png'
	, oup_question_18: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-18.png'
	, oup_question_19: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-19.png'
	, oup_question_20: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-20.png'
	, oup_question_21: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-21.png'
	, oup_question_22: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-22.png'
	, oup_question_23: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-23.png'
	, oup_question_24: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-24.png'
	, oup_question_25: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-25.png'
	, oup_question_26: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-26.png'
	, oup_question_27: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-27.png'
	, oup_question_28: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-28.png'
	, oup_question_29: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-29.png'
	, oup_question_30: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-30.png' }
	) (
	L .modify (L .values) (url => url + ('?' + (+ (new Date))) ) )


//--------------------DEFAULTS--------------------



var default_problems = shuffle ([
	[question .image (img .oup_question_01, '11'), ['11']],
	[question .image (img .oup_question_02, '4'), ['4']],
	[question .image (img .oup_question_03, '5'), ['5']],
	[question .image (img .oup_question_04, '41'), ['41']],
	[question .image (img .oup_question_05, '1'), ['1']],
	[question .image (img .oup_question_06, '0'), ['0']],
	[question .image (img .oup_question_07, '25'), ['25']],
	[question .image (img .oup_question_08, '23'), ['23']],
	[question .image (img .oup_question_09, '10'), ['10']],
	[question .image (img .oup_question_10, '80'), ['80']],
	[question .image (img .oup_question_11, '1'), ['1']],
	[question .image (img .oup_question_12, '31'), ['31']],
	[question .image (img .oup_question_13, '20'), ['20']],
	[question .image (img .oup_question_14, '33'), ['33']],
	[question .image (img .oup_question_15, '4'), ['4']],
	[question .image (img .oup_question_16, '3'), ['3']],
	[question .image (img .oup_question_17, '300'), ['300']],
	[question .image (img .oup_question_18, '100'), ['100']],
	[question .image (img .oup_question_19, '714'), ['714']],
	[question .image (img .oup_question_20, '2'), ['2']],
	[question .image (img .oup_question_21, '456'), ['456']],
	[question .image (img .oup_question_22, '30'), ['30']],
	[question .image (img .oup_question_23, '5'), ['5']],
	[question .image (img .oup_question_24, '2'), ['2']],
	[question .image (img .oup_question_25, '51'), ['51']],
	[question .image (img .oup_question_26, '40'), ['40']],
	[question .image (img .oup_question_27, '6'), ['6']],
	[question .image (img .oup_question_28, '70'), ['70']],
	[question .image (img .oup_question_29, '21'), ['21']],
	[question .image (img .oup_question_30, '50'), ['50']] ])
var default_rules = rules .rules (10, 4, win_rule .first_bingo)

var default_settings = settings .settings (default_problems, default_rules)


//--------------------COMMON-VIEWS--------------------

var asset_view = _asset => <asset><img src={ _asset } /></asset>
var text_asset_view = _asset => <img src={ _asset } text-asset />

var show_unit = _x => !! (not (equals (0) (_x)) && ! _x) ? '-' :  _x .toFixed (2) * 1
var show_time = _x => !! (not (equals (0) (_x)) && ! _x) ?  '-' : _x .toFixed (2) * 1 + '秒'




window .stuff = { ...window .stuff,
	uniq, bool, number, timestamp, string,
	list, map, maybe, nat, integer, id, v, piece, 
	room, url, choice, question, problem
	order,
	order_sort, direction_opposite, toggle_order, 
	shuffle, uuid, map_zip, last_n, mean, api, with_io, room_status,
	el, attrs_, on_, View,
	ticker, consensus, 
	avatar, student, problem, choice, latency, ping, position,
	attempt, past, board, win_rule, rules, settings,
	teacher_app, student_app,
	io, message, ensemble, 
	default_problems, default_rules, default_settings,
	map_v_as_key, map_v_as_value, as_value_of,
	as_complete, complete_,
	settings_as_size, settings_as_time_limit, settings_as_win_rule,
	progress_as_step, progress_as_timestamp, 
	attempt_as_problem, attempt_as_position, attempt_as_latency, 
	app_as_settings, app_as_student, app_as_students, app_as_room, app_as_problems,
	app_as_board, app_as_past, app_as_progression,
	app_as_boards, app_as_pasts, 
	settings_as_size, settings_as_time_limit,
	problem_as_question, problem_as_answers,
	cell_as_position, as_position, cell_as_choice, 
	teacher_app_get_ready_to_playing, teacher_app_playing_to_next, teacher_app_playing_to_game_over,
	student_app_setup_to_get_ready, student_app_get_ready_to_playing, student_app_playing_to_next, student_app_playing_to_game_over,
	board_choice, current_problem, current_problem_completed, problem_choice_matches,
	local_patterns, size_patterns, nth_letter, pattern_shape,
	as_solved_on, solved_positions, bingoed_positions, bingoes,
	asset_view, text_asset_view, show_unit, show_time,
	clicking, play, pause, audio, img }
