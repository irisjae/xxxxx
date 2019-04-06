var {
	T, $, apply, L, L_, R, S, Z, Z_, Z$, sanc, memoize, 
	faith, belief, show, mark, please, 
	Y, impure, jinx, suppose,
	so, by, 
	go, never, panic, panic_on,
	just_now, temporal,
	fiat, data, data_lens, data_iso, data_kind,
	focused_iso_,
	last_n, n_reducer, l_sum, pinpoint,
	map_defined_, map_defined, from_just, 
	as_sole, sole, shuffle,
	I, K, not, equals
} = window .stuff



//--------------------TYPES--------------------

var bool = fiat
var number = fiat
var timestamp = number
var string = fiat
var list = a => fiat
var map = a => (...b) => list (v (a, ...b))
var maybe = a => fiat
var nat = fiat
var integer = fiat
var id = string
var v = (...types) => fiat
var piece = (...types) => fiat

var room = string
var url = string
var choice = string
var question = data ({
	text: (text =~ string) => question,
	image: (image =~ url, solution =~ choice) => question })
var problem = v (question, list (choice))

var order = props => list// (v (... props, 'ascending' | 'descending'))

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
var ast = data ({
	normal: (numerator =~ integer, denominator =~ integer) => ast,
	add: (left =~ ast, right =~ ast) => ast,
	minus: (left =~ ast, right =~ ast) => ast,
	multiply: (left =~ ast, right =~ ast) => ast,
	divide: (left =~ ast, right =~ ast) => ast })

var win_rule = data ({ first_bingo: () => win_rule, limit_time: (time_limit =~ time_amount) => win_rule, all_problems: () => win_rule })
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
	playing: ( room =~ room, settings =~ settings, students =~ list (student)
		 , boards =~ map (student) (board), pasts =~ map (student) (past), progress =~ progress ) => teacher_app,
	game_over: ( room =~ room, settings =~ settings, students =~ list (student)
		 , boards =~ map (student) (board), pasts =~ map (student) (past) ) => teacher_app })

var student_app = data ({
	setup: ( room =~ maybe (room), settings =~ maybe (settings), student =~ maybe (student) ) => student_app,
	get_ready: ( room =~ room, settings =~ settings, student =~ student ) => student_app,
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
	student_update: ( student =~ student, past =~ past ) => message })
var ensemble = data ({
	ensemble: (
		ping =~ ping,
		pings =~ map (student) (ping),
		settings =~ settings,
		progress =~ progress,
		boards =~ map (student) (board),
		pasts =~ map (student) (past) ) => ensemble })




//--------------------DEFAULTS--------------------



var default_problems = shuffle ([/*
	[question .text ('1/2'), ['2/4', '3/6']],
	[question .text ('1/3'), ['2/6', '3/9']],
	[question .text ('2/3'), ['4/6', '6/9']],
	[question .text ('1/4'), ['2/8', '3/12']],
	[question .text ('2/4'), ['1/2', '3/6']],
	[question .text ('3/4'), ['6/8', '9/12']],
	[question .text ('1/5'), ['2/10', '3/15']],
	[question .text ('2/5'), ['4/10', '6/15']],
	[question .text ('3/5'), ['6/10', '9/15']],
	[question .text ('4/5'), ['8/10', '12/15']],
	[question .text ('1/6'), ['2/12', '3/18']],
	[question .text ('2/6'), ['1/3', '3/9']],
	[question .text ('3/6'), ['1/2', '2/4']],
	[question .text ('4/6'), ['2/3', '6/9']],
	[question .text ('5/6'), ['10/12', '15/18']],
	[question .text ('1/7'), ['2/14', '3/21']],/**/
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-01.png?1551418719974', '11'), ['11']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-02.png?1551418720246', '4'), ['4']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-03.png?1551418718368', '5'), ['5']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-04.png?1551418719719', '41'), ['41']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-05.png?1551418717084', '1'), ['1']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-06.png?1551418716071', '0'), ['0']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-07.png?1551418715724', '25'), ['25']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-08.png?1551418715504', '23'), ['23']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-09.png?1551418714885', '10'), ['10']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-10.png?1551418714335', '80'), ['80']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-11.png?1551418713882', '1'), ['1']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-12.png?1551418713432', '31'), ['31']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-13.png?1551418713081', '20'), ['20']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-14.png?1551418712479', '33'), ['33']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-15.png?1551418711525', '4'), ['4']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-16.png?1551418710773', '3'), ['3']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-17.png?1551418709978', '300'), ['300']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-18.png?1551418708978', '100'), ['100']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-19.png?1551418707820', '714'), ['714']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-20.png?1551418706968', '2'), ['2']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-21.png?1551418704300', '456'), ['456']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-22.png?1551418702559', '30'), ['30']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-23.png?1551418701239', '5'), ['5']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-24.png?1551418706671', '2'), ['2']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-25.png?1551418706209', '51'), ['51']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-26.png?1551418705894', '40'), ['40']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-27.png?1551418704883', '6'), ['6']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-28.png?1551418700089', '70'), ['70']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-29.png?1551418701615', '21'), ['21']],
	[question .image ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foup-question-30.png?1551418700665', '50'), ['50']] ])
var default_rules = rules .rules (10, 4, win_rule .first_bingo)

var default_settings = settings .settings (default_problems, default_rules)



//--------------------LENSES--------------------
var map_v_as_key = L .first
var map_v_as_value = L .last
var as_value_of = key => 
	[ L .elems, L .when (([ _key, _val ]) => equals (key) (_key)), L .valueOr ([ key, undefined ]), L .last ]

var as_complete = L .when (L .none (equals (undefined)) (L .values))
var complete_ = L .get (as_complete)

var app_as_setup = data_iso (teacher_app .setup)
var app_as_get_ready = L .choices (data_iso (teacher_app .get_ready), data_iso (student_app .get_ready))
var app_as_playing = L .choices (data_iso (teacher_app .playing), data_iso (student_app .playing))
var app_as_game_over = L .choices (data_iso (teacher_app .game_over), data_iso (student_app .game_over))

var app_as_settings = [ L .choices ('setup', 'get_ready', 'playing', 'game_over'), 'settings' ]
var app_as_student = [ L .choices ('setup', 'get_ready', 'playing', 'game_over'), 'student' ]
var app_as_room = [ L .choices ('setup', 'get_ready', 'playing', 'game_over'), 'room' ]
var app_as_students = [ L .choices ('get_ready', 'playing', 'game_over'), 'students' ]
var app_as_progress = L .choose (_app =>
	!! L .isDefined (app_as_board) (_app) // check is student_app
	? [ L .rewrite (progress_past), data_lens (student_app .playing) .progress ]
	: data_lens (teacher_app .playing) .progress)
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
var message_as_student_update = data_iso (message .student_update) 

var message_as_student = [ L .choices (message_as_student_ping, message_as_student_join, message_as_student_update), 'student' ]
var message_as_ping = [ L .choices (message_as_teacher_ping, message_as_student_ping), 'ping' ]
var message_as_board = message_as_student_join .board
var message_as_past = message_as_student_update .past

var ensemble_as_ensemble = data_iso (ensemble .ensemble)
	
var ensemble_as_settings = ensemble_as_ensemble .settings 
var ensemble_as_ping = ensemble_as_ensemble .ping 
var ensemble_as_progress = ensemble_as_ensemble .progress 
var ensemble_as_pings = ensemble_as_ensemble .pings 
var ensemble_as_boards = ensemble_as_ensemble .boards 
var ensemble_as_pasts = ensemble_as_ensemble .pasts 

var avatar_as_lion = data_iso (avatar .lion)
var avatar_as_bunny = data_iso (avatar .bunny)

var win_rule_as_first_bingo = data_iso (win_rule .first_bingo)
var win_rule_as_limit_time = data_iso (win_rule .limit_time)
var win_rule_as_all_problems = data_iso (win_rule .all_problems)

var win_rule_as_time_limit = data_lens (win_rule .limit_time) .time_limit

var student_as_student = data_iso (student .student)

var student_as_id = data_lens (student .student) .id
var student_as_name = data_lens (student .student) .name
var student_as_icon = data_lens (student .student) .icon

var progress_as_step = [ 0 ]
var progress_as_timestamp = [ 1 ]

var ast_as_normal = data_iso (ast .normal)
var ast_as_add = data_iso (ast .add)
var ast_as_minus = data_iso (ast .minus)
var ast_as_multiply = data_iso (ast .multiply)
var ast_as_divide = data_iso (ast .divide)

var question_as_text = data_lens (question .text) .text
var question_as_image = data_lens (question .image) .image
var question_as_solution = data_lens (question .image) .solution

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





var teacher_app_get_ready_to_playing = by (_app =>
	$ (
	[ L .get (
		[ data_iso (teacher_app .get_ready)
		, L .inverse (data_iso (teacher_app .playing)) ])
	// implementation detail... how come i am leaking it!???
	// (as in, maps are not supposed to have order, but this is being implemented to solve order issues
	, by (_app => so ((_=_=>
		// pictoral programming is PARAMOUNT
		$ (
		[ L .set (app_as_boards) (R .map (_student => [ _student, undefined ]) (_students))
		, L .set (app_as_pasts) (R .map (_student => [ _student, undefined ]) (_students)) ]),
		where
		, _students = L .get (app_as_students) (_app) )=>_) )
	, L .set (app_as_progress) ([ 0, fiat ]) ]))

var teacher_app_playing_to_next = by (_app => so ((_=_=>
	!! not (game_over_ok) ? L .set (app_as_progress) ([ progress_step + 1, progress_timestamp + time_limit * 1000 ])
	: teacher_app_playing_to_game_over,
	where
	, time_limit = T (_app) (L .get ([ app_as_settings, settings_as_time_limit ]))
	, [ progress_step, progress_timestamp ] = T (_app) (L .get (app_as_progress))
	, _size = T (_app) (L .get ([ app_as_settings, settings_as_size ]))
	, game_over_ok = progress_step + 1 >= _size * _size )=>_))

var teacher_app_playing_to_game_over = by (_app => 
	$ (L .get
	) (
	[ data_iso (teacher_app .playing)
	, L .inverse (data_iso (teacher_app .game_over)) ])) 

var student_app_setup_to_get_ready = by (_app => 
	$ (L .get
	) (
	[ data_iso (student_app .setup)
	, L .inverse (data_iso (student_app .get_ready)) ])) 

var student_app_get_ready_to_playing = by (_app => so ((_=_=>
	$ (
	[ $ (L .get
		) (
		[ data_iso (student_app .get_ready)
		, L .inverse (data_iso (student_app .playing)) ])
	, L .set (app_as_board) (random_board)
	, L .set (app_as_past) (fresh_past)
	, L .set (app_as_progress) ([ 0, fiat ]) ]),
	where 
	, _settings = L .get (app_as_settings) (_app)
	, _size = L .get (settings_as_size) (_settings)
	, _problems = L .get (settings_as_problems) (_settings)
	, random_board = generate_board (_size) (_problems)
	, first_problem = L .get (L .first) (_problems)
	, fresh_past = past .past ([point .point (first_problem, [])]) )=>_))

var student_app_playing_to_next = by (_app => 
	so ((_=_=>
	!! not (game_over_ok) ? L .set (app_as_progress) ([ progress_step + 1, progress_timestamp + time_limit * 1000 ])
	: student_app_playing_to_game_over,
	where
	, time_limit = T (_app) (L .get ([ app_as_settings, settings_as_time_limit ]))
	, [ progress_step, progress_timestamp ] = T (_app) (L .get (app_as_progress))
	, _size = T (_app) (L .get ([ app_as_settings, settings_as_size ]))
	, game_over_ok = progress_step + 1 >= _size * _size )=>_))

var student_app_playing_to_game_over =by (_app => 
	$ (L .get
	) (
	[ data_iso (student_app .playing)
	, L .inverse (data_iso (student_app .game_over)) ]))











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


var current_problem_completed = _problem => _board => _point => so ((_=_=>
	T (
	{ _problem
	, _board
	, _point }
	) (
	L .get (
	[ as_complete
	, ({ _problem, _board, _point }) => 
		T (_point) (L .get ([ join ([ point_as_position, board_choice (_board), problem_choice_matches (_problem) ]), L .valueOr (false) ])) ] ) ),
	where
	, join_2 = map_a => map_b => L .chain (K (map_b)) (map_a)
	, join = R .reduce ((a, b) => join_2 (a) (b)) ([]) )=>_)
		


/*var current_problem_solved_ok = _app =>
	so ((_=_=>
	equals (R .length (L .get (past_as_points))) (progress_step + 1),
	where
	, progress_step = T (_app) (L .get ([ app_as_progress, progress_as_step ])) )=>_)*/

var attempted_positions = by (_past =>
	L .collect ([ past_as_points, L .elems, point_as_position ]))

var as_solved_on = memoize (_board =>
	L .when (by (_point =>
		L .get (
		[ point_as_position
		, L .when (I)
		, _position => so ((_=_=>
			problem_choice_matches (_problem) (_choice),
			where
			, _problem = T (_point) (L .get (point_as_problem))
			, _choice = T (_board) (L .get ([ as_position (_position), cell_as_choice ])) )=>_) ] ) )) )

var solved_positions = _board => by (_past => 
	L .collect ([ past_as_points, L .elems, as_solved_on (_board), point_as_position ]))

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
	!! L .isDefined (question_as_text) (_question) 
	? equals (normal_parse_problem (_text)) (normal_parse_problem (_choice))
	: L .isDefined (question_as_image) (_question) 
	? equals (_solution) (_choice)
	: panic ('bad question'),
	where
	, _question = T (_problem) (L .get (problem_as_question))
	, _text = T (_question) (L .get (question_as_text))
	, _solution = T (_question) (L .get (question_as_solution)) )=>_)





																	
var ast_simplify = n => d =>
	suppose (
	( factor = gcd (n) (d)
	) =>
	ast .normal (n / factor, d / factor) )
var ast_left_right_normalized_parts = by (ast =>
	$ (L .get
	) (
	[ L .choices (ast_as_add, ast_as_minus, ast_as_multiply, ast_as_divide)
	, ({ left, right }) => so ((
		suppose
		, { numerator: left_numerator, denominator: left_denominator } = L .get (ast_as_normal) (normalize_ast (left))
		, { numerator: right_numerator, denominator: right_denominator } = L .get (ast_as_normal) (normalize_ast (right)) ) =>
		{ left_numerator, left_denominator, right_numerator, right_denominator } ) ]))
var normalize_ast = by (ast =>
	L .get (L .choice 
		( L .when (ast_as_normal)
		, [ L .when (ast_as_add), ast_left_right_normalized_parts, ({ left_numerator, left_denominator, right_numerator, right_denominator }) => so ((
			suppose
			, n = left_numerator * right_denominator + right_numerator * left_denominator
			, d = left_denominator * right_denominator ) =>
			ast_simplify (n) (d) ) ]
		, [ L .when (ast_as_minus), ast_left_right_normalized_parts, ({ left_numerator, left_denominator, right_numerator, right_denominator }) => so ((
			suppose
			, n = left_numerator * right_denominator - right_numerator * left_denominator
			, d = left_denominator * right_denominator ) =>
			ast_simplify (n) (d) ) ]
		, [ L .when (ast_as_multiply), ast_left_right_normalized_parts, ({ left_numerator, left_denominator, right_numerator, right_denominator }) => so ((
			suppose
			, n = left_numerator * right_numerator
			, d = left_denominator * right_denominator ) =>
			ast_simplify (n) (d) ) ]
		, [ L .when (ast_as_divide), ast_left_right_normalized_parts, ({ left_numerator, left_denominator, right_numerator, right_denominator }) => so ((
			suppose
			, n = left_numerator * right_denominator
			, d = left_denominator * right_numerator ) =>
			ast_simplify (n) (d) ) ] )))
var analyze_to_ast = symbol => cons => str => 
	suppose (
	( loc = R .indexOf (symbol) (str) 
	, left = parse_to_ast (str .slice (0, loc))																			 
	, right = parse_to_ast (str .slice (loc + 1, Infinity))
	) =>
	cons (left, right) )
var parse_to_ast = so ((_=_=>
	$ (L .get
	) (
	L .cond (
		...T (order) (R .map (symbol => 
			[ R .includes (symbol), analyze_to_ast (symbol) (ast [operation [symbol]]) ] ))
		, [ str => ast .normal ( str * 1, 1 ) ] )),
	where
	, order = [ '+', '-', '*', '/' ]
	, operation = 
			{ '+': 'add'
			, '-': 'minus'
			, '*': 'multiply'
			, '/': 'divide' } )=>_) //assuming str is integer
var normal_parse_problem = $ ([ parse_to_ast, normalize_ast ])
var gcd = a => b =>
	!! equals (b) (0)
	? a
	: gcd (b) (a % b)






//optimizing this
var message_encoding = by (message => 
	so ((_=_=>
	L .get (
	[ L .choice ( ... 
		[ [ message_as_teacher_ping .ping, L .when (I), L .getInverse (ensemble_as_ping) ]
		, [ message_as_teacher_settings .settings, L .when (I), L .getInverse (ensemble_as_settings) ]
		, [ message_as_teacher_progress .progress, L .when (I), L .getInverse (ensemble_as_progress) ]
		, [ message_as_student_ping .ping, L .when (I), L .getInverse ([ ensemble_as_pings, wrapped_with_student ]) ]
		, [ message_as_student_join .board, L .when (I), L .getInverse ([ ensemble_as_boards, wrapped_with_student ]) ]
		, [ message_as_student_update .past, L .when (I), L .getInverse ([ ensemble_as_pasts, wrapped_with_student ]) ] ] )
	, ensemble_as_ensemble
	, strip ] ),
	where
	, strip = L .modify (L .satisfying (equals ())) (L_ .remove)
	, _student = T (message) (L .get (message_as_student))
	, _student_id = '' + T (_student) (L .get (student_as_id))
	, wrapped_with_student = [ _student_id, L .mapping (val => [ [ _student, val ], val ] ) ] )=>_))

var messages_encoding = list =>
	R .reduce (R .mergeDeepRight) ({}) (list .map (message_encoding))

var decode_to_ensemble = L .get (
	[ L .inverse (ensemble_as_ensemble)
	, L .modify (ensemble_as_pings) (L .get (L .values))
	, L .modify (ensemble_as_boards) (L .get (L .values))
	, L .modify (ensemble_as_pasts) (L .get (L .values)) ] )





var schedule_start = _ensemble =>
	so ((_=_=>
	(+ (new Date)) + confidence_interval,
	where
	, teacher_ping = T (_ensemble) (L .get (ensemble_as_ping))
	, student_pings = T (_ensemble) (L .collect ([ ensemble_as_pings, L .values, map_v_as_value ]))
	, pings = T ([ teacher_ping, ...student_pings ]) (L .collect ([ L .elems, ping_as_mean ]))
	, confidence_interval = R .min (1000) (R .reduce (R .max) (0) (pings)) )=>_)

var progress_past = so ((_=_=>
	by (_app =>
		so ((_=_=>
		$ (L .modify
		) (
		[ app_as_past, past_as_points, natural_slice (_points_count) (_progress_step + 1), L .elems ]
		) (
		(_, i) => point .point (L .get (_points_count + i) (_problems), []) ),
		where
		, _progress_step = T (_app) (L .get ([ app_as_progress, progress_as_step ]))
		, _problems = T (_app) (L .get (app_as_problems))
		, _points_count = T (_app) (L .count ([ app_as_past, past_as_points, L .elems ])) )=>_)),
	where
	, natural_slice = a => b => [ L .slice (a, b), L .reread (xs => b < a ? xs : xs .concat (Array (b - a - xs .length))) ] )=>_)

//var schedule_tick = 




var timer = _ => {
	var _timer = S .data ()
	var _flowing = S .data (true)
	//var _flowing_ok = S .subclock (_=> {
	//	var val = S .value (_flowing ())
	//	;S (_=> {;val (_flowing ())})
	//	return val })
	//var _S = fn => S (x => !! _flowing_ok () ? fn (x) : x)
	;S .root (immortal => { 
		var tick_S = fn => S (x => !! _flowing () ? fn (x) : x)
		;tick_S (_=> {
			;_timer (+ (new Date))
			;requestAnimationFrame (_ => {
				;_flowing (_flowing ()) }) }) })
	return [ _timer, _flowing, ] } //_S, tick_S ] }
var timer_since = _timer => S .subclock (_=> {
	var _since = S .data ()
	;S (_=> {
		;_since (_since .next || - Infinity)
		;_since .next = _timer () })
	return _since })
var time_intervals = _timer => so ((_=_=>
	S (_ => time_interval .time_interval (_timer_since (), _timer ())),
	where
	, _timer_since = timer_since (_timer) )=>_)








var _pings = {}

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
		.then (_=> {;_api .sockets [room] .send (JSON .stringify ({ ...req, id: id }))})
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
	, new_id = _ => {
		var id = '' + Math .floor (1000000 * Math .random ())
		return !! not (_api .continuations [id])
		? id
		: new_id () }
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
		L .get (
		[ L .valueOr ([0, 0, 0, 0])
		, ([ mean, sqr_mean, n, _ ]) => so ((_=_=>
			[ mean * carry + sample / (n + 1)
			, sqr_mean * carry + (sample * sample) / (n + 1)
			, n + 1
			, (new Date) .getTime () ],
			where 
			, carry = n / (n + 1) )=>_) ] ) ) )=>_)
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
	, opposite_direction = T (_ordering) (L .get ([ R .find (([_prop, _]) => equals (prop) (_prop)), L .last, L .valueOr ('ascending'), direction_opposite ])) )=>_)


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
	, decode = L .get (
		L .choices (
			[ L .when (L .get ('error')) ],
			[ decode_to_ensemble ] )=>_)
;api .ping = _api .ping






// rewrite functionally?
var map_zip = mash => a => b => {
	var _zip = []
	;T (b) (R .forEach (([ _key, _val ]) => {
		for (var i = 0; i < a .length; i ++) {
			var [ k, v ] = a [i]
			if (equals (k) (_key)) {
				;_zip = _zip .concat ([ [ _key, mash (v) (_val) ] ]) } } }))
	return _zip }


var chain_el = el_fn => [ L .chain ($ ([ el_fn, K ])) ([]), L .valueOr ([]) ]


var uuid = _ =>
	'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' .replace (/[xy]/g, c =>
		suppose (
		( r = Math .random () * 16 | 0
		, v = c == 'x' ? r : (r & 0x3 | 0x8)
		) =>
		v .toString (16) ))









window .stuff = { ...window .stuff,
	bool, number, timestamp, string,
	list, map, maybe, nat, id, v, piece, order,
	order_sort, direction_opposite, toggle_order, 
	shuffle, uuid, map_zip, chain_el, api, post,
	timer, timer_since, time_intervals, 
	avatar, student, problem, choice, latency, ping, position,
	attempt, point, past, board, win_rule, rules, settings,
	teacher_app, student_app,
	io, message, ensemble, 
	default_problems, default_rules, default_settings,
	map_v_as_key, map_v_as_value, as_value_of,
	as_complete, complete_,
	app_as_setup, app_as_get_ready, app_as_playing, app_as_game_over, app_as_progress,
	settings_as_problems, settings_as_rules,
	settings_as_size, settings_as_time_limit, settings_as_win_rule,
	io_as_inert, io_as_connecting, io_as_heartbeat,
	ensemble_as_ping, ensemble_as_settings, ensemble_as_progress, 
	ensemble_as_pings, ensemble_as_boards, ensemble_as_pasts,
	progress_as_step, progress_as_timestamp, 
	question_as_text, question_as_image, question_as_solution, 
	attempt_as_position, attempt_as_latency, point_as_problem, point_as_attempts, point_as_position, past_as_points,
	app_as_settings, app_as_student, app_as_students, app_as_room, app_as_problems,
	app_as_board, app_as_past, app_as_progress,
	app_as_boards, app_as_pasts, 
	app_as_last_point, point_as_attempts,
	avatar_as_lion, avatar_as_bunny, 
	win_rule_as_first_bingo, win_rule_as_limit_time, win_rule_as_all_problems, win_rule_as_time_limit,
	student_as_student, student_as_id, student_as_name, student_as_icon, 
	rules_as_size, rules_as_time_limit, rules_as_win_rule, settings_as_size, settings_as_time_limit,
	problem_as_question, problem_as_answers,
	cell_as_position, as_position, cell_as_choice, 
	schedule_start,
	teacher_app_get_ready_to_playing, teacher_app_playing_to_next, teacher_app_playing_to_game_over,
	student_app_setup_to_get_ready, student_app_get_ready_to_playing, student_app_playing_to_next, student_app_playing_to_game_over,
	board_choice, current_problem, current_problem_completed, problem_choice_matches,
	local_patterns, size_patterns,
	as_solved_on, attempted_positions, solved_positions, bingoed_positions, bingoes }
