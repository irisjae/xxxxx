var { bool, number, timestamp, string,
list, map, maybe, nat, id, v, piece,
shuffle, uuid, map_zip, api, post,
timer, timer_since, time_intervals, 
avatar, student, problem, choice, latency, ping, position,
attempt, point, past, board, win_rule, rules, settings,
teacher_app, student_app,
io, message, ensemble, 
default_problems, default_rules, default_settings,
pair_as_v, pair_as_list, pair_as_first, pair_as_second,
list_as_pair, map_v_as_key, map_v_as_value, as_value_of,
as_maybe, as_defined, as_complete, complete_,
app_as_setup, app_as_get_ready, app_as_playing, app_as_game_over, app_as_progress,
settings_as_problems, settings_as_rules,
settings_as_size, settings_as_time_limit, settings_as_win_rule,
io_as_inert, io_as_connecting, io_as_heartbeat,
ensemble_as_ping, ensemble_as_settings, ensemble_as_progress, 
ensemble_as_pings, ensemble_as_boards, ensemble_as_pasts,
progress_as_step, progress_as_timestamp, 
question_as_text, question_as_image, question_as_solution, 
attempt_as_position, attempt_as_latency, point_as_attempts, point_as_position, past_as_points,
app_as_settings, app_as_student, app_as_students, app_as_room, app_as_problems,
app_as_board, app_as_past, app_as_progress,
app_as_boards, app_as_pasts, 
app_as_last_point, point_as_attempts,
avatar_as_lion, avatar_as_bunny, 
student_as_student, student_as_id, student_as_name, student_as_icon, 
rules_as_size, rules_as_time_limit, settings_as_size, settings_as_time_limit,
problem_as_question, problem_as_answers,
cell_as_position, as_position, cell_as_choice, 
message_encoding, messages_encoding, schedule_start,
teacher_app_get_ready_to_playing, teacher_app_playing_to_next, teacher_app_playing_to_game_over,
student_app_setup_to_get_ready, student_app_get_ready_to_playing, student_app_playing_to_next, student_app_playing_to_game_over,
current_problem, problem_choice_matches,
local_patterns, size_patterns,
as_solved_on, attempted_positions, solved_positions, bingoed_positions, bingoes,
T, $, apply, L, R, S, Z, Z_, Z$, sanc, memoize, 
so, by, and_by, under,
go, never, panic, panic_on,
just_now, temporal,
fiat, data, data_lens, data_iso, data_kind,
focused_iso_,
n_reducer, 
map_defined_, map_defined, from_just, maybe_all, 
as_sole, sole, shuffle
} = window .stuff


var feedback = data ({
  setup_room: (room =~ room) => feedback,
  setting_up_student: (icon =~ avatar) => feedback,
  setup_student: (icon =~ avatar, name =~ string) => feedback,
  attempt_problem: (position =~ position) => feedback,
  reset_game: () => feedback })

var lookbehind = data ({
	nothing: () => lookbehind,
	bad_room: (room =~ room) => lookbehind,
	attempting: (since =~ latency, blocked =~ bool) => lookbehind,
	overall_analysis: () => lookbehind,
	problems_analysis: () => lookbehind })


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






var app_state = S .data (student_app .setup (Z_ .Nothing, Z_ .Nothing, Z_ .Nothing))
 
var io_state = S .data (io .inert)
var ensemble_state = S .data (undefined)

var feedback_state = temporal ()
var lookbehind_state = S .data (lookbehind .nothing)








 
var clicking = ['click', 'touchstart'] .filter (_e => 'on' + _e in window) .slice (0, 1)


var setup_room_view = _ => so ((_=_=>
  (function () {
    var __, __a_title1, __a_title1_img1, __sub_title2, __room3, __room3_label1, __room3_insert2, __room3_input3, __button4, __button4_img1;
    __ = Surplus.createElement("setup-room-etc", null, null);
    __a_title1 = Surplus.createElement("a-title", null, __);
    __a_title1_img1 = Surplus.createElement("img", null, __a_title1);
    __a_title1_img1.src =  logo_img ;
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
    __button4_img1.src =  join_img ;
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  !! L .isDefined (lookbehind_as_bad_room) (lookbehind_state ())
        ? (function () {
    var __, __insert2;
    __ = Surplus.createElement("message", null, null);
    Surplus.createTextNode("不能連接遊戲室", __)
    __insert2 = Surplus.createTextNode('', __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  bad_room ); }, { start: __insert2, end: __insert2 });
    return __;
})()
        : [] ); }, { start: __room3_insert2, end: __room3_insert2 });
    Surplus.S.effect(function (__state) { return ( setup_room_feedback )(__, __state); });
    return __;
})(),
  where
  , logo_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flogo.png?1546759647786' 
  , join_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fjoin.png?1543381404734'
  , bad_room = T (lookbehind_state ()) (L .get (lookbehind_as_room))
  , setup_room_feedback = _dom => so ((_=_=>
      (_input .addEventListener ('keypress', _e => {;
        if (_e .keyCode === 13) {
          ;let_room_enter () } }),
      clicking .forEach (click => {;
        ;_button .addEventListener (click, _e => {;
          ;let_room_enter () }) })),
      where
      , _input = _dom .querySelector ('input')
      , _button = _dom .querySelector ('button')
      , let_room_enter = _ => {;
          var value = _input .value
          ;_input .value = ''
          ;feedback_state (feedback .setup_room (value)) } )=>_))=>_)

var setup_student_view = _ => so ((_=_=>
  (function () {
    var __, __a_title1, __a_title1_img1, __sub_title2, __name3, __name3_label1, __name3_input2, __icon4, __icon4_avatar1, __icon4_avatar1_selected_input1, __icon4_avatar1_img2, __icon4_avatar2, __icon4_avatar2_selected_input1, __icon4_avatar2_img2, __insert5;
    __ = Surplus.createElement("setup-student-etc", null, null);
    __a_title1 = Surplus.createElement("a-title", null, __);
    __a_title1_img1 = Surplus.createElement("img", null, __a_title1);
    __a_title1_img1.src =  logo_img ;
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
    __icon4_avatar1_img2.src =  lion_avatar_img ;
    Surplus.createTextNode(" ", __icon4_avatar1)
    __icon4_avatar2 = Surplus.createElement("avatar", null, __icon4);
    __icon4_avatar2_selected_input1 = Surplus.createElement("selected-input", null, __icon4_avatar2);
    __icon4_avatar2_img2 = Surplus.createElement("img", null, __icon4_avatar2);
    __icon4_avatar2_img2.src =  bunny_avatar_img ;
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
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  !! L .isDefined (feedback_as_setting_up_student) (_feedback)
      ? (function () {
    var __, __img1;
    __ = Surplus.createElement("button", null, null);
    Surplus.setAttribute(__, "x-custom", true);
    Surplus.setAttribute(__, "x-for", "connect");
    __img1 = Surplus.createElement("img", null, __);
    __img1.src =  connect_img ;
    return __;
})()
      : [] ); }, { start: __insert5, end: __insert5 });
    Surplus.S.effect(function (__state) { return ( setup_student_feedback )(__, __state); });
    return __;
})(),
  where
  , _feedback = just_now (feedback_state) 
  , _icon = T (_feedback) (L .get ([ feedback_as_icon ]))
  , logo_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flogo.png?1546759647786' 
  , lion_avatar_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flion-avatar.png?1546341028460'
  , bunny_avatar_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fbunny-avatar.png?1546341028205'
  , connect_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fconnect.png?1543381404627' 
  , setup_student_feedback = _dom => so ((_=_=>
      (_name_input .addEventListener ('keypress', _e => {;
        if (_e .keyCode === 13) {
          ;let_name_enter () } }),
      clicking .forEach (click => {;
        ;_lion_option .addEventListener (click, _e => {;
          ;let_icon (avatar .lion) })
        ;_bunny_option .addEventListener (click, _e => {;
          ;let_icon (avatar .bunny) })
        if (_button) { 
          ;_button .addEventListener (click, _e => {;
            ;let_name_enter () }) } })),
      where
      , _name_input = _dom .querySelector ('input')
      , _lion_option = _dom .querySelector ('avatar[x-for=lion]')
      , _bunny_option = _dom .querySelector ('avatar[x-for=bunny]')
      , _button = _dom .querySelector ('button')
      , let_icon = _avatar => {;
          ;feedback_state (feedback .setting_up_student (_avatar)) }
      , let_name_enter = _ => {;
          if (L .isDefined (feedback_as_setting_up_student) (_feedback)) {
            var _icon = T (_feedback) (L .get (feedback_as_icon))
            var _name = _name_input .value
            ;_name_input .value = ''
            ;feedback_state (feedback .setup_student (_icon, _name)) } } )=>_))=>_)

var setup_view = (function () {
    var __, __insert1;
    __ = Surplus.createElement("setup-etc", null, null);
    __insert1 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  so ((
    define
    , room = T (app_state ()) (L .get ([ app_as_room, as_maybe ]))
    , student = T (app_state ()) (L .get ([ app_as_student, as_maybe ])) ) =>
    !! Z_ .isNothing (room) ?
       !! (L .isDefined (io_as_inert
       ) (io_state ()))
      ? setup_room_view
      : !! (L .isDefined (L .choice (io_as_connecting, io_as_heartbeat)
       ) (io_state ()))
       ? '正在連接遊戲室…'
       : panic ('invalid io at get ready view')
    :!! Z_ .isNothing (student) ?
       !! (L .isDefined (io_as_inert
       ) (io_state ()))
      ? setup_student_view
      : !! (L .isDefined (L .choice (io_as_connecting, io_as_heartbeat)
       ) (io_state ()))
       ? '正在加入遊戲室…'
       : panic ('invalid io at get ready view')
    // blank for now    
    : [] ) ); }, { start: __insert1, end: __insert1 });
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
  , room = T (app_state ()) (L .get (app_as_room)) )=>_)

var playing_view = _ => so ((_=_=>
  (function () {
    var __, __div1, __div1_ticker_etc1, __div1_ticker_etc1_insert1, __div1_ticker_etc1_ticker2, __div1_ticker_etc1_ticker2_spinner1, __div1_question2, __div2, __div2_board1, __div2_board1_insert2, __div2_board1_bingo3, __div2_board1_bingo3_insert2;
    __ = Surplus.createElement("playing-etc", null, null);
    __div1 = Surplus.createElement("div", "left-pane", __);
    __div1_ticker_etc1 = Surplus.createElement("ticker-etc", null, __div1);
    __div1_ticker_etc1_insert1 = Surplus.createTextNode('', __div1_ticker_etc1)
    __div1_ticker_etc1_ticker2 = Surplus.createElement("ticker", null, __div1_ticker_etc1);
    Surplus.setAttribute(__div1_ticker_etc1_ticker2, "z-identity",  _progress );
    Surplus.assign(__div1_ticker_etc1_ticker2.style, { animationDuration: _time_limit + 's' });
    __div1_ticker_etc1_ticker2_spinner1 = Surplus.createElement("spinner", null, __div1_ticker_etc1_ticker2);
    Surplus.createTextNode(" ", __div1_ticker_etc1)
    __div1_question2 = Surplus.createElement("question", null, __div1);
    Surplus.createTextNode(" ", __div1)
    __div2 = Surplus.createElement("div", "right-pane", __);
    __div2_board1 = Surplus.createElement("board", null, __div2);
    Surplus.createTextNode(" ", __div2_board1)
    __div2_board1_insert2 = Surplus.createTextNode('', __div2_board1)
    __div2_board1_bingo3 = Surplus.createElement("bingo", null, __div2_board1);
    Surplus.createTextNode(" ", __div2_board1_bingo3)
    __div2_board1_bingo3_insert2 = Surplus.createTextNode('', __div2_board1_bingo3)
    Surplus.createTextNode(" ", __div2_board1_bingo3)
    Surplus.createTextNode(" ", __div2_board1)
    Surplus.createTextNode(" ", __div2)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (game_tick) (map_defined_ ([]) (t => time_limit - t)) ); }, { start: __div1_ticker_etc1_insert1, end: __div1_ticker_etc1_insert1 });
    Surplus.S.effect(function (__current) { return Surplus.content(__div1_question2,  !! L .isDefined (question_as_text) (_current_question) ? _question_text
          :!! L .isDefined (question_as_image) (_current_question) ? (function () {
    var __;
    __ = Surplus.createElement("img", null, null);
    __.src =  _question_image ;
    return __;
})()
          : panic ('bad question') , __current); }, '');
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (_board) (Z_ .map (_row => 
        (function () {
    var __, __insert2;
    __ = Surplus.createElement("row", null, null);
    Surplus.createTextNode(" ", __)
    __insert2 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (_row) (Z_ .map (_cell =>
          so ((_=_=>
          !! (_cell_solved) ? (function () {
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
    Surplus.S.effect(function (__state) { return ( cell_feedback (_cell) )(__, __state); });
    return __;
})(),
          where
          , _cell_position = T (_cell) (L .get (cell_as_position))
          , _cell_choice = T (_cell) (L .get (cell_as_choice))
          , _cell_solved = Z_ .elem (_cell_position) (_solved_positions) )=>_))) ); }, { start: __insert2, end: __insert2 });
    return __;
})() )) ); }, { start: __div2_board1_insert2, end: __div2_board1_insert2 });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  T (_bingoes) ([ L .collect (L .chain (Z_ .K (L .elems)) ([ L .elems, (_pattern, nth) => so ((
           define
           , [ first_y, first_x ] = L .get (L .first) (_pattern)
           , [ last_y, last_x ] = L .get (L .last) (_pattern)
           , shape =
               !! Z_ .equals (first_x) (last_x) ? 'vertical'
               :!! Z_ .equals (first_y) (last_y) ? 'horizontal'
               :!! Z_ .gt (first_x) (last_x) ? 'diagonal-down'
               :!! Z_ .lt (first_x) (last_x) ? 'diagonal-up'
               : panic ('bad pattern') )=>
           T (Z_ .range (1) (5 + 1)) (Z_ .map (_i => so ((_=_=>
             (function () {
    var __;
    __ = Surplus.createElement("letter", null, null);
    Surplus.setAttribute(__, "x-nth",  nth );
    Surplus.setAttribute(__, "x-as",  letter );
    Surplus.assign(__.style, { left: left, top: top });
    return __;
})(),
             where
             , left = !! Z_ .equals (shape) ('vertical') ? ((first_x - 1) / _size + (1 / _size - 1 / 5) / 2) * 100 + '%'
                      : ((_i - 1) * 1 / 5) * 100 + '%'
             , top = !! Z_ .equals (shape) ('horizontal') ? ((first_y - 1) / _size + (1 / _size - 1 / 5) / 2) * 100 + '%'
                     :!! Z_ .equals (shape) ('diagonal-up') ? ((5 - _i) * 1 / 5) * 100 + '%'
                     : ((_i - 1) * 1 / 5) * 100 + '%'
             , letter = !! Z_ .equals (_i) (1) ? 'b'
                        :!! Z_ .equals (_i) (2) ? 'i'
                        :!! Z_ .equals (_i) (3) ? 'n'
                        :!! Z_ .equals (_i) (4) ? 'g'
                        :!! Z_ .equals (_i) (5) ? 'o'
                        : panic ('bad letter') )=>_) )) ) ])), Z_ .reverse ]) ); }, { start: __div2_board1_bingo3_insert2, end: __div2_board1_bingo3_insert2 });
    return __;
})(),
    where
    , _app = app_state ()
    , _board = T (_app) (L .get (app_as_board))
    , _past = T (_app) (L .get (app_as_past))
    , _progress = T (_app) (L .get (app_as_progress))
    , _time_limit = T (_app) (L .get ([ app_as_settings, settings_as_time_limit ]))
    , _size = T (_app) (L .get ([ app_as_settings, settings_as_size ]))
    , _current_question = T (_app) ([ current_problem, L .get (problem_as_question) ])
    , _question_text = T (_current_question) (L .get (question_as_text))
    , _question_image = T (_current_question) (L .get (question_as_image))
    , _solved_positions = solved_positions (_board) (_past)
    , _bingoes = bingoes (_board) (_past)
    , time_limit = T (_app) (L .get ([ app_as_settings, settings_as_time_limit ]))
    , game_tick = tick_state ()
    , cell_feedback = cell => _dom => {;
        ;clicking .forEach (click => {;
          ;_dom .addEventListener (click, _ => {;
            ;feedback_state (feedback .attempt_problem (T (cell) (L .get (cell_as_position)))) }) }) } )=>_) 

/*var game_over_view = _ => so ((_=_=> 
	<game-over-etc>
    <message>Game Over!</message>
		<result-etc>
			<tabs>
				<button> Overview </button>
				<button> problem </button>
				</tabs>
			<table a-result>
				<tr>
					<th>problem</th>
					<th>Attempts</th>
					<th>Avg. Time</th>
					</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					</tr>
					</table>
					</result-etc>
					</game-over-etc>,
	where							
	, _app = app_state ()
	, _ensemble = ensemble_state ()
	//, all_students = T (_ensemble) (assemble_students (_app))
	, questions = T (_app) (L .collect ([ app_as_problems, L .elems, problem_as_question ]))
	, attempts = T (_app) ([ L .collect ([ app_as_past, L .elems, point_as_attempts ]), Z_ .map (Z_ .size) ])
	//TODO: make readable
	, average_time = T (_ensemble) ([
			assemble_students (_app),
			Z_ .map ($ ([
				Z .snd,
				L .collect ([ [1], L .elems, point_as_attempts, L .last, [1], as_maybe ]),
				Z .map (Z .of (Array)) ])),
			_x => Z .reduce (Z .zipWith (Z .concat)) (R .head (_x)) (R .tail (_x)),
			Z .map ($ ([ Z .justs, L .mean (L .elems), Z_ .fromMaybe (_ => panic ('average time fail!')) ])) ]) )=>_)*/

var game_over_view = _ => so ((_=_=>
  (function () {
    var __, __a_title1, __a_title1_img1, __student2, __student2_label1, __options3, __options3_button1, __options3_button1_img1, __options3_button2, __options3_button2_img1, __insert4, __options5, __options5_button1, __options5_button1_img1;
    __ = Surplus.createElement("game-over-etc", null, null);
    __a_title1 = Surplus.createElement("a-title", null, __);
    __a_title1_img1 = Surplus.createElement("img", null, __a_title1);
    __a_title1_img1.src =  logo_img ;
    __student2 = Surplus.createElement("student", null, __);
    __student2_label1 = Surplus.createElement("label", null, __student2);
    Surplus.content(__student2_label1,  _name , "");
    __options3 = Surplus.createElement("options", null, __);
    Surplus.setAttribute(__options3, "x-for", "tabs");
    __options3_button1 = Surplus.createElement("button", null, __options3);
    Surplus.setAttribute(__options3_button1, "x-custom", true);
    Surplus.setAttribute(__options3_button1, "x-for", "overall-analysis");
    __options3_button1_img1 = Surplus.createElement("img", null, __options3_button1);
    __options3_button2 = Surplus.createElement("button", null, __options3);
    Surplus.setAttribute(__options3_button2, "x-custom", true);
    Surplus.setAttribute(__options3_button2, "x-for", "problems-analysis");
    __options3_button2_img1 = Surplus.createElement("img", null, __options3_button2);
    Surplus.createTextNode(" ", __options3)
    __insert4 = Surplus.createTextNode('', __)
    __options5 = Surplus.createElement("options", null, __);
    Surplus.setAttribute(__options5, "x-for", "options");
    __options5_button1 = Surplus.createElement("button", null, __options5);
    Surplus.setAttribute(__options5_button1, "x-custom", true);
    Surplus.setAttribute(__options5_button1, "x-for", "play-again");
    __options5_button1_img1 = Surplus.createElement("img", null, __options5_button1);
    __options5_button1_img1.src =  play_again_img ;
    Surplus.createTextNode(" ", __options5)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function () { __options3_button1_img1.src =  !! (L .isDefined (lookbehind_as_overall_analysis)) (_lookbehind) ? overall_analysis_on_img : overall_analysis_off_img ; });
    Surplus.S.effect(function (__state) { return ( overall_analysis )(__options3_button1, __state); });
    Surplus.S.effect(function () { __options3_button2_img1.src =  !! (L .isDefined (lookbehind_as_problems_analysis)) (_lookbehind) ? problems_analysis_on_img : problems_analysis_off_img ; });
    Surplus.S.effect(function (__state) { return ( problems_analysis )(__options3_button2, __state); });
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  !! L .isDefined (lookbehind_as_overall_analysis) (_lookbehind)
      ? 
      (function () {
    var __, __div1, __div1_span1, __div1_span3, __div2, __div2_span1, __div2_span3, __div3, __div3_span1, __div3_span3, __div3_span3_insert1;
    __ = Surplus.createElement("analysis", null, null);
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
    __div3_span3_insert1 = Surplus.createTextNode('', __div3_span3)
    Surplus.createTextNode("秒", __div3_span3)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  mean_solved_point_latency ); }, { start: __div3_span3_insert1, end: __div3_span3_insert1 });
    return __;
})()
      : [] ); }, { start: __insert4, end: __insert4 });
    Surplus.S.effect(function (__state) { return ( play_again )(__options5_button1, __state); });
    return __;
})(),
  where
  , _lookbehind = lookbehind_state () 
  , _app = app_state ()
  , _student = T (_app) (L .get (app_as_student))
  , _name = T (_student) (L .get (student_as_name))
  , _board = T (_app) (L .get (app_as_board)) 
  , attempted_points_amount = T (_app) (L .count ([ app_as_past, past_as_points, L .elems, point_as_attempts, L .last ]))
  , solved_points_amount = T (_app) (L .count ([ app_as_past, past_as_points, L .elems, as_solved_on (_board), point_as_attempts, L .last ]))
  , mean_solved_point_latency = T (_app) (L .mean ([ app_as_past, past_as_points, L .elems, as_solved_on (_board), point_as_attempts, L .last, attempt_as_latency ])) .toFixed (2) * 1 || '0'
  , logo_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Flogo.png?1546759647786' 
  , overall_analysis_on_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foverall-analysis-on.png?1547306859997'                             
  , overall_analysis_off_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Foverall-anlysis-off.png?1547306860589'                             
  , problems_analysis_on_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fproblems-analysis-on.png?1546759645249'                             
  , problems_analysis_off_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fproblems-analysis-off.png?1546759645326'                             
  , play_again_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fplay-again.png?1546759645987'                             
  , overall_analysis = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;lookbehind_state (lookbehind .overall_analysis) })})}                              
  , problems_analysis = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;lookbehind_state (lookbehind .problems_analysis) })})}                              
  , play_again = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;feedback_state (feedback .reset_game) })})} )=>_) 


window .view = (function () {
    var __, __insert1;
    __ = Surplus.createElement("student-app", null, null);
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
		: panic ('undefined app state in view') ); }, { start: __insert1, end: __insert1 });
    return __;
})()













			 
			 
			 
			 
			 
var setup_room = _room => {;
	;go 
	.then (_ =>
		io_state (io .connecting) && api (_room)
		.then (panic_on ([ [Z_ .equals ({}), 'empty room; expired code?'] ]))
		.then ($ ([
			L .get (L .inverse (data_iso (ensemble .ensemble))),
			_ensemble => {;
				var _settings = T (_ensemble) (L .get (ensemble_as_settings))
				;app_state (
					T (S .sample (app_state)
          ) (
          [ L .set (app_as_room) (_room)
          , L .set (app_as_settings) (_settings) ])) } ])) )
		.catch (_e => {;
			;lookbehind_state (lookbehind .bad_room (_room))
			;console .error (_e) })
		.then (_ => {;
			;io_state (io .inert) }) }

var setup_student = _icon => _name => {;
  ;app_state (
    T (S .sample (app_state)
    ) (
    L .set (app_as_student) (student .student (uuid (), _name, _icon)) )) } 

var connect_room = _ => {;
	;T (S .sample (app_state)
  ) (
	under (
    complete_ ({
      _student: app_as_student,
      _room: app_as_room })
  ) (({ _student, _room }) => {;
		var latest_settings
		;return go 
		.then (_ =>
			io_state (io .connecting) && api (_room)
      .then (panic_on ([ [Z_ .equals ({}), 'empty room; expired code?'] ]))
			.then ($ ([
				 L .get (L .inverse (data_iso (ensemble .ensemble))),
				 _ensemble => {;
           ;latest_settings = T (_ensemble) (L .get (ensemble_as_settings)) } ])) )
		.then (_ =>
			api (_room, post (message_encoding (
				message .student_ping (_student, [0, 0, 0]) )))
			.then (panic_on ([ [_x => ! _x .ok, 'not ok'] ])) )
		.then (_ => {; 
      ;app_state (
        T (S .sample (app_state)
        ) (
        L .set (app_as_settings) (latest_settings) ))  })
		.catch (_e => {;
			;lookbehind_state (lookbehind .bad_room (_room))
			;console .error (_e) })
		.then (_ => {;
			;io_state (io .inert) }) })) }

var attempt_problem = _position => {;
	T (S .sample (app_state)) (
    under (complete_ (
      { _problem: current_problem
      , _board: app_as_board
      , _point: app_as_last_point } )
    ) (({ _problem, _board, _point }) => {;
      var board_choice = _board => _position =>
			  T (_board) (L .get ([ as_position (_position), cell_as_choice ]))
        
      var _completed = under (point_as_position) ($ ([ board_choice (_board), problem_choice_matches (_problem) ])) (_point) || false 
      if (Z_ .not (_completed)) {
        var _choice = board_choice (_board) (_position)
        if (! L .get (lookbehind_as_blocked) (S .sample (lookbehind_state))) {
          var latency = S .sample (tick_state) //lookbehind_latency ()
          ;app_state (
            T (S .sample (app_state)
            ) (
            $ (L .set
            ) ([app_as_last_point, point_as_attempts, L .appendTo]
            ) ([_position, latency]) ))
          if (problem_choice_matches (_problem) (_choice)) {
            var bingo_audio = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudent-bingo.mp3?1546277231054'
            var correct_audio = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudent-correct.mp3?1546277231570'
            var _solved_positions = Z_ .append (_position) (solved_positions (_board) (L .get (app_as_past) (S .sample (app_state))))
            var _size = T (S .sample (app_state)) (L .get ([ app_as_settings, settings_as_size ]))
            var _local_patterns = T (local_patterns (size_patterns (_size))
              ) (
              L .collect ([ as_value_of (_position), L .elems, L .when (R .all (T (_solved_positions) (Z_ .flip (Z_ .elem)))) ]))
            ;(new Audio (correct_audio)) .play ()
            if (L .isDefined (L .elems) (_local_patterns)) {
              ;(new Audio (bingo_audio)) .play () } }
          else {
            var incorrect_audio = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudent-incorrect.mp3?1546277231539'
            ;(new Audio (incorrect_audio)) .play ()
            ;lookbehind_state (lookbehind .attempting (latency, true)) } } } })) }

var reset_game = _ => {
  ;app_state (
    student_app .setup (Z .Nothing, Z .Nothing, Z .Nothing)) }









var [ time_state, flowing_state ] = timer ()
//var time_interval = time_intervals (time_state)
var tick_fn = _ => Math .floor ((S .sample (time_state) - T (S .sample (app_state)) (L .get ([ app_as_progress, progress_as_timestamp ]))) / 1000)
var tick_state = S .value ()
;S (_ => {;
  var _app = app_state ()
  if (flowing_state () && L .isDefined (app_as_progress) (_app)) {
    var _progress_timestamp = T (_app) (L .get ([ app_as_progress, progress_as_timestamp ]))
    var _tick = Math .floor ((time_state () - _progress_timestamp) / 1000)
    if (_tick >= 0) {
      ;tick_state (_tick) } } })
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

var connection = S (_ => {;
	;return T (app_state ()
    ) (under (app_as_room
    ) (_room => {;
			if (! connection [_room]) {
				;connection [_room] = S .data ()
				;api .listen_ping (_room) (connection [_room]) }
			return connection [_room] () && so ((_=_=>
			[ timestamp, mean, Math .sqrt (variance) ],
			where
			, [ mean, variance, n, timestamp ] = connection [_room] () )=>_) })) })




S (_ => {;
  ;so ((
  take
  , cases = 
      [ [ feedback_as_setup_room
        , ({ room: _room }) => {;
            ;setup_room (_room) } ]
      , [ feedback_as_setup_student
        , ({ icon: _icon, name: _name }) => {;
            ;go
            .then (_ => setup_student (_icon) (_name))
            .then (_ => connect_room ()) } ]
      , [ feedback_as_attempt_problem
        , ({ position: _position }) => {;
            ;attempt_problem (_position) } ]
      , [ feedback_as_reset_game
        , _ => {
            ;reset_game () } ] ] )=>
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
	if (L .isDefined (lookbehind_as_bad_room) (lookbehind_state ())) {
		;var forget = setTimeout (_ => {;
			;lookbehind_state (lookbehind .nothing) }
		, 1500)
		;S .cleanup (_ => {;
			;clearTimeout (forget) }) } })

S (last_app => {;
	if (! L .isDefined (app_as_room) (last_app)) {
		if (L .isDefined (app_as_room) (app_state ())) {
			;lookbehind_state (lookbehind .nothing) } }
	return app_state () }
, app_state ())

S (last_app => {;
	var last_progress = T (last_app) (L .get (app_as_progress))
	var progress = T (app_state ()) (L .get (app_as_progress))
	if (L .isDefined (app_as_playing) (app_state ())) {
		if (last_progress !== undefined && progress !== undefined && Z_ .not (Z_ .equals (last_progress) (progress))) {
			;lookbehind_state (lookbehind .attempting (0, false)) } }
	return app_state () }
, app_state ())

S (_ => {;
	if (L .get (lookbehind_as_blocked) (lookbehind_state ())) {
		;var forget = setTimeout (_ => {;
			var _since = T (lookbehind_state ()) (L .get (lookbehind_as_since))
			;lookbehind_state (lookbehind .attempting (_since, false)) }
		, 3000)
		;S .cleanup (_ => {;
			;clearTimeout (forget) }) } })


;S (last_app => {;
	var _app = app_state ()
  if (! L .isDefined (app_as_game_over) (last_app)) {
    if (L .isDefined (app_as_game_over) (_app)) {
      ;lookbehind_state (lookbehind .overall_analysis) } }
	return _app })



;S (_ => {;
	if (L .isDefined (app_as_get_ready) (app_state ())) {
		;flowing_state (false) }
	else if (L .isDefined (app_as_playing) (app_state ())) {
		;flowing_state (true) }
	else if (L .isDefined (app_as_game_over) (app_state ())) {
		;flowing_state (false) } })


;S (_ => {
  var _app = app_state ()
  if (L .isDefined (app_as_setup) (_app)) {
    T (_app
    ) (
    under (complete_ ({ app_as_student, app_as_room, app_as_settings })) (_ => {;
      ;app_state (
        T (S .sample (app_state)
        ) (
        student_app_setup_to_get_ready) ) })) } })

;S (last_tick => {;
  var _app = app_state () 
  var time_limit = T (_app) (L .get ([ app_as_settings, settings_as_time_limit ]))
  
  if (L .isDefined (app_as_playing) (_app)) {
    //HACK
    var tick = (tick_state (), tick_fn ())
    if (tick == time_limit - 3) {
      var countdown_audio = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fquestion-countdown.mp3?1546277335320'
      ;(new Audio (countdown_audio)) .play () }
    if (tick >= time_limit) {
      ;app_state (
        student_app_playing_to_next (S .sample (app_state))) } } })



;S (_ => {;
  var _app = S .sample (app_state)
	var _ensemble = ensemble_state ()
  
  var _app_progress = T (_app) (L .get (app_as_progress))
  var _progress = T (_ensemble) (L .get (ensemble_as_progress))
  
  if (Z_ .not (Z_ .equals (_app_progress) (_progress))) {
    if (L .isDefined (app_as_get_ready) (_app)) {
      ;app_state (
        T (_app
        ) (
        [ student_app_get_ready_to_playing
        , L .set (app_as_progress) (_progress) ])) }
    else if (L .isDefined (app_as_playing) (_app)) {
      var _progress_step = L .get (progress_as_step) (_progress)
      if (_progress_step !== -1) {
        if (_progress_step > L .get (progress_as_step) (_app_progress)) {
          ;app_state (
            T (_app
            ) (
            L .set (app_as_progress) (_progress) )) } }
      else {
        ;app_state (
          T (_app
          ) (
          student_app_playing_to_game_over)) } } } })




;S (_ => {;
  if (L .isDefined (app_as_setup) (app_state ())) {
    ;lookbehind_state (lookbehind .nothing)
    ;ensemble_state (undefined) } })

;S (_ => {;
	;T (app_state ()
  ) (
  under (
    complete_ ({
      _student: app_as_student,
      _room: app_as_room })
	) (({ _student, _room }) => {;
		var phase = heartbeat ()
		var critical = phase === 1
		go
		.then (_ =>
			!! critical && S .sample (connection)
			? so ((_=_=>
        io_state (io .messaging) && api (_room, 
          post (messages_encoding (
            !! not_playing
						? [ message .student_ping (_student, S .sample (connection)) ]
						: [ message .student_ping (_student, S .sample (connection))
							, message .student_join (_student, _board)
							, message .student_update (_student, _past) ]))),
        where
        , { _board, _past, not_playing } =
            T (app_state ()
            ) (
            L .get (
            [ complete_ (
              { _board: app_as_board
              , _past: app_as_past })
            , L .valueOr (
              { not_playing: 'not playing' }) ])) )=>_)
			: io_state (io .heartbeat) && api (_room)
				.then ($ ([
					L .get (L .inverse (data_iso (ensemble .ensemble))),
					_x => {
            var current_room = T (S .sample (app_state)) (L .get (app_as_room))
            if (Z_ .equals (_room) (current_room)) {
              ;ensemble_state (_x)} } ])) )
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

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22file%22%3A%22out.js%22%2C%22sources%22%3A%5B%22in.js%22%5D%2C%22sourcesContent%22%3A%5B%22var%20%7B%20bool%2C%20number%2C%20timestamp%2C%20string%2C%5Cnlist%2C%20map%2C%20maybe%2C%20nat%2C%20id%2C%20v%2C%20piece%2C%5Cnshuffle%2C%20uuid%2C%20map_zip%2C%20api%2C%20post%2C%5Cntimer%2C%20timer_since%2C%20time_intervals%2C%20%5Cnavatar%2C%20student%2C%20problem%2C%20choice%2C%20latency%2C%20ping%2C%20position%2C%5Cnattempt%2C%20point%2C%20past%2C%20board%2C%20win_rule%2C%20rules%2C%20settings%2C%5Cnteacher_app%2C%20student_app%2C%5Cnio%2C%20message%2C%20ensemble%2C%20%5Cndefault_problems%2C%20default_rules%2C%20default_settings%2C%5Cnpair_as_v%2C%20pair_as_list%2C%20pair_as_first%2C%20pair_as_second%2C%5Cnlist_as_pair%2C%20map_v_as_key%2C%20map_v_as_value%2C%20as_value_of%2C%5Cnas_maybe%2C%20as_defined%2C%20as_complete%2C%20complete_%2C%5Cnapp_as_setup%2C%20app_as_get_ready%2C%20app_as_playing%2C%20app_as_game_over%2C%20app_as_progress%2C%5Cnsettings_as_problems%2C%20settings_as_rules%2C%5Cnsettings_as_size%2C%20settings_as_time_limit%2C%20settings_as_win_rule%2C%5Cnio_as_inert%2C%20io_as_connecting%2C%20io_as_heartbeat%2C%5Cnensemble_as_ping%2C%20ensemble_as_settings%2C%20ensemble_as_progress%2C%20%5Cnensemble_as_pings%2C%20ensemble_as_boards%2C%20ensemble_as_pasts%2C%5Cnprogress_as_step%2C%20progress_as_timestamp%2C%20%5Cnquestion_as_text%2C%20question_as_image%2C%20question_as_solution%2C%20%5Cnattempt_as_position%2C%20attempt_as_latency%2C%20point_as_attempts%2C%20point_as_position%2C%20past_as_points%2C%5Cnapp_as_settings%2C%20app_as_student%2C%20app_as_students%2C%20app_as_room%2C%20app_as_problems%2C%5Cnapp_as_board%2C%20app_as_past%2C%20app_as_progress%2C%5Cnapp_as_boards%2C%20app_as_pasts%2C%20%5Cnapp_as_last_point%2C%20point_as_attempts%2C%5Cnavatar_as_lion%2C%20avatar_as_bunny%2C%20%5Cnstudent_as_student%2C%20student_as_id%2C%20student_as_name%2C%20student_as_icon%2C%20%5Cnrules_as_size%2C%20rules_as_time_limit%2C%20settings_as_size%2C%20settings_as_time_limit%2C%5Cnproblem_as_question%2C%20problem_as_answers%2C%5Cncell_as_position%2C%20as_position%2C%20cell_as_choice%2C%20%5Cnmessage_encoding%2C%20messages_encoding%2C%20schedule_start%2C%5Cnteacher_app_get_ready_to_playing%2C%20teacher_app_playing_to_next%2C%20teacher_app_playing_to_game_over%2C%5Cnstudent_app_setup_to_get_ready%2C%20student_app_get_ready_to_playing%2C%20student_app_playing_to_next%2C%20student_app_playing_to_game_over%2C%5Cncurrent_problem%2C%20problem_choice_matches%2C%5Cnlocal_patterns%2C%20size_patterns%2C%5Cnas_solved_on%2C%20attempted_positions%2C%20solved_positions%2C%20bingoed_positions%2C%20bingoes%2C%5CnT%2C%20%24%2C%20apply%2C%20L%2C%20R%2C%20S%2C%20Z%2C%20Z_%2C%20Z%24%2C%20sanc%2C%20memoize%2C%20%5Cnso%2C%20by%2C%20and_by%2C%20under%2C%5Cngo%2C%20never%2C%20panic%2C%20panic_on%2C%5Cnjust_now%2C%20temporal%2C%5Cnfiat%2C%20data%2C%20data_lens%2C%20data_iso%2C%20data_kind%2C%5Cnfocused_iso_%2C%5Cnn_reducer%2C%20%5Cnmap_defined_%2C%20map_defined%2C%20from_just%2C%20maybe_all%2C%20%5Cnas_sole%2C%20sole%2C%20shuffle%5Cn%7D%20%3D%20window%20.stuff%5Cn%5Cn%5Cnvar%20feedback%20%3D%20data%20(%7B%5Cn%20%20setup_room%3A%20(room%20%3D~%20room)%20%3D%3E%20feedback%2C%5Cn%20%20setting_up_student%3A%20(icon%20%3D~%20avatar)%20%3D%3E%20feedback%2C%5Cn%20%20setup_student%3A%20(icon%20%3D~%20avatar%2C%20name%20%3D~%20string)%20%3D%3E%20feedback%2C%5Cn%20%20attempt_problem%3A%20(position%20%3D~%20position)%20%3D%3E%20feedback%2C%5Cn%20%20reset_game%3A%20()%20%3D%3E%20feedback%20%7D)%5Cn%5Cnvar%20lookbehind%20%3D%20data%20(%7B%5Cn%5Ctnothing%3A%20()%20%3D%3E%20lookbehind%2C%5Cn%5Ctbad_room%3A%20(room%20%3D~%20room)%20%3D%3E%20lookbehind%2C%5Cn%5Ctattempting%3A%20(since%20%3D~%20latency%2C%20blocked%20%3D~%20bool)%20%3D%3E%20lookbehind%2C%5Cn%5Ctoverall_analysis%3A%20()%20%3D%3E%20lookbehind%2C%5Cn%5Ctproblems_analysis%3A%20()%20%3D%3E%20lookbehind%20%7D)%5Cn%5Cn%5Cnvar%20feedback_as_setup_room%20%3D%20data_iso%20(feedback%20.setup_room)%5Cnvar%20feedback_as_setting_up_student%20%3D%20data_iso%20(feedback%20.setting_up_student)%5Cnvar%20feedback_as_setup_student%20%3D%20data_iso%20(feedback%20.setup_student)%5Cnvar%20feedback_as_attempt_problem%20%3D%20data_iso%20(feedback%20.attempt_problem)%5Cnvar%20feedback_as_reset_game%20%3D%20data_iso%20(feedback%20.reset_game)%5Cn%5Cnvar%20feedback_as_icon%20%3D%20data_iso%20(feedback%20.setting_up_student)%20.icon%5Cn%5Cnvar%20lookbehind_as_nothing%20%3D%20data_iso%20(lookbehind%20.nothing)%5Cnvar%20lookbehind_as_bad_room%20%3D%20data_iso%20(lookbehind%20.bad_room)%5Cnvar%20lookbehind_as_attempting%20%3D%20data_iso%20(lookbehind%20.attempting)%5Cnvar%20lookbehind_as_overall_analysis%20%3D%20data_iso%20(lookbehind%20.overall_analysis)%5Cnvar%20lookbehind_as_problems_analysis%20%3D%20data_iso%20(lookbehind%20.problems_analysis)%5Cn%5Cnvar%20lookbehind_as_room%20%3D%20data_lens%20(lookbehind%20.bad_room)%20.room%5Cnvar%20lookbehind_as_since%20%3D%20data_lens%20(lookbehind%20.attempting)%20.since%5Cnvar%20lookbehind_as_blocked%20%3D%20data_lens%20(lookbehind%20.attempting)%20.blocked%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cnvar%20app_state%20%3D%20S%20.data%20(student_app%20.setup%20(Z_%20.Nothing%2C%20Z_%20.Nothing%2C%20Z_%20.Nothing))%5Cn%20%5Cnvar%20io_state%20%3D%20S%20.data%20(io%20.inert)%5Cnvar%20ensemble_state%20%3D%20S%20.data%20(undefined)%5Cn%5Cnvar%20feedback_state%20%3D%20temporal%20()%5Cnvar%20lookbehind_state%20%3D%20S%20.data%20(lookbehind%20.nothing)%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%20%5Cnvar%20clicking%20%3D%20%5B'click'%2C%20'touchstart'%5D%20.filter%20(_e%20%3D%3E%20'on'%20%2B%20_e%20in%20window)%20.slice%20(0%2C%201)%5Cn%5Cn%5Cnvar%20setup_room_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%3Csetup-room-etc%20fn%3D%7B%20setup_room_feedback%20%7D%3E%5Cn%20%20%20%20%3Ca-title%3E%3Cimg%20src%3D%7B%20logo_img%20%7D%2F%3E%3C%2Fa-title%3E%5Cn%20%20%20%20%3Csub-title%3E%E9%99%A4%E6%B3%95%EF%BC%88%E4%B8%80%EF%BC%89%3C%2Fsub-title%3E%5Cn%20%20%20%20%3Croom%20style%3D%7B%7B%20margin%3A%20'30px%200'%20%7D%7D%3E%5Cn%20%20%20%20%20%20%3Clabel%3E%E9%81%8A%E6%88%B2%E5%AE%A4%E7%B7%A8%E8%99%9F%EF%BC%9A%3C%2Flabel%3E%5Cn%20%20%20%20%20%20%7B%20!!%20L%20.isDefined%20(lookbehind_as_bad_room)%20(lookbehind_state%20())%5Cn%20%20%20%20%20%20%20%20%3F%20%3Cmessage%3E%E4%B8%8D%E8%83%BD%E9%80%A3%E6%8E%A5%E9%81%8A%E6%88%B2%E5%AE%A4%7B%20bad_room%20%7D%3C%2Fmessage%3E%5Cn%20%20%20%20%20%20%20%20%3A%20%5B%5D%20%7D%5Cn%20%20%20%20%20%20%3Cinput%20style%3D%7B%7B%20margin%3A%20%7B%20top%3A%20'10px'%20%7D%20%7D%7D%20%2F%3E%20%3C%2Froom%3E%5Cn%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22join%5C%22%3E%3Cimg%20src%3D%7B%20join_img%20%7D%20%2F%3E%3C%2Fbutton%3E%20%3C%2Fsetup-room-etc%3E%2C%5Cn%20%20where%5Cn%20%20%2C%20logo_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Flogo.png%3F1546759647786'%20%5Cn%20%20%2C%20join_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fjoin.png%3F1543381404734'%5Cn%20%20%2C%20bad_room%20%3D%20T%20(lookbehind_state%20())%20(L%20.get%20(lookbehind_as_room))%5Cn%20%20%2C%20setup_room_feedback%20%3D%20_dom%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20(_input%20.addEventListener%20('keypress'%2C%20_e%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20if%20(_e%20.keyCode%20%3D%3D%3D%2013)%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blet_room_enter%20()%20%7D%20%7D)%2C%5Cn%20%20%20%20%20%20clicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_button%20.addEventListener%20(click%2C%20_e%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blet_room_enter%20()%20%7D)%20%7D))%2C%5Cn%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%2C%20_input%20%3D%20_dom%20.querySelector%20('input')%5Cn%20%20%20%20%20%20%2C%20_button%20%3D%20_dom%20.querySelector%20('button')%5Cn%20%20%20%20%20%20%2C%20let_room_enter%20%3D%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20var%20value%20%3D%20_input%20.value%5Cn%20%20%20%20%20%20%20%20%20%20%3B_input%20.value%20%3D%20''%5Cn%20%20%20%20%20%20%20%20%20%20%3Bfeedback_state%20(feedback%20.setup_room%20(value))%20%7D%20)%3D%3E_))%3D%3E_)%5Cn%5Cnvar%20setup_student_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%3Csetup-student-etc%20fn%3D%7B%20setup_student_feedback%20%7D%3E%5Cn%20%20%20%20%3Ca-title%3E%3Cimg%20src%3D%7B%20logo_img%20%7D%2F%3E%3C%2Fa-title%3E%5Cn%20%20%20%20%3Csub-title%3E%E9%99%A4%E6%B3%95%EF%BC%88%E4%B8%80%EF%BC%89%3C%2Fsub-title%3E%5Cn%20%20%20%20%3Cname%20style%3D%7B%7B%20marginTop%3A%20'30px'%20%7D%7D%3E%5Cn%20%20%20%20%20%20%3Clabel%3E%E5%90%8D%E7%A8%B1%3C%2Flabel%3E%5Cn%20%20%20%20%20%20%3Cinput%20%2F%3E%20%3C%2Fname%3E%5Cn%20%20%20%20%3Cicon%20style%3D%7B%7B%20marginBottom%3A%20'30px'%20%7D%7D%3E%5Cn%20%20%20%20%20%20%3Cavatar%20x-for%3D%5C%22lion%5C%22%20x-selected%3D%7B%20T%20(_icon)%20(L%20.isDefined%20(avatar_as_lion))%20%7D%3E%5Cn%20%20%20%20%20%20%20%20%3Cselected-input%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%3Cimg%20src%3D%7B%20lion_avatar_img%20%7D%20%2F%3E%20%3C%2Favatar%3E%5Cn%20%20%20%20%20%20%3Cavatar%20x-for%3D%5C%22bunny%5C%22%20x-selected%3D%7B%20T%20(_icon)%20(L%20.isDefined%20(avatar_as_bunny))%20%7D%3E%5Cn%20%20%20%20%20%20%20%20%3Cselected-input%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%3Cimg%20src%3D%7B%20bunny_avatar_img%20%7D%20%2F%3E%20%3C%2Favatar%3E%20%3C%2Ficon%3E%20%5Cn%20%20%20%20%7B%20!!%20L%20.isDefined%20(feedback_as_setting_up_student)%20(_feedback)%5Cn%20%20%20%20%20%20%3F%20%3Cbutton%20x-custom%20x-for%3D%5C%22connect%5C%22%3E%3Cimg%20src%3D%7B%20connect_img%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%3A%20%5B%5D%20%7D%20%3C%2Fsetup-student-etc%3E%2C%5Cn%20%20where%5Cn%20%20%2C%20_feedback%20%3D%20just_now%20(feedback_state)%20%5Cn%20%20%2C%20_icon%20%3D%20T%20(_feedback)%20(L%20.get%20(%5B%20feedback_as_icon%20%5D))%5Cn%20%20%2C%20logo_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Flogo.png%3F1546759647786'%20%5Cn%20%20%2C%20lion_avatar_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Flion-avatar.png%3F1546341028460'%5Cn%20%20%2C%20bunny_avatar_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fbunny-avatar.png%3F1546341028205'%5Cn%20%20%2C%20connect_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fconnect.png%3F1543381404627'%20%5Cn%20%20%2C%20setup_student_feedback%20%3D%20_dom%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20(_name_input%20.addEventListener%20('keypress'%2C%20_e%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20if%20(_e%20.keyCode%20%3D%3D%3D%2013)%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blet_name_enter%20()%20%7D%20%7D)%2C%5Cn%20%20%20%20%20%20clicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_lion_option%20.addEventListener%20(click%2C%20_e%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blet_icon%20(avatar%20.lion)%20%7D)%5Cn%20%20%20%20%20%20%20%20%3B_bunny_option%20.addEventListener%20(click%2C%20_e%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blet_icon%20(avatar%20.bunny)%20%7D)%5Cn%20%20%20%20%20%20%20%20if%20(_button)%20%7B%20%5Cn%20%20%20%20%20%20%20%20%20%20%3B_button%20.addEventListener%20(click%2C%20_e%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Blet_name_enter%20()%20%7D)%20%7D%20%7D))%2C%5Cn%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%2C%20_name_input%20%3D%20_dom%20.querySelector%20('input')%5Cn%20%20%20%20%20%20%2C%20_lion_option%20%3D%20_dom%20.querySelector%20('avatar%5Bx-for%3Dlion%5D')%5Cn%20%20%20%20%20%20%2C%20_bunny_option%20%3D%20_dom%20.querySelector%20('avatar%5Bx-for%3Dbunny%5D')%5Cn%20%20%20%20%20%20%2C%20_button%20%3D%20_dom%20.querySelector%20('button')%5Cn%20%20%20%20%20%20%2C%20let_icon%20%3D%20_avatar%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bfeedback_state%20(feedback%20.setting_up_student%20(_avatar))%20%7D%5Cn%20%20%20%20%20%20%2C%20let_name_enter%20%3D%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20if%20(L%20.isDefined%20(feedback_as_setting_up_student)%20(_feedback))%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20var%20_icon%20%3D%20T%20(_feedback)%20(L%20.get%20(feedback_as_icon))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20var%20_name%20%3D%20_name_input%20.value%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3B_name_input%20.value%20%3D%20''%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Bfeedback_state%20(feedback%20.setup_student%20(_icon%2C%20_name))%20%7D%20%7D%20)%3D%3E_))%3D%3E_)%5Cn%5Cnvar%20setup_view%20%3D%20%3Csetup-etc%3E%5Cn%20%20%7B%20so%20((%5Cn%20%20%20%20define%5Cn%20%20%20%20%2C%20room%20%3D%20T%20(app_state%20())%20(L%20.get%20(%5B%20app_as_room%2C%20as_maybe%20%5D))%5Cn%20%20%20%20%2C%20student%20%3D%20T%20(app_state%20())%20(L%20.get%20(%5B%20app_as_student%2C%20as_maybe%20%5D))%20)%20%3D%3E%5Cn%20%20%20%20!!%20Z_%20.isNothing%20(room)%20%3F%5Cn%20%20%20%20%20%20%20!!%20(L%20.isDefined%20(io_as_inert%5Cn%20%20%20%20%20%20%20)%20(io_state%20()))%5Cn%20%20%20%20%20%20%3F%20setup_room_view%5Cn%20%20%20%20%20%20%3A%20!!%20(L%20.isDefined%20(L%20.choice%20(io_as_connecting%2C%20io_as_heartbeat)%5Cn%20%20%20%20%20%20%20)%20(io_state%20()))%5Cn%20%20%20%20%20%20%20%3F%20'%E6%AD%A3%E5%9C%A8%E9%80%A3%E6%8E%A5%E9%81%8A%E6%88%B2%E5%AE%A4%E2%80%A6'%5Cn%20%20%20%20%20%20%20%3A%20panic%20('invalid%20io%20at%20get%20ready%20view')%5Cn%20%20%20%20%3A!!%20Z_%20.isNothing%20(student)%20%3F%5Cn%20%20%20%20%20%20%20!!%20(L%20.isDefined%20(io_as_inert%5Cn%20%20%20%20%20%20%20)%20(io_state%20()))%5Cn%20%20%20%20%20%20%3F%20setup_student_view%5Cn%20%20%20%20%20%20%3A%20!!%20(L%20.isDefined%20(L%20.choice%20(io_as_connecting%2C%20io_as_heartbeat)%5Cn%20%20%20%20%20%20%20)%20(io_state%20()))%5Cn%20%20%20%20%20%20%20%3F%20'%E6%AD%A3%E5%9C%A8%E5%8A%A0%E5%85%A5%E9%81%8A%E6%88%B2%E5%AE%A4%E2%80%A6'%5Cn%20%20%20%20%20%20%20%3A%20panic%20('invalid%20io%20at%20get%20ready%20view')%5Cn%20%20%20%20%2F%2F%20blank%20for%20now%20%20%20%20%5Cn%20%20%20%20%3A%20%5B%5D%20)%20%7D%20%3C%2Fsetup-etc%3E%5Cn%5Cnvar%20get_ready_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%3Cget-ready-etc%3E%5Cn%20%20%20%20%3Cdiv%3E%3Croom%3E%E5%B7%B2%E5%8A%A0%E5%85%A5%E9%81%8A%E6%88%B2%E5%AE%A4%7Broom%7D%3C%2Froom%3E%3C%2Fdiv%3E%5Cn%20%20%20%20%3Cdiv%3E%E7%AD%89%E5%80%99%E9%81%8A%E6%88%B2%E9%96%8B%E5%A7%8B%E2%80%A6%3C%2Fdiv%3E%20%3C%2Fget-ready-etc%3E%2C%5Cn%20%20where%5Cn%20%20%2C%20room%20%3D%20T%20(app_state%20())%20(L%20.get%20(app_as_room))%20)%3D%3E_)%5Cn%5Cnvar%20playing_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%3Cplaying-etc%3E%5Cn%20%20%20%20%3Cdiv%20class%3D%5C%22left-pane%5C%22%3E%5Cn%20%20%20%20%20%20%3Cticker-etc%3E%5Cn%20%20%20%20%20%20%20%20%7B%20T%20(game_tick)%20(map_defined_%20(%5B%5D)%20(t%20%3D%3E%20time_limit%20-%20t))%20%7D%5Cn%20%20%20%20%20%20%20%20%3Cticker%20z-identity%3D%7B%20_progress%20%7D%20style%3D%7B%7B%20animationDuration%3A%20_time_limit%20%2B%20's'%20%7D%7D%3E%3Cspinner%2F%3E%3C%2Fticker%3E%20%3C%2Fticker-etc%3E%5Cn%20%20%20%20%20%20%3Cquestion%3E%5Cn%20%20%20%20%20%20%20%20%7B%20!!%20L%20.isDefined%20(question_as_text)%20(_current_question)%20%3F%20_question_text%5Cn%20%20%20%20%20%20%20%20%20%20%3A!!%20L%20.isDefined%20(question_as_image)%20(_current_question)%20%3F%20%3Cimg%20src%3D%7B%20_question_image%20%7D%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3A%20panic%20('bad%20question')%20%7D%3C%2Fquestion%3E%20%3C%2Fdiv%3E%5Cn%20%20%20%20%3Cdiv%20class%3D%5C%22right-pane%5C%22%3E%5Cn%20%20%20%20%20%20%3Cboard%3E%20%7B%20T%20(_board)%20(Z_%20.map%20(_row%20%3D%3E%20%5Cn%20%20%20%20%20%20%20%20%3Crow%3E%20%7B%20T%20(_row)%20(Z_%20.map%20(_cell%20%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20!!%20(_cell_solved)%20%3F%20%3Ccell%20x-solved%3E%7B%20_cell_choice%20%7D%3C%2Fcell%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3A%20%3Ccell%20fn%3D%7B%20cell_feedback%20(_cell)%20%7D%3E%7B%20_cell_choice%20%7D%3C%2Fcell%3E%2C%5Cn%20%20%20%20%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20_cell_position%20%3D%20T%20(_cell)%20(L%20.get%20(cell_as_position))%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20_cell_choice%20%3D%20T%20(_cell)%20(L%20.get%20(cell_as_choice))%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20_cell_solved%20%3D%20Z_%20.elem%20(_cell_position)%20(_solved_positions)%20)%3D%3E_)))%20%7D%20%3C%2Frow%3E%20))%20%7D%5Cn%20%20%20%20%20%20%20%20%3Cbingo%3E%20%7B%20T%20(_bingoes)%20(%5B%20L%20.collect%20(L%20.chain%20(Z_%20.K%20(L%20.elems))%20(%5B%20L%20.elems%2C%20(_pattern%2C%20nth)%20%3D%3E%20so%20((%5Cn%20%20%20%20%20%20%20%20%20%20%20define%5Cn%20%20%20%20%20%20%20%20%20%20%20%2C%20%5B%20first_y%2C%20first_x%20%5D%20%3D%20L%20.get%20(L%20.first)%20(_pattern)%5Cn%20%20%20%20%20%20%20%20%20%20%20%2C%20%5B%20last_y%2C%20last_x%20%5D%20%3D%20L%20.get%20(L%20.last)%20(_pattern)%5Cn%20%20%20%20%20%20%20%20%20%20%20%2C%20shape%20%3D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20!!%20Z_%20.equals%20(first_x)%20(last_x)%20%3F%20'vertical'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A!!%20Z_%20.equals%20(first_y)%20(last_y)%20%3F%20'horizontal'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A!!%20Z_%20.gt%20(first_x)%20(last_x)%20%3F%20'diagonal-down'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A!!%20Z_%20.lt%20(first_x)%20(last_x)%20%3F%20'diagonal-up'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20panic%20('bad%20pattern')%20)%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20T%20(Z_%20.range%20(1)%20(5%20%2B%201))%20(Z_%20.map%20(_i%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cletter%20x-nth%3D%7B%20nth%20%7D%20x-as%3D%7B%20letter%20%7D%20style%3D%7B%7B%20left%3A%20left%2C%20top%3A%20top%20%7D%7D%20%2F%3E%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20left%20%3D%20!!%20Z_%20.equals%20(shape)%20('vertical')%20%3F%20((first_x%20-%201)%20%2F%20_size%20%2B%20(1%20%2F%20_size%20-%201%20%2F%205)%20%2F%202)%20*%20100%20%2B%20'%25'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20((_i%20-%201)%20*%201%20%2F%205)%20*%20100%20%2B%20'%25'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20top%20%3D%20!!%20Z_%20.equals%20(shape)%20('horizontal')%20%3F%20((first_y%20-%201)%20%2F%20_size%20%2B%20(1%20%2F%20_size%20-%201%20%2F%205)%20%2F%202)%20*%20100%20%2B%20'%25'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A!!%20Z_%20.equals%20(shape)%20('diagonal-up')%20%3F%20((5%20-%20_i)%20*%201%20%2F%205)%20*%20100%20%2B%20'%25'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20((_i%20-%201)%20*%201%20%2F%205)%20*%20100%20%2B%20'%25'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20letter%20%3D%20!!%20Z_%20.equals%20(_i)%20(1)%20%3F%20'b'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A!!%20Z_%20.equals%20(_i)%20(2)%20%3F%20'i'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A!!%20Z_%20.equals%20(_i)%20(3)%20%3F%20'n'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A!!%20Z_%20.equals%20(_i)%20(4)%20%3F%20'g'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A!!%20Z_%20.equals%20(_i)%20(5)%20%3F%20'o'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20panic%20('bad%20letter')%20)%3D%3E_)%20))%20)%20%5D))%2C%20Z_%20.reverse%20%5D)%20%7D%20%3C%2Fbingo%3E%20%3C%2Fboard%3E%20%3C%2Fdiv%3E%20%3C%2Fplaying-etc%3E%2C%5Cn%20%20%20%20where%5Cn%20%20%20%20%2C%20_app%20%3D%20app_state%20()%5Cn%20%20%20%20%2C%20_board%20%3D%20T%20(_app)%20(L%20.get%20(app_as_board))%5Cn%20%20%20%20%2C%20_past%20%3D%20T%20(_app)%20(L%20.get%20(app_as_past))%5Cn%20%20%20%20%2C%20_progress%20%3D%20T%20(_app)%20(L%20.get%20(app_as_progress))%5Cn%20%20%20%20%2C%20_time_limit%20%3D%20T%20(_app)%20(L%20.get%20(%5B%20app_as_settings%2C%20settings_as_time_limit%20%5D))%5Cn%20%20%20%20%2C%20_size%20%3D%20T%20(_app)%20(L%20.get%20(%5B%20app_as_settings%2C%20settings_as_size%20%5D))%5Cn%20%20%20%20%2C%20_current_question%20%3D%20T%20(_app)%20(%5B%20current_problem%2C%20L%20.get%20(problem_as_question)%20%5D)%5Cn%20%20%20%20%2C%20_question_text%20%3D%20T%20(_current_question)%20(L%20.get%20(question_as_text))%5Cn%20%20%20%20%2C%20_question_image%20%3D%20T%20(_current_question)%20(L%20.get%20(question_as_image))%5Cn%20%20%20%20%2C%20_solved_positions%20%3D%20solved_positions%20(_board)%20(_past)%5Cn%20%20%20%20%2C%20_bingoes%20%3D%20bingoes%20(_board)%20(_past)%5Cn%20%20%20%20%2C%20time_limit%20%3D%20T%20(_app)%20(L%20.get%20(%5B%20app_as_settings%2C%20settings_as_time_limit%20%5D))%5Cn%20%20%20%20%2C%20game_tick%20%3D%20tick_state%20()%5Cn%20%20%20%20%2C%20cell_feedback%20%3D%20cell%20%3D%3E%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Bfeedback_state%20(feedback%20.attempt_problem%20(T%20(cell)%20(L%20.get%20(cell_as_position))))%20%7D)%20%7D)%20%7D%20)%3D%3E_)%20%5Cn%5Cn%2F*var%20game_over_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%20%5Cn%5Ct%3Cgame-over-etc%3E%5Cn%20%20%20%20%3Cmessage%3EGame%20Over!%3C%2Fmessage%3E%5Cn%5Ct%5Ct%3Cresult-etc%3E%5Cn%5Ct%5Ct%5Ct%3Ctabs%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cbutton%3E%20Overview%20%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cbutton%3E%20problem%20%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3C%2Ftabs%3E%5Cn%5Ct%5Ct%5Ct%3Ctable%20a-result%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Ctr%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cth%3Eproblem%3C%2Fth%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cth%3EAttempts%3C%2Fth%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cth%3EAvg.%20Time%3C%2Fth%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3C%2Ftr%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Ctr%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Ctd%3E%3C%2Ftd%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Ctd%3E%3C%2Ftd%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Ctd%3E%3C%2Ftd%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3C%2Ftr%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3C%2Ftable%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3C%2Fresult-etc%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3C%2Fgame-over-etc%3E%2C%5Cn%5Ctwhere%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Cn%5Ct%2C%20_app%20%3D%20app_state%20()%5Cn%5Ct%2C%20_ensemble%20%3D%20ensemble_state%20()%5Cn%5Ct%2F%2F%2C%20all_students%20%3D%20T%20(_ensemble)%20(assemble_students%20(_app))%5Cn%5Ct%2C%20questions%20%3D%20T%20(_app)%20(L%20.collect%20(%5B%20app_as_problems%2C%20L%20.elems%2C%20problem_as_question%20%5D))%5Cn%5Ct%2C%20attempts%20%3D%20T%20(_app)%20(%5B%20L%20.collect%20(%5B%20app_as_past%2C%20L%20.elems%2C%20point_as_attempts%20%5D)%2C%20Z_%20.map%20(Z_%20.size)%20%5D)%5Cn%5Ct%2F%2FTODO%3A%20make%20readable%5Cn%5Ct%2C%20average_time%20%3D%20T%20(_ensemble)%20(%5B%5Cn%5Ct%5Ct%5Ctassemble_students%20(_app)%2C%5Cn%5Ct%5Ct%5CtZ_%20.map%20(%24%20(%5B%5Cn%5Ct%5Ct%5Ct%5CtZ%20.snd%2C%5Cn%5Ct%5Ct%5Ct%5CtL%20.collect%20(%5B%20%5B1%5D%2C%20L%20.elems%2C%20point_as_attempts%2C%20L%20.last%2C%20%5B1%5D%2C%20as_maybe%20%5D)%2C%5Cn%5Ct%5Ct%5Ct%5CtZ%20.map%20(Z%20.of%20(Array))%20%5D))%2C%5Cn%5Ct%5Ct%5Ct_x%20%3D%3E%20Z%20.reduce%20(Z%20.zipWith%20(Z%20.concat))%20(R%20.head%20(_x))%20(R%20.tail%20(_x))%2C%5Cn%5Ct%5Ct%5CtZ%20.map%20(%24%20(%5B%20Z%20.justs%2C%20L%20.mean%20(L%20.elems)%2C%20Z_%20.fromMaybe%20(_%20%3D%3E%20panic%20('average%20time%20fail!'))%20%5D))%20%5D)%20)%3D%3E_)*%2F%5Cn%5Cnvar%20game_over_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%3Cgame-over-etc%3E%5Cn%20%20%20%20%3Ca-title%3E%3Cimg%20src%3D%7B%20logo_img%20%7D%2F%3E%3C%2Fa-title%3E%5Cn%20%20%20%20%3Cstudent%3E%3Clabel%3E%7B%20_name%20%7D%3C%2Flabel%3E%3C%2Fstudent%3E%20%5Cn%20%20%20%20%3Coptions%20x-for%3D%5C%22tabs%5C%22%3E%5Cn%20%20%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22overall-analysis%5C%22%20fn%3D%7B%20overall_analysis%20%7D%20%3E%3Cimg%20src%3D%7B%20!!%20(L%20.isDefined%20(lookbehind_as_overall_analysis))%20(_lookbehind)%20%3F%20overall_analysis_on_img%20%3A%20overall_analysis_off_img%20%7D%20%2F%3E%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22problems-analysis%5C%22%20fn%3D%7B%20problems_analysis%20%7D%20%3E%3Cimg%20src%3D%7B%20!!%20(L%20.isDefined%20(lookbehind_as_problems_analysis))%20(_lookbehind)%20%3F%20problems_analysis_on_img%20%3A%20problems_analysis_off_img%20%7D%20%2F%3E%3C%2Fbutton%3E%20%3C%2Foptions%3E%5Cn%20%20%20%20%7B%20!!%20L%20.isDefined%20(lookbehind_as_overall_analysis)%20(_lookbehind)%5Cn%20%20%20%20%20%20%3F%20%5Cn%20%20%20%20%20%20%3Canalysis%3E%5Cn%20%20%20%20%20%20%20%20%3Cdiv%3E%3Cspan%3E%E5%B7%B2%E7%AD%94%E9%A1%8C%E6%95%B8%EF%BC%9A%3C%2Fspan%3E%20%3Cspan%3E%7B%20attempted_points_amount%20%7D%3C%2Fspan%3E%3C%2Fdiv%3E%5Cn%20%20%20%20%20%20%20%20%3Cdiv%3E%3Cspan%3E%E7%AD%94%E5%B0%8D%E9%A1%8C%E6%95%B8%EF%BC%9A%3C%2Fspan%3E%20%3Cspan%3E%7B%20solved_points_amount%20%7D%3C%2Fspan%3E%3C%2Fdiv%3E%5Cn%20%20%20%20%20%20%20%20%3Cdiv%3E%3Cspan%3E%E5%B9%B3%E5%9D%87%E7%AD%94%E5%B0%8D%E6%99%82%E9%96%93%EF%BC%9A%3C%2Fspan%3E%20%3Cspan%3E%7B%20mean_solved_point_latency%20%7D%E7%A7%92%3C%2Fspan%3E%3C%2Fdiv%3E%20%3C%2Fanalysis%3E%5Cn%20%20%20%20%20%20%3A%20%5B%5D%20%7D%5Cn%20%20%20%20%3Coptions%20x-for%3D%5C%22options%5C%22%3E%5Cn%20%20%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22play-again%5C%22%20fn%3D%7B%20play_again%20%7D%20%3E%3Cimg%20src%3D%7B%20play_again_img%20%7D%20%2F%3E%3C%2Fbutton%3E%20%3C%2Foptions%3E%20%3C%2Fgame-over-etc%3E%2C%5Cn%20%20where%5Cn%20%20%2C%20_lookbehind%20%3D%20lookbehind_state%20()%20%5Cn%20%20%2C%20_app%20%3D%20app_state%20()%5Cn%20%20%2C%20_student%20%3D%20T%20(_app)%20(L%20.get%20(app_as_student))%5Cn%20%20%2C%20_name%20%3D%20T%20(_student)%20(L%20.get%20(student_as_name))%5Cn%20%20%2C%20_board%20%3D%20T%20(_app)%20(L%20.get%20(app_as_board))%20%5Cn%20%20%2C%20attempted_points_amount%20%3D%20T%20(_app)%20(L%20.count%20(%5B%20app_as_past%2C%20past_as_points%2C%20L%20.elems%2C%20point_as_attempts%2C%20L%20.last%20%5D))%5Cn%20%20%2C%20solved_points_amount%20%3D%20T%20(_app)%20(L%20.count%20(%5B%20app_as_past%2C%20past_as_points%2C%20L%20.elems%2C%20as_solved_on%20(_board)%2C%20point_as_attempts%2C%20L%20.last%20%5D))%5Cn%20%20%2C%20mean_solved_point_latency%20%3D%20T%20(_app)%20(L%20.mean%20(%5B%20app_as_past%2C%20past_as_points%2C%20L%20.elems%2C%20as_solved_on%20(_board)%2C%20point_as_attempts%2C%20L%20.last%2C%20attempt_as_latency%20%5D))%20.toFixed%20(2)%20*%201%20%7C%7C%20'0'%5Cn%20%20%2C%20logo_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Flogo.png%3F1546759647786'%20%5Cn%20%20%2C%20overall_analysis_on_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Foverall-analysis-on.png%3F1547306859997'%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%2C%20overall_analysis_off_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Foverall-anlysis-off.png%3F1547306860589'%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%2C%20problems_analysis_on_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fproblems-analysis-on.png%3F1546759645249'%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%2C%20problems_analysis_off_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fproblems-analysis-off.png%3F1546759645326'%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%2C%20play_again_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fplay-again.png%3F1546759645987'%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%2C%20overall_analysis%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blookbehind_state%20(lookbehind%20.overall_analysis)%20%7D)%7D)%7D%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%2C%20problems_analysis%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blookbehind_state%20(lookbehind%20.problems_analysis)%20%7D)%7D)%7D%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Cn%20%20%2C%20play_again%20%3D%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bfeedback_state%20(feedback%20.reset_game)%20%7D)%7D)%7D%20)%3D%3E_)%20%5Cn%5Cn%5Cnwindow%20.view%20%3D%20%3Cstudent-app%3E%5Cn%5Ct%7B%20!!%20(L%20.isDefined%20(app_as_setup)%20(app_state%20()))%5Cn%5Ct%5Ct%3F%20setup_view%5Cn%20%20%20%20%3A!!%20(L%20.isDefined%20(app_as_get_ready)%20(app_state%20()))%5Cn%5Ct%5Ct%3F%20get_ready_view%20%20%20%5Cn%5Ct%5Ct%3A!!%20(L%20.isDefined%20(app_as_playing)%20(app_state%20()))%5Cn%5Ct%5Ct%3F%20playing_view%5Cn%5Ct%5Ct%3A!!%20(L%20.isDefined%20(app_as_game_over)%20(app_state%20()))%5Cn%5Ct%5Ct%3F%20game_over_view%5Cn%5Ct%5Ct%3A%20panic%20('undefined%20app%20state%20in%20view')%20%7D%20%3C%2Fstudent-app%3E%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%20%5Cnvar%20setup_room%20%3D%20_room%20%3D%3E%20%7B%3B%5Cn%5Ct%3Bgo%20%5Cn%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ctio_state%20(io%20.connecting)%20%26%26%20api%20(_room)%5Cn%5Ct%5Ct.then%20(panic_on%20(%5B%20%5BZ_%20.equals%20(%7B%7D)%2C%20'empty%20room%3B%20expired%20code%3F'%5D%20%5D))%5Cn%5Ct%5Ct.then%20(%24%20(%5B%5Cn%5Ct%5Ct%5CtL%20.get%20(L%20.inverse%20(data_iso%20(ensemble%20.ensemble)))%2C%5Cn%5Ct%5Ct%5Ct_ensemble%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%5Ctvar%20_settings%20%3D%20T%20(_ensemble)%20(L%20.get%20(ensemble_as_settings))%5Cn%5Ct%5Ct%5Ct%5Ct%3Bapp_state%20(%5Cn%5Ct%5Ct%5Ct%5Ct%5CtT%20(S%20.sample%20(app_state)%5Cn%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%5B%20L%20.set%20(app_as_room)%20(_room)%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20L%20.set%20(app_as_settings)%20(_settings)%20%5D))%20%7D%20%5D))%20)%5Cn%5Ct%5Ct.catch%20(_e%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3Blookbehind_state%20(lookbehind%20.bad_room%20(_room))%5Cn%5Ct%5Ct%5Ct%3Bconsole%20.error%20(_e)%20%7D)%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3Bio_state%20(io%20.inert)%20%7D)%20%7D%5Cn%5Cnvar%20setup_student%20%3D%20_icon%20%3D%3E%20_name%20%3D%3E%20%7B%3B%5Cn%20%20%3Bapp_state%20(%5Cn%20%20%20%20T%20(S%20.sample%20(app_state)%5Cn%20%20%20%20)%20(%5Cn%20%20%20%20L%20.set%20(app_as_student)%20(student%20.student%20(uuid%20()%2C%20_name%2C%20_icon))%20))%20%7D%20%5Cn%5Cnvar%20connect_room%20%3D%20_%20%3D%3E%20%7B%3B%5Cn%5Ct%3BT%20(S%20.sample%20(app_state)%5Cn%20%20)%20(%5Cn%5Ctunder%20(%5Cn%20%20%20%20complete_%20(%7B%5Cn%20%20%20%20%20%20_student%3A%20app_as_student%2C%5Cn%20%20%20%20%20%20_room%3A%20app_as_room%20%7D)%5Cn%20%20)%20((%7B%20_student%2C%20_room%20%7D)%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ctvar%20latest_settings%5Cn%5Ct%5Ct%3Breturn%20go%20%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ct%5Ctio_state%20(io%20.connecting)%20%26%26%20api%20(_room)%5Cn%20%20%20%20%20%20.then%20(panic_on%20(%5B%20%5BZ_%20.equals%20(%7B%7D)%2C%20'empty%20room%3B%20expired%20code%3F'%5D%20%5D))%5Cn%5Ct%5Ct%5Ct.then%20(%24%20(%5B%5Cn%5Ct%5Ct%5Ct%5Ct%20L%20.get%20(L%20.inverse%20(data_iso%20(ensemble%20.ensemble)))%2C%5Cn%5Ct%5Ct%5Ct%5Ct%20_ensemble%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%3Blatest_settings%20%3D%20T%20(_ensemble)%20(L%20.get%20(ensemble_as_settings))%20%7D%20%5D))%20)%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ct%5Ctapi%20(_room%2C%20post%20(message_encoding%20(%5Cn%5Ct%5Ct%5Ct%5Ctmessage%20.student_ping%20(_student%2C%20%5B0%2C%200%2C%200%5D)%20)))%5Cn%5Ct%5Ct%5Ct.then%20(panic_on%20(%5B%20%5B_x%20%3D%3E%20!%20_x%20.ok%2C%20'not%20ok'%5D%20%5D))%20)%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%3B%20%5Cn%20%20%20%20%20%20%3Bapp_state%20(%5Cn%20%20%20%20%20%20%20%20T%20(S%20.sample%20(app_state)%5Cn%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20L%20.set%20(app_as_settings)%20(latest_settings)%20))%20%20%7D)%5Cn%5Ct%5Ct.catch%20(_e%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3Blookbehind_state%20(lookbehind%20.bad_room%20(_room))%5Cn%5Ct%5Ct%5Ct%3Bconsole%20.error%20(_e)%20%7D)%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3Bio_state%20(io%20.inert)%20%7D)%20%7D))%20%7D%5Cn%5Cnvar%20attempt_problem%20%3D%20_position%20%3D%3E%20%7B%3B%5Cn%5CtT%20(S%20.sample%20(app_state))%20(%5Cn%20%20%20%20under%20(complete_%20(%5Cn%20%20%20%20%20%20%7B%20_problem%3A%20current_problem%5Cn%20%20%20%20%20%20%2C%20_board%3A%20app_as_board%5Cn%20%20%20%20%20%20%2C%20_point%3A%20app_as_last_point%20%7D%20)%5Cn%20%20%20%20)%20((%7B%20_problem%2C%20_board%2C%20_point%20%7D)%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20var%20board_choice%20%3D%20_board%20%3D%3E%20_position%20%3D%3E%5Cn%5Ct%5Ct%5Ct%20%20T%20(_board)%20(L%20.get%20(%5B%20as_position%20(_position)%2C%20cell_as_choice%20%5D))%5Cn%20%20%20%20%20%20%20%20%5Cn%20%20%20%20%20%20var%20_completed%20%3D%20under%20(point_as_position)%20(%24%20(%5B%20board_choice%20(_board)%2C%20problem_choice_matches%20(_problem)%20%5D))%20(_point)%20%7C%7C%20false%20%5Cn%20%20%20%20%20%20if%20(Z_%20.not%20(_completed))%20%7B%5Cn%20%20%20%20%20%20%20%20var%20_choice%20%3D%20board_choice%20(_board)%20(_position)%5Cn%20%20%20%20%20%20%20%20if%20(!%20L%20.get%20(lookbehind_as_blocked)%20(S%20.sample%20(lookbehind_state)))%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20var%20latency%20%3D%20S%20.sample%20(tick_state)%20%2F%2Flookbehind_latency%20()%5Cn%20%20%20%20%20%20%20%20%20%20%3Bapp_state%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20T%20(S%20.sample%20(app_state)%5Cn%20%20%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%24%20(L%20.set%5Cn%20%20%20%20%20%20%20%20%20%20%20%20)%20(%5Bapp_as_last_point%2C%20point_as_attempts%2C%20L%20.appendTo%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20)%20(%5B_position%2C%20latency%5D)%20))%5Cn%20%20%20%20%20%20%20%20%20%20if%20(problem_choice_matches%20(_problem)%20(_choice))%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20var%20bingo_audio%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fstudent-bingo.mp3%3F1546277231054'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20var%20correct_audio%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fstudent-correct.mp3%3F1546277231570'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20var%20_solved_positions%20%3D%20Z_%20.append%20(_position)%20(solved_positions%20(_board)%20(L%20.get%20(app_as_past)%20(S%20.sample%20(app_state))))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20var%20_size%20%3D%20T%20(S%20.sample%20(app_state))%20(L%20.get%20(%5B%20app_as_settings%2C%20settings_as_size%20%5D))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20var%20_local_patterns%20%3D%20T%20(local_patterns%20(size_patterns%20(_size))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20L%20.collect%20(%5B%20as_value_of%20(_position)%2C%20L%20.elems%2C%20L%20.when%20(R%20.all%20(T%20(_solved_positions)%20(Z_%20.flip%20(Z_%20.elem))))%20%5D))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3B(new%20Audio%20(correct_audio))%20.play%20()%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20(L%20.isDefined%20(L%20.elems)%20(_local_patterns))%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3B(new%20Audio%20(bingo_audio))%20.play%20()%20%7D%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20else%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20var%20incorrect_audio%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fstudent-incorrect.mp3%3F1546277231539'%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3B(new%20Audio%20(incorrect_audio))%20.play%20()%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Blookbehind_state%20(lookbehind%20.attempting%20(latency%2C%20true))%20%7D%20%7D%20%7D%20%7D))%20%7D%5Cn%5Cnvar%20reset_game%20%3D%20_%20%3D%3E%20%7B%5Cn%20%20%3Bapp_state%20(%5Cn%20%20%20%20student_app%20.setup%20(Z%20.Nothing%2C%20Z%20.Nothing%2C%20Z%20.Nothing))%20%7D%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cnvar%20%5B%20time_state%2C%20flowing_state%20%5D%20%3D%20timer%20()%5Cn%2F%2Fvar%20time_interval%20%3D%20time_intervals%20(time_state)%5Cnvar%20tick_fn%20%3D%20_%20%3D%3E%20Math%20.floor%20((S%20.sample%20(time_state)%20-%20T%20(S%20.sample%20(app_state))%20(L%20.get%20(%5B%20app_as_progress%2C%20progress_as_timestamp%20%5D)))%20%2F%201000)%5Cnvar%20tick_state%20%3D%20S%20.value%20()%5Cn%3BS%20(_%20%3D%3E%20%7B%3B%5Cn%20%20var%20_app%20%3D%20app_state%20()%5Cn%20%20if%20(flowing_state%20()%20%26%26%20L%20.isDefined%20(app_as_progress)%20(_app))%20%7B%5Cn%20%20%20%20var%20_progress_timestamp%20%3D%20T%20(_app)%20(L%20.get%20(%5B%20app_as_progress%2C%20progress_as_timestamp%20%5D))%5Cn%20%20%20%20var%20_tick%20%3D%20Math%20.floor%20((time_state%20()%20-%20_progress_timestamp)%20%2F%201000)%5Cn%20%20%20%20if%20(_tick%20%3E%3D%200)%20%7B%5Cn%20%20%20%20%20%20%3Btick_state%20(_tick)%20%7D%20%7D%20%7D)%5Cn%2F*var%20tick_state%20%3D%20S%20.subclock%20(_%20%3D%3E%20%7B%3B%5Cn%20%20var%20_ticker%20%3D%20S%20.value%20()%5Cn%20%20S%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20var%20_app%20%3D%20app_state%20()%5Cn%20%20%20%20if%20(flowing_state%20()%20%26%26%20L%20.isDefined%20(app_as_progress)%20(_app))%20%7B%5Cn%20%20%20%20%20%20var%20_progress_timestamp%20%3D%20T%20(_app)%20(L%20.get%20(%5B%20app_as_progress%2C%20progress_as_timestamp%20%5D))%5Cn%20%20%20%20%20%20var%20_tick%20%3D%20Math%20.floor%20((time_state%20()%20-%20_progress_timestamp)%20%2F%201000)%5Cn%20%20%20%20%20%20if%20(_tick%20%3E%3D%200)%20%7B%5Cn%20%20%20%20%20%20%20%20%3B_ticker%20(_tick)%20%7D%20%7D%20%7D)%5Cn%20%20return%20_ticker%20%7D)*%2F%5Cn%5Cn%5Ct%5Ct%5Ct%5Ct%5Cnvar%20reping_period%20%3D%203%5Cnvar%20heartbeat%20%3D%20S%20.data%20(reping_period)%20%5Cn%5Cnvar%20connection%20%3D%20S%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%3Breturn%20T%20(app_state%20()%5Cn%20%20%20%20)%20(under%20(app_as_room%5Cn%20%20%20%20)%20(_room%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ctif%20(!%20connection%20%5B_room%5D)%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bconnection%20%5B_room%5D%20%3D%20S%20.data%20()%5Cn%5Ct%5Ct%5Ct%5Ct%3Bapi%20.listen_ping%20(_room)%20(connection%20%5B_room%5D)%20%7D%5Cn%5Ct%5Ct%5Ctreturn%20connection%20%5B_room%5D%20()%20%26%26%20so%20((_%3D_%3D%3E%5Cn%5Ct%5Ct%5Ct%5B%20timestamp%2C%20mean%2C%20Math%20.sqrt%20(variance)%20%5D%2C%5Cn%5Ct%5Ct%5Ctwhere%5Cn%5Ct%5Ct%5Ct%2C%20%5B%20mean%2C%20variance%2C%20n%2C%20timestamp%20%5D%20%3D%20connection%20%5B_room%5D%20()%20)%3D%3E_)%20%7D))%20%7D)%5Cn%5Cn%5Cn%5Cn%5CnS%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%3Bso%20((%5Cn%20%20take%5Cn%20%20%2C%20cases%20%3D%20%5Cn%20%20%20%20%20%20%5B%20%5B%20feedback_as_setup_room%5Cn%20%20%20%20%20%20%20%20%2C%20(%7B%20room%3A%20_room%20%7D)%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Bsetup_room%20(_room)%20%7D%20%5D%5Cn%20%20%20%20%20%20%2C%20%5B%20feedback_as_setup_student%5Cn%20%20%20%20%20%20%20%20%2C%20(%7B%20icon%3A%20_icon%2C%20name%3A%20_name%20%7D)%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Bgo%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%20(_%20%3D%3E%20setup_student%20(_icon)%20(_name))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%20(_%20%3D%3E%20connect_room%20())%20%7D%20%5D%5Cn%20%20%20%20%20%20%2C%20%5B%20feedback_as_attempt_problem%5Cn%20%20%20%20%20%20%20%20%2C%20(%7B%20position%3A%20_position%20%7D)%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Battempt_problem%20(_position)%20%7D%20%5D%5Cn%20%20%20%20%20%20%2C%20%5B%20feedback_as_reset_game%5Cn%20%20%20%20%20%20%20%20%2C%20_%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Breset_game%20()%20%7D%20%5D%20%5D%20)%3D%3E%5Cn%20%20so%20((_%3D_%3D%3E%5Cn%20%20T%20(just_now%20(feedback_state)%5Cn%20%20)%20(%5Cn%20%20action)%2C%5Cn%20%20where%5Cn%20%20%2C%20action%20%3D%20%5Cn%20%20%20%20%20%20Z_%20.flip%20(T%20(cases)%20(Z_%20.map%20(_case%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20%20%20_feedback%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20var%20result%20%3D%20L%20.get%20(predicate)%20(_feedback)%5Cn%20%20%20%20%20%20%20%20%20%20if%20(result)%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Baction%20(result)%20%7D%20%7D%2C%5Cn%20%20%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%20%20%2C%20predicate%20%3D%20_case%20%5B0%5D%5Cn%20%20%20%20%20%20%20%20%2C%20action%20%3D%20_case%20%5B1%5D%20)%3D%3E_)%20)))%20)%3D%3E_))%20%7D)%5Cn%5Cn%5Cn%5Cn%5Cn%5CnS%20(_%20%3D%3E%20%7B%3B%5Cn%5Ctif%20(L%20.isDefined%20(lookbehind_as_bad_room)%20(lookbehind_state%20()))%20%7B%5Cn%5Ct%5Ct%3Bvar%20forget%20%3D%20setTimeout%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3Blookbehind_state%20(lookbehind%20.nothing)%20%7D%5Cn%5Ct%5Ct%2C%201500)%5Cn%5Ct%5Ct%3BS%20.cleanup%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3BclearTimeout%20(forget)%20%7D)%20%7D%20%7D)%5Cn%5CnS%20(last_app%20%3D%3E%20%7B%3B%5Cn%5Ctif%20(!%20L%20.isDefined%20(app_as_room)%20(last_app))%20%7B%5Cn%5Ct%5Ctif%20(L%20.isDefined%20(app_as_room)%20(app_state%20()))%20%7B%5Cn%5Ct%5Ct%5Ct%3Blookbehind_state%20(lookbehind%20.nothing)%20%7D%20%7D%5Cn%5Ctreturn%20app_state%20()%20%7D%5Cn%2C%20app_state%20())%5Cn%5CnS%20(last_app%20%3D%3E%20%7B%3B%5Cn%5Ctvar%20last_progress%20%3D%20T%20(last_app)%20(L%20.get%20(app_as_progress))%5Cn%5Ctvar%20progress%20%3D%20T%20(app_state%20())%20(L%20.get%20(app_as_progress))%5Cn%5Ctif%20(L%20.isDefined%20(app_as_playing)%20(app_state%20()))%20%7B%5Cn%5Ct%5Ctif%20(last_progress%20!%3D%3D%20undefined%20%26%26%20progress%20!%3D%3D%20undefined%20%26%26%20Z_%20.not%20(Z_%20.equals%20(last_progress)%20(progress)))%20%7B%5Cn%5Ct%5Ct%5Ct%3Blookbehind_state%20(lookbehind%20.attempting%20(0%2C%20false))%20%7D%20%7D%5Cn%5Ctreturn%20app_state%20()%20%7D%5Cn%2C%20app_state%20())%5Cn%5CnS%20(_%20%3D%3E%20%7B%3B%5Cn%5Ctif%20(L%20.get%20(lookbehind_as_blocked)%20(lookbehind_state%20()))%20%7B%5Cn%5Ct%5Ct%3Bvar%20forget%20%3D%20setTimeout%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ctvar%20_since%20%3D%20T%20(lookbehind_state%20())%20(L%20.get%20(lookbehind_as_since))%5Cn%5Ct%5Ct%5Ct%3Blookbehind_state%20(lookbehind%20.attempting%20(_since%2C%20false))%20%7D%5Cn%5Ct%5Ct%2C%203000)%5Cn%5Ct%5Ct%3BS%20.cleanup%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3BclearTimeout%20(forget)%20%7D)%20%7D%20%7D)%5Cn%5Cn%5Cn%3BS%20(last_app%20%3D%3E%20%7B%3B%5Cn%5Ctvar%20_app%20%3D%20app_state%20()%5Cn%20%20if%20(!%20L%20.isDefined%20(app_as_game_over)%20(last_app))%20%7B%5Cn%20%20%20%20if%20(L%20.isDefined%20(app_as_game_over)%20(_app))%20%7B%5Cn%20%20%20%20%20%20%3Blookbehind_state%20(lookbehind%20.overall_analysis)%20%7D%20%7D%5Cn%5Ctreturn%20_app%20%7D)%5Cn%5Cn%5Cn%5Cn%3BS%20(_%20%3D%3E%20%7B%3B%5Cn%5Ctif%20(L%20.isDefined%20(app_as_get_ready)%20(app_state%20()))%20%7B%5Cn%5Ct%5Ct%3Bflowing_state%20(false)%20%7D%5Cn%5Ctelse%20if%20(L%20.isDefined%20(app_as_playing)%20(app_state%20()))%20%7B%5Cn%5Ct%5Ct%3Bflowing_state%20(true)%20%7D%5Cn%5Ctelse%20if%20(L%20.isDefined%20(app_as_game_over)%20(app_state%20()))%20%7B%5Cn%5Ct%5Ct%3Bflowing_state%20(false)%20%7D%20%7D)%5Cn%5Cn%5Cn%3BS%20(_%20%3D%3E%20%7B%5Cn%20%20var%20_app%20%3D%20app_state%20()%5Cn%20%20if%20(L%20.isDefined%20(app_as_setup)%20(_app))%20%7B%5Cn%20%20%20%20T%20(_app%5Cn%20%20%20%20)%20(%5Cn%20%20%20%20under%20(complete_%20(%7B%20app_as_student%2C%20app_as_room%2C%20app_as_settings%20%7D))%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%3Bapp_state%20(%5Cn%20%20%20%20%20%20%20%20T%20(S%20.sample%20(app_state)%5Cn%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20student_app_setup_to_get_ready)%20)%20%7D))%20%7D%20%7D)%5Cn%5Cn%3BS%20(last_tick%20%3D%3E%20%7B%3B%5Cn%20%20var%20_app%20%3D%20app_state%20()%20%5Cn%20%20var%20time_limit%20%3D%20T%20(_app)%20(L%20.get%20(%5B%20app_as_settings%2C%20settings_as_time_limit%20%5D))%5Cn%20%20%5Cn%20%20if%20(L%20.isDefined%20(app_as_playing)%20(_app))%20%7B%5Cn%20%20%20%20%2F%2FHACK%5Cn%20%20%20%20var%20tick%20%3D%20(tick_state%20()%2C%20tick_fn%20())%5Cn%20%20%20%20if%20(tick%20%3D%3D%20time_limit%20-%203)%20%7B%5Cn%20%20%20%20%20%20var%20countdown_audio%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fquestion-countdown.mp3%3F1546277335320'%5Cn%20%20%20%20%20%20%3B(new%20Audio%20(countdown_audio))%20.play%20()%20%7D%5Cn%20%20%20%20if%20(tick%20%3E%3D%20time_limit)%20%7B%5Cn%20%20%20%20%20%20%3Bapp_state%20(%5Cn%20%20%20%20%20%20%20%20student_app_playing_to_next%20(S%20.sample%20(app_state)))%20%7D%20%7D%20%7D)%5Cn%5Cn%5Cn%5Cn%3BS%20(_%20%3D%3E%20%7B%3B%5Cn%20%20var%20_app%20%3D%20S%20.sample%20(app_state)%5Cn%5Ctvar%20_ensemble%20%3D%20ensemble_state%20()%5Cn%20%20%5Cn%20%20var%20_app_progress%20%3D%20T%20(_app)%20(L%20.get%20(app_as_progress))%5Cn%20%20var%20_progress%20%3D%20T%20(_ensemble)%20(L%20.get%20(ensemble_as_progress))%5Cn%20%20%5Cn%20%20if%20(Z_%20.not%20(Z_%20.equals%20(_app_progress)%20(_progress)))%20%7B%5Cn%20%20%20%20if%20(L%20.isDefined%20(app_as_get_ready)%20(_app))%20%7B%5Cn%20%20%20%20%20%20%3Bapp_state%20(%5Cn%20%20%20%20%20%20%20%20T%20(_app%5Cn%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%5B%20student_app_get_ready_to_playing%5Cn%20%20%20%20%20%20%20%20%2C%20L%20.set%20(app_as_progress)%20(_progress)%20%5D))%20%7D%5Cn%20%20%20%20else%20if%20(L%20.isDefined%20(app_as_playing)%20(_app))%20%7B%5Cn%20%20%20%20%20%20var%20_progress_step%20%3D%20L%20.get%20(progress_as_step)%20(_progress)%5Cn%20%20%20%20%20%20if%20(_progress_step%20!%3D%3D%20-1)%20%7B%5Cn%20%20%20%20%20%20%20%20if%20(_progress_step%20%3E%20L%20.get%20(progress_as_step)%20(_app_progress))%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bapp_state%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20T%20(_app%5Cn%20%20%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20L%20.set%20(app_as_progress)%20(_progress)%20))%20%7D%20%7D%5Cn%20%20%20%20%20%20else%20%7B%5Cn%20%20%20%20%20%20%20%20%3Bapp_state%20(%5Cn%20%20%20%20%20%20%20%20%20%20T%20(_app%5Cn%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20student_app_playing_to_game_over))%20%7D%20%7D%20%7D%20%7D)%5Cn%5Cn%5Cn%5Cn%5Cn%3BS%20(_%20%3D%3E%20%7B%3B%5Cn%20%20if%20(L%20.isDefined%20(app_as_setup)%20(app_state%20()))%20%7B%5Cn%20%20%20%20%3Blookbehind_state%20(lookbehind%20.nothing)%5Cn%20%20%20%20%3Bensemble_state%20(undefined)%20%7D%20%7D)%5Cn%5Cn%3BS%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%3BT%20(app_state%20()%5Cn%20%20)%20(%5Cn%20%20under%20(%5Cn%20%20%20%20complete_%20(%7B%5Cn%20%20%20%20%20%20_student%3A%20app_as_student%2C%5Cn%20%20%20%20%20%20_room%3A%20app_as_room%20%7D)%5Cn%5Ct)%20((%7B%20_student%2C%20_room%20%7D)%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ctvar%20phase%20%3D%20heartbeat%20()%5Cn%5Ct%5Ctvar%20critical%20%3D%20phase%20%3D%3D%3D%201%5Cn%5Ct%5Ctgo%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ct%5Ct!!%20critical%20%26%26%20S%20.sample%20(connection)%5Cn%5Ct%5Ct%5Ct%3F%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20%20%20io_state%20(io%20.messaging)%20%26%26%20api%20(_room%2C%20%5Cn%20%20%20%20%20%20%20%20%20%20post%20(messages_encoding%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20!!%20not_playing%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3F%20%5B%20message%20.student_ping%20(_student%2C%20S%20.sample%20(connection))%20%5D%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3A%20%5B%20message%20.student_ping%20(_student%2C%20S%20.sample%20(connection))%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%2C%20message%20.student_join%20(_student%2C%20_board)%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%2C%20message%20.student_update%20(_student%2C%20_past)%20%5D)))%2C%5Cn%20%20%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%20%20%2C%20%7B%20_board%2C%20_past%2C%20not_playing%20%7D%20%3D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20T%20(app_state%20()%5Cn%20%20%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20L%20.get%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5B%20complete_%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%20_board%3A%20app_as_board%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_past%3A%20app_as_past%20%7D)%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%2C%20L%20.valueOr%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%20not_playing%3A%20'not%20playing'%20%7D)%20%5D))%20)%3D%3E_)%5Cn%5Ct%5Ct%5Ct%3A%20io_state%20(io%20.heartbeat)%20%26%26%20api%20(_room)%5Cn%5Ct%5Ct%5Ct%5Ct.then%20(%24%20(%5B%5Cn%5Ct%5Ct%5Ct%5Ct%5CtL%20.get%20(L%20.inverse%20(data_iso%20(ensemble%20.ensemble)))%2C%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct_x%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20var%20current_room%20%3D%20T%20(S%20.sample%20(app_state))%20(L%20.get%20(app_as_room))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20(Z_%20.equals%20(_room)%20(current_room))%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Bensemble_state%20(_x)%7D%20%7D%20%5D))%20)%5Cn%20%20%20%20.catch%20(_x%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20if%20(Z_%20.equals%20(L%20.get%20('error')%20(_x))%20('timeout'))%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3Bconsole%20.warn%20('Room%20timed%20out')%20%7D%5Cn%20%20%20%20%20%20else%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3Bthrow%20_x%20%7D%7D)%5Cn%20%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3BsetTimeout%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bheartbeat%20(!!%20critical%20%3F%20reping_period%20%3A%20phase%20-%201)%20%7D%5Cn%5Ct%5Ct%5Ct%2C%20300)%20%7D)%5Cn%5Ct%5Ct.catch%20(_e%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3Bconsole%20.error%20(_e)%5Cn%5Ct%5Ct%5Ct%3BsetTimeout%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bheartbeat%20(phase)%20%7D%5Cn%5Ct%5Ct%5Ct%2C%20300)%20%7D)%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3Bio_state%20(io%20.inert)%20%7D)%20%7D))%20%7D)%5Cn%22%5D%2C%22names%22%3A%5B%5D%2C%22mappings%22%3A%22AAAA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CEAAE%3B%3B%3B%3B%3B0BACqB%3B%3B%3B%3BkCAEN%3B%3B%3B%3B%3ByCAKG%3B%3B%3B%3B%3B%3ByBACwB%3B%3BIAJtC%2CqEAAC%3BAACP%2CUAAU%3B%3B%3B%3B%3BIAAgB%2CqEAAC%3B%3BIAAqB%3BAAChD%3BIAPkB%2C8CAAI%3B%3BIAS%2BD%3BAACrF%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CEAAE%3B%3B%3B%3B%3B0BACqB%3B%3B%3B%3BkCAEN%3B%3B%3B%3B%3B%3BkCAGA%3B%3B%3B%3B%2BBAGC%3B%3B%3B%3B%3B%2BBAGA%3B%3B%3B%3B%3BIALZ%3B%3B4DAAiC%3B%3BIAGjC%3B%3B4DAAkC%3B%3BIAGpC%2CqEAAC%3BAACL%2CQAAQ%3B%3B%3B%3B%3B%3BiBAA2C%3B%3BIAA0B%3BAAC7E%3BIAfqB%2C8CAAI%3B%3BIAeQ%3BAACjC%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CiBAAiB%3B%3B%3B%3B%3BIACf%2CqEAAC%3BAACH%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3B%3BIAAyB%3BAACzB%3BAACA%3BAACA%2CEAAE%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BIACmB%2CqEAAC%3B%3BIACiB%3BAACvC%3BAACA%3BAACA%3BAACA%3BAACA%2CEAAE%3B%3B%3B%3B%3B%3B%3BmEAI0B%3BqDAAoB%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BIADxC%2CqEAAC%3BIAGD%2CiFAAC%3BAACT%2CqEAAqE%3B%3B%3BaAAU%3B%3BIAAqB%3BAACpG%3BIAEc%2CqEAAC%3BAACf%2CQAAQ%3B%3B%3B%3B%3B%3BIAAM%2CqEAAC%3BAACf%3BAACA%2C8BAA8B%3B%3B%3B%3BwBAAgB%3B%3BIAAsB%3BAACpE%2CYAAY%3B%3B%3BwBAAoC%3BIAA9B%2C8CAAI%3B%3BIAAgD%3BAACtE%3BAACA%3BAACA%3BAACA%3B%3BIAAyF%3BIACzE%2CqEAAC%3BAACjB%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CaAAa%3B%3B%3BsCAAe%3BqCAAa%3B6BAAiB%3B%3BIAA4B%3BAACtF%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3B%3BIAAuH%3BAACvH%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CEAAE%3B%3B%3B%3B%3B0BACqB%3B%3B%3BuCACF%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BkCAYkD%3B%3B%3BIAVE%2C6DAAU%3BIAAnC%2C8CAAI%3BIACuB%2C6DAAU%3BIAApC%2C8CAAI%3BIACjD%2CqEAAC%3BAACL%3BAACA%2CMAAM%3B%3B%3B%3B%3B%3B%3B%3BkCACiC%3B%3B%3B%3B%3B%3BkCACA%3B%3B%3B%3B%3B%3B%3B%3B%3BIACC%2CqEAAC%3B%3BIAAsD%3BAAC%2FF%3BIAE0C%2C8CAAI%3B%3BIAAkF%3BAAChI%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CeAAe%3B%3B%3B%3B%3BIACd%2CqEAAC%3BAACF%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3B%3BIAA0D%3BAAC1D%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%22%7D
