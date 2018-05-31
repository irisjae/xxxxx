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






var student = id
var question = string
var progress = number

var default_questions = shuffle ('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
var rules = data ({
  rules: (time_limit = number, size = number) => defined })
var default_rules = rules .rules (10, 10)

var state = data ({
	ready: ( room = room, questions = list (question), rules = rules ) => defined,
	during: ( stats, completed_questions = progress, setup = setup ) => defined,
	done: () => defined })



var the_state = S .data (Z .Nothing)



var the_ready = ['ready']
var the_room = ['room', L .defaults (Z .Nothing), L .rewrite (x => Z .Just (x))]
var ready_room = [the_ready, the_room]



window .view = S .root (() => <div>
	{ Oo (L .get (ready_room, the_state ()), oo (fro ('Generating Code.....', x => 'Room: ' + x))) }
</div>)




var get_room = _ => {;
	var id = Oo (Math .random (),
		oo (x => x * 100000000),
		oo (x => Math .floor (x)))
	
	fetch ('/log/' + id)
	.then (x => x .json ())
	.then (x => {;
		if (x .length !== 0) {
			;throw new Error ('taken') }})
  .then (_ => {
			;the_state (state .ready ( id, default_questions, default_rules ))
    })
	.catch (_ => {;get_room ()}) }
;get_room ()