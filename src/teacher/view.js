var Z = sanctuary

var number = x => {
  if (x === + x) {
    return x}
  else {
    ;throw 'Not a Number'}}


var and = (from_nothing, from_just) => maybe => 
  Z .reduce ((_, x) => from_just (x), from_nothing, maybe)


var completed_questions = number
var setup = data ({ setup: [ list (student), room, list (question), game_rules ] })


var state = data ({
	before: [ maybe (room), list (student), list (questions), game_rules ],
	during: [ completed_questions, setup ],
	after: [] })


var q_state = S .data (Z .Nothing)
var before_state = S (() => q_state () .before)
var during_state = S (() => q_state () .during)
var after_state = S (() => q_state () .after)



window .view = <div>
	{ Oo (before_state (), oo (and (Z .Nothing, x => x .)), oo (and ('Generating Code', x => 'Room: ' + room))) }
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