;
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
window .Oo = Oo;
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    var portions = args_slice .split (',') .map (x => x .match (/([^\s=]+)\s*(?:=.+)?/) [1])
    return (...vals) => 
      R .objOf (key, Z .fromPairs (R .zip (portions, vals)))})))



window .fro = (from_nothing, from_just) => (maybe = maybe) => 
  Z .reduce ((_, x) => from_just (x), from_nothing, maybe)


document .addEventListener ('DOMContentLoaded', _ => {;
	;; document .body .appendChild (window .view)
})

},{"partial.lenses":3,"ramda":89,"s-js":324,"sanctuary":329,"surplus":330}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ary1of2 = function ary1of2(fn) {
  return function (x0, x1) {
    return arguments.length < 2 ? fn(x0) : fn(x0)(x1);
  };
};

var ary2of2 = function ary2of2(fn) {
  return function (x0, x1) {
    return arguments.length < 2 ? function (x1) {
      return fn(x0, x1);
    } : fn(x0, x1);
  };
};

var ary1of3 = function ary1of3(fn) {
  return function (x0, x1, x2) {
    switch (arguments.length) {
      case 0:
      case 1:
        return curryN(2, fn(x0));
      case 2:
        return curryN(2, fn(x0))(x1);
      default:
        return curryN(2, fn(x0))(x1, x2);
    }
  };
};

var ary2of3 = function ary2of3(fn) {
  return function (x0, x1, x2) {
    switch (arguments.length) {
      case 0:
      case 1:
        return ary1of2(function (x1) {
          return fn(x0, x1);
        });
      case 2:
        return fn(x0, x1);
      default:
        return fn(x0, x1)(x2);
    }
  };
};

var ary3of3 = function ary3of3(fn) {
  return function (x0, x1, x2) {
    switch (arguments.length) {
      case 0:
      case 1:
        return ary2of2(function (x1, x2) {
          return fn(x0, x1, x2);
        });
      case 2:
        return function (x2) {
          return fn(x0, x1, x2);
        };
      default:
        return fn(x0, x1, x2);
    }
  };
};

var ary1of4 = function ary1of4(fn) {
  return function (x0, x1, x2, x3) {
    switch (arguments.length) {
      case 0:
      case 1:
        return curryN(3, fn(x0));
      case 2:
        return curryN(3, fn(x0))(x1);
      case 3:
        return curryN(3, fn(x0))(x1, x2);
      default:
        return curryN(3, fn(x0))(x1, x2, x3);
    }
  };
};

var ary2of4 = function ary2of4(fn) {
  return function (x0, x1, x2, x3) {
    switch (arguments.length) {
      case 0:
      case 1:
        return ary1of3(function (x1) {
          return fn(x0, x1);
        });
      case 2:
        return curryN(2, fn(x0, x1));
      case 3:
        return curryN(2, fn(x0, x1))(x2);
      default:
        return curryN(2, fn(x0, x1))(x2, x3);
    }
  };
};

var ary3of4 = function ary3of4(fn) {
  return function (x0, x1, x2, x3) {
    switch (arguments.length) {
      case 0:
      case 1:
        return ary2of3(function (x1, x2) {
          return fn(x0, x1, x2);
        });
      case 2:
        return ary1of2(function (x2) {
          return fn(x0, x1, x2);
        });
      case 3:
        return fn(x0, x1, x2);
      default:
        return fn(x0, x1, x2)(x3);
    }
  };
};

var ary4of4 = function ary4of4(fn) {
  return function (x0, x1, x2, x3) {
    switch (arguments.length) {
      case 0:
      case 1:
        return ary3of3(function (x1, x2, x3) {
          return fn(x0, x1, x2, x3);
        });
      case 2:
        return ary2of2(function (x2, x3) {
          return fn(x0, x1, x2, x3);
        });
      case 3:
        return function (x3) {
          return fn(x0, x1, x2, x3);
        };
      default:
        return fn(x0, x1, x2, x3);
    }
  };
};

var ary0of0 = function ary0of0(fn) {
  return fn.length === 0 ? fn : function () {
    return fn();
  };
};
var ary1of1 = function ary1of1(fn) {
  return fn.length === 1 ? fn : function (x) {
    return fn(x);
  };
};

var C = [[ary0of0], [ary1of1, ary1of1], [void 0, ary1of2, ary2of2], [void 0, ary1of3, ary2of3, ary3of3], [void 0, ary1of4, ary2of4, ary3of4, ary4of4]];

var curryN = function curryN(n, f) {
  return C[n][Math.min(n, f.length)](f);
};
var arityN = function arityN(n, f) {
  return C[n][n](f);
};
var curry = function curry(f) {
  return arityN(f.length, f);
};

//

var assign = Object.assign;

var toObject = function toObject(x) {
  return assign({}, x);
};

//

var id = function id(x) {
  return x;
};
var always = function always(x) {
  return function (_) {
    return x;
  };
};
var applyU = function applyU(x2y, x) {
  return x2y(x);
};
var sndU = function sndU(_, y) {
  return y;
};

//

var freeze = function freeze(x) {
  return x && Object.freeze(x);
};

var array0 = /*#__PURE__*/freeze([]);
var object0 = /*#__PURE__*/freeze({});

//

var isDefined = function isDefined(x) {
  return void 0 !== x;
};

//

var hasU = function hasU(p, x) {
  return Object.prototype.hasOwnProperty.call(x, p);
};

//

var prototypeOf = function prototypeOf(x) {
  return null == x ? x : Object.getPrototypeOf(x);
};

var constructorOf = function constructorOf(x) {
  return null == x ? x : (hasU('constructor', x) ? prototypeOf(x) : x).constructor;
};

//

var isFunction = function isFunction(x) {
  return typeof x === 'function';
};
var isString = function isString(x) {
  return typeof x === 'string';
};
var isNumber = function isNumber(x) {
  return typeof x === 'number';
};

var isArray = Array.isArray;

var object = /*#__PURE__*/prototypeOf({});
var isObject = function isObject(x) {
  return null != x && typeof x === 'object' && (hasU('constructor', x) ? prototypeOf(x) === object : x.constructor === Object);
};

//

function pipe2U(fn1, fn2) {
  var n = fn1.length;
  return n === 1 ? function (x) {
    return fn2(fn1(x));
  } : arityN(n, function () {
    return fn2(fn1.apply(undefined, arguments));
  });
}

var compose2U = function compose2U(fn1, fn2) {
  return pipe2U(fn2, fn1);
};

//

function seq(x) {
  for (var _len = arguments.length, fns = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    fns[_key - 1] = arguments[_key];
  }

  for (var i = 0, n = fns.length; i < n; ++i) {
    x = fns[i](x);
  }return x;
}

function seqPartial(x) {
  for (var _len2 = arguments.length, fns = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    fns[_key2 - 1] = arguments[_key2];
  }

  for (var i = 0, n = fns.length; isDefined(x) && i < n; ++i) {
    x = fns[i](x);
  }return x;
}

//

var identicalU = function identicalU(a, b) {
  return a === b && (a !== 0 || 1 / a === 1 / b) || a !== a && b !== b;
};

//

function whereEqU(t, o) {
  for (var k in t) {
    var bk = o[k];
    if (!isDefined(bk) && !hasU(k, o) || !acyclicEqualsU(t[k], bk)) return false;
  }
  return true;
}

//

function hasKeysOfU(t, o) {
  for (var k in t) {
    if (!hasU(k, o)) return false;
  }return true;
}

//

var acyclicEqualsObject = function acyclicEqualsObject(a, b) {
  return whereEqU(a, b) && hasKeysOfU(b, a);
};

function acyclicEqualsArray(a, b) {
  var n = a.length;
  if (n !== b.length) return false;
  for (var i = 0; i < n; ++i) {
    if (!acyclicEqualsU(a[i], b[i])) return false;
  }return true;
}

function acyclicEqualsU(a, b) {
  if (identicalU(a, b)) return true;
  if (!a || !b) return false;
  var c = constructorOf(a);
  if (c !== constructorOf(b)) return false;
  switch (c) {
    case Array:
      return acyclicEqualsArray(a, b);
    case Object:
      return acyclicEqualsObject(a, b);
    default:
      return isFunction(a.equals) && a.equals(b);
  }
}

//

function unzipObjIntoU(o, ks, vs) {
  for (var k in o) {
    if (ks) ks.push(k);
    if (vs) vs.push(o[k]);
  }
}

function keys(o) {
  if (o instanceof Object) {
    if (isObject(o)) {
      var ks = [];
      unzipObjIntoU(o, ks, 0);
      return ks;
    } else {
      return Object.keys(o);
    }
  }
}

function values(o) {
  if (o instanceof Object) {
    if (isObject(o)) {
      var vs = [];
      unzipObjIntoU(o, 0, vs);
      return vs;
    } else {
      var xs = Object.keys(o),
          n = xs.length;
      for (var i = 0; i < n; ++i) {
        xs[i] = o[xs[i]];
      }return xs;
    }
  }
}

//

function assocPartialU(k, v, o) {
  var r = {};
  if (o instanceof Object) {
    if (!isObject(o)) o = toObject(o);
    for (var l in o) {
      if (l !== k) {
        r[l] = o[l];
      } else {
        r[k] = v;
        k = void 0;
      }
    }
  }
  if (isDefined(k)) r[k] = v;
  return r;
}

function dissocPartialU(k, o) {
  var r = void 0;
  if (o instanceof Object) {
    if (!isObject(o)) o = toObject(o);
    for (var l in o) {
      if (l !== k) {
        if (!r) r = {};
        r[l] = o[l];
      } else {
        k = void 0;
      }
    }
  }
  return r;
}

//

var inherit = function inherit(Derived, Base, protos, statics) {
  return assign(Derived.prototype = Object.create(Base.prototype), protos).constructor = assign(Derived, statics);
};

exports.curryN = curryN;
exports.arityN = arityN;
exports.curry = curry;
exports.assign = assign;
exports.toObject = toObject;
exports.id = id;
exports.always = always;
exports.applyU = applyU;
exports.sndU = sndU;
exports.freeze = freeze;
exports.array0 = array0;
exports.object0 = object0;
exports.isDefined = isDefined;
exports.hasU = hasU;
exports.prototypeOf = prototypeOf;
exports.constructorOf = constructorOf;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isArray = isArray;
exports.isObject = isObject;
exports.pipe2U = pipe2U;
exports.compose2U = compose2U;
exports.seq = seq;
exports.seqPartial = seqPartial;
exports.identicalU = identicalU;
exports.whereEqU = whereEqU;
exports.hasKeysOfU = hasKeysOfU;
exports.acyclicEqualsObject = acyclicEqualsObject;
exports.acyclicEqualsU = acyclicEqualsU;
exports.unzipObjIntoU = unzipObjIntoU;
exports.keys = keys;
exports.values = values;
exports.assocPartialU = assocPartialU;
exports.dissocPartialU = dissocPartialU;
exports.inherit = inherit;

},{}],3:[function(require,module,exports){
(function (process){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var I = require('infestines');

var addU = function addU(x, y) {
  return x + y;
};
var multiplyU = function multiplyU(x, y) {
  return x * y;
};

var add = /*#__PURE__*/I.curry(addU);
var multiply = /*#__PURE__*/I.curry(multiplyU);

var divideBy = /*#__PURE__*/I.curry(function (d, n) {
  return n / d;
});

var negate = function negate(x) {
  return -x;
};

var ltU = function ltU(x, y) {
  return x < y;
};
var gtU = function gtU(x, y) {
  return x > y;
};

var isInstanceOf = /*#__PURE__*/I.curry(function (Class, x) {
  return x instanceof Class;
});

var create = Object.create;
var protoless = function protoless(o) {
  return I.assign(create(null), o);
};
var protoless0 = /*#__PURE__*/I.freeze( /*#__PURE__*/protoless(I.object0));

var replace = /*#__PURE__*/I.curry(function (p, r, s) {
  return s.replace(p, r);
});

var dep = function dep(xs2xsyC) {
  return function (xsy) {
    return I.arityN(xsy.length, function () {
      return xs2xsyC.apply(undefined, arguments)(xsy).apply(undefined, arguments);
    });
  };
};

var fn = function fn(xsC, yC) {
  return function (xsy) {
    return I.arityN(xsy.length, function () {
      for (var _len = arguments.length, xs = Array(_len), _key = 0; _key < _len; _key++) {
        xs[_key] = arguments[_key];
      }

      return yC(xsy.apply(null, xsC(xs)));
    });
  };
};

var res = function res(yC) {
  return fn(I.id, yC);
};

var args = function args(xsC) {
  return fn(xsC, I.id);
};

var nth = function nth(i, xC) {
  return function (xs) {
    var ys = xs.slice(0);
    ys[i] = xC(ys[i]);
    return ys;
  };
};

var par = function par(i, xC) {
  return args(nth(i, xC));
};

var and = function and() {
  for (var _len2 = arguments.length, xCs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    xCs[_key2] = arguments[_key2];
  }

  return function (x) {
    for (var i = 0, n = xCs.length; i < n; ++i) {
      x = xCs[i](x);
    }return x;
  };
};

var or = function or() {
  for (var _len3 = arguments.length, xCs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    xCs[_key3] = arguments[_key3];
  }

  return function (x) {
    var es = null;
    for (var i = 0, n = xCs.length; i < n; ++i) {
      try {
        return xCs[i](x);
      } catch (e) {
        es = e;
      }
    }
    throw es;
  };
};

var ef = function ef(xE) {
  return function (x) {
    xE(x);
    return x;
  };
};

var tup = function tup() {
  for (var _len4 = arguments.length, xCs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    xCs[_key4] = arguments[_key4];
  }

  return function (xs) {
    if (xs.length !== xCs.length) throw Error('Expected array of ' + xCs.length + ' elements, but got ' + xs.length);
    return and.apply(null, xCs.map(function (xC, i) {
      return nth(i, xC);
    }))(xs);
  };
};

var arr = function arr(xC) {
  return function (xs) {
    return xs.map(xC);
  };
};

//

var toRegExpU = function toRegExpU(str, flags) {
  return I.isString(str) ? new RegExp(replace(/[|\\{}()[\]^$+*?.]/g, '\\$&', str), flags) : str;
};

//

var returnAsync = function returnAsync(x) {
  return Promise.resolve(x);
};

var chainAsync = function chainAsync(xyP, xP) {
  return null != xP && I.isFunction(xP.then) ? xP.then(xyP) : xyP(xP);
};

//

var toStringPartial = function toStringPartial(x) {
  return void 0 !== x ? String(x) : '';
};

var sliceIndex = function sliceIndex(m, l, d, i) {
  return void 0 !== i ? Math.min(Math.max(m, i < 0 ? l + i : i), l) : d;
};

var cpair = function cpair(xs) {
  return function (x) {
    return [x, xs];
  };
};

var unto = function unto(c) {
  return function (x) {
    return void 0 !== x ? x : c;
  };
};
var unto0 = /*#__PURE__*/unto(0);

var notPartial = function notPartial(x) {
  return void 0 !== x ? !x : x;
};

var singletonPartial = function singletonPartial(x) {
  return void 0 !== x ? [x] : x;
};

var expect = function expect(p, f) {
  return function (x) {
    return p(x) ? f(x) : void 0;
  };
};

function deepFreeze(x) {
  if (I.isArray(x)) {
    x.forEach(deepFreeze);
    I.freeze(x);
  } else if (I.isObject(x)) {
    for (var k in x) {
      deepFreeze(x[k]);
    }I.freeze(x);
  }
  return x;
}

function freezeArrayOfObjects(xs) {
  xs.forEach(I.freeze);
  return I.freeze(xs);
}

var isArrayOrPrimitive = function isArrayOrPrimitive(x) {
  return !(x instanceof Object) || I.isArray(x);
};

var rev = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : res(I.freeze))(function (xs) {
  if (seemsArrayLike(xs)) {
    var n = xs.length;
    var ys = Array(n);
    var i = 0;
    while (n) {
      ys[i++] = xs[--n];
    }return ys;
  }
});

//

var isEmptyArrayStringOrObject = function isEmptyArrayStringOrObject(x) {
  return I.acyclicEqualsU(I.array0, x) || I.acyclicEqualsU(I.object0, x) || x === '';
};

var warnEmpty = function warnEmpty(o, v, f) {
  var msg = '`' + f + '(' + JSON.stringify(v) + ')` is likely unnecessary, because combinators no longer remove empty arrays, objects, or strings by default.  See CHANGELOG for more information.';
  return function (x) {
    if (I.acyclicEqualsU(v, x)) warn(o, msg);
    return x;
  };
};

//

var mapPartialIndexU = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : function (fn$$1) {
  return function (xi2y, xs, skip) {
    var ys = fn$$1(xi2y, xs, skip);
    if (xs !== ys) I.freeze(ys);
    return ys;
  };
})(function (xi2y, xs, skip) {
  var n = xs.length;
  var ys = Array(n);
  var j = 0;
  var same = true;
  for (var i = 0; i < n; ++i) {
    var x = xs[i];
    var y = xi2y(x, i);
    if (skip !== y) {
      ys[j++] = y;
      if (same) same = x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
    }
  }
  if (j !== n) {
    ys.length = j;
    return ys;
  } else if (same) {
    return xs;
  } else {
    return ys;
  }
});

var mapIfArrayLike = function mapIfArrayLike(xi2y, xs) {
  return seemsArrayLike(xs) ? mapPartialIndexU(xi2y, xs, void 0) : void 0;
};

var copyToFrom = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : function (fn$$1) {
  return function (ys, k, xs, i, j) {
    return ys.length === k + j - i ? I.freeze(fn$$1(ys, k, xs, i, j)) : fn$$1(ys, k, xs, i, j);
  };
})(function (ys, k, xs, i, j) {
  while (i < j) {
    ys[k++] = xs[i++];
  }return ys;
});

//

function selectInArrayLike(xi2v, xs) {
  for (var i = 0, n = xs.length; i < n; ++i) {
    var v = xi2v(xs[i], i);
    if (void 0 !== v) return v;
  }
}

//

var Select = {
  map: I.sndU,
  of: function of() {},
  ap: function ap(l, r) {
    return void 0 !== l ? l : r;
  }
};

var ConcatOf = function ConcatOf(ap, empty) {
  return { map: I.sndU, ap: ap, of: I.always(empty) };
};

var Sum = /*#__PURE__*/ConcatOf(addU, 0);

var mumBy = function mumBy(ord) {
  return I.curry(function (xi2y, t, s) {
    var minX = void 0;
    var minY = void 0;
    traverseU(Select, function (x, i) {
      var y = xi2y(x, i);
      if (void 0 !== y && (void 0 === minY || ord(y, minY))) {
        minX = x;
        minY = y;
      }
    }, t, s);
    return minX;
  });
};

//

var traverseU = function traverseU(C, xi2yC, t, s) {
  return toFunction(t)(s, void 0, C, xi2yC);
};

//

var expectedOptic = 'Expecting an optic';
var opticIsEither = 'An optic can be either\n- a string,\n- a non-negative integer,\n- a quaternary optic function,\n- an ordinary unary or binary function, or\n- an array of optics.\nSee documentation of `toFunction` and `compose` for details.';
var header = 'partial.lenses: ';

function warn(f, m) {
  if (!f.warned) {
    f.warned = 1;
    console.warn(header + m);
  }
}

function errorGiven(m, o, e) {
  m = header + m + '.';
  e = e ? '\n' + e : '';
  console.error(m, 'Given:', o, e);
  throw Error(m + e);
}

function reqIndex(x) {
  if (!Number.isInteger(x) || x < 0) errorGiven('`index` expects a non-negative integer', x);
}

function reqFunction(o) {
  if (!(I.isFunction(o) && (o.length === 4 || o.length <= 2))) errorGiven(expectedOptic, o, opticIsEither);
}

function reqFn(x) {
  if (!I.isFunction(x)) errorGiven('Expected a function', x);
}

function reqArray(o) {
  if (!I.isArray(o)) errorGiven(expectedOptic, o, opticIsEither);
}

function reqOptic(o) {
  switch (typeof o) {
    case 'string':
      break;
    case 'number':
      reqIndex(o);
      break;
    case 'object':
      reqArray(o);
      for (var i = 0, n = o.length; i < n; ++i) {
        reqOptic(o[i]);
      }break;
    default:
      reqFunction(o);
      break;
  }
}

//

var reqString = function reqString(msg) {
  return function (x) {
    if (!I.isString(x)) errorGiven(msg, x);
  };
};

var reqMaybeArray = function reqMaybeArray(msg) {
  return function (zs) {
    if (!(void 0 === zs || seemsArrayLike(zs))) errorGiven(msg, zs);
  };
};

//

var reqApplicative = function reqApplicative(name, arg) {
  return function (C) {
    if (!C.of) errorGiven('`' + name + (arg ? '(' + arg + ')' : '') + '` requires an applicative', C, 'Note that you cannot `get` a traversal. Perhaps you wanted to `collect` it?');
  };
};

var reqMonad = function reqMonad(name) {
  return function (C) {
    if (!C.chain) errorGiven('`' + name + '` requires a monad', C, 'Note that you can only `modify`, `remove`, `set`, and `traverse` a transform.');
  };
};

//

var mkTraverse = function mkTraverse(after, toC) {
  return I.curryN(4, function (xi2yC, m) {
    return m = toC(m), function (t, s) {
      return after(traverseU(m, xi2yC, t, s));
    };
  });
};

//

var consExcept = function consExcept(skip) {
  return function (t) {
    return function (h) {
      return skip !== h ? [h, t] : t;
    };
  };
};
var consTo = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : res(I.freeze))(function (n) {
  var xs = [];
  while (consExcept !== n) {
    xs.push(n[0]);
    n = n[1];
  }
  return xs.reverse();
});

function traversePartialIndex(A, xi2yA, xs, skip) {
  var map = A.map,
      ap = A.ap;

  var xsA = A.of(consExcept);
  var n = xs.length;
  if (map === I.sndU) {
    for (var i = 0; i < n; ++i) {
      xsA = ap(xsA, xi2yA(xs[i], i));
    }return xsA;
  } else {
    var cons = consExcept(skip);
    for (var _i2 = 0; _i2 < n; ++_i2) {
      xsA = ap(map(cons, xsA), xi2yA(xs[_i2], _i2));
    }return map(consTo, xsA);
  }
}

//

var lensFrom = function lensFrom(get, set) {
  return function (i) {
    return function (x, _i, F, xi2yF) {
      return F.map(function (v) {
        return set(i, v, x);
      }, xi2yF(get(i, x), i));
    };
  };
};

//

var getProp = function getProp(k, o) {
  return o instanceof Object ? o[k] : void 0;
};

var setProp = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : res(I.freeze))(function (k, v, o) {
  return void 0 !== v ? I.assocPartialU(k, v, o) : I.dissocPartialU(k, o) || I.object0;
});

var funProp = /*#__PURE__*/lensFrom(getProp, setProp);

//

var getIndex = function getIndex(i, xs) {
  return seemsArrayLike(xs) ? xs[i] : void 0;
};

var setIndex = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : fn(nth(0, ef(reqIndex)), I.freeze))(function (i, x, xs) {
  if (!seemsArrayLike(xs)) xs = '';
  var n = xs.length;
  if (void 0 !== x) {
    var m = Math.max(i + 1, n);
    var ys = Array(m);
    for (var j = 0; j < m; ++j) {
      ys[j] = xs[j];
    }ys[i] = x;
    return ys;
  } else {
    if (n <= i) return copyToFrom(Array(n), 0, xs, 0, n);
    var _ys = Array(n - 1);
    for (var _j = 0; _j < i; ++_j) {
      _ys[_j] = xs[_j];
    }for (var _j2 = i + 1; _j2 < n; ++_j2) {
      _ys[_j2 - 1] = xs[_j2];
    }return _ys;
  }
});

var funIndex = /*#__PURE__*/lensFrom(getIndex, setIndex);

//

var composedMiddle = function composedMiddle(o, r) {
  return function (F, xi2yF) {
    return xi2yF = r(F, xi2yF), function (x, i) {
      return o(x, i, F, xi2yF);
    };
  };
};

function composed(oi0, os) {
  var n = os.length - oi0;
  if (n < 2) {
    return n ? toFunction(os[oi0]) : identity;
  } else {
    var _last = toFunction(os[oi0 + --n]);
    var r = function r(F, xi2yF) {
      return function (x, i) {
        return _last(x, i, F, xi2yF);
      };
    };
    while (--n) {
      r = composedMiddle(toFunction(os[oi0 + n]), r);
    }var _first = toFunction(os[oi0]);
    return function (x, i, F, xi2yF) {
      return _first(x, i, F, r(F, xi2yF));
    };
  }
}

var setU = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : par(0, ef(reqOptic)))(function (o, x, s) {
  switch (typeof o) {
    case 'string':
      return setProp(o, x, s);
    case 'number':
      return setIndex(o, x, s);
    case 'object':
      return modifyComposed(o, 0, s, x);
    default:
      return o.length === 4 ? o(s, void 0, Identity, I.always(x)) : s;
  }
});

var modifyU = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : par(0, ef(reqOptic)))(function (o, xi2x, s) {
  switch (typeof o) {
    case 'string':
      return setProp(o, xi2x(getProp(o, s), o), s);
    case 'number':
      return setIndex(o, xi2x(getIndex(o, s), o), s);
    case 'object':
      return modifyComposed(o, xi2x, s);
    default:
      return o.length === 4 ? o(s, void 0, Identity, xi2x) : (xi2x(o(s, void 0), void 0), s);
  }
});

var modifyAsyncU = function modifyAsyncU(o, f, s) {
  return returnAsync(toFunction(o)(s, void 0, IdentityAsync, f));
};

function makeIx(i) {
  var ix = function ix(s, j) {
    return ix.v = j, s;
  };
  ix.v = i;
  return ix;
}

function getNestedU(l, s, j, ix) {
  for (var n = l.length, o; j < n; ++j) {
    switch (typeof (o = l[j])) {
      case 'string':
        s = getProp(ix.v = o, s);
        break;
      case 'number':
        s = getIndex(ix.v = o, s);
        break;
      case 'object':
        s = getNestedU(o, s, 0, ix);
        break;
      default:
        s = o(s, ix.v, Constant, ix);
    }
  }return s;
}

var getU = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : par(0, ef(reqOptic)))(function (l, s) {
  switch (typeof l) {
    case 'string':
      return getProp(l, s);
    case 'number':
      return getIndex(l, s);
    case 'object':
      for (var i = 0, n = l.length, o; i < n; ++i) {
        switch (typeof (o = l[i])) {
          case 'string':
            s = getProp(o, s);
            break;
          case 'number':
            s = getIndex(o, s);
            break;
          default:
            return getNestedU(l, s, i, makeIx(l[i - 1]));
        }
      }return s;
    default:
      return l(s, void 0, Constant, I.id);
  }
});

function modifyComposed(os, xi2y, x, y) {
  var n = os.length;
  var xs = Array(n);
  for (var i = 0, o; i < n; ++i) {
    xs[i] = x;
    switch (typeof (o = os[i])) {
      case 'string':
        x = getProp(o, x);
        break;
      case 'number':
        x = getIndex(o, x);
        break;
      default:
        x = composed(i, os)(x, os[i - 1], Identity, xi2y || I.always(y));
        n = i;
        break;
    }
  }
  if (n === os.length) x = xi2y ? xi2y(x, os[n - 1]) : y;
  for (var _o; 0 <= --n;) {
    x = I.isString(_o = os[n]) ? setProp(_o, x, xs[n]) : setIndex(_o, x, xs[n]);
  }return x;
}

//

var lensU = function lensU(get, set) {
  return function (x, i, F, xi2yF) {
    return F.map(function (y) {
      return set(y, x, i);
    }, xi2yF(get(x, i), i));
  };
};

var isoU = function isoU(bwd, fwd) {
  return function (x, i, F, xi2yF) {
    return F.map(fwd, xi2yF(bwd(x), i));
  };
};

var stringIsoU = function stringIsoU(bwd, fwd) {
  return isoU(expect(I.isString, bwd), expect(I.isString, fwd));
};

var numberIsoU = function numberIsoU(bwd, fwd) {
  return isoU(expect(I.isNumber, bwd), expect(I.isNumber, fwd));
};

//

var getPick = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : res(I.freeze))(function (template, x) {
  var r = void 0;
  for (var k in template) {
    var t = template[k];
    var v = I.isObject(t) ? getPick(t, x) : getU(t, x);
    if (void 0 !== v) {
      if (!r) r = {};
      r[k] = v;
    }
  }
  return r;
});

var reqTemplate = function reqTemplate(name) {
  return function (template) {
    if (!I.isObject(template)) errorGiven('`' + name + '` expects a plain Object template', template);
  };
};

var reqObject = function reqObject(msg) {
  return function (value) {
    if (!(void 0 === value || value instanceof Object)) errorGiven(msg, value);
  };
};

var setPick = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : par(1, ef(reqObject('`pick` must be set with undefined or an object'))))(function (template, value, x) {
  for (var k in template) {
    var v = value && value[k];
    var t = template[k];
    x = I.isObject(t) ? setPick(t, v, x) : setU(t, v, x);
  }
  return x;
});

//

var toObject = function toObject(x) {
  return I.constructorOf(x) !== Object ? I.toObject(x) : x;
};

//

var identity = function identity(x, i, _F, xi2yF) {
  return xi2yF(x, i);
};

//

var branchAssemble = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : res(res(I.freeze)))(function (ks) {
  return function (xs) {
    var r = {};
    var i = ks.length;
    while (i--) {
      var v = xs[0];
      if (void 0 !== v) {
        r[ks[i]] = v;
      }
      xs = xs[1];
    }
    return r;
  };
});

var branchOr1LevelIdentity = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : function (fn$$1) {
  return function (otherwise, k2o, xO, x, A, xi2yA) {
    var y = fn$$1(otherwise, k2o, xO, x, A, xi2yA);
    if (x !== y) I.freeze(y);
    return y;
  };
})(function (otherwise, k2o, xO, x, A, xi2yA) {
  var written = void 0;
  var same = true;
  var r = {};
  for (var k in k2o) {
    written = 1;
    var _x2 = xO[k];
    var y = k2o[k](_x2, k, A, xi2yA);
    if (void 0 !== y) {
      r[k] = y;
      if (same) same = _x2 === y && (_x2 !== 0 || 1 / _x2 === 1 / y) || _x2 !== _x2 && y !== y;
    } else {
      same = false;
    }
  }
  var t = written;
  for (var _k in xO) {
    if (void 0 === (t && k2o[_k])) {
      written = 1;
      var _x3 = xO[_k];
      var _y = otherwise(_x3, _k, A, xi2yA);
      if (void 0 !== _y) {
        r[_k] = _y;
        if (same) same = _x3 === _y && (_x3 !== 0 || 1 / _x3 === 1 / _y) || _x3 !== _x3 && _y !== _y;
      } else {
        same = false;
      }
    }
  }
  return written ? same && xO === x ? x : r : x;
});

var branchOr1Level = function branchOr1Level(otherwise, k2o) {
  return function (x, _i, A, xi2yA) {
    var xO = x instanceof Object ? toObject(x) : I.object0;

    if (Identity === A) {
      return branchOr1LevelIdentity(otherwise, k2o, xO, x, A, xi2yA);
    } else if (Select === A) {
      for (var k in k2o) {
        var y = k2o[k](xO[k], k, A, xi2yA);
        if (void 0 !== y) return y;
      }
      for (var _k2 in xO) {
        if (void 0 === k2o[_k2]) {
          var _y2 = otherwise(xO[_k2], _k2, A, xi2yA);
          if (void 0 !== _y2) return _y2;
        }
      }
    } else {
      var map = A.map,
          ap = A.ap,
          of = A.of;

      var xsA = of(cpair);
      var ks = [];
      for (var _k3 in k2o) {
        ks.push(_k3);
        xsA = ap(map(cpair, xsA), k2o[_k3](xO[_k3], _k3, A, xi2yA));
      }
      var t = ks.length ? true : void 0;
      for (var _k4 in xO) {
        if (void 0 === (t && k2o[_k4])) {
          ks.push(_k4);
          xsA = ap(map(cpair, xsA), otherwise(xO[_k4], _k4, A, xi2yA));
        }
      }
      return ks.length ? map(branchAssemble(ks), xsA) : of(x);
    }
  };
};

function branchOrU(otherwise, template) {
  var k2o = create(null);
  for (var k in template) {
    var v = template[k];
    k2o[k] = I.isObject(v) ? branchOrU(otherwise, v) : toFunction(v);
  }
  return branchOr1Level(otherwise, k2o);
}

var replaced = function replaced(inn, out, x) {
  return I.acyclicEqualsU(x, inn) ? out : x;
};

function findIndexHint(hint, xi2b, xs) {
  var u = hint.hint;
  var n = xs.length;
  if (n <= u) u = n - 1;
  if (u < 0) u = 0;
  var d = u - 1;
  for (; 0 <= d && u < n; ++u, --d) {
    if (xi2b(xs[u], u, hint)) return u;
    if (xi2b(xs[d], d, hint)) return d;
  }
  for (; u < n; ++u) {
    if (xi2b(xs[u], u, hint)) return u;
  }for (; 0 <= d; --d) {
    if (xi2b(xs[d], d, hint)) return d;
  }return n;
}

var partitionIntoIndex = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : dep(function (_xi2b, _xs, ts, fs) {
  return res(ef(function () {
    I.freeze(ts);
    I.freeze(fs);
  }));
}))(function (xi2b, xs, ts, fs) {
  for (var i = 0, n = xs.length, x; i < n; ++i) {
    (xi2b(x = xs[i], i) ? ts : fs).push(x);
  }
});

var fromReader = function fromReader(wi2x) {
  return function (w, i, F, xi2yF) {
    return F.map(I.always(w), xi2yF(wi2x(w, i), i));
  };
};

//

var reValue = function reValue(m) {
  return m[0];
};
var reIndex = function reIndex(m) {
  return m.index;
};
var reLastIndex = function reLastIndex(m) {
  return reIndex(m) + m[0].length;
};

var reNext = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : function (fn$$1) {
  return function (m, re) {
    var res$$1 = fn$$1(m, re);
    if ('' === res$$1) warn(reNext, '`matches(' + re + ')` traversal terminated due to empty match.  `matches` traversal shouldn\'t be used with regular expressions that can produce empty matches.');
    return res$$1;
  };
})(function (m, re) {
  var lastIndex = re.lastIndex;
  re.lastIndex = reLastIndex(m);
  var n = re.exec(m.input);
  re.lastIndex = lastIndex;
  return n && n[0] && n;
});

//

var iterCollect = function iterCollect(s) {
  return function (xs) {
    return function (x) {
      return [s, x, xs];
    };
  };
};

var iterToArray = function iterToArray(xs) {
  var ys = [];
  while (iterCollect !== xs) {
    ys.push(xs[0], xs[1]);
    xs = xs[2];
  }
  return ys;
};

function iterSelect(xi2y, t, s) {
  while (s = reNext(s, t)) {
    var y = xi2y(reValue(s), reIndex(s));
    if (void 0 !== y) return y;
  }
}

function iterEager(map, ap, of, xi2yA, t, s) {
  var r = of(iterCollect);
  while (s = reNext(s, t)) {
    r = ap(ap(map(iterCollect, of(s)), r), xi2yA(reValue(s), reIndex(s)));
  }return r;
}

//

var keyed = /*#__PURE__*/isoU( /*#__PURE__*/expect( /*#__PURE__*/isInstanceOf(Object), /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : res(freezeArrayOfObjects))(function (x) {
  x = toObject(x);
  var es = [];
  for (var key in x) {
    es.push([key, x[key]]);
  }return es;
})), /*#__PURE__*/expect(I.isArray, /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : res(I.freeze))(function (es) {
  var o = {};
  for (var i = 0, n = es.length; i < n; ++i) {
    var entry = es[i];
    if (entry.length === 2) o[entry[0]] = entry[1];
  }
  return o;
})));

//

var matchesJoin = function matchesJoin(input) {
  return function (matchesIn) {
    var result = '';
    var lastIndex = 0;
    var matches = iterToArray(matchesIn);
    var n = matches.length;
    for (var j = n - 2; j !== -2; j += -2) {
      var m = matches[j];
      result += input.slice(lastIndex, reIndex(m));
      var s = matches[j + 1];
      if (void 0 !== s) result += s;
      lastIndex = reLastIndex(m);
    }

    result += input.slice(lastIndex);
    return result;
  };
};

//

var eitherU = function eitherU(t, e) {
  return function (c) {
    return function (x, i, C, xi2yC) {
      return (c(x, i) ? t : e)(x, i, C, xi2yC);
    };
  };
};

var orElseU = function orElseU(back, prim) {
  return prim = toFunction(prim), back = toFunction(back), function (x, i, C, xi2yC) {
    return (isDefined(prim, x) ? prim : back)(x, i, C, xi2yC);
  };
};

function zeroOp(y, i, C, xi2yC, x) {
  var of = C.of;
  return of ? of(y) : C.map(I.always(y), xi2yC(x, i));
}

//

var elemsI = function elemsI(xs, _i, A, xi2yA) {
  return A === Identity ? mapPartialIndexU(xi2yA, xs, void 0) : A === Select ? selectInArrayLike(xi2yA, xs) : traversePartialIndex(A, xi2yA, xs, void 0);
};

//

var seq2U = function seq2U(l, r) {
  return function (x, i, M, xi2yM) {
    return M.chain(function (x) {
      return r(x, i, M, xi2yM);
    }, l(x, i, M, xi2yM));
  };
};

//

var pickInAux = function pickInAux(t, k) {
  return [k, pickIn(t)];
};

//

var condOfDefault = /*#__PURE__*/I.always(zeroOp);
var condOfCase = function condOfCase(p, o, r) {
  return function (y, j) {
    return p(y, j) ? o : r(y, j);
  };
};

// Auxiliary

var seemsArrayLike = function seemsArrayLike(x) {
  return x instanceof Object && (x = x.length, x === x >> 0 && 0 <= x) || I.isString(x);
};

// Internals

var Identity = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : I.freeze)({
  map: I.applyU,
  of: I.id,
  ap: I.applyU,
  chain: I.applyU
});

var IdentityAsync = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : I.freeze)({
  map: chainAsync,
  ap: function ap(xyP, xP) {
    return chainAsync(function (xP) {
      return chainAsync(function (xyP) {
        return xyP(xP);
      }, xyP);
    }, xP);
  },
  of: I.id,
  chain: chainAsync
});

var Constant = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : I.freeze)({
  map: I.sndU
});

var toFunction = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : par(0, ef(reqOptic)))(function (o) {
  switch (typeof o) {
    case 'string':
      return funProp(o);
    case 'number':
      return funIndex(o);
    case 'object':
      return composed(0, o);
    default:
      return o.length === 4 ? o : fromReader(o);
  }
});

// Operations on optics

var assign = /*#__PURE__*/I.curry(function (o, x, s) {
  return setU([o, propsOf(x)], x, s);
});

var modify = /*#__PURE__*/I.curry(modifyU);

var modifyAsync = /*#__PURE__*/I.curry(modifyAsyncU);

var remove = /*#__PURE__*/I.curry(function (o, s) {
  return setU(o, void 0, s);
});

var set = /*#__PURE__*/I.curry(setU);

var transform = /*#__PURE__*/I.curry(function (o, s) {
  return modifyU(o, I.id, s);
});

var transformAsync = /*#__PURE__*/I.curry(function (o, s) {
  return modifyAsyncU(o, I.id, s);
});

var traverse = /*#__PURE__*/I.curry(traverseU);

// Nesting

function compose() {
  var n = arguments.length;
  if (n < 2) {
    return n ? arguments[0] : identity;
  } else {
    var os = Array(n);
    while (n--) {
      os[n] = arguments[n];
    }return os;
  }
}

function flat() {
  var r = [flatten];
  for (var i = 0, n = arguments.length; i < n; ++i) {
    r.push(arguments[i], flatten);
  }return r;
}

// Recursing

function lazy(o2o) {
  var _memo = function memo(x, i, C, xi2yC) {
    return (_memo = toFunction(o2o(rec)))(x, i, C, xi2yC);
  };
  function rec(x, i, C, xi2yC) {
    return _memo(x, i, C, xi2yC);
  }
  return rec;
}

// Adapting

var choices = function choices(o) {
  for (var _len = arguments.length, os = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    os[_key - 1] = arguments[_key];
  }

  return os.length ? orElseU(os.reduceRight(orElseU), o) : o;
};

var choose = function choose(xiM2o) {
  return function (x, i, C, xi2yC) {
    return toFunction(xiM2o(x, i))(x, i, C, xi2yC);
  };
};

var cond = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : function (fn$$1) {
  return function () {
    for (var _len2 = arguments.length, cs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      cs[_key2] = arguments[_key2];
    }

    var pair = tup(ef(reqFn), ef(reqOptic));
    arr(pair)(cs.slice(0, -1));
    arr(or(tup(ef(reqOptic)), pair))(cs.slice(-1));
    return fn$$1.apply(undefined, cs);
  };
})(function () {
  var n = arguments.length;
  var r = zero;
  while (n--) {
    var c = arguments[n];
    r = c.length < 2 ? toFunction(c[0]) : eitherU(toFunction(c[1]), r)(c[0]);
  }
  return r;
});

var condOf = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : function (fn$$1) {
  return function (of) {
    for (var _len3 = arguments.length, cs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      cs[_key3 - 1] = arguments[_key3];
    }

    var pair = tup(ef(reqFn), ef(reqOptic));
    arr(pair)(cs.slice(0, -1));
    arr(or(tup(ef(reqOptic)), pair))(cs.slice(-1));
    return fn$$1.apply(undefined, [of].concat(cs));
  };
})(function (of) {
  of = toFunction(of);
  var op = condOfDefault;
  var n = arguments.length;
  while (--n) {
    var c = arguments[n];
    op = c.length === 1 ? I.always(toFunction(c[0])) : condOfCase(c[0], toFunction(c[1]), op);
  }
  return function (x, i, C, xi2yC) {
    return of(x, i, Constant, op)(x, i, C, xi2yC);
  };
});

var ifElse = /*#__PURE__*/I.curry(function (c, t, e) {
  return eitherU(toFunction(t), toFunction(e))(c);
});

var iftes = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : function (fn$$1) {
  return function (_c, _t) {
    warn(iftes, '`iftes` has been obsoleted.  Use `ifElse` or `cond` instead.  See CHANGELOG for details.');
    return fn$$1.apply(null, arguments);
  };
})(function (_c, _t) {
  var n = arguments.length;
  var r = n & 1 ? toFunction(arguments[--n]) : zero;
  while (0 <= (n -= 2)) {
    r = eitherU(toFunction(arguments[n + 1]), r)(arguments[n]);
  }return r;
});

var orElse = /*#__PURE__*/I.curry(orElseU);

// Querying

var chain = /*#__PURE__*/I.curry(function (xi2yO, xO) {
  return [xO, choose(function (xM, i) {
    return void 0 !== xM ? xi2yO(xM, i) : zero;
  })];
});

var choice = function choice() {
  for (var _len4 = arguments.length, os = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    os[_key4] = arguments[_key4];
  }

  return os.reduceRight(orElseU, zero);
};

var unless = /*#__PURE__*/eitherU(zeroOp, identity);

var when = /*#__PURE__*/eitherU(identity, zeroOp);

var optional = /*#__PURE__*/when(I.isDefined);

var zero = function zero(x, i, C, xi2yC) {
  return zeroOp(x, i, C, xi2yC);
};

// Transforming

var assignOp = function assignOp(x) {
  return [propsOf(x), setOp(x)];
};

var modifyOp = function modifyOp(xi2y) {
  return function (x, i, C, xi2yC) {
    return zeroOp(x = xi2y(x, i), i, C, xi2yC, x);
  };
};

var setOp = function setOp(y) {
  return function (_x, i, C, xi2yC) {
    return zeroOp(y, i, C, xi2yC, y);
  };
};

var removeOp = /*#__PURE__*/setOp();

// Debugging

function log() {
  var _arguments = arguments;

  var show = I.curry(function (dir, x) {
    return console.log.apply(console, copyToFrom([], 0, _arguments, 0, _arguments.length).concat([dir, x])), x;
  });
  return isoU(show('get'), show('set'));
}

// Sequencing

var seq = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : function (fn$$1) {
  return function () {
    return par(2, ef(reqMonad('seq')))(fn$$1.apply(undefined, arguments));
  };
})(function () {
  var n = arguments.length;
  var r = zero;
  if (n) {
    r = toFunction(arguments[--n]);
    while (n) {
      r = seq2U(toFunction(arguments[--n]), r);
    }
  }
  return r;
});

// Creating new traversals

var branchOr = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : par(1, ef(reqTemplate('branchOr'))))( /*#__PURE__*/I.curryN(2, function (otherwise) {
  return otherwise = toFunction(otherwise), function (template) {
    return branchOrU(otherwise, template);
  };
}));

var branch = /*#__PURE__*/branchOr(zero);

function branches() {
  var n = arguments.length;
  var template = {};
  for (var i = 0; i < n; ++i) {
    template[arguments[i]] = identity;
  }return branch(template);
}

// Traversals and combinators

var elems = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : par(2, ef(reqApplicative('elems'))))(function (xs, i, A, xi2yA) {
  return seemsArrayLike(xs) ? elemsI(xs, i, A, xi2yA) : A.of(xs);
});

var elemsTotal = function elemsTotal(xs, i, A, xi2yA) {
  return seemsArrayLike(xs) ? A === Identity ? mapPartialIndexU(xi2yA, xs, mapPartialIndexU) : A === Select ? selectInArrayLike(xi2yA, xs) : traversePartialIndex(A, xi2yA, xs, traversePartialIndex) : A.of(xs);
};

var entries = /*#__PURE__*/toFunction([keyed, elems]);

var keys = /*#__PURE__*/toFunction([keyed, elems, 0]);

var matches = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : dep(function (re) {
  return re.global ? res(par(2, ef(reqApplicative('matches', re)))) : I.id;
}))(function (re) {
  return function (x, _i, C, xi2yC) {
    if (I.isString(x)) {
      var map = C.map;

      if (re.global) {
        var m0 = [''];
        m0.input = x;
        m0.index = 0;
        if (Select === C) {
          return iterSelect(xi2yC, re, m0);
        } else {
          var ap = C.ap,
              of = C.of;

          return map(matchesJoin(x), iterEager(map, ap, of, xi2yC, re, m0));
        }
      } else {
        var m = x.match(re);
        if (m) return map(function (y) {
          return x.replace(re, void 0 !== y ? y : '');
        }, xi2yC(m[0], reIndex(m)));
      }
    }
    return zeroOp(x, void 0, C, xi2yC);
  };
});

var values = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : par(2, ef(reqApplicative('values'))))( /*#__PURE__*/branchOr1Level(identity, protoless0));

var children = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : par(2, ef(reqApplicative('children'))))(function (x, i, C, xi2yC) {
  return I.isArray(x) ? elemsI(x, i, C, xi2yC) : I.isObject(x) ? values(x, i, C, xi2yC) : C.of(x);
});

var flatten = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : par(2, ef(reqApplicative('flatten'))))(function (x, i, C, xi2yC) {
  var rec = function rec(x, i) {
    return I.isArray(x) ? elemsI(x, i, C, rec) : void 0 !== x ? xi2yC(x, i) : C.of(x);
  };
  return rec(x, i);
});

function query() {
  var r = [];
  for (var i = 0, n = arguments.length; i < n; ++i) {
    var o = toFunction(arguments[i]);
    r.push(satisfying(isDefined(o)), o);
  }
  return r;
}

var satisfying = function satisfying(p) {
  return function (x, i, C, xi2yC) {
    var rec = function rec(x, i) {
      return p(x, i) ? xi2yC(x, i) : children(x, i, C, rec);
    };
    return rec(x, i);
  };
};

var leafs = /*#__PURE__*/satisfying(function (x) {
  return void 0 !== x && !I.isArray(x) && !I.isObject(x);
});

// Folds over traversals

var all = /*#__PURE__*/I.curry(function (xi2b, t, s) {
  return !traverseU(Select, function (x, i) {
    if (!xi2b(x, i)) return true;
  }, t, s);
});

var and$1 = /*#__PURE__*/all(I.id);

var any = /*#__PURE__*/I.curry(function (xi2b, t, s) {
  return !!traverseU(Select, function (x, i) {
    if (xi2b(x, i)) return true;
  }, t, s);
});

var collectAs = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.curry : res(I.freeze))(function (xi2y, t, s) {
  var results = [];
  traverseU(Select, function (x, i) {
    var y = xi2y(x, i);
    if (void 0 !== y) results.push(y);
  }, t, s);
  return results;
});

var collect = /*#__PURE__*/collectAs(I.id);

var concatAs = /*#__PURE__*/mkTraverse(I.id, function (m) {
  return ConcatOf(m.concat, m.empty());
});

var concat = /*#__PURE__*/concatAs(I.id);

var countIf = /*#__PURE__*/I.curry(function (p, t, s) {
  return traverseU(Sum, function (x, i) {
    return p(x, i) ? 1 : 0;
  }, t, s);
});

var count = /*#__PURE__*/countIf(I.isDefined);

var countsAs = /*#__PURE__*/I.curry(function (xi2k, t, s) {
  var counts = new Map();
  traverseU(Select, function (x, i) {
    var k = xi2k(x, i);
    var n = counts.get(k);
    counts.set(k, void 0 !== n ? n + 1 : 1);
  }, t, s);
  return counts;
});

var counts = /*#__PURE__*/countsAs(I.id);

var foldl = /*#__PURE__*/I.curry(function (f, r, t, s) {
  traverseU(Select, function (x, i) {
    r = f(r, x, i);
  }, t, s);
  return r;
});

var foldr = /*#__PURE__*/I.curry(function (f, r, t, s) {
  var is = [];
  var xs = [];
  traverseU(Select, function (x, i) {
    xs.push(x);
    is.push(i);
  }, t, s);
  for (var i = xs.length - 1; 0 <= i; --i) {
    r = f(r, xs[i], is[i]);
  }return r;
});

var forEach = /*#__PURE__*/I.curry(function (f, t, s) {
  return traverseU(Select, function (x, i) {
    f(x, i);
  }, t, s);
});

var forEachWith = /*#__PURE__*/I.curry(function (newC, ef$$1, t, s) {
  var c = newC();
  traverseU(Select, function (x, i) {
    ef$$1(c, x, i);
  }, t, s);
  return c;
});

var isDefined = /*#__PURE__*/I.curry(function (t, s) {
  return void 0 !== traverseU(Select, I.id, t, s);
});

var isEmpty = /*#__PURE__*/I.curry(function (t, s) {
  return !traverseU(Select, I.always(true), t, s);
});

var joinAs = /*#__PURE__*/mkTraverse(toStringPartial, /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : par(0, ef(reqString('`join` and `joinAs` expect a string delimiter'))))(function (d) {
  return ConcatOf(function (x, y) {
    return void 0 !== x ? void 0 !== y ? x + d + y : x : y;
  });
}));

var join = /*#__PURE__*/joinAs(I.id);

var maximumBy = /*#__PURE__*/mumBy(gtU);

var maximum = /*#__PURE__*/maximumBy(I.id);

var meanAs = /*#__PURE__*/I.curry(function (xi2y, t, s) {
  var sum = 0;
  var num = 0;
  traverseU(Select, function (x, i) {
    var y = xi2y(x, i);
    if (void 0 !== y) {
      num += 1;
      sum += y;
    }
  }, t, s);
  return sum / num;
});

var mean = /*#__PURE__*/meanAs(I.id);

var minimumBy = /*#__PURE__*/mumBy(ltU);

var minimum = /*#__PURE__*/minimumBy(I.id);

var none = /*#__PURE__*/I.curry(function (xi2b, t, s) {
  return !traverseU(Select, function (x, i) {
    if (xi2b(x, i)) return true;
  }, t, s);
});

var or$1 = /*#__PURE__*/any(I.id);

var productAs = /*#__PURE__*/traverse( /*#__PURE__*/ConcatOf(multiplyU, 1));

var product = /*#__PURE__*/productAs( /*#__PURE__*/unto(1));

var selectAs = /*#__PURE__*/traverse(Select);

var select = /*#__PURE__*/selectAs(I.id);

var sumAs = /*#__PURE__*/traverse(Sum);

var sum = /*#__PURE__*/sumAs(unto0);

// Operations on lenses

function get(l, s) {
  return 1 < arguments.length ? getU(l, s) : function (s) {
    return getU(l, s);
  };
}

// Creating new lenses

var lens = /*#__PURE__*/I.curry(lensU);

var setter = /*#__PURE__*/lens(I.id);

var foldTraversalLens = /*#__PURE__*/I.curry(function (fold, traversal) {
  return lensU(fold(traversal), set(traversal));
});

// Enforcing invariants

function defaults(out) {
  function o2u(x) {
    return replaced(out, void 0, x);
  }
  return function (x, i, F, xi2yF) {
    return F.map(o2u, xi2yF(void 0 !== x ? x : out, i));
  };
}

var define = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : function (fn$$1) {
  return function (inn) {
    var res$$1 = fn$$1(inn);
    if (isEmptyArrayStringOrObject(inn)) return toFunction([isoU(warnEmpty(fn$$1, inn, 'define'), I.id), res$$1, isoU(I.id, warnEmpty(define, inn, 'define'))]);else return res$$1;
  };
})(function (v) {
  var untoV = unto(v);
  return function (x, i, F, xi2yF) {
    return F.map(untoV, xi2yF(void 0 !== x ? x : v, i));
  };
});

var normalize = function normalize(xi2x) {
  return [reread(xi2x), rewrite(xi2x)];
};

var required = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : function (fn$$1) {
  return function (inn) {
    var res$$1 = fn$$1(inn);
    if (isEmptyArrayStringOrObject(inn)) return toFunction([res$$1, isoU(I.id, warnEmpty(required, inn, 'required'))]);else return res$$1;
  };
})(function (inn) {
  return replace$1(inn, void 0);
});

var reread = function reread(xi2x) {
  return function (x, i, _F, xi2yF) {
    return xi2yF(void 0 !== x ? xi2x(x, i) : x, i);
  };
};

var rewrite = function rewrite(yi2y) {
  return function (x, i, F, xi2yF) {
    return F.map(function (y) {
      return void 0 !== y ? yi2y(y, i) : y;
    }, xi2yF(x, i));
  };
};

// Lensing arrays

function append(xs, _, F, xi2yF) {
  var i = seemsArrayLike(xs) ? xs.length : 0;
  return F.map(function (x) {
    return setIndex(i, x, xs);
  }, xi2yF(void 0, i));
}

var filter = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : res(function (lens) {
  return toFunction([lens, isoU(I.id, ef(reqMaybeArray('`filter` must be set with undefined or an array-like object')))]);
}))(function (xi2b) {
  return function (xs, i, F, xi2yF) {
    var ts = void 0;
    var fs = I.array0;
    if (seemsArrayLike(xs)) partitionIntoIndex(xi2b, xs, ts = [], fs = []);
    return F.map(function (ts) {
      var tsN = ts ? ts.length : 0;
      var fsN = fs.length;
      var n = tsN + fsN;
      return n === fsN ? fs : copyToFrom(copyToFrom(Array(n), 0, ts, 0, tsN), tsN, fs, 0, fsN);
    }, xi2yF(ts, i));
  };
});

function find(xih2b) {
  var hint = arguments.length > 1 ? arguments[1] : { hint: 0 };
  return function (xs, _i, F, xi2yF) {
    var ys = seemsArrayLike(xs) ? xs : '';
    var i = hint.hint = findIndexHint(hint, xih2b, ys);
    return F.map(function (v) {
      return setIndex(i, v, ys);
    }, xi2yF(ys[i], i));
  };
}

function findWith(o) {
  var oo = toFunction(o);
  var p = isDefined(oo);
  return [arguments.length > 1 ? find(p, arguments[1]) : find(p), oo];
}

var first = 0;

var index = process.env.NODE_ENV !== 'production' ? /*#__PURE__*/ef(reqIndex) : I.id;

var last = /*#__PURE__*/choose(function (maybeArray) {
  return seemsArrayLike(maybeArray) && maybeArray.length ? maybeArray.length - 1 : 0;
});

var prefix = function prefix(n) {
  return slice(0, n);
};

var slice = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.curry : res(function (lens) {
  return toFunction([lens, isoU(I.id, ef(reqMaybeArray('`slice` must be set with undefined or an array-like object')))]);
}))(function (begin, end) {
  return function (xs, i, F, xsi2yF) {
    var seems = seemsArrayLike(xs);
    var xsN = seems && xs.length;
    var b = sliceIndex(0, xsN, 0, begin);
    var e = sliceIndex(b, xsN, xsN, end);
    return F.map(function (zs) {
      var zsN = zs ? zs.length : 0;
      var bPzsN = b + zsN;
      var n = xsN - e + bPzsN;
      return copyToFrom(copyToFrom(copyToFrom(Array(n), 0, xs, 0, b), b, zs, 0, zsN), bPzsN, xs, e, xsN);
    }, xsi2yF(seems ? copyToFrom(Array(Math.max(0, e - b)), 0, xs, b, e) : void 0, i));
  };
});

var suffix = function suffix(n) {
  return slice(0 === n ? Infinity : !n ? 0 : -n, void 0);
};

// Lensing objects

var pickIn = function pickIn(t) {
  return I.isObject(t) ? pick(modify(values, pickInAux, t)) : t;
};

var prop = process.env.NODE_ENV === 'production' ? I.id : function (x) {
  if (!I.isString(x)) errorGiven('`prop` expects a string', x);
  return x;
};

function props() {
  var n = arguments.length;
  var template = {};
  for (var i = 0, k; i < n; ++i) {
    template[k = arguments[i]] = k;
  }return pick(template);
}

var propsOf = function propsOf(o) {
  return props.apply(null, I.keys(o));
};

function removable() {
  for (var _len5 = arguments.length, ps = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    ps[_key5] = arguments[_key5];
  }

  function drop(y) {
    if (!(y instanceof Object)) return y;
    for (var i = 0, n = ps.length; i < n; ++i) {
      if (I.hasU(ps[i], y)) return y;
    }
  }
  return function (x, i, F, xi2yF) {
    return F.map(drop, xi2yF(x, i));
  };
}

// Providing defaults

var valueOr = function valueOr(v) {
  return function (x, i, _F, xi2yF) {
    return xi2yF(x != null ? x : v, i);
  };
};

// Transforming data

var pick = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : par(0, ef(reqTemplate('pick'))))(function (template) {
  return function (x, i, F, xi2yF) {
    return F.map(function (v) {
      return setPick(template, v, x);
    }, xi2yF(getPick(template, x), i));
  };
});

var replace$1 = /*#__PURE__*/I.curry(function (inn, out) {
  function o2i(x) {
    return replaced(out, inn, x);
  }
  return function (x, i, F, xi2yF) {
    return F.map(o2i, xi2yF(replaced(inn, out, x), i));
  };
});

// Operations on isomorphisms

function getInverse(o, s) {
  return 1 < arguments.length ? setU(o, s, void 0) : function (s) {
    return setU(o, s, void 0);
  };
}

// Creating new isomorphisms

var iso = /*#__PURE__*/I.curry(isoU);

// Isomorphism combinators

var array = function array(elem) {
  var fwd = getInverse(elem);
  var bwd = get(elem);
  var mapFwd = function mapFwd(x) {
    return mapIfArrayLike(fwd, x);
  };
  return function (x, i, F, xi2yF) {
    return F.map(mapFwd, xi2yF(mapIfArrayLike(bwd, x), i));
  };
};

var inverse = function inverse(iso) {
  return function (x, i, F, xi2yF) {
    return F.map(function (x) {
      return getU(iso, x);
    }, xi2yF(setU(iso, x, void 0), i));
  };
};

// Basic isomorphisms

var complement = /*#__PURE__*/isoU(notPartial, notPartial);

var indexed = /*#__PURE__*/isoU( /*#__PURE__*/expect(seemsArrayLike, /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : res(freezeArrayOfObjects))(function (xs) {
  var n = xs.length;
  var xis = Array(n);
  for (var i = 0; i < n; ++i) {
    xis[i] = [i, xs[i]];
  }return xis;
})), /*#__PURE__*/expect(I.isArray, /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : res(I.freeze))(function (xis) {
  var n = xis.length;
  var xs = Array(n);
  for (var i = 0; i < n; ++i) {
    var xi = xis[i];
    if (xi.length === 2) xs[xi[0]] = xi[1];
  }
  n = xs.length;
  var j = 0;
  for (var _i3 = 0; _i3 < n; ++_i3) {
    var x = xs[_i3];
    if (void 0 !== x) {
      if (_i3 !== j) xs[j] = x;
      ++j;
    }
  }
  xs.length = j;
  return xs;
})));

var is = function is(v) {
  return isoU(function (x) {
    return I.acyclicEqualsU(v, x);
  }, function (b) {
    return true === b ? v : void 0;
  });
};

var reverse = /*#__PURE__*/isoU(rev, rev);

var singleton = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : function (iso) {
  return toFunction([isoU(I.id, I.freeze), iso]);
})(function (x, i, F, xi2yF) {
  return F.map(singletonPartial, xi2yF((x instanceof Object || I.isString(x)) && x.length === 1 ? x[0] : void 0, i));
});

// Standard isomorphisms

var uri = /*#__PURE__*/stringIsoU(decodeURI, encodeURI);

var uriComponent = /*#__PURE__*/stringIsoU(decodeURIComponent, encodeURIComponent);

var json = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : res(function (iso) {
  return toFunction([iso, isoU(deepFreeze, I.id)]);
}))(function (options) {
  var _ref = options || I.object0,
      reviver = _ref.reviver,
      replacer = _ref.replacer,
      space = _ref.space;

  return isoU(expect(I.isString, function (text) {
    return JSON.parse(text, reviver);
  }), expect(I.isDefined, function (value) {
    return JSON.stringify(value, replacer, space);
  }));
});

// String isomorphisms

var dropPrefix = function dropPrefix(pfx) {
  return stringIsoU(function (x) {
    return x.startsWith(pfx) ? x.slice(pfx.length) : undefined;
  }, function (x) {
    return pfx + x;
  });
};

var dropSuffix = function dropSuffix(sfx) {
  return stringIsoU(function (x) {
    return x.endsWith(sfx) ? x.slice(0, x.length - sfx.length) : undefined;
  }, function (x) {
    return x + sfx;
  });
};

var replaces = /*#__PURE__*/I.curry(function (i, o) {
  return stringIsoU(replace(toRegExpU(i, 'g'), o), replace(toRegExpU(o, 'g'), i));
});

var split = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : function (fn$$1) {
  return function (_sep) {
    return toFunction([fn$$1.apply(null, arguments), isoU(I.freeze, I.id)]);
  };
})(function (sep) {
  var re = arguments.length > 1 ? arguments[1] : sep;
  return isoU(expect(I.isString, function (x) {
    return x.split(re);
  }), expect(I.isArray, function (xs) {
    return xs.join(sep);
  }));
});

var uncouple = /*#__PURE__*/(process.env.NODE_ENV === 'production' ? I.id : function (fn$$1) {
  return function (_sep) {
    return toFunction([fn$$1.apply(null, arguments), isoU(I.freeze, I.id)]);
  };
})(function (sep) {
  var re = toRegExpU(arguments.length > 1 ? arguments[1] : sep, '');
  return isoU(expect(I.isString, function (x) {
    var m = re.exec(x);
    return m ? [x.slice(0, reIndex(m)), x.slice(reLastIndex(m))] : [x, ''];
  }), function (kv) {
    if (I.isArray(kv) && kv.length === 2) {
      var k = kv[0];
      var v = kv[1];
      return v ? k + sep + v : k;
    }
  });
});

// Arithmetic isomorphisms

var add$1 = function add$$1(c) {
  return numberIsoU(add(c), add(-c));
};
var divide = function divide(c) {
  return numberIsoU(divideBy(c), multiply(c));
};
var multiply$1 = function multiply$$1(c) {
  return numberIsoU(multiply(c), divideBy(c));
};
var negate$1 = /*#__PURE__*/numberIsoU(negate, negate);
var subtract = function subtract(c) {
  return numberIsoU(add(-c), add(c));
};

// Interop

var pointer = function pointer(s) {
  if (s[0] === '#') s = decodeURIComponent(s);
  var ts = s.split('/');
  var n = ts.length;
  for (var i = 1; i < n; ++i) {
    var t = ts[i];
    ts[i - 1] = /^(0|[1-9]\d*)$/.test(t) ? ifElse(isArrayOrPrimitive, Number(t), t) : '-' === t ? ifElse(isArrayOrPrimitive, append, t) : t.replace('~1', '/').replace('~0', '~');
  }
  ts.length = n - 1;
  return ts;
};

exports.seemsArrayLike = seemsArrayLike;
exports.Identity = Identity;
exports.IdentityAsync = IdentityAsync;
exports.Constant = Constant;
exports.toFunction = toFunction;
exports.assign = assign;
exports.modify = modify;
exports.modifyAsync = modifyAsync;
exports.remove = remove;
exports.set = set;
exports.transform = transform;
exports.transformAsync = transformAsync;
exports.traverse = traverse;
exports.compose = compose;
exports.flat = flat;
exports.lazy = lazy;
exports.choices = choices;
exports.choose = choose;
exports.cond = cond;
exports.condOf = condOf;
exports.ifElse = ifElse;
exports.iftes = iftes;
exports.orElse = orElse;
exports.chain = chain;
exports.choice = choice;
exports.unless = unless;
exports.when = when;
exports.optional = optional;
exports.zero = zero;
exports.assignOp = assignOp;
exports.modifyOp = modifyOp;
exports.setOp = setOp;
exports.removeOp = removeOp;
exports.log = log;
exports.seq = seq;
exports.branchOr = branchOr;
exports.branch = branch;
exports.branches = branches;
exports.elems = elems;
exports.elemsTotal = elemsTotal;
exports.entries = entries;
exports.keys = keys;
exports.matches = matches;
exports.values = values;
exports.children = children;
exports.flatten = flatten;
exports.query = query;
exports.satisfying = satisfying;
exports.leafs = leafs;
exports.all = all;
exports.and = and$1;
exports.any = any;
exports.collectAs = collectAs;
exports.collect = collect;
exports.concatAs = concatAs;
exports.concat = concat;
exports.countIf = countIf;
exports.count = count;
exports.countsAs = countsAs;
exports.counts = counts;
exports.foldl = foldl;
exports.foldr = foldr;
exports.forEach = forEach;
exports.forEachWith = forEachWith;
exports.isDefined = isDefined;
exports.isEmpty = isEmpty;
exports.joinAs = joinAs;
exports.join = join;
exports.maximumBy = maximumBy;
exports.maximum = maximum;
exports.meanAs = meanAs;
exports.mean = mean;
exports.minimumBy = minimumBy;
exports.minimum = minimum;
exports.none = none;
exports.or = or$1;
exports.productAs = productAs;
exports.product = product;
exports.selectAs = selectAs;
exports.select = select;
exports.sumAs = sumAs;
exports.sum = sum;
exports.get = get;
exports.lens = lens;
exports.setter = setter;
exports.foldTraversalLens = foldTraversalLens;
exports.defaults = defaults;
exports.define = define;
exports.normalize = normalize;
exports.required = required;
exports.reread = reread;
exports.rewrite = rewrite;
exports.append = append;
exports.filter = filter;
exports.find = find;
exports.findWith = findWith;
exports.first = first;
exports.index = index;
exports.last = last;
exports.prefix = prefix;
exports.slice = slice;
exports.suffix = suffix;
exports.pickIn = pickIn;
exports.prop = prop;
exports.props = props;
exports.propsOf = propsOf;
exports.removable = removable;
exports.valueOr = valueOr;
exports.pick = pick;
exports.replace = replace$1;
exports.getInverse = getInverse;
exports.iso = iso;
exports.array = array;
exports.inverse = inverse;
exports.complement = complement;
exports.identity = identity;
exports.indexed = indexed;
exports.is = is;
exports.keyed = keyed;
exports.reverse = reverse;
exports.singleton = singleton;
exports.uri = uri;
exports.uriComponent = uriComponent;
exports.json = json;
exports.dropPrefix = dropPrefix;
exports.dropSuffix = dropSuffix;
exports.replaces = replaces;
exports.split = split;
exports.uncouple = uncouple;
exports.add = add$1;
exports.divide = divide;
exports.multiply = multiply$1;
exports.negate = negate$1;
exports.subtract = subtract;
exports.pointer = pointer;

}).call(this,require('_process'))
},{"_process":4,"infestines":2}],4:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],5:[function(require,module,exports){
var always = /*#__PURE__*/require('./always');

/**
 * A function that always returns `false`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.always, R.T
 * @example
 *
 *      R.F(); //=> false
 */


var F = /*#__PURE__*/always(false);
module.exports = F;
},{"./always":13}],6:[function(require,module,exports){
var always = /*#__PURE__*/require('./always');

/**
 * A function that always returns `true`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.always, R.F
 * @example
 *
 *      R.T(); //=> true
 */


var T = /*#__PURE__*/always(true);
module.exports = T;
},{"./always":13}],7:[function(require,module,exports){
/**
 * A special placeholder value used to specify "gaps" within curried functions,
 * allowing partial application of any combination of arguments, regardless of
 * their positions.
 *
 * If `g` is a curried ternary function and `_` is `R.__`, the following are
 * equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2, _)(1, 3)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @constant
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @example
 *
 *      var greet = R.replace('{name}', R.__, 'Hello, {name}!');
 *      greet('Alice'); //=> 'Hello, Alice!'
 */
module.exports = { '@@functional/placeholder': true };
},{}],8:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Adds two values.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 * @see R.subtract
 * @example
 *
 *      R.add(2, 3);       //=>  5
 *      R.add(7)(10);      //=> 17
 */


var add = /*#__PURE__*/_curry2(function add(a, b) {
  return Number(a) + Number(b);
});
module.exports = add;
},{"./internal/_curry2":110}],9:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Creates a new list iteration function from an existing one by adding two new
 * parameters to its callback function: the current index, and the entire list.
 *
 * This would turn, for instance, [`R.map`](#map) function into one that
 * more closely resembles `Array.prototype.map`. Note that this will only work
 * for functions in which the iteration callback function is the first
 * parameter, and where the list is the last parameter. (This latter might be
 * unimportant if the list parameter is not used.)
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Function
 * @category List
 * @sig ((a ... -> b) ... -> [a] -> *) -> (a ..., Int, [a] -> b) ... -> [a] -> *)
 * @param {Function} fn A list iteration function that does not pass index or list to its callback
 * @return {Function} An altered list iteration function that passes (item, index, list) to its callback
 * @example
 *
 *      var mapIndexed = R.addIndex(R.map);
 *      mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
 *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
 */


var addIndex = /*#__PURE__*/_curry1(function addIndex(fn) {
  return curryN(fn.length, function () {
    var idx = 0;
    var origFn = arguments[0];
    var list = arguments[arguments.length - 1];
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = function () {
      var result = origFn.apply(this, _concat(arguments, [idx, list]));
      idx += 1;
      return result;
    };
    return fn.apply(this, args);
  });
});
module.exports = addIndex;
},{"./curryN":46,"./internal/_concat":105,"./internal/_curry1":109}],10:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Applies a function to the value at the given index of an array, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig (a -> a) -> Number -> [a] -> [a]
 * @param {Function} fn The function to apply.
 * @param {Number} idx The index.
 * @param {Array|Arguments} list An array-like object whose value
 *        at the supplied index will be replaced.
 * @return {Array} A copy of the supplied array-like object with
 *         the element at index `idx` replaced with the value
 *         returned by applying `fn` to the existing element.
 * @see R.update
 * @example
 *
 *      R.adjust(R.add(10), 1, [1, 2, 3]);     //=> [1, 12, 3]
 *      R.adjust(R.add(10))(1)([1, 2, 3]);     //=> [1, 12, 3]
 * @symb R.adjust(f, -1, [a, b]) = [a, f(b)]
 * @symb R.adjust(f, 0, [a, b]) = [f(a), b]
 */


var adjust = /*#__PURE__*/_curry3(function adjust(fn, idx, list) {
  if (idx >= list.length || idx < -list.length) {
    return list;
  }
  var start = idx < 0 ? list.length : 0;
  var _idx = start + idx;
  var _list = _concat(list);
  _list[_idx] = fn(list[_idx]);
  return _list;
});
module.exports = adjust;
},{"./internal/_concat":105,"./internal/_curry3":111}],11:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xall = /*#__PURE__*/require('./internal/_xall');

/**
 * Returns `true` if all elements of the list match the predicate, `false` if
 * there are any that don't.
 *
 * Dispatches to the `all` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
 *         otherwise.
 * @see R.any, R.none, R.transduce
 * @example
 *
 *      var equals3 = R.equals(3);
 *      R.all(equals3)([3, 3, 3, 3]); //=> true
 *      R.all(equals3)([3, 3, 1, 3]); //=> false
 */


var all = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['all'], _xall, function all(fn, list) {
  var idx = 0;
  while (idx < list.length) {
    if (!fn(list[idx])) {
      return false;
    }
    idx += 1;
  }
  return true;
}));
module.exports = all;
},{"./internal/_curry2":110,"./internal/_dispatchable":113,"./internal/_xall":147}],12:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var curryN = /*#__PURE__*/require('./curryN');

var max = /*#__PURE__*/require('./max');

var pluck = /*#__PURE__*/require('./pluck');

var reduce = /*#__PURE__*/require('./reduce');

/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if every one of the provided predicates is satisfied
 * by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.anyPass
 * @example
 *
 *      var isQueen = R.propEq('rank', 'Q');
 *      var isSpade = R.propEq('suit', '♠︎');
 *      var isQueenOfSpades = R.allPass([isQueen, isSpade]);
 *
 *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
 *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
 */


var allPass = /*#__PURE__*/_curry1(function allPass(preds) {
  return curryN(reduce(max, 0, pluck('length', preds)), function () {
    var idx = 0;
    var len = preds.length;
    while (idx < len) {
      if (!preds[idx].apply(this, arguments)) {
        return false;
      }
      idx += 1;
    }
    return true;
  });
});
module.exports = allPass;
},{"./curryN":46,"./internal/_curry1":109,"./max":198,"./pluck":243,"./reduce":254}],13:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Returns a function that always returns the given value. Note that for
 * non-primitives the value returned is a reference to the original value.
 *
 * This function is known as `const`, `constant`, or `K` (for K combinator) in
 * other languages and libraries.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> (* -> a)
 * @param {*} val The value to wrap in a function
 * @return {Function} A Function :: * -> val.
 * @example
 *
 *      var t = R.always('Tee');
 *      t(); //=> 'Tee'
 */


var always = /*#__PURE__*/_curry1(function always(val) {
  return function () {
    return val;
  };
});
module.exports = always;
},{"./internal/_curry1":109}],14:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if both arguments are `true`; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if it is falsy, otherwise the second argument.
 * @see R.both
 * @example
 *
 *      R.and(true, true); //=> true
 *      R.and(true, false); //=> false
 *      R.and(false, true); //=> false
 *      R.and(false, false); //=> false
 */


var and = /*#__PURE__*/_curry2(function and(a, b) {
  return a && b;
});
module.exports = and;
},{"./internal/_curry2":110}],15:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xany = /*#__PURE__*/require('./internal/_xany');

/**
 * Returns `true` if at least one of elements of the list match the predicate,
 * `false` otherwise.
 *
 * Dispatches to the `any` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
 *         otherwise.
 * @see R.all, R.none, R.transduce
 * @example
 *
 *      var lessThan0 = R.flip(R.lt)(0);
 *      var lessThan2 = R.flip(R.lt)(2);
 *      R.any(lessThan0)([1, 2]); //=> false
 *      R.any(lessThan2)([1, 2]); //=> true
 */


var any = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['any'], _xany, function any(fn, list) {
  var idx = 0;
  while (idx < list.length) {
    if (fn(list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}));
module.exports = any;
},{"./internal/_curry2":110,"./internal/_dispatchable":113,"./internal/_xany":148}],16:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var curryN = /*#__PURE__*/require('./curryN');

var max = /*#__PURE__*/require('./max');

var pluck = /*#__PURE__*/require('./pluck');

var reduce = /*#__PURE__*/require('./reduce');

/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if at least one of the provided predicates is
 * satisfied by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.allPass
 * @example
 *
 *      var isClub = R.propEq('suit', '♣');
 *      var isSpade = R.propEq('suit', '♠');
 *      var isBlackCard = R.anyPass([isClub, isSpade]);
 *
 *      isBlackCard({rank: '10', suit: '♣'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♠'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♦'}); //=> false
 */


var anyPass = /*#__PURE__*/_curry1(function anyPass(preds) {
  return curryN(reduce(max, 0, pluck('length', preds)), function () {
    var idx = 0;
    var len = preds.length;
    while (idx < len) {
      if (preds[idx].apply(this, arguments)) {
        return true;
      }
      idx += 1;
    }
    return false;
  });
});
module.exports = anyPass;
},{"./curryN":46,"./internal/_curry1":109,"./max":198,"./pluck":243,"./reduce":254}],17:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var map = /*#__PURE__*/require('./map');

/**
 * ap applies a list of functions to a list of values.
 *
 * Dispatches to the `ap` method of the second argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig [a -> b] -> [a] -> [b]
 * @sig Apply f => f (a -> b) -> f a -> f b
 * @sig (a -> b -> c) -> (a -> b) -> (a -> c)
 * @param {*} applyF
 * @param {*} applyX
 * @return {*}
 * @example
 *
 *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
 *      R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
 *
 *      // R.ap can also be used as S combinator
 *      // when only two functions are passed
 *      R.ap(R.concat, R.toUpper)('Ramda') //=> 'RamdaRAMDA'
 * @symb R.ap([f, g], [a, b]) = [f(a), f(b), g(a), g(b)]
 */


var ap = /*#__PURE__*/_curry2(function ap(applyF, applyX) {
  return typeof applyX['fantasy-land/ap'] === 'function' ? applyX['fantasy-land/ap'](applyF) : typeof applyF.ap === 'function' ? applyF.ap(applyX) : typeof applyF === 'function' ? function (x) {
    return applyF(x)(applyX(x));
  } :
  // else
  _reduce(function (acc, f) {
    return _concat(acc, map(f, applyX));
  }, [], applyF);
});
module.exports = ap;
},{"./internal/_concat":105,"./internal/_curry2":110,"./internal/_reduce":142,"./map":192}],18:[function(require,module,exports){
var _aperture = /*#__PURE__*/require('./internal/_aperture');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xaperture = /*#__PURE__*/require('./internal/_xaperture');

/**
 * Returns a new list, composed of n-tuples of consecutive elements. If `n` is
 * greater than the length of the list, an empty list is returned.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @param {Number} n The size of the tuples to create
 * @param {Array} list The list to split into `n`-length tuples
 * @return {Array} The resulting list of `n`-length tuples
 * @see R.transduce
 * @example
 *
 *      R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
 *      R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *      R.aperture(7, [1, 2, 3, 4, 5]); //=> []
 */


var aperture = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xaperture, _aperture));
module.exports = aperture;
},{"./internal/_aperture":97,"./internal/_curry2":110,"./internal/_dispatchable":113,"./internal/_xaperture":149}],19:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The element to add to the end of the new list.
 * @param {Array} list The list of elements to add a new item to.
 *        list.
 * @return {Array} A new list containing the elements of the old list followed by `el`.
 * @see R.prepend
 * @example
 *
 *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 *      R.append('tests', []); //=> ['tests']
 *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 */


var append = /*#__PURE__*/_curry2(function append(el, list) {
  return _concat(list, [el]);
});
module.exports = append;
},{"./internal/_concat":105,"./internal/_curry2":110}],20:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Applies function `fn` to the argument list `args`. This is useful for
 * creating a fixed-arity function from a variadic function. `fn` should be a
 * bound function if context is significant.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> a) -> [*] -> a
 * @param {Function} fn The function which will be called with `args`
 * @param {Array} args The arguments to call `fn` with
 * @return {*} result The result, equivalent to `fn(...args)`
 * @see R.call, R.unapply
 * @example
 *
 *      var nums = [1, 2, 3, -99, 42, 6, 7];
 *      R.apply(Math.max, nums); //=> 42
 * @symb R.apply(f, [a, b, c]) = f(a, b, c)
 */


var apply = /*#__PURE__*/_curry2(function apply(fn, args) {
  return fn.apply(this, args);
});
module.exports = apply;
},{"./internal/_curry2":110}],21:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var apply = /*#__PURE__*/require('./apply');

var curryN = /*#__PURE__*/require('./curryN');

var map = /*#__PURE__*/require('./map');

var max = /*#__PURE__*/require('./max');

var pluck = /*#__PURE__*/require('./pluck');

var reduce = /*#__PURE__*/require('./reduce');

var values = /*#__PURE__*/require('./values');

/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})
 * @param {Object} spec an object recursively mapping properties to functions for
 *        producing the values for these properties.
 * @return {Function} A function that returns an object of the same structure
 * as `spec', with each property set to the value returned by calling its
 * associated function with the supplied arguments.
 * @see R.converge, R.juxt
 * @example
 *
 *      var getMetrics = R.applySpec({
 *        sum: R.add,
 *        nested: { mul: R.multiply }
 *      });
 *      getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
 * @symb R.applySpec({ x: f, y: { z: g } })(a, b) = { x: f(a, b), y: { z: g(a, b) } }
 */


var applySpec = /*#__PURE__*/_curry1(function applySpec(spec) {
  spec = map(function (v) {
    return typeof v == 'function' ? v : applySpec(v);
  }, spec);
  return curryN(reduce(max, 0, pluck('length', values(spec))), function () {
    var args = arguments;
    return map(function (f) {
      return apply(f, args);
    }, spec);
  });
});
module.exports = applySpec;
},{"./apply":20,"./curryN":46,"./internal/_curry1":109,"./map":192,"./max":198,"./pluck":243,"./reduce":254,"./values":313}],22:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
* Takes a value and applies a function to it.
*
* This function is also known as the `thrush` combinator.
*
* @func
* @memberOf R
 * @since v0.25.0
* @category Function
* @sig a -> (a -> b) -> b
* @param {*} x The value
* @param {Function} f The function to apply
* @return {*} The result of applying `f` to `x`
* @example
*
*      var t42 = R.applyTo(42);
*      t42(R.identity); //=> 42
*      t42(R.add(1)); //=> 43
*/


var applyTo = /*#__PURE__*/_curry2(function applyTo(x, f) {
  return f(x);
});
module.exports = applyTo;
},{"./internal/_curry2":110}],23:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Makes an ascending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) < fn(b), `1` if fn(b) < fn(a), otherwise `0`
 * @see R.descend
 * @example
 *
 *      var byAge = R.ascend(R.prop('age'));
 *      var people = [
 *        // ...
 *      ];
 *      var peopleByYoungestFirst = R.sort(byAge, people);
 */


var ascend = /*#__PURE__*/_curry3(function ascend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa < bb ? -1 : aa > bb ? 1 : 0;
});
module.exports = ascend;
},{"./internal/_curry3":111}],24:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig String -> a -> {k: v} -> {k: v}
 * @param {String} prop The property name to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except for the changed property.
 * @see R.dissoc
 * @example
 *
 *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */


var assoc = /*#__PURE__*/_curry3(function assoc(prop, val, obj) {
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  result[prop] = val;
  return result;
});
module.exports = assoc;
},{"./internal/_curry3":111}],25:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _has = /*#__PURE__*/require('./internal/_has');

var _isArray = /*#__PURE__*/require('./internal/_isArray');

var _isInteger = /*#__PURE__*/require('./internal/_isInteger');

var assoc = /*#__PURE__*/require('./assoc');

var isNil = /*#__PURE__*/require('./isNil');

/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> {a}
 * @param {Array} path the path to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except along the specified path.
 * @see R.dissocPath
 * @example
 *
 *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *
 *      // Any missing or non-object keys in path will be overridden
 *      R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
 */


var assocPath = /*#__PURE__*/_curry3(function assocPath(path, val, obj) {
  if (path.length === 0) {
    return val;
  }
  var idx = path[0];
  if (path.length > 1) {
    var nextObj = !isNil(obj) && _has(idx, obj) ? obj[idx] : _isInteger(path[1]) ? [] : {};
    val = assocPath(Array.prototype.slice.call(path, 1), val, nextObj);
  }
  if (_isInteger(idx) && _isArray(obj)) {
    var arr = [].concat(obj);
    arr[idx] = val;
    return arr;
  } else {
    return assoc(idx, val, obj);
  }
});
module.exports = assocPath;
},{"./assoc":24,"./internal/_curry3":111,"./internal/_has":121,"./internal/_isArray":125,"./internal/_isInteger":128,"./isNil":176}],26:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var nAry = /*#__PURE__*/require('./nAry');

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 2 parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (* -> c) -> (a, b -> c)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 2.
 * @see R.nAry, R.unary
 * @example
 *
 *      var takesThreeArgs = function(a, b, c) {
 *        return [a, b, c];
 *      };
 *      takesThreeArgs.length; //=> 3
 *      takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
 *
 *      var takesTwoArgs = R.binary(takesThreeArgs);
 *      takesTwoArgs.length; //=> 2
 *      // Only 2 arguments are passed to the wrapped function
 *      takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
 * @symb R.binary(f)(a, b, c) = f(a, b)
 */


var binary = /*#__PURE__*/_curry1(function binary(fn) {
  return nAry(2, fn);
});
module.exports = binary;
},{"./internal/_curry1":109,"./nAry":216}],27:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      var log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */


var bind = /*#__PURE__*/_curry2(function bind(fn, thisObj) {
  return _arity(fn.length, function () {
    return fn.apply(thisObj, arguments);
  });
});
module.exports = bind;
},{"./internal/_arity":98,"./internal/_curry2":110}],28:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isFunction = /*#__PURE__*/require('./internal/_isFunction');

var and = /*#__PURE__*/require('./and');

var lift = /*#__PURE__*/require('./lift');

/**
 * A function which calls the two provided functions and returns the `&&`
 * of the results.
 * It returns the result of the first function if it is false-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * false-y value.
 *
 * In addition to functions, `R.both` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f A predicate
 * @param {Function} g Another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
 * @see R.and
 * @example
 *
 *      var gt10 = R.gt(R.__, 10)
 *      var lt20 = R.lt(R.__, 20)
 *      var f = R.both(gt10, lt20);
 *      f(15); //=> true
 *      f(30); //=> false
 */


var both = /*#__PURE__*/_curry2(function both(f, g) {
  return _isFunction(f) ? function _both() {
    return f.apply(this, arguments) && g.apply(this, arguments);
  } : lift(and)(f, g);
});
module.exports = both;
},{"./and":14,"./internal/_curry2":110,"./internal/_isFunction":127,"./lift":188}],29:[function(require,module,exports){
var curry = /*#__PURE__*/require('./curry');

/**
 * Returns the result of calling its first argument with the remaining
 * arguments. This is occasionally useful as a converging function for
 * [`R.converge`](#converge): the first branch can produce a function while the
 * remaining branches produce values to be passed to that function as its
 * arguments.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig (*... -> a),*... -> a
 * @param {Function} fn The function to apply to the remaining arguments.
 * @param {...*} args Any number of positional arguments.
 * @return {*}
 * @see R.apply
 * @example
 *
 *      R.call(R.add, 1, 2); //=> 3
 *
 *      var indentN = R.pipe(R.repeat(' '),
 *                           R.join(''),
 *                           R.replace(/^(?!$)/gm));
 *
 *      var format = R.converge(R.call, [
 *                                  R.pipe(R.prop('indent'), indentN),
 *                                  R.prop('value')
 *                              ]);
 *
 *      format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
 * @symb R.call(f, a, b) = f(a, b)
 */


var call = /*#__PURE__*/curry(function call(fn) {
  return fn.apply(this, Array.prototype.slice.call(arguments, 1));
});
module.exports = call;
},{"./curry":45}],30:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _makeFlat = /*#__PURE__*/require('./internal/_makeFlat');

var _xchain = /*#__PURE__*/require('./internal/_xchain');

var map = /*#__PURE__*/require('./map');

/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries
 *
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain m => (a -> m b) -> m a -> m b
 * @param {Function} fn The function to map with
 * @param {Array} list The list to map over
 * @return {Array} The result of flat-mapping `list` with `fn`
 * @example
 *
 *      var duplicate = n => [n, n];
 *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
 *
 *      R.chain(R.append, R.head)([1, 2, 3]); //=> [1, 2, 3, 1]
 */


var chain = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['fantasy-land/chain', 'chain'], _xchain, function chain(fn, monad) {
  if (typeof monad === 'function') {
    return function (x) {
      return fn(monad(x))(x);
    };
  }
  return _makeFlat(false)(map(fn, monad));
}));
module.exports = chain;
},{"./internal/_curry2":110,"./internal/_dispatchable":113,"./internal/_makeFlat":135,"./internal/_xchain":150,"./map":192}],31:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Restricts a number to be within a range.
 *
 * Also works for other ordered types such as Strings and Dates.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Relation
 * @sig Ord a => a -> a -> a -> a
 * @param {Number} minimum The lower limit of the clamp (inclusive)
 * @param {Number} maximum The upper limit of the clamp (inclusive)
 * @param {Number} value Value to be clamped
 * @return {Number} Returns `minimum` when `val < minimum`, `maximum` when `val > maximum`, returns `val` otherwise
 * @example
 *
 *      R.clamp(1, 10, -5) // => 1
 *      R.clamp(1, 10, 15) // => 10
 *      R.clamp(1, 10, 4)  // => 4
 */


var clamp = /*#__PURE__*/_curry3(function clamp(min, max, value) {
  if (min > max) {
    throw new Error('min must not be greater than max in clamp(min, max, value)');
  }
  return value < min ? min : value > max ? max : value;
});
module.exports = clamp;
},{"./internal/_curry3":111}],32:[function(require,module,exports){
var _clone = /*#__PURE__*/require('./internal/_clone');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Creates a deep copy of the value which may contain (nested) `Array`s and
 * `Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are
 * assigned by reference rather than copied
 *
 * Dispatches to a `clone` method if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {*} -> {*}
 * @param {*} value The object or array to clone
 * @return {*} A deeply cloned copy of `val`
 * @example
 *
 *      var objects = [{}, {}, {}];
 *      var objectsClone = R.clone(objects);
 *      objects === objectsClone; //=> false
 *      objects[0] === objectsClone[0]; //=> false
 */


var clone = /*#__PURE__*/_curry1(function clone(value) {
  return value != null && typeof value.clone === 'function' ? value.clone() : _clone(value, [], [], true);
});
module.exports = clone;
},{"./internal/_clone":102,"./internal/_curry1":109}],33:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Makes a comparator function out of a function that reports whether the first
 * element is less than the second.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b) -> Boolean) -> ((a, b) -> Number)
 * @param {Function} pred A predicate function of arity two which will return `true` if the first argument
 * is less than the second, `false` otherwise
 * @return {Function} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`
 * @example
 *
 *      var byAge = R.comparator((a, b) => a.age < b.age);
 *      var people = [
 *        // ...
 *      ];
 *      var peopleByIncreasingAge = R.sort(byAge, people);
 */


var comparator = /*#__PURE__*/_curry1(function comparator(pred) {
  return function (a, b) {
    return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
  };
});
module.exports = comparator;
},{"./internal/_curry1":109}],34:[function(require,module,exports){
var lift = /*#__PURE__*/require('./lift');

var not = /*#__PURE__*/require('./not');

/**
 * Takes a function `f` and returns a function `g` such that if called with the same arguments
 * when `f` returns a "truthy" value, `g` returns `false` and when `f` returns a "falsy" value `g` returns `true`.
 *
 * `R.complement` may be applied to any functor
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> *) -> (*... -> Boolean)
 * @param {Function} f
 * @return {Function}
 * @see R.not
 * @example
 *
 *      var isNotNil = R.complement(R.isNil);
 *      isNil(null); //=> true
 *      isNotNil(null); //=> false
 *      isNil(7); //=> false
 *      isNotNil(7); //=> true
 */


var complement = /*#__PURE__*/lift(not);
module.exports = complement;
},{"./lift":188,"./not":219}],35:[function(require,module,exports){
var pipe = /*#__PURE__*/require('./pipe');

var reverse = /*#__PURE__*/require('./reverse');

/**
 * Performs right-to-left function composition. The rightmost function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      var yellGreeting = R.compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 */


function compose() {
  if (arguments.length === 0) {
    throw new Error('compose requires at least one argument');
  }
  return pipe.apply(this, reverse(arguments));
}
module.exports = compose;
},{"./pipe":240,"./reverse":263}],36:[function(require,module,exports){
var chain = /*#__PURE__*/require('./chain');

var compose = /*#__PURE__*/require('./compose');

var map = /*#__PURE__*/require('./map');

/**
 * Returns the right-to-left Kleisli composition of the provided functions,
 * each of which must return a value of a type supported by [`chain`](#chain).
 *
 * `R.composeK(h, g, f)` is equivalent to `R.compose(R.chain(h), R.chain(g), f)`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Function
 * @sig Chain m => ((y -> m z), (x -> m y), ..., (a -> m b)) -> (a -> m z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipeK
 * @example
 *
 *       //  get :: String -> Object -> Maybe *
 *       var get = R.curry((propName, obj) => Maybe(obj[propName]))
 *
 *       //  getStateCode :: Maybe String -> Maybe String
 *       var getStateCode = R.composeK(
 *         R.compose(Maybe.of, R.toUpper),
 *         get('state'),
 *         get('address'),
 *         get('user'),
 *       );
 *       getStateCode({"user":{"address":{"state":"ny"}}}); //=> Maybe.Just("NY")
 *       getStateCode({}); //=> Maybe.Nothing()
 * @symb R.composeK(f, g, h)(a) = R.chain(f, R.chain(g, h(a)))
 */


function composeK() {
  if (arguments.length === 0) {
    throw new Error('composeK requires at least one argument');
  }
  var init = Array.prototype.slice.call(arguments);
  var last = init.pop();
  return compose(compose.apply(this, map(chain, init)), last);
}
module.exports = composeK;
},{"./chain":30,"./compose":35,"./map":192}],37:[function(require,module,exports){
var pipeP = /*#__PURE__*/require('./pipeP');

var reverse = /*#__PURE__*/require('./reverse');

/**
 * Performs right-to-left composition of one or more Promise-returning
 * functions. The rightmost function may have any arity; the remaining
 * functions must be unary.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((y -> Promise z), (x -> Promise y), ..., (a -> Promise b)) -> (a -> Promise z)
 * @param {...Function} functions The functions to compose
 * @return {Function}
 * @see R.pipeP
 * @example
 *
 *      var db = {
 *        users: {
 *          JOE: {
 *            name: 'Joe',
 *            followers: ['STEVE', 'SUZY']
 *          }
 *        }
 *      }
 *
 *      // We'll pretend to do a db lookup which returns a promise
 *      var lookupUser = (userId) => Promise.resolve(db.users[userId])
 *      var lookupFollowers = (user) => Promise.resolve(user.followers)
 *      lookupUser('JOE').then(lookupFollowers)
 *
 *      //  followersForUser :: String -> Promise [UserId]
 *      var followersForUser = R.composeP(lookupFollowers, lookupUser);
 *      followersForUser('JOE').then(followers => console.log('Followers:', followers))
 *      // Followers: ["STEVE","SUZY"]
 */


function composeP() {
  if (arguments.length === 0) {
    throw new Error('composeP requires at least one argument');
  }
  return pipeP.apply(this, reverse(arguments));
}
module.exports = composeP;
},{"./pipeP":242,"./reverse":263}],38:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isArray = /*#__PURE__*/require('./internal/_isArray');

var _isFunction = /*#__PURE__*/require('./internal/_isFunction');

var _isString = /*#__PURE__*/require('./internal/_isString');

var toString = /*#__PURE__*/require('./toString');

/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 *
 * Dispatches to the `concat` method of the first argument, if present.
 * Can also concatenate two members of a [fantasy-land
 * compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @sig String -> String -> String
 * @param {Array|String} firstList The first list
 * @param {Array|String} secondList The second list
 * @return {Array|String} A list consisting of the elements of `firstList` followed by the elements of
 * `secondList`.
 *
 * @example
 *
 *      R.concat('ABC', 'DEF'); // 'ABCDEF'
 *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *      R.concat([], []); //=> []
 */


var concat = /*#__PURE__*/_curry2(function concat(a, b) {
  if (_isArray(a)) {
    if (_isArray(b)) {
      return a.concat(b);
    }
    throw new TypeError(toString(b) + ' is not an array');
  }
  if (_isString(a)) {
    if (_isString(b)) {
      return a + b;
    }
    throw new TypeError(toString(b) + ' is not a string');
  }
  if (a != null && _isFunction(a['fantasy-land/concat'])) {
    return a['fantasy-land/concat'](b);
  }
  if (a != null && _isFunction(a.concat)) {
    return a.concat(b);
  }
  throw new TypeError(toString(a) + ' does not have a method named "concat" or "fantasy-land/concat"');
});
module.exports = concat;
},{"./internal/_curry2":110,"./internal/_isArray":125,"./internal/_isFunction":127,"./internal/_isString":133,"./toString":291}],39:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var map = /*#__PURE__*/require('./map');

var max = /*#__PURE__*/require('./max');

var reduce = /*#__PURE__*/require('./reduce');

/**
 * Returns a function, `fn`, which encapsulates `if/else, if/else, ...` logic.
 * `R.cond` takes a list of [predicate, transformer] pairs. All of the arguments
 * to `fn` are applied to each of the predicates in turn until one returns a
 * "truthy" value, at which point `fn` returns the result of applying its
 * arguments to the corresponding transformer. If none of the predicates
 * matches, `fn` returns undefined.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Logic
 * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)
 * @param {Array} pairs A list of [predicate, transformer]
 * @return {Function}
 * @example
 *
 *      var fn = R.cond([
 *        [R.equals(0),   R.always('water freezes at 0°C')],
 *        [R.equals(100), R.always('water boils at 100°C')],
 *        [R.T,           temp => 'nothing special happens at ' + temp + '°C']
 *      ]);
 *      fn(0); //=> 'water freezes at 0°C'
 *      fn(50); //=> 'nothing special happens at 50°C'
 *      fn(100); //=> 'water boils at 100°C'
 */


var cond = /*#__PURE__*/_curry1(function cond(pairs) {
  var arity = reduce(max, 0, map(function (pair) {
    return pair[0].length;
  }, pairs));
  return _arity(arity, function () {
    var idx = 0;
    while (idx < pairs.length) {
      if (pairs[idx][0].apply(this, arguments)) {
        return pairs[idx][1].apply(this, arguments);
      }
      idx += 1;
    }
  });
});
module.exports = cond;
},{"./internal/_arity":98,"./internal/_curry1":109,"./map":192,"./max":198,"./reduce":254}],40:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var constructN = /*#__PURE__*/require('./constructN');

/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> {*}) -> (* -> {*})
 * @param {Function} fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @see R.invoker
 * @example
 *
 *      // Constructor function
 *      function Animal(kind) {
 *        this.kind = kind;
 *      };
 *      Animal.prototype.sighting = function() {
 *        return "It's a " + this.kind + "!";
 *      }
 *
 *      var AnimalConstructor = R.construct(Animal)
 *
 *      // Notice we no longer need the 'new' keyword:
 *      AnimalConstructor('Pig'); //=> {"kind": "Pig", "sighting": function (){...}};
 *
 *      var animalTypes = ["Lion", "Tiger", "Bear"];
 *      var animalSighting = R.invoker(0, 'sighting');
 *      var sightNewAnimal = R.compose(animalSighting, AnimalConstructor);
 *      R.map(sightNewAnimal, animalTypes); //=> ["It's a Lion!", "It's a Tiger!", "It's a Bear!"]
 */


var construct = /*#__PURE__*/_curry1(function construct(Fn) {
  return constructN(Fn.length, Fn);
});
module.exports = construct;
},{"./constructN":41,"./internal/_curry1":109}],41:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var curry = /*#__PURE__*/require('./curry');

var nAry = /*#__PURE__*/require('./nAry');

/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type. The arity of the function
 * returned is specified to allow using variadic constructor functions.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Function
 * @sig Number -> (* -> {*}) -> (* -> {*})
 * @param {Number} n The arity of the constructor function.
 * @param {Function} Fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @example
 *
 *      // Variadic Constructor function
 *      function Salad() {
 *        this.ingredients = arguments;
 *      }
 *
 *      Salad.prototype.recipe = function() {
 *        var instructions = R.map(ingredient => 'Add a dollop of ' + ingredient, this.ingredients);
 *        return R.join('\n', instructions);
 *      };
 *
 *      var ThreeLayerSalad = R.constructN(3, Salad);
 *
 *      // Notice we no longer need the 'new' keyword, and the constructor is curried for 3 arguments.
 *      var salad = ThreeLayerSalad('Mayonnaise')('Potato Chips')('Ketchup');
 *
 *      console.log(salad.recipe());
 *      // Add a dollop of Mayonnaise
 *      // Add a dollop of Potato Chips
 *      // Add a dollop of Ketchup
 */


var constructN = /*#__PURE__*/_curry2(function constructN(n, Fn) {
  if (n > 10) {
    throw new Error('Constructor with greater than ten arguments');
  }
  if (n === 0) {
    return function () {
      return new Fn();
    };
  }
  return curry(nAry(n, function ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
    switch (arguments.length) {
      case 1:
        return new Fn($0);
      case 2:
        return new Fn($0, $1);
      case 3:
        return new Fn($0, $1, $2);
      case 4:
        return new Fn($0, $1, $2, $3);
      case 5:
        return new Fn($0, $1, $2, $3, $4);
      case 6:
        return new Fn($0, $1, $2, $3, $4, $5);
      case 7:
        return new Fn($0, $1, $2, $3, $4, $5, $6);
      case 8:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7);
      case 9:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);
      case 10:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
    }
  }));
});
module.exports = constructN;
},{"./curry":45,"./internal/_curry2":110,"./nAry":216}],42:[function(require,module,exports){
var _contains = /*#__PURE__*/require('./internal/_contains');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if the specified value is equal, in [`R.equals`](#equals)
 * terms, to at least one element of the given list; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if an equivalent item is in the list, `false` otherwise.
 * @see R.any
 * @example
 *
 *      R.contains(3, [1, 2, 3]); //=> true
 *      R.contains(4, [1, 2, 3]); //=> false
 *      R.contains({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
 *      R.contains([42], [[42]]); //=> true
 */


var contains = /*#__PURE__*/_curry2(_contains);
module.exports = contains;
},{"./internal/_contains":106,"./internal/_curry2":110}],43:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _map = /*#__PURE__*/require('./internal/_map');

var curryN = /*#__PURE__*/require('./curryN');

var max = /*#__PURE__*/require('./max');

var pluck = /*#__PURE__*/require('./pluck');

var reduce = /*#__PURE__*/require('./reduce');

/**
 * Accepts a converging function and a list of branching functions and returns
 * a new function. When invoked, this new function is applied to some
 * arguments, each branching function is applied to those same arguments. The
 * results of each branching function are passed as arguments to the converging
 * function to produce the return value.
 *
 * @func
 * @memberOf R
 * @since v0.4.2
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [((a, b, ...) -> x1), ((a, b, ...) -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} after A function. `after` will be invoked with the return values of
 *        `fn1` and `fn2` as its arguments.
 * @param {Array} functions A list of functions.
 * @return {Function} A new function.
 * @see R.useWith
 * @example
 *
 *      var average = R.converge(R.divide, [R.sum, R.length])
 *      average([1, 2, 3, 4, 5, 6, 7]) //=> 4
 *
 *      var strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
 *      strangeConcat("Yodel") //=> "YODELyodel"
 *
 * @symb R.converge(f, [g, h])(a, b) = f(g(a, b), h(a, b))
 */


var converge = /*#__PURE__*/_curry2(function converge(after, fns) {
  return curryN(reduce(max, 0, pluck('length', fns)), function () {
    var args = arguments;
    var context = this;
    return after.apply(context, _map(function (fn) {
      return fn.apply(context, args);
    }, fns));
  });
});
module.exports = converge;
},{"./curryN":46,"./internal/_curry2":110,"./internal/_map":136,"./max":198,"./pluck":243,"./reduce":254}],44:[function(require,module,exports){
var reduceBy = /*#__PURE__*/require('./reduceBy');

/**
 * Counts the elements of a list according to how many match each value of a
 * key generated by the supplied function. Returns an object mapping the keys
 * produced by `fn` to the number of occurrences in the list. Note that all
 * keys are coerced to strings because of how JavaScript objects work.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig (a -> String) -> [a] -> {*}
 * @param {Function} fn The function used to map values to keys.
 * @param {Array} list The list to count elements from.
 * @return {Object} An object mapping keys to number of occurrences in the list.
 * @example
 *
 *      var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
 *      R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
 *
 *      var letters = ['a', 'b', 'A', 'a', 'B', 'c'];
 *      R.countBy(R.toLower)(letters);   //=> {'a': 3, 'b': 2, 'c': 1}
 */


var countBy = /*#__PURE__*/reduceBy(function (acc, elem) {
  return acc + 1;
}, 0);
module.exports = countBy;
},{"./reduceBy":255}],45:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curryN
 * @example
 *
 *      var addFourNumbers = (a, b, c, d) => a + b + c + d;
 *
 *      var curriedAddFourNumbers = R.curry(addFourNumbers);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */


var curry = /*#__PURE__*/_curry1(function curry(fn) {
  return curryN(fn.length, fn);
});
module.exports = curry;
},{"./curryN":46,"./internal/_curry1":109}],46:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _curryN = /*#__PURE__*/require('./internal/_curryN');

/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var sumArgs = (...args) => R.sum(args);
 *
 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */


var curryN = /*#__PURE__*/_curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }
  return _arity(length, _curryN(length, [], fn));
});
module.exports = curryN;
},{"./internal/_arity":98,"./internal/_curry1":109,"./internal/_curry2":110,"./internal/_curryN":112}],47:[function(require,module,exports){
var add = /*#__PURE__*/require('./add');

/**
 * Decrements its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n - 1
 * @see R.inc
 * @example
 *
 *      R.dec(42); //=> 41
 */


var dec = /*#__PURE__*/add(-1);
module.exports = dec;
},{"./add":8}],48:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns the second argument if it is not `null`, `undefined` or `NaN`;
 * otherwise the first argument is returned.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {a} default The default value.
 * @param {b} val `val` will be returned instead of `default` unless `val` is `null`, `undefined` or `NaN`.
 * @return {*} The second value if it is not `null`, `undefined` or `NaN`, otherwise the default value
 * @example
 *
 *      var defaultTo42 = R.defaultTo(42);
 *
 *      defaultTo42(null);  //=> 42
 *      defaultTo42(undefined);  //=> 42
 *      defaultTo42('Ramda');  //=> 'Ramda'
 *      // parseInt('string') results in NaN
 *      defaultTo42(parseInt('string')); //=> 42
 */


var defaultTo = /*#__PURE__*/_curry2(function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
});
module.exports = defaultTo;
},{"./internal/_curry2":110}],49:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Makes a descending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) > fn(b), `1` if fn(b) > fn(a), otherwise `0`
 * @see R.ascend
 * @example
 *
 *      var byAge = R.descend(R.prop('age'));
 *      var people = [
 *        // ...
 *      ];
 *      var peopleByOldestFirst = R.sort(byAge, people);
 */


var descend = /*#__PURE__*/_curry3(function descend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa > bb ? -1 : aa < bb ? 1 : 0;
});
module.exports = descend;
},{"./internal/_curry3":111}],50:[function(require,module,exports){
var _contains = /*#__PURE__*/require('./internal/_contains');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Objects and Arrays are compared in terms of
 * value equality, not reference equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.differenceWith, R.symmetricDifference, R.symmetricDifferenceWith, R.without
 * @example
 *
 *      R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
 *      R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
 *      R.difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]) //=> [{b: 2}]
 */


var difference = /*#__PURE__*/_curry2(function difference(first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  while (idx < firstLen) {
    if (!_contains(first[idx], second) && !_contains(first[idx], out)) {
      out[out.length] = first[idx];
    }
    idx += 1;
  }
  return out;
});
module.exports = difference;
},{"./internal/_contains":106,"./internal/_curry2":110}],51:[function(require,module,exports){
var _containsWith = /*#__PURE__*/require('./internal/_containsWith');

var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Duplication is determined according to the
 * value returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.difference, R.symmetricDifference, R.symmetricDifferenceWith
 * @example
 *
 *      var cmp = (x, y) => x.a === y.a;
 *      var l1 = [{a: 1}, {a: 2}, {a: 3}];
 *      var l2 = [{a: 3}, {a: 4}];
 *      R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
 */


var differenceWith = /*#__PURE__*/_curry3(function differenceWith(pred, first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  while (idx < firstLen) {
    if (!_containsWith(pred, first[idx], second) && !_containsWith(pred, first[idx], out)) {
      out.push(first[idx]);
    }
    idx += 1;
  }
  return out;
});
module.exports = differenceWith;
},{"./internal/_containsWith":107,"./internal/_curry3":111}],52:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a new object that does not contain a `prop` property.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Object
 * @sig String -> {k: v} -> {k: v}
 * @param {String} prop The name of the property to dissociate
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original but without the specified property
 * @see R.assoc
 * @example
 *
 *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
 */


var dissoc = /*#__PURE__*/_curry2(function dissoc(prop, obj) {
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  delete result[prop];
  return result;
});
module.exports = dissoc;
},{"./internal/_curry2":110}],53:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isInteger = /*#__PURE__*/require('./internal/_isInteger');

var assoc = /*#__PURE__*/require('./assoc');

var dissoc = /*#__PURE__*/require('./dissoc');

var remove = /*#__PURE__*/require('./remove');

var update = /*#__PURE__*/require('./update');

/**
 * Makes a shallow clone of an object, omitting the property at the given path.
 * Note that this copies and flattens prototype properties onto the new object
 * as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.11.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {k: v} -> {k: v}
 * @param {Array} path The path to the value to omit
 * @param {Object} obj The object to clone
 * @return {Object} A new object without the property at path
 * @see R.assocPath
 * @example
 *
 *      R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
 */


var dissocPath = /*#__PURE__*/_curry2(function dissocPath(path, obj) {
  switch (path.length) {
    case 0:
      return obj;
    case 1:
      return _isInteger(path[0]) ? remove(path[0], 1, obj) : dissoc(path[0], obj);
    default:
      var head = path[0];
      var tail = Array.prototype.slice.call(path, 1);
      if (obj[head] == null) {
        return obj;
      } else if (_isInteger(path[0])) {
        return update(head, dissocPath(tail, obj[head]), obj);
      } else {
        return assoc(head, dissocPath(tail, obj[head]), obj);
      }
  }
});
module.exports = dissocPath;
},{"./assoc":24,"./dissoc":52,"./internal/_curry2":110,"./internal/_isInteger":128,"./remove":260,"./update":311}],54:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Divides two numbers. Equivalent to `a / b`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a / b`.
 * @see R.multiply
 * @example
 *
 *      R.divide(71, 100); //=> 0.71
 *
 *      var half = R.divide(R.__, 2);
 *      half(42); //=> 21
 *
 *      var reciprocal = R.divide(1);
 *      reciprocal(4);   //=> 0.25
 */


var divide = /*#__PURE__*/_curry2(function divide(a, b) {
  return a / b;
});
module.exports = divide;
},{"./internal/_curry2":110}],55:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xdrop = /*#__PURE__*/require('./internal/_xdrop');

var slice = /*#__PURE__*/require('./slice');

/**
 * Returns all but the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `drop` method).
 *
 * Dispatches to the `drop` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*} A copy of list without the first `n` elements
 * @see R.take, R.transduce, R.dropLast, R.dropWhile
 * @example
 *
 *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(3, 'ramda');               //=> 'da'
 */


var drop = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['drop'], _xdrop, function drop(n, xs) {
  return slice(Math.max(0, n), Infinity, xs);
}));
module.exports = drop;
},{"./internal/_curry2":110,"./internal/_dispatchable":113,"./internal/_xdrop":151,"./slice":267}],56:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _dropLast = /*#__PURE__*/require('./internal/_dropLast');

var _xdropLast = /*#__PURE__*/require('./internal/_xdropLast');

/**
 * Returns a list containing all but the last `n` elements of the given `list`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements of `list` to skip.
 * @param {Array} list The list of elements to consider.
 * @return {Array} A copy of the list with only the first `list.length - n` elements
 * @see R.takeLast, R.drop, R.dropWhile, R.dropLastWhile
 * @example
 *
 *      R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(3, 'ramda');               //=> 'ra'
 */


var dropLast = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xdropLast, _dropLast));
module.exports = dropLast;
},{"./internal/_curry2":110,"./internal/_dispatchable":113,"./internal/_dropLast":114,"./internal/_xdropLast":152}],57:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _dropLastWhile = /*#__PURE__*/require('./internal/_dropLastWhile');

var _xdropLastWhile = /*#__PURE__*/require('./internal/_xdropLastWhile');

/**
 * Returns a new list excluding all the tailing elements of a given list which
 * satisfy the supplied predicate function. It passes each value from the right
 * to the supplied predicate function, skipping elements until the predicate
 * function returns a `falsy` value. The predicate function is applied to one argument:
 * *(value)*.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} predicate The function to be called on each element
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array without any trailing elements that return `falsy` values from the `predicate`.
 * @see R.takeLastWhile, R.addIndex, R.drop, R.dropWhile
 * @example
 *
 *      var lteThree = x => x <= 3;
 *
 *      R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
 *
 *      R.dropLastWhile(x => x !== 'd' , 'Ramda'); //=> 'Ramd'
 */


var dropLastWhile = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xdropLastWhile, _dropLastWhile));
module.exports = dropLastWhile;
},{"./internal/_curry2":110,"./internal/_dispatchable":113,"./internal/_dropLastWhile":115,"./internal/_xdropLastWhile":153}],58:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xdropRepeatsWith = /*#__PURE__*/require('./internal/_xdropRepeatsWith');

var dropRepeatsWith = /*#__PURE__*/require('./dropRepeatsWith');

var equals = /*#__PURE__*/require('./equals');

/**
 * Returns a new list without any consecutively repeating elements.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
 */


var dropRepeats = /*#__PURE__*/_curry1( /*#__PURE__*/_dispatchable([], /*#__PURE__*/_xdropRepeatsWith(equals), /*#__PURE__*/dropRepeatsWith(equals)));
module.exports = dropRepeats;
},{"./dropRepeatsWith":59,"./equals":66,"./internal/_curry1":109,"./internal/_dispatchable":113,"./internal/_xdropRepeatsWith":154}],59:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xdropRepeatsWith = /*#__PURE__*/require('./internal/_xdropRepeatsWith');

var last = /*#__PURE__*/require('./last');

/**
 * Returns a new list without any consecutively repeating elements. Equality is
 * determined by applying the supplied predicate to each pair of consecutive elements. The
 * first element in a series of equal elements will be preserved.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig ((a, a) -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *      var l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
 *      R.dropRepeatsWith(R.eqBy(Math.abs), l); //=> [1, 3, 4, -5, 3]
 */


var dropRepeatsWith = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xdropRepeatsWith, function dropRepeatsWith(pred, list) {
  var result = [];
  var idx = 1;
  var len = list.length;
  if (len !== 0) {
    result[0] = list[0];
    while (idx < len) {
      if (!pred(last(result), list[idx])) {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
  }
  return result;
}));
module.exports = dropRepeatsWith;
},{"./internal/_curry2":110,"./internal/_dispatchable":113,"./internal/_xdropRepeatsWith":154,"./last":181}],60:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xdropWhile = /*#__PURE__*/require('./internal/_xdropWhile');

var slice = /*#__PURE__*/require('./slice');

/**
 * Returns a new list excluding the leading elements of a given list which
 * satisfy the supplied predicate function. It passes each value to the supplied
 * predicate function, skipping elements while the predicate function returns
 * `true`. The predicate function is applied to one argument: *(value)*.
 *
 * Dispatches to the `dropWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.takeWhile, R.transduce, R.addIndex
 * @example
 *
 *      var lteTwo = x => x <= 2;
 *
 *      R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
 *
 *      R.dropWhile(x => x !== 'd' , 'Ramda'); //=> 'da'
 */


var dropWhile = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['dropWhile'], _xdropWhile, function dropWhile(pred, xs) {
  var idx = 0;
  var len = xs.length;
  while (idx < len && pred(xs[idx])) {
    idx += 1;
  }
  return slice(idx, Infinity, xs);
}));
module.exports = dropWhile;
},{"./internal/_curry2":110,"./internal/_dispatchable":113,"./internal/_xdropWhile":155,"./slice":267}],61:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isFunction = /*#__PURE__*/require('./internal/_isFunction');

var lift = /*#__PURE__*/require('./lift');

var or = /*#__PURE__*/require('./or');

/**
 * A function wrapping calls to the two functions in an `||` operation,
 * returning the result of the first function if it is truth-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * truth-y value.
 *
 * In addition to functions, `R.either` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f a predicate
 * @param {Function} g another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
 * @see R.or
 * @example
 *
 *      var gt10 = x => x > 10;
 *      var even = x => x % 2 === 0;
 *      var f = R.either(gt10, even);
 *      f(101); //=> true
 *      f(8); //=> true
 */


var either = /*#__PURE__*/_curry2(function either(f, g) {
  return _isFunction(f) ? function _either() {
    return f.apply(this, arguments) || g.apply(this, arguments);
  } : lift(or)(f, g);
});
module.exports = either;
},{"./internal/_curry2":110,"./internal/_isFunction":127,"./lift":188,"./or":227}],62:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _isArguments = /*#__PURE__*/require('./internal/_isArguments');

var _isArray = /*#__PURE__*/require('./internal/_isArray');

var _isObject = /*#__PURE__*/require('./internal/_isObject');

var _isString = /*#__PURE__*/require('./internal/_isString');

/**
 * Returns the empty value of its argument's type. Ramda defines the empty
 * value of Array (`[]`), Object (`{}`), String (`''`), and Arguments. Other
 * types are supported if they define `<Type>.empty`,
 * `<Type>.prototype.empty` or implement the
 * [FantasyLand Monoid spec](https://github.com/fantasyland/fantasy-land#monoid).
 *
 * Dispatches to the `empty` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> a
 * @param {*} x
 * @return {*}
 * @example
 *
 *      R.empty(Just(42));      //=> Nothing()
 *      R.empty([1, 2, 3]);     //=> []
 *      R.empty('unicorns');    //=> ''
 *      R.empty({x: 1, y: 2});  //=> {}
 */


var empty = /*#__PURE__*/_curry1(function empty(x) {
  return x != null && typeof x['fantasy-land/empty'] === 'function' ? x['fantasy-land/empty']() : x != null && x.constructor != null && typeof x.constructor['fantasy-land/empty'] === 'function' ? x.constructor['fantasy-land/empty']() : x != null && typeof x.empty === 'function' ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === 'function' ? x.constructor.empty() : _isArray(x) ? [] : _isString(x) ? '' : _isObject(x) ? {} : _isArguments(x) ? function () {
    return arguments;
  }() :
  // else
  void 0;
});
module.exports = empty;
},{"./internal/_curry1":109,"./internal/_isArguments":124,"./internal/_isArray":125,"./internal/_isObject":130,"./internal/_isString":133}],63:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var equals = /*#__PURE__*/require('./equals');

var takeLast = /*#__PURE__*/require('./takeLast');

/**
 * Checks if a list ends with the provided values
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> Boolean
 * @sig String -> Boolean
 * @param {*} suffix
 * @param {*} list
 * @return {Boolean}
 * @example
 *
 *      R.endsWith('c', 'abc')                //=> true
 *      R.endsWith('b', 'abc')                //=> false
 *      R.endsWith(['c'], ['a', 'b', 'c'])    //=> true
 *      R.endsWith(['b'], ['a', 'b', 'c'])    //=> false
 */


var endsWith = /*#__PURE__*/_curry2(function (suffix, list) {
  return equals(takeLast(suffix.length, list), suffix);
});
module.exports = endsWith;
},{"./equals":66,"./internal/_curry2":110,"./takeLast":282}],64:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var equals = /*#__PURE__*/require('./equals');

/**
 * Takes a function and two values in its domain and returns `true` if the
 * values map to the same value in the codomain; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Relation
 * @sig (a -> b) -> a -> a -> Boolean
 * @param {Function} f
 * @param {*} x
 * @param {*} y
 * @return {Boolean}
 * @example
 *
 *      R.eqBy(Math.abs, 5, -5); //=> true
 */


var eqBy = /*#__PURE__*/_curry3(function eqBy(f, x, y) {
  return equals(f(x), f(y));
});
module.exports = eqBy;
},{"./equals":66,"./internal/_curry3":111}],65:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var equals = /*#__PURE__*/require('./equals');

/**
 * Reports whether two objects have the same value, in [`R.equals`](#equals)
 * terms, for the specified property. Useful as a curried predicate.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig k -> {k: v} -> {k: v} -> Boolean
 * @param {String} prop The name of the property to compare
 * @param {Object} obj1
 * @param {Object} obj2
 * @return {Boolean}
 *
 * @example
 *
 *      var o1 = { a: 1, b: 2, c: 3, d: 4 };
 *      var o2 = { a: 10, b: 20, c: 3, d: 40 };
 *      R.eqProps('a', o1, o2); //=> false
 *      R.eqProps('c', o1, o2); //=> true
 */


var eqProps = /*#__PURE__*/_curry3(function eqProps(prop, obj1, obj2) {
  return equals(obj1[prop], obj2[prop]);
});
module.exports = eqProps;
},{"./equals":66,"./internal/_curry3":111}],66:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _equals = /*#__PURE__*/require('./internal/_equals');

/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      var a = {}; a.v = a;
 *      var b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */


var equals = /*#__PURE__*/_curry2(function equals(a, b) {
  return _equals(a, b, [], []);
});
module.exports = equals;
},{"./internal/_curry2":110,"./internal/_equals":116}],67:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates a new object by recursively evolving a shallow copy of `object`,
 * according to the `transformation` functions. All non-primitive properties
 * are copied by reference.
 *
 * A `transformation` function will not be invoked if its corresponding key
 * does not exist in the evolved object.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {k: (v -> v)} -> {k: v} -> {k: v}
 * @param {Object} transformations The object specifying transformation functions to apply
 *        to the object.
 * @param {Object} object The object to be transformed.
 * @return {Object} The transformed object.
 * @example
 *
 *      var tomato  = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
 *      var transformations = {
 *        firstName: R.trim,
 *        lastName: R.trim, // Will not get invoked.
 *        data: {elapsed: R.add(1), remaining: R.add(-1)}
 *      };
 *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
 */


var evolve = /*#__PURE__*/_curry2(function evolve(transformations, object) {
  var result = {};
  var transformation, key, type;
  for (key in object) {
    transformation = transformations[key];
    type = typeof transformation;
    result[key] = type === 'function' ? transformation(object[key]) : transformation && type === 'object' ? evolve(transformation, object[key]) : object[key];
  }
  return result;
});
module.exports = evolve;
},{"./internal/_curry2":110}],68:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _filter = /*#__PURE__*/require('./internal/_filter');

var _isObject = /*#__PURE__*/require('./internal/_isObject');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var _xfilter = /*#__PURE__*/require('./internal/_xfilter');

var keys = /*#__PURE__*/require('./keys');

/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array} Filterable
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      var isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */


var filter = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['filter'], _xfilter, function (pred, filterable) {
  return _isObject(filterable) ? _reduce(function (acc, key) {
    if (pred(filterable[key])) {
      acc[key] = filterable[key];
    }
    return acc;
  }, {}, keys(filterable)) :
  // else
  _filter(pred, filterable);
}));
module.exports = filter;
},{"./internal/_curry2":110,"./internal/_dispatchable":113,"./internal/_filter":117,"./internal/_isObject":130,"./internal/_reduce":142,"./internal/_xfilter":157,"./keys":179}],69:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xfind = /*#__PURE__*/require('./internal/_xfind');

/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Dispatches to the `find` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.find(R.propEq('a', 4))(xs); //=> undefined
 */


var find = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['find'], _xfind, function find(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      return list[idx];
    }
    idx += 1;
  }
}));
module.exports = find;
},{"./internal/_curry2":110,"./internal/_dispatchable":113,"./internal/_xfind":158}],70:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xfindIndex = /*#__PURE__*/require('./internal/_xfindIndex');

/**
 * Returns the index of the first element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
 *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
 */


var findIndex = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xfindIndex, function findIndex(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}));
module.exports = findIndex;
},{"./internal/_curry2":110,"./internal/_dispatchable":113,"./internal/_xfindIndex":159}],71:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xfindLast = /*#__PURE__*/require('./internal/_xfindLast');

/**
 * Returns the last element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
 *      R.findLast(R.propEq('a', 4))(xs); //=> undefined
 */


var findLast = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xfindLast, function findLast(fn, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    if (fn(list[idx])) {
      return list[idx];
    }
    idx -= 1;
  }
}));
module.exports = findLast;
},{"./internal/_curry2":110,"./internal/_dispatchable":113,"./internal/_xfindLast":160}],72:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xfindLastIndex = /*#__PURE__*/require('./internal/_xfindLastIndex');

/**
 * Returns the index of the last element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
 *      R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
 */


var findLastIndex = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xfindLastIndex, function findLastIndex(fn, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    if (fn(list[idx])) {
      return idx;
    }
    idx -= 1;
  }
  return -1;
}));
module.exports = findLastIndex;
},{"./internal/_curry2":110,"./internal/_dispatchable":113,"./internal/_xfindLastIndex":161}],73:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _makeFlat = /*#__PURE__*/require('./internal/_makeFlat');

/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b]
 * @param {Array} list The array to consider.
 * @return {Array} The flattened list.
 * @see R.unnest
 * @example
 *
 *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */


var flatten = /*#__PURE__*/_curry1( /*#__PURE__*/_makeFlat(true));
module.exports = flatten;
},{"./internal/_curry1":109,"./internal/_makeFlat":135}],74:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b, c, ...) -> z) -> (b -> a -> c -> ... -> z)
 * @param {Function} fn The function to invoke with its first two parameters reversed.
 * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
 * @example
 *
 *      var mergeThree = (a, b, c) => [].concat(a, b, c);
 *
 *      mergeThree(1, 2, 3); //=> [1, 2, 3]
 *
 *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 * @symb R.flip(f)(a, b, c) = f(b, a, c)
 */


var flip = /*#__PURE__*/_curry1(function flip(fn) {
  return curryN(fn.length, function (a, b) {
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = b;
    args[1] = a;
    return fn.apply(this, args);
  });
});
module.exports = flip;
},{"./curryN":46,"./internal/_curry1":109}],75:[function(require,module,exports){
var _checkForMethod = /*#__PURE__*/require('./internal/_checkForMethod');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Iterate over an input `list`, calling a provided function `fn` for each
 * element in the list.
 *
 * `fn` receives one argument: *(value)*.
 *
 * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.forEach` method. For more
 * details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 *
 * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
 * the original array. In some libraries this function is named `each`.
 *
 * Dispatches to the `forEach` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> *) -> [a] -> [a]
 * @param {Function} fn The function to invoke. Receives one argument, `value`.
 * @param {Array} list The list to iterate over.
 * @return {Array} The original list.
 * @see R.addIndex
 * @example
 *
 *      var printXPlusFive = x => console.log(x + 5);
 *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
 *      // logs 6
 *      // logs 7
 *      // logs 8
 * @symb R.forEach(f, [a, b, c]) = [a, b, c]
 */


var forEach = /*#__PURE__*/_curry2( /*#__PURE__*/_checkForMethod('forEach', function forEach(fn, list) {
  var len = list.length;
  var idx = 0;
  while (idx < len) {
    fn(list[idx]);
    idx += 1;
  }
  return list;
}));
module.exports = forEach;
},{"./internal/_checkForMethod":101,"./internal/_curry2":110}],76:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var keys = /*#__PURE__*/require('./keys');

/**
 * Iterate over an input `object`, calling a provided function `fn` for each
 * key and value in the object.
 *
 * `fn` receives three argument: *(value, key, obj)*.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Object
 * @sig ((a, String, StrMap a) -> Any) -> StrMap a -> StrMap a
 * @param {Function} fn The function to invoke. Receives three argument, `value`, `key`, `obj`.
 * @param {Object} obj The object to iterate over.
 * @return {Object} The original object.
 * @example
 *
 *      var printKeyConcatValue = (value, key) => console.log(key + ':' + value);
 *      R.forEachObjIndexed(printKeyConcatValue, {x: 1, y: 2}); //=> {x: 1, y: 2}
 *      // logs x:1
 *      // logs y:2
 * @symb R.forEachObjIndexed(f, {x: a, y: b}) = {x: a, y: b}
 */


var forEachObjIndexed = /*#__PURE__*/_curry2(function forEachObjIndexed(fn, obj) {
  var keyList = keys(obj);
  var idx = 0;
  while (idx < keyList.length) {
    var key = keyList[idx];
    fn(obj[key], key, obj);
    idx += 1;
  }
  return obj;
});
module.exports = forEachObjIndexed;
},{"./internal/_curry2":110,"./keys":179}],77:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [[k,v]] -> {k: v}
 * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.
 * @return {Object} The object made by pairing up `keys` and `values`.
 * @see R.toPairs, R.pair
 * @example
 *
 *      R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
 */


var fromPairs = /*#__PURE__*/_curry1(function fromPairs(pairs) {
  var result = {};
  var idx = 0;
  while (idx < pairs.length) {
    result[pairs[idx][0]] = pairs[idx][1];
    idx += 1;
  }
  return result;
});
module.exports = fromPairs;
},{"./internal/_curry1":109}],78:[function(require,module,exports){
var _checkForMethod = /*#__PURE__*/require('./internal/_checkForMethod');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var reduceBy = /*#__PURE__*/require('./reduceBy');

/**
 * Splits a list into sub-lists stored in an object, based on the result of
 * calling a String-returning function on each element, and grouping the
 * results according to values returned.
 *
 * Dispatches to the `groupBy` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> String) -> [a] -> {String: [a]}
 * @param {Function} fn Function :: a -> String
 * @param {Array} list The array to group
 * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
 *         that produced that key when passed to `fn`.
 * @see R.transduce
 * @example
 *
 *      var byGrade = R.groupBy(function(student) {
 *        var score = student.score;
 *        return score < 65 ? 'F' :
 *               score < 70 ? 'D' :
 *               score < 80 ? 'C' :
 *               score < 90 ? 'B' : 'A';
 *      });
 *      var students = [{name: 'Abby', score: 84},
 *                      {name: 'Eddy', score: 58},
 *                      // ...
 *                      {name: 'Jack', score: 69}];
 *      byGrade(students);
 *      // {
 *      //   'A': [{name: 'Dianne', score: 99}],
 *      //   'B': [{name: 'Abby', score: 84}]
 *      //   // ...,
 *      //   'F': [{name: 'Eddy', score: 58}]
 *      // }
 */


var groupBy = /*#__PURE__*/_curry2( /*#__PURE__*/_checkForMethod('groupBy', /*#__PURE__*/reduceBy(function (acc, item) {
  if (acc == null) {
    acc = [];
  }
  acc.push(item);
  return acc;
}, null)));
module.exports = groupBy;
},{"./internal/_checkForMethod":101,"./internal/_curry2":110,"./reduceBy":255}],79:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Takes a list and returns a list of lists where each sublist's elements are
 * all satisfied pairwise comparison according to the provided function.
 * Only adjacent elements are passed to the comparison function.
 *
 * @func
 * @memberOf R
 * @since v0.21.0
 * @category List
 * @sig ((a, a) → Boolean) → [a] → [[a]]
 * @param {Function} fn Function for determining whether two given (adjacent)
 *        elements should be in the same group
 * @param {Array} list The array to group. Also accepts a string, which will be
 *        treated as a list of characters.
 * @return {List} A list that contains sublists of elements,
 *         whose concatenations are equal to the original list.
 * @example
 *
 * R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a + 1 === b, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0, 1], [1, 2, 3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3, 5], [8], [13, 21]]
 *
 * R.groupWith(R.eqBy(isVowel), 'aestiou')
 * //=> ['ae', 'st', 'iou']
 */


var groupWith = /*#__PURE__*/_curry2(function (fn, list) {
  var res = [];
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    var nextidx = idx + 1;
    while (nextidx < len && fn(list[nextidx - 1], list[nextidx])) {
      nextidx += 1;
    }
    res.push(list.slice(idx, nextidx));
    idx = nextidx;
  }
  return res;
});
module.exports = groupWith;
},{"./internal/_curry2":110}],80:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if the first argument is greater than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.lt
 * @example
 *
 *      R.gt(2, 1); //=> true
 *      R.gt(2, 2); //=> false
 *      R.gt(2, 3); //=> false
 *      R.gt('a', 'z'); //=> false
 *      R.gt('z', 'a'); //=> true
 */


var gt = /*#__PURE__*/_curry2(function gt(a, b) {
  return a > b;
});
module.exports = gt;
},{"./internal/_curry2":110}],81:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if the first argument is greater than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.lte
 * @example
 *
 *      R.gte(2, 1); //=> true
 *      R.gte(2, 2); //=> true
 *      R.gte(2, 3); //=> false
 *      R.gte('a', 'z'); //=> false
 *      R.gte('z', 'a'); //=> true
 */


var gte = /*#__PURE__*/_curry2(function gte(a, b) {
  return a >= b;
});
module.exports = gte;
},{"./internal/_curry2":110}],82:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _has = /*#__PURE__*/require('./internal/_has');

/**
 * Returns whether or not an object has an own property with the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      var hasName = R.has('name');
 *      hasName({name: 'alice'});   //=> true
 *      hasName({name: 'bob'});     //=> true
 *      hasName({});                //=> false
 *
 *      var point = {x: 0, y: 0};
 *      var pointHas = R.has(R.__, point);
 *      pointHas('x');  //=> true
 *      pointHas('y');  //=> true
 *      pointHas('z');  //=> false
 */


var has = /*#__PURE__*/_curry2(_has);
module.exports = has;
},{"./internal/_curry2":110,"./internal/_has":121}],83:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns whether or not an object or its prototype chain has a property with
 * the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      function Rectangle(width, height) {
 *        this.width = width;
 *        this.height = height;
 *      }
 *      Rectangle.prototype.area = function() {
 *        return this.width * this.height;
 *      };
 *
 *      var square = new Rectangle(2, 2);
 *      R.hasIn('width', square);  //=> true
 *      R.hasIn('area', square);  //=> true
 */


var hasIn = /*#__PURE__*/_curry2(function hasIn(prop, obj) {
  return prop in obj;
});
module.exports = hasIn;
},{"./internal/_curry2":110}],84:[function(require,module,exports){
var nth = /*#__PURE__*/require('./nth');

/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {Array|String} list
 * @return {*}
 * @see R.tail, R.init, R.last
 * @example
 *
 *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
 *      R.head([]); //=> undefined
 *
 *      R.head('abc'); //=> 'a'
 *      R.head(''); //=> ''
 */


var head = /*#__PURE__*/nth(0);
module.exports = head;
},{"./nth":220}],85:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      var o = {};
 *      R.identical(o, o); //=> true
 *      R.identical(1, 1); //=> true
 *      R.identical(1, '1'); //=> false
 *      R.identical([], []); //=> false
 *      R.identical(0, -0); //=> false
 *      R.identical(NaN, NaN); //=> true
 */


var identical = /*#__PURE__*/_curry2(function identical(a, b) {
  // SameValue algorithm
  if (a === b) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return a !== 0 || 1 / a === 1 / b;
  } else {
    // Step 6.a: NaN == NaN
    return a !== a && b !== b;
  }
});
module.exports = identical;
},{"./internal/_curry2":110}],86:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _identity = /*#__PURE__*/require('./internal/_identity');

/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> a
 * @param {*} x The value to return.
 * @return {*} The input value, `x`.
 * @example
 *
 *      R.identity(1); //=> 1
 *
 *      var obj = {};
 *      R.identity(obj) === obj; //=> true
 * @symb R.identity(a) = a
 */


var identity = /*#__PURE__*/_curry1(_identity);
module.exports = identity;
},{"./internal/_curry1":109,"./internal/_identity":122}],87:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Creates a function that will process either the `onTrue` or the `onFalse`
 * function depending upon the result of the `condition` predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
 * @param {Function} condition A predicate function
 * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
 * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
 * @return {Function} A new unary function that will process either the `onTrue` or the `onFalse`
 *                    function depending upon the result of the `condition` predicate.
 * @see R.unless, R.when
 * @example
 *
 *      var incCount = R.ifElse(
 *        R.has('count'),
 *        R.over(R.lensProp('count'), R.inc),
 *        R.assoc('count', 1)
 *      );
 *      incCount({});           //=> { count: 1 }
 *      incCount({ count: 1 }); //=> { count: 2 }
 */


var ifElse = /*#__PURE__*/_curry3(function ifElse(condition, onTrue, onFalse) {
  return curryN(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
    return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
  });
});
module.exports = ifElse;
},{"./curryN":46,"./internal/_curry3":111}],88:[function(require,module,exports){
var add = /*#__PURE__*/require('./add');

/**
 * Increments its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n + 1
 * @see R.dec
 * @example
 *
 *      R.inc(42); //=> 43
 */


var inc = /*#__PURE__*/add(1);
module.exports = inc;
},{"./add":8}],89:[function(require,module,exports){
module.exports = {};
module.exports.F = /*#__PURE__*/require('./F');
module.exports.T = /*#__PURE__*/require('./T');
module.exports.__ = /*#__PURE__*/require('./__');
module.exports.add = /*#__PURE__*/require('./add');
module.exports.addIndex = /*#__PURE__*/require('./addIndex');
module.exports.adjust = /*#__PURE__*/require('./adjust');
module.exports.all = /*#__PURE__*/require('./all');
module.exports.allPass = /*#__PURE__*/require('./allPass');
module.exports.always = /*#__PURE__*/require('./always');
module.exports.and = /*#__PURE__*/require('./and');
module.exports.any = /*#__PURE__*/require('./any');
module.exports.anyPass = /*#__PURE__*/require('./anyPass');
module.exports.ap = /*#__PURE__*/require('./ap');
module.exports.aperture = /*#__PURE__*/require('./aperture');
module.exports.append = /*#__PURE__*/require('./append');
module.exports.apply = /*#__PURE__*/require('./apply');
module.exports.applySpec = /*#__PURE__*/require('./applySpec');
module.exports.applyTo = /*#__PURE__*/require('./applyTo');
module.exports.ascend = /*#__PURE__*/require('./ascend');
module.exports.assoc = /*#__PURE__*/require('./assoc');
module.exports.assocPath = /*#__PURE__*/require('./assocPath');
module.exports.binary = /*#__PURE__*/require('./binary');
module.exports.bind = /*#__PURE__*/require('./bind');
module.exports.both = /*#__PURE__*/require('./both');
module.exports.call = /*#__PURE__*/require('./call');
module.exports.chain = /*#__PURE__*/require('./chain');
module.exports.clamp = /*#__PURE__*/require('./clamp');
module.exports.clone = /*#__PURE__*/require('./clone');
module.exports.comparator = /*#__PURE__*/require('./comparator');
module.exports.complement = /*#__PURE__*/require('./complement');
module.exports.compose = /*#__PURE__*/require('./compose');
module.exports.composeK = /*#__PURE__*/require('./composeK');
module.exports.composeP = /*#__PURE__*/require('./composeP');
module.exports.concat = /*#__PURE__*/require('./concat');
module.exports.cond = /*#__PURE__*/require('./cond');
module.exports.construct = /*#__PURE__*/require('./construct');
module.exports.constructN = /*#__PURE__*/require('./constructN');
module.exports.contains = /*#__PURE__*/require('./contains');
module.exports.converge = /*#__PURE__*/require('./converge');
module.exports.countBy = /*#__PURE__*/require('./countBy');
module.exports.curry = /*#__PURE__*/require('./curry');
module.exports.curryN = /*#__PURE__*/require('./curryN');
module.exports.dec = /*#__PURE__*/require('./dec');
module.exports.defaultTo = /*#__PURE__*/require('./defaultTo');
module.exports.descend = /*#__PURE__*/require('./descend');
module.exports.difference = /*#__PURE__*/require('./difference');
module.exports.differenceWith = /*#__PURE__*/require('./differenceWith');
module.exports.dissoc = /*#__PURE__*/require('./dissoc');
module.exports.dissocPath = /*#__PURE__*/require('./dissocPath');
module.exports.divide = /*#__PURE__*/require('./divide');
module.exports.drop = /*#__PURE__*/require('./drop');
module.exports.dropLast = /*#__PURE__*/require('./dropLast');
module.exports.dropLastWhile = /*#__PURE__*/require('./dropLastWhile');
module.exports.dropRepeats = /*#__PURE__*/require('./dropRepeats');
module.exports.dropRepeatsWith = /*#__PURE__*/require('./dropRepeatsWith');
module.exports.dropWhile = /*#__PURE__*/require('./dropWhile');
module.exports.either = /*#__PURE__*/require('./either');
module.exports.empty = /*#__PURE__*/require('./empty');
module.exports.endsWith = /*#__PURE__*/require('./endsWith');
module.exports.eqBy = /*#__PURE__*/require('./eqBy');
module.exports.eqProps = /*#__PURE__*/require('./eqProps');
module.exports.equals = /*#__PURE__*/require('./equals');
module.exports.evolve = /*#__PURE__*/require('./evolve');
module.exports.filter = /*#__PURE__*/require('./filter');
module.exports.find = /*#__PURE__*/require('./find');
module.exports.findIndex = /*#__PURE__*/require('./findIndex');
module.exports.findLast = /*#__PURE__*/require('./findLast');
module.exports.findLastIndex = /*#__PURE__*/require('./findLastIndex');
module.exports.flatten = /*#__PURE__*/require('./flatten');
module.exports.flip = /*#__PURE__*/require('./flip');
module.exports.forEach = /*#__PURE__*/require('./forEach');
module.exports.forEachObjIndexed = /*#__PURE__*/require('./forEachObjIndexed');
module.exports.fromPairs = /*#__PURE__*/require('./fromPairs');
module.exports.groupBy = /*#__PURE__*/require('./groupBy');
module.exports.groupWith = /*#__PURE__*/require('./groupWith');
module.exports.gt = /*#__PURE__*/require('./gt');
module.exports.gte = /*#__PURE__*/require('./gte');
module.exports.has = /*#__PURE__*/require('./has');
module.exports.hasIn = /*#__PURE__*/require('./hasIn');
module.exports.head = /*#__PURE__*/require('./head');
module.exports.identical = /*#__PURE__*/require('./identical');
module.exports.identity = /*#__PURE__*/require('./identity');
module.exports.ifElse = /*#__PURE__*/require('./ifElse');
module.exports.inc = /*#__PURE__*/require('./inc');
module.exports.indexBy = /*#__PURE__*/require('./indexBy');
module.exports.indexOf = /*#__PURE__*/require('./indexOf');
module.exports.init = /*#__PURE__*/require('./init');
module.exports.innerJoin = /*#__PURE__*/require('./innerJoin');
module.exports.insert = /*#__PURE__*/require('./insert');
module.exports.insertAll = /*#__PURE__*/require('./insertAll');
module.exports.intersection = /*#__PURE__*/require('./intersection');
module.exports.intersperse = /*#__PURE__*/require('./intersperse');
module.exports.into = /*#__PURE__*/require('./into');
module.exports.invert = /*#__PURE__*/require('./invert');
module.exports.invertObj = /*#__PURE__*/require('./invertObj');
module.exports.invoker = /*#__PURE__*/require('./invoker');
module.exports.is = /*#__PURE__*/require('./is');
module.exports.isEmpty = /*#__PURE__*/require('./isEmpty');
module.exports.isNil = /*#__PURE__*/require('./isNil');
module.exports.join = /*#__PURE__*/require('./join');
module.exports.juxt = /*#__PURE__*/require('./juxt');
module.exports.keys = /*#__PURE__*/require('./keys');
module.exports.keysIn = /*#__PURE__*/require('./keysIn');
module.exports.last = /*#__PURE__*/require('./last');
module.exports.lastIndexOf = /*#__PURE__*/require('./lastIndexOf');
module.exports.length = /*#__PURE__*/require('./length');
module.exports.lens = /*#__PURE__*/require('./lens');
module.exports.lensIndex = /*#__PURE__*/require('./lensIndex');
module.exports.lensPath = /*#__PURE__*/require('./lensPath');
module.exports.lensProp = /*#__PURE__*/require('./lensProp');
module.exports.lift = /*#__PURE__*/require('./lift');
module.exports.liftN = /*#__PURE__*/require('./liftN');
module.exports.lt = /*#__PURE__*/require('./lt');
module.exports.lte = /*#__PURE__*/require('./lte');
module.exports.map = /*#__PURE__*/require('./map');
module.exports.mapAccum = /*#__PURE__*/require('./mapAccum');
module.exports.mapAccumRight = /*#__PURE__*/require('./mapAccumRight');
module.exports.mapObjIndexed = /*#__PURE__*/require('./mapObjIndexed');
module.exports.match = /*#__PURE__*/require('./match');
module.exports.mathMod = /*#__PURE__*/require('./mathMod');
module.exports.max = /*#__PURE__*/require('./max');
module.exports.maxBy = /*#__PURE__*/require('./maxBy');
module.exports.mean = /*#__PURE__*/require('./mean');
module.exports.median = /*#__PURE__*/require('./median');
module.exports.memoize = /*#__PURE__*/require('./memoize');
module.exports.memoizeWith = /*#__PURE__*/require('./memoizeWith');
module.exports.merge = /*#__PURE__*/require('./merge');
module.exports.mergeAll = /*#__PURE__*/require('./mergeAll');
module.exports.mergeDeepLeft = /*#__PURE__*/require('./mergeDeepLeft');
module.exports.mergeDeepRight = /*#__PURE__*/require('./mergeDeepRight');
module.exports.mergeDeepWith = /*#__PURE__*/require('./mergeDeepWith');
module.exports.mergeDeepWithKey = /*#__PURE__*/require('./mergeDeepWithKey');
module.exports.mergeWith = /*#__PURE__*/require('./mergeWith');
module.exports.mergeWithKey = /*#__PURE__*/require('./mergeWithKey');
module.exports.min = /*#__PURE__*/require('./min');
module.exports.minBy = /*#__PURE__*/require('./minBy');
module.exports.modulo = /*#__PURE__*/require('./modulo');
module.exports.multiply = /*#__PURE__*/require('./multiply');
module.exports.nAry = /*#__PURE__*/require('./nAry');
module.exports.negate = /*#__PURE__*/require('./negate');
module.exports.none = /*#__PURE__*/require('./none');
module.exports.not = /*#__PURE__*/require('./not');
module.exports.nth = /*#__PURE__*/require('./nth');
module.exports.nthArg = /*#__PURE__*/require('./nthArg');
module.exports.o = /*#__PURE__*/require('./o');
module.exports.objOf = /*#__PURE__*/require('./objOf');
module.exports.of = /*#__PURE__*/require('./of');
module.exports.omit = /*#__PURE__*/require('./omit');
module.exports.once = /*#__PURE__*/require('./once');
module.exports.or = /*#__PURE__*/require('./or');
module.exports.over = /*#__PURE__*/require('./over');
module.exports.pair = /*#__PURE__*/require('./pair');
module.exports.partial = /*#__PURE__*/require('./partial');
module.exports.partialRight = /*#__PURE__*/require('./partialRight');
module.exports.partition = /*#__PURE__*/require('./partition');
module.exports.path = /*#__PURE__*/require('./path');
module.exports.pathEq = /*#__PURE__*/require('./pathEq');
module.exports.pathOr = /*#__PURE__*/require('./pathOr');
module.exports.pathSatisfies = /*#__PURE__*/require('./pathSatisfies');
module.exports.pick = /*#__PURE__*/require('./pick');
module.exports.pickAll = /*#__PURE__*/require('./pickAll');
module.exports.pickBy = /*#__PURE__*/require('./pickBy');
module.exports.pipe = /*#__PURE__*/require('./pipe');
module.exports.pipeK = /*#__PURE__*/require('./pipeK');
module.exports.pipeP = /*#__PURE__*/require('./pipeP');
module.exports.pluck = /*#__PURE__*/require('./pluck');
module.exports.prepend = /*#__PURE__*/require('./prepend');
module.exports.product = /*#__PURE__*/require('./product');
module.exports.project = /*#__PURE__*/require('./project');
module.exports.prop = /*#__PURE__*/require('./prop');
module.exports.propEq = /*#__PURE__*/require('./propEq');
module.exports.propIs = /*#__PURE__*/require('./propIs');
module.exports.propOr = /*#__PURE__*/require('./propOr');
module.exports.propSatisfies = /*#__PURE__*/require('./propSatisfies');
module.exports.props = /*#__PURE__*/require('./props');
module.exports.range = /*#__PURE__*/require('./range');
module.exports.reduce = /*#__PURE__*/require('./reduce');
module.exports.reduceBy = /*#__PURE__*/require('./reduceBy');
module.exports.reduceRight = /*#__PURE__*/require('./reduceRight');
module.exports.reduceWhile = /*#__PURE__*/require('./reduceWhile');
module.exports.reduced = /*#__PURE__*/require('./reduced');
module.exports.reject = /*#__PURE__*/require('./reject');
module.exports.remove = /*#__PURE__*/require('./remove');
module.exports.repeat = /*#__PURE__*/require('./repeat');
module.exports.replace = /*#__PURE__*/require('./replace');
module.exports.reverse = /*#__PURE__*/require('./reverse');
module.exports.scan = /*#__PURE__*/require('./scan');
module.exports.sequence = /*#__PURE__*/require('./sequence');
module.exports.set = /*#__PURE__*/require('./set');
module.exports.slice = /*#__PURE__*/require('./slice');
module.exports.sort = /*#__PURE__*/require('./sort');
module.exports.sortBy = /*#__PURE__*/require('./sortBy');
module.exports.sortWith = /*#__PURE__*/require('./sortWith');
module.exports.split = /*#__PURE__*/require('./split');
module.exports.splitAt = /*#__PURE__*/require('./splitAt');
module.exports.splitEvery = /*#__PURE__*/require('./splitEvery');
module.exports.splitWhen = /*#__PURE__*/require('./splitWhen');
module.exports.startsWith = /*#__PURE__*/require('./startsWith');
module.exports.subtract = /*#__PURE__*/require('./subtract');
module.exports.sum = /*#__PURE__*/require('./sum');
module.exports.symmetricDifference = /*#__PURE__*/require('./symmetricDifference');
module.exports.symmetricDifferenceWith = /*#__PURE__*/require('./symmetricDifferenceWith');
module.exports.tail = /*#__PURE__*/require('./tail');
module.exports.take = /*#__PURE__*/require('./take');
module.exports.takeLast = /*#__PURE__*/require('./takeLast');
module.exports.takeLastWhile = /*#__PURE__*/require('./takeLastWhile');
module.exports.takeWhile = /*#__PURE__*/require('./takeWhile');
module.exports.tap = /*#__PURE__*/require('./tap');
module.exports.test = /*#__PURE__*/require('./test');
module.exports.times = /*#__PURE__*/require('./times');
module.exports.toLower = /*#__PURE__*/require('./toLower');
module.exports.toPairs = /*#__PURE__*/require('./toPairs');
module.exports.toPairsIn = /*#__PURE__*/require('./toPairsIn');
module.exports.toString = /*#__PURE__*/require('./toString');
module.exports.toUpper = /*#__PURE__*/require('./toUpper');
module.exports.transduce = /*#__PURE__*/require('./transduce');
module.exports.transpose = /*#__PURE__*/require('./transpose');
module.exports.traverse = /*#__PURE__*/require('./traverse');
module.exports.trim = /*#__PURE__*/require('./trim');
module.exports.tryCatch = /*#__PURE__*/require('./tryCatch');
module.exports.type = /*#__PURE__*/require('./type');
module.exports.unapply = /*#__PURE__*/require('./unapply');
module.exports.unary = /*#__PURE__*/require('./unary');
module.exports.uncurryN = /*#__PURE__*/require('./uncurryN');
module.exports.unfold = /*#__PURE__*/require('./unfold');
module.exports.union = /*#__PURE__*/require('./union');
module.exports.unionWith = /*#__PURE__*/require('./unionWith');
module.exports.uniq = /*#__PURE__*/require('./uniq');
module.exports.uniqBy = /*#__PURE__*/require('./uniqBy');
module.exports.uniqWith = /*#__PURE__*/require('./uniqWith');
module.exports.unless = /*#__PURE__*/require('./unless');
module.exports.unnest = /*#__PURE__*/require('./unnest');
module.exports.until = /*#__PURE__*/require('./until');
module.exports.update = /*#__PURE__*/require('./update');
module.exports.useWith = /*#__PURE__*/require('./useWith');
module.exports.values = /*#__PURE__*/require('./values');
module.exports.valuesIn = /*#__PURE__*/require('./valuesIn');
module.exports.view = /*#__PURE__*/require('./view');
module.exports.when = /*#__PURE__*/require('./when');
module.exports.where = /*#__PURE__*/require('./where');
module.exports.whereEq = /*#__PURE__*/require('./whereEq');
module.exports.without = /*#__PURE__*/require('./without');
module.exports.xprod = /*#__PURE__*/require('./xprod');
module.exports.zip = /*#__PURE__*/require('./zip');
module.exports.zipObj = /*#__PURE__*/require('./zipObj');
module.exports.zipWith = /*#__PURE__*/require('./zipWith');
},{"./F":5,"./T":6,"./__":7,"./add":8,"./addIndex":9,"./adjust":10,"./all":11,"./allPass":12,"./always":13,"./and":14,"./any":15,"./anyPass":16,"./ap":17,"./aperture":18,"./append":19,"./apply":20,"./applySpec":21,"./applyTo":22,"./ascend":23,"./assoc":24,"./assocPath":25,"./binary":26,"./bind":27,"./both":28,"./call":29,"./chain":30,"./clamp":31,"./clone":32,"./comparator":33,"./complement":34,"./compose":35,"./composeK":36,"./composeP":37,"./concat":38,"./cond":39,"./construct":40,"./constructN":41,"./contains":42,"./converge":43,"./countBy":44,"./curry":45,"./curryN":46,"./dec":47,"./defaultTo":48,"./descend":49,"./difference":50,"./differenceWith":51,"./dissoc":52,"./dissocPath":53,"./divide":54,"./drop":55,"./dropLast":56,"./dropLastWhile":57,"./dropRepeats":58,"./dropRepeatsWith":59,"./dropWhile":60,"./either":61,"./empty":62,"./endsWith":63,"./eqBy":64,"./eqProps":65,"./equals":66,"./evolve":67,"./filter":68,"./find":69,"./findIndex":70,"./findLast":71,"./findLastIndex":72,"./flatten":73,"./flip":74,"./forEach":75,"./forEachObjIndexed":76,"./fromPairs":77,"./groupBy":78,"./groupWith":79,"./gt":80,"./gte":81,"./has":82,"./hasIn":83,"./head":84,"./identical":85,"./identity":86,"./ifElse":87,"./inc":88,"./indexBy":90,"./indexOf":91,"./init":92,"./innerJoin":93,"./insert":94,"./insertAll":95,"./intersection":168,"./intersperse":169,"./into":170,"./invert":171,"./invertObj":172,"./invoker":173,"./is":174,"./isEmpty":175,"./isNil":176,"./join":177,"./juxt":178,"./keys":179,"./keysIn":180,"./last":181,"./lastIndexOf":182,"./length":183,"./lens":184,"./lensIndex":185,"./lensPath":186,"./lensProp":187,"./lift":188,"./liftN":189,"./lt":190,"./lte":191,"./map":192,"./mapAccum":193,"./mapAccumRight":194,"./mapObjIndexed":195,"./match":196,"./mathMod":197,"./max":198,"./maxBy":199,"./mean":200,"./median":201,"./memoize":202,"./memoizeWith":203,"./merge":204,"./mergeAll":205,"./mergeDeepLeft":206,"./mergeDeepRight":207,"./mergeDeepWith":208,"./mergeDeepWithKey":209,"./mergeWith":210,"./mergeWithKey":211,"./min":212,"./minBy":213,"./modulo":214,"./multiply":215,"./nAry":216,"./negate":217,"./none":218,"./not":219,"./nth":220,"./nthArg":221,"./o":222,"./objOf":223,"./of":224,"./omit":225,"./once":226,"./or":227,"./over":228,"./pair":229,"./partial":230,"./partialRight":231,"./partition":232,"./path":233,"./pathEq":234,"./pathOr":235,"./pathSatisfies":236,"./pick":237,"./pickAll":238,"./pickBy":239,"./pipe":240,"./pipeK":241,"./pipeP":242,"./pluck":243,"./prepend":244,"./product":245,"./project":246,"./prop":247,"./propEq":248,"./propIs":249,"./propOr":250,"./propSatisfies":251,"./props":252,"./range":253,"./reduce":254,"./reduceBy":255,"./reduceRight":256,"./reduceWhile":257,"./reduced":258,"./reject":259,"./remove":260,"./repeat":261,"./replace":262,"./reverse":263,"./scan":264,"./sequence":265,"./set":266,"./slice":267,"./sort":268,"./sortBy":269,"./sortWith":270,"./split":271,"./splitAt":272,"./splitEvery":273,"./splitWhen":274,"./startsWith":275,"./subtract":276,"./sum":277,"./symmetricDifference":278,"./symmetricDifferenceWith":279,"./tail":280,"./take":281,"./takeLast":282,"./takeLastWhile":283,"./takeWhile":284,"./tap":285,"./test":286,"./times":287,"./toLower":288,"./toPairs":289,"./toPairsIn":290,"./toString":291,"./toUpper":292,"./transduce":293,"./transpose":294,"./traverse":295,"./trim":296,"./tryCatch":297,"./type":298,"./unapply":299,"./unary":300,"./uncurryN":301,"./unfold":302,"./union":303,"./unionWith":304,"./uniq":305,"./uniqBy":306,"./uniqWith":307,"./unless":308,"./unnest":309,"./until":310,"./update":311,"./useWith":312,"./values":313,"./valuesIn":314,"./view":315,"./when":316,"./where":317,"./whereEq":318,"./without":319,"./xprod":320,"./zip":321,"./zipObj":322,"./zipWith":323}],90:[function(require,module,exports){
var reduceBy = /*#__PURE__*/require('./reduceBy');

/**
 * Given a function that generates a key, turns a list of objects into an
 * object indexing the objects by the given key. Note that if multiple
 * objects generate the same value for the indexing key only the last value
 * will be included in the generated object.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> String) -> [{k: v}] -> {k: {k: v}}
 * @param {Function} fn Function :: a -> String
 * @param {Array} array The array of objects to index
 * @return {Object} An object indexing each array element by the given property.
 * @example
 *
 *      var list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
 *      R.indexBy(R.prop('id'), list);
 *      //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}
 */


var indexBy = /*#__PURE__*/reduceBy(function (acc, elem) {
  return elem;
}, null);
module.exports = indexBy;
},{"./reduceBy":255}],91:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _indexOf = /*#__PURE__*/require('./internal/_indexOf');

var _isArray = /*#__PURE__*/require('./internal/_isArray');

/**
 * Returns the position of the first occurrence of an item in an array, or -1
 * if the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.lastIndexOf
 * @example
 *
 *      R.indexOf(3, [1,2,3,4]); //=> 2
 *      R.indexOf(10, [1,2,3,4]); //=> -1
 */


var indexOf = /*#__PURE__*/_curry2(function indexOf(target, xs) {
  return typeof xs.indexOf === 'function' && !_isArray(xs) ? xs.indexOf(target) : _indexOf(xs, target, 0);
});
module.exports = indexOf;
},{"./internal/_curry2":110,"./internal/_indexOf":123,"./internal/_isArray":125}],92:[function(require,module,exports){
var slice = /*#__PURE__*/require('./slice');

/**
 * Returns all but the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.last, R.head, R.tail
 * @example
 *
 *      R.init([1, 2, 3]);  //=> [1, 2]
 *      R.init([1, 2]);     //=> [1]
 *      R.init([1]);        //=> []
 *      R.init([]);         //=> []
 *
 *      R.init('abc');  //=> 'ab'
 *      R.init('ab');   //=> 'a'
 *      R.init('a');    //=> ''
 *      R.init('');     //=> ''
 */


var init = /*#__PURE__*/slice(0, -1);
module.exports = init;
},{"./slice":267}],93:[function(require,module,exports){
var _containsWith = /*#__PURE__*/require('./internal/_containsWith');

var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _filter = /*#__PURE__*/require('./internal/_filter');

/**
 * Takes a predicate `pred`, a list `xs`, and a list `ys`, and returns a list
 * `xs'` comprising each of the elements of `xs` which is equal to one or more
 * elements of `ys` according to `pred`.
 *
 * `pred` must be a binary function expecting an element from each list.
 *
 * `xs`, `ys`, and `xs'` are treated as sets, semantically, so ordering should
 * not be significant, but since `xs'` is ordered the implementation guarantees
 * that its values are in the same order as they appear in `xs`. Duplicates are
 * not removed, so `xs'` may contain duplicates if `xs` contains duplicates.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Relation
 * @sig ((a, b) -> Boolean) -> [a] -> [b] -> [a]
 * @param {Function} pred
 * @param {Array} xs
 * @param {Array} ys
 * @return {Array}
 * @see R.intersection
 * @example
 *
 *      R.innerJoin(
 *        (record, id) => record.id === id,
 *        [{id: 824, name: 'Richie Furay'},
 *         {id: 956, name: 'Dewey Martin'},
 *         {id: 313, name: 'Bruce Palmer'},
 *         {id: 456, name: 'Stephen Stills'},
 *         {id: 177, name: 'Neil Young'}],
 *        [177, 456, 999]
 *      );
 *      //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
 */


var innerJoin = /*#__PURE__*/_curry3(function innerJoin(pred, xs, ys) {
  return _filter(function (x) {
    return _containsWith(pred, x, ys);
  }, xs);
});
module.exports = innerJoin;
},{"./internal/_containsWith":107,"./internal/_curry3":111,"./internal/_filter":117}],94:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Inserts the supplied element into the list, at the specified `index`. _Note that

 * this is not destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} index The position to insert the element
 * @param {*} elt The element to insert into the Array
 * @param {Array} list The list to insert into
 * @return {Array} A new Array with `elt` inserted at `index`.
 * @example
 *
 *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
 */


var insert = /*#__PURE__*/_curry3(function insert(idx, elt, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  var result = Array.prototype.slice.call(list, 0);
  result.splice(idx, 0, elt);
  return result;
});
module.exports = insert;
},{"./internal/_curry3":111}],95:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Inserts the sub-list into the list, at the specified `index`. _Note that this is not
 * destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig Number -> [a] -> [a] -> [a]
 * @param {Number} index The position to insert the sub-list
 * @param {Array} elts The sub-list to insert into the Array
 * @param {Array} list The list to insert the sub-list into
 * @return {Array} A new Array with `elts` inserted starting at `index`.
 * @example
 *
 *      R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
 */


var insertAll = /*#__PURE__*/_curry3(function insertAll(idx, elts, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  return [].concat(Array.prototype.slice.call(list, 0, idx), elts, Array.prototype.slice.call(list, idx));
});
module.exports = insertAll;
},{"./internal/_curry3":111}],96:[function(require,module,exports){
var _contains = /*#__PURE__*/require('./_contains');

var _Set = /*#__PURE__*/function () {

  function _Set() {
    /* globals Set */
    this._nativeSet = typeof Set === 'function' ? new Set() : null;
    this._items = {};
  }

  // until we figure out why jsdoc chokes on this
  // @param item The item to add to the Set
  // @returns {boolean} true if the item did not exist prior, otherwise false
  //
  _Set.prototype.add = function (item) {
    return !hasOrAdd(item, true, this);
  };

  //
  // @param item The item to check for existence in the Set
  // @returns {boolean} true if the item exists in the Set, otherwise false
  //
  _Set.prototype.has = function (item) {
    return hasOrAdd(item, false, this);
  };

  //
  // Combines the logic for checking whether an item is a member of the set and
  // for adding a new item to the set.
  //
  // @param item       The item to check or add to the Set instance.
  // @param shouldAdd  If true, the item will be added to the set if it doesn't
  //                   already exist.
  // @param set        The set instance to check or add to.
  // @return {boolean} true if the item already existed, otherwise false.
  //
  return _Set;
}();

function hasOrAdd(item, shouldAdd, set) {
  var type = typeof item;
  var prevSize, newSize;
  switch (type) {
    case 'string':
    case 'number':
      // distinguish between +0 and -0
      if (item === 0 && 1 / item === -Infinity) {
        if (set._items['-0']) {
          return true;
        } else {
          if (shouldAdd) {
            set._items['-0'] = true;
          }
          return false;
        }
      }
      // these types can all utilise the native Set
      if (set._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set._nativeSet.size;
          set._nativeSet.add(item);
          newSize = set._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set._nativeSet.has(item);
        }
      } else {
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = {};
            set._items[type][item] = true;
          }
          return false;
        } else if (item in set._items[type]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type][item] = true;
          }
          return false;
        }
      }

    case 'boolean':
      // set._items['boolean'] holds a two element array
      // representing [ falseExists, trueExists ]
      if (type in set._items) {
        var bIdx = item ? 1 : 0;
        if (set._items[type][bIdx]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type][bIdx] = true;
          }
          return false;
        }
      } else {
        if (shouldAdd) {
          set._items[type] = item ? [false, true] : [true, false];
        }
        return false;
      }

    case 'function':
      // compare functions for reference equality
      if (set._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set._nativeSet.size;
          set._nativeSet.add(item);
          newSize = set._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set._nativeSet.has(item);
        }
      } else {
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = [item];
          }
          return false;
        }
        if (!_contains(item, set._items[type])) {
          if (shouldAdd) {
            set._items[type].push(item);
          }
          return false;
        }
        return true;
      }

    case 'undefined':
      if (set._items[type]) {
        return true;
      } else {
        if (shouldAdd) {
          set._items[type] = true;
        }
        return false;
      }

    case 'object':
      if (item === null) {
        if (!set._items['null']) {
          if (shouldAdd) {
            set._items['null'] = true;
          }
          return false;
        }
        return true;
      }
    /* falls through */
    default:
      // reduce the search size of heterogeneous sets by creating buckets
      // for each type.
      type = Object.prototype.toString.call(item);
      if (!(type in set._items)) {
        if (shouldAdd) {
          set._items[type] = [item];
        }
        return false;
      }
      // scan through all previously applied items
      if (!_contains(item, set._items[type])) {
        if (shouldAdd) {
          set._items[type].push(item);
        }
        return false;
      }
      return true;
  }
}

// A simple Set type that honours R.equals semantics
module.exports = _Set;
},{"./_contains":106}],97:[function(require,module,exports){
function _aperture(n, list) {
  var idx = 0;
  var limit = list.length - (n - 1);
  var acc = new Array(limit >= 0 ? limit : 0);
  while (idx < limit) {
    acc[idx] = Array.prototype.slice.call(list, idx, idx + n);
    idx += 1;
  }
  return acc;
}
module.exports = _aperture;
},{}],98:[function(require,module,exports){
function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };
    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };
    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };
    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };
    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };
    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };
    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };
    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };
    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };
    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };
    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };
    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}
module.exports = _arity;
},{}],99:[function(require,module,exports){
function _arrayFromIterator(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
}
module.exports = _arrayFromIterator;
},{}],100:[function(require,module,exports){
var _objectAssign = /*#__PURE__*/require('./_objectAssign');

module.exports = typeof Object.assign === 'function' ? Object.assign : _objectAssign;
},{"./_objectAssign":137}],101:[function(require,module,exports){
var _isArray = /*#__PURE__*/require('./_isArray');

/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */


function _checkForMethod(methodname, fn) {
  return function () {
    var length = arguments.length;
    if (length === 0) {
      return fn();
    }
    var obj = arguments[length - 1];
    return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
}
module.exports = _checkForMethod;
},{"./_isArray":125}],102:[function(require,module,exports){
var _cloneRegExp = /*#__PURE__*/require('./_cloneRegExp');

var type = /*#__PURE__*/require('../type');

/**
 * Copies an object.
 *
 * @private
 * @param {*} value The value to be copied
 * @param {Array} refFrom Array containing the source references
 * @param {Array} refTo Array containing the copied source references
 * @param {Boolean} deep Whether or not to perform deep cloning.
 * @return {*} The copied value.
 */


function _clone(value, refFrom, refTo, deep) {
  var copy = function copy(copiedValue) {
    var len = refFrom.length;
    var idx = 0;
    while (idx < len) {
      if (value === refFrom[idx]) {
        return refTo[idx];
      }
      idx += 1;
    }
    refFrom[idx + 1] = value;
    refTo[idx + 1] = copiedValue;
    for (var key in value) {
      copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key];
    }
    return copiedValue;
  };
  switch (type(value)) {
    case 'Object':
      return copy({});
    case 'Array':
      return copy([]);
    case 'Date':
      return new Date(value.valueOf());
    case 'RegExp':
      return _cloneRegExp(value);
    default:
      return value;
  }
}
module.exports = _clone;
},{"../type":298,"./_cloneRegExp":103}],103:[function(require,module,exports){
function _cloneRegExp(pattern) {
                                  return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
}
module.exports = _cloneRegExp;
},{}],104:[function(require,module,exports){
function _complement(f) {
  return function () {
    return !f.apply(this, arguments);
  };
}
module.exports = _complement;
},{}],105:[function(require,module,exports){
/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result = [];

  idx = 0;
  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }
  idx = 0;
  while (idx < len2) {
    result[result.length] = set2[idx];
    idx += 1;
  }
  return result;
}
module.exports = _concat;
},{}],106:[function(require,module,exports){
var _indexOf = /*#__PURE__*/require('./_indexOf');

function _contains(a, list) {
  return _indexOf(list, a, 0) >= 0;
}
module.exports = _contains;
},{"./_indexOf":123}],107:[function(require,module,exports){
function _containsWith(pred, x, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}
module.exports = _containsWith;
},{}],108:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./_arity');

var _curry2 = /*#__PURE__*/require('./_curry2');

function _createPartialApplicator(concat) {
  return _curry2(function (fn, args) {
    return _arity(Math.max(0, fn.length - args.length), function () {
      return fn.apply(this, concat(args, arguments));
    });
  });
}
module.exports = _createPartialApplicator;
},{"./_arity":98,"./_curry2":110}],109:[function(require,module,exports){
var _isPlaceholder = /*#__PURE__*/require('./_isPlaceholder');

/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}
module.exports = _curry1;
},{"./_isPlaceholder":131}],110:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./_curry1');

var _isPlaceholder = /*#__PURE__*/require('./_isPlaceholder');

/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
          return fn(a, _b);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}
module.exports = _curry2;
},{"./_curry1":109,"./_isPlaceholder":131}],111:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./_curry1');

var _curry2 = /*#__PURE__*/require('./_curry2');

var _isPlaceholder = /*#__PURE__*/require('./_isPlaceholder');

/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        });
      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _curry1(function (_c) {
          return fn(a, b, _c);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
          return fn(_a, _b, c);
        }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b, c);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b, c);
        }) : _isPlaceholder(c) ? _curry1(function (_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}
module.exports = _curry3;
},{"./_curry1":109,"./_curry2":110,"./_isPlaceholder":131}],112:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./_arity');

var _isPlaceholder = /*#__PURE__*/require('./_isPlaceholder');

/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curryN(length, received, fn) {
  return function () {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
  };
}
module.exports = _curryN;
},{"./_arity":98,"./_isPlaceholder":131}],113:[function(require,module,exports){
var _isArray = /*#__PURE__*/require('./_isArray');

var _isTransformer = /*#__PURE__*/require('./_isTransformer');

/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer [xf] to return a new transformer (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */


function _dispatchable(methodNames, xf, fn) {
  return function () {
    if (arguments.length === 0) {
      return fn();
    }
    var args = Array.prototype.slice.call(arguments, 0);
    var obj = args.pop();
    if (!_isArray(obj)) {
      var idx = 0;
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, args);
        }
        idx += 1;
      }
      if (_isTransformer(obj)) {
        var transducer = xf.apply(null, args);
        return transducer(obj);
      }
    }
    return fn.apply(this, arguments);
  };
}
module.exports = _dispatchable;
},{"./_isArray":125,"./_isTransformer":134}],114:[function(require,module,exports){
var take = /*#__PURE__*/require('../take');

function dropLast(n, xs) {
  return take(n < xs.length ? xs.length - n : 0, xs);
}
module.exports = dropLast;
},{"../take":281}],115:[function(require,module,exports){
var slice = /*#__PURE__*/require('../slice');

function dropLastWhile(pred, xs) {
  var idx = xs.length - 1;
  while (idx >= 0 && pred(xs[idx])) {
    idx -= 1;
  }
  return slice(0, idx + 1, xs);
}
module.exports = dropLastWhile;
},{"../slice":267}],116:[function(require,module,exports){
var _arrayFromIterator = /*#__PURE__*/require('./_arrayFromIterator');

var _containsWith = /*#__PURE__*/require('./_containsWith');

var _functionName = /*#__PURE__*/require('./_functionName');

var _has = /*#__PURE__*/require('./_has');

var identical = /*#__PURE__*/require('../identical');

var keys = /*#__PURE__*/require('../keys');

var type = /*#__PURE__*/require('../type');

/**
 * private _uniqContentEquals function.
 * That function is checking equality of 2 iterator contents with 2 assumptions
 * - iterators lengths are the same
 * - iterators values are unique
 *
 * false-positive result will be returned for comparision of, e.g.
 * - [1,2,3] and [1,2,3,4]
 * - [1,1,1] and [1,2,3]
 * */

function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = _arrayFromIterator(aIterator);
  var b = _arrayFromIterator(bIterator);

  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  }

  // if *a* array contains any element that is not included in *b*
  return !_containsWith(function (b, aItem) {
    return !_containsWith(eq, aItem, b);
  }, b, a);
}

function _equals(a, b, stackA, stackB) {
  if (identical(a, b)) {
    return true;
  }

  var typeA = type(a);

  if (typeA !== type(b)) {
    return false;
  }

  if (a == null || b == null) {
    return false;
  }

  if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
    return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) && typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
  }

  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
  }

  switch (typeA) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (typeof a.constructor === 'function' && _functionName(a.constructor) === 'Promise') {
        return a === b;
      }
      break;
    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case 'Date':
      if (!identical(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case 'Error':
      return a.name === b.name && a.message === b.message;
    case 'RegExp':
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }
      break;
  }

  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }

  switch (typeA) {
    case 'Map':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
    case 'Set':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
    case 'Arguments':
    case 'Array':
    case 'Object':
    case 'Boolean':
    case 'Number':
    case 'String':
    case 'Date':
    case 'Error':
    case 'RegExp':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'ArrayBuffer':
      break;
    default:
      // Values of other types are only equal if identical.
      return false;
  }

  var keysA = keys(a);
  if (keysA.length !== keys(b).length) {
    return false;
  }

  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);

  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }
    idx -= 1;
  }
  return true;
}
module.exports = _equals;
},{"../identical":85,"../keys":179,"../type":298,"./_arrayFromIterator":99,"./_containsWith":107,"./_functionName":120,"./_has":121}],117:[function(require,module,exports){
function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];

  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
}
module.exports = _filter;
},{}],118:[function(require,module,exports){
var _forceReduced = /*#__PURE__*/require('./_forceReduced');

var _isArrayLike = /*#__PURE__*/require('./_isArrayLike');

var _reduce = /*#__PURE__*/require('./_reduce');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var preservingReduced = function (xf) {
  return {
    '@@transducer/init': _xfBase.init,
    '@@transducer/result': function (result) {
      return xf['@@transducer/result'](result);
    },
    '@@transducer/step': function (result, input) {
      var ret = xf['@@transducer/step'](result, input);
      return ret['@@transducer/reduced'] ? _forceReduced(ret) : ret;
    }
  };
};

var _flatCat = function _xcat(xf) {
  var rxf = preservingReduced(xf);
  return {
    '@@transducer/init': _xfBase.init,
    '@@transducer/result': function (result) {
      return rxf['@@transducer/result'](result);
    },
    '@@transducer/step': function (result, input) {
      return !_isArrayLike(input) ? _reduce(rxf, result, [input]) : _reduce(rxf, result, input);
    }
  };
};

module.exports = _flatCat;
},{"./_forceReduced":119,"./_isArrayLike":126,"./_reduce":142,"./_xfBase":156}],119:[function(require,module,exports){
function _forceReduced(x) {
  return {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}
module.exports = _forceReduced;
},{}],120:[function(require,module,exports){
function _functionName(f) {
  // String(x => x) evaluates to "x => x", so the pattern may not match.
  var match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
}
module.exports = _functionName;
},{}],121:[function(require,module,exports){
function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
module.exports = _has;
},{}],122:[function(require,module,exports){
function _identity(x) {
  return x;
}
module.exports = _identity;
},{}],123:[function(require,module,exports){
var equals = /*#__PURE__*/require('../equals');

function _indexOf(list, a, idx) {
  var inf, item;
  // Array.prototype.indexOf doesn't exist below IE9
  if (typeof list.indexOf === 'function') {
    switch (typeof a) {
      case 'number':
        if (a === 0) {
          // manually crawl the list to distinguish between +0 and -0
          inf = 1 / a;
          while (idx < list.length) {
            item = list[idx];
            if (item === 0 && 1 / item === inf) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        } else if (a !== a) {
          // NaN
          while (idx < list.length) {
            item = list[idx];
            if (typeof item === 'number' && item !== item) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        }
        // non-zero numbers can utilise Set
        return list.indexOf(a, idx);

      // all these types can utilise Set
      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        return list.indexOf(a, idx);

      case 'object':
        if (a === null) {
          // null can utilise Set
          return list.indexOf(a, idx);
        }
    }
  }
  // anything else not covered above, defer to R.equals
  while (idx < list.length) {
    if (equals(list[idx], a)) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}
module.exports = _indexOf;
},{"../equals":66}],124:[function(require,module,exports){
var _has = /*#__PURE__*/require('./_has');

var toString = Object.prototype.toString;
var _isArguments = function () {
  return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
    return toString.call(x) === '[object Arguments]';
  } : function _isArguments(x) {
    return _has('callee', x);
  };
};

module.exports = _isArguments;
},{"./_has":121}],125:[function(require,module,exports){
/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
module.exports = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
};
},{}],126:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./_curry1');

var _isArray = /*#__PURE__*/require('./_isArray');

var _isString = /*#__PURE__*/require('./_isString');

/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */


var _isArrayLike = /*#__PURE__*/_curry1(function isArrayLike(x) {
  if (_isArray(x)) {
    return true;
  }
  if (!x) {
    return false;
  }
  if (typeof x !== 'object') {
    return false;
  }
  if (_isString(x)) {
    return false;
  }
  if (x.nodeType === 1) {
    return !!x.length;
  }
  if (x.length === 0) {
    return true;
  }
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
});
module.exports = _isArrayLike;
},{"./_curry1":109,"./_isArray":125,"./_isString":133}],127:[function(require,module,exports){
function _isFunction(x) {
  return Object.prototype.toString.call(x) === '[object Function]';
}
module.exports = _isFunction;
},{}],128:[function(require,module,exports){
/**
 * Determine if the passed argument is an integer.
 *
 * @private
 * @param {*} n
 * @category Type
 * @return {Boolean}
 */
module.exports = Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
};
},{}],129:[function(require,module,exports){
function _isNumber(x) {
  return Object.prototype.toString.call(x) === '[object Number]';
}
module.exports = _isNumber;
},{}],130:[function(require,module,exports){
function _isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}
module.exports = _isObject;
},{}],131:[function(require,module,exports){
function _isPlaceholder(a) {
       return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}
module.exports = _isPlaceholder;
},{}],132:[function(require,module,exports){
function _isRegExp(x) {
  return Object.prototype.toString.call(x) === '[object RegExp]';
}
module.exports = _isRegExp;
},{}],133:[function(require,module,exports){
function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}
module.exports = _isString;
},{}],134:[function(require,module,exports){
function _isTransformer(obj) {
  return typeof obj['@@transducer/step'] === 'function';
}
module.exports = _isTransformer;
},{}],135:[function(require,module,exports){
var _isArrayLike = /*#__PURE__*/require('./_isArrayLike');

/**
 * `_makeFlat` is a helper function that returns a one-level or fully recursive
 * function based on the flag passed in.
 *
 * @private
 */


function _makeFlat(recursive) {
  return function flatt(list) {
    var value, jlen, j;
    var result = [];
    var idx = 0;
    var ilen = list.length;

    while (idx < ilen) {
      if (_isArrayLike(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;
        while (j < jlen) {
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  };
}
module.exports = _makeFlat;
},{"./_isArrayLike":126}],136:[function(require,module,exports){
function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);
  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }
  return result;
}
module.exports = _map;
},{}],137:[function(require,module,exports){
var _has = /*#__PURE__*/require('./_has');

// Based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign


function _objectAssign(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  var idx = 1;
  var length = arguments.length;
  while (idx < length) {
    var source = arguments[idx];
    if (source != null) {
      for (var nextKey in source) {
        if (_has(nextKey, source)) {
          output[nextKey] = source[nextKey];
        }
      }
    }
    idx += 1;
  }
  return output;
}
module.exports = _objectAssign;
},{"./_has":121}],138:[function(require,module,exports){
function _of(x) {
  return [x];
}
module.exports = _of;
},{}],139:[function(require,module,exports){
function _pipe(f, g) {
  return function () {
    return g.call(this, f.apply(this, arguments));
  };
}
module.exports = _pipe;
},{}],140:[function(require,module,exports){
function _pipeP(f, g) {
  return function () {
    var ctx = this;
    return f.apply(ctx, arguments).then(function (x) {
      return g.call(ctx, x);
    });
  };
}
module.exports = _pipeP;
},{}],141:[function(require,module,exports){
function _quote(s) {
  var escaped = s.replace(/\\/g, '\\\\').replace(/[\b]/g, '\\b') // \b matches word boundary; [\b] matches backspace
  .replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\v/g, '\\v').replace(/\0/g, '\\0');

  return '"' + escaped.replace(/"/g, '\\"') + '"';
}
module.exports = _quote;
},{}],142:[function(require,module,exports){
var _isArrayLike = /*#__PURE__*/require('./_isArrayLike');

var _xwrap = /*#__PURE__*/require('./_xwrap');

var bind = /*#__PURE__*/require('../bind');

function _arrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    acc = xf['@@transducer/step'](acc, list[idx]);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    idx += 1;
  }
  return xf['@@transducer/result'](acc);
}

function _iterableReduce(xf, acc, iter) {
  var step = iter.next();
  while (!step.done) {
    acc = xf['@@transducer/step'](acc, step.value);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    step = iter.next();
  }
  return xf['@@transducer/result'](acc);
}

function _methodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
}

var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';

function _reduce(fn, acc, list) {
  if (typeof fn === 'function') {
    fn = _xwrap(fn);
  }
  if (_isArrayLike(list)) {
    return _arrayReduce(fn, acc, list);
  }
  if (typeof list['fantasy-land/reduce'] === 'function') {
    return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
  }
  if (list[symIterator] != null) {
    return _iterableReduce(fn, acc, list[symIterator]());
  }
  if (typeof list.next === 'function') {
    return _iterableReduce(fn, acc, list);
  }
  if (typeof list.reduce === 'function') {
    return _methodReduce(fn, acc, list, 'reduce');
  }

  throw new TypeError('reduce: list must be array or iterable');
}
module.exports = _reduce;
},{"../bind":27,"./_isArrayLike":126,"./_xwrap":167}],143:[function(require,module,exports){
function _reduced(x) {
  return x && x['@@transducer/reduced'] ? x : {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}
module.exports = _reduced;
},{}],144:[function(require,module,exports){
var _assign = /*#__PURE__*/require('./_assign');

var _identity = /*#__PURE__*/require('./_identity');

var _isArrayLike = /*#__PURE__*/require('./_isArrayLike');

var _isTransformer = /*#__PURE__*/require('./_isTransformer');

var objOf = /*#__PURE__*/require('../objOf');

var _stepCatArray = {
  '@@transducer/init': Array,
  '@@transducer/step': function (xs, x) {
    xs.push(x);
    return xs;
  },
  '@@transducer/result': _identity
};
var _stepCatString = {
  '@@transducer/init': String,
  '@@transducer/step': function (a, b) {
    return a + b;
  },
  '@@transducer/result': _identity
};
var _stepCatObject = {
  '@@transducer/init': Object,
  '@@transducer/step': function (result, input) {
    return _assign(result, _isArrayLike(input) ? objOf(input[0], input[1]) : input);
  },
  '@@transducer/result': _identity
};

function _stepCat(obj) {
  if (_isTransformer(obj)) {
    return obj;
  }
  if (_isArrayLike(obj)) {
    return _stepCatArray;
  }
  if (typeof obj === 'string') {
    return _stepCatString;
  }
  if (typeof obj === 'object') {
    return _stepCatObject;
  }
  throw new Error('Cannot create transformer for ' + obj);
}
module.exports = _stepCat;
},{"../objOf":223,"./_assign":100,"./_identity":122,"./_isArrayLike":126,"./_isTransformer":134}],145:[function(require,module,exports){
/**
 * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
 */
var pad = function pad(n) {
  return (n < 10 ? '0' : '') + n;
};

var _toISOString = typeof Date.prototype.toISOString === 'function' ? function _toISOString(d) {
  return d.toISOString();
} : function _toISOString(d) {
  return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + '.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
};

module.exports = _toISOString;
},{}],146:[function(require,module,exports){
var _contains = /*#__PURE__*/require('./_contains');

var _map = /*#__PURE__*/require('./_map');

var _quote = /*#__PURE__*/require('./_quote');

var _toISOString = /*#__PURE__*/require('./_toISOString');

var keys = /*#__PURE__*/require('../keys');

var reject = /*#__PURE__*/require('../reject');

function _toString(x, seen) {
  var recur = function recur(y) {
    var xs = seen.concat([x]);
    return _contains(y, xs) ? '<Circular>' : _toString(y, xs);
  };

  //  mapPairs :: (Object, [String]) -> [String]
  var mapPairs = function (obj, keys) {
    return _map(function (k) {
      return _quote(k) + ': ' + recur(obj[k]);
    }, keys.slice().sort());
  };

  switch (Object.prototype.toString.call(x)) {
    case '[object Arguments]':
      return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';
    case '[object Array]':
      return '[' + _map(recur, x).concat(mapPairs(x, reject(function (k) {
        return (/^\d+$/.test(k)
        );
      }, keys(x)))).join(', ') + ']';
    case '[object Boolean]':
      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
    case '[object Date]':
      return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ')';
    case '[object Null]':
      return 'null';
    case '[object Number]':
      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
    case '[object String]':
      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);
    case '[object Undefined]':
      return 'undefined';
    default:
      if (typeof x.toString === 'function') {
        var repr = x.toString();
        if (repr !== '[object Object]') {
          return repr;
        }
      }
      return '{' + mapPairs(x, keys(x)).join(', ') + '}';
  }
}
module.exports = _toString;
},{"../keys":179,"../reject":259,"./_contains":106,"./_map":136,"./_quote":141,"./_toISOString":145}],147:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduced = /*#__PURE__*/require('./_reduced');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XAll = /*#__PURE__*/function () {

  function XAll(f, xf) {
    this.xf = xf;
    this.f = f;
    this.all = true;
  }
  XAll.prototype['@@transducer/init'] = _xfBase.init;
  XAll.prototype['@@transducer/result'] = function (result) {
    if (this.all) {
      result = this.xf['@@transducer/step'](result, true);
    }
    return this.xf['@@transducer/result'](result);
  };
  XAll.prototype['@@transducer/step'] = function (result, input) {
    if (!this.f(input)) {
      this.all = false;
      result = _reduced(this.xf['@@transducer/step'](result, false));
    }
    return result;
  };

  return XAll;
}();

var _xall = /*#__PURE__*/_curry2(function _xall(f, xf) {
  return new XAll(f, xf);
});
module.exports = _xall;
},{"./_curry2":110,"./_reduced":143,"./_xfBase":156}],148:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduced = /*#__PURE__*/require('./_reduced');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XAny = /*#__PURE__*/function () {

  function XAny(f, xf) {
    this.xf = xf;
    this.f = f;
    this.any = false;
  }
  XAny.prototype['@@transducer/init'] = _xfBase.init;
  XAny.prototype['@@transducer/result'] = function (result) {
    if (!this.any) {
      result = this.xf['@@transducer/step'](result, false);
    }
    return this.xf['@@transducer/result'](result);
  };
  XAny.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.any = true;
      result = _reduced(this.xf['@@transducer/step'](result, true));
    }
    return result;
  };

  return XAny;
}();

var _xany = /*#__PURE__*/_curry2(function _xany(f, xf) {
  return new XAny(f, xf);
});
module.exports = _xany;
},{"./_curry2":110,"./_reduced":143,"./_xfBase":156}],149:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./_concat');

var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XAperture = /*#__PURE__*/function () {

  function XAperture(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }
  XAperture.prototype['@@transducer/init'] = _xfBase.init;
  XAperture.prototype['@@transducer/result'] = function (result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };
  XAperture.prototype['@@transducer/step'] = function (result, input) {
    this.store(input);
    return this.full ? this.xf['@@transducer/step'](result, this.getCopy()) : result;
  };
  XAperture.prototype.store = function (input) {
    this.acc[this.pos] = input;
    this.pos += 1;
    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };
  XAperture.prototype.getCopy = function () {
    return _concat(Array.prototype.slice.call(this.acc, this.pos), Array.prototype.slice.call(this.acc, 0, this.pos));
  };

  return XAperture;
}();

var _xaperture = /*#__PURE__*/_curry2(function _xaperture(n, xf) {
  return new XAperture(n, xf);
});
module.exports = _xaperture;
},{"./_concat":105,"./_curry2":110,"./_xfBase":156}],150:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _flatCat = /*#__PURE__*/require('./_flatCat');

var map = /*#__PURE__*/require('../map');

var _xchain = /*#__PURE__*/_curry2(function _xchain(f, xf) {
  return map(f, _flatCat(xf));
});
module.exports = _xchain;
},{"../map":192,"./_curry2":110,"./_flatCat":118}],151:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XDrop = /*#__PURE__*/function () {

  function XDrop(n, xf) {
    this.xf = xf;
    this.n = n;
  }
  XDrop.prototype['@@transducer/init'] = _xfBase.init;
  XDrop.prototype['@@transducer/result'] = _xfBase.result;
  XDrop.prototype['@@transducer/step'] = function (result, input) {
    if (this.n > 0) {
      this.n -= 1;
      return result;
    }
    return this.xf['@@transducer/step'](result, input);
  };

  return XDrop;
}();

var _xdrop = /*#__PURE__*/_curry2(function _xdrop(n, xf) {
  return new XDrop(n, xf);
});
module.exports = _xdrop;
},{"./_curry2":110,"./_xfBase":156}],152:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XDropLast = /*#__PURE__*/function () {

  function XDropLast(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }
  XDropLast.prototype['@@transducer/init'] = _xfBase.init;
  XDropLast.prototype['@@transducer/result'] = function (result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };
  XDropLast.prototype['@@transducer/step'] = function (result, input) {
    if (this.full) {
      result = this.xf['@@transducer/step'](result, this.acc[this.pos]);
    }
    this.store(input);
    return result;
  };
  XDropLast.prototype.store = function (input) {
    this.acc[this.pos] = input;
    this.pos += 1;
    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };

  return XDropLast;
}();

var _xdropLast = /*#__PURE__*/_curry2(function _xdropLast(n, xf) {
  return new XDropLast(n, xf);
});
module.exports = _xdropLast;
},{"./_curry2":110,"./_xfBase":156}],153:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduce = /*#__PURE__*/require('./_reduce');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XDropLastWhile = /*#__PURE__*/function () {

  function XDropLastWhile(fn, xf) {
    this.f = fn;
    this.retained = [];
    this.xf = xf;
  }
  XDropLastWhile.prototype['@@transducer/init'] = _xfBase.init;
  XDropLastWhile.prototype['@@transducer/result'] = function (result) {
    this.retained = null;
    return this.xf['@@transducer/result'](result);
  };
  XDropLastWhile.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.retain(result, input) : this.flush(result, input);
  };
  XDropLastWhile.prototype.flush = function (result, input) {
    result = _reduce(this.xf['@@transducer/step'], result, this.retained);
    this.retained = [];
    return this.xf['@@transducer/step'](result, input);
  };
  XDropLastWhile.prototype.retain = function (result, input) {
    this.retained.push(input);
    return result;
  };

  return XDropLastWhile;
}();

var _xdropLastWhile = /*#__PURE__*/_curry2(function _xdropLastWhile(fn, xf) {
  return new XDropLastWhile(fn, xf);
});
module.exports = _xdropLastWhile;
},{"./_curry2":110,"./_reduce":142,"./_xfBase":156}],154:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XDropRepeatsWith = /*#__PURE__*/function () {

  function XDropRepeatsWith(pred, xf) {
    this.xf = xf;
    this.pred = pred;
    this.lastValue = undefined;
    this.seenFirstValue = false;
  }

  XDropRepeatsWith.prototype['@@transducer/init'] = _xfBase.init;
  XDropRepeatsWith.prototype['@@transducer/result'] = _xfBase.result;
  XDropRepeatsWith.prototype['@@transducer/step'] = function (result, input) {
    var sameAsLast = false;
    if (!this.seenFirstValue) {
      this.seenFirstValue = true;
    } else if (this.pred(this.lastValue, input)) {
      sameAsLast = true;
    }
    this.lastValue = input;
    return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
  };

  return XDropRepeatsWith;
}();

var _xdropRepeatsWith = /*#__PURE__*/_curry2(function _xdropRepeatsWith(pred, xf) {
  return new XDropRepeatsWith(pred, xf);
});
module.exports = _xdropRepeatsWith;
},{"./_curry2":110,"./_xfBase":156}],155:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XDropWhile = /*#__PURE__*/function () {

  function XDropWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XDropWhile.prototype['@@transducer/init'] = _xfBase.init;
  XDropWhile.prototype['@@transducer/result'] = _xfBase.result;
  XDropWhile.prototype['@@transducer/step'] = function (result, input) {
    if (this.f) {
      if (this.f(input)) {
        return result;
      }
      this.f = null;
    }
    return this.xf['@@transducer/step'](result, input);
  };

  return XDropWhile;
}();

var _xdropWhile = /*#__PURE__*/_curry2(function _xdropWhile(f, xf) {
  return new XDropWhile(f, xf);
});
module.exports = _xdropWhile;
},{"./_curry2":110,"./_xfBase":156}],156:[function(require,module,exports){
module.exports = {
  init: function () {
    return this.xf['@@transducer/init']();
  },
  result: function (result) {
    return this.xf['@@transducer/result'](result);
  }
};
},{}],157:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XFilter = /*#__PURE__*/function () {

  function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFilter.prototype['@@transducer/init'] = _xfBase.init;
  XFilter.prototype['@@transducer/result'] = _xfBase.result;
  XFilter.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
  };

  return XFilter;
}();

var _xfilter = /*#__PURE__*/_curry2(function _xfilter(f, xf) {
  return new XFilter(f, xf);
});
module.exports = _xfilter;
},{"./_curry2":110,"./_xfBase":156}],158:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduced = /*#__PURE__*/require('./_reduced');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XFind = /*#__PURE__*/function () {

  function XFind(f, xf) {
    this.xf = xf;
    this.f = f;
    this.found = false;
  }
  XFind.prototype['@@transducer/init'] = _xfBase.init;
  XFind.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, void 0);
    }
    return this.xf['@@transducer/result'](result);
  };
  XFind.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf['@@transducer/step'](result, input));
    }
    return result;
  };

  return XFind;
}();

var _xfind = /*#__PURE__*/_curry2(function _xfind(f, xf) {
  return new XFind(f, xf);
});
module.exports = _xfind;
},{"./_curry2":110,"./_reduced":143,"./_xfBase":156}],159:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduced = /*#__PURE__*/require('./_reduced');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XFindIndex = /*#__PURE__*/function () {

  function XFindIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.found = false;
  }
  XFindIndex.prototype['@@transducer/init'] = _xfBase.init;
  XFindIndex.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, -1);
    }
    return this.xf['@@transducer/result'](result);
  };
  XFindIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1;
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf['@@transducer/step'](result, this.idx));
    }
    return result;
  };

  return XFindIndex;
}();

var _xfindIndex = /*#__PURE__*/_curry2(function _xfindIndex(f, xf) {
  return new XFindIndex(f, xf);
});
module.exports = _xfindIndex;
},{"./_curry2":110,"./_reduced":143,"./_xfBase":156}],160:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XFindLast = /*#__PURE__*/function () {

  function XFindLast(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFindLast.prototype['@@transducer/init'] = _xfBase.init;
  XFindLast.prototype['@@transducer/result'] = function (result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.last));
  };
  XFindLast.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.last = input;
    }
    return result;
  };

  return XFindLast;
}();

var _xfindLast = /*#__PURE__*/_curry2(function _xfindLast(f, xf) {
  return new XFindLast(f, xf);
});
module.exports = _xfindLast;
},{"./_curry2":110,"./_xfBase":156}],161:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XFindLastIndex = /*#__PURE__*/function () {

  function XFindLastIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.lastIdx = -1;
  }
  XFindLastIndex.prototype['@@transducer/init'] = _xfBase.init;
  XFindLastIndex.prototype['@@transducer/result'] = function (result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.lastIdx));
  };
  XFindLastIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1;
    if (this.f(input)) {
      this.lastIdx = this.idx;
    }
    return result;
  };

  return XFindLastIndex;
}();

var _xfindLastIndex = /*#__PURE__*/_curry2(function _xfindLastIndex(f, xf) {
  return new XFindLastIndex(f, xf);
});
module.exports = _xfindLastIndex;
},{"./_curry2":110,"./_xfBase":156}],162:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XMap = /*#__PURE__*/function () {

  function XMap(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XMap.prototype['@@transducer/init'] = _xfBase.init;
  XMap.prototype['@@transducer/result'] = _xfBase.result;
  XMap.prototype['@@transducer/step'] = function (result, input) {
    return this.xf['@@transducer/step'](result, this.f(input));
  };

  return XMap;
}();

var _xmap = /*#__PURE__*/_curry2(function _xmap(f, xf) {
  return new XMap(f, xf);
});
module.exports = _xmap;
},{"./_curry2":110,"./_xfBase":156}],163:[function(require,module,exports){
var _curryN = /*#__PURE__*/require('./_curryN');

var _has = /*#__PURE__*/require('./_has');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XReduceBy = /*#__PURE__*/function () {

  function XReduceBy(valueFn, valueAcc, keyFn, xf) {
    this.valueFn = valueFn;
    this.valueAcc = valueAcc;
    this.keyFn = keyFn;
    this.xf = xf;
    this.inputs = {};
  }
  XReduceBy.prototype['@@transducer/init'] = _xfBase.init;
  XReduceBy.prototype['@@transducer/result'] = function (result) {
    var key;
    for (key in this.inputs) {
      if (_has(key, this.inputs)) {
        result = this.xf['@@transducer/step'](result, this.inputs[key]);
        if (result['@@transducer/reduced']) {
          result = result['@@transducer/value'];
          break;
        }
      }
    }
    this.inputs = null;
    return this.xf['@@transducer/result'](result);
  };
  XReduceBy.prototype['@@transducer/step'] = function (result, input) {
    var key = this.keyFn(input);
    this.inputs[key] = this.inputs[key] || [key, this.valueAcc];
    this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
    return result;
  };

  return XReduceBy;
}();

var _xreduceBy = /*#__PURE__*/_curryN(4, [], function _xreduceBy(valueFn, valueAcc, keyFn, xf) {
  return new XReduceBy(valueFn, valueAcc, keyFn, xf);
});
module.exports = _xreduceBy;
},{"./_curryN":112,"./_has":121,"./_xfBase":156}],164:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduced = /*#__PURE__*/require('./_reduced');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XTake = /*#__PURE__*/function () {

  function XTake(n, xf) {
    this.xf = xf;
    this.n = n;
    this.i = 0;
  }
  XTake.prototype['@@transducer/init'] = _xfBase.init;
  XTake.prototype['@@transducer/result'] = _xfBase.result;
  XTake.prototype['@@transducer/step'] = function (result, input) {
    this.i += 1;
    var ret = this.n === 0 ? result : this.xf['@@transducer/step'](result, input);
    return this.n >= 0 && this.i >= this.n ? _reduced(ret) : ret;
  };

  return XTake;
}();

var _xtake = /*#__PURE__*/_curry2(function _xtake(n, xf) {
  return new XTake(n, xf);
});
module.exports = _xtake;
},{"./_curry2":110,"./_reduced":143,"./_xfBase":156}],165:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduced = /*#__PURE__*/require('./_reduced');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XTakeWhile = /*#__PURE__*/function () {

  function XTakeWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XTakeWhile.prototype['@@transducer/init'] = _xfBase.init;
  XTakeWhile.prototype['@@transducer/result'] = _xfBase.result;
  XTakeWhile.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : _reduced(result);
  };

  return XTakeWhile;
}();

var _xtakeWhile = /*#__PURE__*/_curry2(function _xtakeWhile(f, xf) {
  return new XTakeWhile(f, xf);
});
module.exports = _xtakeWhile;
},{"./_curry2":110,"./_reduced":143,"./_xfBase":156}],166:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XTap = /*#__PURE__*/function () {

  function XTap(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XTap.prototype['@@transducer/init'] = _xfBase.init;
  XTap.prototype['@@transducer/result'] = _xfBase.result;
  XTap.prototype['@@transducer/step'] = function (result, input) {
    this.f(input);
    return this.xf['@@transducer/step'](result, input);
  };

  return XTap;
}();

var _xtap = /*#__PURE__*/_curry2(function _xtap(f, xf) {
  return new XTap(f, xf);
});
module.exports = _xtap;
},{"./_curry2":110,"./_xfBase":156}],167:[function(require,module,exports){
var XWrap = /*#__PURE__*/function () {
  function XWrap(fn) {
    this.f = fn;
  }
  XWrap.prototype['@@transducer/init'] = function () {
    throw new Error('init not implemented on XWrap');
  };
  XWrap.prototype['@@transducer/result'] = function (acc) {
    return acc;
  };
  XWrap.prototype['@@transducer/step'] = function (acc, x) {
    return this.f(acc, x);
  };

  return XWrap;
}();

function _xwrap(fn) {
  return new XWrap(fn);
}
module.exports = _xwrap;
},{}],168:[function(require,module,exports){
var _contains = /*#__PURE__*/require('./internal/_contains');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _filter = /*#__PURE__*/require('./internal/_filter');

var flip = /*#__PURE__*/require('./flip');

var uniq = /*#__PURE__*/require('./uniq');

/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The list of elements found in both `list1` and `list2`.
 * @see R.innerJoin
 * @example
 *
 *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
 */


var intersection = /*#__PURE__*/_curry2(function intersection(list1, list2) {
  var lookupList, filteredList;
  if (list1.length > list2.length) {
    lookupList = list1;
    filteredList = list2;
  } else {
    lookupList = list2;
    filteredList = list1;
  }
  return uniq(_filter(flip(_contains)(lookupList), filteredList));
});
module.exports = intersection;
},{"./flip":74,"./internal/_contains":106,"./internal/_curry2":110,"./internal/_filter":117,"./uniq":305}],169:[function(require,module,exports){
var _checkForMethod = /*#__PURE__*/require('./internal/_checkForMethod');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates a new list with the separator interposed between elements.
 *
 * Dispatches to the `intersperse` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} separator The element to add to the list.
 * @param {Array} list The list to be interposed.
 * @return {Array} The new list.
 * @example
 *
 *      R.intersperse('n', ['ba', 'a', 'a']); //=> ['ba', 'n', 'a', 'n', 'a']
 */


var intersperse = /*#__PURE__*/_curry2( /*#__PURE__*/_checkForMethod('intersperse', function intersperse(separator, list) {
  var out = [];
  var idx = 0;
  var length = list.length;
  while (idx < length) {
    if (idx === length - 1) {
      out.push(list[idx]);
    } else {
      out.push(list[idx], separator);
    }
    idx += 1;
  }
  return out;
}));
module.exports = intersperse;
},{"./internal/_checkForMethod":101,"./internal/_curry2":110}],170:[function(require,module,exports){
var _clone = /*#__PURE__*/require('./internal/_clone');

var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _isTransformer = /*#__PURE__*/require('./internal/_isTransformer');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var _stepCat = /*#__PURE__*/require('./internal/_stepCat');

/**
 * Transforms the items of the list with the transducer and appends the
 * transformed items to the accumulator using an appropriate iterator function
 * based on the accumulator type.
 *
 * The accumulator can be an array, string, object or a transformer. Iterated
 * items will be appended to arrays and concatenated to strings. Objects will
 * be merged directly or 2-item arrays will be merged as key, value pairs.
 *
 * The accumulator can also be a transformer object that provides a 2-arity
 * reducing iterator function, step, 0-arity initial value function, init, and
 * 1-arity result extraction function result. The step function is used as the
 * iterator function in reduce. The result function is used to convert the
 * final accumulator into the return type and in most cases is R.identity. The
 * init function is used to provide the initial accumulator.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the
 * transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig a -> (b -> b) -> [c] -> a
 * @param {*} acc The initial accumulator value.
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
 *
 *      R.into([], transducer, numbers); //=> [2, 3]
 *
 *      var intoArray = R.into([]);
 *      intoArray(transducer, numbers); //=> [2, 3]
 */


var into = /*#__PURE__*/_curry3(function into(acc, xf, list) {
  return _isTransformer(acc) ? _reduce(xf(acc), acc['@@transducer/init'](), list) : _reduce(xf(_stepCat(acc)), _clone(acc, [], [], false), list);
});
module.exports = into;
},{"./internal/_clone":102,"./internal/_curry3":111,"./internal/_isTransformer":134,"./internal/_reduce":142,"./internal/_stepCat":144}],171:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _has = /*#__PURE__*/require('./internal/_has');

var keys = /*#__PURE__*/require('./keys');

/**
 * Same as [`R.invertObj`](#invertObj), however this accounts for objects with
 * duplicate values by putting the values into an array.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: [ s, ... ]}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object with keys in an array.
 * @see R.invertObj
 * @example
 *
 *      var raceResultsByFirstName = {
 *        first: 'alice',
 *        second: 'jake',
 *        third: 'alice',
 *      };
 *      R.invert(raceResultsByFirstName);
 *      //=> { 'alice': ['first', 'third'], 'jake':['second'] }
 */


var invert = /*#__PURE__*/_curry1(function invert(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    var val = obj[key];
    var list = _has(val, out) ? out[val] : out[val] = [];
    list[list.length] = key;
    idx += 1;
  }
  return out;
});
module.exports = invert;
},{"./internal/_curry1":109,"./internal/_has":121,"./keys":179}],172:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var keys = /*#__PURE__*/require('./keys');

/**
 * Returns a new object with the keys of the given object as values, and the
 * values of the given object, which are coerced to strings, as keys. Note
 * that the last key found is preferred when handling the same value.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: s}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object
 * @see R.invert
 * @example
 *
 *      var raceResults = {
 *        first: 'alice',
 *        second: 'jake'
 *      };
 *      R.invertObj(raceResults);
 *      //=> { 'alice': 'first', 'jake':'second' }
 *
 *      // Alternatively:
 *      var raceResults = ['alice', 'jake'];
 *      R.invertObj(raceResults);
 *      //=> { 'alice': '0', 'jake':'1' }
 */


var invertObj = /*#__PURE__*/_curry1(function invertObj(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    out[obj[key]] = key;
    idx += 1;
  }
  return out;
});
module.exports = invertObj;
},{"./internal/_curry1":109,"./keys":179}],173:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isFunction = /*#__PURE__*/require('./internal/_isFunction');

var curryN = /*#__PURE__*/require('./curryN');

var toString = /*#__PURE__*/require('./toString');

/**
 * Turns a named method with a specified arity into a function that can be
 * called directly supplied with arguments and a target object.
 *
 * The returned function is curried and accepts `arity + 1` parameters where
 * the final parameter is the target object.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
 * @param {Number} arity Number of arguments the returned function should take
 *        before the target object.
 * @param {String} method Name of the method to call.
 * @return {Function} A new curried function.
 * @see R.construct
 * @example
 *
 *      var sliceFrom = R.invoker(1, 'slice');
 *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
 *      var sliceFrom6 = R.invoker(2, 'slice')(6);
 *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
 * @symb R.invoker(0, 'method')(o) = o['method']()
 * @symb R.invoker(1, 'method')(a, o) = o['method'](a)
 * @symb R.invoker(2, 'method')(a, b, o) = o['method'](a, b)
 */


var invoker = /*#__PURE__*/_curry2(function invoker(arity, method) {
  return curryN(arity + 1, function () {
    var target = arguments[arity];
    if (target != null && _isFunction(target[method])) {
      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
    }
    throw new TypeError(toString(target) + ' does not have a method named "' + method + '"');
  });
});
module.exports = invoker;
},{"./curryN":46,"./internal/_curry2":110,"./internal/_isFunction":127,"./toString":291}],174:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * See if an object (`val`) is an instance of the supplied constructor. This
 * function will check up the inheritance chain, if any.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Type
 * @sig (* -> {*}) -> a -> Boolean
 * @param {Object} ctor A constructor
 * @param {*} val The value to test
 * @return {Boolean}
 * @example
 *
 *      R.is(Object, {}); //=> true
 *      R.is(Number, 1); //=> true
 *      R.is(Object, 1); //=> false
 *      R.is(String, 's'); //=> true
 *      R.is(String, new String('')); //=> true
 *      R.is(Object, new String('')); //=> true
 *      R.is(Object, 's'); //=> false
 *      R.is(Number, {}); //=> false
 */


var is = /*#__PURE__*/_curry2(function is(Ctor, val) {
  return val != null && val.constructor === Ctor || val instanceof Ctor;
});
module.exports = is;
},{"./internal/_curry2":110}],175:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var empty = /*#__PURE__*/require('./empty');

var equals = /*#__PURE__*/require('./equals');

/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> Boolean
 * @param {*} x
 * @return {Boolean}
 * @see R.empty
 * @example
 *
 *      R.isEmpty([1, 2, 3]);   //=> false
 *      R.isEmpty([]);          //=> true
 *      R.isEmpty('');          //=> true
 *      R.isEmpty(null);        //=> false
 *      R.isEmpty({});          //=> true
 *      R.isEmpty({length: 0}); //=> false
 */


var isEmpty = /*#__PURE__*/_curry1(function isEmpty(x) {
  return x != null && equals(x, empty(x));
});
module.exports = isEmpty;
},{"./empty":62,"./equals":66,"./internal/_curry1":109}],176:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Type
 * @sig * -> Boolean
 * @param {*} x The value to test.
 * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
 * @example
 *
 *      R.isNil(null); //=> true
 *      R.isNil(undefined); //=> true
 *      R.isNil(0); //=> false
 *      R.isNil([]); //=> false
 */


var isNil = /*#__PURE__*/_curry1(function isNil(x) {
  return x == null;
});
module.exports = isNil;
},{"./internal/_curry1":109}],177:[function(require,module,exports){
var invoker = /*#__PURE__*/require('./invoker');

/**
 * Returns a string made by inserting the `separator` between each element and
 * concatenating all the elements into a single string.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig String -> [a] -> String
 * @param {Number|String} separator The string used to separate the elements.
 * @param {Array} xs The elements to join into a string.
 * @return {String} str The string made by concatenating `xs` with `separator`.
 * @see R.split
 * @example
 *
 *      var spacer = R.join(' ');
 *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
 *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
 */


var join = /*#__PURE__*/invoker(1, 'join');
module.exports = join;
},{"./invoker":173}],178:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var converge = /*#__PURE__*/require('./converge');

/**
 * juxt applies a list of functions to a list of values.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Function
 * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])
 * @param {Array} fns An array of functions
 * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.
 * @see R.applySpec
 * @example
 *
 *      var getRange = R.juxt([Math.min, Math.max]);
 *      getRange(3, 4, 9, -3); //=> [-3, 9]
 * @symb R.juxt([f, g, h])(a, b) = [f(a, b), g(a, b), h(a, b)]
 */


var juxt = /*#__PURE__*/_curry1(function juxt(fns) {
  return converge(function () {
    return Array.prototype.slice.call(arguments, 0);
  }, fns);
});
module.exports = juxt;
},{"./converge":43,"./internal/_curry1":109}],179:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _has = /*#__PURE__*/require('./internal/_has');

var _isArguments = /*#__PURE__*/require('./internal/_isArguments');

// cover IE < 9 keys issues


var hasEnumBug = ! /*#__PURE__*/{ toString: null }.propertyIsEnumerable('toString');
var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
// Safari bug
var hasArgsEnumBug = /*#__PURE__*/function () {
  'use strict';

  return arguments.propertyIsEnumerable('length');
}();

var contains = function contains(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
};

/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @see R.keysIn, R.values
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */
var _keys = typeof Object.keys === 'function' && !hasArgsEnumBug ? function keys(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
} : function keys(obj) {
  if (Object(obj) !== obj) {
    return [];
  }
  var prop, nIdx;
  var ks = [];
  var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
  for (prop in obj) {
    if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
      ks[ks.length] = prop;
    }
  }
  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;
    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];
      if (_has(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }
      nIdx -= 1;
    }
  }
  return ks;
};
var keys = /*#__PURE__*/_curry1(_keys);
module.exports = keys;
},{"./internal/_curry1":109,"./internal/_has":121,"./internal/_isArguments":124}],180:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Returns a list containing the names of all the properties of the supplied
 * object, including prototype properties.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own and prototype properties.
 * @see R.keys, R.valuesIn
 * @example
 *
 *      var F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      var f = new F();
 *      R.keysIn(f); //=> ['x', 'y']
 */


var keysIn = /*#__PURE__*/_curry1(function keysIn(obj) {
  var prop;
  var ks = [];
  for (prop in obj) {
    ks[ks.length] = prop;
  }
  return ks;
});
module.exports = keysIn;
},{"./internal/_curry1":109}],181:[function(require,module,exports){
var nth = /*#__PURE__*/require('./nth');

/**
 * Returns the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.init, R.head, R.tail
 * @example
 *
 *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
 *      R.last([]); //=> undefined
 *
 *      R.last('abc'); //=> 'c'
 *      R.last(''); //=> ''
 */


var last = /*#__PURE__*/nth(-1);
module.exports = last;
},{"./nth":220}],182:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isArray = /*#__PURE__*/require('./internal/_isArray');

var equals = /*#__PURE__*/require('./equals');

/**
 * Returns the position of the last occurrence of an item in an array, or -1 if
 * the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.indexOf
 * @example
 *
 *      R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
 *      R.lastIndexOf(10, [1,2,3,4]); //=> -1
 */


var lastIndexOf = /*#__PURE__*/_curry2(function lastIndexOf(target, xs) {
  if (typeof xs.lastIndexOf === 'function' && !_isArray(xs)) {
    return xs.lastIndexOf(target);
  } else {
    var idx = xs.length - 1;
    while (idx >= 0) {
      if (equals(xs[idx], target)) {
        return idx;
      }
      idx -= 1;
    }
    return -1;
  }
});
module.exports = lastIndexOf;
},{"./equals":66,"./internal/_curry2":110,"./internal/_isArray":125}],183:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _isNumber = /*#__PURE__*/require('./internal/_isNumber');

/**
 * Returns the number of elements in the array by returning `list.length`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [a] -> Number
 * @param {Array} list The array to inspect.
 * @return {Number} The length of the array.
 * @example
 *
 *      R.length([]); //=> 0
 *      R.length([1, 2, 3]); //=> 3
 */


var length = /*#__PURE__*/_curry1(function length(list) {
  return list != null && _isNumber(list.length) ? list.length : NaN;
});
module.exports = length;
},{"./internal/_curry1":109,"./internal/_isNumber":129}],184:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var map = /*#__PURE__*/require('./map');

/**
 * Returns a lens for the given getter and setter functions. The getter "gets"
 * the value of the focus; the setter "sets" the value of the focus. The setter
 * should not mutate the data structure.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig (s -> a) -> ((a, s) -> s) -> Lens s a
 * @param {Function} getter
 * @param {Function} setter
 * @return {Lens}
 * @see R.view, R.set, R.over, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lens(R.prop('x'), R.assoc('x'));
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */


var lens = /*#__PURE__*/_curry2(function lens(getter, setter) {
  return function (toFunctorFn) {
    return function (target) {
      return map(function (focus) {
        return setter(focus, target);
      }, toFunctorFn(getter(target)));
    };
  };
});
module.exports = lens;
},{"./internal/_curry2":110,"./map":192}],185:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var lens = /*#__PURE__*/require('./lens');

var nth = /*#__PURE__*/require('./nth');

var update = /*#__PURE__*/require('./update');

/**
 * Returns a lens whose focus is the specified index.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Number -> Lens s a
 * @param {Number} n
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var headLens = R.lensIndex(0);
 *
 *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
 *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
 *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
 */


var lensIndex = /*#__PURE__*/_curry1(function lensIndex(n) {
  return lens(nth(n), update(n));
});
module.exports = lensIndex;
},{"./internal/_curry1":109,"./lens":184,"./nth":220,"./update":311}],186:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var assocPath = /*#__PURE__*/require('./assocPath');

var lens = /*#__PURE__*/require('./lens');

var path = /*#__PURE__*/require('./path');

/**
 * Returns a lens whose focus is the specified path.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @typedefn Idx = String | Int
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig [Idx] -> Lens s a
 * @param {Array} path The path to use.
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var xHeadYLens = R.lensPath(['x', 0, 'y']);
 *
 *      R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> 2
 *      R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
 *      R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: -2, z: 3}, {y: 4, z: 5}]}
 */


var lensPath = /*#__PURE__*/_curry1(function lensPath(p) {
  return lens(path(p), assocPath(p));
});
module.exports = lensPath;
},{"./assocPath":25,"./internal/_curry1":109,"./lens":184,"./path":233}],187:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var assoc = /*#__PURE__*/require('./assoc');

var lens = /*#__PURE__*/require('./lens');

var prop = /*#__PURE__*/require('./prop');

/**
 * Returns a lens whose focus is the specified property.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig String -> Lens s a
 * @param {String} k
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */


var lensProp = /*#__PURE__*/_curry1(function lensProp(k) {
  return lens(prop(k), assoc(k));
});
module.exports = lensProp;
},{"./assoc":24,"./internal/_curry1":109,"./lens":184,"./prop":247}],188:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var liftN = /*#__PURE__*/require('./liftN');

/**
 * "lifts" a function of arity > 1 so that it may "map over" a list, Function or other
 * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.liftN
 * @example
 *
 *      var madd3 = R.lift((a, b, c) => a + b + c);
 *
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 *
 *      var madd5 = R.lift((a, b, c, d, e) => a + b + c + d + e);
 *
 *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
 */


var lift = /*#__PURE__*/_curry1(function lift(fn) {
  return liftN(fn.length, fn);
});
module.exports = lift;
},{"./internal/_curry1":109,"./liftN":189}],189:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var ap = /*#__PURE__*/require('./ap');

var curryN = /*#__PURE__*/require('./curryN');

var map = /*#__PURE__*/require('./map');

/**
 * "lifts" a function to be the specified arity, so that it may "map over" that
 * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig Number -> (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.lift, R.ap
 * @example
 *
 *      var madd3 = R.liftN(3, (...args) => R.sum(args));
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 */


var liftN = /*#__PURE__*/_curry2(function liftN(arity, fn) {
  var lifted = curryN(arity, fn);
  return curryN(arity, function () {
    return _reduce(ap, map(lifted, arguments[0]), Array.prototype.slice.call(arguments, 1));
  });
});
module.exports = liftN;
},{"./ap":17,"./curryN":46,"./internal/_curry2":110,"./internal/_reduce":142,"./map":192}],190:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if the first argument is less than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.gt
 * @example
 *
 *      R.lt(2, 1); //=> false
 *      R.lt(2, 2); //=> false
 *      R.lt(2, 3); //=> true
 *      R.lt('a', 'z'); //=> true
 *      R.lt('z', 'a'); //=> false
 */


var lt = /*#__PURE__*/_curry2(function lt(a, b) {
  return a < b;
});
module.exports = lt;
},{"./internal/_curry2":110}],191:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if the first argument is less than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.gte
 * @example
 *
 *      R.lte(2, 1); //=> false
 *      R.lte(2, 2); //=> true
 *      R.lte(2, 3); //=> true
 *      R.lte('a', 'z'); //=> true
 *      R.lte('z', 'a'); //=> false
 */


var lte = /*#__PURE__*/_curry2(function lte(a, b) {
  return a <= b;
});
module.exports = lte;
},{"./internal/_curry2":110}],192:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _map = /*#__PURE__*/require('./internal/_map');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var _xmap = /*#__PURE__*/require('./internal/_xmap');

var curryN = /*#__PURE__*/require('./curryN');

var keys = /*#__PURE__*/require('./keys');

/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce, R.addIndex
 * @example
 *
 *      var double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 * @symb R.map(f, [a, b]) = [f(a), f(b)]
 * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
 * @symb R.map(f, functor_o) = functor_o.map(f)
 */


var map = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['fantasy-land/map', 'map'], _xmap, function map(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
      return curryN(functor.length, function () {
        return fn.call(this, functor.apply(this, arguments));
      });
    case '[object Object]':
      return _reduce(function (acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, keys(functor));
    default:
      return _map(fn, functor);
  }
}));
module.exports = map;
},{"./curryN":46,"./internal/_curry2":110,"./internal/_dispatchable":113,"./internal/_map":136,"./internal/_reduce":142,"./internal/_xmap":162,"./keys":179}],193:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * The `mapAccum` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from left to right, and returning a final value of this
 * accumulator together with the new list.
 *
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((acc, x) -> (acc, y)) -> acc -> [x] -> (acc, [y])
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.addIndex, R.mapAccumRight
 * @example
 *
 *      var digits = ['1', '2', '3', '4'];
 *      var appender = (a, b) => [a + b, a + b];
 *
 *      R.mapAccum(appender, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
 * @symb R.mapAccum(f, a, [b, c, d]) = [
 *   f(f(f(a, b)[0], c)[0], d)[0],
 *   [
 *     f(a, b)[1],
 *     f(f(a, b)[0], c)[1],
 *     f(f(f(a, b)[0], c)[0], d)[1]
 *   ]
 * ]
 */


var mapAccum = /*#__PURE__*/_curry3(function mapAccum(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var tuple = [acc];
  while (idx < len) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx += 1;
  }
  return [tuple[0], result];
});
module.exports = mapAccum;
},{"./internal/_curry3":111}],194:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * The `mapAccumRight` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from right to left, and returning a final value of this
 * accumulator together with the new list.
 *
 * Similar to [`mapAccum`](#mapAccum), except moves through the input list from
 * the right to the left.
 *
 * The iterator function receives two arguments, *value* and *acc*, and should
 * return a tuple *[value, acc]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((x, acc) -> (y, acc)) -> acc -> [x] -> ([y], acc)
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.addIndex, R.mapAccum
 * @example
 *
 *      var digits = ['1', '2', '3', '4'];
 *      var append = (a, b) => [a + b, a + b];
 *
 *      R.mapAccumRight(append, 5, digits); //=> [['12345', '2345', '345', '45'], '12345']
 * @symb R.mapAccumRight(f, a, [b, c, d]) = [
 *   [
 *     f(b, f(c, f(d, a)[0])[0])[1],
 *     f(c, f(d, a)[0])[1],
 *     f(d, a)[1],
 *   ]
 *   f(b, f(c, f(d, a)[0])[0])[0],
 * ]
 */


var mapAccumRight = /*#__PURE__*/_curry3(function mapAccumRight(fn, acc, list) {
  var idx = list.length - 1;
  var result = [];
  var tuple = [acc];
  while (idx >= 0) {
    tuple = fn(list[idx], tuple[0]);
    result[idx] = tuple[1];
    idx -= 1;
  }
  return [result, tuple[0]];
});
module.exports = mapAccumRight;
},{"./internal/_curry3":111}],195:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var keys = /*#__PURE__*/require('./keys');

/**
 * An Object-specific version of [`map`](#map). The function is applied to three
 * arguments: *(value, key, obj)*. If only the value is significant, use
 * [`map`](#map) instead.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig ((*, String, Object) -> *) -> Object -> Object
 * @param {Function} fn
 * @param {Object} obj
 * @return {Object}
 * @see R.map
 * @example
 *
 *      var values = { x: 1, y: 2, z: 3 };
 *      var prependKeyAndDouble = (num, key, obj) => key + (num * 2);
 *
 *      R.mapObjIndexed(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
 */


var mapObjIndexed = /*#__PURE__*/_curry2(function mapObjIndexed(fn, obj) {
  return _reduce(function (acc, key) {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {}, keys(obj));
});
module.exports = mapObjIndexed;
},{"./internal/_curry2":110,"./internal/_reduce":142,"./keys":179}],196:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Tests a regular expression against a String. Note that this function will
 * return an empty array when there are no matches. This differs from
 * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 * which returns `null` when there are no matches.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig RegExp -> String -> [String | Undefined]
 * @param {RegExp} rx A regular expression.
 * @param {String} str The string to match against
 * @return {Array} The list of matches or empty array.
 * @see R.test
 * @example
 *
 *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
 *      R.match(/a/, 'b'); //=> []
 *      R.match(/a/, null); //=> TypeError: null does not have a method named "match"
 */


var match = /*#__PURE__*/_curry2(function match(rx, str) {
  return str.match(rx) || [];
});
module.exports = match;
},{"./internal/_curry2":110}],197:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isInteger = /*#__PURE__*/require('./internal/_isInteger');

/**
 * `mathMod` behaves like the modulo operator should mathematically, unlike the
 * `%` operator (and by extension, [`R.modulo`](#modulo)). So while
 * `-17 % 5` is `-2`, `mathMod(-17, 5)` is `3`. `mathMod` requires Integer
 * arguments, and returns NaN when the modulus is zero or negative.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} m The dividend.
 * @param {Number} p the modulus.
 * @return {Number} The result of `b mod a`.
 * @see R.modulo
 * @example
 *
 *      R.mathMod(-17, 5);  //=> 3
 *      R.mathMod(17, 5);   //=> 2
 *      R.mathMod(17, -5);  //=> NaN
 *      R.mathMod(17, 0);   //=> NaN
 *      R.mathMod(17.2, 5); //=> NaN
 *      R.mathMod(17, 5.3); //=> NaN
 *
 *      var clock = R.mathMod(R.__, 12);
 *      clock(15); //=> 3
 *      clock(24); //=> 0
 *
 *      var seventeenMod = R.mathMod(17);
 *      seventeenMod(3);  //=> 2
 *      seventeenMod(4);  //=> 1
 *      seventeenMod(10); //=> 7
 */


var mathMod = /*#__PURE__*/_curry2(function mathMod(m, p) {
  if (!_isInteger(m)) {
    return NaN;
  }
  if (!_isInteger(p) || p < 1) {
    return NaN;
  }
  return (m % p + p) % p;
});
module.exports = mathMod;
},{"./internal/_curry2":110,"./internal/_isInteger":128}],198:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns the larger of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.maxBy, R.min
 * @example
 *
 *      R.max(789, 123); //=> 789
 *      R.max('a', 'b'); //=> 'b'
 */


var max = /*#__PURE__*/_curry2(function max(a, b) {
  return b > a ? b : a;
});
module.exports = max;
},{"./internal/_curry2":110}],199:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Takes a function and two values, and returns whichever value produces the
 * larger result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.max, R.minBy
 * @example
 *
 *      //  square :: Number -> Number
 *      var square = n => n * n;
 *
 *      R.maxBy(square, -3, 2); //=> -3
 *
 *      R.reduce(R.maxBy(square), 0, [3, -5, 4, 1, -2]); //=> -5
 *      R.reduce(R.maxBy(square), 0, []); //=> 0
 */


var maxBy = /*#__PURE__*/_curry3(function maxBy(f, a, b) {
  return f(b) > f(a) ? b : a;
});
module.exports = maxBy;
},{"./internal/_curry3":111}],200:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var sum = /*#__PURE__*/require('./sum');

/**
 * Returns the mean of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @see R.median
 * @example
 *
 *      R.mean([2, 7, 9]); //=> 6
 *      R.mean([]); //=> NaN
 */


var mean = /*#__PURE__*/_curry1(function mean(list) {
  return sum(list) / list.length;
});
module.exports = mean;
},{"./internal/_curry1":109,"./sum":277}],201:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var mean = /*#__PURE__*/require('./mean');

/**
 * Returns the median of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @see R.mean
 * @example
 *
 *      R.median([2, 9, 7]); //=> 7
 *      R.median([7, 2, 10, 9]); //=> 8
 *      R.median([]); //=> NaN
 */


var median = /*#__PURE__*/_curry1(function median(list) {
  var len = list.length;
  if (len === 0) {
    return NaN;
  }
  var width = 2 - len % 2;
  var idx = (len - width) / 2;
  return mean(Array.prototype.slice.call(list, 0).sort(function (a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }).slice(idx, idx + width));
});
module.exports = median;
},{"./internal/_curry1":109,"./mean":200}],202:[function(require,module,exports){
var memoizeWith = /*#__PURE__*/require('./memoizeWith');

var toString = /*#__PURE__*/require('./toString');

/**
 * Creates a new function that, when invoked, caches the result of calling `fn`
 * for a given argument set and returns the result. Subsequent calls to the
 * memoized `fn` with the same argument set will not result in an additional
 * call to `fn`; instead, the cached result for that set of arguments will be
 * returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (*... -> a) -> (*... -> a)
 * @param {Function} fn The function to memoize.
 * @return {Function} Memoized version of `fn`.
 * @see R.memoizeWith
 * @deprecated since v0.25.0
 * @example
 *
 *      let count = 0;
 *      const factorial = R.memoize(n => {
 *        count += 1;
 *        return R.product(R.range(1, n + 1));
 *      });
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      count; //=> 1
 */


var memoize = /*#__PURE__*/memoizeWith(function () {
  return toString(arguments);
});
module.exports = memoize;
},{"./memoizeWith":203,"./toString":291}],203:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _has = /*#__PURE__*/require('./internal/_has');

/**
 * A customisable version of [`R.memoize`](#memoize). `memoizeWith` takes an
 * additional function that will be applied to a given argument set and used to
 * create the cache key under which the results of the function to be memoized
 * will be stored. Care must be taken when implementing key generation to avoid
 * clashes that may overwrite previous entries erroneously.
 *
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (*... -> String) -> (*... -> a) -> (*... -> a)
 * @param {Function} fn The function to generate the cache key.
 * @param {Function} fn The function to memoize.
 * @return {Function} Memoized version of `fn`.
 * @see R.memoize
 * @example
 *
 *      let count = 0;
 *      const factorial = R.memoizeWith(R.identity, n => {
 *        count += 1;
 *        return R.product(R.range(1, n + 1));
 *      });
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      count; //=> 1
 */


var memoizeWith = /*#__PURE__*/_curry2(function memoizeWith(mFn, fn) {
  var cache = {};
  return _arity(fn.length, function () {
    var key = mFn.apply(this, arguments);
    if (!_has(key, cache)) {
      cache[key] = fn.apply(this, arguments);
    }
    return cache[key];
  });
});
module.exports = memoizeWith;
},{"./internal/_arity":98,"./internal/_curry2":110,"./internal/_has":121}],204:[function(require,module,exports){
var _assign = /*#__PURE__*/require('./internal/_assign');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepRight, R.mergeWith, R.mergeWithKey
 * @example
 *
 *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      var resetToDefault = R.merge(R.__, {x: 0});
 *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
 * @symb R.merge({ x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: 5, z: 3 }
 */


var merge = /*#__PURE__*/_curry2(function merge(l, r) {
  return _assign({}, l, r);
});
module.exports = merge;
},{"./internal/_assign":100,"./internal/_curry2":110}],205:[function(require,module,exports){
var _assign = /*#__PURE__*/require('./internal/_assign');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Merges a list of objects together into one object.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig [{k: v}] -> {k: v}
 * @param {Array} list An array of objects
 * @return {Object} A merged object.
 * @see R.reduce
 * @example
 *
 *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
 *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
 * @symb R.mergeAll([{ x: 1 }, { y: 2 }, { z: 3 }]) = { x: 1, y: 2, z: 3 }
 */


var mergeAll = /*#__PURE__*/_curry1(function mergeAll(list) {
  return _assign.apply(null, [{}].concat(list));
});
module.exports = mergeAll;
},{"./internal/_assign":100,"./internal/_curry1":109}],206:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var mergeDeepWithKey = /*#__PURE__*/require('./mergeDeepWithKey');

/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the first object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepRight, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepLeft({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                      { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 10, contact: { email: 'moo@example.com' }}
 */


var mergeDeepLeft = /*#__PURE__*/_curry2(function mergeDeepLeft(lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return lVal;
  }, lObj, rObj);
});
module.exports = mergeDeepLeft;
},{"./internal/_curry2":110,"./mergeDeepWithKey":209}],207:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var mergeDeepWithKey = /*#__PURE__*/require('./mergeDeepWithKey');

/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepLeft, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepRight({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                       { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 40, contact: { email: 'baa@example.com' }}
 */


var mergeDeepRight = /*#__PURE__*/_curry2(function mergeDeepRight(lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return rVal;
  }, lObj, rObj);
});
module.exports = mergeDeepRight;
},{"./internal/_curry2":110,"./mergeDeepWithKey":209}],208:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var mergeDeepWithKey = /*#__PURE__*/require('./mergeDeepWithKey');

/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to associated values using the
 *   resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWith, R.mergeDeep, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepWith(R.concat,
 *                      { a: true, c: { values: [10, 20] }},
 *                      { b: true, c: { values: [15, 35] }});
 *      //=> { a: true, b: true, c: { values: [10, 20, 15, 35] }}
 */


var mergeDeepWith = /*#__PURE__*/_curry3(function mergeDeepWith(fn, lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return fn(lVal, rVal);
  }, lObj, rObj);
});
module.exports = mergeDeepWith;
},{"./internal/_curry3":111,"./mergeDeepWithKey":209}],209:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _isObject = /*#__PURE__*/require('./internal/_isObject');

var mergeWithKey = /*#__PURE__*/require('./mergeWithKey');

/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to the key and associated values
 *   using the resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWithKey, R.mergeDeep, R.mergeDeepWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeDeepWithKey(concatValues,
 *                         { a: true, c: { thing: 'foo', values: [10, 20] }},
 *                         { b: true, c: { thing: 'bar', values: [15, 35] }});
 *      //=> { a: true, b: true, c: { thing: 'bar', values: [10, 20, 15, 35] }}
 */


var mergeDeepWithKey = /*#__PURE__*/_curry3(function mergeDeepWithKey(fn, lObj, rObj) {
  return mergeWithKey(function (k, lVal, rVal) {
    if (_isObject(lVal) && _isObject(rVal)) {
      return mergeDeepWithKey(fn, lVal, rVal);
    } else {
      return fn(k, lVal, rVal);
    }
  }, lObj, rObj);
});
module.exports = mergeDeepWithKey;
},{"./internal/_curry3":111,"./internal/_isObject":130,"./mergeWithKey":211}],210:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var mergeWithKey = /*#__PURE__*/require('./mergeWithKey');

/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the values
 * associated with the key in each object, with the result being used as the
 * value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWith, R.merge, R.mergeWithKey
 * @example
 *
 *      R.mergeWith(R.concat,
 *                  { a: true, values: [10, 20] },
 *                  { b: true, values: [15, 35] });
 *      //=> { a: true, b: true, values: [10, 20, 15, 35] }
 */


var mergeWith = /*#__PURE__*/_curry3(function mergeWith(fn, l, r) {
  return mergeWithKey(function (_, _l, _r) {
    return fn(_l, _r);
  }, l, r);
});
module.exports = mergeWith;
},{"./internal/_curry3":111,"./mergeWithKey":211}],211:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _has = /*#__PURE__*/require('./internal/_has');

/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the key
 * and the values associated with the key in each object, with the result being
 * used as the value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWithKey, R.merge, R.mergeWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeWithKey(concatValues,
 *                     { a: true, thing: 'foo', values: [10, 20] },
 *                     { b: true, thing: 'bar', values: [15, 35] });
 *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
 * @symb R.mergeWithKey(f, { x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: f('y', 2, 5), z: 3 }
 */


var mergeWithKey = /*#__PURE__*/_curry3(function mergeWithKey(fn, l, r) {
  var result = {};
  var k;

  for (k in l) {
    if (_has(k, l)) {
      result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
    }
  }

  for (k in r) {
    if (_has(k, r) && !_has(k, result)) {
      result[k] = r[k];
    }
  }

  return result;
});
module.exports = mergeWithKey;
},{"./internal/_curry3":111,"./internal/_has":121}],212:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns the smaller of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.minBy, R.max
 * @example
 *
 *      R.min(789, 123); //=> 123
 *      R.min('a', 'b'); //=> 'a'
 */


var min = /*#__PURE__*/_curry2(function min(a, b) {
  return b < a ? b : a;
});
module.exports = min;
},{"./internal/_curry2":110}],213:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Takes a function and two values, and returns whichever value produces the
 * smaller result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.min, R.maxBy
 * @example
 *
 *      //  square :: Number -> Number
 *      var square = n => n * n;
 *
 *      R.minBy(square, -3, 2); //=> 2
 *
 *      R.reduce(R.minBy(square), Infinity, [3, -5, 4, 1, -2]); //=> 1
 *      R.reduce(R.minBy(square), Infinity, []); //=> Infinity
 */


var minBy = /*#__PURE__*/_curry3(function minBy(f, a, b) {
  return f(b) < f(a) ? b : a;
});
module.exports = minBy;
},{"./internal/_curry3":111}],214:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Divides the first parameter by the second and returns the remainder. Note
 * that this function preserves the JavaScript-style behavior for modulo. For
 * mathematical modulo see [`mathMod`](#mathMod).
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The value to the divide.
 * @param {Number} b The pseudo-modulus
 * @return {Number} The result of `b % a`.
 * @see R.mathMod
 * @example
 *
 *      R.modulo(17, 3); //=> 2
 *      // JS behavior:
 *      R.modulo(-17, 3); //=> -2
 *      R.modulo(17, -3); //=> 2
 *
 *      var isOdd = R.modulo(R.__, 2);
 *      isOdd(42); //=> 0
 *      isOdd(21); //=> 1
 */


var modulo = /*#__PURE__*/_curry2(function modulo(a, b) {
  return a % b;
});
module.exports = modulo;
},{"./internal/_curry2":110}],215:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Multiplies two numbers. Equivalent to `a * b` but curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a * b`.
 * @see R.divide
 * @example
 *
 *      var double = R.multiply(2);
 *      var triple = R.multiply(3);
 *      double(3);       //=>  6
 *      triple(4);       //=> 12
 *      R.multiply(2, 5);  //=> 10
 */


var multiply = /*#__PURE__*/_curry2(function multiply(a, b) {
  return a * b;
});
module.exports = multiply;
},{"./internal/_curry2":110}],216:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly `n` parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} n The desired arity of the new function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity `n`.
 * @see R.binary, R.unary
 * @example
 *
 *      var takesTwoArgs = (a, b) => [a, b];
 *
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      var takesOneArg = R.nAry(1, takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only `n` arguments are passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.nAry(0, f)(a, b) = f()
 * @symb R.nAry(1, f)(a, b) = f(a)
 * @symb R.nAry(2, f)(a, b) = f(a, b)
 */


var nAry = /*#__PURE__*/_curry2(function nAry(n, fn) {
  switch (n) {
    case 0:
      return function () {
        return fn.call(this);
      };
    case 1:
      return function (a0) {
        return fn.call(this, a0);
      };
    case 2:
      return function (a0, a1) {
        return fn.call(this, a0, a1);
      };
    case 3:
      return function (a0, a1, a2) {
        return fn.call(this, a0, a1, a2);
      };
    case 4:
      return function (a0, a1, a2, a3) {
        return fn.call(this, a0, a1, a2, a3);
      };
    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.call(this, a0, a1, a2, a3, a4);
      };
    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.call(this, a0, a1, a2, a3, a4, a5);
      };
    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
      };
    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
      };
    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
      };
    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
      };
    default:
      throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
  }
});
module.exports = nAry;
},{"./internal/_curry2":110}],217:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Negates its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number}
 * @example
 *
 *      R.negate(42); //=> -42
 */


var negate = /*#__PURE__*/_curry1(function negate(n) {
  return -n;
});
module.exports = negate;
},{"./internal/_curry1":109}],218:[function(require,module,exports){
var _complement = /*#__PURE__*/require('./internal/_complement');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xany = /*#__PURE__*/require('./internal/_xany');

var any = /*#__PURE__*/require('./any');

/**
 * Returns `true` if no elements of the list match the predicate, `false`
 * otherwise.
 *
 * Dispatches to the `any` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.
 * @see R.all, R.any
 * @example
 *
 *      var isEven = n => n % 2 === 0;
 *      var isOdd = n => n % 2 === 1;
 *
 *      R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
 *      R.none(isOdd, [1, 3, 5, 7, 8, 11]); //=> false
 */


var none = /*#__PURE__*/_curry2( /*#__PURE__*/_complement( /*#__PURE__*/_dispatchable(['any'], _xany, any)));
module.exports = none;
},{"./any":15,"./internal/_complement":104,"./internal/_curry2":110,"./internal/_dispatchable":113,"./internal/_xany":148}],219:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig * -> Boolean
 * @param {*} a any value
 * @return {Boolean} the logical inverse of passed argument.
 * @see R.complement
 * @example
 *
 *      R.not(true); //=> false
 *      R.not(false); //=> true
 *      R.not(0); //=> true
 *      R.not(1); //=> false
 */


var not = /*#__PURE__*/_curry1(function not(a) {
  return !a;
});
module.exports = not;
},{"./internal/_curry1":109}],220:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isString = /*#__PURE__*/require('./internal/_isString');

/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> a | Undefined
 * @sig Number -> String -> String
 * @param {Number} offset
 * @param {*} list
 * @return {*}
 * @example
 *
 *      var list = ['foo', 'bar', 'baz', 'quux'];
 *      R.nth(1, list); //=> 'bar'
 *      R.nth(-1, list); //=> 'quux'
 *      R.nth(-99, list); //=> undefined
 *
 *      R.nth(2, 'abc'); //=> 'c'
 *      R.nth(3, 'abc'); //=> ''
 * @symb R.nth(-1, [a, b, c]) = c
 * @symb R.nth(0, [a, b, c]) = a
 * @symb R.nth(1, [a, b, c]) = b
 */


var nth = /*#__PURE__*/_curry2(function nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return _isString(list) ? list.charAt(idx) : list[idx];
});
module.exports = nth;
},{"./internal/_curry2":110,"./internal/_isString":133}],221:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var curryN = /*#__PURE__*/require('./curryN');

var nth = /*#__PURE__*/require('./nth');

/**
 * Returns a function which returns its nth argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig Number -> *... -> *
 * @param {Number} n
 * @return {Function}
 * @example
 *
 *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'
 *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
 * @symb R.nthArg(-1)(a, b, c) = c
 * @symb R.nthArg(0)(a, b, c) = a
 * @symb R.nthArg(1)(a, b, c) = b
 */


var nthArg = /*#__PURE__*/_curry1(function nthArg(n) {
  var arity = n < 0 ? 1 : n + 1;
  return curryN(arity, function () {
    return nth(n, arguments);
  });
});
module.exports = nthArg;
},{"./curryN":46,"./internal/_curry1":109,"./nth":220}],222:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * `o` is a curried composition function that returns a unary function.
 * Like [`compose`](#compose), `o` performs right-to-left function composition.
 * Unlike [`compose`](#compose), the rightmost function passed to `o` will be
 * invoked with only one argument.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (b -> c) -> (a -> b) -> a -> c
 * @param {Function} f
 * @param {Function} g
 * @return {Function}
 * @see R.compose, R.pipe
 * @example
 *
 *      var classyGreeting = name => "The name's " + name.last + ", " + name.first + " " + name.last
 *      var yellGreeting = R.o(R.toUpper, classyGreeting);
 *      yellGreeting({first: 'James', last: 'Bond'}); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.o(R.multiply(10), R.add(10))(-4) //=> 60
 *
 * @symb R.o(f, g, x) = f(g(x))
 */


var o = /*#__PURE__*/_curry3(function o(f, g, x) {
  return f(g(x));
});
module.exports = o;
},{"./internal/_curry3":111}],223:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates an object containing a single key:value pair.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @sig String -> a -> {String:a}
 * @param {String} key
 * @param {*} val
 * @return {Object}
 * @see R.pair
 * @example
 *
 *      var matchPhrases = R.compose(
 *        R.objOf('must'),
 *        R.map(R.objOf('match_phrase'))
 *      );
 *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
 */


var objOf = /*#__PURE__*/_curry2(function objOf(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
});
module.exports = objOf;
},{"./internal/_curry2":110}],224:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _of = /*#__PURE__*/require('./internal/_of');

/**
 * Returns a singleton array containing the value provided.
 *
 * Note this `of` is different from the ES6 `of`; See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> [a]
 * @param {*} x any value
 * @return {Array} An array wrapping `x`.
 * @example
 *
 *      R.of(null); //=> [null]
 *      R.of([42]); //=> [[42]]
 */


var of = /*#__PURE__*/_curry1(_of);
module.exports = of;
},{"./internal/_curry1":109,"./internal/_of":138}],225:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a partial copy of an object omitting the keys specified.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [String] -> {String: *} -> {String: *}
 * @param {Array} names an array of String property names to omit from the new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with properties from `names` not on it.
 * @see R.pick
 * @example
 *
 *      R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
 */


var omit = /*#__PURE__*/_curry2(function omit(names, obj) {
  var result = {};
  var index = {};
  var idx = 0;
  var len = names.length;

  while (idx < len) {
    index[names[idx]] = 1;
    idx += 1;
  }

  for (var prop in obj) {
    if (!index.hasOwnProperty(prop)) {
      result[prop] = obj[prop];
    }
  }
  return result;
});
module.exports = omit;
},{"./internal/_curry2":110}],226:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Accepts a function `fn` and returns a function that guards invocation of
 * `fn` such that `fn` can only ever be called once, no matter how many times
 * the returned function is invoked. The first value calculated is returned in
 * subsequent invocations.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a... -> b) -> (a... -> b)
 * @param {Function} fn The function to wrap in a call-only-once wrapper.
 * @return {Function} The wrapped function.
 * @example
 *
 *      var addOneOnce = R.once(x => x + 1);
 *      addOneOnce(10); //=> 11
 *      addOneOnce(addOneOnce(50)); //=> 11
 */


var once = /*#__PURE__*/_curry1(function once(fn) {
  var called = false;
  var result;
  return _arity(fn.length, function () {
    if (called) {
      return result;
    }
    called = true;
    result = fn.apply(this, arguments);
    return result;
  });
});
module.exports = once;
},{"./internal/_arity":98,"./internal/_curry1":109}],227:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if one or both of its arguments are `true`. Returns `false`
 * if both arguments are `false`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if truthy, otherwise the second argument.
 * @see R.either
 * @example
 *
 *      R.or(true, true); //=> true
 *      R.or(true, false); //=> true
 *      R.or(false, true); //=> true
 *      R.or(false, false); //=> false
 */


var or = /*#__PURE__*/_curry2(function or(a, b) {
  return a || b;
});
module.exports = or;
},{"./internal/_curry2":110}],228:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

// `Identity` is a functor that holds a single value, where `map` simply
// transforms the held value with the provided function.


var Identity = function (x) {
  return { value: x, map: function (f) {
      return Identity(f(x));
    } };
};

/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the result of applying the given function to
 * the focused value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> (a -> a) -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var headLens = R.lensIndex(0);
 *
 *      R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
 */
var over = /*#__PURE__*/_curry3(function over(lens, f, x) {
  // The value returned by the getter function is first transformed with `f`,
  // then set as the value of an `Identity`. This is then mapped over with the
  // setter function of the lens.
  return lens(function (y) {
    return Identity(f(y));
  })(x).value;
});
module.exports = over;
},{"./internal/_curry3":111}],229:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category List
 * @sig a -> b -> (a,b)
 * @param {*} fst
 * @param {*} snd
 * @return {Array}
 * @see R.objOf, R.of
 * @example
 *
 *      R.pair('foo', 'bar'); //=> ['foo', 'bar']
 */


var pair = /*#__PURE__*/_curry2(function pair(fst, snd) {
  return [fst, snd];
});
module.exports = pair;
},{"./internal/_curry2":110}],230:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _createPartialApplicator = /*#__PURE__*/require('./internal/_createPartialApplicator');

/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided initially followed by the arguments provided to `g`.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [a, b, c, ...] -> ((d, e, f, ..., n) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partialRight
 * @example
 *
 *      var multiply2 = (a, b) => a * b;
 *      var double = R.partial(multiply2, [2]);
 *      double(2); //=> 4
 *
 *      var greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      var sayHello = R.partial(greet, ['Hello']);
 *      var sayHelloToMs = R.partial(sayHello, ['Ms.']);
 *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partial(f, [a, b])(c, d) = f(a, b, c, d)
 */


var partial = /*#__PURE__*/_createPartialApplicator(_concat);
module.exports = partial;
},{"./internal/_concat":105,"./internal/_createPartialApplicator":108}],231:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _createPartialApplicator = /*#__PURE__*/require('./internal/_createPartialApplicator');

var flip = /*#__PURE__*/require('./flip');

/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided to `g` followed by the arguments provided initially.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [d, e, f, ..., n] -> ((a, b, c, ...) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partial
 * @example
 *
 *      var greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      var greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
 *
 *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partialRight(f, [a, b])(c, d) = f(c, d, a, b)
 */


var partialRight = /*#__PURE__*/_createPartialApplicator( /*#__PURE__*/flip(_concat));
module.exports = partialRight;
},{"./flip":74,"./internal/_concat":105,"./internal/_createPartialApplicator":108}],232:[function(require,module,exports){
var filter = /*#__PURE__*/require('./filter');

var juxt = /*#__PURE__*/require('./juxt');

var reject = /*#__PURE__*/require('./reject');

/**
 * Takes a predicate and a list or other `Filterable` object and returns the
 * pair of filterable objects of the same type of elements which do and do not
 * satisfy, the predicate, respectively. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> [f a, f a]
 * @param {Function} pred A predicate to determine which side the element belongs to.
 * @param {Array} filterable the list (or other filterable) to partition.
 * @return {Array} An array, containing first the subset of elements that satisfy the
 *         predicate, and second the subset of elements that do not satisfy.
 * @see R.filter, R.reject
 * @example
 *
 *      R.partition(R.contains('s'), ['sss', 'ttt', 'foo', 'bars']);
 *      // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
 *
 *      R.partition(R.contains('s'), { a: 'sss', b: 'ttt', foo: 'bars' });
 *      // => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
 */


var partition = /*#__PURE__*/juxt([filter, reject]);
module.exports = partition;
},{"./filter":68,"./juxt":178,"./reject":259}],233:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Retrieve the value at a given path.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> a | Undefined
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @see R.prop
 * @example
 *
 *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 */


var path = /*#__PURE__*/_curry2(function path(paths, obj) {
  var val = obj;
  var idx = 0;
  while (idx < paths.length) {
    if (val == null) {
      return;
    }
    val = val[paths[idx]];
    idx += 1;
  }
  return val;
});
module.exports = path;
},{"./internal/_curry2":110}],234:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var equals = /*#__PURE__*/require('./equals');

var path = /*#__PURE__*/require('./path');

/**
 * Determines whether a nested path on an object has a specific value, in
 * [`R.equals`](#equals) terms. Most likely used to filter a list.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Relation
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> Boolean
 * @param {Array} path The path of the nested property to use
 * @param {*} val The value to compare the nested property with
 * @param {Object} obj The object to check the nested property in
 * @return {Boolean} `true` if the value equals the nested object property,
 *         `false` otherwise.
 * @example
 *
 *      var user1 = { address: { zipCode: 90210 } };
 *      var user2 = { address: { zipCode: 55555 } };
 *      var user3 = { name: 'Bob' };
 *      var users = [ user1, user2, user3 ];
 *      var isFamous = R.pathEq(['address', 'zipCode'], 90210);
 *      R.filter(isFamous, users); //=> [ user1 ]
 */


var pathEq = /*#__PURE__*/_curry3(function pathEq(_path, val, obj) {
  return equals(path(_path, obj), val);
});
module.exports = pathEq;
},{"./equals":66,"./internal/_curry3":111,"./path":233}],235:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var defaultTo = /*#__PURE__*/require('./defaultTo');

var path = /*#__PURE__*/require('./path');

/**
 * If the given, non-null object has a value at the given path, returns the
 * value at that path. Otherwise returns the provided default value.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig a -> [Idx] -> {a} -> a
 * @param {*} d The default value.
 * @param {Array} p The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path` of the supplied object or the default value.
 * @example
 *
 *      R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
 */


var pathOr = /*#__PURE__*/_curry3(function pathOr(d, p, obj) {
  return defaultTo(d, path(p, obj));
});
module.exports = pathOr;
},{"./defaultTo":48,"./internal/_curry3":111,"./path":233}],236:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var path = /*#__PURE__*/require('./path');

/**
 * Returns `true` if the specified object property at given path satisfies the
 * given predicate; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Logic
 * @typedefn Idx = String | Int
 * @sig (a -> Boolean) -> [Idx] -> {a} -> Boolean
 * @param {Function} pred
 * @param {Array} propPath
 * @param {*} obj
 * @return {Boolean}
 * @see R.propSatisfies, R.path
 * @example
 *
 *      R.pathSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2}}); //=> true
 */


var pathSatisfies = /*#__PURE__*/_curry3(function pathSatisfies(pred, propPath, obj) {
  return propPath.length > 0 && pred(path(propPath, obj));
});
module.exports = pathSatisfies;
},{"./internal/_curry3":111,"./path":233}],237:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a partial copy of an object containing only the keys specified. If
 * the key does not exist, the property is ignored.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.omit, R.props
 * @example
 *
 *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
 */


var pick = /*#__PURE__*/_curry2(function pick(names, obj) {
  var result = {};
  var idx = 0;
  while (idx < names.length) {
    if (names[idx] in obj) {
      result[names[idx]] = obj[names[idx]];
    }
    idx += 1;
  }
  return result;
});
module.exports = pick;
},{"./internal/_curry2":110}],238:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Similar to `pick` except that this one includes a `key: undefined` pair for
 * properties that don't exist.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.pick
 * @example
 *
 *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
 */


var pickAll = /*#__PURE__*/_curry2(function pickAll(names, obj) {
  var result = {};
  var idx = 0;
  var len = names.length;
  while (idx < len) {
    var name = names[idx];
    result[name] = obj[name];
    idx += 1;
  }
  return result;
});
module.exports = pickAll;
},{"./internal/_curry2":110}],239:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a partial copy of an object containing only the keys that satisfy
 * the supplied predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig ((v, k) -> Boolean) -> {k: v} -> {k: v}
 * @param {Function} pred A predicate to determine whether or not a key
 *        should be included on the output object.
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties that satisfy `pred`
 *         on it.
 * @see R.pick, R.filter
 * @example
 *
 *      var isUpperCase = (val, key) => key.toUpperCase() === key;
 *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
 */


var pickBy = /*#__PURE__*/_curry2(function pickBy(test, obj) {
  var result = {};
  for (var prop in obj) {
    if (test(obj[prop], prop, obj)) {
      result[prop] = obj[prop];
    }
  }
  return result;
});
module.exports = pickBy;
},{"./internal/_curry2":110}],240:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _pipe = /*#__PURE__*/require('./internal/_pipe');

var reduce = /*#__PURE__*/require('./reduce');

var tail = /*#__PURE__*/require('./tail');

/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      var f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 */


function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }
  return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
}
module.exports = pipe;
},{"./internal/_arity":98,"./internal/_pipe":139,"./reduce":254,"./tail":280}],241:[function(require,module,exports){
var composeK = /*#__PURE__*/require('./composeK');

var reverse = /*#__PURE__*/require('./reverse');

/**
 * Returns the left-to-right Kleisli composition of the provided functions,
 * each of which must return a value of a type supported by [`chain`](#chain).
 *
 * `R.pipeK(f, g, h)` is equivalent to `R.pipe(f, R.chain(g), R.chain(h))`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Function
 * @sig Chain m => ((a -> m b), (b -> m c), ..., (y -> m z)) -> (a -> m z)
 * @param {...Function}
 * @return {Function}
 * @see R.composeK
 * @example
 *
 *      //  parseJson :: String -> Maybe *
 *      //  get :: String -> Object -> Maybe *
 *
 *      //  getStateCode :: Maybe String -> Maybe String
 *      var getStateCode = R.pipeK(
 *        parseJson,
 *        get('user'),
 *        get('address'),
 *        get('state'),
 *        R.compose(Maybe.of, R.toUpper)
 *      );
 *
 *      getStateCode('{"user":{"address":{"state":"ny"}}}');
 *      //=> Just('NY')
 *      getStateCode('[Invalid JSON]');
 *      //=> Nothing()
 * @symb R.pipeK(f, g, h)(a) = R.chain(h, R.chain(g, f(a)))
 */


function pipeK() {
  if (arguments.length === 0) {
    throw new Error('pipeK requires at least one argument');
  }
  return composeK.apply(this, reverse(arguments));
}
module.exports = pipeK;
},{"./composeK":36,"./reverse":263}],242:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _pipeP = /*#__PURE__*/require('./internal/_pipeP');

var reduce = /*#__PURE__*/require('./reduce');

var tail = /*#__PURE__*/require('./tail');

/**
 * Performs left-to-right composition of one or more Promise-returning
 * functions. The leftmost function may have any arity; the remaining functions
 * must be unary.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a -> Promise b), (b -> Promise c), ..., (y -> Promise z)) -> (a -> Promise z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.composeP
 * @example
 *
 *      //  followersForUser :: String -> Promise [User]
 *      var followersForUser = R.pipeP(db.getUserById, db.getFollowers);
 */


function pipeP() {
  if (arguments.length === 0) {
    throw new Error('pipeP requires at least one argument');
  }
  return _arity(arguments[0].length, reduce(_pipeP, arguments[0], tail(arguments)));
}
module.exports = pipeP;
},{"./internal/_arity":98,"./internal/_pipeP":140,"./reduce":254,"./tail":280}],243:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var map = /*#__PURE__*/require('./map');

var prop = /*#__PURE__*/require('./prop');

/**
 * Returns a new list by plucking the same named property off all objects in
 * the list supplied.
 *
 * `pluck` will work on
 * any [functor](https://github.com/fantasyland/fantasy-land#functor) in
 * addition to arrays, as it is equivalent to `R.map(R.prop(k), f)`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => k -> f {k: v} -> f v
 * @param {Number|String} key The key name to pluck off of each object.
 * @param {Array} f The array or functor to consider.
 * @return {Array} The list of values for the given key.
 * @see R.props
 * @example
 *
 *      R.pluck('a')([{a: 1}, {a: 2}]); //=> [1, 2]
 *      R.pluck(0)([[1, 2], [3, 4]]);   //=> [1, 3]
 *      R.pluck('val', {a: {val: 3}, b: {val: 5}}); //=> {a: 3, b: 5}
 * @symb R.pluck('x', [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}]) = [1, 3, 5]
 * @symb R.pluck(0, [[1, 2], [3, 4], [5, 6]]) = [1, 3, 5]
 */


var pluck = /*#__PURE__*/_curry2(function pluck(p, list) {
  return map(prop(p), list);
});
module.exports = pluck;
},{"./internal/_curry2":110,"./map":192,"./prop":247}],244:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a new list with the given element at the front, followed by the
 * contents of the list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The item to add to the head of the output list.
 * @param {Array} list The array to add to the tail of the output list.
 * @return {Array} A new array.
 * @see R.append
 * @example
 *
 *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
 */


var prepend = /*#__PURE__*/_curry2(function prepend(el, list) {
  return _concat([el], list);
});
module.exports = prepend;
},{"./internal/_concat":105,"./internal/_curry2":110}],245:[function(require,module,exports){
var multiply = /*#__PURE__*/require('./multiply');

var reduce = /*#__PURE__*/require('./reduce');

/**
 * Multiplies together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The product of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.product([2,4,6,8,100,1]); //=> 38400
 */


var product = /*#__PURE__*/reduce(multiply, 1);
module.exports = product;
},{"./multiply":215,"./reduce":254}],246:[function(require,module,exports){
var _map = /*#__PURE__*/require('./internal/_map');

var identity = /*#__PURE__*/require('./identity');

var pickAll = /*#__PURE__*/require('./pickAll');

var useWith = /*#__PURE__*/require('./useWith');

/**
 * Reasonable analog to SQL `select` statement.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @category Relation
 * @sig [k] -> [{k: v}] -> [{k: v}]
 * @param {Array} props The property names to project
 * @param {Array} objs The objects to query
 * @return {Array} An array of objects with just the `props` properties.
 * @example
 *
 *      var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
 *      var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
 *      var kids = [abby, fred];
 *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
 */


var project = /*#__PURE__*/useWith(_map, [pickAll, identity]); // passing `identity` gives correct arity
module.exports = project;
},{"./identity":86,"./internal/_map":136,"./pickAll":238,"./useWith":312}],247:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var path = /*#__PURE__*/require('./path');

/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig s -> {s: a} -> a | Undefined
 * @param {String} p The property name
 * @param {Object} obj The object to query
 * @return {*} The value at `obj.p`.
 * @see R.path
 * @example
 *
 *      R.prop('x', {x: 100}); //=> 100
 *      R.prop('x', {}); //=> undefined
 */

var prop = /*#__PURE__*/_curry2(function prop(p, obj) {
  return path([p], obj);
});
module.exports = prop;
},{"./internal/_curry2":110,"./path":233}],248:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var equals = /*#__PURE__*/require('./equals');

/**
 * Returns `true` if the specified object property is equal, in
 * [`R.equals`](#equals) terms, to the given value; `false` otherwise.
 * You can test multiple properties with [`R.where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig String -> a -> Object -> Boolean
 * @param {String} name
 * @param {*} val
 * @param {*} obj
 * @return {Boolean}
 * @see R.whereEq, R.propSatisfies, R.equals
 * @example
 *
 *      var abby = {name: 'Abby', age: 7, hair: 'blond'};
 *      var fred = {name: 'Fred', age: 12, hair: 'brown'};
 *      var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
 *      var alois = {name: 'Alois', age: 15, disposition: 'surly'};
 *      var kids = [abby, fred, rusty, alois];
 *      var hasBrownHair = R.propEq('hair', 'brown');
 *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
 */


var propEq = /*#__PURE__*/_curry3(function propEq(name, val, obj) {
  return equals(val, obj[name]);
});
module.exports = propEq;
},{"./equals":66,"./internal/_curry3":111}],249:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var is = /*#__PURE__*/require('./is');

/**
 * Returns `true` if the specified object property is of the given type;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Type
 * @sig Type -> String -> Object -> Boolean
 * @param {Function} type
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.is, R.propSatisfies
 * @example
 *
 *      R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
 *      R.propIs(Number, 'x', {x: 'foo'});    //=> false
 *      R.propIs(Number, 'x', {});            //=> false
 */


var propIs = /*#__PURE__*/_curry3(function propIs(type, name, obj) {
  return is(type, obj[name]);
});
module.exports = propIs;
},{"./internal/_curry3":111,"./is":174}],250:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _has = /*#__PURE__*/require('./internal/_has');

/**
 * If the given, non-null object has an own property with the specified name,
 * returns the value of that property. Otherwise returns the provided default
 * value.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Object
 * @sig a -> String -> Object -> a
 * @param {*} val The default value.
 * @param {String} p The name of the property to return.
 * @param {Object} obj The object to query.
 * @return {*} The value of given property of the supplied object or the default value.
 * @example
 *
 *      var alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      var favorite = R.prop('favoriteLibrary');
 *      var favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
 *
 *      favorite(alice);  //=> undefined
 *      favoriteWithDefault(alice);  //=> 'Ramda'
 */


var propOr = /*#__PURE__*/_curry3(function propOr(val, p, obj) {
  return obj != null && _has(p, obj) ? obj[p] : val;
});
module.exports = propOr;
},{"./internal/_curry3":111,"./internal/_has":121}],251:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Returns `true` if the specified object property satisfies the given
 * predicate; `false` otherwise. You can test multiple properties with
 * [`R.where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Logic
 * @sig (a -> Boolean) -> String -> {String: a} -> Boolean
 * @param {Function} pred
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.where, R.propEq, R.propIs
 * @example
 *
 *      R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
 */


var propSatisfies = /*#__PURE__*/_curry3(function propSatisfies(pred, name, obj) {
  return pred(obj[name]);
});
module.exports = propSatisfies;
},{"./internal/_curry3":111}],252:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Acts as multiple `prop`: array of keys in, array of values out. Preserves
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> [v]
 * @param {Array} ps The property names to fetch
 * @param {Object} obj The object to query
 * @return {Array} The corresponding values or partially applied function.
 * @example
 *
 *      R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
 *      R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
 *
 *      var fullName = R.compose(R.join(' '), R.props(['first', 'last']));
 *      fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
 */


var props = /*#__PURE__*/_curry2(function props(ps, obj) {
  var len = ps.length;
  var out = [];
  var idx = 0;

  while (idx < len) {
    out[idx] = obj[ps[idx]];
    idx += 1;
  }

  return out;
});
module.exports = props;
},{"./internal/_curry2":110}],253:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isNumber = /*#__PURE__*/require('./internal/_isNumber');

/**
 * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> Number -> [Number]
 * @param {Number} from The first number in the list.
 * @param {Number} to One more than the last number in the list.
 * @return {Array} The list of numbers in tthe set `[a, b)`.
 * @example
 *
 *      R.range(1, 5);    //=> [1, 2, 3, 4]
 *      R.range(50, 53);  //=> [50, 51, 52]
 */


var range = /*#__PURE__*/_curry2(function range(from, to) {
  if (!(_isNumber(from) && _isNumber(to))) {
    throw new TypeError('Both arguments to range must be numbers');
  }
  var result = [];
  var n = from;
  while (n < to) {
    result.push(n);
    n += 1;
  }
  return result;
});
module.exports = range;
},{"./internal/_curry2":110,"./internal/_isNumber":129}],254:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *      //          -               -10
 *      //         / \              / \
 *      //        -   4           -6   4
 *      //       / \              / \
 *      //      -   3   ==>     -3   3
 *      //     / \              / \
 *      //    -   2           -1   2
 *      //   / \              / \
 *      //  0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */


var reduce = /*#__PURE__*/_curry3(_reduce);
module.exports = reduce;
},{"./internal/_curry3":111,"./internal/_reduce":142}],255:[function(require,module,exports){
var _curryN = /*#__PURE__*/require('./internal/_curryN');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _has = /*#__PURE__*/require('./internal/_has');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var _xreduceBy = /*#__PURE__*/require('./internal/_xreduceBy');

/**
 * Groups the elements of the list according to the result of calling
 * the String-returning function `keyFn` on each element and reduces the elements
 * of each group to a single value via the reducer function `valueFn`.
 *
 * This function is basically a more general [`groupBy`](#groupBy) function.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category List
 * @sig ((a, b) -> a) -> a -> (b -> String) -> [b] -> {String: a}
 * @param {Function} valueFn The function that reduces the elements of each group to a single
 *        value. Receives two values, accumulator for a particular group and the current element.
 * @param {*} acc The (initial) accumulator value for each group.
 * @param {Function} keyFn The function that maps the list's element into a key.
 * @param {Array} list The array to group.
 * @return {Object} An object with the output of `keyFn` for keys, mapped to the output of
 *         `valueFn` for elements which produced that key when passed to `keyFn`.
 * @see R.groupBy, R.reduce
 * @example
 *
 *      var reduceToNamesBy = R.reduceBy((acc, student) => acc.concat(student.name), []);
 *      var namesByGrade = reduceToNamesBy(function(student) {
 *        var score = student.score;
 *        return score < 65 ? 'F' :
 *               score < 70 ? 'D' :
 *               score < 80 ? 'C' :
 *               score < 90 ? 'B' : 'A';
 *      });
 *      var students = [{name: 'Lucy', score: 92},
 *                      {name: 'Drew', score: 85},
 *                      // ...
 *                      {name: 'Bart', score: 62}];
 *      namesByGrade(students);
 *      // {
 *      //   'A': ['Lucy'],
 *      //   'B': ['Drew']
 *      //   // ...,
 *      //   'F': ['Bart']
 *      // }
 */


var reduceBy = /*#__PURE__*/_curryN(4, [], /*#__PURE__*/_dispatchable([], _xreduceBy, function reduceBy(valueFn, valueAcc, keyFn, list) {
  return _reduce(function (acc, elt) {
    var key = keyFn(elt);
    acc[key] = valueFn(_has(key, acc) ? acc[key] : valueAcc, elt);
    return acc;
  }, {}, list);
}));
module.exports = reduceBy;
},{"./internal/_curryN":112,"./internal/_dispatchable":113,"./internal/_has":121,"./internal/_reduce":142,"./internal/_xreduceBy":163}],256:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * Similar to [`reduce`](#reduce), except moves through the input list from the
 * right to the left.
 *
 * The iterator function receives two values: *(value, acc)*, while the arguments'
 * order of `reduce`'s iterator function is *(acc, value)*.
 *
 * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduceRight` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> b) -> b -> [a] -> b
 * @param {Function} fn The iterator function. Receives two values, the current element from the array
 *        and the accumulator.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.addIndex
 * @example
 *
 *      R.reduceRight(R.subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2
 *      //    -               -2
 *      //   / \              / \
 *      //  1   -            1   3
 *      //     / \              / \
 *      //    2   -     ==>    2  -1
 *      //       / \              / \
 *      //      3   -            3   4
 *      //         / \              / \
 *      //        4   0            4   0
 *
 * @symb R.reduceRight(f, a, [b, c, d]) = f(b, f(c, f(d, a)))
 */


var reduceRight = /*#__PURE__*/_curry3(function reduceRight(fn, acc, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    acc = fn(list[idx], acc);
    idx -= 1;
  }
  return acc;
});
module.exports = reduceRight;
},{"./internal/_curry3":111}],257:[function(require,module,exports){
var _curryN = /*#__PURE__*/require('./internal/_curryN');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var _reduced = /*#__PURE__*/require('./internal/_reduced');

/**
 * Like [`reduce`](#reduce), `reduceWhile` returns a single item by iterating
 * through the list, successively calling the iterator function. `reduceWhile`
 * also takes a predicate that is evaluated before each step. If the predicate
 * returns `false`, it "short-circuits" the iteration and returns the current
 * value of the accumulator.
 *
 * @func
 * @memberOf R
 * @since v0.22.0
 * @category List
 * @sig ((a, b) -> Boolean) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} pred The predicate. It is passed the accumulator and the
 *        current element.
 * @param {Function} fn The iterator function. Receives two values, the
 *        accumulator and the current element.
 * @param {*} a The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced
 * @example
 *
 *      var isOdd = (acc, x) => x % 2 === 1;
 *      var xs = [1, 3, 5, 60, 777, 800];
 *      R.reduceWhile(isOdd, R.add, 0, xs); //=> 9
 *
 *      var ys = [2, 4, 6]
 *      R.reduceWhile(isOdd, R.add, 111, ys); //=> 111
 */


var reduceWhile = /*#__PURE__*/_curryN(4, [], function _reduceWhile(pred, fn, a, list) {
  return _reduce(function (acc, x) {
    return pred(acc, x) ? fn(acc, x) : _reduced(acc);
  }, a, list);
});
module.exports = reduceWhile;
},{"./internal/_curryN":112,"./internal/_reduce":142,"./internal/_reduced":143}],258:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _reduced = /*#__PURE__*/require('./internal/_reduced');

/**
 * Returns a value wrapped to indicate that it is the final value of the reduce
 * and transduce functions. The returned value should be considered a black
 * box: the internal structure is not guaranteed to be stable.
 *
 * Note: this optimization is unavailable to functions not explicitly listed
 * above. For instance, it is not currently supported by
 * [`reduceRight`](#reduceRight).
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category List
 * @sig a -> *
 * @param {*} x The final value of the reduce.
 * @return {*} The wrapped value.
 * @see R.reduce, R.transduce
 * @example
 *
 *     R.reduce(
 *       (acc, item) => item > 3 ? R.reduced(acc) : acc.concat(item),
 *       [],
 *       [1, 2, 3, 4, 5]) // [1, 2, 3]
 */


var reduced = /*#__PURE__*/_curry1(_reduced);
module.exports = reduced;
},{"./internal/_curry1":109,"./internal/_reduced":143}],259:[function(require,module,exports){
var _complement = /*#__PURE__*/require('./internal/_complement');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var filter = /*#__PURE__*/require('./filter');

/**
 * The complement of [`filter`](#filter).
 *
 * Acts as a transducer if a transformer is given in list position. Filterable
 * objects include plain objects or any object that has a filter method such
 * as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.filter, R.transduce, R.addIndex
 * @example
 *
 *      var isOdd = (n) => n % 2 === 1;
 *
 *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */


var reject = /*#__PURE__*/_curry2(function reject(pred, filterable) {
  return filter(_complement(pred), filterable);
});
module.exports = reject;
},{"./filter":68,"./internal/_complement":104,"./internal/_curry2":110}],260:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Removes the sub-list of `list` starting at index `start` and containing
 * `count` elements. _Note that this is not destructive_: it returns a copy of
 * the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} start The position to start removing elements
 * @param {Number} count The number of elements to remove
 * @param {Array} list The list to remove from
 * @return {Array} A new Array with `count` elements from `start` removed.
 * @example
 *
 *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
 */


var remove = /*#__PURE__*/_curry3(function remove(start, count, list) {
  var result = Array.prototype.slice.call(list, 0);
  result.splice(start, count);
  return result;
});
module.exports = remove;
},{"./internal/_curry3":111}],261:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var always = /*#__PURE__*/require('./always');

var times = /*#__PURE__*/require('./times');

/**
 * Returns a fixed list of size `n` containing a specified identical value.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig a -> n -> [a]
 * @param {*} value The value to repeat.
 * @param {Number} n The desired size of the output list.
 * @return {Array} A new array containing `n` `value`s.
 * @see R.times
 * @example
 *
 *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
 *
 *      var obj = {};
 *      var repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
 *      repeatedObjs[0] === repeatedObjs[1]; //=> true
 * @symb R.repeat(a, 0) = []
 * @symb R.repeat(a, 1) = [a]
 * @symb R.repeat(a, 2) = [a, a]
 */


var repeat = /*#__PURE__*/_curry2(function repeat(value, n) {
  return times(always(value), n);
});
module.exports = repeat;
},{"./always":13,"./internal/_curry2":110,"./times":287}],262:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Replace a substring or regex match in a string with a replacement.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category String
 * @sig RegExp|String -> String -> String -> String
 * @param {RegExp|String} pattern A regular expression or a substring to match.
 * @param {String} replacement The string to replace the matches with.
 * @param {String} str The String to do the search and replacement in.
 * @return {String} The result.
 * @example
 *
 *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *
 *      // Use the "g" (global) flag to replace all occurrences:
 *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
 */


var replace = /*#__PURE__*/_curry3(function replace(regex, replacement, str) {
  return str.replace(regex, replacement);
});
module.exports = replace;
},{"./internal/_curry3":111}],263:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _isString = /*#__PURE__*/require('./internal/_isString');

/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */


var reverse = /*#__PURE__*/_curry1(function reverse(list) {
  return _isString(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
});
module.exports = reverse;
},{"./internal/_curry1":109,"./internal/_isString":133}],264:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Scan is similar to [`reduce`](#reduce), but returns a list of successively
 * reduced values from the left
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> [a]
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {Array} A list of all intermediately reduced values.
 * @see R.reduce
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
 * @symb R.scan(f, a, [b, c]) = [a, f(a, b), f(f(a, b), c)]
 */


var scan = /*#__PURE__*/_curry3(function scan(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [acc];
  while (idx < len) {
    acc = fn(acc, list[idx]);
    result[idx + 1] = acc;
    idx += 1;
  }
  return result;
});
module.exports = scan;
},{"./internal/_curry3":111}],265:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var ap = /*#__PURE__*/require('./ap');

var map = /*#__PURE__*/require('./map');

var prepend = /*#__PURE__*/require('./prepend');

var reduceRight = /*#__PURE__*/require('./reduceRight');

/**
 * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
 * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
 * Applicative of Traversable.
 *
 * Dispatches to the `sequence` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
 * @param {Function} of
 * @param {*} traversable
 * @return {*}
 * @see R.traverse
 * @example
 *
 *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
 *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
 *
 *      R.sequence(R.of, Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
 *      R.sequence(R.of, Nothing());       //=> [Nothing()]
 */


var sequence = /*#__PURE__*/_curry2(function sequence(of, traversable) {
  return typeof traversable.sequence === 'function' ? traversable.sequence(of) : reduceRight(function (x, acc) {
    return ap(map(prepend, x), acc);
  }, of([]), traversable);
});
module.exports = sequence;
},{"./ap":17,"./internal/_curry2":110,"./map":192,"./prepend":244,"./reduceRight":256}],266:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var always = /*#__PURE__*/require('./always');

var over = /*#__PURE__*/require('./over');

/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> a -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
 *      R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
 */


var set = /*#__PURE__*/_curry3(function set(lens, v, x) {
  return over(lens, always(v), x);
});
module.exports = set;
},{"./always":13,"./internal/_curry3":111,"./over":228}],267:[function(require,module,exports){
var _checkForMethod = /*#__PURE__*/require('./internal/_checkForMethod');

var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */


var slice = /*#__PURE__*/_curry3( /*#__PURE__*/_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));
module.exports = slice;
},{"./internal/_checkForMethod":101,"./internal/_curry3":111}],268:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a copy of the list, sorted according to the comparator function,
 * which should accept two values at a time and return a negative number if the
 * first value is smaller, a positive number if it's larger, and zero if they
 * are equal. Please note that this is a **copy** of the list. It does not
 * modify the original.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, a) -> Number) -> [a] -> [a]
 * @param {Function} comparator A sorting function :: a -> b -> Int
 * @param {Array} list The list to sort
 * @return {Array} a new array with its elements sorted by the comparator function.
 * @example
 *
 *      var diff = function(a, b) { return a - b; };
 *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
 */


var sort = /*#__PURE__*/_curry2(function sort(comparator, list) {
  return Array.prototype.slice.call(list, 0).sort(comparator);
});
module.exports = sort;
},{"./internal/_curry2":110}],269:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Sorts the list according to the supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord b => (a -> b) -> [a] -> [a]
 * @param {Function} fn
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted by the keys generated by `fn`.
 * @example
 *
 *      var sortByFirstItem = R.sortBy(R.prop(0));
 *      var sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
 *      var pairs = [[-1, 1], [-2, 2], [-3, 3]];
 *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
 *      var alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      var bob = {
 *        name: 'Bob',
 *        age: -10
 *      };
 *      var clara = {
 *        name: 'clara',
 *        age: 314.159
 *      };
 *      var people = [clara, bob, alice];
 *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
 */


var sortBy = /*#__PURE__*/_curry2(function sortBy(fn, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var aa = fn(a);
    var bb = fn(b);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });
});
module.exports = sortBy;
},{"./internal/_curry2":110}],270:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Sorts a list according to a list of comparators.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Relation
 * @sig [(a, a) -> Number] -> [a] -> [a]
 * @param {Array} functions A list of comparator functions.
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted according to the comarator functions.
 * @example
 *
 *      var alice = {
 *        name: 'alice',
 *        age: 40
 *      };
 *      var bob = {
 *        name: 'bob',
 *        age: 30
 *      };
 *      var clara = {
 *        name: 'clara',
 *        age: 40
 *      };
 *      var people = [clara, bob, alice];
 *      var ageNameSort = R.sortWith([
 *        R.descend(R.prop('age')),
 *        R.ascend(R.prop('name'))
 *      ]);
 *      ageNameSort(people); //=> [alice, clara, bob]
 */


var sortWith = /*#__PURE__*/_curry2(function sortWith(fns, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var result = 0;
    var i = 0;
    while (result === 0 && i < fns.length) {
      result = fns[i](a, b);
      i += 1;
    }
    return result;
  });
});
module.exports = sortWith;
},{"./internal/_curry2":110}],271:[function(require,module,exports){
var invoker = /*#__PURE__*/require('./invoker');

/**
 * Splits a string into an array of strings based on the given
 * separator.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig (String | RegExp) -> String -> [String]
 * @param {String|RegExp} sep The pattern.
 * @param {String} str The string to separate into an array.
 * @return {Array} The array of strings from `str` separated by `str`.
 * @see R.join
 * @example
 *
 *      var pathComponents = R.split('/');
 *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
 *
 *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
 */


var split = /*#__PURE__*/invoker(1, 'split');
module.exports = split;
},{"./invoker":173}],272:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var length = /*#__PURE__*/require('./length');

var slice = /*#__PURE__*/require('./slice');

/**
 * Splits a given list or string at a given index.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig Number -> [a] -> [[a], [a]]
 * @sig Number -> String -> [String, String]
 * @param {Number} index The index where the array/string is split.
 * @param {Array|String} array The array/string to be split.
 * @return {Array}
 * @example
 *
 *      R.splitAt(1, [1, 2, 3]);          //=> [[1], [2, 3]]
 *      R.splitAt(5, 'hello world');      //=> ['hello', ' world']
 *      R.splitAt(-1, 'foobar');          //=> ['fooba', 'r']
 */


var splitAt = /*#__PURE__*/_curry2(function splitAt(index, array) {
  return [slice(0, index, array), slice(index, length(array), array)];
});
module.exports = splitAt;
},{"./internal/_curry2":110,"./length":183,"./slice":267}],273:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var slice = /*#__PURE__*/require('./slice');

/**
 * Splits a collection into slices of the specified length.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @sig Number -> String -> [String]
 * @param {Number} n
 * @param {Array} list
 * @return {Array}
 * @example
 *
 *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
 *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
 */


var splitEvery = /*#__PURE__*/_curry2(function splitEvery(n, list) {
  if (n <= 0) {
    throw new Error('First argument to splitEvery must be a positive integer');
  }
  var result = [];
  var idx = 0;
  while (idx < list.length) {
    result.push(slice(idx, idx += n, list));
  }
  return result;
});
module.exports = splitEvery;
},{"./internal/_curry2":110,"./slice":267}],274:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Takes a list and a predicate and returns a pair of lists with the following properties:
 *
 *  - the result of concatenating the two output lists is equivalent to the input list;
 *  - none of the elements of the first output list satisfies the predicate; and
 *  - if the second output list is non-empty, its first element satisfies the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [[a], [a]]
 * @param {Function} pred The predicate that determines where the array is split.
 * @param {Array} list The array to be split.
 * @return {Array}
 * @example
 *
 *      R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]
 */


var splitWhen = /*#__PURE__*/_curry2(function splitWhen(pred, list) {
  var idx = 0;
  var len = list.length;
  var prefix = [];

  while (idx < len && !pred(list[idx])) {
    prefix.push(list[idx]);
    idx += 1;
  }

  return [prefix, Array.prototype.slice.call(list, idx)];
});
module.exports = splitWhen;
},{"./internal/_curry2":110}],275:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var equals = /*#__PURE__*/require('./equals');

var take = /*#__PURE__*/require('./take');

/**
 * Checks if a list starts with the provided values
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> Boolean
 * @sig String -> Boolean
 * @param {*} prefix
 * @param {*} list
 * @return {Boolean}
 * @example
 *
 *      R.startsWith('a', 'abc')                //=> true
 *      R.startsWith('b', 'abc')                //=> false
 *      R.startsWith(['a'], ['a', 'b', 'c'])    //=> true
 *      R.startsWith(['b'], ['a', 'b', 'c'])    //=> false
 */


var startsWith = /*#__PURE__*/_curry2(function (prefix, list) {
  return equals(take(prefix.length, list), prefix);
});
module.exports = startsWith;
},{"./equals":66,"./internal/_curry2":110,"./take":281}],276:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Subtracts its second argument from its first argument.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a - b`.
 * @see R.add
 * @example
 *
 *      R.subtract(10, 8); //=> 2
 *
 *      var minus5 = R.subtract(R.__, 5);
 *      minus5(17); //=> 12
 *
 *      var complementaryAngle = R.subtract(90);
 *      complementaryAngle(30); //=> 60
 *      complementaryAngle(72); //=> 18
 */


var subtract = /*#__PURE__*/_curry2(function subtract(a, b) {
  return Number(a) - Number(b);
});
module.exports = subtract;
},{"./internal/_curry2":110}],277:[function(require,module,exports){
var add = /*#__PURE__*/require('./add');

var reduce = /*#__PURE__*/require('./reduce');

/**
 * Adds together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The sum of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.sum([2,4,6,8,100,1]); //=> 121
 */


var sum = /*#__PURE__*/reduce(add, 0);
module.exports = sum;
},{"./add":8,"./reduce":254}],278:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var concat = /*#__PURE__*/require('./concat');

var difference = /*#__PURE__*/require('./difference');

/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifferenceWith, R.difference, R.differenceWith
 * @example
 *
 *      R.symmetricDifference([1,2,3,4], [7,6,5,4,3]); //=> [1,2,7,6,5]
 *      R.symmetricDifference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5,1,2]
 */


var symmetricDifference = /*#__PURE__*/_curry2(function symmetricDifference(list1, list2) {
  return concat(difference(list1, list2), difference(list2, list1));
});
module.exports = symmetricDifference;
},{"./concat":38,"./difference":50,"./internal/_curry2":110}],279:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var concat = /*#__PURE__*/require('./concat');

var differenceWith = /*#__PURE__*/require('./differenceWith');

/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both. Duplication is determined according to the value
 * returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifference, R.difference, R.differenceWith
 * @example
 *
 *      var eqA = R.eqBy(R.prop('a'));
 *      var l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
 *      var l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
 *      R.symmetricDifferenceWith(eqA, l1, l2); //=> [{a: 1}, {a: 2}, {a: 5}, {a: 6}]
 */


var symmetricDifferenceWith = /*#__PURE__*/_curry3(function symmetricDifferenceWith(pred, list1, list2) {
  return concat(differenceWith(pred, list1, list2), differenceWith(pred, list2, list1));
});
module.exports = symmetricDifferenceWith;
},{"./concat":38,"./differenceWith":51,"./internal/_curry3":111}],280:[function(require,module,exports){
var _checkForMethod = /*#__PURE__*/require('./internal/_checkForMethod');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var slice = /*#__PURE__*/require('./slice');

/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */


var tail = /*#__PURE__*/_curry1( /*#__PURE__*/_checkForMethod('tail', /*#__PURE__*/slice(1, Infinity)));
module.exports = tail;
},{"./internal/_checkForMethod":101,"./internal/_curry1":109,"./slice":267}],281:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xtake = /*#__PURE__*/require('./internal/_xtake');

var slice = /*#__PURE__*/require('./slice');

/**
 * Returns the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `take` method).
 *
 * Dispatches to the `take` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*}
 * @see R.drop
 * @example
 *
 *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(3, 'ramda');               //=> 'ram'
 *
 *      var personnel = [
 *        'Dave Brubeck',
 *        'Paul Desmond',
 *        'Eugene Wright',
 *        'Joe Morello',
 *        'Gerry Mulligan',
 *        'Bob Bates',
 *        'Joe Dodge',
 *        'Ron Crotty'
 *      ];
 *
 *      var takeFive = R.take(5);
 *      takeFive(personnel);
 *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
 * @symb R.take(-1, [a, b]) = [a, b]
 * @symb R.take(0, [a, b]) = []
 * @symb R.take(1, [a, b]) = [a]
 * @symb R.take(2, [a, b]) = [a, b]
 */


var take = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['take'], _xtake, function take(n, xs) {
  return slice(0, n < 0 ? Infinity : n, xs);
}));
module.exports = take;
},{"./internal/_curry2":110,"./internal/_dispatchable":113,"./internal/_xtake":164,"./slice":267}],282:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var drop = /*#__PURE__*/require('./drop');

/**
 * Returns a new list containing the last `n` elements of the given list.
 * If `n > list.length`, returns a list of `list.length` elements.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements to return.
 * @param {Array} xs The collection to consider.
 * @return {Array}
 * @see R.dropLast
 * @example
 *
 *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(3, 'ramda');               //=> 'mda'
 */


var takeLast = /*#__PURE__*/_curry2(function takeLast(n, xs) {
  return drop(n >= 0 ? xs.length - n : 0, xs);
});
module.exports = takeLast;
},{"./drop":55,"./internal/_curry2":110}],283:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var slice = /*#__PURE__*/require('./slice');

/**
 * Returns a new list containing the last `n` elements of a given list, passing
 * each value to the supplied predicate function, and terminating when the
 * predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropLastWhile, R.addIndex
 * @example
 *
 *      var isNotOne = x => x !== 1;
 *
 *      R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]
 *
 *      R.takeLastWhile(x => x !== 'R' , 'Ramda'); //=> 'amda'
 */


var takeLastWhile = /*#__PURE__*/_curry2(function takeLastWhile(fn, xs) {
  var idx = xs.length - 1;
  while (idx >= 0 && fn(xs[idx])) {
    idx -= 1;
  }
  return slice(idx + 1, Infinity, xs);
});
module.exports = takeLastWhile;
},{"./internal/_curry2":110,"./slice":267}],284:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xtakeWhile = /*#__PURE__*/require('./internal/_xtakeWhile');

var slice = /*#__PURE__*/require('./slice');

/**
 * Returns a new list containing the first `n` elements of a given list,
 * passing each value to the supplied predicate function, and terminating when
 * the predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * Dispatches to the `takeWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropWhile, R.transduce, R.addIndex
 * @example
 *
 *      var isNotFour = x => x !== 4;
 *
 *      R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]
 *
 *      R.takeWhile(x => x !== 'd' , 'Ramda'); //=> 'Ram'
 */


var takeWhile = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['takeWhile'], _xtakeWhile, function takeWhile(fn, xs) {
  var idx = 0;
  var len = xs.length;
  while (idx < len && fn(xs[idx])) {
    idx += 1;
  }
  return slice(0, idx, xs);
}));
module.exports = takeWhile;
},{"./internal/_curry2":110,"./internal/_dispatchable":113,"./internal/_xtakeWhile":165,"./slice":267}],285:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xtap = /*#__PURE__*/require('./internal/_xtap');

/**
 * Runs the given function with the supplied object, then returns the object.
 *
 * Acts as a transducer if a transformer is given as second parameter.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a -> *) -> a -> a
 * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
 * @param {*} x
 * @return {*} `x`.
 * @example
 *
 *      var sayX = x => console.log('x is ' + x);
 *      R.tap(sayX, 100); //=> 100
 *      // logs 'x is 100'
 * @symb R.tap(f, a) = a
 */


var tap = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xtap, function tap(fn, x) {
  fn(x);
  return x;
}));
module.exports = tap;
},{"./internal/_curry2":110,"./internal/_dispatchable":113,"./internal/_xtap":166}],286:[function(require,module,exports){
var _cloneRegExp = /*#__PURE__*/require('./internal/_cloneRegExp');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isRegExp = /*#__PURE__*/require('./internal/_isRegExp');

var toString = /*#__PURE__*/require('./toString');

/**
 * Determines whether a given string matches a given regular expression.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category String
 * @sig RegExp -> String -> Boolean
 * @param {RegExp} pattern
 * @param {String} str
 * @return {Boolean}
 * @see R.match
 * @example
 *
 *      R.test(/^x/, 'xyz'); //=> true
 *      R.test(/^y/, 'xyz'); //=> false
 */


var test = /*#__PURE__*/_curry2(function test(pattern, str) {
  if (!_isRegExp(pattern)) {
    throw new TypeError('‘test’ requires a value of type RegExp as its first argument; received ' + toString(pattern));
  }
  return _cloneRegExp(pattern).test(str);
});
module.exports = test;
},{"./internal/_cloneRegExp":103,"./internal/_curry2":110,"./internal/_isRegExp":132,"./toString":291}],287:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Calls an input function `n` times, returning an array containing the results
 * of those function calls.
 *
 * `fn` is passed one argument: The current value of `n`, which begins at `0`
 * and is gradually incremented to `n - 1`.
 *
 * @func
 * @memberOf R
 * @since v0.2.3
 * @category List
 * @sig (Number -> a) -> Number -> [a]
 * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
 * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
 * @return {Array} An array containing the return values of all calls to `fn`.
 * @see R.repeat
 * @example
 *
 *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
 * @symb R.times(f, 0) = []
 * @symb R.times(f, 1) = [f(0)]
 * @symb R.times(f, 2) = [f(0), f(1)]
 */


var times = /*#__PURE__*/_curry2(function times(fn, n) {
  var len = Number(n);
  var idx = 0;
  var list;

  if (len < 0 || isNaN(len)) {
    throw new RangeError('n must be a non-negative number');
  }
  list = new Array(len);
  while (idx < len) {
    list[idx] = fn(idx);
    idx += 1;
  }
  return list;
});
module.exports = times;
},{"./internal/_curry2":110}],288:[function(require,module,exports){
var invoker = /*#__PURE__*/require('./invoker');

/**
 * The lower case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to lower case.
 * @return {String} The lower case version of `str`.
 * @see R.toUpper
 * @example
 *
 *      R.toLower('XYZ'); //=> 'xyz'
 */


var toLower = /*#__PURE__*/invoker(0, 'toLowerCase');
module.exports = toLower;
},{"./invoker":173}],289:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _has = /*#__PURE__*/require('./internal/_has');

/**
 * Converts an object into an array of key, value arrays. Only the object's
 * own properties are used.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own properties.
 * @see R.fromPairs
 * @example
 *
 *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
 */


var toPairs = /*#__PURE__*/_curry1(function toPairs(obj) {
  var pairs = [];
  for (var prop in obj) {
    if (_has(prop, obj)) {
      pairs[pairs.length] = [prop, obj[prop]];
    }
  }
  return pairs;
});
module.exports = toPairs;
},{"./internal/_curry1":109,"./internal/_has":121}],290:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Converts an object into an array of key, value arrays. The object's own
 * properties and prototype properties are used. Note that the order of the
 * output array is not guaranteed to be consistent across different JS
 * platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own
 *         and prototype properties.
 * @example
 *
 *      var F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      var f = new F();
 *      R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
 */


var toPairsIn = /*#__PURE__*/_curry1(function toPairsIn(obj) {
  var pairs = [];
  for (var prop in obj) {
    pairs[pairs.length] = [prop, obj[prop]];
  }
  return pairs;
});
module.exports = toPairsIn;
},{"./internal/_curry1":109}],291:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _toString = /*#__PURE__*/require('./internal/_toString');

/**
 * Returns the string representation of the given value. `eval`'ing the output
 * should result in a value equivalent to the input value. Many of the built-in
 * `toString` methods do not satisfy this requirement.
 *
 * If the given value is an `[object Object]` with a `toString` method other
 * than `Object.prototype.toString`, this method is invoked with no arguments
 * to produce the return value. This means user-defined constructor functions
 * can provide a suitable `toString` method. For example:
 *
 *     function Point(x, y) {
 *       this.x = x;
 *       this.y = y;
 *     }
 *
 *     Point.prototype.toString = function() {
 *       return 'new Point(' + this.x + ', ' + this.y + ')';
 *     };
 *
 *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category String
 * @sig * -> String
 * @param {*} val
 * @return {String}
 * @example
 *
 *      R.toString(42); //=> '42'
 *      R.toString('abc'); //=> '"abc"'
 *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
 *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
 */


var toString = /*#__PURE__*/_curry1(function toString(val) {
  return _toString(val, []);
});
module.exports = toString;
},{"./internal/_curry1":109,"./internal/_toString":146}],292:[function(require,module,exports){
var invoker = /*#__PURE__*/require('./invoker');

/**
 * The upper case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to upper case.
 * @return {String} The upper case version of `str`.
 * @see R.toLower
 * @example
 *
 *      R.toUpper('abc'); //=> 'ABC'
 */


var toUpper = /*#__PURE__*/invoker(0, 'toUpperCase');
module.exports = toUpper;
},{"./invoker":173}],293:[function(require,module,exports){
var _reduce = /*#__PURE__*/require('./internal/_reduce');

var _xwrap = /*#__PURE__*/require('./internal/_xwrap');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Initializes a transducer using supplied iterator function. Returns a single
 * item by iterating through the list, successively calling the transformed
 * iterator function and passing it an accumulator value and the current value
 * from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It will be
 * wrapped as a transformer to initialize the transducer. A transformer can be
 * passed directly in place of an iterator function. In both cases, iteration
 * may be stopped early with the [`R.reduced`](#reduced) function.
 *
 * A transducer is a function that accepts a transformer and returns a
 * transformer and can be composed directly.
 *
 * A transformer is an an object that provides a 2-arity reducing iterator
 * function, step, 0-arity initial value function, init, and 1-arity result
 * extraction function, result. The step function is used as the iterator
 * function in reduce. The result function is used to convert the final
 * accumulator into the return type and in most cases is
 * [`R.identity`](#identity). The init function can be used to provide an
 * initial accumulator, but is ignored by transduce.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (c -> c) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array. Wrapped as transformer, if necessary, and used to
 *        initialize the transducer
 * @param {*} acc The initial accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced, R.into
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
 *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
 *
 *      var isOdd = (x) => x % 2 === 1;
 *      var firstOddTransducer = R.compose(R.filter(isOdd), R.take(1));
 *      R.transduce(firstOddTransducer, R.flip(R.append), [], R.range(0, 100)); //=> [1]
 */


var transduce = /*#__PURE__*/curryN(4, function transduce(xf, fn, acc, list) {
  return _reduce(xf(typeof fn === 'function' ? _xwrap(fn) : fn), acc, list);
});
module.exports = transduce;
},{"./curryN":46,"./internal/_reduce":142,"./internal/_xwrap":167}],294:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Transposes the rows and columns of a 2D list.
 * When passed a list of `n` lists of length `x`,
 * returns a list of `x` lists of length `n`.
 *
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [[a]] -> [[a]]
 * @param {Array} list A 2D list
 * @return {Array} A 2D list
 * @example
 *
 *      R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]) //=> [[1, 2, 3], ['a', 'b', 'c']]
 *      R.transpose([[1, 2, 3], ['a', 'b', 'c']]) //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 *
 *      // If some of the rows are shorter than the following rows, their elements are skipped:
 *      R.transpose([[10, 11], [20], [], [30, 31, 32]]) //=> [[10, 20, 30], [11, 31], [32]]
 * @symb R.transpose([[a], [b], [c]]) = [a, b, c]
 * @symb R.transpose([[a, b], [c, d]]) = [[a, c], [b, d]]
 * @symb R.transpose([[a, b], [c]]) = [[a, c], [b]]
 */


var transpose = /*#__PURE__*/_curry1(function transpose(outerlist) {
  var i = 0;
  var result = [];
  while (i < outerlist.length) {
    var innerlist = outerlist[i];
    var j = 0;
    while (j < innerlist.length) {
      if (typeof result[j] === 'undefined') {
        result[j] = [];
      }
      result[j].push(innerlist[j]);
      j += 1;
    }
    i += 1;
  }
  return result;
});
module.exports = transpose;
},{"./internal/_curry1":109}],295:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var map = /*#__PURE__*/require('./map');

var sequence = /*#__PURE__*/require('./sequence');

/**
 * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 *
 * Dispatches to the `traverse` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> (a -> f b) -> t a -> f (t b)
 * @param {Function} of
 * @param {Function} f
 * @param {*} traversable
 * @return {*}
 * @see R.sequence
 * @example
 *
 *      // Returns `Nothing` if the given divisor is `0`
 *      safeDiv = n => d => d === 0 ? Nothing() : Just(n / d)
 *
 *      R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Just([5, 2.5, 2])
 *      R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Nothing
 */


var traverse = /*#__PURE__*/_curry3(function traverse(of, f, traversable) {
  return typeof traversable['fantasy-land/traverse'] === 'function' ? traversable['fantasy-land/traverse'](f, of) : sequence(of, map(f, traversable));
});
module.exports = traverse;
},{"./internal/_curry3":111,"./map":192,"./sequence":265}],296:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + '\u2029\uFEFF';
var zeroWidth = '\u200b';
var hasProtoTrim = typeof String.prototype.trim === 'function';
/**
 * Removes (strips) whitespace from both ends of the string.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to trim.
 * @return {String} Trimmed version of `str`.
 * @example
 *
 *      R.trim('   xyz  '); //=> 'xyz'
 *      R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
 */
var _trim = !hasProtoTrim || /*#__PURE__*/ws.trim() || ! /*#__PURE__*/zeroWidth.trim() ? function trim(str) {
  var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
  var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
  return str.replace(beginRx, '').replace(endRx, '');
} : function trim(str) {
  return str.trim();
};
var trim = /*#__PURE__*/_curry1(_trim);
module.exports = trim;
},{"./internal/_curry1":109}],297:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * `tryCatch` takes two functions, a `tryer` and a `catcher`. The returned
 * function evaluates the `tryer`; if it does not throw, it simply returns the
 * result. If the `tryer` *does* throw, the returned function evaluates the
 * `catcher` function and returns its result. Note that for effective
 * composition with this function, both the `tryer` and `catcher` functions
 * must return the same type of results.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig (...x -> a) -> ((e, ...x) -> a) -> (...x -> a)
 * @param {Function} tryer The function that may throw.
 * @param {Function} catcher The function that will be evaluated if `tryer` throws.
 * @return {Function} A new function that will catch exceptions and send then to the catcher.
 * @example
 *
 *      R.tryCatch(R.prop('x'), R.F)({x: true}); //=> true
 *      R.tryCatch(R.prop('x'), R.F)(null);      //=> false
 */


var tryCatch = /*#__PURE__*/_curry2(function _tryCatch(tryer, catcher) {
  return _arity(tryer.length, function () {
    try {
      return tryer.apply(this, arguments);
    } catch (e) {
      return catcher.apply(this, _concat([e], arguments));
    }
  });
});
module.exports = tryCatch;
},{"./internal/_arity":98,"./internal/_concat":105,"./internal/_curry2":110}],298:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 *      R.type(() => {}); //=> "Function"
 *      R.type(undefined); //=> "Undefined"
 */


var type = /*#__PURE__*/_curry1(function type(val) {
  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
});
module.exports = type;
},{"./internal/_curry1":109}],299:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Takes a function `fn`, which takes a single array argument, and returns a
 * function which:
 *
 *   - takes any number of positional arguments;
 *   - passes these arguments to `fn` as an array; and
 *   - returns the result.
 *
 * In other words, `R.unapply` derives a variadic function from a function which
 * takes an array. `R.unapply` is the inverse of [`R.apply`](#apply).
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Function
 * @sig ([*...] -> a) -> (*... -> a)
 * @param {Function} fn
 * @return {Function}
 * @see R.apply
 * @example
 *
 *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
 * @symb R.unapply(f)(a, b) = f([a, b])
 */


var unapply = /*#__PURE__*/_curry1(function unapply(fn) {
  return function () {
    return fn(Array.prototype.slice.call(arguments, 0));
  };
});
module.exports = unapply;
},{"./internal/_curry1":109}],300:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var nAry = /*#__PURE__*/require('./nAry');

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 1 parameter. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (* -> b) -> (a -> b)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 1.
 * @see R.binary, R.nAry
 * @example
 *
 *      var takesTwoArgs = function(a, b) {
 *        return [a, b];
 *      };
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      var takesOneArg = R.unary(takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only 1 argument is passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.unary(f)(a, b, c) = f(a)
 */


var unary = /*#__PURE__*/_curry1(function unary(fn) {
  return nAry(1, fn);
});
module.exports = unary;
},{"./internal/_curry1":109,"./nAry":216}],301:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Returns a function of arity `n` from a (manually) curried function.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Function
 * @sig Number -> (a -> b) -> (a -> c)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to uncurry.
 * @return {Function} A new function.
 * @see R.curry
 * @example
 *
 *      var addFour = a => b => c => d => a + b + c + d;
 *
 *      var uncurriedAddFour = R.uncurryN(4, addFour);
 *      uncurriedAddFour(1, 2, 3, 4); //=> 10
 */


var uncurryN = /*#__PURE__*/_curry2(function uncurryN(depth, fn) {
  return curryN(depth, function () {
    var currentDepth = 1;
    var value = fn;
    var idx = 0;
    var endIdx;
    while (currentDepth <= depth && typeof value === 'function') {
      endIdx = currentDepth === depth ? arguments.length : idx + value.length;
      value = value.apply(this, Array.prototype.slice.call(arguments, idx, endIdx));
      currentDepth += 1;
      idx = endIdx;
    }
    return value;
  });
});
module.exports = uncurryN;
},{"./curryN":46,"./internal/_curry2":110}],302:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Builds a list from a seed value. Accepts an iterator function, which returns
 * either false to stop iteration or an array of length 2 containing the value
 * to add to the resulting list and the seed to be used in the next call to the
 * iterator function.
 *
 * The iterator function receives one argument: *(seed)*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig (a -> [b]) -> * -> [b]
 * @param {Function} fn The iterator function. receives one argument, `seed`, and returns
 *        either false to quit iteration or an array of length two to proceed. The element
 *        at index 0 of this array will be added to the resulting array, and the element
 *        at index 1 will be passed to the next call to `fn`.
 * @param {*} seed The seed value.
 * @return {Array} The final list.
 * @example
 *
 *      var f = n => n > 50 ? false : [-n, n + 10];
 *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
 * @symb R.unfold(f, x) = [f(x)[0], f(f(x)[1])[0], f(f(f(x)[1])[1])[0], ...]
 */


var unfold = /*#__PURE__*/_curry2(function unfold(fn, seed) {
  var pair = fn(seed);
  var result = [];
  while (pair && pair.length) {
    result[result.length] = pair[0];
    pair = fn(pair[1]);
  }
  return result;
});
module.exports = unfold;
},{"./internal/_curry2":110}],303:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var compose = /*#__PURE__*/require('./compose');

var uniq = /*#__PURE__*/require('./uniq');

/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @example
 *
 *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
 */


var union = /*#__PURE__*/_curry2( /*#__PURE__*/compose(uniq, _concat));
module.exports = union;
},{"./compose":35,"./internal/_concat":105,"./internal/_curry2":110,"./uniq":305}],304:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var uniqWith = /*#__PURE__*/require('./uniqWith');

/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list. Duplication is determined according to the value returned by
 * applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [*] -> [*] -> [*]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @see R.union
 * @example
 *
 *      var l1 = [{a: 1}, {a: 2}];
 *      var l2 = [{a: 1}, {a: 4}];
 *      R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
 */


var unionWith = /*#__PURE__*/_curry3(function unionWith(pred, list1, list2) {
  return uniqWith(pred, _concat(list1, list2));
});
module.exports = unionWith;
},{"./internal/_concat":105,"./internal/_curry3":111,"./uniqWith":307}],305:[function(require,module,exports){
var identity = /*#__PURE__*/require('./identity');

var uniqBy = /*#__PURE__*/require('./uniqBy');

/**
 * Returns a new list containing only one copy of each element in the original
 * list. [`R.equals`](#equals) is used to determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
 *      R.uniq([1, '1']);     //=> [1, '1']
 *      R.uniq([[42], [42]]); //=> [[42]]
 */


var uniq = /*#__PURE__*/uniqBy(identity);
module.exports = uniq;
},{"./identity":86,"./uniqBy":306}],306:[function(require,module,exports){
var _Set = /*#__PURE__*/require('./internal/_Set');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to
 * each list element. Prefers the first item if the supplied function produces
 * the same value on two items. [`R.equals`](#equals) is used for comparison.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> b) -> [a] -> [a]
 * @param {Function} fn A function used to produce a value to use during comparisons.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
 */


var uniqBy = /*#__PURE__*/_curry2(function uniqBy(fn, list) {
  var set = new _Set();
  var result = [];
  var idx = 0;
  var appliedItem, item;

  while (idx < list.length) {
    item = list[idx];
    appliedItem = fn(item);
    if (set.add(appliedItem)) {
      result.push(item);
    }
    idx += 1;
  }
  return result;
});
module.exports = uniqBy;
},{"./internal/_Set":96,"./internal/_curry2":110}],307:[function(require,module,exports){
var _containsWith = /*#__PURE__*/require('./internal/_containsWith');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied predicate to
 * two list elements. Prefers the first item if two items compare equal based
 * on the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category List
 * @sig ((a, a) -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      var strEq = R.eqBy(String);
 *      R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
 *      R.uniqWith(strEq)([{}, {}]);       //=> [{}]
 *      R.uniqWith(strEq)([1, '1', 1]);    //=> [1]
 *      R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']
 */


var uniqWith = /*#__PURE__*/_curry2(function uniqWith(pred, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var item;
  while (idx < len) {
    item = list[idx];
    if (!_containsWith(pred, item, result)) {
      result[result.length] = item;
    }
    idx += 1;
  }
  return result;
});
module.exports = uniqWith;
},{"./internal/_containsWith":107,"./internal/_curry2":110}],308:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is not satisfied, the function will return the result of
 * calling the `whenFalseFn` function with the same argument. If the predicate
 * is satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred        A predicate function
 * @param {Function} whenFalseFn A function to invoke when the `pred` evaluates
 *                               to a falsy value.
 * @param {*}        x           An object to test with the `pred` function and
 *                               pass to `whenFalseFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenFalseFn`.
 * @see R.ifElse, R.when
 * @example
 *
 *      let safeInc = R.unless(R.isNil, R.inc);
 *      safeInc(null); //=> null
 *      safeInc(1); //=> 2
 */


var unless = /*#__PURE__*/_curry3(function unless(pred, whenFalseFn, x) {
  return pred(x) ? x : whenFalseFn(x);
});
module.exports = unless;
},{"./internal/_curry3":111}],309:[function(require,module,exports){
var _identity = /*#__PURE__*/require('./internal/_identity');

var chain = /*#__PURE__*/require('./chain');

/**
 * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from
 * any [Chain](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain c => c (c a) -> c a
 * @param {*} list
 * @return {*}
 * @see R.flatten, R.chain
 * @example
 *
 *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
 *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
 */


var unnest = /*#__PURE__*/chain(_identity);
module.exports = unnest;
},{"./chain":30,"./internal/_identity":122}],310:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Takes a predicate, a transformation function, and an initial value,
 * and returns a value of the same type as the initial value.
 * It does so by applying the transformation until the predicate is satisfied,
 * at which point it returns the satisfactory value.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred A predicate function
 * @param {Function} fn The iterator function
 * @param {*} init Initial value
 * @return {*} Final value that satisfies predicate
 * @example
 *
 *      R.until(R.gt(R.__, 100), R.multiply(2))(1) // => 128
 */


var until = /*#__PURE__*/_curry3(function until(pred, fn, init) {
  var val = init;
  while (!pred(val)) {
    val = fn(val);
  }
  return val;
});
module.exports = until;
},{"./internal/_curry3":111}],311:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var adjust = /*#__PURE__*/require('./adjust');

var always = /*#__PURE__*/require('./always');

/**
 * Returns a new copy of the array with the element at the provided index
 * replaced with the given value.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} idx The index to update.
 * @param {*} x The value to exist at the given index of the returned array.
 * @param {Array|Arguments} list The source array-like object to be updated.
 * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.
 * @see R.adjust
 * @example
 *
 *      R.update(1, 11, [0, 1, 2]);     //=> [0, 11, 2]
 *      R.update(1)(11)([0, 1, 2]);     //=> [0, 11, 2]
 * @symb R.update(-1, a, [b, c]) = [b, a]
 * @symb R.update(0, a, [b, c]) = [a, c]
 * @symb R.update(1, a, [b, c]) = [b, a]
 */


var update = /*#__PURE__*/_curry3(function update(idx, x, list) {
  return adjust(always(x), idx, list);
});
module.exports = update;
},{"./adjust":10,"./always":13,"./internal/_curry3":111}],312:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Accepts a function `fn` and a list of transformer functions and returns a
 * new curried function. When the new function is invoked, it calls the
 * function `fn` with parameters consisting of the result of calling each
 * supplied handler on successive arguments to the new function.
 *
 * If more arguments are passed to the returned function than transformer
 * functions, those arguments are passed directly to `fn` as additional
 * parameters. If you expect additional arguments that don't need to be
 * transformed, although you can ignore them, it's best to pass an identity
 * function so that the new function reports the correct arity.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} fn The function to wrap.
 * @param {Array} transformers A list of transformer functions
 * @return {Function} The wrapped function.
 * @see R.converge
 * @example
 *
 *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
 *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
 *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
 *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
 * @symb R.useWith(f, [g, h])(a, b) = f(g(a), h(b))
 */


var useWith = /*#__PURE__*/_curry2(function useWith(fn, transformers) {
  return curryN(transformers.length, function () {
    var args = [];
    var idx = 0;
    while (idx < transformers.length) {
      args.push(transformers[idx].call(this, arguments[idx]));
      idx += 1;
    }
    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, transformers.length)));
  });
});
module.exports = useWith;
},{"./curryN":46,"./internal/_curry2":110}],313:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var keys = /*#__PURE__*/require('./keys');

/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own properties.
 * @see R.valuesIn, R.keys
 * @example
 *
 *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 */


var values = /*#__PURE__*/_curry1(function values(obj) {
  var props = keys(obj);
  var len = props.length;
  var vals = [];
  var idx = 0;
  while (idx < len) {
    vals[idx] = obj[props[idx]];
    idx += 1;
  }
  return vals;
});
module.exports = values;
},{"./internal/_curry1":109,"./keys":179}],314:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Returns a list of all the properties, including prototype properties, of the
 * supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own and prototype properties.
 * @see R.values, R.keysIn
 * @example
 *
 *      var F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      var f = new F();
 *      R.valuesIn(f); //=> ['X', 'Y']
 */


var valuesIn = /*#__PURE__*/_curry1(function valuesIn(obj) {
  var prop;
  var vs = [];
  for (prop in obj) {
    vs[vs.length] = obj[prop];
  }
  return vs;
});
module.exports = valuesIn;
},{"./internal/_curry1":109}],315:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

// `Const` is a functor that effectively ignores the function given to `map`.


var Const = function (x) {
  return { value: x, 'fantasy-land/map': function () {
      return this;
    } };
};

/**
 * Returns a "view" of the given data structure, determined by the given lens.
 * The lens's focus determines which portion of the data structure is visible.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> s -> a
 * @param {Lens} lens
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});  //=> 1
 *      R.view(xLens, {x: 4, y: 2});  //=> 4
 */
var view = /*#__PURE__*/_curry2(function view(lens, x) {
  // Using `Const` effectively ignores the setter function of the `lens`,
  // leaving the value returned by the getter function unmodified.
  return lens(Const)(x).value;
});
module.exports = view;
},{"./internal/_curry2":110}],316:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is satisfied, the function will return the result of calling
 * the `whenTrueFn` function with the same argument. If the predicate is not
 * satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred       A predicate function
 * @param {Function} whenTrueFn A function to invoke when the `condition`
 *                              evaluates to a truthy value.
 * @param {*}        x          An object to test with the `pred` function and
 *                              pass to `whenTrueFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenTrueFn`.
 * @see R.ifElse, R.unless
 * @example
 *
 *      // truncate :: String -> String
 *      var truncate = R.when(
 *        R.propSatisfies(R.gt(R.__, 10), 'length'),
 *        R.pipe(R.take(10), R.append('…'), R.join(''))
 *      );
 *      truncate('12345');         //=> '12345'
 *      truncate('0123456789ABC'); //=> '0123456789…'
 */


var when = /*#__PURE__*/_curry3(function when(pred, whenTrueFn, x) {
  return pred(x) ? whenTrueFn(x) : x;
});
module.exports = when;
},{"./internal/_curry3":111}],317:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _has = /*#__PURE__*/require('./internal/_has');

/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec. Each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `where` returns true if all the predicates return true, false
 * otherwise.
 *
 * `where` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Object
 * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propSatisfies, R.whereEq
 * @example
 *
 *      // pred :: Object -> Boolean
 *      var pred = R.where({
 *        a: R.equals('foo'),
 *        b: R.complement(R.equals('bar')),
 *        x: R.gt(R.__, 10),
 *        y: R.lt(R.__, 20)
 *      });
 *
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
 *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
 */


var where = /*#__PURE__*/_curry2(function where(spec, testObj) {
  for (var prop in spec) {
    if (_has(prop, spec) && !spec[prop](testObj[prop])) {
      return false;
    }
  }
  return true;
});
module.exports = where;
},{"./internal/_curry2":110,"./internal/_has":121}],318:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var equals = /*#__PURE__*/require('./equals');

var map = /*#__PURE__*/require('./map');

var where = /*#__PURE__*/require('./where');

/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec, false otherwise. An object satisfies the spec if, for each of the
 * spec's own properties, accessing that property of the object gives the same
 * value (in [`R.equals`](#equals) terms) as accessing that property of the
 * spec.
 *
 * `whereEq` is a specialization of [`where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @sig {String: *} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propEq, R.where
 * @example
 *
 *      // pred :: Object -> Boolean
 *      var pred = R.whereEq({a: 1, b: 2});
 *
 *      pred({a: 1});              //=> false
 *      pred({a: 1, b: 2});        //=> true
 *      pred({a: 1, b: 2, c: 3});  //=> true
 *      pred({a: 1, b: 1});        //=> false
 */


var whereEq = /*#__PURE__*/_curry2(function whereEq(spec, testObj) {
  return where(map(equals, spec), testObj);
});
module.exports = whereEq;
},{"./equals":66,"./internal/_curry2":110,"./map":192,"./where":317}],319:[function(require,module,exports){
var _contains = /*#__PURE__*/require('./internal/_contains');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var flip = /*#__PURE__*/require('./flip');

var reject = /*#__PURE__*/require('./reject');

/**
 * Returns a new list without values in the first argument.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @param {Array} list1 The values to be removed from `list2`.
 * @param {Array} list2 The array to remove values from.
 * @return {Array} The new array without values in `list1`.
 * @see R.transduce, R.difference
 * @example
 *
 *      R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
 */


var without = /*#__PURE__*/_curry2(function (xs, list) {
  return reject(flip(_contains)(xs), list);
});
module.exports = without;
},{"./flip":74,"./internal/_contains":106,"./internal/_curry2":110,"./reject":259}],320:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates a new list out of the two supplied by creating each possible pair
 * from the lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The list made by combining each possible pair from
 *         `as` and `bs` into pairs (`[a, b]`).
 * @example
 *
 *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 * @symb R.xprod([a, b], [c, d]) = [[a, c], [a, d], [b, c], [b, d]]
 */


var xprod = /*#__PURE__*/_curry2(function xprod(a, b) {
  // = xprodWith(prepend); (takes about 3 times as long...)
  var idx = 0;
  var ilen = a.length;
  var j;
  var jlen = b.length;
  var result = [];
  while (idx < ilen) {
    j = 0;
    while (j < jlen) {
      result[result.length] = [a[idx], b[j]];
      j += 1;
    }
    idx += 1;
  }
  return result;
});
module.exports = xprod;
},{"./internal/_curry2":110}],321:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates a new list out of the two supplied by pairing up equally-positioned
 * items from both lists. The returned list is truncated to the length of the
 * shorter of the two input lists.
 * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.
 * @example
 *
 *      R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 * @symb R.zip([a, b, c], [d, e, f]) = [[a, d], [b, e], [c, f]]
 */


var zip = /*#__PURE__*/_curry2(function zip(a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);
  while (idx < len) {
    rv[idx] = [a[idx], b[idx]];
    idx += 1;
  }
  return rv;
});
module.exports = zip;
},{"./internal/_curry2":110}],322:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates a new object out of a list of keys and a list of values.
 * Key/value pairing is truncated to the length of the shorter of the two lists.
 * Note: `zipObj` is equivalent to `pipe(zip, fromPairs)`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [String] -> [*] -> {String: *}
 * @param {Array} keys The array that will be properties on the output object.
 * @param {Array} values The list of values on the output object.
 * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
 * @example
 *
 *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
 */


var zipObj = /*#__PURE__*/_curry2(function zipObj(keys, values) {
  var idx = 0;
  var len = Math.min(keys.length, values.length);
  var out = {};
  while (idx < len) {
    out[keys[idx]] = values[idx];
    idx += 1;
  }
  return out;
});
module.exports = zipObj;
},{"./internal/_curry2":110}],323:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Creates a new list out of the two supplied by applying the function to each
 * equally-positioned pair in the lists. The returned list is truncated to the
 * length of the shorter of the two input lists.
 *
 * @function
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> c) -> [a] -> [b] -> [c]
 * @param {Function} fn The function used to combine the two elements into one value.
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by combining same-indexed elements of `list1` and `list2`
 *         using `fn`.
 * @example
 *
 *      var f = (x, y) => {
 *        // ...
 *      };
 *      R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
 *      //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
 * @symb R.zipWith(fn, [a, b, c], [d, e, f]) = [fn(a, d), fn(b, e), fn(c, f)]
 */


var zipWith = /*#__PURE__*/_curry3(function zipWith(fn, a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);
  while (idx < len) {
    rv[idx] = fn(a[idx], b[idx]);
    idx += 1;
  }
  return rv;
});
module.exports = zipWith;
},{"./internal/_curry3":111}],324:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.S = factory());
}(this, (function () { 'use strict';

// Public interface
var S = function S(fn, value) {
    var owner = Owner, running = RunningNode;
    if (owner === null)
        console.warn("computations created without a root or parent will never be disposed");
    var node = new ComputationNode(fn, value);
    Owner = RunningNode = node;
    if (RunningClock === null) {
        toplevelComputation(node);
    }
    else {
        node.value = node.fn(node.value);
    }
    if (owner && owner !== UNOWNED) {
        if (owner.owned === null)
            owner.owned = [node];
        else
            owner.owned.push(node);
    }
    Owner = owner;
    RunningNode = running;
    return function computation() {
        if (RunningNode !== null) {
            if (node.age === RootClock.time) {
                if (node.state === RUNNING)
                    throw new Error("circular dependency");
                else
                    updateNode(node); // checks for state === STALE internally, so don't need to check here
            }
            logComputationRead(node, RunningNode);
        }
        return node.value;
    };
};
// compatibility with commonjs systems that expect default export to be at require('s.js').default rather than just require('s-js')
Object.defineProperty(S, 'default', { value: S });
S.root = function root(fn) {
    var owner = Owner, root = fn.length === 0 ? UNOWNED : new ComputationNode(null, null), result = undefined, disposer = fn.length === 0 ? null : function _dispose() {
        if (RunningClock !== null) {
            RootClock.disposes.add(root);
        }
        else {
            dispose(root);
        }
    };
    Owner = root;
    if (RunningClock === null) {
        result = topLevelRoot(fn, disposer, owner);
    }
    else {
        result = disposer === null ? fn() : fn(disposer);
        Owner = owner;
    }
    return result;
};
function topLevelRoot(fn, disposer, owner) {
    try {
        return disposer === null ? fn() : fn(disposer);
    }
    finally {
        Owner = owner;
    }
}
S.on = function on(ev, fn, seed, onchanges) {
    if (Array.isArray(ev))
        ev = callAll(ev);
    onchanges = !!onchanges;
    return S(on, seed);
    function on(value) {
        var running = RunningNode;
        ev();
        if (onchanges)
            onchanges = false;
        else {
            RunningNode = null;
            value = fn(value);
            RunningNode = running;
        }
        return value;
    }
};
function callAll(ss) {
    return function all() {
        for (var i = 0; i < ss.length; i++)
            ss[i]();
    };
}
S.data = function data(value) {
    var node = new DataNode(value);
    return function data(value) {
        if (arguments.length > 0) {
            if (RunningClock !== null) {
                if (node.pending !== NOTPENDING) {
                    if (value !== node.pending) {
                        throw new Error("conflicting changes: " + value + " !== " + node.pending);
                    }
                }
                else {
                    node.pending = value;
                    RootClock.changes.add(node);
                }
            }
            else {
                if (node.log !== null) {
                    node.pending = value;
                    RootClock.changes.add(node);
                    event();
                }
                else {
                    node.value = value;
                }
            }
            return value;
        }
        else {
            if (RunningNode !== null) {
                logDataRead(node, RunningNode);
            }
            return node.value;
        }
    };
};
S.value = function value(current, eq) {
    var data = S.data(current), age = -1;
    return function value(update) {
        if (arguments.length === 0) {
            return data();
        }
        else {
            var same = eq ? eq(current, update) : current === update;
            if (!same) {
                var time = RootClock.time;
                if (age === time)
                    throw new Error("conflicting values: " + update + " is not the same as " + current);
                age = time;
                current = update;
                data(update);
            }
            return update;
        }
    };
};
S.freeze = function freeze(fn) {
    var result = undefined;
    if (RunningClock !== null) {
        result = fn();
    }
    else {
        RunningClock = RootClock;
        RunningClock.changes.reset();
        try {
            result = fn();
            event();
        }
        finally {
            RunningClock = null;
        }
    }
    return result;
};
S.sample = function sample(fn) {
    var result, running = RunningNode;
    if (running !== null) {
        RunningNode = null;
        result = fn();
        RunningNode = running;
    }
    else {
        result = fn();
    }
    return result;
};
S.cleanup = function cleanup(fn) {
    if (Owner !== null) {
        if (Owner.cleanups === null)
            Owner.cleanups = [fn];
        else
            Owner.cleanups.push(fn);
    }
    else {
        console.warn("cleanups created without a root or parent will never be run");
    }
};
// Internal implementation
/// Graph classes and operations
var Clock = /** @class */ (function () {
    function Clock() {
        this.time = 0;
        this.changes = new Queue(); // batched changes to data nodes
        this.updates = new Queue(); // computations to update
        this.disposes = new Queue(); // disposals to run after current batch of updates finishes
    }
    return Clock;
}());
var DataNode = /** @class */ (function () {
    function DataNode(value) {
        this.value = value;
        this.pending = NOTPENDING;
        this.log = null;
    }
    return DataNode;
}());
var ComputationNode = /** @class */ (function () {
    function ComputationNode(fn, value) {
        this.fn = fn;
        this.value = value;
        this.state = CURRENT;
        this.source1 = null;
        this.source1slot = 0;
        this.sources = null;
        this.sourceslots = null;
        this.log = null;
        this.owned = null;
        this.cleanups = null;
        this.age = RootClock.time;
    }
    return ComputationNode;
}());
var Log = /** @class */ (function () {
    function Log() {
        this.node1 = null;
        this.node1slot = 0;
        this.nodes = null;
        this.nodeslots = null;
    }
    return Log;
}());
var Queue = /** @class */ (function () {
    function Queue() {
        this.items = [];
        this.count = 0;
    }
    Queue.prototype.reset = function () {
        this.count = 0;
    };
    Queue.prototype.add = function (item) {
        this.items[this.count++] = item;
    };
    Queue.prototype.run = function (fn) {
        var items = this.items;
        for (var i = 0; i < this.count; i++) {
            fn(items[i]);
            items[i] = null;
        }
        this.count = 0;
    };
    return Queue;
}());
// Constants
var NOTPENDING = {};
var CURRENT = 0;
var STALE = 1;
var RUNNING = 2;
// "Globals" used to keep track of current system state
var RootClock = new Clock();
var RunningClock = null;
var RunningNode = null;
var Owner = null;
var UNOWNED = new ComputationNode(null, null);
// Functions
function logRead(from, to) {
    var fromslot, toslot = to.source1 === null ? -1 : to.sources === null ? 0 : to.sources.length;
    if (from.node1 === null) {
        from.node1 = to;
        from.node1slot = toslot;
        fromslot = -1;
    }
    else if (from.nodes === null) {
        from.nodes = [to];
        from.nodeslots = [toslot];
        fromslot = 0;
    }
    else {
        fromslot = from.nodes.length;
        from.nodes.push(to);
        from.nodeslots.push(toslot);
    }
    if (to.source1 === null) {
        to.source1 = from;
        to.source1slot = fromslot;
    }
    else if (to.sources === null) {
        to.sources = [from];
        to.sourceslots = [fromslot];
    }
    else {
        to.sources.push(from);
        to.sourceslots.push(fromslot);
    }
}
function logDataRead(data, to) {
    if (data.log === null)
        data.log = new Log();
    logRead(data.log, to);
}
function logComputationRead(node, to) {
    if (node.log === null)
        node.log = new Log();
    logRead(node.log, to);
}
function event() {
    // b/c we might be under a top level S.root(), have to preserve current root
    var owner = Owner;
    RootClock.updates.reset();
    RootClock.time++;
    try {
        run(RootClock);
    }
    finally {
        RunningClock = RunningNode = null;
        Owner = owner;
    }
}
function toplevelComputation(node) {
    RunningClock = RootClock;
    RootClock.changes.reset();
    RootClock.updates.reset();
    try {
        node.value = node.fn(node.value);
        if (RootClock.changes.count > 0 || RootClock.updates.count > 0) {
            RootClock.time++;
            run(RootClock);
        }
    }
    finally {
        RunningClock = Owner = RunningNode = null;
    }
}
function run(clock) {
    var running = RunningClock, count = 0;
    RunningClock = clock;
    clock.disposes.reset();
    // for each batch ...
    while (clock.changes.count !== 0 || clock.updates.count !== 0 || clock.disposes.count !== 0) {
        if (count > 0)
            clock.time++;
        clock.changes.run(applyDataChange);
        clock.updates.run(updateNode);
        clock.disposes.run(dispose);
        // if there are still changes after excessive batches, assume runaway            
        if (count++ > 1e5) {
            throw new Error("Runaway clock detected");
        }
    }
    RunningClock = running;
}
function applyDataChange(data) {
    data.value = data.pending;
    data.pending = NOTPENDING;
    if (data.log)
        markComputationsStale(data.log);
}
function markComputationsStale(log) {
    var node1 = log.node1, nodes = log.nodes;
    // mark all downstream nodes stale which haven't been already
    if (node1 !== null)
        markNodeStale(node1);
    if (nodes !== null) {
        for (var i = 0, len = nodes.length; i < len; i++) {
            markNodeStale(nodes[i]);
        }
    }
}
function markNodeStale(node) {
    var time = RootClock.time;
    if (node.age < time) {
        node.age = time;
        node.state = STALE;
        RootClock.updates.add(node);
        if (node.owned !== null)
            markOwnedNodesForDisposal(node.owned);
        if (node.log !== null)
            markComputationsStale(node.log);
    }
}
function markOwnedNodesForDisposal(owned) {
    for (var i = 0; i < owned.length; i++) {
        var child = owned[i];
        child.age = RootClock.time;
        child.state = CURRENT;
        if (child.owned !== null)
            markOwnedNodesForDisposal(child.owned);
    }
}
function updateNode(node) {
    if (node.state === STALE) {
        var owner = Owner, running = RunningNode;
        Owner = RunningNode = node;
        node.state = RUNNING;
        cleanup(node, false);
        node.value = node.fn(node.value);
        node.state = CURRENT;
        Owner = owner;
        RunningNode = running;
    }
}
function cleanup(node, final) {
    var source1 = node.source1, sources = node.sources, sourceslots = node.sourceslots, cleanups = node.cleanups, owned = node.owned, i, len;
    if (cleanups !== null) {
        for (i = 0; i < cleanups.length; i++) {
            cleanups[i](final);
        }
        node.cleanups = null;
    }
    if (owned !== null) {
        for (i = 0; i < owned.length; i++) {
            dispose(owned[i]);
        }
        node.owned = null;
    }
    if (source1 !== null) {
        cleanupSource(source1, node.source1slot);
        node.source1 = null;
    }
    if (sources !== null) {
        for (i = 0, len = sources.length; i < len; i++) {
            cleanupSource(sources.pop(), sourceslots.pop());
        }
    }
}
function cleanupSource(source, slot) {
    var nodes = source.nodes, nodeslots = source.nodeslots, last, lastslot;
    if (slot === -1) {
        source.node1 = null;
    }
    else {
        last = nodes.pop();
        lastslot = nodeslots.pop();
        if (slot !== nodes.length) {
            nodes[slot] = last;
            nodeslots[slot] = lastslot;
            if (lastslot === -1) {
                last.source1slot = slot;
            }
            else {
                last.sourceslots[lastslot] = slot;
            }
        }
    }
}
function dispose(node) {
    node.fn = null;
    node.log = null;
    cleanup(node, true);
}

return S;

})));

},{}],325:[function(require,module,exports){
/*              ___                 ______
               /  /\               /  ___/\
        ______/  / / _______    __/  /___\/
       /  ___   / / /  ___  \  /_   __/\
      /  /\_/  / / /  /__/  /\ \/  /\_\/
     /  / //  / / /  ______/ / /  / /
    /  /_//  / / /  /______\/ /  / /
    \_______/ /  \_______/\  /__/ /
     \______\/    \______\/  \__*/

//. # sanctuary-def
//.
//. sanctuary-def is a run-time type system for JavaScript. It facilitates
//. the definition of curried JavaScript functions which are explicit about
//. the number of arguments to which they may be applied and the types of
//. those arguments.
//.
//. It is conventional to import the package as `$`:
//.
//. ```javascript
//. const $ = require('sanctuary-def');
//. ```
//.
//. The next step is to define an environment. An environment is an array
//. of [types][]. [`env`][] is an environment containing all the built-in
//. JavaScript types. It may be used as the basis for environments which
//. include custom types in addition to the built-in types:
//.
//. ```javascript
//. //    Integer :: Type
//. const Integer = ...;
//.
//. //    NonZeroInteger :: Type
//. const NonZeroInteger = ...;
//.
//. //    env :: Array Type
//. const env = $.env.concat([Integer, NonZeroInteger]);
//. ```
//.
//. Type constructors such as `List :: Type -> Type` cannot be included in
//. an environment as they're not of the correct type. One could, though,
//. use a type constructor to define a fixed number of concrete types:
//.
//. ```javascript
//. //    env :: Array Type
//. const env = $.env.concat([
//.   List($.Number),               // :: Type
//.   List($.String),               // :: Type
//.   List(List($.Number)),         // :: Type
//.   List(List($.String)),         // :: Type
//.   List(List(List($.Number))),   // :: Type
//.   List(List(List($.String))),   // :: Type
//. ]);
//. ```
//.
//. Not only would this be tedious, but one could never enumerate all possible
//. types as there are infinitely many. Instead, one should use [`Unknown`][]:
//.
//. ```javascript
//. //    env :: Array Type
//. const env = $.env.concat([List($.Unknown)]);
//. ```
//.
//. The next step is to define a `def` function for the environment:
//.
//. ```javascript
//. const def = $.create({checkTypes: true, env: env});
//. ```
//.
//. The `checkTypes` option determines whether type checking is enabled.
//. This allows one to only pay the performance cost of run-time type checking
//. during development. For example:
//.
//. ```javascript
//. const def = $.create({
//.   checkTypes: process.env.NODE_ENV === 'development',
//.   env: env,
//. });
//. ```
//.
//. `def` is a function for defining functions. For example:
//.
//. ```javascript
//. //    add :: Number -> Number -> Number
//. const add =
//. def('add', {}, [$.Number, $.Number, $.Number], (x, y) => x + y);
//. ```
//.
//. `[$.Number, $.Number, $.Number]` specifies that `add` takes two arguments
//. of type `Number` and returns a value of type `Number`.
//.
//. Applying `add` to two arguments gives the expected result:
//.
//. ```javascript
//. add(2, 2);
//. // => 4
//. ```
//.
//. Applying `add` to greater than two arguments results in an exception being
//. thrown:
//.
//. ```javascript
//. add(2, 2, 2);
//. // ! TypeError: ‘add’ requires two arguments; received three arguments
//. ```
//.
//. Applying `add` to fewer than two arguments results in a function
//. awaiting the remaining arguments. This is known as partial application.
//. Partial application is convenient as it allows more specific functions
//. to be defined in terms of more general ones:
//.
//. ```javascript
//. //    inc :: Number -> Number
//. const inc = add(1);
//.
//. inc(7);
//. // => 8
//. ```
//.
//. JavaScript's implicit type coercion often obfuscates the source of type
//. errors. Consider the following function:
//.
//. ```javascript
//. //    _add :: (Number, Number) -> Number
//. const _add = (x, y) => x + y;
//. ```
//.
//. The type signature indicates that `_add` takes two arguments of type
//. `Number`, but this is not enforced. This allows type errors to be silently
//. ignored:
//.
//. ```javascript
//. _add('2', '2');
//. // => '22'
//. ```
//.
//. `add`, on the other hand, throws if applied to arguments of the wrong
//. types:
//.
//. ```javascript
//. add('2', '2');
//. // ! TypeError: Invalid value
//. //
//. //   add :: Number -> Number -> Number
//. //          ^^^^^^
//. //            1
//. //
//. //   1)  "2" :: String
//. //
//. //   The value at position 1 is not a member of ‘Number’.
//. ```
//.
//. Type checking is performed as arguments are provided (rather than once all
//. arguments have been provided), so type errors are reported early:
//.
//. ```javascript
//. add('X');
//. // ! TypeError: Invalid value
//. //
//. //   add :: Number -> Number -> Number
//. //          ^^^^^^
//. //            1
//. //
//. //   1)  "X" :: String
//. //
//. //   The value at position 1 is not a member of ‘Number’.
//. ```

(function(f) {

  'use strict';

  /* istanbul ignore else */
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f(require('sanctuary-type-classes'),
                       require('sanctuary-type-identifiers'));
  } else if (typeof define === 'function' && define.amd != null) {
    define(['sanctuary-type-classes', 'sanctuary-type-identifiers'], f);
  } else {
    self.sanctuaryDef = f(self.sanctuaryTypeClasses,
                          self.sanctuaryTypeIdentifiers);
  }

}(function(Z, type) {

  'use strict';

  //# __ :: Placeholder
  //.
  //. The special placeholder value.
  //.
  //. One may wish to partially apply a function whose parameters are in the
  //. "wrong" order. Functions defined via sanctuary-def accommodate this by
  //. accepting placeholders for arguments yet to be provided. For example:
  //.
  //. ```javascript
  //. //    concatS :: String -> String -> String
  //. const concatS =
  //. def('concatS', {}, [$.String, $.String, $.String], (x, y) => x + y);
  //.
  //. //    exclaim :: String -> String
  //. const exclaim = concatS($.__, '!');
  //.
  //. exclaim('ahoy');
  //. // => 'ahoy!'
  //. ```
  var __ = {'@@functional/placeholder': true};

  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
  var MIN_SAFE_INTEGER = -MAX_SAFE_INTEGER;

  var slice             = Array.prototype.slice;
  var hasOwnProperty    = Object.prototype.hasOwnProperty;

  function Either(tag, value) {
    this.isLeft = tag === 'Left';
    this.isRight = tag === 'Right';
    this.value = value;
  }

  Either['@@type'] = 'sanctuary-def/Either';

  Either.prototype['fantasy-land/map'] = function(f) {
    return this.isLeft ? this : Right(f(this.value));
  };

  Either.prototype['fantasy-land/chain'] = function(f) {
    return this.isLeft ? this : f(this.value);
  };

  //  Left :: a -> Either a b
  function Left(x) { return new Either('Left', x); }

  //  Right :: b -> Either a b
  function Right(x) { return new Either('Right', x); }

  //  K :: a -> b -> a
  function K(x) { return function(y) { return x; }; }

  //  always2 :: a -> (b, c) -> a
  function always2(x) { return function(y, z) { return x; }; }

  //  id :: a -> a
  function id(x) { return x; }

  //  init :: Array a -> Array a
  function init(xs) { return xs.slice(0, -1); }

  //  isEmpty :: Array a -> Boolean
  function isEmpty(xs) { return xs.length === 0; }

  //  isPrefix :: Array a -> Array a -> Boolean
  function isPrefix(candidate) {
    return function(xs) {
      if (candidate.length > xs.length) return false;
      for (var idx = 0; idx < candidate.length; idx += 1) {
        if (candidate[idx] !== xs[idx]) return false;
      }
      return true;
    };
  }

  //  last :: Array a -> a
  function last(xs) { return xs[xs.length - 1]; }

  //  memberOf :: Array a -> a -> Boolean
  function memberOf(xs) {
    return function(y) {
      return xs.some(function(x) { return Z.equals(x, y); });
    };
  }

  //  or :: (Array a, Array a) -> Array a
  function or(xs, ys) { return isEmpty(xs) ? ys : xs; }

  //  range :: (Number, Number) -> Array Number
  function range(start, stop) {
    var result = [];
    for (var n = start; n < stop; n += 1) result.push(n);
    return result;
  }

  //  singleton :: (String, a) -> StrMap a
  function singleton(k, v) {
    var result = {};
    result[k] = v;
    return result;
  }

  //  strRepeat :: (String, Integer) -> String
  function strRepeat(s, times) {
    return Array(times + 1).join(s);
  }

  //  r :: Char -> String -> String
  function r(c) {
    return function(s) {
      return strRepeat(c, s.length);
    };
  }

  //  _ :: String -> String
  var _ = r(' ');

  //  stripOutermostParens :: String -> String
  function stripOutermostParens(s) {
    return s.slice('('.length, -')'.length);
  }

  //  toMarkdownList :: (String, String, a -> String, Array a) -> String
  function toMarkdownList(empty, s, f, xs) {
    return isEmpty(xs) ?
      empty :
      Z.reduce(function(s, x) { return s + '  - ' + f(x) + '\n'; }, s, xs);
  }

  //  trimTrailingSpaces :: String -> String
  function trimTrailingSpaces(s) {
    return s.replace(/[ ]+$/gm, '');
  }

  //  unless :: (Boolean, (a -> a), a) -> a
  function unless(bool, f, x) {
    return bool ? x : f(x);
  }

  //  when :: (Boolean, (a -> a), a) -> a
  function when(bool, f, x) {
    return bool ? f(x) : x;
  }

  //  wrap :: String -> String -> String -> String
  function wrap(prefix) {
    return function(suffix) {
      return function(s) {
        return prefix + s + suffix;
      };
    };
  }

  //  parenthesize :: String -> String
  var parenthesize = wrap('(')(')');

  //  q :: String -> String
  var q = wrap('\u2018')('\u2019');

  //  stripNamespace :: String -> String
  function stripNamespace(s) { return s.slice(s.indexOf('/') + 1); }

  //  _Type :: ... -> Type
  function _Type(
    type,       // :: String
    name,       // :: String
    url,        // :: String
    format,     // :: (String -> String, String -> String -> String) -> String
    test,       // :: Any -> Boolean
    keys,       // :: Array String
    types       // :: StrMap { extractor :: a -> Array b, type :: Type }
  ) {
    this._test = test;
    this.format = format;
    this.keys = keys;
    this.name = name;
    this.type = type;
    this.types = types;
    this.url = url;
  }

  _Type['@@type'] = 'sanctuary-def/Type';

  _Type.prototype.validate = function(x) {
    if (!this._test(x)) return Left({value: x, propPath: []});
    for (var idx = 0; idx < this.keys.length; idx += 1) {
      var k = this.keys[idx];
      var t = this.types[k];
      for (var idx2 = 0, ys = t.extractor(x); idx2 < ys.length; idx2 += 1) {
        var result = t.type.validate(ys[idx2]);
        if (result.isLeft) {
          var value = result.value.value;
          var propPath = Z.concat([k], result.value.propPath);
          return Left({value: value, propPath: propPath});
        }
      }
    }
    return Right(x);
  };

  _Type.prototype.toString = function() {
    return this.format(id, K(id));
  };

  var BINARY        = 'BINARY';
  var FUNCTION      = 'FUNCTION';
  var INCONSISTENT  = 'INCONSISTENT';
  var NULLARY       = 'NULLARY';
  var RECORD        = 'RECORD';
  var UNARY         = 'UNARY';
  var UNKNOWN       = 'UNKNOWN';
  var VARIABLE      = 'VARIABLE';

  //  Inconsistent :: Type
  var Inconsistent =
  new _Type(INCONSISTENT, '', '', always2('???'), K(false), [], {});

  //  typeEq :: String -> a -> Boolean
  function typeEq(name) {
    return function(x) {
      return type(x) === name;
    };
  }

  //  typeofEq :: String -> a -> Boolean
  function typeofEq(typeof_) {
    return function(x) {
      // eslint-disable-next-line valid-typeof
      return typeof x === typeof_;
    };
  }

  //  functionUrl :: String -> String
  function functionUrl(name) {
    var version = '0.14.0';  // updated programmatically
    return 'https://github.com/sanctuary-js/sanctuary-def/tree/v' + version +
           '#' + stripNamespace(name);
  }

  //  NullaryTypeWithUrl :: (String, Any -> Boolean) -> Type
  function NullaryTypeWithUrl(name, test) {
    return NullaryType(name, functionUrl(name), test);
  }

  //  EnumTypeWithUrl :: (String, Array Any) -> Type
  function EnumTypeWithUrl(name, members) {
    return EnumType(name, functionUrl(name), members);
  }

  //  UnaryTypeWithUrl ::
  //    (String, Any -> Boolean, t a -> Array a) -> (Type -> Type)
  function UnaryTypeWithUrl(name, test, _1) {
    return UnaryType(name, functionUrl(name), test, _1);
  }

  //  BinaryTypeWithUrl ::
  //    (String, Any -> Boolean, t a b -> Array a, t a b -> Array b) ->
  //      ((Type, Type) -> Type)
  function BinaryTypeWithUrl(name, test, _1, _2) {
    return BinaryType(name, functionUrl(name), test, _1, _2);
  }

  //. ### Types
  //.
  //. Conceptually, a type is a set of values. One can think of a value of
  //. type `Type` as a function of type `Any -> Boolean` which tests values
  //. for membership in the set (though this is an oversimplification).

  //# Any :: Type
  //.
  //. Type comprising every JavaScript value.
  var Any = NullaryTypeWithUrl('sanctuary-def/Any', K(true));

  //# AnyFunction :: Type
  //.
  //. Type comprising every Function value.
  var AnyFunction = NullaryTypeWithUrl('Function', typeofEq('function'));

  //# Arguments :: Type
  //.
  //. Type comprising every [`arguments`][arguments] object.
  var Arguments = NullaryTypeWithUrl('Arguments', typeEq('Arguments'));

  //# Array :: Type -> Type
  //.
  //. Constructor for homogeneous Array types.
  var Array_ = UnaryTypeWithUrl('Array', typeEq('Array'), id);

  //# Boolean :: Type
  //.
  //. Type comprising `true` and `false`.
  var Boolean_ = NullaryTypeWithUrl('Boolean', typeofEq('boolean'));

  //# Date :: Type
  //.
  //. Type comprising every Date value.
  var Date_ = NullaryTypeWithUrl('Date', typeEq('Date'));

  //# Error :: Type
  //.
  //. Type comprising every Error value, including values of more specific
  //. constructors such as [`SyntaxError`][] and [`TypeError`][].
  var Error_ = NullaryTypeWithUrl('Error', typeEq('Error'));

  //# FiniteNumber :: Type
  //.
  //. Type comprising every [`ValidNumber`][] value except `Infinity` and
  //. `-Infinity`.
  var FiniteNumber = NullaryTypeWithUrl(
    'sanctuary-def/FiniteNumber',
    function(x) { return ValidNumber._test(x) && isFinite(x); }
  );

  //# Function :: Array Type -> Type
  //.
  //. Constructor for Function types.
  //.
  //. Examples:
  //.
  //.   - `$.Function([$.Date, $.String])` represents the `Date -> String`
  //.     type; and
  //.   - `$.Function([a, b, a])` represents the `(a, b) -> a` type.
  function Function_(types) {
    function format(outer, inner) {
      var xs = types.map(function(t, idx) {
        return unless(t.type === RECORD || isEmpty(t.keys),
                      stripOutermostParens,
                      inner('$' + String(idx + 1))(String(t)));
      });
      var parenthesize = wrap(outer('('))(outer(')'));
      return parenthesize(unless(types.length === 2,
                                 parenthesize,
                                 init(xs).join(outer(', '))) +
                          outer(' -> ') +
                          last(xs));
    }

    var test = AnyFunction._test;

    var $keys = [];
    var $types = {};
    types.forEach(function(t, idx) {
      var k = '$' + String(idx + 1);
      $keys.push(k);
      $types[k] = {extractor: K([]), type: t};
    });

    return new _Type(FUNCTION, '', '', format, test, $keys, $types);
  }

  //# GlobalRegExp :: Type
  //.
  //. Type comprising every [`RegExp`][] value whose `global` flag is `true`.
  //.
  //. See also [`NonGlobalRegExp`][].
  var GlobalRegExp = NullaryTypeWithUrl(
    'sanctuary-def/GlobalRegExp',
    function(x) { return RegExp_._test(x) && x.global; }
  );

  //# Integer :: Type
  //.
  //. Type comprising every integer in the range
  //. [[`Number.MIN_SAFE_INTEGER`][min] .. [`Number.MAX_SAFE_INTEGER`][max]].
  var Integer = NullaryTypeWithUrl(
    'sanctuary-def/Integer',
    function(x) {
      return ValidNumber._test(x) &&
             Math.floor(x) === x &&
             x >= MIN_SAFE_INTEGER &&
             x <= MAX_SAFE_INTEGER;
    }
  );

  //# NegativeFiniteNumber :: Type
  //.
  //. Type comprising every [`FiniteNumber`][] value less than zero.
  var NegativeFiniteNumber = NullaryTypeWithUrl(
    'sanctuary-def/NegativeFiniteNumber',
    function(x) { return FiniteNumber._test(x) && x < 0; }
  );

  //# NegativeInteger :: Type
  //.
  //. Type comprising every [`Integer`][] value less than zero.
  var NegativeInteger = NullaryTypeWithUrl(
    'sanctuary-def/NegativeInteger',
    function(x) { return Integer._test(x) && x < 0; }
  );

  //# NegativeNumber :: Type
  //.
  //. Type comprising every [`Number`][] value less than zero.
  var NegativeNumber = NullaryTypeWithUrl(
    'sanctuary-def/NegativeNumber',
    function(x) { return Number_._test(x) && x < 0; }
  );

  //# NonEmpty :: Type -> Type
  //.
  //. Constructor for non-empty types. `$.NonEmpty($.String)`, for example, is
  //. the type comprising every [`String`][] value except `''`.
  //.
  //. The given type must satisfy the [Monoid][] and [Setoid][] specifications.
  var NonEmpty = UnaryType(
    'sanctuary-def/NonEmpty',
    functionUrl('NonEmpty'),
    function(x) {
      return Z.Monoid.test(x) &&
             Z.Setoid.test(x) &&
             !Z.equals(x, Z.empty(x.constructor));
    },
    function(monoid) { return [monoid]; }
  );

  //# NonGlobalRegExp :: Type
  //.
  //. Type comprising every [`RegExp`][] value whose `global` flag is `false`.
  //.
  //. See also [`GlobalRegExp`][].
  var NonGlobalRegExp = NullaryTypeWithUrl(
    'sanctuary-def/NonGlobalRegExp',
    function(x) { return RegExp_._test(x) && !x.global; }
  );

  //# NonNegativeInteger :: Type
  //.
  //. Type comprising every non-negative [`Integer`][] value (including `-0`).
  //. Also known as the set of natural numbers under ISO 80000-2:2009.
  var NonNegativeInteger = NullaryTypeWithUrl(
    'sanctuary-def/NonNegativeInteger',
    function(x) { return Integer._test(x) && x >= 0; }
  );

  //# NonZeroFiniteNumber :: Type
  //.
  //. Type comprising every [`FiniteNumber`][] value except `0` and `-0`.
  var NonZeroFiniteNumber = NullaryTypeWithUrl(
    'sanctuary-def/NonZeroFiniteNumber',
    function(x) { return FiniteNumber._test(x) && x !== 0; }
  );

  //# NonZeroInteger :: Type
  //.
  //. Type comprising every [`Integer`][] value except `0` and `-0`.
  var NonZeroInteger = NullaryTypeWithUrl(
    'sanctuary-def/NonZeroInteger',
    function(x) { return Integer._test(x) && x !== 0; }
  );

  //# NonZeroValidNumber :: Type
  //.
  //. Type comprising every [`ValidNumber`][] value except `0` and `-0`.
  var NonZeroValidNumber = NullaryTypeWithUrl(
    'sanctuary-def/NonZeroValidNumber',
    function(x) { return ValidNumber._test(x) && x !== 0; }
  );

  //# Null :: Type
  //.
  //. Type whose sole member is `null`.
  var Null = NullaryTypeWithUrl('Null', typeEq('Null'));

  //# Nullable :: Type -> Type
  //.
  //. Constructor for types which include `null` as a member.
  var Nullable = UnaryTypeWithUrl(
    'sanctuary-def/Nullable',
    K(true),
    function(nullable) {
      // eslint-disable-next-line eqeqeq
      return nullable === null ? [] : [nullable];
    }
  );

  //# Number :: Type
  //.
  //. Type comprising every primitive Number value (including `NaN`).
  var Number_ = NullaryTypeWithUrl('Number', typeofEq('number'));

  //# Object :: Type
  //.
  //. Type comprising every "plain" Object value. Specifically, values
  //. created via:
  //.
  //.   - object literal syntax;
  //.   - [`Object.create`][]; or
  //.   - the `new` operator in conjunction with `Object` or a custom
  //.     constructor function.
  var Object_ = NullaryTypeWithUrl('Object', typeEq('Object'));

  //# Pair :: Type -> Type -> Type
  //.
  //. Constructor for tuple types of length 2. Arrays are said to represent
  //. tuples. `['foo', 42]` is a member of `Pair String Number`.
  var Pair = BinaryTypeWithUrl(
    'sanctuary-def/Pair',
    function(x) { return typeEq('Array')(x) && x.length === 2; },
    function(pair) { return [pair[0]]; },
    function(pair) { return [pair[1]]; }
  );

  //# PositiveFiniteNumber :: Type
  //.
  //. Type comprising every [`FiniteNumber`][] value greater than zero.
  var PositiveFiniteNumber = NullaryTypeWithUrl(
    'sanctuary-def/PositiveFiniteNumber',
    function(x) { return FiniteNumber._test(x) && x > 0; }
  );

  //# PositiveInteger :: Type
  //.
  //. Type comprising every [`Integer`][] value greater than zero.
  var PositiveInteger = NullaryTypeWithUrl(
    'sanctuary-def/PositiveInteger',
    function(x) { return Integer._test(x) && x > 0; }
  );

  //# PositiveNumber :: Type
  //.
  //. Type comprising every [`Number`][] value greater than zero.
  var PositiveNumber = NullaryTypeWithUrl(
    'sanctuary-def/PositiveNumber',
    function(x) { return Number_._test(x) && x > 0; }
  );

  //# RegExp :: Type
  //.
  //. Type comprising every RegExp value.
  var RegExp_ = NullaryTypeWithUrl('RegExp', typeEq('RegExp'));

  //# RegexFlags :: Type
  //.
  //. Type comprising the canonical RegExp flags:
  //.
  //.   - `''`
  //.   - `'g'`
  //.   - `'i'`
  //.   - `'m'`
  //.   - `'gi'`
  //.   - `'gm'`
  //.   - `'im'`
  //.   - `'gim'`
  var RegexFlags = EnumTypeWithUrl(
    'sanctuary-def/RegexFlags',
    ['', 'g', 'i', 'm', 'gi', 'gm', 'im', 'gim']
  );

  //# StrMap :: Type -> Type
  //.
  //. Constructor for homogeneous Object types.
  //.
  //. `{foo: 1, bar: 2, baz: 3}`, for example, is a member of `StrMap Number`;
  //. `{foo: 1, bar: 2, baz: 'XXX'}` is not.
  var StrMap = UnaryTypeWithUrl(
    'sanctuary-def/StrMap',
    Object_._test,
    function(strMap) {
      return Z.reduce(function(xs, x) { return xs.concat([x]); }, [], strMap);
    }
  );

  //# String :: Type
  //.
  //. Type comprising every primitive String value.
  var String_ = NullaryTypeWithUrl('String', typeofEq('string'));

  //# Symbol :: Type
  //.
  //. Type comprising every Symbol value.
  var Symbol_ = NullaryTypeWithUrl('Symbol', typeofEq('symbol'));

  //# Type :: Type
  //.
  //. Type comprising every `Type` value.
  var Type = NullaryTypeWithUrl('Type', typeEq('sanctuary-def/Type'));

  //# TypeClass :: Type
  //.
  //. Type comprising every [`TypeClass`][] value.
  var TypeClass =
  NullaryTypeWithUrl('TypeClass', typeEq('sanctuary-type-classes/TypeClass'));

  //# Undefined :: Type
  //.
  //. Type whose sole member is `undefined`.
  var Undefined = NullaryTypeWithUrl('Undefined', typeEq('Undefined'));

  //# Unknown :: Type
  //.
  //. Type used to represent missing type information. The type of `[]`,
  //. for example, is `Array ???`.
  //.
  //. May be used with type constructors when defining environments. Given a
  //. type constructor `List :: Type -> Type`, one could use `List($.Unknown)`
  //. to include an infinite number of types in an environment:
  //.
  //.   - `List Number`
  //.   - `List String`
  //.   - `List (List Number)`
  //.   - `List (List String)`
  //.   - `List (List (List Number))`
  //.   - `List (List (List String))`
  //.   - `...`
  var Unknown =
  new _Type(UNKNOWN, '', '', always2('Unknown'), K(true), [], {});

  //# ValidDate :: Type
  //.
  //. Type comprising every [`Date`][] value except `new Date(NaN)`.
  var ValidDate = NullaryTypeWithUrl(
    'sanctuary-def/ValidDate',
    function(x) { return Date_._test(x) && !isNaN(x.valueOf()); }
  );

  //# ValidNumber :: Type
  //.
  //. Type comprising every [`Number`][] value except `NaN`.
  var ValidNumber = NullaryTypeWithUrl(
    'sanctuary-def/ValidNumber',
    function(x) { return Number_._test(x) && !isNaN(x); }
  );

  //# env :: Array Type
  //.
  //. An array of [types][]:
  //.
  //.   - <code>[AnyFunction](#AnyFunction)</code>
  //.   - <code>[Arguments](#Arguments)</code>
  //.   - <code>[Array](#Array)([Unknown](#Unknown))</code>
  //.   - <code>[Boolean](#Boolean)</code>
  //.   - <code>[Date](#Date)</code>
  //.   - <code>[Error](#Error)</code>
  //.   - <code>[Null](#Null)</code>
  //.   - <code>[Number](#Number)</code>
  //.   - <code>[Object](#Object)</code>
  //.   - <code>[RegExp](#RegExp)</code>
  //.   - <code>[StrMap](#StrMap)([Unknown](#Unknown))</code>
  //.   - <code>[String](#String)</code>
  //.   - <code>[Symbol](#Symbol)</code>
  //.   - <code>[Undefined](#Undefined)</code>
  var env = [
    AnyFunction,
    Arguments,
    Array_(Unknown),
    Boolean_,
    Date_,
    Error_,
    Null,
    Number_,
    Object_,
    RegExp_,
    StrMap(Unknown),
    String_,
    Symbol_,
    Undefined
  ];

  //  Unchecked :: String -> Type
  function Unchecked(s) { return NullaryType(s, '', K(true)); }

  var def = _create({checkTypes: true, env: env});

  //  arity :: (Number, Function) -> Function
  function arity(n, f) {
    return (
      n === 0 ?
        function() {
          return f.apply(this, arguments);
        } :
      n === 1 ?
        function($1) {
          return f.apply(this, arguments);
        } :
      n === 2 ?
        function($1, $2) {
          return f.apply(this, arguments);
        } :
      n === 3 ?
        function($1, $2, $3) {
          return f.apply(this, arguments);
        } :
      n === 4 ?
        function($1, $2, $3, $4) {
          return f.apply(this, arguments);
        } :
      n === 5 ?
        function($1, $2, $3, $4, $5) {
          return f.apply(this, arguments);
        } :
      n === 6 ?
        function($1, $2, $3, $4, $5, $6) {
          return f.apply(this, arguments);
        } :
      n === 7 ?
        function($1, $2, $3, $4, $5, $6, $7) {
          return f.apply(this, arguments);
        } :
      n === 8 ?
        function($1, $2, $3, $4, $5, $6, $7, $8) {
          return f.apply(this, arguments);
        } :
      // else
        function($1, $2, $3, $4, $5, $6, $7, $8, $9) {
          return f.apply(this, arguments);
        }
    );
  }

  //  numArgs :: Number -> String
  function numArgs(n) {
    switch (n) {
      case  0:  return  'zero arguments';
      case  1:  return   'one argument';
      case  2:  return   'two arguments';
      case  3:  return 'three arguments';
      case  4:  return  'four arguments';
      case  5:  return  'five arguments';
      case  6:  return   'six arguments';
      case  7:  return 'seven arguments';
      case  8:  return 'eight arguments';
      case  9:  return  'nine arguments';
      default:  return  n + ' arguments';
    }
  }

  //  expandUnknown :: ... -> Array Type
  function expandUnknown(
    env,            // :: Array Type
    seen,           // :: Array Object
    value,          // :: Any
    r               // :: { extractor :: a -> Array b, type :: Type }
  ) {
    return r.type.type === UNKNOWN ?
      _determineActualTypes(env, seen, r.extractor(value)) :
      [r.type];
  }

  //  _determineActualTypes :: ... -> Array Type
  function _determineActualTypes(
    env,            // :: Array Type
    seen,           // :: Array Object
    values          // :: Array Any
  ) {
    function refine(types, value) {
      var seen$;
      if (typeof value === 'object' && value != null ||
          typeof value === 'function') {
        //  Abort if a circular reference is encountered; add the current
        //  object to the array of seen objects otherwise.
        if (seen.indexOf(value) >= 0) return [];
        seen$ = Z.concat(seen, [value]);
      } else {
        seen$ = seen;
      }
      return Z.chain(function(t) {
        return (
          t.name === 'sanctuary-def/Nullable' || t.validate(value).isLeft ?
            [] :
          t.type === UNARY ?
            Z.map(fromUnaryType(t),
                  expandUnknown(env, seen$, value, t.types.$1)) :
          t.type === BINARY ?
            xprod(t,
                  expandUnknown(env, seen$, value, t.types.$1),
                  expandUnknown(env, seen$, value, t.types.$2)) :
          // else
            [t]
        );
      }, types);
    }

    return isEmpty(values) ?
      [Unknown] :
      or(Z.reduce(refine, env, values), [Inconsistent]);
  }

  //  isConsistent :: Type -> Boolean
  function isConsistent(t) {
    return t.type === UNARY   ? isConsistent(t.types.$1.type) :
           t.type === BINARY  ? isConsistent(t.types.$1.type) &&
                                isConsistent(t.types.$2.type) :
           /* else */           t.type !== INCONSISTENT;
  }

  //  determineActualTypesStrict :: (Array Type, Array Any) -> Array Type
  function determineActualTypesStrict(env, values) {
    return _determineActualTypes(env, [], values)
           .filter(isConsistent);
  }

  //  determineActualTypesLoose :: (Array Type, Array Any) -> Array Type
  function determineActualTypesLoose(env, values) {
    return _determineActualTypes(env, [], values)
           .filter(function(t) { return t.type !== INCONSISTENT; });
  }

  //  TypeInfo = { name :: String
  //             , constraints :: StrMap (Array TypeClass)
  //             , types :: Array Type }
  //
  //  TypeVarMap = StrMap { types :: Array Type
  //                      , valuesByPath :: StrMap (Array Any) }
  //
  //  PropPath = Array (Number | String)

  //  updateTypeVarMap :: ... -> TypeVarMap
  function updateTypeVarMap(
    env,            // :: Array Type
    typeVarMap,     // :: TypeVarMap
    typeVar,        // :: Type
    index,          // :: Integer
    propPath,       // :: PropPath
    values          // :: Array Any
  ) {
    var $typeVarMap = {};
    for (var typeVarName in typeVarMap) {
      var entry = typeVarMap[typeVarName];
      var $entry = {types: entry.types.slice(), valuesByPath: {}};
      for (var k in entry.valuesByPath) {
        $entry.valuesByPath[k] = entry.valuesByPath[k].slice();
      }
      $typeVarMap[typeVarName] = $entry;
    }
    if (!hasOwnProperty.call($typeVarMap, typeVar.name)) {
      $typeVarMap[typeVar.name] = {types: env.slice(), valuesByPath: {}};
    }

    var key = JSON.stringify(Z.concat([index], propPath));
    if (!hasOwnProperty.call($typeVarMap[typeVar.name].valuesByPath, key)) {
      $typeVarMap[typeVar.name].valuesByPath[key] = [];
    }

    var isNullaryTypeVar = isEmpty(typeVar.keys);

    values.forEach(function(value) {
      $typeVarMap[typeVar.name].valuesByPath[key].push(value);
      $typeVarMap[typeVar.name].types = Z.chain(
        function(t) {
          var xs;
          var invalid = !test(env, t, value);
          return (
            invalid ?
              [] :
            t.type === UNARY ?
              isNullaryTypeVar &&
              t.types.$1.type.type === UNKNOWN &&
              !isEmpty(xs = t.types.$1.extractor(value)) ?
                Z.map(fromUnaryType(t),
                      determineActualTypesStrict(env, xs)) :
                [t] :
            t.type === BINARY ?
              isNullaryTypeVar ?
                xprod(t,
                      t.types.$1.type.type === UNKNOWN &&
                      !isEmpty(xs = t.types.$1.extractor(value)) ?
                        determineActualTypesStrict(env, xs) :
                        [t.types.$1.type],
                      t.types.$2.type.type === UNKNOWN &&
                      !isEmpty(xs = t.types.$2.extractor(value)) ?
                        determineActualTypesStrict(env, xs) :
                        [t.types.$2.type]) :
                [t] :
            // else
              [t]
          );
        },
        $typeVarMap[typeVar.name].types
      );
    });

    return $typeVarMap;
  }

  //  underlineTypeVars :: (TypeInfo, StrMap (Array Any)) -> String
  function underlineTypeVars(typeInfo, valuesByPath) {
    //  Note: Sorting these keys lexicographically is not "correct", but it
    //  does the right thing for indexes less than 10.
    var paths = Z.map(JSON.parse, Object.keys(valuesByPath).sort());
    return underline(
      typeInfo,
      K(K(_)),
      function(index) {
        return function(f) {
          return function(t) {
            return function(propPath) {
              var indexedPropPath = Z.concat([index], propPath);
              return function(s) {
                if (paths.some(isPrefix(indexedPropPath))) {
                  var key = JSON.stringify(indexedPropPath);
                  if (!hasOwnProperty.call(valuesByPath, key)) return s;
                  if (!isEmpty(valuesByPath[key])) return f(s);
                }
                return _(s);
              };
            };
          };
        };
      }
    );
  }

  //  satisfactoryTypes ::
  //    ... -> Either (() -> Error) { typeVarMap :: TypeVarMap
  //                                , types :: Array Type }
  function satisfactoryTypes(
    env,            // :: Array Type
    typeInfo,       // :: TypeInfo
    typeVarMap,     // :: TypeVarMap
    expType,        // :: Type
    index,          // :: Integer
    propPath,       // :: PropPath
    values          // :: Array Any
  ) {
    var recur = satisfactoryTypes;

    for (var idx = 0; idx < values.length; idx += 1) {
      var result = expType.validate(values[idx]);
      if (result.isLeft) {
        return Left(function() {
          return invalidValue(env,
                              typeInfo,
                              index,
                              result.value.propPath,
                              result.value.value);
        });
      }
    }

    switch (expType.type) {

      case VARIABLE:
        var typeVarName = expType.name;
        var constraints = typeInfo.constraints;
        if (hasOwnProperty.call(constraints, typeVarName)) {
          var typeClasses = constraints[typeVarName];
          for (idx = 0; idx < values.length; idx += 1) {
            for (var idx2 = 0; idx2 < typeClasses.length; idx2 += 1) {
              if (!typeClasses[idx2].test(values[idx])) {
                return Left(function() {
                  return typeClassConstraintViolation(
                    env,
                    typeInfo,
                    typeClasses[idx2],
                    index,
                    propPath,
                    values[idx],
                    typeVarMap
                  );
                });
              }
            }
          }
        }

        var typeVarMap$ = updateTypeVarMap(env,
                                           typeVarMap,
                                           expType,
                                           index,
                                           propPath,
                                           values);

        var okTypes = typeVarMap$[typeVarName].types;
        return isEmpty(okTypes) && !isEmpty(values) ?
          Left(function() {
            return typeVarConstraintViolation(
              env,
              typeInfo,
              index,
              propPath,
              typeVarMap$[typeVarName].valuesByPath
            );
          }) :
          Z.reduce(function(e, t) {
            return isEmpty(expType.keys) || isEmpty(t.keys) ?
              e :
              Z.chain(function(r) {
                //  The `a` in `Functor f => f a` corresponds to the `a`
                //  in `Maybe a` but to the `b` in `Either a b`. A type
                //  variable's $1 will correspond to either $1 or $2 of
                //  the actual type depending on the actual type's arity.
                var offset = t.keys.length - expType.keys.length;
                return expType.keys.reduce(function(e, k, idx) {
                  var extractor = t.types[t.keys[offset + idx]].extractor;
                  var innerValues = Z.chain(extractor, values);
                  return Z.chain(
                    function(r) {
                      return recur(env,
                                   typeInfo,
                                   r.typeVarMap,
                                   expType.types[k].type,
                                   index,
                                   Z.concat(propPath, [k]),
                                   innerValues);
                    },
                    Z.reduce(function(e, x) {
                      var t = expType.types[k].type;
                      return Z.chain(function(r) {
                        return test(env, t, x) ? Right(r) : Left(function() {
                          var propPath$ = Z.concat(propPath, [k]);
                          return t.type === VARIABLE ?
                            typeVarConstraintViolation(
                              env,
                              typeInfo,
                              index,
                              propPath$,
                              singleton(JSON.stringify(Z.concat([index],
                                                                propPath$)),
                                        [x])
                            ) :
                            invalidValue(env, typeInfo, index, propPath$, x);
                        });
                      }, e);
                    }, e, innerValues)
                  );
                }, Right(r));
              }, e);
          }, Right({typeVarMap: typeVarMap$, types: okTypes}), okTypes);

      case UNARY:
        return Z.map(
          function(result) {
            return {
              typeVarMap: result.typeVarMap,
              types: Z.map(fromUnaryType(expType),
                           or(result.types, [expType.types.$1.type]))
            };
          },
          recur(env,
                typeInfo,
                typeVarMap,
                expType.types.$1.type,
                index,
                Z.concat(propPath, ['$1']),
                Z.chain(expType.types.$1.extractor, values))
        );

      case BINARY:
        return Z.chain(
          function(result) {
            var $1s = result.types;
            return Z.map(
              function(result) {
                var $2s = result.types;
                return {
                  typeVarMap: result.typeVarMap,
                  types: xprod(expType,
                               or($1s, [expType.types.$1.type]),
                               or($2s, [expType.types.$2.type]))
                };
              },
              recur(env,
                    typeInfo,
                    result.typeVarMap,
                    expType.types.$2.type,
                    index,
                    Z.concat(propPath, ['$2']),
                    Z.chain(expType.types.$2.extractor, values))
            );
          },
          recur(env,
                typeInfo,
                typeVarMap,
                expType.types.$1.type,
                index,
                Z.concat(propPath, ['$1']),
                Z.chain(expType.types.$1.extractor, values))
        );

      case RECORD:
        return Z.reduce(function(e, k) {
          return Z.chain(function(r) {
            return recur(env,
                         typeInfo,
                         r.typeVarMap,
                         expType.types[k].type,
                         index,
                         Z.concat(propPath, [k]),
                         Z.chain(expType.types[k].extractor, values));
          }, e);
        }, Right({typeVarMap: typeVarMap, types: [expType]}), expType.keys);

      default:
        return Right({typeVarMap: typeVarMap, types: [expType]});
    }
  }

  //# test :: Array Type -> Type -> a -> Boolean
  //.
  //. Takes an environment, a type, and any value. Returns `true` if the value
  //. is a member of the type; `false` otherwise.
  //.
  //. The environment is only significant if the type contains
  //. [type variables][].
  //.
  //. One may define a more restrictive type in terms of a more general one:
  //.
  //. ```javascript
  //. //    NonNegativeInteger :: Type
  //. const NonNegativeInteger = $.NullaryType(
  //.   'my-package/NonNegativeInteger',
  //.   'http://example.com/my-package#NonNegativeInteger',
  //.   x => $.test([], $.Integer, x) && x >= 0
  //. );
  //. ```
  //.
  //. Using types as predicates is useful in other contexts too. One could,
  //. for example, define a [record type][] for each endpoint of a REST API
  //. and validate the bodies of incoming POST requests against these types.
  function test(env, t, x) {
    var typeInfo = {name: 'name', constraints: {}, types: [t]};
    return satisfactoryTypes(env, typeInfo, {}, t, 0, [], [x]).isRight;
  }

  //. ### Type constructors
  //.
  //. sanctuary-def provides several functions for defining types.

  //# NullaryType :: String -> String -> (Any -> Boolean) -> Type
  //.
  //. Type constructor for types with no type variables (such as [`Number`][]).
  //.
  //. To define a nullary type `t` one must provide:
  //.
  //.   - the name of `t` (exposed as `t.name`);
  //.
  //.   - the documentation URL of `t` (exposed as `t.url`); and
  //.
  //.   - a predicate which accepts any JavaScript value and returns `true` if
  //.     (and only if) the value is a member of `t`.
  //.
  //. For example:
  //.
  //. ```javascript
  //. //    Integer :: Type
  //. const Integer = $.NullaryType(
  //.   'my-package/Integer',
  //.   'http://example.com/my-package#Integer',
  //.   x => typeof x === 'number' &&
  //.        Math.floor(x) === x &&
  //.        x >= Number.MIN_SAFE_INTEGER &&
  //.        x <= Number.MAX_SAFE_INTEGER
  //. );
  //.
  //. //    NonZeroInteger :: Type
  //. const NonZeroInteger = $.NullaryType(
  //.   'my-package/NonZeroInteger',
  //.   'http://example.com/my-package#NonZeroInteger',
  //.   x => $.test([], Integer, x) && x !== 0
  //. );
  //.
  //. //    rem :: Integer -> NonZeroInteger -> Integer
  //. const rem =
  //. def('rem', {}, [Integer, NonZeroInteger, Integer], (x, y) => x % y);
  //.
  //. rem(42, 5);
  //. // => 2
  //.
  //. rem(0.5);
  //. // ! TypeError: Invalid value
  //. //
  //. //   rem :: Integer -> NonZeroInteger -> Integer
  //. //          ^^^^^^^
  //. //             1
  //. //
  //. //   1)  0.5 :: Number
  //. //
  //. //   The value at position 1 is not a member of ‘Integer’.
  //.
  //. rem(42, 0);
  //. // ! TypeError: Invalid value
  //. //
  //. //   rem :: Integer -> NonZeroInteger -> Integer
  //. //                     ^^^^^^^^^^^^^^
  //. //                           1
  //. //
  //. //   1)  0 :: Number
  //. //
  //. //   The value at position 1 is not a member of ‘NonZeroInteger’.
  //. ```
  function NullaryType(name, url, test) {
    function format(outer, inner) {
      return outer(stripNamespace(name));
    }
    return new _Type(NULLARY, name, url, format, test, [], {});
  }

  var CheckedNullaryType =
  def('NullaryType',
      {},
      [String_, String_, Function_([Any, Boolean_]), Type],
      NullaryType);

  //# UnaryType :: String -> String -> (Any -> Boolean) -> (t a -> Array a) -> (Type -> Type)
  //.
  //. Type constructor for types with one type variable (such as [`Array`][]).
  //.
  //. To define a unary type `t a` one must provide:
  //.
  //.   - the name of `t` (exposed as `t.name`);
  //.
  //.   - the documentation URL of `t` (exposed as `t.url`);
  //.
  //.   - a predicate which accepts any JavaScript value and returns `true`
  //.     if (and only if) the value is a member of `t x` for some type `x`;
  //.
  //.   - a function which takes any value of type `t a` and returns an array
  //.     of the values of type `a` contained in the `t` (exposed as
  //.     `t.types.$1.extractor`); and
  //.
  //.   - the type of `a` (exposed as `t.types.$1.type`).
  //.
  //. For example:
  //.
  //. ```javascript
  //. const type = require('sanctuary-type-identifiers');
  //.
  //. //    maybeTypeIdent :: String
  //. const maybeTypeIdent = 'my-package/Maybe';
  //.
  //. //    Maybe :: Type -> Type
  //. const Maybe = $.UnaryType(
  //.   maybeTypeIdent,
  //.   'http://example.com/my-package#Maybe',
  //.   x => type(x) === maybeTypeIdent,
  //.   maybe => maybe.isJust ? [maybe.value] : []
  //. );
  //.
  //. //    MaybeTypeRep :: TypeRep Maybe
  //. const MaybeTypeRep = {'@@type': maybeTypeIdent};
  //.
  //. //    Nothing :: Maybe a
  //. const Nothing = {
  //.   constructor: MaybeTypeRep,
  //.   isJust: false,
  //.   isNothing: true,
  //.   toString: () => 'Nothing',
  //. };
  //.
  //. //    Just :: a -> Maybe a
  //. const Just = x => ({
  //.   constructor: MaybeTypeRep,
  //.   isJust: true,
  //.   isNothing: false,
  //.   toString: () => 'Just(' + Z.toString(x) + ')',
  //.   value: x,
  //. });
  //.
  //. //    fromMaybe :: a -> Maybe a -> a
  //. const fromMaybe =
  //. def('fromMaybe', {}, [a, Maybe(a), a], (x, m) => m.isJust ? m.value : x);
  //.
  //. fromMaybe(0, Just(42));
  //. // => 42
  //.
  //. fromMaybe(0, Nothing);
  //. // => 0
  //.
  //. fromMaybe(0, Just('XXX'));
  //. // ! TypeError: Type-variable constraint violation
  //. //
  //. //   fromMaybe :: a -> Maybe a -> a
  //. //                ^          ^
  //. //                1          2
  //. //
  //. //   1)  0 :: Number
  //. //
  //. //   2)  "XXX" :: String
  //. //
  //. //   Since there is no type of which all the above values are members, the type-variable constraint has been violated.
  //. ```
  function UnaryType(name, url, test, _1) {
    return function($1) {
      function format(outer, inner) {
        return outer('(' + stripNamespace(name) + ' ') +
               inner('$1')(String($1)) + outer(')');
      }
      var types = {$1: {extractor: _1, type: $1}};
      return new _Type(UNARY, name, url, format, test, ['$1'], types);
    };
  }

  var CheckedUnaryType =
  def('UnaryType',
      {},
      [String_,
       String_,
       Function_([Any, Boolean_]),
       Function_([Unchecked('t a'), Array_(Unchecked('a'))]),
       AnyFunction],
      function(name, url, test, _1) {
        return def(stripNamespace(name),
                   {},
                   [Type, Type],
                   UnaryType(name, url, test, _1));
      });

  //  fromUnaryType :: Type -> (Type -> Type)
  function fromUnaryType(t) {
    return UnaryType(t.name, t.url, t._test, t.types.$1.extractor);
  }

  //# BinaryType :: String -> String -> (Any -> Boolean) -> (t a b -> Array a) -> (t a b -> Array b) -> (Type -> Type -> Type)
  //.
  //. Type constructor for types with two type variables (such as [`Pair`][]).
  //.
  //. To define a binary type `t a b` one must provide:
  //.
  //.   - the name of `t` (exposed as `t.name`);
  //.
  //.   - the documentation URL of `t` (exposed as `t.url`);
  //.
  //.   - a predicate which accepts any JavaScript value and returns `true`
  //.     if (and only if) the value is a member of `t x y` for some types
  //.     `x` and `y`;
  //.
  //.   - a function which takes any value of type `t a b` and returns an array
  //.     of the values of type `a` contained in the `t` (exposed as
  //.     `t.types.$1.extractor`);
  //.
  //.   - a function which takes any value of type `t a b` and returns an array
  //.     of the values of type `b` contained in the `t` (exposed as
  //.     `t.types.$2.extractor`);
  //.
  //.   - the type of `a` (exposed as `t.types.$1.type`); and
  //.
  //.   - the type of `b` (exposed as `t.types.$2.type`).
  //.
  //. For example:
  //.
  //. ```javascript
  //. const type = require('sanctuary-type-identifiers');
  //.
  //. //    pairTypeIdent :: String
  //. const pairTypeIdent = 'my-package/Pair';
  //.
  //. //    $Pair :: Type -> Type -> Type
  //. const $Pair = $.BinaryType(
  //.   pairTypeIdent,
  //.   'http://example.com/my-package#Pair',
  //.   x => type(x) === pairTypeIdent,
  //.   pair => [pair[0]],
  //.   pair => [pair[1]]
  //. );
  //.
  //. //    PairTypeRep :: TypeRep Pair
  //. const PairTypeRep = {'@@type': pairTypeIdent};
  //.
  //. //    Pair :: a -> b -> Pair a b
  //. const Pair = def('Pair', {}, [a, b, $Pair(a, b)], (x, y) => ({
  //.   '0': x,
  //.   '1': y,
  //.   constructor: PairTypeRep,
  //.   length: 2,
  //.   toString: () => 'Pair(' + Z.toString(x) + ', ' + Z.toString(y) + ')',
  //. }));
  //.
  //. //    Rank :: Type
  //. const Rank = $.NullaryType(
  //.   'my-package/Rank',
  //.   'http://example.com/my-package#Rank',
  //.   x => typeof x === 'string' && /^([A23456789JQK]|10)$/.test(x)
  //. );
  //.
  //. //    Suit :: Type
  //. const Suit = $.NullaryType(
  //.   'my-package/Suit',
  //.   'http://example.com/my-package#Suit',
  //.   x => typeof x === 'string' && /^[\u2660\u2663\u2665\u2666]$/.test(x)
  //. );
  //.
  //. //    Card :: Type
  //. const Card = $Pair(Rank, Suit);
  //.
  //. //    showCard :: Card -> String
  //. const showCard =
  //. def('showCard', {}, [Card, $.String], card => card[0] + card[1]);
  //.
  //. showCard(Pair('A', '♠'));
  //. // => 'A♠'
  //.
  //. showCard(Pair('X', '♠'));
  //. // ! TypeError: Invalid value
  //. //
  //. //   showCard :: Pair Rank Suit -> String
  //. //                    ^^^^
  //. //                     1
  //. //
  //. //   1)  "X" :: String
  //. //
  //. //   The value at position 1 is not a member of ‘Rank’.
  //. ```
  function BinaryType(name, url, test, _1, _2) {
    return function($1, $2) {
      function format(outer, inner) {
        return outer('(' + stripNamespace(name) + ' ') +
               inner('$1')(String($1)) + outer(' ') +
               inner('$2')(String($2)) + outer(')');
      }
      var types = {$1: {extractor: _1, type: $1},
                   $2: {extractor: _2, type: $2}};
      return new _Type(BINARY, name, url, format, test, ['$1', '$2'], types);
    };
  }

  var CheckedBinaryType =
  def('BinaryType',
      {},
      [String_,
       String_,
       Function_([Any, Boolean_]),
       Function_([Unchecked('t a b'), Array_(Unchecked('a'))]),
       Function_([Unchecked('t a b'), Array_(Unchecked('b'))]),
       AnyFunction],
      function(name, url, test, _1, _2) {
        return def(stripNamespace(name),
                   {},
                   [Type, Type, Type],
                   BinaryType(name, url, test, _1, _2));
      });

  //  xprod :: (Type, Array Type, Array Type) -> Array Type
  function xprod(t, $1s, $2s) {
    var specialize = BinaryType(t.name,
                                t.url,
                                t._test,
                                t.types.$1.extractor,
                                t.types.$2.extractor);
    var $types = [];
    $1s.forEach(function($1) {
      $2s.forEach(function($2) {
        $types.push(specialize($1, $2));
      });
    });
    return $types;
  }

  //# EnumType :: String -> String -> Array Any -> Type
  //.
  //. Type constructor for [enumerated types][] (such as [`RegexFlags`][]).
  //.
  //. To define an enumerated type `t` one must provide:
  //.
  //.   - the name of `t` (exposed as `t.name`);
  //.
  //.   - the documentation URL of `t` (exposed as `t.url`); and
  //.
  //.   - an array of distinct values.
  //.
  //. For example:
  //.
  //. ```javascript
  //. //    Denomination :: Type
  //. const Denomination = $.EnumType(
  //.   'my-package/Denomination',
  //.   'http://example.com/my-package#Denomination',
  //.   [10, 20, 50, 100, 200]
  //. );
  //. ```
  function EnumType(name, url, members) {
    return NullaryType(name, url, memberOf(members));
  }

  var CheckedEnumType =
  def('EnumType', {}, [String_, String_, Array_(Any), Type], EnumType);

  //# RecordType :: StrMap Type -> Type
  //.
  //. `RecordType` is used to construct record types. The type definition
  //. specifies the name and type of each required field.
  //.
  //. To define a record type one must provide:
  //.
  //.   - an object mapping field name to type.
  //.
  //. For example:
  //.
  //. ```javascript
  //. //    Point :: Type
  //. const Point = $.RecordType({x: $.FiniteNumber, y: $.FiniteNumber});
  //.
  //. //    dist :: Point -> Point -> FiniteNumber
  //. const dist =
  //. def('dist', {}, [Point, Point, $.FiniteNumber],
  //.     (p, q) => Math.sqrt(Math.pow(p.x - q.x, 2) +
  //.                         Math.pow(p.y - q.y, 2)));
  //.
  //. dist({x: 0, y: 0}, {x: 3, y: 4});
  //. // => 5
  //.
  //. dist({x: 0, y: 0}, {x: 3, y: 4, color: 'red'});
  //. // => 5
  //.
  //. dist({x: 0, y: 0}, {x: NaN, y: NaN});
  //. // ! TypeError: Invalid value
  //. //
  //. //   dist :: { x :: FiniteNumber, y :: FiniteNumber } -> { x :: FiniteNumber, y :: FiniteNumber } -> FiniteNumber
  //. //                                                              ^^^^^^^^^^^^
  //. //                                                                   1
  //. //
  //. //   1)  NaN :: Number
  //. //
  //. //   The value at position 1 is not a member of ‘FiniteNumber’.
  //.
  //. dist(0);
  //. // ! TypeError: Invalid value
  //. //
  //. //   dist :: { x :: FiniteNumber, y :: FiniteNumber } -> { x :: FiniteNumber, y :: FiniteNumber } -> FiniteNumber
  //. //           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  //. //                              1
  //. //
  //. //   1)  0 :: Number
  //. //
  //. //   The value at position 1 is not a member of ‘{ x :: FiniteNumber, y :: FiniteNumber }’.
  //. ```
  function RecordType(fields) {
    var keys = Object.keys(fields).sort();

    function format(outer, inner) {
      return wrap(outer('{'))(outer(' }'))(Z.map(function(k) {
        var t = fields[k];
        return outer(' ' + k + ' :: ') +
               unless(t.type === RECORD || isEmpty(t.keys),
                      stripOutermostParens,
                      inner(k)(String(t)));
      }, keys).join(outer(',')));
    }

    function test(x) {
      return x != null &&
             keys.every(function(k) { return hasOwnProperty.call(x, k); });
    }

    var $types = {};
    keys.forEach(function(k) {
      $types[k] = {extractor: function(x) { return [x[k]]; }, type: fields[k]};
    });

    return new _Type(RECORD, '', '', format, test, keys, $types);
  }

  var CheckedRecordType =
  def('RecordType', {}, [StrMap(Type), Type], RecordType);

  //# TypeVariable :: String -> Type
  //.
  //. Polymorphism is powerful. Not being able to define a function for
  //. all types would be very limiting indeed: one couldn't even define the
  //. identity function!
  //.
  //. Before defining a polymorphic function one must define one or more type
  //. variables:
  //.
  //. ```javascript
  //. const a = $.TypeVariable('a');
  //. const b = $.TypeVariable('b');
  //.
  //. //    id :: a -> a
  //. const id = def('id', {}, [a, a], x => x);
  //.
  //. id(42);
  //. // => 42
  //.
  //. id(null);
  //. // => null
  //. ```
  //.
  //. The same type variable may be used in multiple positions, creating a
  //. constraint:
  //.
  //. ```javascript
  //. //    cmp :: a -> a -> Number
  //. const cmp =
  //. def('cmp', {}, [a, a, $.Number], (x, y) => x < y ? -1 : x > y ? 1 : 0);
  //.
  //. cmp(42, 42);
  //. // => 0
  //.
  //. cmp('a', 'z');
  //. // => -1
  //.
  //. cmp('z', 'a');
  //. // => 1
  //.
  //. cmp(0, '1');
  //. // ! TypeError: Type-variable constraint violation
  //. //
  //. //   cmp :: a -> a -> Number
  //. //          ^    ^
  //. //          1    2
  //. //
  //. //   1)  0 :: Number
  //. //
  //. //   2)  "1" :: String
  //. //
  //. //   Since there is no type of which all the above values are members, the type-variable constraint has been violated.
  //. ```
  function TypeVariable(name) {
    return new _Type(VARIABLE, name, '', always2(name), K(true), [], {});
  }

  var CheckedTypeVariable =
  def('TypeVariable', {}, [String_, Type], TypeVariable);

  //# UnaryTypeVariable :: String -> (Type -> Type)
  //.
  //. Combines [`UnaryType`][] and [`TypeVariable`][].
  //.
  //. To define a unary type variable `t a` one must provide:
  //.
  //.   - a name (conventionally matching `^[a-z]$`); and
  //.
  //.   - the type of `a` (exposed as `t.types.$1.type`).
  //.
  //. Consider the type of a generalized `map`:
  //.
  //. ```haskell
  //. map :: Functor f => (a -> b) -> f a -> f b
  //. ```
  //.
  //. `f` is a unary type variable. With two (nullary) type variables, one
  //. unary type variable, and one [type class][] it's possible to define a
  //. fully polymorphic `map` function:
  //.
  //. ```javascript
  //. const $ = require('sanctuary-def');
  //. const Z = require('sanctuary-type-classes');
  //.
  //. const a = $.TypeVariable('a');
  //. const b = $.TypeVariable('b');
  //. const f = $.UnaryTypeVariable('f');
  //.
  //. //    map :: Functor f => (a -> b) -> f a -> f b
  //. const map =
  //. def('map',
  //.     {f: [Z.Functor]},
  //.     [$.Function([a, b]), f(a), f(b)],
  //.     Z.map);
  //. ```
  //.
  //. Whereas a regular type variable is fully resolved (`a` might become
  //. `Array (Array String)`, for example), a unary type variable defers to
  //. its type argument, which may itself be a type variable. The type argument
  //. corresponds to the type argument of a unary type or the *second* type
  //. argument of a binary type. The second type argument of `Map k v`, for
  //. example, is `v`. One could replace `Functor => f` with `Map k` or with
  //. `Map Integer`, but not with `Map`.
  //.
  //. This shallow inspection makes it possible to constrain a value's "outer"
  //. and "inner" types independently.
  function UnaryTypeVariable(name) {
    return function($1) {
      function format(outer, inner) {
        return outer('(' + name + ' ') + inner('$1')(String($1)) + outer(')');
      }
      var types = {$1: {extractor: K([]), type: $1}};
      return new _Type(VARIABLE, name, '', format, K(true), ['$1'], types);
    };
  }

  var CheckedUnaryTypeVariable =
  def('UnaryTypeVariable',
      {},
      [String_, AnyFunction],
      function(name) {
        return def(name, {}, [Type, Type], UnaryTypeVariable(name));
      });

  //# BinaryTypeVariable :: String -> (Type -> Type -> Type)
  //.
  //. Combines [`BinaryType`][] and [`TypeVariable`][].
  //.
  //. To define a binary type variable `t a b` one must provide:
  //.
  //.   - a name (conventionally matching `^[a-z]$`);
  //.
  //.   - the type of `a` (exposed as `t.types.$1.type`); and
  //.
  //.   - the type of `b` (exposed as `t.types.$2.type`).
  //.
  //. The more detailed explanation of [`UnaryTypeVariable`][] also applies to
  //. `BinaryTypeVariable`.
  function BinaryTypeVariable(name) {
    return function($1, $2) {
      function format(outer, inner) {
        return outer('(' + name + ' ') + inner('$1')(String($1)) + outer(' ') +
                                         inner('$2')(String($2)) + outer(')');
      }
      var keys = ['$1', '$2'];
      var types = {$1: {extractor: K([]), type: $1},
                   $2: {extractor: K([]), type: $2}};
      return new _Type(VARIABLE, name, '', format, K(true), keys, types);
    };
  }

  var CheckedBinaryTypeVariable =
  def('BinaryTypeVariable',
      {},
      [String_, AnyFunction],
      function(name) {
        return def(name, {}, [Type, Type, Type], BinaryTypeVariable(name));
      });

  //# Thunk :: Type -> Type
  //.
  //. `$.Thunk(T)` is shorthand for `$.Function([T])`, the type comprising
  //. every nullary function (thunk) which returns a value of type `T`.
  var Thunk =
  def('Thunk',
      {},
      [Type, Type],
      function(t) { return Function_([t]); });

  //# Predicate :: Type -> Type
  //.
  //. `$.Predicate(T)` is shorthand for `$.Function([T, $.Boolean])`, the type
  //. comprising every predicate function which takes a value of type `T`.
  var Predicate =
  def('Predicate',
      {},
      [Type, Type],
      function(t) { return Function_([t, Boolean_]); });

  //. ### Type classes
  //.
  //. `concatS`, defined earlier, is a function which concatenates two strings.
  //. This is overly restrictive, since other types support concatenation
  //. (Array, for example).
  //.
  //. One could use a type variable to define a polymorphic "concat" function:
  //.
  //. ```javascript
  //. //    _concat :: a -> a -> a
  //. const _concat =
  //. def('_concat', {}, [a, a, a], (x, y) => x.concat(y));
  //.
  //. _concat('fizz', 'buzz');
  //. // => 'fizzbuzz'
  //.
  //. _concat([1, 2], [3, 4]);
  //. // => [1, 2, 3, 4]
  //.
  //. _concat([1, 2], 'buzz');
  //. // ! TypeError: Type-variable constraint violation
  //. //
  //. //   _concat :: a -> a -> a
  //. //              ^    ^
  //. //              1    2
  //. //
  //. //   1)  [1, 2] :: Array Number
  //. //
  //. //   2)  "buzz" :: String
  //. //
  //. //   Since there is no type of which all the above values are members, the type-variable constraint has been violated.
  //. ```
  //.
  //. The type of `_concat` is misleading: it suggests that it can operate on
  //. any two values of *any* one type. In fact there's an implicit constraint,
  //. since the type must support concatenation (in [mathematical][semigroup]
  //. terms, the type must have a [semigroup][FL:Semigroup]). The run-time type
  //. errors that result when this constraint is violated are not particularly
  //. descriptive:
  //.
  //. ```javascript
  //. _concat({}, {});
  //. // ! TypeError: undefined is not a function
  //.
  //. _concat(null, null);
  //. // ! TypeError: Cannot read property 'concat' of null
  //. ```
  //.
  //. The solution is to constrain `a` by first defining a [`TypeClass`][]
  //. value, then specifying the constraint in the definition of the "concat"
  //. function:
  //.
  //. ```javascript
  //. const Z = require('sanctuary-type-classes');
  //.
  //. //    Semigroup :: TypeClass
  //. const Semigroup = Z.TypeClass(
  //.   'my-package/Semigroup',
  //.   'http://example.com/my-package#Semigroup',
  //.   [],
  //.   x => x != null && typeof x.concat === 'function'
  //. );
  //.
  //. //    concat :: Semigroup a => a -> a -> a
  //. const concat =
  //. def('concat', {a: [Semigroup]}, [a, a, a], (x, y) => x.concat(y));
  //.
  //. concat([1, 2], [3, 4]);
  //. // => [1, 2, 3, 4]
  //.
  //. concat({}, {});
  //. // ! TypeError: Type-class constraint violation
  //. //
  //. //   concat :: Semigroup a => a -> a -> a
  //. //             ^^^^^^^^^^^    ^
  //. //                            1
  //. //
  //. //   1)  {} :: Object, StrMap ???
  //. //
  //. //   ‘concat’ requires ‘a’ to satisfy the Semigroup type-class constraint; the value at position 1 does not.
  //. //
  //. //   See http://example.com/my-package#Semigroup for information about the my-package/Semigroup type class.
  //.
  //. concat(null, null);
  //. // ! TypeError: Type-class constraint violation
  //. //
  //. //   concat :: Semigroup a => a -> a -> a
  //. //             ^^^^^^^^^^^    ^
  //. //                            1
  //. //
  //. //   1)  null :: Null
  //. //
  //. //   ‘concat’ requires ‘a’ to satisfy the Semigroup type-class constraint; the value at position 1 does not.
  //. //
  //. //   See http://example.com/my-package#Semigroup for information about the my-package/Semigroup type class.
  //. ```
  //.
  //. Multiple constraints may be placed on a type variable by including
  //. multiple `TypeClass` values in the array (e.g. `{a: [Foo, Bar, Baz]}`).

  //  checkValue :: ... -> Undefined
  function checkValue(
    env,                // :: Array Type
    typeInfo,           // :: TypeInfo
    $typeVarMapBox,     // :: Box TypeVarMap
    index,              // :: Integer
    propPath,           // :: PropPath
    t,                  // :: Type
    value               // :: Any
  ) {
    if (t.type === VARIABLE) {
      $typeVarMapBox[0] =
        updateTypeVarMap(env, $typeVarMapBox[0], t, index, propPath, [value]);
      if (isEmpty($typeVarMapBox[0][t.name].types)) {
        throw typeVarConstraintViolation(
          env,
          typeInfo,
          index,
          propPath,
          $typeVarMapBox[0][t.name].valuesByPath
        );
      }
    } else if (!test(env, t, value)) {
      throw invalidValue(env, typeInfo, index, propPath, value);
    }
  }

  //  wrapFunction :: ... -> Function
  function wrapFunction(
    env,                // :: Array Type
    typeInfo,           // :: TypeInfo
    $typeVarMapBox,     // :: Box TypeVarMap
    index,              // :: Integer
    f                   // :: Function
  ) {
    var expType = typeInfo.types[index];
    var numArgsExpected = expType.keys.length - 1;
    return arity(numArgsExpected, function() {
      var args = slice.call(arguments);
      if (args.length !== numArgsExpected) {
        throw invalidArgumentsLength(typeInfo, index, numArgsExpected, args);
      }
      function checkValue$(propPath, t, x) {
        checkValue(env, typeInfo, $typeVarMapBox, index, propPath, t, x);
      }
      init(expType.keys).forEach(function(k, idx) {
        checkValue$([k], expType.types[k].type, args[idx]);
      });

      var output = f.apply(this, arguments);
      var k = last(expType.keys);
      checkValue$([k], expType.types[k].type, output);
      return output;
    });
  }

  //  wrapFunctionCond ::
  //    Array Type -> TypeInfo -> Box TypeVarMap -> Integer -> a -> a
  function wrapFunctionCond(env, typeInfo, $typeVarMapBox, index, value) {
    return typeInfo.types[index].type === FUNCTION ?
      wrapFunction(env, typeInfo, $typeVarMapBox, index, value) :
      value;
  }

  //  wrapFunctions :: ... -> Array Any
  function wrapFunctions(
    env,                // :: Array Type
    typeInfo,           // :: TypeInfo
    $typeVarMapBox,     // :: Box TypeVarMap
    values              // :: Array Any
  ) {
    return values.map(function(value, idx) {
      return wrapFunctionCond(env, typeInfo, $typeVarMapBox, idx, value);
    });
  }

  //  tooManyArguments :: (TypeInfo, Integer) -> Error
  //
  //  This function is used in `curry` when a function defined via `def`
  //  is applied to too many arguments.
  function tooManyArguments(typeInfo, numArgsReceived) {
    var numArgsExpected = typeInfo.types.length - 1;
    return new TypeError(trimTrailingSpaces(
      'Function applied to too many arguments\n\n' +
      typeSignature(typeInfo) + '\n\n' +
      q(typeInfo.name) + ' expected' +
      (numArgsExpected > 0 ? ' at most ' : ' ') + numArgs(numArgsExpected) +
      ' but received ' + numArgs(numArgsReceived) + '.\n'
    ));
  }

  //  constraintsRepr :: ... -> String
  function constraintsRepr(
    constraints,    // :: StrMap (Array TypeClass)
    outer,          // :: String -> String
    inner           // :: String -> TypeClass -> String -> String
  ) {
    var $reprs = [];
    Object.keys(constraints).sort().forEach(function(k) {
      var f = inner(k);
      constraints[k].forEach(function(typeClass) {
        $reprs.push(f(typeClass)(stripNamespace(typeClass.name) + ' ' + k));
      });
    });
    return when($reprs.length > 0,
                function(s) { return s + outer(' => '); },
                when($reprs.length > 1,
                     wrap(outer('('))(outer(')')),
                     $reprs.join(outer(', '))));
  }

  //  label :: String -> String -> String
  function label(label) {
    return function(s) {
      var delta = s.length - label.length;
      return strRepeat(' ', Math.floor(delta / 2)) + label +
             strRepeat(' ', Math.ceil(delta / 2));
    };
  }

  //  typeVarNames :: Type -> Array String
  function typeVarNames(t) {
    return Z.concat(
      t.type === VARIABLE ? [t.name] : [],
      Z.chain(function(k) { return typeVarNames(t.types[k].type); }, t.keys)
    );
  }

  //  showTypeWith :: TypeInfo -> Type -> String
  function showTypeWith(typeInfo) {
    var names = Z.chain(typeVarNames, typeInfo.types);
    return function(t) {
      var code = 'a'.charCodeAt(0);
      return unless(
        t.type === FUNCTION || t.type === RECORD || isEmpty(t.keys),
        stripOutermostParens,
        String(t).replace(/\bUnknown\b/g, function() {
          // eslint-disable-next-line no-plusplus
          do var name = String.fromCharCode(code++);
          while (names.indexOf(name) >= 0);
          return name;
        })
      );
    };
  }

  //  showTypeQuoted :: Type -> String
  function showTypeQuoted(t) {
    return q(unless(t.type === RECORD || isEmpty(t.keys),
                    stripOutermostParens,
                    String(t)));
  }

  //  showValuesAndTypes :: ... -> String
  function showValuesAndTypes(
    env,            // :: Array Type
    typeInfo,       // :: TypeInfo
    values,         // :: Array Any
    pos             // :: Integer
  ) {
    var showType = showTypeWith(typeInfo);
    return String(pos) + ')  ' + Z.map(function(x) {
      var types = determineActualTypesLoose(env, [x]);
      return Z.toString(x) + ' :: ' + Z.map(showType, types).join(', ');
    }, values).join('\n    ');
  }

  //  typeSignature :: TypeInfo -> String
  function typeSignature(typeInfo) {
    var reprs = Z.map(showTypeWith(typeInfo), typeInfo.types);
    var arity = reprs.length - 1;
    return typeInfo.name + ' :: ' +
             constraintsRepr(typeInfo.constraints, id, K(K(id))) +
             when(arity === 0, parenthesize, init(reprs).join(' -> ')) +
             ' -> ' + last(reprs);
  }

  //  _underline :: ... -> String
  function _underline(
    t,              // :: Type
    propPath,       // :: PropPath
    formatType3     // :: Type -> Array String -> String -> String
  ) {
    return unless(t.type === RECORD ||
                    isEmpty(t.keys) ||
                    t.type === FUNCTION && isEmpty(propPath) ||
                    !isEmpty(propPath),
                  stripOutermostParens,
                  formatType3(t)(propPath)(t.format(_, function(k) {
                    return K(_underline(t.types[k].type,
                                        Z.concat(propPath, [k]),
                                        formatType3));
                  })));
  }

  //  underline :: ... -> String
  function underline(
    typeInfo,               // :: TypeInfo
    underlineConstraint,    // :: String -> TypeClass -> String -> String
    formatType5
    // :: Integer -> (String -> String) -> Type -> PropPath -> String -> String
  ) {
    var st = typeInfo.types.reduce(function(st, t, index) {
      var formatType4 = formatType5(index);
      var counter = st.counter;
      function replace(s) { return label(String(counter += 1))(s); }
      return {
        carets: Z.concat(st.carets, [_underline(t, [], formatType4(r('^')))]),
        numbers: Z.concat(st.numbers,
                          [_underline(t, [], formatType4(replace))]),
        counter: counter
      };
    }, {carets: [], numbers: [], counter: 0});

    return typeSignature(typeInfo) + '\n' +
           _(typeInfo.name + ' :: ') +
             constraintsRepr(typeInfo.constraints, _, underlineConstraint) +
             st.carets.join(_(' -> ')) + '\n' +
           _(typeInfo.name + ' :: ') +
             constraintsRepr(typeInfo.constraints, _, K(K(_))) +
             st.numbers.join(_(' -> ')) + '\n';
  }

  //  resolvePropPath :: (Type, Array String) -> Type
  function resolvePropPath(t, propPath) {
    return Z.reduce(function(t, prop) { return t.types[prop].type; },
                    t,
                    propPath);
  }

  //  formatType6 ::
  //    PropPath -> Integer -> (String -> String) ->
  //      Type -> PropPath -> String -> String
  function formatType6(indexedPropPath) {
    return function(index_) {
      return function(f) {
        return function(t) {
          return function(propPath_) {
            var indexedPropPath_ = Z.concat([index_], propPath_);
            var p = isPrefix(indexedPropPath_)(indexedPropPath);
            var q = isPrefix(indexedPropPath)(indexedPropPath_);
            return p && q ? f : p ? id : _;
          };
        };
      };
    };
  }

  //  see :: (String, { name :: String, url :: String? }) -> String
  function see(label, record) {
    return record.url == null || record.url === '' ?
           '' :
           '\nSee ' + record.url +
           ' for information about the ' + record.name + ' ' + label + '.\n';
  }

  //  typeClassConstraintViolation :: ... -> Error
  function typeClassConstraintViolation(
    env,            // :: Array Type
    typeInfo,       // :: TypeInfo
    typeClass,      // :: TypeClass
    index,          // :: Integer
    propPath,       // :: PropPath
    value,          // :: Any
    typeVarMap      // :: TypeVarMap
  ) {
    var expType = resolvePropPath(typeInfo.types[index], propPath);
    return new TypeError(trimTrailingSpaces(
      'Type-class constraint violation\n\n' +
      underline(typeInfo,
                function(tvn) {
                  return function(tc) {
                    return tvn === expType.name && tc.name === typeClass.name ?
                      r('^') :
                      _;
                  };
                },
                formatType6(Z.concat([index], propPath))) +
      '\n' +
      showValuesAndTypes(env, typeInfo, [value], 1) + '\n\n' +
      q(typeInfo.name) + ' requires ' + q(expType.name) + ' to satisfy the ' +
      stripNamespace(typeClass.name) + ' type-class constraint; ' +
      'the value at position 1 does not.\n' +
      see('type class', typeClass)
    ));
  }

  //  typeVarConstraintViolation :: ... -> Error
  function typeVarConstraintViolation(
    env,            // :: Array Type
    typeInfo,       // :: TypeInfo
    index,          // :: Integer
    propPath,       // :: PropPath
    valuesByPath    // :: StrMap (Array Any)
  ) {
    //  If we apply an ‘a -> a -> a -> a’ function to Left('x'), Right(1), and
    //  Right(null) we'd like to avoid underlining the first argument position,
    //  since Left('x') is compatible with the other ‘a’ values.
    var key = JSON.stringify(Z.concat([index], propPath));
    var values = valuesByPath[key];

    //  Note: Sorting these keys lexicographically is not "correct", but it
    //  does the right thing for indexes less than 10.
    var keys = Object.keys(valuesByPath).sort().filter(function(k) {
      var values_ = valuesByPath[k];
      return (
        //  Keep X, the position at which the violation was observed.
        k === key ||
        //  Keep positions whose values are incompatible with the values at X.
        isEmpty(determineActualTypesStrict(env, Z.concat(values, values_)))
      );
    });

    var underlinedTypeVars =
    underlineTypeVars(typeInfo,
                      Z.reduce(function($valuesByPath, k) {
                        $valuesByPath[k] = valuesByPath[k];
                        return $valuesByPath;
                      }, {}, keys));

    return new TypeError(trimTrailingSpaces(
      values.length === 1 && isEmpty(determineActualTypesLoose(env, values)) ?
        'Unrecognized value\n\n' +
        underlinedTypeVars + '\n' +
        '1)  ' + Z.toString(values[0]) + ' :: (no types)\n\n' +
        toMarkdownList(
          'The environment is empty! ' +
          'Polymorphic functions require a non-empty environment.\n',
          'The value at position 1 is not a member of any type in ' +
          'the environment.\n\n' +
          'The environment contains the following types:\n\n',
          showTypeWith(typeInfo),
          env
        ) :
      // else
        'Type-variable constraint violation\n\n' +
        underlinedTypeVars + '\n' +
        Z.reduce(function(st, k) {
          var values = valuesByPath[k];
          return isEmpty(values) ? st : {
            idx: st.idx + 1,
            s: st.s +
               showValuesAndTypes(env, typeInfo, values, st.idx + 1) +
               '\n\n'
          };
        }, {idx: 0, s: ''}, keys).s +
        'Since there is no type of which all the above values are ' +
        'members, the type-variable constraint has been violated.\n'
    ));
  }

  //  invalidValue :: ... -> Error
  function invalidValue(
    env,            // :: Array Type
    typeInfo,       // :: TypeInfo
    index,          // :: Integer
    propPath,       // :: PropPath
    value           // :: Any
  ) {
    var t = resolvePropPath(typeInfo.types[index], propPath);
    return new TypeError(trimTrailingSpaces(
      'Invalid value\n\n' +
      underline(typeInfo,
                K(K(_)),
                formatType6(Z.concat([index], propPath))) +
      '\n' +
      showValuesAndTypes(env, typeInfo, [value], 1) + '\n\n' +
      'The value at position 1 is not a member of ' + showTypeQuoted(t) + '.' +
      '\n' +
      see('type', t)
    ));
  }

  //  invalidArgumentsLength :: ... -> Error
  //
  //  This function is used in `wrapFunction` to ensure that higher-order
  //  functions defined via `def` only ever apply a function argument to
  //  the correct number of arguments.
  function invalidArgumentsLength(
    typeInfo,           // :: TypeInfo
    index,              // :: Integer
    numArgsExpected,    // :: Integer
    args                // :: Array Any
  ) {
    return new TypeError(trimTrailingSpaces(
      q(typeInfo.name) + ' applied ' + showTypeQuoted(typeInfo.types[index]) +
      ' to the wrong number of arguments\n\n' +
      underline(
        typeInfo,
        K(K(_)),
        function(index_) {
          return function(f) {
            return function(t) {
              return function(propPath) {
                return function(s) {
                  return index_ === index ?
                    String(t).replace(
                      /^[(](.*) -> (.*)[)]$/,
                      function(s, $1, $2) {
                        return _('(') + f($1) + _(' -> ' + $2 + ')');
                      }
                    ) :
                    _(s);
                };
              };
            };
          };
        }
      ) + '\n' +
      'Expected ' + numArgs(numArgsExpected) +
      ' but received ' + numArgs(args.length) +
      toMarkdownList('.\n', ':\n\n', Z.toString, args)
    ));
  }

  //  assertRight :: Either (() -> Error) a -> a !
  function assertRight(either) {
    if (either.isLeft) throw either.value();
    return either.value;
  }

  //  curry :: ... -> Function
  function curry(
    opts,         // :: Options
    typeInfo,     // :: TypeInfo
    _typeVarMap,  // :: TypeVarMap
    _values,      // :: Array Any
    _indexes,     // :: Array Integer
    impl          // :: Function
  ) {
    var n = typeInfo.types.length - 1;

    var curried = arity(_indexes.length, function() {
      if (opts.checkTypes) {
        var delta = _indexes.length - arguments.length;
        if (delta < 0) throw tooManyArguments(typeInfo, n - delta);
      }
      var typeVarMap = _typeVarMap;
      var values = _values.slice();
      var indexes = [];
      for (var idx = 0; idx < _indexes.length; idx += 1) {
        var index = _indexes[idx];

        if (idx < arguments.length &&
            !(typeof arguments[idx] === 'object' &&
              arguments[idx] != null &&
              arguments[idx]['@@functional/placeholder'] === true)) {

          var value = arguments[idx];
          if (opts.checkTypes) {
            var result = satisfactoryTypes(opts.env,
                                           typeInfo,
                                           typeVarMap,
                                           typeInfo.types[index],
                                           index,
                                           [],
                                           [value]);
            typeVarMap = assertRight(result).typeVarMap;
          }
          values[index] = value;
        } else {
          indexes.push(index);
        }
      }
      if (isEmpty(indexes)) {
        if (opts.checkTypes) {
          var returnValue = impl.apply(this,
                                       wrapFunctions(opts.env,
                                                     typeInfo,
                                                     [typeVarMap],
                                                     values));
          assertRight(satisfactoryTypes(opts.env,
                                        typeInfo,
                                        typeVarMap,
                                        typeInfo.types[n],
                                        n,
                                        [],
                                        [returnValue]));
          return wrapFunctionCond(env, typeInfo, [typeVarMap], n, returnValue);
        } else {
          return impl.apply(this, values);
        }
      } else {
        return curry(opts, typeInfo, typeVarMap, values, indexes, impl);
      }
    });

    var showType = showTypeWith(typeInfo);
    curried.inspect = curried.toString = function() {
      var vReprs = [];
      var tReprs = [];
      for (var idx = 0, placeholders = 0; idx < n; idx += 1) {
        if (_indexes.indexOf(idx) >= 0) {
          placeholders += 1;
          tReprs.push(showType(typeInfo.types[idx]));
        } else {
          while (placeholders > 0) {
            vReprs.push('__');
            placeholders -= 1;
          }
          vReprs.push(Z.toString(_values[idx]));
        }
      }
      return typeInfo.name +
             when(vReprs.length > 0, parenthesize, vReprs.join(', ')) +
             ' :: ' +
             constraintsRepr(typeInfo.constraints, id, K(K(id))) +
             when(n === 0, parenthesize, tReprs.join(' -> ')) +
             ' -> ' + showType(typeInfo.types[n]);
    };

    return curried;
  }

  function _create(opts) {
    function def(name, constraints, expTypes, impl) {
      var values = new Array(expTypes.length - 1);
      if (values.length > 9) {
        throw new RangeError(q(def.name) + ' cannot define a function ' +
                             'with arity greater than nine');
      }
      return curry(opts,
                   {name: name, constraints: constraints, types: expTypes},
                   {},
                   values,
                   range(0, values.length),
                   impl);
    }
    return def(def.name,
               {},
               [String_,
                StrMap(Array_(TypeClass)),
                NonEmpty(Array_(Type)),
                AnyFunction,
                AnyFunction],
               def);
  }

  var create =
  def('create',
      {},
      [RecordType({checkTypes: Boolean_, env: Array_(Any)}), AnyFunction],
      _create);

  //  fromUncheckedUnaryType :: (Type -> Type) -> (Type -> Type)
  function fromUncheckedUnaryType(typeConstructor) {
    var t = typeConstructor(Unknown);
    var _1 = t.types.$1.extractor;
    return CheckedUnaryType(t.name, t.url, t._test, _1);
  }

  //  fromUncheckedBinaryType :: ((Type, Type) -> Type) ->
  //                             (Type -> Type -> Type)
  function fromUncheckedBinaryType(typeConstructor) {
    var t = typeConstructor(Unknown, Unknown);
    var _1 = t.types.$1.extractor;
    var _2 = t.types.$2.extractor;
    return CheckedBinaryType(t.name, t.url, t._test, _1, _2);
  }

  return {
    __: __,
    Any: Any,
    AnyFunction: AnyFunction,
    Arguments: Arguments,
    Array: fromUncheckedUnaryType(Array_),
    Boolean: Boolean_,
    Date: Date_,
    Error: Error_,
    FiniteNumber: FiniteNumber,
    Function: def('Function', {}, [Array_(Type), Type], Function_),
    GlobalRegExp: GlobalRegExp,
    Integer: Integer,
    NegativeFiniteNumber: NegativeFiniteNumber,
    NegativeInteger: NegativeInteger,
    NegativeNumber: NegativeNumber,
    NonEmpty: NonEmpty,
    NonGlobalRegExp: NonGlobalRegExp,
    NonNegativeInteger: NonNegativeInteger,
    NonZeroFiniteNumber: NonZeroFiniteNumber,
    NonZeroInteger: NonZeroInteger,
    NonZeroValidNumber: NonZeroValidNumber,
    Null: Null,
    Nullable: fromUncheckedUnaryType(Nullable),
    Number: Number_,
    Object: Object_,
    Pair: fromUncheckedBinaryType(Pair),
    PositiveFiniteNumber: PositiveFiniteNumber,
    PositiveInteger: PositiveInteger,
    PositiveNumber: PositiveNumber,
    RegExp: RegExp_,
    RegexFlags: RegexFlags,
    StrMap: fromUncheckedUnaryType(StrMap),
    String: String_,
    Symbol: Symbol_,
    Type: Type,
    TypeClass: TypeClass,
    Undefined: Undefined,
    Unknown: Unknown,
    ValidDate: ValidDate,
    ValidNumber: ValidNumber,
    env: env,
    create: create,
    test: def('test', {}, [Array_(Type), Type, Any, Boolean_], test),
    NullaryType: CheckedNullaryType,
    UnaryType: CheckedUnaryType,
    BinaryType: CheckedBinaryType,
    EnumType: CheckedEnumType,
    RecordType: CheckedRecordType,
    TypeVariable: CheckedTypeVariable,
    UnaryTypeVariable: CheckedUnaryTypeVariable,
    BinaryTypeVariable: CheckedBinaryTypeVariable,
    Thunk: Thunk,
    Predicate: Predicate
  };

}));

//. [FL:Semigroup]:         https://github.com/fantasyland/fantasy-land#semigroup
//. [Monoid]:               https://github.com/fantasyland/fantasy-land#monoid
//. [Setoid]:               https://github.com/fantasyland/fantasy-land#setoid
//. [`Array`]:              #Array
//. [`BinaryType`]:         #BinaryType
//. [`Date`]:               #Date
//. [`FiniteNumber`]:       #FiniteNumber
//. [`GlobalRegExp`]:       #GlobalRegExp
//. [`Integer`]:            #Integer
//. [`NonGlobalRegExp`]:    #NonGlobalRegExp
//. [`Number`]:             #Number
//. [`Object.create`]:      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
//. [`Pair`]:               #Pair
//. [`RegExp`]:             #RegExp
//. [`RegexFlags`]:         #RegexFlags
//. [`String`]:             #String
//. [`SyntaxError`]:        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError
//. [`TypeClass`]:          https://github.com/sanctuary-js/sanctuary-type-classes#TypeClass
//. [`TypeError`]:          https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError
//. [`TypeVariable`]:       #TypeVariable
//. [`UnaryType`]:          #UnaryType
//. [`UnaryTypeVariable`]:  #UnaryTypeVariable
//. [`Unknown`]:            #Unknown
//. [`ValidNumber`]:        #ValidNumber
//. [`env`]:                #env
//. [arguments]:            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
//. [enumerated types]:     https://en.wikipedia.org/wiki/Enumerated_type
//. [max]:                  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
//. [min]:                  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER
//. [record type]:          #RecordType
//. [semigroup]:            https://en.wikipedia.org/wiki/Semigroup
//. [type class]:           #type-classes
//. [type variables]:       #TypeVariable
//. [types]:                #types

},{"sanctuary-type-classes":326,"sanctuary-type-identifiers":328}],326:[function(require,module,exports){
/*
             ############                  #
            ############                  ###
                  #####                  #####
                #####      ####################
              #####       ######################
            #####                     ###########
          #####         ######################
        #####          ####################
      #####                        #####
     ############                 ###
    ############                 */

//. # sanctuary-type-classes
//.
//. The [Fantasy Land Specification][FL] "specifies interoperability of common
//. algebraic structures" by defining a number of type classes. For each type
//. class, it states laws which every member of a type must obey in order for
//. the type to be a member of the type class. In order for the Maybe type to
//. be considered a [Functor][], for example, every `Maybe a` value must have
//. a `fantasy-land/map` method which obeys the identity and composition laws.
//.
//. This project provides:
//.
//.   - [`TypeClass`](#TypeClass), a function for defining type classes;
//.   - one `TypeClass` value for each Fantasy Land type class;
//.   - lawful Fantasy Land methods for JavaScript's built-in types;
//.   - one function for each Fantasy Land method; and
//.   - several functions derived from these functions.
//.
//. ## Type-class hierarchy
//.
/* eslint-disable max-len */
//. <pre>
//.  Setoid   Semigroupoid  Semigroup   Foldable        Functor      Contravariant
//. (equals)    (compose)    (concat)   (reduce)         (map)        (contramap)
//.     |           |           |           \         / | | | | \
//.     |           |           |            \       /  | | | |  \
//.     |           |           |             \     /   | | | |   \
//.     |           |           |              \   /    | | | |    \
//.     |           |           |               \ /     | | | |     \
//.    Ord      Category     Monoid         Traversable | | | |      \
//.   (lte)       (id)       (empty)        (traverse)  / | | \       \
//.                             |                      /  | |  \       \
//.                             |                     /   / \   \       \
//.                             |             Profunctor /   \ Bifunctor \
//.                             |              (promap) /     \ (bimap)   \
//.                             |                      /       \           \
//.                           Group                   /         \           \
//.                          (invert)               Alt        Apply      Extend
//.                                                (alt)        (ap)     (extend)
//.                                                 /           / \           \
//.                                                /           /   \           \
//.                                               /           /     \           \
//.                                              /           /       \           \
//.                                             /           /         \           \
//.                                           Plus    Applicative    Chain      Comonad
//.                                          (zero)       (of)      (chain)    (extract)
//.                                             \         / \         / \
//.                                              \       /   \       /   \
//.                                               \     /     \     /     \
//.                                                \   /       \   /       \
//.                                                 \ /         \ /         \
//.                                             Alternative    Monad     ChainRec
//.                                                                     (chainRec)
//. </pre>
/* eslint-enable max-len */
//.
//. ## API

(function(f) {

  'use strict';

  /* istanbul ignore else */
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f(require('sanctuary-type-identifiers'));
  } else if (typeof define === 'function' && define.amd != null) {
    define(['sanctuary-type-identifiers'], f);
  } else {
    self.sanctuaryTypeClasses = f(self.sanctuaryTypeIdentifiers);
  }

}(function(type) {

  'use strict';

  //  concat_ :: Array a -> Array a -> Array a
  function concat_(xs) {
    return function(ys) {
      return xs.concat(ys);
    };
  }

  //  constant :: a -> b -> a
  function constant(x) {
    return function(y) {
      return x;
    };
  }

  //  forEachKey :: (StrMap a, StrMap a ~> String -> Undefined) -> Undefined
  function forEachKey(strMap, f) {
    Object.keys(strMap).forEach(f, strMap);
  }

  //  has :: (String, Object) -> Boolean
  function has(k, o) {
    return Object.prototype.hasOwnProperty.call(o, k);
  }

  //  identity :: a -> a
  function identity(x) { return x; }

  //  pair :: a -> b -> Pair a b
  function pair(x) {
    return function(y) {
      return [x, y];
    };
  }

  //  sameType :: (a, b) -> Boolean
  function sameType(x, y) {
    return typeof x === typeof y && type(x) === type(y);
  }

  //  type Iteration a = { value :: a, done :: Boolean }

  //  iterationNext :: a -> Iteration a
  function iterationNext(x) { return {value: x, done: false}; }

  //  iterationDone :: a -> Iteration a
  function iterationDone(x) { return {value: x, done: true}; }

  //# TypeClass :: (String, String, Array TypeClass, a -> Boolean) -> TypeClass
  //.
  //. The arguments are:
  //.
  //.   - the name of the type class, prefixed by its npm package name;
  //.   - the documentation URL of the type class;
  //.   - an array of dependencies; and
  //.   - a predicate which accepts any JavaScript value and returns `true`
  //.     if the value satisfies the requirements of the type class; `false`
  //.     otherwise.
  //.
  //. Example:
  //.
  //. ```javascript
  //. //    hasMethod :: String -> a -> Boolean
  //. const hasMethod = name => x => x != null && typeof x[name] == 'function';
  //.
  //. //    Foo :: TypeClass
  //. const Foo = Z.TypeClass(
  //.   'my-package/Foo',
  //.   'http://example.com/my-package#Foo',
  //.   [],
  //.   hasMethod('foo')
  //. );
  //.
  //. //    Bar :: TypeClass
  //. const Bar = Z.TypeClass(
  //.   'my-package/Bar',
  //.   'http://example.com/my-package#Bar',
  //.   [Foo],
  //.   hasMethod('bar')
  //. );
  //. ```
  //.
  //. Types whose values have a `foo` method are members of the Foo type class.
  //. Members of the Foo type class whose values have a `bar` method are also
  //. members of the Bar type class.
  //.
  //. Each `TypeClass` value has a `test` field: a function which accepts
  //. any JavaScript value and returns `true` if the value satisfies the
  //. type class's predicate and the predicates of all the type class's
  //. dependencies; `false` otherwise.
  //.
  //. `TypeClass` values may be used with [sanctuary-def][type-classes]
  //. to define parametrically polymorphic functions which verify their
  //. type-class constraints at run time.
  function TypeClass(name, url, dependencies, test) {
    if (!(this instanceof TypeClass)) {
      return new TypeClass(name, url, dependencies, test);
    }
    this.name = name;
    this.url = url;
    this.test = function(x) {
      return dependencies.every(function(d) { return d.test(x); }) && test(x);
    };
  }

  TypeClass['@@type'] = 'sanctuary-type-classes/TypeClass';

  //  data Location = Constructor | Value

  //  Constructor :: Location
  var Constructor = 'Constructor';

  //  Value :: Location
  var Value = 'Value';

  //  _funcPath :: (Boolean, Array String, a) -> Nullable Function
  function _funcPath(allowInheritedProps, path, _x) {
    var x = _x;
    for (var idx = 0; idx < path.length; idx += 1) {
      var k = path[idx];
      if (x == null || !(allowInheritedProps || has(k, x))) return null;
      x = x[k];
    }
    return typeof x === 'function' ? x : null;
  }

  //  funcPath :: (Array String, a) -> Nullable Function
  function funcPath(path, x) {
    return _funcPath(true, path, x);
  }

  //  implPath :: Array String -> Nullable Function
  function implPath(path) {
    return _funcPath(false, path, implementations);
  }

  //  functionName :: Function -> String
  var functionName = has('name', function f() {}) ?
    function functionName(f) { return f.name; } :
    /* istanbul ignore next */
    function functionName(f) {
      var match = /function (\w*)/.exec(f);
      return match == null ? '' : match[1];
    };

  //  $ :: (String, Array TypeClass, StrMap (Array Location)) -> TypeClass
  function $(_name, dependencies, requirements) {
    function getBoundMethod(_name) {
      var name = 'fantasy-land/' + _name;
      return requirements[_name] === Constructor ?
        function(typeRep) {
          var f = funcPath([name], typeRep);
          return f == null && typeof typeRep === 'function' ?
            implPath([functionName(typeRep), name]) :
            f;
        } :
        function(x) {
          var isPrototype = x != null &&
                            x.constructor != null &&
                            x.constructor.prototype === x;
          var m = null;
          if (!isPrototype) m = funcPath([name], x);
          if (m == null)    m = implPath([type(x), 'prototype', name]);
          return m && m.bind(x);
        };
    }

    var version = '7.1.1';  // updated programmatically
    var keys = Object.keys(requirements);

    var typeClass = TypeClass(
      'sanctuary-type-classes/' + _name,
      'https://github.com/sanctuary-js/sanctuary-type-classes/tree/v' + version
        + '#' + _name,
      dependencies,
      function(x) {
        return keys.every(function(_name) {
          var arg = requirements[_name] === Constructor ? x.constructor : x;
          return getBoundMethod(_name)(arg) != null;
        });
      }
    );

    typeClass.methods = keys.reduce(function(methods, _name) {
      methods[_name] = getBoundMethod(_name);
      return methods;
    }, {});

    return typeClass;
  }

  //# Setoid :: TypeClass
  //.
  //. `TypeClass` value for [Setoid][].
  //.
  //. ```javascript
  //. > Setoid.test(null)
  //. true
  //. ```
  var Setoid = $('Setoid', [], {equals: Value});

  //# Ord :: TypeClass
  //.
  //. `TypeClass` value for [Ord][].
  //.
  //. ```javascript
  //. > Ord.test(0)
  //. true
  //.
  //. > Ord.test(Math.sqrt)
  //. false
  //. ```
  var Ord = $('Ord', [Setoid], {lte: Value});

  //# Semigroupoid :: TypeClass
  //.
  //. `TypeClass` value for [Semigroupoid][].
  //.
  //. ```javascript
  //. > Semigroupoid.test(Math.sqrt)
  //. true
  //.
  //. > Semigroupoid.test(0)
  //. false
  //. ```
  var Semigroupoid = $('Semigroupoid', [], {compose: Value});

  //# Category :: TypeClass
  //.
  //. `TypeClass` value for [Category][].
  //.
  //. ```javascript
  //. > Category.test(Math.sqrt)
  //. true
  //.
  //. > Category.test(0)
  //. false
  //. ```
  var Category = $('Category', [Semigroupoid], {id: Constructor});

  //# Semigroup :: TypeClass
  //.
  //. `TypeClass` value for [Semigroup][].
  //.
  //. ```javascript
  //. > Semigroup.test('')
  //. true
  //.
  //. > Semigroup.test(0)
  //. false
  //. ```
  var Semigroup = $('Semigroup', [], {concat: Value});

  //# Monoid :: TypeClass
  //.
  //. `TypeClass` value for [Monoid][].
  //.
  //. ```javascript
  //. > Monoid.test('')
  //. true
  //.
  //. > Monoid.test(0)
  //. false
  //. ```
  var Monoid = $('Monoid', [Semigroup], {empty: Constructor});

  //# Group :: TypeClass
  //.
  //. `TypeClass` value for [Group][].
  //.
  //. ```javascript
  //. > Group.test(Sum(0))
  //. true
  //.
  //. > Group.test('')
  //. false
  //. ```
  var Group = $('Group', [Monoid], {invert: Value});

  //# Functor :: TypeClass
  //.
  //. `TypeClass` value for [Functor][].
  //.
  //. ```javascript
  //. > Functor.test([])
  //. true
  //.
  //. > Functor.test('')
  //. false
  //. ```
  var Functor = $('Functor', [], {map: Value});

  //# Bifunctor :: TypeClass
  //.
  //. `TypeClass` value for [Bifunctor][].
  //.
  //. ```javascript
  //. > Bifunctor.test(Tuple('foo', 64))
  //. true
  //.
  //. > Bifunctor.test([])
  //. false
  //. ```
  var Bifunctor = $('Bifunctor', [Functor], {bimap: Value});

  //# Profunctor :: TypeClass
  //.
  //. `TypeClass` value for [Profunctor][].
  //.
  //. ```javascript
  //. > Profunctor.test(Math.sqrt)
  //. true
  //.
  //. > Profunctor.test([])
  //. false
  //. ```
  var Profunctor = $('Profunctor', [Functor], {promap: Value});

  //# Apply :: TypeClass
  //.
  //. `TypeClass` value for [Apply][].
  //.
  //. ```javascript
  //. > Apply.test([])
  //. true
  //.
  //. > Apply.test('')
  //. false
  //. ```
  var Apply = $('Apply', [Functor], {ap: Value});

  //# Applicative :: TypeClass
  //.
  //. `TypeClass` value for [Applicative][].
  //.
  //. ```javascript
  //. > Applicative.test([])
  //. true
  //.
  //. > Applicative.test({})
  //. false
  //. ```
  var Applicative = $('Applicative', [Apply], {of: Constructor});

  //# Chain :: TypeClass
  //.
  //. `TypeClass` value for [Chain][].
  //.
  //. ```javascript
  //. > Chain.test([])
  //. true
  //.
  //. > Chain.test({})
  //. false
  //. ```
  var Chain = $('Chain', [Apply], {chain: Value});

  //# ChainRec :: TypeClass
  //.
  //. `TypeClass` value for [ChainRec][].
  //.
  //. ```javascript
  //. > ChainRec.test([])
  //. true
  //.
  //. > ChainRec.test({})
  //. false
  //. ```
  var ChainRec = $('ChainRec', [Chain], {chainRec: Constructor});

  //# Monad :: TypeClass
  //.
  //. `TypeClass` value for [Monad][].
  //.
  //. ```javascript
  //. > Monad.test([])
  //. true
  //.
  //. > Monad.test({})
  //. false
  //. ```
  var Monad = $('Monad', [Applicative, Chain], {});

  //# Alt :: TypeClass
  //.
  //. `TypeClass` value for [Alt][].
  //.
  //. ```javascript
  //. > Alt.test({})
  //. true
  //.
  //. > Alt.test('')
  //. false
  //. ```
  var Alt = $('Alt', [Functor], {alt: Value});

  //# Plus :: TypeClass
  //.
  //. `TypeClass` value for [Plus][].
  //.
  //. ```javascript
  //. > Plus.test({})
  //. true
  //.
  //. > Plus.test('')
  //. false
  //. ```
  var Plus = $('Plus', [Alt], {zero: Constructor});

  //# Alternative :: TypeClass
  //.
  //. `TypeClass` value for [Alternative][].
  //.
  //. ```javascript
  //. > Alternative.test([])
  //. true
  //.
  //. > Alternative.test({})
  //. false
  //. ```
  var Alternative = $('Alternative', [Applicative, Plus], {});

  //# Foldable :: TypeClass
  //.
  //. `TypeClass` value for [Foldable][].
  //.
  //. ```javascript
  //. > Foldable.test({})
  //. true
  //.
  //. > Foldable.test('')
  //. false
  //. ```
  var Foldable = $('Foldable', [], {reduce: Value});

  //# Traversable :: TypeClass
  //.
  //. `TypeClass` value for [Traversable][].
  //.
  //. ```javascript
  //. > Traversable.test([])
  //. true
  //.
  //. > Traversable.test('')
  //. false
  //. ```
  var Traversable = $('Traversable', [Functor, Foldable], {traverse: Value});

  //# Extend :: TypeClass
  //.
  //. `TypeClass` value for [Extend][].
  //.
  //. ```javascript
  //. > Extend.test([])
  //. true
  //.
  //. > Extend.test({})
  //. false
  //. ```
  var Extend = $('Extend', [Functor], {extend: Value});

  //# Comonad :: TypeClass
  //.
  //. `TypeClass` value for [Comonad][].
  //.
  //. ```javascript
  //. > Comonad.test(Identity(0))
  //. true
  //.
  //. > Comonad.test([])
  //. false
  //. ```
  var Comonad = $('Comonad', [Extend], {extract: Value});

  //# Contravariant :: TypeClass
  //.
  //. `TypeClass` value for [Contravariant][].
  //.
  //. ```javascript
  //. > Contravariant.test(Math.sqrt)
  //. true
  //.
  //. > Contravariant.test([])
  //. false
  //. ```
  var Contravariant = $('Contravariant', [], {contramap: Value});

  //  Null$prototype$toString :: Null ~> () -> String
  function Null$prototype$toString() {
    return 'null';
  }

  //  Null$prototype$equals :: Null ~> Null -> Boolean
  function Null$prototype$equals(other) {
    return true;
  }

  //  Null$prototype$lte :: Null ~> Null -> Boolean
  function Null$prototype$lte(other) {
    return true;
  }

  //  Undefined$prototype$toString :: Undefined ~> () -> String
  function Undefined$prototype$toString() {
    return 'undefined';
  }

  //  Undefined$prototype$equals :: Undefined ~> Undefined -> Boolean
  function Undefined$prototype$equals(other) {
    return true;
  }

  //  Undefined$prototype$lte :: Undefined ~> Undefined -> Boolean
  function Undefined$prototype$lte(other) {
    return true;
  }

  //  Boolean$prototype$toString :: Boolean ~> () -> String
  function Boolean$prototype$toString() {
    return typeof this === 'object' ?
      'new Boolean(' + toString(this.valueOf()) + ')' :
      this.toString();
  }

  //  Boolean$prototype$equals :: Boolean ~> Boolean -> Boolean
  function Boolean$prototype$equals(other) {
    return typeof this === 'object' ?
      equals(this.valueOf(), other.valueOf()) :
      this === other;
  }

  //  Boolean$prototype$lte :: Boolean ~> Boolean -> Boolean
  function Boolean$prototype$lte(other) {
    return typeof this === 'object' ?
      lte(this.valueOf(), other.valueOf()) :
      this === false || other === true;
  }

  //  Number$prototype$toString :: Number ~> () -> String
  function Number$prototype$toString() {
    return typeof this === 'object' ?
      'new Number(' + toString(this.valueOf()) + ')' :
      1 / this === -Infinity ? '-0' : this.toString(10);
  }

  //  Number$prototype$equals :: Number ~> Number -> Boolean
  function Number$prototype$equals(other) {
    return typeof this === 'object' ?
      equals(this.valueOf(), other.valueOf()) :
      isNaN(this) && isNaN(other) || this === other;
  }

  //  Number$prototype$lte :: Number ~> Number -> Boolean
  function Number$prototype$lte(other) {
    return typeof this === 'object' ?
      lte(this.valueOf(), other.valueOf()) :
      isNaN(this) && isNaN(other) || this <= other;
  }

  //  Date$prototype$toString :: Date ~> () -> String
  function Date$prototype$toString() {
    var x = isNaN(this.valueOf()) ? NaN : this.toISOString();
    return 'new Date(' + toString(x) + ')';
  }

  //  Date$prototype$equals :: Date ~> Date -> Boolean
  function Date$prototype$equals(other) {
    return equals(this.valueOf(), other.valueOf());
  }

  //  Date$prototype$lte :: Date ~> Date -> Boolean
  function Date$prototype$lte(other) {
    return lte(this.valueOf(), other.valueOf());
  }

  //  RegExp$prototype$equals :: RegExp ~> RegExp -> Boolean
  function RegExp$prototype$equals(other) {
    return other.source === this.source &&
           other.global === this.global &&
           other.ignoreCase === this.ignoreCase &&
           other.multiline === this.multiline &&
           other.sticky === this.sticky &&
           other.unicode === this.unicode;
  }

  //  String$empty :: () -> String
  function String$empty() {
    return '';
  }

  //  String$prototype$toString :: String ~> () -> String
  function String$prototype$toString() {
    return typeof this === 'object' ?
      'new String(' + toString(this.valueOf()) + ')' :
      JSON.stringify(this);
  }

  //  String$prototype$equals :: String ~> String -> Boolean
  function String$prototype$equals(other) {
    return typeof this === 'object' ?
      equals(this.valueOf(), other.valueOf()) :
      this === other;
  }

  //  String$prototype$lte :: String ~> String -> Boolean
  function String$prototype$lte(other) {
    return typeof this === 'object' ?
      lte(this.valueOf(), other.valueOf()) :
      this <= other;
  }

  //  String$prototype$concat :: String ~> String -> String
  function String$prototype$concat(other) {
    return this + other;
  }

  //  Array$empty :: () -> Array a
  function Array$empty() {
    return [];
  }

  //  Array$of :: a -> Array a
  function Array$of(x) {
    return [x];
  }

  //  Array$chainRec :: ((a -> c, b -> c, a) -> Array c, a) -> Array b
  function Array$chainRec(f, x) {
    var $todo = [x];
    var $done = [];
    while ($todo.length > 0) {
      var xs = f(iterationNext, iterationDone, $todo.shift());
      var $more = [];
      for (var idx = 0; idx < xs.length; idx += 1) {
        (xs[idx].done ? $done : $more).push(xs[idx].value);
      }
      Array.prototype.unshift.apply($todo, $more);
    }
    return $done;
  }

  //  Array$zero :: () -> Array a
  function Array$zero() {
    return [];
  }

  //  Array$prototype$toString :: Array a ~> () -> String
  function Array$prototype$toString() {
    var reprs = this.map(toString);
    var keys = Object.keys(this).sort();
    for (var idx = 0; idx < keys.length; idx += 1) {
      var k = keys[idx];
      if (!/^\d+$/.test(k)) {
        reprs.push(toString(k) + ': ' + toString(this[k]));
      }
    }
    return '[' + reprs.join(', ') + ']';
  }

  //  Array$prototype$equals :: Array a ~> Array a -> Boolean
  function Array$prototype$equals(other) {
    if (other.length !== this.length) return false;
    for (var idx = 0; idx < this.length; idx += 1) {
      if (!equals(this[idx], other[idx])) return false;
    }
    return true;
  }

  //  Array$prototype$lte :: Array a ~> Array a -> Boolean
  function Array$prototype$lte(other) {
    for (var idx = 0; true; idx += 1) {
      if (idx === this.length) return true;
      if (idx === other.length) return false;
      if (!equals(this[idx], other[idx])) return lte(this[idx], other[idx]);
    }
  }

  //  Array$prototype$concat :: Array a ~> Array a -> Array a
  function Array$prototype$concat(other) {
    return this.concat(other);
  }

  //  Array$prototype$map :: Array a ~> (a -> b) -> Array b
  function Array$prototype$map(f) {
    return this.map(function(x) { return f(x); });
  }

  //  Array$prototype$ap :: Array a ~> Array (a -> b) -> Array b
  function Array$prototype$ap(fs) {
    var result = [];
    for (var idx = 0; idx < fs.length; idx += 1) {
      for (var idx2 = 0; idx2 < this.length; idx2 += 1) {
        result.push(fs[idx](this[idx2]));
      }
    }
    return result;
  }

  //  Array$prototype$chain :: Array a ~> (a -> Array b) -> Array b
  function Array$prototype$chain(f) {
    var result = [];
    this.forEach(function(x) { Array.prototype.push.apply(result, f(x)); });
    return result;
  }

  //  Array$prototype$alt :: Array a ~> Array a -> Array a
  var Array$prototype$alt = Array$prototype$concat;

  //  Array$prototype$reduce :: Array a ~> ((b, a) -> b, b) -> b
  function Array$prototype$reduce(f, initial) {
    return this.reduce(function(acc, x) { return f(acc, x); }, initial);
  }

  //  Array$prototype$traverse :: Applicative f => Array a ~> (TypeRep f, a -> f b) -> f (Array b)
  function Array$prototype$traverse(typeRep, f) {
    var xs = this;
    function go(idx, n) {
      switch (n) {
        case 0: return of(typeRep, []);
        case 2: return lift2(pair, f(xs[idx]), f(xs[idx + 1]));
        default:
          var m = Math.floor(n / 4) * 2;
          return lift2(concat_, go(idx, m), go(idx + m, n - m));
      }
    }
    return this.length % 2 === 1 ?
      lift2(concat_, map(Array$of, f(this[0])), go(1, this.length - 1)) :
      go(0, this.length);
  }

  //  Array$prototype$extend :: Array a ~> (Array a -> b) -> Array b
  function Array$prototype$extend(f) {
    return this.map(function(_, idx, xs) { return f(xs.slice(idx)); });
  }

  //  Arguments$prototype$toString :: Arguments ~> String
  function Arguments$prototype$toString() {
    var args = Array.prototype.map.call(this, toString).join(', ');
    return '(function () { return arguments; }(' + args + '))';
  }

  //  Arguments$prototype$equals :: Arguments ~> Arguments -> Boolean
  function Arguments$prototype$equals(other) {
    return Array$prototype$equals.call(this, other);
  }

  //  Arguments$prototype$lte :: Arguments ~> Arguments -> Boolean
  function Arguments$prototype$lte(other) {
    return Array$prototype$lte.call(this, other);
  }

  //  Error$prototype$toString :: Error ~> () -> String
  function Error$prototype$toString() {
    return 'new ' + this.name + '(' + toString(this.message) + ')';
  }

  //  Error$prototype$equals :: Error ~> Error -> Boolean
  function Error$prototype$equals(other) {
    return equals(this.name, other.name) &&
           equals(this.message, other.message);
  }

  //  Object$empty :: () -> StrMap a
  function Object$empty() {
    return {};
  }

  //  Object$zero :: () -> StrMap a
  function Object$zero() {
    return {};
  }

  //  Object$prototype$toString :: StrMap a ~> () -> String
  function Object$prototype$toString() {
    var reprs = [];
    var keys = Object.keys(this).sort();
    for (var idx = 0; idx < keys.length; idx += 1) {
      var k = keys[idx];
      reprs.push(toString(k) + ': ' + toString(this[k]));
    }
    return '{' + reprs.join(', ') + '}';
  }

  //  Object$prototype$equals :: StrMap a ~> StrMap a -> Boolean
  function Object$prototype$equals(other) {
    var self = this;
    var keys = Object.keys(this).sort();
    return equals(keys, Object.keys(other).sort()) &&
           keys.every(function(k) { return equals(self[k], other[k]); });
  }

  //  Object$prototype$lte :: StrMap a ~> StrMap a -> Boolean
  function Object$prototype$lte(other) {
    var theseKeys = Object.keys(this).sort();
    var otherKeys = Object.keys(other).sort();
    while (true) {
      if (theseKeys.length === 0) return true;
      if (otherKeys.length === 0) return false;
      var k = theseKeys.shift();
      var z = otherKeys.shift();
      if (k < z) return true;
      if (k > z) return false;
      if (!equals(this[k], other[k])) return lte(this[k], other[k]);
    }
  }

  //  Object$prototype$concat :: StrMap a ~> StrMap a -> StrMap a
  function Object$prototype$concat(other) {
    var result = {};
    function assign(k) { result[k] = this[k]; }
    forEachKey(this, assign);
    forEachKey(other, assign);
    return result;
  }

  //  Object$prototype$map :: StrMap a ~> (a -> b) -> StrMap b
  function Object$prototype$map(f) {
    var result = {};
    forEachKey(this, function(k) { result[k] = f(this[k]); });
    return result;
  }

  //  Object$prototype$ap :: StrMap a ~> StrMap (a -> b) -> StrMap b
  function Object$prototype$ap(other) {
    var result = {};
    forEachKey(this, function(k) {
      if (has(k, other)) result[k] = other[k](this[k]);
    });
    return result;
  }

  //  Object$prototype$alt :: StrMap a ~> StrMap a -> StrMap a
  var Object$prototype$alt = Object$prototype$concat;

  //  Object$prototype$reduce :: StrMap a ~> ((b, a) -> b, b) -> b
  function Object$prototype$reduce(f, initial) {
    var self = this;
    function reducer(acc, k) { return f(acc, self[k]); }
    return Object.keys(this).sort().reduce(reducer, initial);
  }

  //  Object$prototype$traverse :: Applicative f => StrMap a ~> (TypeRep f, a -> f b) -> f (StrMap b)
  function Object$prototype$traverse(typeRep, f) {
    var self = this;
    return Object.keys(this).reduce(function(applicative, k) {
      function set(o) {
        return function(v) {
          var singleton = {}; singleton[k] = v;
          return Object$prototype$concat.call(o, singleton);
        };
      }
      return lift2(set, applicative, f(self[k]));
    }, of(typeRep, {}));
  }

  //  Function$id :: () -> a -> a
  function Function$id() {
    return identity;
  }

  //  Function$of :: b -> (a -> b)
  function Function$of(x) {
    return function(_) { return x; };
  }

  //  Function$chainRec :: ((a -> c, b -> c, a) -> (z -> c), a) -> (z -> b)
  function Function$chainRec(f, x) {
    return function(a) {
      var step = iterationNext(x);
      while (!step.done) {
        step = f(iterationNext, iterationDone, step.value)(a);
      }
      return step.value;
    };
  }

  //  Function$prototype$equals :: Function ~> Function -> Boolean
  function Function$prototype$equals(other) {
    return other === this;
  }

  //  Function$prototype$compose :: (a -> b) ~> (b -> c) -> (a -> c)
  function Function$prototype$compose(other) {
    var semigroupoid = this;
    return function(x) { return other(semigroupoid(x)); };
  }

  //  Function$prototype$map :: (a -> b) ~> (b -> c) -> (a -> c)
  function Function$prototype$map(f) {
    var functor = this;
    return function(x) { return f(functor(x)); };
  }

  //  Function$prototype$promap :: (b -> c) ~> (a -> b, c -> d) -> (a -> d)
  function Function$prototype$promap(f, g) {
    var profunctor = this;
    return function(x) { return g(profunctor(f(x))); };
  }

  //  Function$prototype$ap :: (a -> b) ~> (a -> b -> c) -> (a -> c)
  function Function$prototype$ap(f) {
    var apply = this;
    return function(x) { return f(x)(apply(x)); };
  }

  //  Function$prototype$chain :: (a -> b) ~> (b -> a -> c) -> (a -> c)
  function Function$prototype$chain(f) {
    var chain = this;
    return function(x) { return f(chain(x))(x); };
  }

  //  Function$prototype$contramap :: (b -> c) ~> (a -> b) -> (a -> c)
  function Function$prototype$contramap(f) {
    var contravariant = this;
    return function(x) { return contravariant(f(x)); };
  }

  /* eslint-disable key-spacing */
  var implementations = {
    Null: {
      prototype: {
        toString:                   Null$prototype$toString,
        'fantasy-land/equals':      Null$prototype$equals,
        'fantasy-land/lte':         Null$prototype$lte
      }
    },
    Undefined: {
      prototype: {
        toString:                   Undefined$prototype$toString,
        'fantasy-land/equals':      Undefined$prototype$equals,
        'fantasy-land/lte':         Undefined$prototype$lte
      }
    },
    Boolean: {
      prototype: {
        toString:                   Boolean$prototype$toString,
        'fantasy-land/equals':      Boolean$prototype$equals,
        'fantasy-land/lte':         Boolean$prototype$lte
      }
    },
    Number: {
      prototype: {
        toString:                   Number$prototype$toString,
        'fantasy-land/equals':      Number$prototype$equals,
        'fantasy-land/lte':         Number$prototype$lte
      }
    },
    Date: {
      prototype: {
        toString:                   Date$prototype$toString,
        'fantasy-land/equals':      Date$prototype$equals,
        'fantasy-land/lte':         Date$prototype$lte
      }
    },
    RegExp: {
      prototype: {
        'fantasy-land/equals':      RegExp$prototype$equals
      }
    },
    String: {
      'fantasy-land/empty':         String$empty,
      prototype: {
        toString:                   String$prototype$toString,
        'fantasy-land/equals':      String$prototype$equals,
        'fantasy-land/lte':         String$prototype$lte,
        'fantasy-land/concat':      String$prototype$concat
      }
    },
    Array: {
      'fantasy-land/empty':         Array$empty,
      'fantasy-land/of':            Array$of,
      'fantasy-land/chainRec':      Array$chainRec,
      'fantasy-land/zero':          Array$zero,
      prototype: {
        toString:                   Array$prototype$toString,
        'fantasy-land/equals':      Array$prototype$equals,
        'fantasy-land/lte':         Array$prototype$lte,
        'fantasy-land/concat':      Array$prototype$concat,
        'fantasy-land/map':         Array$prototype$map,
        'fantasy-land/ap':          Array$prototype$ap,
        'fantasy-land/chain':       Array$prototype$chain,
        'fantasy-land/alt':         Array$prototype$alt,
        'fantasy-land/reduce':      Array$prototype$reduce,
        'fantasy-land/traverse':    Array$prototype$traverse,
        'fantasy-land/extend':      Array$prototype$extend
      }
    },
    Arguments: {
      prototype: {
        toString:                   Arguments$prototype$toString,
        'fantasy-land/equals':      Arguments$prototype$equals,
        'fantasy-land/lte':         Arguments$prototype$lte
      }
    },
    Error: {
      prototype: {
        toString:                   Error$prototype$toString,
        'fantasy-land/equals':      Error$prototype$equals
      }
    },
    Object: {
      'fantasy-land/empty':         Object$empty,
      'fantasy-land/zero':          Object$zero,
      prototype: {
        toString:                   Object$prototype$toString,
        'fantasy-land/equals':      Object$prototype$equals,
        'fantasy-land/lte':         Object$prototype$lte,
        'fantasy-land/concat':      Object$prototype$concat,
        'fantasy-land/map':         Object$prototype$map,
        'fantasy-land/ap':          Object$prototype$ap,
        'fantasy-land/alt':         Object$prototype$alt,
        'fantasy-land/reduce':      Object$prototype$reduce,
        'fantasy-land/traverse':    Object$prototype$traverse
      }
    },
    Function: {
      'fantasy-land/id':            Function$id,
      'fantasy-land/of':            Function$of,
      'fantasy-land/chainRec':      Function$chainRec,
      prototype: {
        'fantasy-land/equals':      Function$prototype$equals,
        'fantasy-land/compose':     Function$prototype$compose,
        'fantasy-land/map':         Function$prototype$map,
        'fantasy-land/promap':      Function$prototype$promap,
        'fantasy-land/ap':          Function$prototype$ap,
        'fantasy-land/chain':       Function$prototype$chain,
        'fantasy-land/contramap':   Function$prototype$contramap
      }
    }
  };
  /* eslint-enable key-spacing */

  //# toString :: a -> String
  //.
  //. Returns a useful string representation of its argument.
  //.
  //. Dispatches to the argument's `toString` method if appropriate.
  //.
  //. Where practical, `equals(eval(toString(x)), x) = true`.
  //.
  //. `toString` implementations are provided for the following built-in types:
  //. Null, Undefined, Boolean, Number, Date, String, Array, Arguments, Error,
  //. and Object.
  //.
  //. ```javascript
  //. > toString(-0)
  //. '-0'
  //.
  //. > toString(['foo', 'bar', 'baz'])
  //. '["foo", "bar", "baz"]'
  //.
  //. > toString({x: 1, y: 2, z: 3})
  //. '{"x": 1, "y": 2, "z": 3}'
  //.
  //. > toString(Cons(1, Cons(2, Cons(3, Nil))))
  //. 'Cons(1, Cons(2, Cons(3, Nil)))'
  //. ```
  var toString = (function() {
    //  $seen :: Array Any
    var $seen = [];

    function call(method, x) {
      $seen.push(x);
      try { return method.call(x); } finally { $seen.pop(); }
    }

    return function toString(x) {
      if ($seen.indexOf(x) >= 0) return '<Circular>';

      var xType = type(x);
      if (xType === 'Object') {
        var result;
        try { result = call(x.toString, x); } catch (err) {}
        if (result != null && result !== '[object Object]') return result;
      }

      return call(implPath([xType, 'prototype', 'toString']) || x.toString, x);
    };
  }());

  //# equals :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and equal according
  //. to the type's [`fantasy-land/equals`][] method; `false` otherwise.
  //.
  //. `fantasy-land/equals` implementations are provided for the following
  //. built-in types: Null, Undefined, Boolean, Number, Date, RegExp, String,
  //. Array, Arguments, Error, Object, and Function.
  //.
  //. The algorithm supports circular data structures. Two arrays are equal
  //. if they have the same index paths and for each path have equal values.
  //. Two arrays which represent `[1, [1, [1, [1, [1, ...]]]]]`, for example,
  //. are equal even if their internal structures differ. Two objects are equal
  //. if they have the same property paths and for each path have equal values.
  //.
  //. ```javascript
  //. > equals(0, -0)
  //. true
  //.
  //. > equals(NaN, NaN)
  //. true
  //.
  //. > equals(Cons('foo', Cons('bar', Nil)), Cons('foo', Cons('bar', Nil)))
  //. true
  //.
  //. > equals(Cons('foo', Cons('bar', Nil)), Cons('bar', Cons('foo', Nil)))
  //. false
  //. ```
  var equals = (function() {
    //  $pairs :: Array (Pair Any Any)
    var $pairs = [];

    return function equals(x, y) {
      if (!sameType(x, y)) return false;

      //  This algorithm for comparing circular data structures was
      //  suggested in <http://stackoverflow.com/a/40622794/312785>.
      if ($pairs.some(function(p) { return p[0] === x && p[1] === y; })) {
        return true;
      }

      $pairs.push([x, y]);
      try {
        return Setoid.test(x) && Setoid.test(y) && Setoid.methods.equals(x)(y);
      } finally {
        $pairs.pop();
      }
    };
  }());

  //# lt :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and the first is
  //. less than the second according to the type's [`fantasy-land/lte`][]
  //. method; `false` otherwise.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`gt`](#gt) and [`gte`](#gte).
  //.
  //. ```javascript
  //. > lt(0, 0)
  //. false
  //.
  //. > lt(0, 1)
  //. true
  //.
  //. > lt(1, 0)
  //. false
  //. ```
  function lt(x, y) {
    return sameType(x, y) && !lte(y, x);
  }

  //# lte :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and the first
  //. is less than or equal to the second according to the type's
  //. [`fantasy-land/lte`][] method; `false` otherwise.
  //.
  //. `fantasy-land/lte` implementations are provided for the following
  //. built-in types: Null, Undefined, Boolean, Number, Date, String, Array,
  //. Arguments, and Object.
  //.
  //. The algorithm supports circular data structures in the same manner as
  //. [`equals`](#equals).
  //.
  //. See also [`lt`](#lt), [`gt`](#gt), and [`gte`](#gte).
  //.
  //. ```javascript
  //. > lte(0, 0)
  //. true
  //.
  //. > lte(0, 1)
  //. true
  //.
  //. > lte(1, 0)
  //. false
  //. ```
  var lte = (function() {
    //  $pairs :: Array (Pair Any Any)
    var $pairs = [];

    return function lte(x, y) {
      if (!sameType(x, y)) return false;

      //  This algorithm for comparing circular data structures was
      //  suggested in <http://stackoverflow.com/a/40622794/312785>.
      if ($pairs.some(function(p) { return p[0] === x && p[1] === y; })) {
        return equals(x, y);
      }

      $pairs.push([x, y]);
      try {
        return Ord.test(x) && Ord.test(y) && Ord.methods.lte(x)(y);
      } finally {
        $pairs.pop();
      }
    };
  }());

  //# gt :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and the first is
  //. greater than the second according to the type's [`fantasy-land/lte`][]
  //. method; `false` otherwise.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`lt`](#lt) and [`gte`](#gte).
  //.
  //. ```javascript
  //. > gt(0, 0)
  //. false
  //.
  //. > gt(0, 1)
  //. false
  //.
  //. > gt(1, 0)
  //. true
  //. ```
  function gt(x, y) {
    return lt(y, x);
  }

  //# gte :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and the first
  //. is greater than or equal to the second according to the type's
  //. [`fantasy-land/lte`][] method; `false` otherwise.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`lt`](#lt) and [`gt`](#gt).
  //.
  //. ```javascript
  //. > gte(0, 0)
  //. true
  //.
  //. > gte(0, 1)
  //. false
  //.
  //. > gte(1, 0)
  //. true
  //. ```
  function gte(x, y) {
    return lte(y, x);
  }

  //# min :: Ord a => (a, a) -> a
  //.
  //. Returns the smaller of its two arguments.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`max`](#max).
  //.
  //. ```javascript
  //. > min(10, 2)
  //. 2
  //.
  //. > min(new Date('1999-12-31'), new Date('2000-01-01'))
  //. new Date('1999-12-31')
  //.
  //. > min('10', '2')
  //. '10'
  //. ```
  function min(x, y) {
    return lte(x, y) ? x : y;
  }

  //# max :: Ord a => (a, a) -> a
  //.
  //. Returns the larger of its two arguments.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`min`](#min).
  //.
  //. ```javascript
  //. > max(10, 2)
  //. 10
  //.
  //. > max(new Date('1999-12-31'), new Date('2000-01-01'))
  //. new Date('2000-01-01')
  //.
  //. > max('10', '2')
  //. '2'
  //. ```
  function max(x, y) {
    return lte(x, y) ? y : x;
  }

  //# compose :: Semigroupoid c => (c j k, c i j) -> c i k
  //.
  //. Function wrapper for [`fantasy-land/compose`][].
  //.
  //. `fantasy-land/compose` implementations are provided for the following
  //. built-in types: Function.
  //.
  //. ```javascript
  //. > compose(Math.sqrt, x => x + 1)(99)
  //. 10
  //. ```
  function compose(x, y) {
    return Semigroupoid.methods.compose(y)(x);
  }

  //# id :: Category c => TypeRep c -> c
  //.
  //. Function wrapper for [`fantasy-land/id`][].
  //.
  //. `fantasy-land/id` implementations are provided for the following
  //. built-in types: Function.
  //.
  //. ```javascript
  //. > id(Function)('foo')
  //. 'foo'
  //. ```
  function id(typeRep) {
    return Category.methods.id(typeRep)();
  }

  //# concat :: Semigroup a => (a, a) -> a
  //.
  //. Function wrapper for [`fantasy-land/concat`][].
  //.
  //. `fantasy-land/concat` implementations are provided for the following
  //. built-in types: String, Array, and Object.
  //.
  //. ```javascript
  //. > concat('abc', 'def')
  //. 'abcdef'
  //.
  //. > concat([1, 2, 3], [4, 5, 6])
  //. [1, 2, 3, 4, 5, 6]
  //.
  //. > concat({x: 1, y: 2}, {y: 3, z: 4})
  //. {x: 1, y: 3, z: 4}
  //.
  //. > concat(Cons('foo', Cons('bar', Cons('baz', Nil))), Cons('quux', Nil))
  //. Cons('foo', Cons('bar', Cons('baz', Cons('quux', Nil))))
  //. ```
  function concat(x, y) {
    return Semigroup.methods.concat(x)(y);
  }

  //# empty :: Monoid m => TypeRep m -> m
  //.
  //. Function wrapper for [`fantasy-land/empty`][].
  //.
  //. `fantasy-land/empty` implementations are provided for the following
  //. built-in types: String, Array, and Object.
  //.
  //. ```javascript
  //. > empty(String)
  //. ''
  //.
  //. > empty(Array)
  //. []
  //.
  //. > empty(Object)
  //. {}
  //.
  //. > empty(List)
  //. Nil
  //. ```
  function empty(typeRep) {
    return Monoid.methods.empty(typeRep)();
  }

  //# invert :: Group g => g -> g
  //.
  //. Function wrapper for [`fantasy-land/invert`][].
  //.
  //. ```javascript
  //. invert(Sum(5))
  //. Sum(-5)
  //. ```
  function invert(group) {
    return Group.methods.invert(group)();
  }

  //# map :: Functor f => (a -> b, f a) -> f b
  //.
  //. Function wrapper for [`fantasy-land/map`][].
  //.
  //. `fantasy-land/map` implementations are provided for the following
  //. built-in types: Array, Object, and Function.
  //.
  //. ```javascript
  //. > map(Math.sqrt, [1, 4, 9])
  //. [1, 2, 3]
  //.
  //. > map(Math.sqrt, {x: 1, y: 4, z: 9})
  //. {x: 1, y: 2, z: 3}
  //.
  //. > map(Math.sqrt, s => s.length)('Sanctuary')
  //. 3
  //.
  //. > map(Math.sqrt, Tuple('foo', 64))
  //. Tuple('foo', 8)
  //.
  //. > map(Math.sqrt, Nil)
  //. Nil
  //.
  //. > map(Math.sqrt, Cons(1, Cons(4, Cons(9, Nil))))
  //. Cons(1, Cons(2, Cons(3, Nil)))
  //. ```
  function map(f, functor) {
    return Functor.methods.map(functor)(f);
  }

  //# bimap :: Bifunctor f => (a -> b, c -> d, f a c) -> f b d
  //.
  //. Function wrapper for [`fantasy-land/bimap`][].
  //.
  //. ```javascript
  //. > bimap(s => s.toUpperCase(), Math.sqrt, Tuple('foo', 64))
  //. Tuple('FOO', 8)
  //. ```
  function bimap(f, g, bifunctor) {
    return Bifunctor.methods.bimap(bifunctor)(f, g);
  }

  //# promap :: Profunctor p => (a -> b, c -> d, p b c) -> p a d
  //.
  //. Function wrapper for [`fantasy-land/promap`][].
  //.
  //. `fantasy-land/promap` implementations are provided for the following
  //. built-in types: Function.
  //.
  //. ```javascript
  //. > promap(Math.abs, x => x + 1, Math.sqrt)(-100)
  //. 11
  //. ```
  function promap(f, g, profunctor) {
    return Profunctor.methods.promap(profunctor)(f, g);
  }

  //# ap :: Apply f => (f (a -> b), f a) -> f b
  //.
  //. Function wrapper for [`fantasy-land/ap`][].
  //.
  //. `fantasy-land/ap` implementations are provided for the following
  //. built-in types: Array, Object, and Function.
  //.
  //. ```javascript
  //. > ap([Math.sqrt, x => x * x], [1, 4, 9, 16, 25])
  //. [1, 2, 3, 4, 5, 1, 16, 81, 256, 625]
  //.
  //. > ap({a: Math.sqrt, b: x => x * x}, {a: 16, b: 10, c: 1})
  //. {a: 4, b: 100}
  //.
  //. > ap(s => n => s.slice(0, n), s => Math.ceil(s.length / 2))('Haskell')
  //. 'Hask'
  //.
  //. > ap(Identity(Math.sqrt), Identity(64))
  //. Identity(8)
  //.
  //. > ap(Cons(Math.sqrt, Cons(x => x * x, Nil)), Cons(16, Cons(100, Nil)))
  //. Cons(4, Cons(10, Cons(256, Cons(10000, Nil))))
  //. ```
  function ap(applyF, applyX) {
    return Apply.methods.ap(applyX)(applyF);
  }

  //# lift2 :: Apply f => (a -> b -> c, f a, f b) -> f c
  //.
  //. Lifts `a -> b -> c` to `Apply f => f a -> f b -> f c` and returns the
  //. result of applying this to the given arguments.
  //.
  //. This function is derived from [`map`](#map) and [`ap`](#ap).
  //.
  //. See also [`lift3`](#lift3).
  //.
  //. ```javascript
  //. > lift2(x => y => Math.pow(x, y), [10], [1, 2, 3])
  //. [10, 100, 1000]
  //.
  //. > lift2(x => y => Math.pow(x, y), Identity(10), Identity(3))
  //. Identity(1000)
  //. ```
  function lift2(f, x, y) {
    return ap(map(f, x), y);
  }

  //# lift3 :: Apply f => (a -> b -> c -> d, f a, f b, f c) -> f d
  //.
  //. Lifts `a -> b -> c -> d` to `Apply f => f a -> f b -> f c -> f d` and
  //. returns the result of applying this to the given arguments.
  //.
  //. This function is derived from [`map`](#map) and [`ap`](#ap).
  //.
  //. See also [`lift2`](#lift2).
  //.
  //. ```javascript
  //. > lift3(x => y => z => x + z + y, ['<'], ['>'], ['foo', 'bar', 'baz'])
  //. ['<foo>', '<bar>', '<baz>']
  //.
  //. > lift3(x => y => z => x + z + y, Identity('<'), Identity('>'), Identity('baz'))
  //. Identity('<baz>')
  //. ```
  function lift3(f, x, y, z) {
    return ap(ap(map(f, x), y), z);
  }

  //# apFirst :: Apply f => (f a, f b) -> f a
  //.
  //. Combines two effectful actions, keeping only the result of the first.
  //. Equivalent to Haskell's `(<*)` function.
  //.
  //. This function is derived from [`lift2`](#lift2).
  //.
  //. See also [`apSecond`](#apSecond).
  //.
  //. ```javascript
  //. > apFirst([1, 2], [3, 4])
  //. [1, 1, 2, 2]
  //.
  //. > apFirst(Identity(1), Identity(2))
  //. Identity(1)
  //. ```
  function apFirst(x, y) {
    return lift2(constant, x, y);
  }

  //# apSecond :: Apply f => (f a, f b) -> f b
  //.
  //. Combines two effectful actions, keeping only the result of the second.
  //. Equivalent to Haskell's `(*>)` function.
  //.
  //. This function is derived from [`lift2`](#lift2).
  //.
  //. See also [`apFirst`](#apFirst).
  //.
  //. ```javascript
  //. > apSecond([1, 2], [3, 4])
  //. [3, 4, 3, 4]
  //.
  //. > apSecond(Identity(1), Identity(2))
  //. Identity(2)
  //. ```
  function apSecond(x, y) {
    return lift2(constant(identity), x, y);
  }

  //# of :: Applicative f => (TypeRep f, a) -> f a
  //.
  //. Function wrapper for [`fantasy-land/of`][].
  //.
  //. `fantasy-land/of` implementations are provided for the following
  //. built-in types: Array and Function.
  //.
  //. ```javascript
  //. > of(Array, 42)
  //. [42]
  //.
  //. > of(Function, 42)(null)
  //. 42
  //.
  //. > of(List, 42)
  //. Cons(42, Nil)
  //. ```
  function of(typeRep, x) {
    return Applicative.methods.of(typeRep)(x);
  }

  //# append :: (Applicative f, Semigroup (f a)) => (a, f a) -> f a
  //.
  //. Returns the result of appending the first argument to the second.
  //.
  //. This function is derived from [`concat`](#concat) and [`of`](#of).
  //.
  //. See also [`prepend`](#prepend).
  //.
  //. ```javascript
  //. > append(3, [1, 2])
  //. [1, 2, 3]
  //.
  //. > append(3, Cons(1, Cons(2, Nil)))
  //. Cons(1, Cons(2, Cons(3, Nil)))
  //. ```
  function append(x, xs) {
    return concat(xs, of(xs.constructor, x));
  }

  //# prepend :: (Applicative f, Semigroup (f a)) => (a, f a) -> f a
  //.
  //. Returns the result of prepending the first argument to the second.
  //.
  //. This function is derived from [`concat`](#concat) and [`of`](#of).
  //.
  //. See also [`append`](#append).
  //.
  //. ```javascript
  //. > prepend(1, [2, 3])
  //. [1, 2, 3]
  //.
  //. > prepend(1, Cons(2, Cons(3, Nil)))
  //. Cons(1, Cons(2, Cons(3, Nil)))
  //. ```
  function prepend(x, xs) {
    return concat(of(xs.constructor, x), xs);
  }

  //# chain :: Chain m => (a -> m b, m a) -> m b
  //.
  //. Function wrapper for [`fantasy-land/chain`][].
  //.
  //. `fantasy-land/chain` implementations are provided for the following
  //. built-in types: Array and Function.
  //.
  //. ```javascript
  //. > chain(x => [x, x], [1, 2, 3])
  //. [1, 1, 2, 2, 3, 3]
  //.
  //. > chain(x => x % 2 == 1 ? of(List, x) : Nil, Cons(1, Cons(2, Cons(3, Nil))))
  //. Cons(1, Cons(3, Nil))
  //.
  //. > chain(n => s => s.slice(0, n), s => Math.ceil(s.length / 2))('Haskell')
  //. 'Hask'
  //. ```
  function chain(f, chain_) {
    return Chain.methods.chain(chain_)(f);
  }

  //# join :: Chain m => m (m a) -> m a
  //.
  //. Removes one level of nesting from a nested monadic structure.
  //.
  //. This function is derived from [`chain`](#chain).
  //.
  //. ```javascript
  //. > join([[1], [2], [3]])
  //. [1, 2, 3]
  //.
  //. > join([[[1, 2, 3]]])
  //. [[1, 2, 3]]
  //.
  //. > join(Identity(Identity(1)))
  //. Identity(1)
  //. ```
  function join(chain_) {
    return chain(identity, chain_);
  }

  //# chainRec :: ChainRec m => (TypeRep m, (a -> c, b -> c, a) -> m c, a) -> m b
  //.
  //. Function wrapper for [`fantasy-land/chainRec`][].
  //.
  //. `fantasy-land/chainRec` implementations are provided for the following
  //. built-in types: Array.
  //.
  //. ```javascript
  //. > chainRec(
  //. .   Array,
  //. .   (next, done, s) => s.length == 2 ? [s + '!', s + '?'].map(done)
  //. .                                    : [s + 'o', s + 'n'].map(next),
  //. .   ''
  //. . )
  //. ['oo!', 'oo?', 'on!', 'on?', 'no!', 'no?', 'nn!', 'nn?']
  //. ```
  function chainRec(typeRep, f, x) {
    return ChainRec.methods.chainRec(typeRep)(f, x);
  }

  //# filter :: (Applicative f, Foldable f, Monoid (f a)) => (a -> Boolean, f a) -> f a
  //.
  //. Filters its second argument in accordance with the given predicate.
  //.
  //. This function is derived from [`concat`](#concat), [`empty`](#empty),
  //. [`of`](#of), and [`reduce`](#reduce).
  //.
  //. See also [`filterM`](#filterM).
  //.
  //. ```javascript
  //. > filter(x => x % 2 == 1, [1, 2, 3])
  //. [1, 3]
  //.
  //. > filter(x => x % 2 == 1, Cons(1, Cons(2, Cons(3, Nil))))
  //. Cons(1, Cons(3, Nil))
  //. ```
  function filter(pred, m) {
    //  Fast path for arrays.
    if (Array.isArray(m)) return m.filter(function(x) { return pred(x); });
    var M = m.constructor;
    return reduce(function(m, x) { return pred(x) ? concat(m, of(M, x)) : m; },
                  empty(M),
                  m);
  }

  //# filterM :: (Alternative m, Monad m) => (a -> Boolean, m a) -> m a
  //.
  //. Filters its second argument in accordance with the given predicate.
  //.
  //. This function is derived from [`of`](#of), [`chain`](#chain), and
  //. [`zero`](#zero).
  //.
  //. See also [`filter`](#filter).
  //.
  //. ```javascript
  //. > filterM(x => x % 2 == 1, [1, 2, 3])
  //. [1, 3]
  //.
  //. > filterM(x => x % 2 == 1, Cons(1, Cons(2, Cons(3, Nil))))
  //. Cons(1, Cons(3, Nil))
  //.
  //. > filterM(x => x % 2 == 1, Nothing)
  //. Nothing
  //.
  //. > filterM(x => x % 2 == 1, Just(0))
  //. Nothing
  //.
  //. > filterM(x => x % 2 == 1, Just(1))
  //. Just(1)
  //. ```
  function filterM(pred, m) {
    var M = m.constructor;
    var z = zero(M);
    return chain(function(x) { return pred(x) ? of(M, x) : z; }, m);
  }

  //# alt :: Alt f => (f a, f a) -> f a
  //.
  //. Function wrapper for [`fantasy-land/alt`][].
  //.
  //. `fantasy-land/alt` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. ```javascript
  //. > alt([1, 2, 3], [4, 5, 6])
  //. [1, 2, 3, 4, 5, 6]
  //.
  //. > alt(Nothing, Nothing)
  //. Nothing
  //.
  //. > alt(Nothing, Just(1))
  //. Just(1)
  //.
  //. > alt(Just(2), Just(3))
  //. Just(2)
  //. ```
  function alt(x, y) {
    return Alt.methods.alt(x)(y);
  }

  //# zero :: Plus f => TypeRep f -> f a
  //.
  //. Function wrapper for [`fantasy-land/zero`][].
  //.
  //. `fantasy-land/zero` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. ```javascript
  //. > zero(Array)
  //. []
  //.
  //. > zero(Object)
  //. {}
  //.
  //. > zero(Maybe)
  //. Nothing
  //. ```
  function zero(typeRep) {
    return Plus.methods.zero(typeRep)();
  }

  //# reduce :: Foldable f => ((b, a) -> b, b, f a) -> b
  //.
  //. Function wrapper for [`fantasy-land/reduce`][].
  //.
  //. `fantasy-land/reduce` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. ```javascript
  //. > reduce((xs, x) => [x].concat(xs), [], [1, 2, 3])
  //. [3, 2, 1]
  //.
  //. > reduce(concat, '', Cons('foo', Cons('bar', Cons('baz', Nil))))
  //. 'foobarbaz'
  //. ```
  function reduce(f, x, foldable) {
    return Foldable.methods.reduce(foldable)(f, x);
  }

  //# size :: Foldable f => f a -> Integer
  //.
  //. Returns the number of elements of the given structure.
  //.
  //. This function is derived from [`reduce`](#reduce).
  //.
  //. ```javascript
  //. > size([])
  //. 0
  //.
  //. > size(['foo', 'bar', 'baz'])
  //. 3
  //.
  //. > size(Nil)
  //. 0
  //.
  //. > size(Cons('foo', Cons('bar', Cons('baz', Nil))))
  //. 3
  //. ```
  function size(foldable) {
    //  Fast path for arrays.
    if (Array.isArray(foldable)) return foldable.length;
    return reduce(function(n, _) { return n + 1; }, 0, foldable);
  }

  //# elem :: (Setoid a, Foldable f) => (a, f a) -> Boolean
  //.
  //. Takes a value and a structure and returns `true` if the
  //. value is an element of the structure; `false` otherwise.
  //.
  //. This function is derived from [`equals`](#equals) and
  //. [`reduce`](#reduce).
  //.
  //. ```javascript
  //. > elem('c', ['a', 'b', 'c'])
  //. true
  //.
  //. > elem('x', ['a', 'b', 'c'])
  //. false
  //.
  //. > elem(3, {x: 1, y: 2, z: 3})
  //. true
  //.
  //. > elem(8, {x: 1, y: 2, z: 3})
  //. false
  //.
  //. > elem(0, Just(0))
  //. true
  //.
  //. > elem(0, Just(1))
  //. false
  //.
  //. > elem(0, Nothing)
  //. false
  //. ```
  function elem(x, foldable) {
    return reduce(function(b, y) { return b || equals(x, y); },
                  false,
                  foldable);
  }

  //# reverse :: (Applicative f, Foldable f, Monoid (f a)) => f a -> f a
  //.
  //. Reverses the elements of the given structure.
  //.
  //. This function is derived from [`concat`](#concat), [`empty`](#empty),
  //. [`of`](#of), and [`reduce`](#reduce).
  //.
  //. ```javascript
  //. > reverse([1, 2, 3])
  //. [3, 2, 1]
  //.
  //. > reverse(Cons(1, Cons(2, Cons(3, Nil))))
  //. Cons(3, Cons(2, Cons(1, Nil)))
  //. ```
  function reverse(foldable) {
    //  Fast path for arrays.
    if (Array.isArray(foldable)) return foldable.slice().reverse();
    var F = foldable.constructor;
    return reduce(function(xs, x) { return concat(of(F, x), xs); },
                  empty(F),
                  foldable);
  }

  //# sort :: (Ord a, Applicative f, Foldable f, Monoid (f a)) => f a -> f a
  //.
  //. Performs a [stable sort][] of the elements of the given structure,
  //. using [`lte`](#lte) for comparisons.
  //.
  //. This function is derived from [`lte`](#lte), [`concat`](#concat),
  //. [`empty`](#empty), [`of`](#of), and [`reduce`](#reduce).
  //.
  //. See also [`sortBy`](#sortBy).
  //.
  //. ```javascript
  //. > sort(['foo', 'bar', 'baz'])
  //. ['bar', 'baz', 'foo']
  //.
  //. > sort([Just(2), Nothing, Just(1)])
  //. [Nothing, Just(1), Just(2)]
  //.
  //. > sort(Cons('foo', Cons('bar', Cons('baz', Nil))))
  //. Cons('bar', Cons('baz', Cons('foo', Nil)))
  //. ```
  function sort(foldable) {
    return sortBy(identity, foldable);
  }

  //# sortBy :: (Ord b, Applicative f, Foldable f, Monoid (f a)) => (a -> b, f a) -> f a
  //.
  //. Performs a [stable sort][] of the elements of the given structure,
  //. using [`lte`](#lte) to compare the values produced by applying the
  //. given function to each element of the structure.
  //.
  //. This function is derived from [`lte`](#lte), [`concat`](#concat),
  //. [`empty`](#empty), [`of`](#of), and [`reduce`](#reduce).
  //.
  //. See also [`sort`](#sort).
  //.
  //. ```javascript
  //. > sortBy(s => s.length, ['red', 'green', 'blue'])
  //. ['red', 'blue', 'green']
  //.
  //. > sortBy(s => s.length, ['black', 'white'])
  //. ['black', 'white']
  //.
  //. > sortBy(s => s.length, ['white', 'black'])
  //. ['white', 'black']
  //.
  //. > sortBy(s => s.length, Cons('red', Cons('green', Cons('blue', Nil))))
  //. Cons('red', Cons('blue', Cons('green', Nil)))
  //. ```
  function sortBy(f, foldable) {
    var rs = reduce(function(xs, x) {
      var fx = f(x);
      var lower = 0;
      var upper = xs.length;
      while (lower < upper) {
        var idx = Math.floor((lower + upper) / 2);
        if (lte(xs[idx].fx, fx)) lower = idx + 1; else upper = idx;
      }
      xs.splice(lower, 0, {x: x, fx: fx});
      return xs;
    }, [], foldable);

    var F = foldable.constructor;
    var result = empty(F);
    for (var idx = 0; idx < rs.length; idx += 1) {
      result = concat(result, of(F, rs[idx].x));
    }
    return result;
  }

  //# takeWhile :: (Applicative f, Foldable f, Monoid (f a)) => (a -> Boolean, f a) -> f a
  //.
  //. Discards the first inner value which does not satisfy the predicate, and
  //. all subsequent inner values.
  //.
  //. This function is derived from [`concat`](#concat), [`empty`](#empty),
  //. [`of`](#of), and [`reduce`](#reduce).
  //.
  //. See also [`dropWhile`](#dropWhile).
  //.
  //. ```javascript
  //. > takeWhile(s => /x/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. ['xy', 'xz', 'yx']
  //.
  //. > takeWhile(s => /y/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. ['xy']
  //.
  //. > takeWhile(s => /z/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. []
  //. ```
  function takeWhile(pred, foldable) {
    var take = true;
    return filter(function(x) { return take = take && pred(x); }, foldable);
  }

  //# dropWhile :: (Applicative f, Foldable f, Monoid (f a)) => (a -> Boolean, f a) -> f a
  //.
  //. Retains the first inner value which does not satisfy the predicate, and
  //. all subsequent inner values.
  //.
  //. This function is derived from [`concat`](#concat), [`empty`](#empty),
  //. [`of`](#of), and [`reduce`](#reduce).
  //.
  //. See also [`takeWhile`](#takeWhile).
  //.
  //. ```javascript
  //. > dropWhile(s => /x/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. ['yz', 'zx', 'zy']
  //.
  //. > dropWhile(s => /y/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. ['xz', 'yx', 'yz', 'zx', 'zy']
  //.
  //. > dropWhile(s => /z/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. ['xy', 'xz', 'yx', 'yz', 'zx', 'zy']
  //. ```
  function dropWhile(pred, foldable) {
    var take = false;
    return filter(function(x) { return take = take || !pred(x); }, foldable);
  }

  //# traverse :: (Applicative f, Traversable t) => (TypeRep f, a -> f b, t a) -> f (t b)
  //.
  //. Function wrapper for [`fantasy-land/traverse`][].
  //.
  //. `fantasy-land/traverse` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. See also [`sequence`](#sequence).
  //.
  //. ```javascript
  //. > traverse(Array, x => x, [[1, 2, 3], [4, 5]])
  //. [[1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]]
  //.
  //. > traverse(Identity, x => Identity(x + 1), [1, 2, 3])
  //. Identity([2, 3, 4])
  //. ```
  function traverse(typeRep, f, traversable) {
    return Traversable.methods.traverse(traversable)(typeRep, f);
  }

  //# sequence :: (Applicative f, Traversable t) => (TypeRep f, t (f a)) -> f (t a)
  //.
  //. Inverts the given `t (f a)` to produce an `f (t a)`.
  //.
  //. This function is derived from [`traverse`](#traverse).
  //.
  //. ```javascript
  //. > sequence(Array, Identity([1, 2, 3]))
  //. [Identity(1), Identity(2), Identity(3)]
  //.
  //. > sequence(Identity, [Identity(1), Identity(2), Identity(3)])
  //. Identity([1, 2, 3])
  //. ```
  function sequence(typeRep, traversable) {
    return traverse(typeRep, identity, traversable);
  }

  //# extend :: Extend w => (w a -> b, w a) -> w b
  //.
  //. Function wrapper for [`fantasy-land/extend`][].
  //.
  //. `fantasy-land/extend` implementations are provided for the following
  //. built-in types: Array.
  //.
  //. ```javascript
  //. > extend(ss => ss.join(''), ['x', 'y', 'z'])
  //. ['xyz', 'yz', 'z']
  //. ```
  function extend(f, extend_) {
    return Extend.methods.extend(extend_)(f);
  }

  //# extract :: Comonad w => w a -> a
  //.
  //. Function wrapper for [`fantasy-land/extract`][].
  //.
  //. ```javascript
  //. > extract(Identity(42))
  //. 42
  //. ```
  function extract(comonad) {
    return Comonad.methods.extract(comonad)();
  }

  //# contramap :: Contravariant f => (b -> a, f a) -> f b
  //.
  //. Function wrapper for [`fantasy-land/contramap`][].
  //.
  //. `fantasy-land/contramap` implementations are provided for the following
  //. built-in types: Function.
  //.
  //. ```javascript
  //. > contramap(s => s.length, Math.sqrt)('Sanctuary')
  //. 3
  //. ```
  function contramap(f, contravariant) {
    return Contravariant.methods.contramap(contravariant)(f);
  }

  return {
    TypeClass: TypeClass,
    Setoid: Setoid,
    Ord: Ord,
    Semigroupoid: Semigroupoid,
    Category: Category,
    Semigroup: Semigroup,
    Monoid: Monoid,
    Group: Group,
    Functor: Functor,
    Bifunctor: Bifunctor,
    Profunctor: Profunctor,
    Apply: Apply,
    Applicative: Applicative,
    Chain: Chain,
    ChainRec: ChainRec,
    Monad: Monad,
    Alt: Alt,
    Plus: Plus,
    Alternative: Alternative,
    Foldable: Foldable,
    Traversable: Traversable,
    Extend: Extend,
    Comonad: Comonad,
    Contravariant: Contravariant,
    toString: toString,
    equals: equals,
    lt: lt,
    lte: lte,
    gt: gt,
    gte: gte,
    min: min,
    max: max,
    compose: compose,
    id: id,
    concat: concat,
    empty: empty,
    invert: invert,
    map: map,
    bimap: bimap,
    promap: promap,
    ap: ap,
    lift2: lift2,
    lift3: lift3,
    apFirst: apFirst,
    apSecond: apSecond,
    of: of,
    append: append,
    prepend: prepend,
    chain: chain,
    join: join,
    chainRec: chainRec,
    filter: filter,
    filterM: filterM,
    alt: alt,
    zero: zero,
    reduce: reduce,
    size: size,
    elem: elem,
    reverse: reverse,
    sort: sort,
    sortBy: sortBy,
    takeWhile: takeWhile,
    dropWhile: dropWhile,
    traverse: traverse,
    sequence: sequence,
    extend: extend,
    extract: extract,
    contramap: contramap
  };

}));

//. [Alt]:                      https://github.com/fantasyland/fantasy-land#alt
//. [Alternative]:              https://github.com/fantasyland/fantasy-land#alternative
//. [Applicative]:              https://github.com/fantasyland/fantasy-land#applicative
//. [Apply]:                    https://github.com/fantasyland/fantasy-land#apply
//. [Bifunctor]:                https://github.com/fantasyland/fantasy-land#bifunctor
//. [Category]:                 https://github.com/fantasyland/fantasy-land#category
//. [Chain]:                    https://github.com/fantasyland/fantasy-land#chain
//. [ChainRec]:                 https://github.com/fantasyland/fantasy-land#chainrec
//. [Comonad]:                  https://github.com/fantasyland/fantasy-land#comonad
//. [Contravariant]:            https://github.com/fantasyland/fantasy-land#contravariant
//. [Extend]:                   https://github.com/fantasyland/fantasy-land#extend
//. [FL]:                       https://github.com/fantasyland/fantasy-land
//. [Foldable]:                 https://github.com/fantasyland/fantasy-land#foldable
//. [Functor]:                  https://github.com/fantasyland/fantasy-land#functor
//. [Group]:                    https://github.com/fantasyland/fantasy-land#group
//. [Monad]:                    https://github.com/fantasyland/fantasy-land#monad
//. [Monoid]:                   https://github.com/fantasyland/fantasy-land#monoid
//. [Ord]:                      https://github.com/fantasyland/fantasy-land#ord
//. [Plus]:                     https://github.com/fantasyland/fantasy-land#plus
//. [Profunctor]:               https://github.com/fantasyland/fantasy-land#profunctor
//. [Semigroup]:                https://github.com/fantasyland/fantasy-land#semigroup
//. [Semigroupoid]:             https://github.com/fantasyland/fantasy-land#semigroupoid
//. [Setoid]:                   https://github.com/fantasyland/fantasy-land#setoid
//. [Traversable]:              https://github.com/fantasyland/fantasy-land#traversable
//. [`fantasy-land/alt`]:       https://github.com/fantasyland/fantasy-land#alt-method
//. [`fantasy-land/ap`]:        https://github.com/fantasyland/fantasy-land#ap-method
//. [`fantasy-land/bimap`]:     https://github.com/fantasyland/fantasy-land#bimap-method
//. [`fantasy-land/chain`]:     https://github.com/fantasyland/fantasy-land#chain-method
//. [`fantasy-land/chainRec`]:  https://github.com/fantasyland/fantasy-land#chainrec-method
//. [`fantasy-land/compose`]:   https://github.com/fantasyland/fantasy-land#compose-method
//. [`fantasy-land/concat`]:    https://github.com/fantasyland/fantasy-land#concat-method
//. [`fantasy-land/contramap`]: https://github.com/fantasyland/fantasy-land#contramap-method
//. [`fantasy-land/empty`]:     https://github.com/fantasyland/fantasy-land#empty-method
//. [`fantasy-land/equals`]:    https://github.com/fantasyland/fantasy-land#equals-method
//. [`fantasy-land/extend`]:    https://github.com/fantasyland/fantasy-land#extend-method
//. [`fantasy-land/extract`]:   https://github.com/fantasyland/fantasy-land#extract-method
//. [`fantasy-land/id`]:        https://github.com/fantasyland/fantasy-land#id-method
//. [`fantasy-land/invert`]:    https://github.com/fantasyland/fantasy-land#invert-method
//. [`fantasy-land/lte`]:       https://github.com/fantasyland/fantasy-land#lte-method
//. [`fantasy-land/map`]:       https://github.com/fantasyland/fantasy-land#map-method
//. [`fantasy-land/of`]:        https://github.com/fantasyland/fantasy-land#of-method
//. [`fantasy-land/promap`]:    https://github.com/fantasyland/fantasy-land#promap-method
//. [`fantasy-land/reduce`]:    https://github.com/fantasyland/fantasy-land#reduce-method
//. [`fantasy-land/traverse`]:  https://github.com/fantasyland/fantasy-land#traverse-method
//. [`fantasy-land/zero`]:      https://github.com/fantasyland/fantasy-land#zero-method
//. [stable sort]:              https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
//. [type-classes]:             https://github.com/sanctuary-js/sanctuary-def#type-classes

},{"sanctuary-type-identifiers":327}],327:[function(require,module,exports){
/*
        @@@@@@@            @@@@@@@         @@
      @@       @@        @@       @@      @@@
    @@   @@@ @@  @@    @@   @@@ @@  @@   @@@@@@ @@   @@@  @@ @@@      @@@@
   @@  @@   @@@   @@  @@  @@   @@@   @@   @@@   @@   @@@  @@@   @@  @@@   @@
   @@  @@   @@@   @@  @@  @@   @@@   @@   @@@   @@   @@@  @@@   @@  @@@@@@@@
   @@  @@   @@@  @@   @@  @@   @@@  @@    @@@   @@   @@@  @@@   @@  @@@
    @@   @@@ @@@@@     @@   @@@ @@@@@      @@@    @@@ @@  @@@@@@      @@@@@
      @@                 @@                           @@  @@
        @@@@@@@            @@@@@@@               @@@@@    @@
                                                          */
//. # sanctuary-type-identifiers
//.
//. A type is a set of values. Boolean, for example, is the type comprising
//. `true` and `false`. A value may be a member of multiple types (`42` is a
//. member of Number, PositiveNumber, Integer, and many other types).
//.
//. In certain situations it is useful to divide JavaScript values into
//. non-overlapping types. The language provides two constructs for this
//. purpose: the [`typeof`][1] operator and [`Object.prototype.toString`][2].
//. Each has pros and cons, but neither supports user-defined types.
//.
//. This package specifies an [algorithm][3] for deriving a _type identifier_
//. from any JavaScript value, and exports an implementation of the algorithm.
//. Authors of algebraic data types may follow this specification in order to
//. make their data types compatible with the algorithm.
//.
//. ### Algorithm
//.
//. 1.  Take any JavaScript value `x`.
//.
//. 2.  If `x` is `null` or `undefined`, go to step 6.
//.
//. 3.  If `x.constructor` evaluates to `null` or `undefined`, go to step 6.
//.
//. 4.  If `x.constructor.prototype === x`, go to step 6. This check prevents a
//.     prototype object from being considered a member of its associated type.
//.
//. 5.  If `typeof x.constructor['@@type']` evaluates to `'string'`, return
//.     the value of `x.constructor['@@type']`.
//.
//. 6.  Return the [`Object.prototype.toString`][2] representation of `x`
//.     without the leading `'[object '` and trailing `']'`.
//.
//. ### Compatibility
//.
//. For an algebraic data type to be compatible with the [algorithm][3]:
//.
//.   - every member of the type must have a `constructor` property pointing
//.     to an object known as the _type representative_;
//.
//.   - the type representative must have a `@@type` property; and
//.
//.   - the type representative's `@@type` property (the _type identifier_)
//.     must be a string primitive, ideally `'<npm-package-name>/<type-name>'`.
//.
//. For example:
//.
//. ```javascript
//. //  Identity :: a -> Identity a
//. function Identity(x) {
//.   if (!(this instanceof Identity)) return new Identity(x);
//.   this.value = x;
//. }
//.
//. Identity['@@type'] = 'my-package/Identity';
//. ```
//.
//. Note that by using a constructor function the `constructor` property is set
//. implicitly for each value created. Constructor functions are convenient for
//. this reason, but are not required. This definition is also valid:
//.
//. ```javascript
//. //  IdentityTypeRep :: TypeRep Identity
//. var IdentityTypeRep = {
//.   '@@type': 'my-package/Identity'
//. };
//.
//. //  Identity :: a -> Identity a
//. function Identity(x) {
//.   return {constructor: IdentityTypeRep, value: x};
//. }
//. ```
//.
//. ### Usage
//.
//. ```javascript
//. var Identity = require('my-package').Identity;
//. var type = require('sanctuary-type-identifiers');
//.
//. type(null);         // => 'Null'
//. type(true);         // => 'Boolean'
//. type([1, 2, 3]);    // => 'Array'
//. type(Identity);     // => 'Function'
//. type(Identity(0));  // => 'my-package/Identity'
//. ```
//.
//.
//. [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
//. [2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
//. [3]: #algorithm

(function(f) {

  'use strict';

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f();
  } else if (typeof define === 'function' && define.amd != null) {
    define([], f);
  } else {
    self.sanctuaryTypeIdentifiers = f();
  }

}(function() {

  'use strict';

  //  $$type :: String
  var $$type = '@@type';

  //  type :: Any -> String
  function type(x) {
    return x != null &&
           x.constructor != null &&
           x.constructor.prototype !== x &&
           typeof x.constructor[$$type] === 'string' ?
      x.constructor[$$type] :
      Object.prototype.toString.call(x).slice('[object '.length, -']'.length);
  }

  return type;

}));

},{}],328:[function(require,module,exports){
/*
        @@@@@@@            @@@@@@@         @@
      @@       @@        @@       @@      @@@
    @@   @@@ @@  @@    @@   @@@ @@  @@   @@@@@@ @@   @@@  @@ @@@      @@@@
   @@  @@   @@@   @@  @@  @@   @@@   @@   @@@   @@   @@@  @@@   @@  @@@   @@
   @@  @@   @@@   @@  @@  @@   @@@   @@   @@@   @@   @@@  @@@   @@  @@@@@@@@
   @@  @@   @@@  @@   @@  @@   @@@  @@    @@@   @@   @@@  @@@   @@  @@@
    @@   @@@ @@@@@     @@   @@@ @@@@@      @@@    @@@ @@  @@@@@@      @@@@@
      @@                 @@                           @@  @@
        @@@@@@@            @@@@@@@               @@@@@    @@
                                                          */
//. # sanctuary-type-identifiers
//.
//. A type is a set of values. Boolean, for example, is the type comprising
//. `true` and `false`. A value may be a member of multiple types (`42` is a
//. member of Number, PositiveNumber, Integer, and many other types).
//.
//. In certain situations it is useful to divide JavaScript values into
//. non-overlapping types. The language provides two constructs for this
//. purpose: the [`typeof`][1] operator and [`Object.prototype.toString`][2].
//. Each has pros and cons, but neither supports user-defined types.
//.
//. sanctuary-type-identifiers comprises:
//.
//.   - an npm and browser -compatible package for deriving the
//.     _type identifier_ of a JavaScript value; and
//.   - a specification which authors may follow to specify type
//.     identifiers for their types.
//.
//. ### Specification
//.
//. For a type to be compatible with the algorithm:
//.
//.   - every member of the type MUST have a `constructor` property
//.     pointing to an object known as the _type representative_;
//.
//.   - the type representative MUST have a `@@type` property
//.     (the _type identifier_); and
//.
//.   - the type identifier MUST be a string primitive and SHOULD have
//.     format `'<namespace>/<name>[@<version>]'`, where:
//.
//.       - `<namespace>` MUST consist of one or more characters, and
//.         SHOULD equal the name of the npm package which defines the
//.         type (including [scope][3] where appropriate);
//.
//.       - `<name>` MUST consist of one or more characters, and SHOULD
//.         be the unique name of the type; and
//.
//.       - `<version>` MUST consist of one or more digits, and SHOULD
//.         represent the version of the type.
//.
//. If the type identifier does not conform to the format specified above,
//. it is assumed that the entire string represents the _name_ of the type;
//. _namespace_ will be `null` and _version_ will be `0`.
//.
//. If the _version_ is not given, it is assumed to be `0`.
//.
//. For example:
//.
//. ```javascript
//. //  Identity :: a -> Identity a
//. function Identity(x) {
//.   if (!(this instanceof Identity)) return new Identity(x);
//.   this.value = x;
//. }
//.
//. Identity['@@type'] = 'my-package/Identity';
//. ```
//.
//. Note that by using a constructor function the `constructor` property is set
//. implicitly for each value created. Constructor functions are convenient for
//. this reason, but are not required. This definition is also valid:
//.
//. ```javascript
//. //  IdentityTypeRep :: TypeRep Identity
//. var IdentityTypeRep = {
//.   '@@type': 'my-package/Identity'
//. };
//.
//. //  Identity :: a -> Identity a
//. function Identity(x) {
//.   return {constructor: IdentityTypeRep, value: x};
//. }
//. ```

(function(f) {

  'use strict';

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f();
  } else if (typeof define === 'function' && define.amd != null) {
    define([], f);
  } else {
    self.sanctuaryTypeIdentifiers = f();
  }

}(function() {

  'use strict';

  //  $$type :: String
  var $$type = '@@type';

  //  pattern :: RegExp
  var pattern = new RegExp(
    '^'
  + '([\\s\\S]+)'   //  <namespace>
  + '/'             //  SOLIDUS (U+002F)
  + '([\\s\\S]+?)'  //  <name>
  + '(?:'           //  optional non-capturing group {
  +   '@'           //    COMMERCIAL AT (U+0040)
  +   '([0-9]+)'    //    <version>
  + ')?'            //  }
  + '$'
  );

  //. ### Usage
  //.
  //. ```javascript
  //. const type = require('sanctuary-type-identifiers');
  //. ```
  //.
  //. ```javascript
  //. > function Identity(x) {
  //. .   if (!(this instanceof Identity)) return new Identity(x);
  //. .   this.value = x;
  //. . }
  //. . Identity['@@type'] = 'my-package/Identity@1';
  //.
  //. > type.parse(type(Identity(0)))
  //. {namespace: 'my-package', name: 'Identity', version: 1}
  //. ```
  //.
  //. ### API
  //.
  //# type :: Any -> String
  //.
  //. Takes any value and returns a string which identifies its type. If the
  //. value conforms to the [specification][4], the custom type identifier is
  //. returned.
  //.
  //. ```javascript
  //. > type(null)
  //. 'Null'
  //.
  //. > type(true)
  //. 'Boolean'
  //.
  //. > type(Identity(0))
  //. 'my-package/Identity@1'
  //. ```
  function type(x) {
    return x != null &&
           x.constructor != null &&
           x.constructor.prototype !== x &&
           typeof x.constructor[$$type] === 'string' ?
      x.constructor[$$type] :
      Object.prototype.toString.call(x).slice('[object '.length, -']'.length);
  }

  //# type.parse :: String -> { namespace :: Nullable String, name :: String, version :: Number }
  //.
  //. Takes any string and parses it according to the [specification][4],
  //. returning an object with `namespace`, `name`, and `version` fields.
  //.
  //. ```javascript
  //. > type.parse('my-package/List@2')
  //. {namespace: 'my-package', name: 'List', version: 2}
  //.
  //. > type.parse('nonsense!')
  //. {namespace: null, name: 'nonsense!', version: 0}
  //.
  //. > type.parse(Identity['@@type'])
  //. {namespace: 'my-package', name: 'Identity', version: 1}
  //. ```
  type.parse = function parse(s) {
    var groups = pattern.exec(s);
    return {
      namespace: groups == null || groups[1] == null ? null : groups[1],
      name:      groups == null                      ? s    : groups[2],
      version:   groups == null || groups[3] == null ? 0    : Number(groups[3])
    };
  };

  return type;

}));

//. [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
//. [2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
//. [3]: https://docs.npmjs.com/misc/scope
//. [4]: #specification

},{}],329:[function(require,module,exports){
/*    #######
   ####     ####
 ####   ###   ####
#####   ###########   sanctuary
########   ########   noun
###########   #####   1 [ mass noun ] refuge from unsafe JavaScript
 ####   ###   ####
   ####     ####
      #######    */

//. # Sanctuary
//.
//. [![npm](https://img.shields.io/npm/v/sanctuary.svg)](https://www.npmjs.com/package/sanctuary)
//. [![CircleCI](https://img.shields.io/circleci/project/github/sanctuary-js/sanctuary/master.svg)](https://circleci.com/gh/sanctuary-js/sanctuary/tree/master)
//. [![Gitter](https://img.shields.io/gitter/room/badges/shields.svg)](https://gitter.im/sanctuary-js/sanctuary)
//.
//. Sanctuary is a JavaScript functional programming library inspired by
//. [Haskell][] and [PureScript][]. It's stricter than [Ramda][], and
//. provides a similar suite of functions.
//.
//. Sanctuary promotes programs composed of simple, pure functions. Such
//. programs are easier to comprehend, test, and maintain &ndash; they are
//. also a pleasure to write.
//.
//. Sanctuary provides two data types, [Maybe][] and [Either][], both of
//. which are compatible with [Fantasy Land][]. Thanks to these data types
//. even Sanctuary functions which may fail, such as [`head`](#head), are
//. composable.
//.
//. Sanctuary makes it possible to write safe code without null checks.
//. In JavaScript it's trivial to introduce a possible run-time type error:
//.
//.     words[0].toUpperCase()
//.
//. If `words` is `[]` we'll get a familiar error at run-time:
//.
//.     TypeError: Cannot read property 'toUpperCase' of undefined
//.
//. Sanctuary gives us a fighting chance of avoiding such errors. We might
//. write:
//.
//.     S.map(S.toUpper, S.head(words))
//.
//. Sanctuary is designed to work in Node.js and in ES5-compatible browsers.
//.
//. ## Types
//.
//. Sanctuary uses Haskell-like type signatures to describe the types of
//. values, including functions. `'foo'`, for example, is a member of `String`;
//. `[1, 2, 3]` is a member of `Array Number`. The double colon (`::`) is used
//. to mean "is a member of", so one could write:
//.
//.     'foo' :: String
//.     [1, 2, 3] :: Array Number
//.
//. An identifier may appear to the left of the double colon:
//.
//.     Math.PI :: Number
//.
//. The arrow (`->`) is used to express a function's type:
//.
//.     Math.abs :: Number -> Number
//.
//. That states that `Math.abs` is a unary function which takes an argument
//. of type `Number` and returns a value of type `Number`.
//.
//. Some functions are parametrically polymorphic: their types are not fixed.
//. Type variables are used in the representations of such functions:
//.
//.     S.I :: a -> a
//.
//. `a` is a type variable. Type variables are not capitalized, so they
//. are differentiable from type identifiers (which are always capitalized).
//. By convention type variables have single-character names. The signature
//. above states that `S.I` takes a value of any type and returns a value of
//. the same type. Some signatures feature multiple type variables:
//.
//.     S.K :: a -> b -> a
//.
//. It must be possible to replace all occurrences of `a` with a concrete type.
//. The same applies for each other type variable. For the function above, the
//. types with which `a` and `b` are replaced may be different, but needn't be.
//.
//. Since all Sanctuary functions are curried (they accept their arguments
//. one at a time), a binary function is represented as a unary function which
//. returns a unary function: `* -> * -> *`. This aligns neatly with Haskell,
//. which uses curried functions exclusively. In JavaScript, though, we may
//. wish to represent the types of functions with arities less than or greater
//. than one. The general form is `(<input-types>) -> <output-type>`, where
//. `<input-types>` comprises zero or more comma–space (<code>, </code>)
//. -separated type representations:
//.
//.   - `() -> String`
//.   - `(a, b) -> a`
//.   - `(a, b, c) -> d`
//.
//. `Number -> Number` can thus be seen as shorthand for `(Number) -> Number`.
//.
//. The question mark (`?`) is used to represent types which include `null`
//. and `undefined` as members. `String?`, for example, represents the type
//. comprising `null`, `undefined`, and all strings.
//.
//. Sanctuary embraces types. JavaScript doesn't support algebraic data types,
//. but these can be simulated by providing a group of data constructors which
//. return values with the same set of methods. A value of the Either type, for
//. example, is created via the Left constructor or the Right constructor.
//.
//. It's necessary to extend Haskell's notation to describe implicit arguments
//. to the *methods* provided by Sanctuary's types. In `x.map(y)`, for example,
//. the `map` method takes an implicit argument `x` in addition to the explicit
//. argument `y`. The type of the value upon which a method is invoked appears
//. at the beginning of the signature, separated from the arguments and return
//. value by a squiggly arrow (`~>`). The type of the `fantasy-land/map` method
//. of the Maybe type is written `Maybe a ~> (a -> b) -> Maybe b`. One could
//. read this as:
//.
//. _When the `fantasy-land/map` method is invoked on a value of type `Maybe a`
//. (for any type `a`) with an argument of type `a -> b` (for any type `b`),
//. it returns a value of type `Maybe b`._
//.
//. The squiggly arrow is also used when representing non-function properties.
//. `Maybe a ~> Boolean`, for example, represents a Boolean property of a value
//. of type `Maybe a`.
//.
//. Sanctuary supports type classes: constraints on type variables. Whereas
//. `a -> a` implicitly supports every type, `Functor f => (a -> b) -> f a ->
//. f b` requires that `f` be a type which satisfies the requirements of the
//. Functor type class. Type-class constraints appear at the beginning of a
//. type signature, separated from the rest of the signature by a fat arrow
//. (`=>`).
//.
//. ### Type representatives
//.
//. What is the type of `Number`? One answer is `a -> Number`, since it's a
//. function which takes an argument of any type and returns a Number value.
//. When provided as the first argument to [`is`](#is), though, `Number` is
//. really the value-level representative of the Number type.
//.
//. Sanctuary uses the TypeRep pseudotype to describe type representatives.
//. For example:
//.
//.     Number :: TypeRep Number
//.
//. `Number` is the sole inhabitant of the TypeRep Number type.
//.
//. ## Type checking
//.
//. Sanctuary functions are defined via [sanctuary-def][] to provide run-time
//. type checking. This is tremendously useful during development: type errors
//. are reported immediately, avoiding circuitous stack traces (at best) and
//. silent failures due to type coercion (at worst). For example:
//.
//. ```javascript
//. S.add(2, true);
//. // ! TypeError: Invalid value
//. //
//. //   add :: FiniteNumber -> FiniteNumber -> FiniteNumber
//. //                          ^^^^^^^^^^^^
//. //                               1
//. //
//. //   1)  true :: Boolean
//. //
//. //   The value at position 1 is not a member of ‘FiniteNumber’.
//. //
//. //   See v:sanctuary-js/sanctuary-def#FiniteNumber for information about the sanctuary-def/FiniteNumber type.
//. ```
//.
//. Compare this to the behaviour of Ramda's unchecked equivalent:
//.
//. ```javascript
//. R.add(2, true);
//. // => 3
//. ```
//.
//. There is a performance cost to run-time type checking. One may wish to
//. disable type checking in certain contexts to avoid paying this cost.
//. [`create`](#create) facilitates the creation of a Sanctuary module which
//. does not perform type checking.
//.
//. In Node, one could use an environment variable to determine whether to
//. perform type checking:
//.
//. ```javascript
//. const {create, env} = require('sanctuary');
//.
//. const checkTypes = process.env.NODE_ENV !== 'production';
//. const S = create({checkTypes, env});
//. ```
//.
//. ## API

(function(f) {

  'use strict';

  /* istanbul ignore else */
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f(require('sanctuary-def'),
                       require('sanctuary-type-classes'),
                       require('sanctuary-type-identifiers'));
  } else if (typeof define === 'function' && define.amd != null) {
    define(['sanctuary-def',
            'sanctuary-type-classes',
            'sanctuary-type-identifiers'],
           f);
  } else {
    self.sanctuary = f(self.sanctuaryDef,
                       self.sanctuaryTypeClasses,
                       self.sanctuaryTypeIdentifiers);
  }

}(function($, Z, type) {

  'use strict';

  //  Fn :: (Type, Type) -> Type
  function Fn(x, y) { return $.Function([x, y]); }

  //  flip$ :: ((a, b) -> c) -> b -> a -> c
  function flip$(f) {
    return function(x) {
      return function(y) {
        return f(y, x);
      };
    };
  }

  //  toObject :: a -> Object
  function toObject(x) {
    return x == null ? Object.create(null) : Object(x);
  }

  //  typeEq :: String -> a -> Boolean
  function typeEq(typeIdent) {
    return function(x) {
      return type(x) === typeIdent;
    };
  }

  //  uncurry2 :: (a -> b -> c) -> ((a, b) -> c)
  function uncurry2(f) {
    return function(x, y) {
      return f(x)(y);
    };
  }

  //  readmeUrl :: String -> String
  function readmeUrl(id) {
    var version = '0.14.1';  // updated programmatically
    return 'https://github.com/sanctuary-js/sanctuary/tree/v' + version +
           '#' + id;
  }

  //  :: Type
  var a = $.TypeVariable('a');
  var b = $.TypeVariable('b');
  var c = $.TypeVariable('c');
  var d = $.TypeVariable('d');
  var e = $.TypeVariable('e');
  var g = $.TypeVariable('g');
  var l = $.TypeVariable('l');
  var r = $.TypeVariable('r');

  //  :: Type -> Type
  var f = $.UnaryTypeVariable('f');
  var m = $.UnaryTypeVariable('m');
  var t = $.UnaryTypeVariable('t');
  var w = $.UnaryTypeVariable('w');

  //  :: Type -> Type -> Type
  var p = $.BinaryTypeVariable('p');
  var s = $.BinaryTypeVariable('s');

  //  eitherTypeIdent :: String
  var eitherTypeIdent = 'sanctuary/Either';

  //  $Either :: Type -> Type -> Type
  var $Either = $.BinaryType(
    eitherTypeIdent,
    readmeUrl('EitherType'),
    typeEq(eitherTypeIdent),
    function(either) { return either.isLeft ? [either.value] : []; },
    function(either) { return either.isRight ? [either.value] : []; }
  );

  //  List :: Type -> Type
  var List = $.UnaryType(
    'sanctuary/List',
    readmeUrl('list'),
    function(x) { return $.String._test(x) || Array.isArray(x); },
    function(list) { return $.String._test(list) ? [] : list; }
  );

  //  maybeTypeIdent :: String
  var maybeTypeIdent = 'sanctuary/Maybe';

  //  $Maybe :: Type -> Type
  var $Maybe = $.UnaryType(
    maybeTypeIdent,
    readmeUrl('MaybeType'),
    typeEq(maybeTypeIdent),
    function(maybe) { return maybe.isJust ? [maybe.value] : []; }
  );

  //  TypeRep :: Type -> Type
  var TypeRep = $.UnaryType(
    'sanctuary/TypeRep',
    readmeUrl('type-representatives'),
    function(x) {
      return $.AnyFunction._test(x) ||
             x != null && $.String._test(x['@@type']);
    },
    function(typeRep) { return []; }
  );

  //  defaultEnv :: Array Type
  var defaultEnv = Z.concat($.env, [
    $.FiniteNumber,
    $.NonZeroFiniteNumber,
    $Either($.Unknown, $.Unknown),
    Fn($.Unknown, $.Unknown),
    $.GlobalRegExp,
    $.NonGlobalRegExp,
    $.Integer,
    $.NonNegativeInteger,
    $Maybe($.Unknown),
    $.Pair($.Unknown, $.Unknown),
    $.RegexFlags,
    $.ValidDate,
    $.ValidNumber
  ]);

  //  Options :: Type
  var Options = $.RecordType({checkTypes: $.Boolean, env: $.Array($.Any)});

  //  createSanctuary :: Options -> Module
  function createSanctuary(opts) {

  /* eslint-disable indent */

  //  checkTypes :: Boolean
  var checkTypes = opts.checkTypes;

  //  env :: Array Type
  var env = opts.env;

  var S = {};

  //# create :: { checkTypes :: Boolean, env :: Array Type } -> Module
  //.
  //. Takes an options record and returns a Sanctuary module. `checkTypes`
  //. specifies whether to enable type checking. The module's polymorphic
  //. functions (such as [`I`](#I)) require each value associated with a
  //. type variable to be a member of at least one type in the environment.
  //.
  //. A well-typed application of a Sanctuary function will produce the same
  //. result regardless of whether type checking is enabled. If type checking
  //. is enabled, a badly typed application will produce an exception with a
  //. descriptive error message.
  //.
  //. The following snippet demonstrates defining a custom type and using
  //. `create` to produce a Sanctuary module which is aware of that type:
  //.
  //. ```javascript
  //. const {create, env} = require('sanctuary');
  //. const $ = require('sanctuary-def');
  //. const type = require('sanctuary-type-identifiers');
  //.
  //. //    Identity :: a -> Identity a
  //. const Identity = function Identity(x) {
  //.   if (!(this instanceof Identity)) return new Identity(x);
  //.   this.value = x;
  //. };
  //.
  //. Identity['@@type'] = 'my-package/Identity@1';
  //.
  //. Identity.prototype['fantasy-land/map'] = function(f) {
  //.   return Identity(f(this.value));
  //. };
  //.
  //. //    IdentityType :: Type -> Type
  //. const IdentityType = $.UnaryType(
  //.   Identity['@@type'],
  //.   'http://example.com/my-package#Identity',
  //.   x => type(x) === Identity['@@type'],
  //.   identity => [identity.value]
  //. );
  //.
  //. const S = create({
  //.   checkTypes: process.env.NODE_ENV !== 'production',
  //.   env: env.concat([IdentityType($.Unknown)]),
  //. });
  //.
  //. S.map(S.sub(1), Identity(43));
  //. // => Identity(42)
  //. ```
  //.
  //. See also [`env`](#env).
  S.create =
  $.create({checkTypes: checkTypes, env: defaultEnv})('create',
                                                      {},
                                                      [Options, $.Object],
                                                      createSanctuary);

  //# env :: Array Type
  //.
  //. The default environment, which may be used as is or as the basis of a
  //. custom environment in conjunction with [`create`](#create).
  S.env = defaultEnv;

  /* istanbul ignore if */
  if (typeof __doctest !== 'undefined') {
    /* global __doctest:false */
    /* eslint-disable no-unused-vars */
    var _List = __doctest.require('./test/internal/List');
    var Cons = _List.Cons;
    var Nil = _List.Nil;
    var Sum = __doctest.require('./test/internal/Sum');
    /* eslint-enable no-unused-vars */
    env = Z.concat(env, [_List.Type($.Unknown), Sum.Type]);
  }

  var def = $.create({checkTypes: checkTypes, env: env});

  //. ### Placeholder
  //.
  //. Sanctuary functions are designed with partial application in mind.
  //. In many cases one can define a more specific function in terms of
  //. a more general one simply by applying the more general function to
  //. some (but not all) of its arguments. For example, one could define
  //. `sum :: Foldable f => f Number -> Number` as `S.reduce(S.add, 0)`.
  //.
  //. In some cases, though, there are multiple orders in which one may
  //. wish to provide a function's arguments. `S.concat('prefix')` is a
  //. function which prefixes its argument, but how would one define a
  //. function which suffixes its argument? It's possible with the help
  //. of [`__`](#__), the special placeholder value.
  //.
  //. The placeholder indicates a hole to be filled at some future time.
  //. The following are all equivalent (`_` represents the placeholder):
  //.
  //.   - `f(x, y, z)`
  //.   - `f(_, y, z)(x)`
  //.   - `f(_, _, z)(x, y)`
  //.   - `f(_, _, z)(_, y)(x)`

  //# __ :: Placeholder
  //.
  //. The special [placeholder](#placeholder) value.
  //.
  //. ```javascript
  //. > S.map(S.concat('@'), ['foo', 'bar', 'baz'])
  //. ['@foo', '@bar', '@baz']
  //.
  //. > S.map(S.concat(S.__, '?'), ['foo', 'bar', 'baz'])
  //. ['foo?', 'bar?', 'baz?']
  //. ```
  S.__ = $.__;

  //. ### Classify

  //# type :: Any -> { namespace :: Maybe String, name :: String, version :: NonNegativeInteger }
  //.
  //. Returns the result of parsing the [type identifier][] of the given value.
  //.
  //. ```javascript
  //. > S.type(S.Just(42))
  //. {namespace: Just('sanctuary'), name: 'Maybe', version: 0}
  //.
  //. > S.type([1, 2, 3])
  //. {namespace: Nothing, name: 'Array', version: 0}
  //. ```
  S.type =
  def('type',
      {},
      [$.Any,
       $.RecordType({namespace: $Maybe($.String),
                     name: $.String,
                     version: $.NonNegativeInteger})],
      function(x) {
        var r = type.parse(type(x));
        r.namespace = toMaybe(r.namespace);
        return r;
      });

  //# is :: TypeRep a -> Any -> Boolean
  //.
  //. Takes a [type representative](#type-representatives) and a value of any
  //. type and returns `true` [iff][] the given value is of the specified type.
  //. Subtyping is not respected.
  //.
  //. ```javascript
  //. > S.is(Number, 42)
  //. true
  //.
  //. > S.is(Object, 42)
  //. false
  //.
  //. > S.is(String, 42)
  //. false
  //. ```
  function is(typeRep, x) {
    var xType = type(x);
    if ($.String._test(typeRep['@@type'])) {
      return xType === typeRep['@@type'];
    } else {
      var match = /function (\w*)/.exec(typeRep);
      return match != null && match[1] === xType;
    }
  }
  S.is = def('is', {}, [TypeRep(a), $.Any, $.Boolean], is);

  //. ### Showable

  //# toString :: Any -> String
  //.
  //. Alias of [`Z.toString`][].
  //.
  //. ```javascript
  //. > S.toString(-0)
  //. '-0'
  //.
  //. > S.toString(['foo', 'bar', 'baz'])
  //. '["foo", "bar", "baz"]'
  //.
  //. > S.toString({x: 1, y: 2, z: 3})
  //. '{"x": 1, "y": 2, "z": 3}'
  //.
  //. > S.toString(S.Left(S.Right(S.Just(S.Nothing))))
  //. 'Left(Right(Just(Nothing)))'
  //. ```
  S.toString = def('toString', {}, [$.Any, $.String], Z.toString);

  //. ### Fantasy Land
  //.
  //. Sanctuary is compatible with the [Fantasy Land][] specification.

  //# equals :: Setoid a => a -> a -> Boolean
  //.
  //. Curried version of [`Z.equals`][] which requires two arguments of the
  //. same type.
  //.
  //. To compare values of different types first use [`create`](#create) to
  //. create a Sanctuary module with type checking disabled, then use that
  //. module's `equals` function.
  //.
  //. ```javascript
  //. > S.equals(0, -0)
  //. true
  //.
  //. > S.equals(NaN, NaN)
  //. true
  //.
  //. > S.equals(S.Just([1, 2, 3]), S.Just([1, 2, 3]))
  //. true
  //.
  //. > S.equals(S.Just([1, 2, 3]), S.Just([1, 2, 4]))
  //. false
  //. ```
  S.equals = def('equals', {a: [Z.Setoid]}, [a, a, $.Boolean], Z.equals);

  //# lt :: Ord a => a -> (a -> Boolean)
  //.
  //. Returns `true` [iff][] the *second* argument is less than the first
  //. according to [`Z.lt`][]. The arguments must be provided one at a time.
  //.
  //. See also [`lt_`](#lt_).
  //.
  //. ```javascript
  //. > S.filter(S.lt(3), [1, 2, 3, 4, 5])
  //. [1, 2]
  //. ```
  S.lt = def('lt', {a: [Z.Ord]}, [a, $.Predicate(a)], flip$(Z.lt));

  //# lt_ :: Ord a => a -> a -> Boolean
  //.
  //. Returns `true` [iff][] the first argument is less than the second
  //. according to [`Z.lt`][].
  //.
  //. See also [`lt`](#lt).
  //.
  //. ```javascript
  //. > S.lt_([1, 2, 3], [1, 2, 3])
  //. false
  //.
  //. > S.lt_([1, 2, 3], [1, 2, 4])
  //. true
  //.
  //. > S.lt_([1, 2, 3], [1, 2])
  //. false
  //. ```
  S.lt_ = def('lt_', {a: [Z.Ord]}, [a, a, $.Boolean], Z.lt);

  //# lte :: Ord a => a -> (a -> Boolean)
  //.
  //. Returns `true` [iff][] the *second* argument is less than or equal to
  //. the first according to [`Z.lte`][]. The arguments must be provided one
  //. at a time.
  //.
  //. See also [`lte_`](#lte_).
  //.
  //. ```javascript
  //. > S.filter(S.lte(3), [1, 2, 3, 4, 5])
  //. [1, 2, 3]
  //. ```
  S.lte = def('lte', {a: [Z.Ord]}, [a, $.Predicate(a)], flip$(Z.lte));

  //# lte_ :: Ord a => a -> a -> Boolean
  //.
  //. Returns `true` [iff][] the first argument is less than or equal to the
  //. second according to [`Z.lte`][].
  //.
  //. See also [`lte`](#lte).
  //.
  //. ```javascript
  //. > S.lte_([1, 2, 3], [1, 2, 3])
  //. true
  //.
  //. > S.lte_([1, 2, 3], [1, 2, 4])
  //. true
  //.
  //. > S.lte_([1, 2, 3], [1, 2])
  //. false
  //. ```
  S.lte_ = def('lte_', {a: [Z.Ord]}, [a, a, $.Boolean], Z.lte);

  //# gt :: Ord a => a -> (a -> Boolean)
  //.
  //. Returns `true` [iff][] the *second* argument is greater than the first
  //. according to [`Z.gt`][]. The arguments must be provided one at a time.
  //.
  //. See also [`gt_`](#gt_).
  //.
  //. ```javascript
  //. > S.filter(S.gt(3), [1, 2, 3, 4, 5])
  //. [4, 5]
  //. ```
  S.gt = def('gt', {a: [Z.Ord]}, [a, $.Predicate(a)], flip$(Z.gt));

  //# gt_ :: Ord a => a -> a -> Boolean
  //.
  //. Returns `true` [iff][] the first argument is greater than the second
  //. according to [`Z.gt`][].
  //.
  //. See also [`gt`](#gt).
  //.
  //. ```javascript
  //. > S.gt_([1, 2, 3], [1, 2, 3])
  //. false
  //.
  //. > S.gt_([1, 2, 3], [1, 2, 4])
  //. false
  //.
  //. > S.gt_([1, 2, 3], [1, 2])
  //. true
  //. ```
  S.gt_ = def('gt_', {a: [Z.Ord]}, [a, a, $.Boolean], Z.gt);

  //# gte :: Ord a => a -> (a -> Boolean)
  //.
  //. Returns `true` [iff][] the *second* argument is greater than or equal
  //. to the first according to [`Z.gte`][]. The arguments must be provided
  //. one at a time.
  //.
  //. See also [`gte_`](#gte_).
  //.
  //. ```javascript
  //. > S.filter(S.gte(3), [1, 2, 3, 4, 5])
  //. [3, 4, 5]
  //. ```
  S.gte = def('gte', {a: [Z.Ord]}, [a, $.Predicate(a)], flip$(Z.gte));

  //# gte_ :: Ord a => a -> a -> Boolean
  //.
  //. Returns `true` [iff][] the first argument is greater than or equal to
  //. the second according to [`Z.gte`][].
  //.
  //. See also [`gte`](#gte).
  //.
  //. ```javascript
  //. > S.gte_([1, 2, 3], [1, 2, 3])
  //. true
  //.
  //. > S.gte_([1, 2, 3], [1, 2, 4])
  //. false
  //.
  //. > S.gte_([1, 2, 3], [1, 2])
  //. true
  //. ```
  S.gte_ = def('gte_', {a: [Z.Ord]}, [a, a, $.Boolean], Z.gte);

  //# min :: Ord a => a -> a -> a
  //.
  //. Returns the smaller of its two arguments (according to [`Z.lte`][]).
  //.
  //. See also [`max`](#max).
  //.
  //. ```javascript
  //. > S.min(10, 2)
  //. 2
  //.
  //. > S.min(new Date('1999-12-31'), new Date('2000-01-01'))
  //. new Date('1999-12-31')
  //.
  //. > S.min('10', '2')
  //. '10'
  //. ```
  S.min = def('min', {a: [Z.Ord]}, [a, a, a], Z.min);

  //# max :: Ord a => a -> a -> a
  //.
  //. Returns the larger of its two arguments (according to [`Z.lte`][]).
  //.
  //. See also [`min`](#min).
  //.
  //. ```javascript
  //. > S.max(10, 2)
  //. 10
  //.
  //. > S.max(new Date('1999-12-31'), new Date('2000-01-01'))
  //. new Date('2000-01-01')
  //.
  //. > S.max('10', '2')
  //. '2'
  //. ```
  S.max = def('max', {a: [Z.Ord]}, [a, a, a], Z.max);

  //# id :: Category c => TypeRep c -> c
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.id`][].
  //.
  //. ```javascript
  //. > S.id(Function)(42)
  //. 42
  //. ```
  S.id = def('id', {c: [Z.Category]}, [TypeRep(c), c], Z.id);

  //# concat :: Semigroup a => a -> a -> a
  //.
  //. Curried version of [`Z.concat`][].
  //.
  //. ```javascript
  //. > S.concat('abc', 'def')
  //. 'abcdef'
  //.
  //. > S.concat([1, 2, 3], [4, 5, 6])
  //. [1, 2, 3, 4, 5, 6]
  //.
  //. > S.concat({x: 1, y: 2}, {y: 3, z: 4})
  //. {x: 1, y: 3, z: 4}
  //.
  //. > S.concat(S.Just([1, 2, 3]), S.Just([4, 5, 6]))
  //. Just([1, 2, 3, 4, 5, 6])
  //.
  //. > S.concat(Sum(18), Sum(24))
  //. Sum(42)
  //. ```
  S.concat = def('concat', {a: [Z.Semigroup]}, [a, a, a], Z.concat);

  //# empty :: Monoid a => TypeRep a -> a
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.empty`][].
  //.
  //. ```javascript
  //. > S.empty(String)
  //. ''
  //.
  //. > S.empty(Array)
  //. []
  //.
  //. > S.empty(Object)
  //. {}
  //.
  //. > S.empty(Sum)
  //. Sum(0)
  //. ```
  S.empty = def('empty', {a: [Z.Monoid]}, [TypeRep(a), a], Z.empty);

  //# invert :: Group g => g -> g
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.invert`][].
  //.
  //. ```javascript
  //. > S.invert(Sum(5))
  //. Sum(-5)
  //. ```
  S.invert = def('invert', {g: [Z.Group]}, [g, g], Z.invert);

  //# map :: Functor f => (a -> b) -> f a -> f b
  //.
  //. Curried version of [`Z.map`][].
  //.
  //. ```javascript
  //. > S.map(Math.sqrt, [1, 4, 9])
  //. [1, 2, 3]
  //.
  //. > S.map(Math.sqrt, {x: 1, y: 4, z: 9})
  //. {x: 1, y: 2, z: 3}
  //.
  //. > S.map(Math.sqrt, S.Just(9))
  //. Just(3)
  //.
  //. > S.map(Math.sqrt, S.Right(9))
  //. Right(3)
  //. ```
  //.
  //. Replacing `Functor f => f` with `Function x` produces the B combinator
  //. from combinatory logic (i.e. [`compose`](#compose)):
  //.
  //.     Functor f => (a -> b) -> f a -> f b
  //.     (a -> b) -> Function x a -> Function x b
  //.     (a -> c) -> Function x a -> Function x c
  //.     (b -> c) -> Function x b -> Function x c
  //.     (b -> c) -> Function a b -> Function a c
  //.     (b -> c) -> (a -> b) -> (a -> c)
  //.
  //. ```javascript
  //. > S.map(Math.sqrt, S.add(1))(99)
  //. 10
  //. ```
  S.map = def('map', {f: [Z.Functor]}, [Fn(a, b), f(a), f(b)], Z.map);

  //# bimap :: Bifunctor f => (a -> b) -> (c -> d) -> f a c -> f b d
  //.
  //. Curried version of [`Z.bimap`][].
  //.
  //. ```javascript
  //. > S.bimap(S.toUpper, Math.sqrt, S.Left('foo'))
  //. Left('FOO')
  //.
  //. > S.bimap(S.toUpper, Math.sqrt, S.Right(64))
  //. Right(8)
  //. ```
  S.bimap =
  def('bimap',
      {p: [Z.Bifunctor]},
      [Fn(a, b), Fn(c, d), p(a, c), p(b, d)],
      Z.bimap);

  //# promap :: Profunctor p => (a -> b) -> (c -> d) -> p b c -> p a d
  //.
  //. Curried version of [`Z.promap`][].
  //.
  //. ```javascript
  //. > S.promap(Math.abs, S.add(1), Math.sqrt)(-100)
  //. 11
  //. ```
  S.promap =
  def('promap',
      {p: [Z.Profunctor]},
      [Fn(a, b), Fn(c, d), p(b, c), p(a, d)],
      Z.promap);

  //# alt :: Alt f => f a -> f a -> f a
  //.
  //. Curried version of [`Z.alt`][].
  //.
  //. ```javascript
  //. > S.alt(S.Nothing, S.Just(1))
  //. Just(1)
  //.
  //. > S.alt(S.Just(2), S.Just(3))
  //. Just(2)
  //.
  //. > S.alt(S.Left('X'), S.Right(1))
  //. Right(1)
  //.
  //. > S.alt(S.Right(2), S.Right(3))
  //. Right(2)
  //. ```
  S.alt = def('alt', {f: [Z.Alt]}, [f(a), f(a), f(a)], Z.alt);

  //# zero :: Plus f => TypeRep f -> f a
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.zero`][].
  //.
  //. ```javascript
  //. > S.zero(Array)
  //. []
  //.
  //. > S.zero(Object)
  //. {}
  //.
  //. > S.zero(S.Maybe)
  //. Nothing
  //. ```
  S.zero =
  def('zero', {f: [Z.Plus]}, [TypeRep($.TypeVariable('f')), f(a)], Z.zero);

  //# reduce :: Foldable f => (b -> a -> b) -> b -> f a -> b
  //.
  //. Takes a curried binary function, an initial value, and a [Foldable][],
  //. and applies the function to the initial value and the Foldable's first
  //. value, then applies the function to the result of the previous
  //. application and the Foldable's second value. Repeats this process
  //. until each of the Foldable's values has been used. Returns the initial
  //. value if the Foldable is empty; the result of the final application
  //. otherwise.
  //.
  //. ```javascript
  //. > S.reduce(S.add, 0, [1, 2, 3, 4, 5])
  //. 15
  //.
  //. > S.reduce(xs => x => [x].concat(xs), [], [1, 2, 3, 4, 5])
  //. [5, 4, 3, 2, 1]
  //. ```
  function reduce(f, initial, foldable) {
    return Z.reduce(uncurry2(f), initial, foldable);
  }
  S.reduce =
  def('reduce', {f: [Z.Foldable]}, [Fn(a, Fn(b, a)), a, f(b), a], reduce);

  //# traverse :: (Applicative f, Traversable t) => TypeRep f -> (a -> f b) -> t a -> f (t b)
  //.
  //. Curried version of [`Z.traverse`][].
  //.
  //. ```javascript
  //. > S.traverse(Array, S.words, S.Just('foo bar baz'))
  //. [Just('foo'), Just('bar'), Just('baz')]
  //.
  //. > S.traverse(Array, S.words, S.Nothing)
  //. [Nothing]
  //.
  //. > S.traverse(S.Maybe, S.parseInt(16), ['A', 'B', 'C'])
  //. Just([10, 11, 12])
  //.
  //. > S.traverse(S.Maybe, S.parseInt(16), ['A', 'B', 'C', 'X'])
  //. Nothing
  //.
  //. > S.traverse(S.Maybe, S.parseInt(16), {a: 'A', b: 'B', c: 'C'})
  //. Just({a: 10, b: 11, c: 12})
  //.
  //. > S.traverse(S.Maybe, S.parseInt(16), {a: 'A', b: 'B', c: 'C', x: 'X'})
  //. Nothing
  //. ```
  S.traverse =
  def('traverse',
      {f: [Z.Applicative], t: [Z.Traversable]},
      [TypeRep($.TypeVariable('f')), Fn(a, f(b)), t(a), f(t(b))],
      Z.traverse);

  //# sequence :: (Applicative f, Traversable t) => TypeRep f -> t (f a) -> f (t a)
  //.
  //. Curried version of [`Z.sequence`][]. Inverts the given `t (f a)`
  //. to produce an `f (t a)`.
  //.
  //. ```javascript
  //. > S.sequence(Array, S.Just([1, 2, 3]))
  //. [Just(1), Just(2), Just(3)]
  //.
  //. > S.sequence(S.Maybe, [S.Just(1), S.Just(2), S.Just(3)])
  //. Just([1, 2, 3])
  //.
  //. > S.sequence(S.Maybe, [S.Just(1), S.Just(2), S.Nothing])
  //. Nothing
  //.
  //. > S.sequence(S.Maybe, {a: S.Just(1), b: S.Just(2), c: S.Just(3)})
  //. Just({a: 1, b: 2, c: 3})
  //.
  //. > S.sequence(S.Maybe, {a: S.Just(1), b: S.Just(2), c: S.Nothing})
  //. Nothing
  //. ```
  S.sequence =
  def('sequence',
      {f: [Z.Applicative], t: [Z.Traversable]},
      [TypeRep($.TypeVariable('f')), t(f(a)), f(t(a))],
      Z.sequence);

  //# ap :: Apply f => f (a -> b) -> f a -> f b
  //.
  //. Curried version of [`Z.ap`][].
  //.
  //. ```javascript
  //. > S.ap([Math.sqrt, x => x * x], [1, 4, 9, 16, 25])
  //. [1, 2, 3, 4, 5, 1, 16, 81, 256, 625]
  //.
  //. > S.ap({x: Math.sqrt, y: S.add(1), z: S.sub(1)}, {w: 4, x: 4, y: 4})
  //. {x: 2, y: 5}
  //.
  //. > S.ap(S.Just(Math.sqrt), S.Just(64))
  //. Just(8)
  //. ```
  //.
  //. Replacing `Apply f => f` with `Function x` produces the S combinator
  //. from combinatory logic:
  //.
  //.     Apply f => f (a -> b) -> f a -> f b
  //.     Function x (a -> b) -> Function x a -> Function x b
  //.     Function x (a -> c) -> Function x a -> Function x c
  //.     Function x (b -> c) -> Function x b -> Function x c
  //.     Function a (b -> c) -> Function a b -> Function a c
  //.     (a -> b -> c) -> (a -> b) -> (a -> c)
  //.
  //. ```javascript
  //. > S.ap(s => n => s.slice(0, n), s => Math.ceil(s.length / 2))('Haskell')
  //. 'Hask'
  //. ```
  S.ap =
  def('ap',
      {f: [Z.Apply]},
      [f(Fn(a, b)), f(a), f(b)],
      Z.ap);

  //# lift2 :: Apply f => (a -> b -> c) -> f a -> f b -> f c
  //.
  //. Promotes a curried binary function to a function which operates on two
  //. [Apply][]s.
  //.
  //. ```javascript
  //. > S.lift2(S.add, S.Just(2), S.Just(3))
  //. Just(5)
  //.
  //. > S.lift2(S.add, S.Just(2), S.Nothing)
  //. Nothing
  //.
  //. > S.lift2(S.and, S.Just(true), S.Just(true))
  //. Just(true)
  //.
  //. > S.lift2(S.and, S.Just(true), S.Just(false))
  //. Just(false)
  //. ```
  S.lift2 =
  def('lift2', {f: [Z.Apply]}, [Fn(a, Fn(b, c)), f(a), f(b), f(c)], Z.lift2);

  //# lift3 :: Apply f => (a -> b -> c -> d) -> f a -> f b -> f c -> f d
  //.
  //. Promotes a curried ternary function to a function which operates on three
  //. [Apply][]s.
  //.
  //. ```javascript
  //. > S.lift3(S.reduce, S.Just(S.add), S.Just(0), S.Just([1, 2, 3]))
  //. Just(6)
  //.
  //. > S.lift3(S.reduce, S.Just(S.add), S.Just(0), S.Nothing)
  //. Nothing
  //. ```
  S.lift3 =
  def('lift3',
      {f: [Z.Apply]},
      [Fn(a, Fn(b, Fn(c, d))), f(a), f(b), f(c), f(d)],
      Z.lift3);

  //# apFirst :: Apply f => f a -> f b -> f a
  //.
  //. Curried version of [`Z.apFirst`][]. Combines two effectful actions,
  //. keeping only the result of the first. Equivalent to Haskell's `(<*)`
  //. function.
  //.
  //. See also [`apSecond`](#apSecond).
  //.
  //. ```javascript
  //. > S.apFirst([1, 2], [3, 4])
  //. [1, 1, 2, 2]
  //.
  //. > S.apFirst(S.Just(1), S.Just(2))
  //. Just(1)
  //. ```
  S.apFirst = def('apFirst', {f: [Z.Apply]}, [f(a), f(b), f(a)], Z.apFirst);

  //# apSecond :: Apply f => f a -> f b -> f b
  //.
  //. Curried version of [`Z.apSecond`][]. Combines two effectful actions,
  //. keeping only the result of the second. Equivalent to Haskell's `(*>)`
  //. function.
  //.
  //. See also [`apFirst`](#apFirst).
  //.
  //. ```javascript
  //. > S.apSecond([1, 2], [3, 4])
  //. [3, 4, 3, 4]
  //.
  //. > S.apSecond(S.Just(1), S.Just(2))
  //. Just(2)
  //. ```
  S.apSecond = def('apSecond', {f: [Z.Apply]}, [f(a), f(b), f(b)], Z.apSecond);

  //# of :: Applicative f => TypeRep f -> a -> f a
  //.
  //. Curried version of [`Z.of`][].
  //.
  //. ```javascript
  //. > S.of(Array, 42)
  //. [42]
  //.
  //. > S.of(Function, 42)(null)
  //. 42
  //.
  //. > S.of(S.Maybe, 42)
  //. Just(42)
  //.
  //. > S.of(S.Either, 42)
  //. Right(42)
  //. ```
  S.of =
  def('of',
      {f: [Z.Applicative]},
      [TypeRep($.TypeVariable('f')), a, f(a)],
      Z.of);

  //# chain :: Chain m => (a -> m b) -> m a -> m b
  //.
  //. Curried version of [`Z.chain`][].
  //.
  //. ```javascript
  //. > S.chain(x => [x, x], [1, 2, 3])
  //. [1, 1, 2, 2, 3, 3]
  //.
  //. > S.chain(n => s => s.slice(0, n), s => Math.ceil(s.length / 2))('slice')
  //. 'sli'
  //.
  //. > S.chain(S.parseInt(10), S.Just('123'))
  //. Just(123)
  //.
  //. > S.chain(S.parseInt(10), S.Just('XXX'))
  //. Nothing
  //. ```
  S.chain = def('chain', {m: [Z.Chain]}, [Fn(a, m(b)), m(a), m(b)], Z.chain);

  //# join :: Chain m => m (m a) -> m a
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.join`][].
  //. Removes one level of nesting from a nested monadic structure.
  //.
  //. ```javascript
  //. > S.join([[1], [2], [3]])
  //. [1, 2, 3]
  //.
  //. > S.join([[[1, 2, 3]]])
  //. [[1, 2, 3]]
  //.
  //. > S.join(S.Just(S.Just(1)))
  //. S.Just(1)
  //. ```
  //.
  //. Replacing `Chain m => m` with `Function x` produces the W combinator
  //. from combinatory logic:
  //.
  //.     Chain m => m (m a) -> m a
  //.     Function x (Function x a) -> Function x a
  //.     (x -> x -> a) -> (x -> a)
  //.
  //. ```javascript
  //. > S.join(S.concat)('abc')
  //. 'abcabc'
  //. ```
  S.join = def('join', {m: [Z.Chain]}, [m(m(a)), m(a)], Z.join);

  //# chainRec :: ChainRec m => TypeRep m -> (a -> m (Either a b)) -> a -> m b
  //.
  //. Performs a [`chain`](#chain)-like computation with constant stack usage.
  //. Similar to [`Z.chainRec`][], but curried and more convenient due to the
  //. use of the Either type to indicate completion (via a Right).
  //.
  //. ```javascript
  //. > S.chainRec(Array,
  //. .            s => s.length === 2 ? S.map(S.Right, [s + '!', s + '?'])
  //. .                                : S.map(S.Left, [s + 'o', s + 'n']),
  //. .            '')
  //. ['oo!', 'oo?', 'on!', 'on?', 'no!', 'no?', 'nn!', 'nn?']
  //. ```
  function chainRec(typeRep, f, x) {
    function step(next, done, x) {
      return Z.map(function(e) { return either(next, done, e); }, f(x));
    }
    return Z.chainRec(typeRep, step, x);
  }
  S.chainRec =
  def('chainRec',
      {m: [Z.ChainRec]},
      [TypeRep($.TypeVariable('m')), Fn(a, m($Either(a, b))), a, m(b)],
      chainRec);

  //# extend :: Extend w => (w a -> b) -> w a -> w b
  //.
  //. Curried version of [`Z.extend`][].
  //.
  //. ```javascript
  //. > S.extend(S.joinWith(''), ['x', 'y', 'z'])
  //. ['xyz', 'yz', 'z']
  //. ```
  S.extend =
  def('extend', {w: [Z.Extend]}, [Fn(w(a), b), w(a), w(b)], Z.extend);

  //# extract :: Comonad w => w a -> a
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.extract`][].
  S.extract =
  def('extract', {w: [Z.Comonad]}, [w(a), a], Z.extract);

  //# contramap :: Contravariant f => (b -> a) -> f a -> f b
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.contramap`][].
  //.
  //. ```javascript
  //. > S.contramap(s => s.length, Math.sqrt)('Sanctuary')
  //. 3
  //. ```
  S.contramap =
  def('contramap',
      {f: [Z.Contravariant]},
      [Fn(b, a), f(a), f(b)],
      Z.contramap);

  //# filter :: (Applicative f, Foldable f, Monoid (f a)) => (a -> Boolean) -> f a -> f a
  //.
  //. Curried version of [`Z.filter`][]. Filters its second argument in
  //. accordance with the given predicate.
  //.
  //. See also [`filterM`](#filterM).
  //.
  //. ```javascript
  //. > S.filter(S.odd, [1, 2, 3, 4, 5])
  //. [1, 3, 5]
  //. ```
  S.filter =
  def('filter',
      {f: [Z.Applicative, Z.Foldable, Z.Monoid]},
      [$.Predicate(a), f(a), f(a)],
      Z.filter);

  //# filterM :: (Alternative m, Monad m) => (a -> Boolean) -> m a -> m a
  //.
  //. Curried version of [`Z.filterM`][]. Filters its second argument in
  //. accordance with the given predicate.
  //.
  //. See also [`filter`](#filter).
  //.
  //. ```javascript
  //. > S.filterM(S.odd, [1, 2, 3, 4, 5])
  //. [1, 3, 5]
  //.
  //. > S.filterM(S.odd, S.Just(9))
  //. Just(9)
  //.
  //. > S.filterM(S.odd, S.Just(4))
  //. Nothing
  //. ```
  S.filterM =
  def('filterM',
      {m: [Z.Alternative, Z.Monad]},
      [$.Predicate(a), m(a), m(a)],
      Z.filterM);

  //# takeWhile :: (Foldable f, Alternative f) => (a -> Boolean) -> f a -> f a
  //.
  //. Discards the first inner value which does not satisfy the predicate, and
  //. all subsequent inner values.
  //.
  //. ```javascript
  //. > S.takeWhile(S.odd, [3, 3, 3, 7, 6, 3, 5, 4])
  //. [3, 3, 3, 7]
  //.
  //. > S.takeWhile(S.even, [3, 3, 3, 7, 6, 3, 5, 4])
  //. []
  //. ```
  S.takeWhile =
  def('takeWhile',
      {f: [Z.Foldable, Z.Alternative]},
      [$.Predicate(a), f(a), f(a)],
      Z.takeWhile);

  //# dropWhile :: (Foldable f, Alternative f) => (a -> Boolean) -> f a -> f a
  //.
  //. Retains the first inner value which does not satisfy the predicate, and
  //. all subsequent inner values.
  //.
  //. ```javascript
  //. > S.dropWhile(S.odd, [3, 3, 3, 7, 6, 3, 5, 4])
  //. [6, 3, 5, 4]
  //.
  //. > S.dropWhile(S.even, [3, 3, 3, 7, 6, 3, 5, 4])
  //. [3, 3, 3, 7, 6, 3, 5, 4]
  //. ```
  S.dropWhile =
  def('dropWhile',
      {f: [Z.Foldable, Z.Alternative]},
      [$.Predicate(a), f(a), f(a)],
      Z.dropWhile);

  //. ### Combinator

  //# I :: a -> a
  //.
  //. The I combinator. Returns its argument. Equivalent to Haskell's `id`
  //. function.
  //.
  //. ```javascript
  //. > S.I('foo')
  //. 'foo'
  //. ```
  function I(x) {
    return x;
  }
  S.I = def('I', {}, [a, a], I);

  //# K :: a -> b -> a
  //.
  //. The K combinator. Takes two values and returns the first. Equivalent to
  //. Haskell's `const` function.
  //.
  //. ```javascript
  //. > S.K('foo', 'bar')
  //. 'foo'
  //.
  //. > S.map(S.K(42), S.range(0, 5))
  //. [42, 42, 42, 42, 42]
  //. ```
  function K(x, y) {
    return x;
  }
  S.K = def('K', {}, [a, b, a], K);

  //# A :: (a -> b) -> a -> b
  //.
  //. The A combinator. Takes a function and a value, and returns the result
  //. of applying the function to the value. Equivalent to Haskell's `($)`
  //. function.
  //.
  //. ```javascript
  //. > S.A(S.add(1), 42)
  //. 43
  //.
  //. > S.map(S.A(S.__, 100), [S.add(1), Math.sqrt])
  //. [101, 10]
  //. ```
  function A(f, x) {
    return f(x);
  }
  S.A = def('A', {}, [Fn(a, b), a, b], A);

  //# T :: a -> (a -> b) -> b
  //.
  //. The T ([thrush][]) combinator. Takes a value and a function, and returns
  //. the result of applying the function to the value. Equivalent to Haskell's
  //. `(&)` function.
  //.
  //. ```javascript
  //. > S.T(42, S.add(1))
  //. 43
  //.
  //. > S.map(S.T(100), [S.add(1), Math.sqrt])
  //. [101, 10]
  //. ```
  function T(x, f) {
    return f(x);
  }
  S.T = def('T', {}, [a, Fn(a, b), b], T);

  //. ### Function

  //# curry2 :: ((a, b) -> c) -> a -> b -> c
  //.
  //. Curries the given binary function.
  //.
  //. ```javascript
  //. > S.map(S.curry2(Math.pow)(10), [1, 2, 3])
  //. [10, 100, 1000]
  //.
  //. > S.map(S.curry2(Math.pow, 10), [1, 2, 3])
  //. [10, 100, 1000]
  //. ```
  function curry2(f, x, y) {
    return f(x, y);
  }
  S.curry2 =
  def('curry2',
      {},
      [$.Function([a, b, c]), a, b, c],
      curry2);

  //# curry3 :: ((a, b, c) -> d) -> a -> b -> c -> d
  //.
  //. Curries the given ternary function.
  //.
  //. ```javascript
  //. > global.replaceString = S.curry3((what, replacement, string) =>
  //. .   string.replace(what, replacement)
  //. . )
  //. replaceString
  //.
  //. > replaceString('banana')('orange')('banana icecream')
  //. 'orange icecream'
  //.
  //. > replaceString('banana', 'orange', 'banana icecream')
  //. 'orange icecream'
  //. ```
  function curry3(f, x, y, z) {
    return f(x, y, z);
  }
  S.curry3 =
  def('curry3',
      {},
      [$.Function([a, b, c, d]), a, b, c, d],
      curry3);

  //# curry4 :: ((a, b, c, d) -> e) -> a -> b -> c -> d -> e
  //.
  //. Curries the given quaternary function.
  //.
  //. ```javascript
  //. > global.createRect = S.curry4((x, y, width, height) =>
  //. .   ({x, y, width, height})
  //. . )
  //. createRect
  //.
  //. > createRect(0)(0)(10)(10)
  //. {x: 0, y: 0, width: 10, height: 10}
  //.
  //. > createRect(0, 0, 10, 10)
  //. {x: 0, y: 0, width: 10, height: 10}
  //. ```
  function curry4(f, w, x, y, z) {
    return f(w, x, y, z);
  }
  S.curry4 =
  def('curry4',
      {},
      [$.Function([a, b, c, d, e]), a, b, c, d, e],
      curry4);

  //# curry5 :: ((a, b, c, d, e) -> f) -> a -> b -> c -> d -> e -> f
  //.
  //. Curries the given quinary function.
  //.
  //. ```javascript
  //. > global.toUrl = S.curry5((protocol, creds, hostname, port, pathname) =>
  //. .   protocol + '//' +
  //. .   S.maybe('', _ => _.username + ':' + _.password + '@', creds) +
  //. .   hostname +
  //. .   S.maybe('', S.concat(':'), port) +
  //. .   pathname
  //. . )
  //. toUrl
  //.
  //. > toUrl('https:')(S.Nothing)('example.com')(S.Just('443'))('/foo/bar')
  //. 'https://example.com:443/foo/bar'
  //.
  //. > toUrl('https:', S.Nothing, 'example.com', S.Just('443'), '/foo/bar')
  //. 'https://example.com:443/foo/bar'
  //. ```
  function curry5(f, v, w, x, y, z) {
    return f(v, w, x, y, z);
  }
  S.curry5 =
  def('curry5',
      {},
      [$.Function([a, b, c, d, e, r]), a, b, c, d, e, r],
      curry5);

  //# flip :: (a -> b -> c) -> b -> a -> c
  //.
  //. Takes a curried binary function and two values, and returns the
  //. result of applying the function to the values in reverse order.
  //.
  //. This is the C combinator from combinatory logic.
  //.
  //. ```javascript
  //. > S.flip(S.concat, 'foo', 'bar')
  //. 'barfoo'
  //. ```
  function flip(f, x, y) {
    return f(y)(x);
  }
  S.flip = def('flip', {}, [Fn(a, Fn(b, c)), b, a, c], flip);

  //. ### Composition

  //# compose :: Semigroupoid s => s b c -> s a b -> s a c
  //.
  //. Curried version of [`Z.compose`][].
  //.
  //. When specialized to Function, `compose` composes two unary functions,
  //. from right to left (this is the B combinator from combinatory logic).
  //.
  //. The generalized type signature indicates that `compose` is compatible
  //. with any [Semigroupoid][].
  //.
  //. See also [`pipe`](#pipe).
  //.
  //. ```javascript
  //. > S.compose(Math.sqrt, S.add(1))(99)
  //. 10
  //. ```
  S.compose =
  def('compose',
      {s: [Z.Semigroupoid]},
      [s(b, c), s(a, b), s(a, c)],
      Z.compose);

  //# pipe :: [(a -> b), (b -> c), ..., (m -> n)] -> a -> n
  //.
  //. Takes an array of functions assumed to be unary and a value of any type,
  //. and returns the result of applying the sequence of transformations to
  //. the initial value.
  //.
  //. In general terms, `pipe` performs left-to-right composition of an array
  //. of functions. `pipe([f, g, h], x)` is equivalent to `h(g(f(x)))`.
  //.
  //. ```javascript
  //. > S.pipe([S.add(1), Math.sqrt, S.sub(1)], 99)
  //. 9
  //. ```
  function pipe(fs, x) {
    return Z.reduce(function(x, f) { return f(x); }, x, fs);
  }
  S.pipe = def('pipe', {}, [$.Array($.AnyFunction), a, b], pipe);

  //# on :: (b -> b -> c) -> (a -> b) -> a -> a -> c
  //.
  //. Takes a binary function `f`, a unary function `g`, and two
  //. values `x` and `y`. Returns `f(g(x))(g(y))`.
  //.
  //. This is the P combinator from combinatory logic.
  //.
  //. ```javascript
  //. > S.on(S.concat, S.reverse, [1, 2, 3], [4, 5, 6])
  //. [3, 2, 1, 6, 5, 4]
  //. ```
  function on(f, g, x, y) {
    return f(g(x))(g(y));
  }
  S.on = def('on', {}, [Fn(b, Fn(b, c)), Fn(a, b), a, a, c], on);

  //. ### Maybe type
  //.
  //. The Maybe type represents optional values: a value of type `Maybe a` is
  //. either a Just whose value is of type `a` or Nothing (with no value).
  //.
  //. The Maybe type satisfies the [Ord][], [Monoid][], [Monad][],
  //. [Alternative][], [Traversable][], and [Extend][] specifications.

  //# MaybeType :: Type -> Type
  //.
  //. A [`UnaryType`][UnaryType] for use with [sanctuary-def][].
  S.MaybeType = $Maybe;

  //# Maybe :: TypeRep Maybe
  //.
  //. The [type representative](#type-representatives) for the Maybe type.
  var Maybe = S.Maybe = {prototype: _Maybe.prototype};

  Maybe.prototype.constructor = Maybe;

  function _Maybe(tag, value) {
    this.isNothing = tag === 'Nothing';
    this.isJust = tag === 'Just';
    if (this.isJust) this.value = value;

    //  Add "fantasy-land/concat" method conditionally so that Just('abc')
    //  satisfies the requirements of Semigroup but Just(123) does not.
    if (this.isNothing || Z.Semigroup.test(this.value)) {
      this['fantasy-land/concat'] = Maybe$prototype$concat;
    }

    if (this.isNothing || Z.Setoid.test(this.value)) {
      this['fantasy-land/equals'] = Maybe$prototype$equals;
    }

    if (this.isNothing || Z.Ord.test(this.value)) {
      this['fantasy-land/lte'] = Maybe$prototype$lte;
    }
  }

  //# Nothing :: Maybe a
  //.
  //. Nothing.
  //.
  //. ```javascript
  //. > S.Nothing
  //. Nothing
  //. ```
  var Nothing = S.Nothing = new _Maybe('Nothing');

  //# Just :: a -> Maybe a
  //.
  //. Takes a value of any type and returns a Just with the given value.
  //.
  //. ```javascript
  //. > S.Just(42)
  //. Just(42)
  //. ```
  function Just(x) {
    return new _Maybe('Just', x);
  }
  S.Just = def('Just', {}, [a, $Maybe(a)], Just);

  //# Maybe.@@type :: String
  //.
  //. Maybe type identifier, `'sanctuary/Maybe'`.
  Maybe['@@type'] = maybeTypeIdent;

  //# Maybe.fantasy-land/empty :: () -> Maybe a
  //.
  //. Returns Nothing.
  //.
  //. It is idiomatic to use [`empty`](#empty) rather than use this function
  //. directly.
  //.
  //. ```javascript
  //. > S.empty(S.Maybe)
  //. Nothing
  //. ```
  Maybe['fantasy-land/empty'] = function() { return Nothing; };

  //# Maybe.fantasy-land/of :: a -> Maybe a
  //.
  //. Takes a value of any type and returns a Just with the given value.
  //.
  //. It is idiomatic to use [`of`](#of) rather than use this function
  //. directly.
  //.
  //. ```javascript
  //. > S.of(S.Maybe, 42)
  //. Just(42)
  //. ```
  Maybe['fantasy-land/of'] = Just;

  //# Maybe.fantasy-land/zero :: () -> Maybe a
  //.
  //. Returns Nothing.
  //.
  //. It is idiomatic to use [`zero`](#zero) rather than use this function
  //. directly.
  //.
  //. ```javascript
  //. > S.zero(S.Maybe)
  //. Nothing
  //. ```
  Maybe['fantasy-land/zero'] = function() { return Nothing; };

  //# Maybe#isNothing :: Maybe a ~> Boolean
  //.
  //. `true` if `this` is Nothing; `false` if `this` is a Just.
  //.
  //. ```javascript
  //. > S.Nothing.isNothing
  //. true
  //.
  //. > S.Just(42).isNothing
  //. false
  //. ```

  //# Maybe#isJust :: Maybe a ~> Boolean
  //.
  //. `true` if `this` is a Just; `false` if `this` is Nothing.
  //.
  //. ```javascript
  //. > S.Just(42).isJust
  //. true
  //.
  //. > S.Nothing.isJust
  //. false
  //. ```

  //# Maybe#toString :: Maybe a ~> () -> String
  //.
  //. Returns the string representation of the Maybe.
  //.
  //. ```javascript
  //. > S.toString(S.Nothing)
  //. 'Nothing'
  //.
  //. > S.toString(S.Just([1, 2, 3]))
  //. 'Just([1, 2, 3])'
  //. ```
  Maybe.prototype.toString = function() {
    return this.isJust ? 'Just(' + Z.toString(this.value) + ')' : 'Nothing';
  };

  //# Maybe#inspect :: Maybe a ~> () -> String
  //.
  //. Returns the string representation of the Maybe. This method is used by
  //. `util.inspect` and the REPL to format a Maybe for display.
  //.
  //. See also [`Maybe#toString`][].
  //.
  //. ```javascript
  //. > S.Nothing.inspect()
  //. 'Nothing'
  //.
  //. > S.Just([1, 2, 3]).inspect()
  //. 'Just([1, 2, 3])'
  //. ```
  Maybe.prototype.inspect = function() { return this.toString(); };

  //# Maybe#fantasy-land/equals :: Setoid a => Maybe a ~> Maybe a -> Boolean
  //.
  //. Takes a value `m` of the same type and returns `true` if:
  //.
  //.   - `this` and `m` are both Nothing; or
  //.
  //.   - `this` and `m` are both Justs, and their values are equal according
  //.     to [`Z.equals`][].
  //.
  //. It is idiomatic to use [`equals`](#equals) rather than use this method
  //. directly.
  //.
  //. ```javascript
  //. > S.equals(S.Nothing, S.Nothing)
  //. true
  //.
  //. > S.equals(S.Just([1, 2, 3]), S.Just([1, 2, 3]))
  //. true
  //.
  //. > S.equals(S.Just([1, 2, 3]), S.Just([3, 2, 1]))
  //. false
  //.
  //. > S.equals(S.Just([1, 2, 3]), S.Nothing)
  //. false
  //. ```
  function Maybe$prototype$equals(other) {
    return this.isNothing ? other.isNothing
                          : other.isJust && Z.equals(this.value, other.value);
  }

  //# Maybe#fantasy-land/lte :: Ord a => Maybe a ~> Maybe a -> Boolean
  //.
  //. Takes a value `m` of the same type and returns `true` if:
  //.
  //.   - `this` is Nothing; or
  //.
  //.   - `this` and `m` are both Justs and the value of `this` is less than
  //.     or equal to the value of `m` according to [`Z.lte`][].
  //.
  //. It is idiomatic to use [`lte`](#lte) or [`lte_`](#lte_) rather than use
  //. this method directly.
  //.
  //. ```javascript
  //. > S.lte_(S.Nothing, S.Nothing)
  //. true
  //.
  //. > S.lte_(S.Nothing, S.Just(0))
  //. true
  //.
  //. > S.lte_(S.Just(0), S.Nothing)
  //. false
  //.
  //. > S.lte_(S.Just(0), S.Just(1))
  //. true
  //.
  //. > S.lte_(S.Just(1), S.Just(0))
  //. false
  //. ```
  function Maybe$prototype$lte(other) {
    return this.isNothing || other.isJust && Z.lte(this.value, other.value);
  }

  //# Maybe#fantasy-land/concat :: Semigroup a => Maybe a ~> Maybe a -> Maybe a
  //.
  //. Returns the result of concatenating two Maybe values of the same type.
  //. `a` must have a [Semigroup][].
  //.
  //. If `this` is Nothing and the argument is Nothing, this method returns
  //. Nothing.
  //.
  //. If `this` is a Just and the argument is a Just, this method returns a
  //. Just whose value is the result of concatenating this Just's value and
  //. the given Just's value.
  //.
  //. Otherwise, this method returns the Just.
  //.
  //. It is idiomatic to use [`concat`](#concat) rather than use this method
  //. directly.
  //.
  //. ```javascript
  //. > S.concat(S.Nothing, S.Nothing)
  //. Nothing
  //.
  //. > S.concat(S.Just([1, 2, 3]), S.Just([4, 5, 6]))
  //. Just([1, 2, 3, 4, 5, 6])
  //.
  //. > S.concat(S.Nothing, S.Just([1, 2, 3]))
  //. Just([1, 2, 3])
  //.
  //. > S.concat(S.Just([1, 2, 3]), S.Nothing)
  //. Just([1, 2, 3])
  //. ```
  function Maybe$prototype$concat(other) {
    return this.isNothing ?
      other :
      other.isNothing ? this : Just(Z.concat(this.value, other.value));
  }

  //# Maybe#fantasy-land/map :: Maybe a ~> (a -> b) -> Maybe b
  //.
  //. Takes a function and returns `this` if `this` is Nothing; otherwise
  //. it returns a Just whose value is the result of applying the function
  //. to this Just's value.
  //.
  //. It is idiomatic to use [`map`](#map) rather than use this method
  //. directly.
  //.
  //. ```javascript
  //. > S.map(Math.sqrt, S.Nothing)
  //. Nothing
  //.
  //. > S.map(Math.sqrt, S.Just(9))
  //. Just(3)
  //. ```
  Maybe.prototype['fantasy-land/map'] = function(f) {
    return this.isJust ? Just(f(this.value)) : this;
  };

  //# Maybe#fantasy-land/ap :: Maybe a ~> Maybe (a -> b) -> Maybe b
  //.
  //. Takes a Maybe and returns Nothing unless `this` is a Just *and* the
  //. argument is a Just, in which case it returns a Just whose value is
  //. the result of applying the given Just's value to this Just's value.
  //.
  //. It is idiomatic to use [`ap`](#ap) rather than use this method directly.
  //.
  //. ```javascript
  //. > S.ap(S.Nothing, S.Nothing)
  //. Nothing
  //.
  //. > S.ap(S.Nothing, S.Just(9))
  //. Nothing
  //.
  //. > S.ap(S.Just(Math.sqrt), S.Nothing)
  //. Nothing
  //.
  //. > S.ap(S.Just(Math.sqrt), S.Just(9))
  //. Just(3)
  //. ```
  Maybe.prototype['fantasy-land/ap'] = function(other) {
    return other.isJust ? Z.map(other.value, this) : other;
  };

  //# Maybe#fantasy-land/chain :: Maybe a ~> (a -> Maybe b) -> Maybe b
  //.
  //. Takes a function and returns `this` if `this` is Nothing; otherwise
  //. it returns the result of applying the function to this Just's value.
  //.
  //. It is idiomatic to use [`chain`](#chain) rather than use this method
  //. directly.
  //.
  //. ```javascript
  //. > S.chain(S.parseFloat, S.Nothing)
  //. Nothing
  //.
  //. > S.chain(S.parseFloat, S.Just('xxx'))
  //. Nothing
  //.
  //. > S.chain(S.parseFloat, S.Just('12.34'))
  //. Just(12.34)
  //. ```
  Maybe.prototype['fantasy-land/chain'] = function(f) {
    return this.isJust ? f(this.value) : this;
  };

  //# Maybe#fantasy-land/alt :: Maybe a ~> Maybe a -> Maybe a
  //.
  //. Chooses between `this` and the other Maybe provided as an argument.
  //. Returns `this` if `this` is a Just; the other Maybe otherwise.
  //.
  //. It is idiomatic to use [`alt`](#alt) rather than use this method
  //. directly.
  //.
  //. ```javascript
  //. > S.alt(S.Nothing, S.Nothing)
  //. Nothing
  //.
  //. > S.alt(S.Nothing, S.Just(1))
  //. Just(1)
  //.
  //. > S.alt(S.Just(2), S.Nothing)
  //. Just(2)
  //.
  //. > S.alt(S.Just(3), S.Just(4))
  //. Just(3)
  //. ```
  Maybe.prototype['fantasy-land/alt'] = function(other) {
    return this.isJust ? this : other;
  };

  //# Maybe#fantasy-land/reduce :: Maybe a ~> ((b, a) -> b, b) -> b
  //.
  //. Takes a function and an initial value of any type, and returns:
  //.
  //.   - the initial value if `this` is Nothing; otherwise
  //.
  //.   - the result of applying the function to the initial value and this
  //.     Just's value.
  //.
  //. It is idiomatic to use [`reduce`](#reduce) rather than use this method
  //. directly.
  //.
  //. ```javascript
  //. > S.reduce(S.curry2(Math.pow), 10, S.Nothing)
  //. 10
  //.
  //. > S.reduce(S.curry2(Math.pow), 10, S.Just(3))
  //. 1000
  //. ```
  Maybe.prototype['fantasy-land/reduce'] = function(f, x) {
    return this.isJust ? f(x, this.value) : x;
  };

  //# Maybe#fantasy-land/traverse :: Applicative f => Maybe a ~> (TypeRep f, a -> f b) -> f (Maybe b)
  //.
  //. Takes the type representative of some [Applicative][] and a function
  //. which returns a value of that Applicative, and returns:
  //.
  //.   - the result of applying the type representative's [`of`][] function to
  //.     `this` if `this` is Nothing; otherwise
  //.
  //.   - the result of mapping [`Just`](#Just) over the result of applying the
  //.     first function to this Just's value.
  //.
  //. It is idiomatic to use [`traverse`](#traverse) rather than use this
  //. method directly.
  //.
  //. ```javascript
  //. > S.traverse(Array, S.words, S.Nothing)
  //. [Nothing]
  //.
  //. > S.traverse(Array, S.words, S.Just('foo bar baz'))
  //. [Just('foo'), Just('bar'), Just('baz')]
  //. ```
  Maybe.prototype['fantasy-land/traverse'] = function(typeRep, f) {
    return this.isJust ? Z.map(Just, f(this.value)) : Z.of(typeRep, this);
  };

  //# Maybe#fantasy-land/extend :: Maybe a ~> (Maybe a -> b) -> Maybe b
  //.
  //. Takes a function and returns `this` if `this` is Nothing; otherwise
  //. it returns a Just whose value is the result of applying the function
  //. to `this`.
  //.
  //. It is idiomatic to use [`extend`](#extend) rather than use this method
  //. directly.
  //.
  //. ```javascript
  //. > S.extend(x => x.value + 1, S.Nothing)
  //. Nothing
  //.
  //. > S.extend(x => x.value + 1, S.Just(42))
  //. Just(43)
  //. ```
  Maybe.prototype['fantasy-land/extend'] = function(f) {
    return this.isJust ? Just(f(this)) : this;
  };

  //# isNothing :: Maybe a -> Boolean
  //.
  //. Returns `true` if the given Maybe is Nothing; `false` if it is a Just.
  //.
  //. ```javascript
  //. > S.isNothing(S.Nothing)
  //. true
  //.
  //. > S.isNothing(S.Just(42))
  //. false
  //. ```
  function isNothing(maybe) {
    return maybe.isNothing;
  }
  S.isNothing = def('isNothing', {}, [$Maybe(a), $.Boolean], isNothing);

  //# isJust :: Maybe a -> Boolean
  //.
  //. Returns `true` if the given Maybe is a Just; `false` if it is Nothing.
  //.
  //. ```javascript
  //. > S.isJust(S.Just(42))
  //. true
  //.
  //. > S.isJust(S.Nothing)
  //. false
  //. ```
  function isJust(maybe) {
    return maybe.isJust;
  }
  S.isJust = def('isJust', {}, [$Maybe(a), $.Boolean], isJust);

  //# fromMaybe :: a -> Maybe a -> a
  //.
  //. Takes a default value and a Maybe, and returns the Maybe's value
  //. if the Maybe is a Just; the default value otherwise.
  //.
  //. See also [`fromMaybe_`](#fromMaybe_) and
  //. [`maybeToNullable`](#maybeToNullable).
  //.
  //. ```javascript
  //. > S.fromMaybe(0, S.Just(42))
  //. 42
  //.
  //. > S.fromMaybe(0, S.Nothing)
  //. 0
  //. ```
  function fromMaybe(x, maybe) {
    return maybe.isJust ? maybe.value : x;
  }
  S.fromMaybe = def('fromMaybe', {}, [a, $Maybe(a), a], fromMaybe);

  //# fromMaybe_ :: (() -> a) -> Maybe a -> a
  //.
  //. Variant of [`fromMaybe`](#fromMaybe) which takes a thunk so the default
  //. value is only computed if required.
  //.
  //. ```javascript
  //. > function fib(n) { return n <= 1 ? n : fib(n - 2) + fib(n - 1); }
  //.
  //. > S.fromMaybe_(() => fib(30), S.Just(1000000))
  //. 1000000
  //.
  //. > S.fromMaybe_(() => fib(30), S.Nothing)
  //. 832040
  //. ```
  function fromMaybe_(thunk, maybe) {
    return maybe.isJust ? maybe.value : thunk();
  }
  S.fromMaybe_ = def('fromMaybe_', {}, [$.Thunk(a), $Maybe(a), a], fromMaybe_);

  //# maybeToNullable :: Maybe a -> Nullable a
  //.
  //. Returns the given Maybe's value if the Maybe is a Just; `null` otherwise.
  //. [Nullable][] is defined in [sanctuary-def][].
  //.
  //. See also [`fromMaybe`](#fromMaybe).
  //.
  //. ```javascript
  //. > S.maybeToNullable(S.Just(42))
  //. 42
  //.
  //. > S.maybeToNullable(S.Nothing)
  //. null
  //. ```
  function maybeToNullable(maybe) {
    return maybe.isJust ? maybe.value : null;
  }
  S.maybeToNullable =
  def('maybeToNullable', {}, [$Maybe(a), $.Nullable(a)], maybeToNullable);

  //# toMaybe :: a? -> Maybe a
  //.
  //. Takes a value and returns Nothing if the value is `null` or `undefined`;
  //. Just the value otherwise.
  //.
  //. ```javascript
  //. > S.toMaybe(null)
  //. Nothing
  //.
  //. > S.toMaybe(42)
  //. Just(42)
  //. ```
  function toMaybe(x) {
    return x == null ? Nothing : Just(x);
  }
  S.toMaybe = def('toMaybe', {}, [a, $Maybe(a)], toMaybe);

  //# maybe :: b -> (a -> b) -> Maybe a -> b
  //.
  //. Takes a value of any type, a function, and a Maybe. If the Maybe is
  //. a Just, the return value is the result of applying the function to
  //. the Just's value. Otherwise, the first argument is returned.
  //.
  //. See also [`maybe_`](#maybe_).
  //.
  //. ```javascript
  //. > S.maybe(0, S.prop('length'), S.Just('refuge'))
  //. 6
  //.
  //. > S.maybe(0, S.prop('length'), S.Nothing)
  //. 0
  //. ```
  function maybe(x, f, maybe) {
    return fromMaybe(x, Z.map(f, maybe));
  }
  S.maybe = def('maybe', {}, [b, Fn(a, b), $Maybe(a), b], maybe);

  //# maybe_ :: (() -> b) -> (a -> b) -> Maybe a -> b
  //.
  //. Variant of [`maybe`](#maybe) which takes a thunk so the default value
  //. is only computed if required.
  //.
  //. ```javascript
  //. > function fib(n) { return n <= 1 ? n : fib(n - 2) + fib(n - 1); }
  //.
  //. > S.maybe_(() => fib(30), Math.sqrt, S.Just(1000000))
  //. 1000
  //.
  //. > S.maybe_(() => fib(30), Math.sqrt, S.Nothing)
  //. 832040
  //. ```
  function maybe_(thunk, f, maybe) {
    return maybe.isJust ? f(maybe.value) : thunk();
  }
  S.maybe_ = def('maybe_', {}, [$.Thunk(b), Fn(a, b), $Maybe(a), b], maybe_);

  //# justs :: Array (Maybe a) -> Array a
  //.
  //. Takes an array of Maybes and returns an array containing each Just's
  //. value. Equivalent to Haskell's `catMaybes` function.
  //.
  //. See also [`lefts`](#lefts) and [`rights`](#rights).
  //.
  //. ```javascript
  //. > S.justs([S.Just('foo'), S.Nothing, S.Just('baz')])
  //. ['foo', 'baz']
  //. ```
  function justs(maybes) {
    return Z.reduce(function(xs, maybe) {
      if (maybe.isJust) xs.push(maybe.value);
      return xs;
    }, [], maybes);
  }
  S.justs = def('justs', {}, [$.Array($Maybe(a)), $.Array(a)], justs);

  //# mapMaybe :: (a -> Maybe b) -> Array a -> Array b
  //.
  //. Takes a function and an array, applies the function to each element of
  //. the array, and returns an array of "successful" results. If the result of
  //. applying the function to an element of the array is Nothing, the result
  //. is discarded; if the result is a Just, the Just's value is included in
  //. the output array.
  //.
  //. In general terms, `mapMaybe` filters an array while mapping over it.
  //.
  //. ```javascript
  //. > S.mapMaybe(S.head, [[], [1, 2, 3], [], [4, 5, 6], []])
  //. [1, 4]
  //. ```
  function mapMaybe(f, xs) {
    return justs(Z.map(f, xs));
  }
  S.mapMaybe =
  def('mapMaybe', {}, [Fn(a, $Maybe(b)), $.Array(a), $.Array(b)], mapMaybe);

  //# encase :: (a -> b) -> a -> Maybe b
  //.
  //. Takes a unary function `f` which may throw and a value `x` of any type,
  //. and applies `f` to `x` inside a `try` block. If an exception is caught,
  //. the return value is Nothing; otherwise the return value is Just the
  //. result of applying `f` to `x`.
  //.
  //. See also [`encaseEither`](#encaseEither).
  //.
  //. ```javascript
  //. > S.encase(eval, '1 + 1')
  //. Just(2)
  //.
  //. > S.encase(eval, '1 +')
  //. Nothing
  //. ```
  function encase(f, x) {
    try {
      return Just(f(x));
    } catch (err) {
      return Nothing;
    }
  }
  S.encase = def('encase', {}, [Fn(a, b), a, $Maybe(b)], encase);

  //# encase2 :: (a -> b -> c) -> a -> b -> Maybe c
  //.
  //. Binary version of [`encase`](#encase).
  function encase2(f, x, y) {
    try {
      return Just(f(x)(y));
    } catch (err) {
      return Nothing;
    }
  }
  S.encase2 = def('encase2', {}, [Fn(a, Fn(b, c)), a, b, $Maybe(c)], encase2);

  //# encase3 :: (a -> b -> c -> d) -> a -> b -> c -> Maybe d
  //.
  //. Ternary version of [`encase`](#encase).
  function encase3(f, x, y, z) {
    try {
      return Just(f(x)(y)(z));
    } catch (err) {
      return Nothing;
    }
  }
  S.encase3 =
  def('encase3', {}, [Fn(a, Fn(b, Fn(c, d))), a, b, c, $Maybe(d)], encase3);

  //# maybeToEither :: a -> Maybe b -> Either a b
  //.
  //. Converts a Maybe to an Either. Nothing becomes a Left (containing the
  //. first argument); a Just becomes a Right.
  //.
  //. See also [`eitherToMaybe`](#eitherToMaybe).
  //.
  //. ```javascript
  //. > S.maybeToEither('Expecting an integer', S.parseInt(10, 'xyz'))
  //. Left('Expecting an integer')
  //.
  //. > S.maybeToEither('Expecting an integer', S.parseInt(10, '42'))
  //. Right(42)
  //. ```
  function maybeToEither(x, maybe) {
    return maybe.isNothing ? Left(x) : Right(maybe.value);
  }
  S.maybeToEither =
  def('maybeToEither', {}, [a, $Maybe(b), $Either(a, b)], maybeToEither);

  //. ### Either type
  //.
  //. The Either type represents values with two possibilities: a value of type
  //. `Either a b` is either a Left whose value is of type `a` or a Right whose
  //. value is of type `b`.
  //.
  //. The Either type satisfies the [Ord][], [Semigroup][], [Monad][],
  //. [Alt][], [Traversable][], [Extend][], and [Bifunctor][] specifications.

  //# EitherType :: Type -> Type -> Type
  //.
  //. A [`BinaryType`][BinaryType] for use with [sanctuary-def][].
  S.EitherType = $Either;

  //# Either :: TypeRep Either
  //.
  //. The [type representative](#type-representatives) for the Either type.
  var Either = S.Either = {prototype: _Either.prototype};

  Either.prototype.constructor = Either;

  function _Either(tag, value) {
    this.isLeft = tag === 'Left';
    this.isRight = tag === 'Right';
    this.value = value;

    //  Add "fantasy-land/concat" method conditionally so that Left('abc')
    //  and Right('abc') satisfy the requirements of Semigroup but Left(123)
    //  and Right(123) do not.
    if (Z.Semigroup.test(this.value)) {
      this['fantasy-land/concat'] = Either$prototype$concat;
    }

    if (Z.Setoid.test(this.value)) {
      this['fantasy-land/equals'] = Either$prototype$equals;
    }

    if (Z.Ord.test(this.value)) {
      this['fantasy-land/lte'] = Either$prototype$lte;
    }
  }

  //# Left :: a -> Either a b
  //.
  //. Takes a value of any type and returns a Left with the given value.
  //.
  //. ```javascript
  //. > S.Left('Cannot divide by zero')
  //. Left('Cannot divide by zero')
  //. ```
  function Left(x) {
    return new _Either('Left', x);
  }
  S.Left = def('Left', {}, [a, $Either(a, b)], Left);

  //# Right :: b -> Either a b
  //.
  //. Takes a value of any type and returns a Right with the given value.
  //.
  //. ```javascript
  //. > S.Right(42)
  //. Right(42)
  //. ```
  function Right(x) {
    return new _Either('Right', x);
  }
  S.Right = def('Right', {}, [b, $Either(a, b)], Right);

  //# Either.@@type :: String
  //.
  //. Either type identifier, `'sanctuary/Either'`.
  Either['@@type'] = eitherTypeIdent;

  //# Either.fantasy-land/of :: b -> Either a b
  //.
  //. Takes a value of any type and returns a Right with the given value.
  //.
  //. It is idiomatic to use [`of`](#of) rather than use this function
  //. directly.
  //.
  //. ```javascript
  //. > S.of(S.Either, 42)
  //. Right(42)
  //. ```
  Either['fantasy-land/of'] = Right;

  //# Either#isLeft :: Either a b ~> Boolean
  //.
  //. `true` if `this` is a Left; `false` if `this` is a Right.
  //.
  //. ```javascript
  //. > S.Left('Cannot divide by zero').isLeft
  //. true
  //.
  //. > S.Right(42).isLeft
  //. false
  //. ```

  //# Either#isRight :: Either a b ~> Boolean
  //.
  //. `true` if `this` is a Right; `false` if `this` is a Left.
  //.
  //. ```javascript
  //. > S.Right(42).isRight
  //. true
  //.
  //. > S.Left('Cannot divide by zero').isRight
  //. false
  //. ```

  //# Either#toString :: Either a b ~> () -> String
  //.
  //. Returns the string representation of the Either.
  //.
  //. ```javascript
  //. > S.toString(S.Left('Cannot divide by zero'))
  //. 'Left("Cannot divide by zero")'
  //.
  //. > S.toString(S.Right([1, 2, 3]))
  //. 'Right([1, 2, 3])'
  //. ```
  Either.prototype.toString = function() {
    return (this.isLeft ? 'Left' : 'Right') +
           '(' + Z.toString(this.value) + ')';
  };

  //# Either#inspect :: Either a b ~> () -> String
  //.
  //. Returns the string representation of the Either. This method is used by
  //. `util.inspect` and the REPL to format a Either for display.
  //.
  //. See also [`Either#toString`][].
  //.
  //. ```javascript
  //. > S.Left('Cannot divide by zero').inspect()
  //. 'Left("Cannot divide by zero")'
  //.
  //. > S.Right([1, 2, 3]).inspect()
  //. 'Right([1, 2, 3])'
  //. ```
  Either.prototype.inspect = function() { return this.toString(); };

  //# Either#fantasy-land/equals :: (Setoid a, Setoid b) => Either a b ~> Either a b -> Boolean
  //.
  //. Takes a value `e` of the same type and returns `true` if:
  //.
  //.   - `this` and `e` are both Lefts or both Rights, and their values are
  //.     equal according to [`Z.equals`][].
  //.
  //. It is idiomatic to use [`equals`](#equals) rather than use this method
  //. directly.
  //.
  //. ```javascript
  //. > S.equals(S.Right([1, 2, 3]), S.Right([1, 2, 3]))
  //. true
  //.
  //. > S.equals(S.Right([1, 2, 3]), S.Left([1, 2, 3]))
  //. false
  //. ```
  function Either$prototype$equals(other) {
    return this.isLeft === other.isLeft && Z.equals(this.value, other.value);
  }

  //# Either#fantasy-land/lte :: (Ord a, Ord b) => Either a b ~> Either a b -> Boolean
  //.
  //. Takes a value `e` of the same type and returns `true` if:
  //.
  //.   - `this` is a Left and `e` is a Right; or
  //.
  //.   - `this` and `e` are both Lefts or both Rights, and the value of `this`
  //.     is less than or equal to the value of `e` according to [`Z.lte`][].
  //.
  //. It is idiomatic to use [`lte`](#lte) or [`lte_`](#lte_) rather than use
  //. this method directly.
  //.
  //. ```javascript
  //. > S.lte_(S.Left(10), S.Right(0))
  //. true
  //.
  //. > S.lte_(S.Right(0), S.Left(10))
  //. false
  //.
  //. > S.lte_(S.Right(0), S.Right(1))
  //. true
  //.
  //. > S.lte_(S.Right(1), S.Right(0))
  //. false
  //. ```
  function Either$prototype$lte(other) {
    return this.isLeft === other.isLeft ?
      Z.lte(this.value, other.value) :
      this.isLeft;
  }

  //# Either#fantasy-land/concat :: (Semigroup a, Semigroup b) => Either a b ~> Either a b -> Either a b
  //.
  //. Returns the result of concatenating two Either values of the same type.
  //. `a` must have a [Semigroup][], as must `b`.
  //.
  //. If `this` is a Left and the argument is a Left, this method returns a
  //. Left whose value is the result of concatenating this Left's value and
  //. the given Left's value.
  //.
  //. If `this` is a Right and the argument is a Right, this method returns a
  //. Right whose value is the result of concatenating this Right's value and
  //. the given Right's value.
  //.
  //. Otherwise, this method returns the Right.
  //.
  //. It is idiomatic to use [`concat`](#concat) rather than use this method
  //. directly.
  //.
  //. ```javascript
  //. > S.concat(S.Left('abc'), S.Left('def'))
  //. Left('abcdef')
  //.
  //. > S.concat(S.Right([1, 2, 3]), S.Right([4, 5, 6]))
  //. Right([1, 2, 3, 4, 5, 6])
  //.
  //. > S.concat(S.Left('abc'), S.Right([1, 2, 3]))
  //. Right([1, 2, 3])
  //.
  //. > S.concat(S.Right([1, 2, 3]), S.Left('abc'))
  //. Right([1, 2, 3])
  //. ```
  function Either$prototype$concat(other) {
    return this.isLeft ?
      other.isLeft ? Left(Z.concat(this.value, other.value)) : other :
      other.isLeft ? this : Right(Z.concat(this.value, other.value));
  }

  //# Either#fantasy-land/map :: Either a b ~> (b -> c) -> Either a c
  //.
  //. Takes a function and returns `this` if `this` is a Left; otherwise it
  //. returns a Right whose value is the result of applying the function to
  //. this Right's value.
  //.
  //. It is idiomatic to use [`map`](#map) rather than use this method
  //. directly.
  //.
  //. See also [`Either#fantasy-land/bimap`][].
  //.
  //. ```javascript
  //. > S.map(Math.sqrt, S.Left('Cannot divide by zero'))
  //. Left('Cannot divide by zero')
  //.
  //. > S.map(Math.sqrt, S.Right(9))
  //. Right(3)
  //. ```
  Either.prototype['fantasy-land/map'] = function(f) {
    return this.isRight ? Right(f(this.value)) : this;
  };

  //# Either#fantasy-land/bimap :: Either a b ~> (a -> c, b -> d) -> Either c d
  //.
  //. Takes two functions and returns:
  //.
  //.   - a Left whose value is the result of applying the first function
  //.     to this Left's value if `this` is a Left; otherwise
  //.
  //.   - a Right whose value is the result of applying the second function
  //.     to this Right's value.
  //.
  //. Similar to [`Either#fantasy-land/map`][], but supports mapping over the
  //. left side as well as the right side.
  //.
  //. It is idiomatic to use [`bimap`](#bimap) rather than use this method
  //. directly.
  //.
  //. ```javascript
  //. > S.bimap(S.toUpper, S.add(1), S.Left('abc'))
  //. Left('ABC')
  //.
  //. > S.bimap(S.toUpper, S.add(1), S.Right(42))
  //. Right(43)
  //. ```
  Either.prototype['fantasy-land/bimap'] = function(f, g) {
    return this.isLeft ? Left(f(this.value)) : Right(g(this.value));
  };

  //# Either#fantasy-land/ap :: Either a b ~> Either a (b -> c) -> Either a c
  //.
  //. Takes an Either and returns a Left unless `this` is a Right *and* the
  //. argument is a Right, in which case it returns a Right whose value is
  //. the result of applying the given Right's value to this Right's value.
  //.
  //. It is idiomatic to use [`ap`](#ap) rather than use this method directly.
  //.
  //. ```javascript
  //. > S.ap(S.Left('No such function'), S.Left('Cannot divide by zero'))
  //. Left('No such function')
  //.
  //. > S.ap(S.Left('No such function'), S.Right(9))
  //. Left('No such function')
  //.
  //. > S.ap(S.Right(Math.sqrt), S.Left('Cannot divide by zero'))
  //. Left('Cannot divide by zero')
  //.
  //. > S.ap(S.Right(Math.sqrt), S.Right(9))
  //. Right(3)
  //. ```
  Either.prototype['fantasy-land/ap'] = function(other) {
    return other.isRight ? Z.map(other.value, this) : other;
  };

  //# Either#fantasy-land/chain :: Either a b ~> (b -> Either a c) -> Either a c
  //.
  //. Takes a function and returns `this` if `this` is a Left; otherwise
  //. it returns the result of applying the function to this Right's value.
  //.
  //. It is idiomatic to use [`chain`](#chain) rather than use this method
  //. directly.
  //.
  //. ```javascript
  //. > global.sqrt = n =>
  //. .   n < 0 ? S.Left('Cannot represent square root of negative number')
  //. .         : S.Right(Math.sqrt(n))
  //. sqrt
  //.
  //. > S.chain(sqrt, S.Left('Cannot divide by zero'))
  //. Left('Cannot divide by zero')
  //.
  //. > S.chain(sqrt, S.Right(-1))
  //. Left('Cannot represent square root of negative number')
  //.
  //. > S.chain(sqrt, S.Right(25))
  //. Right(5)
  //. ```
  Either.prototype['fantasy-land/chain'] = function(f) {
    return this.isRight ? f(this.value) : this;
  };

  //# Either#fantasy-land/alt :: Either a b ~> Either a b -> Either a b
  //.
  //. Chooses between `this` and the other Either provided as an argument.
  //. Returns `this` if `this` is a Right; the other Either otherwise.
  //.
  //. It is idiomatic to use [`alt`](#alt) rather than use this method
  //. directly.
  //.
  //. ```javascript
  //. > S.alt(S.Left('A'), S.Left('B'))
  //. Left('B')
  //.
  //. > S.alt(S.Left('C'), S.Right(1))
  //. Right(1)
  //.
  //. > S.alt(S.Right(2), S.Left('D'))
  //. Right(2)
  //.
  //. > S.alt(S.Right(3), S.Right(4))
  //. Right(3)
  //. ```
  Either.prototype['fantasy-land/alt'] = function(other) {
    return this.isRight ? this : other;
  };

  //# Either#fantasy-land/reduce :: Either a b ~> ((c, b) -> c, c) -> c
  //.
  //. Takes a function and an initial value of any type, and returns:
  //.
  //.   - the initial value if `this` is a Left; otherwise
  //.
  //.   - the result of applying the function to the initial value and this
  //.     Right's value.
  //.
  //. It is idiomatic to use [`reduce`](#reduce) rather than use this method
  //. directly.
  //.
  //. ```javascript
  //. > S.reduce(S.curry2(Math.pow), 10, S.Left('Cannot divide by zero'))
  //. 10
  //.
  //. > S.reduce(S.curry2(Math.pow), 10, S.Right(3))
  //. 1000
  //. ```
  Either.prototype['fantasy-land/reduce'] = function(f, x) {
    return this.isRight ? f(x, this.value) : x;
  };

  //# Either#fantasy-land/traverse :: Applicative f => Either a b ~> (TypeRep f, b -> f c) -> f (Either a c)
  //.
  //. Takes the type representative of some [Applicative][] and a function
  //. which returns a value of that Applicative, and returns:
  //.
  //.   - the result of applying the type representative's [`of`][] function to
  //.     `this` if `this` is a Left; otherwise
  //.
  //.   - the result of mapping [`Right`](#Right) over the result of applying
  //.     the first function to this Right's value.
  //.
  //. It is idiomatic to use [`traverse`](#traverse) rather than use this
  //. method directly.
  //.
  //. ```javascript
  //. > S.traverse(Array, S.words, S.Left('Request failed'))
  //. [Left('Request failed')]
  //.
  //. > S.traverse(Array, S.words, S.Right('foo bar baz'))
  //. [Right('foo'), Right('bar'), Right('baz')]
  //. ```
  Either.prototype['fantasy-land/traverse'] = function(typeRep, f) {
    return this.isRight ? Z.map(Right, f(this.value)) : Z.of(typeRep, this);
  };

  //# Either#fantasy-land/extend :: Either a b ~> (Either a b -> c) -> Either a c
  //.
  //. Takes a function and returns `this` if `this` is a Left; otherwise it
  //. returns a Right whose value is the result of applying the function to
  //. `this`.
  //.
  //. It is idiomatic to use [`extend`](#extend) rather than use this method
  //. directly.
  //.
  //. ```javascript
  //. > S.extend(x => x.value + 1, S.Left('Cannot divide by zero'))
  //. Left('Cannot divide by zero')
  //.
  //. > S.extend(x => x.value + 1, S.Right(42))
  //. Right(43)
  //. ```
  Either.prototype['fantasy-land/extend'] = function(f) {
    return this.isLeft ? this : Right(f(this));
  };

  //# isLeft :: Either a b -> Boolean
  //.
  //. Returns `true` if the given Either is a Left; `false` if it is a Right.
  //.
  //. ```javascript
  //. > S.isLeft(S.Left('Cannot divide by zero'))
  //. true
  //.
  //. > S.isLeft(S.Right(42))
  //. false
  //. ```
  function isLeft(either) {
    return either.isLeft;
  }
  S.isLeft = def('isLeft', {}, [$Either(a, b), $.Boolean], isLeft);

  //# isRight :: Either a b -> Boolean
  //.
  //. Returns `true` if the given Either is a Right; `false` if it is a Left.
  //.
  //. ```javascript
  //. > S.isRight(S.Right(42))
  //. true
  //.
  //. > S.isRight(S.Left('Cannot divide by zero'))
  //. false
  //. ```
  function isRight(either) {
    return either.isRight;
  }
  S.isRight = def('isRight', {}, [$Either(a, b), $.Boolean], isRight);

  //# fromEither :: b -> Either a b -> b
  //.
  //. Takes a default value and an Either, and returns the Right value
  //. if the Either is a Right; the default value otherwise.
  //.
  //. ```javascript
  //. > S.fromEither(0, S.Right(42))
  //. 42
  //.
  //. > S.fromEither(0, S.Left(42))
  //. 0
  //. ```
  function fromEither(x, either) {
    return either.isRight ? either.value : x;
  }
  S.fromEither = def('fromEither', {}, [b, $Either(a, b), b], fromEither);

  //# toEither :: a -> b? -> Either a b
  //.
  //. Converts an arbitrary value to an Either: a Left if the value is `null`
  //. or `undefined`; a Right otherwise. The first argument specifies the
  //. value of the Left in the "failure" case.
  //.
  //. ```javascript
  //. > S.toEither('XYZ', null)
  //. Left('XYZ')
  //.
  //. > S.toEither('XYZ', 'ABC')
  //. Right('ABC')
  //.
  //. > S.map(S.prop('0'), S.toEither('Invalid protocol', 'ftp://example.com/'.match(/^https?:/)))
  //. Left('Invalid protocol')
  //.
  //. > S.map(S.prop('0'), S.toEither('Invalid protocol', 'https://example.com/'.match(/^https?:/)))
  //. Right('https:')
  //. ```
  function toEither(x, y) {
    return y == null ? Left(x) : Right(y);
  }
  S.toEither = def('toEither', {}, [a, b, $Either(a, b)], toEither);

  //# either :: (a -> c) -> (b -> c) -> Either a b -> c
  //.
  //. Takes two functions and an Either, and returns the result of
  //. applying the first function to the Left's value, if the Either
  //. is a Left, or the result of applying the second function to the
  //. Right's value, if the Either is a Right.
  //.
  //. ```javascript
  //. > S.either(S.toUpper, S.toString, S.Left('Cannot divide by zero'))
  //. 'CANNOT DIVIDE BY ZERO'
  //.
  //. > S.either(S.toUpper, S.toString, S.Right(42))
  //. '42'
  //. ```
  function either(l, r, either) {
    return either.isLeft ? l(either.value) : r(either.value);
  }
  S.either = def('either', {}, [Fn(a, c), Fn(b, c), $Either(a, b), c], either);

  //# lefts :: Array (Either a b) -> Array a
  //.
  //. Takes an array of Eithers and returns an array containing each Left's
  //. value.
  //.
  //. See also [`rights`](#rights).
  //.
  //. ```javascript
  //. > S.lefts([S.Right(20), S.Left('foo'), S.Right(10), S.Left('bar')])
  //. ['foo', 'bar']
  //. ```
  function lefts(eithers) {
    return Z.reduce(function(xs, either) {
      if (either.isLeft) xs.push(either.value);
      return xs;
    }, [], eithers);
  }
  S.lefts = def('lefts', {}, [$.Array($Either(a, b)), $.Array(a)], lefts);

  //# rights :: Array (Either a b) -> Array b
  //.
  //. Takes an array of Eithers and returns an array containing each Right's
  //. value.
  //.
  //. See also [`lefts`](#lefts).
  //.
  //. ```javascript
  //. > S.rights([S.Right(20), S.Left('foo'), S.Right(10), S.Left('bar')])
  //. [20, 10]
  //. ```
  function rights(eithers) {
    return Z.reduce(function(xs, either) {
      if (either.isRight) xs.push(either.value);
      return xs;
    }, [], eithers);
  }
  S.rights = def('rights', {}, [$.Array($Either(a, b)), $.Array(b)], rights);

  //# tagBy :: (a -> Boolean) -> a -> Either a a
  //.
  //. Takes a predicate and a value, and returns a Right of the value if it
  //. satisfies the predicate; a Left of the value otherwise.
  //.
  //. ```javascript
  //. > S.tagBy(S.odd, 0)
  //. Left(0)
  //
  //. > S.tagBy(S.odd, 1)
  //. Right(1)
  //. ```
  function tagBy(pred, a) {
    return pred(a) ? Right(a) : Left(a);
  }
  S.tagBy = def('tagBy', {}, [$.Predicate(a), a, $Either(a, a)], tagBy);

  //# encaseEither :: (Error -> l) -> (a -> r) -> a -> Either l r
  //.
  //. Takes two unary functions, `f` and `g`, the second of which may throw,
  //. and a value `x` of any type. Applies `g` to `x` inside a `try` block.
  //. If an exception is caught, the return value is a Left containing the
  //. result of applying `f` to the caught Error object; otherwise the return
  //. value is a Right containing the result of applying `g` to `x`.
  //.
  //. See also [`encase`](#encase).
  //.
  //. ```javascript
  //. > S.encaseEither(S.I, JSON.parse, '["foo","bar","baz"]')
  //. Right(['foo', 'bar', 'baz'])
  //.
  //. > S.encaseEither(S.I, JSON.parse, '[')
  //. Left(new SyntaxError('Unexpected end of JSON input'))
  //.
  //. > S.encaseEither(S.prop('message'), JSON.parse, '[')
  //. Left('Unexpected end of JSON input')
  //. ```
  function encaseEither(f, g, x) {
    try {
      return Right(g(x));
    } catch (err) {
      return Left(f(err));
    }
  }
  S.encaseEither =
  def('encaseEither',
      {},
      [Fn($.Error, l), Fn(a, r), a, $Either(l, r)],
      encaseEither);

  //# encaseEither2 :: (Error -> l) -> (a -> b -> r) -> a -> b -> Either l r
  //.
  //. Binary version of [`encaseEither`](#encaseEither).
  function encaseEither2(f, g, x, y) {
    try {
      return Right(g(x)(y));
    } catch (err) {
      return Left(f(err));
    }
  }
  S.encaseEither2 =
  def('encaseEither2',
      {},
      [Fn($.Error, l), Fn(a, Fn(b, r)), a, b, $Either(l, r)],
      encaseEither2);

  //# encaseEither3 :: (Error -> l) -> (a -> b -> c -> r) -> a -> b -> c -> Either l r
  //.
  //. Ternary version of [`encaseEither`](#encaseEither).
  function encaseEither3(f, g, x, y, z) {
    try {
      return Right(g(x)(y)(z));
    } catch (err) {
      return Left(f(err));
    }
  }
  S.encaseEither3 =
  def('encaseEither3',
      {},
      [Fn($.Error, l), Fn(a, Fn(b, Fn(c, r))), a, b, c, $Either(l, r)],
      encaseEither3);

  //# eitherToMaybe :: Either a b -> Maybe b
  //.
  //. Converts an Either to a Maybe. A Left becomes Nothing; a Right becomes
  //. a Just.
  //.
  //. See also [`maybeToEither`](#maybeToEither).
  //.
  //. ```javascript
  //. > S.eitherToMaybe(S.Left('Cannot divide by zero'))
  //. Nothing
  //.
  //. > S.eitherToMaybe(S.Right(42))
  //. Just(42)
  //. ```
  function eitherToMaybe(either) {
    return either.isLeft ? Nothing : Just(either.value);
  }
  S.eitherToMaybe =
  def('eitherToMaybe', {}, [$Either(a, b), $Maybe(b)], eitherToMaybe);

  //. ### Logic

  //# and :: Boolean -> Boolean -> Boolean
  //.
  //. Boolean "and".
  //.
  //. ```javascript
  //. > S.and(false, false)
  //. false
  //.
  //. > S.and(false, true)
  //. false
  //.
  //. > S.and(true, false)
  //. false
  //.
  //. > S.and(true, true)
  //. true
  //. ```
  function and(x, y) {
    return x.valueOf() && y.valueOf();
  }
  S.and = def('and', {}, [$.Boolean, $.Boolean, $.Boolean], and);

  //# or :: Boolean -> Boolean -> Boolean
  //.
  //. Boolean "or".
  //.
  //. ```javascript
  //. > S.or(false, false)
  //. false
  //.
  //. > S.or(false, true)
  //. true
  //.
  //. > S.or(true, false)
  //. true
  //.
  //. > S.or(true, true)
  //. true
  //. ```
  function or(x, y) {
    return x.valueOf() || y.valueOf();
  }
  S.or = def('or', {}, [$.Boolean, $.Boolean, $.Boolean], or);

  //# not :: Boolean -> Boolean
  //.
  //. Boolean "not".
  //.
  //. See also [`complement`](#complement).
  //.
  //. ```javascript
  //. > S.not(false)
  //. true
  //.
  //. > S.not(true)
  //. false
  //. ```
  function not(x) {
    return !x.valueOf();
  }
  S.not = def('not', {}, [$.Boolean, $.Boolean], not);

  //# complement :: (a -> Boolean) -> a -> Boolean
  //.
  //. Takes a unary predicate and a value of any type, and returns the logical
  //. negation of applying the predicate to the value.
  //.
  //. See also [`not`](#not).
  //.
  //. ```javascript
  //. > Number.isInteger(42)
  //. true
  //.
  //. > S.complement(Number.isInteger, 42)
  //. false
  //. ```
  function complement(pred, x) {
    return !pred(x);
  }
  S.complement =
  def('complement', {}, [$.Predicate(a), a, $.Boolean], complement);

  //# ifElse :: (a -> Boolean) -> (a -> b) -> (a -> b) -> a -> b
  //.
  //. Takes a unary predicate, a unary "if" function, a unary "else"
  //. function, and a value of any type, and returns the result of
  //. applying the "if" function to the value if the value satisfies
  //. the predicate; the result of applying the "else" function to the
  //. value otherwise.
  //.
  //. See also [`when`](#when) and [`unless`](#unless).
  //.
  //. ```javascript
  //. > S.ifElse(x => x < 0, Math.abs, Math.sqrt, -1)
  //. 1
  //.
  //. > S.ifElse(x => x < 0, Math.abs, Math.sqrt, 16)
  //. 4
  //. ```
  function ifElse(pred, f, g, x) {
    return pred(x) ? f(x) : g(x);
  }
  S.ifElse =
  def('ifElse', {}, [$.Predicate(a), Fn(a, b), Fn(a, b), a, b], ifElse);

  //# when :: (a -> Boolean) -> (a -> a) -> a -> a
  //.
  //. Takes a unary predicate, a unary function, and a value of any type, and
  //. returns the result of applying the function to the value if the value
  //. satisfies the predicate; the value otherwise.
  //.
  //. See also [`unless`](#unless) and [`ifElse`](#ifElse).
  //.
  //. ```javascript
  //. > S.when(x => x >= 0, Math.sqrt, 16)
  //. 4
  //.
  //. > S.when(x => x >= 0, Math.sqrt, -1)
  //. -1
  //. ```
  function when(pred, f, x) {
    return ifElse(pred, f, I, x);
  }
  S.when = def('when', {}, [$.Predicate(a), Fn(a, a), a, a], when);

  //# unless :: (a -> Boolean) -> (a -> a) -> a -> a
  //.
  //. Takes a unary predicate, a unary function, and a value of any type, and
  //. returns the result of applying the function to the value if the value
  //. does not satisfy the predicate; the value otherwise.
  //.
  //. See also [`when`](#when) and [`ifElse`](#ifElse).
  //.
  //. ```javascript
  //. > S.unless(x => x < 0, Math.sqrt, 16)
  //. 4
  //.
  //. > S.unless(x => x < 0, Math.sqrt, -1)
  //. -1
  //. ```
  function unless(pred, f, x) {
    return ifElse(pred, I, f, x);
  }
  S.unless = def('unless', {}, [$.Predicate(a), Fn(a, a), a, a], unless);

  //# allPass :: Foldable f => f (a -> Boolean) -> a -> Boolean
  //.
  //. Takes a structure containing zero or more predicates, and a value
  //. of any type. Returns `true` [iff][] the value satisfies all of the
  //. predicates. None of the subsequent predicates will be applied after
  //. the first predicate not satisfied.
  //.
  //. ```javascript
  //. > S.allPass([S.test(/q/), S.test(/u/), S.test(/i/)], 'quiessence')
  //. true
  //.
  //. > S.allPass([S.test(/q/), S.test(/u/), S.test(/i/)], 'fissiparous')
  //. false
  //. ```
  function allPass(preds, x) {
    return Z.reduce(function(b, p) { return b && p(x); }, true, preds);
  }
  S.allPass =
  def('allPass',
      {f: [Z.Foldable]},
      [f($.Predicate(a)), a, $.Boolean],
      allPass);

  //# anyPass :: Foldable f => f (a -> Boolean) -> a -> Boolean
  //.
  //. Takes a structure containing zero or more predicates, and a value
  //. of any type. Returns `true` [iff][] the value satisfies any of the
  //. predicates. None of the subsequent predicates will be applied after
  //. the first predicate satisfied.
  //.
  //. ```javascript
  //. > S.anyPass([S.test(/q/), S.test(/u/), S.test(/i/)], 'incandescent')
  //. true
  //.
  //. > S.anyPass([S.test(/q/), S.test(/u/), S.test(/i/)], 'empathy')
  //. false
  //. ```
  function anyPass(preds, x) {
    return Z.reduce(function(b, p) { return b || p(x); }, false, preds);
  }
  S.anyPass =
  def('anyPass',
      {f: [Z.Foldable]},
      [f($.Predicate(a)), a, $.Boolean],
      anyPass);

  //. ### List
  //.
  //. The List type constructor enables type signatures to describe ad hoc
  //. polymorphic functions which operate on either [`Array`][$.Array] or
  //. [`String`][$.String] values.
  //.
  //. Mental gymnastics are required to treat arrays and strings similarly.
  //. `[1, 2, 3]` is a list containing `1`, `2`, and `3`. `'abc'` is a list
  //. containing `'a'`, `'b'`, and `'c'`. But what is the type of `'a'`?
  //. `String`, since JavaScript has no Char type! Thus:
  //.
  //.     'abc' :: String, List String, List (List String), ...
  //.
  //. Every member of `String` is also a member of `List String`!

  //# slice :: Integer -> Integer -> List a -> Maybe (List a)
  //.
  //. Returns Just a list containing the elements from the supplied list
  //. from a beginning index (inclusive) to an end index (exclusive).
  //. Returns Nothing unless the start interval is less than or equal to
  //. the end interval, and the list contains both (half-open) intervals.
  //. Accepts negative indices, which indicate an offset from the end of
  //. the list.
  //.
  //. See also [`take`](#take), [`drop`](#drop), [`takeLast`](#takeLast),
  //. and [`dropLast`](#dropLast).
  //.
  //. ```javascript
  //. > S.slice(1, 3, ['a', 'b', 'c', 'd', 'e'])
  //. Just(['b', 'c'])
  //.
  //. > S.slice(-3, -1, ['a', 'b', 'c', 'd', 'e'])
  //. Just(['c', 'd'])
  //.
  //. > S.slice(1, 6, ['a', 'b', 'c', 'd', 'e'])
  //. Nothing
  //.
  //. > S.slice(2, 6, 'banana')
  //. Just('nana')
  //. ```
  function slice(start, end, xs) {
    var len = xs.length;
    var fromIdx = start < 0 ? start + len : start;
    var toIdx = end < 0 ? end + len : end;

    return Math.abs(start) <= len && Math.abs(end) <= len && fromIdx <= toIdx ?
      Just(xs.slice(fromIdx, toIdx)) :
      Nothing;
  }
  S.slice =
  def('slice', {}, [$.Integer, $.Integer, List(a), $Maybe(List(a))], slice);

  //# at :: Integer -> List a -> Maybe a
  //.
  //. Takes an index and a list and returns Just the element of the list at
  //. the index if the index is within the list's bounds; Nothing otherwise.
  //. A negative index represents an offset from the length of the list.
  //.
  //. ```javascript
  //. > S.at(2, ['a', 'b', 'c', 'd', 'e'])
  //. Just('c')
  //.
  //. > S.at(5, ['a', 'b', 'c', 'd', 'e'])
  //. Nothing
  //.
  //. > S.at(-2, ['a', 'b', 'c', 'd', 'e'])
  //. Just('d')
  //. ```
  function at(n, xs) {
    var idx = n < 0 ? xs.length + n : n;
    return idx < 0 || idx >= xs.length ? Nothing : Just(xs[idx]);
  }
  S.at = def('at', {}, [$.Integer, List(a), $Maybe(a)], at);

  //# head :: List a -> Maybe a
  //.
  //. Takes a list and returns Just the first element of the list if the
  //. list contains at least one element; Nothing if the list is empty.
  //.
  //. ```javascript
  //. > S.head([1, 2, 3])
  //. Just(1)
  //.
  //. > S.head([])
  //. Nothing
  //. ```
  function head(xs) {
    return at(0, xs);
  }
  S.head = def('head', {}, [List(a), $Maybe(a)], head);

  //# last :: List a -> Maybe a
  //.
  //. Takes a list and returns Just the last element of the list if the
  //. list contains at least one element; Nothing if the list is empty.
  //.
  //. ```javascript
  //. > S.last([1, 2, 3])
  //. Just(3)
  //.
  //. > S.last([])
  //. Nothing
  //. ```
  function last(xs) {
    return at(-1, xs);
  }
  S.last = def('last', {}, [List(a), $Maybe(a)], last);

  //# tail :: List a -> Maybe (List a)
  //.
  //. Takes a list and returns Just a list containing all but the first
  //. of the list's elements if the list contains at least one element;
  //. Nothing if the list is empty.
  //.
  //. ```javascript
  //. > S.tail([1, 2, 3])
  //. Just([2, 3])
  //.
  //. > S.tail([])
  //. Nothing
  //. ```
  function tail(xs) {
    return xs.length > 0 ? Just(xs.slice(1)) : Nothing;
  }
  S.tail = def('tail', {}, [List(a), $Maybe(List(a))], tail);

  //# init :: List a -> Maybe (List a)
  //.
  //. Takes a list and returns Just a list containing all but the last
  //. of the list's elements if the list contains at least one element;
  //. Nothing if the list is empty.
  //.
  //. ```javascript
  //. > S.init([1, 2, 3])
  //. Just([1, 2])
  //.
  //. > S.init([])
  //. Nothing
  //. ```
  function init(xs) {
    return xs.length > 0 ? Just(xs.slice(0, -1)) : Nothing;
  }
  S.init = def('init', {}, [List(a), $Maybe(List(a))], init);

  //# take :: Integer -> List a -> Maybe (List a)
  //.
  //. Returns Just the first N elements of the given collection if N is
  //. greater than or equal to zero and less than or equal to the length
  //. of the collection; Nothing otherwise.
  //.
  //. ```javascript
  //. > S.take(2, ['a', 'b', 'c', 'd', 'e'])
  //. Just(['a', 'b'])
  //.
  //. > S.take(4, 'abcdefg')
  //. Just('abcd')
  //.
  //. > S.take(4, ['a', 'b', 'c'])
  //. Nothing
  //. ```
  function take(n, xs) {
    return n < 0 || n > xs.length ? Nothing : Just(xs.slice(0, n));
  }
  S.take = def('take', {}, [$.Integer, List(a), $Maybe(List(a))], take);

  //# takeLast :: Integer -> List a -> Maybe (List a)
  //.
  //. Returns Just the last N elements of the given collection if N is
  //. greater than or equal to zero and less than or equal to the length
  //. of the collection; Nothing otherwise.
  //.
  //. ```javascript
  //. > S.takeLast(2, ['a', 'b', 'c', 'd', 'e'])
  //. Just(['d', 'e'])
  //.
  //. > S.takeLast(4, 'abcdefg')
  //. Just('defg')
  //.
  //. > S.takeLast(4, ['a', 'b', 'c'])
  //. Nothing
  //. ```
  function takeLast(n, xs) {
    return n < 0 || n > xs.length ? Nothing : Just(xs.slice(xs.length - n));
  }
  S.takeLast =
  def('takeLast', {}, [$.Integer, List(a), $Maybe(List(a))], takeLast);

  //# drop :: Integer -> List a -> Maybe (List a)
  //.
  //. Returns Just all but the first N elements of the given collection
  //. if N is greater than or equal to zero and less than or equal to the
  //. length of the collection; Nothing otherwise.
  //.
  //. ```javascript
  //. > S.drop(2, ['a', 'b', 'c', 'd', 'e'])
  //. Just(['c', 'd', 'e'])
  //.
  //. > S.drop(4, 'abcdefg')
  //. Just('efg')
  //.
  //. > S.drop(4, 'abc')
  //. Nothing
  //. ```
  function drop(n, xs) {
    return n < 0 || n > xs.length ? Nothing : Just(xs.slice(n));
  }
  S.drop = def('drop', {}, [$.Integer, List(a), $Maybe(List(a))], drop);

  //# dropLast :: Integer -> List a -> Maybe (List a)
  //.
  //. Returns Just all but the last N elements of the given collection
  //. if N is greater than or equal to zero and less than or equal to the
  //. length of the collection; Nothing otherwise.
  //.
  //. ```javascript
  //. > S.dropLast(2, ['a', 'b', 'c', 'd', 'e'])
  //. Just(['a', 'b', 'c'])
  //.
  //. > S.dropLast(4, 'abcdefg')
  //. Just('abc')
  //.
  //. > S.dropLast(4, 'abc')
  //. Nothing
  //. ```
  function dropLast(n, xs) {
    return n < 0 || n > xs.length ? Nothing : Just(xs.slice(0, xs.length - n));
  }
  S.dropLast =
  def('dropLast', {}, [$.Integer, List(a), $Maybe(List(a))], dropLast);

  //. ### Array

  //# size :: Foldable f => f a -> Integer
  //.
  //. Returns the number of elements of the given structure.
  //.
  //. ```javascript
  //. > S.size([])
  //. 0
  //.
  //. > S.size(['foo', 'bar', 'baz'])
  //. 3
  //.
  //. > S.size(Nil)
  //. 0
  //.
  //. > S.size(Cons('foo', Cons('bar', Cons('baz', Nil))))
  //. 3
  //.
  //. > S.size(S.Nothing)
  //. 0
  //.
  //. > S.size(S.Just('quux'))
  //. 1
  //. ```
  S.size = def('size', {f: [Z.Foldable]}, [f(a), $.Integer], Z.size);

  //# append :: (Applicative f, Semigroup (f a)) => a -> f a -> f a
  //.
  //. Returns the result of appending the first argument to the second.
  //.
  //. See also [`prepend`](#prepend).
  //.
  //. ```javascript
  //. > S.append(3, [1, 2])
  //. [1, 2, 3]
  //.
  //. > S.append(3, Cons(1, Cons(2, Nil)))
  //. Cons(1, Cons(2, Cons(3, Nil)))
  //.
  //. > S.append([1], S.Nothing)
  //. Just([1])
  //.
  //. > S.append([3], S.Just([1, 2]))
  //. Just([1, 2, 3])
  //. ```
  S.append =
  def('append',
      {f: [Z.Applicative, Z.Semigroup]},
      [a, f(a), f(a)],
      Z.append);

  //# prepend :: (Applicative f, Semigroup (f a)) => a -> f a -> f a
  //.
  //. Returns the result of prepending the first argument to the second.
  //.
  //. See also [`append`](#append).
  //.
  //. ```javascript
  //. > S.prepend(1, [2, 3])
  //. [1, 2, 3]
  //.
  //. > S.prepend(1, Cons(2, Cons(3, Nil)))
  //. Cons(1, Cons(2, Cons(3, Nil)))
  //.
  //. > S.prepend([1], S.Nothing)
  //. Just([1])
  //.
  //. > S.prepend([1], S.Just([2, 3]))
  //. Just([1, 2, 3])
  //. ```
  S.prepend =
  def('prepend',
      {f: [Z.Applicative, Z.Semigroup]},
      [a, f(a), f(a)],
      Z.prepend);

  //# joinWith :: String -> Array String -> String
  //.
  //. Joins the strings of the second argument separated by the first argument.
  //.
  //. Properties:
  //.
  //.   - `forall s :: String, t :: String. S.joinWith(s, S.splitOn(s, t)) = t`
  //.
  //. See also [`splitOn`](#splitOn).
  //.
  //. ```javascript
  //. > S.joinWith(':', ['foo', 'bar', 'baz'])
  //. 'foo:bar:baz'
  //. ```
  function joinWith(separator, ss) {
    return ss.join(separator);
  }
  S.joinWith =
  def('joinWith', {}, [$.String, $.Array($.String), $.String], joinWith);

  //# elem :: (Setoid a, Foldable f) => a -> f a -> Boolean
  //.
  //. Takes a value and a structure and returns `true` [iff][] the value is an
  //. element of the structure.
  //.
  //. See also [`find`](#find).
  //.
  //. ```javascript
  //. > S.elem('c', ['a', 'b', 'c'])
  //. true
  //.
  //. > S.elem('x', ['a', 'b', 'c'])
  //. false
  //.
  //. > S.elem(3, {x: 1, y: 2, z: 3})
  //. true
  //.
  //. > S.elem(8, {x: 1, y: 2, z: 3})
  //. false
  //.
  //. > S.elem(0, S.Just(0))
  //. true
  //.
  //. > S.elem(0, S.Just(1))
  //. false
  //.
  //. > S.elem(0, S.Nothing)
  //. false
  //. ```
  S.elem =
  def('elem', {a: [Z.Setoid], f: [Z.Foldable]}, [a, f(a), $.Boolean], Z.elem);

  //# find :: Foldable f => (a -> Boolean) -> f a -> Maybe a
  //.
  //. Takes a predicate and a structure and returns Just the leftmost element
  //. of the structure which satisfies the predicate; Nothing if there is no
  //. such element.
  //.
  //. See also [`elem`](#elem).
  //.
  //. ```javascript
  //. > S.find(n => n < 0, [1, -2, 3, -4, 5])
  //. Just(-2)
  //.
  //. > S.find(n => n < 0, [1, 2, 3, 4, 5])
  //. Nothing
  //. ```
  function find(pred, xs) {
    return Z.reduce(
      function(m, x) { return m.isJust ? m : pred(x) ? Just(x) : Nothing; },
      Nothing,
      xs
    );
  }
  S.find =
  def('find', {f: [Z.Foldable]}, [$.Predicate(a), f(a), $Maybe(a)], find);

  //# pluck :: Functor f => String -> f a -> f b
  //.
  //. Combines [`map`](#map) and [`prop`](#prop). `pluck(k, xs)` is equivalent
  //. to `map(prop(k), xs)`.
  //.
  //. ```javascript
  //. > S.pluck('x', [{x: 1}, {x: 2}, {x: 3}])
  //. [1, 2, 3]
  //.
  //. > S.pluck('x', S.Just({x: 1, y: 2, z: 3}))
  //. Just(1)
  //. ```
  function pluck(key, xs) {
    return Z.map(function(x) {
      var obj = toObject(x);
      if (key in obj) return obj[key];
      throw new TypeError('‘pluck’ expected object to have a property named ' +
                          '‘' + key + '’; ' + Z.toString(x) + ' does not');
    }, xs);
  }
  S.pluck = def('pluck', {f: [Z.Functor]}, [$.String, f(a), f(b)], pluck);

  //# unfoldr :: (b -> Maybe (Pair a b)) -> b -> Array a
  //.
  //. Takes a function and a seed value, and returns an array generated by
  //. applying the function repeatedly. The array is initially empty. The
  //. function is initially applied to the seed value. Each application
  //. of the function should result in either:
  //.
  //.   - Nothing, in which case the array is returned; or
  //.
  //.   - Just a pair, in which case the first element is appended to
  //.     the array and the function is applied to the second element.
  //.
  //. ```javascript
  //. > S.unfoldr(n => n < 5 ? S.Just([n, n + 1]) : S.Nothing, 1)
  //. [1, 2, 3, 4]
  //. ```
  function unfoldr(f, x) {
    var result = [];
    for (var m = f(x); m.isJust; m = f(m.value[1])) result.push(m.value[0]);
    return result;
  }
  S.unfoldr =
  def('unfoldr', {}, [Fn(b, $Maybe($.Pair(a, b))), b, $.Array(a)], unfoldr);

  //# range :: Integer -> Integer -> Array Integer
  //.
  //. Returns an array of consecutive integers starting with the first argument
  //. and ending with the second argument minus one. Returns `[]` if the second
  //. argument is less than or equal to the first argument.
  //.
  //. ```javascript
  //. > S.range(0, 10)
  //. [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  //.
  //. > S.range(-5, 0)
  //. [-5, -4, -3, -2, -1]
  //.
  //. > S.range(0, -5)
  //. []
  //. ```
  function range(from, to) {
    var result = [];
    for (var n = from; n < to; n += 1) result.push(n);
    return result;
  }
  S.range =
  def('range', {}, [$.Integer, $.Integer, $.Array($.Integer)], range);

  //# groupBy :: (a -> a -> Boolean) -> Array a -> Array (Array a)
  //.
  //. Splits its array argument into an array of arrays of equal,
  //. adjacent elements. Equality is determined by the function
  //. provided as the first argument. Its behaviour can be surprising
  //. for functions that aren't reflexive, transitive, and symmetric
  //. (see [equivalence][] relation).
  //.
  //. Properties:
  //.
  //.   - `forall f :: a -> a -> Boolean, xs :: Array a.
  //.      S.join(S.groupBy(f, xs)) = xs`
  //.
  //. ```javascript
  //. > S.groupBy(S.equals, [1, 1, 2, 1, 1])
  //. [[1, 1], [2], [1, 1]]
  //.
  //. > S.groupBy(x => y => x + y === 0, [2, -3, 3, 3, 3, 4, -4, 4])
  //. [[2], [-3, 3, 3, 3], [4, -4], [4]]
  //. ```
  function groupBy(f, xs) {
    if (xs.length === 0) return [];
    var x0 = xs[0];         // :: a
    var active = [x0];      // :: Array a
    var result = [active];  // :: Array (Array a)
    for (var idx = 1; idx < xs.length; idx += 1) {
      var x = xs[idx];
      if (f(x0)(x)) active.push(x); else result.push(active = [x0 = x]);
    }
    return result;
  }
  S.groupBy =
  def('groupBy',
      {},
      [Fn(a, $.Predicate(a)), $.Array(a), $.Array($.Array(a))],
      groupBy);

  //# reverse :: (Applicative f, Foldable f, Monoid (f a)) => f a -> f a
  //.
  //. Reverses the elements of the given structure.
  //.
  //. ```javascript
  //. > S.reverse([1, 2, 3])
  //. [3, 2, 1]
  //.
  //. > S.reverse(Cons(1, Cons(2, Cons(3, Nil))))
  //. Cons(3, Cons(2, Cons(1, Nil)))
  //.
  //. > S.pipe([S.splitOn(''), S.reverse, S.joinWith('')], 'abc')
  //. 'cba'
  //. ```
  S.reverse =
  def('reverse',
      {f: [Z.Applicative, Z.Foldable, Z.Monoid]},
      [f(a), f(a)],
      Z.reverse);

  //# sort :: (Ord a, Applicative m, Foldable m, Monoid (m a)) => m a -> m a
  //.
  //. Performs a [stable sort][] of the elements of the given structure, using
  //. [`Z.lte`][] for comparisons.
  //.
  //. Properties:
  //.
  //.   - `S.sort(S.sort(m)) = S.sort(m)` (idempotence)
  //.
  //. See also [`sortBy`](#sortBy).
  //.
  //. ```javascript
  //. > S.sort(['foo', 'bar', 'baz'])
  //. ['bar', 'baz', 'foo']
  //.
  //. > S.sort([S.Left(4), S.Right(3), S.Left(2), S.Right(1)])
  //. [Left(2), Left(4), Right(1), Right(3)]
  //. ```
  S.sort =
  def('sort',
      {a: [Z.Ord], m: [Z.Applicative, Z.Foldable, Z.Monoid]},
      [m(a), m(a)],
      Z.sort);

  //# sortBy :: (Ord b, Applicative m, Foldable m, Monoid (m a)) => (a -> b) -> m a -> m a
  //.
  //. Performs a [stable sort][] of the elements of the given structure, using
  //. [`Z.lte`][] to compare the values produced by applying the given function
  //. to each element of the structure.
  //.
  //. Properties:
  //.
  //.   - `S.sortBy(f, S.sortBy(f, m)) = S.sortBy(f, m)` (idempotence)
  //.
  //. See also [`sort`](#sort).
  //.
  //. ```javascript
  //. > S.sortBy(S.prop('rank'), [
  //. .   {rank: 7, suit: 'spades'},
  //. .   {rank: 5, suit: 'hearts'},
  //. .   {rank: 2, suit: 'hearts'},
  //. .   {rank: 5, suit: 'spades'},
  //. . ])
  //. [ {rank: 2, suit: 'hearts'},
  //. . {rank: 5, suit: 'hearts'},
  //. . {rank: 5, suit: 'spades'},
  //. . {rank: 7, suit: 'spades'} ]
  //.
  //. > S.sortBy(S.prop('suit'), [
  //. .   {rank: 7, suit: 'spades'},
  //. .   {rank: 5, suit: 'hearts'},
  //. .   {rank: 2, suit: 'hearts'},
  //. .   {rank: 5, suit: 'spades'},
  //. . ])
  //. [ {rank: 5, suit: 'hearts'},
  //. . {rank: 2, suit: 'hearts'},
  //. . {rank: 7, suit: 'spades'},
  //. . {rank: 5, suit: 'spades'} ]
  //. ```
  S.sortBy =
  def('sortBy',
      {b: [Z.Ord], m: [Z.Applicative, Z.Foldable, Z.Monoid]},
      [Fn(a, b), m(a), m(a)],
      Z.sortBy);

  //. ### Object

  //# prop :: String -> a -> b
  //.
  //. Takes a property name and an object with known properties and returns
  //. the value of the specified property. If for some reason the object
  //. lacks the specified property, a type error is thrown.
  //.
  //. For accessing properties of uncertain objects, use [`get`](#get) instead.
  //.
  //. See also [`pluck`](#pluck).
  //.
  //. ```javascript
  //. > S.prop('a', {a: 1, b: 2})
  //. 1
  //. ```
  function prop(key, x) {
    var obj = toObject(x);
    if (key in obj) return obj[key];
    throw new TypeError('‘prop’ expected object to have a property named ‘' +
                        key + '’; ' + Z.toString(x) + ' does not');
  }
  S.prop = def('prop', {}, [$.String, a, b], prop);

  //# props :: Array String -> a -> b
  //.
  //. Takes a property path (an array of property names) and an object with
  //. known structure and returns the value at the given path. If for some
  //. reason the path does not exist, a type error is thrown.
  //.
  //. For accessing property paths of uncertain objects, use [`gets`](#gets)
  //. instead.
  //.
  //. ```javascript
  //. > S.props(['a', 'b', 'c'], {a: {b: {c: 1}}})
  //. 1
  //. ```
  function props(path, x) {
    return path.reduce(function(x, key) {
      var obj = toObject(x);
      if (key in obj) return obj[key];
      throw new TypeError('‘props’ expected object to have a property at ' +
                          Z.toString(path) + '; ' +
                          Z.toString(x) + ' does not');
    }, x);
  }
  S.props = def('props', {}, [$.Array($.String), a, b], props);

  //# get :: (Any -> Boolean) -> String -> a -> Maybe b
  //.
  //. Takes a predicate, a property name, and an object and returns Just the
  //. value of the specified object property if it exists and the value
  //. satisfies the given predicate; Nothing otherwise.
  //.
  //. See also [`gets`](#gets) and [`prop`](#prop).
  //.
  //. ```javascript
  //. > S.get(S.is(Number), 'x', {x: 1, y: 2})
  //. Just(1)
  //.
  //. > S.get(S.is(Number), 'x', {x: '1', y: '2'})
  //. Nothing
  //.
  //. > S.get(S.is(Number), 'x', {})
  //. Nothing
  //.
  //. > S.get($.test([], $.Array($.Number)), 'x', {x: [1, 2, 3]})
  //. Just([1, 2, 3])
  //.
  //. > S.get($.test([], $.Array($.Number)), 'x', {x: [1, 2, 3, null]})
  //. Nothing
  //. ```
  function get(pred, key, x) {
    var obj = toObject(x);
    if (key in obj) {
      var val = obj[key];
      if (pred(val)) return Just(val);
    }
    return Nothing;
  }
  S.get = def('get', {}, [$.Predicate($.Any), $.String, a, $Maybe(b)], get);

  //# gets :: (Any -> Boolean) -> Array String -> a -> Maybe b
  //.
  //. Takes a predicate, a property path (an array of property names), and
  //. an object and returns Just the value at the given path if such a path
  //. exists and the value satisfies the given predicate; Nothing otherwise.
  //.
  //. See also [`get`](#get).
  //.
  //. ```javascript
  //. > S.gets(S.is(Number), ['a', 'b', 'c'], {a: {b: {c: 42}}})
  //. Just(42)
  //.
  //. > S.gets(S.is(Number), ['a', 'b', 'c'], {a: {b: {c: '42'}}})
  //. Nothing
  //.
  //. > S.gets(S.is(Number), ['a', 'b', 'c'], {})
  //. Nothing
  //. ```
  function gets(pred, keys, x) {
    return Z.filter(pred, Z.reduce(function(m, key) {
      return Z.chain(function(x) {
        var obj = toObject(x);
        return key in obj ? Just(obj[key]) : Nothing;
      }, m);
    }, Just(x), keys));
  }
  S.gets =
  def('gets', {}, [$.Predicate($.Any), $.Array($.String), a, $Maybe(b)], gets);

  //. ### StrMap
  //.
  //. StrMap is an abbreviation of _string map_. A string map is an object,
  //. such as `{foo: 1, bar: 2, baz: 3}`, whose values are all members of
  //. the same type. Formally, a value is a member of type `StrMap a` if its
  //. [type identifier][] is `'Object'` and the values of its enumerable own
  //. properties are all members of type `a`.

  //# singleton :: String -> a -> StrMap a
  //.
  //. Takes a string and a value of any type, and returns a string map with
  //. a single entry (mapping the key to the value).
  //.
  //. ```javascript
  //. > S.singleton('foo', 42)
  //. {foo: 42}
  //. ```
  function singleton(key, val) {
    var strMap = {};
    strMap[key] = val;
    return strMap;
  }
  S.singleton = def('singleton', {}, [$.String, a, $.StrMap(a)], singleton);

  //# insert :: String -> a -> StrMap a -> StrMap a
  //.
  //. Takes a string, a value of any type, and a string map, and returns a
  //. string map comprising all the entries of the given string map plus the
  //. entry specified by the first two arguments (which takes precedence).
  //.
  //. Equivalent to Haskell's `insert` function. Similar to Clojure's `assoc`
  //. function.
  //.
  //. ```javascript
  //. > S.insert('c', 3, {a: 1, b: 2})
  //. {a: 1, b: 2, c: 3}
  //.
  //. > S.insert('a', 4, {a: 1, b: 2})
  //. {a: 4, b: 2}
  //. ```
  function insert(key, val, strMap) {
    return Z.concat(strMap, singleton(key, val));
  }
  S.insert =
  def('insert', {}, [$.String, a, $.StrMap(a), $.StrMap(a)], insert);

  //# remove :: String -> StrMap a -> StrMap a
  //.
  //. Takes a string and a string map, and returns a string map comprising all
  //. the entries of the given string map except the one whose key matches the
  //. given string (if such a key exists).
  //.
  //. Equivalent to Haskell's `delete` function. Similar to Clojure's `dissoc`
  //. function.
  //.
  //. ```javascript
  //. > S.remove('c', {a: 1, b: 2, c: 3})
  //. {a: 1, b: 2}
  //.
  //. > S.remove('c', {})
  //. {}
  //. ```
  function remove(key, strMap) {
    var result = Z.concat(strMap, {});
    delete result[key];
    return result;
  }
  S.remove = def('remove', {}, [$.String, $.StrMap(a), $.StrMap(a)], remove);

  //# keys :: StrMap a -> Array String
  //.
  //. Returns the keys of the given string map, in arbitrary order.
  //.
  //. ```javascript
  //. > S.keys({b: 2, c: 3, a: 1}).sort()
  //. ['a', 'b', 'c']
  //. ```
  S.keys = def('keys', {}, [$.StrMap(a), $.Array($.String)], Object.keys);

  //# values :: StrMap a -> Array a
  //.
  //. Returns the values of the given string map, in arbitrary order.
  //.
  //. ```javascript
  //. > S.values({a: 1, c: 3, b: 2}).sort()
  //. [1, 2, 3]
  //. ```
  function values(strMap) {
    return Z.map(function(k) { return strMap[k]; }, Object.keys(strMap));
  }
  S.values = def('values', {}, [$.StrMap(a), $.Array(a)], values);

  //# pairs :: StrMap a -> Array (Pair String a)
  //.
  //. Returns the key–value pairs of the given string map, in arbitrary order.
  //.
  //. ```javascript
  //. > S.pairs({b: 2, a: 1, c: 3}).sort()
  //. [['a', 1], ['b', 2], ['c', 3]]
  //. ```
  function pairs(strMap) {
    return Z.map(function(k) { return [k, strMap[k]]; }, Object.keys(strMap));
  }
  S.pairs =
  def('pairs', {}, [$.StrMap(a), $.Array($.Pair($.String, a))], pairs);

  //# fromPairs :: Foldable f => f (Pair String a) -> StrMap a
  //.
  //. Returns a string map containing the key–value pairs specified by the
  //. given [Foldable][]. If a key appears in multiple pairs, the rightmost
  //. pair takes precedence.
  //.
  //. ```javascript
  //. > S.fromPairs([['a', 1], ['b', 2], ['c', 3]])
  //. {a: 1, b: 2, c: 3}
  //.
  //. > S.fromPairs([['x', 1], ['x', 2]])
  //. {x: 2}
  //. ```
  function fromPairs(pairs) {
    return Z.reduce(function(strMap, pair) {
      strMap[pair[0]] = pair[1];
      return strMap;
    }, {}, pairs);
  }
  S.fromPairs =
  def('fromPairs',
      {f: [Z.Foldable]},
      [f($.Pair($.String, a)), $.StrMap(a)],
      fromPairs);

  //. ### Number

  //# negate :: ValidNumber -> ValidNumber
  //.
  //. Negates its argument.
  //.
  //. ```javascript
  //. > S.negate(12.5)
  //. -12.5
  //.
  //. > S.negate(-42)
  //. 42
  //. ```
  function negate(n) {
    return -n;
  }
  S.negate = def('negate', {}, [$.ValidNumber, $.ValidNumber], negate);

  //# add :: FiniteNumber -> FiniteNumber -> FiniteNumber
  //.
  //. Returns the sum of two (finite) numbers.
  //.
  //. ```javascript
  //. > S.add(1, 1)
  //. 2
  //. ```
  function add(x, y) {
    return x + y;
  }
  S.add =
  def('add', {}, [$.FiniteNumber, $.FiniteNumber, $.FiniteNumber], add);

  //# sum :: Foldable f => f FiniteNumber -> FiniteNumber
  //.
  //. Returns the sum of the given array of (finite) numbers.
  //.
  //. ```javascript
  //. > S.sum([1, 2, 3, 4, 5])
  //. 15
  //.
  //. > S.sum([])
  //. 0
  //.
  //. > S.sum(S.Just(42))
  //. 42
  //.
  //. > S.sum(S.Nothing)
  //. 0
  //. ```
  function sum(foldable) {
    return Z.reduce(add, 0, foldable);
  }
  S.sum =
  def('sum', {f: [Z.Foldable]}, [f($.FiniteNumber), $.FiniteNumber], sum);

  //# sub :: FiniteNumber -> (FiniteNumber -> FiniteNumber)
  //.
  //. Takes a finite number `n` and returns the _subtract `n`_ function.
  //.
  //. See also [`sub_`](#sub_).
  //.
  //. ```javascript
  //. > S.map(S.sub(1), [1, 2, 3])
  //. [0, 1, 2]
  //. ```
  S.sub =
  def('sub',
      {},
      [$.FiniteNumber, Fn($.FiniteNumber, $.FiniteNumber)],
      flip$(sub_));

  //# sub_ :: FiniteNumber -> FiniteNumber -> FiniteNumber
  //.
  //. Returns the difference between two (finite) numbers.
  //.
  //. See also [`sub`](#sub).
  //.
  //. ```javascript
  //. > S.sub_(4, 2)
  //. 2
  //. ```
  function sub_(x, y) {
    return x - y;
  }
  S.sub_ =
  def('sub_', {}, [$.FiniteNumber, $.FiniteNumber, $.FiniteNumber], sub_);

  //# mult :: FiniteNumber -> FiniteNumber -> FiniteNumber
  //.
  //. Returns the product of two (finite) numbers.
  //.
  //. ```javascript
  //. > S.mult(4, 2)
  //. 8
  //. ```
  function mult(x, y) {
    return x * y;
  }
  S.mult =
  def('mult', {}, [$.FiniteNumber, $.FiniteNumber, $.FiniteNumber], mult);

  //# product :: Foldable f => f FiniteNumber -> FiniteNumber
  //.
  //. Returns the product of the given array of (finite) numbers.
  //.
  //. ```javascript
  //. > S.product([1, 2, 3, 4, 5])
  //. 120
  //.
  //. > S.product([])
  //. 1
  //.
  //. > S.product(S.Just(42))
  //. 42
  //.
  //. > S.product(S.Nothing)
  //. 1
  //. ```
  function product(foldable) {
    return Z.reduce(mult, 1, foldable);
  }
  S.product =
  def('product',
      {f: [Z.Foldable]},
      [f($.FiniteNumber), $.FiniteNumber],
      product);

  //# div :: NonZeroFiniteNumber -> (FiniteNumber -> FiniteNumber)
  //.
  //. Takes a non-zero finite number `n` and returns the _divide by `n`_
  //. function.
  //.
  //. See also [`div_`](#div_).
  //.
  //. ```javascript
  //. > S.map(S.div(2), [0, 1, 2, 3])
  //. [0, 0.5, 1, 1.5]
  //. ```
  S.div =
  def('div',
      {},
      [$.NonZeroFiniteNumber, Fn($.FiniteNumber, $.FiniteNumber)],
      flip$(div_));

  //# div_ :: FiniteNumber -> NonZeroFiniteNumber -> FiniteNumber
  //.
  //. Returns the result of dividing its first argument (a finite number) by
  //. its second argument (a non-zero finite number).
  //.
  //. See also [`div`](#div).
  //.
  //. ```javascript
  //. > S.div_(7, 2)
  //. 3.5
  //.
  //. > S.map(S.div_(24), [1, 2, 3, 4])
  //. [24, 12, 8, 6]
  //. ```
  function div_(x, y) {
    return x / y;
  }
  S.div_ =
  def('div_',
      {},
      [$.FiniteNumber, $.NonZeroFiniteNumber, $.FiniteNumber],
      div_);

  //# pow :: FiniteNumber -> (FiniteNumber -> FiniteNumber)
  //.
  //. Takes a finite number `n` and returns the _power of `n`_ function.
  //.
  //. See also [`pow_`](#pow_).
  //.
  //. ```javascript
  //. > S.map(S.pow(2), [-3, -2, -1, 0, 1, 2, 3])
  //. [9, 4, 1, 0, 1, 4, 9]
  //.
  //. > S.map(S.pow(0.5), [1, 4, 9, 16, 25])
  //. [1, 2, 3, 4, 5]
  //. ```
  S.pow =
  def('pow',
      {},
      [$.FiniteNumber, Fn($.FiniteNumber, $.FiniteNumber)],
      flip$(Math.pow));

  //# pow_ :: FiniteNumber -> FiniteNumber -> FiniteNumber
  //.
  //. Curried version of [`Math.pow`][].
  //.
  //. See also [`pow`](#pow).
  //.
  //. ```javascript
  //. > S.map(S.pow_(10), [-3, -2, -1, 0, 1, 2, 3])
  //. [0.001, 0.01, 0.1, 1, 10, 100, 1000]
  //. ```
  S.pow_ =
  def('pow_', {}, [$.FiniteNumber, $.FiniteNumber, $.FiniteNumber], Math.pow);

  //# mean :: Foldable f => f FiniteNumber -> Maybe FiniteNumber
  //.
  //. Returns the mean of the given array of (finite) numbers.
  //.
  //. ```javascript
  //. > S.mean([1, 2, 3, 4, 5])
  //. Just(3)
  //.
  //. > S.mean([])
  //. Nothing
  //.
  //. > S.mean(S.Just(42))
  //. Just(42)
  //.
  //. > S.mean(S.Nothing)
  //. Nothing
  //. ```
  function mean(foldable) {
    var result = Z.reduce(
      function(acc, n) {
        acc.total += n;
        acc.count += 1;
        return acc;
      },
      {total: 0, count: 0},
      foldable
    );
    return result.count > 0 ? Just(result.total / result.count) : Nothing;
  }
  S.mean =
  def('mean',
      {f: [Z.Foldable]},
      [f($.FiniteNumber), $Maybe($.FiniteNumber)],
      mean);

  //. ### Integer

  //# even :: Integer -> Boolean
  //.
  //. Returns `true` if the given integer is even; `false` if it is odd.
  //.
  //. ```javascript
  //. > S.even(42)
  //. true
  //.
  //. > S.even(99)
  //. false
  //. ```
  function even(n) {
    return n % 2 === 0;
  }
  S.even = def('even', {}, [$.Integer, $.Boolean], even);

  //# odd :: Integer -> Boolean
  //.
  //. Returns `true` if the given integer is odd; `false` if it is even.
  //.
  //. ```javascript
  //. > S.odd(99)
  //. true
  //.
  //. > S.odd(42)
  //. false
  //. ```
  function odd(n) {
    return n % 2 !== 0;
  }
  S.odd = def('odd', {}, [$.Integer, $.Boolean], odd);

  //. ### Parse

  //# parseDate :: String -> Maybe ValidDate
  //.
  //. Takes a string and returns Just the date represented by the string
  //. if it does in fact represent a date; Nothing otherwise.
  //.
  //. ```javascript
  //. > S.parseDate('2011-01-19T17:40:00Z')
  //. Just(new Date('2011-01-19T17:40:00.000Z'))
  //.
  //. > S.parseDate('today')
  //. Nothing
  //. ```
  function parseDate(s) {
    var date = new Date(s);
    return isNaN(date.valueOf()) ? Nothing : Just(date);
  }
  S.parseDate =
  def('parseDate', {}, [$.String, $Maybe($.ValidDate)], parseDate);

  //  requiredNonCapturingGroup :: Array String -> String
  function requiredNonCapturingGroup(xs) {
    return '(?:' + xs.join('|') + ')';
  }

  //  optionalNonCapturingGroup :: Array String -> String
  function optionalNonCapturingGroup(xs) {
    return requiredNonCapturingGroup(xs) + '?';
  }

  //  validFloatRepr :: RegExp
  var validFloatRepr = new RegExp(
    '^' +                     // start-of-string anchor
    '\\s*' +                  // any number of leading whitespace characters
    '[+-]?' +                 // optional sign
    requiredNonCapturingGroup([
      'Infinity',             // "Infinity"
      'NaN',                  // "NaN"
      requiredNonCapturingGroup([
        '[0-9]+',             // number
        '[0-9]+[.][0-9]+',    // number with interior decimal point
        '[0-9]+[.]',          // number with trailing decimal point
        '[.][0-9]+'           // number with leading decimal point
      ]) +
      optionalNonCapturingGroup([
        '[Ee]' +              // "E" or "e"
        '[+-]?' +             // optional sign
        '[0-9]+'              // exponent
      ])
    ]) +
    '\\s*' +                  // any number of trailing whitespace characters
    '$'                       // end-of-string anchor
  );

  //# parseFloat :: String -> Maybe Number
  //.
  //. Takes a string and returns Just the number represented by the string
  //. if it does in fact represent a number; Nothing otherwise.
  //.
  //. ```javascript
  //. > S.parseFloat('-123.45')
  //. Just(-123.45)
  //.
  //. > S.parseFloat('foo.bar')
  //. Nothing
  //. ```
  function parseFloat_(s) {
    return validFloatRepr.test(s) ? Just(parseFloat(s)) : Nothing;
  }
  S.parseFloat =
  def('parseFloat', {}, [$.String, $Maybe($.Number)], parseFloat_);

  //  Radix :: Type
  var Radix = $.NullaryType(
    'sanctuary/Radix',
    '',
    function(x) { return $.Integer._test(x) && x >= 2 && x <= 36; }
  );

  //# parseInt :: Radix -> String -> Maybe Integer
  //.
  //. Takes a radix (an integer between 2 and 36 inclusive) and a string,
  //. and returns Just the number represented by the string if it does in
  //. fact represent a number in the base specified by the radix; Nothing
  //. otherwise.
  //.
  //. This function is stricter than [`parseInt`][parseInt]: a string
  //. is considered to represent an integer only if all its non-prefix
  //. characters are members of the character set specified by the radix.
  //.
  //. ```javascript
  //. > S.parseInt(10, '-42')
  //. Just(-42)
  //.
  //. > S.parseInt(16, '0xFF')
  //. Just(255)
  //.
  //. > S.parseInt(16, '0xGG')
  //. Nothing
  //. ```
  function parseInt_(radix, s) {
    var charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, radix);
    var pattern = new RegExp('^[' + charset + ']+$', 'i');

    var t = s.replace(/^[+-]/, '');
    if (pattern.test(radix === 16 ? t.replace(/^0x/i, '') : t)) {
      var n = parseInt(s, radix);
      if ($.Integer._test(n)) return Just(n);
    }
    return Nothing;
  }
  S.parseInt =
  def('parseInt', {}, [Radix, $.String, $Maybe($.Integer)], parseInt_);

  //# parseJson :: (Any -> Boolean) -> String -> Maybe a
  //.
  //. Takes a predicate and a string which may or may not be valid JSON, and
  //. returns Just the result of applying `JSON.parse` to the string *if* the
  //. result satisfies the predicate; Nothing otherwise.
  //.
  //. ```javascript
  //. > S.parseJson($.test([], $.Array($.Integer)), '[')
  //. Nothing
  //.
  //. > S.parseJson($.test([], $.Array($.Integer)), '["1","2","3"]')
  //. Nothing
  //.
  //. > S.parseJson($.test([], $.Array($.Integer)), '[0,1.5,3,4.5]')
  //. Nothing
  //.
  //. > S.parseJson($.test([], $.Array($.Integer)), '[1,2,3]')
  //. Just([1, 2, 3])
  //. ```
  function parseJson(pred, s) {
    return Z.filter(pred, encase(JSON.parse, s));
  }
  S.parseJson =
  def('parseJson', {}, [$.Predicate($.Any), $.String, $Maybe(a)], parseJson);

  //. ### RegExp

  //  Match :: Type
  var Match = $.RecordType({
    match: $.String,
    groups: $.Array($Maybe($.String))
  });

  //  toMatch :: Array String? -> Match
  function toMatch(ss) {
    return {match: ss[0], groups: ss.slice(1).map(toMaybe)};
  }

  //  withRegex :: (RegExp, () -> a) -> a
  function withRegex(pattern, thunk) {
    var lastIndex = pattern.lastIndex;
    var result = thunk();
    pattern.lastIndex = lastIndex;
    return result;
  }

  //# regex :: RegexFlags -> String -> RegExp
  //.
  //. Takes a [RegexFlags][] and a pattern, and returns a RegExp.
  //.
  //. ```javascript
  //. > S.regex('g', ':\\d+:')
  //. /:\d+:/g
  //. ```
  function regex(flags, source) {
    return new RegExp(source, flags);
  }
  S.regex = def('regex', {}, [$.RegexFlags, $.String, $.RegExp], regex);

  //# regexEscape :: String -> String
  //.
  //. Takes a string which may contain regular expression metacharacters,
  //. and returns a string with those metacharacters escaped.
  //.
  //. Properties:
  //.
  //.   - `forall s :: String. S.test(S.regex('', S.regexEscape(s)), s) = true`
  //.
  //. ```javascript
  //. > S.regexEscape('-=*{XYZ}*=-')
  //. '\\-=\\*\\{XYZ\\}\\*=\\-'
  //. ```
  function regexEscape(s) {
    return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  S.regexEscape = def('regexEscape', {}, [$.String, $.String], regexEscape);

  //# test :: RegExp -> String -> Boolean
  //.
  //. Takes a pattern and a string, and returns `true` [iff][] the pattern
  //. matches the string.
  //.
  //. ```javascript
  //. > S.test(/^a/, 'abacus')
  //. true
  //.
  //. > S.test(/^a/, 'banana')
  //. false
  //. ```
  function test(pattern, s) {
    return withRegex(pattern, function() { return pattern.test(s); });
  }
  S.test = def('test', {}, [$.RegExp, $.String, $.Boolean], test);

  //# match :: NonGlobalRegExp -> String -> Maybe { match :: String, groups :: Array (Maybe String) }
  //.
  //. Takes a pattern and a string, and returns Just a match record if the
  //. pattern matches the string; Nothing otherwise.
  //.
  //. `groups :: Array (Maybe String)` acknowledges the existence of optional
  //. capturing groups.
  //.
  //. Properties:
  //.
  //.   - `forall p :: Pattern, s :: String.
  //.      S.head(S.matchAll(S.regex('g', p), s)) = S.match(S.regex('', p), s)`
  //.
  //. See also [`matchAll`](#matchAll).
  //.
  //. ```javascript
  //. > S.match(/(good)?bye/, 'goodbye')
  //. Just({match: 'goodbye', groups: [Just('good')]})
  //.
  //. > S.match(/(good)?bye/, 'bye')
  //. Just({match: 'bye', groups: [Nothing]})
  //. ```
  function match(pattern, s) {
    return Z.map(toMatch, toMaybe(s.match(pattern)));
  }
  S.match =
  def('match', {}, [$.NonGlobalRegExp, $.String, $Maybe(Match)], match);

  //# matchAll :: GlobalRegExp -> String -> Array { match :: String, groups :: Array (Maybe String) }
  //.
  //. Takes a pattern and a string, and returns an array of match records.
  //.
  //. `groups :: Array (Maybe String)` acknowledges the existence of optional
  //. capturing groups.
  //.
  //. See also [`match`](#match).
  //.
  //. ```javascript
  //. > S.matchAll(/@([a-z]+)/g, 'Hello, world!')
  //. []
  //.
  //. > S.matchAll(/@([a-z]+)/g, 'Hello, @foo! Hello, @bar! Hello, @baz!')
  //. [ {match: '@foo', groups: [Just('foo')]},
  //. . {match: '@bar', groups: [Just('bar')]},
  //. . {match: '@baz', groups: [Just('baz')]} ]
  //. ```
  function matchAll(pattern, s) {
    return withRegex(pattern, function() {
      return unfoldr(function(_) {
        return Z.map(function(ss) {
          return [toMatch(ss), null];
        }, toMaybe(pattern.exec(s)));
      }, []);
    });
  }
  S.matchAll =
  def('matchAll', {}, [$.GlobalRegExp, $.String, $.Array(Match)], matchAll);

  //. ### String

  //# toUpper :: String -> String
  //.
  //. Returns the upper-case equivalent of its argument.
  //.
  //. See also [`toLower`](#toLower).
  //.
  //. ```javascript
  //. > S.toUpper('ABC def 123')
  //. 'ABC DEF 123'
  //. ```
  function toUpper(s) {
    return s.toUpperCase();
  }
  S.toUpper = def('toUpper', {}, [$.String, $.String], toUpper);

  //# toLower :: String -> String
  //.
  //. Returns the lower-case equivalent of its argument.
  //.
  //. See also [`toUpper`](#toUpper).
  //.
  //. ```javascript
  //. > S.toLower('ABC def 123')
  //. 'abc def 123'
  //. ```
  function toLower(s) {
    return s.toLowerCase();
  }
  S.toLower = def('toLower', {}, [$.String, $.String], toLower);

  //# trim :: String -> String
  //.
  //. Strips leading and trailing whitespace characters.
  //.
  //. ```javascript
  //. > S.trim('\t\t foo bar \n')
  //. 'foo bar'
  //. ```
  function trim(s) {
    return s.trim();
  }
  S.trim = def('trim', {}, [$.String, $.String], trim);

  //# stripPrefix :: String -> String -> Maybe String
  //.
  //. Returns Just the portion of the given string (the second argument) left
  //. after removing the given prefix (the first argument) if the string starts
  //. with the prefix; Nothing otherwise.
  //.
  //. See also [`stripSuffix`](#stripSuffix).
  //.
  //. ```javascript
  //. > S.stripPrefix('https://', 'https://sanctuary.js.org')
  //. Just('sanctuary.js.org')
  //.
  //. > S.stripPrefix('https://', 'http://sanctuary.js.org')
  //. Nothing
  //. ```
  function stripPrefix(prefix, s) {
    var idx = prefix.length;
    return s.slice(0, idx) === prefix ? Just(s.slice(idx)) : Nothing;
  }
  S.stripPrefix =
  def('stripPrefix', {}, [$.String, $.String, $Maybe($.String)], stripPrefix);

  //# stripSuffix :: String -> String -> Maybe String
  //.
  //. Returns Just the portion of the given string (the second argument) left
  //. after removing the given suffix (the first argument) if the string ends
  //. with the suffix; Nothing otherwise.
  //.
  //. See also [`stripPrefix`](#stripPrefix).
  //.
  //. ```javascript
  //. > S.stripSuffix('.md', 'README.md')
  //. Just('README')
  //.
  //. > S.stripSuffix('.md', 'README')
  //. Nothing
  //. ```
  function stripSuffix(suffix, s) {
    var idx = s.length - suffix.length;  // value may be negative
    return s.slice(idx) === suffix ? Just(s.slice(0, idx)) : Nothing;
  }
  S.stripSuffix =
  def('stripSuffix', {}, [$.String, $.String, $Maybe($.String)], stripSuffix);

  //# words :: String -> Array String
  //.
  //. Takes a string and returns the array of words the string contains
  //. (words are delimited by whitespace characters).
  //.
  //. See also [`unwords`](#unwords).
  //.
  //. ```javascript
  //. > S.words(' foo bar baz ')
  //. ['foo', 'bar', 'baz']
  //. ```
  function words(s) {
    var words = s.split(/\s+/);
    return words.slice(words[0] === '' ? 1 : 0,
                       words[words.length - 1] === '' ? -1 : Infinity);
  }
  S.words = def('words', {}, [$.String, $.Array($.String)], words);

  //# unwords :: Array String -> String
  //.
  //. Takes an array of words and returns the result of joining the words
  //. with separating spaces.
  //.
  //. See also [`words`](#words).
  //.
  //. ```javascript
  //. > S.unwords(['foo', 'bar', 'baz'])
  //. 'foo bar baz'
  //. ```
  function unwords(xs) {
    return xs.join(' ');
  }
  S.unwords = def('unwords', {}, [$.Array($.String), $.String], unwords);

  //# lines :: String -> Array String
  //.
  //. Takes a string and returns the array of lines the string contains
  //. (lines are delimited by newlines: `'\n'` or `'\r\n'` or `'\r'`).
  //. The resulting strings do not contain newlines.
  //.
  //. See also [`unlines`](#unlines).
  //.
  //. ```javascript
  //. > S.lines('foo\nbar\nbaz\n')
  //. ['foo', 'bar', 'baz']
  //. ```
  function lines(s) {
    var match = s.replace(/\r\n?/g, '\n').match(/^(?=[\s\S]).*/gm);
    return match == null ? [] : match;
  }
  S.lines = def('lines', {}, [$.String, $.Array($.String)], lines);

  //# unlines :: Array String -> String
  //.
  //. Takes an array of lines and returns the result of joining the lines
  //. after appending a terminating line feed (`'\n'`) to each.
  //.
  //. See also [`lines`](#lines).
  //.
  //. ```javascript
  //. > S.unlines(['foo', 'bar', 'baz'])
  //. 'foo\nbar\nbaz\n'
  //. ```
  function unlines(xs) {
    return Z.reduce(function(s, x) { return s + x + '\n'; }, '', xs);
  }
  S.unlines = def('unlines', {}, [$.Array($.String), $.String], unlines);

  //# splitOn :: String -> String -> Array String
  //.
  //. Returns the substrings of its second argument separated by occurrences
  //. of its first argument.
  //.
  //. See also [`joinWith`](#joinWith) and [`splitOnRegex`](#splitOnRegex).
  //.
  //. ```javascript
  //. > S.splitOn('::', 'foo::bar::baz')
  //. ['foo', 'bar', 'baz']
  //. ```
  function splitOn(separator, s) {
    return s.split(separator);
  }
  S.splitOn =
  def('splitOn', {}, [$.String, $.String, $.Array($.String)], splitOn);

  //# splitOnRegex :: GlobalRegExp -> String -> Array String
  //.
  //. Takes a pattern and a string, and returns the result of splitting the
  //. string at every non-overlapping occurrence of the pattern.
  //.
  //. Properties:
  //.
  //.   - `forall s :: String, t :: String.
  //.      S.joinWith(s, S.splitOnRegex(S.regex('g', S.regexEscape(s)), t))
  //.      = t`
  //.
  //. See also [`splitOn`](#splitOn).
  //.
  //. ```javascript
  //. > S.splitOnRegex(/[,;][ ]*/g, 'foo, bar, baz')
  //. ['foo', 'bar', 'baz']
  //.
  //. > S.splitOnRegex(/[,;][ ]*/g, 'foo;bar;baz')
  //. ['foo', 'bar', 'baz']
  //. ```
  function splitOnRegex(pattern, s) {
    return withRegex(pattern, function() {
      var result = [];
      var lastIndex = 0;
      var match;
      while ((match = pattern.exec(s)) != null) {
        if (pattern.lastIndex === lastIndex && match[0] === '') {
          if (pattern.lastIndex === s.length) return result;
          pattern.lastIndex += 1;
        } else {
          result.push(s.slice(lastIndex, match.index));
          lastIndex = match.index + match[0].length;
        }
      }
      result.push(s.slice(lastIndex));
      return result;
    });
  }
  S.splitOnRegex =
  def('splitOnRegex',
      {},
      [$.GlobalRegExp, $.String, $.Array($.String)],
      splitOnRegex);

  return S;

  /* eslint-enable indent */

  }

  return createSanctuary({checkTypes: true, env: defaultEnv});

}));

//. [$.Array]:          v:sanctuary-js/sanctuary-def#Array
//. [$.String]:         v:sanctuary-js/sanctuary-def#String
//. [Alt]:              v:fantasyland/fantasy-land#alt
//. [Alternative]:      v:fantasyland/fantasy-land#alternative
//. [Applicative]:      v:fantasyland/fantasy-land#applicative
//. [Apply]:            v:fantasyland/fantasy-land#apply
//. [Bifunctor]:        v:fantasyland/fantasy-land#bifunctor
//. [BinaryType]:       v:sanctuary-js/sanctuary-def#BinaryType
//. [Either]:           #either-type
//. [Extend]:           v:fantasyland/fantasy-land#extend
//. [Fantasy Land]:     v:fantasyland/fantasy-land
//. [Foldable]:         v:fantasyland/fantasy-land#foldable
//. [Haskell]:          https://www.haskell.org/
//. [Maybe]:            #maybe-type
//. [Monad]:            v:fantasyland/fantasy-land#monad
//. [Monoid]:           v:fantasyland/fantasy-land#monoid
//. [Nullable]:         v:sanctuary-js/sanctuary-def#Nullable
//. [Ord]:              v:fantasyland/fantasy-land#ord
//. [PureScript]:       http://www.purescript.org/
//. [Ramda]:            http://ramdajs.com/
//. [RegexFlags]:       v:sanctuary-js/sanctuary-def#RegexFlags
//. [Semigroup]:        v:fantasyland/fantasy-land#semigroup
//. [Semigroupoid]:     v:fantasyland/fantasy-land#semigroupoid
//. [Traversable]:      v:fantasyland/fantasy-land#traversable
//. [UnaryType]:        v:sanctuary-js/sanctuary-def#UnaryType
//. [`Math.pow`]:       https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow
//. [`Z.alt`]:          v:sanctuary-js/sanctuary-type-classes#alt
//. [`Z.ap`]:           v:sanctuary-js/sanctuary-type-classes#ap
//. [`Z.apFirst`]:      v:sanctuary-js/sanctuary-type-classes#apFirst
//. [`Z.apSecond`]:     v:sanctuary-js/sanctuary-type-classes#apSecond
//. [`Z.bimap`]:        v:sanctuary-js/sanctuary-type-classes#bimap
//. [`Z.chain`]:        v:sanctuary-js/sanctuary-type-classes#chain
//. [`Z.chainRec`]:     v:sanctuary-js/sanctuary-type-classes#chainRec
//. [`Z.compose`]:      v:sanctuary-js/sanctuary-type-classes#compose
//. [`Z.concat`]:       v:sanctuary-js/sanctuary-type-classes#concat
//. [`Z.contramap`]:    v:sanctuary-js/sanctuary-type-classes#contramap
//. [`Z.empty`]:        v:sanctuary-js/sanctuary-type-classes#empty
//. [`Z.equals`]:       v:sanctuary-js/sanctuary-type-classes#equals
//. [`Z.extend`]:       v:sanctuary-js/sanctuary-type-classes#extend
//. [`Z.extract`]:      v:sanctuary-js/sanctuary-type-classes#extract
//. [`Z.filter`]:       v:sanctuary-js/sanctuary-type-classes#filter
//. [`Z.filterM`]:      v:sanctuary-js/sanctuary-type-classes#filterM
//. [`Z.gt`]:           v:sanctuary-js/sanctuary-type-classes#gt
//. [`Z.gte`]:          v:sanctuary-js/sanctuary-type-classes#gte
//. [`Z.id`]:           v:sanctuary-js/sanctuary-type-classes#id
//. [`Z.invert`]:       v:sanctuary-js/sanctuary-type-classes#invert
//. [`Z.join`]:         v:sanctuary-js/sanctuary-type-classes#join
//. [`Z.lt`]:           v:sanctuary-js/sanctuary-type-classes#lt
//. [`Z.lte`]:          v:sanctuary-js/sanctuary-type-classes#lte
//. [`Z.map`]:          v:sanctuary-js/sanctuary-type-classes#map
//. [`Z.of`]:           v:sanctuary-js/sanctuary-type-classes#of
//. [`Z.promap`]:       v:sanctuary-js/sanctuary-type-classes#promap
//. [`Z.sequence`]:     v:sanctuary-js/sanctuary-type-classes#sequence
//. [`Z.toString`]:     v:sanctuary-js/sanctuary-type-classes#toString
//. [`Z.traverse`]:     v:sanctuary-js/sanctuary-type-classes#traverse
//. [`Z.zero`]:         v:sanctuary-js/sanctuary-type-classes#zero
//. [`of`]:             v:fantasyland/fantasy-land#of-method
//. [equivalence]:      https://en.wikipedia.org/wiki/Equivalence_relation
//. [iff]:              https://en.wikipedia.org/wiki/If_and_only_if
//. [parseInt]:         https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
//. [sanctuary-def]:    v:sanctuary-js/sanctuary-def
//. [stable sort]:      https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
//. [thrush]:           https://github.com/raganwald-deprecated/homoiconic/blob/master/2008-10-30/thrush.markdown
//. [type identifier]:  v:sanctuary-js/sanctuary-type-identifiers
//.
//. [`Either#fantasy-land/bimap`]:      #Either.prototype.fantasy-land/bimap
//. [`Either#fantasy-land/map`]:        #Either.prototype.fantasy-land/map
//. [`Either#toString`]:                #Either.prototype.toString
//. [`Maybe#toString`]:                 #Maybe.prototype.toString

},{"sanctuary-def":325,"sanctuary-type-classes":326,"sanctuary-type-identifiers":328}],330:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('s-js')) :
	typeof define === 'function' && define.amd ? define(['exports', 's-js'], factory) :
	(factory((global.Surplus = {}),global.S));
}(this, (function (exports,S) { 'use strict';

S = S && S.hasOwnProperty('default') ? S['default'] : S;

var TEXT_NODE = 3;
function insert(range, value) {
    var parent = range.start.parentNode, test = range.start, good = null, t = typeof value;
    //if (parent === null) {
    //    throw new Error("Surplus.insert() can only be used on a node that has a parent node. \n"
    //        + "Node ``" + range.start + "'' is currently unattached to a parent.");
    //}
    //if (range.end.parentNode !== parent) {
    //    throw new Error("Surplus.insert() requires that the inserted nodes remain sibilings \n"
    //        + "of the original node.  The DOM has been modified such that this is \n"
    //        + "no longer the case.");
    //}
    if (t === 'string' || t === 'number') {
        value = value.toString();
        if (test.nodeType === TEXT_NODE) {
            test.data = value;
            good = test;
        }
        else {
            value = document.createTextNode(value);
            parent.replaceChild(value, test);
            if (range.end === test)
                range.end = value;
            range.start = good = value;
        }
    }
    else if (value instanceof Node) {
        if (test !== value) {
            parent.replaceChild(value, test);
            if (range.end === test)
                range.end = value;
            range.start = value;
        }
        good = value;
    }
    else if (Array.isArray(value)) {
        insertArray(value);
    }
    else if (value instanceof Function) {
        S(function () {
            insert(range, value());
        });
        good = range.end;
    }
    else if (value !== null && value !== undefined && value !== true && value !== false) {
        value = value.toString();
        if (test.nodeType === TEXT_NODE) {
            test.data = value;
            good = test;
        }
        else {
            value = document.createTextNode(value);
            parent.replaceChild(value, test);
            if (range.end === test)
                range.end = value;
            range.start = good = value;
        }
    }
    if (good === null) {
        if (range.start === parent.firstChild && range.end === parent.lastChild && range.start !== range.end) {
            // fast delete entire contents
            parent.textContent = "";
            value = document.createTextNode("");
            parent.appendChild(value);
            good = range.start = range.end = value;
        }
        else if (test.nodeType === TEXT_NODE) {
            test.data = "";
            good = test;
        }
        else {
            value = document.createTextNode("");
            parent.replaceChild(value, test);
            if (range.end === test)
                range.end = value;
            range.start = good = value;
        }
    }
    // remove anything left after the good cursor from the insert range
    while (good !== range.end) {
        test = range.end;
        range.end = test.previousSibling;
        parent.removeChild(test);
    }
    return range;
    function insertArray(array) {
        for (var i = 0, len = array.length; i < len; i++) {
            var value = array[i];
            if (good === range.end) {
                if (value instanceof Node) {
                    good = range.end = (good.nextSibling ? parent.insertBefore(value, good.nextSibling) : parent.appendChild(value));
                }
                else if (value instanceof Array) {
                    insertArray(value);
                }
                else if (value !== null && value !== undefined && value !== false && value !== true) {
                    value = document.createTextNode(value.toString());
                    good = range.end = (good.nextSibling ? parent.insertBefore(value, good.nextSibling) : parent.appendChild(value));
                }
            }
            else {
                if (value instanceof Node) {
                    if (test !== value) {
                        if (good === null) {
                            if (range.end === value)
                                range.end = value.previousSibling;
                            parent.replaceChild(value, test);
                            range.start = value;
                            if (range.end === test)
                                range.end = value;
                            test = value.nextSibling;
                        }
                        else {
                            if (test.nextSibling === value && test !== value.nextSibling && test !== range.end) {
                                parent.removeChild(test);
                                test = value.nextSibling;
                            }
                            else {
                                if (range.end === value)
                                    range.end = value.previousSibling;
                                parent.insertBefore(value, test);
                            }
                        }
                    }
                    else {
                        test = test.nextSibling;
                    }
                    good = value;
                }
                else if (value instanceof Array) {
                    insertArray(value);
                }
                else if (value !== null && value !== undefined && value !== true && value !== false) {
                    value = value.toString();
                    if (test.nodeType === TEXT_NODE) {
                        test.data = value;
                        if (good === null)
                            range.start = test;
                        good = test, test = good.nextSibling;
                    }
                    else {
                        value = document.createTextNode(value);
                        parent.insertBefore(value, test);
                        if (good === null)
                            range.start = value;
                        good = value;
                    }
                }
            }
        }
    }
}

function content(parent, value, current) {
    var t = typeof value;
    if (current === value) {
        // nothing to do
    }
    else if (t === 'string') {
        // if a Text node already exists, it's faster to set its .data than set the parent.textContent
        if (current !== "" && typeof current === 'string') {
            current = parent.firstChild.data = value;
        }
        else {
            current = parent.textContent = value;
        }
    }
    else if (t === 'number') {
        value = value.toString();
        if (current !== "" && typeof current === 'string') {
            current = parent.firstChild.data = value;
        }
        else {
            current = parent.textContent = value;
        }
    }
    else if (value == null || t === 'boolean') {
        clear(parent);
        current = "";
    }
    else if (t === 'function') {
        S(function () {
            current = content(parent, value(), current);
        });
    }
    else if (value instanceof Node) {
        if (Array.isArray(current)) {
            if (current.length === 0) {
                parent.appendChild(value);
            }
            else if (current.length === 1) {
                parent.replaceChild(value, current[0]);
            }
            else {
                clear(parent);
                parent.appendChild(value);
            }
        }
        else if (current === "") {
            parent.appendChild(value);
        }
        else {
            parent.replaceChild(value, parent.firstChild);
        }
        current = value;
    }
    else if (Array.isArray(value)) {
        var array = normalizeIncomingArray([], value);
        if (array.length === 0) {
            clear(parent);
        }
        else {
            if (Array.isArray(current)) {
                if (current.length === 0) {
                    appendNodes(parent, array, 0, array.length);
                }
                else {
                    reconcileArrays(parent, current, array);
                }
            }
            else if (current === "") {
                appendNodes(parent, array, 0, array.length);
            }
            else {
                reconcileArrays(parent, [parent.firstChild], array);
            }
        }
        current = array;
    }
    else {
        throw new Error("content must be Node, stringable, or array of same");
    }
    return current;
}
var NOMATCH = -1;
var NOINSERT = -2;
var RECONCILE_ARRAY_BATCH = 0;
var RECONCILE_ARRAY_BITS = 16;
var RECONCILE_ARRAY_INC = 1 << RECONCILE_ARRAY_BITS;
var RECONCILE_ARRAY_MASK = RECONCILE_ARRAY_INC - 1;
// reconcile the content of parent from ns to us
// see ivi's excellent writeup of diffing arrays in a vdom library: 
// https://github.com/ivijs/ivi/blob/2c81ead934b9128e092cc2a5ef2d3cabc73cb5dd/packages/ivi/src/vdom/implementation.ts#L1187
// this code isn't identical, since we're diffing real dom nodes to nodes-or-strings, 
// but the core methodology of trimming ends and reversals, matching nodes, then using
// the longest increasing subsequence to minimize DOM ops is inspired by ivi.
function reconcileArrays(parent, ns, us) {
    var ulen = us.length, 
    // n = nodes, u = updates
    // ranges defined by min and max indices
    nmin = 0, nmax = ns.length - 1, umin = 0, umax = ulen - 1, 
    // start nodes of ranges
    n = ns[nmin], u = us[umin], 
    // end nodes of ranges
    nx = ns[nmax], ux = us[umax], 
    // node, if any, just after ux, used for doing .insertBefore() to put nodes at end
    ul = nx.nextSibling, i, j, k, loop = true;
    // scan over common prefixes, suffixes, and simple reversals
    fixes: while (loop) {
        loop = false;
        // common prefix, u === n
        while (equable(u, n, umin, us)) {
            umin++;
            nmin++;
            if (umin > umax || nmin > nmax)
                break fixes;
            u = us[umin];
            n = ns[nmin];
        }
        // common suffix, ux === nx
        while (equable(ux, nx, umax, us)) {
            ul = nx;
            umax--;
            nmax--;
            if (umin > umax || nmin > nmax)
                break fixes;
            ux = us[umax];
            nx = ns[nmax];
        }
        // reversal u === nx, have to swap node forward
        while (equable(u, nx, umin, us)) {
            loop = true;
            parent.insertBefore(nx, n);
            umin++;
            nmax--;
            if (umin > umax || nmin > nmax)
                break fixes;
            u = us[umin];
            nx = ns[nmax];
        }
        // reversal ux === n, have to swap node back
        while (equable(ux, n, umax, us)) {
            loop = true;
            if (ul === null)
                parent.appendChild(n);
            else
                parent.insertBefore(n, ul);
            ul = n;
            umax--;
            nmin++;
            if (umin > umax || nmin > nmax)
                break fixes;
            ux = us[umax];
            n = ns[nmin];
        }
    }
    // if that covered all updates, just need to remove any remaining nodes and we're done
    if (umin > umax) {
        // remove any remaining nodes
        while (nmin <= nmax) {
            parent.removeChild(ns[nmax]);
            nmax--;
        }
        return;
    }
    // if that covered all current nodes, just need to insert any remaining updates and we're done
    if (nmin > nmax) {
        // insert any remaining nodes
        while (umin <= umax) {
            insertOrAppend(parent, us[umin], ul, umin, us);
            umin++;
        }
        return;
    }
    // simple cases don't apply, have to actually match up nodes and figure out minimum DOM ops
    // loop through nodes and mark them with a special property indicating their order
    // we'll then go through the updates and look for those properties
    // in case any of the updates have order properties left over from earlier runs, we 
    // use the low bits of the order prop to record a batch identifier.
    // I'd much rather use a Map than a special property, but Maps of objects are really
    // slow currently, like only 100k get/set ops / second
    // for Text nodes, all that matters is their order, as they're easily, interchangeable
    // so we record their positions in ntext[]
    var ntext = [];
    // update global batch identifer
    RECONCILE_ARRAY_BATCH = (RECONCILE_ARRAY_BATCH + 1) % RECONCILE_ARRAY_INC;
    for (i = nmin, j = (nmin << RECONCILE_ARRAY_BITS) + RECONCILE_ARRAY_BATCH; i <= nmax; i++, j += RECONCILE_ARRAY_INC) {
        n = ns[i];
        // add or update special order property
        if (n.__surplus_order === undefined) {
            Object.defineProperty(n, '__surplus_order', { value: j, writable: true });
        }
        else {
            n.__surplus_order = j;
        }
        if (n instanceof Text) {
            ntext.push(i);
        }
    }
    // now loop through us, looking for the order property, otherwise recording NOMATCH
    var src = new Array(umax - umin + 1), utext = [], preserved = 0;
    for (i = umin; i <= umax; i++) {
        u = us[i];
        if (typeof u === 'string') {
            utext.push(i);
            src[i - umin] = NOMATCH;
        }
        else if ((j = u.__surplus_order) !== undefined && (j & RECONCILE_ARRAY_MASK) === RECONCILE_ARRAY_BATCH) {
            j >>= RECONCILE_ARRAY_BITS;
            src[i - umin] = j;
            ns[j] = null;
            preserved++;
        }
        else {
            src[i - umin] = NOMATCH;
        }
    }
    if (preserved === 0 && nmin === 0 && nmax === ns.length - 1) {
        // no nodes preserved, use fast clear and append
        clear(parent);
        while (umin <= umax) {
            insertOrAppend(parent, us[umin], null, umin, us);
            umin++;
        }
        return;
    }
    // find longest common sequence between ns and us, represented as the indices 
    // of the longest increasing subsequence in src
    var lcs = longestPositiveIncreasingSubsequence(src);
    // we know we can preserve their order, so march them as NOINSERT
    for (i = 0; i < lcs.length; i++) {
        src[lcs[i]] = NOINSERT;
    }
    /*
              0   1   2   3   4   5   6   7
    ns    = [ n,  n,  t,  n,  n,  n,  t,  n ]
                  |          /   /       /
                  |        /   /       /
                  +------/---/-------/----+
                       /   /       /      |
    us    = [ n,  s,  n,  n,  s,  n,  s,  n ]
    src   = [-1, -1,  4,  5, -1,  7, -1,  1 ]
    lis   = [         2,  3,      5]
                      j
    utext = [     1,          4,      6 ]
                  i
    ntext = [         2,              6 ]
                      k
    */
    // replace strings in us with Text nodes, reusing Text nodes from ns when we can do so without moving them
    var utexti = 0, lcsj = 0, ntextk = 0;
    for (i = 0, j = 0, k = 0; i < utext.length; i++) {
        utexti = utext[i];
        // need to answer qeustion "if utext[i] falls between two lcs nodes, is there an ntext between them which we can reuse?"
        // first, find j such that lcs[j] is the first lcs node *after* utext[i]
        while (j < lcs.length && (lcsj = lcs[j]) < utexti - umin)
            j++;
        // now, find k such that ntext[k] is the first ntext *after* lcs[j-1] (or after start, if j === 0)
        while (k < ntext.length && (ntextk = ntext[k], j !== 0) && ntextk < src[lcs[j - 1]])
            k++;
        // if ntext[k] < lcs[j], then we know ntext[k] falls between lcs[j-1] (or start) and lcs[j] (or end)
        // that means we can re-use it without moving it
        if (k < ntext.length && (j === lcs.length || ntextk < src[lcsj])) {
            n = ns[ntextk];
            u = us[utexti];
            if (n.data !== u)
                n.data = u;
            ns[ntextk] = null;
            us[utexti] = n;
            src[utexti] = NOINSERT;
            k++;
        }
        else {
            // if we didn't find one to re-use, make a new Text node
            us[utexti] = document.createTextNode(us[utexti]);
        }
    }
    // remove stale nodes in ns
    while (nmin <= nmax) {
        n = ns[nmin];
        if (n !== null) {
            parent.removeChild(n);
        }
        nmin++;
    }
    // insert new nodes
    while (umin <= umax) {
        ux = us[umax];
        if (src[umax - umin] !== NOINSERT) {
            if (ul === null)
                parent.appendChild(ux);
            else
                parent.insertBefore(ux, ul);
        }
        ul = ux;
        umax--;
    }
}
// two nodes are "equable" if they are identical (===) or if we can make them the same, i.e. they're 
// Text nodes, which we can reuse with the new text
function equable(u, n, i, us) {
    if (u === n) {
        return true;
    }
    else if (typeof u === 'string' && n instanceof Text) {
        if (n.data !== u)
            n.data = u;
        us[i] = n;
        return true;
    }
    else {
        return false;
    }
}
function appendNodes(parent, array, i, end) {
    var node;
    for (; i < end; i++) {
        node = array[i];
        if (node instanceof Node) {
            parent.appendChild(node);
        }
        else {
            node = array[i] = document.createTextNode(node);
            parent.appendChild(node);
        }
    }
}
function insertOrAppend(parent, node, marker, i, us) {
    if (typeof node === 'string') {
        node = us[i] = document.createTextNode(node);
    }
    if (marker === null)
        parent.appendChild(node);
    else
        parent.insertBefore(node, marker);
}
function normalizeIncomingArray(normalized, array) {
    for (var i = 0, len = array.length; i < len; i++) {
        var item = array[i];
        if (item instanceof Node) {
            normalized.push(item);
        }
        else if (item == null || item === true || item === false) {
            // skip
        }
        else if (Array.isArray(item)) {
            normalizeIncomingArray(normalized, item);
        }
        else if (typeof item === 'string') {
            normalized.push(item);
        }
        else {
            normalized.push(item.toString());
        }
    }
    return normalized;
}
function clear(node) {
    node.textContent = "";
}
// return an array of the indices of ns that comprise the longest increasing subsequence within ns
function longestPositiveIncreasingSubsequence(ns) {
    var seq = [], is = [], l = -1, pre = new Array(ns.length);
    for (var i = 0, len = ns.length; i < len; i++) {
        var n = ns[i];
        if (n < 0)
            continue;
        var j = findGreatestIndexLEQ(seq, n);
        if (j !== -1)
            pre[i] = is[j];
        if (j === l) {
            l++;
            seq[l] = n;
            is[l] = i;
        }
        else if (n < seq[j + 1]) {
            seq[j + 1] = n;
            is[j + 1] = i;
        }
    }
    for (i = is[l]; l >= 0; i = pre[i], l--) {
        seq[l] = i;
    }
    return seq;
}
function findGreatestIndexLEQ(seq, n) {
    // invariant: lo is guaranteed to be index of a value <= n, hi to be >
    // therefore, they actually start out of range: (-1, last + 1)
    var lo = -1, hi = seq.length;
    // fast path for simple increasing sequences
    if (hi > 0 && seq[hi - 1] <= n)
        return hi - 1;
    while (hi - lo > 1) {
        var mid = Math.floor((lo + hi) / 2);
        if (seq[mid] > n) {
            hi = mid;
        }
        else {
            lo = mid;
        }
    }
    return lo;
}

var svgNS = "http://www.w3.org/2000/svg";
function createElement(tag, className, parent) {
    var el = document.createElement(tag);
    if (className)
        el.className = className;
    if (parent)
        parent.appendChild(el);
    return el;
}
function createSvgElement(tag, className, parent) {
    var el = document.createElementNS(svgNS, tag);
    if (className)
        el.setAttribute("class", className);
    if (parent)
        parent.appendChild(el);
    return el;
}
function createComment(text, parent) {
    var comment = document.createComment(text);
    parent.appendChild(comment);
    return comment;
}
function createTextNode(text, parent) {
    var node = document.createTextNode(text);
    parent.appendChild(node);
    return node;
}
function setAttribute(node, name, value) {
    if (value === false || value === null || value === undefined)
        node.removeAttribute(name);
    else
        node.setAttribute(name, value);
}
function setAttributeNS(node, namespace, name, value) {
    if (value === false || value === null || value === undefined)
        node.removeAttributeNS(namespace, name);
    else
        node.setAttributeNS(namespace, name, value);
}

var htmlFieldCache = {
    // special props
    style: ['style', null, 3 /* Assign */],
    ref: ['ref', null, 2 /* Ignore */],
    fn: ['fn', null, 2 /* Ignore */],
    // attr compat
    class: ['className', null, 0 /* Property */],
    for: ['htmlFor', null, 0 /* Property */],
    "accept-charset": ['acceptCharset', null, 0 /* Property */],
    "http-equiv": ['httpEquiv', null, 0 /* Property */],
    // a few React oddities, mostly disagreeing about casing
    onDoubleClick: ['ondblclick', null, 0 /* Property */],
    spellCheck: ['spellcheck', null, 0 /* Property */],
    allowFullScreen: ['allowFullscreen', null, 0 /* Property */],
    autoCapitalize: ['autocapitalize', null, 0 /* Property */],
    autoFocus: ['autofocus', null, 0 /* Property */],
    autoPlay: ['autoplay', null, 0 /* Property */],
    // other
    // role is part of the ARIA spec but not caught by the aria- attr filter
    role: ['role', null, 1 /* Attribute */]
};
var svgFieldCache = {
    // special props
    style: ['style', null, 3 /* Assign */],
    ref: ['ref', null, 2 /* Ignore */],
    fn: ['fn', null, 2 /* Ignore */],
    // property compat
    className: ['class', null, 1 /* Attribute */],
    htmlFor: ['for', null, 1 /* Attribute */],
    tabIndex: ['tabindex', null, 1 /* Attribute */],
    // React compat
    onDoubleClick: ['ondblclick', null, 0 /* Property */],
    // attributes with eccentric casing - some SVG attrs are snake-cased, some camelCased
    allowReorder: ['allowReorder', null, 1 /* Attribute */],
    attributeName: ['attributeName', null, 1 /* Attribute */],
    attributeType: ['attributeType', null, 1 /* Attribute */],
    autoReverse: ['autoReverse', null, 1 /* Attribute */],
    baseFrequency: ['baseFrequency', null, 1 /* Attribute */],
    calcMode: ['calcMode', null, 1 /* Attribute */],
    clipPathUnits: ['clipPathUnits', null, 1 /* Attribute */],
    contentScriptType: ['contentScriptType', null, 1 /* Attribute */],
    contentStyleType: ['contentStyleType', null, 1 /* Attribute */],
    diffuseConstant: ['diffuseConstant', null, 1 /* Attribute */],
    edgeMode: ['edgeMode', null, 1 /* Attribute */],
    externalResourcesRequired: ['externalResourcesRequired', null, 1 /* Attribute */],
    filterRes: ['filterRes', null, 1 /* Attribute */],
    filterUnits: ['filterUnits', null, 1 /* Attribute */],
    gradientTransform: ['gradientTransform', null, 1 /* Attribute */],
    gradientUnits: ['gradientUnits', null, 1 /* Attribute */],
    kernelMatrix: ['kernelMatrix', null, 1 /* Attribute */],
    kernelUnitLength: ['kernelUnitLength', null, 1 /* Attribute */],
    keyPoints: ['keyPoints', null, 1 /* Attribute */],
    keySplines: ['keySplines', null, 1 /* Attribute */],
    keyTimes: ['keyTimes', null, 1 /* Attribute */],
    lengthAdjust: ['lengthAdjust', null, 1 /* Attribute */],
    limitingConeAngle: ['limitingConeAngle', null, 1 /* Attribute */],
    markerHeight: ['markerHeight', null, 1 /* Attribute */],
    markerUnits: ['markerUnits', null, 1 /* Attribute */],
    maskContentUnits: ['maskContentUnits', null, 1 /* Attribute */],
    maskUnits: ['maskUnits', null, 1 /* Attribute */],
    numOctaves: ['numOctaves', null, 1 /* Attribute */],
    pathLength: ['pathLength', null, 1 /* Attribute */],
    patternContentUnits: ['patternContentUnits', null, 1 /* Attribute */],
    patternTransform: ['patternTransform', null, 1 /* Attribute */],
    patternUnits: ['patternUnits', null, 1 /* Attribute */],
    pointsAtX: ['pointsAtX', null, 1 /* Attribute */],
    pointsAtY: ['pointsAtY', null, 1 /* Attribute */],
    pointsAtZ: ['pointsAtZ', null, 1 /* Attribute */],
    preserveAlpha: ['preserveAlpha', null, 1 /* Attribute */],
    preserveAspectRatio: ['preserveAspectRatio', null, 1 /* Attribute */],
    primitiveUnits: ['primitiveUnits', null, 1 /* Attribute */],
    refX: ['refX', null, 1 /* Attribute */],
    refY: ['refY', null, 1 /* Attribute */],
    repeatCount: ['repeatCount', null, 1 /* Attribute */],
    repeatDur: ['repeatDur', null, 1 /* Attribute */],
    requiredExtensions: ['requiredExtensions', null, 1 /* Attribute */],
    requiredFeatures: ['requiredFeatures', null, 1 /* Attribute */],
    specularConstant: ['specularConstant', null, 1 /* Attribute */],
    specularExponent: ['specularExponent', null, 1 /* Attribute */],
    spreadMethod: ['spreadMethod', null, 1 /* Attribute */],
    startOffset: ['startOffset', null, 1 /* Attribute */],
    stdDeviation: ['stdDeviation', null, 1 /* Attribute */],
    stitchTiles: ['stitchTiles', null, 1 /* Attribute */],
    surfaceScale: ['surfaceScale', null, 1 /* Attribute */],
    systemLanguage: ['systemLanguage', null, 1 /* Attribute */],
    tableValues: ['tableValues', null, 1 /* Attribute */],
    targetX: ['targetX', null, 1 /* Attribute */],
    targetY: ['targetY', null, 1 /* Attribute */],
    textLength: ['textLength', null, 1 /* Attribute */],
    viewBox: ['viewBox', null, 1 /* Attribute */],
    viewTarget: ['viewTarget', null, 1 /* Attribute */],
    xChannelSelector: ['xChannelSelector', null, 1 /* Attribute */],
    yChannelSelector: ['yChannelSelector', null, 1 /* Attribute */],
    zoomAndPan: ['zoomAndPan', null, 1 /* Attribute */],
};
var attributeOnlyRx = /-/;
var deepAttrRx = /^style-/;
var isAttrOnlyField = function (field) { return attributeOnlyRx.test(field) && !deepAttrRx.test(field); };
var propOnlyRx = /^(on|style)/;
var isPropOnlyField = function (field) { return propOnlyRx.test(field); };
var propPartRx = /[a-z][A-Z]/g;
var getAttrName = function (field) { return field.replace(propPartRx, function (m) { return m[0] + '-' + m[1]; }).toLowerCase(); };
var jsxEventPropRx = /^on[A-Z]/;
var attrPartRx = /\-(?:[a-z]|$)/g;
var getPropName = function (field) {
    var prop = field.replace(attrPartRx, function (m) { return m.length === 1 ? '' : m[1].toUpperCase(); });
    return jsxEventPropRx.test(prop) ? prop.toLowerCase() : prop;
};
var deepPropRx = /^(style)([A-Z])/;
var buildPropData = function (prop) {
    var m = deepPropRx.exec(prop);
    return m ? [m[2].toLowerCase() + prop.substr(m[0].length), m[1], 0 /* Property */] : [prop, null, 0 /* Property */];
};
var attrNamespaces = {
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
};
var attrNamespaceRx = new RegExp("^(" + Object.keys(attrNamespaces).join('|') + ")-(.*)");
var buildAttrData = function (attr) {
    var m = attrNamespaceRx.exec(attr);
    return m ? [m[2], attrNamespaces[m[1]], 1 /* Attribute */] : [attr, null, 1 /* Attribute */];
};
var getFieldData = function (field, svg) {
    var cache = svg ? svgFieldCache : htmlFieldCache, cached = cache[field];
    if (cached)
        return cached;
    var attr = svg && !isPropOnlyField(field)
        || !svg && isAttrOnlyField(field), name = attr ? getAttrName(field) : getPropName(field);
    if (name !== field && (cached = cache[name]))
        return cached;
    var data = attr ? buildAttrData(name) : buildPropData(name);
    return cache[field] = data;
};

function assign(a, b) {
    var props = Object.keys(b);
    for (var i = 0, len = props.length; i < len; i++) {
        var name = props[i];
        a[name] = b[name];
    }
}
function spread(node, obj, svg) {
    var props = Object.keys(obj);
    for (var i = 0, len = props.length; i < len; i++) {
        var name = props[i];
        setField(node, name, obj[name], svg);
    }
}
function setField(node, field, value, svg) {
    var _a = getFieldData(field, svg), name = _a[0], namespace = _a[1], flags = _a[2], type = flags & 3;
    if (type === 0 /* Property */) {
        if (namespace)
            node = node[namespace];
        node[name] = value;
    }
    else if (type === 1 /* Attribute */) {
        if (namespace)
            setAttributeNS(node, namespace, name, value);
        else
            setAttribute(node, name, value);
    }
    else if (type === 3 /* Assign */) {
        if (value && typeof value === 'object')
            assign(node.style, value);
    }
}

exports.insert = insert;
exports.content = content;
exports.spread = spread;
exports.assign = assign;
exports.S = S;
exports.createElement = createElement;
exports.createSvgElement = createSvgElement;
exports.createComment = createComment;
exports.createTextNode = createTextNode;
exports.setAttribute = setAttribute;
exports.setAttributeNS = setAttributeNS;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{"s-js":324}]},{},[1]);
