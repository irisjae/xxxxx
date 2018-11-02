var { bool, number, timestamp, string,
list, map, maybe, nat, id, v,
shuffle, uuid, api, post,
student, question, choice, answer, latency, ping, position,
attempt, opportunity, past, board, rules, settings,
teacher_app, student_app,
io, message, ensemble, 
default_questions, default_rules, default_settings,
as_maybe, as_defined, as_complete, complete_,
app_as_setup, app_as_get_ready, app_as_playing, app_as_game_over,
settings_as_questions, settings_as_rules,
io_as_inert, io_as_connecting, io_as_heartbeat,
ensemble_as_ping, ensemble_as_settings, ensemble_as_start, ensemble_as_abort,
ensemble_as_student_pings, ensemble_as_student_starts,
ensemble_as_student_boards, ensemble_as_student_histories,
attempt_as_position, attempt_as_latency, opportunity_as_attempts, opportunity_as_position, past_as_opportunities,
app_as_settings, app_as_student, app_as_students, app_as_room,
app_as_board, app_as_past, app_as_questions,
app_as_opportunity, opportunity_as_attempts,
rules_as_size, settings_as_size,
question_as_question, question_as_answers,
cell_as_position, as_position,
cell_as_choice, student_name,
pair_as_list, pair_as_first, pair_as_second,
message_encoding, messages_encoding,
assemble_students, schedule_start,
teacher_app_get_ready_to_playing, 
student_app_get_ready_to_playing, student_app_playing_to_next,
past_stepped,
current_question, question_choice_matches,
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
  play: () => feedback })


var app_state = S .data (teacher_app .setup (default_settings))

var io_state = S .data (io .inert)
var ensemble_state = S .data (ensemble .nothing)

var feedback_state = temporal ()
//var feedback_state = S .data (temporal ())







var clicking = ['click']

var setup_view = _ => so ((_=_=>
  <setup-etc>
    <div class="left-pane">
      <a-title>Bingo</a-title>
      <sub-title>除法（一</sub-title>
      <settings for="game-mode time-limit" style="margin-top: 20px;">
      <setting of="game-mode">
        <label>遊戲模式：</label>
        <control>
          <prev><img src={ prev_img } /></prev>
          <counter><img src={ play_to_win_img } /></counter>
          <next><img src={ next_img } /></next></control></setting>
      <setting of="time-limit">
        <label>各題作答時限：</label><control>
        <prev><img src={ prev_img } /></prev>
        <counter><img src={ ten_secs_img } /></counter>
        <next><img src={ next_img } /></next></control></setting></settings>
      <button custom for="preview" style="margin-top: 25px"><img src={ preview_img } /></button>
      <button custom for="start" fn={ feedback_init }>
        <img src={ start_img } />
        { T (io_state ()
          ) (
          [ L .get ([io_as_connecting, as_maybe])
          , Z_ .maybe ([]) (Z .K ('Generating Code...')) ]) } </button></div>
    <div class="right-pane">
      <settings for="board-size">
        <setting of="board-size" be="3x3"><img src={ three_by_three_img } /></setting>
        <setting of="board-size" be="4x4"><img src={ four_by_four_img } /></setting>
        <setting of="board-size" be="5x5"><img src={ five_by_five_img } /></setting></settings></div></setup-etc>,
  where
	, prev_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fcounter-prev.png?1541181538486'
	, next_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fcounter-next.png?1541181537950'
	, play_to_win_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fplay-to-win.png?1541182355223'
  , ten_secs_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F10-secs.png?1541182690288'
	, preview_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-preview.png?1541183674936'
	, start_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fgo-start.png?1541183674879'
	, three_by_three_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F3x3.png?1541159540588'
	, four_by_four_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F4x4.png?1541159540274'
	, five_by_five_img = 'https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2F5x5.png?1541159540962'
  , feedback_init = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;feedback_state (feedback .start) }) }) } )=>_)

var get_ready_view = _ => so ((_=_=>
	<get-ready-etc>
		<message> Room Code: { _room } </message>
		<message> Number of students: { Z_ .size (_students) } </message>
		{ [ T (_students
        ) (
        Z_ .map ($ (
        [ L .get (student_name)
        , _x => <player>{ 'Name: '+ _x }</player> ])))
			, !! Z .not (Z_ .size (_students) === 0)
				? <button play fn={ feedback_play }> play </button>
				: [] ] } </get-ready-etc>,
	where
	, _room = T (app_state ()) (L .get (app_as_room))
	, _students = T (app_state ()
		) (L .get ([ app_as_students, L .valueOr ([]) ]))
  , feedback_play = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;feedback_state (feedback .play) }) }) } )=>_)

var playing_view = _ => so ((_=_=>
	<playing-etc>
    <question-etc>
      <question-text>{ _question }</question-text>
      <countdown>{ ''/*time_left*/ }</countdown> </question-etc>
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
                ? <cell>x</cell>
                :!! (_cell_crossed)
                ? <cell>x</cell>
                : <cell></cell>,
                where
                , _cell_position = T (_cell) (L .get (cell_as_position))
                , _cell_crossed = Z .elem (_cell_position) (_crossed_positions)
                , _cell_bingo = R .any (Z .elem (_cell_position)) (_bingoed_positions) )=>_)))
                } </row> )) } </board>,
            where
            , _crossed_positions = answered_positions (_questions) (_board) (_past)
            , _bingoed_positions = bingoed_positions (_questions) (_board) (_past) )=>_) } </student-etc>) ]) } </students> </playing-etc>,
	where
	, _questions = T (app_state ()) (L .get (app_as_questions))
	, _question = T (app_state ()) (L .get (app_as_past), current_question, T (_questions))
	, _students = T (app_state ()) (L .get (app_as_students)) )=>_)
													 
  
window .view = <teacher-app>
  { !! (L .isDefined (app_as_setup) (app_state ()))
    ? setup_view
    :!! (L .isDefined (app_as_get_ready) (app_state ()))
    ? get_ready_view
    :!! (L .isDefined (app_as_playing) (app_state ()))
    ? playing_view
    :!! (L .isDefined (app_as_game_over) (app_state ()))
    ? panic ('unimplemented')
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
				message .teacher_settings (settings .settings (_questions, _rules)),
				where
				, { _questions, _rules } = T (_settings
          ) (L .get (L .pick (
            { _questions: settings_as_questions
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

var timesup_question = _ => {;
	//;app_state (student_app_next_playing (app_state ()))
}

				
				
				
				
				
				
				
var game_clock = new TimelineMax
var game_tick_sampler = S .data (Z .Nothing)
;game_clock .add (timesup_question, 10)
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
            ;start_playing () } ] ] )=>
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
