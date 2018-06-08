var { xx, oo, Oo, L, R, S, Z, memoize, 
  do_, defined, data,
  fro, map_just, every
} = window .stuff


var shuffle = list => {
  var array = []
  for (var i in list) {
    ;array .push (list [i])}
  for (var i = array. length - 1; i > 0; i --) {
    var j = Math .floor (Math .random () * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]] // eslint-disable-line no-param-reassign
  }
  return array }





var api = (room, x) => fetch ('/log/' + room, x) .then (x => x .json ())
var post = x => ({
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json' },
  body: JSON .stringify (x) })




//--------------------TYPES--------------------

var boolean = defined
var number = defined
var string = defined
var list = a => defined
var map = a => b => list (v (a, b))
var maybe = a => defined
var nat = defined
var id = string

var student = id
var question = string
var answer = question
var latency = number
var v = (...types) => defined
var position = v (nat, nat)

var attempt = v (answer, latency)


var rendition = data ({ rendition: (attempts = list (attempt)) => defined })

var board = data ({ board: (answers = list (v (nat, nat, answer))) => defined})

var rules = data ({ rules: (time_limit = number, size = nat) => defined })

var setup = data ({ setup: ( room = room, questions = list (question), rules = rules ) => defined })


var teacher_app = data ({
	prepare: ( setup = setup, students = list (student) ) => defined,
	playing: ( setup = setup, students = list (v (student, board)), history = list (v (student, list (rendition))) ) => defined,
	game_over: ( setup = setup, history = list (v (student, list (rendition))) ) => defined })
var student_app = data ({
	prepare: ( student = student, setup = maybe (setup) ) => defined,
	playing: ( student = student, setup = setup, board = board, history = list (rendition) ) => defined,
	game_over: ( student = student, setup = setup, board = board, history = list (list (rendition)) ) => defined })
var io = data ({
  inert: () => defined,
  connecting: () => defined })


var message = data ({
  setup: ( questions = list (question), rules = rules ) => defined })
var consensus = data ({
  consensus: ( students = list (v (student, latency, history)), latency ) => defined })





var default_questions = shuffle ('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
//var default_filler = shuffle ('1234567890!@#$%^&*()+=_-|\~`<,>.?/{[}]')
var default_rules = rules .rules (10, 3)




var as_maybe = [L .reread (x => Z .Just (x)), L .defaults (Z .Nothing)]


var app_ready = ['ready']
var app_during = ['during']
var app_done = ['done']
//TODO: accomodate maybe for app_ready
var app_setup = [L .choices (app_ready, app_during), 'setup']
var app_students = [L .choices (app_ready, app_during), 'students']
var setup_room = ['setup', 'room']
var setup_questions = ['setup', 'questions']
var setup_rules = ['setup', 'rules']
var app_room = [ app_setup, setup_room ]
var app_questions = [ app_setup, setup_questions ]
var app_board = [ app_during, 'board' ]
var app_history = [ app_during, 'history' ]

var io_inert = ['inert']
var io_connecting = ['connecting']

var consensus_questions = ['setup', 'questions'] 

var rendition_attempts = ['rendition', 'attempts']
    
var rules_size = ['rules', 'size']
var setup_size = [setup_rules, rules_size]

var cell_answer = [ 2 ]






var log_consensus = msgs =>
  R .reduce (R .mergeDeepRight, {}, msgs)



var generate_board = size => questions => {
  var cells = shuffle (questions .slice (0, size * size))
  var cell = y => x =>
    cells [(x - 1) * size + (y - 1)]
  
  return Oo (R .range (1, size + 1),
    oo (R .map (row => Oo (R .range (1, size + 1),
      oo (R .map (column => [row, column, cell (row) (column)] ))))))}


var student_app_ready_to_during = app_state =>
  Oo (L .get (app_setup, app_state),
    oo (fro (Z .Nothing, setup => Z .Just (
      student_app .during (setup, generate_board (L .get (setup_size, setup)) (L .get (setup_questions, setup)), [rendition .rendition ([])])))))

var student_app_next_during = app_state => {
  var size = L .get ([app_setup, setup_size], app_state)
  return !! (Z .size (L .get (app_history, app_state)) < size * size)
    ? L .set ([app_history, L .append], rendition .rendition ([]), app_state)
    : student_app .done (L .get (app_setup, app_state), L .get (app_board, app_state), L .get (app_history, app_state)) }

var crossed_answers = memoize (app_state => 
  !! (L .isDefined (app_during, app_state))
  ? Oo (Z .zip
      (Oo (L .get (app_history, app_state), oo (R .map (L .get ([rendition_attempts, L .last, 0, as_maybe])))))
      (L .get (app_questions, app_state)),
    oo (Z .mapMaybe (pair =>
      !! (Z .equals (Z .fst (pair)) (Z .Just (Z .snd (pair))))
        ? Z .fst (pair)
        : Z .Nothing)))
  : [])

var current_question = app_state =>
  !! (L .isDefined (app_during, app_state))
  ? L .get ([app_questions, Z .size (L .get (app_history, app_state)) - 1, as_maybe], app_state)
  : Z .Nothing



window .stuff = { ...window .stuff,
  number, string, list, maybe, id,
  shuffle,
  api, post,
  student, question, answer, latency, v,
  board, rendition, rules, setup,
  teacher_app, student_app, io, message, consensus, 
  default_questions, default_rules,
  as_maybe,
  app_ready, app_during, app_done, app_setup,
  app_students, app_room, app_board, app_history,
  setup_room, setup_questions, setup_rules,
  io_inert, io_connecting,
  consensus_questions,
  rendition_attempts,
  rules_size, setup_size,
  cell_answer, 
  log_consensus,
  student_app_ready_to_during, student_app_next_during,
  crossed_answers, current_question }