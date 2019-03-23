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
var audio = {
	bingo: new Audio ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudent-bingo.mp3?1546277231054'),
	background: new Audio ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fbackground.mp3?1546277343019') }
;audio .background .loop = true

var img =
	{ logo: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flogo.png?1546759647786' 

	, music_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fmusic-on.png?1546759646100'
	, music_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fmusic-off.png?1547792522660'

	, start: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-start.png?1541183674879'
	, preview: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-preview.png?1541183674936'
	, back: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fcounter-prev.png?1541181538486'

	, play: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-start.png?1541183674879'

	, prev: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fcounter-prev.png?1541181538486'
	, next: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fcounter-next.png?1541181537950'

	, three_by_three_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F3x3-off.png?1550827377940'
	, three_by_three_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F3x3-on.png?1550827378072'
	, four_by_four_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F4x4-on.png?1550827378011'
	, four_by_four_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F4x4-off.png?1550827378248'
	, five_by_five_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F5x5-on.png?1550827377693'
	, five_by_five_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F5x5-off.png?1550827379773'

	, ten_secs: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F10-secs.png?1541182690288'
	, twenty_secs: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F20-secs.png?1541563332669'
	, thirty_secs: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F30-secs.png?1541563332968'

	, time_limit_play: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftime-limit-play.png?1550392930019'
	, play_to_win: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fplay-to-win.png?1541182355223'
	, free_play: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ffree-play.png?1550392925661'

	, view_students: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fview-students.png?1541802335642'
	, show_problem: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fshow-problem.png?1543385405259'
	, end_game: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fend-game.png?1541802334772'
	, cancel: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fcancel.png?1541818700002'
	, confirm: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fconfirm.png?1541818699969'

	, show_results_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fshow-results-on.png?1546759645160'
	, show_results_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fshow-results-off.png?1546759644963'
	, students_analysis_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudents-analysis-on.png?1546759645196'
	, students_analysis_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudents-analysis-off.png?1546759645007'
	, problems_analysis_on: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fproblems-analysis-on.png?1546759645249'
	, problems_analysis_off: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fproblems-analysis-off.png?1546759645326'

	, toggle_ordering: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Forder-icon.png?1551692617218'														
	, play_again: 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fplay-again.png?1546759645987' }



// interactive datas

var feedback = data ({
	start: () => feedback,
	setup_rules: ( rules_piece =~ piece (settings) ) => feedback,
	play: () => feedback,
	end: () => feedback,
	reset: () => feedback })

var lookbehind = data ({
	nothing: () => lookbehind,
	preview_questions: () => lookbehind,
	view_students: () => lookbehind,
	consider_end: () => lookbehind,
	show_results: () => lookbehind,
	students_analysis: (ordering =~ order ([ 'name', 'number_of_solved', 'number_of_bingoes', 'average_solved_time' ])) => lookbehind,
	problems_analysis: (ordering =~ order ([ 'question', 'number_of_solvers', 'average_number_of_attempts', 'average_solved_time' ])) => lookbehind })

var ambient = data ({
	ambient: ( background_music_on =~ bool ) => ambient })

var feedback_as_start = data_iso (feedback .start)
var feedback_as_setup_rules = data_iso (feedback .setup_rules)
var feedback_as_play = data_iso (feedback .play)
var feedback_as_end = data_iso (feedback .end)
var feedback_as_reset = data_iso (feedback .reset)

var feedback_as_rules_piece = data_lens (feedback .setup_rules) .rules_piece

var lookbehind_as_nothing = data_iso (lookbehind .nothing)
var lookbehind_as_preview_questions = data_iso (lookbehind .preview_questions)
var lookbehind_as_view_students = data_iso (lookbehind .view_students)
var lookbehind_as_consider_end = data_iso (lookbehind .consider_end)
var lookbehind_as_show_results = data_iso (lookbehind .show_results)
var lookbehind_as_students_analysis = data_iso (lookbehind .students_analysis)
var lookbehind_as_problems_analysis = data_iso (lookbehind .problems_analysis)

var lookbehind_as_ordering = L .choice (data_iso (lookbehind .students_analysis) .ordering, data_iso (lookbehind .problems_analysis) .ordering)

var ambient_as_ambient = data_iso (ambient .ambient)
var ambient_as_background_music_on = data_lens (ambient .ambient) .background_music_on



// states and beliefs

var state = faith (
	{ app: teacher_app .setup (default_settings)
	, lookbehind: lookbehind .nothing
	, ambient: ambient .ambient (true)
	, io: io .inert
	, ensemble: ensemble .nothing
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
var app_progress_state = belief (app_as_progress) (app_state)

var app_progress_timestamp_state = belief (progress_as_timestamp) (app_progress_state)
var app_progress_step_state = belief (progress_as_step) (app_progress_state)

var app_settings_state = belief (app_as_settings) (app_state)

var app_settings_problems_state = belief (settings_as_problems) (app_settings_state)
var app_settings_rules_state = belief (settings_as_rules) (app_settings_state) 

var app_settings_rules_time_limit_state = belief (rules_as_time_limit) (app_settings_rules_state) 
var app_settings_rules_size_state = belief (rules_as_size) (app_settings_rules_state) 
var app_settings_rules_win_rule_state = belief (rules_as_win_rule) (app_settings_rules_state) 

var app_students_state = belief (app_as_students) (app_state)
var app_room_state = belief (app_as_room) (app_state)
var app_boards_state = belief (app_as_boards) (app_state)
var app_pasts_state = belief (app_as_pasts) (app_state)

var app_current_problem_state = belief (current_problem) (app_state)
var app_students_map_boards_v_pasts_state = belief ([ L .pick ({ boards: app_as_boards, pasts: app_as_pasts }), L .when (I), ({ boards, pasts }) => map_zip (a => b => [a, b]) (boards) (pasts) ]) (app_state)

var lookbehind_nothing_state = belief (lookbehind_as_nothing) (lookbehind_state)
var lookbehind_preview_questions_state = belief (lookbehind_as_preview_questions) (lookbehind_state)
var lookbehind_view_students_state = belief (lookbehind_as_view_students) (lookbehind_state)
var lookbehind_consider_end_state = belief (lookbehind_as_consider_end) (lookbehind_state)
var lookbehind_show_results_state = belief (lookbehind_as_show_results) (lookbehind_state)
var lookbehind_students_analysis_state = belief (lookbehind_as_students_analysis) (lookbehind_state)
var lookbehind_problems_analysis_state = belief (lookbehind_as_problems_analysis) (lookbehind_state)

var lookbehind_ordering_state = belief (lookbehind_as_ordering) (lookbehind_state)

var ambient_background_music_on_state = belief (ambient_as_background_music_on) (ambient_state)

var io_inert_state = belief (io_as_inert) (io_state)
var io_connecting_state = belief (io_as_connecting) (io_state)
var io_heartbeat_state = belief (io_as_heartbeat) (io_state)

var ensemble_progress_state = belief (ensemble_as_progress) (ensemble_state)
var ensemble_pings_state = belief (ensemble_as_pings) (ensemble_state)
var ensemble_boards_state = belief (ensemble_as_boards) (ensemble_state)
var ensemble_pasts_state = belief (ensemble_as_pasts) (ensemble_state)

var feedback_start_state = belief (feedback_as_start) (feedback_state) 
var feedback_setup_rules_state = belief (feedback_as_setup_rules) (feedback_state) 
var feedback_play_state = belief (feedback_as_play) (feedback_state) 
var feedback_end_state = belief (feedback_as_end) (feedback_state) 
var feedback_reset_state = belief (feedback_as_reset) (feedback_state) 

var feedback_rules_piece_state = belief (feedback_as_rules_piece) (feedback_state)




// views

var counter_setting_view = label => please_feedback => iso_v_img_list => _setting => so ((_=_=>
	[ <label>{ label }</label>
	, <control>
		<prev fn={ feedback_prev }><img src={ img .prev } /></prev>
		<counter><img src={ _img } /></counter>
		<next fn={ feedback_next }><img src={ img .next } /></next></control> ],
	where
	, match_setting = ([ _iso, _ ]) => L .and (_iso) (_setting)
	, _iso_v_img = T (iso_v_img_list) (L .get (L .find (match_setting)))
	, _index = T (iso_v_img_list) (L .getAs ((_, i) => i) (L .find (match_setting)))
	, [ _iso, _img ] = _iso_v_img
	, list_length = R .length (iso_v_img_list)
	, index_q_list = i => ((i % list_length) + list_length) % list_length
	, [ prev_iso, ] = T (iso_v_img_list) (L .get (index_q_list (_index - 1)))
	, [ next_iso, ] = T (iso_v_img_list) (L .get (index_q_list (_index + 1)))
	, feedback_prev = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please_feedback (T (_setting) (L .get ([ _iso, L .inverse (prev_iso) ]))) }) }) }
	, feedback_next = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please_feedback (T (_setting) (L .get ([ _iso, L .inverse (next_iso) ]))) }) }) } )=>_)

var setup_view = _ => so ((_=_=>
	!! L_ .isDefined (mark (lookbehind_nothing_state))
	? <setup-etc>
		<div class="left-pane">
			<a-title><img src={ img .logo }/></a-title>
			<sub-title>除法（一）</sub-title>
			<settings x-for="game-mode time-limit" style={{ marginTop: '20px' }}>
			<setting x-of="game-mode">
				{ $ (counter_setting_view
				) ('遊戲模式：'
				) (_win_rule => {
					var rules_delta = T (_win_rule) (L .get (L.inverse (data_iso (rules .rules) .win_rule)))
					;please (L_ .set (feedback .setup_rules (rules_delta))) (feedback_state) }
				) (
				[ [ win_rule_as_first_bingo, img .play_to_win ]
				, [ [ L .normalize (L .modify ([ win_rule_as_time_limit, L .valueOr (15) ]) (I)) , win_rule_as_limit_time ]
					, img .time_limit_play ]
				, [ win_rule_as_all_problems, img .free_play ] ]
				) (mark (app_settings_rules_win_rule_state)) } </setting>
			<setting x-of="time-limit">
				{ $ (counter_setting_view
				) ('各題作答時限：'
				) (_time_limit => {
					var rules_delta = T (_time_limit) (L .get (L.inverse (data_iso (rules .rules) .time_limit)))
					;please (L_ .set (feedback .setup_rules (rules_delta))) (feedback_state) }
				) (
				[ [ L .is (10), img .ten_secs ]
				, [ L .is (20), img .twenty_secs ]
				, [ L .is (30), img .thirty_secs ] ]
				) (mark (app_settings_rules_time_limit_state)) } </setting></settings>
			<button x-custom="true" x-for="preview" style={{ marginTop: '25px' }} fn={ setup_preview }><img src={ img .preview } /></button>
			<button x-custom="true" x-for="start" fn={ feedback_start }>
				<img src={ img .start } />
				{ L .get (chain_el (K (
				<div style={{ height: 0 }}>遊戲正在開始…</div> ) )
				) (
				mark (io_connecting_state) ) } </button></div>
		<div class="right-pane">
			<settings x-for="board-size">
				<setting x-of="board-size" x-be="3x3"><img fn={ feedback_size (3) } src={ !! equals (_size) (3) ? img .three_by_three_on : img .three_by_three_off } /></setting>
				<setting x-of="board-size" x-be="4x4"><img fn={ feedback_size (4) } src={ !! equals (_size) (4) ? img .four_by_four_on : img .four_by_four_off } /></setting>
				<setting x-of="board-size" x-be="5x5"><img fn={ feedback_size (5) } src={ !! equals (_size) (5) ? img .five_by_five_on : img .five_by_five_off } /></setting> </settings> </div>
		<setting x-for="background-music" x-be={ !! _background_music_on ? 'off' : 'on' } fn={ toggle_background_music } ><img src={ !! _background_music_on ? img .music_on : img .music_off } /></setting> </setup-etc>
	: L_ .isDefined (mark (lookbehind_preview_questions_state))
	? <setup-etc>
		<title-etc>
			<a-title><img src={ img .logo }/></a-title> </title-etc>
		<preview-questions-etc>
			<button x-custom="true" x-for="back" fn={ preview_back }><img src={ img .back } /></button>
			<preview-questions>
				<labels><question>題目</question><answer>答案</answer></labels>
				{ L .collect (L .chain ((_problem, i) => so ((_=_=> K (
				<problem><question><number>{ i + 1 }</number><img src={ question_image }/></question><answer>{ answer }</answer></problem> ),
				where
				, question_image = T (_problem) (L .get ([ problem_as_question, question_as_image ]))
				, answer = T (_problem) (L .get ([ problem_as_question, question_as_solution ])) )=>_)
				) (
				L .elems
				) ) (
				mark (app_settings_problems_state)) } </preview-questions> </preview-questions-etc> 
		<setting x-for="background-music" x-be={ !! _background_music_on ? 'off' : 'on' } fn={ toggle_background_music } >
			<img src={ !! _background_music_on ? img .music_on : img .music_off } /></setting> </setup-etc>
	// MAJOR HACK
	: (please (L_ .set (lookbehind .nothing)) (lookbehind_state), []),
	where
	, _size = mark (app_settings_rules_size_state)
	, _background_music_on = mark (ambient_background_music_on_state)
	, feedback_start = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (L_ .set (feedback .start)) (feedback_state) }) }) }
	, feedback_size = _size => _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				var rules_delta = T (_size) (L .get (L.inverse (data_iso (rules .rules) .size)))
				;please (L_ .set (feedback .setup_rules (rules_delta))) (feedback_state) }) }) }
	, setup_preview = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (L_ .set (lookbehind .preview_questions)) (lookbehind_state) }) }) }
	, preview_back = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (L_ .set (lookbehind .nothing)) (lookbehind_state) }) }) }
	, toggle_background_music = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (not) (ambient_background_music_on_state) }) }) } )=>_)

var get_ready_view = _ => so ((_=_=>
	<get-ready-etc>
		<room>遊戲室編號：{ mark (app_room_state) }</room>
		<students-etc>
			<label>人數：{ R .length (_students) }</label>
			<students> { L .collect (L .chain (({ icon: _icon, name: _name }) => K (
				<student x-icon={
					!! L .isDefined (avatar_as_lion) (_icon) ? 'lion' : L .isDefined (avatar_as_bunny) (_icon) ? 'bunny' : panic ('...') }
				>{ _name }</student> )
				) (
				[ L .elems, student_as_student ])) (_students) } </students> </students-etc>
		{ L .get ([ L .elems, chain_el (K (
		<button x-custom x-for="play" fn={ feedback_play }><img src={ img .play } /></button> )) ]
		) (
		_students ) }
		<setting x-for="background-music" x-be={ !! _background_music_on ? 'off' : 'on' } fn={ toggle_background_music } ><img src={ !! _background_music_on ? img .music_on : img .music_off } /></setting> </get-ready-etc>,
	where
	, _students = mark (app_students_state) || []
	, _background_music_on = mark (ambient_background_music_on_state)
	, feedback_play = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (L_ .set (feedback .play)) (feedback_state) }) }) } 
	, toggle_background_music = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (not) (ambient_background_music_on_state) }) }) } )=>_)

var bingoes_view = so ((_=_=> _bingoes =>
	<bingo> { T (_bingoes) (R .map (_pattern => 
		<line x-shape={ pattern_shape (_pattern) } style={ line_pos (_pattern) } /> )) } </bingo>,
	where
	, line_pos = _pattern => so ((_=_=> (
		{ left: left, top: top } ),
		where
		, _size = R .length (_pattern)
		, _shape = pattern_shape (_pattern)
		, _x = L .get ([ L .elems, ([ y, x ]) => x ]) (_pattern)
		, _y = L .get ([ L .elems, ([ y, x ]) => y ]) (_pattern)
		, top = !! equals (_shape) ('horizontal') ? ((_y - 0.5) / _size) * 100 + '%'
			: equals (_shape) ('vertical') ? '5%'
			: ''
		, left = !! equals (_shape) ('vertical') ? ((_x - 0.5) / _size) * 100 + '%'
			: equals (_shape) ('horizontal') ? '5%'
			: '' )=>_) 
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

var students_view = _ =>
	<students> { L .collect (L .chain (([ _student, [_board, _past] ]) => so ((_=_=> K (
		<student-etc>
			<label x-icon={ _icon_attr }>{ _name }</label>
			<board> { T (_board) (R .map (_row => 
				<row> { T (_row) (R .map (_cell => so ((_=_=>
					!! _cell_solved ? <cell x-solved />
					: <cell />,
					where
					, _cell_position = T (_cell) (L .get (cell_as_position))
					, _cell_solved = R .includes (_cell_position) (_solved_positions) )=>_))) } </row> )) }
				<bingo> { bingoes_view (_bingoes) } </bingo> </board> </student-etc> ),
		where
		, _name = T (_student) (L .get (student_as_name))
		, _icon = T (_student) (L .get (student_as_icon))
		, _icon_attr = 
			!! L .isDefined (avatar_as_lion) (_icon)
			? 'lion'
			: L .isDefined (avatar_as_bunny) (_icon)
			? 'bunny'
			: panic ('...')
		, _solved_positions = solved_positions (_board) (_past)
		, _bingoes = bingoes (_board) (_past) )=>_)
		) (
		L .elems
		) ) (
		mark (app_students_map_boards_v_pasts_state) ) } </students>

var playing_view = _ => so ((_=_=>
	!! L_ .isDefined (mark (lookbehind_nothing_state))
	? <playing-etc>
		<title-etc>
			<a-title><img src={ img .logo }/></a-title>
			<problem-number>第{ _problem_number }題</problem-number> </title-etc>
		<problem-etc>
			<ticker-etc>
				{ L .get (chain_el (_t =>
				_time_limit - _t )) (clock ()) }
				<ticker z-identity={ _problem_number } style={{ animationDuration: _time_limit + 's' }}><spinner/></ticker> </ticker-etc>
			<question>
				{ L .get ([ question_as_text, chain_el (_question_text =>
				_question_text ) ]) (_question) }
				{ L .get ([ question_as_image, chain_el (_question_image =>
				<img src={ _question_image } /> ) ]) (_question) } </question> </problem-etc>
		<options>
			<button x-custom x-for="view-students" fn={ view_students }><img src={ img .view_students } /></button>
			<button x-custom x-for="end-game" fn={ consider_end }><img src={ img .end_game } /></button> </options>
		<setting x-for="background-music" x-be={ !! _background_music_on ? 'off' : 'on' } fn={ toggle_background_music } ><img src={ !! _background_music_on ? img .music_on : img .music_off } /></setting> </playing-etc>
	: L_ .isDefined (mark (lookbehind_view_students_state))
	? <playing-etc>
		<title-etc>
			<a-title><img src={ img .logo }/></a-title>
			<problem-number>第{ _problem_number }題</problem-number> </title-etc>
		{ students_view  }
		<options>
			<button x-custom x-for="show-problem" fn={ show_problem }><img src={ img .show_problem } /></button>
			<button x-custom x-for="end-game" fn={ consider_end }><img src={ img .end_game } /></button> </options>
		<setting x-for="background-music" x-be={ !! _background_music_on ? 'off' : 'on' } fn={ toggle_background_music } >
			<img src={ !! _background_music_on ? img .music_on : img .music_off } /> </setting> </playing-etc>
	: L_ .isDefined (mark (lookbehind_consider_end_state))
	? <playing-etc>
		<abort-etc>
			<div class="box">
				<label>結束遊戲？</label>
				<options>
					<button x-custom x-for="confirm" fn={ confirm_end }><img src={ img .confirm } /></button>
					<button x-custom x-for="show-problem" fn={ show_problem }><img src={ img .cancel } /></button></options></div></abort-etc></playing-etc>
	// MAJOR HACK
	: (please (L_ .set (lookbehind .nothing)) (lookbehind_state), []),
	where
	, _problem_number = mark (app_progress_step_state) + 1
	, _question = L .get (problem_as_question) (mark (app_current_problem_state))
	, _time_limit = mark (app_settings_rules_time_limit_state)
	, _background_music_on = mark (ambient_background_music_on_state)
	, show_problem = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (L_ .set (lookbehind .nothing)) (lookbehind_state) })})}
	, view_students = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (L_ .set (lookbehind .view_students)) (lookbehind_state) })})}
	, consider_end = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (L_ .set (lookbehind .consider_end)) (lookbehind_state) })})}
	, confirm_end = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (L_ .set (feedback .end)) (feedback_state) })})}  
	, toggle_background_music = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (not) (ambient_background_music_on_state) }) }) } )=>_)
		

var show_unit = _x => !! equals (_x) (NaN) ? _x .toFixed (2) * 1 : '-' 
var show_time = _x => !! equals (_x) (NaN) ? _x .toFixed (2) * 1 + '秒' : '-' 

var students_analysis_view = so ((_=_=>
	_ordering =>
		<students-analysis-etc>
			<labels>
				<name>名稱 <img src={ img .toggle_ordering } /></name>
				<number-of-solved>答對題數 <img src={ img .toggle_ordering } /></number-of-solved>
				<number-of-bingoes>BINGO <img src={ img .toggle_ordering } /></number-of-bingoes>
				<average-solved-time>平均答對時間 <img src={ img .toggle_ordering } /></average-solved-time> </labels>
			<students-analysis> { L .collect (L .chain (({ _name, _number_of_solved, _number_of_bingoes, _average_solved_time }) => K (
				<student>
					<name>{ _name }</name>
					<number-of-solved>{ _number_of_solved }</number-of-solved>
					<number-of-bingoes>{ _number_of_bingoes }</number-of-bingoes>
					<average-solved-time>{ show_time (_average_solved_time) }</average-solved-time> </student> )
				) (
				[ order_sort (_ordering), L .elems ]
				) ) (
				analyse_students (mark (app_students_map_boards_v_pasts_state))) } </students-analysis> </students-analysis-etc>,
	where
	, analyse_students = by (_students_map_boards_v_pasts =>
		L .collect ([ L .elems, ([ _student, [_board, _past] ]) => (
			{ _name: T (_student) (L .get (student_as_name))
			, _number_of_solved: T (_past) (L .count ([ past_as_points, as_solved_on (_board), L .elems ]))
			, _number_of_bingoes: T (bingoes (_board) (_past)) (L .count ([ L .elems ]))
			, _average_solved_time: T (_past) (L .mean ([ past_as_points, L .elems, as_solved_on (_board), point_as_attempts, L .last, attempt_as_latency ])) }) ]) ) )=>_)

var problems_analysis_view = so ((_=_=>
	_ordering => so ((_=_=>
		<problems-analysis-etc>
			<labels>
				<question>題目 <img src={ img .toggle_ordering } /></question>
				<number-of-solvers>答對人數 <img src={ img .toggle_ordering } /></number-of-solvers>
				<average-number-of-attempts>平均作答次數 <img src={ img .toggle_ordering } /></average-number-of-attempts>
				<average-solved-time>平均答對時間 <img src={ img .toggle_ordering } /></average-solved-time> </labels>
			<problems-analysis> { L .collect (L .chain (({ _question, _number_of_solvers, _average_number_of_attempts, _average_solved_time }) => K (
				<problem>
					<question><img src={ _question }/></question>
					<number-of-solvers>{ _number_of_solvers }</number-of-solvers>
					<average-number-of-attempts>{ show_unit (_average_number_of_attempts) }</average-number-of-attempts>
					<average-solved-time>{ show_time (_average_solved_time) }</average-solved-time> </problem> )
				) (
				[ order_sort (_ordering), L .elems ]
				) ) (
				analyse_problems (mark (app_students_map_boards_v_pasts_state)) (_problems) ) } </problems-analysis> </problems-analysis-etc>,
		where
		, _problems = T (mark (app_students_map_boards_v_pasts_state)
			) (
			[ L .collect ([ L .elems, ([ _, [__, _past] ]) => _past, L .collect ([ past_as_points, L .elems, point_as_problem ]) ])
			, L .maximumBy (L .count (L .elems)) (L .elems) ]) )=>_),
	where
	, analyse_problems = _students_map_boards_v_pasts => by (_problems =>
		L .collect ([ L .elems, (_problem, _index) => so ((_=_=> (
			{ _question: T (_problem) (L .get ([ problem_as_question, question_as_image ]))
			, _number_of_solvers:
				T (_students_map_boards_v_pasts
				) (
				L .count (
				[ L .elems, L .choose (([ _, [_board, _past] ]) => [ as_corresponding_point (_past), as_solved_on (_board) ] ) ]))
			, _average_number_of_attempts:
				T (_students_map_boards_v_pasts
				) (
				L .mean (
				[ L .elems, L .choose (([ _, [__, _past] ]) => as_corresponding_point (_past) )
				, point_as_attempts, L .count (L .elems) ]))
			, _average_solved_time:
				T (_students_map_boards_v_pasts
				) (
				L .mean (
				[ L .elems, L .choose (([ _, [_board, _past] ]) => [ as_corresponding_point (_past), as_solved_on (_board) ])
				, point_as_attempts, L .last, attempt_as_latency ])) } ),
			where
			, as_corresponding_point = _past => [ K (_past), past_as_points, _index ] )=>_) ])) )=>_)
													 
var game_over_view = _ => so ((_=_=>
	<game-over-etc>
		<title-etc>
			<a-title><img src={ img .logo }/></a-title> </title-etc>
		<options x-for="tabs">
			<button x-custom x-for="show-results" fn={ show_results } ><img src={ !! L_ .isDefined (mark (lookbehind_show_results_state)) ? img .show_results_on : img .show_results_off } /></button>
			<button x-custom x-for="students-analysis" fn={ students_analysis } ><img src={ !! L_ .isDefined (mark (lookbehind_students_analysis_state)) ? img .students_analysis_on : img .students_analysis_off } /></button>
			<button x-custom x-for="problems-analysis" fn={ problems_analysis } ><img src={ !! L_ .isDefined (mark (lookbehind_problems_analysis_state)) ? img .problems_analysis_on : img .problems_analysis_off } /></button> </options>
			{ !! L_ .isDefined (mark (lookbehind_show_results_state))
			? students_view 
			: L_ .isDefined (mark (lookbehind_students_analysis_state))
			? students_analysis_view (mark (lookbehind_ordering_state))
			: L_ .isDefined (mark (lookbehind_problems_analysis_state))
			? problems_analysis_view (mark (lookbehind_ordering_state))
			// MAJOR HACK
			: (please (L_ .set (lookbehind .show_results)) (lookbehind_state), []) }
		<options x-for="options">
			<button x-custom x-for="play-again" fn={ play_again } ><img src={ img .play_again } /></button> </options>
		<setting x-for="background-music" x-be={ !! _background_music_on ? 'off' : 'on' } fn={ toggle_background_music } >
			<img src={ !! _background_music_on ? img .music_on : img .music_off } /> </setting> </game-over-etc>,
	where
	, _background_music_on = mark (ambient_background_music_on_state)
	, show_results = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (L_ .set (lookbehind .show_results)) (lookbehind_state) })})}															
	, problems_analysis = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (L_ .set (lookbehind .problems_analysis ([]))) (lookbehind_state) })})}															
	, students_analysis = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (L_ .set (lookbehind .students_analysis ([]))) (lookbehind_state) })})}															
	, play_again = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (L_ .set (feedback .reset)) (feedback_state) })})}  
	, toggle_background_music = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (not) (ambient_background_music_on_state) }) }) } )=>_) 


S .root (die => {
	;window .die = { ... (window .die || {}), view: die }
	;window .view = <teacher-app>
		{ !! L_ .isDefined (mark (app_setup_state))
		? setup_view
		: L_ .isDefined (mark (app_get_ready_state))
		? get_ready_view
		: L_ .isDefined (mark (app_playing_state))
		? playing_view
		: L_ .isDefined (mark (app_game_over_state))
		? game_over_view
		: panic ('undefined app state in view')  } </teacher-app> })
												 
												 
												 
												 
												 
// transitions												 
												 
var get_room = impure (_room => 
	suppose (
	( _settings = show (app_settings_state)
	) =>
	go
	.then (_ => {
		;please (L_ .set (io .connecting)) (io_state) })
	.then (_ =>
		api (_room)
		.then (panic_on ([ [ L .get ([ L .is ({}), L .complement ]), _room + ' taken'] ])) )
	// RACE CONDITION
	.then (_ => so ((_=_=>
		api (_room, post (_create_message))
		.then (panic_on ([
			[ L .get ([ 'ok', L .complement ]), 'cannot post to ' + _room ] ])),
		where
		, _problems = T (_settings) (L .get (settings_as_problems))
		, _rules = T (_settings) (L .get (settings_as_rules ))
		, _create_message = message_encoding (message .teacher_settings (settings .settings (_problems, _rules))) )=>_) )
	.then (_ => {
		;please (L_ .set (teacher_app .get_ready (_room, _settings, []))) (app_state) })
	.catch (_e => {
		;console .error (_e) })
	.then (_ => {
		;please (L_ .set (io .inert)) (io_state) }) ))

var start_playing = impure (_ =>
	suppose (
	( _room = show (app_room_state)
	) =>
	go
	.then (_ => {
		;please (L_ .set (io .messaging)) (io_state) })
	.then (_ => so ((_=_=>
		api (_room,
			post (playing_message))
		.then (panic_on ([
			[ L .get ([ 'ok', L .complement ]), 'cannot post to ' + _room ] ]) ),
		where
		, playing_message = message_encoding (message .teacher_progress ([ 0, schedule_start (show (ensemble_state)) ])) )=>_) )
	.catch (_e => {
		;console .error (_e) })
	.then (_ => {
		;please (L_ .set (io .inert)) (io_state) }) ) )

var broadcast_progress = impure (_progress =>
	go
	.then (_ => {
		;please (L_ .set (io .messaging)) (io_state) })
	.then (_ => so ((_=_=>
		api (_room, post (progress_message))
		.then (panic_on ([
			[ L .get ([ 'ok', L .is (false) ]), 'cannot post to ' + _room ] ]) ),
		where
		, _room = show (app_room_state)
		, progress_message = message_encoding (message .teacher_progress (_progress)) )=>_) )
	.catch (_e => {
		;console .error (_e) })
	.then (_ => {
		;please (L_ .set (io .inert)) (io_state) }) )

var end_game = _ => {
	;please (teacher_app_playing_to_game_over) (app_state) }

var broadcast_game_over = impure (_ =>
	go
	.then (_ => {
		;please (L_ .set (io .messaging)) (io_state) })
	.then (_ => so ((_=_=>
		api (_room, post (progress_message))
		.then (panic_on ([
			[ L .get ([ 'ok', L .is (false) ]), 'cannot post to ' + _room ] ]) ),
		where
		, _room = show (app_room_state)
		, progress_message = message_encoding (message .teacher_progress ([ -1, + (new Date) ])) )=>_) )
	.catch (_e => {
		;console .error (_e) })
	.then (_ => {
		;please (L_ .set (io .inert)) (io_state) }) )

var reset_game = _ => {
	;please (L_ .set (teacher_app .setup (default_settings))) (app_state) }

				
				
				
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

S .root (die => {
	;window .die = { ... (window .die || {}), rules: die }

	// handle user
								 
	;S (_ => 
		T (mark (feedback_state)
		) (
		pinpoint (
		l_sum (
		[ [ feedback_as_rules_piece, L .when (I)
			, _piece => {
				var piece_details = T (_piece) ([ L .get (L .values), L .remove ([L .values, L .when (equals (undefined))]) ])
				;please (L .modify (L .values) (R .mergeLeft (piece_details))) (app_settings_rules_state) } ]
		, [ feedback_as_start, L .when (I)
			, impure (_ =>
				suppose (
				( _room = Math .floor (10000 * Math .random ())
				) =>
				get_room (_room) ) ) ]
		, [ feedback_as_play, L .when (I)
			, impure (start_playing) ]
		, [ feedback_as_end, L .when (I)
			, impure (end_game) ]
		, [ feedback_as_reset, L .when (I)
			, impure (reset_game) ] ] ))) )

	;S (_ => {
		if (mark (ambient_background_music_on_state)) {
			;audio .background .play () }
		else {
			;audio .background .pause () } })





	// game rules

	;S (_ => {
		var _app_progress = show (app_progress_state)
		var _progress = mark (ensemble_progress_state)
		// is there a more elegant way? this is not markovian 
		if (L_ .isDefined (mark (app_get_ready_state))) {
			if (not (equals (_app_progress) (_progress))) {
				;please (teacher_app_get_ready_to_playing) (app_state)
				;please (L_ .set (_progress)) (app_progress_state) } } })

	;S (_ => {
		if (L_ .isDefined (app_setup_state)) {
			;please (L_ .set (lookbehind .nothing)) (lookbehind_state)
			;please (L_ .remove) (ensemble_state) } })

	;S (_ => {
		if (L_ .isDefined (mark (app_get_ready_state))
		|| L_ .isDefined (mark (app_playing_state))
		|| L_ .isDefined (mark (app_game_over_state))) {
			var _ensemble_students = T (mark (ensemble_pings_state)) (L .collect ([ L .values, map_v_as_key ]))
			;please (L_ .set (_ensemble_students)) (app_students_state) } })

	;S (last_progress => {
		var _progress = mark (app_progress_state)
		if (L_ .isDefined (mark (app_playing_state))) {
			if (! equals (_progress) (last_progress)) {
				;broadcast_progress (_progress) } }
		return _progress })

	;S (_ => {
		if (L_ .isDefined (mark (app_playing_state))
		|| L_ .isDefined (mark (app_game_over_state))) {
			var _ensemble_boards = T (mark (ensemble_boards_state)) (L .collect (L .values))
			var _ensemble_pasts = T (mark (ensemble_pasts_state)) (L .collect (L .values))
			;please (L_ .set (_ensemble_boards)) (app_boards_state)
			;please (L_ .set (_ensemble_pasts)) (app_pasts_state) } })

	;S (last_bingoes => {
		if (L_ .isDefined (mark (app_students_map_boards_v_pasts_state))) {
			var _bingoes =
				T (mark (app_students_map_boards_v_pasts_state)
				) (
				L .collect ([ L .elems, map_v_as_value, ([_board, _past]) => bingoes (_board) (_past), L .elems ]))
			// replace with calculating whether difference exists?
			if (L .count (L .elems) (bingoes) > L .count (L .elems) (last_bingoes)) {
				;audio .bingo .play () }
			return _bingoes } })

	;S (last_tick => {
		var time_limit = mark (app_settings_rules_time_limit_state)
		if (L_ .isDefined (mark (app_playing_state)) && clock () >= time_limit) {
			;please (teacher_app_playing_to_next) (app_state) } })

	;S (last_app_has_bingoes_ok => {
		if (L_ .isDefined (mark (app_students_map_boards_v_pasts_state))) {
			var app_has_bingoes_ok = 
				T (mark (app_students_map_boards_v_pasts_state)
				) (
				L .isDefined ([ L .elems, map_v_as_value, ([_board, _past]) => bingoes (_board) (_past), L .elems ]))

			var game_tick = clock ()
			var _win_rule = mark (app_settings_rules_win_rule_state)
			if (equals (win_rule .first_bingo) (_win_rule)) {
				if (L_ .isDefined (mark (app_playing_state))) {
					if (! last_app_has_bingoes_ok && app_has_bingoes_ok) {
						;setTimeout (_=>{
							if (L_ .isDefined (show (app_playing_state))) {
								;end_game ()}}, 8000) } } }
	/* 
			else if (equals (win_rule .limit_time) (_win_rule)) {
				if (L_ .isDefined (mark (app_playing_state))) {
	Math .floor ((S .sample (time) - T (show (app_progress_state)) (L .get (progress_as_timestamp))) / 1000)				 
					if (! last_app_has_bingoes_ok && app_has_bingoes_ok) {
						;setTimeout (_=>{;end_game ()}, 8000) } } }
	*/
			else if (equals (win_rule .all_problems) (_win_rule)) { }

			return app_has_bingoes_ok } })
	
	;S (_ => {
		if (L_ .isDefined (mark (app_playing_state))) {
			var _size = show (app_settings_rules_size_state)
			if (mark (app_progress_state) >= (_size * _size)) {
				;end_game () } } })

	;S (last_app_game_over_state => {
		if (L_ .isDefined (mark (app_game_over_state))) {
			if (! L_ .isDefined (last_app_game_over_state)) {
				;broadcast_game_over () } }
		return mark (app_game_over_state) })

	;S (last_app_game_over_state => {
		if (! L_ .isDefined (last_app_game_over_state)) {
			if (L_ .isDefined (mark (app_game_over_state))) {
				;please (L_ .set (lookbehind .show_results)) (lookbehind_state) } }
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
		T (mark (app_room_state)
		) (
		pinpoint (
		[ L .when (I)
		, _room =>
			suppose (
			( phase = heartbeat ()
			, critical = phase === 1
			) =>
			( !! critical
			? go
				.then (_ => {
					;please (L_ .set (io .messaging)) (io_state) })
				.then (_ => so ((_=_=>
					api (_room, post (ping_message)),
					where
					, ping_message = message_encoding (message .teacher_ping (S .sample (connection))) )=>_))
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
				;please (L_ .set (io .inert)) (io_state) }) ) ])) ) })
