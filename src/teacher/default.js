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






var student = id
var question = string
var progress = number

var default_questions = shuffle ('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
var rules = data ({ rules: (time_limit = number, size = number) => defined })
var default_rules = rules .rules (10, 10)

var setup = data ({ setup: ( room = room, questions = list (question), rules = rules ) => defined })


var consensus = data ({
  consensus: (  ) => defined })

var state = data ({
	ready: ( setup = setup, students = list (student) ) => defined,
	during: ( setup = setup, students = list (student), completed_questions = progress ) => defined,
	done: () => defined })



var the_state = S .data (Z .Nothing)



var state_setup = [L .choices ('ready', 'during'), 'setup']
var setup_room = ['setup', 'room']
var setup_questions = ['setup', 'questions']
var setup_rules = ['setup', 'rules']
var state_students = [L .choices ('ready', 'during'), 'students']

var state_room = [ state_setup, setup_room, L .reread (x => Z .Just (x)), L .defaults (Z .Nothing) ]


window .view = S .root (() => <div>
	{ Oo (L .get (state_room, the_state ()), oo (fro ('Generating Code.....', x => 'Room: ' + x))) }
  { Oo (L .get (state_room, the_state ()), oo (R .map (x => x + ' student is here'))) }
</div>)




var get_room = _ => {;
	var id = Oo (Math .random (),
		oo (x => x * 100000000),
		oo (x => Math .floor (x)))
	
  var the_setup
  
	fetch ('/log/' + id) .then (x => x .json ())
	.then (x => {; if (x .length !== 0) { ;throw new Error (id + ' taken') }})
  .then (_ => { ;the_setup = setup .setup ( id, default_questions, default_rules ) })
  .then (_ => fetch ('/log/' + id, post ({ questions: L .get (setup_questions, the_setup), rules: L .get (setup_rules, the_setup) })) .then (x => x .json ()))
  .then (x => { if (! x .ok) { ;throw new Error ('cannot post to ' + id)} })
  .then (_ => { ;the_state (state .ready (the_setup, [])) })
	.catch (x => {
    ;console .error (x)
    ;get_room ()}) }
;get_room ()