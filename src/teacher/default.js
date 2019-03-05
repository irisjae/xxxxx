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
	students_analysis: () => lookbehind,
	problems_analysis: () => lookbehind })

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

var ambient_as_ambient = data_iso (ambient .ambient)
var ambient_as_background_music_on = data_lens (ambient .ambient) .background_music_on







var app_state = S .data (teacher_app .setup (default_settings))

var io_state = S .data (io .inert)
var ensemble_state = S .data (ensemble .nothing)

//var feedback_state = S .data (temporal ())
var feedback_state = temporal ()
var lookbehind_state = S .data (lookbehind .nothing)
var ambient_state = S .data (ambient .ambient (false))







var clicking = ['click', 'touchstart'] .filter (_e => 'on' + _e in window) .slice (0, 1)
var audio = {
  bingo: new Audio ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fstudent-bingo.mp3?1546277231054'),
  background: new Audio ('https://cdn.glitch.com/cf9cdaee-7478-4bba-afce-36fbc451e9d6%2Fbackground.mp3?1546277343019') }
;audio .background .loop = true

var setup_view = _ => so ((_=_=>
  !! L .isDefined (lookbehind_as_nothing) (_lookbehind)
  ? 
  <setup-etc>
    <div class="left-pane">
      <a-title><img src={ logo_img }/></a-title>
      <sub-title>除法（一）</sub-title>
      <settings x-for="game-mode time-limit" style={{ marginTop: '20px' }}>
      <setting x-of="game-mode">
        { $ (counter_setting
          ) ('遊戲模式：'
          ) (_win_rule => {
              var rules_delta = T (_win_rule) (L .get (L.inverse (data_iso (rules .rules) .win_rule)))
              ;feedback_state (feedback .setup_rules (rules_delta)) }
          ) (
          [ [ win_rule .first_bingo, play_to_win_img ]
          , [ win_rule .limit_time, time_limit_play_img ]
          , [ win_rule .all_problems, free_play_img ] ]
          ) (_win_rule) } </setting>
      <setting x-of="time-limit">
        { $ (counter_setting
          ) ('各題作答時限：'
          ) (_time_limit => {;
              var rules_delta = T (_time_limit) (L .get (L.inverse (data_iso (rules .rules) .time_limit)))
              ;feedback_state (feedback .setup_rules (rules_delta)) }
          ) (
          [ [ 10, ten_secs_img ]
          , [ 20, twenty_secs_img ]
          , [ 30, thirty_secs_img ] ]
          ) (_time_limit) } </setting></settings>
      <button x-custom="true" x-for="preview" style={{ marginTop: '25px' }} fn={ setup_preview }><img src={ preview_img } /></button>
      <button x-custom="true" x-for="start" fn={ feedback_start }>
        <img src={ start_img } />
        { T (io_state ()
          ) (
          [ L .get ([io_as_connecting, as_maybe])
          , Z_ .maybe ([]) (K (
              <div style={{ height: 0 }}>遊戲正在開始…</div>)) ]) } </button></div>
    <div class="right-pane">
      <settings x-for="board-size">
        <setting x-of="board-size" x-be="3x3"><img fn={ feedback_size (3) } src={ !! equals (_size) (3) ? three_by_three_on_img : three_by_three_off_img } /></setting>
        <setting x-of="board-size" x-be="4x4"><img fn={ feedback_size (4) } src={ !! equals (_size) (4) ? four_by_four_on_img : four_by_four_off_img } /></setting>
        <setting x-of="board-size" x-be="5x5"><img fn={ feedback_size (5) } src={ !! equals (_size) (5) ? five_by_five_on_img : five_by_five_off_img } /></setting> </settings> </div>
    <setting x-for="background-music" x-be={ _background_music_on ? 'off' : 'on' } fn={ toggle_background_music } ><img src={ _background_music_on ? music_on_img : music_off_img } /></setting> </setup-etc>
  : L .isDefined (lookbehind_as_preview_questions) (_lookbehind)
  ? 
  <setup-etc>
    <title-etc>
      <a-title><img src={ logo_img }/></a-title> </title-etc>
    <preview-questions-etc>
      <button x-custom="true" x-for="back" fn={ preview_back }><img src={ back_img } /></button>
      <preview-questions>
        <labels><question>題目</question><answer>答案</answer></labels>
        { T (_problems
          ) (
          L .collect ([ L .elems, (_problem, i) => so ((_=_=>
            <problem><question><number>{ i + 1 }</number><img src={ question_image }/></question><answer>{ answer }</answer></problem>,
            where
            , question_image = T (_problem) (L .get ([ problem_as_question, question_as_image ]))
            , answer = T (_problem) (L .get ([ problem_as_question, question_as_solution ]))
          )=>_) ])) }
      </preview-questions>
      </preview-questions-etc> 
    <setting x-for="background-music" x-be={ _background_music_on ? 'off' : 'on' } fn={ toggle_background_music } ><img src={ _background_music_on ? music_on_img : music_off_img } /></setting> </setup-etc>
  : panic ('unknown lookbehind state'),
  where
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
      [ <label>{ label }</label>
      , <control>
          <prev fn={ feedback_prev }><img src={ prev_img } /></prev>
          <counter><img src={ data_img } /></counter>
          <next fn={ feedback_next }><img src={ next_img } /></next></control> ],
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
	<get-ready-etc>
		<room>遊戲室編號：{ _room }</room>
    <students-etc>
      <label>人數：{ R .length (_students) }</label>
      <students>
        { T (_students
          ) (
          R .map (under (student_as_student
          ) (({ icon: _icon, name: _name }) => 
            <student x-icon={
              !! L .isDefined (avatar_as_lion) (_icon) ? 'lion' : L .isDefined (avatar_as_bunny) (_icon) ? 'bunny' : panic ('...') }
            >{ _name }</student> ))) } </students> </students-etc>
    { !! L .isDefined (L .elems) (_students)
      ? <button x-custom x-for="play" fn={ feedback_play }><img src={ play_img } /></button>
      : [] }
    <setting x-for="background-music" x-be={ _background_music_on ? 'off' : 'on' } fn={ toggle_background_music } ><img src={ _background_music_on ? music_on_img : music_off_img } /></setting> </get-ready-etc>,
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
  ? <playing-etc>
      <title-etc>
        <a-title><img src={ logo_img }/></a-title>
        <problem-number>第{ problem_number }題</problem-number> </title-etc>
      <problem-etc>
        <ticker-etc>
          { T (game_tick) (map_defined_ ([]) (t => time_limit - t)) }
          <ticker z-identity={ _progress } style={{ animationDuration: _time_limit + 's' }}><spinner/></ticker> </ticker-etc>
        <question>
          { !! L .isDefined (question_as_text) (question) ? question_text
            : L .isDefined (question_as_image) (question) ? <img src={ question_image } />
            : panic ('bad question') }</question> </problem-etc>
      <options>
        <button x-custom x-for="view-students" fn={ view_students }><img src={ view_students_img } /></button>
        <button x-custom x-for="end-game" fn={ consider_end }><img src={ end_game_img } /></button> </options>
      <setting x-for="background-music" x-be={ _background_music_on ? 'off' : 'on' } fn={ toggle_background_music } ><img src={ _background_music_on ? music_on_img : music_off_img } /></setting> </playing-etc>
  : L .isDefined (lookbehind_as_view_students) (_lookbehind)
  ? <playing-etc>
      <title-etc>
        <a-title><img src={ logo_img }/></a-title>
        <problem-number>第{ problem_number }題</problem-number> </title-etc>
      <students>
        { T (map_zip (a => b => [a, b]) (_boards) (_pasts)
          ) (
          L .collect (
          [ L .elems
          , ([ _student, [_board, _past] ]) => so ((_=_=>
            <student-etc>
              <label x-icon={
                !! L .isDefined (avatar_as_lion) (_icon) ? 'lion' : L .isDefined (avatar_as_bunny) (_icon) ? 'bunny' : panic ('...') }
              >{ _name }</label>
              <board> { T (_board) (R .map (_row => 
                <row> { T (_row) (R .map (_cell => so ((_=_=>
                  !! _cell_solved ? <cell x-solved />
                  : <cell />,
                  where
                  , _cell_position = T (_cell) (L .get (cell_as_position))
                  , _cell_solved = R .includes (_cell_position) (_solved_positions) )=>_))) } </row> )) }
                <bingo> { T (_bingoes) (R .map (_pattern => so ((_=_=> 
                  <line x-shape={ shape } style={{ top: top, left: left }} />,
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
                          : '' )=>_))) } </bingo> </board> </student-etc>,
            where
            , _name = T (_student) (L .get (student_as_name))
            , _icon = T (_student) (L .get (student_as_icon))
            , _solved_positions = solved_positions (_board) (_past)
            , _bingoes = bingoes (_board) (_past) )=>_)])) } </students>
      <options>
        <button x-custom x-for="show-problem" fn={ show_problem }><img src={ show_problem_img } /></button>
        <button x-custom x-for="end-game" fn={ consider_end }><img src={ end_game_img } /></button> </options>
      <setting x-for="background-music" x-be={ _background_music_on ? 'off' : 'on' } fn={ toggle_background_music } ><img src={ _background_music_on ? music_on_img : music_off_img } /></setting> </playing-etc>
  : L .isDefined (lookbehind_as_consider_end) (_lookbehind)
  ? <playing-etc>
      <abort-etc>
        <div class="box">
          <label>結束遊戲？</label>
          <options>
            <button x-custom x-for="confirm" fn={ confirm_end }><img src={ confirm_img } /></button>
            <button x-custom x-for="show-problem" fn={ show_problem }><img src={ cancel_img } /></button></options></div></abort-etc></playing-etc>
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
  <game-over-etc>
    <title-etc>
      <a-title><img src={ logo_img }/></a-title> </title-etc>
    <options x-for="tabs">
      <button x-custom x-for="show-results" fn={ show_results } ><img src={ !! L .isDefined (lookbehind_as_show_results) (_lookbehind) ? show_results_on_img : show_results_off_img } /></button>
      <button x-custom x-for="students-analysis" fn={ students_analysis } ><img src={ !! L .isDefined (lookbehind_as_students_analysis) (_lookbehind) ? students_analysis_on_img : students_analysis_off_img } /></button>
      <button x-custom x-for="problems-analysis" fn={ problems_analysis } ><img src={ !! L .isDefined (lookbehind_as_problems_analysis) (_lookbehind) ? problems_analysis_on_img : problems_analysis_off_img } /></button> </options>
      { /**/ }
      { !! L .isDefined (lookbehind_as_show_results) (_lookbehind)
        ? 
        <students>
          { T (_students_boards_pasts
            ) (L .collect ([ L .elems, ([ _student, [_board, _past] ]) => so ((_=_=>
              <student-etc>
                <label x-icon={
                  !! L .isDefined (avatar_as_lion) (_icon) ? 'lion' : L .isDefined (avatar_as_bunny) (_icon) ? 'bunny' : panic ('unknown icon') }
                >{ _name }</label>
                <board> { T (_board) (R .map (_row => 
                  <row> { T (_row) (R .map (_cell => so ((_=_=>
                    !! _cell_solved
                    ? <cell x-solved />
                    : <cell />,
                    where
                    , _cell_position = T (_cell) (L .get (cell_as_position))
                    , _cell_solved = R .includes (_cell_position) (_solved_positions) )=>_))) } </row> )) }
                  <bingo> { T (_bingoes) (R .map (_pattern => so ((_=_=> 
                    <line x-shape={ shape } style={{ top: top, left: left }} />,
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
                            : '' )=>_))) } </bingo> </board> </student-etc>,
              where
              , _name = T (_student) (L .get (student_as_name))
              , _icon = T (_student) (L .get (student_as_icon))
              , _solved_positions = solved_positions (_board) (_past)
              , _bingoes = bingoes (_board) (_past) )=>_)])) } </students>
        : L .isDefined (lookbehind_as_students_analysis) (_lookbehind)
        ? so ((_=_=>
        <students-analysis-etc>
          <labels>
            <name fn={ toggle_name_order }>名稱 <img src={ toggle_ordering_img } /></name>
            <number-of-solved fn={ toggle_number_of_solved_order }>答對題數 <img src={ toggle_ordering_img } /></number-of-solved>
            <number-of-bingoes fn={ toggle_number_of_bingoes_order }>BINGO <img src={ toggle_ordering_img } /></number-of-bingoes>
            <average-solved-time fn={ toggle_average_solved_time_order }>平均答對時間 <img src={ toggle_ordering_img } /></average-solved-time> </labels>
          <students-analysis>
            { T (_students_boards_pasts
              ) (
              [ R .map (([ _student, [_board, _past] ]) => (
                  { _name: T (_student) (L .get (student_as_name))
                  , _number_of_solved: T (_past) (L .count ([ past_as_points, as_solved_on (_board), L .elems ]))
                  , _number_of_bingoes: T (bingoes (_board) (_past)) (L .count ([ L .elems ]))
                  , _average_solved_time: T (_past
                      ) (
                      [ L .mean ([ past_as_points, L .elems, as_solved_on (_board), point_as_attempts, L .last, attempt_as_latency ])
                      , show_time ]) }))
              , L .collect ([ order_sort (_ordering), L .elems, ({ _name, _number_of_solved, _number_of_bingoes, _average_solved_time }) => 
              <student>
                <name>{ _name }</name>
                <number-of-solved>{ _number_of_solved }</number-of-solved>
                <number-of-bingoes>{ _number_of_bingoes }</number-of-bingoes>
                <average-solved-time>{ _average_solved_time }</average-solved-time> </student> ]) ]) } </students-analysis> </students-analysis-etc>,
        where
        , _ordering = T (_lookbehind) (L .get (lookbehind_as_ordering)) )=>_)                           
        : L .isDefined (lookbehind_as_problems_analysis) (_lookbehind)
        ? so ((_=_=>
        <problems-analysis-etc>
          <labels>
            <question fn={ toggle_question_order }>題目 <img src={ toggle_ordering_img } /></question>
            <number-of-solvers fn={ toggle_number_of_solvers_order }>答對人數 <img src={ toggle_ordering_img } /></number-of-solvers>
            <average-number-of-attempts fn={ toggle_number_of_attempts_order }>平均作答次數 <img src={ toggle_ordering_img } /></average-number-of-attempts>
            <average-solved-time fn={ toggle_average_solved_time_order }>平均答對時間 <img src={ toggle_ordering_img } /></average-solved-time> </labels>
          <problems-analysis>
            { T (_problems
              ) (
              [ L .collect ((_problem, _index) => (
                  { _question: T (_problem) (L .get ([ problem_as_question, question_as_image ]))
                  , _number_of_solvers: T (_students_boards_pasts
                      ) (L .count ([ L .elems, L .choose (by (([ _student, [_board, _past] ]) => [ K (_past), _index, as_solved_on (_board) ] )) ]))
                  , _average_number_of_attempts: T (_students_boards_pasts
                      ) (
                      [ L .mean (
                        [ L .elems, L .choose (by (([ _student, [_board, _past] ]) => [ K (_past), _index ] ))
                        , point_as_attempts, L .count (L .elems) ])
                      , show_time ])
                  , _average_solved_time: T (_students_boards_pasts
                      ) (
                      [ L .mean (
                        [ L .elems, L .choose (by (([ _student, [_board, _past] ]) => [ K (_past), _index, as_solved_on (_board) ] ))
                        , point_as_attempts, L .last, attempt_as_latency ])
                      , show_time ]) })) (L .elems)
              , L .collect ([ order_sort (_ordering), L .elems, ({ _question, _number_of_solvers, _average_number_of_attempts, _average_solved_time }) => 
              <problem>
                <question><img src={ _question }/></question>
                <number-of-solvers>{ _number_of_solvers }</number-of-solvers>
                <average-number-of-attempts>{ _average_number_of_attempts }</average-number-of-attempts>
                <average-solved-time>{ _average_solved_time }</average-solved-time> </problem> ]) ]) } </problems-analysis> </problems-analysis-etc>,
        where
        , _ordering = T (_lookbehind) (L .get (lookbehind_as_ordering)) )=>_)                           
        : panic ('unknown lookbehind') }
    <options x-for="options">
      <button x-custom x-for="play-again" fn={ play_again } ><img src={ play_again_img } /></button> </options>
    <setting x-for="background-music" x-be={ _background_music_on ? 'off' : 'on' } fn={ toggle_background_music } ><img src={ _background_music_on ? music_on_img : music_off_img } /></setting> </game-over-etc>,
  where
  , _lookbehind = lookbehind_state () 
  , _app = app_state ()
  , _boards = T (_app) (L .get (app_as_boards)) 
  , _pasts = T (_app) (L .get (app_as_pasts)) 
  , _problems = T (_app) (L .get ([ app_as_settings, settings_as_problems ])) 
  , _students_boards_pasts = map_zip (a => b => [a, b]) (_boards) (_pasts)
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
  , show_time = _x => !! equals (_x) (NaN) ? '-' : _x .toFixed (2) * 1 + '秒'
  , show_results = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;lookbehind_state (lookbehind .show_results) })})}                              
  , problems_analysis = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;lookbehind_state (lookbehind .problems_analysis) })})}                              
  , students_analysis = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;lookbehind_state (lookbehind .students_analysis) })})}                              
  , play_again = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;feedback_state (feedback .reset) })})}  
  , toggle_background_music = _dom => {;
      ;clicking .forEach (click => {;
        ;_dom .addEventListener (click, _ => {;
          ;ambient_state (T (S .sample (ambient_state)) (L .modify (ambient_as_background_music_on) (R .not))) }) }) } )=>_) 

window .view = <teacher-app>
  { !! L .isDefined (app_as_setup) (app_state ())
    ? setup_view
    : L .isDefined (app_as_get_ready) (app_state ())
    ? get_ready_view
    : L .isDefined (app_as_playing) (app_state ())
    ? playing_view
    : L .isDefined (app_as_game_over) (app_state ())
    ? game_over_view
    : panic ('undefined app state in view')  } </teacher-app>
												 
												 
												 
												 
												 
												 
												 
												 
												 
												 
												 
												 
												 
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
    else if (equals (win_rule .all_problems) (_win_rule)) {
//      if (L .isDefined (app_as_playing) (_app)) {
//        if (! app_has_bingoes_ok (last_app) && app_has_bingoes_ok (_app)) {
//          ;setTimeout (_=>{;end_game ()}, 8000) } }
    
    }
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
