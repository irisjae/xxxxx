var Z = sanctuary




var completed_questions = number
var setup = data ({ setup: [ list (student), room, list (question), game_rules ] })


var state = data ({
	before: [ maybe (room), list (student), list (questions), game_rules ],
	during: [ completed_questions, setup ],
	after: [] })

var room = S .data (Z .Nothing)



window .view = <div>
	{ Z .reduce (
		(_, room) => 'Room: ' + room
		'Generating Code',
		room ()) } </div>




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
