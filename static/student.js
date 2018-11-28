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
  setup_room: (room =~ room) => feedback,
  setup_student: (name =~ string) => feedback,
  attempt_problem: (position =~ position) => feedback })

var lookbehind = data ({
	nothing: () => lookbehind,
	bad_room: (room =~ room) => lookbehind,
	attempting: (since =~ latency, blocked =~ bool) => lookbehind })


var feedback_setup_room = data_iso (feedback .setup_room)
var feedback_setup_student = data_iso (feedback .setup_student)
var feedback_attempt_problem = data_iso (feedback .attempt_problem)

var lookbehind_nothing = data_iso (lookbehind .nothing)
var lookbehind_bad_room = data_iso (lookbehind .bad_room)
var lookbehind_attempting = data_iso (lookbehind .attempting)

var lookbehind_room = data_lens (lookbehind .bad_room) .room
var lookbehind_since = data_lens (lookbehind .attempting) .since
var lookbehind_blocked = data_lens (lookbehind .attempting) .blocked






var app_state = S .data (student_app .get_ready (Z .Nothing, Z .Nothing, Z .Nothing))
 
var io_state = S .data (io .inert)
var ensemble_state = S .data (undefined)

var feedback_state = temporal ()
var lookbehind_state = S .data (lookbehind .nothing)








 
var clicking = ['click']


var setup_room_view = _ => so ((_=_=>
  (function () {
    var __, __a_title1, __sub_title2, __room3, __room3_label1, __room3_insert2, __room3_input3, __button4, __button4_img1;
    __ = Surplus.createElement("setup-room-etc", null, null);
    __a_title1 = Surplus.createElement("a-title", null, __);
    __a_title1.textContent = "Bingo";
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
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  !! L .isDefined (lookbehind_bad_room) (lookbehind_state ())
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
  , join_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fjoin.png?1543381404734'
  , bad_room = T (lookbehind_state ()) (L .get (lookbehind_room))
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
    var __, __a_title1, __sub_title2, __name3, __name3_label1, __name3_input2, __button4, __button4_img1;
    __ = Surplus.createElement("setup-student-etc", null, null);
    __a_title1 = Surplus.createElement("a-title", null, __);
    __a_title1.textContent = "Bingo";
    __sub_title2 = Surplus.createElement("sub-title", null, __);
    __sub_title2.textContent = "除法（一）";
    __name3 = Surplus.createElement("name", null, __);
    Surplus.assign(__name3.style, { margin: '30px 0' });
    __name3_label1 = Surplus.createElement("label", null, __name3);
    __name3_label1.textContent = "名稱";
    __name3_input2 = Surplus.createElement("input", null, __name3);
    Surplus.createTextNode(" ", __name3)
    __button4 = Surplus.createElement("button", null, __);
    Surplus.setAttribute(__button4, "x-custom", true);
    Surplus.setAttribute(__button4, "x-for", "connect");
    __button4_img1 = Surplus.createElement("img", null, __button4);
    __button4_img1.src =  connect_img ;
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__state) { return ( setup_student_feedback )(__, __state); });
    return __;
})(),
  where
  , connect_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fconnect.png?1543381404627' 
  , setup_student_feedback = _dom => so ((_=_=>
      (_input .addEventListener ('keypress', _e => {;
        if (_e .keyCode === 13) {
          ;let_name_enter () } }),
      clicking .forEach (click => {;
        ;_button .addEventListener (click, _e => {;
          ;let_name_enter () }) })),
      where
      , _input = _dom .querySelector ('input')
      , _button = _dom .querySelector ('button')
      , let_name_enter = _ => {;
          var value = _input .value
          ;_input .value = ''
          ;feedback_state (feedback .setup_student (value)) } )=>_))=>_)


var get_ready_view = (function () {
    var __, __insert1;
    __ = Surplus.createElement("get-ready-etc", null, null);
    __insert1 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  so ((
		take
		, room = T (app_state ()) (L .get ([ app_as_room, as_maybe ]))
		, student = T (app_state ()) (L .get ([ app_as_student, as_maybe ])) ) =>
		!! Z .isNothing (room) ?
      !! (L .isDefined (io_as_inert
      ) (io_state ()))
			? setup_room_view
			: !! (L .isDefined (L .choice (io_as_connecting, io_as_heartbeat)
      ) (io_state ()))
      ? '正在連接遊戲室…'
      : panic ('invalid io at get ready view')
		:!! Z .isNothing (student) ?
      !! (L .isDefined (io_as_inert
      ) (io_state ()))
			? setup_student_view
			: !! (L .isDefined (L .choice (io_as_connecting, io_as_heartbeat)
      ) (io_state ()))
      ? '正在加入遊戲室…'
      : panic ('invalid io at get ready view')
		: so ((_=_=>
      [ (function () {
    var __, __insert2;
    __ = Surplus.createElement("room", null, null);
    Surplus.createTextNode(" ", __)
    __insert2 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range, '已加入遊戲室' + _room); }, { start: __insert2, end: __insert2 });
    return __;
})()
      , '等候遊戲開始…' ]
      .map (_x => (function () {
    var __;
    __ = Surplus.createElement("div", null, null);
    Surplus.content(__,  _x , "");
    return __;
})()),
      where
      , { _room, _student } = { _room: from_just (room), _student: from_just (student) } )=>_)) ); }, { start: __insert1, end: __insert1 });
    return __;
})()

var playing_view = _ => so ((_=_=>
  (function () {
    var __, __div1, __div1_ticker1, __div1_question2, __div2, __div2_board1, __div2_board1_insert2;
    __ = Surplus.createElement("playing-etc", null, null);
    __div1 = Surplus.createElement("div", "left-pane", __);
    __div1_ticker1 = Surplus.createElement("ticker", null, __div1);
    __div1_question2 = Surplus.createElement("question", null, __div1);
    Surplus.content(__div1_question2,  _current_question , "");
    Surplus.createTextNode(" ", __div1)
    __div2 = Surplus.createElement("div", "right-pane", __);
    __div2_board1 = Surplus.createElement("board", null, __div2);
    Surplus.createTextNode(" ", __div2_board1)
    __div2_board1_insert2 = Surplus.createTextNode('', __div2_board1)
    Surplus.createTextNode(" ", __div2_board1)
    Surplus.createTextNode(" ", __div2)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__current) { return Surplus.content(__div1_ticker1,  T (game_tick) (map_defined_ ([]) (t => time_limit - t)) , __current); }, '');
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
    Surplus.content(__,  _cell_choice , "");
    return __;
})()
          :!! (_cell_solved) ? (function () {
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
          , _cell_solved = Z .elem (_cell_position) (_solved_positions)
          , _cell_bingo = R .any (Z .elem (_cell_position)) (_bingoed_positions) )=>_)))
          ); }, { start: __insert2, end: __insert2 });
    return __;
})() )) ); }, { start: __div2_board1_insert2, end: __div2_board1_insert2 });
    return __;
})(),
    where
    , _app = app_state ()
    , _board = T (_app) (L .get (app_as_board))
    , _past = T (_app) (L .get (app_as_past))
    , _current_question = T (_app) ([ current_problem, L .get (problem_as_question) ])
    , _solved_positions = solved_positions (_board) (_past)
    , _bingoed_positions = bingoed_positions (_board) (_past)
    , time_limit = T (app_state ()) (L .get ([ app_as_settings, settings_as_time_limit ]))
    , game_tick = just_now (game_tick_sampler)
    , cell_feedback = cell => _dom => {;
        ;clicking .forEach (click => {;
          ;_dom .addEventListener (click, _ => {;
            ;feedback_state (feedback .attempt_problem (T (cell) (L .get (cell_as_position)))) }) }) } )=>_) 

var game_over_view = _ => so ((_=_=> so ((_=_=>
	(function () {
    var __, __message1, __result_etc2, __result_etc2_tabs1, __result_etc2_tabs1_button1, __result_etc2_tabs1_button2, __result_etc2_table2, __result_etc2_table2_tr1, __result_etc2_table2_tr1_th1, __result_etc2_table2_tr1_th2, __result_etc2_table2_tr1_th3, __result_etc2_table2_tr2, __result_etc2_table2_tr2_td1, __result_etc2_table2_tr2_td2, __result_etc2_table2_tr2_td3;
    __ = Surplus.createElement("game-over-etc", null, null);
    __message1 = Surplus.createElement("message", null, __);
    __message1.textContent = "Game Over!";
    __result_etc2 = Surplus.createElement("result-etc", null, __);
    __result_etc2_tabs1 = Surplus.createElement("tabs", null, __result_etc2);
    __result_etc2_tabs1_button1 = Surplus.createElement("button", null, __result_etc2_tabs1);
    __result_etc2_tabs1_button1.textContent = " Overview ";
    __result_etc2_tabs1_button2 = Surplus.createElement("button", null, __result_etc2_tabs1);
    __result_etc2_tabs1_button2.textContent = " problem ";
    __result_etc2_table2 = Surplus.createElement("table", null, __result_etc2);
    Surplus.setAttribute(__result_etc2_table2, "a-result", true);
    __result_etc2_table2_tr1 = Surplus.createElement("tr", null, __result_etc2_table2);
    __result_etc2_table2_tr1_th1 = Surplus.createElement("th", null, __result_etc2_table2_tr1);
    __result_etc2_table2_tr1_th1.textContent = "problem";
    __result_etc2_table2_tr1_th2 = Surplus.createElement("th", null, __result_etc2_table2_tr1);
    __result_etc2_table2_tr1_th2.textContent = "Attempts";
    __result_etc2_table2_tr1_th3 = Surplus.createElement("th", null, __result_etc2_table2_tr1);
    __result_etc2_table2_tr1_th3.textContent = "Avg. Time";
    __result_etc2_table2_tr2 = Surplus.createElement("tr", null, __result_etc2_table2);
    __result_etc2_table2_tr2_td1 = Surplus.createElement("td", null, __result_etc2_table2_tr2);
    __result_etc2_table2_tr2_td2 = Surplus.createElement("td", null, __result_etc2_table2_tr2);
    __result_etc2_table2_tr2_td3 = Surplus.createElement("td", null, __result_etc2_table2_tr2);
    return __;
})(),
	where							
	, _app = app_state ()
	, _ensemble = ensemble_state ()
	, all_students = T (_ensemble) (assemble_students (_app))
	, questions = T (_app) (L .collect ([ app_as_problems, L .elems, problem_as_question ]))
	, attempts = T (_app) ([ L .collect ([ app_as_past, L .elems, point_as_attempts ]), Z_ .map (Z_ .size) ])
	//TODO: make readable
	/*, average_time = T (_ensemble) ([
			assemble_students (_app),
			Z_ .map ($ ([
				Z .snd,
				L .collect ([ [1], L .elems, point_as_attempts, L .last, [1], as_maybe ]),
				Z .map (Z .of (Array)) ])),
			_x => Z .reduce (Z .zipWith (Z .concat)) (R .head (_x)) (R .tail (_x)),
			Z .map ($ ([ Z .justs, average, Z_ .fromMaybe (_ => panic ('average time fail!')) ])) ]) */)=>_),
  where
	, average = by (list => $ ([
			Z .sum,
			Z .div (Z .size (list)) ])) )=>_)


window .view = (function () {
    var __, __insert1;
    __ = Surplus.createElement("student-app", null, null);
    __insert1 = Surplus.createTextNode('', __)
    Surplus.createTextNode(" ", __)
    Surplus.S.effect(function (__range) { return Surplus.insert(__range,  !! (L .isDefined (app_as_get_ready) (app_state ()))
		? get_ready_view
		: !! (L .isDefined (app_as_playing) (app_state ()))
		? playing_view
		: !! (L .isDefined (app_as_game_over) (app_state ()))
		? game_over_view
		: panic ('undefined app state in view') ); }, { start: __insert1, end: __insert1 });
    return __;
})()














/*
var lookbehind_latency = _ => {
		var now = game_clock .time ()
		var start = T (game_clock .getLabelTime ('next'))
			(_x => !! (_x === -1) ? 0 : _x)
		return now - start }
*/
			 
			 
			 
			 
			 
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
          [ L .set (app_as_room) (Z_ .Just (_room))
          , L .set (app_as_settings) (Z_ .Just (_settings)) ])) } ])) )
		.catch (_e => {;
			;lookbehind_state (lookbehind .bad_room (_room))
			;console .error (_e) })
		.then (_ => {;
			;io_state (io .inert) }) }

var setup_student = _name => {;
  ;app_state (
    T (S .sample (app_state)
    ) (
    L .set (app_as_student) (Z_ .Just ([ uuid (), _name ])) )) } 

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
      .then (panic_on ([ [Z .equals ({}), 'empty room; expired code?'] ]))
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
        L .set (app_as_settings) (Z_ .Just (latest_settings)) ))  })
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
      if (Z .not (_completed)) {
        var _choice = board_choice (_board) (_position)
        if (! L .get (lookbehind_blocked) (S .sample (lookbehind_state))) {
          var latency = game_clock .time () //lookbehind_latency ()
          ;app_state (
            T (S .sample (app_state)
            ) (
            $ (L .set
            ) ([app_as_last_point, point_as_attempts, L .appendTo]
            ) ([_position, latency]) ))
          if (Z .not (problem_choice_matches (_problem) (_choice))) {
            ;lookbehind_state (lookbehind .attempting (latency, true)) } } } })) }

var timesup_problem = _ => {;
	;app_state (
    student_app_playing_to_next (S .sample (app_state))) }












var game_clock = new TimelineMax
var game_tick_sampler = temporal ()


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
      [ [ feedback_setup_room
        , ({ room: _room }) => {;
            ;setup_room (_room) } ]
      , [ feedback_setup_student
        , ({ name: _name }) => {;
            ;go
            .then (_ => setup_student (_name))
            .then (_ => connect_room ()) } ]
      , [ feedback_attempt_problem
        , ({ position: _position }) => {;
            ;attempt_problem (_position) } ] ] )=>
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
	if (L .isDefined (lookbehind_bad_room) (lookbehind_state ())) {
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
		if (last_progress !== undefined && progress !== undefined && Z .not (Z .equals (last_progress) (progress))) {
			;lookbehind_state (lookbehind .attempting (0, false)) } }
	return app_state () }
, app_state ())
S (_ => {;
	if (L .get (lookbehind_blocked) (lookbehind_state ())) {
		;var forget = setTimeout (_ => {;
			var _since = T (lookbehind_state ()) (L .get (lookbehind_since))
			;lookbehind_state (lookbehind .attempting (_since, false)) }
		, 3000)
		;S .cleanup (_ => {;
			;clearTimeout (forget) }) } })


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


S (last_ensemble => {;
	;so ((
	take
	, _app = S .sample (app_state)
	, _ensemble = ensemble_state () ) => {;
	if (L .isDefined (app_as_get_ready) (_app)) { //c change unready get readies to setup state?
		if (! L .isDefined (ensemble_as_start) (last_ensemble)) {
			if (L .isDefined (ensemble_as_start) (_ensemble)) {
				var start = T (_ensemble) (L .get (ensemble_as_start))
				var now = (new Date) .getTime ()

				var playing_app = student_app_get_ready_to_playing (_app)
        
        var time_limit = T (playing_app) (L .get ([ app_as_settings, settings_as_time_limit ]))
        game_clock .clear ()
        ;game_clock .add (timesup_problem, time_limit)
        ;T (Z .range (0) (time_limit + 1)) (R .forEach (t => {
          ;game_clock .add (_ => {;game_tick_sampler (t)}, t) }))
        
				if (start > now) {
					;app_state (playing_app) }
				else {
					;setTimeout (_ => {;
						;app_state (playing_app) }
					, start - now) }

				var _room = T (_app) (L .get (app_as_room))
				var _student = T (_app) (L .get (app_as_student))
				;io_state (io .messaging) && api (_room, post (
					message_encoding (
						message .student_start (_student, start))))
				.catch (_e => {;
					;console .error (_e) })
				.then (_ => {;
					;io_state (io .inert) }) } } } })
	return ensemble_state () }
, ensemble_state ())

//TODO make implementation more sophisticated
S (last_ensemble => {;
	;so ((
	take
	, _app = S .sample (app_state)
	, _ensemble = ensemble_state () ) => {;
	if (L .isDefined (app_as_playing) (_app)) {
		if (! L .isDefined (ensemble_as_end) (last_ensemble)) {
			if (L .isDefined (ensemble_as_end) (_ensemble)) {
				;app_state (
          T (_app) (student_app_playing_to_game_over)) } } } })
	return ensemble_state () }
, ensemble_state ())


S (_ => {;
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
					_x => {;ensemble_state (_x)} ])) )
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

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22file%22%3A%22out.js%22%2C%22sources%22%3A%5B%22in.js%22%5D%2C%22sourcesContent%22%3A%5B%22var%20%7B%20T%2C%20%24%2C%20apply%2C%20L%2C%20R%2C%20S%2C%20Z%2C%20Z_%2C%20Z%24%2C%20sanc%2C%20memoize%2C%20TimelineMax%2C%5Cnso%2C%20by%2C%20and_by%2C%20under%2C%5Cngo%2C%20never%2C%20panic%2C%20panic_on%2C%5Cnjust_now%2C%20temporal%2C%5Cnfiat%2C%20data%2C%20data_lens%2C%20data_iso%2C%20data_kind%2C%5Cnn_reducer%2C%20pair_zip_n%2C%20pair_zip%2C%20pair_projection%2C%5Cnmap_defined_%2C%20map_defined%2C%20from_just%2C%20maybe_all%2C%5Cnas_sole%2C%20sole%2C%20every%2C%20delay%2C%5Cnbool%2C%20number%2C%20timestamp%2C%20string%2C%5Cnlist%2C%20map%2C%20maybe%2C%20nat%2C%20id%2C%20v%2C%20piece%2C%5Cnshuffle%2C%20uuid%2C%20api%2C%20post%2C%5Cnstudent%2C%20problem%2C%20choice%2C%20answer%2C%20latency%2C%20ping%2C%20position%2C%5Cnattempt%2C%20point%2C%20past%2C%20board%2C%20win_rule%2C%20rules%2C%20settings%2C%5Cnteacher_app%2C%20student_app%2C%5Cnio%2C%20message%2C%20ensemble%2C%20%5Cndefault_problems%2C%20default_rules%2C%20default_settings%2C%5Cnas_maybe%2C%20as_defined%2C%20as_complete%2C%20complete_%2C%5Cnapp_as_setup%2C%20app_as_get_ready%2C%20app_as_playing%2C%20app_as_game_over%2C%20app_as_progress%2C%5Cnsettings_as_problems%2C%20settings_as_rules%2C%5Cnsettings_as_size%2C%20settings_as_time_limit%2C%20settings_as_win_rule%2C%5Cnio_as_inert%2C%20io_as_connecting%2C%20io_as_heartbeat%2C%5Cnensemble_as_ping%2C%20ensemble_as_settings%2C%20ensemble_as_start%2C%20ensemble_as_progress%2C%20ensemble_as_end%2C%5Cnensemble_as_student_pings%2C%20ensemble_as_student_starts%2C%5Cnensemble_as_student_boards%2C%20ensemble_as_student_pasts%2C%5Cnattempt_as_position%2C%20attempt_as_latency%2C%20point_as_attempts%2C%20point_as_position%2C%20past_as_points%2C%5Cnapp_as_settings%2C%20app_as_student%2C%20app_as_students%2C%20app_as_room%2C%5Cnapp_as_board%2C%20app_as_past%2C%20app_as_problems%2C%5Cnapp_as_last_point%2C%20point_as_attempts%2C%5Cnrules_as_size%2C%20rules_as_time_limit%2C%20settings_as_size%2C%20settings_as_time_limit%2C%5Cnproblem_as_question%2C%20problem_as_answers%2C%5Cncell_as_position%2C%20as_position%2C%5Cncell_as_choice%2C%20student_name%2C%5Cnpair_as_list%2C%20pair_as_first%2C%20pair_as_second%2C%5Cnmessage_encoding%2C%20messages_encoding%2C%5Cnassemble_students%2C%20schedule_start%2C%5Cnteacher_app_get_ready_to_playing%2C%20teacher_app_playing_to_next%2C%20teacher_app_playing_to_game_over%2C%5Cnstudent_app_get_ready_to_playing%2C%20student_app_playing_to_next%2C%20student_app_playing_to_game_over%2C%5Cnpast_progressed%2C%5Cncurrent_problem%2C%20problem_choice_matches%2C%5Cnattempted_positions%2C%20solved_positions%2C%20bingoed_positions%5Cn%7D%20%3D%20window%20.stuff%5Cn%5Cn%5Cnvar%20feedback%20%3D%20data%20(%7B%5Cn%20%20setup_room%3A%20(room%20%3D~%20room)%20%3D%3E%20feedback%2C%5Cn%20%20setup_student%3A%20(name%20%3D~%20string)%20%3D%3E%20feedback%2C%5Cn%20%20attempt_problem%3A%20(position%20%3D~%20position)%20%3D%3E%20feedback%20%7D)%5Cn%5Cnvar%20lookbehind%20%3D%20data%20(%7B%5Cn%5Ctnothing%3A%20()%20%3D%3E%20lookbehind%2C%5Cn%5Ctbad_room%3A%20(room%20%3D~%20room)%20%3D%3E%20lookbehind%2C%5Cn%5Ctattempting%3A%20(since%20%3D~%20latency%2C%20blocked%20%3D~%20bool)%20%3D%3E%20lookbehind%20%7D)%5Cn%5Cn%5Cnvar%20feedback_setup_room%20%3D%20data_iso%20(feedback%20.setup_room)%5Cnvar%20feedback_setup_student%20%3D%20data_iso%20(feedback%20.setup_student)%5Cnvar%20feedback_attempt_problem%20%3D%20data_iso%20(feedback%20.attempt_problem)%5Cn%5Cnvar%20lookbehind_nothing%20%3D%20data_iso%20(lookbehind%20.nothing)%5Cnvar%20lookbehind_bad_room%20%3D%20data_iso%20(lookbehind%20.bad_room)%5Cnvar%20lookbehind_attempting%20%3D%20data_iso%20(lookbehind%20.attempting)%5Cn%5Cnvar%20lookbehind_room%20%3D%20data_lens%20(lookbehind%20.bad_room)%20.room%5Cnvar%20lookbehind_since%20%3D%20data_lens%20(lookbehind%20.attempting)%20.since%5Cnvar%20lookbehind_blocked%20%3D%20data_lens%20(lookbehind%20.attempting)%20.blocked%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cnvar%20app_state%20%3D%20S%20.data%20(student_app%20.get_ready%20(Z%20.Nothing%2C%20Z%20.Nothing%2C%20Z%20.Nothing))%5Cn%20%5Cnvar%20io_state%20%3D%20S%20.data%20(io%20.inert)%5Cnvar%20ensemble_state%20%3D%20S%20.data%20(undefined)%5Cn%5Cnvar%20feedback_state%20%3D%20temporal%20()%5Cnvar%20lookbehind_state%20%3D%20S%20.data%20(lookbehind%20.nothing)%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%20%5Cnvar%20clicking%20%3D%20%5B'click'%5D%5Cn%5Cn%5Cnvar%20setup_room_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%3Csetup-room-etc%20fn%3D%7B%20setup_room_feedback%20%7D%3E%5Cn%20%20%20%20%3Ca-title%3EBingo%3C%2Fa-title%3E%5Cn%20%20%20%20%3Csub-title%3E%E9%99%A4%E6%B3%95%EF%BC%88%E4%B8%80%EF%BC%89%3C%2Fsub-title%3E%5Cn%20%20%20%20%3Croom%20style%3D%7B%7B%20margin%3A%20'30px%200'%20%7D%7D%3E%5Cn%20%20%20%20%20%20%3Clabel%3E%E9%81%8A%E6%88%B2%E5%AE%A4%E7%B7%A8%E8%99%9F%EF%BC%9A%3C%2Flabel%3E%5Cn%20%20%20%20%20%20%7B%20!!%20L%20.isDefined%20(lookbehind_bad_room)%20(lookbehind_state%20())%5Cn%20%20%20%20%20%20%20%20%3F%20%3Cmessage%3E%E4%B8%8D%E8%83%BD%E9%80%A3%E6%8E%A5%E9%81%8A%E6%88%B2%E5%AE%A4%7B%20bad_room%20%7D%3C%2Fmessage%3E%5Cn%20%20%20%20%20%20%20%20%3A%20%5B%5D%20%7D%5Cn%20%20%20%20%20%20%3Cinput%20style%3D%7B%7B%20margin%3A%20%7B%20top%3A%20'10px'%20%7D%20%7D%7D%20%2F%3E%20%3C%2Froom%3E%5Cn%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22join%5C%22%3E%3Cimg%20src%3D%7B%20join_img%20%7D%20%2F%3E%3C%2Fbutton%3E%20%3C%2Fsetup-room-etc%3E%2C%5Cn%20%20where%5Cn%20%20%2C%20join_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fjoin.png%3F1543381404734'%5Cn%20%20%2C%20bad_room%20%3D%20T%20(lookbehind_state%20())%20(L%20.get%20(lookbehind_room))%5Cn%20%20%2C%20setup_room_feedback%20%3D%20_dom%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20(_input%20.addEventListener%20('keypress'%2C%20_e%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20if%20(_e%20.keyCode%20%3D%3D%3D%2013)%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blet_room_enter%20()%20%7D%20%7D)%2C%5Cn%20%20%20%20%20%20clicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_button%20.addEventListener%20(click%2C%20_e%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blet_room_enter%20()%20%7D)%20%7D))%2C%5Cn%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%2C%20_input%20%3D%20_dom%20.querySelector%20('input')%5Cn%20%20%20%20%20%20%2C%20_button%20%3D%20_dom%20.querySelector%20('button')%5Cn%20%20%20%20%20%20%2C%20let_room_enter%20%3D%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20var%20value%20%3D%20_input%20.value%5Cn%20%20%20%20%20%20%20%20%20%20%3B_input%20.value%20%3D%20''%5Cn%20%20%20%20%20%20%20%20%20%20%3Bfeedback_state%20(feedback%20.setup_room%20(value))%20%7D%20)%3D%3E_))%3D%3E_)%5Cn%5Cnvar%20setup_student_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%3Csetup-student-etc%20fn%3D%7B%20setup_student_feedback%20%7D%3E%5Cn%20%20%20%20%3Ca-title%3EBingo%3C%2Fa-title%3E%5Cn%20%20%20%20%3Csub-title%3E%E9%99%A4%E6%B3%95%EF%BC%88%E4%B8%80%EF%BC%89%3C%2Fsub-title%3E%5Cn%20%20%20%20%3Cname%20style%3D%7B%7B%20margin%3A%20'30px%200'%20%7D%7D%3E%5Cn%20%20%20%20%20%20%3Clabel%3E%E5%90%8D%E7%A8%B1%3C%2Flabel%3E%5Cn%20%20%20%20%20%20%3Cinput%20%2F%3E%20%3C%2Fname%3E%5Cn%20%20%20%20%3Cbutton%20x-custom%20x-for%3D%5C%22connect%5C%22%3E%3Cimg%20src%3D%7B%20connect_img%20%7D%20%2F%3E%3C%2Fbutton%3E%20%3C%2Fsetup-student-etc%3E%2C%5Cn%20%20where%5Cn%20%20%2C%20connect_img%20%3D%20'https%3A%2F%2Fcdn.glitch.com%2Fcf9cdaee-7478-4bba-afce-36fbc451e9d6%252Fconnect.png%3F1543381404627'%20%5Cn%20%20%2C%20setup_student_feedback%20%3D%20_dom%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20(_input%20.addEventListener%20('keypress'%2C%20_e%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20if%20(_e%20.keyCode%20%3D%3D%3D%2013)%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blet_name_enter%20()%20%7D%20%7D)%2C%5Cn%20%20%20%20%20%20clicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3B_button%20.addEventListener%20(click%2C%20_e%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3Blet_name_enter%20()%20%7D)%20%7D))%2C%5Cn%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%2C%20_input%20%3D%20_dom%20.querySelector%20('input')%5Cn%20%20%20%20%20%20%2C%20_button%20%3D%20_dom%20.querySelector%20('button')%5Cn%20%20%20%20%20%20%2C%20let_name_enter%20%3D%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20var%20value%20%3D%20_input%20.value%5Cn%20%20%20%20%20%20%20%20%20%20%3B_input%20.value%20%3D%20''%5Cn%20%20%20%20%20%20%20%20%20%20%3Bfeedback_state%20(feedback%20.setup_student%20(value))%20%7D%20)%3D%3E_))%3D%3E_)%5Cn%5Cn%5Cnvar%20get_ready_view%20%3D%20%3Cget-ready-etc%3E%5Cn%5Ct%7B%20so%20((%5Cn%5Ct%5Cttake%5Cn%5Ct%5Ct%2C%20room%20%3D%20T%20(app_state%20())%20(L%20.get%20(%5B%20app_as_room%2C%20as_maybe%20%5D))%5Cn%5Ct%5Ct%2C%20student%20%3D%20T%20(app_state%20())%20(L%20.get%20(%5B%20app_as_student%2C%20as_maybe%20%5D))%20)%20%3D%3E%5Cn%5Ct%5Ct!!%20Z%20.isNothing%20(room)%20%3F%5Cn%20%20%20%20%20%20!!%20(L%20.isDefined%20(io_as_inert%5Cn%20%20%20%20%20%20)%20(io_state%20()))%5Cn%5Ct%5Ct%5Ct%3F%20setup_room_view%5Cn%5Ct%5Ct%5Ct%3A%20!!%20(L%20.isDefined%20(L%20.choice%20(io_as_connecting%2C%20io_as_heartbeat)%5Cn%20%20%20%20%20%20)%20(io_state%20()))%5Cn%20%20%20%20%20%20%3F%20'%E6%AD%A3%E5%9C%A8%E9%80%A3%E6%8E%A5%E9%81%8A%E6%88%B2%E5%AE%A4%E2%80%A6'%5Cn%20%20%20%20%20%20%3A%20panic%20('invalid%20io%20at%20get%20ready%20view')%5Cn%5Ct%5Ct%3A!!%20Z%20.isNothing%20(student)%20%3F%5Cn%20%20%20%20%20%20!!%20(L%20.isDefined%20(io_as_inert%5Cn%20%20%20%20%20%20)%20(io_state%20()))%5Cn%5Ct%5Ct%5Ct%3F%20setup_student_view%5Cn%5Ct%5Ct%5Ct%3A%20!!%20(L%20.isDefined%20(L%20.choice%20(io_as_connecting%2C%20io_as_heartbeat)%5Cn%20%20%20%20%20%20)%20(io_state%20()))%5Cn%20%20%20%20%20%20%3F%20'%E6%AD%A3%E5%9C%A8%E5%8A%A0%E5%85%A5%E9%81%8A%E6%88%B2%E5%AE%A4%E2%80%A6'%5Cn%20%20%20%20%20%20%3A%20panic%20('invalid%20io%20at%20get%20ready%20view')%5Cn%5Ct%5Ct%3A%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20%5B%20%3Croom%3E%20%7B'%E5%B7%B2%E5%8A%A0%E5%85%A5%E9%81%8A%E6%88%B2%E5%AE%A4'%20%2B%20_room%7D%20%3C%2Froom%3E%5Cn%20%20%20%20%20%20%2C%20'%E7%AD%89%E5%80%99%E9%81%8A%E6%88%B2%E9%96%8B%E5%A7%8B%E2%80%A6'%20%5D%5Cn%20%20%20%20%20%20.map%20(_x%20%3D%3E%20%3Cdiv%3E%7B%20_x%20%7D%3C%2Fdiv%3E)%2C%5Cn%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%2C%20%7B%20_room%2C%20_student%20%7D%20%3D%20%7B%20_room%3A%20from_just%20(room)%2C%20_student%3A%20from_just%20(student)%20%7D%20)%3D%3E_))%20%7D%20%3C%2Fget-ready-etc%3E%5Cn%5Cnvar%20playing_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%3Cplaying-etc%3E%5Cn%20%20%20%20%3Cdiv%20class%3D%5C%22left-pane%5C%22%3E%5Cn%20%20%20%20%20%20%3Cticker%3E%7B%20T%20(game_tick)%20(map_defined_%20(%5B%5D)%20(t%20%3D%3E%20time_limit%20-%20t))%20%7D%3C%2Fticker%3E%5Cn%20%20%20%20%20%20%3Cquestion%3E%7B%20_current_question%20%7D%3C%2Fquestion%3E%20%3C%2Fdiv%3E%5Cn%20%20%20%20%3Cdiv%20class%3D%5C%22right-pane%5C%22%3E%5Cn%20%20%20%20%20%20%3Cboard%3E%20%7B%20T%20(_board)%20(Z_%20.map%20(_row%20%3D%3E%20%5Cn%20%20%20%20%20%20%20%20%3Crow%3E%20%7B%20T%20(_row)%20(Z_%20.map%20(_cell%20%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20!!%20(_cell_bingo)%20%3F%20%3Ccell%20x-bingoed%3E%7B%20_cell_choice%20%7D%3C%2Fcell%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3A!!%20(_cell_solved)%20%3F%20%3Ccell%20x-solved%3E%7B%20_cell_choice%20%7D%3C%2Fcell%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3A%20%3Ccell%20fn%3D%7B%20cell_feedback%20(_cell)%20%7D%3E%7B%20_cell_choice%20%7D%3C%2Fcell%3E%2C%5Cn%20%20%20%20%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20_cell_position%20%3D%20T%20(_cell)%20(L%20.get%20(cell_as_position))%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20_cell_choice%20%3D%20T%20(_cell)%20(L%20.get%20(cell_as_choice))%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20_cell_solved%20%3D%20Z%20.elem%20(_cell_position)%20(_solved_positions)%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20_cell_bingo%20%3D%20R%20.any%20(Z%20.elem%20(_cell_position))%20(_bingoed_positions)%20)%3D%3E_)))%5Cn%20%20%20%20%20%20%20%20%20%20%7D%20%3C%2Frow%3E%20))%20%7D%20%3C%2Fboard%3E%20%3C%2Fdiv%3E%20%3C%2Fplaying-etc%3E%2C%5Cn%20%20%20%20where%5Cn%20%20%20%20%2C%20_app%20%3D%20app_state%20()%5Cn%20%20%20%20%2C%20_board%20%3D%20T%20(_app)%20(L%20.get%20(app_as_board))%5Cn%20%20%20%20%2C%20_past%20%3D%20T%20(_app)%20(L%20.get%20(app_as_past))%5Cn%20%20%20%20%2C%20_current_question%20%3D%20T%20(_app)%20(%5B%20current_problem%2C%20L%20.get%20(problem_as_question)%20%5D)%5Cn%20%20%20%20%2C%20_solved_positions%20%3D%20solved_positions%20(_board)%20(_past)%5Cn%20%20%20%20%2C%20_bingoed_positions%20%3D%20bingoed_positions%20(_board)%20(_past)%5Cn%20%20%20%20%2C%20time_limit%20%3D%20T%20(app_state%20())%20(L%20.get%20(%5B%20app_as_settings%2C%20settings_as_time_limit%20%5D))%5Cn%20%20%20%20%2C%20game_tick%20%3D%20just_now%20(game_tick_sampler)%5Cn%20%20%20%20%2C%20cell_feedback%20%3D%20cell%20%3D%3E%20_dom%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3Bclicking%20.forEach%20(click%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%3B_dom%20.addEventListener%20(click%2C%20_%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Bfeedback_state%20(feedback%20.attempt_problem%20(T%20(cell)%20(L%20.get%20(cell_as_position))))%20%7D)%20%7D)%20%7D%20)%3D%3E_)%20%5Cn%5Cnvar%20game_over_view%20%3D%20_%20%3D%3E%20so%20((_%3D_%3D%3E%20so%20((_%3D_%3D%3E%5Cn%5Ct%3Cgame-over-etc%3E%5Cn%20%20%20%20%3Cmessage%3EGame%20Over!%3C%2Fmessage%3E%5Cn%5Ct%5Ct%3Cresult-etc%3E%5Cn%5Ct%5Ct%5Ct%3Ctabs%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cbutton%3E%20Overview%20%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cbutton%3E%20problem%20%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3C%2Ftabs%3E%5Cn%5Ct%5Ct%5Ct%3Ctable%20a-result%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Ctr%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cth%3Eproblem%3C%2Fth%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cth%3EAttempts%3C%2Fth%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cth%3EAvg.%20Time%3C%2Fth%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3C%2Ftr%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Ctr%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Ctd%3E%3C%2Ftd%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Ctd%3E%3C%2Ftd%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Ctd%3E%3C%2Ftd%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3C%2Ftr%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3C%2Ftable%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3C%2Fresult-etc%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3C%2Fgame-over-etc%3E%2C%5Cn%5Ctwhere%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Cn%5Ct%2C%20_app%20%3D%20app_state%20()%5Cn%5Ct%2C%20_ensemble%20%3D%20ensemble_state%20()%5Cn%5Ct%2C%20all_students%20%3D%20T%20(_ensemble)%20(assemble_students%20(_app))%5Cn%5Ct%2C%20questions%20%3D%20T%20(_app)%20(L%20.collect%20(%5B%20app_as_problems%2C%20L%20.elems%2C%20problem_as_question%20%5D))%5Cn%5Ct%2C%20attempts%20%3D%20T%20(_app)%20(%5B%20L%20.collect%20(%5B%20app_as_past%2C%20L%20.elems%2C%20point_as_attempts%20%5D)%2C%20Z_%20.map%20(Z_%20.size)%20%5D)%5Cn%5Ct%2F%2FTODO%3A%20make%20readable%5Cn%5Ct%2F*%2C%20average_time%20%3D%20T%20(_ensemble)%20(%5B%5Cn%5Ct%5Ct%5Ctassemble_students%20(_app)%2C%5Cn%5Ct%5Ct%5CtZ_%20.map%20(%24%20(%5B%5Cn%5Ct%5Ct%5Ct%5CtZ%20.snd%2C%5Cn%5Ct%5Ct%5Ct%5CtL%20.collect%20(%5B%20%5B1%5D%2C%20L%20.elems%2C%20point_as_attempts%2C%20L%20.last%2C%20%5B1%5D%2C%20as_maybe%20%5D)%2C%5Cn%5Ct%5Ct%5Ct%5CtZ%20.map%20(Z%20.of%20(Array))%20%5D))%2C%5Cn%5Ct%5Ct%5Ct_x%20%3D%3E%20Z%20.reduce%20(Z%20.zipWith%20(Z%20.concat))%20(R%20.head%20(_x))%20(R%20.tail%20(_x))%2C%5Cn%5Ct%5Ct%5CtZ%20.map%20(%24%20(%5B%20Z%20.justs%2C%20average%2C%20Z_%20.fromMaybe%20(_%20%3D%3E%20panic%20('average%20time%20fail!'))%20%5D))%20%5D)%20*%2F)%3D%3E_)%2C%5Cn%20%20where%5Cn%5Ct%2C%20average%20%3D%20by%20(list%20%3D%3E%20%24%20(%5B%5Cn%5Ct%5Ct%5CtZ%20.sum%2C%5Cn%5Ct%5Ct%5CtZ%20.div%20(Z%20.size%20(list))%20%5D))%20)%3D%3E_)%5Cn%5Cn%5Cnwindow%20.view%20%3D%20%3Cstudent-app%3E%5Cn%5Ct%7B%20!!%20(L%20.isDefined%20(app_as_get_ready)%20(app_state%20()))%5Cn%5Ct%5Ct%3F%20get_ready_view%5Cn%5Ct%5Ct%3A%20!!%20(L%20.isDefined%20(app_as_playing)%20(app_state%20()))%5Cn%5Ct%5Ct%3F%20playing_view%5Cn%5Ct%5Ct%3A%20!!%20(L%20.isDefined%20(app_as_game_over)%20(app_state%20()))%5Cn%5Ct%5Ct%3F%20game_over_view%5Cn%5Ct%5Ct%3A%20panic%20('undefined%20app%20state%20in%20view')%20%7D%20%3C%2Fstudent-app%3E%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%2F*%5Cnvar%20lookbehind_latency%20%3D%20_%20%3D%3E%20%7B%5Cn%5Ct%5Ctvar%20now%20%3D%20game_clock%20.time%20()%5Cn%5Ct%5Ctvar%20start%20%3D%20T%20(game_clock%20.getLabelTime%20('next'))%5Cn%5Ct%5Ct%5Ct(_x%20%3D%3E%20!!%20(_x%20%3D%3D%3D%20-1)%20%3F%200%20%3A%20_x)%5Cn%5Ct%5Ctreturn%20now%20-%20start%20%7D%5Cn*%2F%5Cn%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%20%5Cn%5Ct%5Ct%5Ct%20%5Cnvar%20setup_room%20%3D%20_room%20%3D%3E%20%7B%3B%5Cn%5Ct%3Bgo%20%5Cn%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ctio_state%20(io%20.connecting)%20%26%26%20api%20(_room)%5Cn%5Ct%5Ct.then%20(panic_on%20(%5B%20%5BZ_%20.equals%20(%7B%7D)%2C%20'empty%20room%3B%20expired%20code%3F'%5D%20%5D))%5Cn%5Ct%5Ct.then%20(%24%20(%5B%5Cn%5Ct%5Ct%5CtL%20.get%20(L%20.inverse%20(data_iso%20(ensemble%20.ensemble)))%2C%5Cn%5Ct%5Ct%5Ct_ensemble%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%5Ctvar%20_settings%20%3D%20T%20(_ensemble)%20(L%20.get%20(ensemble_as_settings))%5Cn%5Ct%5Ct%5Ct%5Ct%3Bapp_state%20(%5Cn%5Ct%5Ct%5Ct%5Ct%5CtT%20(S%20.sample%20(app_state)%5Cn%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%5B%20L%20.set%20(app_as_room)%20(Z_%20.Just%20(_room))%5Cn%20%20%20%20%20%20%20%20%20%20%2C%20L%20.set%20(app_as_settings)%20(Z_%20.Just%20(_settings))%20%5D))%20%7D%20%5D))%20)%5Cn%5Ct%5Ct.catch%20(_e%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3Blookbehind_state%20(lookbehind%20.bad_room%20(_room))%5Cn%5Ct%5Ct%5Ct%3Bconsole%20.error%20(_e)%20%7D)%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3Bio_state%20(io%20.inert)%20%7D)%20%7D%5Cn%5Cnvar%20setup_student%20%3D%20_name%20%3D%3E%20%7B%3B%5Cn%20%20%3Bapp_state%20(%5Cn%20%20%20%20T%20(S%20.sample%20(app_state)%5Cn%20%20%20%20)%20(%5Cn%20%20%20%20L%20.set%20(app_as_student)%20(Z_%20.Just%20(%5B%20uuid%20()%2C%20_name%20%5D))%20))%20%7D%20%5Cn%5Cnvar%20connect_room%20%3D%20_%20%3D%3E%20%7B%3B%5Cn%5Ct%3BT%20(S%20.sample%20(app_state)%5Cn%20%20)%20(%5Cn%5Ctunder%20(%5Cn%20%20%20%20complete_%20(%7B%5Cn%20%20%20%20%20%20_student%3A%20app_as_student%2C%5Cn%20%20%20%20%20%20_room%3A%20app_as_room%20%7D)%5Cn%20%20)%20((%7B%20_student%2C%20_room%20%7D)%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ctvar%20latest_settings%5Cn%5Ct%5Ct%3Breturn%20go%20%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ct%5Ctio_state%20(io%20.connecting)%20%26%26%20api%20(_room)%5Cn%20%20%20%20%20%20.then%20(panic_on%20(%5B%20%5BZ%20.equals%20(%7B%7D)%2C%20'empty%20room%3B%20expired%20code%3F'%5D%20%5D))%5Cn%5Ct%5Ct%5Ct.then%20(%24%20(%5B%5Cn%5Ct%5Ct%5Ct%5Ct%20L%20.get%20(L%20.inverse%20(data_iso%20(ensemble%20.ensemble)))%2C%5Cn%5Ct%5Ct%5Ct%5Ct%20_ensemble%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%3Blatest_settings%20%3D%20T%20(_ensemble)%20(L%20.get%20(ensemble_as_settings))%20%7D%20%5D))%20)%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ct%5Ctapi%20(_room%2C%20post%20(message_encoding%20(%5Cn%5Ct%5Ct%5Ct%5Ctmessage%20.student_ping%20(_student%2C%20%5B0%2C%200%2C%200%5D)%20)))%5Cn%5Ct%5Ct%5Ct.then%20(panic_on%20(%5B%20%5B_x%20%3D%3E%20!%20_x%20.ok%2C%20'not%20ok'%5D%20%5D))%20)%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%3B%20%5Cn%20%20%20%20%20%20%3Bapp_state%20(%5Cn%20%20%20%20%20%20%20%20T%20(S%20.sample%20(app_state)%5Cn%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20L%20.set%20(app_as_settings)%20(Z_%20.Just%20(latest_settings))%20))%20%20%7D)%5Cn%5Ct%5Ct.catch%20(_e%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3Blookbehind_state%20(lookbehind%20.bad_room%20(_room))%5Cn%5Ct%5Ct%5Ct%3Bconsole%20.error%20(_e)%20%7D)%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3Bio_state%20(io%20.inert)%20%7D)%20%7D))%20%7D%5Cn%5Cnvar%20attempt_problem%20%3D%20_position%20%3D%3E%20%7B%3B%5Cn%5CtT%20(S%20.sample%20(app_state))%20(%5Cn%20%20%20%20under%20(complete_%20(%5Cn%20%20%20%20%20%20%7B%20_problem%3A%20current_problem%5Cn%20%20%20%20%20%20%2C%20_board%3A%20app_as_board%5Cn%20%20%20%20%20%20%2C%20_point%3A%20app_as_last_point%20%7D%20)%5Cn%20%20%20%20)%20((%7B%20_problem%2C%20_board%2C%20_point%20%7D)%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20var%20board_choice%20%3D%20_board%20%3D%3E%20_position%20%3D%3E%5Cn%5Ct%5Ct%5Ct%20%20T%20(_board)%20(L%20.get%20(%5B%20as_position%20(_position)%2C%20cell_as_choice%20%5D))%5Cn%20%20%20%20%20%20%20%20%5Cn%20%20%20%20%20%20var%20_completed%20%3D%20under%20(point_as_position)%20(%24%20(%5B%20board_choice%20(_board)%2C%20problem_choice_matches%20(_problem)%20%5D))%20(_point)%20%7C%7C%20false%20%5Cn%20%20%20%20%20%20if%20(Z%20.not%20(_completed))%20%7B%5Cn%20%20%20%20%20%20%20%20var%20_choice%20%3D%20board_choice%20(_board)%20(_position)%5Cn%20%20%20%20%20%20%20%20if%20(!%20L%20.get%20(lookbehind_blocked)%20(S%20.sample%20(lookbehind_state)))%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20var%20latency%20%3D%20game_clock%20.time%20()%20%2F%2Flookbehind_latency%20()%5Cn%20%20%20%20%20%20%20%20%20%20%3Bapp_state%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20T%20(S%20.sample%20(app_state)%5Cn%20%20%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%24%20(L%20.set%5Cn%20%20%20%20%20%20%20%20%20%20%20%20)%20(%5Bapp_as_last_point%2C%20point_as_attempts%2C%20L%20.appendTo%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20)%20(%5B_position%2C%20latency%5D)%20))%5Cn%20%20%20%20%20%20%20%20%20%20if%20(Z%20.not%20(problem_choice_matches%20(_problem)%20(_choice)))%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Blookbehind_state%20(lookbehind%20.attempting%20(latency%2C%20true))%20%7D%20%7D%20%7D%20%7D))%20%7D%5Cn%5Cnvar%20timesup_problem%20%3D%20_%20%3D%3E%20%7B%3B%5Cn%5Ct%3Bapp_state%20(%5Cn%20%20%20%20student_app_playing_to_next%20(S%20.sample%20(app_state)))%20%7D%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cnvar%20game_clock%20%3D%20new%20TimelineMax%5Cnvar%20game_tick_sampler%20%3D%20temporal%20()%5Cn%5Cn%5Cnvar%20reping_period%20%3D%203%5Cnvar%20heartbeat%20%3D%20S%20.data%20(reping_period)%20%5Cn%5Cnvar%20connection%20%3D%20S%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%3Breturn%20T%20(app_state%20()%5Cn%20%20%20%20)%20(under%20(app_as_room%5Cn%20%20%20%20)%20(_room%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ctif%20(!%20connection%20%5B_room%5D)%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bconnection%20%5B_room%5D%20%3D%20S%20.data%20()%5Cn%5Ct%5Ct%5Ct%5Ct%3Bapi%20.listen_ping%20(_room)%20(connection%20%5B_room%5D)%20%7D%5Cn%5Ct%5Ct%5Ctreturn%20connection%20%5B_room%5D%20()%20%26%26%20so%20((_%3D_%3D%3E%5Cn%5Ct%5Ct%5Ct%5B%20timestamp%2C%20mean%2C%20Math%20.sqrt%20(variance)%20%5D%2C%5Cn%5Ct%5Ct%5Ctwhere%5Cn%5Ct%5Ct%5Ct%2C%20%5B%20mean%2C%20variance%2C%20n%2C%20timestamp%20%5D%20%3D%20connection%20%5B_room%5D%20()%20)%3D%3E_)%20%7D))%20%7D)%5Cn%5Cn%5Cn%5Cn%5CnS%20(_%20%3D%3E%20%7B%3B%5Cn%20%20%3Bso%20((%5Cn%20%20take%5Cn%20%20%2C%20cases%20%3D%20%5Cn%20%20%20%20%20%20%5B%20%5B%20feedback_setup_room%5Cn%20%20%20%20%20%20%20%20%2C%20(%7B%20room%3A%20_room%20%7D)%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Bsetup_room%20(_room)%20%7D%20%5D%5Cn%20%20%20%20%20%20%2C%20%5B%20feedback_setup_student%5Cn%20%20%20%20%20%20%20%20%2C%20(%7B%20name%3A%20_name%20%7D)%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Bgo%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%20(_%20%3D%3E%20setup_student%20(_name))%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%20(_%20%3D%3E%20connect_room%20())%20%7D%20%5D%5Cn%20%20%20%20%20%20%2C%20%5B%20feedback_attempt_problem%5Cn%20%20%20%20%20%20%20%20%2C%20(%7B%20position%3A%20_position%20%7D)%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Battempt_problem%20(_position)%20%7D%20%5D%20%5D%20)%3D%3E%5Cn%20%20so%20((_%3D_%3D%3E%5Cn%20%20T%20(just_now%20(feedback_state)%5Cn%20%20)%20(%5Cn%20%20action)%2C%5Cn%20%20where%5Cn%20%20%2C%20action%20%3D%20%5Cn%20%20%20%20%20%20Z_%20.flip%20(T%20(cases)%20(Z_%20.map%20(_case%20%3D%3E%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20%20%20_feedback%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%20%20var%20result%20%3D%20L%20.get%20(predicate)%20(_feedback)%5Cn%20%20%20%20%20%20%20%20%20%20if%20(result)%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3Baction%20(result)%20%7D%20%7D%2C%5Cn%20%20%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%20%20%2C%20predicate%20%3D%20_case%20%5B0%5D%5Cn%20%20%20%20%20%20%20%20%2C%20action%20%3D%20_case%20%5B1%5D%20)%3D%3E_)%20)))%20)%3D%3E_))%20%7D)%5Cn%5Cn%5Cn%5Cn%5Cn%5CnS%20(_%20%3D%3E%20%7B%3B%5Cn%5Ctif%20(L%20.isDefined%20(lookbehind_bad_room)%20(lookbehind_state%20()))%20%7B%5Cn%5Ct%5Ct%3Bvar%20forget%20%3D%20setTimeout%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3Blookbehind_state%20(lookbehind%20.nothing)%20%7D%5Cn%5Ct%5Ct%2C%201500)%5Cn%5Ct%5Ct%3BS%20.cleanup%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3BclearTimeout%20(forget)%20%7D)%20%7D%20%7D)%5CnS%20(last_app%20%3D%3E%20%7B%3B%5Cn%5Ctif%20(!%20L%20.isDefined%20(app_as_room)%20(last_app))%20%7B%5Cn%5Ct%5Ctif%20(L%20.isDefined%20(app_as_room)%20(app_state%20()))%20%7B%5Cn%5Ct%5Ct%5Ct%3Blookbehind_state%20(lookbehind%20.nothing)%20%7D%20%7D%5Cn%5Ctreturn%20app_state%20()%20%7D%5Cn%2C%20app_state%20())%5CnS%20(last_app%20%3D%3E%20%7B%3B%5Cn%5Ctvar%20last_progress%20%3D%20T%20(last_app)%20(L%20.get%20(app_as_progress))%5Cn%5Ctvar%20progress%20%3D%20T%20(app_state%20())%20(L%20.get%20(app_as_progress))%5Cn%5Ctif%20(L%20.isDefined%20(app_as_playing)%20(app_state%20()))%20%7B%5Cn%5Ct%5Ctif%20(last_progress%20!%3D%3D%20undefined%20%26%26%20progress%20!%3D%3D%20undefined%20%26%26%20Z%20.not%20(Z%20.equals%20(last_progress)%20(progress)))%20%7B%5Cn%5Ct%5Ct%5Ct%3Blookbehind_state%20(lookbehind%20.attempting%20(0%2C%20false))%20%7D%20%7D%5Cn%5Ctreturn%20app_state%20()%20%7D%5Cn%2C%20app_state%20())%5CnS%20(_%20%3D%3E%20%7B%3B%5Cn%5Ctif%20(L%20.get%20(lookbehind_blocked)%20(lookbehind_state%20()))%20%7B%5Cn%5Ct%5Ct%3Bvar%20forget%20%3D%20setTimeout%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ctvar%20_since%20%3D%20T%20(lookbehind_state%20())%20(L%20.get%20(lookbehind_since))%5Cn%5Ct%5Ct%5Ct%3Blookbehind_state%20(lookbehind%20.attempting%20(_since%2C%20false))%20%7D%5Cn%5Ct%5Ct%2C%203000)%5Cn%5Ct%5Ct%3BS%20.cleanup%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3BclearTimeout%20(forget)%20%7D)%20%7D%20%7D)%5Cn%5Cn%5CnS%20(_%20%3D%3E%20%7B%3B%5Cn%5Ctif%20(L%20.isDefined%20(app_as_get_ready)%20(app_state%20()))%20%7B%5Cn%5Ct%5Ct%3Bgame_clock%20.pause%20()%20%7D%20%7D)%5CnS%20(last_state%20%3D%3E%20%7B%3B%5Cn%5Ctvar%20last_progress%20%3D%20T%20(last_state)%20(L%20.get%20(app_as_progress))%5Cn%5Ctvar%20progress%20%3D%20T%20(app_state%20())%20(L%20.get%20(app_as_progress))%5Cn%5Ctif%20(L%20.isDefined%20(app_as_playing)%20(app_state%20()))%20%7B%5Cn%5Ct%5Ctif%20(progress%20!%3D%3D%20undefined%20%26%26%20Z%20.not%20(Z%20.equals%20(last_progress)%20(progress)))%20%7B%5Cn%5Ct%5Ct%5Ct%3Bgame_clock%20.seek%20(0)%20%7D%5Cn%5Ct%5Ct%3Bgame_clock%20.play%20()%20%7D%5Cn%5Ctreturn%20app_state%20()%20%7D%5Cn%2C%20app_state%20())%5CnS%20(_%20%3D%3E%20%7B%3B%5Cn%5Ctif%20(L%20.isDefined%20(app_as_game_over)%20(app_state%20()))%20%7B%5Cn%5Ct%5Ct%3Bgame_clock%20.pause%20()%20%7D%20%7D)%5Cn%5Cn%5CnS%20(last_ensemble%20%3D%3E%20%7B%3B%5Cn%5Ct%3Bso%20((%5Cn%5Cttake%5Cn%5Ct%2C%20_app%20%3D%20S%20.sample%20(app_state)%5Cn%5Ct%2C%20_ensemble%20%3D%20ensemble_state%20()%20)%20%3D%3E%20%7B%3B%5Cn%5Ctif%20(L%20.isDefined%20(app_as_get_ready)%20(_app))%20%7B%20%2F%2Fc%20change%20unready%20get%20readies%20to%20setup%20state%3F%5Cn%5Ct%5Ctif%20(!%20L%20.isDefined%20(ensemble_as_start)%20(last_ensemble))%20%7B%5Cn%5Ct%5Ct%5Ctif%20(L%20.isDefined%20(ensemble_as_start)%20(_ensemble))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ctvar%20start%20%3D%20T%20(_ensemble)%20(L%20.get%20(ensemble_as_start))%5Cn%5Ct%5Ct%5Ct%5Ctvar%20now%20%3D%20(new%20Date)%20.getTime%20()%5Cn%5Cn%5Ct%5Ct%5Ct%5Ctvar%20playing_app%20%3D%20student_app_get_ready_to_playing%20(_app)%5Cn%20%20%20%20%20%20%20%20%5Cn%20%20%20%20%20%20%20%20var%20time_limit%20%3D%20T%20(playing_app)%20(L%20.get%20(%5B%20app_as_settings%2C%20settings_as_time_limit%20%5D))%5Cn%20%20%20%20%20%20%20%20game_clock%20.clear%20()%5Cn%20%20%20%20%20%20%20%20%3Bgame_clock%20.add%20(timesup_problem%2C%20time_limit)%5Cn%20%20%20%20%20%20%20%20%3BT%20(Z%20.range%20(0)%20(time_limit%20%2B%201))%20(R%20.forEach%20(t%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%3Bgame_clock%20.add%20(_%20%3D%3E%20%7B%3Bgame_tick_sampler%20(t)%7D%2C%20t)%20%7D))%5Cn%20%20%20%20%20%20%20%20%5Cn%5Ct%5Ct%5Ct%5Ctif%20(start%20%3E%20now)%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bapp_state%20(playing_app)%20%7D%5Cn%5Ct%5Ct%5Ct%5Ctelse%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3BsetTimeout%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3Bapp_state%20(playing_app)%20%7D%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%2C%20start%20-%20now)%20%7D%5Cn%5Cn%5Ct%5Ct%5Ct%5Ctvar%20_room%20%3D%20T%20(_app)%20(L%20.get%20(app_as_room))%5Cn%5Ct%5Ct%5Ct%5Ctvar%20_student%20%3D%20T%20(_app)%20(L%20.get%20(app_as_student))%5Cn%5Ct%5Ct%5Ct%5Ct%3Bio_state%20(io%20.messaging)%20%26%26%20api%20(_room%2C%20post%20(%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctmessage_encoding%20(%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ctmessage%20.student_start%20(_student%2C%20start))))%5Cn%5Ct%5Ct%5Ct%5Ct.catch%20(_e%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bconsole%20.error%20(_e)%20%7D)%5Cn%5Ct%5Ct%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Bio_state%20(io%20.inert)%20%7D)%20%7D%20%7D%20%7D%20%7D)%5Cn%5Ctreturn%20ensemble_state%20()%20%7D%5Cn%2C%20ensemble_state%20())%5Cn%5Cn%2F%2FTODO%20make%20implementation%20more%20sophisticated%5CnS%20(last_ensemble%20%3D%3E%20%7B%3B%5Cn%5Ct%3Bso%20((%5Cn%5Cttake%5Cn%5Ct%2C%20_app%20%3D%20S%20.sample%20(app_state)%5Cn%5Ct%2C%20_ensemble%20%3D%20ensemble_state%20()%20)%20%3D%3E%20%7B%3B%5Cn%5Ctif%20(L%20.isDefined%20(app_as_playing)%20(_app))%20%7B%5Cn%5Ct%5Ctif%20(!%20L%20.isDefined%20(ensemble_as_end)%20(last_ensemble))%20%7B%5Cn%5Ct%5Ct%5Ctif%20(L%20.isDefined%20(ensemble_as_end)%20(_ensemble))%20%7B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bapp_state%20(%5Cn%20%20%20%20%20%20%20%20%20%20T%20(_app)%20(student_app_playing_to_game_over))%20%7D%20%7D%20%7D%20%7D)%5Cn%5Ctreturn%20ensemble_state%20()%20%7D%5Cn%2C%20ensemble_state%20())%5Cn%5Cn%5CnS%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%3BT%20(app_state%20()%5Cn%20%20)%20(%5Cn%20%20under%20(%5Cn%20%20%20%20complete_%20(%7B%5Cn%20%20%20%20%20%20_student%3A%20app_as_student%2C%5Cn%20%20%20%20%20%20_room%3A%20app_as_room%20%7D)%5Cn%5Ct)%20((%7B%20_student%2C%20_room%20%7D)%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ctvar%20phase%20%3D%20heartbeat%20()%5Cn%5Ct%5Ctvar%20critical%20%3D%20phase%20%3D%3D%3D%201%5Cn%5Ct%5Ctgo%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%5Cn%5Ct%5Ct%5Ct!!%20critical%20%26%26%20S%20.sample%20(connection)%5Cn%5Ct%5Ct%5Ct%3F%20so%20((_%3D_%3D%3E%5Cn%20%20%20%20%20%20%20%20io_state%20(io%20.messaging)%20%26%26%20api%20(_room%2C%20%5Cn%20%20%20%20%20%20%20%20%20%20post%20(messages_encoding%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20!!%20not_playing%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3F%20%5B%20message%20.student_ping%20(_student%2C%20S%20.sample%20(connection))%20%5D%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3A%20%5B%20message%20.student_ping%20(_student%2C%20S%20.sample%20(connection))%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%2C%20message%20.student_join%20(_student%2C%20_board)%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%2C%20message%20.student_update%20(_student%2C%20_past)%20%5D)))%2C%5Cn%20%20%20%20%20%20%20%20where%5Cn%20%20%20%20%20%20%20%20%2C%20%7B%20_board%2C%20_past%2C%20not_playing%20%7D%20%3D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20T%20(app_state%20()%5Cn%20%20%20%20%20%20%20%20%20%20%20%20)%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20L%20.get%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5B%20complete_%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%20_board%3A%20app_as_board%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C%20_past%3A%20app_as_past%20%7D)%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%2C%20L%20.valueOr%20(%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%20not_playing%3A%20'not%20playing'%20%7D)%20%5D))%20)%3D%3E_)%5Cn%5Ct%5Ct%5Ct%3A%20io_state%20(io%20.heartbeat)%20%26%26%20api%20(_room)%5Cn%5Ct%5Ct%5Ct%5Ct.then%20(%24%20(%5B%5Cn%5Ct%5Ct%5Ct%5Ct%5CtL%20.get%20(L%20.inverse%20(data_iso%20(ensemble%20.ensemble)))%2C%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct_x%20%3D%3E%20%7B%3Bensemble_state%20(_x)%7D%20%5D))%20)%5Cn%20%20%20%20.catch%20(_x%20%3D%3E%20%7B%3B%5Cn%20%20%20%20%20%20if%20(Z_%20.equals%20(L%20.get%20('error')%20(_x))%20('timeout'))%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3Bconsole%20.warn%20('Room%20timed%20out')%20%7D%5Cn%20%20%20%20%20%20else%20%7B%3B%5Cn%20%20%20%20%20%20%20%20%3Bthrow%20_x%20%7D%7D)%5Cn%20%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3BsetTimeout%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bheartbeat%20(!!%20critical%20%3F%20reping_period%20%3A%20phase%20-%201)%20%7D%5Cn%5Ct%5Ct%5Ct%2C%20300)%20%7D)%5Cn%5Ct%5Ct.catch%20(_e%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3Bconsole%20.error%20(_e)%5Cn%5Ct%5Ct%5Ct%3BsetTimeout%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%5Ct%3Bheartbeat%20(phase)%20%7D%5Cn%5Ct%5Ct%5Ct%2C%20300)%20%7D)%5Cn%5Ct%5Ct.then%20(_%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ct%5Ct%3Bio_state%20(io%20.inert)%20%7D)%20%7D))%20%7D)%5Cn%22%5D%2C%22names%22%3A%5B%5D%2C%22mappings%22%3A%22AAAA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CEAAE%3B%3B%3B%3B%3B%3B%3B%3BkCAGe%3B%3B%3B%3B%3ByCAKG%3B%3B%3B%3B%3B%3ByBACwB%3B%3BIAJtC%2CqEAAC%3BAACP%2CUAAU%3B%3B%3B%3B%3BIAAgB%2CqEAAC%3B%3BIAAqB%3BAAChD%3BIAPkB%2C8CAAI%3B%3BIAS%2BD%3BAACrF%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CEAAE%3B%3B%3B%3B%3B%3B%3B%3BkCAGe%3B%3B%3B%3B%3B%3B%3B%3B%3ByBAG8B%3B%3BIAN1B%2C8CAAI%3B%3BIAMqE%3BAAC9F%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CqBAAqB%3B%3B%3B%3B%3BIACpB%2CqEAAC%3BAACF%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CQAAQ%3B%3B%3B%3B%3B%3BIAAO%2CqEAAC%3B%3BIAAyB%3BAACzC%3BAACA%2CkBAAkB%3B%3B%3BwBAAM%3B%3BIAAW%3BAACnC%3BAACA%3B%3BIAAkH%3BAAClH%3BAACA%3BAACA%2CEAAE%3B%3B%3B%3B%3B%3BsCAGe%3B%3B%3B%3B%3B%3B%3B%3B%3BIADH%2C%2BEAAC%3BIAGD%2CqEAAC%3BAACf%2CQAAQ%3B%3B%3B%3B%3B%3BIAAM%2CqEAAC%3BAACf%3BAACA%2C6BAA6B%3B%3B%3B%3BwBAAiB%3B%3BIAAsB%3BAACpE%2C%2BBAA%2BB%3B%3B%3B%3BwBAAgB%3B%3BIAAsB%3BAACrE%2CYAAY%3B%3B%3BwBAAoC%3BIAA9B%2C8CAAI%3B%3BIAAgD%3BAACtE%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3B%3BIAAkB%3B%3BIAAoC%3BAACtD%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CCAAC%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3BIAoBoB%3BAACrB%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CeAAe%3B%3B%3B%3B%3BIACd%2CqEAAC%3BAACF%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3B%3BIAA0D%3BAAC1D%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%22%7D
