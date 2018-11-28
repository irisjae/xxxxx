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
teacher_app_get_ready_to_playing, teacher_app_playing_to_game_over,
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
  <setup-room-etc fn={ setup_room_feedback }>
    <a-title>Bingo</a-title>
    <sub-title>除法（一）</sub-title>
    <room style={{ margin: '30px 0' }}>
      <label>遊戲室編號：</label>
      { !! L .isDefined (lookbehind_bad_room) (lookbehind_state ())
        ? <message>不能連接遊戲室{ bad_room }</message>
        : [] }
      <input placeholder="Enter a room code" /></room>
    <button x-custom="true" x-for="join"><img src={ join_img } /></button></setup-room-etc>,
  where
  , join_img = '"https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fjoin.png?1543381404734"'
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
  <setup-student-etc>
    <name fn={ setup_student_feedback } >
      <input placeholder="Enter your name" />
      <button> Go </button> </name> </setup-student-etc>,
  where
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


var get_ready_view = <get-ready-etc>
	{ so ((
		take
		, room = T (app_state ()) (L .get ([ app_as_room, as_maybe ]))
		, student = T (app_state ()) (L .get ([ app_as_student, as_maybe ])) ) =>
		!! Z .isNothing (room) ?
      !! (L .isDefined (io_as_inert
      ) (io_state ()))
			? setup_room_view
			: !! (L .isDefined (L .choice (io_as_connecting, io_as_heartbeat)
      ) (io_state ()))
      ? 'Finding room...'
      : panic ('invalid io at get ready view')
		:!! Z .isNothing (student) ?
      !! (L .isDefined (io_as_inert
      ) (io_state ()))
			? setup_student_view
			: !! (L .isDefined (L .choice (io_as_connecting, io_as_heartbeat)
      ) (io_state ()))
      ? 'Trying to join room...'
      : panic ('invalid io at get ready view')
		: so ((_=_=>
      [ <room> {'Connected to room ' + _room } </room>
      , 'Waiting for game to start...' ]
      .map (_x => <div>{ _x }</div>),
      where
      , { _room, _student } = { _room: from_just (room), _student: from_just (student) } )=>_)) } </get-ready-etc>

var playing_view = _ => so ((_=_=>
  <playing-etc>
    <div class="left-pane">
      <ticker>{ T (game_tick) (map_defined_ ([]) (t => time_limit - t)) }</ticker>
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
          , _cell_solved = Z .elem (_cell_position) (_solved_positions)
          , _cell_bingo = R .any (Z .elem (_cell_position)) (_bingoed_positions) )=>_)))
          } </row> )) } </board> </div> </playing-etc>,
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


window .view = <student-app>
	{ !! (L .isDefined (app_as_get_ready) (app_state ()))
		? get_ready_view
		: !! (L .isDefined (app_as_playing) (app_state ()))
		? playing_view
		: !! (L .isDefined (app_as_game_over) (app_state ()))
		? game_over_view
		: panic ('undefined app state in view') } </student-app>














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
		if (last_progress !== undefined && progress !== undefined && Z .not (Z .equals (last_progress) (progress))) {
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
