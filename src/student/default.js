var { T, $, apply, L, L_, R, S, Z, Z_, Z$, sanc, memoize, 
faith, belief, show, mark, please, 
Y, impure, jinx, suppose,
so, by, 
go, never, panic, panic_on,
just_now, temporal,
fiat, data, as_in, as, data_kind,
focused_iso_,
last_n, n_reducer, l_sum, pin, pin_first, pinpoint,
map_defined_, map_defined, from_just, 
as_reduction, as_point, as_points_on, as_points, points_, pointed_, pointed_I,
as_sole, sole, shuffle,
I, K, not, equals,
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
clicking, play, pause, audio, img
} = window .stuff


// interactive datas

var feedback = data ({
	setup_room: (room =~ room, uniq =~ uniq) => feedback,
	setting_up_student: (icon =~ avatar, name =~ string, uniq =~ uniq) => feedback,
	setup_student: (icon =~ avatar, name =~ string, uniq =~ uniq) => feedback,
	attempt_problem: (position =~ position, uniq =~ uniq) => feedback,
	reset_game: (uniq =~ uniq) => feedback })

var lookbehind = data ({
	nothing: () => lookbehind,
	bad_room: (room =~ room) => lookbehind,
	attempting: (since =~ latency, blocked =~ bool) => lookbehind,
	show_results: () => lookbehind,
	overall_analysis: () => lookbehind,
	problems_analysis: (ordering =~ order ([ 'questions', 'number_of_attempts', 'solved_time' ])) => lookbehind })

var ambient = data ({
	ambient: ( background_music_on =~ bool ) => ambient })


var problem_as_attempts = _problem => [ L .elems, L .when (L .get ([ attempt_as_problem, L .is (_problem) ])) ]


var question_order = K (fiat)
var number_of_attempts_order = _problem => so ((_=_=>
	L .count ([ problem_as_attempts (_problem), L .elems ]) (_attempts),
	where
	, _attempts = show (app_past_attempts_state) )=>_)
var solved_time_order = _problem => so ((_=_=>
	L .get ([ problem_as_attempts (_problem), L .elems, as_solved_on (_board), attempt_as_latency ]) (_attempts),
	where
	, _board = show (app_as_board)
	, _attempts = show (app_past_attempts_state) )=>_)
		


// states and beliefs

var state = faith (
	{ app: student_app .setup (undefined, undefined, undefined)
	, lookbehind: lookbehind .nothing
	, ambient: ambient .ambient (false)
	, io: io .off
	, ensemble: undefined
	, feedback: undefined } )


var app_state = belief ('app') (state) 
var lookbehind_state = belief ('lookbehind') (state)
var ambient_state = belief ('ambient') (state)
var io_state = belief ('io') (state)
var ensemble_state = belief ('ensemble') (state)
var feedback_state = belief ('feedback') (state)


var app_in_setup_state = belief (app_as_in_setup) (app_state)
var app_in_get_ready_state = belief (app_as_in_get_ready) (app_state)
var app_in_playing_state = belief (app_as_in_playing) (app_state)
var app_in_game_over_state = belief (app_as_in_game_over) (app_state)

var app_settings_state = belief (app_as_settings) (app_state)

var app_settings_problems_state = belief (as (settings) .problems) (app_settings_state)
var app_settings_time_limit_state = belief (settings_as_time_limit) (app_settings_state)
var app_settings_size_state = belief (settings_as_size) (app_settings_state)

var app_student_state = belief (app_as_student) (app_state)
var app_room_state = belief (app_as_room) (app_state)
var app_problems_state = belief (app_as_problems) (app_state)
var app_board_state = belief (app_as_board) (app_state)
var app_past_state = belief (app_as_past) (app_state)

var app_past_attempts_state = belief (as (past) .attempts) (app_past_state)

var app_progression_state = belief (app_as_progress) (app_state)

var app_progression_progress_state = belief (as (progression) .progress) (app_progression_state)
var app_progression_progress_timestamp_state = belief (progress_as_timestamp) (app_progression_progress_state)
var app_progression_progress_step_state = belief (progress_as_step) (app_progression_progress_state)

var app_current_problem_state = belief (current_problem) (app_state)
var app_current_problem_completed_state = belief (_app => current_problem_completed (current_problem (_app)) (L .get (app_as_board) (_app)) (L .get ([ app_as_past, as (past) .attempts, L .last ]) (_app))) (app_state)

var ensemble_ping_state = belief (as (ensemble) .ping) (ensemble_state)
var ensemble_progression_state = belief (as (ensemble) .progression) (ensemble_state)

var feedback_in_setting_up_student_state = belief (as_in (feedback .setting_up_student)) (feedback_state)

var feedback_setting_up_student_name_state = belief ('name') (feedback_in_setting_up_student_state)
var feedback_setting_up_student_icon_state = belief ('icon') (feedback_in_setting_up_student_state)

var feedback_icon_state = belief (as (feedback) .icon) (feedback_state)

var lookbehind_in_bad_room_state = belief (as_in (lookbehind .bad_room)) (lookbehind_state)
var lookbehind_in_show_results_state = belief (as_in (lookbehind .show_results)) (lookbehind_state)
var lookbehind_in_overall_analysis_state = belief (as_in (lookbehind .overall_analysis)) (lookbehind_state)
var lookbehind_in_problems_analysis_state = belief (as_in (lookbehind .problems_analysis)) (lookbehind_state)
var lookbehind_room_state = belief (as (lookbehind) .room) (lookbehind_state)
var lookbehind_since_state = belief (as (lookbehind) .since) (lookbehind_state)
var lookbehind_blocked_state = belief (as (lookbehind) .blocked) (lookbehind_state)
var lookbehind_ordering_state = belief (as (lookbehind) .ordering) (lookbehind_state)

var ambient_background_music_on_state = belief (as (ambient) .background_music_on) (ambient_state)




// views

var setup_room_view = _ => so ((_=_=>
	<setup-room-etc fn={ feedback_setup_room }>
		<a-title><img src={ img .logo }/></a-title>
		<sub-title>除法（一）</sub-title>
		<room style={{ margin: '30px 0' }}>
			<label>{ text_asset_view (img .text_room_number_is) }</label>
			{ L .getAs (el) ([ L .when (I), K (
			<message x-error="true">不能連接遊戲室{ bad_room }</message> ) ]
			) (
			mark (lookbehind_in_bad_room_state) ) }
			<input style={{ margin: { top: '10px' } }} /> </room>
		<button x-custom x-for="join"><img src={ img .join } /></button> </setup-room-etc>,
	where
	, bad_room = mark (lookbehind_room_state)
	, feedback_setup_room = _dom => {
		var _input = _dom .querySelector ('input')
		var _button = _dom .querySelector ('button')

		;T (_input) (on_ (([ ['keypress'], _e => {
			if (_e .keyCode === 13) {
				;let_room_enter () } } ] ) ) )
		;T (_button) (on_ ([ clicking, let_room_enter ])) }

	, let_room_enter = _ => {
		var value = _input .value
		if (value) {
			;_input .value = ''
			;please (L_ .set (feedback .setup_room (value, uniq ()))) (feedback_state) } } )=>_)

var setup_student_view = _ => so ((_=_=>
	<setup-student-etc fn={feedback_setup_student}>
		<a-title><img src={ img .logo }/></a-title>
		<sub-title>除法（一）</sub-title>
		<name style={{ marginTop: '30px' }}>
			<label>{ text_asset_view (img .text_name) }</label>
			<input /> </name>
		<icon style={{ marginBottom: '30px' }}>
			<avatar x-for="lion" x-selected={T (_icon) (L .isDefined (as_in (avatar .lion)))}>
				<selected-input />
				<img src={ img .lion_avatar } /> </avatar>
			<avatar x-for="bunny" x-selected={T (_icon) (L .isDefined (as_in (avatar .bunny)))}>
				<selected-input />
				<img src={ img .bunny_avatar } /> </avatar> </icon> 
		{ el (L .get (K (
		<button fn={on_ ([ clicking, feedback_enter_student ])} x-custom x-for="connect"><img src={ img .connect } /></button> )
		) (
		complete_ (
		[ mark (feedback_setting_up_student_icon_state)
		, mark (feedback_setting_up_student_name_state) ] ) ) ) }
		</setup-student-etc>,
	where
	, _icon = mark (feedback_icon_state)
	, feedback_setup_student = _dom => {
		var _name_input = _dom .querySelector ('input')
		var _lion_option = _dom .querySelector ('avatar[x-for=lion]')
		var _bunny_option = _dom .querySelector ('avatar[x-for=bunny]')
		var _button = _dom .querySelector ('button')

		;T (_name_input) (on_ ([ ['input'], _ => {;let_name (_name_input .value)} ]))
		;T (_lion_option) (on_ ([ clicking, _ => {;let_icon (avatar .lion)} ]))
		;T (_bunny_option) (on_ ([ clicking, _ => {;let_icon (avatar .bunny)} ]))
		;T (_button) (on_ ([ clicking, _ => {/*;let_student_enter ()*/} ])) } 
	, feedback_enter_student = _ => {;let_student_enter ()}

	, let_icon = _avatar => {;please (L_ .set (_avatar)) (feedback_setting_up_student_icon_state)}
	, let_name = _name => {;please (L_ .set (_name)) (feedback_setting_up_student_name_state)}
	, let_student_enter = _ => {;please (pinpoint ([ as_in (feedback .setting_up_student), L .inverse (as_in (feedback .setup_student)) ])) (feedback_state)} )=>_)

var setup_view = _ => <setup-etc> {
	L .getAs (el
	) (
	as_reduction (
	[ [ [ app_as_in_setup .room, l_undefined ], pinpoint (
		as_reduction (
		[ [ as_in (io .off), setup_room_view ]
		, [ as_in (io .on), <message>正在連接遊戲室…</message> ] ]
		) (
		mark (io_state) ) ) ]
	, [ [ app_as_in_setup .student, l_undefined ], pinpoint (
		as_reduction (
		[ [ as_in (io .off), setup_student_view ]
		, [ as_in (io .on), <message>正在加入遊戲室…</message> ] ]
		) (
		mark (io_state) ) ) ]
	, [ app_as_in_setup, <message>正在加入遊戲室…</message> ] ] )
	) (
	mark (app_state) ) }
	</setup-etc>

var get_ready_view = _ => so ((_=_=>
	<get-ready-etc>
		<div><room>已加入遊戲室{room}</room></div>
		{ text_asset_view (img .text_waiting_message) } </get-ready-etc>,
	where
	, room = mark (app_room_state) )=>_)

var bingoes_view = _bingoes => so ((_=_=>
	<bingo> { L .collect ([ L .elems, _pattern => T (letters) (R .map (nth => 
		<letter x-as={ nth_letter (nth) } style={ nth_letter_pos (_pattern) (nth) } /> ) ) ]
		) (
		_bingoes)  } </bingo>,
	where
	, letters = R .range (1) (5 + 1)
	, nth_letter_pos = _pattern => nth => so ((_=_=> (
		{ left: left, top: top } ),
		where
		, _size = R .length (_pattern)
		, _shape = pattern_shape (_pattern)
		, [ _y, _x ] = L .get (L .first) (_pattern)
		, left = !! equals (_shape) ('vertical') ? ((_x - 1) / _size + (1 / _size - 1 / 5) / 2) * 100 + '%'
			: ((nth - 1) * 1 / 5) * 100 + '%' 
		, top = !! equals (_shape) ('horizontal') ? ((_y - 1) / _size + (1 / _size - 1 / 5) / 2) * 100 + '%'
			: equals (_shape) ('diagonal-up') ? ((5 - nth) * 1 / 5) * 100 + '%'
			: ((nth - 1) * 1 / 5) * 100 + '%' )=>_) )=>_)


var board_view = _ => so ((_=_=>
	<board x-disabled={_disabled}> { L .collect ([ L .elems, _row => 
		<row> { L .collect ([ L .elems, _cell => so ((_=_=>
			<cell {... _x_solved} fn={on_ ([ clicking, feedback_cell (_cell) ])}>{ _cell_choice }</cell>,
			where
			, _cell_position = T (_cell) (L .get (cell_as_position))
			, _cell_choice = T (_cell) (L .get (cell_as_choice))
			, _cell_solved = R .includes (_cell_position) (_solved_positions)
			, _x_solved = attrs_ ({ 'x-solved': _cell_solved }) )=>_) ]
			) (
			_row ) } </row> ]
		) (
		_board )  }
		{ bingoes_view (_bingoes) } </board>,
	where
	, _board = mark (app_board_state)
	, _past = mark (app_past_state)
	, _solved_positions = solved_positions (_board) (_past)
	, _bingoes = bingoes (_board) (_past)
	, _disabled = mark (lookbehind_blocked_state)
	, feedback_cell = cell => _ => {
		var _step = show (app_progression_progress_step_state)
		var _position = T (cell) (L .get (cell_as_position))
		;please (L_ .set (feedback .attempt_problem (_position, uniq ()))) (feedback_state) } )=>_)

var playing_view = _ => so ((_=_=>
	<playing-etc>
		<div class="left-pane">
			<ticker-etc>
				{ L .getAs (el) (_t => _time_limit - _t) (mark (step_clock)) }
				<ticker z-identity={_problem_number} style={ticker_style}><spinner/></ticker> </ticker-etc>
			<question>
				{ L .getAs (el) (as (question) .text) (_current_question) }
				{ L .getAs (el) ([ as (question) .image, _question_image =>
				<img src={ _question_image } /> ]) (_current_question) } </question> </div>
		<div class="right-pane">
			{ board_view } </div> </playing-etc>,
		where
		, _problem_number = mark (app_progression_progress_step_state) + 1
		, _time_limit = mark (app_settings_time_limit_state)
		, _current_question = T (mark (app_current_problem_state)) (L .get (problem_as_question))
		, ticker_style = { animationDuration: _time_limit + 's' } )=>_) 

var show_results_view = _ =>
	<show-results>{ board_view }</show-results>

var overall_analysis_view = _ => so ((_=_=>
	<overall-analysis>
		<div><span>已答題數：</span><span>{ attempted_problems_amount }</span></div>
		<div><span>答對題數：</span><span>{ solved_problems_amount }</span></div>
		<div><span>平均答對時間：</span><span>{ show_time (mean_solved_problem_latency) }</span></div> </overall-analysis>,
	where
	, _board = mark (app_board_state)
	, _attempts = mark (app_past_attempts_state)
	, attempted_problems_amount = T (_attempts) (L .counts ([ L .elems, attempt_as_problem ]))
	, solved_problems_amount = T (_attempts) (L .count ([ L .elems, as_solved_on (_board) ]))
	, mean_solved_problem_latency = T (_attempts) (L .mean ([ L .elems, as_solved_on (_board), attempt_as_latency ])) )=>_)

var problems_analysis_view = _ => so ((_=_=>
	<problems-analysis-etc>
		<labels>
			<question fn={on_ ([ clicking, toggle_question_order ])}>題目 <img src={img .toggle_ordering} /></question>
			<number-of-attempts fn={on_ ([ clicking, toggle_number_of_attempts_order ])}>作答次數 <img src={img .toggle_ordering} /></number-of-attempts>
			<solved-time fn={on_ ([ clicking, toggle_solved_time_order ])}>答對時間 <img src={img .toggle_ordering} /></solved-time> </labels>
		<problems-analysis>{ L .collect ([ order_sort (_ordering), L .elems, _problem => so ((_=_=> /*reimplement order in terms of free object*/
			<problem>
				<question>{ L .get (
					L .choice
					( [ as (question) .image, L .when (I), _image => <img src={_image} /> ]
					, [ as (question) .text, L .when (I) ] )
					) (
					_question) }</question>
				<number-of-attempts>{ _number_of_attempts }</number-of-attempts>
				<solved-time>{ show_time (_solved_time) }</solved-time> </problem>,
			where
			, _question = T (_problem) (L .get (problem_as_question))
			, as_current_problem_attempts = problem_as_attempts (_problem)
			, _number_of_attempts = T (mark (app_past_attempts_state)) (L .count (as_current_problem_attempts))
			, _solved_time = T (mark (app_past_attempts_state)) (L .get ([ as_current_problem_attempts, as_solved_on (_board), attempt_as_latency ])) )=>_) ]
			) (
			mark (app_settings_problems_state) ) }</problems-analysis> </problems-analysis-etc>,
	where
	, _ordering = mark (lookbehind_ordering_state)
	, _board = mark (app_board_state)
	, toggle_question_order = _ => {;please (toggle_order (question_order)) (lookbehind_ordering_state)}
	, toggle_number_of_attempts_order = _ => {;please (toggle_order (number_of_attempts_order)) (lookbehind_ordering_state) }
	, toggle_solved_time_order = _ => {;please (toggle_order (solved_time_order)) (lookbehind_ordering_state) } )=>_)


var show_results_img = pinpoint (as_reduction ([ [ as_in (lookbehind .show_results), img .show_results_on ], [ L .identity, img .show_results_off ] ]))
var overall_analysis_img = pinpoint (as_reduction ([ [ as_in (lookbehind .overall_analysis), img .overall_analysis_on ], [ L .identity, img .overall_analysis_off ] ]))
var problems_analysis_img = pinpoint (as_reduction ([ [ as_in (lookbehind .problems_analysis), img .problems_analysis_on ], [ L .identity, img .problems_analysis_off ] ]))

var game_over_view = _ => so ((_=_=>
	<game-over-etc>
		<a-title><img src={img .logo}/></a-title>
		<student><label>{ _name }</label></student> 
		<options x-for="tabs">
			<button x-custom x-for="show-results" fn={on_ ([ clicking, show_results ])}>
				<img src={show_results_img (mark (lookbehind_in_show_results_state))} /> </button>
			<button x-custom x-for="overall-analysis" fn={on_ ([ clicking, overall_analysis ])}>
				<img src={overall_analysis_img (mark (lookbehind_in_overall_analysis_state))} /> </button>
			<button x-custom x-for="problems-analysis" fn={on_ ([ clicking, problems_analysis ])}>
				<img src={problems_analysis_img (mark (lookbehind_in_problems_analysis_state))} /> </button> </options>
		{ L .getAs (el) (
		as_reduction (
		[ [ as_in (lookbehind .show_results), show_results_view ]
		, [ as_in (lookbehind .overall_analysis), overall_analysis_view ]  
		, [ as_in (lookbehind .problems_analysis), problems_analysis_view ] ] )
		) (
		mark (lookbehind_state) ) }
		<options x-for="options">
			<button x-custom x-for="play-again" fn={on_ ([ clicking, feedback_play_again ])} >i
				<img src={img .play_again} /> </button> </options> </game-over-etc>,
	where
	, _name = T (mark (app_student_state)) (L .get (as (student) .name))
	, show_results = _ => {;please (L_ .set (lookbehind .show_results)) (lookbehind_state) }
	, overall_analysis = _ => {;please (L_ .set (lookbehind .overall_analysis)) (lookbehind_state) }
	, problems_analysis = _ => {;please (L_ .set (lookbehind .problems_analysis ([]))) (lookbehind_state) }
	, feedback_play_again = _ => {;please (L_ .set (feedback .reset_game (uniq ()))) (feedback_state) } )=>_)

var app_view = _ =>
	<student-app>{ L .getAs (el) (
		as_reduction (
		[ [ app_as_in_setup, setup_view ]
		, [ app_as_in_get_ready, get_ready_view ]
		, [ app_as_in_playing, playing_view ]
		, [ app_as_in_game_over, game_over_view ] ] )
		) (
		mark (app_state) ) }</student-app>

			 
			 
			 
// transitions

var reset_game = _ => {
	;please (L_ .set (student_app .setup (undefined, undefined, undefined))) (app_state) }
			 
var setup_room = _room => {
	;with_io (_ =>
	go 
	.then (_ =>
		api (_room)
		.then (panic_on ([ [ L .isEmpty (L .leafs), 'empty room; expired code?' ] ])) )
	.then (pin (
		[ as (ensemble) .settings
		, _settings => {
			;please (L_ .set (_room)) (app_room_state)
			;please (L_ .set (_settings)) (app_settings_state) } ]))
	.catch (_e => {
		;please (L_ .set (lookbehind .bad_room (_room))) (lookbehind_state)
		;throw _e }) ) }

var setup_student = _icon => _name => {
	;please (L_ .set (student .student (uuid (), _name, _icon))) (app_student_state) } 

var connect_room = impure (_ => 
	T (
	{ _student: show (app_student_state)
	, _room: show (app_room_state) }) (
	pin (
	[ as_complete
	, impure (({ _student, _room }) => 
		suppose (
		( latest_settings
		) =>
		with_io (_ =>
		go 
		.then (_ =>
			api (_room)
			.then (panic_on ([ [equals ({}), 'empty room; expired code?'] ])) )
		.then (pin (
			[ as (ensemble) .settings
			, impure (_settings => {;latest_settings = _settings}) ]))
		.then (_ =>
			api (_room, 
				message .student_ping (_student, [0, 0, 0]) )
			.then (panic_on ([ [ L .get ([ 'ok', not ]), 'not ok'] ])) )
		.then (_ => { 
			;please (L_ .set (latest_settings)) (app_settings_state) })
		.catch (_e => {
			;please (L_ .set (lookbehind .bad_room (_room))) (lookbehind_state)
			;throw _e }) ) )) ])) )

var attempt_problem = impure (_position =>
	T (
	{ is_not_solved: pinpoint (L .when (equals (false))) (show (app_current_problem_completed_state))
	, is_not_blocked: pinpoint (L .when (equals (false))) (show (lookbehind_blocked_state))
		
	, _problem: show (app_current_problem_state)
	, _board: show (app_board_state) }
	) (
	pin (
	[ as_complete
	, ({ _problem, _board }) => {
		var latency = show (fine_step_clock)
		;please (L .set (L .appendTo) ([_problem, _position, latency])) (app_past_attempts_state)

		var _choice = board_choice (_board) (_position)
		if (problem_choice_matches (_problem) (_choice)) {
			var _solved_positions = [ ... solved_positions (_board) (show (app_past_state)), _position ]
			var _size = show (app_settings_size_state)
			var _local_patterns = T (local_patterns (size_patterns (_size))
				) (
				L .collect ([ as_value_of (_position), L .elems, L .when (R .all (T (_solved_positions) (R .flip (R .includes)))) ]))
			;play (audio .correct)
			if (L .isDefined (L .elems) (_local_patterns)) {
				;play (audio .student_bingo) } }
		else {
			;play (audio .incorrect)
			;please (L_ .set (lookbehind .attempting (latency, true))) (lookbehind_state) } } ]) ) )





// resource rules

var self_correcting_timestamp_state = suppose (
	( timestamp_differential = _ =>
		suppose (
		( teacher_ping = mark (ensemble_ping_state)
		, [ base_timestamp, base_offset, _ ] = teacher_ping || []
		, [ _timestamp , _offset , ] = room_status (mark (app_room_state)) || []
		) =>
		(_timestamp - base_timestamp) + (1 / 2) * (_offset - base_offset) )
	) =>
	belief (_timestamp =>
		suppose (
		( _timestamp_differential = mean (timestamp_differential)
		) =>
		_timestamp - _timestamp_differential )
	) (
	app_progression_progress_timestamp_state ) )


var step_clock = ticker (self_correcting_timestamp_state) (1000)
var fine_step_clock = ticker (self_correcting_timestamp_state) (1)

var [ consent, next_consent ] = consensus ()
				

// rules
 
;window .view = <View>{ app_view }</View>

;S .root (_ => {

	// handle user

	;S (_ => 
		T (mark (feedback_state)
		) (
		pin (
		l_sum (
		[ [ as_in (feedback .setup_room), L .when (I)
			, ({ room: _room }) => {
				;setup_room (_room)} ]
		, [ as_in (feedback .setup_student), L .when (I)
			, impure (({ icon: _icon, name: _name }) => 
				go
				.then (_ => setup_student (_icon) (_name))
				.then (_ => connect_room ()) ) ]
		, [ as_in (feedback .attempt_problem), L .when (I)
			, ({ position: _position }) => {
				;attempt_problem (_position)} ]
		, [ as_in (feedback .reset_game), L .when (I)
			, impure (reset_game) ] ] ))) )

	;S (_ => {
		if (mark (ambient_background_music_on_state)) {
			;play (audio .background) }
		else {
			;pause (audio .background) } })





	// game rules

	;S (_ => {
		var _progression = mark (app_progression_state)
		var _ensemble_progression = mark (ensemble_progression_state)

		// theoretically these would be in separate rules
		// with the progression rules synchronously updating the entire state on progression (subclock)
		if (not (equals (_progression) (_ensemble_progression))) {
			if (L .isDefined (as_in (progression .unended)) (_ensemble_progression)) {
				if (L_ .isDefined (mark (app_in_get_ready_state))) {
					;please (L_ .set (_ensemble_progression)) (app_progression_state)
					;please (student_app_get_ready_to_playing) (app_state) }
				else if ( L_ .isDefined (mark (app_in_playing_state))
				&& L .get ([ as (progression) .progress, progress_as_step ]) (_ensemble_progression)
				> L .get ([ as (progression) .progress, progress_as_step ]) (_progression) ) {
					;please (L_ .set (_ensemble_progression)) (app_progression_state) } }
			else if (L .isDefined (as_in (progression .ended)) (_ensemble_progression)) {
				if (! L_ .isDefined (mark (app_in_game_over_state))) {
					;please (L_ .set (_ensemble_progression)) (app_progression_state)
					;please (student_app_playing_to_game_over) (app_state) } } } })

	;S (_ => {
		if (L_ .isDefined (mark (app_in_setup_state))) {
			;please (L_ .set (lookbehind .nothing)) (lookbehind_state)
			;please (L_ .remove) (ensemble_state) } })

	;S (_ => {
		if (equals ([ ... R .map (L_ .isDefined) (last_n (2) (app_room_state)) ]) ([ false, true ])) {
			;please (L_ .set (lookbehind .nothing)) (lookbehind_state) } })

	;S (_ => {
		if (complete_ ([ mark (app_in_setup_state), mark (app_student_state), mark (app_room_state), mark (app_settings_state) ])) {
			;please (student_app_setup_to_get_ready) (app_state) } })

	;S (_ => {
		if (mark (lookbehind_blocked_state)) {
			var forget = setTimeout (_ => {
				;please (L_ .set (false)) (lookbehind_blocked_state) }
			, 3000)
			;S .cleanup (_ => {;clearTimeout (forget)}) } })

	// the state is a hack to require synchronity
	// the ticks are not unique by product with playing_state, time-limit
	;S (last_tick_left => {
		var time_limit = mark (app_settings_time_limit_state)
		if (L_ .isDefined (mark (app_in_playing_state))) {
			var tick = mark (step_clock)
			var tick_left = time_limit - tick
			if (tick_left == 3 && not (equals (tick_left) (last_tick_left))) {
				;play (audio .countdown) }
			if (tick >= time_limit) {
				;please (student_app_playing_to_next) (app_state) }
			return tick_left } })

	// this should be subclock
	;S (_ => 
		if (L_ .isDefined (mark (app_in_playing_state))) {
			var [ last_progress_step, progress_step ] = last_n (2) (app_progression_progress_step_state)
			if (complete_ ([ last_progress_step, progress_step ]) && not (equals (last_progress_step) (progress_step))) {
				;please (L_ .set (0)) (lookbehind_since_state) 
				;please (L_ .set (false)) (lookbehind_blocked_state) } })

	;S (_ => {
		if (equals ([ ... R .map (L_ .isDefined) (last_n (2) (app_in_game_over_state)) ]) ([ false, true ])) {
			;please (L_ .set (lookbehind .overall_analysis)) (lookbehind_state) } })



	// communication

	;S (_ => 
		impure (
		T (
		{ _room: mark (app_room_state)
		, _student: mark (app_student_state) }
		) (
		pin (
		[ as_complete
		, ({ _room, _student }) =>
			suppose (
			( _consent = consent ()
			) =>
			with_io (_ =>
			go
			.then (_ =>
				!! equals (_consent) ('write') ? so ((_=_=>
				api (_room, [ message .student_ping (_student, room_status (_room)), ... in_playing_messages ]),

				where
				, _board = show (app_board_state)
				, _past = show (app_past_state)
				, in_playing_messages = pinpoint (
					as_reduction (
					[ [ app_as_in_playing,
						[ message .student_join (_student, _board)
						, message .student_update (_student, _past) ] ]
					, [ L .identity, [] ] ] )
					) (
					show (app_state) ) )=>_)

				: equals (_consent) ('read') ?
				api (_room)
				.then (_ensemble => {
					if (equals (_room) (show (app_room_state))) {
						;please (L_ .set (_ensemble)) (ensemble_state) } })

				: panic )
			.catch (
				pin_first
				( [ 'error', L .is ('timeout'), L .when (I), _ => {;console .warn ('Room timed out')} ]
				, panic ) ) )
			.then (_ => {
				;setTimeout (next_consent, 300) }) ) ] ) ) ) ) })
