var Oo = window .Oo
var oo = window .oo
var R = window .R
var L = window .L
var S = window .S
var Z = window .Z
var data = window .data
var fro = window .fro
var defined = window .defined
var number = window .number
var string = window .string
var list = window .list
var maybe = window .maybe
var id = window .id
var shuffle = window .shuffle
var post = window .post
var api = window .api
var do_ = window .do_
var every = window .every



var app_state = S .data (Z .Nothing)
var the_consensus = S .data (Z .Nothing)


var state_setup = [L .choices ('ready', 'during'), 'setup']
var setup_room = ['setup', 'room']
var setup_questions = ['setup', 'questions']
var setup_rules = ['setup', 'rules']
var state_students = [L .choices ('ready', 'during'), 'students']

var state_room = [ state_setup, setup_room ]
var as_maybe = [L .reread (x => Z .Just (x)), L .defaults (Z .Nothing)]


var {
  Oo, xx, oo, R, L, S, Z
} = window .stuff


S .root (() => {
 
  window .view =  <div>
    { Oo (L .get ([state_room, as_maybe], app_state ()), oo (fro ('Generating Code.....', x => 'Room: ' + x))) }
    { Oo (L .get ([state_students, as_maybe], app_state ()),
      oo (fro ('', R .map (x => <span>{x + ' student is here'}</span>)))) }
  </div>

  var get_room = time => {;
    var id = Oo (Math .random (),
      oo (x => x * 100000000),
      oo (x => Math .floor (x)))

    var the_setup = setup .setup ( id, default_questions, default_rules )

    do_
    .then (_ =>
      api (id)
      .then (x => {; if (x .length !== 0) { ;throw new Error (id + ' taken') } else return x }))
    .then (_ =>
      api (id, post (message .setup (L .get (setup_questions, the_setup), L .get (setup_rules, the_setup) )))
      .then (x => { if (! x .ok) { ;throw new Error ('cannot post to ' + id)} else return x }))
    .then (_ => {;app_state (teacher_app .ready (the_setup, []))})
    .catch (e => {
      ;console .error (e)
      ;get_room ()}) }
  
  ;get_room ()
  
  var log_consensus = msgs =>
    R .reduce (R .mergeDeepRight, {}, msgs)
  
/*
  var heartbeat = every (100)
  S (() => {
    Oo (L .get ([state_room, as_maybe], app_state ()), oo (Z .map (room => {
      ;heartbeat () 
      do_
      .then (_ => api (room))
      .then (x => {;the_consensus (log_consensus (x))})
      .catch (e => {;console .error (e)})})))})
*/
  
  /*var the_consensus = S .data ()
  var get_log = time => {;
    Oo (L .get ([state_room, as_maybe], app_state ()),
      oo (Z .map (id => {;
        api (id)
        .then (log_consensus)
        .then (x => {;
          app_state (L .set (state_students, x, app_state ()));})
        .catch (x => {;
          ;console .error (x)})
        .then (x => {;
          ;setTimeout (get_log, 1000)})})))
  }*/
  
})