var {
  xx, oo, Oo, L, R, S, Z, memoize, TimelineMax,
  where, go, defined,
  data, data_lens, data_iso,
  fro, map_just, every, 
  number, string, list, maybe, id,
  shuffle,
  uuid, api, post,
  student, question, answer, latency, v,
  board, rendition, rules, setup,
  teacher_app, student_app, io, message, ensemble, 
  default_questions, default_rules,
  as_maybe,
  app_get_ready, app_playing, app_game_over,
  app_setup, app_student, app_students, app_room,
  app_board, app_history,
  setup_room, setup_questions, setup_rules,
  io_inert, io_connecting,
  ensemble_questions,
  rendition_attempts,
  rules_size, setup_size,
  cell_answer, 
  student_app_get_ready_to_playing, student_app_next_playing,
  crossed_answers, current_question
} = window .stuff

var app_state = S .data (Z .Nothing)
var ensemble_state = S .data (Z .Nothing)

S .root (() => {
 
  window .view =  <div>
    { Oo (L .get ([app_room, as_maybe], app_state ()), oo (fro ('Generating Code.....', x => 'Room: ' + x))) }
    { Oo (L .get ([app_students, as_maybe], app_state ()),
      oo (fro ('', R .map (x => <span>{x + ' student is here'}</span>)))) }
  </div>

  var get_room = _ => {;
    var id = Oo (Math .random (),
      oo (_x => _x * 100000000),
      oo (_x => Math .floor (_x)))

    var the_setup = setup .setup ( id, default_questions, default_rules )

    go
    .then (_ =>
      api (id)
      .then (x => {; if (! R .equals (x) ({})) { ;throw new Error (id + ' taken') } else return x }))
    .then (_ =>
      api (id, post (message .teacher_setup (L .get (setup_questions, the_setup), L .get (setup_rules, the_setup) )))
      .then (x => { if (! x .ok) { ;throw new Error ('cannot post to ' + id)} else return x }))
    .then (_ => {;app_state (teacher_app .get_ready (the_setup, []))})
    .catch (e => {
      ;console .error (e)
      ;get_room ()}) }
  
  ;get_room ()
  
  var log_consensus = msgs =>
    R .reduce (R .mergeDeepRight, {}, msgs)
  
/*
  var heartbeat = every (100)
  S (() => {
    Oo (L .get ([app_room, as_maybe], app_state ()), oo (Z .map (room => {
      ;heartbeat () 
      do_
      .then (_ => api (room))
      .then (x => {;the_consensus (log_consensus (x))})
      .catch (e => {;console .error (e)})})))})
*/
  
  /*var the_consensus = S .data ()
  var get_log = time => {;
    Oo (L .get ([app_room, as_maybe], app_state ()),
      oo (Z .map (id => {;
        api (id)
        .then (log_consensus)
        .then (x => {;
          app_state (L .set (app_students, x, app_state ()));})
        .catch (x => {;
          ;console .error (x)})
        .then (x => {;
          ;setTimeout (get_log, 1000)})})))
  }*/
  
})