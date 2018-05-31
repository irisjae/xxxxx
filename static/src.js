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

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22file%22%3A%22out.js%22%2C%22sources%22%3A%5B%22in.js%22%5D%2C%22sourcesContent%22%3A%5B%22var%20Oo%20%3D%20window%20.Oo%5Cnvar%20oo%20%3D%20window%20.oo%5Cn%5Cnwindow%20.L%20%3D%20require%20('partial.lenses')%5Cnwindow%20.R%20%3D%20require%20('ramda')%5Cnwindow%20.S%20%3D%20require%20('s-js')%5Cnwindow%20.Z%20%3D%20require%20('sanctuary')%20.create%20(%7B%20checkTypes%3A%20true%2C%20env%3A%20require%20('sanctuary')%20.env%20%7D)%3B%5Cnwindow%20.Surplus%20%3D%20require%20('surplus')%5Cn%5Cnvar%20R%20%3D%20window%20.R%5Cnvar%20Z%20%3D%20window%20.Z%5Cn%5Cnvar%20defined%5Cnwindow%20.defined%20%3D%20defined%5Cn%5Cnwindow%20.number%20%3D%20defined%5Cnwindow%20.string%20%3D%20defined%5Cnwindow%20.list%20%3D%20a%20%3D%3E%20defined%5Cnwindow%20.maybe%20%3D%20a%20%3D%3E%20defined%5Cnwindow%20.id%20%3D%20window%20.string%5Cn%5Cnvar%20maybe%20%3D%20window%20.maybe%5Cn%5Cnwindow%20.data%20%3D%20constructors%20%3D%3E%20Oo%20(constructors%2C%5Cn%20%20oo%20(R%20.mapObjIndexed%20((fn%2C%20key)%20%3D%3E%20%7B%5Cn%20%20%20%20var%20args_slice%20%3D%20fn%20.toString()%20.match%20(%2F%5C%5C((.*%3F)%5C%5C)%5C%5Cs*%3D%3E%2F)%20%5B1%5D%5Cn%20%20%20%20if%20(args_slice)%20%7B%5Cn%20%20%20%20%20%20var%20portions%20%3D%20args_slice%20.split%20('%2C')%20.map%20(x%20%3D%3E%20x%20.match%20(%2F(%5B%5E%5C%5Cs%3D%5D%2B)%5C%5Cs*(%3F%3A%3D.%2B)%3F%2F)%20%5B1%5D)%5Cn%20%20%20%20%20%20return%20(...vals)%20%3D%3E%20%5Cn%20%20%20%20%20%20%20%20R%20.objOf%20(key%2C%20R%20.fromPairs%20(R%20.zip%20(portions%2C%20vals)))%7D%5Cn%20%20%20%20else%5Cn%20%20%20%20%20%20return%20R%20.objOf%20(key%2C%20%7B%7D)%7D)))%5Cn%5Cn%5Cn%5Cnwindow%20.fro%20%3D%20(from_nothing%2C%20from_just)%20%3D%3E%20(maybe%20%3D%20maybe)%20%3D%3E%20%5Cn%20%20Z%20.reduce%20((_%2C%20x)%20%3D%3E%20from_just%20(x)%2C%20from_nothing%2C%20maybe)%5Cn%5Cn%5Cndocument%20.addEventListener%20('DOMContentLoaded'%2C%20_%20%3D%3E%20%7B%3B%5Cn%5Ct%3B%3B%20document%20.body%20.appendChild%20(window%20.view)%5Cn%7D)%5Cn%5Cn%2F%2F%23%20sourceMappingURL%3Ddata%3Aapplication%2Fjson%2C%257B%2522version%2522%253A3%252C%2522file%2522%253A%2522out.js%2522%252C%2522sources%2522%253A%255B%2522in.js%2522%255D%252C%2522sourcesContent%2522%253A%255B%2522var%2520Oo%2520%253D%2520window%2520.Oo%255Cnvar%2520oo%2520%253D%2520window%2520.oo%255Cn%255Cnwindow%2520.L%2520%253D%2520require%2520('partial.lenses')%255Cnwindow%2520.R%2520%253D%2520require%2520('ramda')%255Cnwindow%2520.S%2520%253D%2520require%2520('s-js')%255Cnwindow%2520.Z%2520%253D%2520require%2520('sanctuary')%2520.create%2520(%257B%2520checkTypes%253A%2520true%252C%2520env%253A%2520require%2520('sanctuary')%2520.env%2520%257D)%253B%255Cnwindow%2520.Surplus%2520%253D%2520require%2520('surplus')%255Cn%255Cnvar%2520R%2520%253D%2520window%2520.R%255Cnvar%2520Z%2520%253D%2520window%2520.Z%255Cn%255Cnvar%2520defined%255Cnwindow%2520.defined%2520%253D%2520defined%255Cn%255Cnwindow%2520.number%2520%253D%2520defined%255Cnwindow%2520.string%2520%253D%2520defined%255Cnwindow%2520.list%2520%253D%2520a%2520%253D%253E%2520defined%255Cnwindow%2520.maybe%2520%253D%2520a%2520%253D%253E%2520defined%255Cnwindow%2520.id%2520%253D%2520window%2520.string%255Cn%255Cnvar%2520maybe%2520%253D%2520window%2520.maybe%255Cn%255Cnwindow%2520.data%2520%253D%2520constructors%2520%253D%253E%2520Oo%2520(constructors%252C%255Cn%2520%2520oo%2520(R%2520.mapObjIndexed%2520((fn%252C%2520key)%2520%253D%253E%2520%257B%255Cn%2520%2520%2520%2520var%2520args_slice%2520%253D%2520fn%2520.toString()%2520.match%2520(%252F%255C%255C((.*%253F)%255C%255C)%255C%255Cs*%253D%253E%252F)%2520%255B1%255D%255Cn%2520%2520%2520%2520if%2520(args_slice)%2520%257B%255Cn%2520%2520%2520%2520%2520%2520var%2520portions%2520%253D%2520args_slice%2520.split%2520('%252C')%2520.map%2520(x%2520%253D%253E%2520x%2520.match%2520(%252F(%255B%255E%255C%255Cs%253D%255D%252B)%255C%255Cs*(%253F%253A%253D.%252B)%253F%252F)%2520%255B1%255D)%255Cn%2520%2520%2520%2520%2520%2520return%2520(...vals)%2520%253D%253E%2520%255Cn%2520%2520%2520%2520%2520%2520%2520%2520R%2520.objOf%2520(key%252C%2520R%2520.fromPairs%2520(R%2520.zip%2520(portions%252C%2520vals)))%257D%255Cn%2520%2520%2520%2520else%255Cn%2520%2520%2520%2520%2520%2520return%2520R%2520.objOf%2520(key%252C%2520%257B%257D)%257D)))%255Cn%255Cn%255Cn%255Cnwindow%2520.fro%2520%253D%2520(from_nothing%252C%2520from_just)%2520%253D%253E%2520(maybe%2520%253D%2520maybe)%2520%253D%253E%2520%255Cn%2520%2520Z%2520.reduce%2520((_%252C%2520x)%2520%253D%253E%2520from_just%2520(x)%252C%2520from_nothing%252C%2520maybe)%255Cn%255Cn%255Cndocument%2520.addEventListener%2520('DOMContentLoaded'%252C%2520_%2520%253D%253E%2520%257B%253B%255Cn%255Ct%253B%253B%2520document%2520.body%2520.appendChild%2520(window%2520.view)%255Cn%257D)%255Cn%2522%255D%252C%2522names%2522%253A%255B%255D%252C%2522mappings%2522%253A%2522AAAA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%253BAACA%2522%257D%5Cn%22%5D%2C%22names%22%3A%5B%5D%2C%22mappings%22%3A%22AAAA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%3BAACA%22%7D
