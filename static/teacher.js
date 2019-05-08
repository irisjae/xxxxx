var { T, $, apply, L, L_, R, S, Z, Z_, Z$, sanc, memoize, 
faith, belief, show, mark, please, 
Y, impure, jinx, suppose,
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
var app_students_map_boards_v_pasts_state = belief (_app => map_zip (a => b => [a, b]) (L .get (app_as_boards) (_app) || []) (L .get (app_as_pasts) (_app) || [])) (app_state)

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

var asset_view = _asset => (function () {
    var __, __img1;
    __ = Surplus.createElement("asset", null, null);
    __img1 = Surplus.createElement("img", null, __);
    __img1.src =  _asset ;
    return __;
})()
var text_asset_view = _asset => (function () {
    var __;
    __ = Surplus.createElement("img", null, null);
    __.src =  _asset ;
    Surplus.setAttribute(__, "text-asset", true);
    return __;
})()

var counter_setting_view = label => please_feedback => iso_v_img_list => _setting => so ((_=_=>
	[ (function () {
    var __;
    __ = Surplus.createElement("label", null, null);
    Surplus.content(__,  label , "");
    return __;
})()
	, (function () {
    var __, __prev1, __prev1_img1, __counter2, __counter2_img1, __next3, __next3_img1;
    __ = Surplus.createElement("control", null, null);
    __prev1 = Surplus.createElement("prev", null, __);
    __prev1_img1 = Surplus.createElement("img", null, __prev1);
    __prev1_img1.src =  img .prev ;
    __counter2 = Surplus.createElement("counter", null, __);
    __counter2_img1 = Surplus.createElement("img", null, __counter2);
    __counter2_img1.src =  _img ;
    __next3 = Surplus.createElement("next", null, __);
    __next3_img1 = Surplus.createElement("img", null, __next3);
    __next3_img1.src =  img .next ;
    Surplus.S.effect(function (__state) { return ( feedback_prev )(__prev1, __state); });
    Surplus.S.effect(function (__state) { return ( feedback_next )(__next3, __state); });
    return __;
})() ],
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

var as_point = a => b =>
	[ L .is (a), L .inverse (L .is (b)) ]
var as_points_on = f => ([ ...pairs ]) =>
	L .alternatives (... R .map (([a, b]) => as_point (a) (b)) (pairs), f)
var as_points = ([ ...pairs ]) =>
	L .alternatives (... R .map (([a, b]) => as_point (a) (b)) (pairs))
var points_ = ([ ...pairs ]) => L  .get (as_points ([ ...pairs ]))

var on_off = points_ ([ [ true, 'on' ], [ false, 'off' ] ])
var background_music_img = points_ ([ [ true, img .music_on ], [ false, img .music_off ] ])

var setup_view = _ => so ((_=_=>
	!! L_ .isDefined (mark (lookbehind_nothing_state))
	? (function () {
    var __, __div1, __div1_a_title1, __div1_a_title1_img1, __div1_sub_title2, __div1_settings3, __div1_settings3_setting1, __div1_settings3_setting1_insert1, __div1_settings3_setting2, __div1_settings3_setting2_insert1, __div1_button4, __div1_button4_img1, __div1_button5, __div1_button5_img1, __div1_insert6, __div2, __div2_settings1, __div2_settings1_setting1, __div2_settings1_setting1_img1, __div2_settings1_setting2, __div2_settings1_setting2_img1, __div2_settings1_setting3, __div2_settings1_setting3_img1, __setting3, __setting3_img1;
    __ = Surplus.createElement("setup-etc", null, null);
    __div1 = Surplus.createElement("div", "left-pane", __);
    __div1_a_title1 = Surplus.createElement("a-title", null, __div1);
    __div1_a_title1_img1 = Surplus.createElement("img", null, __div1_a_title1);
    __div1_a_title1_img1.src =  img .logo ;
    __div1_sub_title2 = Surplus.createElement("sub-title", null, __div1);
    __div1_sub_title2.textContent = "除法（一）";
    __div1_settings3 = Surplus.createElement("settings", null, __div1);
    Surplus.setAttribute(__div1_settings3, "x-for", "game-mode time-limit");
    __div1_settings3_setting1 = Surplus.createElement("setting", null, __div1_settings3);
    Surplus.setAttribute(__div1_settings3_setting1, "x-of", "game-mode");
    __div1_settings3_setting1_insert1 = Surplus.createTextNode('', __div1_settings3_setting1)
    Surplus.createTextNode(" ", __div1_settings3_setting1)
    __div1_settings3_setting2 = Surplus.createElement("setting", null, __div1_settings3);
    Surplus.setAttribute(__div1_settings3_setting2, "x-of", "time-limit");
    __div1_settings3_setting2_insert1 = Surplus.createTextNode('', __div1_settings3_setting2)
    Surplus.createTextNode(" ", __div1_settings3_setting2)
    __div1_button4 = Surplus.createElement("button", null, __div1);
    Surplus.setAttribute(__div1_button4, "x-custom", "true");
    Surplus.setAttribute(__div1_button4, "x-for", "preview");
    __div1_button4_img1 = Surplus.createElement("img", null, __div1_button4);
    __div1_button4_img1.src =  img .go_preview ;
    __div1_button5 = Surplus.createElement("button", null, __div1);
    Surplus.setAttribute(__div1_button5, "x-custom", "true");
    Surplus.setAttribute(__div1_button5, "x-for", "start");
    __div1_button5_img1 = Surplus.createElement("img", null, __div1_button5);
    __div1_button5_img1.src =  img .go_start ;
    __div1_insert6 = Surplus.createTextNode('', __div1)
    Surplus.createTextNode(" ", __div1)
    __div2 = Surplus.createElement("div", "right-pane", __);
    __div2_settings1 = Surplus.createElement("settings", null, __div2);
    Surplus.setAttribute(__div2_settings1, "x-for", "board-size");
    __div2_settings1_setting1 = Surplus.createElement("setting", null, __div2_settings1);
    Surplus.setAttribute(__div2_settings1_setting1, "x-of", "board-size");
    Surplus.setAttribute(__div2_settings1_setting1, "x-be", "3x3");
    __div2_settings1_setting1_img1 = Surplus.createElement("img", null, __div2_settings1_setting1);
    __div2_settings1_setting2 = Surplus.createElement("setting", null, __div2_settings1);
    Surplus.setAttribute(__div2_settings1_setting2, "x-of", "board-size");
    Surplus.setAttribute(__div2_settings1_setting2, "x-be", "4x4");
    __div2_settings1_setting2_img1 = Surplus.createElement("img", null, __div2_settings1_setting2);
    __div2_settings1_setting3 = Surplus.createElement("setting", null, __div2_settings1);
    Surplus.setAttribute(__div2_settings1_setting3, "x-of", "board-size");
    Surplus.setAttribute(__div2_settings1_setting3, "x-be", "5x5");
    __div2_settings1_setting3_img1 = Surplus.createElement("img", null, __div2_settings1_setting3);
    Surplus.createTextNode(" ", __div2_settings1)
    Surplus.createTextNode(" ", __div2)
    __setting3 = Surplus.createElement("setting", null, __);
    __setting3_img1 = Surplus.createElement("img", null, __setting3);
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  $ (counter_setting_view
				) (asset_view (img .text_game_mode)
				) (_win_rule => {
					var rules_delta = T (_win_rule) (L .get (L.inverse (data_iso (rules .rules) .win_rule)))
					;please (L_ .set (feedback .setup_rules (rules_delta, uniq ()))) (feedback_state) }
				) (
				[ [ win_rule_as_first_bingo, img .play_to_win ]
				, [ [ win_rule_as_limit_time, L .normalize (L .modify ([ 'time_limit', L .valueOr (15) ]) (I)) ]
					, img .time_limit_play ]
				, [ win_rule_as_all_problems, img .free_play ] ]
				) (mark (app_settings_rules_win_rule_state)) ); }, { start: __div1_settings3_setting1_insert1, end: __div1_settings3_setting1_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  $ (counter_setting_view
				) (asset_view (img .text_time_limit)
				) (_time_limit => {
					var rules_delta = T (_time_limit) (L .get (L.inverse (data_iso (rules .rules) .time_limit)))
					;please (L_ .set (feedback .setup_rules (rules_delta, uniq ()))) (feedback_state) }
				) (
				[ [ L .is (10), img .ten_secs ]
				, [ L .is (20), img .twenty_secs ]
				, [ L .is (30), img .thirty_secs ] ]
				) (mark (app_settings_rules_time_limit_state)) ); }, { start: __div1_settings3_setting2_insert1, end: __div1_settings3_setting2_insert1 });
    Surplus.S.effect(function (__state) { return ( setup_preview )(__div1_button4, __state); });
    Surplus.S.effect(function (__state) { return ( feedback_start )(__div1_button5, __state); });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  L .get (chain_el (K (
			(function () {
    var __;
    __ = Surplus.createElement("div", null, null);
    Surplus.assign(__.style, { 'text-align': 'center' });
    __.textContent = "遊戲正在開始…";
    return __;
})() ) )
			) (
			mark (io_connecting_state) ) ); }, { start: __div1_insert6, end: __div1_insert6 });
    Surplus.S.effect(function () { __div2_settings1_setting1_img1.src =  three_by_three_img (equals (_size) (3)) ; });
    Surplus.S.effect(function (__state) { return ( feedback_size (3) )(__div2_settings1_setting1_img1, __state); });
    Surplus.S.effect(function () { __div2_settings1_setting2_img1.src =  four_by_four_img (equals (_size) (4)) ; });
    Surplus.S.effect(function (__state) { return ( feedback_size (4) )(__div2_settings1_setting2_img1, __state); });
    Surplus.S.effect(function () { __div2_settings1_setting3_img1.src =  five_by_five_img (equals (_size) (5)) ; });
    Surplus.S.effect(function (__state) { return ( feedback_size (5) )(__div2_settings1_setting3_img1, __state); });
    Surplus.S.effect(function () { __setting3_img1.src =  background_music_img (_background_music_on) ; });
    Surplus.S.effect(function () {
        Surplus.setAttribute(__setting3, "x-for", "background-music");
        Surplus.setAttribute(__setting3, "x-be",  on_off (_background_music_on) );
    });
    Surplus.S.effect(function (__state) { return ( toggle_background_music )(__setting3, __state); });
    return __;
})()
	: L_ .isDefined (mark (lookbehind_preview_questions_state))
	? (function () {
    var __, __title_etc1, __title_etc1_img1, __preview_questions_etc2, __preview_questions_etc2_button1, __preview_questions_etc2_button1_img1, __preview_questions_etc2_preview_questions2, __preview_questions_etc2_preview_questions2_labels1, __preview_questions_etc2_preview_questions2_labels1_question1, __preview_questions_etc2_preview_questions2_labels1_answer2, __preview_questions_etc2_preview_questions2_insert2, __setting3, __setting3_img1;
    __ = Surplus.createElement("setup-etc", null, null);
    __title_etc1 = Surplus.createElement("title-etc", null, __);
    __title_etc1_img1 = Surplus.createElement("img", null, __title_etc1);
    __title_etc1_img1.src =  img .logo ;
    __preview_questions_etc2 = Surplus.createElement("preview-questions-etc", null, __);
    __preview_questions_etc2_button1 = Surplus.createElement("button", null, __preview_questions_etc2);
    Surplus.setAttribute(__preview_questions_etc2_button1, "x-custom", "true");
    Surplus.setAttribute(__preview_questions_etc2_button1, "x-for", "back");
    __preview_questions_etc2_button1_img1 = Surplus.createElement("img", null, __preview_questions_etc2_button1);
    __preview_questions_etc2_button1_img1.src =  img .go_back ;
    __preview_questions_etc2_preview_questions2 = Surplus.createElement("preview-questions", null, __preview_questions_etc2);
    __preview_questions_etc2_preview_questions2_labels1 = Surplus.createElement("labels", null, __preview_questions_etc2_preview_questions2);
    __preview_questions_etc2_preview_questions2_labels1_question1 = Surplus.createElement("question", null, __preview_questions_etc2_preview_questions2_labels1);
    __preview_questions_etc2_preview_questions2_labels1_answer2 = Surplus.createElement("answer", null, __preview_questions_etc2_preview_questions2_labels1);
    __preview_questions_etc2_preview_questions2_insert2 = Surplus.createTextNode('', __preview_questions_etc2_preview_questions2)
    Surplus.createTextNode(" ", __preview_questions_etc2_preview_questions2)
    Surplus.createTextNode(" ", __preview_questions_etc2)
    __setting3 = Surplus.createElement("setting", null, __);
    __setting3_img1 = Surplus.createElement("img", null, __setting3);
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__state) { return ( preview_back )(__preview_questions_etc2_button1, __state); });
    Surplus.S.effect(function (__current) { return Surplus.content(__preview_questions_etc2_preview_questions2_labels1_question1,  text_asset_view (img .label_questions) , __current); }, '');
    Surplus.S.effect(function (__current) { return Surplus.content(__preview_questions_etc2_preview_questions2_labels1_answer2,  text_asset_view (img .label_answers) , __current); }, '');
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  L .collect (L .chain ((_problem, i) => so ((_=_=> K (
				(function () {
    var __, __question1, __question1_number1, __question1_img2, __answer2;
    __ = Surplus.createElement("problem", null, null);
    __question1 = Surplus.createElement("question", null, __);
    __question1_number1 = Surplus.createElement("number", null, __question1);
    Surplus.content(__question1_number1,  i + 1 , "");
    __question1_img2 = Surplus.createElement("img", null, __question1);
    __question1_img2.src =  question_image ;
    __answer2 = Surplus.createElement("answer", null, __);
    Surplus.content(__answer2,  answer , "");
    return __;
})() ),
				where
				, question_image = T (_problem) (L .get ([ problem_as_question, question_as_image ]))
				, answer = T (_problem) (L .get ([ problem_as_question, question_as_solution ])) )=>_)
				) (
				L .limit (_size * _size) (L .elems)
				) ) (
				mark (app_settings_problems_state)) ); }, { start: __preview_questions_etc2_preview_questions2_insert2, end: __preview_questions_etc2_preview_questions2_insert2 });
    Surplus.S.effect(function () { __setting3_img1.src =  background_music_img (_background_music_on) ; });
    Surplus.S.effect(function () {
        Surplus.setAttribute(__setting3, "x-for", "background-music");
        Surplus.setAttribute(__setting3, "x-be",  on_off (_background_music_on) );
    });
    Surplus.S.effect(function (__state) { return ( toggle_background_music )(__setting3, __state); });
    return __;
})()
	// MAJOR HACK
	: (please (L_ .set (lookbehind .nothing)) (lookbehind_state), []),
	where
	, _size = mark (app_settings_rules_size_state)
	, _background_music_on = mark (ambient_background_music_on_state)
	, three_by_three_img = points_ ([ [ true, img .three_by_three_on ], [ false, img .three_by_three_off ] ])
	, four_by_four_img = points_ ([ [ true, img .four_by_four_on ], [ false, img .four_by_four_off ] ])
	, five_by_five_img = points_ ([ [ true, img .five_by_five_on ], [ false, img .five_by_five_off ] ])
	, feedback_start = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (L_ .set (feedback .start (uniq ()))) (feedback_state) }) }) }
	, feedback_size = _size => _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				var rules_delta = T (_size) (L .get (L.inverse (data_iso (rules .rules) .size)))
				;please (L_ .set (feedback .setup_rules (rules_delta, uniq ()))) (feedback_state) }) }) }
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
	(function () {
    var __, __room1, __room1_insert1, __room1_insert2, __students_etc2, __students_etc2_label1, __students_etc2_label1_insert1, __students_etc2_label1_insert2, __students_etc2_students2, __students_etc2_students2_insert2, __insert3, __setting4, __setting4_img1;
    __ = Surplus.createElement("get-ready-etc", null, null);
    __room1 = Surplus.createElement("room", null, __);
    __room1_insert1 = Surplus.createTextNode('', __room1)
    __room1_insert2 = Surplus.createTextNode('', __room1)
    __students_etc2 = Surplus.createElement("students-etc", null, __);
    __students_etc2_label1 = Surplus.createElement("label", null, __students_etc2);
    __students_etc2_label1_insert1 = Surplus.createTextNode('', __students_etc2_label1)
    __students_etc2_label1_insert2 = Surplus.createTextNode('', __students_etc2_label1)
    __students_etc2_students2 = Surplus.createElement("students", null, __students_etc2);
    Surplus.createTextNode(" ", __students_etc2_students2)
    __students_etc2_students2_insert2 = Surplus.createTextNode('', __students_etc2_students2)
    Surplus.createTextNode(" ", __students_etc2_students2)
    Surplus.createTextNode(" ", __students_etc2)
    __insert3 = Surplus.createTextNode('', __)
    __setting4 = Surplus.createElement("setting", null, __);
    __setting4_img1 = Surplus.createElement("img", null, __setting4);
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  text_asset_view (img .text_room_number_is) ); }, { start: __room1_insert1, end: __room1_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  mark (app_room_state) ); }, { start: __room1_insert2, end: __room1_insert2 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  text_asset_view (img .text_number_of_students_is) ); }, { start: __students_etc2_label1_insert1, end: __students_etc2_label1_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  R .length (_students) ); }, { start: __students_etc2_label1_insert2, end: __students_etc2_label1_insert2 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  L .collect (L .chain (({ icon: _icon, name: _name }) => K (
				(function () {
    var __;
    __ = Surplus.createElement("student", null, null);
    Surplus.content(__,  _name , "");
    Surplus.S.effect(function () { Surplus.setAttribute(__, "x-icon", 
					!! L .isDefined (avatar_as_lion) (_icon) ? 'lion' : L .isDefined (avatar_as_bunny) (_icon) ? 'bunny' : panic ('...') ); });
    return __;
})() )
				) (
				[ L .elems, student_as_student ])) (_students) ); }, { start: __students_etc2_students2_insert2, end: __students_etc2_students2_insert2 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  L .get ([ L .elems, chain_el (K (
		(function () {
    var __, __img1;
    __ = Surplus.createElement("button", null, null);
    Surplus.setAttribute(__, "x-custom", true);
    Surplus.setAttribute(__, "x-for", "play");
    __img1 = Surplus.createElement("img", null, __);
    __img1.src =  img .play ;
    Surplus.S.effect(function (__state) { return ( feedback_play )(__, __state); });
    return __;
})() )) ]
		) (
		_students ) ); }, { start: __insert3, end: __insert3 });
    Surplus.S.effect(function () { __setting4_img1.src =  background_music_img (_background_music_on) ; });
    Surplus.S.effect(function () {
        Surplus.setAttribute(__setting4, "x-for", "background-music");
        Surplus.setAttribute(__setting4, "x-be",  on_off (_background_music_on) );
    });
    Surplus.S.effect(function (__state) { return ( toggle_background_music )(__setting4, __state); });
    return __;
})(),
	where
	, _students = mark (app_students_state) || []
	, _background_music_on = mark (ambient_background_music_on_state)
	, feedback_play = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (L_ .set (feedback .play (uniq ()))) (feedback_state) }) }) } 
	, toggle_background_music = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (not) (ambient_background_music_on_state) }) }) } )=>_)

var bingoes_view = so ((_=_=> _bingoes =>
	(function () {
    var __, __insert2;
    __ = Surplus.createElement("bingo", null, null);
    Surplus.createTextNode(" ", __)
    __insert2 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (_bingoes) (R .map (_pattern => 
		(function () {
    var __;
    __ = Surplus.createSvgElement("line", null, null);
    Surplus.S.effect(function () {
        Surplus.setAttribute(__, "x-shape",  pattern_shape (_pattern) );
        Surplus.assign(__.style,  line_pos (_pattern) );
    });
    return __;
})() )) ); }, { start: __insert2, end: __insert2 });
    return __;
})(),
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

var attrs_ = L .get (L .modify (L .values) (L .get (L .cond ([ I, K ('') ]))))

var students_view = _ =>
	(function () {
    var __, __insert2;
    __ = Surplus.createElement("students", null, null);
    Surplus.createTextNode(" ", __)
    __insert2 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  L .collect (L .chain (([ _student, [_board, _past] ]) => so ((_=_=> K (
		(function () {
    var __, __label1, __label1_name1, __board2, __board2_insert2, __board2_bingo3, __board2_bingo3_insert2;
    __ = Surplus.createElement("student-etc", null, null);
    __label1 = Surplus.createElement("label", null, __);
    Surplus.setAttribute(__label1, "x-icon",  _icon_attr );
    Surplus.spread(__label1,  _x_solved, false);
    __label1_name1 = Surplus.createElement("name", null, __label1);
    Surplus.content(__label1_name1,  _name , "");
    __board2 = Surplus.createElement("board", null, __);
    Surplus.spread(__board2,  _x_bingoed, false);
    Surplus.createTextNode(" ", __board2)
    __board2_insert2 = Surplus.createTextNode('', __board2)
    __board2_bingo3 = Surplus.createElement("bingo", null, __board2);
    Surplus.createTextNode(" ", __board2_bingo3)
    __board2_bingo3_insert2 = Surplus.createTextNode('', __board2_bingo3)
    Surplus.createTextNode(" ", __board2_bingo3)
    Surplus.createTextNode(" ", __board2)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (_board) (R .map (_row => 
				(function () {
    var __, __insert2;
    __ = Surplus.createElement("row", null, null);
    Surplus.createTextNode(" ", __)
    __insert2 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (_row) (R .map (_cell => so ((_=_=>
					!! _cell_solved ? (function () {
    var __;
    __ = Surplus.createElement("cell", null, null);
    Surplus.setAttribute(__, "x-solved", true);
    return __;
})()
					: Surplus.createElement('cell', null, null),
					where
					, _cell_position = T (_cell) (L .get (cell_as_position))
					, _cell_solved = R .includes (_cell_position) (_solved_positions) )=>_))) ); }, { start: __insert2, end: __insert2 });
    return __;
})() )) ); }, { start: __board2_insert2, end: __board2_insert2 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  bingoes_view (_bingoes) ); }, { start: __board2_bingo3_insert2, end: __board2_bingo3_insert2 });
    return __;
})() ),
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
		, _current_position = T (_past) (L .get ([ past_as_points, L .last, point_as_attempts, L .last, attempt_as_position ]))
		, _x_solved = attrs_ ({ 'x-solved': R .includes (_current_position) (_solved_positions) })
		, _bingoes = bingoes (_board) (_past)
		, _x_bingoed = attrs_ ({ 'x-bingoed': L .isDefined (L .elems) (_bingoes) }) )=>_)
		) (
		L .elems
		) ) (
		mark (app_students_map_boards_v_pasts_state) ) ); }, { start: __insert2, end: __insert2 });
    return __;
})()

var playing_view = _ => so ((_=_=>
	!! L_ .isDefined (mark (lookbehind_nothing_state))
	? (function () {
    var __, __title_etc1, __title_etc1_a_title1, __title_etc1_a_title1_img1, __title_etc1_problem_number2, __title_etc1_problem_number2_insert1, __title_etc1_problem_number2_insert2, __title_etc1_problem_number2_insert3, __problem_etc2, __problem_etc2_ticker_etc1, __problem_etc2_ticker_etc1_insert1, __problem_etc2_ticker_etc1_ticker2, __problem_etc2_ticker_etc1_ticker2_spinner1, __problem_etc2_question2, __problem_etc2_question2_insert1, __problem_etc2_question2_insert2, __options3, __options3_button1, __options3_button1_img1, __options3_button2, __options3_button2_img1, __setting4, __setting4_img1;
    __ = Surplus.createElement("playing-etc", null, null);
    __title_etc1 = Surplus.createElement("title-etc", null, __);
    __title_etc1_a_title1 = Surplus.createElement("a-title", null, __title_etc1);
    __title_etc1_a_title1_img1 = Surplus.createElement("img", null, __title_etc1_a_title1);
    __title_etc1_a_title1_img1.src =  img .logo ;
    __title_etc1_problem_number2 = Surplus.createElement("problem-number", null, __title_etc1);
    __title_etc1_problem_number2_insert1 = Surplus.createTextNode('', __title_etc1_problem_number2)
    __title_etc1_problem_number2_insert2 = Surplus.createTextNode('', __title_etc1_problem_number2)
    __title_etc1_problem_number2_insert3 = Surplus.createTextNode('', __title_etc1_problem_number2)
    Surplus.createTextNode(" ", __title_etc1)
    __problem_etc2 = Surplus.createElement("problem-etc", null, __);
    __problem_etc2_ticker_etc1 = Surplus.createElement("ticker-etc", null, __problem_etc2);
    __problem_etc2_ticker_etc1_insert1 = Surplus.createTextNode('', __problem_etc2_ticker_etc1)
    __problem_etc2_ticker_etc1_ticker2 = Surplus.createElement("ticker", null, __problem_etc2_ticker_etc1);
    Surplus.setAttribute(__problem_etc2_ticker_etc1_ticker2, "z-identity",  _problem_number );
    Surplus.assign(__problem_etc2_ticker_etc1_ticker2.style, { animationDuration: _time_limit + 's' });
    __problem_etc2_ticker_etc1_ticker2_spinner1 = Surplus.createElement("spinner", null, __problem_etc2_ticker_etc1_ticker2);
    Surplus.createTextNode(" ", __problem_etc2_ticker_etc1)
    __problem_etc2_question2 = Surplus.createElement("question", null, __problem_etc2);
    __problem_etc2_question2_insert1 = Surplus.createTextNode('', __problem_etc2_question2)
    __problem_etc2_question2_insert2 = Surplus.createTextNode('', __problem_etc2_question2)
    Surplus.createTextNode(" ", __problem_etc2_question2)
    Surplus.createTextNode(" ", __problem_etc2)
    __options3 = Surplus.createElement("options", null, __);
    __options3_button1 = Surplus.createElement("button", null, __options3);
    Surplus.setAttribute(__options3_button1, "x-custom", true);
    Surplus.setAttribute(__options3_button1, "x-for", "view-students");
    __options3_button1_img1 = Surplus.createElement("img", null, __options3_button1);
    __options3_button1_img1.src =  img .view_students ;
    __options3_button2 = Surplus.createElement("button", null, __options3);
    Surplus.setAttribute(__options3_button2, "x-custom", true);
    Surplus.setAttribute(__options3_button2, "x-for", "end-game");
    __options3_button2_img1 = Surplus.createElement("img", null, __options3_button2);
    __options3_button2_img1.src =  img .end_game ;
    Surplus.createTextNode(" ", __options3)
    __setting4 = Surplus.createElement("setting", null, __);
    __setting4_img1 = Surplus.createElement("img", null, __setting4);
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  text_asset_view (img .text_nth) ); }, { start: __title_etc1_problem_number2_insert1, end: __title_etc1_problem_number2_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  _problem_number ); }, { start: __title_etc1_problem_number2_insert2, end: __title_etc1_problem_number2_insert2 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  text_asset_view (img .text_problem) ); }, { start: __title_etc1_problem_number2_insert3, end: __title_etc1_problem_number2_insert3 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  L .get (chain_el (_t =>
				_time_limit - _t )) (clock ()) ); }, { start: __problem_etc2_ticker_etc1_insert1, end: __problem_etc2_ticker_etc1_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  L .get ([ question_as_text, chain_el (_question_text =>
				_question_text ) ]) (_question) ); }, { start: __problem_etc2_question2_insert1, end: __problem_etc2_question2_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  L .get ([ question_as_image, chain_el (_question_image =>
				(function () {
    var __;
    __ = Surplus.createElement("img", null, null);
    __.src =  _question_image ;
    return __;
})() ) ]) (_question) ); }, { start: __problem_etc2_question2_insert2, end: __problem_etc2_question2_insert2 });
    Surplus.S.effect(function (__state) { return ( view_students )(__options3_button1, __state); });
    Surplus.S.effect(function (__state) { return ( consider_end )(__options3_button2, __state); });
    Surplus.S.effect(function () { __setting4_img1.src =  background_music_img (_background_music_on) ; });
    Surplus.S.effect(function () {
        Surplus.setAttribute(__setting4, "x-for", "background-music");
        Surplus.setAttribute(__setting4, "x-be",  on_off (_background_music_on) );
    });
    Surplus.S.effect(function (__state) { return ( toggle_background_music )(__setting4, __state); });
    return __;
})()
	: L_ .isDefined (mark (lookbehind_view_students_state))
	? (function () {
    var __, __title_etc1, __title_etc1_a_title1, __title_etc1_a_title1_img1, __title_etc1_problem_number2, __title_etc1_problem_number2_insert1, __title_etc1_problem_number2_insert2, __title_etc1_problem_number2_insert3, __insert2, __options3, __options3_button1, __options3_button1_img1, __options3_button2, __options3_button2_img1, __setting4, __setting4_img1;
    __ = Surplus.createElement("playing-etc", null, null);
    __title_etc1 = Surplus.createElement("title-etc", null, __);
    __title_etc1_a_title1 = Surplus.createElement("a-title", null, __title_etc1);
    __title_etc1_a_title1_img1 = Surplus.createElement("img", null, __title_etc1_a_title1);
    __title_etc1_a_title1_img1.src =  img .logo ;
    __title_etc1_problem_number2 = Surplus.createElement("problem-number", null, __title_etc1);
    __title_etc1_problem_number2_insert1 = Surplus.createTextNode('', __title_etc1_problem_number2)
    __title_etc1_problem_number2_insert2 = Surplus.createTextNode('', __title_etc1_problem_number2)
    __title_etc1_problem_number2_insert3 = Surplus.createTextNode('', __title_etc1_problem_number2)
    Surplus.createTextNode(" ", __title_etc1)
    __insert2 = Surplus.createTextNode('', __)
    __options3 = Surplus.createElement("options", null, __);
    __options3_button1 = Surplus.createElement("button", null, __options3);
    Surplus.setAttribute(__options3_button1, "x-custom", true);
    Surplus.setAttribute(__options3_button1, "x-for", "show-problem");
    __options3_button1_img1 = Surplus.createElement("img", null, __options3_button1);
    __options3_button1_img1.src =  img .show_problem ;
    __options3_button2 = Surplus.createElement("button", null, __options3);
    Surplus.setAttribute(__options3_button2, "x-custom", true);
    Surplus.setAttribute(__options3_button2, "x-for", "end-game");
    __options3_button2_img1 = Surplus.createElement("img", null, __options3_button2);
    __options3_button2_img1.src =  img .end_game ;
    Surplus.createTextNode(" ", __options3)
    __setting4 = Surplus.createElement("setting", null, __);
    __setting4_img1 = Surplus.createElement("img", null, __setting4);
    Surplus.createTextNode(" ", __setting4)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  text_asset_view (img .text_nth) ); }, { start: __title_etc1_problem_number2_insert1, end: __title_etc1_problem_number2_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  _problem_number ); }, { start: __title_etc1_problem_number2_insert2, end: __title_etc1_problem_number2_insert2 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  text_asset_view (img .text_problem) ); }, { start: __title_etc1_problem_number2_insert3, end: __title_etc1_problem_number2_insert3 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  students_view ); }, { start: __insert2, end: __insert2 });
    Surplus.S.effect(function (__state) { return ( show_problem )(__options3_button1, __state); });
    Surplus.S.effect(function (__state) { return ( consider_end )(__options3_button2, __state); });
    Surplus.S.effect(function () { __setting4_img1.src =  background_music_img (_background_music_on) ; });
    Surplus.S.effect(function () {
        Surplus.setAttribute(__setting4, "x-for", "background-music");
        Surplus.setAttribute(__setting4, "x-be",  on_off (_background_music_on) );
    });
    Surplus.S.effect(function (__state) { return ( toggle_background_music )(__setting4, __state); });
    return __;
})()
	: L_ .isDefined (mark (lookbehind_consider_end_state))
	? (function () {
    var __, __abort_etc1, __abort_etc1_div1, __abort_etc1_div1_label1, __abort_etc1_div1_options2, __abort_etc1_div1_options2_button1, __abort_etc1_div1_options2_button1_img1, __abort_etc1_div1_options2_button2, __abort_etc1_div1_options2_button2_img1;
    __ = Surplus.createElement("playing-etc", null, null);
    __abort_etc1 = Surplus.createElement("abort-etc", null, __);
    __abort_etc1_div1 = Surplus.createElement("div", "box", __abort_etc1);
    __abort_etc1_div1_label1 = Surplus.createElement("label", null, __abort_etc1_div1);
    __abort_etc1_div1_label1.textContent = "結束遊戲？";
    __abort_etc1_div1_options2 = Surplus.createElement("options", null, __abort_etc1_div1);
    __abort_etc1_div1_options2_button1 = Surplus.createElement("button", null, __abort_etc1_div1_options2);
    Surplus.setAttribute(__abort_etc1_div1_options2_button1, "x-custom", true);
    Surplus.setAttribute(__abort_etc1_div1_options2_button1, "x-for", "confirm");
    __abort_etc1_div1_options2_button1_img1 = Surplus.createElement("img", null, __abort_etc1_div1_options2_button1);
    __abort_etc1_div1_options2_button1_img1.src =  img .confirm ;
    __abort_etc1_div1_options2_button2 = Surplus.createElement("button", null, __abort_etc1_div1_options2);
    Surplus.setAttribute(__abort_etc1_div1_options2_button2, "x-custom", true);
    Surplus.setAttribute(__abort_etc1_div1_options2_button2, "x-for", "show-problem");
    __abort_etc1_div1_options2_button2_img1 = Surplus.createElement("img", null, __abort_etc1_div1_options2_button2);
    __abort_etc1_div1_options2_button2_img1.src =  img .cancel ;
    Surplus.S.effect(function (__state) { return ( confirm_end )(__abort_etc1_div1_options2_button1, __state); });
    Surplus.S.effect(function (__state) { return ( show_problem )(__abort_etc1_div1_options2_button2, __state); });
    return __;
})()
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
				;please (L_ .set (feedback .end (uniq ()))) (feedback_state) })})}  
	, toggle_background_music = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (not) (ambient_background_music_on_state) }) }) } )=>_)
		

var show_unit = _x => !! (not (equals (0) (_x)) && ! _x) ? '-' :  _x .toFixed (2) * 1
var show_time = _x => !! (not (equals (0) (_x)) && ! _x) ?  '-' : _x .toFixed (2) * 1 + '秒'

var students_analysis_view = so ((_=_=>
	_ordering =>
		(function () {
    var __, __labels1, __labels1_name1, __labels1_name1_insert1, __labels1_name1_img2, __labels1_number_of_solved2, __labels1_number_of_solved2_insert1, __labels1_number_of_solved2_img2, __labels1_number_of_bingoes3, __labels1_number_of_bingoes3_insert1, __labels1_number_of_bingoes3_img2, __labels1_average_solved_time4, __labels1_average_solved_time4_insert1, __labels1_average_solved_time4_img2, __students_analysis2, __students_analysis2_insert2;
    __ = Surplus.createElement("students-analysis-etc", null, null);
    __labels1 = Surplus.createElement("labels", null, __);
    __labels1_name1 = Surplus.createElement("name", null, __labels1);
    __labels1_name1_insert1 = Surplus.createTextNode('', __labels1_name1)
    __labels1_name1_img2 = Surplus.createElement("img", null, __labels1_name1);
    __labels1_name1_img2.src =  img .toggle_ordering ;
    __labels1_number_of_solved2 = Surplus.createElement("number-of-solved", null, __labels1);
    __labels1_number_of_solved2_insert1 = Surplus.createTextNode('', __labels1_number_of_solved2)
    __labels1_number_of_solved2_img2 = Surplus.createElement("img", null, __labels1_number_of_solved2);
    __labels1_number_of_solved2_img2.src =  img .toggle_ordering ;
    __labels1_number_of_bingoes3 = Surplus.createElement("number-of-bingoes", null, __labels1);
    __labels1_number_of_bingoes3_insert1 = Surplus.createTextNode('', __labels1_number_of_bingoes3)
    __labels1_number_of_bingoes3_img2 = Surplus.createElement("img", null, __labels1_number_of_bingoes3);
    __labels1_number_of_bingoes3_img2.src =  img .toggle_ordering ;
    __labels1_average_solved_time4 = Surplus.createElement("average-solved-time", null, __labels1);
    __labels1_average_solved_time4_insert1 = Surplus.createTextNode('', __labels1_average_solved_time4)
    __labels1_average_solved_time4_img2 = Surplus.createElement("img", null, __labels1_average_solved_time4);
    __labels1_average_solved_time4_img2.src =  img .toggle_ordering ;
    Surplus.createTextNode(" ", __labels1)
    __students_analysis2 = Surplus.createElement("students-analysis", null, __);
    Surplus.createTextNode(" ", __students_analysis2)
    __students_analysis2_insert2 = Surplus.createTextNode('', __students_analysis2)
    Surplus.createTextNode(" ", __students_analysis2)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  asset_view (img .text_name) ); }, { start: __labels1_name1_insert1, end: __labels1_name1_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  asset_view (img .text_number_of_solved) ); }, { start: __labels1_number_of_solved2_insert1, end: __labels1_number_of_solved2_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  asset_view (img .text_bingo) ); }, { start: __labels1_number_of_bingoes3_insert1, end: __labels1_number_of_bingoes3_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  asset_view (img .text_average_solved_time) ); }, { start: __labels1_average_solved_time4_insert1, end: __labels1_average_solved_time4_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  L .collect (L .chain (({ _name, _number_of_solved, _number_of_bingoes, _average_solved_time }) => K (
				(function () {
    var __, __name1, __number_of_solved2, __number_of_bingoes3, __average_solved_time4;
    __ = Surplus.createElement("student", null, null);
    __name1 = Surplus.createElement("name", null, __);
    Surplus.content(__name1,  _name , "");
    __number_of_solved2 = Surplus.createElement("number-of-solved", null, __);
    Surplus.content(__number_of_solved2,  _number_of_solved , "");
    __number_of_bingoes3 = Surplus.createElement("number-of-bingoes", null, __);
    Surplus.content(__number_of_bingoes3,  _number_of_bingoes , "");
    __average_solved_time4 = Surplus.createElement("average-solved-time", null, __);
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__current) { return Surplus.content(__average_solved_time4,  show_time (_average_solved_time) , __current); }, '');
    return __;
})() )
				) (
				[ order_sort (_ordering), L .elems ]
				) ) (
				analyse_students (mark (app_students_map_boards_v_pasts_state))) ); }, { start: __students_analysis2_insert2, end: __students_analysis2_insert2 });
    return __;
})(),
	where
	, analyse_students = by (_students_map_boards_v_pasts =>
		L .collect ([ L .elems, ([ _student, [_board, _past] ]) => (
			{ _name: T (_student) (L .get (student_as_name))
			, _number_of_solved: T (_past) (L .count ([ past_as_points, L .elems, as_solved_on (_board) ]))
			, _number_of_bingoes: T (bingoes (_board) (_past)) (L .count ([ L .elems ]))
			, _average_solved_time: T (_past) (L .mean ([ past_as_points, L .elems, as_solved_on (_board), point_as_attempts, L .last, attempt_as_latency ])) }) ]) ) )=>_)

var problems_analysis_view = so ((_=_=>
	_ordering => so ((_=_=>
		(function () {
    var __, __labels1, __labels1_question1, __labels1_question1_insert1, __labels1_question1_img2, __labels1_number_of_solvers2, __labels1_number_of_solvers2_insert1, __labels1_number_of_solvers2_img2, __labels1_average_number_of_attempts3, __labels1_average_number_of_attempts3_insert1, __labels1_average_number_of_attempts3_img2, __labels1_average_solved_time4, __labels1_average_solved_time4_insert1, __labels1_average_solved_time4_img2, __problems_analysis2, __problems_analysis2_insert2;
    __ = Surplus.createElement("problems-analysis-etc", null, null);
    __labels1 = Surplus.createElement("labels", null, __);
    __labels1_question1 = Surplus.createElement("question", null, __labels1);
    __labels1_question1_insert1 = Surplus.createTextNode('', __labels1_question1)
    __labels1_question1_img2 = Surplus.createElement("img", null, __labels1_question1);
    __labels1_question1_img2.src =  img .toggle_ordering ;
    __labels1_number_of_solvers2 = Surplus.createElement("number-of-solvers", null, __labels1);
    __labels1_number_of_solvers2_insert1 = Surplus.createTextNode('', __labels1_number_of_solvers2)
    __labels1_number_of_solvers2_img2 = Surplus.createElement("img", null, __labels1_number_of_solvers2);
    __labels1_number_of_solvers2_img2.src =  img .toggle_ordering ;
    __labels1_average_number_of_attempts3 = Surplus.createElement("average-number-of-attempts", null, __labels1);
    __labels1_average_number_of_attempts3_insert1 = Surplus.createTextNode('', __labels1_average_number_of_attempts3)
    __labels1_average_number_of_attempts3_img2 = Surplus.createElement("img", null, __labels1_average_number_of_attempts3);
    __labels1_average_number_of_attempts3_img2.src =  img .toggle_ordering ;
    __labels1_average_solved_time4 = Surplus.createElement("average-solved-time", null, __labels1);
    __labels1_average_solved_time4_insert1 = Surplus.createTextNode('', __labels1_average_solved_time4)
    __labels1_average_solved_time4_img2 = Surplus.createElement("img", null, __labels1_average_solved_time4);
    __labels1_average_solved_time4_img2.src =  img .toggle_ordering ;
    Surplus.createTextNode(" ", __labels1)
    __problems_analysis2 = Surplus.createElement("problems-analysis", null, __);
    Surplus.createTextNode(" ", __problems_analysis2)
    __problems_analysis2_insert2 = Surplus.createTextNode('', __problems_analysis2)
    Surplus.createTextNode(" ", __problems_analysis2)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  asset_view (img .text_question) ); }, { start: __labels1_question1_insert1, end: __labels1_question1_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  asset_view (img .text_number_of_solvers) ); }, { start: __labels1_number_of_solvers2_insert1, end: __labels1_number_of_solvers2_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  asset_view (img .text_average_number_of_attempts) ); }, { start: __labels1_average_number_of_attempts3_insert1, end: __labels1_average_number_of_attempts3_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  asset_view (img .text_average_solved_time) ); }, { start: __labels1_average_solved_time4_insert1, end: __labels1_average_solved_time4_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  L .collect (L .chain (({ _question, _number_of_solvers, _average_number_of_attempts, _average_solved_time }) => K (
				(function () {
    var __, __question1, __question1_img1, __number_of_solvers2, __average_number_of_attempts3, __average_solved_time4;
    __ = Surplus.createElement("problem", null, null);
    __question1 = Surplus.createElement("question", null, __);
    __question1_img1 = Surplus.createElement("img", null, __question1);
    __question1_img1.src =  _question ;
    __number_of_solvers2 = Surplus.createElement("number-of-solvers", null, __);
    Surplus.content(__number_of_solvers2,  _number_of_solvers , "");
    __average_number_of_attempts3 = Surplus.createElement("average-number-of-attempts", null, __);
    __average_solved_time4 = Surplus.createElement("average-solved-time", null, __);
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__current) { return Surplus.content(__average_number_of_attempts3,  show_unit (_average_number_of_attempts) , __current); }, '');
    Surplus.S.effect(function (__current) { return Surplus.content(__average_solved_time4,  show_time (_average_solved_time) , __current); }, '');
    return __;
})() )
				) (
				[ order_sort (_ordering), L .elems ]
				) ) (
				analyse_problems (mark (app_students_map_boards_v_pasts_state)) (_problems) ) ); }, { start: __problems_analysis2_insert2, end: __problems_analysis2_insert2 });
    return __;
})(),
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
	(function () {
    var __, __title_etc1, __title_etc1_a_title1, __title_etc1_a_title1_img1, __options2, __options2_button1, __options2_button1_img1, __options2_button2, __options2_button2_img1, __options2_button3, __options2_button3_img1, __insert3, __options4, __options4_button1, __options4_button1_img1, __setting5, __setting5_img1;
    __ = Surplus.createElement("game-over-etc", null, null);
    __title_etc1 = Surplus.createElement("title-etc", null, __);
    __title_etc1_a_title1 = Surplus.createElement("a-title", null, __title_etc1);
    __title_etc1_a_title1_img1 = Surplus.createElement("img", null, __title_etc1_a_title1);
    __title_etc1_a_title1_img1.src =  img .logo ;
    Surplus.createTextNode(" ", __title_etc1)
    __options2 = Surplus.createElement("options", null, __);
    Surplus.setAttribute(__options2, "x-for", "tabs");
    __options2_button1 = Surplus.createElement("button", null, __options2);
    Surplus.setAttribute(__options2_button1, "x-custom", true);
    Surplus.setAttribute(__options2_button1, "x-for", "show-results");
    __options2_button1_img1 = Surplus.createElement("img", null, __options2_button1);
    __options2_button2 = Surplus.createElement("button", null, __options2);
    Surplus.setAttribute(__options2_button2, "x-custom", true);
    Surplus.setAttribute(__options2_button2, "x-for", "students-analysis");
    __options2_button2_img1 = Surplus.createElement("img", null, __options2_button2);
    __options2_button3 = Surplus.createElement("button", null, __options2);
    Surplus.setAttribute(__options2_button3, "x-custom", true);
    Surplus.setAttribute(__options2_button3, "x-for", "problems-analysis");
    __options2_button3_img1 = Surplus.createElement("img", null, __options2_button3);
    Surplus.createTextNode(" ", __options2)
    __insert3 = Surplus.createTextNode('', __)
    __options4 = Surplus.createElement("options", null, __);
    Surplus.setAttribute(__options4, "x-for", "options");
    __options4_button1 = Surplus.createElement("button", null, __options4);
    Surplus.setAttribute(__options4_button1, "x-custom", true);
    Surplus.setAttribute(__options4_button1, "x-for", "play-again");
    __options4_button1_img1 = Surplus.createElement("img", null, __options4_button1);
    __options4_button1_img1.src =  img .play_again ;
    Surplus.createTextNode(" ", __options4)
    __setting5 = Surplus.createElement("setting", null, __);
    __setting5_img1 = Surplus.createElement("img", null, __setting5);
    Surplus.createTextNode(" ", __setting5)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function () { __options2_button1_img1.src =  !! L_ .isDefined (mark (lookbehind_show_results_state)) ? img .show_results_on : img .show_results_off ; });
    Surplus.S.effect(function (__state) { return ( show_results )(__options2_button1, __state); });
    Surplus.S.effect(function () { __options2_button2_img1.src =  !! L_ .isDefined (mark (lookbehind_students_analysis_state)) ? img .students_analysis_on : img .students_analysis_off ; });
    Surplus.S.effect(function (__state) { return ( students_analysis )(__options2_button2, __state); });
    Surplus.S.effect(function () { __options2_button3_img1.src =  !! L_ .isDefined (mark (lookbehind_problems_analysis_state)) ? img .problems_analysis_on : img .problems_analysis_off ; });
    Surplus.S.effect(function (__state) { return ( problems_analysis )(__options2_button3, __state); });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  !! L_ .isDefined (mark (lookbehind_show_results_state))
			? students_view 
			: L_ .isDefined (mark (lookbehind_students_analysis_state))
			? students_analysis_view (mark (lookbehind_ordering_state))
			: L_ .isDefined (mark (lookbehind_problems_analysis_state))
			? problems_analysis_view (mark (lookbehind_ordering_state))
			// MAJOR HACK
			: (please (L_ .set (lookbehind .show_results)) (lookbehind_state), []) ); }, { start: __insert3, end: __insert3 });
    Surplus.S.effect(function (__state) { return ( play_again )(__options4_button1, __state); });
    Surplus.S.effect(function () { __setting5_img1.src =  background_music_img (_background_music_on) ; });
    Surplus.S.effect(function () {
        Surplus.setAttribute(__setting5, "x-for", "background-music");
        Surplus.setAttribute(__setting5, "x-be",  on_off (_background_music_on) );
    });
    Surplus.S.effect(function (__state) { return ( toggle_background_music )(__setting5, __state); });
    return __;
})(),
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
				;please (L_ .set (feedback .reset (uniq ()))) (feedback_state) })})}  
	, toggle_background_music = _dom => {
		;clicking .forEach (click => {
			;_dom .addEventListener (click, _ => {
				;please (not) (ambient_background_music_on_state) }) }) } )=>_) 


S .root (die => {
	;window .die = { ... (window .die || {}), view: die }
	;window .view = (function () {
    var __, __insert1;
    __ = Surplus.createElement("teacher-app", null, null);
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
		: panic ('undefined app state in view')  ); }, { start: __insert1, end: __insert1 });
    return __;
})() })
												 
												 
												 
												 
												 
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
		.then (panic_on ([ [ L .isDefined (L .leafs), _room + ' taken'] ])) )
	// RACE CONDITION
	.then (_ => so ((_=_=>
		api (_room, _create_message)
		.then (panic_on ([
			[ L .get ([ 'ok', L .complement ]), 'cannot post to ' + _room ] ])),
		where
		, _problems = T (_settings) (L .get (settings_as_problems))
		, _rules = T (_settings) (L .get (settings_as_rules ))
		, _create_message = message .teacher_settings (settings .settings (_problems, _rules)) )=>_) )
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
		api (_room, playing_message)
		.then (panic_on ([
			[ L .get ([ 'ok', L .complement ]), 'cannot post to ' + _room ] ]) ),
		where
		, playing_message = message .teacher_progress ([ 0, schedule_start (show (ensemble_state)) ]) )=>_) )
	.catch (_e => {
		;console .error (_e) })
	.then (_ => {
		;please (L_ .set (io .inert)) (io_state) }) ) )

var broadcast_progress = impure (_progress =>
	go
	.then (_ => {
		;please (L_ .set (io .messaging)) (io_state) })
	.then (_ => so ((_=_=>
		api (_room, progress_message)
		.then (panic_on ([
			[ L .get ([ 'ok', L .is (false) ]), 'cannot post to ' + _room ] ]) ),
		where
		, _room = show (app_room_state)
		, progress_message = message .teacher_progress (_progress) )=>_) )
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
		api (_room, progress_message)
		.then (panic_on ([
			[ L .get ([ 'ok', L .is (false) ]), 'cannot post to ' + _room ] ]) ),
		where
		, _room = show (app_room_state)
		, progress_message = message .teacher_progress ([ -1, + (new Date) ]) )=>_) )
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
		, _room => api .ping (_room) ()
		, L .when (I)
		, ([ mean, variance, n, timestamp ]) => 
			[ timestamp, mean, Math .sqrt (variance) ] ] ) ) ) ) )



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
			;play (audio .background) }
		else {
			;pause (audio .background) } })





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

	;S (([ last_app_settings_rules_size, last_app_setup ]) => {
		if (! L_ .isDefined (last_app_setup)) {
			if (L_ .isDefined (mark (app_setup_state))) {
				;please (shuffle) (app_settings_problems_state) } }

		if (not (equals (last_app_settings_rules_size) (mark (app_settings_rules_size_state)))) {
			;please (shuffle) (app_settings_problems_state) } 

		return [ mark (app_settings_rules_size_state), mark (app_setup_state) ] }
	, [ undefined, undefined])

	;S (_ => {
		if (L_ .isDefined (mark (app_get_ready_state))
		|| L_ .isDefined (mark (app_playing_state))
		|| L_ .isDefined (mark (app_game_over_state))) {
			var _ensemble_students = T (mark (ensemble_pings_state)) (L .collect ([ L .elems, map_v_as_key ]))
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
			var _ensemble_boards = T (mark (ensemble_boards_state)) (L .collect (L .elems))
			var _ensemble_pasts = T (mark (ensemble_pasts_state)) (L .collect (L .elems))
			;please (L_ .set (_ensemble_boards)) (app_boards_state)
			;please (L_ .set (_ensemble_pasts)) (app_pasts_state) } })

	;S (last_bingoes => {
		if (L_ .isDefined (mark (app_students_map_boards_v_pasts_state))) {
			var _bingoes =
				T (mark (app_students_map_boards_v_pasts_state)
				) (
				L .collect ([ L .elems, map_v_as_value, ([_board, _past]) => bingoes (_board) (_past), L .elems ]))
			if (L .isDefined ([ L .elems, L .unless (L .get ([ L .valueOr ([]), $ (R .flip (R .includes)) ]) (last_bingoes)) ]) (bingoes)) {
				;play (audio .teacher_bingo) }
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
						;end_game () } } }
			else if (equals (win_rule .limit_time) (_win_rule)) {
				if (L_ .isDefined (mark (app_playing_state))) {
//	Math .floor ((S .sample (time) - T (show (app_progress_state)) (L .get (progress_as_timestamp))) / 1000)				 
					if (! last_app_has_bingoes_ok && app_has_bingoes_ok) {
						;setTimeout (_=>{;end_game ()}, 8000) } } }
			else if (equals (win_rule .all_problems) (_win_rule)) { }

			return app_has_bingoes_ok } })

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
					api (_room, ping_message),
					where
					, ping_message = message .teacher_ping (S .sample (connection)) )=>_))
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
				;please (L_ .set (io .inert)) (io_state) }) ) ]) ) ) })

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22file%22%3A%22out.js%22%2C%22sources%22%3A%5B%22in.js%22%5D%2C%22sourcesContent%22%3A%5B%22var%20%7B%20T%2C%20%24%2C%20apply%2C%20L%2C%20L_%2C%20R%2C%20S%2C%20Z%2C%20Z_%2C%20Z%24%2C%20sanc%2C%20memoize%2C%20%5Cnfaith%2C%20belief%2C%20show%2C%20mark%2C%20please%2C%20%5CnY%2C%20impure%2C%20jinx%2C%20suppose%2C%5Cnso%2C%20by%2C%20%5Cngo%2C%20never%2C%20panic%2C%20panic_on%2C%5Cnjust_now%2C%20temporal%2C%5Cnfiat%2C%20data%2C%20data_lens%2C%20data_iso%2C%20data_kind%2C%5Cnfocused_iso_%2C%5Cnlast_n%2C%20n_reducer%2C%20l_sum%2C%20l_point_sum%2C%20pinpoint%2C%5Cnmap_defined_%2C%20map_defined%2C%20from_just%2C%20%5Cnas_sole%2C%20sole%2C%20shuffle%2C%5CnI%2C%20K%2C%20not%2C%20equals%2C%5Cnuniq%2C%20bool%2C%20number%2C%20timestamp%2C%20string%2C%5Cnlist%2C%20map%2C%20maybe%2C%20nat%2C%20id%2C%20v%2C%20piece%2C%20order%2C%5Cnorder_sort%2C%20direction_opposite%2C%20toggle_order%2C%20%5Cnshuffle%2C%20uuid%2C%20map_zip%2C%20chain_el%2C%20api%2C%5Cntimer%2C%20timer_since%2C%20time_intervals%2C%20%5Cnavatar%2C%20student%2C%20problem%2C%20choice%2C%20latency%2C%20ping%2C%20position%2C%5Cnattempt%2C%20point%2C%20past%2C%20board%2C%20win_rule%2C%20rules%2C%20settings%2C%5Cnteacher_app%2C%20student_app%2C%5Cnio%2C%20message%2C%20ensemble%2C%20%5Cndefault_problems%2C%20default_rules%2C%20default_settings%2C%5Cnmap_v_as_key%2C%20map_v_as_value%2C%20as_value_of%2C%5Cnas_complete%2C%20complete_%2C%5Cnapp_as_setup%2C%20app_as_get_ready%2C%20app_as_playing%2C%20app_as_game_over%2C%20app_as_progress%2C%5Cnsettings_as_problems%2C%20settings_as_rules%2C%5Cnsettings_as_size%2C%20settings_as_time_limit%2C%20settings_as_win_rule%2C%5Cnio_as_inert%2C%20io_as_connecting%2C%20io_as_heartbeat%2C%5Cnensemble_as_ping%2C%20ensemble_as_settings%2C%20ensemble_as_progress%2C%20%5Cnensemble_as_pings%2C%20ensemble_as_boards%2C%20ensemble_as_pasts%2C%5Cnprogress_as_step%2C%20progress_as_timestamp%2C%20%5Cnquestion_as_text%2C%20question_as_image%2C%20question_as_solution%2C%20%5Cnattempt_as_position%2C%20attempt_as_latency%2C%20point_as_problem%2C%20point_as_attempts%2C%20point_as_position%2C%20past_as_points%2C%5Cnapp_as_settings%2C%20app_as_student%2C%20app_as_students%2C%20app_as_room%2C%20app_as_problems%2C%5Cnapp_as_board%2C%20app_as_past%2C%20app_as_progress%2C%5Cnapp_as_boards%2C%20app_as_pasts%2C%20%5Cnapp_as_last_point%2C%20point_as_attempts%2C%5Cnavatar_as_lion%2C%20avatar_as_bunny%2C%20%5Cnwin_rule_as_first_bingo%2C%20win_rule_as_limit_time%2C%20win_rule_as_all_problems%2C%20win_rule_as_time_limit%2C%5Cnstudent_as_student%2C%20student_as_id%2C%20student_as_name%2C%20student_as_icon%2C%20%5Cnrules_as_size%2C%20rules_as_time_limit%2C%20rules_as_win_rule%2C%20settings_as_size%2C%20settings_as_time_limit%2C%5Cnproblem_as_question%2C%20problem_as_answers%2C%5Cncell_as_position%2C%20as_position%2C%20cell_as_choice%2C%20%5Cnschedule_start%2C%5Cnteacher_app_get_ready_to_playing%2C%20teacher_app_playing_to_next%2C%20teacher_app_playing_to_game_over%2C%5Cnstudent_app_setup_to_get_ready%2C%20student_app_get_ready_to_playing%2C%20student_app_playing_to_next%2C%20student_app_playing_to_game_over%2C%5Cnboard_choice%2C%20current_problem%2C%20current_problem_completed%2C%20problem_choice_matches%2C%5Cnlocal_patterns%2C%20size_patterns%2C%5Cnas_solved_on%2C%20attempted_positions%2C%20solved_positions%2C%20bingoed_positions%2C%20bingoes%2C%5Cnclicking%2C%20play%2C%20pause%2C%20audio%2C%20img%5Cn%7D%20%3D%20window%20.stuff%5Cn%5Cn%5Cn%2F%2F%20interactive%20datas%5Cn%5Cnvar%20feedback%20%3D%20data%20(%7B%5Cn%5Ctstart%3A%20(uniq%20%3D~%20uniq)%20%3D%3E%20feedback%2C%5Cn%5Ctsetup_rules%3A%20(rules_piece%20%3D~%20piece%20(settings)%2C%20uniq%20%3D~%20uniq)%20%3D%3E%20feedback%2C%5Cn%5Ctplay%3A%20(uniq%20%3D~%20uniq)%20%3D%3E%20feedback%2C%5Cn%5Ctend%3A%20(uniq%20%3D~%20uniq)%20%3D%3E%20feedback%2C%5Cn%5Ctreset%3A%20(uniq%20%3D~%20uniq)%20%3D%3E%20feedback%20%7D)%5Cn%5Cnvar%20lookbehind%20%3D%20data%20(%7B%5Cn%5Ctnothing%3A%20()%20%3D%3E%20lookbehind%2C%5Cn%5Ctpreview_questions%3A%20()%20%3D%3E%20lookbehind%2C%5Cn%5Ctview_students%3A%20()%20%3D%3E%20lookbehind%2C%5Cn%5Ctconsider_end%3A%20()%20%3D%3E%20lookbehind%2C%5Cn%5Ctshow_results%3A%20()%20%3D%3E%20lookbehind%2C%5Cn%5Ctstudents_analysis%3A%20(ordering%20%3D~%20order%20(%5B%20'name'%2C%20'number_of_solved'%2C%20'number_of_bingoes'%2C%20'average_solved_time'%20%5D))%20%3D%3E%20lookbehind%2C%5Cn%5Ctproblems_analysis%3A%20(ordering%20%3D~%20order%20(%5B%20'question'%2C%20'number_of_solvers'%2C%20'average_number_of_attempts'%2C%20'average_solved_time'%20%5D))%20%3D%3E%20lookbehind%20%7D)%5Cn%5Cnvar%20ambient%20%3D%20data%20(%7B%5Cn%5Ctambient%3A%20(%20background_music_on%20%3D~%20bool%20)%20%3D%3E%20ambient%20%7D)%5Cn%5Cnvar%20feedback_as_start%20%3D%20data_iso%20(feedback%20.start)%5Cnvar%20feedback_as_setup_rules%20%3D%20data_iso%20(feedback%20.setup_rules)%5Cnvar%20feedback_as_play%20%3D%20data_iso%20(feedback%20.play)%5Cnvar%20feedback_as_end%20%3D%20data_iso%20(feedback%20.end)%5Cnvar%20feedback_as_reset%20%3D%20data_iso%20(feedback%20.reset)%5Cn%5Cnvar%20feedback_as_rules_piece%20%3D%20data_lens%20(feedback%20.setup_rules)%20.rules_piece%5Cn%5Cnvar%20lookbehind_as_nothing%20%3D%20data_iso%20(lookbehind%20.nothing)%5Cnvar%20lookbehind_as_preview_questions%20%3D%20data_iso%20(lookbehind%20.preview_questions)%5Cnvar%20lookbehind_as_view_students%20%3D%20data_iso%20(lookbehind%20.view_students)%5Cnvar%20lookbehind_as_consider_end%20%3D%20data_iso%20(lookbehind%20.consider_end)%5Cnvar%20lookbehind_as_show_results%20%3D%20data_iso%20(lookbehind%20.show_results)%5Cnvar%20lookbehind_as_students_analysis%20%3D%20data_iso%20(lookbehind%20.students_analysis)%5Cnvar%20lookbehind_as_problems_analysis%20%3D%20data_iso%20(lookbehind%20.problems_analysis)%5Cn%5Cnvar%20lookbehind_as_ordering%20%3D%20L%20.choice%20(data_iso%20(lookbehind%20.students_analysis)%20.ordering%2C%20data_iso%20(lookbehind%20.problems_analysis)%20.ordering)%5Cn%5Cnvar%20ambient_as_ambient%20%3D%20data_iso%20(ambient%20.ambient)%5Cnvar%20ambient_as_background_music_on%20%3D%20data_lens%20(ambient%20.ambient)%20.background_music_on%5Cn%5Cn%5Cn%5Cn%2F%2F%20states%20and%20beliefs%5Cn%5Cnvar%20state%20%3D%20faith%20(%5Cn%5Ct%7B%20app%3A%20teacher_app%20.setup%20(default_settings)%5Cn%5Ct%2C%20lookbehind%3A%20lookbehind%20.nothing%5Cn%5Ct%2C%20ambient%3A%20ambient%20.ambient%20(true)%5Cn%5Ct%2C%20io%3A%20io%20.inert%5Cn%5Ct%2C%20ensemble%3A%20ensemble%20.nothing%5Cn%5Ct%2C%20feedback%3A%20undefined%20%7D%20)%5Cn%5Cn%5Cnvar%20app_state%20%3D%20belief%20('app')%20(state)%5Cnvar%20lookbehind_state%20%3D%20belief%20('lookbehind')%20(state)%5Cnvar%20ambient_state%20%3D%20belief%20('ambient')%20(state)%5Cnvar%20io_state%20%3D%20belief%20('io')%20(state)%5Cnvar%20ensemble_state%20%3D%20belief%20('ensemble')%20(state)%5Cnvar%20feedback_state%20%3D%20belief%20('feedback')%20(state)%5Cn%5Cn%5Cnvar%20app_setup_state%20%3D%20belief%20(app_as_setup)%20(app_state)%5Cnvar%20app_get_ready_state%20%3D%20belief%20(app_as_get_ready)%20(app_state)%5Cnvar%20app_playing_state%20%3D%20belief%20(app_as_playing)%20(app_state)%5Cnvar%20app_game_over_state%20%3D%20belief%20(app_as_game_over)%20(app_state)%5Cnvar%20app_progress_state%20%3D%20belief%20(app_as_progress)%20(app_state)%5Cn%5Cnvar%20app_progress_timestamp_state%20%3D%20belief%20(progress_as_timestamp)%20(app_progress_state)%5Cnvar%20app_progress_step_state%20%3D%20belief%20(progress_as_step)%20(app_progress_state)%5Cn%5Cnvar%20app_settings_state%20%3D%20belief%20(app_as_settings)%20(app_state)%5Cn%5Cnvar%20app_settings_problems_state%20%3D%20belief%20(settings_as_problems)%20(app_settings_state)%5Cnvar%20app_settings_rules_state%20%3D%20belief%20(settings_as_rules)%20(app_settings_state)%20%5Cn%5Cnvar%20app_settings_rules_time_limit_state%20%3D%20belief%20(rules_as_time_limit)%20(app_settings_rules_state)%20%5Cnvar%20app_settings_rules_size_state%20%3D%20belief%20(rules_as_size)%20(app_settings_rules_state)%20%5Cnvar%20app_settings_rules_win_rule_state%20%3D%20belief%20(rules_as_win_rule)%20(app_settings_rules_state)%20%5Cn%5Cnvar%20app_students_state%20%3D%20belief%20(app_as_students)%20(app_state)%5Cnvar%20app_room_state%20%3D%20belief%20(app_as_room)%20(app_state)%5Cnvar%20app_boards_state%20%3D%20belief%20(app_as_boards)%20(app_state)%5Cnvar%20app_pasts_state%20%3D%20belief%20(app_as_pasts)%20(app_state)%5Cn%5Cnvar%20app_current_problem_state%20%3D%20belief%20(current_problem)%20(app_state)%5Cnvar%20app_students_map_boards_v_pasts_state%20%3D%20belief%20(_app%20%3D%3E%20map_zip%20(a%20%3D%3E%20b%20%3D%3E%20%5Ba%2C%20b%5D)%20(L%20.get%20(app_as_boards)%20(_app)%20%7C%7C%20%5B%5D)%20(L%20.get%20(app_as_pasts)%20(_app)%20%7C%7C%20%5B%5D))%20(app_state)%5Cn%5Cnvar%20lookbehind_nothing_state%20%3D%20belief%20(lookbehind_as_nothing)%20(lookbehind_state)%5Cnvar%20lookbehind_preview_questions_state%20%3D%20belief%20(lookbehind_as_preview_questions)%20(lookbehind_state)%5Cnvar%20lookbehind_view_students_state%20%3D%20belief%20(lookbehind_as_view_students)%20(lookbehind_state)%5Cnvar%20lookbehind_consider_end_state%20%3D%20belief%20(lookbehind_as_consider_end)%20(lookbehind_state)%5Cnvar%20lookbehind_show_results_state%20%3D%20belief%20(lookbehind_as_show_results)%20(lookbehind_state)%5Cnvar%20lookbehind_students_analysis_state%20%3D%20belief%20(lookbehind_as_students_analysis)%20(lookbehind_state)%5Cnvar%20lookbehind_problems_analysis_state%20%3D%20belief%20(lookbehind_as_problems_analysis)%20(lookbehind_state)%5Cn%5Cnvar%20lookbehind_ordering_state%20%3D%20belief%20(lookbehind_as_ordering)%20(lookbehind_state)%5Cn%5Cnvar%20ambient_background_music_on_state%20%3D%20belief%20(ambient_as_background_music_on)%20(ambient_state)%5Cn%5Cnvar%20io_inert_state%20%3D%20belief%20(io_as_inert)%20(io_state)%5Cnvar%20io_connecting_state%20%3D%20belief%20(io_as_connecting)%20(io_state)%5Cnvar%20io_heartbeat_state%20%3D%20belief%20(io_as_heartbeat)%20(io_state)%5Cn%5Cnvar%20ensemble_progress_state%20%3D%20belief%20(ensemble_as_progress)%20(ensemble_state)%5Cnvar%20ensemble_pings_state%20%3D%20belief%20(ensemble_as_pings)%20(ensemble_state)%5Cnvar%20ensemble_boards_state%20%3D%20belief%20(ensemble_as_boards)%20(ensemble_state)%5Cnvar%20ensemble_pasts_state%20%3D%20belief%20(ensemble_as_pasts)%20(ensemble_state)%5Cn%5Cnvar%20feedback_start_state%20%3D%20belief%20(feedback_as_start)%20(feedback_state)%20%5Cnvar%20feedback_setup_rules_state%20%3D%20belief%20(feedback_as_setup_rules)%20(feedback_state)%20%5Cnvar%20feedback_play_state%20%3D%20belief%20(feedback_as_play)%20(feedback_state)%20%5Cnvar%20feedback_end_state%20%3D%20belief%20(feedback_as_end)%20(feedback_state)%20%5Cnvar%20feedback_reset_state%20%3D%20belief%20(feedback_as_reset)%20(feedback_state)%20%5Cn%5Cnvar%20feedback_rules_piece_state%20%3D%20belief%20(feedback_as_rules_piece)%20(feedback_state)%5Cn%5Cn%5Cn%5Cn%5Cn%2F%2F%20views%5Cn%5Cnvar%20asset_view%20%3D%20_asset%20%3D%3E%20%3Casset%3E%3Cimg%20src%3D%7B%20_asset%20%7D%20%2F%3E%3C%2Fasset%3E%5Cnvar%20text_asset_view%20%3D%20_asset%20%3D%3E%20%3Cimg%20src%3D%7B%20_asset%20%7D%20text-asset%20%2F%3E%5Cn%5Cnvar%20counter_setting_view%20%3D%20label%20%3D%3E%20please_feedback%20%3D%3E%20iso_v_img_list%20%3D%3E%20_setting%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%5B%20%3Clabel%3E%7B%20label%20%7D%3C%2Flabel%3E%5Cn%5Ct%2C%20%3Ccontrol%3E%5Cn%5Ct%5Ct%3Cprev%20fn%3D%7B%20feedback_prev%20%7D%3E%3Cimg%20src%3D%7B%20img%20.prev%20%7D%20%2F%3E%3C%2Fprev%3E%5Cn%5Ct%5Ct%3Ccounter%3E%3Cimg%20src%3D%7B%20_img%20%7D%20%2F%3E%3C%2Fcounter%3E%5Cn%5Ct%5Ct%3Cnext%20fn%3D%7B%20feedback_next%20%7D%3E%3Cimg%20src%3D%7B%20img%20.next%20%7D%20%2F%3E%3C%2Fnext%3E%3C%2Fcontrol%3E%20%5D%2C%5Cn%5Ctwhere%5Cn%5Ct%2C%20match_setting%20%3D%20(%5B%20_iso%2C%20_%20%5D)%20%3D%3E%20L%20.and%20(_iso)%20(_setting)%5Cn%5Ct%2C%20_iso_v_img%20%3D%20T%20(iso_v_img_list)%20(L%20.get%20(L%20.find%20(match_setting)))%5Cn%5Ct%2C%20_index%20%3D%20T%20(iso_v_img_list)%20(L%20.getAs%20((_%2C%20i)%20%3D%3E%20i)%20(L%20.find%20(match_setting)))%5Cn%5Ct%2C%20%5B%20_iso%2C%20_img%20%5D%20%3D%20_iso_v_img%5Cn%5Ct%2C%20list_length%20%3D%20R%20.length%20(iso_v_img_list)%5Cn%5Ct%2C%20index_q_list%20%3D%20i%20%3D%3E%20((i%20%25%20list_length)%20%2B%20list_length)%20%25%20list_length%5Cn%5Ct%2C%20%5B%20prev_iso%2C%20%5D%20%3D%20T%20(iso_v_img_list)%20(L%20.get%20(index_q_list%20(_index%20-%201)))%5Cn%5Ct%2C%20%5B%20next_iso%2C%20%5D%20%3D%20T%20(iso_v_img_list)%20(L%20.get%20(index_q_list%20(_index%20%2B%201)))%5Cn%5Ct%2C%20feedback_prev%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease_feedback%20(T%20(_setting)%20(L%20.get%20(%5B%20_iso%2C%20L%20.inverse%20(prev_iso)%20%5D)))%20%7D)%20%7D)%20%7D%5Cn%5Ct%2C%20feedback_next%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease_feedback%20(T%20(_setting)%20(L%20.get%20(%5B%20_iso%2C%20L%20.inverse%20(next_iso)%20%5D)))%20%7D)%20%7D)%20%7D%20)%3D%3E_)%5Cn%5Cnvar%20as_point%20%3D%20a%20%3D%3E%20b%20%3D%3E%5Cn%5Ct%5B%20L%20.is%20(a)%2C%20L%20.inverse%20(L%20.is%20(b))%20%5D%5Cnvar%20as_points_on%20%3D%20f%20%3D%3E%20(%5B%20...pairs%20%5D)%20%3D%3E%5Cn%5CtL%20.alternatives%20(...%20R%20.map%20((%5Ba%2C%20b%5D)%20%3D%3E%20as_point%20(a)%20(b))%20(pairs)%2C%20f)%5Cnvar%20as_points%20%3D%20(%5B%20...pairs%20%5D)%20%3D%3E%5Cn%5CtL%20.alternatives%20(...%20R%20.map%20((%5Ba%2C%20b%5D)%20%3D%3E%20as_point%20(a)%20(b))%20(pairs))%5Cnvar%20points_%20%3D%20(%5B%20...pairs%20%5D)%20%3D%3E%20L%20%20.get%20(as_points%20(%5B%20...pairs%20%5D))%5Cn%5Cnvar%20on_off%20%3D%20points_%20(%5B%20%5B%20true%2C%20'on'%20%5D%2C%20%5B%20false%2C%20'off'%20%5D%20%5D)%5Cnvar%20background_music_img%20%3D%20points_%20(%5B%20%5B%20true%2C%20img%20.music_on%20%5D%2C%20%5B%20false%2C%20img%20.music_off%20%5D%20%5D)%5Cn%5Cnvar%20setup_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct!!%20L_%20.isDefined%20(mark%20(lookbehind_nothing_state))%5Cn%5Ct%3F%20%3Csetup-etc%3E%5Cn%5Ct%5Ct%3Cdiv%20class%3D%5C%22left-pane%5C%22%3E%5Cn%5Ct%5Ct%5Ct%3Ca-title%3E%3Cimg%20src%3D%7B%20img%20.logo%20%7D%2F%3E%3C%2Fa-title%3E%5Cn%5Ct%5Ct%5Ct%3Csub-title%3E%E9%99%A4%E6%B3%95%EF%BC%88%E4%B8%80%EF%BC%89%3C%2Fsub-title%3E%5Cn%5Ct%5Ct%5Ct%3Csettings%20x-for%3D%5C%22game-mode%20time-limit%5C%22%3E%5Cn%5Ct%5Ct%5Ct%3Csetting%20x-of%3D%5C%22game-mode%5C%22%3E%5Cn%5Ct%5Ct%5Ct%5Ct%7B%20%24%20(counter_setting_view%5Cn%5Ct%5Ct%5Ct%5Ct)%20(asset_view%20(img%20.text_game_mode)%5Cn%5Ct%5Ct%5Ct%5Ct)%20(_win_rule%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctvar%20rules_delta%20%3D%20T%20(_win_rule)%20(L%20.get%20(L.inverse%20(data_iso%20(rules%20.rules)%20.win_rule)))%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(feedback%20.setup_rules%20(rules_delta%2C%20uniq%20())))%20(feedback_state)%20%7D%5Cn%5Ct%5Ct%5Ct%5Ct)%20(%5Cn%5Ct%5Ct%5Ct%5Ct%5B%20%5B%20win_rule_as_first_bingo%2C%20img%20.play_to_win%20%5D%5Cn%5Ct%5Ct%5Ct%5Ct%2C%20%5B%20%5B%20win_rule_as_limit_time%2C%20L%20.normalize%20(L%20.modify%20(%5B%20'time_limit'%2C%20L%20.valueOr%20(15)%20%5D)%20(I))%20%5D%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%2C%20img%20.time_limit_play%20%5D%5Cn%5Ct%5Ct%5Ct%5Ct%2C%20%5B%20win_rule_as_all_problems%2C%20img%20.free_play%20%5D%20%5D%5Cn%5Ct%5Ct%5Ct%5Ct)%20(mark%20(app_settings_rules_win_rule_state))%20%7D%20%3C%2Fsetting%3E%5Cn%5Ct%5Ct%5Ct%3Csetting%20x-of%3D%5C%22time-limit%5C%22%3E%5Cn%5Ct%5Ct%5Ct%5Ct%7B%20%24%20(counter_setting_view%5Cn%5Ct%5Ct%5Ct%5Ct)%20(asset_view%20(img%20.text_time_limit)%5Cn%5Ct%5Ct%5Ct%5Ct)%20(_time_limit%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctvar%20rules_delta%20%3D%20T%20(_time_limit)%20(L%20.get%20(L.inverse%20(data_iso%20(rules%20.rules)%20.time_limit)))%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(feedback%20.setup_rules%20(rules_delta%2C%20uniq%20())))%20(feedback_state)%20%7D%5Cn%5Ct%5Ct%5Ct%5Ct)%20(%5Cn%5Ct%5Ct%5Ct%5Ct%5B%20%5B%20L%20.is%20(10)%2C%20img%20.ten_secs%20%5D%5Cn%5Ct%5Ct%5Ct%5Ct%2C%20%5B%20L%20.is%20(20)%2C%20img%20.twenty_secs%20%5D%5Cn%5Ct%5Ct%5Ct%5Ct%2C%20%5B%20L%20.is%20(30)%2C%20img%20.thirty_secs%20%5D%20%5D%5Cn%5Ct%5Ct%5Ct%5Ct)%20(mark%20(app_settings_rules_time_limit_state))%20%7D%20%3C%2Fsetting%3E%3C%2Fsettings%3E%5Cn%5Ct%5Ct%5Ct%3Cbutton%20x-custom%3D%5C%22true%5C%22%20x-for%3D%5C%22preview%5C%22%20fn%3D%7B%20setup_preview%20%7D%3E%3Cimg%20src%3D%7B%20img%20.go_preview%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%3Cbutton%20x-custom%3D%5C%22true%5C%22%20x-for%3D%5C%22start%5C%22%20fn%3D%7B%20feedback_start%20%7D%3E%3Cimg%20src%3D%7B%20img%20.go_start%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%7B%20L%20.get%20(chain_el%20(K%20(%5Cn%5Ct%5Ct%5Ct%3Cdiv%20style%3D%7B%7B%20'text-align'%3A%20'center'%20%7D%7D%3E%E9%81%8A%E6%88%B2%E6%AD%A3%E5%9C%A8%E9%96%8B%E5%A7%8B%E2%80%A6%3C%2Fdiv%3E%20)%20)%5Cn%5Ct%5Ct%5Ct)%20(%5Cn%5Ct%5Ct%5Ctmark%20(io_connecting_state)%20)%20%7D%20%3C%2Fdiv%3E%5Cn%5Ct%5Ct%3Cdiv%20class%3D%5C%22right-pane%5C%22%3E%5Cn%5Ct%5Ct%5Ct%3Csettings%20x-for%3D%5C%22board-size%5C%22%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Csetting%20x-of%3D%5C%22board-size%5C%22%20x-be%3D%5C%223x3%5C%22%3E%3Cimg%20fn%3D%7B%20feedback_size%20(3)%20%7D%20src%3D%7B%20three_by_three_img%20(equals%20(_size)%20(3))%20%7D%20%2F%3E%3C%2Fsetting%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Csetting%20x-of%3D%5C%22board-size%5C%22%20x-be%3D%5C%224x4%5C%22%3E%3Cimg%20fn%3D%7B%20feedback_size%20(4)%20%7D%20src%3D%7B%20four_by_four_img%20(equals%20(_size)%20(4))%20%7D%20%2F%3E%3C%2Fsetting%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Csetting%20x-of%3D%5C%22board-size%5C%22%20x-be%3D%5C%225x5%5C%22%3E%3Cimg%20fn%3D%7B%20feedback_size%20(5)%20%7D%20src%3D%7B%20five_by_five_img%20(equals%20(_size)%20(5))%20%7D%20%2F%3E%3C%2Fsetting%3E%20%3C%2Fsettings%3E%20%3C%2Fdiv%3E%5Cn%5Ct%5Ct%3Csetting%20x-for%3D%5C%22background-music%5C%22%20x-be%3D%7B%20on_off%20(_background_music_on)%20%7D%20fn%3D%7B%20toggle_background_music%20%7D%20%3E%3Cimg%20src%3D%7B%20background_music_img%20(_background_music_on)%20%7D%20%2F%3E%3C%2Fsetting%3E%20%3C%2Fsetup-etc%3E%5Cn%5Ct%3A%20L_%20.isDefined%20(mark%20(lookbehind_preview_questions_state))%5Cn%5Ct%3F%20%3Csetup-etc%3E%5Cn%5Ct%5Ct%3Ctitle-etc%3E%3Cimg%20src%3D%7B%20img%20.logo%20%7D%2F%3E%3C%2Ftitle-etc%3E%5Cn%5Ct%5Ct%3Cpreview-questions-etc%3E%5Cn%5Ct%5Ct%5Ct%3Cbutton%20x-custom%3D%5C%22true%5C%22%20x-for%3D%5C%22back%5C%22%20fn%3D%7B%20preview_back%20%7D%3E%3Cimg%20src%3D%7B%20img%20.go_back%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%3Cpreview-questions%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Clabels%3E%3Cquestion%3E%7B%20text_asset_view%20(img%20.label_questions)%20%7D%3C%2Fquestion%3E%3Canswer%3E%7B%20text_asset_view%20(img%20.label_answers)%20%7D%3C%2Fanswer%3E%3C%2Flabels%3E%5Cn%5Ct%5Ct%5Ct%5Ct%7B%20L%20.collect%20(L%20.chain%20((_problem%2C%20i)%20%3D%3E%20so%20((_%3D_%3D%3E%20K%20(%5Cn%5Ct%5Ct%5Ct%5Ct%3Cproblem%3E%3Cquestion%3E%3Cnumber%3E%7B%20i%20%2B%201%20%7D%3C%2Fnumber%3E%3Cimg%20src%3D%7B%20question_image%20%7D%2F%3E%3C%2Fquestion%3E%3Canswer%3E%7B%20answer%20%7D%3C%2Fanswer%3E%3C%2Fproblem%3E%20)%2C%5Cn%5Ct%5Ct%5Ct%5Ctwhere%5Cn%5Ct%5Ct%5Ct%5Ct%2C%20question_image%20%3D%20T%20(_problem)%20(L%20.get%20(%5B%20problem_as_question%2C%20question_as_image%20%5D))%5Cn%5Ct%5Ct%5Ct%5Ct%2C%20answer%20%3D%20T%20(_problem)%20(L%20.get%20(%5B%20problem_as_question%2C%20question_as_solution%20%5D))%20)%3D%3E_)%5Cn%5Ct%5Ct%5Ct%5Ct)%20(%5Cn%5Ct%5Ct%5Ct%5CtL%20.limit%20(_size%20*%20_size)%20(L%20.elems)%5Cn%5Ct%5Ct%5Ct%5Ct)%20)%20(%5Cn%5Ct%5Ct%5Ct%5Ctmark%20(app_settings_problems_state))%20%7D%20%3C%2Fpreview-questions%3E%20%3C%2Fpreview-questions-etc%3E%20%5Cn%5Ct%5Ct%3Csetting%20x-for%3D%5C%22background-music%5C%22%20x-be%3D%7B%20on_off%20(_background_music_on)%20%7D%20fn%3D%7B%20toggle_background_music%20%7D%20%3E%5Cn%5Ct%5Ct%5Ct%3Cimg%20src%3D%7B%20background_music_img%20(_background_music_on)%20%7D%20%2F%3E%3C%2Fsetting%3E%20%3C%2Fsetup-etc%3E%5Cn%5Ct%2F%2F%20MAJOR%20HACK%5Cn%5Ct%3A%20(please%20(L_%20.set%20(lookbehind%20.nothing))%20(lookbehind_state)%2C%20%5B%5D)%2C%5Cn%5Ctwhere%5Cn%5Ct%2C%20_size%20%3D%20mark%20(app_settings_rules_size_state)%5Cn%5Ct%2C%20_background_music_on%20%3D%20mark%20(ambient_background_music_on_state)%5Cn%5Ct%2C%20three_by_three_img%20%3D%20points_%20(%5B%20%5B%20true%2C%20img%20.three_by_three_on%20%5D%2C%20%5B%20false%2C%20img%20.three_by_three_off%20%5D%20%5D)%5Cn%5Ct%2C%20four_by_four_img%20%3D%20points_%20(%5B%20%5B%20true%2C%20img%20.four_by_four_on%20%5D%2C%20%5B%20false%2C%20img%20.four_by_four_off%20%5D%20%5D)%5Cn%5Ct%2C%20five_by_five_img%20%3D%20points_%20(%5B%20%5B%20true%2C%20img%20.five_by_five_on%20%5D%2C%20%5B%20false%2C%20img%20.five_by_five_off%20%5D%20%5D)%5Cn%5Ct%2C%20feedback_start%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(feedback%20.start%20(uniq%20())))%20(feedback_state)%20%7D)%20%7D)%20%7D%5Cn%5Ct%2C%20feedback_size%20%3D%20_size%20%3D%3E%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ctvar%20rules_delta%20%3D%20T%20(_size)%20(L%20.get%20(L.inverse%20(data_iso%20(rules%20.rules)%20.size)))%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(feedback%20.setup_rules%20(rules_delta%2C%20uniq%20())))%20(feedback_state)%20%7D)%20%7D)%20%7D%5Cn%5Ct%2C%20setup_preview%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(lookbehind%20.preview_questions))%20(lookbehind_state)%20%7D)%20%7D)%20%7D%5Cn%5Ct%2C%20preview_back%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(lookbehind%20.nothing))%20(lookbehind_state)%20%7D)%20%7D)%20%7D%5Cn%5Ct%2C%20toggle_background_music%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(not)%20(ambient_background_music_on_state)%20%7D)%20%7D)%20%7D%20)%3D%3E_)%5Cn%5Cnvar%20get_ready_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%3Cget-ready-etc%3E%5Cn%5Ct%5Ct%3Croom%3E%7B%20text_asset_view%20(img%20.text_room_number_is)%20%7D%7B%20mark%20(app_room_state)%20%7D%3C%2Froom%3E%5Cn%5Ct%5Ct%3Cstudents-etc%3E%5Cn%5Ct%5Ct%5Ct%3Clabel%3E%7B%20text_asset_view%20(img%20.text_number_of_students_is)%20%7D%7B%20R%20.length%20(_students)%20%7D%3C%2Flabel%3E%5Cn%5Ct%5Ct%5Ct%3Cstudents%3E%20%7B%20L%20.collect%20(L%20.chain%20((%7B%20icon%3A%20_icon%2C%20name%3A%20_name%20%7D)%20%3D%3E%20K%20(%5Cn%5Ct%5Ct%5Ct%5Ct%3Cstudent%20x-icon%3D%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct!!%20L%20.isDefined%20(avatar_as_lion)%20(_icon)%20%3F%20'lion'%20%3A%20L%20.isDefined%20(avatar_as_bunny)%20(_icon)%20%3F%20'bunny'%20%3A%20panic%20('...')%20%7D%5Cn%5Ct%5Ct%5Ct%5Ct%3E%7B%20_name%20%7D%3C%2Fstudent%3E%20)%5Cn%5Ct%5Ct%5Ct%5Ct)%20(%5Cn%5Ct%5Ct%5Ct%5Ct%5B%20L%20.elems%2C%20student_as_student%20%5D))%20(_students)%20%7D%20%3C%2Fstudents%3E%20%3C%2Fstudents-etc%3E%5Cn%5Ct%5Ct%7B%20L%20.get%20(%5B%20L%20.elems%2C%20chain_el%20(K%20(%5Cn%5Ct%5Ct%3Cbutton%20x-custom%20x-for%3D%5C%22play%5C%22%20fn%3D%7B%20feedback_play%20%7D%3E%3Cimg%20src%3D%7B%20img%20.play%20%7D%20%2F%3E%3C%2Fbutton%3E%20))%20%5D%5Cn%5Ct%5Ct)%20(%5Cn%5Ct%5Ct_students%20)%20%7D%5Cn%5Ct%5Ct%3Csetting%20x-for%3D%5C%22background-music%5C%22%20x-be%3D%7B%20on_off%20(_background_music_on)%20%7D%20fn%3D%7B%20toggle_background_music%20%7D%20%3E%3Cimg%20src%3D%7B%20background_music_img%20(_background_music_on)%20%7D%20%2F%3E%3C%2Fsetting%3E%20%3C%2Fget-ready-etc%3E%2C%5Cn%5Ctwhere%5Cn%5Ct%2C%20_students%20%3D%20mark%20(app_students_state)%20%7C%7C%20%5B%5D%5Cn%5Ct%2C%20_background_music_on%20%3D%20mark%20(ambient_background_music_on_state)%5Cn%5Ct%2C%20feedback_play%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(feedback%20.play%20(uniq%20())))%20(feedback_state)%20%7D)%20%7D)%20%7D%20%5Cn%5Ct%2C%20toggle_background_music%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(not)%20(ambient_background_music_on_state)%20%7D)%20%7D)%20%7D%20)%3D%3E_)%5Cn%5Cnvar%20bingoes_view%20%3D%20so%20((_%3D_%3D%3E%20_bingoes%20%3D%3E%5Cn%5Ct%3Cbingo%3E%20%7B%20T%20(_bingoes)%20(R%20.map%20(_pattern%20%3D%3E%20%5Cn%5Ct%5Ct%3Cline%20x-shape%3D%7B%20pattern_shape%20(_pattern)%20%7D%20style%3D%7B%20line_pos%20(_pattern)%20%7D%20%2F%3E%20))%20%7D%20%3C%2Fbingo%3E%2C%5Cn%5Ctwhere%5Cn%5Ct%2C%20line_pos%20%3D%20_pattern%20%3D%3E%20so%20((_%3D_%3D%3E%20(%5Cn%5Ct%5Ct%7B%20left%3A%20left%2C%20top%3A%20top%20%7D%20)%2C%5Cn%5Ct%5Ctwhere%5Cn%5Ct%5Ct%2C%20_size%20%3D%20R%20.length%20(_pattern)%5Cn%5Ct%5Ct%2C%20_shape%20%3D%20pattern_shape%20(_pattern)%5Cn%5Ct%5Ct%2C%20_x%20%3D%20L%20.get%20(%5B%20L%20.elems%2C%20(%5B%20y%2C%20x%20%5D)%20%3D%3E%20x%20%5D)%20(_pattern)%5Cn%5Ct%5Ct%2C%20_y%20%3D%20L%20.get%20(%5B%20L%20.elems%2C%20(%5B%20y%2C%20x%20%5D)%20%3D%3E%20y%20%5D)%20(_pattern)%5Cn%5Ct%5Ct%2C%20top%20%3D%20!!%20equals%20(_shape)%20('horizontal')%20%3F%20((_y%20-%200.5)%20%2F%20_size)%20*%20100%20%2B%20'%25'%5Cn%5Ct%5Ct%5Ct%3A%20equals%20(_shape)%20('vertical')%20%3F%20'5%25'%5Cn%5Ct%5Ct%5Ct%3A%20''%5Cn%5Ct%5Ct%2C%20left%20%3D%20!!%20equals%20(_shape)%20('vertical')%20%3F%20((_x%20-%200.5)%20%2F%20_size)%20*%20100%20%2B%20'%25'%5Cn%5Ct%5Ct%5Ct%3A%20equals%20(_shape)%20('horizontal')%20%3F%20'5%25'%5Cn%5Ct%5Ct%5Ct%3A%20''%20)%3D%3E_)%20%5Cn%5Ct%2C%20pattern_shape%20%3D%20_pattern%20%3D%3E%5Cn%5Ct%5Ctsuppose%20(%5Cn%5Ct%5Ct(%20%5B%20first_y%2C%20first_x%20%5D%20%3D%20L%20.get%20(L%20.first)%20(_pattern)%5Cn%5Ct%5Ct%2C%20%5B%20last_y%2C%20last_x%20%5D%20%3D%20L%20.get%20(L%20.last)%20(_pattern)%5Cn%5Ct%5Ct)%20%3D%3E%5Cn%5Ct%5Ct!!%20equals%20(first_x)%20(last_x)%20%3F%20'vertical'%5Cn%5Ct%5Ct%3A%20equals%20(first_y)%20(last_y)%20%3F%20'horizontal'%5Cn%5Ct%5Ct%3A%20(first_x%20%3C%20last_x)%20%3F%20'diagonal-down'%5Cn%5Ct%5Ct%3A%20(first_x%20%3E%20last_x)%20%3F%20'diagonal-up'%5Cn%5Ct%5Ct%3A%20panic%20('bad%20pattern')%20)%20)%3D%3E_)%5Cn%5Cnvar%20attrs_%20%3D%20L%20.get%20(L%20.modify%20(L%20.values)%20(L%20.get%20(L%20.cond%20(%5B%20I%2C%20K%20('')%20%5D))))%5Cn%5Cnvar%20students_view%20%3D%20_%20%3D%3E%5Cn%5Ct%3Cstudents%3E%20%7B%20L%20.collect%20(L%20.chain%20((%5B%20_student%2C%20%5B_board%2C%20_past%5D%20%5D)%20%3D%3E%20so%20((_%3D_%3D%3E%20K%20(%5Cn%5Ct%5Ct%3Cstudent-etc%3E%5Cn%5Ct%5Ct%5Ct%3Clabel%20x-icon%3D%7B%20_icon_attr%20%7D%20%7B...%20_x_solved%7D%3E%3Cname%3E%7B%20_name%20%7D%3C%2Fname%3E%3C%2Flabel%3E%5Cn%5Ct%5Ct%5Ct%3Cboard%20%7B...%20_x_bingoed%7D%3E%20%7B%20T%20(_board)%20(R%20.map%20(_row%20%3D%3E%20%5Cn%5Ct%5Ct%5Ct%5Ct%3Crow%3E%20%7B%20T%20(_row)%20(R%20.map%20(_cell%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct!!%20_cell_solved%20%3F%20%3Ccell%20x-solved%20%2F%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3A%20%3Ccell%20%2F%3E%2C%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctwhere%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%2C%20_cell_position%20%3D%20T%20(_cell)%20(L%20.get%20(cell_as_position))%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%2C%20_cell_solved%20%3D%20R%20.includes%20(_cell_position)%20(_solved_positions)%20)%3D%3E_)))%20%7D%20%3C%2Frow%3E%20))%20%7D%5Cn%5Ct%5Ct%5Ct%5Ct%3Cbingo%3E%20%7B%20bingoes_view%20(_bingoes)%20%7D%20%3C%2Fbingo%3E%20%3C%2Fboard%3E%20%3C%2Fstudent-etc%3E%20)%2C%5Cn%5Ct%5Ctwhere%5Cn%5Ct%5Ct%2C%20_name%20%3D%20T%20(_student)%20(L%20.get%20(student_as_name))%5Cn%5Ct%5Ct%2C%20_icon%20%3D%20T%20(_student)%20(L%20.get%20(student_as_icon))%5Cn%5Ct%5Ct%2C%20_icon_attr%20%3D%20%5Cn%5Ct%5Ct%5Ct!!%20L%20.isDefined%20(avatar_as_lion)%20(_icon)%5Cn%5Ct%5Ct%5Ct%3F%20'lion'%5Cn%5Ct%5Ct%5Ct%3A%20L%20.isDefined%20(avatar_as_bunny)%20(_icon)%5Cn%5Ct%5Ct%5Ct%3F%20'bunny'%5Cn%5Ct%5Ct%5Ct%3A%20panic%20('...')%5Cn%5Ct%5Ct%2C%20_solved_positions%20%3D%20solved_positions%20(_board)%20(_past)%5Cn%5Ct%5Ct%2C%20_current_position%20%3D%20T%20(_past)%20(L%20.get%20(%5B%20past_as_points%2C%20L%20.last%2C%20point_as_attempts%2C%20L%20.last%2C%20attempt_as_position%20%5D))%5Cn%5Ct%5Ct%2C%20_x_solved%20%3D%20attrs_%20(%7B%20'x-solved'%3A%20R%20.includes%20(_current_position)%20(_solved_positions)%20%7D)%5Cn%5Ct%5Ct%2C%20_bingoes%20%3D%20bingoes%20(_board)%20(_past)%5Cn%5Ct%5Ct%2C%20_x_bingoed%20%3D%20attrs_%20(%7B%20'x-bingoed'%3A%20L%20.isDefined%20(L%20.elems)%20(_bingoes)%20%7D)%20)%3D%3E_)%5Cn%5Ct%5Ct)%20(%5Cn%5Ct%5CtL%20.elems%5Cn%5Ct%5Ct)%20)%20(%5Cn%5Ct%5Ctmark%20(app_students_map_boards_v_pasts_state)%20)%20%7D%20%3C%2Fstudents%3E%5Cn%5Cnvar%20playing_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct!!%20L_%20.isDefined%20(mark%20(lookbehind_nothing_state))%5Cn%5Ct%3F%20%3Cplaying-etc%3E%5Cn%5Ct%5Ct%3Ctitle-etc%3E%5Cn%5Ct%5Ct%5Ct%3Ca-title%3E%3Cimg%20src%3D%7B%20img%20.logo%20%7D%2F%3E%3C%2Fa-title%3E%5Cn%5Ct%5Ct%5Ct%3Cproblem-number%3E%7B%20text_asset_view%20(img%20.text_nth)%20%7D%7B%20_problem_number%20%7D%7B%20text_asset_view%20(img%20.text_problem)%20%7D%3C%2Fproblem-number%3E%20%3C%2Ftitle-etc%3E%5Cn%5Ct%5Ct%3Cproblem-etc%3E%5Cn%5Ct%5Ct%5Ct%3Cticker-etc%3E%5Cn%5Ct%5Ct%5Ct%5Ct%7B%20L%20.get%20(chain_el%20(_t%20%3D%3E%5Cn%5Ct%5Ct%5Ct%5Ct_time_limit%20-%20_t%20))%20(clock%20())%20%7D%5Cn%5Ct%5Ct%5Ct%5Ct%3Cticker%20z-identity%3D%7B%20_problem_number%20%7D%20style%3D%7B%7B%20animationDuration%3A%20_time_limit%20%2B%20's'%20%7D%7D%3E%3Cspinner%2F%3E%3C%2Fticker%3E%20%3C%2Fticker-etc%3E%5Cn%5Ct%5Ct%5Ct%3Cquestion%3E%5Cn%5Ct%5Ct%5Ct%5Ct%7B%20L%20.get%20(%5B%20question_as_text%2C%20chain_el%20(_question_text%20%3D%3E%5Cn%5Ct%5Ct%5Ct%5Ct_question_text%20)%20%5D)%20(_question)%20%7D%5Cn%5Ct%5Ct%5Ct%5Ct%7B%20L%20.get%20(%5B%20question_as_image%2C%20chain_el%20(_question_image%20%3D%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cimg%20src%3D%7B%20_question_image%20%7D%20%2F%3E%20)%20%5D)%20(_question)%20%7D%20%3C%2Fquestion%3E%20%3C%2Fproblem-etc%3E%5Cn%5Ct%5Ct%3Coptions%3E%5Cn%5Ct%5Ct%5Ct%3Cbutton%20x-custom%20x-for%3D%5C%22view-students%5C%22%20fn%3D%7B%20view_students%20%7D%3E%3Cimg%20src%3D%7B%20img%20.view_students%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%3Cbutton%20x-custom%20x-for%3D%5C%22end-game%5C%22%20fn%3D%7B%20consider_end%20%7D%3E%3Cimg%20src%3D%7B%20img%20.end_game%20%7D%20%2F%3E%3C%2Fbutton%3E%20%3C%2Foptions%3E%5Cn%5Ct%5Ct%3Csetting%20x-for%3D%5C%22background-music%5C%22%20x-be%3D%7B%20on_off%20(_background_music_on)%20%7D%20fn%3D%7B%20toggle_background_music%20%7D%20%3E%3Cimg%20src%3D%7B%20background_music_img%20(_background_music_on)%20%7D%20%2F%3E%3C%2Fsetting%3E%20%3C%2Fplaying-etc%3E%5Cn%5Ct%3A%20L_%20.isDefined%20(mark%20(lookbehind_view_students_state))%5Cn%5Ct%3F%20%3Cplaying-etc%3E%5Cn%5Ct%5Ct%3Ctitle-etc%3E%5Cn%5Ct%5Ct%5Ct%3Ca-title%3E%3Cimg%20src%3D%7B%20img%20.logo%20%7D%2F%3E%3C%2Fa-title%3E%5Cn%5Ct%5Ct%5Ct%3Cproblem-number%3E%7B%20text_asset_view%20(img%20.text_nth)%20%7D%7B%20_problem_number%20%7D%7B%20text_asset_view%20(img%20.text_problem)%20%7D%3C%2Fproblem-number%3E%20%3C%2Ftitle-etc%3E%5Cn%5Ct%5Ct%7B%20students_view%20%7D%5Cn%5Ct%5Ct%3Coptions%3E%5Cn%5Ct%5Ct%5Ct%3Cbutton%20x-custom%20x-for%3D%5C%22show-problem%5C%22%20fn%3D%7B%20show_problem%20%7D%3E%3Cimg%20src%3D%7B%20img%20.show_problem%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%3Cbutton%20x-custom%20x-for%3D%5C%22end-game%5C%22%20fn%3D%7B%20consider_end%20%7D%3E%3Cimg%20src%3D%7B%20img%20.end_game%20%7D%20%2F%3E%3C%2Fbutton%3E%20%3C%2Foptions%3E%5Cn%5Ct%5Ct%3Csetting%20x-for%3D%5C%22background-music%5C%22%20x-be%3D%7B%20on_off%20(_background_music_on)%20%7D%20fn%3D%7B%20toggle_background_music%20%7D%20%3E%5Cn%5Ct%5Ct%5Ct%3Cimg%20src%3D%7B%20background_music_img%20(_background_music_on)%20%7D%20%2F%3E%20%3C%2Fsetting%3E%20%3C%2Fplaying-etc%3E%5Cn%5Ct%3A%20L_%20.isDefined%20(mark%20(lookbehind_consider_end_state))%5Cn%5Ct%3F%20%3Cplaying-etc%3E%5Cn%5Ct%5Ct%3Cabort-etc%3E%5Cn%5Ct%5Ct%5Ct%3Cdiv%20class%3D%5C%22box%5C%22%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Clabel%3E%E7%B5%90%E6%9D%9F%E9%81%8A%E6%88%B2%EF%BC%9F%3C%2Flabel%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Coptions%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cbutton%20x-custom%20x-for%3D%5C%22confirm%5C%22%20fn%3D%7B%20confirm_end%20%7D%3E%3Cimg%20src%3D%7B%20img%20.confirm%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cbutton%20x-custom%20x-for%3D%5C%22show-problem%5C%22%20fn%3D%7B%20show_problem%20%7D%3E%3Cimg%20src%3D%7B%20img%20.cancel%20%7D%20%2F%3E%3C%2Fbutton%3E%3C%2Foptions%3E%3C%2Fdiv%3E%3C%2Fabort-etc%3E%3C%2Fplaying-etc%3E%5Cn%5Ct%2F%2F%20MAJOR%20HACK%5Cn%5Ct%3A%20(please%20(L_%20.set%20(lookbehind%20.nothing))%20(lookbehind_state)%2C%20%5B%5D)%2C%5Cn%5Ctwhere%5Cn%5Ct%2C%20_problem_number%20%3D%20mark%20(app_progress_step_state)%20%2B%201%5Cn%5Ct%2C%20_question%20%3D%20L%20.get%20(problem_as_question)%20(mark%20(app_current_problem_state))%5Cn%5Ct%2C%20_time_limit%20%3D%20mark%20(app_settings_rules_time_limit_state)%5Cn%5Ct%2C%20_background_music_on%20%3D%20mark%20(ambient_background_music_on_state)%5Cn%5Ct%2C%20show_problem%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(lookbehind%20.nothing))%20(lookbehind_state)%20%7D)%7D)%7D%5Cn%5Ct%2C%20view_students%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(lookbehind%20.view_students))%20(lookbehind_state)%20%7D)%7D)%7D%5Cn%5Ct%2C%20consider_end%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(lookbehind%20.consider_end))%20(lookbehind_state)%20%7D)%7D)%7D%5Cn%5Ct%2C%20confirm_end%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(feedback%20.end%20(uniq%20())))%20(feedback_state)%20%7D)%7D)%7D%20%20%5Cn%5Ct%2C%20toggle_background_music%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(not)%20(ambient_background_music_on_state)%20%7D)%20%7D)%20%7D%20)%3D%3E_)%5Cn%5Ct%5Ct%5Cn%5Cnvar%20show_unit%20%3D%20_x%20%3D%3E%20!!%20(not%20(equals%20(0)%20(_x))%20%26%26%20!%20_x)%20%3F%20'-'%20%3A%20%20_x%20.toFixed%20(2)%20*%201%5Cnvar%20show_time%20%3D%20_x%20%3D%3E%20!!%20(not%20(equals%20(0)%20(_x))%20%26%26%20!%20_x)%20%3F%20%20'-'%20%3A%20_x%20.toFixed%20(2)%20*%201%20%2B%20'%E7%A7%92'%5Cn%5Cnvar%20students_analysis_view%20%3D%20so%20((_%3D_%3D%3E%5Cn%5Ct_ordering%20%3D%3E%5Cn%5Ct%5Ct%3Cstudents-analysis-etc%3E%5Cn%5Ct%5Ct%5Ct%3Clabels%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cname%3E%7B%20asset_view%20(img%20.text_name)%20%7D%3Cimg%20src%3D%7B%20img%20.toggle_ordering%20%7D%20%2F%3E%3C%2Fname%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cnumber-of-solved%3E%7B%20asset_view%20(img%20.text_number_of_solved)%20%7D%3Cimg%20src%3D%7B%20img%20.toggle_ordering%20%7D%20%2F%3E%3C%2Fnumber-of-solved%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cnumber-of-bingoes%3E%7B%20asset_view%20(img%20.text_bingo)%20%7D%3Cimg%20src%3D%7B%20img%20.toggle_ordering%20%7D%20%2F%3E%3C%2Fnumber-of-bingoes%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Caverage-solved-time%3E%7B%20asset_view%20(img%20.text_average_solved_time)%20%7D%3Cimg%20src%3D%7B%20img%20.toggle_ordering%20%7D%20%2F%3E%3C%2Faverage-solved-time%3E%20%3C%2Flabels%3E%5Cn%5Ct%5Ct%5Ct%3Cstudents-analysis%3E%20%7B%20L%20.collect%20(L%20.chain%20((%7B%20_name%2C%20_number_of_solved%2C%20_number_of_bingoes%2C%20_average_solved_time%20%7D)%20%3D%3E%20K%20(%5Cn%5Ct%5Ct%5Ct%5Ct%3Cstudent%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cname%3E%7B%20_name%20%7D%3C%2Fname%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cnumber-of-solved%3E%7B%20_number_of_solved%20%7D%3C%2Fnumber-of-solved%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cnumber-of-bingoes%3E%7B%20_number_of_bingoes%20%7D%3C%2Fnumber-of-bingoes%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Caverage-solved-time%3E%7B%20show_time%20(_average_solved_time)%20%7D%3C%2Faverage-solved-time%3E%20%3C%2Fstudent%3E%20)%5Cn%5Ct%5Ct%5Ct%5Ct)%20(%5Cn%5Ct%5Ct%5Ct%5Ct%5B%20order_sort%20(_ordering)%2C%20L%20.elems%20%5D%5Cn%5Ct%5Ct%5Ct%5Ct)%20)%20(%5Cn%5Ct%5Ct%5Ct%5Ctanalyse_students%20(mark%20(app_students_map_boards_v_pasts_state)))%20%7D%20%3C%2Fstudents-analysis%3E%20%3C%2Fstudents-analysis-etc%3E%2C%5Cn%5Ctwhere%5Cn%5Ct%2C%20analyse_students%20%3D%20by%20(_students_map_boards_v_pasts%20%3D%3E%5Cn%5Ct%5CtL%20.collect%20(%5B%20L%20.elems%2C%20(%5B%20_student%2C%20%5B_board%2C%20_past%5D%20%5D)%20%3D%3E%20(%5Cn%5Ct%5Ct%5Ct%7B%20_name%3A%20T%20(_student)%20(L%20.get%20(student_as_name))%5Cn%5Ct%5Ct%5Ct%2C%20_number_of_solved%3A%20T%20(_past)%20(L%20.count%20(%5B%20past_as_points%2C%20L%20.elems%2C%20as_solved_on%20(_board)%20%5D))%5Cn%5Ct%5Ct%5Ct%2C%20_number_of_bingoes%3A%20T%20(bingoes%20(_board)%20(_past))%20(L%20.count%20(%5B%20L%20.elems%20%5D))%5Cn%5Ct%5Ct%5Ct%2C%20_average_solved_time%3A%20T%20(_past)%20(L%20.mean%20(%5B%20past_as_points%2C%20L%20.elems%2C%20as_solved_on%20(_board)%2C%20point_as_attempts%2C%20L%20.last%2C%20attempt_as_latency%20%5D))%20%7D)%20%5D)%20)%20)%3D%3E_)%5Cn%5Cnvar%20problems_analysis_view%20%3D%20so%20((_%3D_%3D%3E%5Cn%5Ct_ordering%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%5Ct%3Cproblems-analysis-etc%3E%5Cn%5Ct%5Ct%5Ct%3Clabels%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cquestion%3E%7B%20asset_view%20(img%20.text_question)%20%7D%3Cimg%20src%3D%7B%20img%20.toggle_ordering%20%7D%20%2F%3E%3C%2Fquestion%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cnumber-of-solvers%3E%7B%20asset_view%20(img%20.text_number_of_solvers)%20%7D%3Cimg%20src%3D%7B%20img%20.toggle_ordering%20%7D%20%2F%3E%3C%2Fnumber-of-solvers%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Caverage-number-of-attempts%3E%7B%20asset_view%20(img%20.text_average_number_of_attempts)%20%7D%3Cimg%20src%3D%7B%20img%20.toggle_ordering%20%7D%20%2F%3E%3C%2Faverage-number-of-attempts%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Caverage-solved-time%3E%7B%20asset_view%20(img%20.text_average_solved_time)%20%7D%3Cimg%20src%3D%7B%20img%20.toggle_ordering%20%7D%20%2F%3E%3C%2Faverage-solved-time%3E%20%3C%2Flabels%3E%5Cn%5Ct%5Ct%5Ct%3Cproblems-analysis%3E%20%7B%20L%20.collect%20(L%20.chain%20((%7B%20_question%2C%20_number_of_solvers%2C%20_average_number_of_attempts%2C%20_average_solved_time%20%7D)%20%3D%3E%20K%20(%5Cn%5Ct%5Ct%5Ct%5Ct%3Cproblem%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cquestion%3E%3Cimg%20src%3D%7B%20_question%20%7D%2F%3E%3C%2Fquestion%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cnumber-of-solvers%3E%7B%20_number_of_solvers%20%7D%3C%2Fnumber-of-solvers%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Caverage-number-of-attempts%3E%7B%20show_unit%20(_average_number_of_attempts)%20%7D%3C%2Faverage-number-of-attempts%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Caverage-solved-time%3E%7B%20show_time%20(_average_solved_time)%20%7D%3C%2Faverage-solved-time%3E%20%3C%2Fproblem%3E%20)%5Cn%5Ct%5Ct%5Ct%5Ct)%20(%5Cn%5Ct%5Ct%5Ct%5Ct%5B%20order_sort%20(_ordering)%2C%20L%20.elems%20%5D%5Cn%5Ct%5Ct%5Ct%5Ct)%20)%20(%5Cn%5Ct%5Ct%5Ct%5Ctanalyse_problems%20(mark%20(app_students_map_boards_v_pasts_state))%20(_problems)%20)%20%7D%20%3C%2Fproblems-analysis%3E%20%3C%2Fproblems-analysis-etc%3E%2C%5Cn%5Ct%5Ctwhere%5Cn%5Ct%5Ct%2C%20_problems%20%3D%20T%20(mark%20(app_students_map_boards_v_pasts_state)%5Cn%5Ct%5Ct%5Ct)%20(%5Cn%5Ct%5Ct%5Ct%5B%20L%20.collect%20(%5B%20L%20.elems%2C%20(%5B%20_%2C%20%5B__%2C%20_past%5D%20%5D)%20%3D%3E%20_past%2C%20L%20.collect%20(%5B%20past_as_points%2C%20L%20.elems%2C%20point_as_problem%20%5D)%20%5D)%5Cn%5Ct%5Ct%5Ct%2C%20L%20.maximumBy%20(L%20.count%20(L%20.elems))%20(L%20.elems)%20%5D)%20)%3D%3E_)%2C%5Cn%5Ctwhere%5Cn%5Ct%2C%20analyse_problems%20%3D%20_students_map_boards_v_pasts%20%3D%3E%20by%20(_problems%20%3D%3E%5Cn%5Ct%5CtL%20.collect%20(%5B%20L%20.elems%2C%20(_problem%2C%20_index)%20%3D%3E%20so%20((_%3D_%3D%3E%20(%5Cn%5Ct%5Ct%5Ct%7B%20_question%3A%20T%20(_problem)%20(L%20.get%20(%5B%20problem_as_question%2C%20question_as_image%20%5D))%5Cn%5Ct%5Ct%5Ct%2C%20_number_of_solvers%3A%5Cn%5Ct%5Ct%5Ct%5CtT%20(_students_map_boards_v_pasts%5Cn%5Ct%5Ct%5Ct%5Ct)%20(%5Cn%5Ct%5Ct%5Ct%5CtL%20.count%20(%5Cn%5Ct%5Ct%5Ct%5Ct%5B%20L%20.elems%2C%20L%20.choose%20((%5B%20_%2C%20%5B_board%2C%20_past%5D%20%5D)%20%3D%3E%20%5B%20as_corresponding_point%20(_past)%2C%20as_solved_on%20(_board)%20%5D%20)%20%5D))%5Cn%5Ct%5Ct%5Ct%2C%20_average_number_of_attempts%3A%5Cn%5Ct%5Ct%5Ct%5CtT%20(_students_map_boards_v_pasts%5Cn%5Ct%5Ct%5Ct%5Ct)%20(%5Cn%5Ct%5Ct%5Ct%5CtL%20.mean%20(%5Cn%5Ct%5Ct%5Ct%5Ct%5B%20L%20.elems%2C%20L%20.choose%20((%5B%20_%2C%20%5B__%2C%20_past%5D%20%5D)%20%3D%3E%20as_corresponding_point%20(_past)%20)%5Cn%5Ct%5Ct%5Ct%5Ct%2C%20point_as_attempts%2C%20L%20.count%20(L%20.elems)%20%5D))%5Cn%5Ct%5Ct%5Ct%2C%20_average_solved_time%3A%5Cn%5Ct%5Ct%5Ct%5CtT%20(_students_map_boards_v_pasts%5Cn%5Ct%5Ct%5Ct%5Ct)%20(%5Cn%5Ct%5Ct%5Ct%5CtL%20.mean%20(%5Cn%5Ct%5Ct%5Ct%5Ct%5B%20L%20.elems%2C%20L%20.choose%20((%5B%20_%2C%20%5B_board%2C%20_past%5D%20%5D)%20%3D%3E%20%5B%20as_corresponding_point%20(_past)%2C%20as_solved_on%20(_board)%20%5D)%5Cn%5Ct%5Ct%5Ct%5Ct%2C%20point_as_attempts%2C%20L%20.last%2C%20attempt_as_latency%20%5D))%20%7D%20)%2C%5Cn%5Ct%5Ct%5Ctwhere%5Cn%5Ct%5Ct%5Ct%2C%20as_corresponding_point%20%3D%20_past%20%3D%3E%20%5B%20K%20(_past)%2C%20past_as_points%2C%20_index%20%5D%20)%3D%3E_)%20%5D))%20)%3D%3E_)%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cnvar%20game_over_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%3Cgame-over-etc%3E%5Cn%5Ct%5Ct%3Ctitle-etc%3E%5Cn%5Ct%5Ct%5Ct%3Ca-title%3E%3Cimg%20src%3D%7B%20img%20.logo%20%7D%2F%3E%3C%2Fa-title%3E%20%3C%2Ftitle-etc%3E%5Cn%5Ct%5Ct%3Coptions%20x-for%3D%5C%22tabs%5C%22%3E%5Cn%5Ct%5Ct%5Ct%3Cbutton%20x-custom%20x-for%3D%5C%22show-results%5C%22%20fn%3D%7B%20show_results%20%7D%20%3E%3Cimg%20src%3D%7B%20!!%20L_%20.isDefined%20(mark%20(lookbehind_show_results_state))%20%3F%20img%20.show_results_on%20%3A%20img%20.show_results_off%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%3Cbutton%20x-custom%20x-for%3D%5C%22students-analysis%5C%22%20fn%3D%7B%20students_analysis%20%7D%20%3E%3Cimg%20src%3D%7B%20!!%20L_%20.isDefined%20(mark%20(lookbehind_students_analysis_state))%20%3F%20img%20.students_analysis_on%20%3A%20img%20.students_analysis_off%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%3Cbutton%20x-custom%20x-for%3D%5C%22problems-analysis%5C%22%20fn%3D%7B%20problems_analysis%20%7D%20%3E%3Cimg%20src%3D%7B%20!!%20L_%20.isDefined%20(mark%20(lookbehind_problems_analysis_state))%20%3F%20img%20.problems_analysis_on%20%3A%20img%20.problems_analysis_off%20%7D%20%2F%3E%3C%2Fbutton%3E%20%3C%2Foptions%3E%5Cn%5Ct%5Ct%5Ct%7B%20!!%20L_%20.isDefined%20(mark%20(lookbehind_show_results_state))%5Cn%5Ct%5Ct%5Ct%3F%20students_view%20%5Cn%5Ct%5Ct%5Ct%3A%20L_%20.isDefined%20(mark%20(lookbehind_students_analysis_state))%5Cn%5Ct%5Ct%5Ct%3F%20students_analysis_view%20(mark%20(lookbehind_ordering_state))%5Cn%5Ct%5Ct%5Ct%3A%20L_%20.isDefined%20(mark%20(lookbehind_problems_analysis_state))%5Cn%5Ct%5Ct%5Ct%3F%20problems_analysis_view%20(mark%20(lookbehind_ordering_state))%5Cn%5Ct%5Ct%5Ct%2F%2F%20MAJOR%20HACK%5Cn%5Ct%5Ct%5Ct%3A%20(please%20(L_%20.set%20(lookbehind%20.show_results))%20(lookbehind_state)%2C%20%5B%5D)%20%7D%5Cn%5Ct%5Ct%3Coptions%20x-for%3D%5C%22options%5C%22%3E%5Cn%5Ct%5Ct%5Ct%3Cbutton%20x-custom%20x-for%3D%5C%22play-again%5C%22%20fn%3D%7B%20play_again%20%7D%20%3E%3Cimg%20src%3D%7B%20img%20.play_again%20%7D%20%2F%3E%3C%2Fbutton%3E%20%3C%2Foptions%3E%5Cn%5Ct%5Ct%3Csetting%20x-for%3D%5C%22background-music%5C%22%20x-be%3D%7B%20on_off%20(_background_music_on)%20%7D%20fn%3D%7B%20toggle_background_music%20%7D%20%3E%5Cn%5Ct%5Ct%5Ct%3Cimg%20src%3D%7B%20background_music_img%20(_background_music_on)%20%7D%20%2F%3E%20%3C%2Fsetting%3E%20%3C%2Fgame-over-etc%3E%2C%5Cn%5Ctwhere%5Cn%5Ct%2C%20_background_music_on%20%3D%20mark%20(ambient_background_music_on_state)%5Cn%5Ct%2C%20show_results%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(lookbehind%20.show_results))%20(lookbehind_state)%20%7D)%7D)%7D%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Cn%5Ct%2C%20problems_analysis%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(lookbehind%20.problems_analysis%20(%5B%5D)))%20(lookbehind_state)%20%7D)%7D)%7D%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Cn%5Ct%2C%20students_analysis%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(lookbehind%20.students_analysis%20(%5B%5D)))%20(lookbehind_state)%20%7D)%7D)%7D%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Cn%5Ct%2C%20play_again%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(feedback%20.reset%20(uniq%20())))%20(feedback_state)%20%7D)%7D)%7D%20%20%5Cn%5Ct%2C%20toggle_background_music%20%3D%20_dom%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(not)%20(ambient_background_music_on_state)%20%7D)%20%7D)%20%7D%20)%3D%3E_)%20%5Cn%5Cn%5CnS%20.root%20(die%20%3D%3E%20%7B%5Cn%5Ct%3Bwindow%20.die%20%3D%20%7B%20...%20(window%20.die%20%7C%7C%20%7B%7D)%2C%20view%3A%20die%20%7D%5Cn%5Ct%3Bwindow%20.view%20%3D%20%3Cteacher-app%3E%5Cn%5Ct%5Ct%7B%20!!%20L_%20.isDefined%20(mark%20(app_setup_state))%5Cn%5Ct%5Ct%3F%20setup_view%5Cn%5Ct%5Ct%3A%20L_%20.isDefined%20(mark%20(app_get_ready_state))%5Cn%5Ct%5Ct%3F%20get_ready_view%5Cn%5Ct%5Ct%3A%20L_%20.isDefined%20(mark%20(app_playing_state))%5Cn%5Ct%5Ct%3F%20playing_view%5Cn%5Ct%5Ct%3A%20L_%20.isDefined%20(mark%20(app_game_over_state))%5Cn%5Ct%5Ct%3F%20game_over_view%5Cn%5Ct%5Ct%3A%20panic%20('undefined%20app%20state%20in%20view')%20%20%7D%20%3C%2Fteacher-app%3E%20%7D)%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%2F%2F%20transitions%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cnvar%20get_room%20%3D%20impure%20(_room%20%3D%3E%20%5Cn%5Ctsuppose%20(%5Cn%5Ct(%20_settings%20%3D%20show%20(app_settings_state)%5Cn%5Ct)%20%3D%3E%5Cn%5Ctgo%5Cn%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bplease%20(L_%20.set%20(io%20.connecting))%20(io_state)%20%7D)%5Cn%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ctapi%20(_room)%5Cn%5Ct%5Ct.then%20(panic_on%20(%5B%20%5B%20L%20.isDefined%20(L%20.leafs)%2C%20_room%20%2B%20'%20taken'%5D%20%5D))%20)%5Cn%5Ct%2F%2F%20RACE%20CONDITION%5Cn%5Ct.then%20(_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%5Ctapi%20(_room%2C%20_create_message)%5Cn%5Ct%5Ct.then%20(panic_on%20(%5B%5Cn%5Ct%5Ct%5Ct%5B%20L%20.get%20(%5B%20'ok'%2C%20L%20.complement%20%5D)%2C%20'cannot%20post%20to%20'%20%2B%20_room%20%5D%20%5D))%2C%5Cn%5Ct%5Ctwhere%5Cn%5Ct%5Ct%2C%20_problems%20%3D%20T%20(_settings)%20(L%20.get%20(settings_as_problems))%5Cn%5Ct%5Ct%2C%20_rules%20%3D%20T%20(_settings)%20(L%20.get%20(settings_as_rules%20))%5Cn%5Ct%5Ct%2C%20_create_message%20%3D%20message%20.teacher_settings%20(settings%20.settings%20(_problems%2C%20_rules))%20)%3D%3E_)%20)%5Cn%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bplease%20(L_%20.set%20(teacher_app%20.get_ready%20(_room%2C%20_settings%2C%20%5B%5D)))%20(app_state)%20%7D)%5Cn%5Ct.catch%20(_e%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bconsole%20.error%20(_e)%20%7D)%5Cn%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bplease%20(L_%20.set%20(io%20.inert))%20(io_state)%20%7D)%20))%5Cn%5Cnvar%20start_playing%20%3D%20impure%20(_%20%3D%3E%5Cn%5Ctsuppose%20(%5Cn%5Ct(%20_room%20%3D%20show%20(app_room_state)%5Cn%5Ct)%20%3D%3E%5Cn%5Ctgo%5Cn%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bplease%20(L_%20.set%20(io%20.messaging))%20(io_state)%20%7D)%5Cn%5Ct.then%20(_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%5Ctapi%20(_room%2C%20playing_message)%5Cn%5Ct%5Ct.then%20(panic_on%20(%5B%5Cn%5Ct%5Ct%5Ct%5B%20L%20.get%20(%5B%20'ok'%2C%20L%20.complement%20%5D)%2C%20'cannot%20post%20to%20'%20%2B%20_room%20%5D%20%5D)%20)%2C%5Cn%5Ct%5Ctwhere%5Cn%5Ct%5Ct%2C%20playing_message%20%3D%20message%20.teacher_progress%20(%5B%200%2C%20schedule_start%20(show%20(ensemble_state))%20%5D)%20)%3D%3E_)%20)%5Cn%5Ct.catch%20(_e%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bconsole%20.error%20(_e)%20%7D)%5Cn%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bplease%20(L_%20.set%20(io%20.inert))%20(io_state)%20%7D)%20)%20)%5Cn%5Cnvar%20broadcast_progress%20%3D%20impure%20(_progress%20%3D%3E%5Cn%5Ctgo%5Cn%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bplease%20(L_%20.set%20(io%20.messaging))%20(io_state)%20%7D)%5Cn%5Ct.then%20(_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%5Ctapi%20(_room%2C%20progress_message)%5Cn%5Ct%5Ct.then%20(panic_on%20(%5B%5Cn%5Ct%5Ct%5Ct%5B%20L%20.get%20(%5B%20'ok'%2C%20L%20.is%20(false)%20%5D)%2C%20'cannot%20post%20to%20'%20%2B%20_room%20%5D%20%5D)%20)%2C%5Cn%5Ct%5Ctwhere%5Cn%5Ct%5Ct%2C%20_room%20%3D%20show%20(app_room_state)%5Cn%5Ct%5Ct%2C%20progress_message%20%3D%20message%20.teacher_progress%20(_progress)%20)%3D%3E_)%20)%5Cn%5Ct.catch%20(_e%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bconsole%20.error%20(_e)%20%7D)%5Cn%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bplease%20(L_%20.set%20(io%20.inert))%20(io_state)%20%7D)%20)%5Cn%5Cnvar%20end_game%20%3D%20_%20%3D%3E%20%7B%5Cn%5Ct%3Bplease%20(teacher_app_playing_to_game_over)%20(app_state)%20%7D%5Cn%5Cnvar%20broadcast_game_over%20%3D%20impure%20(_%20%3D%3E%5Cn%5Ctgo%5Cn%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bplease%20(L_%20.set%20(io%20.messaging))%20(io_state)%20%7D)%5Cn%5Ct.then%20(_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%5Ctapi%20(_room%2C%20progress_message)%5Cn%5Ct%5Ct.then%20(panic_on%20(%5B%5Cn%5Ct%5Ct%5Ct%5B%20L%20.get%20(%5B%20'ok'%2C%20L%20.is%20(false)%20%5D)%2C%20'cannot%20post%20to%20'%20%2B%20_room%20%5D%20%5D)%20)%2C%5Cn%5Ct%5Ctwhere%5Cn%5Ct%5Ct%2C%20_room%20%3D%20show%20(app_room_state)%5Cn%5Ct%5Ct%2C%20progress_message%20%3D%20message%20.teacher_progress%20(%5B%20-1%2C%20%2B%20(new%20Date)%20%5D)%20)%3D%3E_)%20)%5Cn%5Ct.catch%20(_e%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bconsole%20.error%20(_e)%20%7D)%5Cn%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%3Bplease%20(L_%20.set%20(io%20.inert))%20(io_state)%20%7D)%20)%5Cn%5Cnvar%20reset_game%20%3D%20_%20%3D%3E%20%7B%5Cn%5Ct%3Bplease%20(L_%20.set%20(teacher_app%20.setup%20(default_settings)))%20(app_state)%20%7D%5Cn%5Cn%5Ct%5Ct%5Ct%5Ct%5Cn%5Ct%5Ct%5Ct%5Ct%5Cn%5Ct%5Ct%5Ct%5Ct%5Cn%2F%2F%20resource%20rules%5Ct%5Ct%5Ct%5Ct%5Cn%5Cnvar%20%5B%20time%2C%20ticking%20%5D%20%3D%20timer%20()%5Cnvar%20%5B%20clock%2C%20fine_clock%20%5D%20%3D%20S%20.root%20(die%20%3D%3E%20%5Cn%5Ct(%20(window%20.die%20%3D%20%7B%20...%20(window%20.die%20%7C%7C%20%7B%7D)%2C%20clock%3A%20die%20%7D)%5Cn%5Ct%2C%20S%20.subclock%20(_%20%3D%3E%20%5Cn%5Ct%5Ctsuppose%20(%5Cn%5Ct%5Ct(%20_clock%20%3D%20S%20.value%20()%5Cn%5Ct%5Ct%2C%20_fine_clock%20%3D%20S%20.value%20()%5Cn%5Ct%5Ct%2C%20%24__ticking%20%3D%20S%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ctif%20(ticking%20()%20%26%26%20L_%20.isDefined%20(mark%20(app_progress_timestamp_state)))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ctvar%20_timestamp%20%3D%20mark%20(app_progress_timestamp_state)%5Cn%5Ct%5Ct%5Ct%5Ctvar%20_fine_tick%20%3D%20(time%20()%20-%20_timestamp)%20%2F%201000%5Cn%5Ct%5Ct%5Ct%5Ctvar%20_tick%20%3D%20Math%20.floor%20(_fine_tick)%5Cn%5Ct%5Ct%5Ct%5Ctif%20(_tick%20%3E%3D%200)%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3B_clock%20(_tick)%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3B_fine_clock%20(_fine_tick)%20%7D%20%7D%20%7D)%5Cn%5Ct%5Ct)%20%3D%3E%5Cn%5Ct%5Ct%5B%20_clock%2C%20_fine_clock%20%5D%20)%20)%20))%5Cn%5Cn%5Cn%5Ct%5Ct%5Ct%5Ct%5Cnvar%20reping_period%20%3D%203%5Cnvar%20heartbeat%20%3D%20S%20.data%20(reping_period)%20%5Cn%5Ct%5Cnvar%20connection%20%3D%20S%20.root%20(die%20%3D%3E%5Cn%5Ct(%20(window%20.die%20%3D%20%7B%20...%20(window%20.die%20%7C%7C%20%7B%7D)%2C%20connection%3A%20die%20%7D)%5Cn%5Ct%2C%20S%20(_%20%3D%3E%20%5Cn%5Ct%5CtT%20(mark%20(app_room_state)%5Cn%5Ct%5Ct)%20(%5Cn%5Ct%5CtL%20.get%20(%5Cn%5Ct%5Ct%5B%20L%20.when%20(I)%5Cn%5Ct%5Ct%2C%20_room%20%3D%3E%20api%20.ping%20(_room)%20()%5Cn%5Ct%5Ct%2C%20L%20.when%20(I)%5Cn%5Ct%5Ct%2C%20(%5B%20mean%2C%20variance%2C%20n%2C%20timestamp%20%5D)%20%3D%3E%20%5Cn%5Ct%5Ct%5Ct%5B%20timestamp%2C%20mean%2C%20Math%20.sqrt%20(variance)%20%5D%20%5D%20)%20)%20)%20)%20)%5Cn%5Cn%5Cn%5Cn%2F%2F%20rules%5Cn%5CnS%20.root%20(die%20%3D%3E%20%7B%5Cn%5Ct%3Bwindow%20.die%20%3D%20%7B%20...%20(window%20.die%20%7C%7C%20%7B%7D)%2C%20rules%3A%20die%20%7D%5Cn%5Cn%5Ct%2F%2F%20handle%20user%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%3BS%20(_%20%3D%3E%20%5Cn%5Ct%5CtT%20(mark%20(feedback_state)%5Cn%5Ct%5Ct)%20(%5Cn%5Ct%5Ctpinpoint%20(%5Cn%5Ct%5Ctl_sum%20(%5Cn%5Ct%5Ct%5B%20%5B%20feedback_as_rules_piece%2C%20L%20.when%20(I)%5Cn%5Ct%5Ct%5Ct%2C%20_piece%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ctvar%20piece_details%20%3D%20T%20(_piece)%20(%5B%20L%20.get%20(L%20.values)%2C%20L%20.remove%20(%5BL%20.values%2C%20L%20.when%20(equals%20(undefined))%5D)%20%5D)%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L%20.modify%20(L%20.values)%20(R%20.mergeLeft%20(piece_details)))%20(app_settings_rules_state)%20%7D%20%5D%5Cn%5Ct%5Ct%2C%20%5B%20feedback_as_start%2C%20L%20.when%20(I)%5Cn%5Ct%5Ct%5Ct%2C%20impure%20(_%20%3D%3E%5Cn%5Ct%5Ct%5Ct%5Ctsuppose%20(%5Cn%5Ct%5Ct%5Ct%5Ct(%20_room%20%3D%20Math%20.floor%20(10000%20*%20Math%20.random%20())%5Cn%5Ct%5Ct%5Ct%5Ct)%20%3D%3E%5Cn%5Ct%5Ct%5Ct%5Ctget_room%20(_room)%20)%20)%20%5D%5Cn%5Ct%5Ct%2C%20%5B%20feedback_as_play%2C%20L%20.when%20(I)%5Cn%5Ct%5Ct%5Ct%2C%20impure%20(start_playing)%20%5D%5Cn%5Ct%5Ct%2C%20%5B%20feedback_as_end%2C%20L%20.when%20(I)%5Cn%5Ct%5Ct%5Ct%2C%20impure%20(end_game)%20%5D%5Cn%5Ct%5Ct%2C%20%5B%20feedback_as_reset%2C%20L%20.when%20(I)%5Cn%5Ct%5Ct%5Ct%2C%20impure%20(reset_game)%20%5D%20%5D%20)))%20)%5Cn%5Cn%5Ct%3BS%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ctif%20(mark%20(ambient_background_music_on_state))%20%7B%5Cn%5Ct%5Ct%5Ct%3Bplay%20(audio%20.background)%20%7D%5Cn%5Ct%5Ctelse%20%7B%5Cn%5Ct%5Ct%5Ct%3Bpause%20(audio%20.background)%20%7D%20%7D)%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Ct%2F%2F%20game%20rules%5Cn%5Cn%5Ct%3BS%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ctvar%20_app_progress%20%3D%20show%20(app_progress_state)%5Cn%5Ct%5Ctvar%20_progress%20%3D%20mark%20(ensemble_progress_state)%5Cn%5Ct%5Ct%2F%2F%20is%20there%20a%20more%20elegant%20way%3F%20this%20is%20not%20markovian%20%5Cn%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_get_ready_state)))%20%7B%5Cn%5Ct%5Ct%5Ctif%20(not%20(equals%20(_app_progress)%20(_progress)))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(teacher_app_get_ready_to_playing)%20(app_state)%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(_progress))%20(app_progress_state)%20%7D%20%7D%20%7D)%5Cn%5Cn%5Ct%3BS%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ctif%20(L_%20.isDefined%20(app_setup_state))%20%7B%5Cn%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(lookbehind%20.nothing))%20(lookbehind_state)%5Cn%5Ct%5Ct%5Ct%3Bplease%20(L_%20.remove)%20(ensemble_state)%20%7D%20%7D)%5Cn%5Cn%5Ct%3BS%20((%5B%20last_app_settings_rules_size%2C%20last_app_setup%20%5D)%20%3D%3E%20%7B%5Cn%5Ct%5Ctif%20(!%20L_%20.isDefined%20(last_app_setup))%20%7B%5Cn%5Ct%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_setup_state)))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(shuffle)%20(app_settings_problems_state)%20%7D%20%7D%5Cn%5Cn%5Ct%5Ctif%20(not%20(equals%20(last_app_settings_rules_size)%20(mark%20(app_settings_rules_size_state))))%20%7B%5Cn%5Ct%5Ct%5Ct%3Bplease%20(shuffle)%20(app_settings_problems_state)%20%7D%20%5Cn%5Cn%5Ct%5Ctreturn%20%5B%20mark%20(app_settings_rules_size_state)%2C%20mark%20(app_setup_state)%20%5D%20%7D%5Cn%5Ct%2C%20%5B%20undefined%2C%20undefined%5D)%5Cn%5Cn%5Ct%3BS%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_get_ready_state))%5Cn%5Ct%5Ct%7C%7C%20L_%20.isDefined%20(mark%20(app_playing_state))%5Cn%5Ct%5Ct%7C%7C%20L_%20.isDefined%20(mark%20(app_game_over_state)))%20%7B%5Cn%5Ct%5Ct%5Ctvar%20_ensemble_students%20%3D%20T%20(mark%20(ensemble_pings_state))%20(L%20.collect%20(%5B%20L%20.elems%2C%20map_v_as_key%20%5D))%5Cn%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(_ensemble_students))%20(app_students_state)%20%7D%20%7D)%5Cn%5Cn%5Ct%3BS%20(last_progress%20%3D%3E%20%7B%5Cn%5Ct%5Ctvar%20_progress%20%3D%20mark%20(app_progress_state)%5Cn%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_playing_state)))%20%7B%5Cn%5Ct%5Ct%5Ctif%20(!%20equals%20(_progress)%20(last_progress))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bbroadcast_progress%20(_progress)%20%7D%20%7D%5Cn%5Ct%5Ctreturn%20_progress%20%7D)%5Cn%5Cn%5Ct%3BS%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_playing_state))%5Cn%5Ct%5Ct%7C%7C%20L_%20.isDefined%20(mark%20(app_game_over_state)))%20%7B%5Cn%5Ct%5Ct%5Ctvar%20_ensemble_boards%20%3D%20T%20(mark%20(ensemble_boards_state))%20(L%20.collect%20(L%20.elems))%5Cn%5Ct%5Ct%5Ctvar%20_ensemble_pasts%20%3D%20T%20(mark%20(ensemble_pasts_state))%20(L%20.collect%20(L%20.elems))%5Cn%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(_ensemble_boards))%20(app_boards_state)%5Cn%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(_ensemble_pasts))%20(app_pasts_state)%20%7D%20%7D)%5Cn%5Cn%5Ct%3BS%20(last_bingoes%20%3D%3E%20%7B%5Cn%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_students_map_boards_v_pasts_state)))%20%7B%5Cn%5Ct%5Ct%5Ctvar%20_bingoes%20%3D%5Cn%5Ct%5Ct%5Ct%5CtT%20(mark%20(app_students_map_boards_v_pasts_state)%5Cn%5Ct%5Ct%5Ct%5Ct)%20(%5Cn%5Ct%5Ct%5Ct%5CtL%20.collect%20(%5B%20L%20.elems%2C%20map_v_as_value%2C%20(%5B_board%2C%20_past%5D)%20%3D%3E%20bingoes%20(_board)%20(_past)%2C%20L%20.elems%20%5D))%5Cn%5Ct%5Ct%5Ctif%20(L%20.isDefined%20(%5B%20L%20.elems%2C%20L%20.unless%20(L%20.get%20(%5B%20L%20.valueOr%20(%5B%5D)%2C%20%24%20(R%20.flip%20(R%20.includes))%20%5D)%20(last_bingoes))%20%5D)%20(bingoes))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplay%20(audio%20.teacher_bingo)%20%7D%5Cn%5Ct%5Ct%5Ctreturn%20_bingoes%20%7D%20%7D)%5Cn%5Cn%5Ct%3BS%20(last_tick%20%3D%3E%20%7B%5Cn%5Ct%5Ctvar%20time_limit%20%3D%20mark%20(app_settings_rules_time_limit_state)%5Cn%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_playing_state))%20%26%26%20clock%20()%20%3E%3D%20time_limit)%20%7B%5Cn%5Ct%5Ct%5Ct%3Bplease%20(teacher_app_playing_to_next)%20(app_state)%20%7D%20%7D)%5Cn%5Cn%5Ct%3BS%20(last_app_has_bingoes_ok%20%3D%3E%20%7B%5Cn%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_students_map_boards_v_pasts_state)))%20%7B%5Cn%5Ct%5Ct%5Ctvar%20app_has_bingoes_ok%20%3D%20%5Cn%5Ct%5Ct%5Ct%5CtT%20(mark%20(app_students_map_boards_v_pasts_state)%5Cn%5Ct%5Ct%5Ct%5Ct)%20(%5Cn%5Ct%5Ct%5Ct%5CtL%20.isDefined%20(%5B%20L%20.elems%2C%20map_v_as_value%2C%20(%5B_board%2C%20_past%5D)%20%3D%3E%20bingoes%20(_board)%20(_past)%2C%20L%20.elems%20%5D))%5Cn%5Cn%5Ct%5Ct%5Ctvar%20game_tick%20%3D%20clock%20()%5Cn%5Ct%5Ct%5Ctvar%20_win_rule%20%3D%20mark%20(app_settings_rules_win_rule_state)%5Cn%5Ct%5Ct%5Ctif%20(equals%20(win_rule%20.first_bingo)%20(_win_rule))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_playing_state)))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctif%20(!%20last_app_has_bingoes_ok%20%26%26%20app_has_bingoes_ok)%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3Bend_game%20()%20%7D%20%7D%20%7D%5Cn%5Ct%5Ct%5Ctelse%20if%20(equals%20(win_rule%20.limit_time)%20(_win_rule))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_playing_state)))%20%7B%5Cn%2F%2F%5CtMath%20.floor%20((S%20.sample%20(time)%20-%20T%20(show%20(app_progress_state))%20(L%20.get%20(progress_as_timestamp)))%20%2F%201000)%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctif%20(!%20last_app_has_bingoes_ok%20%26%26%20app_has_bingoes_ok)%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3BsetTimeout%20(_%3D%3E%7B%3Bend_game%20()%7D%2C%208000)%20%7D%20%7D%20%7D%5Cn%5Ct%5Ct%5Ctelse%20if%20(equals%20(win_rule%20.all_problems)%20(_win_rule))%20%7B%20%7D%5Cn%5Cn%5Ct%5Ct%5Ctreturn%20app_has_bingoes_ok%20%7D%20%7D)%5Cn%5Cn%5Ct%3BS%20(last_app_game_over_state%20%3D%3E%20%7B%5Cn%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_game_over_state)))%20%7B%5Cn%5Ct%5Ct%5Ctif%20(!%20L_%20.isDefined%20(last_app_game_over_state))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bbroadcast_game_over%20()%20%7D%20%7D%5Cn%5Ct%5Ctreturn%20mark%20(app_game_over_state)%20%7D)%5Cn%5Cn%5Ct%3BS%20(last_app_game_over_state%20%3D%3E%20%7B%5Cn%5Ct%5Ctif%20(!%20L_%20.isDefined%20(last_app_game_over_state))%20%7B%5Cn%5Ct%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_game_over_state)))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(lookbehind%20.show_results))%20(lookbehind_state)%20%7D%20%7D%5Cn%5Ct%5Ctreturn%20mark%20(app_game_over_state)%20%7D)%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Ct%2F%2F%20misc%5Cn%5Ct%5Cn%5Ct%2F%2F%20time%5Cn%5Ct%3BS%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ctif%20(L_%20.isDefined%20(mark%20(app_get_ready_state)))%20%7B%5Cn%5Ct%5Ct%5Ct%3Bticking%20(false)%20%7D%5Cn%5Ct%5Ctelse%20if%20(L_%20.isDefined%20(mark%20(app_playing_state)))%20%7B%5Cn%5Ct%5Ct%5Ct%3Bticking%20(true)%20%7D%5Cn%5Ct%5Ctelse%20if%20(L_%20.isDefined%20(mark%20(app_game_over_state)))%20%7B%5Cn%5Ct%5Ct%5Ct%3Bticking%20(false)%20%7D%20%7D)%5Cn%5Cn%5Ct%2F%2F%20communication%5Cn%5Ct%3BS%20(_%20%3D%3E%20%5Cn%5Ct%5CtT%20(mark%20(app_room_state)%5Cn%5Ct%5Ct)%20(%5Cn%5Ct%5Ctpinpoint%20(%5Cn%5Ct%5Ct%5B%20L%20.when%20(I)%5Cn%5Ct%5Ct%2C%20_room%20%3D%3E%5Cn%5Ct%5Ct%5Ctsuppose%20(%5Cn%5Ct%5Ct%5Ct(%20phase%20%3D%20heartbeat%20()%5Cn%5Ct%5Ct%5Ct%2C%20critical%20%3D%20phase%20%3D%3D%3D%201%5Cn%5Ct%5Ct%5Ct)%20%3D%3E%5Cn%5Ct%5Ct%5Ct(%20!!%20critical%5Cn%5Ct%5Ct%5Ct%3F%20go%5Cn%5Ct%5Ct%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(io%20.messaging))%20(io_state)%20%7D)%5Cn%5Ct%5Ct%5Ct%5Ct.then%20(_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctapi%20(_room%2C%20ping_message)%2C%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctwhere%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%2C%20ping_message%20%3D%20message%20.teacher_ping%20(S%20.sample%20(connection))%20)%3D%3E_))%5Cn%5Ct%5Ct%5Ct%3A%20go%5Cn%5Ct%5Ct%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(io%20.heartbeat))%20(io_state)%20%7D)%5Cn%5Ct%5Ct%5Ct%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctapi%20(_room)%20)%5Cn%5Ct%5Ct%5Ct%5Ct.then%20(_ensemble%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctif%20(equals%20(_room)%20(show%20(app_room_state)))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(_ensemble))%20(ensemble_state)%20%7D%20%7D)%20)%5Cn%5Ct%5Ct%5Ct.catch%20(%5Cn%5Ct%5Ct%5Ct%5Ctpinpoint%20(%5Cn%5Ct%5Ct%5Ct%5Ctl_point_sum%20(%5Cn%5Ct%5Ct%5Ct%5Ct%5B%20'error'%2C%20L%20.is%20('timeout')%2C%20L%20.when%20(I)%2C%20_%20%3D%3E%20%7B%3Bconsole%20.warn%20('Room%20timed%20out')%7D%20%5D%2C%5Cn%5Ct%5Ct%5Ct%5Ct%5B%20panic%20%5D%20)%20)%20)%5Cn%5Ct%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3BsetTimeout%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bheartbeat%20(!!%20critical%20%3F%20reping_period%20%3A%20phase%20-%201)%20%7D%5Cn%5Ct%5Ct%5Ct%5Ct%2C%20300)%20%7D)%5Cn%5Ct%5Ct%5Ct.catch%20(_e%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bconsole%20.error%20(_e)%5Cn%5Ct%5Ct%5Ct%5Ct%3BsetTimeout%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bheartbeat%20(phase)%20%7D%5Cn%5Ct%5Ct%5Ct%5Ct%2C%20300)%20%7D)%5Cn%5Ct%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bplease%20(L_%20.set%20(io%20.inert))%20(io_state)%20%7D)%20)%20%5D)%20)%20)%20%7D)%5Cn%22%5D%2C%22names%22%3A%5B%5D%2C%22mappings%22%3A%22AAAA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2C2BAA2B%3B%3B%3B%3BiBAAiB%3B%3BIAAoB%3BAAChE%2CgCAAgC%3B%3B%3BaAAU%3B%3B%3BIAAuB%3BAACjE%3BAACA%3BAACA%2CGAAG%3B%3B%3BwBAAQ%3B%3BIAAgB%3BAAC3B%2CGAAG%3B%3B%3B%3B%3BuBACoC%3B%3B%3B0BAClB%3B%3B%3BuBACkB%3BIAF%2FB%2C8CAAI%3BIAEJ%2C8CAAI%3B%3BIAA2D%3BAACvE%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CGAAG%3B%3B%3B%3B%3B%3B%2BBAEmB%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B8BA0BoD%3B%3B%3B%3B%3B8BACD%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BIAvBrE%2CqEAAC%3BAACL%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BIAEI%2CqEAAC%3BAACL%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BIAC2C%2C8CAAI%3BIACN%2C8CAAI%3BIAC1C%2CqEAAC%3BAACJ%2CGAAG%3B%3B%3B6BAAY%3B%3B%3BIAAyC%3BAACxD%3BAACA%3BIAG0C%2CoEAAmC%3BIAA9B%2C8CAAI%3BIACT%2CoEAAmC%3BIAA9B%2C8CAAI%3BIACT%2CoEAAmC%3BIAA9B%2C8CAAI%3BIACwD%2CqDAAU%3BIAAnH%3B%3BiDAAwC%3B%3BIAAiC%2C8CAAI%3B%3BIAA8G%3BAAC7L%3BAACA%2CGAAG%3B%3B%3B%3B%3B4BACoB%3B%3B%3B%3B%3B%3BgDAE%2BC%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BIAA9B%2C8CAAI%3BIAEtB%2C8HAAC%3BIAA4D%2C4HAAC%3BIAChF%2CqEAAC%3BAACL%2CIAAI%3B%3B%3B%3B%3ByCAA4B%3B%3B2BAA2B%3B%3B%2BBAAuC%3B%3BIAA4B%3BAAC9H%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BIAEG%2CqDAAU%3BIADX%3B%3BiDAAwC%3B%3BIAAiC%2C8CAAI%3B%3BIACM%3BAACrF%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CCAAC%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BIACO%2CqEAAC%3BIAA6C%2CqEAAC%3BIAE7C%2CqEAAC%3BIAAoD%2CqEAAC%3BIAClD%2CqEAAC%3BAACf%2CIAAI%3B%3B%3BwBAEE%3BIAFF%2CkEAAiB%3BAACrB%3B%3BIACwB%3BAACxB%3BAACA%3BIACE%2CqEAAC%3BAACH%2CEAAE%3B%3B%3B%3B%3B%3BiBAA6D%3BIAA%2FB%2C8CAAI%3B%3BIAAmD%3BAACvF%3BAACA%3BIAC2G%2CqDAAU%3BIAAnH%3B%3BiDAAwC%3B%3BIAAiC%2C8CAAI%3B%3BIAAkH%3BAACjM%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CCAAC%3B%3B%3B%3B%3B%3BIAAQ%2CqEAAC%3BAACV%2CEAAE%3B%3B%3BIAAA%3B4CAAe%3BiCAAmC%3B%3B%3BIAAyB%3B%3BIAAc%3BAAC3F%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CCAAC%3B%3B%3B%3B%3B%3BIAAW%2CqEAAC%3BAACb%2CEAAE%3B%3B%3B%3B6CACgB%3B6BAAkB%3B%3BoCAAmB%3B%3B6BACzC%3B%3B%3B%3B%3B%3B%3B%3B%3BIAAc%2CqEAAC%3BAAC7B%2CIAAI%3B%3B%3B%3B%3B%3BIAAM%2CqEAAC%3BAACX%2CuBAAuB%3B%3B%3B%3B%3BIAAiB%3BAACxC%2COAAO%2CyCAAQ%3BAACf%3BAACA%3BAACA%3B%3BIAAuF%3BIAC3E%2CqEAAC%3B%3BIAA2D%3BAACxE%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3B%3BIAA8D%3BAAC9D%3BAACA%3BAACA%3BAACA%2CGAAG%3B%3B%3B%3B%3B%3BqCAEmB%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B2EAME%3B6DAA0B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BkCAOuB%3B%3B%3B%3B%3BkCACN%3B%3B%3B%3B%3BIAbhD%2CqEAAC%3BIAAkC%2CqEAAC%3BIAAkB%2CqEAAC%3BIAGtE%2CqEAAC%3BAACL%3BIAGI%2CqEAAC%3BAACL%3BIACI%2CqEAAC%3BAACL%2CIAAI%3B%3B%3BaAAU%3B%3BIAAqB%3BIAEO%2C8CAAI%3BIACT%2C8CAAI%3BIACkE%2CqDAAU%3BIAAnH%3B%3BiDAAwC%3B%3BIAAiC%2C8CAAI%3B%3BIAAgH%3BAAC%2FL%3BAACA%2CGAAG%3B%3B%3B%3B%3B%3BqCAEmB%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BkCAIiD%3B%3B%3B%3B%3BkCACJ%3B%3B%3B%3B%3B%3BIAJhD%2CqEAAC%3BIAAkC%2CqEAAC%3BIAAkB%2CqEAAC%3BIACxE%2CqEAAC%3BIAEsC%2C8CAAI%3BIACR%2C8CAAI%3BIAEtC%2CqDAAU%3BIADX%3B%3BiDAAwC%3B%3BIAAiC%2C8CAAI%3B%3BIACS%3BAACxF%3BAACA%2CGAAG%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BkDAKgE%3B%3B%3B%3B%3BkDACM%3BIADnC%2C8CAAI%3BIACC%2C8CAAI%3B%3BIAA8F%3BAAC7I%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CEAAE%3B%3B%3B%3B%3B%3B%3B%2BBAEiD%3B%3B%3B%3B2CACwB%3B%3B%3B%3B4CACV%3B%3B%3B%3B8CACgB%3B%3B%3B%3B%3B%3B%3BIAHvE%2CqEAAC%3BIACW%2CqEAAC%3BIACA%2CqEAAC%3BIACC%2CqEAAC%3BIACH%2CqEAAC%3BAACxB%2CIAAI%3B%3B%3B%3B6BACQ%3B%3ByCACY%3B%3B0CACC%3B%3B%3BIACC%2CuFAAC%3B%3BIAAoE%3BAAC%2FF%3BAACA%3BAACA%3BAACA%3B%3BIAAoH%3BAACpH%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CEAAE%3B%3B%3B%3B%3B%3B%3BmCAEyD%3B%3B%3B%3B4CACkB%3B%3B%3B%3BqDACkB%3B%3B%3B%3B8CACd%3B%3B%3B%3B%3B%3B%3BIAHnE%2CqEAAC%3BIACQ%2CqEAAC%3BIACQ%2CqEAAC%3BIACR%2CqEAAC%3BIACH%2CqEAAC%3BAACxB%2CIAAI%3B%3B%3B%3B%3B2BACqB%3B%3B0CACA%3B%3B%3B%3BIACQ%2C8FAAC%3BIACR%2CuFAAC%3B%3BIAAoE%3BAAC%2FF%3BAACA%3BAACA%3BAACA%3B%3BIAAiI%3BAACjI%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CCAAC%3B%3B%3B%3B%3B%3BqCAEqB%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BkCAc8C%3B%3B%3B%3B%3B%3BIAZN%2C6DAAU%3BIAA%2FB%2C8CAAI%3BIAC2B%2C6DAAU%3BIAApC%2C8CAAI%3BIACsB%2C6DAAU%3BIAApC%2C8CAAI%3BIAC%2FC%2CqEAAC%3BAACJ%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BIAEuC%2C8CAAI%3BIAExC%2CqDAAU%3BIADX%3B%3BiDAAwC%3B%3BIAAiC%2C8CAAI%3B%3BIACW%3BAAC1F%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CiBAAiB%3B%3B%3B%3B%3BIACf%2CqEAAC%3BAACH%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3B%3BIAA2D%3BAAC3D%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%22%7D
