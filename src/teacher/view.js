var Oo = window .Oo
var oo = window .oo
var R = window .R
var S = window .S
var Z = window .sanctuary

var defined

var number = defined
var string = defined
var list = a => defined
var maybe = a => defined
var id = string

var data = constructors => Oo (constructors,
  oo (Z .map (fn => {
    var args_slice = fn .toString() .match (/\((.+?)\)/) [1]
    var portions = args_slice .split (',')
    return (...vals) => 
      Z .fromPairs (R .zip (portions, vals))})))



var fro = (from_nothing, from_just) => (maybe = maybe) => 
  Z .reduce ((_, x) => from_just (x), from_nothing, maybe)






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



var now_state = S .data (
  state .before (Z .Nothing), [], [], default_rules)


var 


window .view = <div>
	{ Oo (before_state (), oo (fro (Z .Nothing, x => x .x)), oo (fro ('Generating Code', x => 'Room: ' + room))) }
</div>




var get_room = _ => {;
	var id = Oo (Math .random (),
		oo (x => x * 100000000),
		oo (x => Math .floor (x)))
	
	fetch ('/log/' + id)
	.then (x => x .json ())
	.then (x => {;
		if (x .length === 0) {
			;room (id)}
		else {
			;throw 'taken' }})
	.catch (_ => {;get_room ()}) }
;get_room ()