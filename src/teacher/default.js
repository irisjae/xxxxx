var { bool, number, timestamp, string,
list, map, maybe, nat, id, v, piece,
shuffle, uuid, api, post,
student, problem, choice, answer, latency, ping, position,
attempt, point, past, board, win_rule, rules, settings,
teacher_app, student_app,
io, message, ensemble, 
default_problems, default_rules, default_settings,
as_maybe, as_defined, as_complete, complete_,
app_as_setup, app_as_get_ready, app_as_playing, app_as_game_over,
settings_as_problems, settings_as_rules,
settings_as_size, settings_as_time_limit, settings_as_win_rule,
io_as_inert, io_as_connecting, io_as_heartbeat,
ensemble_as_ping, ensemble_as_settings, ensemble_as_start, ensemble_as_abort,
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
teacher_app_get_ready_to_playing, 
student_app_get_ready_to_playing, student_app_playing_to_next,
past_stepped,
current_problem, problem_choice_matches,
attempted_positions, answered_positions, bingoed_positions,
T, $, apply, L, R, S, Z, Z_, Z$, sanc, memoize, TimelineMax,
so, by, and_by, under,
go, never, panic, panic_on,
just_now, temporal,
fiat, data, data_lens, data_iso, data_kind,
n_reducer, pair_zip_n, pair_zip, pair_projection,
map_defined_, map_defined, from_just, maybe_all,
as_sole, sole, every, delay
} = window .stuff


var feedback = data ({
  start: () => feedback,
  setup_settings: ( settings_piece =~ piece (settings) ) => feedback,
  play: () => feedback })

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
  <setup-etc>
    <div class="left-pane">
      <a-title>Bingo</a-title>
      <sub-title>除法（一）</sub-title>
      <settings x-for="game-mode time-limit" style={{ marginTop: '20px' }}>
      <setting x-of="game-mode">
        { (counter_setting
          ) ('遊戲模式：'
          ) (_game_mode => {}
          ) (
          [ Z_ .Pair (fiat) (play_to_win_img) ]
          ) (fiat) } </setting>
      <setting x-of="time-limit">
        { (counter_setting
          ) ('各題作答時限：'
          ) (_time_limit => {;
              var setting_delta = T (_time_limit) (L .get (L.inverse ([ data_iso (settings .settings) .rules, data_iso (rules .rules) .time_limit ])))
              ;feedback_state (feedback .setup_settings (setting_delta)) }
          ) (
          [ Z_ .Pair (10) (ten_secs_img)
          , Z_ .Pair (20) (twenty_secs_img)
          , Z_ .Pair (30) (thirty_secs_img) ]
          ) (_time_limit) } </setting></settings>
      <button x-custom="true" x-for="preview" style={{ marginTop: '25px' }}><img src={ preview_img } /></button>
      <button x-custom="true" x-for="start" fn={ feedback_start }>
        <img src={ start_img } />
        { T (io_state ()
          ) (
          [ L .get ([io_as_connecting, as_maybe])
          , Z_ .maybe ([]) (Z .K (
              <div style={{ height: 0 }}>遊戲正在開始…</div>)) ]) } </button></div>
    <div class="right-pane">
      <settings x-for="board-size">
        <setting x-of="board-size" x-be="3x3"><img src={ three_by_three_img } /></setting>
        <setting x-of="board-size" x-be="4x4"><img src={ four_by_four_img } /></setting>
        <setting x-of="board-size" x-be="5x5"><img src={ five_by_five_img } /></setting></settings></div></setup-etc>,
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
      [ <label>{ label }</label>
      , <control>
          <prev fn={ feedback_prev }><img src={ prev_img } /></prev>
          <counter><img src={ data_img } /></counter>
          <next fn={ feedback_next }><img src={ next_img } /></next></control> ],
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
	<get-ready-etc>
		<room>遊戲室編號：{ _room }</room>
    <students-etc>
      <label>人數：{ Z_ .size (_students) }</label>
      <students>
        { T (_students
          ) (
          Z_ .map ($ (
          [ L .get (student_name)
          , _x => <student>{ _x }</student> ]))) }</students> </students-etc>
    { !! Z .not (Z_ .size (_students) === 0)
				? <button x-custom x-for="play" fn={ feedback_play }><img src={ play_img } /></button>
				: [] } </get-ready-etc>,
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
    { !! L .isDefined (lookbehind_nothing) (_lookbehind)
      ? <playing-etc>
          <title-etc>
            <a-title>Bingo</a-title>
            <problem-number>第{ problem_number }題</problem-number></title-etc>
          <problem-etc>
            <ticker>{ time_left }</ticker>
            <question>{ question }</question></problem-etc>
          <options-etc>
            <button x-custom x-for="view-students" fn={ view_students }><img src={ view_students_img } /></button>
            <button x-custom x-for="end-game" fn={ consider_end }><img src={ end_game_img } /></button></options-etc></playing-etc>
      :!! L .isDefined (lookbehind_view_students) (_lookbehind)
      ? <playing-etc>
          <problem-etc>
            <problem-text>{ _problem }</problem-text>
            <countdown>{ time_elapsed }</countdown> </problem-etc>
          <students>
            { T (_students
              ) (
              [ L .collect (
                [ L .elems
                , pair_as_second ])
              , Z_ .map (([_board, _past]) =>
                <student-etc>
                  { so ((_=_=>
                  <board> { T (_board) (Z_ .map (_row => 
                    <row> { T (_row) (Z_ .map (_cell =>
                      so ((_=_=>
                      !! (_cell_bingo)
                      ? <cell x-bingoed></cell>
                      :!! (_cell_crossed)
                      ? <cell x-crossed></cell>
                      : <cell></cell>,
                      where
                      , _cell_position = T (_cell) (L .get (cell_as_position))
                      , _cell_crossed = Z .elem (_cell_position) (_crossed_positions)
                      , _cell_bingo = R .any (Z .elem (_cell_position)) (_bingoed_positions) )=>_)))
                      } </row> )) } </board>,
                  where
                  , _crossed_positions = answered_positions (_board) (_past)
                  , _bingoed_positions = bingoed_positions (_board) (_past) )=>_) } </student-etc>) ]) } </students> </playing-etc>
      :!! L .isDefined (lookbehind_consider_end) (_lookbehind)
      ? <playing-etc></playing-etc>
      : panic ('unknown lookbehind state') },
  where
  , _lookbehind = lookbehind_state () 
  , _problems = T (app_state ()) (L .get (app_as_problems))
  , _problem = T (app_state ()) (L .get (app_as_past), current_problem)
  , _students = T (app_state ()) (L .get (app_as_students)) 
  , problem_number = '' // TODO: define this
  , time_left = '' // TODO: define this
  , time_elapsed = '' // TODO: define this
  , question = '' // TODO: define this
  , view_students_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fview-students.png?1541802335642'
  , end_game_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fend-game.png?1541802334772'
  , view_students = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;lookbehind_state (lookbehind .view_students) })})}
  , consider_end = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;lookbehind_state (lookbehind .consider_end) })})} )=>_)
    
													 
var game_over_view = <game-over-etc> <message>Game Over!</message> </game-over-etc>
  
window .view = <teacher-app>
  { !! (L .isDefined (app_as_setup) (app_state ()))
    ? setup_view
    :!! (L .isDefined (app_as_get_ready) (app_state ()))
    ? get_ready_view
    :!! (L .isDefined (app_as_playing) (app_state ()))
    ? playing_view
    :!! (L .isDefined (app_as_game_over) (app_state ()))
    ? game_over_view
    : panic ('undefined app state in view')  } </teacher-app>
												 
												 
												 
												 
												 
												 
												 
												 
												 
												 
												 
												 
												 
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
	//;app_state (student_app_next_playing (app_state ()))
}

				
				
				
				
				
				
				
var game_clock = new TimelineMax
var game_tick_sampler = S .data (Z .Nothing)
;game_clock .add (timesup_problem, 10)
;T (Z .range (0) (10 + 1)) (R .forEach (t => {;
	;game_clock .add (_ => { ;game_tick_sampler (t) }, t) }))

	 
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



//TODO: add guard to warn against depending on datas other than feedback
S (_ => {;
  ;so ((
  take
  , cases = 
      [ [ data_iso (feedback .start)
        , _ => {;
            ;get_room (T (Math .random ()) ([
              _x => _x * 100000000,
              _x => Math .floor (_x) ])) .catch (_ => {}) } ]
      , [ data_iso (feedback .play)
        , _ => {;
            ;start_playing () } ]
      , [ data_lens (feedback .setup_settings) .settings_piece
        , _piece => {;
            var cleansed_piece = JSON .parse (JSON .stringify (_piece))
            ;app_state (
              T (S .sample (app_state)
              ) (
              L .modify (app_as_settings) (R .mergeDeepLeft (cleansed_piece)) )) } ] ] )=>
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



/*
S (_ => {;
	if (Z_ .isNothing (app_state ())) {
		if (L .isDefined (io_inert) (io_state ())) {
			;get_room (T (Math .random ()) ([
				_x => _x * 100000000,
				_x => Math .floor (_x) ])) .catch (_ => {}) } } }})
*/
S (last_app => {;
	var _app = app_state ()
		if (! L .isDefined (app_as_playing) (last_app)) {
			if (L .isDefined (app_as_playing) (_app)) {
			}
		}
	return _app }
, app_state ())
	 
	 
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
				if (start > now) {
					;app_state (playing_app) }
				else {
					;setTimeout (_ => {;
						;app_state (playing_app) }
					, start - now) } } } }
	return _ensemble }
, ensemble_state ())
so ((_=_=>
S (last_ensemble => {;
	var _app = S .sample (app_state)
	var _ensemble = ensemble_state ()
	if (L .isDefined (app_as_playing) (_app) && Z_ .equals (win_rule .first_bingo) (L .get ([ app_as_settings, settings_as_win_rule ]) (_app))) {
		if (! ensemble_bingoed_positions (last_ensemble)) {
			if (L .isDefined (ensemble_as_start) (_ensemble)) {
				var start = L .get (ensemble_as_start) (_ensemble)
				var now = (new Date) .getTime ()

				var playing_app = teacher_app_get_ready_to_playing (_app)
				if (start > now) {
					;app_state (playing_app) }
				else {
					;setTimeout (_ => {;
						;app_state (playing_app) }
					, start - now) } } } }
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
