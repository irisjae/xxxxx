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



window .view = (function () {
    var __;
    __ = Surplus.createElement("div", null, null);
    Surplus.S(function (__current) { return Surplus.content(__,  Oo (L .get (setup_room, the_state ()), oo (fro ('Generating Code', x => 'Room: ' + x))) , __current); }, '');
    return __;
})()




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
			;throw 'taken' }})
	.catch (_ => {;get_room ()}) }
;get_room ()
//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22file%22%3A%22out.js%22%2C%22sources%22%3A%5B%22in.js%22%5D%2C%22sourcesContent%22%3A%5B%22var%20Oo%20%3D%20window%20.Oo%5Cnvar%20oo%20%3D%20window%20.oo%5Cnvar%20R%20%3D%20window%20.R%5Cnvar%20L%20%3D%20window%20.L%5Cnvar%20S%20%3D%20window%20.S%5Cnvar%20Z%20%3D%20window%20.Z%5Cnvar%20data%20%3D%20window%20.data%5Cnvar%20fro%20%3D%20window%20.fro%5Cnvar%20defined%20%3D%20window%20.defined%5Cnvar%20number%20%3D%20window%20.number%5Cnvar%20string%20%3D%20window%20.string%5Cnvar%20list%20%3D%20window%20.list%5Cnvar%20maybe%20%3D%20window%20.maybe%5Cnvar%20id%20%3D%20window%20.id%5Cn%5Cn%5Cn%5Cn%5Cn%5Cn%5Cnvar%20student%20%3D%20id%5Cnvar%20question%20%3D%20string%5Cn%5Cnvar%20progress%20%3D%20number%5Cnvar%20setup%20%3D%20data%20(%7B%20setup%3A%20(%20students%20%3D%20list%20(student)%2C%20room%20%3D%20room%2C%20questions%20%3D%20list%20(question)%2C%20rules%20%3D%20game_rules%20)%20%3D%3E%20defined%20%7D)%5Cn%5Cnvar%20game_rules%20%3D%20data%20(%7B%5Cn%20%20rules%3A%20(time_limit%20%3D%20number%2C%20size%20%3D%20number)%20%3D%3E%20defined%20%7D)%5Cnvar%20default_rules%20%3D%20game_rules%20.rules%20(10%2C%2010)%5Cn%5Cnvar%20state%20%3D%20data%20(%7B%5Cn%5Ctsetup%3A%20(%20room%20%3D%20maybe%20(room)%2C%20students%20%3D%20list%20(student)%2C%20questions%20%3D%20list%20(questions)%2C%20rules%20%3D%20game_rules%20)%20%3D%3E%20defined%2C%5Cn%5Ctduring%3A%20(%20stats%2C%20completed_questions%20%3D%20progress%2C%20setup%20%3D%20setup%20)%20%3D%3E%20defined%2C%5Cn%5Ctdone%3A%20()%20%3D%3E%20defined%20%7D)%5Cn%5Cn%5Cn%5Cnvar%20the_state%20%3D%20S%20.data%20(state%20.setup%20(Z%20.Nothing%2C%20%5B%5D%2C%20%5B%5D%2C%20default_rules))%5Cn%5Cn%5Cn%5Cnvar%20the_setup%20%3D%20%5BL%20.prop%20('setup')%2C%20L%20.valueOr%20(Z%20.Nothing)%5D%5Cnvar%20the_room%20%3D%20%5BL%20.prop%20('room')%2C%20L%20.valueOr%20(Z%20.Nothing)%5D%5Cnvar%20setup_room%20%3D%20%5Bthe_setup%2C%20the_room%5D%5Cn%5Cn%5Cn%5Cnwindow%20.view%20%3D%20%3Cdiv%3E%5Cn%5Ct%7B%20Oo%20(L%20.get%20(setup_room%2C%20the_state%20())%2C%20oo%20(fro%20('Generating%20Code'%2C%20x%20%3D%3E%20'Room%3A%20'%20%2B%20x)))%20%7D%5Cn%3C%2Fdiv%3E%5Cn%5Cn%5Cn%5Cn%5Cnvar%20get_room%20%3D%20_%20%3D%3E%20%7B%3B%5Cn%5Ctvar%20id%20%3D%20Oo%20(Math%20.random%20()%2C%5Cn%5Ct%5Ctoo%20(x%20%3D%3E%20x%20*%20100000000)%2C%5Cn%5Ct%5Ctoo%20(x%20%3D%3E%20Math%20.floor%20(x)))%5Cn%5Ct%5Cn%5Ctfetch%20('%2Flog%2F'%20%2B%20id)%5Cn%5Ct.then%20(x%20%3D%3E%20x%20.json%20())%5Cn%5Ct.then%20(x%20%3D%3E%20%7B%3B%5Cn%5Ct%5Ctif%20(x%20.length%20%3D%3D%3D%200)%20%7B%5Cn%5Ct%5Ct%5Ct%3Bthe_state%20(L%20.set%20(setup_room%2C%20id%2C%20the_state%20()))%7D%5Cn%5Ct%5Ctelse%20%7B%5Cn%5Ct%5Ct%5Ct%3Bthrow%20'taken'%20%7D%7D)%5Cn%5Ct.catch%20(_%20%3D%3E%20%7B%3Bget_room%20()%7D)%20%7D%5Cn%3Bget_room%20()%22%5D%2C%22names%22%3A%5B%5D%2C%22mappings%22%3A%22AAAA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%2CeAAe%3B%3B%3BIACd%2C4DAAC%3B%3BIACI%3BAACN%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%22%7D
