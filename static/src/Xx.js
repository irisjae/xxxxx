var xx = function (x) {
	return { xx: x } }
var oo = function (x) {
	return { oo: x } }

var Oo = function () {
	if ('oo' in arguments [1]) {
		var answer = arguments [0]
		for (var i = 1; i < arguments .length; i ++) {
			;answer = arguments [i] .oo (answer) }
		return answer }
	else if ('xx' in arguments [1]) {
		var answer = arguments [0]
		for (var i = 1; i < arguments .length; i ++) {
			;answer = answer (arguments [i] .xx) }
		return answer }
	else {
		;throw 'Syntax Error; no oo or xx after focus Oo;' } }

window .xx = xx
window .oo = oo
window .Oo = Oo
//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22file%22%3A%22out.js%22%2C%22sources%22%3A%5B%22in.js%22%5D%2C%22sourcesContent%22%3A%5B%22var%20xx%20%3D%20function%20(x)%20%7B%5Cn%5Ctreturn%20%7B%20xx%3A%20x%20%7D%20%7D%5Cnvar%20oo%20%3D%20function%20(x)%20%7B%5Cn%5Ctreturn%20%7B%20oo%3A%20x%20%7D%20%7D%5Cn%5Cnvar%20Oo%20%3D%20function%20()%20%7B%5Cn%5Ctif%20('oo'%20in%20arguments%20%5B1%5D)%20%7B%5Cn%5Ct%5Ctvar%20answer%20%3D%20arguments%20%5B0%5D%5Cn%5Ct%5Ctfor%20(var%20i%20%3D%201%3B%20i%20%3C%20arguments%20.length%3B%20i%20%2B%2B)%20%7B%5Cn%5Ct%5Ct%5Ct%3Banswer%20%3D%20arguments%20%5Bi%5D%20.oo%20(answer)%20%7D%5Cn%5Ct%5Ctreturn%20answer%20%7D%5Cn%5Ctelse%20if%20('xx'%20in%20arguments%20%5B1%5D)%20%7B%5Cn%5Ct%5Ctvar%20answer%20%3D%20arguments%20%5B0%5D%5Cn%5Ct%5Ctfor%20(var%20i%20%3D%201%3B%20i%20%3C%20arguments%20.length%3B%20i%20%2B%2B)%20%7B%5Cn%5Ct%5Ct%5Ct%3Banswer%20%3D%20answer%20(arguments%20%5Bi%5D%20.xx)%20%7D%5Cn%5Ct%5Ctreturn%20answer%20%7D%5Cn%5Ctelse%20%7B%5Cn%5Ct%5Ct%3Bthrow%20'Syntax%20Error%3B%20no%20oo%20or%20xx%20after%20focus%20Oo%3B'%20%7D%20%7D%5Cn%5Cnwindow%20.xx%20%3D%20xx%5Cnwindow%20.oo%20%3D%20oo%5Cnwindow%20.Oo%20%3D%20Oo%22%5D%2C%22names%22%3A%5B%5D%2C%22mappings%22%3A%22AAAA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%22%7D
