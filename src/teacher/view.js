var Z = sanctuary

var number = x => {
  if (x === + x)
    return x
  else
    ;throw 'Not a Number'}
var ;


var and = (x, y) => z => 
  Z .reduce ((_, z) => y (z), x, z)


var completed_questions = number
var setup = data ({ setup: [ list (student), room, list (question), game_rules ] })


var state = data ({
	before: [ maybe (room), list (student), list (questions), game_rules ],
	during: [ completed_questions, setup ],
	after: [] })


var io_state = S .data (Z .Nothing)
var before_state = S (() => io_state () .before)
var during_state = S (() => io_state () .during)
var after_state = S (() => io_state () .after)



window .view = <div>
	{ Xx (before_state (), pp (and (Z .Nothing, x => x .)), pp (and ('Generating Code', x => 'Room: ' + room))) }
</div>




var get_room = _ => {;
	var id = Oo (Math .random (),
		o (x => x * 100000000),
		o (x => Math .floor (x)))
	
	fetch ('/log/' + id)
	.then (x => x .json ())
	.then (x => {;
		if (x .length === 0) {
			;room (id)}
		else {
			;throw 'taken' }})
	.catch (_ => {; get_room ()}) }
;get_room ()
