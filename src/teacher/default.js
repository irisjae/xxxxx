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






var student = id
var question = string

var progress = number
var setup = data ({ setup: ( students = list (student), room = room, questions = list (question), rules = game_rules ) => defined })

var game_rules = data ({
  rules: (time_limit = number, size = number) => defined })
var default_rules = game_rules .rules (10, 10)

var state = data ({
	setup: ( room = maybe (room), students = list (student), questions = list (questions), rules = game_rules ) => defined,
	during: ( stats, completed_questions = progress, setup = setup ) => defined,
	done: () => defined })



var the_state = S .data (state .setup (Z .Nothing, [], [], default_rules))



var the_setup = [L .prop ('setup'), L .valueOr (Z .Nothing)]
var the_room = [L .prop ('room'), L .valueOr (Z .Nothing)]
var setup_room = [the_setup, the_room]



window .view = S .root (() => <div>
	{ Oo (L .get (setup_room, the_state ()), oo (fro ('Generating Code', x => 'Room: ' + x))) }
</div>)




var get_room = _ => {;
	var id = Oo (Math .random (),
		oo (x => x * 100000000),
		oo (x => Math .floor (x)))
	
	fetch ('/log/' + id)
	.then (x => x .json ())
	.then (x => {;
		if (x .length === 0) {
			;the_state (L .set (setup_room, id, the_state ()))}
		else {
			;throw new Error ('taken') }})
	.catch (_ => {;get_room ()}) }
;get_room ()