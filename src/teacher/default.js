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
win_rule_as_time_limit,
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
	start: (uniq =~ uniq) => feedback,
	setup_rules: (rules_piece =~ piece (settings), uniq =~ uniq) => feedback,
	play: (uniq =~ uniq) => feedback,
	end: (uniq =~ uniq) => feedback,
	reset: (uniq =~ uniq) => feedback })

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




// states and beliefs

var state = faith (
	{ app: teacher_app .setup (default_settings)
	, lookbehind: lookbehind .nothing
	, ambient: ambient .ambient (true)
	, io: io .off
	, ensemble: ensemble .nothing
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

var app_progression_state = belief (app_as_progression) (app_state)

var app_progression_start_state = belief (as (progression) .start) (app_progression_state)
var app_progression_progress_state = belief (as (progression) .progress) (app_progression_state)
var app_progression_progress_timestamp_state = belief (progress_as_timestamp) (app_progression_progress_state)
var app_progression_progress_step_state = belief (progress_as_step) (app_progression_progress_state)

var app_settings_state = belief (app_as_settings) (app_state)

var app_settings_problems_state = belief (as (settings) .problems) (app_settings_state)
var app_settings_rules_state = belief (as (settings) .rules) (app_settings_state) 

var app_settings_rules_time_limit_state = belief (as (rules) .time_limit) (app_settings_rules_state) 
var app_settings_rules_size_state = belief (as (rules) .size) (app_settings_rules_state) 
var app_settings_rules_win_rule_state = belief (as (rules) .win_rule) (app_settings_rules_state) 
var app_settings_rules_win_rule_time_limit_state = belief (as_in (win_rule .time_limit)) (app_settings_rules_win_rule_state) 

var app_students_state = belief (app_as_students) (app_state)
var app_room_state = belief (app_as_room) (app_state)
var app_boards_state = belief (app_as_boards) (app_state)
var app_pasts_state = belief (app_as_pasts) (app_state)

var app_current_problem_state = belief (current_problem) (app_state)
var app_students_map_boards_v_pasts_state = belief (_app => map_zip (a => b => [a, b]) (L .get (app_as_boards) (_app) || []) (L .get (app_as_pasts) (_app) || [])) (app_state)

var app_bingoes_state = belief (by (app_students_map_boards_v_pasts => L .collect ([ L .elems, map_v_as_value, ([_board, _past]) => bingoes (_board) (_past), L .elems ]))) (app_students_map_boards_v_pasts_state)
var app_has_bingoes_yes_state = belief (by (app_students_map_boards_v_pasts => L .isDefined ([ L .elems, map_v_as_value, ([_board, _past]) => bingoes (_board) (_past), L .elems ]))) (app_students_map_boards_v_pasts_state)

var lookbehind_in_nothing_state = belief (as_in (lookbehind .nothing)) (lookbehind_state)
var lookbehind_in_preview_questions_state = belief (as_in (lookbehind .preview_questions)) (lookbehind_state)
var lookbehind_in_view_students_state = belief (as_in (lookbehind .view_students)) (lookbehind_state)
var lookbehind_in_consider_end_state = belief (as_in (lookbehind .consider_end)) (lookbehind_state)
var lookbehind_in_show_results_state = belief (as_in (lookbehind .show_results)) (lookbehind_state)
var lookbehind_in_students_analysis_state = belief (as_in (lookbehind .students_analysis)) (lookbehind_state)
var lookbehind_in_problems_analysis_state = belief (as_in (lookbehind .problems_analysis)) (lookbehind_state)

var lookbehind_ordering_state = belief (as (lookbehind) .ordering) (lookbehind_state)

var ambient_background_music_on_state = belief (as (ambient) .background_music_on) (ambient_state)

var io_in_on_state = belief (as_in (io .on)) (io_state)

var ensemble_progression_state = belief (as (ensemble) .progression) (ensemble_state)
var ensemble_pings_state = belief (as (ensemble) .pings) (ensemble_state)
var ensemble_boards_state = belief (as (ensemble) .boards) (ensemble_state)
var ensemble_pasts_state = belief (as (ensemble) .pasts) (ensemble_state)

var feedback_in_start_state = belief (as_in (feedback .start)) (feedback_state) 
var feedback_in_setup_rules_state = belief (as_in (feedback .setup_rules)) (feedback_state) 
var feedback_in_play_state = belief (as_in (feedback .play)) (feedback_state) 
var feedback_in_end_state = belief (as_in (feedback .end)) (feedback_state) 
var feedback_in_reset_state = belief (as_in (feedback .reset)) (feedback_state) 

var feedback_rules_piece_state = belief (as (feedback) .rules_piece) (feedback_state)




// views

var asset_view = _asset => <asset><img src={_asset} /></asset>
var text_asset_view = _asset => <img src={_asset} text-asset />

var counter_setting_view = label => feedback_rule => iso_v_img_list => _setting => so ((_=_=>
	[ <label>{ label }</label>
	, <control>
		<prev fn={on_ ([ clicking, feedback_prev ])}><img src={img .prev} /></prev>
		<counter><img src={_img} /></counter>
		<next fn={on_ ([ clicking, feedback_next ])}><img src={img .next} /></next></control> ],
	where
	, match_setting = ([ _iso, _ ]) => L .and (_iso) (_setting)
	, _iso_v_img = T (iso_v_img_list) (L .get (L .find (match_setting)))
	, _index = T (iso_v_img_list) (L .getAs ((_, i) => i) (L .find (match_setting)))
	, [ _iso, _img ] = _iso_v_img
	, list_length = R .length (iso_v_img_list)
	, index_q_list = i => ((i % list_length) + list_length) % list_length
	, [ prev_iso, ] = T (iso_v_img_list) (L .get (index_q_list (_index - 1)))
	, [ next_iso, ] = T (iso_v_img_list) (L .get (index_q_list (_index + 1)))
	, feedback_prev = _ => {;feedback_rule (T (_setting) (L .get ([ _iso, L .inverse (prev_iso) ]))) }
	, feedback_next = _ => {;feedback_rule (T (_setting) (L .get ([ _iso, L .inverse (next_iso) ]))) } )=>_)

var win_rule_counter_view = counter_setting_view
	( (
	asset_view (img .text_game_mode) )
	) (
	_win_rule => {
		var rules_delta = T (_win_rule) (L .get (L.inverse (as_in (rules .rules) .win_rule)))
		;please (L_ .set (feedback .setup_rules (rules_delta, uniq ()))) (feedback_state) }
	) (
	[ [ as_in (win_rule .first_bingo), img .play_to_win ]
	, [ [ as_in (win_rule .limit_time), L .modify (as (win_rule) .time_limit) (pinpoint (L .valueOr (15))) ]
		, img .time_limit_play ]
	, [ as_in (win_rule .all_problems), img .free_play ] ]
	) (
	mark (app_settings_rules_win_rule_state) )

var time_limit_counter_view = counter_setting_view
	( (
	asset_view (img .text_time_limit) )
	) (
	_time_limit => {
		var rules_delta = T (_time_limit) (L .get (L.inverse (as_in (rules .rules) .time_limit)))
		;please (L_ .set (feedback .setup_rules (rules_delta, uniq ()))) (feedback_state) }
	) (
	[ [ L .is (10), img .ten_secs ]
	, [ L .is (20), img .twenty_secs ]
	, [ L .is (30), img .thirty_secs ] ]
	) (
	mark (app_settings_rules_time_limit_state) )

var on_off = points_ ([ [ true, 'on' ], [ false, 'off' ] ])
var background_music_img = points_ ([ [ true, img .music_on ], [ false, img .music_off ] ])

var setup_view = _ => so ((_=_=>
	L .getAs (el
	) (
	as_reduction (
	[ [ as_in (lookbehind .nothing)
		, <setup-etc>
			<div class="left-pane">
				<a-title><img src={img .logo}/></a-title>
				<sub-title>除法（一）</sub-title>
				<settings x-for="game-mode time-limit">
				<setting x-of="game-mode">{ win_rule_counter_view }</setting>
				<setting x-of="time-limit">{ time_limit_counter_view }</setting></settings>
				<button x-custom="true" x-for="preview" fn={on_ ([ clicking, setup_preview ])}><img src={img .go_preview} /></button>
				<button x-custom="true" x-for="start" fn={on_ ([ clicking, feedback_start ])}><img src={img .go_start} /></button>
				{ L .getAs (el) ([ L .when (I), K (
				<div style={{ 'text-align': 'center' }}>遊戲正在開始…</div> ) ]
				) (
				mark (io_in_on_state) ) } </div>
			<div class="right-pane">
				<settings x-for="board-size">
					<setting x-of="board-size" x-be="3x3"><img fn={on_ ([ clicking, feedback_size (3) ])} src={three_by_three_img (_size)} /></setting>
					<setting x-of="board-size" x-be="4x4"><img fn={on_ ([ clicking, feedback_size (4) ])} src={four_by_four_img (_size)} /></setting>
					<setting x-of="board-size" x-be="5x5"><img fn={on_ ([ clicking, feedback_size (5) ])} src={five_by_five_img (_size)} /></setting> </settings> </div>
			<setting x-for="background-music" x-be={on_off (_background_music_on)} fn={on_ ([ clicking, toggle_background_music ])} ><img src={background_music_img (_background_music_on)} /></setting> </setup-etc> ]
	, [ as_in (lookbehind .preview_questions)
		, <setup-etc>
			<title-etc><img src={img .logo}/></title-etc>
			<preview-questions-etc>
				<button x-custom="true" x-for="back" fn={on_ ([ clicking, preview_back ])}><img src={img .go_back} /></button>
				<preview-questions>
					<labels><question>{ text_asset_view (img .label_questions) }</question><answer>{ text_asset_view (img .label_answers) }</answer></labels>
					{ L .collect (L .chain ((_problem, i) => so ((_=_=> K (
					<problem><question><number>{ i + 1 }</number><img src={question_image}/></question><answer>{ answer }</answer></problem> ),
					where
					, question_image = T (_problem) (L .get ([ problem_as_question, as (question) .image ]))
					, answer = T (_problem) (L .get ([ problem_as_question, as (question) .solution ])) )=>_)
					) (
					L .limit (_size * _size) (L .elems)
					) ) (
					mark (app_settings_problems_state)) } </preview-questions> </preview-questions-etc> 
			<setting x-for="background-music" x-be={on_off (_background_music_on)} fn={on_ ([ clicking, toggle_background_music ])} >
				<img src={background_music_img (_background_music_on)} /></setting> </setup-etc> ] ]
	) (
	mark (lookbehind_state) )
	// MAJOR HACK
	// (please (L_ .set (lookbehind .nothing)) (lookbehind_state), []),
	where
	, _size = mark (app_settings_rules_size_state)
	, _background_music_on = mark (ambient_background_music_on_state)
	, three_by_three_img = pinpoint (as_reduction ([ [ L .subset (equals (3)), img .three_by_three_on ], [ L .identity, img .three_by_three_off ] ]))
	, four_by_four_img = pinpoint (as_reduction ([ [ L .subset (equals (4)), img .four_by_four_on ], [ L .identity, img .four_by_four_off ] ]))
	, five_by_five_img = pinpoint (as_reduction ([ [ L .subset (equals (5)), img .five_by_five_on ], [ L .identity, img .five_by_five_off ] ]))
	, feedback_start = _ => {;please (L_ .set (feedback .start (uniq ()))) (feedback_state)}
	, feedback_size = _size => _ => {
		var rules_delta = T (_size) (L .get (L.inverse (as_in (rules .rules) .size)))
		;please (L_ .set (feedback .setup_rules (rules_delta, uniq ()))) (feedback_state) }
	, setup_preview = _ => {;please (L_ .set (lookbehind .preview_questions)) (lookbehind_state)}
	, preview_back = _ => {;please (L_ .set (lookbehind .nothing)) (lookbehind_state)}
	, toggle_background_music = _ => {;please (not) (ambient_background_music_on_state)} )=>_)

var get_ready_view = _ => so ((_=_=>
	<get-ready-etc>
		<room>{ text_asset_view (img .text_room_number_is) }{ mark (app_room_state) }</room>
		<students-etc>
			<label>{ text_asset_view (img .text_number_of_students_is) }{ R .length (_students) }</label>
			<students>{ L .collect (L .chain (({ icon: _icon, name: _name }) => K (
				<student x-icon={
					!! L .isDefined (as_in (avatar .lion)) (_icon) ? 'lion' : L .isDefined (as_in (avatar .bunny)) (_icon) ? 'bunny' : panic ('...') }
				>{ _name }</student> )
				) (
				[ L .elems, as_in (student .student) ])) (_students) }</students> </students-etc>
		{ L .getAs (el) ([ L .elems, K (
		<button x-custom x-for="play" fn={on_ ([ clicking, feedback_play ])}><img src={img .go_start} /></button> ) ]
		) (
		_students ) }
		<setting x-for="background-music" x-be={on_off (_background_music_on)} fn={on_ ([ clicking, toggle_background_music ])} ><img src={background_music_img (_background_music_on)} /></setting> </get-ready-etc>,
	where
	, _students = mark (app_students_state) || []
	, _background_music_on = mark (ambient_background_music_on_state)
	, feedback_play = _ => {;please (L_ .set (feedback .play (uniq ()))) (feedback_state)} 
	, toggle_background_music = _ => {;please (not) (ambient_background_music_on_state)} )=>_)

var bingoes_view = so ((_=_=> _bingoes =>
	<bingo> { L .collect ([ L .elems, R .map (_pattern => 
		<line x-shape={ pattern_shape (_pattern) } style={line_pos (_pattern)} /> ) ]
		) (
		_bingoes )  } </bingo>,
	where
	, line_pos = _pattern => so ((_=_=> (
		{ left: left, top: top } ),
		where
		, _size = R .length (_pattern)
		, _shape = pattern_shape (_pattern)
		, [ _y, _x ] = L .get (L .first) (_pattern)
		, top = !! equals (_shape) ('horizontal') ? ((_y - 0.5) / _size) * 100 + '%'
			: equals (_shape) ('vertical') ? '5%'
			: ''
		, left = !! equals (_shape) ('vertical') ? ((_x - 0.5) / _size) * 100 + '%'
			: equals (_shape) ('horizontal') ? '5%'
			: '' )=>_) )=>_)

var students_view = _ =>
	<students>{ L .collect (L .chain (([ _student, [_board, _past] ]) => so ((_=_=> K (
		<student-etc>
			<label x-icon={_icon_attr} {... _x_solved}><name>{ _name }</name></label>
			<board {... _x_bingoed}> { L .collect ([ L .elems, _row => 
				<row>{ L .collect ([ L .elems, R .map (_cell => so ((_=_=>
					<cell {... _x_solved} />,
					where
					, _cell_position = T (_cell) (L .get (cell_as_position))
					, _cell_solved = R .includes (_cell_position) (_solved_positions)
					, _x_solved = attrs_ ({ 'x-solved': _cell_solved }) )=>_) ) ]
					) (
					_row ) }</row> ]
				) (
				_board )  }
				<bingo>{ bingoes_view (_bingoes) }</bingo> </board> </student-etc> ),
		where
		, _name = T (_student) (L .get (as (student) .name))
		, _icon = T (_student) (L .get (as (student) .icon))
		, _icon_attr = pinpoint (
			as_reduction (
			[ [ as_in (avatar .lion), 'lion' ]
			, [ as_in (avatar .bunny), 'bunny' ] ] )
			) (
			_icon )
		, _solved_positions = solved_positions (_board) (_past)
		, _current_position = L .get ([ as (past) .attempts, L .last, L .when (L .get ([ attempt_as_problem, L .is (mark (app_current_problem_state)) ])), attempt_as_position ]) (_past) 
		, _x_solved = attrs_ ({ 'x-solved': R .includes (_current_position) (_solved_positions) })
		, _bingoes = bingoes (_board) (_past)
		, _x_bingoed = attrs_ ({ 'x-bingoed': L .isDefined (L .elems) (_bingoes) }) )=>_)
		) (
		L .elems
		) ) (
		mark (app_students_map_boards_v_pasts_state) ) }</students>

var playing_view = _ => so ((_=_=>
	pinpoint (
	as_reduction (
	[ [ as_in (lookbehind .nothing)
		, <playing-etc>
			<title-etc>
				<a-title><img src={img .logo}/></a-title>
				<problem-number>{ text_asset_view (img .text_nth) }{ _problem_number }{ text_asset_view (img .text_problem) }</problem-number> </title-etc>
			<problem-etc>
				<ticker-etc>
					{ L .getAs (el) (_t =>
					_time_limit - _t ) (mark (step_clock)) }
					<ticker z-identity={_problem_number} style={{ animationDuration: _time_limit + 's' }}><spinner/></ticker> </ticker-etc>
				<question>
					{ L .getAs (el) ([ as (question) .text, _question_text =>
					_question_text ]) (_question) }
					{ L .getAs (el) ([ as (question) .image, _question_image =>
					<img src={_question_image} /> ]) (_question) } </question> </problem-etc>
			<options>
				<button x-custom x-for="view-students" fn={on_ ([ clicking, view_students ])}><img src={img .view_students} /></button>
				<button x-custom x-for="end-game" fn={consider_end}><img src={img .end_game} /></button> </options>
			<setting x-for="background-music" x-be={on_off (_background_music_on)} fn={on_ ([ clicking, toggle_background_music ])} ><img src={background_music_img (_background_music_on)} /></setting> </playing-etc> ]
	, [ as_in (lookbehind .view_students)
		, <playing-etc>
			<title-etc>
				<a-title><img src={img .logo}/></a-title>
				<problem-number>{ text_asset_view (img .text_nth) }{ _problem_number }{ text_asset_view (img .text_problem) }</problem-number> </title-etc>
			{ students_view }
			<options>
				<button x-custom x-for="show-problem" fn={on_ ([ clicking, show_problem ])}><img src={img .show_problem} /></button>
				<button x-custom x-for="end-game" fn={on_ ([ clicking, consider_end ])}><img src={img .end_game} /></button> </options>
			<setting x-for="background-music" x-be={on_off (_background_music_on)} fn={on_ ([ clicking, toggle_background_music ])} >
				<img src={background_music_img (_background_music_on)} /> </setting> </playing-etc> ]
	, [ as_in (lookbehind .consider_end)
		, <playing-etc>
			<abort-etc>
				<div class="box">
					<label>結束遊戲？</label>
					<options>
						<button x-custom x-for="confirm" fn={on_ ([ clicking, confirm_end ])}><img src={img .confirm} /></button>
						<button x-custom x-for="show-problem" fn={on_ ([ clicking, show_problem ])}><img src={img .cancel} /></button> </options> </div>
				</abort-etc> </playing-etc> ] ] )
	) (
	mark (lookbehind_state) )
	// MAJOR HACK
	// (please (L_ .set (lookbehind .nothing)) (lookbehind_state), []),
	where
	, _problem_number = mark (app_progression_progress_step_state) + 1
	, _question = L .get (problem_as_question) (mark (app_current_problem_state))
	, _time_limit = mark (app_settings_rules_time_limit_state)
	, _background_music_on = mark (ambient_background_music_on_state)
	, show_problem = _ => {;please (L_ .set (lookbehind .nothing)) (lookbehind_state)}
	, view_students = _ => {;please (L_ .set (lookbehind .view_students)) (lookbehind_state)}
	, consider_end = _ => {;please (L_ .set (lookbehind .consider_end)) (lookbehind_state)}
	, confirm_end = _ => {;please (L_ .set (feedback .end (uniq ()))) (feedback_state)}  
	, toggle_background_music = _ => {;please (not) (ambient_background_music_on_state)} )=>_)
		
var students_analysis_view = so ((_=_=>
	_ordering =>
		<students-analysis-etc>
			<labels>
				<name>{ asset_view (img .text_name) }<img src={img .toggle_ordering} /></name>
				<number-of-solved>{ asset_view (img .text_number_of_solved) }<img src={img .toggle_ordering} /></number-of-solved>
				<number-of-bingoes>{ asset_view (img .text_bingo) }<img src={img .toggle_ordering} /></number-of-bingoes>
				<average-solved-time>{ asset_view (img .text_average_solved_time) }<img src={img .toggle_ordering} /></average-solved-time> </labels>
			<students-analysis>{ L .collect (L .chain (({ _name, _number_of_solved, _number_of_bingoes, _average_solved_time }) => K (
				<student>
					<name>{ _name }</name>
					<number-of-solved>{ _number_of_solved }</number-of-solved>
					<number-of-bingoes>{ _number_of_bingoes }</number-of-bingoes>
					<average-solved-time>{ show_time (_average_solved_time) }</average-solved-time> </student> )
				) (
				[ order_sort (_ordering), L .elems ]
				) ) (
				analyse_students (mark (app_students_map_boards_v_pasts_state))) }</students-analysis> </students-analysis-etc>,
	where
	, analyse_students = by (_students_map_boards_v_pasts =>
		L .collect ([ L .elems, ([ _student, [_board, _past] ]) => (
			{ _name: T (_student) (L .get (as (student) .name))
			, _number_of_solved: L .count ([ as (past) .attempts, L .elems, as_solved_on (_board) ]) (_past) 
			, _number_of_bingoes: L .count ([ L .elems ]) (bingoes (_board) (_past))
			, _average_solved_time: L .mean ([ as (past) .attempts, L .elems, as_solved_on (_board), attempt_as_latency ]) (_past) }) ]) ) )=>_)

var problems_analysis_view = so ((_=_=>
	_ordering => so ((_=_=>
		<problems-analysis-etc>
			<labels>
				<question>{ asset_view (img .text_question) }<img src={img .toggle_ordering} /></question>
				<number-of-solvers>{ asset_view (img .text_number_of_solvers) }<img src={img .toggle_ordering} /></number-of-solvers>
				<average-number-of-attempts>{ asset_view (img .text_average_number_of_attempts) }<img src={img .toggle_ordering} /></average-number-of-attempts>
				<average-solved-time>{ asset_view (img .text_average_solved_time) }<img src={img .toggle_ordering} /></average-solved-time> </labels>
			<problems-analysis>{ L .collect (L .chain (({ _question, _number_of_solvers, _average_number_of_attempts, _average_solved_time }) => K (
				<problem>
					<question><img src={_question}/></question>
					<number-of-solvers>{ _number_of_solvers }</number-of-solvers>
					<average-number-of-attempts>{ show_unit (_average_number_of_attempts) }</average-number-of-attempts>
					<average-solved-time>{ show_time (_average_solved_time) }</average-solved-time> </problem> )
				) (
				[ order_sort (_ordering), L .elems ]
				) ) (
				analyse_problems (mark (app_students_map_boards_v_pasts_state)) (_problems) ) }</problems-analysis> </problems-analysis-etc>,
		where
		, _problems = T (mark (app_settings_problems_state)) )=>_),
	where
	, analyse_problems = _students_map_boards_v_pasts => by (_problems =>
		L .collect ([ L .elems, (_problem, _index) => so ((_=_=> (
			{ _question: pinpoint (
				[ problem_as_question, as (question) .image ]) (_problem) 
			, _number_of_solvers: L .count (
				[ L .elems, L .choose (([ _, [_board, _past] ]) => [ as_problem_attempts (_past), L .elems, as_solved_on (_board) ]) ]
				) (
				_students_map_boards_v_pasts )
			, _average_number_of_attempts: L .mean (
				[ L .elems, L .choose (([ _, [__, _past] ]) => as_problem_attempts (_past)), L .count (L .elems) ]
				) (
				_students_map_boards_v_pasts )
			, _average_solved_time: L .mean (
				[ L .elems, L .choose (([ _, [_board, _past] ]) => [ as_problem_attempts (_past), L .elems, as_solved_on (_board) ]), attempt_as_latency ]
				) (
				_students_map_boards_v_pasts ) } ),
			where
			, as_problem_attempts = _past => [ K (_past), as (past) .attempts, L .filter (L .get ([ attempt_as_problem, L .is (_problem) ])) ] )=>_) ])) )=>_)
													 
var game_over_view = _ => so ((_=_=>
	<game-over-etc>
		<title-etc>
			<a-title><img src={img .logo}/></a-title> </title-etc>
		<options x-for="tabs">
			<button x-custom x-for="show-results" fn={on_ ([ clicking, show_results ])} ><img src={!! L_ .isDefined (mark (lookbehind_in_show_results_state)) ? img .show_results_on : img .show_results_off} /></button>
			<button x-custom x-for="students-analysis" fn={on_ ([ clicking, students_analysis ])} ><img src={!! L_ .isDefined (mark (lookbehind_in_students_analysis_state)) ? img .students_analysis_on : img .students_analysis_off} /></button>
			<button x-custom x-for="problems-analysis" fn={on_ ([ clicking, problems_analysis ])} ><img src={!! L_ .isDefined (mark (lookbehind_in_problems_analysis_state)) ? img .problems_analysis_on : img .problems_analysis_off} /></button> </options>
		{ L .getAs (el) (
		as_reduction (
		[ [ as_in (lookbehind .show_results), students_view ]
		, [ as_in (lookbehind .students_analysis), students_analysis_view (mark (lookbehind_ordering_state)) ]
		, [ as_in (lookbehind .problems_analysis), problems_analysis_view (mark (lookbehind_ordering_state)) ] ] )
		) (
		mark (lookbehind_state) ) }
		// MAJOR HACK
		// (please (L_ .set (lookbehind .show_results)) (lookbehind_state), [])
		<options x-for="options">
			<button x-custom x-for="play-again" fn={on_ ([ clicking, play_again ])} ><img src={img .play_again} /></button> </options>
		<setting x-for="background-music" x-be={on_off (_background_music_on)} fn={on_ ([ clicking, toggle_background_music ])} >
			<img src={background_music_img (_background_music_on)} /> </setting> </game-over-etc>,
	where
	, _background_music_on = mark (ambient_background_music_on_state)
	, show_results = _ => {;please (L_ .set (lookbehind .show_results)) (lookbehind_state)}															
	, problems_analysis = _ => {;please (L_ .set (lookbehind .problems_analysis ([]))) (lookbehind_state)}															
	, students_analysis = _ => {;please (L_ .set (lookbehind .students_analysis ([]))) (lookbehind_state)}															
	, play_again = _ => {;please (L_ .set (feedback .reset (uniq ()))) (feedback_state)}  
	, toggle_background_music = _ => {;please (not) (ambient_background_music_on_state)} )=>_) 


var app_view = _ =>
	<teacher-app>
		{ L .getAs (el) (
		as_reduction (
		[ [ app_as_in_setup, setup_view ]
		, [ app_as_in_get_ready, get_ready_view ] 
		, [ app_as_in_playing, playing_view ]
		, [ app_as_in_game_over, game_over_view ] ]
		) (
		mark (app_state) ) } </teacher-app>

 



// transitions												 
												 
var get_room = impure (_room => 
	suppose (
	( _settings = show (app_settings_state)
	) =>
	with_io (_ =>
	go
	.then (_ =>
		api (_room)
		.then (panic_on ([ [ L .isDefined (L .leafs), _room + ' taken'] ])) )
	// RACE CONDITION
	.then (_ => so ((_=_=>
		api (_room, _create_message)
		.then (panic_on ([
			[ L .get ([ 'ok', L .complement ]), 'cannot post to ' + _room ] ])),
		where
		, _problems = T (_settings) (L .get (as (settings) .problems))
		, _rules = T (_settings) (L .get (as (settings) .rules ))
		, _create_message = message .teacher_settings (settings .settings (_problems, _rules)) )=>_) )
	.then (_ => {
		;please (L_ .set (teacher_app .get_ready (_room, _settings, []))) (app_state) }) ) ) )

var broadcast_progression = impure (_ =>
	with_io (_ =>
	go
	.then (_ => so ((_=_=>
		api (_room, progression_message)
		.then (panic_on ([
			[ L .get ([ 'ok', L .is (false) ]), 'cannot post to ' + _room ] ]) ),
		where
		, _room = show (app_room_state)
		, _progression = show (app_progression_state)
		, progression_message = message .teacher_progression (_progression) )=>_) ) ) )

var start_playing = _ => {
	;please (teacher_app_get_ready_to_playing) (app_state) }

var end_game = _ => {
	;please (teacher_app_playing_to_game_over) (app_state) }

var reset_game = _ => {
	;please (L_ .set (teacher_app .setup (default_settings))) (app_state) }

				
				
				
// resource rules				

var step_clock = ticker (app_progression_progress_timestamp_state) (1000)
var game_clock = ticker (app_progression_start_state) (1000)

var [ consent, next_consent ] = consensus ()

				
// rules

;window .view = <View>{ app_view }</View>

S .root (_ => {

	// handle user

	;S (_ => 
		T (mark (feedback_state)
		) (
		pin (
		l_sum (
		[ [ as (feedback) .rules_piece, L .when (I)
			, _piece => {
				var piece_details = T (_piece) ([ L .get (L .values), L .remove ([L .values, L .when (equals (undefined))]) ])
				;please (L .modify (L .values) (R .mergeLeft (piece_details))) (app_settings_rules_state) } ]
		, [ as_in (feedback .start), L .when (I)
			, impure (_ =>
				suppose (
				( _room = Math .floor (10000 * Math .random ())
				) =>
				get_room (_room) ) ) ]
		, [ as_in (feedback .play), L .when (I)
			, impure (start_playing) ]
		, [ as_in (feedback .end), L .when (I)
			, impure (end_game) ]
		, [ as_in (feedback .reset), L .when (I)
			, impure (reset_game) ] ] ))) )

	;S (_ => {
		if (mark (ambient_background_music_on_state)) {
			;play (audio .background) }
		else {
			;pause (audio .background) } })





	// game rules

	;S (_ => {
		if (L_ .isDefined (app_in_setup_state)) {
			;please (L_ .set (lookbehind .nothing)) (lookbehind_state)
			;please (L_ .remove) (ensemble_state) } })

	;S (_ => {
		if (equals ([ ... R .map (L_ .isDefined) (last_n (2) (app_in_setup_state)) ]) ([ false, true ]))
			;please (shuffle) (app_settings_problems_state) }

		var [ last_app_settings_rules_size, _app_settings_rules_size ] = last_n (2) (app_settings_rules_size_state)
		if (not (equals (last_app_settings_rules_size) (_app_settings_rules_size))) {
			;please (shuffle) (app_settings_problems_state) } })

	// set gently?
	;S (_ => {
		if (L_ .isDefined (mark (app_in_get_ready_state))
		|| L_ .isDefined (mark (app_in_playing_state))
		|| L_ .isDefined (mark (app_in_game_over_state))) {
			var _ensemble_students = T (mark (ensemble_pings_state)) (L .collect ([ L .elems, map_v_as_key ]))
			;please (L_ .set (_ensemble_students)) (app_students_state) } })

	;S (_ => {
		if (L_ .isDefined (mark (app_in_playing_state))
		|| L_ .isDefined (mark (app_in_game_over_state))) {
			var [ last_progression, _progression ] = last_n (2) (app_progression_state)
			if (! equals (_progression) (last_progression)) {
				;broadcast_progression (_progression) } } })

	;S (_ => {
		if (L_ .isDefined (mark (app_in_playing_state))
		|| L_ .isDefined (mark (app_in_game_over_state))) {
			var _ensemble_boards = T (mark (ensemble_boards_state)) (L .collect (L .elems))
			var _ensemble_pasts = T (mark (ensemble_pasts_state)) (L .collect (L .elems))
			;please (L_ .set (_ensemble_boards)) (app_boards_state)
			;please (L_ .set (_ensemble_pasts)) (app_pasts_state) } })

	;S (_ => {
		if (L_ .isDefined (mark (app_students_map_boards_v_pasts_state))) {
			var [ last_bingoes, _ ] = last_n (2) (app_bingoes_state)
			if (L .isDefined ([ L .elems, L .unless (R .flip (R .includes) (last_bingoes || [])) ]) (mark (app_bingoes_state))) {
				;play (audio .teacher_bingo) } } })

	;S (_ => {
		var time_limit = mark (app_settings_rules_time_limit_state)
		if (L_ .isDefined (mark (app_in_playing_state))
		&& mark (step_clock) >= time_limit) {
			;please (teacher_app_playing_to_next) (app_state) } })

	;S (_ => {
		if (L_ .isDefined (mark (app_in_playing_state))) {
			var _win_rule = mark (app_settings_rules_win_rule_state)
			if (equals (win_rule .first_bingo) (_win_rule)) {
				if (equals (last_n (2) (app_has_bingoes_yes_state)) ([ false, true ])) {
					;end_game () } } 
			else if (equals (win_rule .limit_time) (_win_rule)) {
				var game_tick = mark (game_clock)
				var _time_limit = mark (app_settings_rules_win_rule_time_limit_state)
				if (game_tick >= _time_limit) {
					;end_game () } } 
			else if (equals (win_rule .all_problems) (_win_rule)) {
				var _progress_step = mark (app_progression_progress_step_state)
				var _size = mark (app_settings_rules_size_state)
				var _problems_count = _size * _size
				if (_progress_step >= _problems_count) {
					;end_game () } } } })

	;S (_ => {
		if (equals ([ ... R .map (L_ .isDefined) (last_n (2) (app_in_game_over_state)) ]) ([ false, true ]))
			;broadcast_game_over () } })

	;S (_ => {
		if (equals ([ ... R .map (L_ .isDefined) (last_n (2) (app_in_game_over_state)) ]) ([ false, true ])) {
			;please (L_ .set (lookbehind .show_results)) (lookbehind_state) } })



	// communication

	;S (_ => 
		impure (
		T (mark (app_room_state)
		) (
		pin (
		[ L .when (I)
		, _room =>
			suppose (
			( _consent = consent ()
			) =>
			with_io (_ =>
			go
			.then (_ =>
				!! equals (_consent) ('write') ? so ((_=_=>
				api (_room, ping_message),

				where
				, ping_message = message .teacher_ping (room_status (_room)) )=>_)

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
				;setTimeout (next_consent, 300) }) ) ]) ) ) ) })
