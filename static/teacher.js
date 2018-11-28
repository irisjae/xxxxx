var { T, $, apply, L, R, S, Z, Z_, Z$, sanc, memoize, TimelineMax,
so, by, and_by, under,
go, never, panic, panic_on,
just_now, temporal,
fiat, data, data_lens, data_iso, data_kind,
n_reducer, pair_zip_n, pair_zip, pair_projection,
map_defined_, map_defined, from_just, maybe_all,
as_sole, sole, every, delay,
bool, number, timestamp, string,
list, map, maybe, nat, id, v, piece,
shuffle, uuid, api, post,
student, problem, choice, answer, latency, ping, position,
attempt, point, past, board, win_rule, rules, settings,
teacher_app, student_app,
io, message, ensemble, 
default_problems, default_rules, default_settings,
as_maybe, as_defined, as_complete, complete_,
app_as_setup, app_as_get_ready, app_as_playing, app_as_game_over, app_as_progress,
settings_as_problems, settings_as_rules,
settings_as_size, settings_as_time_limit, settings_as_win_rule,
io_as_inert, io_as_connecting, io_as_heartbeat,
ensemble_as_ping, ensemble_as_settings, ensemble_as_start, ensemble_as_progress, ensemble_as_end,
ensemble_as_student_pings, ensemble_as_student_starts,
ensemble_as_student_boards, ensemble_as_student_pasts,
attempt_as_position, attempt_as_latency, point_as_attempts, point_as_position, past_as_points,
app_as_settings, app_as_student, app_as_students, app_as_room,
app_as_board, app_as_past, app_as_problems,
app_as_last_point, point_as_attempts,
rules_as_size, rules_as_time_limit, settings_as_size, settings_as_time_limit,
problem_as_question, problem_as_answers,
cell_as_position, as_position,
cell_as_choice, student_name,
pair_as_list, pair_as_first, pair_as_second,
message_encoding, messages_encoding,
assemble_students, schedule_start,
teacher_app_get_ready_to_playing, teacher_app_playing_to_next, teacher_app_playing_to_game_over,
student_app_get_ready_to_playing, student_app_playing_to_next, student_app_playing_to_game_over,
past_progressed,
current_problem, problem_choice_matches,
attempted_positions, solved_positions, bingoed_positions
} = window .stuff


var feedback = data ({
  start: () => feedback,
  setup_settings: ( settings_piece =~ piece (settings) ) => feedback,
  play: () => feedback,
  end: () => feedback })

var lookbehind = data ({
	nothing: () => lookbehind,
	view_students: () => lookbehind,
	consider_end: () => lookbehind })

var feedback_start = data_iso (feedback .start)
var feedback_setup_settings = data_iso (feedback .setup_settings)
var feedback_play = data_iso (feedback .play)

var lookbehind_nothing = data_iso (lookbehind .nothing)
var lookbehind_view_students = data_iso (lookbehind .view_students)
var lookbehind_consider_end = data_iso (lookbehind .consider_end)


var app_state = S .data (teacher_app .setup (default_settings))

var io_state = S .data (io .inert)
var ensemble_state = S .data (ensemble .nothing)

//var feedback_state = S .data (temporal ())
var feedback_state = temporal ()
var lookbehind_state = S .data (lookbehind .nothing)







var clicking = ['click']

var setup_view = _ => so ((_=_=>
  (function () {
    var __, __div1, __div1_a_title1, __div1_sub_title2, __div1_settings3, __div1_settings3_setting1, __div1_settings3_setting1_insert1, __div1_settings3_setting2, __div1_settings3_setting2_insert1, __div1_button4, __div1_button4_img1, __div1_button5, __div1_button5_img1, __div1_button5_insert2, __div2, __div2_settings1, __div2_settings1_setting1, __div2_settings1_setting1_img1, __div2_settings1_setting2, __div2_settings1_setting2_img1, __div2_settings1_setting3, __div2_settings1_setting3_img1;
    __ = Surplus.createElement("setup-etc", null, null);
    __div1 = Surplus.createElement("div", "left-pane", __);
    __div1_a_title1 = Surplus.createElement("a-title", null, __div1);
    __div1_a_title1.textContent = "Bingo";
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
    __div2_settings1_setting1_img1.src =  three_by_three_img ;
    __div2_settings1_setting2 = Surplus.createElement("setting", null, __div2_settings1);
    Surplus.setAttribute(__div2_settings1_setting2, "x-of", "board-size");
    Surplus.setAttribute(__div2_settings1_setting2, "x-be", "4x4");
    __div2_settings1_setting2_img1 = Surplus.createElement("img", null, __div2_settings1_setting2);
    __div2_settings1_setting2_img1.src =  four_by_four_img ;
    __div2_settings1_setting3 = Surplus.createElement("setting", null, __div2_settings1);
    Surplus.setAttribute(__div2_settings1_setting3, "x-of", "board-size");
    Surplus.setAttribute(__div2_settings1_setting3, "x-be", "5x5");
    __div2_settings1_setting3_img1 = Surplus.createElement("img", null, __div2_settings1_setting3);
    __div2_settings1_setting3_img1.src =  five_by_five_img ;
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  (counter_setting
          ) ('遊戲模式：'
          ) (_game_mode => {}
          ) (
          [ Z_ .Pair (fiat) (play_to_win_img) ]
          ) (fiat) ); }, { start: __div1_settings3_setting1_insert1, end: __div1_settings3_setting1_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  (counter_setting
          ) ('各題作答時限：'
          ) (_time_limit => {;
              var setting_delta = T (_time_limit) (L .get (L.inverse ([ data_iso (settings .settings) .rules, data_iso (rules .rules) .time_limit ])))
              ;feedback_state (feedback .setup_settings (setting_delta)) }
          ) (
          [ Z_ .Pair (10) (ten_secs_img)
          , Z_ .Pair (20) (twenty_secs_img)
          , Z_ .Pair (30) (thirty_secs_img) ]
          ) (_time_limit) ); }, { start: __div1_settings3_setting2_insert1, end: __div1_settings3_setting2_insert1 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (io_state ()
          ) (
          [ L .get ([io_as_connecting, as_maybe])
          , Z_ .maybe ([]) (Z .K (
              (function () {
    var __;
    __ = Surplus.createElement("div", null, null);
    Surplus.assign(__.style, { height: 0 });
    __.textContent = "遊戲正在開始…";
    return __;
})())) ]) ); }, { start: __div1_button5_insert2, end: __div1_button5_insert2 });
    Surplus.S.effect(function (__state) { return ( feedback_start )(__div1_button5, __state); });
    return __;
})(),
  where
  , _settings = T (app_state ()) (L .get (app_as_settings))
  , _time_limit = T (_settings) (L .get ([ settings_as_rules, rules_as_time_limit ]))
	, play_to_win_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fplay-to-win.png?1541182355223'
  , ten_secs_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F10-secs.png?1541182690288'
  , twenty_secs_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F20-secs.png?1541563332669'
  , thirty_secs_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F30-secs.png?1541563332968'
	, preview_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-preview.png?1541183674936'
	, start_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-start.png?1541183674879'
	, three_by_three_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F3x3.png?1541159540588'
	, four_by_four_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F4x4.png?1541159540274'
	, five_by_five_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F5x5.png?1541159540962'
// TODO: fix layout of unloaded imgs
  , counter_setting = label => case_feedback => case_v_img_list => _case => so ((_=_=>
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
      , case_list_length = Z_ .size (case_v_img_list)
      , wrap_case_index = i => ((i % case_list_length) + case_list_length) % case_list_length
      , data_img = T (case_v_img_list) (L .get ([ L .find (under (pair_as_first) (Z_ .equals (_case))), pair_as_second ]))
      , data_index = T (case_v_img_list) (L .getAs ((_, i) => i) (L .find (under (pair_as_first) (Z_ .equals (_case)))))
      , prev_case = T (case_v_img_list) (L .get ([ L .index (wrap_case_index (data_index - 1)), pair_as_first ]))
      , next_case = T (case_v_img_list) (L .get ([ L .index (wrap_case_index (data_index + 1)), pair_as_first ]))
      , prev_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fcounter-prev.png?1541181538486'
      , next_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fcounter-next.png?1541181537950'
      , feedback_prev = _dom => {;
          ;clicking .forEach (click => {;
            ;_dom .addEventListener (click, _ => {;case_feedback (prev_case)}) }) }
      , feedback_next = _dom => {;
          ;clicking .forEach (click => {;
            ;_dom .addEventListener (click, _ => {;case_feedback (next_case)}) }) } )=>_)
  , feedback_start = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;feedback_state (feedback .start) }) }) } )=>_)

var get_ready_view = _ => so ((_=_=>
	(function () {
    var __, __room1, __room1_insert2, __students_etc2, __students_etc2_label1, __students_etc2_label1_insert2, __students_etc2_students2, __insert3;
    __ = Surplus.createElement("get-ready-etc", null, null);
    __room1 = Surplus.createElement("room", null, __);
    Surplus.createTextNode("遊戲室編號：", __room1)
    __room1_insert2 = Surplus.createTextNode('', __room1)
    __students_etc2 = Surplus.createElement("students-etc", null, __);
    __students_etc2_label1 = Surplus.createElement("label", null, __students_etc2);
    Surplus.createTextNode("人數：", __students_etc2_label1)
    __students_etc2_label1_insert2 = Surplus.createTextNode('', __students_etc2_label1)
    __students_etc2_students2 = Surplus.createElement("students", null, __students_etc2);
    Surplus.createTextNode(" ", __students_etc2)
    __insert3 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  _room ); }, { start: __room1_insert2, end: __room1_insert2 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  Z_ .size (_students) ); }, { start: __students_etc2_label1_insert2, end: __students_etc2_label1_insert2 });
    Surplus.S.effect(function (__current) { return Surplus.content(__students_etc2_students2,  T (_students
          ) (
          Z_ .map ($ (
          [ L .get (student_name)
          , _x => (function () {
    var __;
    __ = Surplus.createElement("student", null, null);
    Surplus.content(__,  _x , "");
    return __;
})() ]))) , __current); }, '');
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  !! Z .not (Z_ .size (_students) === 0)
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
    return __;
})(),
	where
	, _room = T (app_state ()) (L .get (app_as_room))
	, _students = T (app_state ()
		) (L .get ([ app_as_students, L .valueOr ([]) ]))
  , play_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-start.png?1541183674879'
  , feedback_play = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;feedback_state (feedback .play) }) }) } )=>_)

var playing_view = _ => so ((_=_=>
  !! L .isDefined (lookbehind_nothing) (_lookbehind)
  ? (function () {
    var __, __title_etc1, __title_etc1_a_title1, __title_etc1_problem_number2, __title_etc1_problem_number2_insert2, __problem_etc2, __problem_etc2_ticker1, __problem_etc2_question2, __options3, __options3_button1, __options3_button1_img1, __options3_button2, __options3_button2_img1;
    __ = Surplus.createElement("playing-etc", null, null);
    __title_etc1 = Surplus.createElement("title-etc", null, __);
    __title_etc1_a_title1 = Surplus.createElement("a-title", null, __title_etc1);
    __title_etc1_a_title1.textContent = "Bingo";
    __title_etc1_problem_number2 = Surplus.createElement("problem-number", null, __title_etc1);
    Surplus.createTextNode("第", __title_etc1_problem_number2)
    __title_etc1_problem_number2_insert2 = Surplus.createTextNode('', __title_etc1_problem_number2)
    Surplus.createTextNode("題", __title_etc1_problem_number2)
    Surplus.createTextNode(" ", __title_etc1)
    __problem_etc2 = Surplus.createElement("problem-etc", null, __);
    __problem_etc2_ticker1 = Surplus.createElement("ticker", null, __problem_etc2);
    __problem_etc2_question2 = Surplus.createElement("question", null, __problem_etc2);
    Surplus.content(__problem_etc2_question2,  question , "");
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
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  problem_number ); }, { start: __title_etc1_problem_number2_insert2, end: __title_etc1_problem_number2_insert2 });
    Surplus.S.effect(function (__current) { return Surplus.content(__problem_etc2_ticker1,  T (game_tick) (map_defined_ ([]) (t => time_limit - t)) , __current); }, '');
    Surplus.S.effect(function (__state) { return ( view_students )(__options3_button1, __state); });
    Surplus.S.effect(function (__state) { return ( consider_end )(__options3_button2, __state); });
    return __;
})()
  :!! L .isDefined (lookbehind_view_students) (_lookbehind)
  ? (function () {
    var __, __title_etc1, __title_etc1_a_title1, __title_etc1_problem_number2, __title_etc1_problem_number2_insert2, __students2, __students2_insert1, __options3, __options3_button1, __options3_button1_img1, __options3_button2, __options3_button2_img1;
    __ = Surplus.createElement("playing-etc", null, null);
    __title_etc1 = Surplus.createElement("title-etc", null, __);
    __title_etc1_a_title1 = Surplus.createElement("a-title", null, __title_etc1);
    __title_etc1_a_title1.textContent = "Bingo";
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
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  problem_number ); }, { start: __title_etc1_problem_number2_insert2, end: __title_etc1_problem_number2_insert2 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (_students
          ) (
          [ L .collect (
            [ L .elems
            , pair_as_list ])
          , Z_ .map (([ id, [_board, _past] ]) =>
            (function () {
    var __, __label1, __insert2;
    __ = Surplus.createElement("student-etc", null, null);
    __label1 = Surplus.createElement("label", null, __);
    Surplus.content(__label1, id .name, "");
    __insert2 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  so ((_=_=>
              (function () {
    var __, __insert2;
    __ = Surplus.createElement("board", null, null);
    Surplus.createTextNode(" ", __)
    __insert2 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (_board) (Z_ .map (_row => 
                (function () {
    var __, __insert2;
    __ = Surplus.createElement("row", null, null);
    Surplus.createTextNode(" ", __)
    __insert2 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (_row) (Z_ .map (_cell =>
                  so ((_=_=>
                  !! (_cell_bingo) ? (function () {
    var __;
    __ = Surplus.createElement("cell", null, null);
    Surplus.setAttribute(__, "x-bingoed", true);
    return __;
})()
                  :!! (_cell_solved) ? (function () {
    var __;
    __ = Surplus.createElement("cell", null, null);
    Surplus.setAttribute(__, "x-solved", true);
    return __;
})()
                  : Surplus.createElement('cell', null, null),
                  where
                  , _cell_position = T (_cell) (L .get (cell_as_position))
                  , _cell_solved = Z .elem (_cell_position) (_solved_positions)
                  , _cell_bingo = R .any (Z .elem (_cell_position)) (_bingoed_positions) )=>_)))
                  ); }, { start: __insert2, end: __insert2 });
    return __;
})() )) ); }, { start: __insert2, end: __insert2 });
    return __;
})(),
              where
              , _solved_positions = solved_positions (_board) (_past)
              , _bingoed_positions = bingoed_positions (_board) (_past) )=>_) ); }, { start: __insert2, end: __insert2 });
    return __;
})()) ]) ); }, { start: __students2_insert1, end: __students2_insert1 });
    Surplus.S.effect(function (__state) { return ( show_problem )(__options3_button1, __state); });
    Surplus.S.effect(function (__state) { return ( consider_end )(__options3_button2, __state); });
    return __;
})()
  :!! L .isDefined (lookbehind_consider_end) (_lookbehind)
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
  , _problem = T (_app) (current_problem)
  , _students = T (_app) (L .get (app_as_students)) 
  , problem_number = T (_app) (L .get (app_as_progress)) + 1
  , time_limit = T (app_state ()) (L .get ([ app_as_settings, settings_as_time_limit ]))
  , game_tick = just_now (game_tick_sampler)
  , question = T (_problem) (L .get (problem_as_question))
  , show_problem_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fshow-problem.png?1543385405259'
  , view_students_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fview-students.png?1541802335642'
  , end_game_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fend-game.png?1541802334772'
  , confirm_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fconfirm.png?1541818699969'
  , cancel_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fcancel.png?1541818700002'
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
          ;feedback_state (feedback .end) })})} )=>_)
    
													 
var game_over_view = (function () {
    var __, __message2;
    __ = Surplus.createElement("game-over-etc", null, null);
    Surplus.createTextNode(" ", __)
    __message2 = Surplus.createElement("message", null, __);
    __message2.textContent = "Game Over!";
    Surplus.createTextNode(" ", __)
    return __;
})()
  
window .view = (function () {
    var __, __insert1;
    __ = Surplus.createElement("teacher-app", null, null);
    __insert1 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  !! (L .isDefined (app_as_setup) (app_state ()))
    ? setup_view
    :!! (L .isDefined (app_as_get_ready) (app_state ()))
    ? get_ready_view
    :!! (L .isDefined (app_as_playing) (app_state ()))
    ? playing_view
    :!! (L .isDefined (app_as_game_over) (app_state ()))
    ? game_over_view
    : panic ('undefined app state in view')  ); }, { start: __insert1, end: __insert1 });
    return __;
})()
												 
												 
												 
												 
												 
												 
												 
												 
												 
												 
												 
												 
												 
var get_room = _room => {;
	var _settings = T (S .sample (app_state)) (L .get (app_as_settings))

	;return go
	.then (_ =>
		io_state (io .connecting) && api (_room)
		.then (panic_on ([ [_x => Z .not (Z_ .equals ({}) (_x)), _room + ' taken'] ])) )
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
	T (
  { _ensemble: S .sample (ensemble_state)
  , _room: T (S .sample (app_state)) (L .get (app_as_room)) }
  ) (
  under (as_complete) (({ _ensemble, _room }) => {;
		;go
		.then (_ =>
			io_state (io .messaging) && api (_room,
				post (message_encoding (message .teacher_start (schedule_start (_ensemble)))))
			.then (panic_on ([
				[ _x => ! _x .ok, 'cannot post to ' + _room ] ]) ))
		.catch (_e => {;
			;console .error (_e) })
		.then (_ => {;
			;io_state (io .inert) }) })) }

var timesup_problem = _ => {;
	;app_state (
    teacher_app_playing_to_next (S .sample (app_state))) }

var end_game = _ => {;
  var now = (new Date) .getTime ()
  
  var _app = S .sample (app_state) 
  var _room = T (_app) (L .get (app_as_room))

  ;go
  .then (_ =>
    io_state (io .messaging) && api (_room,
      post (message_encoding (message .teacher_end (now))))
    .then (panic_on ([
      [ _x => ! _x .ok, 'cannot post to ' + _room ] ]) ))
  .then (_ => {;app_state (teacher_app_playing_to_game_over (_app))})
  .catch (_e => {;
    ;console .error (_e) })
  .then (_ => {;
    ;io_state (io .inert) }) } 
				
				
				
				
				
				
				
var game_clock = new TimelineMax
var game_tick_sampler = temporal ()

	 
var reping_period = 3
var heartbeat = S .data (reping_period) 
	
var connection = S (_ => {;
	;return T (app_state ()) (
		under (app_as_room) (_room => {;
			if (! connection [_room]) {
				;connection [_room] = S .data ()
				;api .listen_ping (_room) (connection [_room]) }
			if (connection [_room] ()) {
				return so ((_=()=>
				[ timestamp, mean, Math .sqrt (variance) ],
				where
				, [ mean, variance, n, timestamp ] = connection [_room] () )=>_) } } ) ) }) 



S (_ => {;
	if (L .isDefined (app_as_get_ready) (app_state ())) {
		;game_clock .pause () } })
S (last_state => {;
	var last_progress = T (last_state) (L .get (app_as_progress))
	var progress = T (app_state ()) (L .get (app_as_progress))
	if (L .isDefined (app_as_playing) (app_state ())) {
		if (progress !== undefined && Z .not (Z .equals (last_progress) (progress))) {
			;game_clock .seek (0) }
		;game_clock .play () }
	return app_state () }
, app_state ())
S (_ => {;
	if (L .isDefined (app_as_game_over) (app_state ())) {
		;game_clock .pause () } })

//TODO: add guard to warn against depending on datas other than feedback
S (_ => {;
  ;so ((
  take
  , cases = 
      [ [ data_lens (feedback .setup_settings) .settings_piece
        , _piece => {;
            //TODO: tidy this up
            var cleansed_piece = JSON .parse (JSON .stringify (_piece))
            ;app_state (
              T (S .sample (app_state)
              ) (
              L .modify (app_as_settings) (R .mergeDeepLeft (cleansed_piece)) )) } ]
      , [ data_iso (feedback .start)
        , _ => {;
            ;get_room (T (Math .random ()) ([
              _x => _x * 100000000,
              _x => Math .floor (_x) ])) .catch (_ => {}) } ]
      , [ data_iso (feedback .play)
        , _ => {;
            ;start_playing () } ]
      , [ data_iso (feedback .end)
        , _ => {;
            ;end_game () } ] ] )=>
  so ((_=_=>
  T (just_now (feedback_state)
  ) (
  action),
  where
  , action = 
      Z_ .flip (T (cases) (Z_ .map (_case => so ((_=_=>
        _feedback => {;
          var result = L .get (predicate) (_feedback)
          if (result) {
            ;action (result) } },
        where
        , predicate = _case [0]
        , action = _case [1] )=>_) ))) )=>_)) })



S (_ => {;
	var _app = S .sample (app_state)
	var _ensemble = ensemble_state ()
	
	var _app_students = T (_app) (L .get (app_as_students))
	var _ensemble_students = T (_ensemble) (assemble_students (_app))
	if (_ensemble_students && Z .not (Z_ .equals (_ensemble_students) (_app_students))) {
		;app_state (
			T (_app
			) (L .set (app_as_students) (_ensemble_students))) } })
S (last_ensemble => {;
	var _app = S .sample (app_state)
	var _ensemble = ensemble_state ()
	if (L .isDefined (app_as_get_ready) (_app)) {
		if (! L .isDefined (ensemble_as_start) (last_ensemble)) {
			if (L .isDefined (ensemble_as_start) (_ensemble)) {
				var start = L .get (ensemble_as_start) (_ensemble)
				var now = (new Date) .getTime ()

				var playing_app = teacher_app_get_ready_to_playing (_app)
        
        var time_limit = T (playing_app) (L .get ([ app_as_settings, settings_as_time_limit ]))
        game_clock .clear ()
        ;game_clock .add (timesup_problem, time_limit)
        ;T (Z .range (0) (time_limit + 1)) (R .forEach (t => {;
          ;game_clock .add (_ => {;game_tick_sampler (t)}, t) }))
        
				if (start > now) {
					;app_state (playing_app) }
				else {
					;setTimeout (_ => {;
						;app_state (playing_app) }
					, start - now) } } } }
	return _ensemble }
, ensemble_state ())
//TODO: tidy this up
so ((_=_=>
S (last_ensemble => {;
	var _app = S .sample (app_state)
	var _ensemble = ensemble_state ()
  var _win_rule = T (_app) (L .get ([ app_as_settings, settings_as_win_rule ]))
  if (Z_ .equals (win_rule .first_bingo) (_win_rule)) {
    if (L .isDefined (app_as_playing) (_app)) {
      if (! Z_ .size (ensemble_bingoed_positions (last_ensemble))) {
        if (Z_ .size (ensemble_bingoed_positions (_ensemble))) {
          ;end_game () } } } }
	return _ensemble }
, ensemble_state ()),
where
, ensemble_bingoed_positions = by (_ensemble =>
    $ (
    [ assemble_students (S .sample (app_state))
    , L .collect ([ L .elems, pair_as_second, ([_board, _past]) => bingoed_positions (_board) (_past) ])
    , Z_ .join ])) )=>_)

S (_ => {;
	;T (app_state ()
  ) (under (app_as_room) (_room => {;
			var phase = heartbeat ()
			var critical = phase === 1
			go
			.then (_ =>
				!! critical //&& S .sample (connection) // why need && sample
				? io_state (io .messaging) && api (_room,
						post (message_encoding (message .teacher_ping (S .sample (connection)))))
				: io_state (io .heartbeat) && api (_room)
					.then ($ ([
						L .get (L .inverse (data_iso (ensemble .ensemble))),
						_x => {;
							;ensemble_state (_x) } ])) )
      .catch (_x => {;
        if (Z_ .equals (L .get ('error') (_x)) ('timeout')) {;
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
				;io_state (io .inert) }) })) })

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22file%22%3A%22out.js%22%2C%22sources%22%3A%5B%22in.js%22%5D%2C%22sourcesContent%22%3A%5B%22var%20%7B%20T%2C%20%24%2C%20apply%2C%20L%2C%20R%2C%20S%2C%20Z%2C%20Z_%2C%20Z%24%2C%20sanc%2C%20memoize%2C%20TimelineMax%2C%5Cnso%2C%20by%2C%20and_by%2C%20under%2C%5Cngo%2C%20never%2C%20panic%2C%20panic_on%2C%5Cnjust_now%2C%20temporal%2C%5Cnfiat%2C%20data%2C%20data_lens%2C%20data_iso%2C%20data_kind%2C%5Cnn_reducer%2C%20pair_zip_n%2C%20pair_zip%2C%20pair_projection%2C%5Cnmap_defined_%2C%20map_defined%2C%20from_just%2C%20maybe_all%2C%5Cnas_sole%2C%20sole%2C%20every%2C%20delay%2C%5Cnbool%2C%20number%2C%20timestamp%2C%20string%2C%5Cnlist%2C%20map%2C%20maybe%2C%20nat%2C%20id%2C%20v%2C%20piece%2C%5Cnshuffle%2C%20uuid%2C%20api%2C%20post%2C%5Cnstudent%2C%20problem%2C%20choice%2C%20answer%2C%20latency%2C%20ping%2C%20position%2C%5Cnattempt%2C%20point%2C%20past%2C%20board%2C%20win_rule%2C%20rules%2C%20settings%2C%5Cnteacher_app%2C%20student_app%2C%5Cnio%2C%20message%2C%20ensemble%2C%20%5Cndefault_problems%2C%20default_rules%2C%20default_settings%2C%5Cnas_maybe%2C%20as_defined%2C%20as_complete%2C%20complete_%2C%5Cnapp_as_setup%2C%20app_as_get_ready%2C%20app_as_playing%2C%20app_as_game_over%2C%20app_as_progress%2C%5Cnsettings_as_problems%2C%20settings_as_rules%2C%5Cnsettings_as_size%2C%20settings_as_time_limit%2C%20settings_as_win_rule%2C%5Cnio_as_inert%2C%20io_as_connecting%2C%20io_as_heartbeat%2C%5Cnensemble_as_ping%2C%20ensemble_as_settings%2C%20ensemble_as_start%2C%20ensemble_as_progress%2C%20ensemble_as_end%2C%5Cnensemble_as_student_pings%2C%20ensemble_as_student_starts%2C%5Cnensemble_as_student_boards%2C%20ensemble_as_student_pasts%2C%5Cnattempt_as_position%2C%20attempt_as_latency%2C%20point_as_attempts%2C%20point_as_position%2C%20past_as_points%2C%5Cnapp_as_settings%2C%20app_as_student%2C%20app_as_students%2C%20app_as_room%2C%5Cnapp_as_board%2C%20app_as_past%2C%20app_as_problems%2C%5Cnapp_as_last_point%2C%20point_as_attempts%2C%5Cnrules_as_size%2C%20rules_as_time_limit%2C%20settings_as_size%2C%20settings_as_time_limit%2C%5Cnproblem_as_question%2C%20problem_as_answers%2C%5Cncell_as_position%2C%20as_position%2C%5Cncell_as_choice%2C%20student_name%2C%5Cnpair_as_list%2C%20pair_as_first%2C%20pair_as_second%2C%5Cnmessage_encoding%2C%20messages_encoding%2C%5Cnassemble_students%2C%20schedule_start%2C%5Cnteacher_app_get_ready_to_playing%2C%20teacher_app_playing_to_next%2C%20teacher_app_playing_to_game_over%2C%5Cnstudent_app_get_ready_to_playing%2C%20student_app_playing_to_next%2C%20student_app_playing_to_game_over%2C%5Cnpast_progressed%2C%5Cncurrent_problem%2C%20problem_choice_matches%2C%5Cnattempted_positions%2C%20solved_positions%2C%20bingoed_positions%5Cn%7D%20%3D%20window%20.stuff%5Cn%5Cn%5Cnvar%20feedback%20%3D%20data%20(%7B%5Cn%20%20start%3A%20()%20%3D%3E%20feedback%2C%5Cn%20%20setup_settings%3A%20(%20settings_piece%20%3D~%20piece%20(settings)%20)%20%3D%3E%20feedback%2C%5Cn%20%20play%3A%20()%20%3D%3E%20feedback%2C%5Cn%20%20end%3A%20()%20%3D%3E%20feedback%20%7D)%5Cn%5Cnvar%20lookbehind%20%3D%20data%20(%7B%5Cn%5Ctnothing%3A%20()%20%3D%3E%20lookbehind%2C%5Cn%5Ctview_students%3A%20()%20%3D%3E%20lookbehind%2C%5Cn%5Ctconsider_end%3A%20()%20%3D%3E%20lookbehind%20%7D)%5Cn%5Cnvar%20feedback_start%20%3D%20data_iso%20(feedback%20.start)%5Cnvar%20feedback_setup_settings%20%3D%20data_iso%20(feedback%20.setup_settings)%5Cnvar%20feedback_play%20%3D%20data_iso%20(feedback%20.play)%5Cn%5Cnvar%20lookbehind_nothing%20%3D%20data_iso%20(lookbehind%20.nothing)%5Cnvar%20lookbehind_view_students%20%3D%20data_iso%20(lookbehind%20.view_students)%5Cnvar%20lookbehind_consider_end%20%3D%20data_iso%20(lookbehind%20.consider_end)%5Cn%5Cn%5Cnvar%20app_state%20%3D%20S%20.data%20(teacher_app%20.setup%20(default_settings))%5Cn%5Cnvar%20io_state%20%3D%20S%20.data%20(io%20.inert)%5Cnvar%20ensemble_state%20%3D%20S%20.data%20(ensemble%20.nothing)%5Cn%5Cn%2F%2Fvar%20feedback_state%20%3D%20S%20.data%20(temporal%20())%5Cnvar%20feedback_state%20%3D%20temporal%20()%5Cnvar%20lookbehind_state%20%3D%20S%20.data%20(lookbehind%20.nothing)%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cnvar%20clicking%20%3D%20%5B'click'%5D%5Cn%5Cnvar%20setup_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%3Csetup-etc%3E%5Cn%20%20%20%20%3Cdiv%20class%3D%5C%22left-pane%5C%22%3E%5Cn%20%20%20%20%20%20%3Ca-title%3EBingo%3C%2Fa-title%3E%5Cn%20%20%20%20%20%20%3Csub-title%3E%E9%99%A4%E6%B3%95%EF%BC%88%E4%B8%80%EF%BC%89%3C%2Fsub-title%3E%5Cn%20%20%20%20%20%20%3Csettings%20x-for%3D%5C%22game-mode%20time-limit%5C%22%20style%3D%7B%7B%20marginTop%3A%20'20px'%20%7D%7D%3E%5Cn%20%20%20%20%20%20%3Csetting%20x-of%3D%5C%22game-mode%5C%22%3E%5Cn%20%20%20%20%20%20%20%20%7B%20(counter_setting%5Cn%20%20%20%20%20%20%20%20%20%20)%20('%E9%81%8A%E6%88%B2%E6%A8%A1%E5%BC%8F%EF%BC%9A'%5Cn%20%20%20%20%20%20%20%20%20%20)%20(_game_mode%20%3D%3E%20%7B%7D%5Cn%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%5B%20Z_%20.Pair%20(fiat)%20(play_to_win_img)%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20)%20(fiat)%20%7D%20%3C%2Fsetting%3E%5Cn%20%20%20%20%20%20%3Csetting%20x-of%3D%5C%22time-limit%5C%22%3E%5Cn%20%20%20%20%20%20%20%20%7B%20(counter_setting%5Cn%20%20%20%20%20%20%20%20%20%20)%20('%E5%90%84%E9%A1%8C%E4%BD%9C%E7%AD%94%E6%99%82%E9%99%90%EF%BC%9A'%5Cn%20%20%20%20%20%20%20%20%20%20)%20(_time_limit%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20setting_delta%20%3D%20T%20(_time_limit)%20(L%20.get%20(L.inverse%20(%5B%20data_iso%20(settings%20.settings)%20.rules%2C%20data_iso%20(rules%20.rules)%20.time_limit%20%5D)))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Bfeedback_state%20(feedback%20.setup_settings%20(setting_delta))%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%5B%20Z_%20.Pair%20(10)%20(ten_secs_img)%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20Z_%20.Pair%20(20)%20(twenty_secs_img)%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20Z_%20.Pair%20(30)%20(thirty_secs_img)%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20)%20(_time_limit)%20%7D%20%3C%2Fsetting%3E%3C%2Fsettings%3E%5Cn%20%20%20%20%20%20%3Cbutton%20x-custom%3D%5C%22true%5C%22%20x-for%3D%5C%22preview%5C%22%20style%3D%7B%7B%20marginTop%3A%20'25px'%20%7D%7D%3E%3Cimg%20src%3D%7B%20preview_img%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%3Cbutton%20x-custom%3D%5C%22true%5C%22%20x-for%3D%5C%22start%5C%22%20fn%3D%7B%20feedback_start%20%7D%3E%5Cn%20%20%20%20%20%20%20%20%3Cimg%20src%3D%7B%20start_img%20%7D%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%7B%20T%20(io_state%20()%5Cn%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%5B%20L%20.get%20(%5Bio_as_connecting%2C%20as_maybe%5D)%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20Z_%20.maybe%20(%5B%5D)%20(Z%20.K%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20style%3D%7B%7B%20height%3A%200%20%7D%7D%3E%E9%81%8A%E6%88%B2%E6%AD%A3%E5%9C%A8%E9%96%8B%E5%A7%8B%E2%80%A6%3C%2Fdiv%3E))%20%5D)%20%7D%20%3C%2Fbutton%3E%3C%2Fdiv%3E%5Cn%20%20%20%20%3Cdiv%20class%3D%5C%22right-pane%5C%22%3E%5Cn%20%20%20%20%20%20%3Csettings%20x-for%3D%5C%22board-size%5C%22%3E%5Cn%20%20%20%20%20%20%20%20%3Csetting%20x-of%3D%5C%22board-size%5C%22%20x-be%3D%5C%223x3%5C%22%3E%3Cimg%20src%3D%7B%20three_by_three_img%20%7D%20%2F%3E%3C%2Fsetting%3E%5Cn%20%20%20%20%20%20%20%20%3Csetting%20x-of%3D%5C%22board-size%5C%22%20x-be%3D%5C%224x4%5C%22%3E%3Cimg%20src%3D%7B%20four_by_four_img%20%7D%20%2F%3E%3C%2Fsetting%3E%5Cn%20%20%20%20%20%20%20%20%3Csetting%20x-of%3D%5C%22board-size%5C%22%20x-be%3D%5C%225x5%5C%22%3E%3Cimg%20src%3D%7B%20five_by_five_img%20%7D%20%2F%3E%3C%2Fsetting%3E%3C%2Fsettings%3E%3C%2Fdiv%3E%3C%2Fsetup-etc%3E%2C%5Cn%20%20where%5Cn%20%20%2C%20_settings%20%3D%20T%20(app_state%20())%20(L%20.get%20(app_as_settings))%5Cn%20%20%2C%20_time_limit%20%3D%20T%20(_settings)%20(L%20.get%20(%5B%20settings_as_rules%2C%20rules_as_time_limit%20%5D))%5Cn%5Ct%2C%20play_to_win_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fplay-to-win.png%3F1541182355223'%5Cn%20%20%2C%20ten_secs_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252F10-secs.png%3F1541182690288'%5Cn%20%20%2C%20twenty_secs_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252F20-secs.png%3F1541563332669'%5Cn%20%20%2C%20thirty_secs_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252F30-secs.png%3F1541563332968'%5Cn%5Ct%2C%20preview_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fgo-preview.png%3F1541183674936'%5Cn%5Ct%2C%20start_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fgo-start.png%3F1541183674879'%5Cn%5Ct%2C%20three_by_three_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252F3x3.png%3F1541159540588'%5Cn%5Ct%2C%20four_by_four_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252F4x4.png%3F1541159540274'%5Cn%5Ct%2C%20five_by_five_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252F5x5.png%3F1541159540962'%5Cn%2F%2F%20TODO%3A%20fix%20layout%20of%20unloaded%20imgs%5Cn%20%20%2C%20counter_setting%20%3D%20label%20%3D%3E%20case_feedback%20%3D%3E%20case_v_img_list%20%3D%3E%20_case%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20%5B%20%3Clabel%3E%7B%20label%20%7D%3C%2Flabel%3E%5Cn%20%20%20%20%20%20%2C%20%3Ccontrol%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3Cprev%20fn%3D%7B%20feedback_prev%20%7D%3E%3Cimg%20src%3D%7B%20prev_img%20%7D%20%2F%3E%3C%2Fprev%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3Ccounter%3E%3Cimg%20src%3D%7B%20data_img%20%7D%20%2F%3E%3C%2Fcounter%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3Cnext%20fn%3D%7B%20feedback_next%20%7D%3E%3Cimg%20src%3D%7B%20next_img%20%7D%20%2F%3E%3C%2Fnext%3E%3C%2Fcontrol%3E%20%5D%2C%5Cn%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%2C%20case_list_length%20%3D%20Z_%20.size%20(case_v_img_list)%5Cn%20%20%20%20%20%20%2C%20wrap_case_index%20%3D%20i%20%3D%3E%20((i%20%25%20case_list_length)%20%2B%20case_list_length)%20%25%20case_list_length%5Cn%20%20%20%20%20%20%2C%20data_img%20%3D%20T%20(case_v_img_list)%20(L%20.get%20(%5B%20L%20.find%20(under%20(pair_as_first)%20(Z_%20.equals%20(_case)))%2C%20pair_as_second%20%5D))%5Cn%20%20%20%20%20%20%2C%20data_index%20%3D%20T%20(case_v_img_list)%20(L%20.getAs%20((_%2C%20i)%20%3D%3E%20i)%20(L%20.find%20(under%20(pair_as_first)%20(Z_%20.equals%20(_case)))))%5Cn%20%20%20%20%20%20%2C%20prev_case%20%3D%20T%20(case_v_img_list)%20(L%20.get%20(%5B%20L%20.index%20(wrap_case_index%20(data_index%20-%201))%2C%20pair_as_first%20%5D))%5Cn%20%20%20%20%20%20%2C%20next_case%20%3D%20T%20(case_v_img_list)%20(L%20.get%20(%5B%20L%20.index%20(wrap_case_index%20(data_index%20%2B%201))%2C%20pair_as_first%20%5D))%5Cn%20%20%20%20%20%20%2C%20prev_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fcounter-prev.png%3F1541181538486'%5Cn%20%20%20%20%20%20%2C%20next_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fcounter-next.png%3F1541181537950'%5Cn%20%20%20%20%20%20%2C%20feedback_prev%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3Bcase_feedback%20(prev_case)%7D)%20%7D)%20%7D%5Cn%20%20%20%20%20%20%2C%20feedback_next%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3Bcase_feedback%20(next_case)%7D)%20%7D)%20%7D%20)%3D%3E_)%5Cn%20%20%2C%20feedback_start%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bfeedback_state%20(feedback%20.start)%20%7D)%20%7D)%20%7D%20)%3D%3E_)%5Cn%5Cnvar%20get_ready_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%3Cget-ready-etc%3E%5Cn%5Ct%5Ct%3Croom%3E%E9%81%8A%E6%88%B2%E5%AE%A4%E7%B7%A8%E8%99%9F%EF%BC%9A%7B%20_room%20%7D%3C%2Froom%3E%5Cn%20%20%20%20%3Cstudents-etc%3E%5Cn%20%20%20%20%20%20%3Clabel%3E%E4%BA%BA%E6%95%B8%EF%BC%9A%7B%20Z_%20.size%20(_students)%20%7D%3C%2Flabel%3E%5Cn%20%20%20%20%20%20%3Cstudents%3E%5Cn%20%20%20%20%20%20%20%20%7B%20T%20(_students%5Cn%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20Z_%20.map%20(%24%20(%5Cn%20%20%20%20%20%20%20%20%20%20%5B%20L%20.get%20(student_name)%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20_x%20%3D%3E%20%3Cstudent%3E%7B%20_x%20%7D%3C%2Fstudent%3E%20%5D)))%20%7D%3C%2Fstudents%3E%20%3C%2Fstudents-etc%3E%5Cn%20%20%20%20%7B%20!!%20Z%20.not%20(Z_%20.size%20(_students)%20%3D%3D%3D%200)%5Cn%5Ct%5Ct%5Ct%5Ct%3F%20%3Cbutton%20x-custom%20x-for%3D%5C%22play%5C%22%20fn%3D%7B%20feedback_play%20%7D%3E%3Cimg%20src%3D%7B%20play_img%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3A%20%5B%5D%20%7D%20%3C%2Fget-ready-etc%3E%2C%5Cn%5Ctwhere%5Cn%5Ct%2C%20_room%20%3D%20T%20(app_state%20())%20(L%20.get%20(app_as_room))%5Cn%5Ct%2C%20_students%20%3D%20T%20(app_state%20()%5Cn%5Ct%5Ct)%20(L%20.get%20(%5B%20app_as_students%2C%20L%20.valueOr%20(%5B%5D)%20%5D))%5Cn%20%20%2C%20play_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fgo-start.png%3F1541183674879'%5Cn%20%20%2C%20feedback_play%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bfeedback_state%20(feedback%20.play)%20%7D)%20%7D)%20%7D%20)%3D%3E_)%5Cn%5Cnvar%20playing_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20!!%20L%20.isDefined%20(lookbehind_nothing)%20(_lookbehind)%5Cn%20%20%3F%20%3Cplaying-etc%3E%5Cn%20%20%20%20%20%20%3Ctitle-etc%3E%5Cn%20%20%20%20%20%20%20%20%3Ca-title%3EBingo%3C%2Fa-title%3E%5Cn%20%20%20%20%20%20%20%20%3Cproblem-number%3E%E7%AC%AC%7B%20problem_number%20%7D%E9%A1%8C%3C%2Fproblem-number%3E%20%3C%2Ftitle-etc%3E%5Cn%20%20%20%20%20%20%3Cproblem-etc%3E%5Cn%20%20%20%20%20%20%20%20%3Cticker%3E%7B%20T%20(game_tick)%20(map_defined_%20(%5B%5D)%20(t%20%3D%3E%20time_limit%20-%20t))%20%7D%3C%2Fticker%3E%5Cn%20%20%20%20%20%20%20%20%3Cquestion%3E%7B%20question%20%7D%3C%2Fquestion%3E%20%3C%2Fproblem-etc%3E%5Cn%20%20%20%20%20%20%3Coptions%3E%5Cn%20%20%20%20%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22view-students%5C%22%20fn%3D%7B%20view_students%20%7D%3E%3Cimg%20src%3D%7B%20view_students_img%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22end-game%5C%22%20fn%3D%7B%20consider_end%20%7D%3E%3Cimg%20src%3D%7B%20end_game_img%20%7D%20%2F%3E%3C%2Fbutton%3E%20%3C%2Foptions%3E%20%3C%2Fplaying-etc%3E%5Cn%20%20%3A!!%20L%20.isDefined%20(lookbehind_view_students)%20(_lookbehind)%5Cn%20%20%3F%20%3Cplaying-etc%3E%5Cn%20%20%20%20%20%20%3Ctitle-etc%3E%5Cn%20%20%20%20%20%20%20%20%3Ca-title%3EBingo%3C%2Fa-title%3E%5Cn%20%20%20%20%20%20%20%20%3Cproblem-number%3E%E7%AC%AC%7B%20problem_number%20%7D%E9%A1%8C%3C%2Fproblem-number%3E%20%3C%2Ftitle-etc%3E%5Cn%20%20%20%20%20%20%3Cstudents%3E%5Cn%20%20%20%20%20%20%20%20%7B%20T%20(_students%5Cn%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%5B%20L%20.collect%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5B%20L%20.elems%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%2C%20pair_as_list%20%5D)%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20Z_%20.map%20((%5B%20id%2C%20%5B_board%2C%20_past%5D%20%5D)%20%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Cstudent-etc%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Clabel%3E%7Bid%20.name%7D%3C%2Flabel%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cboard%3E%20%7B%20T%20(_board)%20(Z_%20.map%20(_row%20%3D%3E%20%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crow%3E%20%7B%20T%20(_row)%20(Z_%20.map%20(_cell%20%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20!!%20(_cell_bingo)%20%3F%20%3Ccell%20x-bingoed%3E%3C%2Fcell%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A!!%20(_cell_solved)%20%3F%20%3Ccell%20x-solved%3E%3C%2Fcell%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20%3Ccell%3E%3C%2Fcell%3E%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_cell_position%20%3D%20T%20(_cell)%20(L%20.get%20(cell_as_position))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_cell_solved%20%3D%20Z%20.elem%20(_cell_position)%20(_solved_positions)%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_cell_bingo%20%3D%20R%20.any%20(Z%20.elem%20(_cell_position))%20(_bingoed_positions)%20)%3D%3E_)))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%3C%2Frow%3E%20))%20%7D%20%3C%2Fboard%3E%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_solved_positions%20%3D%20solved_positions%20(_board)%20(_past)%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_bingoed_positions%20%3D%20bingoed_positions%20(_board)%20(_past)%20)%3D%3E_)%20%7D%20%3C%2Fstudent-etc%3E)%20%5D)%20%7D%20%3C%2Fstudents%3E%5Cn%20%20%20%20%20%20%3Coptions%3E%5Cn%20%20%20%20%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22show-problem%5C%22%20fn%3D%7B%20show_problem%20%7D%3E%3Cimg%20src%3D%7B%20show_problem_img%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22end-game%5C%22%20fn%3D%7B%20consider_end%20%7D%3E%3Cimg%20src%3D%7B%20end_game_img%20%7D%20%2F%3E%3C%2Fbutton%3E%20%3C%2Foptions%3E%20%3C%2Fplaying-etc%3E%5Cn%20%20%3A!!%20L%20.isDefined%20(lookbehind_consider_end)%20(_lookbehind)%5Cn%20%20%3F%20%3Cplaying-etc%3E%5Cn%20%20%20%20%20%20%3Cabort-etc%3E%5Cn%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%5C%22box%5C%22%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3Clabel%3E%E7%B5%90%E6%9D%9F%E9%81%8A%E6%88%B2%EF%BC%9F%3C%2Flabel%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3Coptions%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22confirm%5C%22%20fn%3D%7B%20confirm_end%20%7D%3E%3Cimg%20src%3D%7B%20confirm_img%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22show-problem%5C%22%20fn%3D%7B%20show_problem%20%7D%3E%3Cimg%20src%3D%7B%20cancel_img%20%7D%20%2F%3E%3C%2Fbutton%3E%3C%2Foptions%3E%3C%2Fdiv%3E%3C%2Fabort-etc%3E%3C%2Fplaying-etc%3E%5Cn%20%20%3A%20panic%20('unknown%20lookbehind%20state')%2C%5Cn%20%20where%5Cn%20%20%2C%20_lookbehind%20%3D%20lookbehind_state%20()%20%5Cn%20%20%2C%20_app%20%3D%20app_state%20()%5Cn%20%20%2C%20_problem%20%3D%20T%20(_app)%20(current_problem)%5Cn%20%20%2C%20_students%20%3D%20T%20(_app)%20(L%20.get%20(app_as_students))%20%5Cn%20%20%2C%20problem_number%20%3D%20T%20(_app)%20(L%20.get%20(app_as_progress))%20%2B%201%5Cn%20%20%2C%20time_limit%20%3D%20T%20(app_state%20())%20(L%20.get%20(%5B%20app_as_settings%2C%20settings_as_time_limit%20%5D))%5Cn%20%20%2C%20game_tick%20%3D%20just_now%20(game_tick_sampler)%5Cn%20%20%2C%20question%20%3D%20T%20(_problem)%20(L%20.get%20(problem_as_question))%5Cn%20%20%2C%20show_problem_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fshow-problem.png%3F1543385405259'%5Cn%20%20%2C%20view_students_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fview-students.png%3F1541802335642'%5Cn%20%20%2C%20end_game_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fend-game.png%3F1541802334772'%5Cn%20%20%2C%20confirm_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fconfirm.png%3F1541818699969'%5Cn%20%20%2C%20cancel_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fcancel.png%3F1541818700002'%5Cn%20%20%2C%20show_problem%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blookbehind_state%20(lookbehind%20.nothing)%20%7D)%7D)%7D%5Cn%20%20%2C%20view_students%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blookbehind_state%20(lookbehind%20.view_students)%20%7D)%7D)%7D%5Cn%20%20%2C%20consider_end%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blookbehind_state%20(lookbehind%20.consider_end)%20%7D)%7D)%7D%5Cn%20%20%2C%20confirm_end%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bfeedback_state%20(feedback%20.end)%20%7D)%7D)%7D%20)%3D%3E_)%5Cn%20%20%20%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cnvar%20game_over_view%20%3D%20%3Cgame-over-etc%3E%20%3Cmessage%3EGame%20Over!%3C%2Fmessage%3E%20%3C%2Fgame-over-etc%3E%5Cn%20%20%5Cnwindow%20.view%20%3D%20%3Cteacher-app%3E%5Cn%20%20%7B%20!!%20(L%20.isDefined%20(app_as_setup)%20(app_state%20()))%5Cn%20%20%20%20%3F%20setup_view%5Cn%20%20%20%20%3A!!%20(L%20.isDefined%20(app_as_get_ready)%20(app_state%20()))%5Cn%20%20%20%20%3F%20get_ready_view%5Cn%20%20%20%20%3A!!%20(L%20.isDefined%20(app_as_playing)%20(app_state%20()))%5Cn%20%20%20%20%3F%20playing_view%5Cn%20%20%20%20%3A!!%20(L%20.isDefined%20(app_as_game_over)%20(app_state%20()))%5Cn%20%20%20%20%3F%20game_over_view%5Cn%20%20%20%20%3A%20panic%20('undefined%20app%20state%20in%20view')%20%20%7D%20%3C%2Fteacher-app%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%20%5Cnvar%20get_room%20%3D%20_room%20%3D%3E%20%7B%3B%5Cn%5Ctvar%20_settings%20%3D%20T%20(S%20.sample%20(app_state))%20(L%20.get%20(app_as_settings))%5Cn%5Cn%5Ct%3Breturn%20go%5Cn%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ctio_state%20(io%20.connecting)%20%26%26%20api%20(_room)%5Cn%5Ct%5Ct.then%20(panic_on%20(%5B%20%5B_x%20%3D%3E%20Z%20.not%20(Z_%20.equals%20(%7B%7D)%20(_x))%2C%20_room%20%2B%20'%20taken'%5D%20%5D))%20)%5Cn%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ctapi%20(_room%2C%5Cn%5Ct%5Ct%5Ctpost%20(message_encoding%20(%5Cn%5Ct%5Ct%5Ct%5Ctso%20((_%3D_%3D%3E%5Cn%5Ct%5Ct%5Ct%5Ctmessage%20.teacher_settings%20(settings%20.settings%20(_problems%2C%20_rules))%2C%5Cn%5Ct%5Ct%5Ct%5Ctwhere%5Cn%5Ct%5Ct%5Ct%5Ct%2C%20%7B%20_problems%2C%20_rules%20%7D%20%3D%20T%20(_settings%5Cn%20%20%20%20%20%20%20%20%20%20)%20(L%20.get%20(L%20.pick%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%20_problems%3A%20settings_as_problems%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_rules%3A%20settings_as_rules%20%7D)))%20)%3D%3E_)%20)%20))%5Cn%5Ct%5Ct.then%20(panic_on%20(%5B%5Cn%5Ct%5Ct%5Ct%5B%20_x%20%3D%3E%20!%20_x%20.ok%2C%20'cannot%20post%20to%20'%20%2B%20_room%20%5D%20%5D))%20)%5Cn%5Ct.then%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%3Bapp_state%20(teacher_app%20.get_ready%20(_room%2C%20_settings%2C%20%5B%5D))%20%7D)%5Cn%5Ct.catch%20(_e%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%3Bconsole%20.error%20(_e)%20%7D)%5Cn%5Ct.then%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%3Bio_state%20(io%20.inert)%20%7D)%20%7D%5Cn%5Cnvar%20start_playing%20%3D%20_%20%3D%3E%20%7B%3B%5Cn%5CtT%20(%5Cn%20%20%7B%20_ensemble%3A%20S%20.sample%20(ensemble_state)%5Cn%20%20%2C%20_room%3A%20T%20(S%20.sample%20(app_state))%20(L%20.get%20(app_as_room))%20%7D%5Cn%20%20)%20(%5Cn%20%20under%20(as_complete)%20((%7B%20_ensemble%2C%20_room%20%7D)%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%3Bgo%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ct%5Ctio_state%20(io%20.messaging)%20%26%26%20api%20(_room%2C%5Cn%5Ct%5Ct%5Ct%5Ctpost%20(message_encoding%20(message%20.teacher_start%20(schedule_start%20(_ensemble)))))%5Cn%5Ct%5Ct%5Ct.then%20(panic_on%20(%5B%5Cn%5Ct%5Ct%5Ct%5Ct%5B%20_x%20%3D%3E%20!%20_x%20.ok%2C%20'cannot%20post%20to%20'%20%2B%20_room%20%5D%20%5D)%20))%5Cn%5Ct%5Ct.catch%20(_e%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3Bconsole%20.error%20(_e)%20%7D)%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3Bio_state%20(io%20.inert)%20%7D)%20%7D))%20%7D%5Cn%5Cnvar%20timesup_problem%20%3D%20_%20%3D%3E%20%7B%3B%5Cn%5Ct%3Bapp_state%20(%5Cn%20%20%20%20teacher_app_playing_to_next%20(S%20.sample%20(app_state)))%20%7D%5Cn%5Cnvar%20end_game%20%3D%20_%20%3D%3E%20%7B%3B%5Cn%20%20var%20now%20%3D%20(new%20Date)%20.getTime%20()%5Cn%20%20%5Cn%20%20var%20_app%20%3D%20S%20.sample%20(app_state)%20%5Cn%20%20var%20_room%20%3D%20T%20(_app)%20(L%20.get%20(app_as_room))%5Cn%5Cn%20%20%3Bgo%5Cn%20%20.then%20(_%20%3D%3E%5Cn%20%20%20%20io_state%20(io%20.messaging)%20%26%26%20api%20(_room%2C%5Cn%20%20%20%20%20%20post%20(message_encoding%20(message%20.teacher_end%20(now))))%5Cn%20%20%20%20.then%20(panic_on%20(%5B%5Cn%20%20%20%20%20%20%5B%20_x%20%3D%3E%20!%20_x%20.ok%2C%20'cannot%20post%20to%20'%20%2B%20_room%20%5D%20%5D)%20))%5Cn%20%20.then%20(_%20%3D%3E%20%7B%3Bapp_state%20(teacher_app_playing_to_game_over%20(_app))%7D)%5Cn%20%20.catch%20(_e%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%3Bconsole%20.error%20(_e)%20%7D)%5Cn%20%20.then%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%3Bio_state%20(io%20.inert)%20%7D)%20%7D%20%5Cn%5Ct%5Ct%5Ct%5Ct%5Cn%5Ct%5Ct%5Ct%5Ct%5Cn%5Ct%5Ct%5Ct%5Ct%5Cn%5Ct%5Ct%5Ct%5Ct%5Cn%5Ct%5Ct%5Ct%5Ct%5Cn%5Ct%5Ct%5Ct%5Ct%5Cn%5Ct%5Ct%5Ct%5Ct%5Cnvar%20game_clock%20%3D%20new%20TimelineMax%5Cnvar%20game_tick_sampler%20%3D%20temporal%20()%5Cn%5Cn%5Ct%20%5Cnvar%20reping_period%20%3D%203%5Cnvar%20heartbeat%20%3D%20S%20.data%20(reping_period)%20%5Cn%5Ct%5Cnvar%20connection%20%3D%20S%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%3Breturn%20T%20(app_state%20())%20(%5Cn%5Ct%5Ctunder%20(app_as_room)%20(_room%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ctif%20(!%20connection%20%5B_room%5D)%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bconnection%20%5B_room%5D%20%3D%20S%20.data%20()%5Cn%5Ct%5Ct%5Ct%5Ct%3Bapi%20.listen_ping%20(_room)%20(connection%20%5B_room%5D)%20%7D%5Cn%5Ct%5Ct%5Ctif%20(connection%20%5B_room%5D%20())%20%7B%5Cn%5Ct%5Ct%5Ct%5Ctreturn%20so%20((_%3D()%3D%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5B%20timestamp%2C%20mean%2C%20Math%20.sqrt%20(variance)%20%5D%2C%5Cn%5Ct%5Ct%5Ct%5Ctwhere%5Cn%5Ct%5Ct%5Ct%5Ct%2C%20%5B%20mean%2C%20variance%2C%20n%2C%20timestamp%20%5D%20%3D%20connection%20%5B_room%5D%20()%20)%3D%3E_)%20%7D%20%7D%20)%20)%20%7D)%20%5Cn%5Cn%5Cn%5CnS%20(_%20%3D%3E%20%7B%3B%5Cn%5Ctif%20(L%20.isDefined%20(app_as_get_ready)%20(app_state%20()))%20%7B%5Cn%5Ct%5Ct%3Bgame_clock%20.pause%20()%20%7D%20%7D)%5CnS%20(last_state%20%3D%3E%20%7B%3B%5Cn%5Ctvar%20last_progress%20%3D%20T%20(last_state)%20(L%20.get%20(app_as_progress))%5Cn%5Ctvar%20progress%20%3D%20T%20(app_state%20())%20(L%20.get%20(app_as_progress))%5Cn%5Ctif%20(L%20.isDefined%20(app_as_playing)%20(app_state%20()))%20%7B%5Cn%5Ct%5Ctif%20(progress%20!%3D%3D%20undefined%20%26%26%20Z%20.not%20(Z%20.equals%20(last_progress)%20(progress)))%20%7B%5Cn%5Ct%5Ct%5Ct%3Bgame_clock%20.seek%20(0)%20%7D%5Cn%5Ct%5Ct%3Bgame_clock%20.play%20()%20%7D%5Cn%5Ctreturn%20app_state%20()%20%7D%5Cn%2C%20app_state%20())%5CnS%20(_%20%3D%3E%20%7B%3B%5Cn%5Ctif%20(L%20.isDefined%20(app_as_game_over)%20(app_state%20()))%20%7B%5Cn%5Ct%5Ct%3Bgame_clock%20.pause%20()%20%7D%20%7D)%5Cn%5Cn%2F%2FTODO%3A%20add%20guard%20to%20warn%20against%20depending%20on%20datas%20other%20than%20feedback%5CnS%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%3Bso%20((%5Cn%20%20take%5Cn%20%20%2C%20cases%20%3D%20%5Cn%20%20%20%20%20%20%5B%20%5B%20data_lens%20(feedback%20.setup_settings)%20.settings_piece%5Cn%20%20%20%20%20%20%20%20%2C%20_piece%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%2F%2FTODO%3A%20tidy%20this%20up%5Cn%20%20%20%20%20%20%20%20%20%20%20%20var%20cleansed_piece%20%3D%20JSON%20.parse%20(JSON%20.stringify%20(_piece))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Bapp_state%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20T%20(S%20.sample%20(app_state)%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20L%20.modify%20(app_as_settings)%20(R%20.mergeDeepLeft%20(cleansed_piece))%20))%20%7D%20%5D%5Cn%20%20%20%20%20%20%2C%20%5B%20data_iso%20(feedback%20.start)%5Cn%20%20%20%20%20%20%20%20%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Bget_room%20(T%20(Math%20.random%20())%20(%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20_x%20%3D%3E%20_x%20*%20100000000%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20_x%20%3D%3E%20Math%20.floor%20(_x)%20%5D))%20.catch%20(_%20%3D%3E%20%7B%7D)%20%7D%20%5D%5Cn%20%20%20%20%20%20%2C%20%5B%20data_iso%20(feedback%20.play)%5Cn%20%20%20%20%20%20%20%20%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Bstart_playing%20()%20%7D%20%5D%5Cn%20%20%20%20%20%20%2C%20%5B%20data_iso%20(feedback%20.end)%5Cn%20%20%20%20%20%20%20%20%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Bend_game%20()%20%7D%20%5D%20%5D%20)%3D%3E%5Cn%20%20so%20((_%3D_%3D%3E%5Cn%20%20T%20(just_now%20(feedback_state)%5Cn%20%20)%20(%5Cn%20%20action)%2C%5Cn%20%20where%5Cn%20%20%2C%20action%20%3D%20%5Cn%20%20%20%20%20%20Z_%20.flip%20(T%20(cases)%20(Z_%20.map%20(_case%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20%20%20_feedback%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20var%20result%20%3D%20L%20.get%20(predicate)%20(_feedback)%5Cn%20%20%20%20%20%20%20%20%20%20if%20(result)%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Baction%20(result)%20%7D%20%7D%2C%5Cn%20%20%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%20%20%2C%20predicate%20%3D%20_case%20%5B0%5D%5Cn%20%20%20%20%20%20%20%20%2C%20action%20%3D%20_case%20%5B1%5D%20)%3D%3E_)%20)))%20)%3D%3E_))%20%7D)%5Cn%5Cn%5Cn%5CnS%20(_%20%3D%3E%20%7B%3B%5Cn%5Ctvar%20_app%20%3D%20S%20.sample%20(app_state)%5Cn%5Ctvar%20_ensemble%20%3D%20ensemble_state%20()%5Cn%5Ct%5Cn%5Ctvar%20_app_students%20%3D%20T%20(_app)%20(L%20.get%20(app_as_students))%5Cn%5Ctvar%20_ensemble_students%20%3D%20T%20(_ensemble)%20(assemble_students%20(_app))%5Cn%5Ctif%20(_ensemble_students%20%26%26%20Z%20.not%20(Z_%20.equals%20(_ensemble_students)%20(_app_students)))%20%7B%5Cn%5Ct%5Ct%3Bapp_state%20(%5Cn%5Ct%5Ct%5CtT%20(_app%5Cn%5Ct%5Ct%5Ct)%20(L%20.set%20(app_as_students)%20(_ensemble_students)))%20%7D%20%7D)%5CnS%20(last_ensemble%20%3D%3E%20%7B%3B%5Cn%5Ctvar%20_app%20%3D%20S%20.sample%20(app_state)%5Cn%5Ctvar%20_ensemble%20%3D%20ensemble_state%20()%5Cn%5Ctif%20(L%20.isDefined%20(app_as_get_ready)%20(_app))%20%7B%5Cn%5Ct%5Ctif%20(!%20L%20.isDefined%20(ensemble_as_start)%20(last_ensemble))%20%7B%5Cn%5Ct%5Ct%5Ctif%20(L%20.isDefined%20(ensemble_as_start)%20(_ensemble))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ctvar%20start%20%3D%20L%20.get%20(ensemble_as_start)%20(_ensemble)%5Cn%5Ct%5Ct%5Ct%5Ctvar%20now%20%3D%20(new%20Date)%20.getTime%20()%5Cn%5Cn%5Ct%5Ct%5Ct%5Ctvar%20playing_app%20%3D%20teacher_app_get_ready_to_playing%20(_app)%5Cn%20%20%20%20%20%20%20%20%5Cn%20%20%20%20%20%20%20%20var%20time_limit%20%3D%20T%20(playing_app)%20(L%20.get%20(%5B%20app_as_settings%2C%20settings_as_time_limit%20%5D))%5Cn%20%20%20%20%20%20%20%20game_clock%20.clear%20()%5Cn%20%20%20%20%20%20%20%20%3Bgame_clock%20.add%20(timesup_problem%2C%20time_limit)%5Cn%20%20%20%20%20%20%20%20%3BT%20(Z%20.range%20(0)%20(time_limit%20%2B%201))%20(R%20.forEach%20(t%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bgame_clock%20.add%20(_%20%3D%3E%20%7B%3Bgame_tick_sampler%20(t)%7D%2C%20t)%20%7D))%5Cn%20%20%20%20%20%20%20%20%5Cn%5Ct%5Ct%5Ct%5Ctif%20(start%20%3E%20now)%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bapp_state%20(playing_app)%20%7D%5Cn%5Ct%5Ct%5Ct%5Ctelse%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3BsetTimeout%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3Bapp_state%20(playing_app)%20%7D%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%2C%20start%20-%20now)%20%7D%20%7D%20%7D%20%7D%5Cn%5Ctreturn%20_ensemble%20%7D%5Cn%2C%20ensemble_state%20())%5Cn%2F%2FTODO%3A%20tidy%20this%20up%5Cnso%20((_%3D_%3D%3E%5CnS%20(last_ensemble%20%3D%3E%20%7B%3B%5Cn%5Ctvar%20_app%20%3D%20S%20.sample%20(app_state)%5Cn%5Ctvar%20_ensemble%20%3D%20ensemble_state%20()%5Cn%20%20var%20_win_rule%20%3D%20T%20(_app)%20(L%20.get%20(%5B%20app_as_settings%2C%20settings_as_win_rule%20%5D))%5Cn%20%20if%20(Z_%20.equals%20(win_rule%20.first_bingo)%20(_win_rule))%20%7B%5Cn%20%20%20%20if%20(L%20.isDefined%20(app_as_playing)%20(_app))%20%7B%5Cn%20%20%20%20%20%20if%20(!%20Z_%20.size%20(ensemble_bingoed_positions%20(last_ensemble)))%20%7B%5Cn%20%20%20%20%20%20%20%20if%20(Z_%20.size%20(ensemble_bingoed_positions%20(_ensemble)))%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bend_game%20()%20%7D%20%7D%20%7D%20%7D%5Cn%5Ctreturn%20_ensemble%20%7D%5Cn%2C%20ensemble_state%20())%2C%5Cnwhere%5Cn%2C%20ensemble_bingoed_positions%20%3D%20by%20(_ensemble%20%3D%3E%5Cn%20%20%20%20%24%20(%5Cn%20%20%20%20%5B%20assemble_students%20(S%20.sample%20(app_state))%5Cn%20%20%20%20%2C%20L%20.collect%20(%5B%20L%20.elems%2C%20pair_as_second%2C%20(%5B_board%2C%20_past%5D)%20%3D%3E%20bingoed_positions%20(_board)%20(_past)%20%5D)%5Cn%20%20%20%20%2C%20Z_%20.join%20%5D))%20)%3D%3E_)%5Cn%5CnS%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%3BT%20(app_state%20()%5Cn%20%20)%20(under%20(app_as_room)%20(_room%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ctvar%20phase%20%3D%20heartbeat%20()%5Cn%5Ct%5Ct%5Ctvar%20critical%20%3D%20phase%20%3D%3D%3D%201%5Cn%5Ct%5Ct%5Ctgo%5Cn%5Ct%5Ct%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ct%5Ct%5Ct!!%20critical%20%2F%2F%26%26%20S%20.sample%20(connection)%20%2F%2F%20why%20need%20%26%26%20sample%5Cn%5Ct%5Ct%5Ct%5Ct%3F%20io_state%20(io%20.messaging)%20%26%26%20api%20(_room%2C%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ctpost%20(message_encoding%20(message%20.teacher_ping%20(S%20.sample%20(connection)))))%5Cn%5Ct%5Ct%5Ct%5Ct%3A%20io_state%20(io%20.heartbeat)%20%26%26%20api%20(_room)%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct.then%20(%24%20(%5B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5CtL%20.get%20(L%20.inverse%20(data_iso%20(ensemble%20.ensemble)))%2C%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct_x%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3Bensemble_state%20(_x)%20%7D%20%5D))%20)%5Cn%20%20%20%20%20%20.catch%20(_x%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20if%20(Z_%20.equals%20(L%20.get%20('error')%20(_x))%20('timeout'))%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bconsole%20.warn%20('Room%20timed%20out')%20%7D%5Cn%20%20%20%20%20%20%20%20else%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bthrow%20_x%20%7D%7D)%5Cn%5Ct%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%5Ct%3BsetTimeout%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bheartbeat%20(!!%20critical%20%3F%20reping_period%20%3A%20phase%20-%201)%20%7D%5Cn%5Ct%5Ct%5Ct%5Ct%2C%20300)%20%7D)%5Cn%5Ct%5Ct%5Ct.catch%20(_e%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bconsole%20.error%20(_e)%5Cn%5Ct%5Ct%5Ct%5Ct%3BsetTimeout%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bheartbeat%20(phase)%20%7D%5Cn%5Ct%5Ct%5Ct%5Ct%2C%20300)%20%7D)%5Cn%5Ct%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bio_state%20(io%20.inert)%20%7D)%20%7D))%20%7D)%5Cn%22%5D%2C%22names%22%3A%5B%5D%2C%22mappings%22%3A%22AAAA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CEAAE%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B2CAIkD%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3ByCAmBC%3B%3B8BAAiC%3B%3B%3B%3B%3B8BAEpE%3B%3B%3B%3B%3B%3B%3B%3B%3B%3ByCAQsC%3B%3B%3B%3B%3ByCACA%3B%3B%3B%3B%3ByCACA%3BIA7BhD%2CqEAAC%3BAACT%3BAACA%3BAACA%3BAACA%3BAACA%3BIAEQ%2CqEAAC%3BAACT%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BIAIQ%2CqEAAC%3BAACT%3BAACA%3BAACA%3BAACA%2CcAAc%3B%3B%3B6BAAY%3B%3B%3BIAA4B%3BIANV%2C8CAAI%3B%3BIAWqE%3BAACrH%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CQAAQ%3B%3B%3BwBAAQ%3B%3BIAAgB%3BAAChC%2CQAAQ%3B%3B%3B%3B%3BuBACuC%3B%3B%3B0BAClB%3B%3B%3BuBACkB%3BIAF%2FB%2C8CAAI%3BIAEJ%2C8CAAI%3B%3BIAA0D%3BAAC9E%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CCAAC%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BIACa%2CqEAAC%3BIAEC%2CqEAAC%3BIAET%2C0FAAC%3BAACT%3BAACA%3BAACA%3BAACA%2CkBAAkB%3B%3B%3BwBAAU%3B%3BIAAe%3BIACvC%2CqEAAC%3BAACL%2CMAAM%3B%3B%3B%3B%3B%3BiBAA6D%3BIAA%2FB%2C8CAAI%3B%3BIAAkD%3BAAC1F%3B%3BIAA2B%3BAAC3B%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CIAAI%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B8CAMe%3B%3B%3B%3B%3B%3B%3BkCAE2D%3B%3B%3B%3B%3BkCACN%3B%3B%3BIAN%2FC%2CqEAAC%3BIAEV%2CuFAAC%3BIAG8B%2C8CAAI%3BIACT%2C8CAAI%3B%3BIAA%2BE%3BAAC7H%3BAACA%2CIAAI%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BkCA6BwE%3B%3B%3B%3B%3BkCACJ%3B%3B%3BIA3B%2FC%2CqEAAC%3BIAElB%2CqEAAC%3BAACT%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CYAAY%3B%3B%3B%3B8BACU%3B%3B%3BIACR%2CqEAAC%3BAACf%2CcAAc%3B%3B%3B%3B%3B%3BIAAQ%2CqEAAC%3BAACvB%2CgBAAgB%3B%3B%3B%3B%3B%3BIAAM%2CqEAAC%3BAACvB%3BAACA%2CqCAAqC%3B%3B%3B%3B%3BIAAuB%3BAAC5D%2CuCAAuC%3B%3B%3B%3B%3BIAAsB%3BAAC7D%2CoBAAoB%2CyCAAa%3BAACjC%3BAACA%3BAACA%3BAACA%3BAACA%3B%3BIAA0B%3B%3BIAAc%3BAACxC%3BAACA%3BAACA%3B%3BIAA8F%3BIAEhD%2C8CAAI%3BIACR%2C8CAAI%3B%3BIAA%2BE%3BAAC7H%3BAACA%2CIAAI%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BkDAKsE%3B%3B%3B%3B%3BkDACM%3BIADnC%2C8CAAI%3BIACC%2C8CAAI%3B%3BIAA6F%3BAACnJ%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CqBAAqB%3B%3B%3B%3B%3B%3B%3B%3BIAA8D%3BAACnF%3BAACA%2CeAAe%3B%3B%3B%3B%3BIACb%2CqEAAC%3BAACH%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3B%3BIAA6D%3BAAC7D%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%22%7D
