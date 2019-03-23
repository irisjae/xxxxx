var { T, $, apply, L, L_, R, S, Z, Z_, Z$, sanc, memoize, 
faith, belief, show, mark, please, 
Y, impure, suppose,
so, by, 
go, never, panic, panic_on,
just_now, temporal,
fiat, data, data_lens, data_iso, data_kind,
focused_iso_,
last_n, n_reducer, l_sum, pinpoint,
map_defined_, map_defined, from_just, 
as_sole, sole, shuffle,
I, K, not, equals,
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
as_maybe, as_defined, as_complete, complete_,
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
message_encoding, messages_encoding, schedule_start,
teacher_app_get_ready_to_playing, teacher_app_playing_to_next, teacher_app_playing_to_game_over,
student_app_setup_to_get_ready, student_app_get_ready_to_playing, student_app_playing_to_next, student_app_playing_to_game_over,
current_problem, problem_choice_matches,
local_patterns, size_patterns,
as_solved_on, attempted_positions, solved_positions, bingoed_positions, bingoes
} = window .stuff


// resources

var clicking = ['click', 'touchstart'] .filter (_e => 'on' + _e in window) .slice (0, 1)
var play = impure (by (([ play, pause ]) => play))
var pause = impure (by (([ play, pause ]) => pause))
var audio_from = (url, loop = false) =>
	suppose (
	( el = new Audio (url)
	, $__preload = jinx (_ => {
		;el .volume = 0
		;el .play () })
	, $__loop = jinx (_ => {
		;el .loop = loop })
	) =>
	[ play, pause ] )
var audio = 
	{ correct: audio_from ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudent-correct.mp3?1546277231570')
	, incorrect: audio_from ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudent-incorrect.mp3?1546277231539')
	, bingo: audio_from ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudent-bingo.mp3?1546277231054')
	, countdown: audio_from ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fquestion-countdown.mp3?1546277335320')
	, background: audio_from ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fbackground.mp3?1546277343019', true) }

var img =
	{ logo: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flogo.png?1546759647786' 
	, join: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fjoin.png?1543381404734'
	, lion_avatar: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flion-avatar.png?1546341028460'
	, bunny_avatar: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fbunny-avatar.png?1546341028205'
	, connect: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fconnect.png?1543381404627' 
	, overall_analysis_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foverall-analysis-on.png?1547306859997'															
	, overall_analysis_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foverall-anlysis-off.png?1547306860589'														 
	, problems_analysis_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fproblems-analysis-on.png?1546759645249'															
	, problems_analysis_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fproblems-analysis-off.png?1546759645326'															
	, toggle_ordering: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Forder-icon.png?1551692617218'
	, play_again: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fplay-again.png?1546759645987' }



// interactive datas

var feedback = data ({
	setup_room: (room =~ room) => feedback,
	setting_up_student: (icon =~ avatar) => feedback,
	setup_student: (icon =~ avatar, name =~ string) => feedback,
	attempt_problem: (step =~ nat, position =~ position) => feedback,
	reset_game: () => feedback })

var lookbehind = data ({
	nothing: () => lookbehind,
	bad_room: (room =~ room) => lookbehind,
	attempting: (since =~ latency, blocked =~ bool) => lookbehind,
	overall_analysis: () => lookbehind,
	problems_analysis: (ordering =~ order ([ 'questions', 'number_of_attempts', 'solved_time' ])) => lookbehind })

var ambient = data ({
	ambient: ( background_music_on =~ bool ) => ambient })


var feedback_as_setup_room = data_iso (feedback .setup_room)
var feedback_as_setting_up_student = data_iso (feedback .setting_up_student)
var feedback_as_setup_student = data_iso (feedback .setup_student)
var feedback_as_attempt_problem = data_iso (feedback .attempt_problem)
var feedback_as_reset_game = data_iso (feedback .reset_game)

var feedback_as_icon = data_iso (feedback .setting_up_student) .icon

var lookbehind_as_nothing = data_iso (lookbehind .nothing)
var lookbehind_as_bad_room = data_iso (lookbehind .bad_room)
var lookbehind_as_attempting = data_iso (lookbehind .attempting)
var lookbehind_as_overall_analysis = data_iso (lookbehind .overall_analysis)
var lookbehind_as_problems_analysis = data_iso (lookbehind .problems_analysis)

var lookbehind_as_room = data_lens (lookbehind .bad_room) .room
var lookbehind_as_since = data_lens (lookbehind .attempting) .since
var lookbehind_as_blocked = data_lens (lookbehind .attempting) .blocked
var lookbehind_as_ordering = data_iso (lookbehind .problems_analysis) .ordering

var ambient_as_ambient = data_iso (ambient .ambient)
var ambient_as_background_music_on = data_lens (ambient .ambient) .background_music_on



var question_order = _point => so ((_=_=>
	R .indexOf (_point) (_points),
	where
	, _points = show (app_past_points_state) )=>_)
var number_of_attempts_order = L .count (point_as_attempts)
var solved_time_order = by (_point => so ((_=_=>
	L .get ([ as_solved_on (_board), point_as_attempts, L .last, attempt_as_latency ]),
	where
	, _board = show (app_as_board) )=>_))
		


// states and beliefs

var state = faith (
	{ app: student_app .setup (Z_ .Nothing, Z_ .Nothing, Z_ .Nothing)
	, lookbehind: lookbehind .nothing
	, ambient: ambient .ambient (false)
	, io: io .inert
	, ensemble: undefined
	, feedback: undefined } )


var app_state = belief ('app') (state) 
var lookbehind_state = belief ('lookbehind') (state)
var ambient_state = belief ('ambient') (state)
var io_state = belief ('io') (state)
var ensemble_state = belief ('ensemble') (state)
var feedback_state = belief ('feedback') (state)


var app_setup_state = belief (app_as_setup) (app_state)
var app_get_ready_state = belief (app_as_get_ready) (app_state)
var app_playing_state = belief (app_as_playing) (app_state)
var app_game_over_state = belief (app_as_game_over) (app_state)

var app_settings_state = belief (app_as_settings) (app_state)

var app_settings_time_limit_state = belief (settings_as_time_limit) (app_settings_state)
var app_settings_size_state = belief (settings_as_size) (app_settings_state)

var app_student_state = belief (app_as_student) (app_state)
var app_room_state = belief (app_as_room) (app_state)
var app_problems_state = belief (app_as_problems) (app_state)
var app_board_state = belief (app_as_board) (app_state)
var app_past_state = belief (app_as_past) (app_state)

var app_past_points_state = belief (past_as_points) (app_past_state)

var app_progress_state = belief (app_as_progress) (app_state)

var app_progress_timestamp_state = belief (progress_as_timestamp) (app_progress_state)
var app_progress_step_state = belief (progress_as_step) (app_progress_state)

var app_last_point_state = belief (app_as_last_point) (app_state)
var app_current_problem_state = belief (current_problem) (app_state)

var ensemble_progress_state = belief (ensemble_as_progress) (ensemble_state)

var feedback_setting_up_student_state = belief (feedback_as_setting_up_student) (feedback_state)
var feedback_icon_state = belief (feedback_as_icon) (feedback_state)

var io_inert_state = belief (io_as_inert) (io_state)
var io_connecting_state = belief (io_as_connecting) (app_state)
var io_heartbeat_state = belief (io_as_heartbeat) (app_state)

var lookbehind_bad_room_state = belief (lookbehind_as_bad_room) (lookbehind_state)
var lookbehind_overall_analysis_state = belief (lookbehind_as_overall_analysis) (lookbehind_state)
var lookbehind_problems_analysis_state = belief (lookbehind_as_problems_analysis) (lookbehind_state)
var lookbehind_room_state = belief (lookbehind_as_room) (lookbehind_state)
var lookbehind_since_state = belief (lookbehind_as_since) (lookbehind_state)
var lookbehind_blocked_state = belief (lookbehind_as_blocked) (lookbehind_state)
var lookbehind_ordering_state = belief (lookbehind_as_ordering) (lookbehind_state)

var ambient_background_music_on_state = belief (ambient_as_background_music_on) (ambient_state)




// views

var setup_room_view = _ => so ((_=_=>
	<setup-room-etc fn={ feedback_setup_room }>
		<a-title><img src={ img .logo }/></a-title>
		<sub-title>除法（一）</sub-title>
		<room style={{ margin: '30px 0' }}>
			<label>遊戲室編號：</label>
			{ L .get (chain_el (K (
			<message x-error="true">不能連接遊戲室{ bad_room }</message> ))
			) (
			mark (lookbehind_bad_room_state) ) }
			<input style={{ margin: { top: '10px' } }} /> </room>
		<button x-custom x-for="join"><img src={ img .join } /></button> </setup-room-etc>,
	where
	, bad_room = mark (lookbehind_room_state)
	, feedback_setup_room = _dom => so ((_=_=>
		(_input .addEventListener ('keypress', _e => {
			if (_e .keyCode === 13) {
				;let_room_enter () } }),
		clicking .forEach (click => {
			;_button .addEventListener (click, _e => {
				;let_room_enter () }) })),
		where
		, _input = _dom .querySelector ('input')
		, _button = _dom .querySelector ('button')
		, let_room_enter = _ => {
			var value = _input .value
			;_input .value = ''
			;please (L_ .set (feedback .setup_room (value))) (feedback_state) } )=>_))=>_)

var setup_student_view = _ => so ((_=_=>
	<setup-student-etc fn={ feedback_setup_student }>
		<a-title><img src={ img .logo }/></a-title>
		<sub-title>除法（一）</sub-title>
		<name style={{ marginTop: '30px' }}>
			<label>名稱</label>
			<input /> </name>
		<icon style={{ marginBottom: '30px' }}>
			<avatar x-for="lion" x-selected={ T (_icon) (L .isDefined (avatar_as_lion)) }>
				<selected-input />
				<img src={ img .lion_avatar } /> </avatar>
			<avatar x-for="bunny" x-selected={ T (_icon) (L .isDefined (avatar_as_bunny)) }>
				<selected-input />
				<img src={ img .bunny_avatar } /> </avatar> </icon> 
		{ !! L_ .isDefined (mark (feedback_setting_up_student_state))
		? <button x-custom x-for="connect"><img src={ img .connect } /></button>
		: [] } </setup-student-etc>,
	where
	, _icon = mark (feedback_icon_state)
	, feedback_setup_student = _dom => so ((_=_=>
		(_name_input .addEventListener ('keypress', _e => {
			if (_e .keyCode === 13) {
				;let_name_enter () } }),
		clicking .forEach (click => {
			;_lion_option .addEventListener (click, _e => {
				;let_icon (avatar .lion) })
			;_bunny_option .addEventListener (click, _e => {
				;let_icon (avatar .bunny) })
			if (_button) { 
				;_button .addEventListener (click, _e => {
					;let_name_enter () }) } })),
		where
		, _name_input = _dom .querySelector ('input')
		, _lion_option = _dom .querySelector ('avatar[x-for=lion]')
		, _bunny_option = _dom .querySelector ('avatar[x-for=bunny]')
		, _button = _dom .querySelector ('button')
		, let_icon = _avatar => {
			;please (L_ .set (feedback .setting_up_student (_avatar))) (feedback_state) }
		, let_name_enter = _ => {
			if (L_ .isDefined (show (feedback_setting_up_student_state))) {
				var _icon = show (feedback_icon_state)
				var _name = _name_input .value
				;_name_input .value = ''
				;please (L_ .set (feedback .setup_student (_icon, _name))) (feedback_state) } } )=>_))=>_)

var setup_view = _ => <setup-etc> {
	!! not (L_ .isDefined (mark (app_room_state)))
	?
		!! L_ .isDefined (mark (io_inert_state))
		? setup_room_view
		: L .isDefined (L .choice (io_as_connecting, io_as_heartbeat)) (mark (io_state))
		? <message>正在連接遊戲室…</message>
		: panic ('invalid io at get ready view')
	: not (L_ .isDefined (mark (app_student_state)))
	?
		!! L_ .isDefined (mark (io_inert_state))
		? setup_student_view
		: L .isDefined (L .choice (io_as_connecting, io_as_heartbeat)) (mark (io_state))
		? <message>正在加入遊戲室…</message>
		: panic ('invalid io at get ready view')
	: <message>正在加入遊戲室…</message> } </setup-etc>

var get_ready_view = _ => so ((_=_=>
	<get-ready-etc>
		<div><room>已加入遊戲室{room}</room></div>
		<div>等候遊戲開始…</div> </get-ready-etc>,
	where
	, room = mark (app_room_state) )=>_)

var bingoes_view = so ((_=_=>
	_bingoes =>
		<bingo> { T (_bingoes) ([ L .collect ([ L .elems, _pattern => T (letters) (R .map (nth => 
			<letter x-as={ nth_letter (nth) } style={ nth_letter_pos (_pattern) (nth) } />)) ]) ]) } </bingo>,
	where
	, letters = Z_ .range (1) (5 + 1)
	, nth_letter = nth =>
		!! equals (nth) (1) ? 'b'
		: equals (nth) (2) ? 'i'
		: equals (nth) (3) ? 'n'
		: equals (nth) (4) ? 'g'
		: equals (nth) (5) ? 'o'
		: panic ('bad letter')
	, nth_letter_pos = _pattern => nth => so ((_=_=> (
		{ left: left, top: top } ),
		where
		, _size = R .length (_pattern)
		, _shape = pattern_shape (_pattern)
		, _x = L .get ([ L .elems, ([ y, x ]) => x ]) (_pattern)
		, _y = L .get ([ L .elems, ([ y, x ]) => y ]) (_pattern)
		, left = !! equals (_shape) ('vertical') ? ((_x - 1) / _size + (1 / _size - 1 / 5) / 2) * 100 + '%'
			: ((nth - 1) * 1 / 5) * 100 + '%'
		, top = !! equals (_shape) ('horizontal') ? ((_y - 1) / _size + (1 / _size - 1 / 5) / 2) * 100 + '%'
			: equals (_shape) ('diagonal-up') ? ((5 - nth) * 1 / 5) * 100 + '%'
			: ((nth - 1) * 1 / 5) * 100 + '%' )=>_) 
	, pattern_shape = _pattern =>
		suppose (
		( [ first_y, first_x ] = L .get (L .first) (_pattern)
		, [ last_y, last_x ] = L .get (L .last) (_pattern)
		) =>
		!! equals (first_x) (last_x) ? 'vertical'
		: equals (first_y) (last_y) ? 'horizontal'
		: (first_x < last_x) ? 'diagonal-down'
		: (first_x > last_x) ? 'diagonal-up'
		: panic ('bad pattern') ) )=>_)

	

var playing_view = _ => so ((_=_=>
	<playing-etc>
		<div class="left-pane">
			<ticker-etc>
				{ L .get (chain_el (_t =>
				_time_limit - _t )) (clock ()) }
				<ticker z-identity={ _problem_number } style={ ticker_style }><spinner/></ticker> </ticker-etc>
			<question>
				{ L .get ([ question_as_text, chain_el (_question_text =>
				_question_text ) ]) (_current_question) }
				{ L .get ([ question_as_image, chain_el (_question_image =>
				<img src={ _question_image } /> ) ]) (_current_question) } </question> </div>
		<div class="right-pane">
			<board x-disabled={ _disabled }> { T (_board) (R .map (_row => 
				<row> { T (_row) (R .map (_cell => so ((_=_=>
					!! _cell_solved
					? <cell x-solved>{ _cell_choice }</cell>
					: <cell fn={ feedback_cell (_cell) }>{ _cell_choice }</cell>,
					where
					, _cell_position = T (_cell) (L .get (cell_as_position))
					, _cell_choice = T (_cell) (L .get (cell_as_choice))
					, _cell_solved = R .includes (_cell_position) (_solved_positions) )=>_))) } </row> )) }
				{ bingoes_view (_bingoes) } </board> </div> </playing-etc>,
		where
		, _board = mark (app_board_state)
		, _past = mark (app_past_state)
		, _problem_number = mark (app_progress_step_state) + 1
		, _time_limit = mark (app_settings_time_limit_state)
		, _current_question = T (mark (app_current_problem_state)) (L .get (problem_as_question))
		, _solved_positions = solved_positions (_board) (_past)
		, _bingoes = bingoes (_board) (_past)
		, _disabled = mark (lookbehind_blocked_state)
		, ticker_style = { animationDuration: _time_limit + 's' }
		, feedback_cell = cell => _dom => {
			;clicking .forEach (click => {
				;_dom .addEventListener (click, _ => {
					var _step = show (app_progress_step_state)
					var _position = T (cell) (L .get (cell_as_position))
					;please (L_ .set (feedback .attempt_problem (_step, _position))) (feedback_state) }) }) } )=>_) 

var game_over_view = _ => so ((_=_=>
	<game-over-etc>
		<a-title><img src={ img .logo }/></a-title>
		<student><label>{ _name }</label></student> 
		<options x-for="tabs">
			<button x-custom x-for="overall-analysis" fn={ overall_analysis }>
				<img src={ !! L_ .isDefined (mark (lookbehind_overall_analysis_state)) ? img .overall_analysis_on : img .overall_analysis_off } /> </button>
			<button x-custom x-for="problems-analysis" fn={ problems_analysis }>
				<img src={ !! L_ .isDefined (mark (lookbehind_problems_analysis_state)) ? img .problems_analysis_on : img .problems_analysis_off } /> </button> </options>
		{ !! L_ .isDefined (mark (lookbehind_overall_analysis_state))
		? 
			<overall-analysis>
				<div><span>已答題數：</span> <span>{ attempted_points_amount }</span></div>
				<div><span>答對題數：</span> <span>{ solved_points_amount }</span></div>
				<div><span>平均答對時間：</span> <span>{ mean_solved_point_latency }秒</span></div> </overall-analysis>
		: L_ .isDefined (mark (lookbehind_problems_analysis_state))
		? so ((_=_=>
			<problems-analysis-etc>
				<labels>
					<question fn={ toggle_question_order }>題目 <img src={ img .toggle_ordering } /></question>
					<number-of-attempts fn={ toggle_number_of_attempts_order }>作答次數 <img src={ img .toggle_ordering } /></number-of-attempts>
					<solved-time fn={ toggle_solved_time_order }>答對時間 <img src={ img .toggle_ordering } /></solved-time> </labels>
				<problems-analysis>
					{ /*reimplement order in terms of free object*/ }
					{ T (_points
					) (
					L .collect ([ order_sort (_ordering), L .elems, _point => so ((_=_=>
						<problem>
							<question>{ T (_question) (L .get (L .choice (
									L .chain (K (_image => <img src={ _image } />)) (question_as_image),
									L .chain (K (I)) (question_as_text)))) }</question>
							<number-of-attempts>{ _number_of_attempts }</number-of-attempts>
							<solved-time>{ _solved_time }</solved-time> </problem>,
						where
						, _question = T (_point) (L .get ([ point_as_problem, problem_as_question ]))
						, _number_of_attempts = T (_point) (L .count ([ point_as_attempts, L .elems ]))
						, _solved_time = T (_point) (L .get ([ as_solved_on (_board), point_as_attempts, L .last, attempt_as_latency, _x => _x .toFixed (2) * 1 + '秒' ])) || '-' )=>_) ])) } </problems-analysis> </problems-analysis-etc>,
			where
			, _ordering = mark (lookbehind_ordering_state) )=>_)
		: [] }
		<options x-for="options">
			<button x-custom x-for="play-again" fn={ feedback_play_again } ><img src={ img .play_again } /></button> </options> </game-over-etc>,
	where
	, _student = mark (app_student_state)
	, _name = T (_student) (L .get (student_as_name))
	, _board = mark (app_board_state)
	, _points = mark (app_past_points_state)
	, attempted_points_amount = T (_points) (L .count ([ L .elems, point_as_attempts, L .last ]))
	, solved_points_amount = T (_points) (L .count ([ L .elems, as_solved_on (_board), point_as_attempts, L .last ]))
	, mean_solved_point_latency = T (_points) (L .mean ([ L .elems, as_solved_on (_board), point_as_attempts, L .last, attempt_as_latency ])) .toFixed (2) * 1 || '0'
	, overall_analysis = _dom => {
			;clicking .forEach (click => {
				;_dom .addEventListener (click, _ => {
					;please (L_ .set (lookbehind .overall_analysis)) (lookbehind_state) })})}															
	, problems_analysis = _dom => {
			;clicking .forEach (click => {
				;_dom .addEventListener (click, _ => {
					;please (L_ .set (lookbehind .problems_analysis ([]))) (lookbehind_state) })})}
	, toggle_question_order = _dom => {
			;clicking .forEach (click => {
				;_dom .addEventListener (click, _ => {
					;please (toggle_order (question_order)) (lookbehind_ordering_state) })})}
	, toggle_number_of_attempts_order = _dom => {
			;clicking .forEach (click => {
				;_dom .addEventListener (click, _ => {
					;please (toggle_order (number_of_attempts_order)) (lookbehind_ordering_state) })})}
	, toggle_solved_time_order = _dom => {
			;clicking .forEach (click => {
				;_dom .addEventListener (click, _ => {
					;please (toggle_order (solved_time_order)) (lookbehind_ordering_state) })})}
	, feedback_play_again = _dom => {
			;clicking .forEach (click => {
				;_dom .addEventListener (click, _ => {
					;please (L_ .set (feedback .reset_game)) (feedback_state) })})} )=>_) 


S .root (die => {
	;window .die = { ... (window .die || {}), view: die }
	;window .view = <student-app>
		{ !! L_ .isDefined (mark (app_setup_state))
		? setup_view
		: L_ .isDefined (mark (app_get_ready_state))
		? get_ready_view	 
		: L_ .isDefined (mark (app_playing_state))
		? playing_view
		: L_ .isDefined (mark (app_game_over_state))
		? game_over_view
		: panic ('undefined app state in view') } </student-app> })

			 
			 
			 
// transitions
			 
var setup_room = _room => {
	;go 
	.then (_ => {
		;please (L_ .set (io .connecting)) (io_state) })
	.then (_ =>
		api (_room)
		.then (panic_on ([ [equals ({}), 'empty room; expired code?'] ])) )
	.then (pinpoint (
		[ L .inverse (data_iso (ensemble .ensemble))
		, ensemble_as_settings
		, _settings => {
			;please (L_ .set (_room)) (app_room_state)
			;please (L_ .set (_settings)) (app_settings_state) } ]))
	.catch (_e => {
		;please (L_ .set (lookbehind .bad_room (_room))) (lookbehind_state)
		;console .error (_e) })
	.then (_ => {
		;please (L_ .set (io .inert)) (io_state) }) }

var setup_student = _icon => _name => {
	;please (L_ .set (student .student (uuid (), _name, _icon))) (app_student_state) } 

var connect_room = impure (_ => 
	T (
	{ _student: show (app_student_state)
	, _room: show (app_room_state) }) (
	pinpoint (
	[ as_complete
	, impure (({ _student, _room }) => 
		suppose (
		( latest_settings
		) =>
		go 
		.then (_ => {
			;please (L_ .set (io .connecting)) (io_state) })
		.then (_ =>
			api (_room)
			.then (panic_on ([ [equals ({}), 'empty room; expired code?'] ])) )
		.then (pinpoint (
			[ L .inverse (data_iso (ensemble .ensemble))
			, ensemble_as_settings
			, impure (_settings => {;latest_settings = _settings}) ]))
		.then (_ =>
			api (_room, post (message_encoding (
				message .student_ping (_student, [0, 0, 0]) )))
			.then (panic_on ([ [ L .get ([ 'ok', not ]), 'not ok'] ])) )
		.then (_ => { 
			;please (L_ .set (latest_settings)) (app_settings_state) })
		.catch (_e => {
			;please (L_ .set (lookbehind .bad_room (_room))) (lookbehind_state)
			;console .error (_e) })
		.then (_ => {
			;please (L_ .set (io .inert)) (io_state) }) )) ])) )

var attempt_problem = impure (_position =>
	T (
	{ _problem: show (app_current_problem_state)
	, _board: show (app_board_state)
	, _point: show (app_last_point_state) }
	) (
	pinpoint (
	[ as_complete
	, impure (({ _problem, _board, _point }) => {
		var board_choice = _board => _position =>
			T (_board) (L .get ([ as_position (_position), cell_as_choice ]))

		var join_2 = map_a => map_b => L .chain (K (map_b)) (map_a)
		var join = Z_ .reduce (join_2) ([])
			
		var _completed = T (_point) (L .get ([ join ([ point_as_position, board_choice (_board), problem_choice_matches (_problem) ]), L .valueOr (false) ]))
		if (not (_completed)) {
			var _choice = board_choice (_board) (_position)
			if (! show (lookbehind_blocked_state)) {
				var latency = S .sample (fine_clock)
				;please (L .set ([ point_as_attempts, L .appendTo ]) ([_position, latency])) (app_last_point_state)

				if (problem_choice_matches (_problem) (_choice)) {
					var _solved_positions = [ ...solved_positions (_board) (show (app_past_state)), _position ]
					var _size = show (app_settings_size_state)
					var _local_patterns = T (local_patterns (size_patterns (_size))
						) (
						L .collect ([ as_value_of (_position), L .elems, L .when (R .all (T (_solved_positions) (R .flip (R .includes)))) ]))
					;play (audio .correct)
					if (L .isDefined (L .elems) (_local_patterns)) {
						;play (audio .bingo) } }
				else {
					;play (audio .incorrect)
					;please (L_ .set (lookbehind .attempting (latency, true))) (lookbehind_state) } } } }) ]) ) )

var reset_game = _ => {
	;please (L_ .set (student_app .setup (Z .Nothing, Z .Nothing, Z .Nothing))) (app_state) }





// resource rules

var [ time, ticking ] = timer ()
var [ clock, fine_clock ] = S .root (die => 
	( (window .die = { ... (window .die || {}), clock: die })
	, S .subclock (_ => 
		suppose (
		( _clock = S .value ()
		, _fine_clock = S .value ()
		, $__ticking = S (_ => {
			if (ticking () && L_ .isDefined (mark (app_progress_timestamp_state))) {
				var _timestamp = mark (app_progress_timestamp_state)
				var _fine_tick = (time () - _timestamp) / 1000
				var _tick = Math .floor (_fine_tick)
				if (_tick >= 0) {
					;_clock (_tick)
					;_fine_clock (_fine_tick) } } })
		) =>
		[ _clock, _fine_clock ] ) ) ))

				
var reping_period = 3
var heartbeat = S .data (reping_period) 

var connection = S .root (die =>
	( (window .die = { ... (window .die || {}), connection: die })
	, S (_ => 
		T (mark (app_room_state)
		) (
		L .get (
		[ L .when (I)
		, _room => {
			if (! connection [_room]) {
				;connection [_room] = S .data ()
				;api .listen_ping (_room) (connection [_room]) }
			if (connection [_room] ()) {
				var [ mean, variance, n, timestamp ] = connection [_room] ()
				return [ timestamp, mean, Math .sqrt (variance) ] } } ])) ) ) )



// rules

;S .root (die => {
	;window .die = { ... (window .die || {}), rules: die }

	// handle user
								 
	;S (_ => 
		T (mark (feedback_state)
		) (
		pinpoint (
		l_sum (
		[ [ feedback_as_setup_room, L .when (I)
			, ({ room: _room }) => {
				;setup_room (_room)} ]
		, [ feedback_as_setup_student, L .when (I)
			, impure (({ icon: _icon, name: _name }) => 
				go
				.then (_ => setup_student (_icon) (_name))
				.then (_ => connect_room ()) ) ]
		, [ feedback_as_attempt_problem, L .when (I)
			, ({ position: _position }) => {
				;attempt_problem (_position)} ]
		, [ feedback_as_reset_game, L .when (I)
			, impure (reset_game) ] ] ))) )

	;S (_ => {
		if (mark (ambient_background_music_on_state)) {
			;play (audio .background) }
		else {
			;pause (audio .background) } })





	// game rules

	;S (_ => {
		var _progress = mark (app_progress_state)
		var _ensemble_progress = mark (ensemble_progress_state)

		if (not (equals (_progress) (_ensemble_progress))) {
			if (L_ .isDefined (mark (app_get_ready_state))) {
				;please (student_app_get_ready_to_playing) (app_state)
				;please (L_ .set (_ensemble_progress)) (app_progress_state) }
			else if (L_ .isDefined (mark (app_playing_state))) {
				var _progress_step = L .get (progress_as_step) (_ensemble_progress)
				if (_progress_step !== -1) {
					if (_progress_step > L .get (progress_as_step) (_progress)) {
						;please (L_ .set (_ensemble_progress)) (app_progress_state) } }
				else {
					;please (student_app_playing_to_game_over) (app_state) } } } })

	;S (_ => {
		if (L_ .isDefined (mark (app_setup_state))) {
			;please (L_ .set (lookbehind .nothing)) (lookbehind_state)
			;please (L_ .remove) (ensemble_state) } })

	;S (last_app_room_state => {
		if (! L_ .isDefined (last_app_room_state)) {
			if (L_ .isDefined (mark (app_room_state))) {
				;please (L_ .set (lookbehind .nothing)) (lookbehind_state) } }
		return mark (app_room_state) })

	;S (_ => {
		if (L_ .isDefined (mark (app_setup_state))) {
			T ([ mark (app_student_state), mark (app_room_state), mark (app_settings_state) ]
			) (
			pinpoint (
			[ as_complete
			, _ => {;please (student_app_setup_to_get_ready) (app_state)} ])) } })

	;S (_ => {
		if (mark (lookbehind_blocked_state)) {
			var forget = setTimeout (_ => {
				;please (L_ .set (false)) (lookbehind_blocked_state) }
			, 3000)
			;S .cleanup (_ => {;clearTimeout (forget)}) } })

	;S (last_tick_left => {
		var time_limit = mark (app_settings_time_limit_state)
		if (L_ .isDefined (mark (app_playing_state))) {
			var tick = clock ()
			var tick_left = time_limit - tick
			if (tick_left == 3 && not (equals (tick_left) (last_tick_left))) {
				;play (audio .countdown) }
			if (tick >= time_limit) {
				;please (student_app_playing_to_next) (app_state) }
			return tick_left } })

	;S (last_progress_step => {
		var progress_step = mark (app_progress_step_state)
		if (L_ .isDefined (mark (app_playing_state))) {
			if (complete_ ([ last_progress_step, progress_step ]) && not (equals (last_progress_step) (progress_step))) {
				;please (L_ .set (0)) (lookbehind_since_state) 
				;please (L_ .set (false)) (lookbehind_blocked_state) } }
		return progress_step })

	;S (last_game_over_state => {
		if (! L_ .isDefined (last_game_over_state)) {
			if (L_ .isDefined (mark (app_game_over_state))) {
				;please (L_ .set (lookbehind .overall_analysis)) (lookbehind_state) } }
		return mark (app_game_over_state) })





	// misc

	// time
	;S (_ => {
		if (L_ .isDefined (mark (app_get_ready_state))) {
			;ticking (false) }
		else if (L_ .isDefined (mark (app_playing_state))) {
			;ticking (true) }
		else if (L_ .isDefined (mark (app_game_over_state))) {
			;ticking (false) } })

	// communication
	;S (_ => 
		T (
		{ _student: mark (app_student_state)
		, _room: mark (app_room_state) }
		) (
		pinpoint (
		[ as_complete
		, impure (({ _student, _room }) =>
			suppose (
			( phase = heartbeat ()
			, critical = phase === 1
			) =>
			( !! critical && S .sample (connection)
			? so ((_=_=>
				go
				.then (_ => {
					;please (L_ .set (io .messaging)) (io_state) })
				.then (_ =>
					api (_room, post (messages_encoding (
						!! not_playing
						? [ message .student_ping (_student, S .sample (connection)) ]
						: [ message .student_ping (_student, S .sample (connection))
							, message .student_join (_student, _board)
							, message .student_update (_student, _past) ]))) ),
				where
				, { _board, _past, not_playing } =
					T (
					{ _board: show (app_board_state)
					, _past: show (app_past_state) }
					) (
					L .get ([ complete_, L .valueOr ({ not_playing: 'not playing' }) ])))=>_)
			: go
				.then (_ => {
					;please (L_ .set (io .heartbeat)) (io_state) })
				.then (_ =>
					api (_room) )
				.then (pinpoint (
					[ L .inverse (data_iso (ensemble .ensemble))
					, L .when (_ => equals (_room) (show (app_room_state)))
					, _ensemble => {;please (L_ .set (_ensemble)) (ensemble_state)} ]) ) )
			.catch (
				pinpoint (
				L .cond (
				[ L .get ([ 'error', L .is ('timeout') ]), _ => {
					;console .warn ('Room timed out') } ],
				[ panic ] ) ) )
			.then (_ => {
				;setTimeout (_ => {
					;heartbeat (!! critical ? reping_period : phase - 1) }
				, 300) })
			.catch (_e => {
				;console .error (_e)
				;setTimeout (_ => {
					;heartbeat (phase) }
				, 300) })
			.then (_ => {
				;please (L_ .set (io .inert)) (io_state) }) )) ])) ) })
