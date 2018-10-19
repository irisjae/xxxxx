var { T, $, L, R, S, Z, Z_, Z$, sanc, memoize, TimelineMax,
so, by, 
go, panic, panic_on,
just_now, temporal,
fiat, data, data_lens, data_iso, data_kind,
n_reducer, pair_zip_n, pair_zip, pair_projection,
map_defined, from_just, maybe_all,
sole, every, delay,
bool, number, timestamp, string,
list, map, maybe, nat, id, v,
shuffle, uuid, api, post,
student, question, answer, latency, ping, position,
attempt, rendition, board, rules, setup,
teacher_app, student_app,
board_viewer,
io, message, ensemble, 
default_questions, default_rules,
as_maybe, from_maybe,
app_nothing, app_get_ready, app_playing, app_game_over,
setup_room, setup_questions, setup_rules,
board_viewer_board, board_viewer_questions, board_viewer_history,
io_inert, io_connecting, io_heartbeat,
ensemble_questions, ensemble_rules,
ensemble_ping, ensemble_start, ensemble_abort,
ensemble_student_pings, ensemble_student_starts,
ensemble_student_boards, ensemble_student_histories,
app_setup, app_student, app_students, app_room,
app_board, app_history, app_questions,
rendition_attempts,
rules_size, setup_size,
question_view, question_answers,
cell_position, position_lens,
cell_answer, student_name,
history_stepped,
message_encoding, messages_encoding,
assemble_students, schedule_start,
teacher_app_get_ready_to_playing, 
student_app_get_ready_to_playing, student_app_playing_to_next,
student_app_to_board_viewer,
question_answer_matches, 
board_viewer_current_question,
board_viewer_crossed_positions, board_viewer_bingoed_positions
} = window .stuff


var feedback = data ({
  nothing: () => feedback,
  init: () => feedback,
  play: () => feedback })


var app_state = S .data (teacher_app .nothing)

var io_state = S .data (io .inert)
var ensemble_state = S .data (ensemble .nothing)

var feedback_state = temporal (feedback .nothing)
//var feedback_state = S .data (temporal (feedback .nothing))







var clicking = ['click']

var init_view = _ => so ((_=_=>
	<init-etc> 
		<div a-title>
			Bingo Class Game
			<img src={ bingo_img } /> </div>
		<div a-topic> Equivalent Fractions </div>
		<rules>
			<size> <img src={ board_sizes_img } /> </size> </rules>
		<button fn={ feedback_init }> Start </button>
		{ T (io_state ()
      ) (
			[ L .get ([io_connecting, as_maybe])
      , Z_ .maybe ([]) (Z .K ('Generating Code...')) ]) }
		</init-etc>,
  where
	, bingo_img = 'https://cdn.glitch.com/5a2d172b-0714-405a-b94f-6c906d8839cc%2Fimage5.png?1529492559081'
	, board_sizes_img =
			'https://cdn.glitch.com/5a2d172b-0714-405a-b94f-6c906d8839cc%2FScreen%20Shot%202018-06-20%20at%206.53.17%20PM.png?1529492353674'
  , feedback_init = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;feedback_state (feedback .init) }) }) } )=>_)

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
	, _room = T (app_state ()) (L .get (app_room))
	, _students = T (app_state ()
		) (L .get ([ app_students, L .valueOr ([]) ]))
  , feedback_play = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;feedback_state (feedback .play) }) }) } )=>_)

var playing_view = _ => so ((_=_=>
	<playing-etc>
	</playing-etc>,
	where
	, _students = T (app_state ()) (L .get (app_students)) )=>_)
													 
  
window .view = <teacher-app>
  { !! (L .isDefined (app_nothing) (app_state ()))
    ? init_view
    :!! (L .isDefined (app_get_ready) (app_state ()))
    ? get_ready_view
    :!! (L .isDefined (app_playing) (app_state ()))
    ? playing_view
    :!! (L .isDefined (app_game_over) (app_state ()))
    ? panic ('unimplemented')
    : panic ('undefined app state in view')  } </teacher-app>
												 
												 
												 
												 
												 
												 
												 
												 
												 
												 
												 
												 
												 
var get_room = _room => {;
	var _setup = setup .setup ( _room, default_questions, default_rules )

	;return go
	.then (_ =>
		io_state (io .connecting) && api (_room)
		.then (panic_on ([ [_x => Z .not (Z_ .equals ({}) (_x)), _room + ' taken'] ])) )
	.then (_ =>
		api (_room,
			post (message_encoding (
				so ((_=_=>
				message .teacher_setup (questions, rules),
				where
				, {questions, rules} = T (_setup) (L .get (data_iso (setup .setup))) )=>_) ) ))
		.then (panic_on ([
			[ _x => ! _x .ok, 'cannot post to ' + _room ] ])) )
	.then (_ => {;
		;app_state (teacher_app .get_ready (_setup, [])) })
	.catch (_e => {;
		;console .error (_e) })
	.then (_ => {;
		;io_state (io .inert) }) }

var start_playing = _ => {;
	;so ((
	take
	, exists = maybe_all ({
			_ensemble: T (S .sample (ensemble_state)) (L .get (as_maybe)),
			_room: T (S .sample (app_state)) (L .get ([ app_room, as_maybe ])) }) ) => {;
	;T (exists) (Z_ .map (({ _ensemble, _room }) => {;
		;go
		.then (_ =>
			io_state (io .messaging) && api (_room,
				post (message_encoding (message .teacher_start (schedule_start (_ensemble)))))
			.then (panic_on ([
				[ _x => ! _x .ok, 'cannot post to ' + _room ] ]) ))
		.catch (_e => {;
			;console .error (_e) })
		.then (_ => {;
			;io_state (io .inert) }) })) }) }

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
	;return T (app_state ()) ([
		L .get (app_room),
		map_defined (_room => {;
			if (! connection [_room]) {
				;connection [_room] = S .data ()
				;api .listen_ping (_room) (connection [_room]) }
			if (connection [_room] ()) {
				return so ((_=()=>
				[ timestamp, mean, Math .sqrt (variance) ],
				where
				, [ mean, variance, n, timestamp ] = connection [_room] () )=>_) } } ) ]) }) 



//TODO: add guard to warn against depending on datas other than feedback
S (_ => {;
  ;so ((
  take
  , cases = 
      [ [ data_iso (feedback .init)
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
		if (! L .isDefined (app_playing) (last_app)) {
			if (L .isDefined (app_playing) (_app)) {
			}
		}
	return _app }
, app_state ())
	 
	 
S (_ => {;
	var _app = S .sample (app_state)
	var _ensemble = ensemble_state ()
	
	var _app_kind = T (_app) (data_kind)
	var _app_students = T (_app) (L .get (app_students))
	var _ensemble_students = T (_ensemble) (assemble_students (_app_kind))
	if (! Z_ .equals (_ensemble_students) (_app_students)) {
		;app_state (
			T (_app
			) (L .set (app_students) (_ensemble_students))) } })
S (last_ensemble => {;
	var _app = S .sample (app_state)
	var _ensemble = ensemble_state ()
	if (L .isDefined (app_get_ready) (_app)) {
		if (! L .isDefined (ensemble_start) (last_ensemble)) {
			if (L .isDefined (ensemble_start) (_ensemble)) {
				var start = L .get (ensemble_start) (_ensemble)
				var now = (new Date) .getTime ()

				var playing_app = from_just (teacher_app_get_ready_to_playing (_app))
				if (start > now) {
					;app_state (playing_app) }
				else {
					;setTimeout (_ => {;
						;app_state (playing_app) }
					, start - now) } } } }
	return _ensemble }
, ensemble_state ())
	 
	 
S (_ => {;
	;T (L .get (app_room) (app_state ())
  ) (map_defined (_room => {;
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
