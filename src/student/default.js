var { T, $, apply, L, R, S, Z, Z_, Z$, sanc, memoize, 
so, by, and_by, under,
go, never, panic, panic_on,
just_now, temporal,
fiat, data, data_lens, data_iso, data_kind,
focused_iso_,
n_reducer, 
map_defined_, map_defined, from_just, maybe_all,
as_sole, sole, every, delay,
bool, number, timestamp, string,
list, map, maybe, nat, id, v, piece,
shuffle, uuid, map_zip, api, post,
timer, timer_since, time_intervals, 
avatar, student, problem, choice, answer, latency, ping, position,
attempt, point, past, board, win_rule, rules, settings,
teacher_app, student_app,
io, message, ensemble, 
default_problems, default_rules, default_settings,
pair_as_v, pair_as_list, pair_as_first, pair_as_second,
list_as_pair, map_as_keys, map_as_values, as_value_of,
as_maybe, as_defined, as_complete, complete_,
app_as_setup, app_as_get_ready, app_as_playing, app_as_game_over, app_as_progress,
settings_as_problems, settings_as_rules,
settings_as_size, settings_as_time_limit, settings_as_win_rule,
io_as_inert, io_as_connecting, io_as_heartbeat,
ensemble_as_ping, ensemble_as_settings, ensemble_as_progress, 
ensemble_as_pings, ensemble_as_progresses, ensemble_as_boards, ensemble_as_pasts,
progress_as_step, progress_as_timestamp, 
attempt_as_position, attempt_as_latency, point_as_attempts, point_as_position, past_as_points,
app_as_settings, app_as_student, app_as_students, app_as_room, app_as_problems,
app_as_board, app_as_past, app_as_progress,
app_as_boards, app_as_pasts, app_as_progresses,
app_as_last_point, point_as_attempts,
avatar_as_lion, avatar_as_bunny, 
student_as_student, student_as_id, student_as_name, student_as_icon, 
rules_as_size, rules_as_time_limit, settings_as_size, settings_as_time_limit,
problem_as_question, problem_as_answers,
cell_as_position, as_position, cell_as_choice, 
message_encoding, messages_encoding, schedule_start,
teacher_app_get_ready_to_playing, teacher_app_playing_to_next, teacher_app_playing_to_game_over,
student_app_get_ready_to_playing, student_app_playing_to_next, student_app_playing_to_game_over,
current_problem, problem_choice_matches,
attempted_positions, solved_positions, bingoed_positions, bingoes
} = window .stuff


var feedback = data ({
  setup_room: (room =~ room) => feedback,
  setting_up_student: (icon =~ avatar) => feedback,
  setup_student: (icon =~ avatar, name =~ string) => feedback,
  attempt_problem: (position =~ position) => feedback })

var lookbehind = data ({
	nothing: () => lookbehind,
	bad_room: (room =~ room) => lookbehind,
	attempting: (since =~ latency, blocked =~ bool) => lookbehind })


var feedback_as_setup_room = data_iso (feedback .setup_room)
var feedback_as_setting_up_student = data_iso (feedback .setting_up_student)
var feedback_as_setup_student = data_iso (feedback .setup_student)
var feedback_as_attempt_problem = data_iso (feedback .attempt_problem)

var feedback_as_icon = data_iso (feedback .setting_up_student) .icon

var lookbehind_as_nothing = data_iso (lookbehind .nothing)
var lookbehind_as_bad_room = data_iso (lookbehind .bad_room)
var lookbehind_as_attempting = data_iso (lookbehind .attempting)

var lookbehind_as_room = data_lens (lookbehind .bad_room) .room
var lookbehind_as_since = data_lens (lookbehind .attempting) .since
var lookbehind_as_blocked = data_lens (lookbehind .attempting) .blocked






var app_state = S .data (student_app .get_ready (Z .Nothing, Z .Nothing, Z .Nothing))
 
var io_state = S .data (io .inert)
var ensemble_state = S .data (undefined)

var feedback_state = temporal ()
var lookbehind_state = S .data (lookbehind .nothing)








 
var clicking = ['click']


var setup_room_view = _ => so ((_=_=>
  <setup-room-etc fn={ setup_room_feedback }>
    <a-title>Bingo</a-title>
    <sub-title>除法（一）</sub-title>
    <room style={{ margin: '30px 0' }}>
      <label>遊戲室編號：</label>
      { !! L .isDefined (lookbehind_as_bad_room) (lookbehind_state ())
        ? <message>不能連接遊戲室{ bad_room }</message>
        : [] }
      <input style={{ margin: { top: '10px' } }} /> </room>
    <button x-custom x-for="join"><img src={ join_img } /></button> </setup-room-etc>,
  where
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
  <setup-student-etc fn={ setup_student_feedback }>
    <a-title>Bingo</a-title>
    <sub-title>除法（一）</sub-title>
    <name style={{ marginTop: '30px' }}>
      <label>名稱</label>
      <input /> </name>
    <icon style={{ marginBottom: '30px' }}>
      <avatar x-for="lion" x-selected={ T (_icon) (L .isDefined (avatar_as_lion)) }>
        <selected-input />
        <img src={ lion_avatar_img } /> </avatar>
      <avatar x-for="bunny" x-selected={ T (_icon) (L .isDefined (avatar_as_bunny)) }>
        <selected-input />
        <img src={ bunny_avatar_img } /> </avatar> </icon> 
    { !! L .isDefined (feedback_as_setting_up_student) (_feedback)
      ? <button x-custom x-for="connect"><img src={ connect_img } /></button>
      : [] } </setup-student-etc>,
  where
  , _feedback = just_now (feedback_state) 
  , _icon = T (_feedback) (L .get ([ feedback_as_icon ]))
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


var get_ready_view = <get-ready-etc>
	{ so ((
		take
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
		: so ((_=_=>
      [ <room> {'已加入遊戲室' + _room} </room>
      , '等候遊戲開始…' ]
      .map (_x => <div>{ _x }</div>),
      where
      , { _room, _student } = { _room: from_just (room), _student: from_just (student) } )=>_)) } </get-ready-etc>

var playing_view = _ => so ((_=_=>
  <playing-etc>
    <div class="left-pane">
      <ticker-etc>
        { T (game_tick) (map_defined_ ([]) (t => time_limit - t)) }
        <ticker z-identity={ _progress } style={{ animationDuration: _time_limit + 's' }}><spinner/></ticker> </ticker-etc>
      <question>{ _current_question }</question> </div>
    <div class="right-pane">
      <board> { T (_board) (Z_ .map (_row => 
        <row> { T (_row) (Z_ .map (_cell =>
          so ((_=_=>
          !! (_cell_bingo) ? <cell x-bingoed>{ _cell_choice }</cell>
          :!! (_cell_solved) ? <cell x-solved>{ _cell_choice }</cell>
          : <cell fn={ cell_feedback (_cell) }>{ _cell_choice }</cell>,
          where
          , _cell_position = T (_cell) (L .get (cell_as_position))
          , _cell_choice = T (_cell) (L .get (cell_as_choice))
          , _cell_solved = Z_ .elem (_cell_position) (_solved_positions)
          , _cell_bingo = Z_ .elem (_cell_position) (_bingoed_positions) )=>_)))
          } </row> )) } </board> </div> </playing-etc>,
    where
    , _app = app_state ()
    , _board = T (_app) (L .get (app_as_board))
    , _past = T (_app) (L .get (app_as_past))
    , _progress = T (_app) (L .get (app_as_progress))
    , _time_limit = T (_app) (L .get ([ app_as_settings, settings_as_time_limit ]))
    , _current_question = T (_app) ([ current_problem, L .get (problem_as_question) ])
    , _solved_positions = solved_positions (_board) (_past)
    , _bingoed_positions = bingoed_positions (_board) (_past)
    , time_limit = T (_app) (L .get ([ app_as_settings, settings_as_time_limit ]))
    , game_tick = tick_state ()
    , cell_feedback = cell => _dom => {;
        ;clicking .forEach (click => {;
          ;_dom .addEventListener (click, _ => {;
            ;feedback_state (feedback .attempt_problem (T (cell) (L .get (cell_as_position)))) }) }) } )=>_) 

var game_over_view = _ => so ((_=_=> so ((_=_=>
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
			Z_ .sum,
			Z_ .div (Z_ .size (list)) ])) )=>_)


window .view = <student-app>
	{ !! (L .isDefined (app_as_get_ready) (app_state ()))
		? get_ready_view
		: !! (L .isDefined (app_as_playing) (app_state ()))
		? playing_view
		: !! (L .isDefined (app_as_game_over) (app_state ()))
		? game_over_view
		: panic ('undefined app state in view') } </student-app>













			 
			 
			 
			 
			 
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

var setup_student = _icon => _name => {;
  ;app_state (
    T (S .sample (app_state)
    ) (
    L .set (app_as_student) (Z_ .Just (student .student (uuid (), _name, _icon))) )) } 

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
            var correct_audio = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudent-correct.mp3?1546277231570'
            ;(new Audio (correct_audio)) .play () }
          else {
            var incorrect_audio = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudent-incorrect.mp3?1546277231539'
            ;(new Audio (incorrect_audio)) .play ()
            ;lookbehind_state (lookbehind .attempting (latency, true)) } } } })) }

var timesup_problem = _ => {;
	;app_state (
    student_app_playing_to_next (S .sample (app_state))) }










var [ time_state, flowing_state ] = timer ()
//var time_interval = time_intervals (time_state)
var tick_state = S .subclock (_ => {;
  var _ticker = S .value ()
  S (_ => {;
    var _app = app_state ()
    if (L .isDefined (app_as_progress) (_app)) {
      var _progress_timestamp = T (_app) (L .isDefined ([ app_as_progress, progress_as_timestamp ]))
      var _tick = Math .floor ((time_state () - _progress_timestamp) / 1000)
      ;_ticker (_tick) } })
  return _ticker })
				
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


;S (_ => {;
	if (L .isDefined (app_as_get_ready) (app_state ())) {
		;flowing_state (false) }
	else if (L .isDefined (app_as_playing) (app_state ())) {
		;flowing_state (true) }
	else if (L .isDefined (app_as_game_over) (app_state ())) {
		;flowing_state (false) } })


S (last_ensemble => {;
	var _app = S .sample (app_state)
	var _ensemble = ensemble_state ()
  
  var _app_progress = T (_app) (L .get (app_as_progress))
  var _ensemble_progress = T (_ensemble) (L .get (ensemble_as_progress))
  
	if (L .isDefined (app_as_get_ready) (_app)) { //c change unready get readies to setup state?
		if (! L .isDefined (ensemble_as_progress) (last_ensemble)) {
			if (L .isDefined (ensemble_as_progress) (_ensemble)) {
				;app_state (
          T (_app
          ) (
          [ student_app_get_ready_to_playing
          , L .set (app_as_progress) (_ensemble_progress) ])) } } } 
  else if (L .isDefined (app_as_playing) (_app)) {
    var _ensemble_progress_step = T (_ensemble_progress) (L .get (progress_as_step))
    if (_ensemble_progress_step !== -1) {
      if (Z_ .not (Z_ .equals (_app_progress) (_ensemble_progress))) {
        ;app_state (
          T (_app
          ) (
          L .set (app_as_progress) (_ensemble_progress))) }
    else {
      ;app_state (
        T (_app
        ) (
        student_app_playing_to_game_over)) } } }
	return _ensemble })


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
        ;app_state (
          T (_app
          ) (
          L .set (app_as_progress) (_progress) )) }
      else {
        ;app_state (
          T (_app
          ) (
          student_app_playing_to_game_over)) } } } })


				var _room = T (_app) (L .get (app_as_room))
				var _student = T (_app) (L .get (app_as_student))
				;io_state (io .messaging) && api (_room, post (
					message_encoding (
						message .student_progress (_student, start))))
				.catch (_e => {;
					;console .error (_e) })
				.then (_ => {;
					;io_state (io .inert) }) 