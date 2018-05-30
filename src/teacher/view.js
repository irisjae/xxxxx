var Z = sanctuary



var number = x => {
  /*if (x === + x) {
    return x}
  else {
    ;throw 'Not a Number'}*/}

var list = x => {
  /*if (x .constructor === Array)
    return x
  else if (x .constructor === String)
    return x
  else {
    ;throw 'Not a List'}*/}

var maybe = x => {
  /*if (Maybe ._test (x))
    return x
  else {
    ;throw 'Not a Maybe'}*/}





var fro = (from_nothing, from_just) => maybe => 
  Z .reduce ((_, x) => from_just (x), from_nothing, maybe)


var completed_questions = number
var setup = data ({ setup: [ list (student), room, list (question), game_rules ] })


var state = data ({
	before: ( room = maybe (room), students = list (student), questions = list (questions), rules = game_rules ) => {},
	during: ( completed_questions, setup ) => {},
	after: [] })


var q_state = S .data (Z .Nothing)



window .view = <div>
	{ Oo (before_state (), oo (fro (Z .Nothing, x => x .)), oo (fro ('Generating Code', x => 'Room: ' + room))) }
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