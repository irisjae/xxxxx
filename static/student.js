var { T, $, apply, L, L_, R, S, Z, Z_, Z$, sanc, memoize, 
faith, belief, show, mark, please, 
Y, impure, suppose,
so, by, 
go, never, panic, panic_on,
just_now, temporal,
fiat, data, data_lens, data_iso, data_kind,
focused_iso_,
last_n, n_reducer, l_sum, l_point_sum, pinpoint,
map_defined_, map_defined, from_just, 
as_sole, sole, shuffle,
I, K, not, equals,
uniq, bool, number, timestamp, string,
list, map, maybe, nat, id, v, piece, order,
order_sort, direction_opposite, toggle_order, 
shuffle, uuid, map_zip, chain_el, api, 
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
as_solved_on, attempted_positions, solved_positions, bingoed_positions, bingoes,
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


var feedback_as_setup_room = data_iso (feedback .setup_room)
var feedback_as_setting_up_student = data_iso (feedback .setting_up_student)
var feedback_as_setup_student = data_iso (feedback .setup_student)
var feedback_as_attempt_problem = data_iso (feedback .attempt_problem)
var feedback_as_reset_game = data_iso (feedback .reset_game)

var feedback_as_name = data_iso (feedback .setting_up_student) .name
var feedback_as_icon = data_iso (feedback .setting_up_student) .icon

var lookbehind_as_nothing = data_iso (lookbehind .nothing)
var lookbehind_as_bad_room = data_iso (lookbehind .bad_room)
var lookbehind_as_attempting = data_iso (lookbehind .attempting)
var lookbehind_as_show_results = data_iso (lookbehind .show_results)
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
	{ app: student_app .setup (undefined, undefined, undefined)
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
var app_current_problem_completed_state = belief (_app => current_problem_completed (current_problem (_app)) (L .get (app_as_board) (_app)) (L .get (app_as_last_point) (_app))) (app_state)

var ensemble_ping_state = belief (ensemble_as_ping) (ensemble_state)
var ensemble_progress_state = belief (ensemble_as_progress) (ensemble_state)

var feedback_setting_up_student_state = belief (feedback_as_setting_up_student) (feedback_state)

var feedback_setting_up_student_name_state = belief ('name') (feedback_setting_up_student_state)
var feedback_setting_up_student_icon_state = belief ('icon') (feedback_setting_up_student_state)

var feedback_icon_state = belief (feedback_as_icon) (feedback_state)

var io_inert_state = belief (io_as_inert) (io_state)
var io_connecting_state = belief (io_as_connecting) (app_state)
var io_heartbeat_state = belief (io_as_heartbeat) (app_state)

var lookbehind_bad_room_state = belief (lookbehind_as_bad_room) (lookbehind_state)
var lookbehind_show_results_state = belief (lookbehind_as_show_results) (lookbehind_state)
var lookbehind_overall_analysis_state = belief (lookbehind_as_overall_analysis) (lookbehind_state)
var lookbehind_problems_analysis_state = belief (lookbehind_as_problems_analysis) (lookbehind_state)
var lookbehind_room_state = belief (lookbehind_as_room) (lookbehind_state)
var lookbehind_since_state = belief (lookbehind_as_since) (lookbehind_state)
var lookbehind_blocked_state = belief (lookbehind_as_blocked) (lookbehind_state)
var lookbehind_ordering_state = belief (lookbehind_as_ordering) (lookbehind_state)

var ambient_background_music_on_state = belief (ambient_as_background_music_on) (ambient_state)




// views

var setup_room_view = _ => so ((_=_=>
	(function () {
    var __, __a_title1, __a_title1_img1, __sub_title2, __room3, __room3_label1, __room3_insert2, __room3_input3, __button4, __button4_img1;
    __ = Surplus.createElement("setup-room-etc", null, null);
    __a_title1 = Surplus.createElement("a-title", null, __);
    __a_title1_img1 = Surplus.createElement("img", null, __a_title1);
    __a_title1_img1.src =  img .logo ;
    __sub_title2 = Surplus.createElement("sub-title", null, __);
    __sub_title2.textContent = "除法（一）";
    __room3 = Surplus.createElement("room", null, __);
    Surplus.assign(__room3.style, { margin: '30px 0' });
    __room3_label1 = Surplus.createElement("label", null, __room3);
    __room3_label1.textContent = "遊戲室編號：";
    __room3_insert2 = Surplus.createTextNode('', __room3)
    __room3_input3 = Surplus.createElement("input", null, __room3);
    Surplus.assign(__room3_input3.style, { margin: { top: '10px' } });
    Surplus.createTextNode(" ", __room3)
    __button4 = Surplus.createElement("button", null, __);
    Surplus.setAttribute(__button4, "x-custom", true);
    Surplus.setAttribute(__button4, "x-for", "join");
    __button4_img1 = Surplus.createElement("img", null, __button4);
    __button4_img1.src =  img .join ;
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  L .get (chain_el (K (
			(function () {
    var __, __insert2;
    __ = Surplus.createElement("message", null, null);
    Surplus.setAttribute(__, "x-error", "true");
    Surplus.createTextNode("不能連接遊戲室", __)
    __insert2 = Surplus.createTextNode('', __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  bad_room ); }, { start: __insert2, end: __insert2 });
    return __;
})() ))
			) (
			mark (lookbehind_bad_room_state) ) ); }, { start: __room3_insert2, end: __room3_insert2 });
    Surplus.S.effect(function (__state) { return ( feedback_setup_room )(__, __state); });
    return __;
})(),
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
			if (value) {
				;_input .value = ''
				;please (L_ .set (feedback .setup_room (value, uniq ()))) (feedback_state) } } )=>_))=>_)

var as_point = a => b =>
	[ L .is (a), L .inverse (L .is (b)) ]
var as_points_on = f => ([ ...pairs ]) =>
	L .alternatives (... R .map (([a, b]) => as_point (a) (b)) (pairs), f)
var as_points = ([ ...pairs ]) =>
	L .alternatives (... R .map (([a, b]) => as_point (a) (b)) (pairs))
var points_ = ([ ...pairs ]) => L  .get (as_points ([ ...pairs ]))
var pointed_ = a => b => f =>
	by (_x => !! equals (a) (_x) ? K (b) : f)


var setup_student_view = _ => so ((_=_=>
	(function () {
    var __, __a_title1, __a_title1_img1, __sub_title2, __name3, __name3_label1, __name3_input2, __icon4, __icon4_avatar1, __icon4_avatar1_selected_input1, __icon4_avatar1_img2, __icon4_avatar2, __icon4_avatar2_selected_input1, __icon4_avatar2_img2, __insert5;
    __ = Surplus.createElement("setup-student-etc", null, null);
    __a_title1 = Surplus.createElement("a-title", null, __);
    __a_title1_img1 = Surplus.createElement("img", null, __a_title1);
    __a_title1_img1.src =  img .logo ;
    __sub_title2 = Surplus.createElement("sub-title", null, __);
    __sub_title2.textContent = "除法（一）";
    __name3 = Surplus.createElement("name", null, __);
    Surplus.assign(__name3.style, { marginTop: '30px' });
    __name3_label1 = Surplus.createElement("label", null, __name3);
    __name3_label1.textContent = "名稱";
    __name3_input2 = Surplus.createElement("input", null, __name3);
    Surplus.createTextNode(" ", __name3)
    __icon4 = Surplus.createElement("icon", null, __);
    Surplus.assign(__icon4.style, { marginBottom: '30px' });
    __icon4_avatar1 = Surplus.createElement("avatar", null, __icon4);
    __icon4_avatar1_selected_input1 = Surplus.createElement("selected-input", null, __icon4_avatar1);
    __icon4_avatar1_img2 = Surplus.createElement("img", null, __icon4_avatar1);
    __icon4_avatar1_img2.src =  img .lion_avatar ;
    Surplus.createTextNode(" ", __icon4_avatar1)
    __icon4_avatar2 = Surplus.createElement("avatar", null, __icon4);
    __icon4_avatar2_selected_input1 = Surplus.createElement("selected-input", null, __icon4_avatar2);
    __icon4_avatar2_img2 = Surplus.createElement("img", null, __icon4_avatar2);
    __icon4_avatar2_img2.src =  img .bunny_avatar ;
    Surplus.createTextNode(" ", __icon4_avatar2)
    Surplus.createTextNode(" ", __icon4)
    __insert5 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function () {
        Surplus.setAttribute(__icon4_avatar1, "x-for", "lion");
        Surplus.setAttribute(__icon4_avatar1, "x-selected",  T (_icon) (L .isDefined (avatar_as_lion)) );
    });
    Surplus.S.effect(function () {
        Surplus.setAttribute(__icon4_avatar2, "x-for", "bunny");
        Surplus.setAttribute(__icon4_avatar2, "x-selected",  T (_icon) (L .isDefined (avatar_as_bunny)) );
    });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  !! (L_ .isDefined (mark (feedback_setting_up_student_icon_state))
		&& L_ .isDefined (pointed_ ('') () (I) (mark (feedback_setting_up_student_name_state))))
		? (function () {
    var __, __img1;
    __ = Surplus.createElement("button", null, null);
    Surplus.setAttribute(__, "x-custom", true);
    Surplus.setAttribute(__, "x-for", "connect");
    __img1 = Surplus.createElement("img", null, __);
    __img1.src =  img .connect ;
    Surplus.S.effect(function (__state) { return ( feedback_enter_student )(__, __state); });
    return __;
})()
		: [] ); }, { start: __insert5, end: __insert5 });
    Surplus.S.effect(function (__state) { return ( feedback_setup_student )(__, __state); });
    return __;
})(),
	where
	, _icon = mark (feedback_icon_state)
	//HACK
	, feedback_enter_student = impure (_button =>
		clicking .forEach (click => {
			;_button .addEventListener (click, _e => {
				;please (L .get ([ feedback_as_setting_up_student, L .inverse (feedback_as_setup_student) ])) (feedback_state) }) }) )
	, feedback_setup_student = _dom => so ((_=_=>
		(_name_input .addEventListener ('input', _e => {
			;let_name (_name_input .value) }),
		clicking .forEach (click => {
			;_lion_option .addEventListener (click, _e => {
				;let_icon (avatar .lion) })
			;_bunny_option .addEventListener (click, _e => {
				;let_icon (avatar .bunny) })
			if (_button) {
				;_button .addEventListener (click, _e => {
					//;let_student_enter ()
					}) } })),
		where
		, _name_input = _dom .querySelector ('input')
		, _lion_option = _dom .querySelector ('avatar[x-for=lion]')
		, _bunny_option = _dom .querySelector ('avatar[x-for=bunny]')
		, _button = _dom .querySelector ('button')
		, let_icon = _avatar => {
			;please (L_ .set (_avatar)) (feedback_setting_up_student_icon_state) }
		, let_name = _name => {
			;please (L_ .set (_name)) (feedback_setting_up_student_name_state) }
		, let_student_enter = _ => {
			;please (L .get ([ feedback_as_setting_up_student, L .inverse (feedback_as_setup_student) ])) (feedback_state) } )=>_))=>_)

var setup_view = _ => (function () {
    var __, __insert2;
    __ = Surplus.createElement("setup-etc", null, null);
    Surplus.createTextNode(" ", __)
    __insert2 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range, 
	!! not (L_ .isDefined (mark (app_room_state)))
	?
		!! L_ .isDefined (mark (io_inert_state))
		? setup_room_view
		: L .isDefined (L .choice (io_as_connecting, io_as_heartbeat)) (mark (io_state))
		? (function () {
    var __;
    __ = Surplus.createElement("message", null, null);
    __.textContent = "正在連接遊戲室…";
    return __;
})()
		: panic ('invalid io at get ready view')
	: not (L_ .isDefined (mark (app_student_state)))
	?
		!! L_ .isDefined (mark (io_inert_state))
		? setup_student_view
		: L .isDefined (L .choice (io_as_connecting, io_as_heartbeat)) (mark (io_state))
		? (function () {
    var __;
    __ = Surplus.createElement("message", null, null);
    __.textContent = "正在加入遊戲室…";
    return __;
})()
		: panic ('invalid io at get ready view')
	: (function () {
    var __;
    __ = Surplus.createElement("message", null, null);
    __.textContent = "正在加入遊戲室…";
    return __;
})() ); }, { start: __insert2, end: __insert2 });
    return __;
})()

var get_ready_view = _ => so ((_=_=>
	(function () {
    var __, __div1, __div1_room1, __div1_room1_insert2, __div2;
    __ = Surplus.createElement("get-ready-etc", null, null);
    __div1 = Surplus.createElement("div", null, __);
    __div1_room1 = Surplus.createElement("room", null, __div1);
    Surplus.createTextNode("已加入遊戲室", __div1_room1)
    __div1_room1_insert2 = Surplus.createTextNode('', __div1_room1)
    __div2 = Surplus.createElement("div", null, __);
    __div2.textContent = "等候遊戲開始…";
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range, room); }, { start: __div1_room1_insert2, end: __div1_room1_insert2 });
    return __;
})(),
	where
	, room = mark (app_room_state) )=>_)

var bingoes_view = so ((_=_=>
	_bingoes =>
		(function () {
    var __, __insert2;
    __ = Surplus.createElement("bingo", null, null);
    Surplus.createTextNode(" ", __)
    __insert2 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (_bingoes) ([ L .collect ([ L .elems, _pattern => T (letters) (R .map (nth => 
			(function () {
    var __;
    __ = Surplus.createElement("letter", null, null);
    Surplus.S.effect(function () {
        Surplus.setAttribute(__, "x-as",  nth_letter (nth) );
        Surplus.assign(__.style,  nth_letter_pos (_pattern) (nth) );
    });
    return __;
})())) ]) ]) ); }, { start: __insert2, end: __insert2 });
    return __;
})(),
	where
	, letters = R .range (1) (5 + 1)
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


var board_view = _ => so ((_=_=>
	(function () {
    var __, __insert2, __insert3;
    __ = Surplus.createElement("board", null, null);
    Surplus.setAttribute(__, "x-disabled",  _disabled );
    Surplus.createTextNode(" ", __)
    __insert2 = Surplus.createTextNode('', __)
    __insert3 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (_board) (R .map (_row => 
		(function () {
    var __, __insert2;
    __ = Surplus.createElement("row", null, null);
    Surplus.createTextNode(" ", __)
    __insert2 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (_row) (R .map (_cell => so ((_=_=>
			!! _cell_solved
			? (function () {
    var __;
    __ = Surplus.createElement("cell", null, null);
    Surplus.setAttribute(__, "x-solved", true);
    Surplus.content(__,  _cell_choice , "");
    return __;
})()
			: (function () {
    var __;
    __ = Surplus.createElement("cell", null, null);
    Surplus.content(__,  _cell_choice , "");
    Surplus.S.effect(function (__state) { return ( feedback_cell (_cell) )(__, __state); });
    return __;
})(),
			where
			, _cell_position = T (_cell) (L .get (cell_as_position))
			, _cell_choice = T (_cell) (L .get (cell_as_choice))
			, _cell_solved = R .includes (_cell_position) (_solved_positions) )=>_))) ); }, { start: __insert2, end: __insert2 });
    return __;
})() )) ); }, { start: __insert2, end: __insert2 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  bingoes_view (_bingoes) ); }, { start: __insert3, end: __insert3 });
    return __;
})(),
	where
	, _board = mark (app_board_state)
	, _past = mark (app_past_state)
	, _solved_positions = solved_positions (_board) (_past)
	, _bingoes = bingoes (_board) (_past)
	, _disabled = mark (lookbehind_blocked_state)
	, feedback_cell = cell => _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				var _step = show (app_progress_step_state)
				var _position = T (cell) (L .get (cell_as_position))
				;please (L_ .set (feedback .attempt_problem (_position, uniq ()))) (feedback_state) }) }) } )=>_)

var playing_view = _ => so ((_=_=>
	(function () {
    var __, __div1, __div1_ticker_etc1, __div1_ticker_etc1_insert1, __div1_ticker_etc1_ticker2, __div1_ticker_etc1_ticker2_spinner1, __div1_question2, __div1_question2_insert1, __div1_question2_insert2, __div2, __div2_insert1;
    __ = Surplus.createElement("playing-etc", null, null);
    __div1 = Surplus.createElement("div", "left-pane", __);
    __div1_ticker_etc1 = Surplus.createElement("ticker-etc", null, __div1);
    __div1_ticker_etc1_insert1 = Surplus.createTextNode('', __div1_ticker_etc1)
    __div1_ticker_etc1_ticker2 = Surplus.createElement("ticker", null, __div1_ticker_etc1);
    Surplus.setAttribute(__div1_ticker_etc1_ticker2, "z-identity",  _problem_number );
    Surplus.assign(__div1_ticker_etc1_ticker2.style,  ticker_style );
    __div1_ticker_etc1_ticker2_spinner1 = Surplus.createElement("spinner", null, __div1_ticker_etc1_ticker2);
    Surplus.createTextNode(" ", __div1_ticker_etc1)
    __div1_question2 = Surplus.createElement("question", null, __div1);
    __div1_question2_insert1 = Surplus.createTextNode('', __div1_question2)
    __div1_question2_insert2 = Surplus.createTextNode('', __div1_question2)
    Surplus.createTextNode(" ", __div1_question2)
    Surplus.createTextNode(" ", __div1)
    __div2 = Surplus.createElement("div", "right-pane", __);
    __div2_insert1 = Surplus.createTextNode('', __div2)
    Surplus.createTextNode(" ", __div2)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  L .get (chain_el (_t =>
				_time_limit - _t )) (clock ()) ); }, { start: __div1_ticker_etc1_insert1, end: __div1_ticker_etc1_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  L .get ([ question_as_text, chain_el (_question_text =>
				_question_text ) ]) (_current_question) ); }, { start: __div1_question2_insert1, end: __div1_question2_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  L .get ([ question_as_image, chain_el (_question_image =>
				(function () {
    var __;
    __ = Surplus.createElement("img", null, null);
    __.src =  _question_image ;
    return __;
})() ) ]) (_current_question) ); }, { start: __div1_question2_insert2, end: __div1_question2_insert2 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  board_view ); }, { start: __div2_insert1, end: __div2_insert1 });
    return __;
})(),
		where
		, _problem_number = mark (app_progress_step_state) + 1
		, _time_limit = mark (app_settings_time_limit_state)
		, _current_question = T (mark (app_current_problem_state)) (L .get (problem_as_question))
		, ticker_style = { animationDuration: _time_limit + 's' } )=>_) 


var show_unit = _x => !! (not (equals (0) (_x)) && ! _x) ? '-' :  _x .toFixed (2) * 1
var show_time = _x => !! (not (equals (0) (_x)) && ! _x) ?  '-' : _x .toFixed (2) * 1 + '秒'

var show_results_img = points_ ([ [ true, img .show_results_on ], [ false, img .show_results_off ] ])
var overall_analysis_img = points_ ([ [ true, img .overall_analysis_on ], [ false, img .overall_analysis_off ] ])
var problems_analysis_img = points_ ([ [ true, img .problems_analysis_on ], [ false, img .problems_analysis_off ] ])

var show_results_view = _ =>
	(function () {
    var __, __insert2;
    __ = Surplus.createElement("show-results", null, null);
    Surplus.createTextNode(" ", __)
    __insert2 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  board_view ); }, { start: __insert2, end: __insert2 });
    return __;
})()

var overall_analysis_view = _ => so ((_=_=>
	(function () {
    var __, __div1, __div1_span1, __div1_span3, __div2, __div2_span1, __div2_span3, __div3, __div3_span1, __div3_span3;
    __ = Surplus.createElement("overall-analysis", null, null);
    __div1 = Surplus.createElement("div", null, __);
    __div1_span1 = Surplus.createElement("span", null, __div1);
    __div1_span1.textContent = "已答題數：";
    Surplus.createTextNode(" ", __div1)
    __div1_span3 = Surplus.createElement("span", null, __div1);
    Surplus.content(__div1_span3,  attempted_points_amount , "");
    __div2 = Surplus.createElement("div", null, __);
    __div2_span1 = Surplus.createElement("span", null, __div2);
    __div2_span1.textContent = "答對題數：";
    Surplus.createTextNode(" ", __div2)
    __div2_span3 = Surplus.createElement("span", null, __div2);
    Surplus.content(__div2_span3,  solved_points_amount , "");
    __div3 = Surplus.createElement("div", null, __);
    __div3_span1 = Surplus.createElement("span", null, __div3);
    __div3_span1.textContent = "平均答對時間：";
    Surplus.createTextNode(" ", __div3)
    __div3_span3 = Surplus.createElement("span", null, __div3);
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__current) { return Surplus.content(__div3_span3,  show_time (mean_solved_point_latency) , __current); }, '');
    return __;
})(),
	where
	, _board = mark (app_board_state)
	, _points = mark (app_past_points_state)
	, attempted_points_amount = T (_points) (L .count ([ L .elems, point_as_attempts, L .last ]))
	, solved_points_amount = T (_points) (L .count ([ L .elems, as_solved_on (_board), point_as_attempts, L .last ]))
	, mean_solved_point_latency = T (_points) (L .mean ([ L .elems, as_solved_on (_board), point_as_attempts, L .last, attempt_as_latency ])) )=>_)

var problems_analysis_view = _ => so ((_=_=>
	(function () {
    var __, __labels1, __labels1_question1, __labels1_question1_img2, __labels1_number_of_attempts2, __labels1_number_of_attempts2_img2, __labels1_solved_time3, __labels1_solved_time3_img2, __problems_analysis2, __problems_analysis2_insert2;
    __ = Surplus.createElement("problems-analysis-etc", null, null);
    __labels1 = Surplus.createElement("labels", null, __);
    __labels1_question1 = Surplus.createElement("question", null, __labels1);
    Surplus.createTextNode("題目 ", __labels1_question1)
    __labels1_question1_img2 = Surplus.createElement("img", null, __labels1_question1);
    __labels1_question1_img2.src =  img .toggle_ordering ;
    __labels1_number_of_attempts2 = Surplus.createElement("number-of-attempts", null, __labels1);
    Surplus.createTextNode("作答次數 ", __labels1_number_of_attempts2)
    __labels1_number_of_attempts2_img2 = Surplus.createElement("img", null, __labels1_number_of_attempts2);
    __labels1_number_of_attempts2_img2.src =  img .toggle_ordering ;
    __labels1_solved_time3 = Surplus.createElement("solved-time", null, __labels1);
    Surplus.createTextNode("答對時間 ", __labels1_solved_time3)
    __labels1_solved_time3_img2 = Surplus.createElement("img", null, __labels1_solved_time3);
    __labels1_solved_time3_img2.src =  img .toggle_ordering ;
    Surplus.createTextNode(" ", __labels1)
    __problems_analysis2 = Surplus.createElement("problems-analysis", null, __);
    Surplus.createTextNode(" ", __problems_analysis2)
    __problems_analysis2_insert2 = Surplus.createTextNode('', __problems_analysis2)
    Surplus.createTextNode(" ", __problems_analysis2)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__state) { return ( toggle_question_order )(__labels1_question1, __state); });
    Surplus.S.effect(function (__state) { return ( toggle_number_of_attempts_order )(__labels1_number_of_attempts2, __state); });
    Surplus.S.effect(function (__state) { return ( toggle_solved_time_order )(__labels1_solved_time3, __state); });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  L .collect ([ order_sort (_ordering), L .elems, _point => so ((_=_=> /*reimplement order in terms of free object*/
			(function () {
    var __, __question1, __number_of_attempts2, __solved_time3;
    __ = Surplus.createElement("problem", null, null);
    __question1 = Surplus.createElement("question", null, __);
    __number_of_attempts2 = Surplus.createElement("number-of-attempts", null, __);
    Surplus.content(__number_of_attempts2,  _number_of_attempts , "");
    __solved_time3 = Surplus.createElement("solved-time", null, __);
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__current) { return Surplus.content(__question1,  T (_question) (L .get (L .choice (
						L .chain (K (_image => (function () {
    var __;
    __ = Surplus.createElement("img", null, null);
    __.src =  _image ;
    return __;
})())) (question_as_image),
						L .chain (K (I)) (question_as_text)))) , __current); }, '');
    Surplus.S.effect(function (__current) { return Surplus.content(__solved_time3,  show_time (_solved_time) , __current); }, '');
    return __;
})(),
			where
			, _question = T (_point) (L .get ([ point_as_problem, problem_as_question ]))
			, _number_of_attempts = T (_point) (L .count ([ point_as_attempts, L .elems ]))
			, _solved_time = T (_point) (L .get ([ as_solved_on (_board), point_as_attempts, L .last, attempt_as_latency ])) )=>_) ]
			) (
			mark (app_past_points_state) ) ); }, { start: __problems_analysis2_insert2, end: __problems_analysis2_insert2 });
    return __;
})(),
	where
	, _ordering = mark (lookbehind_ordering_state)
	, _board = mark (app_board_state)
	, toggle_question_order = _dom => {
			;clicking .forEach (click => {
				;_dom .addEventListener (click, _ => {
					;please (toggle_order (question_order)) (lookbehind_ordering_state) }) }) }
	, toggle_number_of_attempts_order = _dom => {
			;clicking .forEach (click => {
				;_dom .addEventListener (click, _ => {
					;please (toggle_order (number_of_attempts_order)) (lookbehind_ordering_state) }) }) }
	, toggle_solved_time_order = _dom => {
			;clicking .forEach (click => {
				;_dom .addEventListener (click, _ => {
					;please (toggle_order (solved_time_order)) (lookbehind_ordering_state) }) }) } )=>_)

var game_over_view = _ => so ((_=_=>
	(function () {
    var __, __a_title1, __a_title1_img1, __student2, __student2_label1, __options3, __options3_button1, __options3_button1_img1, __options3_button2, __options3_button2_img1, __options3_button3, __options3_button3_img1, __insert4, __options5, __options5_button1, __options5_button1_img1;
    __ = Surplus.createElement("game-over-etc", null, null);
    __a_title1 = Surplus.createElement("a-title", null, __);
    __a_title1_img1 = Surplus.createElement("img", null, __a_title1);
    __a_title1_img1.src =  img .logo ;
    __student2 = Surplus.createElement("student", null, __);
    __student2_label1 = Surplus.createElement("label", null, __student2);
    Surplus.content(__student2_label1,  _name , "");
    __options3 = Surplus.createElement("options", null, __);
    Surplus.setAttribute(__options3, "x-for", "tabs");
    __options3_button1 = Surplus.createElement("button", null, __options3);
    Surplus.setAttribute(__options3_button1, "x-custom", true);
    Surplus.setAttribute(__options3_button1, "x-for", "show-results");
    __options3_button1_img1 = Surplus.createElement("img", null, __options3_button1);
    Surplus.createTextNode(" ", __options3_button1)
    __options3_button2 = Surplus.createElement("button", null, __options3);
    Surplus.setAttribute(__options3_button2, "x-custom", true);
    Surplus.setAttribute(__options3_button2, "x-for", "overall-analysis");
    __options3_button2_img1 = Surplus.createElement("img", null, __options3_button2);
    Surplus.createTextNode(" ", __options3_button2)
    __options3_button3 = Surplus.createElement("button", null, __options3);
    Surplus.setAttribute(__options3_button3, "x-custom", true);
    Surplus.setAttribute(__options3_button3, "x-for", "problems-analysis");
    __options3_button3_img1 = Surplus.createElement("img", null, __options3_button3);
    Surplus.createTextNode(" ", __options3_button3)
    Surplus.createTextNode(" ", __options3)
    __insert4 = Surplus.createTextNode('', __)
    __options5 = Surplus.createElement("options", null, __);
    Surplus.setAttribute(__options5, "x-for", "options");
    __options5_button1 = Surplus.createElement("button", null, __options5);
    Surplus.setAttribute(__options5_button1, "x-custom", true);
    Surplus.setAttribute(__options5_button1, "x-for", "play-again");
    __options5_button1_img1 = Surplus.createElement("img", null, __options5_button1);
    __options5_button1_img1.src =  img .play_again ;
    Surplus.createTextNode(" ", __options5)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function () { __options3_button1_img1.src =  show_results_img (L_ .isDefined (mark (lookbehind_show_results_state)))  ; });
    Surplus.S.effect(function (__state) { return ( show_results )(__options3_button1, __state); });
    Surplus.S.effect(function () { __options3_button2_img1.src =  overall_analysis_img (L_ .isDefined (mark (lookbehind_overall_analysis_state)))  ; });
    Surplus.S.effect(function (__state) { return ( overall_analysis )(__options3_button2, __state); });
    Surplus.S.effect(function () { __options3_button3_img1.src =  problems_analysis_img (L_ .isDefined (mark (lookbehind_problems_analysis_state))) ; });
    Surplus.S.effect(function (__state) { return ( problems_analysis )(__options3_button3, __state); });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  !! L_ .isDefined (mark (lookbehind_show_results_state))
		? show_results_view 
		: L_ .isDefined (mark (lookbehind_overall_analysis_state))
		? overall_analysis_view 
		: L_ .isDefined (mark (lookbehind_problems_analysis_state))
		? problems_analysis_view
		: [] ); }, { start: __insert4, end: __insert4 });
    Surplus.S.effect(function (__state) { return ( feedback_play_again )(__options5_button1, __state); });
    return __;
})(),
	where
	, _name = T (mark (app_student_state)) (L .get (student_as_name))
	, show_results = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (L_ .set (lookbehind .show_results)) (lookbehind_state) })})}															
	, overall_analysis = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (L_ .set (lookbehind .overall_analysis)) (lookbehind_state) })})}															
	, problems_analysis = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (L_ .set (lookbehind .problems_analysis ([]))) (lookbehind_state) })})}
	, feedback_play_again = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (L_ .set (feedback .reset_game (uniq ()))) (feedback_state) })})} )=>_) 


S .root (die => {
	;window .die = { ... (window .die || {}), view: die }
	;window .view = (function () {
    var __, __insert1;
    __ = Surplus.createElement("student-app", null, null);
    __insert1 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  !! L_ .isDefined (mark (app_setup_state))
		? setup_view
		: L_ .isDefined (mark (app_get_ready_state))
		? get_ready_view	 
		: L_ .isDefined (mark (app_playing_state))
		? playing_view
		: L_ .isDefined (mark (app_game_over_state))
		? game_over_view
		: panic ('undefined app state in view') ); }, { start: __insert1, end: __insert1 });
    return __;
})() })

			 
			 
			 
// transitions
			 
var setup_room = _room => {
	;go 
	.then (_ => {
		;please (L_ .set (io .connecting)) (io_state) })
	.then (_ =>
		api (_room)
		.then (panic_on ([ [ L .isEmpty (L .leafs), 'empty room; expired code?' ] ])) )
	.then (pinpoint (
		[ ensemble_as_settings
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
			[ ensemble_as_settings
			, impure (_settings => {;latest_settings = _settings}) ]))
		.then (_ =>
			api (_room, 
				message .student_ping (_student, [0, 0, 0]) )
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
	, _board: show (app_board_state) }
	) (
	pinpoint (
	[ as_complete
	, impure (({ _problem, _board }) => {
		if (not (show (app_current_problem_completed_state))) {
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
						;play (audio .student_bingo) } }
				else {
					;play (audio .incorrect)
					;please (L_ .set (lookbehind .attempting (latency, true))) (lookbehind_state) } } } }) ]) ) )

var reset_game = _ => {
	;please (L_ .set (student_app .setup (undefined, undefined, undefined))) (app_state) }





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
				var [ _timestamp_differential, _ ] = timestamp_differential () || [ 0, ]
				var _timestamp = mark (app_progress_timestamp_state) - _timestamp_differential
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
		, _room => api .ping (_room) ()
		, L .when (I)
		, ([ mean, variance, n, timestamp ]) => 
			[ timestamp, mean, Math .sqrt (variance) ] ] ) ) ) ) )

var timestamp_differential = S .root (die =>
	( (window .die = { ... (window .die || {}), differential: die })
	, S (by (_ =>
		suppose (
		( teacher_ping = mark (ensemble_ping_state)
		, [ base_timestamp, base_offset, _ ] = teacher_ping || []
		, [ _timestamp , _offset , ] = connection () || []
		, differential_sample = (_timestamp - base_timestamp) + (1 / 2) * (_offset - base_offset)
		) =>
		L .get (
		L .chain (([ last_timestamp_differential, n ]) => K (
			[ (last_timestamp_differential * n + differential_sample ) / (n + 1), n + 1 ] )
		) (
		[ L .valueOr ([ 0, 0 ]), L .when (K (differential_sample)) ] ) ) ) ) ) ) )


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
					api (_room, 
						!! not_playing
						? [ message .student_ping (_student, S .sample (connection)) ]
						: [ message .student_ping (_student, S .sample (connection))
							, message .student_join (_student, _board)
							, message .student_update (_student, _past) ]) ),
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
				.then (_ensemble => {
					if (equals (_room) (show (app_room_state))) {
						;please (L_ .set (_ensemble)) (ensemble_state) } }) )
			.catch (
				pinpoint (
				l_point_sum (
				[ 'error', L .is ('timeout'), L .when (I), _ => {;console .warn ('Room timed out')} ],
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
				;please (L_ .set (io .inert)) (io_state) }) ) ) ] ) ) ) })

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22file%22%3A%22out.js%22%2C%22sources%22%3A%5B%22in.js%22%5D%2C%22sourcesContent%22%3A%5B%22var%20%7B%20T%2C%20%24%2C%20apply%2C%20L%2C%20L_%2C%20R%2C%20S%2C%20Z%2C%20Z_%2C%20Z%24%2C%20sanc%2C%20memoize%2C%20%5Cnfaith%2C%20belief%2C%20show%2C%20mark%2C%20please%2C%20%5CnY%2C%20impure%2C%20suppose%2C%5Cnso%2C%20by%2C%20%5Cngo%2C%20never%2C%20panic%2C%20panic_on%2C%5Cnjust_now%2C%20temporal%2C%5Cnfiat%2C%20data%2C%20data_lens%2C%20data_iso%2C%20data_kind%2C%5Cnfocused_iso_%2C%5Cnlast_n%2C%20n_reducer%2C%20l_sum%2C%20l_point_sum%2C%20pinpoint%2C%5Cnmap_defined_%2C%20map_defined%2C%20from_just%2C%20%5Cnas_sole%2C%20sole%2C%20shuffle%2C%5CnI%2C%20K%2C%20not%2C%20equals%2C%5Cnuniq%2C%20bool%2C%20number%2C%20timestamp%2C%20string%2C%5Cnlist%2C%20map%2C%20maybe%2C%20nat%2C%20id%2C%20v%2C%20piece%2C%20order%2C%5Cnorder_sort%2C%20direction_opposite%2C%20toggle_order%2C%20%5Cnshuffle%2C%20uuid%2C%20map_zip%2C%20chain_el%2C%20api%2C%20%5Cntimer%2C%20timer_since%2C%20time_intervals%2C%20%5Cnavatar%2C%20student%2C%20problem%2C%20choice%2C%20latency%2C%20ping%2C%20position%2C%5Cnattempt%2C%20point%2C%20past%2C%20board%2C%20win_rule%2C%20rules%2C%20settings%2C%5Cnteacher_app%2C%20student_app%2C%5Cnio%2C%20message%2C%20ensemble%2C%20%5Cndefault_problems%2C%20default_rules%2C%20default_settings%2C%5Cnmap_v_as_key%2C%20map_v_as_value%2C%20as_value_of%2C%5Cnas_complete%2C%20complete_%2C%5Cnapp_as_setup%2C%20app_as_get_ready%2C%20app_as_playing%2C%20app_as_game_over%2C%20app_as_progress%2C%5Cnsettings_as_problems%2C%20settings_as_rules%2C%5Cnsettings_as_size%2C%20settings_as_time_limit%2C%20settings_as_win_rule%2C%5Cnio_as_inert%2C%20io_as_connecting%2C%20io_as_heartbeat%2C%5Cnensemble_as_ping%2C%20ensemble_as_settings%2C%20ensemble_as_progress%2C%20%5Cnensemble_as_pings%2C%20ensemble_as_boards%2C%20ensemble_as_pasts%2C%5Cnprogress_as_step%2C%20progress_as_timestamp%2C%20%5Cnquestion_as_text%2C%20question_as_image%2C%20question_as_solution%2C%20%5Cnattempt_as_position%2C%20attempt_as_latency%2C%20point_as_problem%2C%20point_as_attempts%2C%20point_as_position%2C%20past_as_points%2C%5Cnapp_as_settings%2C%20app_as_student%2C%20app_as_students%2C%20app_as_room%2C%20app_as_problems%2C%5Cnapp_as_board%2C%20app_as_past%2C%20app_as_progress%2C%5Cnapp_as_boards%2C%20app_as_pasts%2C%20%5Cnapp_as_last_point%2C%20point_as_attempts%2C%5Cnavatar_as_lion%2C%20avatar_as_bunny%2C%20%5Cnwin_rule_as_first_bingo%2C%20win_rule_as_limit_time%2C%20win_rule_as_all_problems%2C%20win_rule_as_time_limit%2C%5Cnstudent_as_student%2C%20student_as_id%2C%20student_as_name%2C%20student_as_icon%2C%20%5Cnrules_as_size%2C%20rules_as_time_limit%2C%20rules_as_win_rule%2C%20settings_as_size%2C%20settings_as_time_limit%2C%5Cnproblem_as_question%2C%20problem_as_answers%2C%5Cncell_as_position%2C%20as_position%2C%20cell_as_choice%2C%20%5Cnschedule_start%2C%5Cnteacher_app_get_ready_to_playing%2C%20teacher_app_playing_to_next%2C%20teacher_app_playing_to_game_over%2C%5Cnstudent_app_setup_to_get_ready%2C%20student_app_get_ready_to_playing%2C%20student_app_playing_to_next%2C%20student_app_playing_to_game_over%2C%5Cnboard_choice%2C%20current_problem%2C%20current_problem_completed%2C%20problem_choice_matches%2C%5Cnlocal_patterns%2C%20size_patterns%2C%5Cnas_solved_on%2C%20attempted_positions%2C%20solved_positions%2C%20bingoed_positions%2C%20bingoes%2C%5Cnclicking%2C%20play%2C%20pause%2C%20audio%2C%20img%5Cn%7D%20%3D%20window%20.stuff%5Cn%5Cn%5Cn%2F%2F%20interactive%20datas%5Cn%5Cnvar%20feedback%20%3D%20data%20(%7B%5Cn%5Ctsetup_room%3A%20(room%20%3D~%20room%2C%20uniq%20%3D~%20uniq)%20%3D%3E%20feedback%2C%5Cn%5Ctsetting_up_student%3A%20(icon%20%3D~%20avatar%2C%20name%20%3D~%20string%2C%20uniq%20%3D~%20uniq)%20%3D%3E%20feedback%2C%5Cn%5Ctsetup_student%3A%20(icon%20%3D~%20avatar%2C%20name%20%3D~%20string%2C%20uniq%20%3D~%20uniq)%20%3D%3E%20feedback%2C%5Cn%5Ctattempt_problem%3A%20(position%20%3D~%20position%2C%20uniq%20%3D~%20uniq)%20%3D%3E%20feedback%2C%5Cn%5Ctreset_game%3A%20(uniq%20%3D~%20uniq)%20%3D%3E%20feedback%20%7D)%5Cn%5Cnvar%20lookbehind%20%3D%20data%20(%7B%5Cn%5Ctnothing%3A%20()%20%3D%3E%20lookbehind%2C%5Cn%5Ctbad_room%3A%20(room%20%3D~%20room)%20%3D%3E%20lookbehind%2C%5Cn%5Ctattempting%3A%20(since%20%3D~%20latency%2C%20blocked%20%3D~%20bool)%20%3D%3E%20lookbehind%2C%5Cn%5Ctshow_results%3A%20()%20%3D%3E%20lookbehind%2C%5Cn%5Ctoverall_analysis%3A%20()%20%3D%3E%20lookbehind%2C%5Cn%5Ctproblems_analysis%3A%20(ordering%20%3D~%20order%20(%5B%20'questions'%2C%20'number_of_attempts'%2C%20'solved_time'%20%5D))%20%3D%3E%20lookbehind%20%7D)%5Cn%5Cnvar%20ambient%20%3D%20data%20(%7B%5Cn%5Ctambient%3A%20(%20background_music_on%20%3D~%20bool%20)%20%3D%3E%20ambient%20%7D)%5Cn%5Cn%5Cnvar%20feedback_as_setup_room%20%3D%20data_iso%20(feedback%20.setup_room)%5Cnvar%20feedback_as_setting_up_student%20%3D%20data_iso%20(feedback%20.setting_up_student)%5Cnvar%20feedback_as_setup_student%20%3D%20data_iso%20(feedback%20.setup_student)%5Cnvar%20feedback_as_attempt_problem%20%3D%20data_iso%20(feedback%20.attempt_problem)%5Cnvar%20feedback_as_reset_game%20%3D%20data_iso%20(feedback%20.reset_game)%5Cn%5Cnvar%20feedback_as_name%20%3D%20data_iso%20(feedback%20.setting_up_student)%20.name%5Cnvar%20feedback_as_icon%20%3D%20data_iso%20(feedback%20.setting_up_student)%20.icon%5Cn%5Cnvar%20lookbehind_as_nothing%20%3D%20data_iso%20(lookbehind%20.nothing)%5Cnvar%20lookbehind_as_bad_room%20%3D%20data_iso%20(lookbehind%20.bad_room)%5Cnvar%20lookbehind_as_attempting%20%3D%20data_iso%20(lookbehind%20.attempting)%5Cnvar%20lookbehind_as_show_results%20%3D%20data_iso%20(lookbehind%20.show_results)%5Cnvar%20lookbehind_as_overall_analysis%20%3D%20data_iso%20(lookbehind%20.overall_analysis)%5Cnvar%20lookbehind_as_problems_analysis%20%3D%20data_iso%20(lookbehind%20.problems_analysis)%5Cn%5Cnvar%20lookbehind_as_room%20%3D%20data_lens%20(lookbehind%20.bad_room)%20.room%5Cnvar%20lookbehind_as_since%20%3D%20data_lens%20(lookbehind%20.attempting)%20.since%5Cnvar%20lookbehind_as_blocked%20%3D%20data_lens%20(lookbehind%20.attempting)%20.blocked%5Cnvar%20lookbehind_as_ordering%20%3D%20data_iso%20(lookbehind%20.problems_analysis)%20.ordering%5Cn%5Cnvar%20ambient_as_ambient%20%3D%20data_iso%20(ambient%20.ambient)%5Cnvar%20ambient_as_background_music_on%20%3D%20data_lens%20(ambient%20.ambient)%20.background_music_on%5Cn%5Cn%5Cn%5Cnvar%20question_order%20%3D%20_point%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5CtR%20.indexOf%20(_point)%20(_points)%2C%5Cn%5Ctwhere%5Cn%5Ct%2C%20_points%20%3D%20show%20(app_past_points_state)%20)%3D%3E_)%5Cnvar%20number_of_attempts_order%20%3D%20L%20.count%20(point_as_attempts)%5Cnvar%20solved_time_order%20%3D%20by%20(_point%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5CtL%20.get%20(%5B%20as_solved_on%20(_board)%2C%20point_as_attempts%2C%20L%20.last%2C%20attempt_as_latency%20%5D)%2C%5Cn%5Ctwhere%5Cn%5Ct%2C%20_board%20%3D%20show%20(app_as_board)%20)%3D%3E_))%5Cn%5Ct%5Ct%5Cn%5Cn%5Cn%2F%2F%20states%20and%20beliefs%5Cn%5Cnvar%20state%20%3D%20faith%20(%5Cn%5Ct%7B%20app%3A%20student_app%20.setup%20(undefined%2C%20undefined%2C%20undefined)%5Cn%5Ct%2C%20lookbehind%3A%20lookbehind%20.nothing%5Cn%5Ct%2C%20ambient%3A%20ambient%20.ambient%20(false)%5Cn%5Ct%2C%20io%3A%20io%20.inert%5Cn%5Ct%2C%20ensemble%3A%20undefined%5Cn%5Ct%2C%20feedback%3A%20undefined%20%7D%20)%5Cn%5Cn%5Cnvar%20app_state%20%3D%20belief%20('app')%20(state)%20%5Cnvar%20lookbehind_state%20%3D%20belief%20('lookbehind')%20(state)%5Cnvar%20ambient_state%20%3D%20belief%20('ambient')%20(state)%5Cnvar%20io_state%20%3D%20belief%20('io')%20(state)%5Cnvar%20ensemble_state%20%3D%20belief%20('ensemble')%20(state)%5Cnvar%20feedback_state%20%3D%20belief%20('feedback')%20(state)%5Cn%5Cn%5Cnvar%20app_setup_state%20%3D%20belief%20(app_as_setup)%20(app_state)%5Cnvar%20app_get_ready_state%20%3D%20belief%20(app_as_get_ready)%20(app_state)%5Cnvar%20app_playing_state%20%3D%20belief%20(app_as_playing)%20(app_state)%5Cnvar%20app_game_over_state%20%3D%20belief%20(app_as_game_over)%20(app_state)%5Cn%5Cnvar%20app_settings_state%20%3D%20belief%20(app_as_settings)%20(app_state)%5Cn%5Cnvar%20app_settings_time_limit_state%20%3D%20belief%20(settings_as_time_limit)%20(app_settings_state)%5Cnvar%20app_settings_size_state%20%3D%20belief%20(settings_as_size)%20(app_settings_state)%5Cn%5Cnvar%20app_student_state%20%3D%20belief%20(app_as_student)%20(app_state)%5Cnvar%20app_room_state%20%3D%20belief%20(app_as_room)%20(app_state)%5Cnvar%20app_problems_state%20%3D%20belief%20(app_as_problems)%20(app_state)%5Cnvar%20app_board_state%20%3D%20belief%20(app_as_board)%20(app_state)%5Cnvar%20app_past_state%20%3D%20belief%20(app_as_past)%20(app_state)%5Cn%5Cnvar%20app_past_points_state%20%3D%20belief%20(past_as_points)%20(app_past_state)%5Cn%5Cnvar%20app_progress_state%20%3D%20belief%20(app_as_progress)%20(app_state)%5Cn%5Cnvar%20app_progress_timestamp_state%20%3D%20belief%20(progress_as_timestamp)%20(app_progress_state)%5Cnvar%20app_progress_step_state%20%3D%20belief%20(progress_as_step)%20(app_progress_state)%5Cn%5Cnvar%20app_last_point_state%20%3D%20belief%20(app_as_last_point)%20(app_state)%5Cnvar%20app_current_problem_state%20%3D%20belief%20(current_problem)%20(app_state)%5Cnvar%20app_current_problem_completed_state%20%3D%20belief%20(_app%20%3D%3E%20current_problem_completed%20(current_problem%20(_app))%20(L%20.get%20(app_as_board)%20(_app))%20(L%20.get%20(app_as_last_point)%20(_app)))%20(app_state)%5Cn%5Cnvar%20ensemble_ping_state%20%3D%20belief%20(ensemble_as_ping)%20(ensemble_state)%5Cnvar%20ensemble_progress_state%20%3D%20belief%20(ensemble_as_progress)%20(ensemble_state)%5Cn%5Cnvar%20feedback_setting_up_student_state%20%3D%20belief%20(feedback_as_setting_up_student)%20(feedback_state)%5Cn%5Cnvar%20feedback_setting_up_student_name_state%20%3D%20belief%20('name')%20(feedback_setting_up_student_state)%5Cnvar%20feedback_setting_up_student_icon_state%20%3D%20belief%20('icon')%20(feedback_setting_up_student_state)%5Cn%5Cnvar%20feedback_icon_state%20%3D%20belief%20(feedback_as_icon)%20(feedback_state)%5Cn%5Cnvar%20io_inert_state%20%3D%20belief%20(io_as_inert)%20(io_state)%5Cnvar%20io_connecting_state%20%3D%20belief%20(io_as_connecting)%20(app_state)%5Cnvar%20io_heartbeat_state%20%3D%20belief%20(io_as_heartbeat)%20(app_state)%5Cn%5Cnvar%20lookbehind_bad_room_state%20%3D%20belief%20(lookbehind_as_bad_room)%20(lookbehind_state)%5Cnvar%20lookbehind_show_results_state%20%3D%20belief%20(lookbehind_as_show_results)%20(lookbehind_state)%5Cnvar%20lookbehind_overall_analysis_state%20%3D%20belief%20(lookbehind_as_overall_analysis)%20(lookbehind_state)%5Cnvar%20lookbehind_problems_analysis_state%20%3D%20belief%20(lookbehind_as_problems_analysis)%20(lookbehind_state)%5Cnvar%20lookbehind_room_state%20%3D%20belief%20(lookbehind_as_room)%20(lookbehind_state)%5Cnvar%20lookbehind_since_state%20%3D%20belief%20(lookbehind_as_since)%20(lookbehind_state)%5Cnvar%20lookbehind_blocked_state%20%3D%20belief%20(lookbehind_as_blocked)%20(lookbehind_state)%5Cnvar%20lookbehind_ordering_state%20%3D%20belief%20(lookbehind_as_ordering)%20(lookbehind_state)%5Cn%5Cnvar%20ambient_background_music_on_state%20%3D%20belief%20(ambient_as_background_music_on)%20(ambient_state)%5Cn%5Cn%5Cn%5Cn%5Cn%2F%2F%20views%5Cn%5Cnvar%20setup_room_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%3Csetup-room-etc%20fn%3D%7B%20feedback_setup_room%20%7D%3E%5Cn%5Ct%5Ct%3Ca-title%3E%3Cimg%20src%3D%7B%20img%20.logo%20%7D%2F%3E%3C%2Fa-title%3E%5Cn%5Ct%5Ct%3Csub-title%3E%E9%99%A4%E6%B3%95%EF%BC%88%E4%B8%80%EF%BC%89%3C%2Fsub-title%3E%5Cn%5Ct%5Ct%3Croom%20style%3D%7B%7B%20margin%3A%20'30px%200'%20%7D%7D%3E%5Cn%5Ct%5Ct%5Ct%3Clabel%3E%E9%81%8A%E6%88%B2%E5%AE%A4%E7%B7%A8%E8%99%9F%EF%BC%9A%3C%2Flabel%3E%5Cn%5Ct%5Ct%5Ct%7B%20L%20.get%20(chain_el%20(K%20(%5Cn%5Ct%5Ct%5Ct%3Cmessage%20x-error%3D%5C%22true%5C%22%3E%E4%B8%8D%E8%83%BD%E9%80%A3%E6%8E%A5%E9%81%8A%E6%88%B2%E5%AE%A4%7B%20bad_room%20%7D%3C%2Fmessage%3E%20))%5Cn%5Ct%5Ct%5Ct)%20(%5Cn%5Ct%5Ct%5Ctmark%20(lookbehind_bad_room_state)%20)%20%7D%5Cn%5Ct%5Ct%5Ct%3Cinput%20style%3D%7B%7B%20margin%3A%20%7B%20top%3A%20'10px'%20%7D%20%7D%7D%20%2F%3E%20%3C%2Froom%3E%5Cn%5Ct%5Ct%3Cbutton%20x-custom%20x-for%3D%5C%22join%5C%22%3E%3Cimg%20src%3D%7B%20img%20.join%20%7D%20%2F%3E%3C%2Fbutton%3E%20%3C%2Fsetup-room-etc%3E%2C%5Cn%5Ctwhere%5Cn%5Ct%2C%20bad_room%20%3D%20mark%20(lookbehind_room_state)%5Cn%5Ct%2C%20feedback_setup_room%20%3D%20_dom%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%5Ct(_input%20.addEventListener%20('keypress'%2C%20_e%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ctif%20(_e%20.keyCode%20%3D%3D%3D%2013)%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Blet_room_enter%20()%20%7D%20%7D)%2C%5Cn%5Ct%5Ctclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_button%20.addEventListener%20(click%2C%20_e%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Blet_room_enter%20()%20%7D)%20%7D))%2C%5Cn%5Ct%5Ctwhere%5Cn%5Ct%5Ct%2C%20_input%20%3D%20_dom%20.querySelector%20('input')%5Cn%5Ct%5Ct%2C%20_button%20%3D%20_dom%20.querySelector%20('button')%5Cn%5Ct%5Ct%2C%20let_room_enter%20%3D%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ctvar%20value%20%3D%20_input%20.value%5Cn%5Ct%5Ct%5Ctif%20(value)%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3B_input%20.value%20%3D%20''%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(feedback%20.setup_room%20(value%2C%20uniq%20())))%20(feedback_state)%20%7D%20%7D%20)%3D%3E_))%3D%3E_)%5Cn%5Cnvar%20as_point%20%3D%20a%20%3D%3E%20b%20%3D%3E%5Cn%5Ct%5B%20L%20.is%20(a)%2C%20L%20.inverse%20(L%20.is%20(b))%20%5D%5Cnvar%20as_points_on%20%3D%20f%20%3D%3E%20(%5B%20...pairs%20%5D)%20%3D%3E%5Cn%5CtL%20.alternatives%20(...%20R%20.map%20((%5Ba%2C%20b%5D)%20%3D%3E%20as_point%20(a)%20(b))%20(pairs)%2C%20f)%5Cnvar%20as_points%20%3D%20(%5B%20...pairs%20%5D)%20%3D%3E%5Cn%5CtL%20.alternatives%20(...%20R%20.map%20((%5Ba%2C%20b%5D)%20%3D%3E%20as_point%20(a)%20(b))%20(pairs))%5Cnvar%20points_%20%3D%20(%5B%20...pairs%20%5D)%20%3D%3E%20L%20%20.get%20(as_points%20(%5B%20...pairs%20%5D))%5Cnvar%20pointed_%20%3D%20a%20%3D%3E%20b%20%3D%3E%20f%20%3D%3E%5Cn%5Ctby%20(_x%20%3D%3E%20!!%20equals%20(a)%20(_x)%20%3F%20K%20(b)%20%3A%20f)%5Cn%5Cn%5Cnvar%20setup_student_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%3Csetup-student-etc%20fn%3D%7B%20feedback_setup_student%20%7D%3E%5Cn%5Ct%5Ct%3Ca-title%3E%3Cimg%20src%3D%7B%20img%20.logo%20%7D%2F%3E%3C%2Fa-title%3E%5Cn%5Ct%5Ct%3Csub-title%3E%E9%99%A4%E6%B3%95%EF%BC%88%E4%B8%80%EF%BC%89%3C%2Fsub-title%3E%5Cn%5Ct%5Ct%3Cname%20style%3D%7B%7B%20marginTop%3A%20'30px'%20%7D%7D%3E%5Cn%5Ct%5Ct%5Ct%3Clabel%3E%E5%90%8D%E7%A8%B1%3C%2Flabel%3E%5Cn%5Ct%5Ct%5Ct%3Cinput%20%2F%3E%20%3C%2Fname%3E%5Cn%5Ct%5Ct%3Cicon%20style%3D%7B%7B%20marginBottom%3A%20'30px'%20%7D%7D%3E%5Cn%5Ct%5Ct%5Ct%3Cavatar%20x-for%3D%5C%22lion%5C%22%20x-selected%3D%7B%20T%20(_icon)%20(L%20.isDefined%20(avatar_as_lion))%20%7D%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cselected-input%20%2F%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cimg%20src%3D%7B%20img%20.lion_avatar%20%7D%20%2F%3E%20%3C%2Favatar%3E%5Cn%5Ct%5Ct%5Ct%3Cavatar%20x-for%3D%5C%22bunny%5C%22%20x-selected%3D%7B%20T%20(_icon)%20(L%20.isDefined%20(avatar_as_bunny))%20%7D%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cselected-input%20%2F%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cimg%20src%3D%7B%20img%20.bunny_avatar%20%7D%20%2F%3E%20%3C%2Favatar%3E%20%3C%2Ficon%3E%20%5Cn%5Ct%5Ct%7B%20!!%20(L_%20.isDefined%20(mark%20(feedback_setting_up_student_icon_state))%5Cn%5Ct%5Ct%26%26%20L_%20.isDefined%20(pointed_%20('')%20()%20(I)%20(mark%20(feedback_setting_up_student_name_state))))%5Cn%5Ct%5Ct%3F%20%3Cbutton%20fn%3D%7B%20feedback_enter_student%20%7D%20x-custom%20x-for%3D%5C%22connect%5C%22%3E%3Cimg%20src%3D%7B%20img%20.connect%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%5Ct%5Ct%3A%20%5B%5D%20%7D%20%3C%2Fsetup-student-etc%3E%2C%5Cn%5Ctwhere%5Cn%5Ct%2C%20_icon%20%3D%20mark%20(feedback_icon_state)%5Cn%5Ct%2F%2FHACK%5Cn%5Ct%2C%20feedback_enter_student%20%3D%20impure%20(_button%20%3D%3E%5Cn%5Ct%5Ctclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_button%20.addEventListener%20(click%2C%20_e%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L%20.get%20(%5B%20feedback_as_setting_up_student%2C%20L%20.inverse%20(feedback_as_setup_student)%20%5D))%20(feedback_state)%20%7D)%20%7D)%20)%5Cn%5Ct%2C%20feedback_setup_student%20%3D%20_dom%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%5Ct(_name_input%20.addEventListener%20('input'%2C%20_e%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3Blet_name%20(_name_input%20.value)%20%7D)%2C%5Cn%5Ct%5Ctclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_lion_option%20.addEventListener%20(click%2C%20_e%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Blet_icon%20(avatar%20.lion)%20%7D)%5Cn%5Ct%5Ct%5Ct%3B_bunny_option%20.addEventListener%20(click%2C%20_e%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Blet_icon%20(avatar%20.bunny)%20%7D)%5Cn%5Ct%5Ct%5Ctif%20(_button)%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3B_button%20.addEventListener%20(click%2C%20_e%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%2F%2F%3Blet_student_enter%20()%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%7D)%20%7D%20%7D))%2C%5Cn%5Ct%5Ctwhere%5Cn%5Ct%5Ct%2C%20_name_input%20%3D%20_dom%20.querySelector%20('input')%5Cn%5Ct%5Ct%2C%20_lion_option%20%3D%20_dom%20.querySelector%20('avatar%5Bx-for%3Dlion%5D')%5Cn%5Ct%5Ct%2C%20_bunny_option%20%3D%20_dom%20.querySelector%20('avatar%5Bx-for%3Dbunny%5D')%5Cn%5Ct%5Ct%2C%20_button%20%3D%20_dom%20.querySelector%20('button')%5Cn%5Ct%5Ct%2C%20let_icon%20%3D%20_avatar%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(_avatar))%20(feedback_setting_up_student_icon_state)%20%7D%5Cn%5Ct%5Ct%2C%20let_name%20%3D%20_name%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(_name))%20(feedback_setting_up_student_name_state)%20%7D%5Cn%5Ct%5Ct%2C%20let_student_enter%20%3D%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3Bplease%20(L%20.get%20(%5B%20feedback_as_setting_up_student%2C%20L%20.inverse%20(feedback_as_setup_student)%20%5D))%20(feedback_state)%20%7D%20)%3D%3E_))%3D%3E_)%5Cn%5Cnvar%20setup_view%20%3D%20_%20%3D%3E%20%3Csetup-etc%3E%20%7B%5Cn%5Ct!!%20not%20(L_%20.isDefined%20(mark%20(app_room_state)))%5Cn%5Ct%3F%5Cn%5Ct%5Ct!!%20L_%20.isDefined%20(mark%20(io_inert_state))%5Cn%5Ct%5Ct%3F%20setup_room_view%5Cn%5Ct%5Ct%3A%20L%20.isDefined%20(L%20.choice%20(io_as_connecting%2C%20io_as_heartbeat))%20(mark%20(io_state))%5Cn%5Ct%5Ct%3F%20%3Cmessage%3E%E6%AD%A3%E5%9C%A8%E9%80%A3%E6%8E%A5%E9%81%8A%E6%88%B2%E5%AE%A4%E2%80%A6%3C%2Fmessage%3E%5Cn%5Ct%5Ct%3A%20panic%20('invalid%20io%20at%20get%20ready%20view')%5Cn%5Ct%3A%20not%20(L_%20.isDefined%20(mark%20(app_student_state)))%5Cn%5Ct%3F%5Cn%5Ct%5Ct!!%20L_%20.isDefined%20(mark%20(io_inert_state))%5Cn%5Ct%5Ct%3F%20setup_student_view%5Cn%5Ct%5Ct%3A%20L%20.isDefined%20(L%20.choice%20(io_as_connecting%2C%20io_as_heartbeat))%20(mark%20(io_state))%5Cn%5Ct%5Ct%3F%20%3Cmessage%3E%E6%AD%A3%E5%9C%A8%E5%8A%A0%E5%85%A5%E9%81%8A%E6%88%B2%E5%AE%A4%E2%80%A6%3C%2Fmessage%3E%5Cn%5Ct%5Ct%3A%20panic%20('invalid%20io%20at%20get%20ready%20view')%5Cn%5Ct%3A%20%3Cmessage%3E%E6%AD%A3%E5%9C%A8%E5%8A%A0%E5%85%A5%E9%81%8A%E6%88%B2%E5%AE%A4%E2%80%A6%3C%2Fmessage%3E%20%7D%20%3C%2Fsetup-etc%3E%5Cn%5Cnvar%20get_ready_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%3Cget-ready-etc%3E%5Cn%5Ct%5Ct%3Cdiv%3E%3Croom%3E%E5%B7%B2%E5%8A%A0%E5%85%A5%E9%81%8A%E6%88%B2%E5%AE%A4%7Broom%7D%3C%2Froom%3E%3C%2Fdiv%3E%5Cn%5Ct%5Ct%3Cdiv%3E%E7%AD%89%E5%80%99%E9%81%8A%E6%88%B2%E9%96%8B%E5%A7%8B%E2%80%A6%3C%2Fdiv%3E%20%3C%2Fget-ready-etc%3E%2C%5Cn%5Ctwhere%5Cn%5Ct%2C%20room%20%3D%20mark%20(app_room_state)%20)%3D%3E_)%5Cn%5Cnvar%20bingoes_view%20%3D%20so%20((_%3D_%3D%3E%5Cn%5Ct_bingoes%20%3D%3E%5Cn%5Ct%5Ct%3Cbingo%3E%20%7B%20T%20(_bingoes)%20(%5B%20L%20.collect%20(%5B%20L%20.elems%2C%20_pattern%20%3D%3E%20T%20(letters)%20(R%20.map%20(nth%20%3D%3E%20%5Cn%5Ct%5Ct%5Ct%3Cletter%20x-as%3D%7B%20nth_letter%20(nth)%20%7D%20style%3D%7B%20nth_letter_pos%20(_pattern)%20(nth)%20%7D%20%2F%3E))%20%5D)%20%5D)%20%7D%20%3C%2Fbingo%3E%2C%5Cn%5Ctwhere%5Cn%5Ct%2C%20letters%20%3D%20R%20.range%20(1)%20(5%20%2B%201)%5Cn%5Ct%2C%20nth_letter%20%3D%20nth%20%3D%3E%5Cn%5Ct%5Ct!!%20equals%20(nth)%20(1)%20%3F%20'b'%5Cn%5Ct%5Ct%3A%20equals%20(nth)%20(2)%20%3F%20'i'%5Cn%5Ct%5Ct%3A%20equals%20(nth)%20(3)%20%3F%20'n'%5Cn%5Ct%5Ct%3A%20equals%20(nth)%20(4)%20%3F%20'g'%5Cn%5Ct%5Ct%3A%20equals%20(nth)%20(5)%20%3F%20'o'%5Cn%5Ct%5Ct%3A%20panic%20('bad%20letter')%5Cn%5Ct%2C%20nth_letter_pos%20%3D%20_pattern%20%3D%3E%20nth%20%3D%3E%20so%20((_%3D_%3D%3E%20(%5Cn%5Ct%5Ct%7B%20left%3A%20left%2C%20top%3A%20top%20%7D%20)%2C%5Cn%5Ct%5Ctwhere%5Cn%5Ct%5Ct%2C%20_size%20%3D%20R%20.length%20(_pattern)%5Cn%5Ct%5Ct%2C%20_shape%20%3D%20pattern_shape%20(_pattern)%5Cn%5Ct%5Ct%2C%20_x%20%3D%20L%20.get%20(%5B%20L%20.elems%2C%20(%5B%20y%2C%20x%20%5D)%20%3D%3E%20x%20%5D)%20(_pattern)%5Cn%5Ct%5Ct%2C%20_y%20%3D%20L%20.get%20(%5B%20L%20.elems%2C%20(%5B%20y%2C%20x%20%5D)%20%3D%3E%20y%20%5D)%20(_pattern)%5Cn%5Ct%5Ct%2C%20left%20%3D%20!!%20equals%20(_shape)%20('vertical')%20%3F%20((_x%20-%201)%20%2F%20_size%20%2B%20(1%20%2F%20_size%20-%201%20%2F%205)%20%2F%202)%20*%20100%20%2B%20'%25'%5Cn%5Ct%5Ct%5Ct%3A%20((nth%20-%201)%20*%201%20%2F%205)%20*%20100%20%2B%20'%25'%5Cn%5Ct%5Ct%2C%20top%20%3D%20!!%20equals%20(_shape)%20('horizontal')%20%3F%20((_y%20-%201)%20%2F%20_size%20%2B%20(1%20%2F%20_size%20-%201%20%2F%205)%20%2F%202)%20*%20100%20%2B%20'%25'%5Cn%5Ct%5Ct%5Ct%3A%20equals%20(_shape)%20('diagonal-up')%20%3F%20((5%20-%20nth)%20*%201%20%2F%205)%20*%20100%20%2B%20'%25'%5Cn%5Ct%5Ct%5Ct%3A%20((nth%20-%201)%20*%201%20%2F%205)%20*%20100%20%2B%20'%25'%20)%3D%3E_)%20%5Cn%5Ct%2C%20pattern_shape%20%3D%20_pattern%20%3D%3E%5Cn%5Ct%5Ctsuppose%20(%5Cn%5Ct%5Ct(%20%5B%20first_y%2C%20first_x%20%5D%20%3D%20L%20.get%20(L%20.first)%20(_pattern)%5Cn%5Ct%5Ct%2C%20%5B%20last_y%2C%20last_x%20%5D%20%3D%20L%20.get%20(L%20.last)%20(_pattern)%5Cn%5Ct%5Ct)%20%3D%3E%5Cn%5Ct%5Ct!!%20equals%20(first_x)%20(last_x)%20%3F%20'vertical'%5Cn%5Ct%5Ct%3A%20equals%20(first_y)%20(last_y)%20%3F%20'horizontal'%5Cn%5Ct%5Ct%3A%20(first_x%20%3C%20last_x)%20%3F%20'diagonal-down'%5Cn%5Ct%5Ct%3A%20(first_x%20%3E%20last_x)%20%3F%20'diagonal-up'%5Cn%5Ct%5Ct%3A%20panic%20('bad%20pattern')%20)%20)%3D%3E_)%5Cn%5Cn%5Cnvar%20board_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%3Cboard%20x-disabled%3D%7B%20_disabled%20%7D%3E%20%7B%20T%20(_board)%20(R%20.map%20(_row%20%3D%3E%20%5Cn%5Ct%5Ct%3Crow%3E%20%7B%20T%20(_row)%20(R%20.map%20(_cell%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%5Ct%5Ct!!%20_cell_solved%5Cn%5Ct%5Ct%5Ct%3F%20%3Ccell%20x-solved%3E%7B%20_cell_choice%20%7D%3C%2Fcell%3E%5Cn%5Ct%5Ct%5Ct%3A%20%3Ccell%20fn%3D%7B%20feedback_cell%20(_cell)%20%7D%3E%7B%20_cell_choice%20%7D%3C%2Fcell%3E%2C%5Cn%5Ct%5Ct%5Ctwhere%5Cn%5Ct%5Ct%5Ct%2C%20_cell_position%20%3D%20T%20(_cell)%20(L%20.get%20(cell_as_position))%5Cn%5Ct%5Ct%5Ct%2C%20_cell_choice%20%3D%20T%20(_cell)%20(L%20.get%20(cell_as_choice))%5Cn%5Ct%5Ct%5Ct%2C%20_cell_solved%20%3D%20R%20.includes%20(_cell_position)%20(_solved_positions)%20)%3D%3E_)))%20%7D%20%3C%2Frow%3E%20))%20%7D%5Cn%5Ct%5Ct%7B%20bingoes_view%20(_bingoes)%20%7D%20%3C%2Fboard%3E%2C%5Cn%5Ctwhere%5Cn%5Ct%2C%20_board%20%3D%20mark%20(app_board_state)%5Cn%5Ct%2C%20_past%20%3D%20mark%20(app_past_state)%5Cn%5Ct%2C%20_solved_positions%20%3D%20solved_positions%20(_board)%20(_past)%5Cn%5Ct%2C%20_bingoes%20%3D%20bingoes%20(_board)%20(_past)%5Cn%5Ct%2C%20_disabled%20%3D%20mark%20(lookbehind_blocked_state)%5Cn%5Ct%2C%20feedback_cell%20%3D%20cell%20%3D%3E%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ctvar%20_step%20%3D%20show%20(app_progress_step_state)%5Cn%5Ct%5Ct%5Ct%5Ctvar%20_position%20%3D%20T%20(cell)%20(L%20.get%20(cell_as_position))%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(feedback%20.attempt_problem%20(_position%2C%20uniq%20())))%20(feedback_state)%20%7D)%20%7D)%20%7D%20)%3D%3E_)%5Cn%5Cnvar%20playing_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%3Cplaying-etc%3E%5Cn%5Ct%5Ct%3Cdiv%20class%3D%5C%22left-pane%5C%22%3E%5Cn%5Ct%5Ct%5Ct%3Cticker-etc%3E%5Cn%5Ct%5Ct%5Ct%5Ct%7B%20L%20.get%20(chain_el%20(_t%20%3D%3E%5Cn%5Ct%5Ct%5Ct%5Ct_time_limit%20-%20_t%20))%20(clock%20())%20%7D%5Cn%5Ct%5Ct%5Ct%5Ct%3Cticker%20z-identity%3D%7B%20_problem_number%20%7D%20style%3D%7B%20ticker_style%20%7D%3E%3Cspinner%2F%3E%3C%2Fticker%3E%20%3C%2Fticker-etc%3E%5Cn%5Ct%5Ct%5Ct%3Cquestion%3E%5Cn%5Ct%5Ct%5Ct%5Ct%7B%20L%20.get%20(%5B%20question_as_text%2C%20chain_el%20(_question_text%20%3D%3E%5Cn%5Ct%5Ct%5Ct%5Ct_question_text%20)%20%5D)%20(_current_question)%20%7D%5Cn%5Ct%5Ct%5Ct%5Ct%7B%20L%20.get%20(%5B%20question_as_image%2C%20chain_el%20(_question_image%20%3D%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cimg%20src%3D%7B%20_question_image%20%7D%20%2F%3E%20)%20%5D)%20(_current_question)%20%7D%20%3C%2Fquestion%3E%20%3C%2Fdiv%3E%5Cn%5Ct%5Ct%3Cdiv%20class%3D%5C%22right-pane%5C%22%3E%5Cn%5Ct%5Ct%5Ct%7B%20board_view%20%7D%20%3C%2Fdiv%3E%20%3C%2Fplaying-etc%3E%2C%5Cn%5Ct%5Ctwhere%5Cn%5Ct%5Ct%2C%20_problem_number%20%3D%20mark%20(app_progress_step_state)%20%2B%201%5Cn%5Ct%5Ct%2C%20_time_limit%20%3D%20mark%20(app_settings_time_limit_state)%5Cn%5Ct%5Ct%2C%20_current_question%20%3D%20T%20(mark%20(app_current_problem_state))%20(L%20.get%20(problem_as_question))%5Cn%5Ct%5Ct%2C%20ticker_style%20%3D%20%7B%20animationDuration%3A%20_time_limit%20%2B%20's'%20%7D%20)%3D%3E_)%20%5Cn%5Cn%5Cnvar%20show_unit%20%3D%20_x%20%3D%3E%20!!%20(not%20(equals%20(0)%20(_x))%20%26%26%20!%20_x)%20%3F%20'-'%20%3A%20%20_x%20.toFixed%20(2)%20*%201%5Cnvar%20show_time%20%3D%20_x%20%3D%3E%20!!%20(not%20(equals%20(0)%20(_x))%20%26%26%20!%20_x)%20%3F%20%20'-'%20%3A%20_x%20.toFixed%20(2)%20*%201%20%2B%20'%E7%A7%92'%5Cn%5Cnvar%20show_results_img%20%3D%20points_%20(%5B%20%5B%20true%2C%20img%20.show_results_on%20%5D%2C%20%5B%20false%2C%20img%20.show_results_off%20%5D%20%5D)%5Cnvar%20overall_analysis_img%20%3D%20points_%20(%5B%20%5B%20true%2C%20img%20.overall_analysis_on%20%5D%2C%20%5B%20false%2C%20img%20.overall_analysis_off%20%5D%20%5D)%5Cnvar%20problems_analysis_img%20%3D%20points_%20(%5B%20%5B%20true%2C%20img%20.problems_analysis_on%20%5D%2C%20%5B%20false%2C%20img%20.problems_analysis_off%20%5D%20%5D)%5Cn%5Cnvar%20show_results_view%20%3D%20_%20%3D%3E%5Cn%5Ct%3Cshow-results%3E%20%7B%20board_view%20%7D%20%3C%2Fshow-results%3E%5Cn%5Cnvar%20overall_analysis_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%3Coverall-analysis%3E%5Cn%5Ct%5Ct%3Cdiv%3E%3Cspan%3E%E5%B7%B2%E7%AD%94%E9%A1%8C%E6%95%B8%EF%BC%9A%3C%2Fspan%3E%20%3Cspan%3E%7B%20attempted_points_amount%20%7D%3C%2Fspan%3E%3C%2Fdiv%3E%5Cn%5Ct%5Ct%3Cdiv%3E%3Cspan%3E%E7%AD%94%E5%B0%8D%E9%A1%8C%E6%95%B8%EF%BC%9A%3C%2Fspan%3E%20%3Cspan%3E%7B%20solved_points_amount%20%7D%3C%2Fspan%3E%3C%2Fdiv%3E%5Cn%5Ct%5Ct%3Cdiv%3E%3Cspan%3E%E5%B9%B3%E5%9D%87%E7%AD%94%E5%B0%8D%E6%99%82%E9%96%93%EF%BC%9A%3C%2Fspan%3E%20%3Cspan%3E%7B%20show_time%20(mean_solved_point_latency)%20%7D%3C%2Fspan%3E%3C%2Fdiv%3E%20%3C%2Foverall-analysis%3E%2C%5Cn%5Ctwhere%5Cn%5Ct%2C%20_board%20%3D%20mark%20(app_board_state)%5Cn%5Ct%2C%20_points%20%3D%20mark%20(app_past_points_state)%5Cn%5Ct%2C%20attempted_points_amount%20%3D%20T%20(_points)%20(L%20.count%20(%5B%20L%20.elems%2C%20point_as_attempts%2C%20L%20.last%20%5D))%5Cn%5Ct%2C%20solved_points_amount%20%3D%20T%20(_points)%20(L%20.count%20(%5B%20L%20.elems%2C%20as_solved_on%20(_board)%2C%20point_as_attempts%2C%20L%20.last%20%5D))%5Cn%5Ct%2C%20mean_solved_point_latency%20%3D%20T%20(_points)%20(L%20.mean%20(%5B%20L%20.elems%2C%20as_solved_on%20(_board)%2C%20point_as_attempts%2C%20L%20.last%2C%20attempt_as_latency%20%5D))%20)%3D%3E_)%5Cn%5Cnvar%20problems_analysis_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%3Cproblems-analysis-etc%3E%5Cn%5Ct%5Ct%3Clabels%3E%5Cn%5Ct%5Ct%5Ct%3Cquestion%20fn%3D%7B%20toggle_question_order%20%7D%3E%E9%A1%8C%E7%9B%AE%20%3Cimg%20src%3D%7B%20img%20.toggle_ordering%20%7D%20%2F%3E%3C%2Fquestion%3E%5Cn%5Ct%5Ct%5Ct%3Cnumber-of-attempts%20fn%3D%7B%20toggle_number_of_attempts_order%20%7D%3E%E4%BD%9C%E7%AD%94%E6%AC%A1%E6%95%B8%20%3Cimg%20src%3D%7B%20img%20.toggle_ordering%20%7D%20%2F%3E%3C%2Fnumber-of-attempts%3E%5Cn%5Ct%5Ct%5Ct%3Csolved-time%20fn%3D%7B%20toggle_solved_time_order%20%7D%3E%E7%AD%94%E5%B0%8D%E6%99%82%E9%96%93%20%3Cimg%20src%3D%7B%20img%20.toggle_ordering%20%7D%20%2F%3E%3C%2Fsolved-time%3E%20%3C%2Flabels%3E%5Cn%5Ct%5Ct%3Cproblems-analysis%3E%20%7B%20L%20.collect%20(%5B%20order_sort%20(_ordering)%2C%20L%20.elems%2C%20_point%20%3D%3E%20so%20((_%3D_%3D%3E%20%2F*reimplement%20order%20in%20terms%20of%20free%20object*%2F%5Cn%5Ct%5Ct%5Ct%3Cproblem%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cquestion%3E%7B%20T%20(_question)%20(L%20.get%20(L%20.choice%20(%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5CtL%20.chain%20(K%20(_image%20%3D%3E%20%3Cimg%20src%3D%7B%20_image%20%7D%20%2F%3E))%20(question_as_image)%2C%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5CtL%20.chain%20(K%20(I))%20(question_as_text))))%20%7D%3C%2Fquestion%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cnumber-of-attempts%3E%7B%20_number_of_attempts%20%7D%3C%2Fnumber-of-attempts%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Csolved-time%3E%7B%20show_time%20(_solved_time)%20%7D%3C%2Fsolved-time%3E%20%3C%2Fproblem%3E%2C%5Cn%5Ct%5Ct%5Ctwhere%5Cn%5Ct%5Ct%5Ct%2C%20_question%20%3D%20T%20(_point)%20(L%20.get%20(%5B%20point_as_problem%2C%20problem_as_question%20%5D))%5Cn%5Ct%5Ct%5Ct%2C%20_number_of_attempts%20%3D%20T%20(_point)%20(L%20.count%20(%5B%20point_as_attempts%2C%20L%20.elems%20%5D))%5Cn%5Ct%5Ct%5Ct%2C%20_solved_time%20%3D%20T%20(_point)%20(L%20.get%20(%5B%20as_solved_on%20(_board)%2C%20point_as_attempts%2C%20L%20.last%2C%20attempt_as_latency%20%5D))%20)%3D%3E_)%20%5D%5Cn%5Ct%5Ct%5Ct)%20(%5Cn%5Ct%5Ct%5Ctmark%20(app_past_points_state)%20)%20%7D%20%3C%2Fproblems-analysis%3E%20%3C%2Fproblems-analysis-etc%3E%2C%5Cn%5Ctwhere%5Cn%5Ct%2C%20_ordering%20%3D%20mark%20(lookbehind_ordering_state)%5Cn%5Ct%2C%20_board%20%3D%20mark%20(app_board_state)%5Cn%5Ct%2C%20toggle_question_order%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bplease%20(toggle_order%20(question_order))%20(lookbehind_ordering_state)%20%7D)%20%7D)%20%7D%5Cn%5Ct%2C%20toggle_number_of_attempts_order%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bplease%20(toggle_order%20(number_of_attempts_order))%20(lookbehind_ordering_state)%20%7D)%20%7D)%20%7D%5Cn%5Ct%2C%20toggle_solved_time_order%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bplease%20(toggle_order%20(solved_time_order))%20(lookbehind_ordering_state)%20%7D)%20%7D)%20%7D%20)%3D%3E_)%5Cn%5Cnvar%20game_over_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%3Cgame-over-etc%3E%5Cn%5Ct%5Ct%3Ca-title%3E%3Cimg%20src%3D%7B%20img%20.logo%20%7D%2F%3E%3C%2Fa-title%3E%5Cn%5Ct%5Ct%3Cstudent%3E%3Clabel%3E%7B%20_name%20%7D%3C%2Flabel%3E%3C%2Fstudent%3E%20%5Cn%5Ct%5Ct%3Coptions%20x-for%3D%5C%22tabs%5C%22%3E%5Cn%5Ct%5Ct%5Ct%3Cbutton%20x-custom%20x-for%3D%5C%22show-results%5C%22%20fn%3D%7B%20show_results%20%7D%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cimg%20src%3D%7B%20show_results_img%20(L_%20.isDefined%20(mark%20(lookbehind_show_results_state)))%20%20%7D%20%2F%3E%20%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%3Cbutton%20x-custom%20x-for%3D%5C%22overall-analysis%5C%22%20fn%3D%7B%20overall_analysis%20%7D%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cimg%20src%3D%7B%20overall_analysis_img%20(L_%20.isDefined%20(mark%20(lookbehind_overall_analysis_state)))%20%20%7D%20%2F%3E%20%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%3Cbutton%20x-custom%20x-for%3D%5C%22problems-analysis%5C%22%20fn%3D%7B%20problems_analysis%20%7D%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cimg%20src%3D%7B%20problems_analysis_img%20(L_%20.isDefined%20(mark%20(lookbehind_problems_analysis_state)))%20%7D%20%2F%3E%20%3C%2Fbutton%3E%20%3C%2Foptions%3E%5Cn%5Ct%5Ct%7B%20!!%20L_%20.isDefined%20(mark%20(lookbehind_show_results_state))%5Cn%5Ct%5Ct%3F%20show_results_view%20%5Cn%5Ct%5Ct%3A%20L_%20.isDefined%20(mark%20(lookbehind_overall_analysis_state))%5Cn%5Ct%5Ct%3F%20overall_analysis_view%20%5Cn%5Ct%5Ct%3A%20L_%20.isDefined%20(mark%20(lookbehind_problems_analysis_state))%5Cn%5Ct%5Ct%3F%20problems_analysis_view%5Cn%5Ct%5Ct%3A%20%5B%5D%20%7D%5Cn%5Ct%5Ct%3Coptions%20x-for%3D%5C%22options%5C%22%3E%5Cn%5Ct%5Ct%5Ct%3Cbutton%20x-custom%20x-for%3D%5C%22play-again%5C%22%20fn%3D%7B%20feedback_play_again%20%7D%20%3E%3Cimg%20src%3D%7B%20img%20.play_again%20%7D%20%2F%3E%3C%2Fbutton%3E%20%3C%2Foptions%3E%20%3C%2Fgame-over-etc%3E%2C%5Cn%5Ctwhere%5Cn%5Ct%2C%20_name%20%3D%20T%20(mark%20(app_student_state))%20(L%20.get%20(student_as_name))%5Cn%5Ct%2C%20show_results%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(lookbehind%20.show_results))%20(lookbehind_state)%20%7D)%7D)%7D%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Cn%5Ct%2C%20overall_analysis%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(lookbehind%20.overall_analysis))%20(lookbehind_state)%20%7D)%7D)%7D%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Cn%5Ct%2C%20problems_analysis%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(lookbehind%20.problems_analysis%20(%5B%5D)))%20(lookbehind_state)%20%7D)%7D)%7D%5Cn%5Ct%2C%20feedback_play_again%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(feedback%20.reset_game%20(uniq%20())))%20(feedback_state)%20%7D)%7D)%7D%20)%3D%3E_)%20%5Cn%5Cn%5CnS%20.root%20(die%20%3D%3E%20%7B%5Cn%5Ct%3Bwindow%20.die%20%3D%20%7B%20...%20(window%20.die%20%7C%7C%20%7B%7D)%2C%20view%3A%20die%20%7D%5Cn%5Ct%3Bwindow%20.view%20%3D%20%3Cstudent-app%3E%5Cn%5Ct%5Ct%7B%20!!%20L_%20.isDefined%20(mark%20(app_setup_state))%5Cn%5Ct%5Ct%3F%20setup_view%5Cn%5Ct%5Ct%3A%20L_%20.isDefined%20(mark%20(app_get_ready_state))%5Cn%5Ct%5Ct%3F%20get_ready_view%5Ct%20%5Cn%5Ct%5Ct%3A%20L_%20.isDefined%20(mark%20(app_playing_state))%5Cn%5Ct%5Ct%3F%20playing_view%5Cn%5Ct%5Ct%3A%20L_%20.isDefined%20(mark%20(app_game_over_state))%5Cn%5Ct%5Ct%3F%20game_over_view%5Cn%5Ct%5Ct%3A%20panic%20('undefined%20app%20state%20in%20view')%20%7D%20%3C%2Fstudent-app%3E%20%7D)%5Cn%5Cn%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%20%5Cn%2F%2F%20transitions%5Cn%5Ct%5Ct%5Ct%20%5Cnvar%20setup_room%20%3D%20_room%20%3D%3E%20%7B%5Cn%5Ct%3Bgo%20%5Cn%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bplease%20(L_%20.set%20(io%20.connecting))%20(io_state)%20%7D)%5Cn%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ctapi%20(_room)%5Cn%5Ct%5Ct.then%20(panic_on%20(%5B%20%5B%20L%20.isEmpty%20(L%20.leafs)%2C%20'empty%20room%3B%20expired%20code%3F'%20%5D%20%5D))%20)%5Cn%5Ct.then%20(pinpoint%20(%5Cn%5Ct%5Ct%5B%20ensemble_as_settings%5Cn%5Ct%5Ct%2C%20_settings%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(_room))%20(app_room_state)%5Cn%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(_settings))%20(app_settings_state)%20%7D%20%5D))%5Cn%5Ct.catch%20(_e%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bplease%20(L_%20.set%20(lookbehind%20.bad_room%20(_room)))%20(lookbehind_state)%5Cn%5Ct%5Ct%3Bconsole%20.error%20(_e)%20%7D)%5Cn%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bplease%20(L_%20.set%20(io%20.inert))%20(io_state)%20%7D)%20%7D%5Cn%5Cnvar%20setup_student%20%3D%20_icon%20%3D%3E%20_name%20%3D%3E%20%7B%5Cn%5Ct%3Bplease%20(L_%20.set%20(student%20.student%20(uuid%20()%2C%20_name%2C%20_icon)))%20(app_student_state)%20%7D%20%5Cn%5Cnvar%20connect_room%20%3D%20impure%20(_%20%3D%3E%20%5Cn%5CtT%20(%5Cn%5Ct%7B%20_student%3A%20show%20(app_student_state)%5Cn%5Ct%2C%20_room%3A%20show%20(app_room_state)%20%7D)%20(%5Cn%5Ctpinpoint%20(%5Cn%5Ct%5B%20as_complete%5Cn%5Ct%2C%20impure%20((%7B%20_student%2C%20_room%20%7D)%20%3D%3E%20%5Cn%5Ct%5Ctsuppose%20(%5Cn%5Ct%5Ct(%20latest_settings%5Cn%5Ct%5Ct)%20%3D%3E%5Cn%5Ct%5Ctgo%20%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(io%20.connecting))%20(io_state)%20%7D)%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ct%5Ctapi%20(_room)%5Cn%5Ct%5Ct%5Ct.then%20(panic_on%20(%5B%20%5Bequals%20(%7B%7D)%2C%20'empty%20room%3B%20expired%20code%3F'%5D%20%5D))%20)%5Cn%5Ct%5Ct.then%20(pinpoint%20(%5Cn%5Ct%5Ct%5Ct%5B%20ensemble_as_settings%5Cn%5Ct%5Ct%5Ct%2C%20impure%20(_settings%20%3D%3E%20%7B%3Blatest_settings%20%3D%20_settings%7D)%20%5D))%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ct%5Ctapi%20(_room%2C%20%5Cn%5Ct%5Ct%5Ct%5Ctmessage%20.student_ping%20(_student%2C%20%5B0%2C%200%2C%200%5D)%20)%5Cn%5Ct%5Ct%5Ct.then%20(panic_on%20(%5B%20%5B%20L%20.get%20(%5B%20'ok'%2C%20not%20%5D)%2C%20'not%20ok'%5D%20%5D))%20)%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%20%5Cn%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(latest_settings))%20(app_settings_state)%20%7D)%5Cn%5Ct%5Ct.catch%20(_e%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(lookbehind%20.bad_room%20(_room)))%20(lookbehind_state)%5Cn%5Ct%5Ct%5Ct%3Bconsole%20.error%20(_e)%20%7D)%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(io%20.inert))%20(io_state)%20%7D)%20))%20%5D))%20)%5Cn%5Cnvar%20attempt_problem%20%3D%20impure%20(_position%20%3D%3E%5Cn%5CtT%20(%5Cn%5Ct%7B%20_problem%3A%20show%20(app_current_problem_state)%5Cn%5Ct%2C%20_board%3A%20show%20(app_board_state)%20%7D%5Cn%5Ct)%20(%5Cn%5Ctpinpoint%20(%5Cn%5Ct%5B%20as_complete%5Cn%5Ct%2C%20impure%20((%7B%20_problem%2C%20_board%20%7D)%20%3D%3E%20%7B%5Cn%5Ct%5Ctif%20(not%20(show%20(app_current_problem_completed_state)))%20%7B%5Cn%5Ct%5Ct%5Ctvar%20_choice%20%3D%20board_choice%20(_board)%20(_position)%5Cn%5Ct%5Ct%5Ctif%20(!%20show%20(lookbehind_blocked_state))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ctvar%20latency%20%3D%20S%20.sample%20(fine_clock)%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L%20.set%20(%5B%20point_as_attempts%2C%20L%20.appendTo%20%5D)%20(%5B_position%2C%20latency%5D))%20(app_last_point_state)%5Cn%5Cn%5Ct%5Ct%5Ct%5Ctif%20(problem_choice_matches%20(_problem)%20(_choice))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctvar%20_solved_positions%20%3D%20%5B%20...solved_positions%20(_board)%20(show%20(app_past_state))%2C%20_position%20%5D%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctvar%20_size%20%3D%20show%20(app_settings_size_state)%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctvar%20_local_patterns%20%3D%20T%20(local_patterns%20(size_patterns%20(_size))%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct)%20(%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5CtL%20.collect%20(%5B%20as_value_of%20(_position)%2C%20L%20.elems%2C%20L%20.when%20(R%20.all%20(T%20(_solved_positions)%20(R%20.flip%20(R%20.includes))))%20%5D))%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bplay%20(audio%20.correct)%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctif%20(L%20.isDefined%20(L%20.elems)%20(_local_patterns))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3Bplay%20(audio%20.student_bingo)%20%7D%20%7D%5Cn%5Ct%5Ct%5Ct%5Ctelse%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bplay%20(audio%20.incorrect)%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(lookbehind%20.attempting%20(latency%2C%20true)))%20(lookbehind_state)%20%7D%20%7D%20%7D%20%7D)%20%5D)%20)%20)%5Cn%5Cnvar%20reset_game%20%3D%20_%20%3D%3E%20%7B%5Cn%5Ct%3Bplease%20(L_%20.set%20(student_app%20.setup%20(undefined%2C%20undefined%2C%20undefined)))%20(app_state)%20%7D%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%2F%2F%20resource%20rules%5Cn%5Cnvar%20%5B%20time%2C%20ticking%20%5D%20%3D%20timer%20()%5Cnvar%20%5B%20clock%2C%20fine_clock%20%5D%20%3D%20S%20.root%20(die%20%3D%3E%20%5Cn%5Ct(%20(window%20.die%20%3D%20%7B%20...%20(window%20.die%20%7C%7C%20%7B%7D)%2C%20clock%3A%20die%20%7D)%5Cn%5Ct%2C%20S%20.subclock%20(_%20%3D%3E%20%5Cn%5Ct%5Ctsuppose%20(%5Cn%5Ct%5Ct(%20_clock%20%3D%20S%20.value%20()%5Cn%5Ct%5Ct%2C%20_fine_clock%20%3D%20S%20.value%20()%5Cn%5Ct%5Ct%2C%20%24__ticking%20%3D%20S%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ctif%20(ticking%20()%20%26%26%20L_%20.isDefined%20(mark%20(app_progress_timestamp_state)))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ctvar%20%5B%20_timestamp_differential%2C%20_%20%5D%20%3D%20timestamp_differential%20()%20%7C%7C%20%5B%200%2C%20%5D%5Cn%5Ct%5Ct%5Ct%5Ctvar%20_timestamp%20%3D%20mark%20(app_progress_timestamp_state)%20-%20_timestamp_differential%5Cn%5Ct%5Ct%5Ct%5Ctvar%20_fine_tick%20%3D%20(time%20()%20-%20_timestamp)%20%2F%201000%5Cn%5Ct%5Ct%5Ct%5Ctvar%20_tick%20%3D%20Math%20.floor%20(_fine_tick)%5Cn%5Ct%5Ct%5Ct%5Ctif%20(_tick%20%3E%3D%200)%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3B_clock%20(_tick)%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3B_fine_clock%20(_fine_tick)%20%7D%20%7D%20%7D)%5Cn%5Ct%5Ct)%20%3D%3E%5Cn%5Ct%5Ct%5B%20_clock%2C%20_fine_clock%20%5D%20)%20)%20))%5Cn%5Cn%5Ct%5Ct%5Ct%5Ct%5Cnvar%20reping_period%20%3D%203%5Cnvar%20heartbeat%20%3D%20S%20.data%20(reping_period)%20%5Cn%5Cnvar%20connection%20%3D%20S%20.root%20(die%20%3D%3E%5Cn%5Ct(%20(window%20.die%20%3D%20%7B%20...%20(window%20.die%20%7C%7C%20%7B%7D)%2C%20connection%3A%20die%20%7D)%5Cn%5Ct%2C%20S%20(_%20%3D%3E%20%5Cn%5Ct%5CtT%20(mark%20(app_room_state)%5Cn%5Ct%5Ct)%20(%5Cn%5Ct%5CtL%20.get%20(%5Cn%5Ct%5Ct%5B%20L%20.when%20(I)%5Cn%5Ct%5Ct%2C%20_room%20%3D%3E%20api%20.ping%20(_room)%20()%5Cn%5Ct%5Ct%2C%20L%20.when%20(I)%5Cn%5Ct%5Ct%2C%20(%5B%20mean%2C%20variance%2C%20n%2C%20timestamp%20%5D)%20%3D%3E%20%5Cn%5Ct%5Ct%5Ct%5B%20timestamp%2C%20mean%2C%20Math%20.sqrt%20(variance)%20%5D%20%5D%20)%20)%20)%20)%20)%5Cn%5Cnvar%20timestamp_differential%20%3D%20S%20.root%20(die%20%3D%3E%5Cn%5Ct(%20(window%20.die%20%3D%20%7B%20...%20(window%20.die%20%7C%7C%20%7B%7D)%2C%20differential%3A%20die%20%7D)%5Cn%5Ct%2C%20S%20(by%20(_%20%3D%3E%5Cn%5Ct%5Ctsuppose%20(%5Cn%5Ct%5Ct(%20teacher_ping%20%3D%20mark%20(ensemble_ping_state)%5Cn%5Ct%5Ct%2C%20%5B%20base_timestamp%2C%20base_offset%2C%20_%20%5D%20%3D%20teacher_ping%20%7C%7C%20%5B%5D%5Cn%5Ct%5Ct%2C%20%5B%20_timestamp%20%2C%20_offset%20%2C%20%5D%20%3D%20connection%20()%20%7C%7C%20%5B%5D%5Cn%5Ct%5Ct%2C%20differential_sample%20%3D%20(_timestamp%20-%20base_timestamp)%20%2B%20(1%20%2F%202)%20*%20(_offset%20-%20base_offset)%5Cn%5Ct%5Ct)%20%3D%3E%5Cn%5Ct%5CtL%20.get%20(%5Cn%5Ct%5CtL%20.chain%20((%5B%20last_timestamp_differential%2C%20n%20%5D)%20%3D%3E%20K%20(%5Cn%5Ct%5Ct%5Ct%5B%20(last_timestamp_differential%20*%20n%20%2B%20differential_sample%20)%20%2F%20(n%20%2B%201)%2C%20n%20%2B%201%20%5D%20)%5Cn%5Ct%5Ct)%20(%5Cn%5Ct%5Ct%5B%20L%20.valueOr%20(%5B%200%2C%200%20%5D)%2C%20L%20.when%20(K%20(differential_sample))%20%5D%20)%20)%20)%20)%20)%20)%20)%5Cn%5Cn%5Cn%2F%2F%20rules%5Cn%5Cn%3BS%20.root%20(die%20%3D%3E%20%7B%5Cn%5Ct%3Bwindow%20.die%20%3D%20%7B%20...%20(window%20.die%20%7C%7C%20%7B%7D)%2C%20rules%3A%20die%20%7D%5Cn%5Cn%5Ct%2F%2F%20handle%20user%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%3BS%20(_%20%3D%3E%20%5Cn%5Ct%5CtT%20(mark%20(feedback_state)%5Cn%5Ct%5Ct)%20(%5Cn%5Ct%5Ctpinpoint%20(%5Cn%5Ct%5Ctl_sum%20(%5Cn%5Ct%5Ct%5B%20%5B%20feedback_as_setup_room%2C%20L%20.when%20(I)%5Cn%5Ct%5Ct%5Ct%2C%20(%7B%20room%3A%20_room%20%7D)%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bsetup_room%20(_room)%7D%20%5D%5Cn%5Ct%5Ct%2C%20%5B%20feedback_as_setup_student%2C%20L%20.when%20(I)%5Cn%5Ct%5Ct%5Ct%2C%20impure%20((%7B%20icon%3A%20_icon%2C%20name%3A%20_name%20%7D)%20%3D%3E%20%5Cn%5Ct%5Ct%5Ct%5Ctgo%5Cn%5Ct%5Ct%5Ct%5Ct.then%20(_%20%3D%3E%20setup_student%20(_icon)%20(_name))%5Cn%5Ct%5Ct%5Ct%5Ct.then%20(_%20%3D%3E%20connect_room%20())%20)%20%5D%5Cn%5Ct%5Ct%2C%20%5B%20feedback_as_attempt_problem%2C%20L%20.when%20(I)%5Cn%5Ct%5Ct%5Ct%2C%20(%7B%20position%3A%20_position%20%7D)%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Battempt_problem%20(_position)%7D%20%5D%5Cn%5Ct%5Ct%2C%20%5B%20feedback_as_reset_game%2C%20L%20.when%20(I)%5Cn%5Ct%5Ct%5Ct%2C%20impure%20(reset_game)%20%5D%20%5D%20)))%20)%5Cn%5Cn%5Ct%3BS%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ctif%20(mark%20(ambient_background_music_on_state))%20%7B%5Cn%5Ct%5Ct%5Ct%3Bplay%20(audio%20.background)%20%7D%5Cn%5Ct%5Ctelse%20%7B%5Cn%5Ct%5Ct%5Ct%3Bpause%20(audio%20.background)%20%7D%20%7D)%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Ct%2F%2F%20game%20rules%5Cn%5Cn%5Ct%3BS%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ctvar%20_progress%20%3D%20mark%20(app_progress_state)%5Cn%5Ct%5Ctvar%20_ensemble_progress%20%3D%20mark%20(ensemble_progress_state)%5Cn%5Cn%5Ct%5Ctif%20(not%20(equals%20(_progress)%20(_ensemble_progress)))%20%7B%5Cn%5Ct%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_get_ready_state)))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(student_app_get_ready_to_playing)%20(app_state)%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(_ensemble_progress))%20(app_progress_state)%20%7D%5Cn%5Ct%5Ct%5Ctelse%20if%20(L_%20.isDefined%20(mark%20(app_playing_state)))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ctvar%20_progress_step%20%3D%20L%20.get%20(progress_as_step)%20(_ensemble_progress)%5Cn%5Ct%5Ct%5Ct%5Ctif%20(_progress_step%20!%3D%3D%20-1)%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctif%20(_progress_step%20%3E%20L%20.get%20(progress_as_step)%20(_progress))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(_ensemble_progress))%20(app_progress_state)%20%7D%20%7D%5Cn%5Ct%5Ct%5Ct%5Ctelse%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bplease%20(student_app_playing_to_game_over)%20(app_state)%20%7D%20%7D%20%7D%20%7D)%5Cn%5Cn%5Ct%3BS%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_setup_state)))%20%7B%5Cn%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(lookbehind%20.nothing))%20(lookbehind_state)%5Cn%5Ct%5Ct%5Ct%3Bplease%20(L_%20.remove)%20(ensemble_state)%20%7D%20%7D)%5Cn%5Cn%5Ct%3BS%20(last_app_room_state%20%3D%3E%20%7B%5Cn%5Ct%5Ctif%20(!%20L_%20.isDefined%20(last_app_room_state))%20%7B%5Cn%5Ct%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_room_state)))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(lookbehind%20.nothing))%20(lookbehind_state)%20%7D%20%7D%5Cn%5Ct%5Ctreturn%20mark%20(app_room_state)%20%7D)%5Cn%5Cn%5Ct%3BS%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_setup_state)))%20%7B%5Cn%5Ct%5Ct%5CtT%20(%5B%20mark%20(app_student_state)%2C%20mark%20(app_room_state)%2C%20mark%20(app_settings_state)%20%5D%5Cn%5Ct%5Ct%5Ct)%20(%5Cn%5Ct%5Ct%5Ctpinpoint%20(%5Cn%5Ct%5Ct%5Ct%5B%20as_complete%5Cn%5Ct%5Ct%5Ct%2C%20_%20%3D%3E%20%7B%3Bplease%20(student_app_setup_to_get_ready)%20(app_state)%7D%20%5D))%20%7D%20%7D)%5Cn%5Cn%5Ct%3BS%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ctif%20(mark%20(lookbehind_blocked_state))%20%7B%5Cn%5Ct%5Ct%5Ctvar%20forget%20%3D%20setTimeout%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(false))%20(lookbehind_blocked_state)%20%7D%5Cn%5Ct%5Ct%5Ct%2C%203000)%5Cn%5Ct%5Ct%5Ct%3BS%20.cleanup%20(_%20%3D%3E%20%7B%3BclearTimeout%20(forget)%7D)%20%7D%20%7D)%5Cn%5Cn%5Ct%3BS%20(last_tick_left%20%3D%3E%20%7B%5Cn%5Ct%5Ctvar%20time_limit%20%3D%20mark%20(app_settings_time_limit_state)%5Cn%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_playing_state)))%20%7B%5Cn%5Ct%5Ct%5Ctvar%20tick%20%3D%20clock%20()%5Cn%5Ct%5Ct%5Ctvar%20tick_left%20%3D%20time_limit%20-%20tick%5Cn%5Ct%5Ct%5Ctif%20(tick_left%20%3D%3D%203%20%26%26%20not%20(equals%20(tick_left)%20(last_tick_left)))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplay%20(audio%20.countdown)%20%7D%5Cn%5Ct%5Ct%5Ctif%20(tick%20%3E%3D%20time_limit)%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(student_app_playing_to_next)%20(app_state)%20%7D%5Cn%5Ct%5Ct%5Ctreturn%20tick_left%20%7D%20%7D)%5Cn%5Cn%5Ct%3BS%20(last_progress_step%20%3D%3E%20%7B%5Cn%5Ct%5Ctvar%20progress_step%20%3D%20mark%20(app_progress_step_state)%5Cn%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_playing_state)))%20%7B%5Cn%5Ct%5Ct%5Ctif%20(complete_%20(%5B%20last_progress_step%2C%20progress_step%20%5D)%20%26%26%20not%20(equals%20(last_progress_step)%20(progress_step)))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(0))%20(lookbehind_since_state)%20%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(false))%20(lookbehind_blocked_state)%20%7D%20%7D%5Cn%5Ct%5Ctreturn%20progress_step%20%7D)%5Cn%5Cn%5Ct%3BS%20(last_game_over_state%20%3D%3E%20%7B%5Cn%5Ct%5Ctif%20(!%20L_%20.isDefined%20(last_game_over_state))%20%7B%5Cn%5Ct%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_game_over_state)))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(lookbehind%20.overall_analysis))%20(lookbehind_state)%20%7D%20%7D%5Cn%5Ct%5Ctreturn%20mark%20(app_game_over_state)%20%7D)%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Ct%2F%2F%20misc%5Cn%5Cn%5Ct%2F%2F%20time%5Cn%5Ct%3BS%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_get_ready_state)))%20%7B%5Cn%5Ct%5Ct%5Ct%3Bticking%20(false)%20%7D%5Cn%5Ct%5Ctelse%20if%20(L_%20.isDefined%20(mark%20(app_playing_state)))%20%7B%5Cn%5Ct%5Ct%5Ct%3Bticking%20(true)%20%7D%5Cn%5Ct%5Ctelse%20if%20(L_%20.isDefined%20(mark%20(app_game_over_state)))%20%7B%5Cn%5Ct%5Ct%5Ct%3Bticking%20(false)%20%7D%20%7D)%5Cn%5Cn%5Ct%2F%2F%20communication%5Cn%5Ct%3BS%20(_%20%3D%3E%20%5Cn%5Ct%5CtT%20(%5Cn%5Ct%5Ct%7B%20_student%3A%20mark%20(app_student_state)%5Cn%5Ct%5Ct%2C%20_room%3A%20mark%20(app_room_state)%20%7D%5Cn%5Ct%5Ct)%20(%5Cn%5Ct%5Ctpinpoint%20(%5Cn%5Ct%5Ct%5B%20as_complete%5Cn%5Ct%5Ct%2C%20impure%20((%7B%20_student%2C%20_room%20%7D)%20%3D%3E%5Cn%5Ct%5Ct%5Ctsuppose%20(%5Cn%5Ct%5Ct%5Ct(%20phase%20%3D%20heartbeat%20()%5Cn%5Ct%5Ct%5Ct%2C%20critical%20%3D%20phase%20%3D%3D%3D%201%5Cn%5Ct%5Ct%5Ct)%20%3D%3E%5Cn%5Ct%5Ct%5Ct(%20!!%20critical%20%26%26%20S%20.sample%20(connection)%5Cn%5Ct%5Ct%5Ct%3F%20so%20((_%3D_%3D%3E%5Cn%5Ct%5Ct%5Ct%5Ctgo%5Cn%5Ct%5Ct%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(io%20.messaging))%20(io_state)%20%7D)%5Cn%5Ct%5Ct%5Ct%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctapi%20(_room%2C%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct!!%20not_playing%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3F%20%5B%20message%20.student_ping%20(_student%2C%20S%20.sample%20(connection))%20%5D%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3A%20%5B%20message%20.student_ping%20(_student%2C%20S%20.sample%20(connection))%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%2C%20message%20.student_join%20(_student%2C%20_board)%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%2C%20message%20.student_update%20(_student%2C%20_past)%20%5D)%20)%2C%5Cn%5Ct%5Ct%5Ct%5Ctwhere%5Cn%5Ct%5Ct%5Ct%5Ct%2C%20%7B%20_board%2C%20_past%2C%20not_playing%20%7D%20%3D%5Cn%5Ct%5Ct%5Ct%5Ct%5CtT%20(%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%7B%20_board%3A%20show%20(app_board_state)%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%2C%20_past%3A%20show%20(app_past_state)%20%7D%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct)%20(%5Cn%5Ct%5Ct%5Ct%5Ct%5CtL%20.get%20(%5B%20complete_%2C%20L%20.valueOr%20(%7B%20not_playing%3A%20'not%20playing'%20%7D)%20%5D)))%3D%3E_)%5Cn%5Ct%5Ct%5Ct%3A%20go%5Cn%5Ct%5Ct%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(io%20.heartbeat))%20(io_state)%20%7D)%5Cn%5Ct%5Ct%5Ct%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctapi%20(_room)%20)%5Cn%5Ct%5Ct%5Ct%5Ct.then%20(_ensemble%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctif%20(equals%20(_room)%20(show%20(app_room_state)))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(_ensemble))%20(ensemble_state)%20%7D%20%7D)%20)%5Cn%5Ct%5Ct%5Ct.catch%20(%5Cn%5Ct%5Ct%5Ct%5Ctpinpoint%20(%5Cn%5Ct%5Ct%5Ct%5Ctl_point_sum%20(%5Cn%5Ct%5Ct%5Ct%5Ct%5B%20'error'%2C%20L%20.is%20('timeout')%2C%20L%20.when%20(I)%2C%20_%20%3D%3E%20%7B%3Bconsole%20.warn%20('Room%20timed%20out')%7D%20%5D%2C%5Cn%5Ct%5Ct%5Ct%5Ct%5B%20panic%20%5D%20)%20)%20)%5Cn%5Ct%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3BsetTimeout%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bheartbeat%20(!!%20critical%20%3F%20reping_period%20%3A%20phase%20-%201)%20%7D%5Cn%5Ct%5Ct%5Ct%5Ct%2C%20300)%20%7D)%5Cn%5Ct%5Ct%5Ct.catch%20(_e%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bconsole%20.error%20(_e)%5Cn%5Ct%5Ct%5Ct%5Ct%3BsetTimeout%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bheartbeat%20(phase)%20%7D%5Cn%5Ct%5Ct%5Ct%5Ct%2C%20300)%20%7D)%5Cn%5Ct%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(io%20.inert))%20(io_state)%20%7D)%20)%20)%20%5D%20)%20)%20)%20%7D)%5Cn%22%5D%2C%22names%22%3A%5B%5D%2C%22mappings%22%3A%22AAAA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CCAAC%3B%3B%3B%3B%3B0BACoB%3B%3B%3B%3BkCAEN%3B%3B%3B%3B%3ByCAME%3B%3B%3B%3B%3B%3ByBACyB%3B%3BIALvC%2CqEAAC%3BAACJ%2CGAAG%3B%3B%3B%3B%3B%3BIAA%2BB%2CqEAAC%3B%3BIAAqB%3BAACxD%3BAACA%3BIARiB%2C8CAAI%3B%3BIAU%2BD%3BAACpF%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CCAAC%3B%3B%3B%3B%3B0BACoB%3B%3B%3B%3BkCAEN%3B%3B%3B%3B%3B%3BkCAGA%3B%3B%3B%3B%2BBAGD%3B%3B%3B%3B%3B%2BBAGA%3B%3B%3B%3B%3BIALX%3B%3B4DAAiC%3B%3BIAGjC%3B%3B4DAAkC%3B%3BIAGnC%2CqEAAC%3BAACH%3BAACA%2CIAAI%3B%3B%3B%3B%3B%3BiBAAyE%3BIAAjE%2C8CAAI%3B%3BIAAwF%3BAACxG%3BIAhBoB%2C8CAAI%3B%3BIAgBK%3BAAC7B%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CsBAAsB%3B%3B%3B%3B%3B%3BIAAY%2CqEAAC%3BAACnC%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CIAAI%3B%3B%3B%3B%3BIAA2B%3BAAC%2FB%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CIAAI%3B%3B%3B%3B%3BIAA2B%3BAAC%2FB%3BAACA%2CGAAG%3B%3B%3B%3B%3BIAA2B%3B%3BIAAe%3BAAC7C%3BAACA%3BAACA%2CCAAC%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BIACkB%2CqEAAC%3B%3BIACiB%3BAACrC%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CEAAE%3B%3B%3B%3B%3B%3BIAAQ%2CqEAAC%3BAACX%2CGAAG%3B%3B%3BIAAA%3ByCAAc%3BiCAA2B%3B%3B%3BIAAqC%3B%3BIAAmB%3BAACpG%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CCAAC%3B%3B%3B2CAAmB%3B%3B%3B%3B%3BIAAc%2CqEAAC%3BAACnC%2CEAAE%3B%3B%3B%3B%3B%3BIAAM%2CqEAAC%3BAACT%3BAACA%2CKAAK%3B%3B%3B%3BwBAAgB%3B%3BIAAsB%3BAAC3C%2CKAAK%3B%3B%3BwBAAoC%3BIAA9B%2C8CAAI%3B%3BIAAgD%3BAAC%2FD%3BAACA%3BAACA%3BAACA%3B%3BIAAqF%3BIACnF%2CqEAAC%3B%3BIAAmC%3BAACtC%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CCAAC%3B%3B%3B%3B%3B%3B%3BmEAKuB%3BqDAA0B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BIAF9C%2CqEAAC%3BAACL%3BIAGI%2CqEAAC%3BAACL%3BIACI%2CqEAAC%3BAACL%2CIAAI%3B%3B%3BaAAU%3B%3BIAAqB%3BIAEhC%2CqEAAC%3B%3BIAAmC%3BAACvC%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CCAAC%3B%3B%3B%3B%3B%3BIAAe%2CqEAAC%3B%3BIAA6B%3BAAC9C%3BAACA%3BAACA%2CCAAC%3B%3B%3B%3B%3B%3B%3B%3BkCACgC%3B%3B%3B%3B%3B%3BkCACA%3B%3B%3B%3B%3B%3B%3BIACC%2C6EAAC%3B%3BIAAyE%3BAAC5G%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CCAAC%3B%3B%3B%3B%3B%3B%3BmCAEsD%3B%3B%3B%3B6CACsB%3B%3B%3B%3BsCACd%3B%3B%3B%3B%3B%3B%3BIAFlD%2C8CAAI%3BIACM%2C8CAAI%3BIACX%2C8CAAI%3BIACE%2CqEAAC%3BAACvB%2CGAAG%3B%3B%3B%3B%3B2CAIsB%3B%3B%3BIAHX%2C4EAAC%3BAACf%2C6BAA6B%3B%3B%3BaAAU%3B%3BIAAY%3BAACnD%3BIAEiB%2C%2BEAAC%3B%3BIAAoD%3BAACtE%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3B%3BIAAiF%3BAACjF%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CCAAC%3B%3B%3B%3B%3B0BACoB%3B%3B%3BuCACF%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BkCAgB0D%3B%3B%3BIAbzE%2C6DAAU%3BIAD2B%2C8CAAI%3BIAGzC%2C6DAAU%3BIAD%2BB%2C8CAAI%3BIAG7C%2C6DAAU%3BIADgC%2C8CAAI%3BIAEhD%2CqEAAC%3BAACH%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BIAEuC%2C8CAAI%3B%3BIAA4F%3BAACvI%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CiBAAiB%3B%3B%3B%3B%3BIACf%2CqEAAC%3BAACH%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3B%3BIAA0D%3BAAC1D%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%22%7D
