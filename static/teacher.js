var { bool, number, timestamp, string,
list, map, maybe, nat, id, v, piece, order,
order_sort, direction_opposite, toggle_order, 
shuffle, uuid, map_zip, under, api, post,
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
as_solved_on, attempted_positions, solved_positions, bingoed_positions, bingoes,
T, $, apply, L, R, S, Z, Z_, Z$, sanc, memoize, 
so, by, 
go, never, panic, panic_on,
just_now, temporal,
fiat, data, data_lens, data_iso, data_kind,
focused_iso_,
n_reducer, l_sum,
map_defined_, map_defined, from_just, 
as_sole, sole, shuffle,
I, K, not, equals
} = window .stuff





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







var app_state = S .data (teacher_app .setup (default_settings))

var io_state = S .data (io .inert)
var ensemble_state = S .data (ensemble .nothing)

//var feedback_state = S .data (temporal ())
var feedback_state = temporal ()
var lookbehind_state = S .data (lookbehind .nothing)
var ambient_state = S .data (ambient .ambient (true))







var clicking = ['click', 'touchstart'] .filter (_e => 'on' + _e in window) .slice (0, 1)
var audio = {
  bingo: new Audio ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudent-bingo.mp3?1546277231054'),
  background: new Audio ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fbackground.mp3?1546277343019') }
;audio .background .loop = true

var setup_view = _ => so ((_=_=>
  !! L .isDefined (lookbehind_as_nothing) (_lookbehind)
  ? 
  (function () {
    var __, __div1, __div1_a_title1, __div1_a_title1_img1, __div1_sub_title2, __div1_settings3, __div1_settings3_setting1, __div1_settings3_setting1_insert1, __div1_settings3_setting2, __div1_settings3_setting2_insert1, __div1_button4, __div1_button4_img1, __div1_button5, __div1_button5_img1, __div1_button5_insert2, __div2, __div2_settings1, __div2_settings1_setting1, __div2_settings1_setting1_img1, __div2_settings1_setting2, __div2_settings1_setting2_img1, __div2_settings1_setting3, __div2_settings1_setting3_img1, __setting3, __setting3_img1;
    __ = Surplus.createElement("setup-etc", null, null);
    __div1 = Surplus.createElement("div", "left-pane", __);
    __div1_a_title1 = Surplus.createElement("a-title", null, __div1);
    __div1_a_title1_img1 = Surplus.createElement("img", null, __div1_a_title1);
    __div1_a_title1_img1.src =  logo_img ;
    __div1_sub_title2 = Surplus.createElement("sub-title", null, __div1);
    __div1_sub_title2.textContent = "除法（一）";
    __div1_settings3 = Surplus.createElement("settings", null, __div1);
    Surplus.setAttribute(__div1_settings3, "x-for", "game-mode time-limit");
    Surplus.assign(__div1_settings3.style, { marginTop: '20px' });
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
    Surplus.assign(__div1_button4.style, { marginTop: '25px' });
    __div1_button4_img1 = Surplus.createElement("img", null, __div1_button4);
    __div1_button4_img1.src =  preview_img ;
    __div1_button5 = Surplus.createElement("button", null, __div1);
    Surplus.setAttribute(__div1_button5, "x-custom", "true");
    Surplus.setAttribute(__div1_button5, "x-for", "start");
    __div1_button5_img1 = Surplus.createElement("img", null, __div1_button5);
    __div1_button5_img1.src =  start_img ;
    __div1_button5_insert2 = Surplus.createTextNode('', __div1_button5)
    Surplus.createTextNode(" ", __div1_button5)
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
    Surplus.setAttribute(__setting3, "x-for", "background-music");
    Surplus.setAttribute(__setting3, "x-be",  _background_music_on ? 'off' : 'on' );
    __setting3_img1 = Surplus.createElement("img", null, __setting3);
    __setting3_img1.src =  _background_music_on ? music_on_img : music_off_img ;
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  $ (counter_setting
          ) ('遊戲模式：'
          ) (_win_rule => {
              var rules_delta = T (_win_rule) (L .get (L.inverse (data_iso (rules .rules) .win_rule)))
              ;feedback_state (feedback .setup_rules (rules_delta)) }
          ) (
          [ [ win_rule .first_bingo, play_to_win_img ]
          , [ win_rule .limit_time, time_limit_play_img ]
          , [ win_rule .all_problems, free_play_img ] ]
          ) (_win_rule) ); }, { start: __div1_settings3_setting1_insert1, end: __div1_settings3_setting1_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  $ (counter_setting
          ) ('各題作答時限：'
          ) (_time_limit => {;
              var rules_delta = T (_time_limit) (L .get (L.inverse (data_iso (rules .rules) .time_limit)))
              ;feedback_state (feedback .setup_rules (rules_delta)) }
          ) (
          [ [ 10, ten_secs_img ]
          , [ 20, twenty_secs_img ]
          , [ 30, thirty_secs_img ] ]
          ) (_time_limit) ); }, { start: __div1_settings3_setting2_insert1, end: __div1_settings3_setting2_insert1 });
    Surplus.S.effect(function (__state) { return ( setup_preview )(__div1_button4, __state); });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (io_state ()
          ) (
          [ L .get ([io_as_connecting, as_maybe])
          , Z_ .maybe ([]) (K (
              (function () {
    var __;
    __ = Surplus.createElement("div", null, null);
    Surplus.assign(__.style, { height: 0 });
    __.textContent = "遊戲正在開始…";
    return __;
})())) ]) ); }, { start: __div1_button5_insert2, end: __div1_button5_insert2 });
    Surplus.S.effect(function (__state) { return ( feedback_start )(__div1_button5, __state); });
    Surplus.S.effect(function () { __div2_settings1_setting1_img1.src =  !! equals (_size) (3) ? three_by_three_on_img : three_by_three_off_img ; });
    Surplus.S.effect(function (__state) { return ( feedback_size (3) )(__div2_settings1_setting1_img1, __state); });
    Surplus.S.effect(function () { __div2_settings1_setting2_img1.src =  !! equals (_size) (4) ? four_by_four_on_img : four_by_four_off_img ; });
    Surplus.S.effect(function (__state) { return ( feedback_size (4) )(__div2_settings1_setting2_img1, __state); });
    Surplus.S.effect(function () { __div2_settings1_setting3_img1.src =  !! equals (_size) (5) ? five_by_five_on_img : five_by_five_off_img ; });
    Surplus.S.effect(function (__state) { return ( feedback_size (5) )(__div2_settings1_setting3_img1, __state); });
    Surplus.S.effect(function (__state) { return ( toggle_background_music )(__setting3, __state); });
    return __;
})()
  : L .isDefined (lookbehind_as_preview_questions) (_lookbehind)
  ? 
  (function () {
    var __, __title_etc1, __title_etc1_a_title1, __title_etc1_a_title1_img1, __preview_questions_etc2, __preview_questions_etc2_button1, __preview_questions_etc2_button1_img1, __preview_questions_etc2_preview_questions2, __preview_questions_etc2_preview_questions2_labels1, __preview_questions_etc2_preview_questions2_labels1_question1, __preview_questions_etc2_preview_questions2_labels1_answer2, __preview_questions_etc2_preview_questions2_insert2, __setting3, __setting3_img1;
    __ = Surplus.createElement("setup-etc", null, null);
    __title_etc1 = Surplus.createElement("title-etc", null, __);
    __title_etc1_a_title1 = Surplus.createElement("a-title", null, __title_etc1);
    __title_etc1_a_title1_img1 = Surplus.createElement("img", null, __title_etc1_a_title1);
    __title_etc1_a_title1_img1.src =  logo_img ;
    Surplus.createTextNode(" ", __title_etc1)
    __preview_questions_etc2 = Surplus.createElement("preview-questions-etc", null, __);
    __preview_questions_etc2_button1 = Surplus.createElement("button", null, __preview_questions_etc2);
    Surplus.setAttribute(__preview_questions_etc2_button1, "x-custom", "true");
    Surplus.setAttribute(__preview_questions_etc2_button1, "x-for", "back");
    __preview_questions_etc2_button1_img1 = Surplus.createElement("img", null, __preview_questions_etc2_button1);
    __preview_questions_etc2_button1_img1.src =  back_img ;
    __preview_questions_etc2_preview_questions2 = Surplus.createElement("preview-questions", null, __preview_questions_etc2);
    __preview_questions_etc2_preview_questions2_labels1 = Surplus.createElement("labels", null, __preview_questions_etc2_preview_questions2);
    __preview_questions_etc2_preview_questions2_labels1_question1 = Surplus.createElement("question", null, __preview_questions_etc2_preview_questions2_labels1);
    __preview_questions_etc2_preview_questions2_labels1_question1.textContent = "題目";
    __preview_questions_etc2_preview_questions2_labels1_answer2 = Surplus.createElement("answer", null, __preview_questions_etc2_preview_questions2_labels1);
    __preview_questions_etc2_preview_questions2_labels1_answer2.textContent = "答案";
    __preview_questions_etc2_preview_questions2_insert2 = Surplus.createTextNode('', __preview_questions_etc2_preview_questions2)
    __setting3 = Surplus.createElement("setting", null, __);
    Surplus.setAttribute(__setting3, "x-for", "background-music");
    Surplus.setAttribute(__setting3, "x-be",  _background_music_on ? 'off' : 'on' );
    __setting3_img1 = Surplus.createElement("img", null, __setting3);
    __setting3_img1.src =  _background_music_on ? music_on_img : music_off_img ;
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__state) { return ( preview_back )(__preview_questions_etc2_button1, __state); });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (_problems
          ) (
          L .collect ([ L .elems, (_problem, i) => so ((_=_=>
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
})(),
            where
            , question_image = T (_problem) (L .get ([ problem_as_question, question_as_image ]))
            , answer = T (_problem) (L .get ([ problem_as_question, question_as_solution ]))
          )=>_) ])) ); }, { start: __preview_questions_etc2_preview_questions2_insert2, end: __preview_questions_etc2_preview_questions2_insert2 });
    Surplus.S.effect(function (__state) { return ( toggle_background_music )(__setting3, __state); });
    return __;
})()
  : (lookbehind_state (lookbehind .nothing), []),
  where
/*                           
      , _case_v_img = T (case_v_img_list) (L .get (L .find (under (L .first) (iso => L .and (iso) (_case)))))
      , _case_index = T (case_v_img_list) (L .getAs ((_, i) => i) (L .find (under (L .first) (iso => L .and (iso) (_case)))))
      , _case_iso = T (_case_v_img) (L .get (L .first))
      , _case_img = T (_case_v_img) (L .get (L .last))
            ;_dom .addEventListener (click, _ => {;feedback_case (T (_case) (L .get ([_case_iso, L .inverse (prev_case_iso)])))}) }) }
          , [ [ L .normalize (L .modify ([ win_rule_as_time_limit, L .valueOr (15) ]) (I)), win_rule_as_limit_time ], time_limit_play_img ]
*/
  , _lookbehind = lookbehind_state () 
  , _settings = T (app_state ()) (L .get (app_as_settings))
  , _problems = T (_settings) (L .get (settings_as_problems))
  , _time_limit = T (_settings) (L .get ([ settings_as_rules, rules_as_time_limit ]))
  , _size = T (_settings) (L .get ([ settings_as_rules, rules_as_size ]))
  , _win_rule = T (_settings) (L .get ([ settings_as_rules, rules_as_win_rule ]))
  , _background_music_on = L .get (ambient_as_background_music_on) (ambient_state ())
  , logo_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flogo.png?1546759647786' 
	, play_to_win_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fplay-to-win.png?1541182355223'
	, time_limit_play_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ftime-limit-play.png?1550392930019'
	, free_play_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Ffree-play.png?1550392925661'
  , ten_secs_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F10-secs.png?1541182690288'
  , twenty_secs_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F20-secs.png?1541563332669'
  , thirty_secs_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F30-secs.png?1541563332968'
	, preview_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-preview.png?1541183674936'
	, start_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-start.png?1541183674879'
	, back_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fcounter-prev.png?1541181538486'
	, three_by_three_on_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F3x3-on.png?1550827378072'
	, three_by_three_off_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F3x3-off.png?1550827377940'
	, four_by_four_on_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F4x4-on.png?1550827378011'
	, four_by_four_off_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F4x4-off.png?1550827378248'
	, five_by_five_on_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F5x5-on.png?1550827377693'
	, five_by_five_off_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F5x5-off.png?1550827379773'
  , music_on_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fmusic-on.png?1546759646100'
  , music_off_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fmusic-off.png?1547792522660'
// TODO: fix layout of unloaded imgs
  , counter_setting = label => feedback_case => case_v_img_list => _case => so ((_=_=>
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
    __prev1_img1.src =  prev_img ;
    __counter2 = Surplus.createElement("counter", null, __);
    __counter2_img1 = Surplus.createElement("img", null, __counter2);
    __counter2_img1.src =  data_img ;
    __next3 = Surplus.createElement("next", null, __);
    __next3_img1 = Surplus.createElement("img", null, __next3);
    __next3_img1.src =  next_img ;
    Surplus.S.effect(function (__state) { return ( feedback_prev )(__prev1, __state); });
    Surplus.S.effect(function (__state) { return ( feedback_next )(__next3, __state); });
    return __;
})() ],
      where
      , case_list_length = R .length (case_v_img_list)
      , wrap_case_index = i => ((i % case_list_length) + case_list_length) % case_list_length
      , data_img = T (case_v_img_list) (L .get ([ L .find (under (L .first) (equals (_case))), L .last ]))
      , data_index = T (case_v_img_list) (L .getAs ((_, i) => i) (L .find (under (L .first) (equals (_case)))))
      , prev_case = T (case_v_img_list) (L .get ([ L .index (wrap_case_index (data_index - 1)), L .first ]))
      , next_case = T (case_v_img_list) (L .get ([ L .index (wrap_case_index (data_index + 1)), L .first ]))
      , prev_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fcounter-prev.png?1541181538486'
      , next_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fcounter-next.png?1541181537950'
      , feedback_prev = _dom => {;
          ;clicking .forEach (click => {;
            ;_dom .addEventListener (click, _ => {;feedback_case (prev_case)}) }) }
      , feedback_next = _dom => {;
          ;clicking .forEach (click => {;
            ;_dom .addEventListener (click, _ => {;feedback_case (next_case)}) }) } )=>_)
  , feedback_start = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;feedback_state (feedback .start) }) }) }
  , feedback_size = _size => _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          var rules_delta = T (_size) (L .get (L.inverse (data_iso (rules .rules) .size)))
          ;feedback_state (feedback .setup_rules (rules_delta)) }) }) }
  , setup_preview = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;lookbehind_state (lookbehind .preview_questions) }) }) }
  , preview_back = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;lookbehind_state (lookbehind .nothing) }) }) }
  , toggle_background_music = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;ambient_state (T (S .sample (ambient_state)) (L .modify (ambient_as_background_music_on) (R .not))) }) }) } )=>_)

var get_ready_view = _ => so ((_=_=>
	(function () {
    var __, __room1, __room1_insert2, __students_etc2, __students_etc2_label1, __students_etc2_label1_insert2, __students_etc2_students2, __students_etc2_students2_insert1, __insert3, __setting4, __setting4_img1;
    __ = Surplus.createElement("get-ready-etc", null, null);
    __room1 = Surplus.createElement("room", null, __);
    Surplus.createTextNode("遊戲室編號：", __room1)
    __room1_insert2 = Surplus.createTextNode('', __room1)
    __students_etc2 = Surplus.createElement("students-etc", null, __);
    __students_etc2_label1 = Surplus.createElement("label", null, __students_etc2);
    Surplus.createTextNode("人數：", __students_etc2_label1)
    __students_etc2_label1_insert2 = Surplus.createTextNode('', __students_etc2_label1)
    __students_etc2_students2 = Surplus.createElement("students", null, __students_etc2);
    __students_etc2_students2_insert1 = Surplus.createTextNode('', __students_etc2_students2)
    Surplus.createTextNode(" ", __students_etc2_students2)
    Surplus.createTextNode(" ", __students_etc2)
    __insert3 = Surplus.createTextNode('', __)
    __setting4 = Surplus.createElement("setting", null, __);
    Surplus.setAttribute(__setting4, "x-for", "background-music");
    Surplus.setAttribute(__setting4, "x-be",  _background_music_on ? 'off' : 'on' );
    __setting4_img1 = Surplus.createElement("img", null, __setting4);
    __setting4_img1.src =  _background_music_on ? music_on_img : music_off_img ;
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  _room ); }, { start: __room1_insert2, end: __room1_insert2 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  R .length (_students) ); }, { start: __students_etc2_label1_insert2, end: __students_etc2_label1_insert2 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (_students
          ) (
          R .map (under (student_as_student
          ) (({ icon: _icon, name: _name }) => 
            (function () {
    var __;
    __ = Surplus.createElement("student", null, null);
    Surplus.content(__,  _name , "");
    Surplus.S.effect(function () { Surplus.setAttribute(__, "x-icon", 
              !! L .isDefined (avatar_as_lion) (_icon) ? 'lion' : L .isDefined (avatar_as_bunny) (_icon) ? 'bunny' : panic ('...') ); });
    return __;
})() ))) ); }, { start: __students_etc2_students2_insert1, end: __students_etc2_students2_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  !! L .isDefined (L .elems) (_students)
      ? (function () {
    var __, __img1;
    __ = Surplus.createElement("button", null, null);
    Surplus.setAttribute(__, "x-custom", true);
    Surplus.setAttribute(__, "x-for", "play");
    __img1 = Surplus.createElement("img", null, __);
    __img1.src =  play_img ;
    Surplus.S.effect(function (__state) { return ( feedback_play )(__, __state); });
    return __;
})()
      : [] ); }, { start: __insert3, end: __insert3 });
    Surplus.S.effect(function (__state) { return ( toggle_background_music )(__setting4, __state); });
    return __;
})(),
	where
	, _room = T (app_state ()) (L .get (app_as_room))
	, _students = T (app_state ()
		) (L .get ([ app_as_students, L .valueOr ([]) ]))
  , _background_music_on = L .get (ambient_as_background_music_on) (ambient_state ())
  , play_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-start.png?1541183674879'
  , music_on_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fmusic-on.png?1546759646100'
  , music_off_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fmusic-off.png?1547792522660'
  , feedback_play = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;feedback_state (feedback .play) }) }) } 
  , toggle_background_music = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;ambient_state (T (S .sample (ambient_state)) (L .modify (ambient_as_background_music_on) (R .not))) }) }) } )=>_)

var playing_view = _ => so ((_=_=>
  !! L .isDefined (lookbehind_as_nothing) (_lookbehind)
  ? (function () {
    var __, __title_etc1, __title_etc1_a_title1, __title_etc1_a_title1_img1, __title_etc1_problem_number2, __title_etc1_problem_number2_insert2, __problem_etc2, __problem_etc2_ticker_etc1, __problem_etc2_ticker_etc1_insert1, __problem_etc2_ticker_etc1_ticker2, __problem_etc2_ticker_etc1_ticker2_spinner1, __problem_etc2_question2, __options3, __options3_button1, __options3_button1_img1, __options3_button2, __options3_button2_img1, __setting4, __setting4_img1;
    __ = Surplus.createElement("playing-etc", null, null);
    __title_etc1 = Surplus.createElement("title-etc", null, __);
    __title_etc1_a_title1 = Surplus.createElement("a-title", null, __title_etc1);
    __title_etc1_a_title1_img1 = Surplus.createElement("img", null, __title_etc1_a_title1);
    __title_etc1_a_title1_img1.src =  logo_img ;
    __title_etc1_problem_number2 = Surplus.createElement("problem-number", null, __title_etc1);
    Surplus.createTextNode("第", __title_etc1_problem_number2)
    __title_etc1_problem_number2_insert2 = Surplus.createTextNode('', __title_etc1_problem_number2)
    Surplus.createTextNode("題", __title_etc1_problem_number2)
    Surplus.createTextNode(" ", __title_etc1)
    __problem_etc2 = Surplus.createElement("problem-etc", null, __);
    __problem_etc2_ticker_etc1 = Surplus.createElement("ticker-etc", null, __problem_etc2);
    __problem_etc2_ticker_etc1_insert1 = Surplus.createTextNode('', __problem_etc2_ticker_etc1)
    __problem_etc2_ticker_etc1_ticker2 = Surplus.createElement("ticker", null, __problem_etc2_ticker_etc1);
    Surplus.setAttribute(__problem_etc2_ticker_etc1_ticker2, "z-identity",  _progress );
    Surplus.assign(__problem_etc2_ticker_etc1_ticker2.style, { animationDuration: _time_limit + 's' });
    __problem_etc2_ticker_etc1_ticker2_spinner1 = Surplus.createElement("spinner", null, __problem_etc2_ticker_etc1_ticker2);
    Surplus.createTextNode(" ", __problem_etc2_ticker_etc1)
    __problem_etc2_question2 = Surplus.createElement("question", null, __problem_etc2);
    Surplus.createTextNode(" ", __problem_etc2)
    __options3 = Surplus.createElement("options", null, __);
    __options3_button1 = Surplus.createElement("button", null, __options3);
    Surplus.setAttribute(__options3_button1, "x-custom", true);
    Surplus.setAttribute(__options3_button1, "x-for", "view-students");
    __options3_button1_img1 = Surplus.createElement("img", null, __options3_button1);
    __options3_button1_img1.src =  view_students_img ;
    __options3_button2 = Surplus.createElement("button", null, __options3);
    Surplus.setAttribute(__options3_button2, "x-custom", true);
    Surplus.setAttribute(__options3_button2, "x-for", "end-game");
    __options3_button2_img1 = Surplus.createElement("img", null, __options3_button2);
    __options3_button2_img1.src =  end_game_img ;
    Surplus.createTextNode(" ", __options3)
    __setting4 = Surplus.createElement("setting", null, __);
    Surplus.setAttribute(__setting4, "x-for", "background-music");
    Surplus.setAttribute(__setting4, "x-be",  _background_music_on ? 'off' : 'on' );
    __setting4_img1 = Surplus.createElement("img", null, __setting4);
    __setting4_img1.src =  _background_music_on ? music_on_img : music_off_img ;
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  problem_number ); }, { start: __title_etc1_problem_number2_insert2, end: __title_etc1_problem_number2_insert2 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (game_tick) (map_defined_ ([]) (t => time_limit - t)) ); }, { start: __problem_etc2_ticker_etc1_insert1, end: __problem_etc2_ticker_etc1_insert1 });
    Surplus.S.effect(function (__current) { return Surplus.content(__problem_etc2_question2,  !! L .isDefined (question_as_text) (question) ? question_text
            : L .isDefined (question_as_image) (question) ? (function () {
    var __;
    __ = Surplus.createElement("img", null, null);
    __.src =  question_image ;
    return __;
})()
            : panic ('bad question') , __current); }, '');
    Surplus.S.effect(function (__state) { return ( view_students )(__options3_button1, __state); });
    Surplus.S.effect(function (__state) { return ( consider_end )(__options3_button2, __state); });
    Surplus.S.effect(function (__state) { return ( toggle_background_music )(__setting4, __state); });
    return __;
})()
  : L .isDefined (lookbehind_as_view_students) (_lookbehind)
  ? (function () {
    var __, __title_etc1, __title_etc1_a_title1, __title_etc1_a_title1_img1, __title_etc1_problem_number2, __title_etc1_problem_number2_insert2, __students2, __students2_insert1, __options3, __options3_button1, __options3_button1_img1, __options3_button2, __options3_button2_img1, __setting4, __setting4_img1;
    __ = Surplus.createElement("playing-etc", null, null);
    __title_etc1 = Surplus.createElement("title-etc", null, __);
    __title_etc1_a_title1 = Surplus.createElement("a-title", null, __title_etc1);
    __title_etc1_a_title1_img1 = Surplus.createElement("img", null, __title_etc1_a_title1);
    __title_etc1_a_title1_img1.src =  logo_img ;
    __title_etc1_problem_number2 = Surplus.createElement("problem-number", null, __title_etc1);
    Surplus.createTextNode("第", __title_etc1_problem_number2)
    __title_etc1_problem_number2_insert2 = Surplus.createTextNode('', __title_etc1_problem_number2)
    Surplus.createTextNode("題", __title_etc1_problem_number2)
    Surplus.createTextNode(" ", __title_etc1)
    __students2 = Surplus.createElement("students", null, __);
    __students2_insert1 = Surplus.createTextNode('', __students2)
    Surplus.createTextNode(" ", __students2)
    __options3 = Surplus.createElement("options", null, __);
    __options3_button1 = Surplus.createElement("button", null, __options3);
    Surplus.setAttribute(__options3_button1, "x-custom", true);
    Surplus.setAttribute(__options3_button1, "x-for", "show-problem");
    __options3_button1_img1 = Surplus.createElement("img", null, __options3_button1);
    __options3_button1_img1.src =  show_problem_img ;
    __options3_button2 = Surplus.createElement("button", null, __options3);
    Surplus.setAttribute(__options3_button2, "x-custom", true);
    Surplus.setAttribute(__options3_button2, "x-for", "end-game");
    __options3_button2_img1 = Surplus.createElement("img", null, __options3_button2);
    __options3_button2_img1.src =  end_game_img ;
    Surplus.createTextNode(" ", __options3)
    __setting4 = Surplus.createElement("setting", null, __);
    Surplus.setAttribute(__setting4, "x-for", "background-music");
    Surplus.setAttribute(__setting4, "x-be",  _background_music_on ? 'off' : 'on' );
    __setting4_img1 = Surplus.createElement("img", null, __setting4);
    __setting4_img1.src =  _background_music_on ? music_on_img : music_off_img ;
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  problem_number ); }, { start: __title_etc1_problem_number2_insert2, end: __title_etc1_problem_number2_insert2 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (map_zip (a => b => [a, b]) (_boards) (_pasts)
          ) (
          L .collect (
          [ L .elems
          , ([ _student, [_board, _past] ]) => so ((_=_=>
            (function () {
    var __, __label1, __board2, __board2_insert2, __board2_bingo3, __board2_bingo3_insert2;
    __ = Surplus.createElement("student-etc", null, null);
    __label1 = Surplus.createElement("label", null, __);
    Surplus.content(__label1,  _name , "");
    __board2 = Surplus.createElement("board", null, __);
    Surplus.createTextNode(" ", __board2)
    __board2_insert2 = Surplus.createTextNode('', __board2)
    __board2_bingo3 = Surplus.createElement("bingo", null, __board2);
    Surplus.createTextNode(" ", __board2_bingo3)
    __board2_bingo3_insert2 = Surplus.createTextNode('', __board2_bingo3)
    Surplus.createTextNode(" ", __board2_bingo3)
    Surplus.createTextNode(" ", __board2)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function () { Surplus.setAttribute(__label1, "x-icon", 
                !! L .isDefined (avatar_as_lion) (_icon) ? 'lion' : L .isDefined (avatar_as_bunny) (_icon) ? 'bunny' : panic ('...') ); });
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
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (_bingoes) (R .map (_pattern => so ((_=_=> 
                  (function () {
    var __;
    __ = Surplus.createSvgElement("line", null, null);
    Surplus.setAttribute(__, "x-shape",  shape );
    Surplus.assign(__.style, { top: top, left: left });
    return __;
})(),
                  where
                  , [ first_y, first_x ] = L .get (L .first) (_pattern)
                  , [ last_y, last_x ] = L .get (L .last) (_pattern)
                  , shape =
                      !! equals (first_x) (last_x) ? 'vertical'
                      : equals (first_y) (last_y) ? 'horizontal'
                      : (first_x < last_x) ? 'diagonal-down'
                      : (first_x > last_x) ? 'diagonal-up'
                      : panic ('bad pattern')
                  , top = !! equals (shape) ('horizontal') ? ((first_y - 0.5) / size) * 100 + '%'
                          : equals (shape) ('vertical') ? '5%'
                          : ''
                  , left = !! equals (shape) ('vertical') ? ((first_x - 0.5) / size) * 100 + '%'
                          : equals (shape) ('horizontal') ? '5%'
                          : '' )=>_))) ); }, { start: __board2_bingo3_insert2, end: __board2_bingo3_insert2 });
    return __;
})(),
            where
            , _name = T (_student) (L .get (student_as_name))
            , _icon = T (_student) (L .get (student_as_icon))
            , _solved_positions = solved_positions (_board) (_past)
            , _bingoes = bingoes (_board) (_past) )=>_)])) ); }, { start: __students2_insert1, end: __students2_insert1 });
    Surplus.S.effect(function (__state) { return ( show_problem )(__options3_button1, __state); });
    Surplus.S.effect(function (__state) { return ( consider_end )(__options3_button2, __state); });
    Surplus.S.effect(function (__state) { return ( toggle_background_music )(__setting4, __state); });
    return __;
})()
  : L .isDefined (lookbehind_as_consider_end) (_lookbehind)
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
    __abort_etc1_div1_options2_button1_img1.src =  confirm_img ;
    __abort_etc1_div1_options2_button2 = Surplus.createElement("button", null, __abort_etc1_div1_options2);
    Surplus.setAttribute(__abort_etc1_div1_options2_button2, "x-custom", true);
    Surplus.setAttribute(__abort_etc1_div1_options2_button2, "x-for", "show-problem");
    __abort_etc1_div1_options2_button2_img1 = Surplus.createElement("img", null, __abort_etc1_div1_options2_button2);
    __abort_etc1_div1_options2_button2_img1.src =  cancel_img ;
    Surplus.S.effect(function (__state) { return ( confirm_end )(__abort_etc1_div1_options2_button1, __state); });
    Surplus.S.effect(function (__state) { return ( show_problem )(__abort_etc1_div1_options2_button2, __state); });
    return __;
})()
  : panic ('unknown lookbehind state'),
  where
  , _lookbehind = lookbehind_state () 
  , _app = app_state ()
  , _progress = T (_app) (L .get (app_as_progress))
  , _time_limit = T (_app) (L .get ([ app_as_settings, settings_as_time_limit ]))
  , _problem = T (_app) (current_problem)
  , _boards = T (_app) (L .get (app_as_boards)) 
  , _pasts = T (_app) (L .get (app_as_pasts)) 
  , problem_number = T (_app) (L .get ([ app_as_progress, progress_as_step ])) + 1
  , time_limit = T (app_state ()) (L .get ([ app_as_settings, settings_as_time_limit ]))
  , size = T (app_state ()) (L .get ([ app_as_settings, settings_as_size ]))
  , game_tick = tick_state ()
  , question = T (_problem) (L .get (problem_as_question))
  , question_text = T (question) (L .get (question_as_text))
  , question_image = T (question) (L .get (question_as_image))
  , _background_music_on = L .get (ambient_as_background_music_on) (ambient_state ())
  , logo_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flogo.png?1546759647786' 
  , show_problem_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fshow-problem.png?1543385405259'
  , view_students_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fview-students.png?1541802335642'
  , end_game_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fend-game.png?1541802334772'
  , confirm_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fconfirm.png?1541818699969'
  , cancel_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fcancel.png?1541818700002'
  , music_on_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fmusic-on.png?1546759646100'
  , music_off_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fmusic-off.png?1547792522660'
  , show_problem = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;lookbehind_state (lookbehind .nothing) })})}
  , view_students = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;lookbehind_state (lookbehind .view_students) })})}
  , consider_end = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;lookbehind_state (lookbehind .consider_end) })})}
  , confirm_end = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;feedback_state (feedback .end) })})}  
  , toggle_background_music = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;ambient_state (T (S .sample (ambient_state)) (L .modify (ambient_as_background_music_on) (R .not))) }) }) } )=>_)
    
													 
var game_over_view = _ => so ((_=_=>
  (function () {
    var __, __title_etc1, __title_etc1_a_title1, __title_etc1_a_title1_img1, __options2, __options2_button1, __options2_button1_img1, __options2_button2, __options2_button2_img1, __options2_button3, __options2_button3_img1, __insert3, __options4, __options4_button1, __options4_button1_img1, __setting5, __setting5_img1;
    __ = Surplus.createElement("game-over-etc", null, null);
    __title_etc1 = Surplus.createElement("title-etc", null, __);
    __title_etc1_a_title1 = Surplus.createElement("a-title", null, __title_etc1);
    __title_etc1_a_title1_img1 = Surplus.createElement("img", null, __title_etc1_a_title1);
    __title_etc1_a_title1_img1.src =  logo_img ;
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
    __options4_button1_img1.src =  play_again_img ;
    Surplus.createTextNode(" ", __options4)
    __setting5 = Surplus.createElement("setting", null, __);
    Surplus.setAttribute(__setting5, "x-for", "background-music");
    Surplus.setAttribute(__setting5, "x-be",  _background_music_on ? 'off' : 'on' );
    __setting5_img1 = Surplus.createElement("img", null, __setting5);
    __setting5_img1.src =  _background_music_on ? music_on_img : music_off_img ;
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function () { __options2_button1_img1.src =  !! L .isDefined (lookbehind_as_show_results) (_lookbehind) ? show_results_on_img : show_results_off_img ; });
    Surplus.S.effect(function (__state) { return ( show_results )(__options2_button1, __state); });
    Surplus.S.effect(function () { __options2_button2_img1.src =  !! L .isDefined (lookbehind_as_students_analysis) (_lookbehind) ? students_analysis_on_img : students_analysis_off_img ; });
    Surplus.S.effect(function (__state) { return ( students_analysis )(__options2_button2, __state); });
    Surplus.S.effect(function () { __options2_button3_img1.src =  !! L .isDefined (lookbehind_as_problems_analysis) (_lookbehind) ? problems_analysis_on_img : problems_analysis_off_img ; });
    Surplus.S.effect(function (__state) { return ( problems_analysis )(__options2_button3, __state); });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  !! L .isDefined (lookbehind_as_show_results) (_lookbehind)
        ? 
        (function () {
    var __, __insert1;
    __ = Surplus.createElement("students", null, null);
    __insert1 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (_students_boards_pasts
            ) (L .collect ([ L .elems, ([ _student, [_board, _past] ]) => so ((_=_=>
              (function () {
    var __, __label1, __board2, __board2_insert2, __board2_bingo3, __board2_bingo3_insert2;
    __ = Surplus.createElement("student-etc", null, null);
    __label1 = Surplus.createElement("label", null, __);
    Surplus.content(__label1,  _name , "");
    __board2 = Surplus.createElement("board", null, __);
    Surplus.createTextNode(" ", __board2)
    __board2_insert2 = Surplus.createTextNode('', __board2)
    __board2_bingo3 = Surplus.createElement("bingo", null, __board2);
    Surplus.createTextNode(" ", __board2_bingo3)
    __board2_bingo3_insert2 = Surplus.createTextNode('', __board2_bingo3)
    Surplus.createTextNode(" ", __board2_bingo3)
    Surplus.createTextNode(" ", __board2)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function () { Surplus.setAttribute(__label1, "x-icon", 
                  !! L .isDefined (avatar_as_lion) (_icon) ? 'lion' : L .isDefined (avatar_as_bunny) (_icon) ? 'bunny' : panic ('unknown icon') ); });
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
    return __;
})()
                    : Surplus.createElement('cell', null, null),
                    where
                    , _cell_position = T (_cell) (L .get (cell_as_position))
                    , _cell_solved = R .includes (_cell_position) (_solved_positions) )=>_))) ); }, { start: __insert2, end: __insert2 });
    return __;
})() )) ); }, { start: __board2_insert2, end: __board2_insert2 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (_bingoes) (R .map (_pattern => so ((_=_=> 
                    (function () {
    var __;
    __ = Surplus.createSvgElement("line", null, null);
    Surplus.setAttribute(__, "x-shape",  shape );
    Surplus.assign(__.style, { top: top, left: left });
    return __;
})(),
                    where
                    , [ first_y, first_x ] = L .get (L .first) (_pattern)
                    , [ last_y, last_x ] = L .get (L .last) (_pattern)
                    , shape =
                        !! equals (first_x) (last_x) ? 'vertical'
                        : equals (first_y) (last_y) ? 'horizontal'
                        : (first_x < last_x) ? 'diagonal-down'
                        : (first_x > last_x) ? 'diagonal-up'
                        : panic ('bad pattern')
                    , top = !! equals (shape) ('horizontal') ? ((first_y - 0.5) / size) * 100 + '%'
                            : equals (shape) ('vertical') ? '5%'
                            : ''
                    , left = !! equals (shape) ('vertical') ? ((first_x - 0.5) / size) * 100 + '%'
                            : equals (shape) ('horizontal') ? '5%'
                            : '' )=>_))) ); }, { start: __board2_bingo3_insert2, end: __board2_bingo3_insert2 });
    return __;
})(),
              where
              , _name = T (_student) (L .get (student_as_name))
              , _icon = T (_student) (L .get (student_as_icon))
              , _solved_positions = solved_positions (_board) (_past)
              , _bingoes = bingoes (_board) (_past) )=>_)])) ); }, { start: __insert1, end: __insert1 });
    return __;
})()
        : L .isDefined (lookbehind_as_students_analysis) (_lookbehind)
        ? so ((_=_=>
        (function () {
    var __, __labels1, __labels1_name1, __labels1_name1_img2, __labels1_number_of_solved2, __labels1_number_of_solved2_img2, __labels1_number_of_bingoes3, __labels1_number_of_bingoes3_img2, __labels1_average_solved_time4, __labels1_average_solved_time4_img2, __students_analysis2, __students_analysis2_insert1;
    __ = Surplus.createElement("students-analysis-etc", null, null);
    __labels1 = Surplus.createElement("labels", null, __);
    __labels1_name1 = Surplus.createElement("name", null, __labels1);
    Surplus.createTextNode("名稱 ", __labels1_name1)
    __labels1_name1_img2 = Surplus.createElement("img", null, __labels1_name1);
    __labels1_name1_img2.src =  toggle_ordering_img ;
    __labels1_number_of_solved2 = Surplus.createElement("number-of-solved", null, __labels1);
    Surplus.createTextNode("答對題數 ", __labels1_number_of_solved2)
    __labels1_number_of_solved2_img2 = Surplus.createElement("img", null, __labels1_number_of_solved2);
    __labels1_number_of_solved2_img2.src =  toggle_ordering_img ;
    __labels1_number_of_bingoes3 = Surplus.createElement("number-of-bingoes", null, __labels1);
    Surplus.createTextNode("BINGO ", __labels1_number_of_bingoes3)
    __labels1_number_of_bingoes3_img2 = Surplus.createElement("img", null, __labels1_number_of_bingoes3);
    __labels1_number_of_bingoes3_img2.src =  toggle_ordering_img ;
    __labels1_average_solved_time4 = Surplus.createElement("average-solved-time", null, __labels1);
    Surplus.createTextNode("平均答對時間 ", __labels1_average_solved_time4)
    __labels1_average_solved_time4_img2 = Surplus.createElement("img", null, __labels1_average_solved_time4);
    __labels1_average_solved_time4_img2.src =  toggle_ordering_img ;
    Surplus.createTextNode(" ", __labels1)
    __students_analysis2 = Surplus.createElement("students-analysis", null, __);
    __students_analysis2_insert1 = Surplus.createTextNode('', __students_analysis2)
    Surplus.createTextNode(" ", __students_analysis2)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (analyse_students (_students_boards_pasts)
              ) (
              L .collect ([ order_sort (_ordering), L .elems, ({ _name, _number_of_solved, _number_of_bingoes, _average_solved_time }) => 
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
})() ])) ); }, { start: __students_analysis2_insert1, end: __students_analysis2_insert1 });
    return __;
})(),
        where
        , _ordering = T (_lookbehind) (L .get (lookbehind_as_ordering)) )=>_)                           
        : L .isDefined (lookbehind_as_problems_analysis) (_lookbehind)
        ? so ((_=_=>
        (function () {
    var __, __labels1, __labels1_question1, __labels1_question1_img2, __labels1_number_of_solvers2, __labels1_number_of_solvers2_img2, __labels1_average_number_of_attempts3, __labels1_average_number_of_attempts3_img2, __labels1_average_solved_time4, __labels1_average_solved_time4_img2, __problems_analysis2, __problems_analysis2_insert1;
    __ = Surplus.createElement("problems-analysis-etc", null, null);
    __labels1 = Surplus.createElement("labels", null, __);
    __labels1_question1 = Surplus.createElement("question", null, __labels1);
    Surplus.createTextNode("題目 ", __labels1_question1)
    __labels1_question1_img2 = Surplus.createElement("img", null, __labels1_question1);
    __labels1_question1_img2.src =  toggle_ordering_img ;
    __labels1_number_of_solvers2 = Surplus.createElement("number-of-solvers", null, __labels1);
    Surplus.createTextNode("答對人數 ", __labels1_number_of_solvers2)
    __labels1_number_of_solvers2_img2 = Surplus.createElement("img", null, __labels1_number_of_solvers2);
    __labels1_number_of_solvers2_img2.src =  toggle_ordering_img ;
    __labels1_average_number_of_attempts3 = Surplus.createElement("average-number-of-attempts", null, __labels1);
    Surplus.createTextNode("平均作答次數 ", __labels1_average_number_of_attempts3)
    __labels1_average_number_of_attempts3_img2 = Surplus.createElement("img", null, __labels1_average_number_of_attempts3);
    __labels1_average_number_of_attempts3_img2.src =  toggle_ordering_img ;
    __labels1_average_solved_time4 = Surplus.createElement("average-solved-time", null, __labels1);
    Surplus.createTextNode("平均答對時間 ", __labels1_average_solved_time4)
    __labels1_average_solved_time4_img2 = Surplus.createElement("img", null, __labels1_average_solved_time4);
    __labels1_average_solved_time4_img2.src =  toggle_ordering_img ;
    Surplus.createTextNode(" ", __labels1)
    __problems_analysis2 = Surplus.createElement("problems-analysis", null, __);
    __problems_analysis2_insert1 = Surplus.createTextNode('', __problems_analysis2)
    Surplus.createTextNode(" ", __problems_analysis2)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (analyse_problems (_students_boards_pasts) (_problems)
              ) (
              L .collect ([ order_sort (_ordering), L .elems, ({ _question, _number_of_solvers, _average_number_of_attempts, _average_solved_time }) => 
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
})() ])) ); }, { start: __problems_analysis2_insert1, end: __problems_analysis2_insert1 });
    return __;
})(),
        where
        , _ordering = T (_lookbehind) (L .get (lookbehind_as_ordering)) )=>_)                           
        : (lookbehind_state (lookbehind .show_results), []) ); }, { start: __insert3, end: __insert3 });
    Surplus.S.effect(function (__state) { return ( play_again )(__options4_button1, __state); });
    Surplus.S.effect(function (__state) { return ( toggle_background_music )(__setting5, __state); });
    return __;
})(),
  where
  , _lookbehind = lookbehind_state () 
  , _app = app_state ()
  , _boards = T (_app) (L .get (app_as_boards)) 
  , _pasts = T (_app) (L .get (app_as_pasts)) 
  , _students_boards_pasts = map_zip (a => b => [a, b]) (_boards) (_pasts)
  , _problems = T (_app) (L .get ([ app_as_settings, settings_as_problems ])) 
  , size = T (_app) (L .get ([ app_as_settings, settings_as_size ]))
  , _background_music_on = L .get (ambient_as_background_music_on) (ambient_state ())
  , logo_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flogo.png?1546759647786' 
  , show_results_on_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fshow-results-on.png?1546759645160'                             
  , show_results_off_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fshow-results-off.png?1546759644963'                              
  , students_analysis_on_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudents-analysis-on.png?1546759645196'                             
  , students_analysis_off_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudents-analysis-off.png?1546759645007'                             
  , problems_analysis_on_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fproblems-analysis-on.png?1546759645249'                             
  , problems_analysis_off_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fproblems-analysis-off.png?1546759645326'                             
  , play_again_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fplay-again.png?1546759645987'                             
  , music_on_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fmusic-on.png?1546759646100'
  , music_off_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fmusic-off.png?1547792522660'
  , toggle_ordering_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Forder-icon.png?1551692617218'                            
  , show_unit = _x => !! equals (_x) (NaN) ? '-' : _x .toFixed (2) * 1
  , show_time = _x => !! equals (_x) (NaN) ? '-' : _x .toFixed (2) * 1 + '秒'
  , show_results = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;lookbehind_state (lookbehind .show_results) })})}                              
  , problems_analysis = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;lookbehind_state (lookbehind .problems_analysis ([])) })})}                              
  , students_analysis = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;lookbehind_state (lookbehind .students_analysis ([])) })})}                              
  , play_again = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;feedback_state (feedback .reset) })})}  
  , toggle_background_music = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;ambient_state (T (S .sample (ambient_state)) (L .modify (ambient_as_background_music_on) (R .not))) }) }) }
  , analyse_students = by (_students_boards_pasts =>
      L .collect ([ L .elems, ([ _student, [_board, _past] ]) => (
        { _name: T (_student) (L .get (student_as_name))
        , _number_of_solved: T (_past) (L .count ([ past_as_points, as_solved_on (_board), L .elems ]))
        , _number_of_bingoes: T (bingoes (_board) (_past)) (L .count ([ L .elems ]))
        , _average_solved_time: T (_past) (L .mean ([ past_as_points, L .elems, as_solved_on (_board), point_as_attempts, L .last, attempt_as_latency ])) }) ]) )
  , analyse_problems = _students_boards_pasts => by (_problems =>
      L .collect ([ L .elems, (_problem, _index) => (
        { _question: T (_problem) (L .get ([ problem_as_question, question_as_image ]))
        , _number_of_solvers: T (_students_boards_pasts
            ) (L .count ([ L .elems, L .choose (([ _student, [_board, _past] ]) => [ K (_past), past_as_points, _index, as_solved_on (_board) ] ) ]))
        , _average_number_of_attempts: T (_students_boards_pasts
            ) (
            L .mean (
            [ L .elems, L .choose (([ _student, [_board, _past] ]) => [ K (_past), past_as_points, _index ] )
            , point_as_attempts, L .count (L .elems) ]))
        , _average_solved_time: T (_students_boards_pasts
            ) (
            L .mean (
            [ L .elems, L .choose (([ _student, [_board, _past] ]) => [ K (_past), past_as_points, _index, as_solved_on (_board) ] )
            , point_as_attempts, L .last, attempt_as_latency ])) }) ])) )=>_) 

window .view = (function () {
    var __, __insert1;
    __ = Surplus.createElement("teacher-app", null, null);
    __insert1 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  !! L .isDefined (app_as_setup) (app_state ())
    ? setup_view
    : L .isDefined (app_as_get_ready) (app_state ())
    ? get_ready_view
    : L .isDefined (app_as_playing) (app_state ())
    ? playing_view
    : L .isDefined (app_as_game_over) (app_state ())
    ? game_over_view
    : panic ('undefined app state in view')  ); }, { start: __insert1, end: __insert1 });
    return __;
})()
												 
												 
												 
												 
												 
												 
												 
												 
												 
												 
												 
												 
												 
var get_room = _room => {;
	var _settings = T (S .sample (app_state)) (L .get (app_as_settings))

	;return go
	.then (_ =>
		io_state (io .connecting) && api (_room)
		.then (panic_on ([ [_x => not (equals ({}) (_x)), _room + ' taken'] ])) )
	.then (_ =>
		api (_room,
			post (message_encoding (
				so ((_=_=>
				message .teacher_settings (settings .settings (_problems, _rules)),
				where
				, { _problems, _rules } = T (_settings
          ) (L .get (L .pick (
            { _problems: settings_as_problems
            , _rules: settings_as_rules }))) )=>_) ) ))
		.then (panic_on ([
			[ _x => ! _x .ok, 'cannot post to ' + _room ] ])) )
	.then (_ => {;
		;app_state (teacher_app .get_ready (_room, _settings, [])) })
	.catch (_e => {;
		;console .error (_e) })
	.then (_ => {;
		;io_state (io .inert) }) }

var start_playing = _ => {;
  var _room = T (S .sample (app_state)) (L .get (app_as_room))
  
  ;go
  .then (_ =>
    io_state (io .messaging) && api (_room,
      post (message_encoding (message .teacher_progress ([ 0, schedule_start (S .sample (ensemble_state)) ]))))
    .then (panic_on ([
      [ _x => ! _x .ok, 'cannot post to ' + _room ] ]) ))
  .catch (_e => {;
    ;console .error (_e) })
  .then (_ => {;
    ;io_state (io .inert) }) }

var end_game = _ => {;
  ;app_state (
    T (S .sample (app_state)
    ) (
    teacher_app_playing_to_game_over)) }

var reset_game = _ => {;
  ;app_state (
    teacher_app .setup (default_settings)) }

				
				
				
				
				
				

var [ time_state, flowing_state ] = timer ()
//var time_interval = time_intervals (time_state)
var tick_fn = _ => Math .floor ((S .sample (time_state) - T (S .sample (app_state)) (L .get ([ app_as_progress, progress_as_timestamp ]))) / 1000)
var tick_state = S .value ()
S .root (die => {;
  ;window .die = { ... (window .die || {}), clock: die }
  ;S (_ => {;
    var _app = app_state ()
    if (flowing_state () && L .isDefined (app_as_progress) (_app)) {
      var _progress_timestamp = T (_app) (L .get ([ app_as_progress, progress_as_timestamp ]))
      var _tick = Math .floor ((time_state () - _progress_timestamp) / 1000)
      if (_tick >= 0) {
        ;tick_state (_tick) } } }) })
/*var tick_state = S .subclock (_ => {;
  var _ticker = S .value ()
  S (_ => {;
    var _app = app_state ()
    if (flowing_state () && L .isDefined (app_as_progress) (_app)) {
      var _progress_timestamp = T (_app) (L .get ([ app_as_progress, progress_as_timestamp ]))
      var _tick = Math .floor ((time_state () - _progress_timestamp) / 1000)
      if (_tick >= 0) {
        ;_ticker (_tick) } } })
  return _ticker })*/
				
var reping_period = 3
var heartbeat = S .data (reping_period) 
	
var connection = S .root (die => (window .die = { ... (window .die || {}), connection: die }) &&
  S (_ => {;
  ;return T (app_state ()) (
    under (app_as_room) (_room => {;
      if (! connection [_room]) {
        ;connection [_room] = S .data ()
        ;api .listen_ping (_room) (connection [_room]) }
      if (connection [_room] ()) {
        return so ((_=()=>
        [ timestamp, mean, Math .sqrt (variance) ],
        where
        , [ mean, variance, n, timestamp ] = connection [_room] () )=>_) } } ) ) }) )



S .root (die => {;
  ;window .die = { ... (window .die || {}), rules: die }
                 
  //TODO: add guard to warn against depending on datas other than feedback
  ;S (_ => {;
    ;T (just_now (feedback_state)
    ) (
    L .forEach (I) (
      l_sum (
        [ L .chain (K (L .modifyOp (_piece => {;
            var piece_details = T (_piece) ([ L .get (L .values), L .remove ([L .values, L .when (equals (undefined))]) ])
            ;app_state (
              T (S .sample (app_state)
              ) (
              L .modify ([ app_as_settings, settings_as_rules, L .values ]) (R .mergeLeft (piece_details)) )) }))
          ) (feedback_as_rules_piece)
        , L .chain (K (L .modifyOp (_ => {;
            var _room = Math .floor (10000 * Math .random ())
            ;get_room (_room) }))
          ) (feedback_as_start)
        , L .chain (K (L .modifyOp (start_playing))
          ) (feedback_as_play)
        , L .chain (K (L .modifyOp (end_game))
          ) (feedback_as_end)
        , L .chain (K (L .modifyOp (reset_game))
          ) (feedback_as_reset) ] ))) })




  ;S (_ => {;
    if (L .get (ambient_as_background_music_on) (ambient_state ())) {
      ;audio .background .play () }
    else {
      ;audio .background .pause () } })



  ;S (_ => {;
    if (L .isDefined (app_as_get_ready) (app_state ())) {
      ;flowing_state (false) }
    else if (L .isDefined (app_as_playing) (app_state ())) {
      ;flowing_state (true) }
    else if (L .isDefined (app_as_game_over) (app_state ())) {
      ;flowing_state (false) } })

  ;S (last_tick => {;
    var _app = app_state () 
    var time_limit = T (_app) (L .get ([ app_as_settings, settings_as_time_limit ]))
    if (L .isDefined (app_as_playing) (_app) && tick_state (), tick_fn () >= time_limit) {
      ;app_state (
        teacher_app_playing_to_next (S .sample (app_state))) } })

  ;S (last_app => {;
    var app_bingoes = _app =>
      L .isDefined (app_as_boards) (_app) && L .isDefined (app_as_pasts) (_app) &&
      T (map_zip (a => b => [a, b]) (L .get (app_as_boards) (_app)) (L .get (app_as_pasts) (_app))
      ) (
      L .collect ([ L .elems, map_v_as_value, ([_board, _past]) => bingoes (_board) (_past), L .elems ]))

    var _app = app_state ()
    var last_bingoes = app_bingoes (last_app) || []
    var _bingoes = app_bingoes (_app) || []
    // HACK: replace with calculating whether difference exists
    if (R .length (last_bingoes) > R .length (_bingoes)) {
      ;audio .bingo .play () }  })

  ;S (last_app => {;
    var app_has_bingoes_ok = _app =>
      L .isDefined (app_as_boards) (_app) && L .isDefined (app_as_pasts) (_app) &&
      T (map_zip (a => b => [a, b]) (L .get (app_as_boards) (_app)) (L .get (app_as_pasts) (_app))
      ) (
      L .isDefined ([ L .elems, map_v_as_value, ([_board, _past]) => bingoes (_board) (_past), L .elems ]))

    var _app = app_state ()
    var game_tick = tick_state ()
    var _win_rule = T (_app) (L .get ([ app_as_settings, settings_as_win_rule ]))
    //var _win_rule = T (_app) (L .get ([ app_as_settings, settings_as_win_rule ]))
    if (equals (win_rule .first_bingo) (_win_rule)) {
      if (L .isDefined (app_as_playing) (_app)) {
        if (! app_has_bingoes_ok (last_app) && app_has_bingoes_ok (_app)) {
          ;setTimeout (_=>{;if (L .isDefined (app_as_playing) (S .sample (app_state))) {;end_game ()}}, 8000) } } }
/* 
    else if (equals (win_rule .limit_time) (_win_rule)) {
      if (L .isDefined (app_as_playing) (_app)) {
Math .floor ((S .sample (time_state) - T (S .sample (app_state)) (L .get ([ app_as_progress, progress_as_timestamp ]))) / 1000)        
        if (! app_has_bingoes_ok (last_app) && app_has_bingoes_ok (_app)) {
          ;setTimeout (_=>{;end_game ()}, 8000) } } }
*/
    else if (equals (win_rule .all_problems) (_win_rule)) { }
    if (L .isDefined (app_as_playing) (_app)) {
      var _size = L .get ([app_as_settings, settings_as_size]) (_app)
      if (L .get (app_as_progress) (_app) >= (_size * _size)) {
        ;end_game () } }                  
    return _app })


  ;S (last_app => {;
    var _app = app_state ()
    if (! L .isDefined (app_as_game_over) (last_app)) {
      if (L .isDefined (app_as_game_over) (_app)) {
        ;lookbehind_state (lookbehind .show_results) } }
    return _app })



  ;S (_ => {;
    var _app = S .sample (app_state)
    var _ensemble = ensemble_state ()

    var _app_progress = T (_app) (L .get (app_as_progress))
    var _progress = T (_ensemble) (L .get (ensemble_as_progress))
    // is there a more elegant way? this is not markovian 
    if (L .isDefined (app_as_get_ready) (_app)) {
      if (not (equals (_app_progress) (_progress))) {

        var _progress_step = L .get (progress_as_step) (_progress)
        ;app_state (
          T (_app
          ) (
          [ teacher_app_get_ready_to_playing
          , L .set (app_as_progress) (_progress) ])) } } })

  ;S (last_app => {;
    var _app = app_state () 
    var _room = T (_app) (L .get (app_as_room))

    var _progress = T (_app) (L .get (app_as_progress))
    var last_progress = T (last_app) (L .get (app_as_progress))

    if (L .isDefined (app_as_playing) (_app)) {
      if (! equals (_progress) (last_progress)) {
        ;go
        .then (_ =>
          io_state (io .messaging) && api (_room,
            post (message_encoding (message .teacher_progress (_progress))))
          .then (panic_on ([
            [ _x => ! _x .ok, 'cannot post to ' + _room ] ]) ))
        .catch (_e => {;
          ;console .error (_e) })
        .then (_ => {;
          ;io_state (io .inert) }) } }
    else if (L .isDefined (app_as_game_over) (_app)) {
      if (! L .isDefined (app_as_game_over) (last_app)) {
        ;go
        .then (_ =>
          io_state (io .messaging) && api (_room,
            post (message_encoding (message .teacher_progress ([ -1, + (new Date) ]))))
          .then (panic_on ([
            [ _x => ! _x .ok, 'cannot post to ' + _room ] ]) ))
        .catch (_e => {;
          ;console .error (_e) })
        .then (_ => {;
          ;io_state (io .inert) }) } }
    return _app })



  ;S (_ => {;
    var _app = S .sample (app_state)
    var _ensemble = ensemble_state ()

    var _app_students = T (_app) (L .get (app_as_students))
    var _app_boards = T (_app) (L .get (app_as_boards))
    var _app_pasts = T (_app) (L .get (app_as_pasts))
    var _ensemble_students =
      L .get (L .choice (app_as_get_ready, app_as_playing, app_as_game_over)) (_app)
      && T (_ensemble) (L .collect ([ ensemble_as_pings, L .values, map_v_as_key ]))
    var _ensemble_boards =
      L .get (L .choice (app_as_playing, app_as_game_over)) (_app)
      && T (_ensemble) (L .collect ([ ensemble_as_boards, L .values ]))
    var _ensemble_pasts =
      L .get (L .choice (app_as_playing, app_as_game_over)) (_app)
      && T (_ensemble) (L .collect ([ ensemble_as_pasts, L .values ]))

    //rewrite with transforms
    var ensemble_updates = $ (R .flatten
    ) ( 
    [ !! (_ensemble_students && not (equals (_ensemble_students) (_app_students)))
      ? [ L .set (app_as_students) (_ensemble_students) ] : []
    , !! (_ensemble_boards && not (equals (_ensemble_boards) (_app_boards)))
      ? [ L .set (app_as_boards) (_ensemble_boards) ] : []
    , !! (_ensemble_pasts && not (equals (_ensemble_pasts) (_app_pasts)))
      ? [ L .set (app_as_pasts) (_ensemble_pasts) ] : [] ])

    if (L .isDefined (L .elems) (ensemble_updates)) {
      ;app_state (
        T (_app) ($ (ensemble_updates))) } })

  ;S (_ => {;
    if (L .isDefined (app_as_setup) (app_state ())) {
      ;lookbehind_state (lookbehind .nothing)
      ;ensemble_state (undefined) } })

  ;S (_ => {;
    ;T (app_state ()
    ) (under (app_as_room) (_room => {;
        var phase = heartbeat ()
        var critical = phase === 1
        ;go
        .then (_ =>
          !! critical
          ? io_state (io .messaging) && api (_room,
              post (message_encoding (message .teacher_ping (S .sample (connection)))))
          : io_state (io .heartbeat) && api (_room)
            .then ($ ([
              L .get (L .inverse (data_iso (ensemble .ensemble))),
              _x => {
                var current_room = T (S .sample (app_state)) (L .get (app_as_room))
                if (equals (_room) (current_room)) {              
                  ;ensemble_state (_x) } } ])) )
        .catch (_x => {;
          if (equals (L .get ('error') (_x)) ('timeout')) {;
            ;console .warn ('Room timed out') }
          else {;
            ;throw _x }})
        .then (_ => {;
          ;setTimeout (_ => {;
            ;heartbeat (!! critical ? reping_period : phase - 1) }
          , 300) })
        .catch (_e => {;
          ;console .error (_e)
          ;setTimeout (_ => {;
            ;heartbeat (phase) }
          , 300) })
        .then (_ => {;
          ;io_state (io .inert) }) })) }) })

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22file%22%3A%22out.js%22%2C%22sources%22%3A%5B%22in.js%22%5D%2C%22sourcesContent%22%3A%5B%22var%20%7B%20bool%2C%20number%2C%20timestamp%2C%20string%2C%5Cnlist%2C%20map%2C%20maybe%2C%20nat%2C%20id%2C%20v%2C%20piece%2C%20order%2C%5Cnorder_sort%2C%20direction_opposite%2C%20toggle_order%2C%20%5Cnshuffle%2C%20uuid%2C%20map_zip%2C%20under%2C%20api%2C%20post%2C%5Cntimer%2C%20timer_since%2C%20time_intervals%2C%20%5Cnavatar%2C%20student%2C%20problem%2C%20choice%2C%20latency%2C%20ping%2C%20position%2C%5Cnattempt%2C%20point%2C%20past%2C%20board%2C%20win_rule%2C%20rules%2C%20settings%2C%5Cnteacher_app%2C%20student_app%2C%5Cnio%2C%20message%2C%20ensemble%2C%20%5Cndefault_problems%2C%20default_rules%2C%20default_settings%2C%5Cnmap_v_as_key%2C%20map_v_as_value%2C%20as_value_of%2C%5Cnas_maybe%2C%20as_defined%2C%20as_complete%2C%20complete_%2C%5Cnapp_as_setup%2C%20app_as_get_ready%2C%20app_as_playing%2C%20app_as_game_over%2C%20app_as_progress%2C%5Cnsettings_as_problems%2C%20settings_as_rules%2C%5Cnsettings_as_size%2C%20settings_as_time_limit%2C%20settings_as_win_rule%2C%5Cnio_as_inert%2C%20io_as_connecting%2C%20io_as_heartbeat%2C%5Cnensemble_as_ping%2C%20ensemble_as_settings%2C%20ensemble_as_progress%2C%20%5Cnensemble_as_pings%2C%20ensemble_as_boards%2C%20ensemble_as_pasts%2C%5Cnprogress_as_step%2C%20progress_as_timestamp%2C%20%5Cnquestion_as_text%2C%20question_as_image%2C%20question_as_solution%2C%20%5Cnattempt_as_position%2C%20attempt_as_latency%2C%20point_as_problem%2C%20point_as_attempts%2C%20point_as_position%2C%20past_as_points%2C%5Cnapp_as_settings%2C%20app_as_student%2C%20app_as_students%2C%20app_as_room%2C%20app_as_problems%2C%5Cnapp_as_board%2C%20app_as_past%2C%20app_as_progress%2C%5Cnapp_as_boards%2C%20app_as_pasts%2C%20%5Cnapp_as_last_point%2C%20point_as_attempts%2C%5Cnavatar_as_lion%2C%20avatar_as_bunny%2C%20%5Cnwin_rule_as_first_bingo%2C%20win_rule_as_limit_time%2C%20win_rule_as_all_problems%2C%20win_rule_as_time_limit%2C%5Cnstudent_as_student%2C%20student_as_id%2C%20student_as_name%2C%20student_as_icon%2C%20%5Cnrules_as_size%2C%20rules_as_time_limit%2C%20rules_as_win_rule%2C%20settings_as_size%2C%20settings_as_time_limit%2C%5Cnproblem_as_question%2C%20problem_as_answers%2C%5Cncell_as_position%2C%20as_position%2C%20cell_as_choice%2C%20%5Cnmessage_encoding%2C%20messages_encoding%2C%20schedule_start%2C%5Cnteacher_app_get_ready_to_playing%2C%20teacher_app_playing_to_next%2C%20teacher_app_playing_to_game_over%2C%5Cnstudent_app_setup_to_get_ready%2C%20student_app_get_ready_to_playing%2C%20student_app_playing_to_next%2C%20student_app_playing_to_game_over%2C%5Cncurrent_problem%2C%20problem_choice_matches%2C%5Cnlocal_patterns%2C%20size_patterns%2C%5Cnas_solved_on%2C%20attempted_positions%2C%20solved_positions%2C%20bingoed_positions%2C%20bingoes%2C%5CnT%2C%20%24%2C%20apply%2C%20L%2C%20R%2C%20S%2C%20Z%2C%20Z_%2C%20Z%24%2C%20sanc%2C%20memoize%2C%20%5Cnso%2C%20by%2C%20%5Cngo%2C%20never%2C%20panic%2C%20panic_on%2C%5Cnjust_now%2C%20temporal%2C%5Cnfiat%2C%20data%2C%20data_lens%2C%20data_iso%2C%20data_kind%2C%5Cnfocused_iso_%2C%5Cnn_reducer%2C%20l_sum%2C%5Cnmap_defined_%2C%20map_defined%2C%20from_just%2C%20%5Cnas_sole%2C%20sole%2C%20shuffle%2C%5CnI%2C%20K%2C%20not%2C%20equals%5Cn%7D%20%3D%20window%20.stuff%5Cn%5Cn%5Cn%5Cn%5Cn%5Cnvar%20feedback%20%3D%20data%20(%7B%5Cn%20%20start%3A%20()%20%3D%3E%20feedback%2C%5Cn%20%20setup_rules%3A%20(%20rules_piece%20%3D~%20piece%20(settings)%20)%20%3D%3E%20feedback%2C%5Cn%20%20play%3A%20()%20%3D%3E%20feedback%2C%5Cn%20%20end%3A%20()%20%3D%3E%20feedback%2C%5Cn%20%20reset%3A%20()%20%3D%3E%20feedback%20%7D)%5Cn%5Cnvar%20lookbehind%20%3D%20data%20(%7B%5Cn%5Ctnothing%3A%20()%20%3D%3E%20lookbehind%2C%5Cn%5Ctpreview_questions%3A%20()%20%3D%3E%20lookbehind%2C%5Cn%5Ctview_students%3A%20()%20%3D%3E%20lookbehind%2C%5Cn%5Ctconsider_end%3A%20()%20%3D%3E%20lookbehind%2C%5Cn%5Ctshow_results%3A%20()%20%3D%3E%20lookbehind%2C%5Cn%5Ctstudents_analysis%3A%20(ordering%20%3D~%20order%20(%5B%20'name'%2C%20'number_of_solved'%2C%20'number_of_bingoes'%2C%20'average_solved_time'%20%5D))%20%3D%3E%20lookbehind%2C%5Cn%5Ctproblems_analysis%3A%20(ordering%20%3D~%20order%20(%5B%20'question'%2C%20'number_of_solvers'%2C%20'average_number_of_attempts'%2C%20'average_solved_time'%20%5D))%20%3D%3E%20lookbehind%20%7D)%5Cn%5Cnvar%20ambient%20%3D%20data%20(%7B%5Cn%20%20ambient%3A%20(%20background_music_on%20%3D~%20bool%20)%20%3D%3E%20ambient%20%7D)%5Cn%5Cnvar%20feedback_as_start%20%3D%20data_iso%20(feedback%20.start)%5Cnvar%20feedback_as_setup_rules%20%3D%20data_iso%20(feedback%20.setup_rules)%5Cnvar%20feedback_as_play%20%3D%20data_iso%20(feedback%20.play)%5Cnvar%20feedback_as_end%20%3D%20data_iso%20(feedback%20.end)%5Cnvar%20feedback_as_reset%20%3D%20data_iso%20(feedback%20.reset)%5Cn%5Cnvar%20feedback_as_rules_piece%20%3D%20data_lens%20(feedback%20.setup_rules)%20.rules_piece%5Cn%5Cnvar%20lookbehind_as_nothing%20%3D%20data_iso%20(lookbehind%20.nothing)%5Cnvar%20lookbehind_as_preview_questions%20%3D%20data_iso%20(lookbehind%20.preview_questions)%5Cnvar%20lookbehind_as_view_students%20%3D%20data_iso%20(lookbehind%20.view_students)%5Cnvar%20lookbehind_as_consider_end%20%3D%20data_iso%20(lookbehind%20.consider_end)%5Cnvar%20lookbehind_as_show_results%20%3D%20data_iso%20(lookbehind%20.show_results)%5Cnvar%20lookbehind_as_students_analysis%20%3D%20data_iso%20(lookbehind%20.students_analysis)%5Cnvar%20lookbehind_as_problems_analysis%20%3D%20data_iso%20(lookbehind%20.problems_analysis)%5Cn%5Cnvar%20lookbehind_as_ordering%20%3D%20L%20.choice%20(data_iso%20(lookbehind%20.students_analysis)%20.ordering%2C%20data_iso%20(lookbehind%20.problems_analysis)%20.ordering)%5Cn%5Cnvar%20ambient_as_ambient%20%3D%20data_iso%20(ambient%20.ambient)%5Cnvar%20ambient_as_background_music_on%20%3D%20data_lens%20(ambient%20.ambient)%20.background_music_on%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cnvar%20app_state%20%3D%20S%20.data%20(teacher_app%20.setup%20(default_settings))%5Cn%5Cnvar%20io_state%20%3D%20S%20.data%20(io%20.inert)%5Cnvar%20ensemble_state%20%3D%20S%20.data%20(ensemble%20.nothing)%5Cn%5Cn%2F%2Fvar%20feedback_state%20%3D%20S%20.data%20(temporal%20())%5Cnvar%20feedback_state%20%3D%20temporal%20()%5Cnvar%20lookbehind_state%20%3D%20S%20.data%20(lookbehind%20.nothing)%5Cnvar%20ambient_state%20%3D%20S%20.data%20(ambient%20.ambient%20(true))%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cnvar%20clicking%20%3D%20%5B'click'%2C%20'touchstart'%5D%20.filter%20(_e%20%3D%3E%20'on'%20%2B%20_e%20in%20window)%20.slice%20(0%2C%201)%5Cnvar%20audio%20%3D%20%7B%5Cn%20%20bingo%3A%20new%20Audio%20('https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fstudent-bingo.mp3%3F1546277231054')%2C%5Cn%20%20background%3A%20new%20Audio%20('https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fbackground.mp3%3F1546277343019')%20%7D%5Cn%3Baudio%20.background%20.loop%20%3D%20true%5Cn%5Cnvar%20setup_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20!!%20L%20.isDefined%20(lookbehind_as_nothing)%20(_lookbehind)%5Cn%20%20%3F%20%5Cn%20%20%3Csetup-etc%3E%5Cn%20%20%20%20%3Cdiv%20class%3D%5C%22left-pane%5C%22%3E%5Cn%20%20%20%20%20%20%3Ca-title%3E%3Cimg%20src%3D%7B%20logo_img%20%7D%2F%3E%3C%2Fa-title%3E%5Cn%20%20%20%20%20%20%3Csub-title%3E%E9%99%A4%E6%B3%95%EF%BC%88%E4%B8%80%EF%BC%89%3C%2Fsub-title%3E%5Cn%20%20%20%20%20%20%3Csettings%20x-for%3D%5C%22game-mode%20time-limit%5C%22%20style%3D%7B%7B%20marginTop%3A%20'20px'%20%7D%7D%3E%5Cn%20%20%20%20%20%20%3Csetting%20x-of%3D%5C%22game-mode%5C%22%3E%5Cn%20%20%20%20%20%20%20%20%7B%20%24%20(counter_setting%5Cn%20%20%20%20%20%20%20%20%20%20)%20('%E9%81%8A%E6%88%B2%E6%A8%A1%E5%BC%8F%EF%BC%9A'%5Cn%20%20%20%20%20%20%20%20%20%20)%20(_win_rule%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20rules_delta%20%3D%20T%20(_win_rule)%20(L%20.get%20(L.inverse%20(data_iso%20(rules%20.rules)%20.win_rule)))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Bfeedback_state%20(feedback%20.setup_rules%20(rules_delta))%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%5B%20%5B%20win_rule%20.first_bingo%2C%20play_to_win_img%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20%5B%20win_rule%20.limit_time%2C%20time_limit_play_img%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20%5B%20win_rule%20.all_problems%2C%20free_play_img%20%5D%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20)%20(_win_rule)%20%7D%20%3C%2Fsetting%3E%5Cn%20%20%20%20%20%20%3Csetting%20x-of%3D%5C%22time-limit%5C%22%3E%5Cn%20%20%20%20%20%20%20%20%7B%20%24%20(counter_setting%5Cn%20%20%20%20%20%20%20%20%20%20)%20('%E5%90%84%E9%A1%8C%E4%BD%9C%E7%AD%94%E6%99%82%E9%99%90%EF%BC%9A'%5Cn%20%20%20%20%20%20%20%20%20%20)%20(_time_limit%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20rules_delta%20%3D%20T%20(_time_limit)%20(L%20.get%20(L.inverse%20(data_iso%20(rules%20.rules)%20.time_limit)))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Bfeedback_state%20(feedback%20.setup_rules%20(rules_delta))%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%5B%20%5B%2010%2C%20ten_secs_img%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20%5B%2020%2C%20twenty_secs_img%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20%5B%2030%2C%20thirty_secs_img%20%5D%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20)%20(_time_limit)%20%7D%20%3C%2Fsetting%3E%3C%2Fsettings%3E%5Cn%20%20%20%20%20%20%3Cbutton%20x-custom%3D%5C%22true%5C%22%20x-for%3D%5C%22preview%5C%22%20style%3D%7B%7B%20marginTop%3A%20'25px'%20%7D%7D%20fn%3D%7B%20setup_preview%20%7D%3E%3Cimg%20src%3D%7B%20preview_img%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%3Cbutton%20x-custom%3D%5C%22true%5C%22%20x-for%3D%5C%22start%5C%22%20fn%3D%7B%20feedback_start%20%7D%3E%5Cn%20%20%20%20%20%20%20%20%3Cimg%20src%3D%7B%20start_img%20%7D%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%7B%20T%20(io_state%20()%5Cn%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%5B%20L%20.get%20(%5Bio_as_connecting%2C%20as_maybe%5D)%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20Z_%20.maybe%20(%5B%5D)%20(K%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20style%3D%7B%7B%20height%3A%200%20%7D%7D%3E%E9%81%8A%E6%88%B2%E6%AD%A3%E5%9C%A8%E9%96%8B%E5%A7%8B%E2%80%A6%3C%2Fdiv%3E))%20%5D)%20%7D%20%3C%2Fbutton%3E%3C%2Fdiv%3E%5Cn%20%20%20%20%3Cdiv%20class%3D%5C%22right-pane%5C%22%3E%5Cn%20%20%20%20%20%20%3Csettings%20x-for%3D%5C%22board-size%5C%22%3E%5Cn%20%20%20%20%20%20%20%20%3Csetting%20x-of%3D%5C%22board-size%5C%22%20x-be%3D%5C%223x3%5C%22%3E%3Cimg%20fn%3D%7B%20feedback_size%20(3)%20%7D%20src%3D%7B%20!!%20equals%20(_size)%20(3)%20%3F%20three_by_three_on_img%20%3A%20three_by_three_off_img%20%7D%20%2F%3E%3C%2Fsetting%3E%5Cn%20%20%20%20%20%20%20%20%3Csetting%20x-of%3D%5C%22board-size%5C%22%20x-be%3D%5C%224x4%5C%22%3E%3Cimg%20fn%3D%7B%20feedback_size%20(4)%20%7D%20src%3D%7B%20!!%20equals%20(_size)%20(4)%20%3F%20four_by_four_on_img%20%3A%20four_by_four_off_img%20%7D%20%2F%3E%3C%2Fsetting%3E%5Cn%20%20%20%20%20%20%20%20%3Csetting%20x-of%3D%5C%22board-size%5C%22%20x-be%3D%5C%225x5%5C%22%3E%3Cimg%20fn%3D%7B%20feedback_size%20(5)%20%7D%20src%3D%7B%20!!%20equals%20(_size)%20(5)%20%3F%20five_by_five_on_img%20%3A%20five_by_five_off_img%20%7D%20%2F%3E%3C%2Fsetting%3E%20%3C%2Fsettings%3E%20%3C%2Fdiv%3E%5Cn%20%20%20%20%3Csetting%20x-for%3D%5C%22background-music%5C%22%20x-be%3D%7B%20_background_music_on%20%3F%20'off'%20%3A%20'on'%20%7D%20fn%3D%7B%20toggle_background_music%20%7D%20%3E%3Cimg%20src%3D%7B%20_background_music_on%20%3F%20music_on_img%20%3A%20music_off_img%20%7D%20%2F%3E%3C%2Fsetting%3E%20%3C%2Fsetup-etc%3E%5Cn%20%20%3A%20L%20.isDefined%20(lookbehind_as_preview_questions)%20(_lookbehind)%5Cn%20%20%3F%20%5Cn%20%20%3Csetup-etc%3E%5Cn%20%20%20%20%3Ctitle-etc%3E%5Cn%20%20%20%20%20%20%3Ca-title%3E%3Cimg%20src%3D%7B%20logo_img%20%7D%2F%3E%3C%2Fa-title%3E%20%3C%2Ftitle-etc%3E%5Cn%20%20%20%20%3Cpreview-questions-etc%3E%5Cn%20%20%20%20%20%20%3Cbutton%20x-custom%3D%5C%22true%5C%22%20x-for%3D%5C%22back%5C%22%20fn%3D%7B%20preview_back%20%7D%3E%3Cimg%20src%3D%7B%20back_img%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%3Cpreview-questions%3E%5Cn%20%20%20%20%20%20%20%20%3Clabels%3E%3Cquestion%3E%E9%A1%8C%E7%9B%AE%3C%2Fquestion%3E%3Canswer%3E%E7%AD%94%E6%A1%88%3C%2Fanswer%3E%3C%2Flabels%3E%5Cn%20%20%20%20%20%20%20%20%7B%20T%20(_problems%5Cn%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20L%20.collect%20(%5B%20L%20.elems%2C%20(_problem%2C%20i)%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Cproblem%3E%3Cquestion%3E%3Cnumber%3E%7B%20i%20%2B%201%20%7D%3C%2Fnumber%3E%3Cimg%20src%3D%7B%20question_image%20%7D%2F%3E%3C%2Fquestion%3E%3Canswer%3E%7B%20answer%20%7D%3C%2Fanswer%3E%3C%2Fproblem%3E%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%2C%20question_image%20%3D%20T%20(_problem)%20(L%20.get%20(%5B%20problem_as_question%2C%20question_as_image%20%5D))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%2C%20answer%20%3D%20T%20(_problem)%20(L%20.get%20(%5B%20problem_as_question%2C%20question_as_solution%20%5D))%5Cn%20%20%20%20%20%20%20%20%20%20)%3D%3E_)%20%5D))%20%7D%5Cn%20%20%20%20%20%20%3C%2Fpreview-questions%3E%5Cn%20%20%20%20%20%20%3C%2Fpreview-questions-etc%3E%20%5Cn%20%20%20%20%3Csetting%20x-for%3D%5C%22background-music%5C%22%20x-be%3D%7B%20_background_music_on%20%3F%20'off'%20%3A%20'on'%20%7D%20fn%3D%7B%20toggle_background_music%20%7D%20%3E%3Cimg%20src%3D%7B%20_background_music_on%20%3F%20music_on_img%20%3A%20music_off_img%20%7D%20%2F%3E%3C%2Fsetting%3E%20%3C%2Fsetup-etc%3E%5Cn%20%20%3A%20(lookbehind_state%20(lookbehind%20.nothing)%2C%20%5B%5D)%2C%5Cn%20%20where%5Cn%2F*%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%20%20%20%20%2C%20_case_v_img%20%3D%20T%20(case_v_img_list)%20(L%20.get%20(L%20.find%20(under%20(L%20.first)%20(iso%20%3D%3E%20L%20.and%20(iso)%20(_case)))))%5Cn%20%20%20%20%20%20%2C%20_case_index%20%3D%20T%20(case_v_img_list)%20(L%20.getAs%20((_%2C%20i)%20%3D%3E%20i)%20(L%20.find%20(under%20(L%20.first)%20(iso%20%3D%3E%20L%20.and%20(iso)%20(_case)))))%5Cn%20%20%20%20%20%20%2C%20_case_iso%20%3D%20T%20(_case_v_img)%20(L%20.get%20(L%20.first))%5Cn%20%20%20%20%20%20%2C%20_case_img%20%3D%20T%20(_case_v_img)%20(L%20.get%20(L%20.last))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3Bfeedback_case%20(T%20(_case)%20(L%20.get%20(%5B_case_iso%2C%20L%20.inverse%20(prev_case_iso)%5D)))%7D)%20%7D)%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20%5B%20%5B%20L%20.normalize%20(L%20.modify%20(%5B%20win_rule_as_time_limit%2C%20L%20.valueOr%20(15)%20%5D)%20(I))%2C%20win_rule_as_limit_time%20%5D%2C%20time_limit_play_img%20%5D%5Cn*%2F%5Cn%20%20%2C%20_lookbehind%20%3D%20lookbehind_state%20()%20%5Cn%20%20%2C%20_settings%20%3D%20T%20(app_state%20())%20(L%20.get%20(app_as_settings))%5Cn%20%20%2C%20_problems%20%3D%20T%20(_settings)%20(L%20.get%20(settings_as_problems))%5Cn%20%20%2C%20_time_limit%20%3D%20T%20(_settings)%20(L%20.get%20(%5B%20settings_as_rules%2C%20rules_as_time_limit%20%5D))%5Cn%20%20%2C%20_size%20%3D%20T%20(_settings)%20(L%20.get%20(%5B%20settings_as_rules%2C%20rules_as_size%20%5D))%5Cn%20%20%2C%20_win_rule%20%3D%20T%20(_settings)%20(L%20.get%20(%5B%20settings_as_rules%2C%20rules_as_win_rule%20%5D))%5Cn%20%20%2C%20_background_music_on%20%3D%20L%20.get%20(ambient_as_background_music_on)%20(ambient_state%20())%5Cn%20%20%2C%20logo_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Flogo.png%3F1546759647786'%20%5Cn%5Ct%2C%20play_to_win_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fplay-to-win.png%3F1541182355223'%5Cn%5Ct%2C%20time_limit_play_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Ftime-limit-play.png%3F1550392930019'%5Cn%5Ct%2C%20free_play_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Ffree-play.png%3F1550392925661'%5Cn%20%20%2C%20ten_secs_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252F10-secs.png%3F1541182690288'%5Cn%20%20%2C%20twenty_secs_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252F20-secs.png%3F1541563332669'%5Cn%20%20%2C%20thirty_secs_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252F30-secs.png%3F1541563332968'%5Cn%5Ct%2C%20preview_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fgo-preview.png%3F1541183674936'%5Cn%5Ct%2C%20start_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fgo-start.png%3F1541183674879'%5Cn%5Ct%2C%20back_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fcounter-prev.png%3F1541181538486'%5Cn%5Ct%2C%20three_by_three_on_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252F3x3-on.png%3F1550827378072'%5Cn%5Ct%2C%20three_by_three_off_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252F3x3-off.png%3F1550827377940'%5Cn%5Ct%2C%20four_by_four_on_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252F4x4-on.png%3F1550827378011'%5Cn%5Ct%2C%20four_by_four_off_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252F4x4-off.png%3F1550827378248'%5Cn%5Ct%2C%20five_by_five_on_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252F5x5-on.png%3F1550827377693'%5Cn%5Ct%2C%20five_by_five_off_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252F5x5-off.png%3F1550827379773'%5Cn%20%20%2C%20music_on_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fmusic-on.png%3F1546759646100'%5Cn%20%20%2C%20music_off_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fmusic-off.png%3F1547792522660'%5Cn%2F%2F%20TODO%3A%20fix%20layout%20of%20unloaded%20imgs%5Cn%20%20%2C%20counter_setting%20%3D%20label%20%3D%3E%20feedback_case%20%3D%3E%20case_v_img_list%20%3D%3E%20_case%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20%5B%20%3Clabel%3E%7B%20label%20%7D%3C%2Flabel%3E%5Cn%20%20%20%20%20%20%2C%20%3Ccontrol%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3Cprev%20fn%3D%7B%20feedback_prev%20%7D%3E%3Cimg%20src%3D%7B%20prev_img%20%7D%20%2F%3E%3C%2Fprev%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3Ccounter%3E%3Cimg%20src%3D%7B%20data_img%20%7D%20%2F%3E%3C%2Fcounter%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3Cnext%20fn%3D%7B%20feedback_next%20%7D%3E%3Cimg%20src%3D%7B%20next_img%20%7D%20%2F%3E%3C%2Fnext%3E%3C%2Fcontrol%3E%20%5D%2C%5Cn%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%2C%20case_list_length%20%3D%20R%20.length%20(case_v_img_list)%5Cn%20%20%20%20%20%20%2C%20wrap_case_index%20%3D%20i%20%3D%3E%20((i%20%25%20case_list_length)%20%2B%20case_list_length)%20%25%20case_list_length%5Cn%20%20%20%20%20%20%2C%20data_img%20%3D%20T%20(case_v_img_list)%20(L%20.get%20(%5B%20L%20.find%20(under%20(L%20.first)%20(equals%20(_case)))%2C%20L%20.last%20%5D))%5Cn%20%20%20%20%20%20%2C%20data_index%20%3D%20T%20(case_v_img_list)%20(L%20.getAs%20((_%2C%20i)%20%3D%3E%20i)%20(L%20.find%20(under%20(L%20.first)%20(equals%20(_case)))))%5Cn%20%20%20%20%20%20%2C%20prev_case%20%3D%20T%20(case_v_img_list)%20(L%20.get%20(%5B%20L%20.index%20(wrap_case_index%20(data_index%20-%201))%2C%20L%20.first%20%5D))%5Cn%20%20%20%20%20%20%2C%20next_case%20%3D%20T%20(case_v_img_list)%20(L%20.get%20(%5B%20L%20.index%20(wrap_case_index%20(data_index%20%2B%201))%2C%20L%20.first%20%5D))%5Cn%20%20%20%20%20%20%2C%20prev_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fcounter-prev.png%3F1541181538486'%5Cn%20%20%20%20%20%20%2C%20next_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fcounter-next.png%3F1541181537950'%5Cn%20%20%20%20%20%20%2C%20feedback_prev%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3Bfeedback_case%20(prev_case)%7D)%20%7D)%20%7D%5Cn%20%20%20%20%20%20%2C%20feedback_next%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3Bfeedback_case%20(next_case)%7D)%20%7D)%20%7D%20)%3D%3E_)%5Cn%20%20%2C%20feedback_start%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bfeedback_state%20(feedback%20.start)%20%7D)%20%7D)%20%7D%5Cn%20%20%2C%20feedback_size%20%3D%20_size%20%3D%3E%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20var%20rules_delta%20%3D%20T%20(_size)%20(L%20.get%20(L.inverse%20(data_iso%20(rules%20.rules)%20.size)))%5Cn%20%20%20%20%20%20%20%20%20%20%3Bfeedback_state%20(feedback%20.setup_rules%20(rules_delta))%20%7D)%20%7D)%20%7D%5Cn%20%20%2C%20setup_preview%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blookbehind_state%20(lookbehind%20.preview_questions)%20%7D)%20%7D)%20%7D%5Cn%20%20%2C%20preview_back%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blookbehind_state%20(lookbehind%20.nothing)%20%7D)%20%7D)%20%7D%5Cn%20%20%2C%20toggle_background_music%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bambient_state%20(T%20(S%20.sample%20(ambient_state))%20(L%20.modify%20(ambient_as_background_music_on)%20(R%20.not)))%20%7D)%20%7D)%20%7D%20)%3D%3E_)%5Cn%5Cnvar%20get_ready_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%3Cget-ready-etc%3E%5Cn%5Ct%5Ct%3Croom%3E%E9%81%8A%E6%88%B2%E5%AE%A4%E7%B7%A8%E8%99%9F%EF%BC%9A%7B%20_room%20%7D%3C%2Froom%3E%5Cn%20%20%20%20%3Cstudents-etc%3E%5Cn%20%20%20%20%20%20%3Clabel%3E%E4%BA%BA%E6%95%B8%EF%BC%9A%7B%20R%20.length%20(_students)%20%7D%3C%2Flabel%3E%5Cn%20%20%20%20%20%20%3Cstudents%3E%5Cn%20%20%20%20%20%20%20%20%7B%20T%20(_students%5Cn%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20R%20.map%20(under%20(student_as_student%5Cn%20%20%20%20%20%20%20%20%20%20)%20((%7B%20icon%3A%20_icon%2C%20name%3A%20_name%20%7D)%20%3D%3E%20%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Cstudent%20x-icon%3D%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20!!%20L%20.isDefined%20(avatar_as_lion)%20(_icon)%20%3F%20'lion'%20%3A%20L%20.isDefined%20(avatar_as_bunny)%20(_icon)%20%3F%20'bunny'%20%3A%20panic%20('...')%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3E%7B%20_name%20%7D%3C%2Fstudent%3E%20)))%20%7D%20%3C%2Fstudents%3E%20%3C%2Fstudents-etc%3E%5Cn%20%20%20%20%7B%20!!%20L%20.isDefined%20(L%20.elems)%20(_students)%5Cn%20%20%20%20%20%20%3F%20%3Cbutton%20x-custom%20x-for%3D%5C%22play%5C%22%20fn%3D%7B%20feedback_play%20%7D%3E%3Cimg%20src%3D%7B%20play_img%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%3A%20%5B%5D%20%7D%5Cn%20%20%20%20%3Csetting%20x-for%3D%5C%22background-music%5C%22%20x-be%3D%7B%20_background_music_on%20%3F%20'off'%20%3A%20'on'%20%7D%20fn%3D%7B%20toggle_background_music%20%7D%20%3E%3Cimg%20src%3D%7B%20_background_music_on%20%3F%20music_on_img%20%3A%20music_off_img%20%7D%20%2F%3E%3C%2Fsetting%3E%20%3C%2Fget-ready-etc%3E%2C%5Cn%5Ctwhere%5Cn%5Ct%2C%20_room%20%3D%20T%20(app_state%20())%20(L%20.get%20(app_as_room))%5Cn%5Ct%2C%20_students%20%3D%20T%20(app_state%20()%5Cn%5Ct%5Ct)%20(L%20.get%20(%5B%20app_as_students%2C%20L%20.valueOr%20(%5B%5D)%20%5D))%5Cn%20%20%2C%20_background_music_on%20%3D%20L%20.get%20(ambient_as_background_music_on)%20(ambient_state%20())%5Cn%20%20%2C%20play_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fgo-start.png%3F1541183674879'%5Cn%20%20%2C%20music_on_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fmusic-on.png%3F1546759646100'%5Cn%20%20%2C%20music_off_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fmusic-off.png%3F1547792522660'%5Cn%20%20%2C%20feedback_play%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bfeedback_state%20(feedback%20.play)%20%7D)%20%7D)%20%7D%20%5Cn%20%20%2C%20toggle_background_music%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bambient_state%20(T%20(S%20.sample%20(ambient_state))%20(L%20.modify%20(ambient_as_background_music_on)%20(R%20.not)))%20%7D)%20%7D)%20%7D%20)%3D%3E_)%5Cn%5Cnvar%20playing_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20!!%20L%20.isDefined%20(lookbehind_as_nothing)%20(_lookbehind)%5Cn%20%20%3F%20%3Cplaying-etc%3E%5Cn%20%20%20%20%20%20%3Ctitle-etc%3E%5Cn%20%20%20%20%20%20%20%20%3Ca-title%3E%3Cimg%20src%3D%7B%20logo_img%20%7D%2F%3E%3C%2Fa-title%3E%5Cn%20%20%20%20%20%20%20%20%3Cproblem-number%3E%E7%AC%AC%7B%20problem_number%20%7D%E9%A1%8C%3C%2Fproblem-number%3E%20%3C%2Ftitle-etc%3E%5Cn%20%20%20%20%20%20%3Cproblem-etc%3E%5Cn%20%20%20%20%20%20%20%20%3Cticker-etc%3E%5Cn%20%20%20%20%20%20%20%20%20%20%7B%20T%20(game_tick)%20(map_defined_%20(%5B%5D)%20(t%20%3D%3E%20time_limit%20-%20t))%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%3Cticker%20z-identity%3D%7B%20_progress%20%7D%20style%3D%7B%7B%20animationDuration%3A%20_time_limit%20%2B%20's'%20%7D%7D%3E%3Cspinner%2F%3E%3C%2Fticker%3E%20%3C%2Fticker-etc%3E%5Cn%20%20%20%20%20%20%20%20%3Cquestion%3E%5Cn%20%20%20%20%20%20%20%20%20%20%7B%20!!%20L%20.isDefined%20(question_as_text)%20(question)%20%3F%20question_text%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3A%20L%20.isDefined%20(question_as_image)%20(question)%20%3F%20%3Cimg%20src%3D%7B%20question_image%20%7D%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3A%20panic%20('bad%20question')%20%7D%3C%2Fquestion%3E%20%3C%2Fproblem-etc%3E%5Cn%20%20%20%20%20%20%3Coptions%3E%5Cn%20%20%20%20%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22view-students%5C%22%20fn%3D%7B%20view_students%20%7D%3E%3Cimg%20src%3D%7B%20view_students_img%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22end-game%5C%22%20fn%3D%7B%20consider_end%20%7D%3E%3Cimg%20src%3D%7B%20end_game_img%20%7D%20%2F%3E%3C%2Fbutton%3E%20%3C%2Foptions%3E%5Cn%20%20%20%20%20%20%3Csetting%20x-for%3D%5C%22background-music%5C%22%20x-be%3D%7B%20_background_music_on%20%3F%20'off'%20%3A%20'on'%20%7D%20fn%3D%7B%20toggle_background_music%20%7D%20%3E%3Cimg%20src%3D%7B%20_background_music_on%20%3F%20music_on_img%20%3A%20music_off_img%20%7D%20%2F%3E%3C%2Fsetting%3E%20%3C%2Fplaying-etc%3E%5Cn%20%20%3A%20L%20.isDefined%20(lookbehind_as_view_students)%20(_lookbehind)%5Cn%20%20%3F%20%3Cplaying-etc%3E%5Cn%20%20%20%20%20%20%3Ctitle-etc%3E%5Cn%20%20%20%20%20%20%20%20%3Ca-title%3E%3Cimg%20src%3D%7B%20logo_img%20%7D%2F%3E%3C%2Fa-title%3E%5Cn%20%20%20%20%20%20%20%20%3Cproblem-number%3E%E7%AC%AC%7B%20problem_number%20%7D%E9%A1%8C%3C%2Fproblem-number%3E%20%3C%2Ftitle-etc%3E%5Cn%20%20%20%20%20%20%3Cstudents%3E%5Cn%20%20%20%20%20%20%20%20%7B%20T%20(map_zip%20(a%20%3D%3E%20b%20%3D%3E%20%5Ba%2C%20b%5D)%20(_boards)%20(_pasts)%5Cn%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20L%20.collect%20(%5Cn%20%20%20%20%20%20%20%20%20%20%5B%20L%20.elems%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20(%5B%20_student%2C%20%5B_board%2C%20_past%5D%20%5D)%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Cstudent-etc%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Clabel%20x-icon%3D%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20!!%20L%20.isDefined%20(avatar_as_lion)%20(_icon)%20%3F%20'lion'%20%3A%20L%20.isDefined%20(avatar_as_bunny)%20(_icon)%20%3F%20'bunny'%20%3A%20panic%20('...')%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3E%7B%20_name%20%7D%3C%2Flabel%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cboard%3E%20%7B%20T%20(_board)%20(R%20.map%20(_row%20%3D%3E%20%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crow%3E%20%7B%20T%20(_row)%20(R%20.map%20(_cell%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20!!%20_cell_solved%20%3F%20%3Ccell%20x-solved%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20%3Ccell%20%2F%3E%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_cell_position%20%3D%20T%20(_cell)%20(L%20.get%20(cell_as_position))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_cell_solved%20%3D%20R%20.includes%20(_cell_position)%20(_solved_positions)%20)%3D%3E_)))%20%7D%20%3C%2Frow%3E%20))%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbingo%3E%20%7B%20T%20(_bingoes)%20(R%20.map%20(_pattern%20%3D%3E%20so%20((_%3D_%3D%3E%20%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cline%20x-shape%3D%7B%20shape%20%7D%20style%3D%7B%7B%20top%3A%20top%2C%20left%3A%20left%20%7D%7D%20%2F%3E%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20%5B%20first_y%2C%20first_x%20%5D%20%3D%20L%20.get%20(L%20.first)%20(_pattern)%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20%5B%20last_y%2C%20last_x%20%5D%20%3D%20L%20.get%20(L%20.last)%20(_pattern)%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20shape%20%3D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20!!%20equals%20(first_x)%20(last_x)%20%3F%20'vertical'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20equals%20(first_y)%20(last_y)%20%3F%20'horizontal'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20(first_x%20%3C%20last_x)%20%3F%20'diagonal-down'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20(first_x%20%3E%20last_x)%20%3F%20'diagonal-up'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20panic%20('bad%20pattern')%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20top%20%3D%20!!%20equals%20(shape)%20('horizontal')%20%3F%20((first_y%20-%200.5)%20%2F%20size)%20*%20100%20%2B%20'%25'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20equals%20(shape)%20('vertical')%20%3F%20'5%25'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20''%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20left%20%3D%20!!%20equals%20(shape)%20('vertical')%20%3F%20((first_x%20-%200.5)%20%2F%20size)%20*%20100%20%2B%20'%25'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20equals%20(shape)%20('horizontal')%20%3F%20'5%25'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20''%20)%3D%3E_)))%20%7D%20%3C%2Fbingo%3E%20%3C%2Fboard%3E%20%3C%2Fstudent-etc%3E%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_name%20%3D%20T%20(_student)%20(L%20.get%20(student_as_name))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_icon%20%3D%20T%20(_student)%20(L%20.get%20(student_as_icon))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_solved_positions%20%3D%20solved_positions%20(_board)%20(_past)%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_bingoes%20%3D%20bingoes%20(_board)%20(_past)%20)%3D%3E_)%5D))%20%7D%20%3C%2Fstudents%3E%5Cn%20%20%20%20%20%20%3Coptions%3E%5Cn%20%20%20%20%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22show-problem%5C%22%20fn%3D%7B%20show_problem%20%7D%3E%3Cimg%20src%3D%7B%20show_problem_img%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22end-game%5C%22%20fn%3D%7B%20consider_end%20%7D%3E%3Cimg%20src%3D%7B%20end_game_img%20%7D%20%2F%3E%3C%2Fbutton%3E%20%3C%2Foptions%3E%5Cn%20%20%20%20%20%20%3Csetting%20x-for%3D%5C%22background-music%5C%22%20x-be%3D%7B%20_background_music_on%20%3F%20'off'%20%3A%20'on'%20%7D%20fn%3D%7B%20toggle_background_music%20%7D%20%3E%3Cimg%20src%3D%7B%20_background_music_on%20%3F%20music_on_img%20%3A%20music_off_img%20%7D%20%2F%3E%3C%2Fsetting%3E%20%3C%2Fplaying-etc%3E%5Cn%20%20%3A%20L%20.isDefined%20(lookbehind_as_consider_end)%20(_lookbehind)%5Cn%20%20%3F%20%3Cplaying-etc%3E%5Cn%20%20%20%20%20%20%3Cabort-etc%3E%5Cn%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%5C%22box%5C%22%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3Clabel%3E%E7%B5%90%E6%9D%9F%E9%81%8A%E6%88%B2%EF%BC%9F%3C%2Flabel%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3Coptions%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22confirm%5C%22%20fn%3D%7B%20confirm_end%20%7D%3E%3Cimg%20src%3D%7B%20confirm_img%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22show-problem%5C%22%20fn%3D%7B%20show_problem%20%7D%3E%3Cimg%20src%3D%7B%20cancel_img%20%7D%20%2F%3E%3C%2Fbutton%3E%3C%2Foptions%3E%3C%2Fdiv%3E%3C%2Fabort-etc%3E%3C%2Fplaying-etc%3E%5Cn%20%20%3A%20panic%20('unknown%20lookbehind%20state')%2C%5Cn%20%20where%5Cn%20%20%2C%20_lookbehind%20%3D%20lookbehind_state%20()%20%5Cn%20%20%2C%20_app%20%3D%20app_state%20()%5Cn%20%20%2C%20_progress%20%3D%20T%20(_app)%20(L%20.get%20(app_as_progress))%5Cn%20%20%2C%20_time_limit%20%3D%20T%20(_app)%20(L%20.get%20(%5B%20app_as_settings%2C%20settings_as_time_limit%20%5D))%5Cn%20%20%2C%20_problem%20%3D%20T%20(_app)%20(current_problem)%5Cn%20%20%2C%20_boards%20%3D%20T%20(_app)%20(L%20.get%20(app_as_boards))%20%5Cn%20%20%2C%20_pasts%20%3D%20T%20(_app)%20(L%20.get%20(app_as_pasts))%20%5Cn%20%20%2C%20problem_number%20%3D%20T%20(_app)%20(L%20.get%20(%5B%20app_as_progress%2C%20progress_as_step%20%5D))%20%2B%201%5Cn%20%20%2C%20time_limit%20%3D%20T%20(app_state%20())%20(L%20.get%20(%5B%20app_as_settings%2C%20settings_as_time_limit%20%5D))%5Cn%20%20%2C%20size%20%3D%20T%20(app_state%20())%20(L%20.get%20(%5B%20app_as_settings%2C%20settings_as_size%20%5D))%5Cn%20%20%2C%20game_tick%20%3D%20tick_state%20()%5Cn%20%20%2C%20question%20%3D%20T%20(_problem)%20(L%20.get%20(problem_as_question))%5Cn%20%20%2C%20question_text%20%3D%20T%20(question)%20(L%20.get%20(question_as_text))%5Cn%20%20%2C%20question_image%20%3D%20T%20(question)%20(L%20.get%20(question_as_image))%5Cn%20%20%2C%20_background_music_on%20%3D%20L%20.get%20(ambient_as_background_music_on)%20(ambient_state%20())%5Cn%20%20%2C%20logo_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Flogo.png%3F1546759647786'%20%5Cn%20%20%2C%20show_problem_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fshow-problem.png%3F1543385405259'%5Cn%20%20%2C%20view_students_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fview-students.png%3F1541802335642'%5Cn%20%20%2C%20end_game_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fend-game.png%3F1541802334772'%5Cn%20%20%2C%20confirm_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fconfirm.png%3F1541818699969'%5Cn%20%20%2C%20cancel_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fcancel.png%3F1541818700002'%5Cn%20%20%2C%20music_on_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fmusic-on.png%3F1546759646100'%5Cn%20%20%2C%20music_off_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fmusic-off.png%3F1547792522660'%5Cn%20%20%2C%20show_problem%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blookbehind_state%20(lookbehind%20.nothing)%20%7D)%7D)%7D%5Cn%20%20%2C%20view_students%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blookbehind_state%20(lookbehind%20.view_students)%20%7D)%7D)%7D%5Cn%20%20%2C%20consider_end%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blookbehind_state%20(lookbehind%20.consider_end)%20%7D)%7D)%7D%5Cn%20%20%2C%20confirm_end%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bfeedback_state%20(feedback%20.end)%20%7D)%7D)%7D%20%20%5Cn%20%20%2C%20toggle_background_music%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bambient_state%20(T%20(S%20.sample%20(ambient_state))%20(L%20.modify%20(ambient_as_background_music_on)%20(R%20.not)))%20%7D)%20%7D)%20%7D%20)%3D%3E_)%5Cn%20%20%20%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cnvar%20game_over_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%3Cgame-over-etc%3E%5Cn%20%20%20%20%3Ctitle-etc%3E%5Cn%20%20%20%20%20%20%3Ca-title%3E%3Cimg%20src%3D%7B%20logo_img%20%7D%2F%3E%3C%2Fa-title%3E%20%3C%2Ftitle-etc%3E%5Cn%20%20%20%20%3Coptions%20x-for%3D%5C%22tabs%5C%22%3E%5Cn%20%20%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22show-results%5C%22%20fn%3D%7B%20show_results%20%7D%20%3E%3Cimg%20src%3D%7B%20!!%20L%20.isDefined%20(lookbehind_as_show_results)%20(_lookbehind)%20%3F%20show_results_on_img%20%3A%20show_results_off_img%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22students-analysis%5C%22%20fn%3D%7B%20students_analysis%20%7D%20%3E%3Cimg%20src%3D%7B%20!!%20L%20.isDefined%20(lookbehind_as_students_analysis)%20(_lookbehind)%20%3F%20students_analysis_on_img%20%3A%20students_analysis_off_img%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22problems-analysis%5C%22%20fn%3D%7B%20problems_analysis%20%7D%20%3E%3Cimg%20src%3D%7B%20!!%20L%20.isDefined%20(lookbehind_as_problems_analysis)%20(_lookbehind)%20%3F%20problems_analysis_on_img%20%3A%20problems_analysis_off_img%20%7D%20%2F%3E%3C%2Fbutton%3E%20%3C%2Foptions%3E%5Cn%20%20%20%20%20%20%7B%20!!%20L%20.isDefined%20(lookbehind_as_show_results)%20(_lookbehind)%5Cn%20%20%20%20%20%20%20%20%3F%20%5Cn%20%20%20%20%20%20%20%20%3Cstudents%3E%5Cn%20%20%20%20%20%20%20%20%20%20%7B%20T%20(_students_boards_pasts%5Cn%20%20%20%20%20%20%20%20%20%20%20%20)%20(L%20.collect%20(%5B%20L%20.elems%2C%20(%5B%20_student%2C%20%5B_board%2C%20_past%5D%20%5D)%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cstudent-etc%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Clabel%20x-icon%3D%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20!!%20L%20.isDefined%20(avatar_as_lion)%20(_icon)%20%3F%20'lion'%20%3A%20L%20.isDefined%20(avatar_as_bunny)%20(_icon)%20%3F%20'bunny'%20%3A%20panic%20('unknown%20icon')%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3E%7B%20_name%20%7D%3C%2Flabel%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cboard%3E%20%7B%20T%20(_board)%20(R%20.map%20(_row%20%3D%3E%20%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crow%3E%20%7B%20T%20(_row)%20(R%20.map%20(_cell%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20!!%20_cell_solved%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3F%20%3Ccell%20x-solved%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20%3Ccell%20%2F%3E%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_cell_position%20%3D%20T%20(_cell)%20(L%20.get%20(cell_as_position))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_cell_solved%20%3D%20R%20.includes%20(_cell_position)%20(_solved_positions)%20)%3D%3E_)))%20%7D%20%3C%2Frow%3E%20))%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbingo%3E%20%7B%20T%20(_bingoes)%20(R%20.map%20(_pattern%20%3D%3E%20so%20((_%3D_%3D%3E%20%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cline%20x-shape%3D%7B%20shape%20%7D%20style%3D%7B%7B%20top%3A%20top%2C%20left%3A%20left%20%7D%7D%20%2F%3E%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20%5B%20first_y%2C%20first_x%20%5D%20%3D%20L%20.get%20(L%20.first)%20(_pattern)%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20%5B%20last_y%2C%20last_x%20%5D%20%3D%20L%20.get%20(L%20.last)%20(_pattern)%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20shape%20%3D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20!!%20equals%20(first_x)%20(last_x)%20%3F%20'vertical'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20equals%20(first_y)%20(last_y)%20%3F%20'horizontal'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20(first_x%20%3C%20last_x)%20%3F%20'diagonal-down'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20(first_x%20%3E%20last_x)%20%3F%20'diagonal-up'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20panic%20('bad%20pattern')%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20top%20%3D%20!!%20equals%20(shape)%20('horizontal')%20%3F%20((first_y%20-%200.5)%20%2F%20size)%20*%20100%20%2B%20'%25'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20equals%20(shape)%20('vertical')%20%3F%20'5%25'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20''%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20left%20%3D%20!!%20equals%20(shape)%20('vertical')%20%3F%20((first_x%20-%200.5)%20%2F%20size)%20*%20100%20%2B%20'%25'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20equals%20(shape)%20('horizontal')%20%3F%20'5%25'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20''%20)%3D%3E_)))%20%7D%20%3C%2Fbingo%3E%20%3C%2Fboard%3E%20%3C%2Fstudent-etc%3E%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_name%20%3D%20T%20(_student)%20(L%20.get%20(student_as_name))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_icon%20%3D%20T%20(_student)%20(L%20.get%20(student_as_icon))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_solved_positions%20%3D%20solved_positions%20(_board)%20(_past)%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_bingoes%20%3D%20bingoes%20(_board)%20(_past)%20)%3D%3E_)%5D))%20%7D%20%3C%2Fstudents%3E%5Cn%20%20%20%20%20%20%20%20%3A%20L%20.isDefined%20(lookbehind_as_students_analysis)%20(_lookbehind)%5Cn%20%20%20%20%20%20%20%20%3F%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20%20%20%3Cstudents-analysis-etc%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3Clabels%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Cname%3E%E5%90%8D%E7%A8%B1%20%3Cimg%20src%3D%7B%20toggle_ordering_img%20%7D%20%2F%3E%3C%2Fname%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Cnumber-of-solved%3E%E7%AD%94%E5%B0%8D%E9%A1%8C%E6%95%B8%20%3Cimg%20src%3D%7B%20toggle_ordering_img%20%7D%20%2F%3E%3C%2Fnumber-of-solved%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Cnumber-of-bingoes%3EBINGO%20%3Cimg%20src%3D%7B%20toggle_ordering_img%20%7D%20%2F%3E%3C%2Fnumber-of-bingoes%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Caverage-solved-time%3E%E5%B9%B3%E5%9D%87%E7%AD%94%E5%B0%8D%E6%99%82%E9%96%93%20%3Cimg%20src%3D%7B%20toggle_ordering_img%20%7D%20%2F%3E%3C%2Faverage-solved-time%3E%20%3C%2Flabels%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3Cstudents-analysis%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%20T%20(analyse_students%20(_students_boards_pasts)%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20L%20.collect%20(%5B%20order_sort%20(_ordering)%2C%20L%20.elems%2C%20(%7B%20_name%2C%20_number_of_solved%2C%20_number_of_bingoes%2C%20_average_solved_time%20%7D)%20%3D%3E%20%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cstudent%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cname%3E%7B%20_name%20%7D%3C%2Fname%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cnumber-of-solved%3E%7B%20_number_of_solved%20%7D%3C%2Fnumber-of-solved%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cnumber-of-bingoes%3E%7B%20_number_of_bingoes%20%7D%3C%2Fnumber-of-bingoes%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Caverage-solved-time%3E%7B%20show_time%20(_average_solved_time)%20%7D%3C%2Faverage-solved-time%3E%20%3C%2Fstudent%3E%20%5D))%20%7D%20%3C%2Fstudents-analysis%3E%20%3C%2Fstudents-analysis-etc%3E%2C%5Cn%20%20%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%20%20%2C%20_ordering%20%3D%20T%20(_lookbehind)%20(L%20.get%20(lookbehind_as_ordering))%20)%3D%3E_)%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%20%20%20%20%20%20%3A%20L%20.isDefined%20(lookbehind_as_problems_analysis)%20(_lookbehind)%5Cn%20%20%20%20%20%20%20%20%3F%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20%20%20%3Cproblems-analysis-etc%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3Clabels%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Cquestion%3E%E9%A1%8C%E7%9B%AE%20%3Cimg%20src%3D%7B%20toggle_ordering_img%20%7D%20%2F%3E%3C%2Fquestion%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Cnumber-of-solvers%3E%E7%AD%94%E5%B0%8D%E4%BA%BA%E6%95%B8%20%3Cimg%20src%3D%7B%20toggle_ordering_img%20%7D%20%2F%3E%3C%2Fnumber-of-solvers%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Caverage-number-of-attempts%3E%E5%B9%B3%E5%9D%87%E4%BD%9C%E7%AD%94%E6%AC%A1%E6%95%B8%20%3Cimg%20src%3D%7B%20toggle_ordering_img%20%7D%20%2F%3E%3C%2Faverage-number-of-attempts%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Caverage-solved-time%3E%E5%B9%B3%E5%9D%87%E7%AD%94%E5%B0%8D%E6%99%82%E9%96%93%20%3Cimg%20src%3D%7B%20toggle_ordering_img%20%7D%20%2F%3E%3C%2Faverage-solved-time%3E%20%3C%2Flabels%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3Cproblems-analysis%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%20T%20(analyse_problems%20(_students_boards_pasts)%20(_problems)%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20L%20.collect%20(%5B%20order_sort%20(_ordering)%2C%20L%20.elems%2C%20(%7B%20_question%2C%20_number_of_solvers%2C%20_average_number_of_attempts%2C%20_average_solved_time%20%7D)%20%3D%3E%20%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cproblem%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cquestion%3E%3Cimg%20src%3D%7B%20_question%20%7D%2F%3E%3C%2Fquestion%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cnumber-of-solvers%3E%7B%20_number_of_solvers%20%7D%3C%2Fnumber-of-solvers%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Caverage-number-of-attempts%3E%7B%20show_unit%20(_average_number_of_attempts)%20%7D%3C%2Faverage-number-of-attempts%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Caverage-solved-time%3E%7B%20show_time%20(_average_solved_time)%20%7D%3C%2Faverage-solved-time%3E%20%3C%2Fproblem%3E%20%5D))%20%7D%20%3C%2Fproblems-analysis%3E%20%3C%2Fproblems-analysis-etc%3E%2C%5Cn%20%20%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%20%20%2C%20_ordering%20%3D%20T%20(_lookbehind)%20(L%20.get%20(lookbehind_as_ordering))%20)%3D%3E_)%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%20%20%20%20%20%20%3A%20(lookbehind_state%20(lookbehind%20.show_results)%2C%20%5B%5D)%20%7D%5Cn%20%20%20%20%3Coptions%20x-for%3D%5C%22options%5C%22%3E%5Cn%20%20%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22play-again%5C%22%20fn%3D%7B%20play_again%20%7D%20%3E%3Cimg%20src%3D%7B%20play_again_img%20%7D%20%2F%3E%3C%2Fbutton%3E%20%3C%2Foptions%3E%5Cn%20%20%20%20%3Csetting%20x-for%3D%5C%22background-music%5C%22%20x-be%3D%7B%20_background_music_on%20%3F%20'off'%20%3A%20'on'%20%7D%20fn%3D%7B%20toggle_background_music%20%7D%20%3E%3Cimg%20src%3D%7B%20_background_music_on%20%3F%20music_on_img%20%3A%20music_off_img%20%7D%20%2F%3E%3C%2Fsetting%3E%20%3C%2Fgame-over-etc%3E%2C%5Cn%20%20where%5Cn%20%20%2C%20_lookbehind%20%3D%20lookbehind_state%20()%20%5Cn%20%20%2C%20_app%20%3D%20app_state%20()%5Cn%20%20%2C%20_boards%20%3D%20T%20(_app)%20(L%20.get%20(app_as_boards))%20%5Cn%20%20%2C%20_pasts%20%3D%20T%20(_app)%20(L%20.get%20(app_as_pasts))%20%5Cn%20%20%2C%20_students_boards_pasts%20%3D%20map_zip%20(a%20%3D%3E%20b%20%3D%3E%20%5Ba%2C%20b%5D)%20(_boards)%20(_pasts)%5Cn%20%20%2C%20_problems%20%3D%20T%20(_app)%20(L%20.get%20(%5B%20app_as_settings%2C%20settings_as_problems%20%5D))%20%5Cn%20%20%2C%20size%20%3D%20T%20(_app)%20(L%20.get%20(%5B%20app_as_settings%2C%20settings_as_size%20%5D))%5Cn%20%20%2C%20_background_music_on%20%3D%20L%20.get%20(ambient_as_background_music_on)%20(ambient_state%20())%5Cn%20%20%2C%20logo_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Flogo.png%3F1546759647786'%20%5Cn%20%20%2C%20show_results_on_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fshow-results-on.png%3F1546759645160'%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%2C%20show_results_off_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fshow-results-off.png%3F1546759644963'%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%2C%20students_analysis_on_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fstudents-analysis-on.png%3F1546759645196'%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%2C%20students_analysis_off_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fstudents-analysis-off.png%3F1546759645007'%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%2C%20problems_analysis_on_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fproblems-analysis-on.png%3F1546759645249'%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%2C%20problems_analysis_off_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fproblems-analysis-off.png%3F1546759645326'%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%2C%20play_again_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fplay-again.png%3F1546759645987'%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%2C%20music_on_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fmusic-on.png%3F1546759646100'%5Cn%20%20%2C%20music_off_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fmusic-off.png%3F1547792522660'%5Cn%20%20%2C%20toggle_ordering_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Forder-icon.png%3F1551692617218'%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%2C%20show_unit%20%3D%20_x%20%3D%3E%20!!%20equals%20(_x)%20(NaN)%20%3F%20'-'%20%3A%20_x%20.toFixed%20(2)%20*%201%5Cn%20%20%2C%20show_time%20%3D%20_x%20%3D%3E%20!!%20equals%20(_x)%20(NaN)%20%3F%20'-'%20%3A%20_x%20.toFixed%20(2)%20*%201%20%2B%20'%E7%A7%92'%5Cn%20%20%2C%20show_results%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blookbehind_state%20(lookbehind%20.show_results)%20%7D)%7D)%7D%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%2C%20problems_analysis%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blookbehind_state%20(lookbehind%20.problems_analysis%20(%5B%5D))%20%7D)%7D)%7D%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%2C%20students_analysis%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blookbehind_state%20(lookbehind%20.students_analysis%20(%5B%5D))%20%7D)%7D)%7D%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%2C%20play_again%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bfeedback_state%20(feedback%20.reset)%20%7D)%7D)%7D%20%20%5Cn%20%20%2C%20toggle_background_music%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bambient_state%20(T%20(S%20.sample%20(ambient_state))%20(L%20.modify%20(ambient_as_background_music_on)%20(R%20.not)))%20%7D)%20%7D)%20%7D%5Cn%20%20%2C%20analyse_students%20%3D%20by%20(_students_boards_pasts%20%3D%3E%5Cn%20%20%20%20%20%20L%20.collect%20(%5B%20L%20.elems%2C%20(%5B%20_student%2C%20%5B_board%2C%20_past%5D%20%5D)%20%3D%3E%20(%5Cn%20%20%20%20%20%20%20%20%7B%20_name%3A%20T%20(_student)%20(L%20.get%20(student_as_name))%5Cn%20%20%20%20%20%20%20%20%2C%20_number_of_solved%3A%20T%20(_past)%20(L%20.count%20(%5B%20past_as_points%2C%20as_solved_on%20(_board)%2C%20L%20.elems%20%5D))%5Cn%20%20%20%20%20%20%20%20%2C%20_number_of_bingoes%3A%20T%20(bingoes%20(_board)%20(_past))%20(L%20.count%20(%5B%20L%20.elems%20%5D))%5Cn%20%20%20%20%20%20%20%20%2C%20_average_solved_time%3A%20T%20(_past)%20(L%20.mean%20(%5B%20past_as_points%2C%20L%20.elems%2C%20as_solved_on%20(_board)%2C%20point_as_attempts%2C%20L%20.last%2C%20attempt_as_latency%20%5D))%20%7D)%20%5D)%20)%5Cn%20%20%2C%20analyse_problems%20%3D%20_students_boards_pasts%20%3D%3E%20by%20(_problems%20%3D%3E%5Cn%20%20%20%20%20%20L%20.collect%20(%5B%20L%20.elems%2C%20(_problem%2C%20_index)%20%3D%3E%20(%5Cn%20%20%20%20%20%20%20%20%7B%20_question%3A%20T%20(_problem)%20(L%20.get%20(%5B%20problem_as_question%2C%20question_as_image%20%5D))%5Cn%20%20%20%20%20%20%20%20%2C%20_number_of_solvers%3A%20T%20(_students_boards_pasts%5Cn%20%20%20%20%20%20%20%20%20%20%20%20)%20(L%20.count%20(%5B%20L%20.elems%2C%20L%20.choose%20((%5B%20_student%2C%20%5B_board%2C%20_past%5D%20%5D)%20%3D%3E%20%5B%20K%20(_past)%2C%20past_as_points%2C%20_index%2C%20as_solved_on%20(_board)%20%5D%20)%20%5D))%5Cn%20%20%20%20%20%20%20%20%2C%20_average_number_of_attempts%3A%20T%20(_students_boards_pasts%5Cn%20%20%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20L%20.mean%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5B%20L%20.elems%2C%20L%20.choose%20((%5B%20_student%2C%20%5B_board%2C%20_past%5D%20%5D)%20%3D%3E%20%5B%20K%20(_past)%2C%20past_as_points%2C%20_index%20%5D%20)%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%2C%20point_as_attempts%2C%20L%20.count%20(L%20.elems)%20%5D))%5Cn%20%20%20%20%20%20%20%20%2C%20_average_solved_time%3A%20T%20(_students_boards_pasts%5Cn%20%20%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20L%20.mean%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5B%20L%20.elems%2C%20L%20.choose%20((%5B%20_student%2C%20%5B_board%2C%20_past%5D%20%5D)%20%3D%3E%20%5B%20K%20(_past)%2C%20past_as_points%2C%20_index%2C%20as_solved_on%20(_board)%20%5D%20)%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%2C%20point_as_attempts%2C%20L%20.last%2C%20attempt_as_latency%20%5D))%20%7D)%20%5D))%20)%3D%3E_)%20%5Cn%5Cnwindow%20.view%20%3D%20%3Cteacher-app%3E%5Cn%20%20%7B%20!!%20L%20.isDefined%20(app_as_setup)%20(app_state%20())%5Cn%20%20%20%20%3F%20setup_view%5Cn%20%20%20%20%3A%20L%20.isDefined%20(app_as_get_ready)%20(app_state%20())%5Cn%20%20%20%20%3F%20get_ready_view%5Cn%20%20%20%20%3A%20L%20.isDefined%20(app_as_playing)%20(app_state%20())%5Cn%20%20%20%20%3F%20playing_view%5Cn%20%20%20%20%3A%20L%20.isDefined%20(app_as_game_over)%20(app_state%20())%5Cn%20%20%20%20%3F%20game_over_view%5Cn%20%20%20%20%3A%20panic%20('undefined%20app%20state%20in%20view')%20%20%7D%20%3C%2Fteacher-app%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cnvar%20get_room%20%3D%20_room%20%3D%3E%20%7B%3B%5Cn%5Ctvar%20_settings%20%3D%20T%20(S%20.sample%20(app_state))%20(L%20.get%20(app_as_settings))%5Cn%5Cn%5Ct%3Breturn%20go%5Cn%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ctio_state%20(io%20.connecting)%20%26%26%20api%20(_room)%5Cn%5Ct%5Ct.then%20(panic_on%20(%5B%20%5B_x%20%3D%3E%20not%20(equals%20(%7B%7D)%20(_x))%2C%20_room%20%2B%20'%20taken'%5D%20%5D))%20)%5Cn%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ctapi%20(_room%2C%5Cn%5Ct%5Ct%5Ctpost%20(message_encoding%20(%5Cn%5Ct%5Ct%5Ct%5Ctso%20((_%3D_%3D%3E%5Cn%5Ct%5Ct%5Ct%5Ctmessage%20.teacher_settings%20(settings%20.settings%20(_problems%2C%20_rules))%2C%5Cn%5Ct%5Ct%5Ct%5Ctwhere%5Cn%5Ct%5Ct%5Ct%5Ct%2C%20%7B%20_problems%2C%20_rules%20%7D%20%3D%20T%20(_settings%5Cn%20%20%20%20%20%20%20%20%20%20)%20(L%20.get%20(L%20.pick%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%20_problems%3A%20settings_as_problems%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_rules%3A%20settings_as_rules%20%7D)))%20)%3D%3E_)%20)%20))%5Cn%5Ct%5Ct.then%20(panic_on%20(%5B%5Cn%5Ct%5Ct%5Ct%5B%20_x%20%3D%3E%20!%20_x%20.ok%2C%20'cannot%20post%20to%20'%20%2B%20_room%20%5D%20%5D))%20)%5Cn%5Ct.then%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%3Bapp_state%20(teacher_app%20.get_ready%20(_room%2C%20_settings%2C%20%5B%5D))%20%7D)%5Cn%5Ct.catch%20(_e%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%3Bconsole%20.error%20(_e)%20%7D)%5Cn%5Ct.then%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%3Bio_state%20(io%20.inert)%20%7D)%20%7D%5Cn%5Cnvar%20start_playing%20%3D%20_%20%3D%3E%20%7B%3B%5Cn%20%20var%20_room%20%3D%20T%20(S%20.sample%20(app_state))%20(L%20.get%20(app_as_room))%5Cn%20%20%5Cn%20%20%3Bgo%5Cn%20%20.then%20(_%20%3D%3E%5Cn%20%20%20%20io_state%20(io%20.messaging)%20%26%26%20api%20(_room%2C%5Cn%20%20%20%20%20%20post%20(message_encoding%20(message%20.teacher_progress%20(%5B%200%2C%20schedule_start%20(S%20.sample%20(ensemble_state))%20%5D))))%5Cn%20%20%20%20.then%20(panic_on%20(%5B%5Cn%20%20%20%20%20%20%5B%20_x%20%3D%3E%20!%20_x%20.ok%2C%20'cannot%20post%20to%20'%20%2B%20_room%20%5D%20%5D)%20))%5Cn%20%20.catch%20(_e%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%3Bconsole%20.error%20(_e)%20%7D)%5Cn%20%20.then%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%3Bio_state%20(io%20.inert)%20%7D)%20%7D%5Cn%5Cnvar%20end_game%20%3D%20_%20%3D%3E%20%7B%3B%5Cn%20%20%3Bapp_state%20(%5Cn%20%20%20%20T%20(S%20.sample%20(app_state)%5Cn%20%20%20%20)%20(%5Cn%20%20%20%20teacher_app_playing_to_game_over))%20%7D%5Cn%5Cnvar%20reset_game%20%3D%20_%20%3D%3E%20%7B%3B%5Cn%20%20%3Bapp_state%20(%5Cn%20%20%20%20teacher_app%20.setup%20(default_settings))%20%7D%5Cn%5Cn%5Ct%5Ct%5Ct%5Ct%5Cn%5Ct%5Ct%5Ct%5Ct%5Cn%5Ct%5Ct%5Ct%5Ct%5Cn%5Ct%5Ct%5Ct%5Ct%5Cn%5Ct%5Ct%5Ct%5Ct%5Cn%5Ct%5Ct%5Ct%5Ct%5Cn%5Cnvar%20%5B%20time_state%2C%20flowing_state%20%5D%20%3D%20timer%20()%5Cn%2F%2Fvar%20time_interval%20%3D%20time_intervals%20(time_state)%5Cnvar%20tick_fn%20%3D%20_%20%3D%3E%20Math%20.floor%20((S%20.sample%20(time_state)%20-%20T%20(S%20.sample%20(app_state))%20(L%20.get%20(%5B%20app_as_progress%2C%20progress_as_timestamp%20%5D)))%20%2F%201000)%5Cnvar%20tick_state%20%3D%20S%20.value%20()%5CnS%20.root%20(die%20%3D%3E%20%7B%3B%5Cn%20%20%3Bwindow%20.die%20%3D%20%7B%20...%20(window%20.die%20%7C%7C%20%7B%7D)%2C%20clock%3A%20die%20%7D%5Cn%20%20%3BS%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20var%20_app%20%3D%20app_state%20()%5Cn%20%20%20%20if%20(flowing_state%20()%20%26%26%20L%20.isDefined%20(app_as_progress)%20(_app))%20%7B%5Cn%20%20%20%20%20%20var%20_progress_timestamp%20%3D%20T%20(_app)%20(L%20.get%20(%5B%20app_as_progress%2C%20progress_as_timestamp%20%5D))%5Cn%20%20%20%20%20%20var%20_tick%20%3D%20Math%20.floor%20((time_state%20()%20-%20_progress_timestamp)%20%2F%201000)%5Cn%20%20%20%20%20%20if%20(_tick%20%3E%3D%200)%20%7B%5Cn%20%20%20%20%20%20%20%20%3Btick_state%20(_tick)%20%7D%20%7D%20%7D)%20%7D)%5Cn%2F*var%20tick_state%20%3D%20S%20.subclock%20(_%20%3D%3E%20%7B%3B%5Cn%20%20var%20_ticker%20%3D%20S%20.value%20()%5Cn%20%20S%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20var%20_app%20%3D%20app_state%20()%5Cn%20%20%20%20if%20(flowing_state%20()%20%26%26%20L%20.isDefined%20(app_as_progress)%20(_app))%20%7B%5Cn%20%20%20%20%20%20var%20_progress_timestamp%20%3D%20T%20(_app)%20(L%20.get%20(%5B%20app_as_progress%2C%20progress_as_timestamp%20%5D))%5Cn%20%20%20%20%20%20var%20_tick%20%3D%20Math%20.floor%20((time_state%20()%20-%20_progress_timestamp)%20%2F%201000)%5Cn%20%20%20%20%20%20if%20(_tick%20%3E%3D%200)%20%7B%5Cn%20%20%20%20%20%20%20%20%3B_ticker%20(_tick)%20%7D%20%7D%20%7D)%5Cn%20%20return%20_ticker%20%7D)*%2F%5Cn%5Ct%5Ct%5Ct%5Ct%5Cnvar%20reping_period%20%3D%203%5Cnvar%20heartbeat%20%3D%20S%20.data%20(reping_period)%20%5Cn%5Ct%5Cnvar%20connection%20%3D%20S%20.root%20(die%20%3D%3E%20(window%20.die%20%3D%20%7B%20...%20(window%20.die%20%7C%7C%20%7B%7D)%2C%20connection%3A%20die%20%7D)%20%26%26%5Cn%20%20S%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%3Breturn%20T%20(app_state%20())%20(%5Cn%20%20%20%20under%20(app_as_room)%20(_room%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20if%20(!%20connection%20%5B_room%5D)%20%7B%5Cn%20%20%20%20%20%20%20%20%3Bconnection%20%5B_room%5D%20%3D%20S%20.data%20()%5Cn%20%20%20%20%20%20%20%20%3Bapi%20.listen_ping%20(_room)%20(connection%20%5B_room%5D)%20%7D%5Cn%20%20%20%20%20%20if%20(connection%20%5B_room%5D%20())%20%7B%5Cn%20%20%20%20%20%20%20%20return%20so%20((_%3D()%3D%3E%5Cn%20%20%20%20%20%20%20%20%5B%20timestamp%2C%20mean%2C%20Math%20.sqrt%20(variance)%20%5D%2C%5Cn%20%20%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%20%20%2C%20%5B%20mean%2C%20variance%2C%20n%2C%20timestamp%20%5D%20%3D%20connection%20%5B_room%5D%20()%20)%3D%3E_)%20%7D%20%7D%20)%20)%20%7D)%20)%5Cn%5Cn%5Cn%5CnS%20.root%20(die%20%3D%3E%20%7B%3B%5Cn%20%20%3Bwindow%20.die%20%3D%20%7B%20...%20(window%20.die%20%7C%7C%20%7B%7D)%2C%20rules%3A%20die%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%2F%2FTODO%3A%20add%20guard%20to%20warn%20against%20depending%20on%20datas%20other%20than%20feedback%5Cn%20%20%3BS%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%3BT%20(just_now%20(feedback_state)%5Cn%20%20%20%20)%20(%5Cn%20%20%20%20L%20.forEach%20(I)%20(%5Cn%20%20%20%20%20%20l_sum%20(%5Cn%20%20%20%20%20%20%20%20%5B%20L%20.chain%20(K%20(L%20.modifyOp%20(_piece%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20var%20piece_details%20%3D%20T%20(_piece)%20(%5B%20L%20.get%20(L%20.values)%2C%20L%20.remove%20(%5BL%20.values%2C%20L%20.when%20(equals%20(undefined))%5D)%20%5D)%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Bapp_state%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20T%20(S%20.sample%20(app_state)%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20L%20.modify%20(%5B%20app_as_settings%2C%20settings_as_rules%2C%20L%20.values%20%5D)%20(R%20.mergeLeft%20(piece_details))%20))%20%7D))%5Cn%20%20%20%20%20%20%20%20%20%20)%20(feedback_as_rules_piece)%5Cn%20%20%20%20%20%20%20%20%2C%20L%20.chain%20(K%20(L%20.modifyOp%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20var%20_room%20%3D%20Math%20.floor%20(10000%20*%20Math%20.random%20())%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Bget_room%20(_room)%20%7D))%5Cn%20%20%20%20%20%20%20%20%20%20)%20(feedback_as_start)%5Cn%20%20%20%20%20%20%20%20%2C%20L%20.chain%20(K%20(L%20.modifyOp%20(start_playing))%5Cn%20%20%20%20%20%20%20%20%20%20)%20(feedback_as_play)%5Cn%20%20%20%20%20%20%20%20%2C%20L%20.chain%20(K%20(L%20.modifyOp%20(end_game))%5Cn%20%20%20%20%20%20%20%20%20%20)%20(feedback_as_end)%5Cn%20%20%20%20%20%20%20%20%2C%20L%20.chain%20(K%20(L%20.modifyOp%20(reset_game))%5Cn%20%20%20%20%20%20%20%20%20%20)%20(feedback_as_reset)%20%5D%20)))%20%7D)%5Cn%5Cn%5Cn%5Cn%5Cn%20%20%3BS%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20if%20(L%20.get%20(ambient_as_background_music_on)%20(ambient_state%20()))%20%7B%5Cn%20%20%20%20%20%20%3Baudio%20.background%20.play%20()%20%7D%5Cn%20%20%20%20else%20%7B%5Cn%20%20%20%20%20%20%3Baudio%20.background%20.pause%20()%20%7D%20%7D)%5Cn%5Cn%5Cn%5Cn%20%20%3BS%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20if%20(L%20.isDefined%20(app_as_get_ready)%20(app_state%20()))%20%7B%5Cn%20%20%20%20%20%20%3Bflowing_state%20(false)%20%7D%5Cn%20%20%20%20else%20if%20(L%20.isDefined%20(app_as_playing)%20(app_state%20()))%20%7B%5Cn%20%20%20%20%20%20%3Bflowing_state%20(true)%20%7D%5Cn%20%20%20%20else%20if%20(L%20.isDefined%20(app_as_game_over)%20(app_state%20()))%20%7B%5Cn%20%20%20%20%20%20%3Bflowing_state%20(false)%20%7D%20%7D)%5Cn%5Cn%20%20%3BS%20(last_tick%20%3D%3E%20%7B%3B%5Cn%20%20%20%20var%20_app%20%3D%20app_state%20()%20%5Cn%20%20%20%20var%20time_limit%20%3D%20T%20(_app)%20(L%20.get%20(%5B%20app_as_settings%2C%20settings_as_time_limit%20%5D))%5Cn%20%20%20%20if%20(L%20.isDefined%20(app_as_playing)%20(_app)%20%26%26%20tick_state%20()%2C%20tick_fn%20()%20%3E%3D%20time_limit)%20%7B%5Cn%20%20%20%20%20%20%3Bapp_state%20(%5Cn%20%20%20%20%20%20%20%20teacher_app_playing_to_next%20(S%20.sample%20(app_state)))%20%7D%20%7D)%5Cn%5Cn%20%20%3BS%20(last_app%20%3D%3E%20%7B%3B%5Cn%20%20%20%20var%20app_bingoes%20%3D%20_app%20%3D%3E%5Cn%20%20%20%20%20%20L%20.isDefined%20(app_as_boards)%20(_app)%20%26%26%20L%20.isDefined%20(app_as_pasts)%20(_app)%20%26%26%5Cn%20%20%20%20%20%20T%20(map_zip%20(a%20%3D%3E%20b%20%3D%3E%20%5Ba%2C%20b%5D)%20(L%20.get%20(app_as_boards)%20(_app))%20(L%20.get%20(app_as_pasts)%20(_app))%5Cn%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20L%20.collect%20(%5B%20L%20.elems%2C%20map_v_as_value%2C%20(%5B_board%2C%20_past%5D)%20%3D%3E%20bingoes%20(_board)%20(_past)%2C%20L%20.elems%20%5D))%5Cn%5Cn%20%20%20%20var%20_app%20%3D%20app_state%20()%5Cn%20%20%20%20var%20last_bingoes%20%3D%20app_bingoes%20(last_app)%20%7C%7C%20%5B%5D%5Cn%20%20%20%20var%20_bingoes%20%3D%20app_bingoes%20(_app)%20%7C%7C%20%5B%5D%5Cn%20%20%20%20%2F%2F%20HACK%3A%20replace%20with%20calculating%20whether%20difference%20exists%5Cn%20%20%20%20if%20(R%20.length%20(last_bingoes)%20%3E%20R%20.length%20(_bingoes))%20%7B%5Cn%20%20%20%20%20%20%3Baudio%20.bingo%20.play%20()%20%7D%20%20%7D)%5Cn%5Cn%20%20%3BS%20(last_app%20%3D%3E%20%7B%3B%5Cn%20%20%20%20var%20app_has_bingoes_ok%20%3D%20_app%20%3D%3E%5Cn%20%20%20%20%20%20L%20.isDefined%20(app_as_boards)%20(_app)%20%26%26%20L%20.isDefined%20(app_as_pasts)%20(_app)%20%26%26%5Cn%20%20%20%20%20%20T%20(map_zip%20(a%20%3D%3E%20b%20%3D%3E%20%5Ba%2C%20b%5D)%20(L%20.get%20(app_as_boards)%20(_app))%20(L%20.get%20(app_as_pasts)%20(_app))%5Cn%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20L%20.isDefined%20(%5B%20L%20.elems%2C%20map_v_as_value%2C%20(%5B_board%2C%20_past%5D)%20%3D%3E%20bingoes%20(_board)%20(_past)%2C%20L%20.elems%20%5D))%5Cn%5Cn%20%20%20%20var%20_app%20%3D%20app_state%20()%5Cn%20%20%20%20var%20game_tick%20%3D%20tick_state%20()%5Cn%20%20%20%20var%20_win_rule%20%3D%20T%20(_app)%20(L%20.get%20(%5B%20app_as_settings%2C%20settings_as_win_rule%20%5D))%5Cn%20%20%20%20%2F%2Fvar%20_win_rule%20%3D%20T%20(_app)%20(L%20.get%20(%5B%20app_as_settings%2C%20settings_as_win_rule%20%5D))%5Cn%20%20%20%20if%20(equals%20(win_rule%20.first_bingo)%20(_win_rule))%20%7B%5Cn%20%20%20%20%20%20if%20(L%20.isDefined%20(app_as_playing)%20(_app))%20%7B%5Cn%20%20%20%20%20%20%20%20if%20(!%20app_has_bingoes_ok%20(last_app)%20%26%26%20app_has_bingoes_ok%20(_app))%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%3BsetTimeout%20(_%3D%3E%7B%3Bif%20(L%20.isDefined%20(app_as_playing)%20(S%20.sample%20(app_state)))%20%7B%3Bend_game%20()%7D%7D%2C%208000)%20%7D%20%7D%20%7D%5Cn%2F*%20%5Cn%20%20%20%20else%20if%20(equals%20(win_rule%20.limit_time)%20(_win_rule))%20%7B%5Cn%20%20%20%20%20%20if%20(L%20.isDefined%20(app_as_playing)%20(_app))%20%7B%5CnMath%20.floor%20((S%20.sample%20(time_state)%20-%20T%20(S%20.sample%20(app_state))%20(L%20.get%20(%5B%20app_as_progress%2C%20progress_as_timestamp%20%5D)))%20%2F%201000)%20%20%20%20%20%20%20%20%5Cn%20%20%20%20%20%20%20%20if%20(!%20app_has_bingoes_ok%20(last_app)%20%26%26%20app_has_bingoes_ok%20(_app))%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%3BsetTimeout%20(_%3D%3E%7B%3Bend_game%20()%7D%2C%208000)%20%7D%20%7D%20%7D%5Cn*%2F%5Cn%20%20%20%20else%20if%20(equals%20(win_rule%20.all_problems)%20(_win_rule))%20%7B%20%7D%5Cn%20%20%20%20if%20(L%20.isDefined%20(app_as_playing)%20(_app))%20%7B%5Cn%20%20%20%20%20%20var%20_size%20%3D%20L%20.get%20(%5Bapp_as_settings%2C%20settings_as_size%5D)%20(_app)%5Cn%20%20%20%20%20%20if%20(L%20.get%20(app_as_progress)%20(_app)%20%3E%3D%20(_size%20*%20_size))%20%7B%5Cn%20%20%20%20%20%20%20%20%3Bend_game%20()%20%7D%20%7D%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%20%20return%20_app%20%7D)%5Cn%5Cn%5Cn%20%20%3BS%20(last_app%20%3D%3E%20%7B%3B%5Cn%20%20%20%20var%20_app%20%3D%20app_state%20()%5Cn%20%20%20%20if%20(!%20L%20.isDefined%20(app_as_game_over)%20(last_app))%20%7B%5Cn%20%20%20%20%20%20if%20(L%20.isDefined%20(app_as_game_over)%20(_app))%20%7B%5Cn%20%20%20%20%20%20%20%20%3Blookbehind_state%20(lookbehind%20.show_results)%20%7D%20%7D%5Cn%20%20%20%20return%20_app%20%7D)%5Cn%5Cn%5Cn%5Cn%20%20%3BS%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20var%20_app%20%3D%20S%20.sample%20(app_state)%5Cn%20%20%20%20var%20_ensemble%20%3D%20ensemble_state%20()%5Cn%5Cn%20%20%20%20var%20_app_progress%20%3D%20T%20(_app)%20(L%20.get%20(app_as_progress))%5Cn%20%20%20%20var%20_progress%20%3D%20T%20(_ensemble)%20(L%20.get%20(ensemble_as_progress))%5Cn%20%20%20%20%2F%2F%20is%20there%20a%20more%20elegant%20way%3F%20this%20is%20not%20markovian%20%5Cn%20%20%20%20if%20(L%20.isDefined%20(app_as_get_ready)%20(_app))%20%7B%5Cn%20%20%20%20%20%20if%20(not%20(equals%20(_app_progress)%20(_progress)))%20%7B%5Cn%5Cn%20%20%20%20%20%20%20%20var%20_progress_step%20%3D%20L%20.get%20(progress_as_step)%20(_progress)%5Cn%20%20%20%20%20%20%20%20%3Bapp_state%20(%5Cn%20%20%20%20%20%20%20%20%20%20T%20(_app%5Cn%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%5B%20teacher_app_get_ready_to_playing%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20L%20.set%20(app_as_progress)%20(_progress)%20%5D))%20%7D%20%7D%20%7D)%5Cn%5Cn%20%20%3BS%20(last_app%20%3D%3E%20%7B%3B%5Cn%20%20%20%20var%20_app%20%3D%20app_state%20()%20%5Cn%20%20%20%20var%20_room%20%3D%20T%20(_app)%20(L%20.get%20(app_as_room))%5Cn%5Cn%20%20%20%20var%20_progress%20%3D%20T%20(_app)%20(L%20.get%20(app_as_progress))%5Cn%20%20%20%20var%20last_progress%20%3D%20T%20(last_app)%20(L%20.get%20(app_as_progress))%5Cn%5Cn%20%20%20%20if%20(L%20.isDefined%20(app_as_playing)%20(_app))%20%7B%5Cn%20%20%20%20%20%20if%20(!%20equals%20(_progress)%20(last_progress))%20%7B%5Cn%20%20%20%20%20%20%20%20%3Bgo%5Cn%20%20%20%20%20%20%20%20.then%20(_%20%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20io_state%20(io%20.messaging)%20%26%26%20api%20(_room%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20post%20(message_encoding%20(message%20.teacher_progress%20(_progress))))%5Cn%20%20%20%20%20%20%20%20%20%20.then%20(panic_on%20(%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5B%20_x%20%3D%3E%20!%20_x%20.ok%2C%20'cannot%20post%20to%20'%20%2B%20_room%20%5D%20%5D)%20))%5Cn%20%20%20%20%20%20%20%20.catch%20(_e%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bconsole%20.error%20(_e)%20%7D)%5Cn%20%20%20%20%20%20%20%20.then%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bio_state%20(io%20.inert)%20%7D)%20%7D%20%7D%5Cn%20%20%20%20else%20if%20(L%20.isDefined%20(app_as_game_over)%20(_app))%20%7B%5Cn%20%20%20%20%20%20if%20(!%20L%20.isDefined%20(app_as_game_over)%20(last_app))%20%7B%5Cn%20%20%20%20%20%20%20%20%3Bgo%5Cn%20%20%20%20%20%20%20%20.then%20(_%20%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20io_state%20(io%20.messaging)%20%26%26%20api%20(_room%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20post%20(message_encoding%20(message%20.teacher_progress%20(%5B%20-1%2C%20%2B%20(new%20Date)%20%5D))))%5Cn%20%20%20%20%20%20%20%20%20%20.then%20(panic_on%20(%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5B%20_x%20%3D%3E%20!%20_x%20.ok%2C%20'cannot%20post%20to%20'%20%2B%20_room%20%5D%20%5D)%20))%5Cn%20%20%20%20%20%20%20%20.catch%20(_e%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bconsole%20.error%20(_e)%20%7D)%5Cn%20%20%20%20%20%20%20%20.then%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bio_state%20(io%20.inert)%20%7D)%20%7D%20%7D%5Cn%20%20%20%20return%20_app%20%7D)%5Cn%5Cn%5Cn%5Cn%20%20%3BS%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20var%20_app%20%3D%20S%20.sample%20(app_state)%5Cn%20%20%20%20var%20_ensemble%20%3D%20ensemble_state%20()%5Cn%5Cn%20%20%20%20var%20_app_students%20%3D%20T%20(_app)%20(L%20.get%20(app_as_students))%5Cn%20%20%20%20var%20_app_boards%20%3D%20T%20(_app)%20(L%20.get%20(app_as_boards))%5Cn%20%20%20%20var%20_app_pasts%20%3D%20T%20(_app)%20(L%20.get%20(app_as_pasts))%5Cn%20%20%20%20var%20_ensemble_students%20%3D%5Cn%20%20%20%20%20%20L%20.get%20(L%20.choice%20(app_as_get_ready%2C%20app_as_playing%2C%20app_as_game_over))%20(_app)%5Cn%20%20%20%20%20%20%26%26%20T%20(_ensemble)%20(L%20.collect%20(%5B%20ensemble_as_pings%2C%20L%20.values%2C%20map_v_as_key%20%5D))%5Cn%20%20%20%20var%20_ensemble_boards%20%3D%5Cn%20%20%20%20%20%20L%20.get%20(L%20.choice%20(app_as_playing%2C%20app_as_game_over))%20(_app)%5Cn%20%20%20%20%20%20%26%26%20T%20(_ensemble)%20(L%20.collect%20(%5B%20ensemble_as_boards%2C%20L%20.values%20%5D))%5Cn%20%20%20%20var%20_ensemble_pasts%20%3D%5Cn%20%20%20%20%20%20L%20.get%20(L%20.choice%20(app_as_playing%2C%20app_as_game_over))%20(_app)%5Cn%20%20%20%20%20%20%26%26%20T%20(_ensemble)%20(L%20.collect%20(%5B%20ensemble_as_pasts%2C%20L%20.values%20%5D))%5Cn%5Cn%20%20%20%20%2F%2Frewrite%20with%20transforms%5Cn%20%20%20%20var%20ensemble_updates%20%3D%20%24%20(R%20.flatten%5Cn%20%20%20%20)%20(%20%5Cn%20%20%20%20%5B%20!!%20(_ensemble_students%20%26%26%20not%20(equals%20(_ensemble_students)%20(_app_students)))%5Cn%20%20%20%20%20%20%3F%20%5B%20L%20.set%20(app_as_students)%20(_ensemble_students)%20%5D%20%3A%20%5B%5D%5Cn%20%20%20%20%2C%20!!%20(_ensemble_boards%20%26%26%20not%20(equals%20(_ensemble_boards)%20(_app_boards)))%5Cn%20%20%20%20%20%20%3F%20%5B%20L%20.set%20(app_as_boards)%20(_ensemble_boards)%20%5D%20%3A%20%5B%5D%5Cn%20%20%20%20%2C%20!!%20(_ensemble_pasts%20%26%26%20not%20(equals%20(_ensemble_pasts)%20(_app_pasts)))%5Cn%20%20%20%20%20%20%3F%20%5B%20L%20.set%20(app_as_pasts)%20(_ensemble_pasts)%20%5D%20%3A%20%5B%5D%20%5D)%5Cn%5Cn%20%20%20%20if%20(L%20.isDefined%20(L%20.elems)%20(ensemble_updates))%20%7B%5Cn%20%20%20%20%20%20%3Bapp_state%20(%5Cn%20%20%20%20%20%20%20%20T%20(_app)%20(%24%20(ensemble_updates)))%20%7D%20%7D)%5Cn%5Cn%20%20%3BS%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20if%20(L%20.isDefined%20(app_as_setup)%20(app_state%20()))%20%7B%5Cn%20%20%20%20%20%20%3Blookbehind_state%20(lookbehind%20.nothing)%5Cn%20%20%20%20%20%20%3Bensemble_state%20(undefined)%20%7D%20%7D)%5Cn%5Cn%20%20%3BS%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%3BT%20(app_state%20()%5Cn%20%20%20%20)%20(under%20(app_as_room)%20(_room%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20var%20phase%20%3D%20heartbeat%20()%5Cn%20%20%20%20%20%20%20%20var%20critical%20%3D%20phase%20%3D%3D%3D%201%5Cn%20%20%20%20%20%20%20%20%3Bgo%5Cn%20%20%20%20%20%20%20%20.then%20(_%20%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20!!%20critical%5Cn%20%20%20%20%20%20%20%20%20%20%3F%20io_state%20(io%20.messaging)%20%26%26%20api%20(_room%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20post%20(message_encoding%20(message%20.teacher_ping%20(S%20.sample%20(connection)))))%5Cn%20%20%20%20%20%20%20%20%20%20%3A%20io_state%20(io%20.heartbeat)%20%26%26%20api%20(_room)%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%20(%24%20(%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20L%20.get%20(L%20.inverse%20(data_iso%20(ensemble%20.ensemble)))%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20_x%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20current_room%20%3D%20T%20(S%20.sample%20(app_state))%20(L%20.get%20(app_as_room))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(equals%20(_room)%20(current_room))%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Bensemble_state%20(_x)%20%7D%20%7D%20%5D))%20)%5Cn%20%20%20%20%20%20%20%20.catch%20(_x%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20if%20(equals%20(L%20.get%20('error')%20(_x))%20('timeout'))%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Bconsole%20.warn%20('Room%20timed%20out')%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20else%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Bthrow%20_x%20%7D%7D)%5Cn%20%20%20%20%20%20%20%20.then%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3BsetTimeout%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Bheartbeat%20(!!%20critical%20%3F%20reping_period%20%3A%20phase%20-%201)%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20300)%20%7D)%5Cn%20%20%20%20%20%20%20%20.catch%20(_e%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bconsole%20.error%20(_e)%5Cn%20%20%20%20%20%20%20%20%20%20%3BsetTimeout%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Bheartbeat%20(phase)%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20300)%20%7D)%5Cn%20%20%20%20%20%20%20%20.then%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bio_state%20(io%20.inert)%20%7D)%20%7D))%20%7D)%20%7D)%5Cn%22%5D%2C%22names%22%3A%5B%5D%2C%22mappings%22%3A%22AAAA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CEAAE%3B%3B%3B%3B%3B%3B%2BBAEuB%3B%3B%3B%3B%3B2CAE2B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3ByCAuBC%3B%3B8BAAsD%3B%3B%3B%3B%3B8BAEzF%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B6CAW0B%3B%3B0BAAiF%3B%3BIAlCrH%2CqEAAC%3BAACT%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BIAEQ%2CqEAAC%3BAACT%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BIAC4E%2C8CAAI%3BIAGxE%2CqEAAC%3BAACT%3BAACA%3BAACA%3BAACA%2CcAAc%3B%3B%3B6BAAY%3B%3B%3BIAA4B%3BIANV%2C8CAAI%3BIASF%2CoEAAmC%3BIAA9B%2C8CAAI%3BIACT%2CoEAAmC%3BIAA9B%2C8CAAI%3BIACT%2CoEAAmC%3BIAA9B%2C8CAAI%3BIAC4B%2C8CAAI%3B%3BIAAsH%3BAAC7M%3BAACA%3BAACA%2CEAAE%3B%3B%3B%3B%3B%3BqCAEuB%3B%3B%3B%3B%3B%3B%3BgDAEgD%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B6CAa7B%3B%3B0BAAiF%3B%3BIAblF%2C8CAAI%3BIAGvC%2CqEAAC%3BAACT%3BAACA%3BAACA%2CYAAY%3B%3B%3B%3B%3ByCAA4B%3B%3B2BAA2B%3B%3B%2BBAAuC%3B%3BIAA4B%3BAACtI%3BAACA%3BAACA%3BAACA%3BIAGmF%2C8CAAI%3B%3BIAAsH%3BAAC7M%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CQAAQ%3B%3B%3BwBAAQ%3B%3BIAAgB%3BAAChC%2CQAAQ%3B%3B%3B%3B%3BuBACuC%3B%3B%3B0BAClB%3B%3B%3BuBACkB%3BIAF%2FB%2C8CAAI%3BIAEJ%2C8CAAI%3B%3BIAA0D%3BAAC9E%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CCAAC%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B6CAe2C%3B%3B0BAAiF%3B%3BIAd%2FG%2CqEAAC%3BIAEC%2CqEAAC%3BIAET%2CqEAAC%3BAACT%3BAACA%3BAACA%3BAACA%2CYAAY%3B%3B%3BwBAEE%3BIAFF%2CkEAAiB%3BAAC7B%3B%3BIACgC%3BIAC5B%2CqEAAC%3BAACL%2CQAAQ%3B%3B%3B%3B%3B%3BiBAA6D%3BIAA%2FB%2C8CAAI%3B%3BIAAkD%3BAAC5F%3BIACmF%2C8CAAI%3B%3BIAA0H%3BAACjN%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CIAAI%3B%3B%3B%3B%3B%3BqCAEuB%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B2EAKG%3B6DAAoB%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BkCAM4B%3B%3B%3B%3B%3BkCACN%3B%3B%3B%3B6CAC1B%3B%3B0BAAiF%3B%3BIAZtG%2CqEAAC%3BIAGhB%2CqEAAC%3BIAGD%2CyFAAC%3BAACX%2C4DAA4D%3B%3B%3BaAAU%3B%3BIAAoB%3BAAC1F%3BIAE%2BC%2C8CAAI%3BIACT%2C8CAAI%3BIACuC%2C8CAAI%3B%3BIAAwH%3BAACjN%3BAACA%2CIAAI%3B%3B%3B%3B%3B%3BqCAEuB%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BkCA0CiD%3B%3B%3B%3B%3BkCACJ%3B%3B%3B%3B6CAC1B%3B%3B0BAAiF%3B%3BIA3CtG%2CqEAAC%3BIAElB%2CqEAAC%3BAACT%3BAACA%3BAACA%3BAACA%3BAACA%2CYAAY%3B%3B%3B%3B8BAGI%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BIAFF%2CwEAAe%3BAAC7B%3BIAEsB%2CqEAAC%3BAACvB%2CgBAAgB%3B%3B%3B%3B%3B%3BIAAM%2CqEAAC%3BAACvB%2CoCAAoC%3B%3B%3B%3B%3BIAAiB%3BAACrD%2CoBAAoB%2CyCAAQ%3BAAC5B%3BAACA%3BAACA%3B%3BIAAoG%3BIAC5E%2CqEAAC%3BAACzB%2CkBAAkB%3B%3B%3BwCAAe%3B6BAAgB%3B%3BIAA4B%3BAAC7E%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3B%3BIAAyE%3BAACzE%3BAACA%3BAACA%3BAACA%3BAACA%3BIAE8C%2C8CAAI%3BIACR%2C8CAAI%3BIACuC%2C8CAAI%3B%3BIAAwH%3BAACjN%3BAACA%2CIAAI%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BkDAKsE%3B%3B%3B%3B%3BkDACM%3BIADnC%2C8CAAI%3BIACC%2C8CAAI%3B%3BIAA6F%3BAACnJ%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CEAAE%3B%3B%3B%3B%3B%3BqCAEuB%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BkCAoF8C%3B%3B%3B%3B6CAC3B%3B%3B0BAAiF%3B%3BIAnF5D%2C6DAAU%3BIAA%2FB%2C8CAAI%3BIAC2B%2C6DAAU%3BIAApC%2C8CAAI%3BIACsB%2C6DAAU%3BIAApC%2C8CAAI%3BIAC%2FC%2CqEAAC%3BAACP%3BAACA%2CQAAQ%3B%3B%3B%3B%3BIACE%2CqEAAC%3BAACX%3BAACA%2CcAAc%3B%3B%3B%3B8BAGI%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BIAFF%2CwEAAe%3BAAC%2FB%3BIAEwB%2CqEAAC%3BAACzB%2CkBAAkB%3B%3B%3B%3B%3B%3BIAAM%2CqEAAC%3BAACzB%3BAACA%2CsBAAsB%3B%3B%3B%3B%3BIAAiB%3BAACvC%2CsBAAsB%2CyCAAQ%3BAAC9B%3BAACA%3BAACA%3B%3BIAAsG%3BIAC5E%2CqEAAC%3BAAC3B%2CoBAAoB%3B%3B%3BwCAAe%3B6BAAgB%3B%3BIAA4B%3BAAC%2FE%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3B%3BIAA2E%3BAAC3E%3BAACA%3BAACA%3BAACA%3BAACA%3B%3BIAA0E%3BAAC1E%3BAACA%3BAACA%2CQAAQ%3B%3B%3B%3B%3B%3B%3B%2BBAEuB%3B%3B%3B%3B2CACc%3B%3B%3B%3B4CACE%3B%3B%3B%3B8CACG%3B%3B%3B%3B%3B%3BIAEtC%2CqEAAC%3BAACb%3BAACA%3BAACA%2CgBAAgB%3B%3B%3B%3B6BACS%3B%3ByCACY%3B%3B0CACC%3B%3B%3BIACC%2CuFAAC%3B%3BIAAoE%3B%3BIAAoD%3BAAChK%3BAACA%3BAACA%3BAACA%3BAACA%2CQAAQ%3B%3B%3B%3B%3B%3B%3BmCAE2B%3B%3B%3B%3B4CACW%3B%3B%3B%3BqDACW%3B%3B%3B%3B8CACP%3B%3B%3B%3B%3B%3BIAEtC%2CqEAAC%3BAACb%3BAACA%3BAACA%2CgBAAgB%3B%3B%3B%3B%3B2BACsB%3B%3B0CACA%3B%3B%3B%3BIACQ%2C8FAAC%3BIACR%2CuFAAC%3B%3BIAAoE%3B%3BIAAoD%3BAAChK%3BAACA%3BAACA%3BIAE0C%2C8CAAI%3BIACqC%2C8CAAI%3B%3BIAA0H%3BAACjN%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CeAAe%3B%3B%3B%3B%3BIACb%2CqEAAC%3BAACH%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3B%3BIAA6D%3BAAC7D%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%22%7D
