var Oo = window .Oo
var oo = window .oo

window .L = require ('partial.lenses')
window .R = require ('ramda')
window .S = require ('s-js')
window .Z = require ('sanctuary') .create ({ checkTypes: true, env: require ('sanctuary') .env });
window .Surplus = require ('surplus')

var R = window .R
var Z = window .Z

var defined
window .defined = defined

window .number = defined
window .string = defined
window .list = a => defined
window .maybe = a => defined
window .id = window .string

var maybe = window .maybe

window .data = constructors => Oo (constructors,
  oo (R .mapObjIndexed ((fn, key) => {
    var args_slice = fn .toString() .match (/\((.*?)\)\s*=>/) [1]
    if (args_slice) {
      var portions = args_slice .split (',') .map (x => x .match (/([^\s=]+)\s*(?:=.+)?/) [1])
      return (...vals) => 
        R .objOf (key, R .fromPairs (R .zip (portions, vals)))}
    else
      return R .objOf (key, {})})))



window .fro = (from_nothing, from_just) => (maybe = maybe) => 
  Z .reduce ((_, x) => from_just (x), from_nothing, maybe)


document .addEventListener ('DOMContentLoaded', _ => {;
	;; document .body .appendChild (window .view)
})

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22file%22%3A%22out.js%22%2C%22sources%22%3A%5B%22in.js%22%5D%2C%22sourcesContent%22%3A%5B%22var%20Oo%20%3D%20window%20.Oo%5Cnvar%20oo%20%3D%20window%20.oo%5Cn%5Cnwindow%20.L%20%3D%20require%20('partial.lenses')%5Cnwindow%20.R%20%3D%20require%20('ramda')%5Cnwindow%20.S%20%3D%20require%20('s-js')%5Cnwindow%20.Z%20%3D%20require%20('sanctuary')%20.create%20(%7B%20checkTypes%3A%20true%2C%20env%3A%20require%20('sanctuary')%20.env%20%7D)%3B%5Cnwindow%20.Surplus%20%3D%20require%20('surplus')%5Cn%5Cnvar%20R%20%3D%20window%20.R%5Cnvar%20Z%20%3D%20window%20.Z%5Cn%5Cnvar%20defined%5Cnwindow%20.defined%20%3D%20defined%5Cn%5Cnwindow%20.number%20%3D%20defined%5Cnwindow%20.string%20%3D%20defined%5Cnwindow%20.list%20%3D%20a%20%3D%3E%20defined%5Cnwindow%20.maybe%20%3D%20a%20%3D%3E%20defined%5Cnwindow%20.id%20%3D%20window%20.string%5Cn%5Cnvar%20maybe%20%3D%20window%20.maybe%5Cn%5Cnwindow%20.data%20%3D%20constructors%20%3D%3E%20Oo%20(constructors%2C%5Cn%20%20oo%20(R%20.mapObjIndexed%20((fn%2C%20key)%20%3D%3E%20%7B%5Cn%20%20%20%20var%20args_slice%20%3D%20fn%20.toString()%20.match%20(%2F%5C%5C((.*%3F)%5C%5C)%5C%5Cs*%3D%3E%2F)%20%5B1%5D%5Cn%20%20%20%20if%20(args_slice)%20%7B%5Cn%20%20%20%20%20%20var%20portions%20%3D%20args_slice%20.split%20('%2C')%20.map%20(x%20%3D%3E%20x%20.match%20(%2F(%5B%5E%5C%5Cs%3D%5D%2B)%5C%5Cs*(%3F%3A%3D.%2B)%3F%2F)%20%5B1%5D)%5Cn%20%20%20%20%20%20return%20(...vals)%20%3D%3E%20%5Cn%20%20%20%20%20%20%20%20R%20.objOf%20(key%2C%20R%20.fromPairs%20(R%20.zip%20(portions%2C%20vals)))%7D%5Cn%20%20%20%20else%5Cn%20%20%20%20%20%20return%20R%20.objOf%20(key%2C%20%7B%7D)%7D)))%5Cn%5Cn%5Cn%5Cnwindow%20.fro%20%3D%20(from_nothing%2C%20from_just)%20%3D%3E%20(maybe%20%3D%20maybe)%20%3D%3E%20%5Cn%20%20Z%20.reduce%20((_%2C%20x)%20%3D%3E%20from_just%20(x)%2C%20from_nothing%2C%20maybe)%5Cn%5Cn%5Cndocument%20.addEventListener%20('DOMContentLoaded'%2C%20_%20%3D%3E%20%7B%3B%5Cn%5Ct%3B%3B%20document%20.body%20.appendChild%20(window%20.view)%5Cn%7D)%5Cn%22%5D%2C%22names%22%3A%5B%5D%2C%22mappings%22%3A%22AAAA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%22%7D
