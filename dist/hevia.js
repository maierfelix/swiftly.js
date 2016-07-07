(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HEVIA = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "name": "Hevia",
  "version": "0.0.5",
  "description": "Hevia Compiler",
  "license": "BSD",
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/maierfelix/hevia.git"
  },
  "keywords": [
    "Hevia",
    "HeviaJS",
    "Hevia.js",
    "Swift",
    "Compiler",
    "Transpiler",
    "Transcompiler",
    "Swift2JavaScript",
    "Swift2JS",
    "Swift2ES6",
    "ast",
    "ecmascript",
    "javascript",
    "parser",
    "syntax"
  ],
  "author": "Felix Maier <maier.felix96@gmail.com>",
  "bugs": {
    "url": "https://github.com/maierfelix/hevia/issues"
  },
  "homepage": "https://github.com/maierfelix/hevia#readme",
  "scripts": {
    "live": "budo --dir static/ ./src/index.js:dist/hevia.js --live -- -t babelify",
    "dist": "npm run dist-release && npm run dist-uglify",
    "dist-release": "browserify ./src/index.js -t babelify -s HEVIA -o dist/hevia.js",
    "dist-uglify": "uglifyjs dist/hevia.js --compress --mangle > dist/hevia.min.js",
    "dist-test": "npm run dist-release && npm run test",
    "test": "node ./tests/index.js",
    "travis": "npm dist-test"
  },
  "engines": {
    "node": ">= 5.x"
  },
  "dependencies": {
    "babel-runtime": "^6.9.1"
  },
  "devDependencies": {
    "babel-core": "^6.0.20",
    "babel-cli": "^6.1.2",
    "babel-preset-es2015": "^6.1.2",
    "browserify": "^12.0.1",
    "babelify": "^7.2.0",
    "uglify-js": "^2.6.1",
    "babel-loader": "^6.0.1",
    "babel-plugin-transform-runtime": "^6.4.3",
    "babel-preset-stage-0": "^6.3.13",
    "babel-preset-es2015": "^6.9.0",
    "node-libs-browser": "^0.5.3",
    "budo": "^8.3.0"
  }
}
},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compileDeclaration = compileDeclaration;
exports.compileVariableDeclaration = compileVariableDeclaration;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Node} node
 */
function compileDeclaration(node) {

  switch (node.kind) {
    case _labels.Types.VariableDeclaration:
      this.compileVariableDeclaration(node);
      break;
  };
}

/**
 * @param {Node} node
 */
function compileVariableDeclaration(node) {

  var index = 0;

  var init = null;
  var label = null;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = node.declarations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      label = key.kind === _labels.Types.Parameter ? key.init : key;
      init = node.init[index];
      this.scope.register(label);
      index++;
      if (key.kind !== _labels.Types.Parameter) {
        label.resolvedType = this.inferenceExpression(init);
      } else {
        label.resolvedType = key.argument.type;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ;
}

},{"../../labels":43,"../../nodes":44,"../../utils":47}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compileExpression = compileExpression;
exports.compileCallExpression = compileCallExpression;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Node} node
 */
function compileExpression(node) {

  switch (node.kind) {
    case _labels.Types.CallExpression:
      this.compileCallExpression(node);
      break;
  };
}

/**
 * @param {Node} node
 */
function compileCallExpression(node) {}

},{"../../labels":43,"../../nodes":44,"../../utils":47}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compileProgram = compileProgram;
exports.compileBlock = compileBlock;
exports.compileStatement = compileStatement;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Node} node
 */
function compileProgram(node) {
  this.pushScope(node);
  this.compileBlock(node);
}

/**
 * @param {Node} node
 */
function compileBlock(node) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {

    for (var _iterator = node.body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      this.compileStatement(key);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ;
}

/**
 * @param {Node} node
 */
function compileStatement(node) {

  switch (node.kind) {
    /** Loop statement */
    case _labels.Types.ForStatement:
    case _labels.Types.WhileStatement:
    case _labels.Types.RepeatStatement:
      //console.log(node);
      break;
    /** Branch statement */
    case _labels.Types.IfStatement:
    case _labels.Types.GuardStatement:
    case _labels.Types.SwitchStatement:
    case _labels.Types.PseudoProperty:
      //console.log(node);
      break;
    /** Defer statement */
    case _labels.Types.DeferStatement:
      //console.log(node);
      break;
    /** Return statement */
    case _labels.Types.ReturnStatement:
      //console.log(node);
      break;
    /** Do statement */
    case _labels.Types.DoStatement:
      //console.log(node);
      break;
    /** Declaration statement */
    case _labels.Types.ImportStatement:
    case _labels.Types.VariableDeclaration:
    case _labels.Types.FunctionDeclaration:
    case _labels.Types.EnumDeclaration:
    case _labels.Types.StructDeclaration:
    case _labels.Types.ClassDeclaration:
    case _labels.Types.ProtocolDeclaration:
    case _labels.Types.ExtensionDeclaration:
    case _labels.Types.OperatorDeclaration:
      this.compileDeclaration(node);
      break;
    case _labels.Types.CallExpression:
      this.compileExpression(node);
      break;
    /** Expression statement */
    default:
      //console.log(node);
      break;
  };
}

},{"../../labels":43,"../../nodes":44,"../../utils":47}],5:[function(require,module,exports){
"use strict";

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../labels":43,"../../nodes":44,"../../utils":47}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("../utils");

var _scope = require("../scope");

var _scope2 = _interopRequireDefault(_scope);

var _lang = require("./lang");

var pack = _interopRequireWildcard(_lang);

var _inference = require("./inference");

var inference = _interopRequireWildcard(_inference);

var _global = require("../Environment/global");

var globals = _interopRequireWildcard(_global);

var _compile = require("./compile");

var compile = _interopRequireWildcard(_compile);

var _statement = require("./compile/statement");

var statement = _interopRequireWildcard(_statement);

var _expression = require("./compile/expression");

var expression = _interopRequireWildcard(_expression);

var _declaration = require("./compile/declaration");

var declaration = _interopRequireWildcard(_declaration);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Compiler
 * @export
 */

var Compiler = function () {

  /** @constructor */

  function Compiler() {
    _classCallCheck(this, Compiler);

    /**
     * Scope
     * @type {Scope}
     */
    this.scope = null;

    /**
     * Extensions
     * @type {Object}
     */
    this.extensions = {};

    /**
     * Operators
     * @type {Object}
     */
    this.operators = {};

    /**
     * Global objects
     * @type {Object}
     */
    this.global = globals;

    /**
     * Compiled output
     * @type {String}
     */
    this.output = "";
  }

  _createClass(Compiler, [{
    key: "reset",
    value: function reset() {
      this.scope = void 0;
      this.output = "";
      this.operators = {};
      this.extensions = {};
    }

    /** 
     * Write
     * @param {String} str
     */

  }, {
    key: "write",
    value: function write(str) {
      this.output += str;
    }

    /**
     * Enter scope
     * @param {Node} node
     */

  }, {
    key: "pushScope",
    value: function pushScope(node) {
      node.context = new _scope2.default(node, this.scope);
      this.scope = node.context;
    }

    /** Leave scope */

  }, {
    key: "popScope",
    value: function popScope() {
      this.scope = this.scope.parent;
    }

    /**
     * Literal contains type only
     * @param  {Node}  ast
     * @return {Boolean}
     */

  }, {
    key: "isPureType",
    value: function isPureType(node) {
      return node.value === void 0 && node.raw === void 0 && node.type >= 0 || node.type <= 0;
    }

    /**
     * @param {Node} ast
     * @param {String} lang
     * @return {String}
     */

  }, {
    key: "compile",
    value: function compile(ast, lang) {
      this.reset();
      this.scope = void 0;
      this.pushScope(ast.body);
      this.compileProgram(ast.body);
      this.initLanguage(lang);
      this.emitProgram(ast.body);
      return this.output;
    }

    /**
     * @param {String} lang
     */

  }, {
    key: "initLanguage",
    value: function initLanguage(lang) {

      switch (lang) {
        case "JS":
          lang = "JavaScript";
          (0, _utils.inherit)(Compiler, pack.JavaScript);
          break;
        case "JAVA":
          lang = "Java";
          (0, _utils.inherit)(Compiler, pack.Java);
          break;
        default:
          console.error("Unknown target language.");
          break;
      }

      //console.log(`Compiling to ${lang}`);
    }
  }]);

  return Compiler;
}();

exports.default = Compiler;


(0, _utils.inherit)(Compiler, inference);

(0, _utils.inherit)(Compiler, compile);
(0, _utils.inherit)(Compiler, statement);
(0, _utils.inherit)(Compiler, expression);
(0, _utils.inherit)(Compiler, declaration);

},{"../Environment/global":11,"../scope":46,"../utils":47,"./compile":4,"./compile/declaration":2,"./compile/expression":3,"./compile/statement":5,"./inference":7,"./lang":10}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inferenceBlock = inferenceBlock;
exports.inferenceExpression = inferenceExpression;
exports.inferenceTernaryExpression = inferenceTernaryExpression;
exports.inferenceParameterExpression = inferenceParameterExpression;
exports.inferenceMemberExpression = inferenceMemberExpression;
exports.inferenceCallExpression = inferenceCallExpression;
exports.inferenceBinaryExpression = inferenceBinaryExpression;
exports.inferenceLiteral = inferenceLiteral;
exports.globalCheck = globalCheck;

var _labels = require("../labels");

var _nodes = require("../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Node} node
 * @return {Number}
 */
function inferenceBlock(node) {

  var type = null;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = node.body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      type = this.inferenceExpression(key);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ;

  return type;
}

/**
 * @param {Node} node
 * @return {Number}
 */
function inferenceExpression(node) {

  switch (node.kind) {
    case _labels.Types.Literal:
      return this.inferenceLiteral(node);
      break;
    case _labels.Types.BinaryExpression:
      return this.inferenceBinaryExpression(node);
      break;
    case _labels.Types.CallExpression:
      return this.inferenceCallExpression(node);
      break;
    case _labels.Types.MemberExpression:
      return this.inferenceMemberExpression(node);
      break;
    case _labels.Types.ParameterExpression:
      return this.inferenceParameterExpression(node);
      break;
    case _labels.Types.TernaryExpression:
      return this.inferenceTernaryExpression(node);
      break;
    case _labels.Types.Parameter:
      return this.inferenceExpression(node.init);
      break;
    case _labels.Types.ReturnStatement:
      return this.inferenceExpression(node.argument);
      break;
  };
}

/**
 * @param {Node} node
 * @return {Number}
 */
function inferenceTernaryExpression(node) {

  var consequent = this.inferenceExpression(node.consequent);
  var alternate = this.inferenceExpression(node.alternate);

  if (consequent !== alternate) {
    var a = (0, _utils.getNameByLabel)(consequent);
    var b = (0, _utils.getNameByLabel)(alternate);
    throw new Error("Ternary expression has mismatching types " + a + " and " + b);
  }

  return consequent || alternate;
}

/**
 * @param {Node} node
 */
function inferenceParameterExpression(node) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {

    for (var _iterator2 = node.arguments[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var key = _step2.value;

      this.inferenceExpression(key);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  ;
}

/**
 * @param {Node} node
 * @return {Number}
 */
function inferenceMemberExpression(node) {

  var left = this.inferenceExpression(node.object);
  var right = this.inferenceExpression(node.property);

  return left || right;
}

/**
 * @param {Node} node
 * @return {Number}
 */
function inferenceCallExpression(node) {

  var type = this.inferenceExpression(node.callee);

  this.inferenceExpression(node.arguments);

  return type;
}

/**
 * @param {Node} node
 * @return {Number}
 */
function inferenceBinaryExpression(node) {

  if (node.left && node.right) {
    var left = this.inferenceExpression(node.left);
    var right = this.inferenceExpression(node.right);
    return left || right;
  } else {
    if (node.kind === _labels.Types.Literal) {
      if (node.type === _labels.Token.NumericLiteral) {
        return _labels.TokenList[(0, _utils.getNumericType)(Number(node.raw))];
      }
      if (node.type === _labels.Token.Identifier) {
        return this.inferenceExpression(node);
      }
    }
    return node;
  }
}

/**
 * @param {Node} node
 * @return {Number}
 */
function inferenceLiteral(node) {

  if ((0, _utils.isBoolean)(node)) {
    return _labels.TokenList.BOOLEAN;
  }

  var resolved = this.scope.get(node.value);

  if (node.isPointer) {
    if (resolved && resolved.kind === _labels.Types.VariableDeclarement) {
      resolved.isLaterPointer = true;
    } else {
      throw new Error("Can't resolve " + node.value + " declarement!");
    }
  }

  if (resolved && resolved.type) {
    return resolved.type;
  } else {
    this.globalCheck(node);
    return _labels.TokenList[(0, _utils.getNumericType)(Number(node.raw))];
  }
}

function globalCheck(node) {

  if (node.kind === _labels.Types.MemberExpression) {
    if (this.global.hasOwnProperty(node.object.value)) {
      node.object.isGlobal = true;
    }
  } else if (node.kind === _labels.Types.Literal) {
    if (this.global.hasOwnProperty(node.value)) {
      node.isGlobal = true;
    }
  }
}

},{"../labels":43,"../nodes":44,"../utils":47}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitProgram = emitProgram;
exports.emitStartHeader = emitStartHeader;
exports.emitEndHeader = emitEndHeader;
exports.emitOperatorDefinitions = emitOperatorDefinitions;
exports.emitBlock = emitBlock;
exports.emitStatement = emitStatement;
exports.emitIf = emitIf;
exports.emitTernary = emitTernary;
exports.emitParameter = emitParameter;
exports.emitMember = emitMember;
exports.emitCall = emitCall;
exports.emitArguments = emitArguments;
exports.emitDeclaration = emitDeclaration;
exports.emitExtension = emitExtension;
exports.emitVariableDeclaration = emitVariableDeclaration;
exports.emitVariable = emitVariable;
exports.emitMultipleVariable = emitMultipleVariable;
exports.emitBinary = emitBinary;
exports.emitCustomOperator = emitCustomOperator;
exports.emitLiteral = emitLiteral;
exports.emitFunction = emitFunction;
exports.emitReturn = emitReturn;

var _labels = require("../../../labels");

var _nodes = require("../../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("../../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function emitProgram(ast) {
  this.write("\"use strict\";\n");
  this.emitOperatorDefinitions();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = ast.body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var node = _step.value;

      this.emitStatement(node);
      this.write("\n");
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ;
  this.write("\n");
}

function emitStartHeader() {
  this.write("(function(__global) {\n");
}

function emitEndHeader() {
  this.write("})(hevia.global)\n");
}

function emitOperatorDefinitions() {

  if (!Object.keys(this.operators).length) return void 0;

  this.write("var __OP = {\n");

  for (var key in this.operators) {
    this.write("\"" + key + "\"");
    this.write(":");
    this.emitFunction(this.operators[key].func, true);
  };

  this.write("\n}");
}

function emitBlock(ast) {
  this.write(" {");
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = ast.body[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var node = _step2.value;

      this.write("\n");
      this.emitStatement(node);
      this.write(";");
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  ;
  this.write("\n}\n");
}

function emitStatement(ast) {

  switch (ast.kind) {
    /** Loop statement */
    case _labels.Types.ForStatement:
    case _labels.Types.WhileStatement:
    case _labels.Types.RepeatStatement:
      //console.log(ast);
      break;
    /** Branch statement */
    case _labels.Types.GuardStatement:
    case _labels.Types.SwitchStatement:
    case _labels.Types.PseudoProperty:
      //console.log(ast);
      break;
    /** Defer statement */
    case _labels.Types.DeferStatement:
      //console.log(ast);
      break;
    /** Return statement */
    case _labels.Types.ReturnStatement:
      this.emitReturn(ast);
      break;
    /** Do statement */
    case _labels.Types.DoStatement:
      //console.log(ast);
      break;
    /** Declaration statement */
    case _labels.Types.ImportStatement:
    case _labels.Types.VariableDeclaration:
    case _labels.Types.FunctionDeclaration:
    case _labels.Types.EnumDeclaration:
    case _labels.Types.StructDeclaration:
    case _labels.Types.ClassDeclaration:
    case _labels.Types.ProtocolDeclaration:
    case _labels.Types.ExtensionDeclaration:
    case _labels.Types.OperatorDeclaration:
      this.emitDeclaration(ast);
      break;
    case _labels.Types.CallExpression:
      this.emitCall(ast);
      break;
    case _labels.Types.BinaryExpression:
      this.emitBinary(ast);
      break;
    case _labels.Types.MemberExpression:
      this.emitMember(ast);
      break;
    case _labels.Types.Parameter:
      this.emitParameter(ast);
      break;
    case _labels.Types.ParameterExpression:
      this.write("(");
      this.emitArguments(ast);
      this.write(")");
      break;
    case _labels.Types.TernaryExpression:
      this.emitTernary(ast);
      break;
    case _labels.Types.IfStatement:
      this.emitIf(ast);
      break;
    default:
      this.emitBinary(ast);
      break;
  };
}

function emitIf(ast) {

  if (ast.condition) {
    this.write("if (");
    this.emitStatement(ast.condition);
    this.write(")");
  }
  this.emitBlock(ast.consequent);
  if (ast.alternate && ast.alternate.kind === _labels.Types.IfStatement) {
    this.write(" else ");
    this.emitStatement(ast.alternate);
  }
}

function emitTernary(ast) {

  this.emitStatement(ast.condition);
  this.write("?");
  this.emitStatement(ast.consequent);
  this.write(":");
  this.emitStatement(ast.alternate);
}

function emitParameter(ast) {
  /** Labeled call parameter */
  if (ast.init.init !== void 0) {
    this.emitStatement(ast.init.init);
  } else {
    this.emitStatement(ast.init);
  }
}

function emitMember(ast) {

  if (ast.object.kind === _labels.Types.Literal) {
    this.emitLiteral(ast.object);
  } else {
    this.emitStatement(ast.object);
  }

  if (ast.isComputed) {
    this.write("[");
  } else {
    this.write(".");
  }

  if (ast.property.kind === _labels.Types.Literal) {
    this.emitLiteral(ast.property);
  } else {
    this.emitStatement(ast.property);
  }

  if (ast.isComputed) {
    this.write("]");
  }
}

function emitCall(ast) {

  this.emitStatement(ast.callee);

  this.write("(");
  this.emitArguments(ast.arguments);
  this.write(")");
}

function emitArguments(ast) {

  var param = ast.arguments;

  var ii = 0;
  var length = param.length;

  for (; ii < length; ++ii) {
    this.emitStatement(param[ii]);
    if (ii + 1 < length) this.write(", ");
  };
}

function emitDeclaration(ast) {

  switch (ast.kind) {
    case _labels.Types.FunctionDeclaration:
      this.emitFunction(ast, false);
      break;
    case _labels.Types.ExtensionDeclaration:
      this.emitExtension(ast);
      break;
    case _labels.Types.VariableDeclaration:
      this.emitVariableDeclaration(ast);
      break;
  }
}

function emitExtension(ast) {

  this.write("class ");

  this.write("__");

  this.emitLiteral(ast.argument);

  this.write(" {\n");

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = ast.body.body[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var node = _step3.value;

      if (node.kind === _labels.Types.FunctionDeclaration) {
        node.isStatic = true;
        this.emitFunction(node, false, true);
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  ;

  this.write("}");
}

function emitVariableDeclaration(ast) {

  var index = 0;
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = ast.declarations[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var node = _step4.value;

      var init = ast.init[index] || ast.init;
      var symbol = (0, _utils.getNameByLabel)(ast.symbol).toLowerCase() + " ";
      if (node.kind === _labels.Types.ParameterExpression) {
        this.emitMultipleVariable(node, init, symbol);
      } else {
        this.write(symbol);
        this.emitVariable(node, init);
      }
      index++;
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  ;
}

function emitVariable(ast, init) {

  this.write(ast.name || ast.value);
  this.write(" = ");

  if (ast.isLaterPointer) this.write("{\nvalue: ");

  this.emitStatement(init);

  if (ast.isLaterPointer) this.write("\n}");

  this.write(";\n");
}

function emitMultipleVariable(ast, init, symbol) {

  var index = 0;
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = ast.arguments[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var node = _step5.value;

      this.write(symbol);
      this.emitVariable(node.init, init.arguments[index]);
      index++;
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  ;
}

function emitBinary(ast) {

  if (ast.kind === _labels.Types.BinaryExpression) {
    var op = (0, _utils.getLabelByNumber)(ast.operator);
    /** Custom operator call */
    if (op in this.operators) {
      this.emitCustomOperator(ast, op);
      /** Default binary expr */
    } else {
      if (ast.isParenthised) this.write("(");
      this.emitStatement(ast.left);
      op = op === "==" ? "===" : op === "!=" ? "!==" : op;
      this.write(" " + op + " ");
      this.emitStatement(ast.right);
      if (ast.isParenthised) this.write(")");
    }
  } else if (ast.kind === _labels.Types.Literal) {
    this.emitLiteral(ast);
  }
}

function emitCustomOperator(ast, op) {

  this.write("__OP[\"" + op + "\"]");
  this.write("(");
  this.emitStatement(ast.left);
  this.write(", ");
  this.emitStatement(ast.right);
  this.write(")");
}

function emitLiteral(ast) {

  if (ast.init) ast = ast.init;

  if (ast.isGlobal) {
    this.write("__global.");
  }

  var name = this.isPureType(ast) ? (0, _utils.getNameByLabel)(ast.type) : ast.value || ast.name;

  var resolve = this.scope.get(ast.value);

  if (this.isPureType(ast)) {
    if (ast.type === _labels.TokenList.SELF) {
      this.write("this");
    } else {
      this.write((0, _utils.getLabelByNumber)(_labels.TokenList[name]));
    }
  } else {
    this.write(ast.value || ast.name);
  }

  if (resolve && resolve.isLaterPointer) {
    if (ast.isPointer === void 0) {
      this.write(".value");
    }
  } else {
    resolve = this.scope.get(ast.value);
    if (!ast.isReference && resolve && resolve.isReference) {
      this.write(".value");
    }
  }
}

function emitFunction(ast, allowOP, noKeyword) {

  if (!allowOP && ast.name in this.operators) {
    return void 0;
  }

  this.scope = ast.context;

  if (!noKeyword) {
    this.write("function ");
  }

  if (ast.isStatic) {
    this.write("static ");
  }

  if (!allowOP) {
    this.write(ast.name);
  }

  this.write("(");
  this.emitArguments(ast.arguments);
  this.write(")");

  this.emitBlock(ast.body);

  this.popScope();
}

function emitReturn(ast) {

  this.write("return ");

  this.emitStatement(ast.argument);
}

},{"../../../labels":43,"../../../nodes":44,"../../../utils":47}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitProgram = emitProgram;

var _labels = require("../../../labels");

var _nodes = require("../../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("../../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function emitProgram(ast) {
  //this.emitBlock(ast);
}

},{"../../../labels":43,"../../../nodes":44,"../../../utils":47}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JavaScript = exports.Java = undefined;

var _Java2 = require("./Java");

var _Java = _interopRequireWildcard(_Java2);

var _JavaScript2 = require("./JavaScript");

var _JavaScript = _interopRequireWildcard(_JavaScript2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.Java = _Java;
exports.JavaScript = _JavaScript;

},{"./Java":9,"./JavaScript":8}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.print = print;
exports.pow = pow;
exports.expect = expect;
function print() {
  console.log.apply(console, arguments);
}

function pow(rx, pow) {
  return Math.pow(rx, pow);
}

function expect(truth) {
  if (!truth) {
    throw new Error("Expection error!");
  }
}

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseGuardStatement = parseGuardStatement;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @return {Node}
 */
function parseGuardStatement() {
  return null;
}

},{"../../labels":43,"../../nodes":44}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseIfStatement = parseIfStatement;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @return {Node}
 */
function parseIfStatement() {

  var node = new _nodes2.default.IfStatement();

  if (this.eat(_labels.TokenList.IF)) {
    this.eat(_labels.TokenList.LPAREN);
    node.condition = this.parseExpressionStatement();
    this.eat(_labels.TokenList.RPAREN);
  }

  // Consequent
  this.expect(_labels.TokenList.LBRACE);
  node.consequent = this.parseBlock();
  this.expect(_labels.TokenList.RBRACE);

  // Alternate: else|else if
  if (this.eat(_labels.TokenList.ELSE)) {
    node.alternate = this.parseIfStatement();
  }

  return node;
}

},{"../../labels":43,"../../nodes":44}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseBranchStatement = parseBranchStatement;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  [ ] if
  [ ] guard
  [ ] switch
  @return {Node}
*/
function parseBranchStatement() {

  switch (this.current.name) {
    case _labels.TokenList.IF:
      return this.parseIfStatement();
      break;
    case _labels.TokenList.GUARD:
      return this.parseGuardStatement();
      break;
    case _labels.TokenList.SWITCH:
      return this.parseSwitch;
      break;
    case _labels.TokenList.GET:
    case _labels.TokenList.SET:
    case _labels.TokenList.WILLSET:
    case _labels.TokenList.DIDSET:
      return this.parsePseudoProperty();
      break;
  };

  return null;
}

},{"../../labels":43,"../../nodes":44}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parsePseudoProperty = parsePseudoProperty;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @return {Node}
 */
function parsePseudoProperty() {

  // WillSet, didSet, set can have parameters
  var allowParameters = this.peek(_labels.TokenList.SET) || this.peek(_labels.TokenList.WILLSET) || this.peek(_labels.TokenList.DIDSET);

  var node = new _nodes2.default.PseudoProperty();

  node.name = this.current.name;

  this.next();

  if (this.peek(_labels.TokenList.LPAREN) && allowParameters) {
    node.arguments = this.parseArguments();
  }

  this.expect(_labels.TokenList.LBRACE);
  node.body = this.parseBlock();
  this.expect(_labels.TokenList.RBRACE);

  return node;
}

},{"../../labels":43,"../../nodes":44}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseSwitch = parseSwitch;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @return {Node}
 */
function parseSwitch() {
  return null;
}

},{"../../labels":43,"../../nodes":44}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseClass = parseClass;
exports.parseSpecialClass = parseSpecialClass;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @return {Node}
 */
function parseClass() {

  var node = new _nodes2.default.ClassDeclaration();

  this.expect(_labels.TokenList.CLASS);

  if (this.peek(_labels.Token.Identifier)) {
    node.name = this.extract(_labels.Token.Identifier).value;
    // Fake class for a func or var
  } else {
    if (!this.peek(_labels.TokenList.LBRACE)) {
      return this.parseSpecialClass(node);
    }
  }

  if (this.eat(_labels.TokenList.COLON)) {
    node.extend = this.parseCommaSeperatedValues() || [];
  }

  this.expect(_labels.TokenList.LBRACE);
  node.body = this.parseBlock();
  this.expect(_labels.TokenList.RBRACE);

  return node;
}

/**
 * @param  {Node} base
 * @return {Node}
 */
function parseSpecialClass(base) {

  var node = this.parseStatement();

  node.isClassed = true;

  return node;
}

},{"../../labels":43,"../../nodes":44,"../../utils":47}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseExtension = parseExtension;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @return {Node}
 */
function parseExtension() {

  var node = new _nodes2.default.ExtensionDeclaration();

  this.expect(_labels.TokenList.EXTENSION);

  node.argument = this.parseLiteral();

  this.expect(_labels.TokenList.LBRACE);
  node.body = this.parseBlock();
  this.expect(_labels.TokenList.RBRACE);

  return node;
}

},{"../../labels":43,"../../nodes":44}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseFunction = parseFunction;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @return {Node}
 */
function parseFunction() {

  var node = new _nodes2.default.FunctionDeclaration();

  // Optional, so dont expect
  this.eat(_labels.TokenList.FUNCTION);

  node.name = this.parseLiteralHead();

  node.arguments = this.parseArguments();

  if (this.peek(_labels.TokenList.ARROW)) {
    node.type = this.parseStrictType();
  }

  this.expect(_labels.TokenList.LBRACE);
  node.body = this.parseBlock();
  this.expect(_labels.TokenList.RBRACE);

  return node;
}

},{"../../labels":43,"../../nodes":44,"../../utils":47}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseImport = parseImport;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @return {Node}
 */
function parseImport() {
  return null;
}

},{"../../labels":43,"../../nodes":44}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseDeclarationStatement = parseDeclarationStatement;
exports.parseInitializerDeclaration = parseInitializerDeclaration;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  [ ] import
  [x] constant
  [x] variable
  [ ] typealias
  [ ] function
  [ ] enum
  [ ] struct
  [ ] class
  [ ] protocol
  [ ] initializer
  [ ] deinitializer
  [ ] extension
  [ ] subscript
  [ ] operator
  @return {Node}
*/
function parseDeclarationStatement() {

  var node = null;

  switch (this.current.name) {
    case _labels.TokenList.IMPORT:
      node = this.parseImport();
      break;
    case _labels.TokenList.VAR:
    case _labels.TokenList.CONST:
      node = this.parseVariableDeclaration();
      break;
    case _labels.TokenList.TYPEALIAS:
      //
      break;
    case _labels.TokenList.FUNCTION:
      node = this.parseFunction();
      break;
    case _labels.TokenList.ENUM:
      node = this.parseEnum();
      break;
    case _labels.TokenList.STRUCT:
      node = this.parseStruct();
      break;
    case _labels.TokenList.CLASS:
      node = this.parseClass();
      break;
    case _labels.TokenList.PROTOCOL:
      node = this.parseProtocol();
      break;
    case _labels.TokenList.EXTENSION:
      node = this.parseExtension();
      break;
    case _labels.TokenList.INFIX:
    case _labels.TokenList.POSTFIX:
    case _labels.TokenList.PREFIX:
      node = this.parseOperator();
      break;
    case _labels.TokenList.INIT:
      node = this.parseInitializerDeclaration();
      break;
  };

  this.eat(_labels.TokenList.SEMICOLON);

  return node;
}

/*
 * @return {Node}
 */
function parseInitializerDeclaration() {

  var node = new _nodes2.default.InitializerDeclaration();

  this.expect(_labels.TokenList.INIT);

  node.arguments = this.parseArguments();

  this.expect(_labels.TokenList.LBRACE);
  node.body = this.parseBlock();
  this.expect(_labels.TokenList.RBRACE);

  return node;
}

},{"../../labels":43,"../../nodes":44,"../../utils":47}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseOperator = parseOperator;
exports.parseOperatorDeclaration = parseOperatorDeclaration;
exports.parsePrecedenceExpression = parsePrecedenceExpression;
exports.parseAssociativityExpression = parseAssociativityExpression;
exports.getOperatorAssociativity = getOperatorAssociativity;
exports.getOperatorPrecedence = getOperatorPrecedence;

var _labels = require("../../labels");

var _utils = require("../../utils");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _precedence = require("../../precedence");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @return {Node}
 */
function parseOperator() {

  var node = null;

  var type = _labels.TokenList[this.parseLiteralHead()];

  // Operator declaration followed by function
  if (this.peek(_labels.TokenList.FUNCTION)) {
    node = this.parseFunction();
    if (type === _labels.TokenList.PREFIX) {
      node.isPrefix = true;
    } else if (type === _labels.TokenList.POSTFIX) {
      node.isPostfix = true;
    } else {
      throw new Error("Operator parse error");
    }
    (0, _precedence.registerOperator)(node.name, -1, "none", node.name, type);
    // Standard operator declaration
  } else {
    node = this.parseOperatorDeclaration(type);
  }

  return node;
}

/**
 * @return {Node}
 */
function parseOperatorDeclaration(type) {

  var node = new _nodes2.default.OperatorDeclaration();

  this.expect(_labels.TokenList.OPERATOR);

  node.name = type;
  node.operator = this.parseLiteralHead();

  this.expect(_labels.TokenList.LBRACE);
  node.body = this.parseBlock();
  this.expect(_labels.TokenList.RBRACE);

  var associativity = this.getOperatorAssociativity(node.body.body);
  var precedence = this.getOperatorPrecedence(node.body.body);

  if (node.operator) {
    (0, _precedence.registerOperator)(node.operator, precedence, associativity, node.operator, node.name);
  } else {
    // Seems already registered
  }

  return node;
}

/**
 * @return {Node}
 */
function parsePrecedenceExpression() {

  var node = new _nodes2.default.PrecedenceExpression();

  this.expect(_labels.TokenList.PRECEDENCE);

  node.level = this.parseLiteral();

  return node;
}

/**
 * @return {Node}
 */
function parseAssociativityExpression() {

  var node = new _nodes2.default.AssociativityExpression();

  this.expect(_labels.TokenList.ASSOCIATIVITY);

  node.associativity = this.parseLiteral();

  return node;
}

/**
 * @param {Node}
 * @return {String}
 */
function getOperatorAssociativity(body) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {

    for (var _iterator = body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var node = _step.value;

      if (node.kind === _labels.Types.AssociativityExpression) {
        return node.associativity.raw;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ;

  return "none";
}

/**
 * @param {Node}
 * @return {Number}
 */
function getOperatorPrecedence(body) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {

    for (var _iterator2 = body[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var node = _step2.value;

      if (node.kind === _labels.Types.PrecedenceExpression) {
        return Number(node.level.raw);
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  ;

  return -1;
}

},{"../../labels":43,"../../nodes":44,"../../precedence":45,"../../utils":47}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseProtocol = parseProtocol;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @return {Node}
 */
function parseProtocol() {
  return null;
}

},{"../../labels":43,"../../nodes":44}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseStruct = parseStruct;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @return {Node}
 */
function parseStruct() {
  return null;
}

},{"../../labels":43,"../../nodes":44}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseVariableDeclaration = parseVariableDeclaration;
exports.parseVariable = parseVariable;
exports.parseVariableDeclarement = parseVariableDeclarement;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  [x] name
  [x] pattern
  [x] block
  [x] getter-setter
  [x] willset-didset
  [x] expression
  [x] type annotation (opt)
  @return {Node}
 */
function parseVariableDeclaration() {

  var declaration = null;
  var node = new _nodes2.default.VariableDeclaration();

  if (this.peek(_labels.TokenList.VAR) || this.peek(_labels.TokenList.CONST)) {
    node.symbol = this.current.name;
    this.next();
  }

  this.parseVariable(node);

  return node;
}

/**
 * @return {Node}
 */
function parseVariable(node) {

  node.declarations = this.parseVariableDeclarement();

  // Block
  if (this.eat(_labels.TokenList.LBRACE)) {
    node.init = this.parseBlock();
    this.expect(_labels.TokenList.RBRACE);
    // Expression
  } else {
    if (this.eat(_labels.TokenList.ASSIGN)) {
      if (this.peek(_labels.TokenList.LPAREN) && node.declarations.length > 1) {
        node.init = this.parseArguments();
      } else {
        node.init = this.parseStatement();
      }
    }
  }

  if (node.init && !node.init.length) {
    node.init = [node.init];
  }

  if (this.eat(_labels.TokenList.COMMA)) {
    while (true) {
      var tmp = this.parseVariableDeclaration();
      tmp.symbol = node.symbol;
      node.declarations = node.declarations.concat(tmp.declarations);
      node.init = node.init.concat(tmp.init);
      if (!this.peek(_labels.TokenList.COMMA)) break;
    };
  }
}

/**
 * @return {Array}
 */
function parseVariableDeclarement() {

  var args = null;

  if (this.peek(_labels.Token.Identifier)) {
    args = [this.parseLiteral()];
  } else if (this.peek(_labels.TokenList.LPAREN)) {
    args = this.parseArguments();
  }

  return args;
}

},{"../../labels":43,"../../nodes":44,"../../utils":47}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseParenthese = parseParenthese;
exports.parseCommaSeperatedValues = parseCommaSeperatedValues;
exports.parseArguments = parseArguments;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  [x] parenthesed bin expr
  [x] parameter
  [x] argument
  [x] tuple
  @return {Node}
 */
function parseParenthese(left, right) {

  var node = null;
  var base = null;

  // Empty parenthese
  this.expect(left);
  if (this.eat(right)) return null;

  base = this.parseStatement();

  if (this.eat(_labels.TokenList.COMMA)) {
    node = this.parseCommaSeperatedValues();
    node.unshift(base);
  } else {
    node = base;
  }

  this.expect(right);

  return node;
}

/**
 * @return {Array}
 */
function parseCommaSeperatedValues() {

  var args = [];

  while (true) {
    args.push(this.parseStatement());
    if (!this.eat(_labels.TokenList.COMMA)) break;
  };

  return args;
}

/**
 * @return {Array}
 */
function parseArguments(args) {

  var argz = args === void 0 ? this.parseParenthese(_labels.TokenList.LPAREN, _labels.TokenList.RPAREN) : args;

  /** Handle empty arguments */
  if (argz === null) {
    argz = [];
  } else if (!argz.length) {
    argz = [argz];
  }

  return argz;
}

},{"../../labels":43,"../../nodes":44,"../../utils":47}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseAtom = parseAtom;
exports.parseMemberExpression = parseMemberExpression;
exports.parseCallExpression = parseCallExpression;
exports.parseTernaryExpression = parseTernaryExpression;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  [x] ?:
  [x] .
  [x] []
  [x] AS|IS
  [x] ()
  @param {Node} base
  @return {Node}
 */
function parseAtom(base) {

  while (true) {
    /** Un/computed member expression */
    if (this.peek(_labels.TokenList.LBRACK) || this.peek(_labels.TokenList.PERIOD)) {
      base = this.parseMemberExpression(base);
    }
    /** Call expression */
    else if (this.peek(_labels.TokenList.LPAREN)) {
        base = this.parseCallExpression(base);
      } else {
        break;
      }
  };

  return base;
}

/**
 * @return {Node}
 */
function parseMemberExpression(base) {

  var node = new _nodes2.default.MemberExpression();

  node.isComputed = this.peek(_labels.TokenList.LBRACK);

  this.next();

  node.object = base;
  node.property = this.parseLiteral();

  if (node.isComputed) {
    this.expect(_labels.TokenList.RBRACK);
  }

  return node;
}

/**
 * @return {Node}
 */
function parseCallExpression(base) {

  var node = new _nodes2.default.CallExpression();

  node.callee = base;
  node.arguments = this.parseArguments();

  return node;
}

/**
 * @return {Node}
 */
function parseTernaryExpression(base) {

  var node = new _nodes2.default.TernaryExpression();

  this.inTernary = true;

  node.condition = base;

  this.expect(_labels.TokenList.CONDITIONAL);
  node.consequent = this.parseExpressionStatement();
  this.expect(_labels.TokenList.COLON);
  node.alternate = this.parseExpressionStatement();

  this.inTernary = false;

  return node;
}

},{"../../labels":43,"../../nodes":44,"../../utils":47}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseBinaryExpression = parseBinaryExpression;
exports.isPrefixOperator = isPrefixOperator;
exports.isPostfixOperator = isPostfixOperator;
exports.getUnifiedOperator = getUnifiedOperator;
exports.opInArray = opInArray;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _precedence = require("../../precedence");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Number} index
 * @return {Node}
 */
function parseBinaryExpression(index) {

  var tmp = null;
  var left = null;
  var node = null;

  var state = _precedence.IFX_PRECEDENCE[index];

  left = state ? this.parseBinaryExpression(index + 1) : this.parseAtom(this.parseLiteral());

  while (this.acceptPrecedence(state)) {
    node = new _nodes2.default.BinaryExpression();
    node.operator = _labels.TokenList[state.op];
    this.next();
    node.left = left;
    tmp = state ? this.parseBinaryExpression(index + 1) : this.parseLiteral();
    node.right = tmp;
    node.isParenthised = this.peek(_labels.TokenList.RPAREN);
    left = node;
  };

  // No infix expression, so check if postfix
  if (state === void 0 && this.current !== void 0) {
    if (this.isPostfixOperator(this.current)) {
      return this.parseUnaryExpression(left);
    }
  }

  return left;
}

/**
 * @param {Object} token
 * @return {Boolean}
 */
function isPrefixOperator(token) {

  var op = this.getUnifiedOperator(token);

  return this.opInArray(_precedence.PEX_PRECEDENCE, op);
}

/**
 * @param {Object} token
 * @return {Boolean}
 */
function isPostfixOperator(token) {

  var op = this.getUnifiedOperator(token);

  return this.opInArray(_precedence.POX_PRECEDENCE, op);
}

/**
 * Parses an operator token, which is either
 * tokenized as a identifier (unknown) or a TT index
 * @return {String}
 */
function getUnifiedOperator(token) {

  if (token.name === _labels.Token.Identifier) {
    return token.value;
  } else {
    // Turn into op value
    return (0, _utils.getLabelByNumber)(_labels.TokenList[(0, _utils.getNameByLabel)(token.name)]);
  }
}

/**
 * @return {Boolean}
 */
function opInArray(array, op) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      if (key.op === op) return true;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ;
  return false;
}

},{"../../labels":43,"../../nodes":44,"../../precedence":45,"../../utils":47}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseExpressionStatement = parseExpressionStatement;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @return {Node}
 */
function parseExpressionStatement() {

  var node = null;

  switch (this.current.name) {
    case _labels.TokenList.LPAREN:
    case _labels.TokenList.LBRACK:
    case _labels.TokenList.SELF:
    case _labels.TokenList.BIT_AND:
    case _labels.TokenList.UL:
    case _labels.TokenList.TRUE:
    case _labels.TokenList.FALSE:
    case _labels.Token.Identifier:
    case _labels.Token.NullLiteral:
    case _labels.Token.StringLiteral:
    case _labels.Token.NumericLiteral:
    case _labels.Token.BooleanLiteral:
      node = this.parseBinaryExpression(0);
      break;
    /** Operator things */
    case _labels.TokenList.ASSOCIATIVITY:
      node = this.parseAssociativityExpression();
      break;
    case _labels.TokenList.PRECEDENCE:
      node = this.parsePrecedenceExpression();
      break;
    default:
      // Ups, expression starts with prefix operator
      // FIXME
      if (this.isOperator(this.current.name)) {
        node = this.parseBinaryExpression(0);
      }
      break;
  };

  if (this.peek(_labels.TokenList.CONDITIONAL)) {
    node = this.parseTernaryExpression(node);
  }

  return node;
}

},{"../../labels":43,"../../nodes":44,"../../utils":47}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseLiteral = parseLiteral;
exports.parseLiteralHead = parseLiteralHead;
exports.parseArrayDeclaration = parseArrayDeclaration;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @return {Node}
 */
function parseLiteral() {

  // Unary pex expression
  if (this.isPrefixOperator(this.current)) {
    return this.parseUnaryExpression(void 0);
  }

  if (this.peek(_labels.TokenList.LPAREN)) {
    this.expect(_labels.TokenList.LPAREN);
    var tmp = this.parseExpressionStatement();
    // Seems like a standalone operator
    if (tmp === null) {
      tmp = this.parseLiteral();
    }
    // Seems like a tuple o.O
    if (this.eat(_labels.TokenList.COMMA)) {
      // Parse all folowing tuple parameters
      var args = this.parseCommaSeperatedValues();
      args.unshift(tmp);
      tmp = args;
    }
    this.expect(_labels.TokenList.RPAREN);
    return tmp;
  }

  var node = new _nodes2.default.Literal();
  var isExplicit = this.eat(_labels.TokenList.UL);

  // Literal passed as pointer
  if (this.eat(_labels.TokenList.BIT_AND)) {
    node.isPointer = true;
  }

  if (isExplicit && this.peek(_labels.TokenList.COLON)) {
    // Explicit only parameter
  } else {
    node.type = this.current.name;
    node.value = this.current.value;
    node.raw = this.current.value;
    this.next();
  }

  // Labeled literal
  if (this.peek(_labels.Token.Identifier)) {
    if (!this.isOperator(_labels.TokenList[this.current.value])) {
      var _tmp = this.parseLiteral();
      _tmp.label = node;
      node = _tmp;
    }
  }

  // Dont parse colon as argument, if in ternary expression
  if (!this.inTernary) {
    if (this.peek(_labels.TokenList.COLON)) {
      node = this.parseStrictType(node);
      if (node.argument && node.argument.kind === _labels.Types.TypeAnnotation) {
        node.argument.isExplicit = isExplicit;
      }
    }
  }

  return node;
}

/**
 * Parse a literal head,
 * supports functions names
 * which are operators
 * @return {String}
 */
function parseLiteralHead() {

  var str = _labels.TokenList[this.current.name];

  // Custom operator
  if (str) {
    this.next();
    return str;
  }

  // Default literal
  return this.extract(_labels.Token.Identifier).value;
}

/**
 * @return {Node}
 */
function parseArrayDeclaration() {

  var node = new _nodes2.default.ArrayDeclaration();

  var args = this.parseParenthese(_labels.TokenList.LBRACK, _labels.TokenList.RBRACK);

  node.argument = this.parseArguments(args);

  return node;
}

},{"../../labels":43,"../../nodes":44,"../../utils":47}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseUnaryExpression = parseUnaryExpression;

var _labels = require("../../labels");

var _nodes = require("../../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @return {Node}
 */
function parseUnaryExpression(base) {

  var node = new _nodes2.default.UnaryExpression();

  node.isPrefix = this.isPrefixOperator(this.current);
  node.operator = _labels.TokenList[this.parseLiteralHead()];
  node.argument = base || this.parseBinaryExpression(0);

  return node;
}

},{"../../labels":43,"../../nodes":44,"../../utils":47}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("../utils");

var _parse = require("./parse");

var parse = _interopRequireWildcard(_parse);

var _args = require("./expression/args");

var args = _interopRequireWildcard(_args);

var _atom = require("./expression/atom");

var atoms = _interopRequireWildcard(_atom);

var _unary = require("./expression/unary");

var unaries = _interopRequireWildcard(_unary);

var _binary = require("./expression/binary");

var binaries = _interopRequireWildcard(_binary);

var _literal = require("./expression/literal");

var literals = _interopRequireWildcard(_literal);

var _expression = require("./expression");

var expressions = _interopRequireWildcard(_expression);

var _branch = require("./branch");

var branches = _interopRequireWildcard(_branch);

var _guard = require("./branch/guard");

var guards = _interopRequireWildcard(_guard);

var _if = require("./branch/if");

var ifelse = _interopRequireWildcard(_if);

var _pseudo = require("./branch/pseudo");

var pseudos = _interopRequireWildcard(_pseudo);

var _switch = require("./branch/switch");

var switches = _interopRequireWildcard(_switch);

var _loop = require("./loop");

var loops = _interopRequireWildcard(_loop);

var _type = require("./type");

var types = _interopRequireWildcard(_type);

var _statement = require("./statement");

var statements = _interopRequireWildcard(_statement);

var _struct = require("./declare/struct");

var structs = _interopRequireWildcard(_struct);

var _class = require("./declare/class");

var classes = _interopRequireWildcard(_class);

var _import = require("./declare/import");

var imports = _interopRequireWildcard(_import);

var _function = require("./declare/function");

var functions = _interopRequireWildcard(_function);

var _protocol = require("./declare/protocol");

var protocols = _interopRequireWildcard(_protocol);

var _variable = require("./declare/variable");

var variables = _interopRequireWildcard(_variable);

var _operator = require("./declare/operator");

var operators = _interopRequireWildcard(_operator);

var _extension = require("./declare/extension");

var extensions = _interopRequireWildcard(_extension);

var _declare = require("./declare");

var declarations = _interopRequireWildcard(_declare);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Parser methods */


/** Expressions */


/** Branches */


/** Globals */


/** Declarations */


/**
 * @class Parser
 * @export
 */

var Parser =

/** @constructor */
function Parser() {
  _classCallCheck(this, Parser);

  /**
   * Node index
   * @type {Number}
   */
  this.index = 0;

  /**
   * Tokens
   * @type {Array}
   */
  this.tokens = [];

  /**
   * Previous token
   * @type {Object}
   */
  this.previous = null;

  /**
   * Current token
   * @type {Object}
   */
  this.current = null;

  /**
   * Inside ternary expr
   * @type {Boolean}
   */
  this.inTernary = false;
};

exports.default = Parser;


(0, _utils.inherit)(Parser, parse);

(0, _utils.inherit)(Parser, args);
(0, _utils.inherit)(Parser, atoms);
(0, _utils.inherit)(Parser, unaries);
(0, _utils.inherit)(Parser, binaries);
(0, _utils.inherit)(Parser, literals);
(0, _utils.inherit)(Parser, expressions);

(0, _utils.inherit)(Parser, guards);
(0, _utils.inherit)(Parser, ifelse);
(0, _utils.inherit)(Parser, pseudos);
(0, _utils.inherit)(Parser, switches);
(0, _utils.inherit)(Parser, branches);

(0, _utils.inherit)(Parser, loops);
(0, _utils.inherit)(Parser, types);
(0, _utils.inherit)(Parser, branches);
(0, _utils.inherit)(Parser, statements);

(0, _utils.inherit)(Parser, imports);
(0, _utils.inherit)(Parser, classes);
(0, _utils.inherit)(Parser, structs);
(0, _utils.inherit)(Parser, protocols);
(0, _utils.inherit)(Parser, functions);
(0, _utils.inherit)(Parser, variables);
(0, _utils.inherit)(Parser, operators);
(0, _utils.inherit)(Parser, extensions);
(0, _utils.inherit)(Parser, declarations);

},{"../utils":47,"./branch":14,"./branch/guard":12,"./branch/if":13,"./branch/pseudo":15,"./branch/switch":16,"./declare":21,"./declare/class":17,"./declare/extension":18,"./declare/function":19,"./declare/import":20,"./declare/operator":22,"./declare/protocol":23,"./declare/struct":24,"./declare/variable":25,"./expression":29,"./expression/args":26,"./expression/atom":27,"./expression/binary":28,"./expression/literal":30,"./expression/unary":31,"./loop":33,"./parse":34,"./statement":35,"./type":36}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseLoopStatement = parseLoopStatement;
exports.parseFor = parseFor;
exports.parseForInLoop = parseForInLoop;
exports.parseDefaultForLoop = parseDefaultForLoop;
exports.parseWhile = parseWhile;
exports.parseRepeat = parseRepeat;

var _labels = require("../labels");

var _nodes = require("../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  [ ] for
  [ ] while
  [ ] repeat
  @return {Node}
*/
function parseLoopStatement() {

  switch (this.current.name) {
    case _labels.TokenList.FOR:
      return this.parseFor();
      break;
    case _labels.TokenList.WHILE:
      return this.parseWhile();
      break;
    case _labels.TokenList.REPEAT:
      return this.parseRepeat();
      break;
  };

  return null;
}

/**
 * @return {Node}
 */
function parseFor() {

  var node = new _nodes2.default.ForStatement();

  var init = null;

  this.expect(_labels.TokenList.FOR);

  this.eat(_labels.TokenList.LPAREN);

  if (!this.eat(_labels.TokenList.SEMICOLON)) {
    init = this.parseStatement();
  }

  // for (expr) in (expr)
  if (this.eat(_labels.TokenList.IN)) {
    node = new _nodes2.default.ForInStatement();
    this.parseForInLoop(node);
    // for (expr);(expr);(expr)
  } else {
    this.parseDefaultForLoop(node);
  }

  node.init = init;

  this.eat(_labels.TokenList.RPAREN);

  this.expect(_labels.TokenList.LBRACE);
  node.body = this.parseBlock();
  this.expect(_labels.TokenList.RBRACE);

  return node;
}

function parseForInLoop(node) {

  node.expression = this.parseExpressionStatement();
}

function parseDefaultForLoop(node) {

  node.test = this.parseExpressionStatement();
  this.expect(_labels.TokenList.SEMICOLON);
  node.update = this.parseExpressionStatement();
}

/**
 * @return {Node}
 */
function parseWhile() {

  var node = new _nodes2.default.WhileStatement();

  this.expect(_labels.TokenList.WHILE);

  this.eat(_labels.TokenList.LPAREN);
  node.test = this.parseExpressionStatement();
  this.eat(_labels.TokenList.RPAREN);

  this.expect(_labels.TokenList.LBRACE);
  node.body = this.parseBlock();
  this.expect(_labels.TokenList.RBRACE);

  return node;
}

/**
 * @return {Node}
 */
function parseRepeat() {

  var node = new _nodes2.default.RepeatStatement();

  this.expect(_labels.TokenList.REPEAT);

  this.expect(_labels.TokenList.LBRACE);
  node.body = this.parseBlock();
  this.expect(_labels.TokenList.RBRACE);

  this.expect(_labels.TokenList.WHILE);

  this.eat(_labels.TokenList.LPAREN);
  node.test = this.parseExpressionStatement();
  this.eat(_labels.TokenList.RPAREN);

  return node;
}

},{"../labels":43,"../nodes":44,"../utils":47}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extract = extract;
exports.eat = eat;
exports.peek = peek;
exports.next = next;
exports.back = back;
exports.expect = expect;
exports.reset = reset;
exports.parseProgram = parseProgram;
exports.parseBlock = parseBlock;
exports.parse = parse;
exports.acceptPrecedence = acceptPrecedence;
exports.isOperator = isOperator;

var _labels = require("../labels");

var _nodes = require("../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extract
 * @param  {Number} kind
 * @return {Boolean}
 */
function extract(kind) {
  var tmp = null;
  if (this.peek(kind)) {
    tmp = this.current;
    this.expect(kind);
    return tmp;
  }
  return tmp;
}

/**
 * Eat
 * @param  {Number} kind
 * @return {Boolean}
 */
function eat(kind) {
  if (this.peek(kind)) {
    this.next();
    return true;
  }
  return false;
}

/**
 * Peek
 * @param  {Number} name
 * @return {Boolean}
 */
function peek(name) {
  return this.current !== void 0 && this.current.name === name;
}

/**
 * Next token
 * @return {Boolean}
 */
function next() {
  if (this.index < this.tokens.length) {
    this.index++;
    this.previous = this.current;
    this.current = this.tokens[this.index];
    return true;
  }
  return false;
}

/**
 * Previous token
 * @return {Boolean}
 */
function back() {
  if (this.index < this.tokens.length) {
    this.index--;
    this.previous = this.current;
    this.current = this.tokens[this.index];
    return true;
  }
  return false;
}

/**
 * Expect token
 * @param  {Number} kind
 * @return {Boolean}
 */
function expect(kind) {
  if (!this.peek(kind)) {
    if (this.current !== void 0) {
      var loc = this.current.loc;
      throw new Error("Expected " + (0, _utils.getNameByLabel)(kind) + " but got " + (0, _utils.getNameByLabel)(this.current.name) + " in " + loc.start.line + ":" + loc.end.column);
    }
    return false;
  }
  this.next();
  return true;
}

/**
 * Reset
 * @param {Array} tokens
 */
function reset(tokens) {
  this.index = 0;
  this.tokens = tokens;
  this.previous = this.current = this.tokens[this.index];
}

/**
 * @return {Node}
 */
function parseProgram() {

  var node = new _nodes2.default.Program();

  if (this.current === void 0) return node;

  node.body = this.parseBlock();

  return node;
}

/**
 * @return {Node}
 */
function parseBlock() {

  var node = new _nodes2.default.BlockStatement();
  var statement = null;

  while ((statement = this.parseStatement()) !== null) {
    node.body.push(statement);
    if (this.current === void 0) break;
  };

  return node;
}

/**
 * @return {Node}
 */
function parse(tokens) {
  this.reset(tokens);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = tokens[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      //console.log(getNameByLabel(key.name), key.value);

      var key = _step.value;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ;
  return this.parseProgram();
}

/**
 * Accept precedence
 * @param  {Object}  token
 * @param  {Number}  state
 * @return {Boolean}
 */
function acceptPrecedence(state) {
  if (state !== void 0 && this.current) {
    // Custom infix operator
    if ((0, _utils.getNameByLabel)(this.current.name) === "Identifier") {
      return _labels.TokenList[state.op] === _labels.TokenList[this.current.value];
    }
    return _labels.TokenList[state.op] === this.current.name;
  }
  return false;
}

/**
 * @param  {Number}  name
 * @return {Boolean}
 */
function isOperator(name) {
  return (0, _utils.getNameByLabel)(name) in _labels.Operators;
}

},{"../labels":43,"../nodes":44,"../utils":47}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseStatement = parseStatement;
exports.parseFinal = parseFinal;
exports.parseOverride = parseOverride;
exports.parseStatic = parseStatic;
exports.parseAccessControl = parseAccessControl;
exports.parseReturnStatement = parseReturnStatement;

var _labels = require("../labels");

var _nodes = require("../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @return {Node}
 */
function parseStatement() {

  var node = null;

  switch (this.current.name) {
    /** Loop statement */
    case _labels.TokenList.FOR:
    case _labels.TokenList.WHILE:
    case _labels.TokenList.REPEAT:
      node = this.parseLoopStatement();
      break;
    /** Branch statement */
    case _labels.TokenList.IF:
    case _labels.TokenList.GUARD:
    case _labels.TokenList.SWITCH:
    case _labels.TokenList.GET:
    case _labels.TokenList.SET:
    case _labels.TokenList.WILLSET:
    case _labels.TokenList.DIDSET:
      node = this.parseBranchStatement();
      break;
    /** Defer statement */
    case _labels.TokenList.DEFER:
      node = this.parseDeferStatement();
      break;
    /** Return statement */
    case _labels.TokenList.RETURN:
      node = this.parseReturnStatement();
      break;
    /** Do statement */
    case _labels.TokenList.DO:
      node = this.parseDoStatement();
      break;
    /** Declaration statement */
    case _labels.TokenList.IMPORT:
    case _labels.TokenList.CONST:
    case _labels.TokenList.VAR:
    case _labels.TokenList.TYPEALIAS:
    case _labels.TokenList.FUNCTION:
    case _labels.TokenList.ENUM:
    case _labels.TokenList.STRUCT:
    case _labels.TokenList.INIT:
    case _labels.TokenList.PROTOCOL:
    case _labels.TokenList.EXTENSION:
    case _labels.TokenList.OPERATOR:
    case _labels.TokenList.POSTFIX:
    case _labels.TokenList.PREFIX:
    case _labels.TokenList.INFIX:
      node = this.parseDeclarationStatement();
      break;
    /** Class */
    case _labels.TokenList.CLASS:
      node = this.parseClass();
      break;
    /** Access control */
    case _labels.TokenList.PUBLIC:
    case _labels.TokenList.PRIVATE:
    case _labels.TokenList.INTERNAL:
      node = this.parseAccessControl();
      break;
    /** Override */
    case _labels.TokenList.OVERRIDE:
      node = this.parseOverride();
      break;
    /** Final */
    case _labels.TokenList.FINAL:
      node = this.parseFinal();
      break;
    case _labels.TokenList.STATIC:
      node = this.parseStatic();
      break;
    /** Expression statement */
    default:
      node = this.parseExpressionStatement();
      break;
  };

  this.eat(_labels.TokenList.SEMICOLON);

  return node;
}

/**
 * @return {Node}
 */
function parseFinal() {

  this.expect(_labels.TokenList.FINAL);

  var node = this.parseStatement();

  if (!node.hasOwnProperty("isFinal")) {
    throw new Error("Can't attach final property to node!");
  }

  node.isFinal = true;

  return node;
}

/**
 * @return {Node}
 */
function parseOverride() {

  this.expect(_labels.TokenList.OVERRIDE);

  var node = this.parseStatement();

  if (!node.hasOwnProperty("isOverride")) {
    throw new Error("Can't attach override property to node!");
  }

  node.isOverride = true;

  return node;
}

/**
 * @return {Node}
 */
function parseStatic() {

  this.expect(_labels.TokenList.STATIC);

  var node = this.parseStatement();

  if (!node.hasOwnProperty("isStatic")) {
    throw new Error("Can't attach static property to node!");
  }

  node.isStatic = true;

  return node;
}

/**
 * @return {Node}
 */
function parseAccessControl() {

  var access = this.current;

  this.next();

  var node = this.parseStatement();

  if (!node.hasOwnProperty("isPublic") && !node.hasOwnProperty("isPrivate") && !node.hasOwnProperty("isInternal")) {
    throw new Error("Can't attach access control to node!");
  }

  switch (access.name) {
    case _labels.TokenList.PUBLIC:
      node.isPublic = true;
      break;
    case _labels.TokenList.PRIVATE:
      node.isPrivate = true;
      break;
    case _labels.TokenList.INTERNAL:
      node.isInternal = true;
      break;
  };

  return node;
}

/**
 * @return {Node}
 */
function parseReturnStatement() {

  var node = new _nodes2.default.ReturnStatement();

  this.expect(_labels.TokenList.RETURN);

  node.argument = this.parseExpressionStatement();

  return node;
}

},{"../labels":43,"../nodes":44,"../utils":47}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseStrictType = parseStrictType;
exports.parseType = parseType;
exports.isNativeType = isNativeType;

var _labels = require("../labels");

var _nodes = require("../nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  [x] tuple
  [x] type
*/
function parseStrictType(base) {

  var node = new _nodes2.default.Parameter();

  var isInout = false;

  if (this.eat(_labels.TokenList.COLON)) {
    isInout = this.eat(_labels.TokenList.INOUT);
    node.init = base;
    if (this.isNativeType(this.current.name)) {
      node.argument = this.parseType();
    } else {
      node.argument = this.parseExpressionStatement();
    }
  } else if (this.eat(_labels.TokenList.ARROW)) {
    // func () -> ()
    if (this.peek(_labels.TokenList.LPAREN)) {
      node = this.parseExpressionStatement();
      // func () -> Type
    } else {
      node = this.parseType();
    }
  }

  if (node.argument && node.argument.kind === _labels.Types.TypeAnnotation) {
    node.argument.isReference = isInout;
  }

  return node;
}

function parseType() {

  var node = new _nodes2.default.TypeAnnotation();

  node.type = this.current.name;

  this.next();

  if (this.eat(_labels.TokenList.CONDITIONAL)) {
    node.isOptional = true;
  } else if (this.current.value === "!") {
    node.isUnwrap = true;
    this.next();
  }

  return node;
}

/**
 * @param  {Number}  type
 * @return {Boolean}
 */
function isNativeType(type) {
  switch (type) {
    case _labels.TokenList.VOID:
    case _labels.TokenList.INT:
    case _labels.TokenList.INT8:
    case _labels.TokenList.UINT8:
    case _labels.TokenList.INT32:
    case _labels.TokenList.INT64:
    case _labels.TokenList.UINT64:
    case _labels.TokenList.DOUBLE:
    case _labels.TokenList.FLOAT:
    case _labels.TokenList.BOOLEAN:
    case _labels.TokenList.STRING:
    case _labels.TokenList.CHARACTER:
      return true;
      break;
    default:
      return false;
      break;
  };
}

},{"../labels":43,"../nodes":44,"../utils":47}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Character = exports.Character = {
  fromCodePoint: function fromCodePoint(cp) {
    return cp < 0x10000 ? String.fromCharCode(cp) : String.fromCharCode(0xD800 + (cp - 0x10000 >> 10)) + String.fromCharCode(0xDC00 + (cp - 0x10000 & 1023));
  },
  isWhiteSpace: function isWhiteSpace(cp) {
    return cp === 0x20 || cp === 0x09 || cp === 0x0B || cp === 0x0C || cp === 0xA0 || cp >= 0x1680 && [0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(cp) >= 0;
  },
  isLineTerminator: function isLineTerminator(cp) {
    return cp === 0x0A || cp === 0x0D || cp === 0x2028 || cp === 0x2029;
  },
  isIdentifierStart: function isIdentifierStart(cp) {
    return cp === 0x24 || cp === 0x5F || // $ (dollar) and _ (underscore)
    cp >= 0x41 && cp <= 0x5A || // A..Z
    cp >= 0x61 && cp <= 0x7A || // a..z
    cp === 0x5C;
  },
  isIdentifierPart: function isIdentifierPart(cp) {
    return cp === 0x24 || cp === 0x5F || // $ (dollar) and _ (underscore)
    cp >= 0x41 && cp <= 0x5A || // A..Z
    cp >= 0x61 && cp <= 0x7A || // a..z
    cp >= 0x30 && cp <= 0x39 || // 0..9
    cp === 0x5C;
  },
  isDecimalDigit: function isDecimalDigit(cp) {
    return cp >= 0x30 && cp <= 0x39; // 0..9
  },
  isHexDigit: function isHexDigit(cp) {
    return cp >= 0x30 && cp <= 0x39 || // 0..9
    cp >= 0x41 && cp <= 0x48 || // A..H
    cp >= 0x61 && cp <= 0x68; // a..h
  },
  isOctalDigit: function isOctalDigit(cp) {
    return cp >= 0x30 && cp <= 0x37; // 0..7
  }
};

},{}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scanner = require("./scanner");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tokenizer = function () {

  /** @constructor */

  function Tokenizer() {
    _classCallCheck(this, Tokenizer);
  }

  _createClass(Tokenizer, [{
    key: "scan",
    value: function scan(code, opts) {
      return (0, _scanner.tokenize)(code, { loc: true });
    }
  }]);

  return Tokenizer;
}();

exports.default = Tokenizer;

},{"./scanner":39}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenize = undefined;

var _char = require('./char');

var _labels = require('../labels');

var PlaceHolders, Messages, Regex, source, strict, index, lineNumber, lineStart, hasLineTerminator, lastIndex, lastLineNumber, lastLineStart, startIndex, startLineNumber, startLineStart, scanning, length, lookahead, state, extra, isBindingElement, isAssignmentTarget, firstCoverInitializedNameError;

PlaceHolders = {
  ArrowParameterPlaceHolder: 'ArrowParameterPlaceHolder'
};

// Ensure the condition is true, otherwise throw an error.
// This is only to have a better contract semantic, i.e. another safety net
// to catch a logic error. The condition shall be fulfilled in normal case.
// Do NOT use this to enforce a certain condition on any user input.

function assert(condition, message) {
  /* istanbul ignore if */
  if (!condition) {
    throw new Error('ASSERT: ' + message);
  }
}

function isDecimalDigit(ch) {
  return ch >= 0x30 && ch <= 0x39 || ch === 0x5f; // 0._.9
}

function isHexDigit(ch) {
  return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
}

function isOctalDigit(ch) {
  return '01234567'.indexOf(ch) >= 0;
}

function octalToDecimal(ch) {
  // \0 is not octal escape sequence
  var octal = ch !== '0',
      code = '01234567'.indexOf(ch);

  if (index < length && isOctalDigit(source[index])) {
    octal = true;
    code = code * 8 + '01234567'.indexOf(source[index++]);

    // 3 digits are only allowed when string starts
    // with 0, 1, 2, 3
    if ('0123'.indexOf(ch) >= 0 && index < length && isOctalDigit(source[index])) {
      code = code * 8 + '01234567'.indexOf(source[index++]);
    }
  }

  return {
    code: code,
    octal: octal
  };
}

// ECMA-262 11.2 White Space

function isWhiteSpace(ch) {
  return ch === 0x20 || ch === 0x09 || ch === 0x0B || ch === 0x0C || ch === 0xA0 || ch >= 0x1680 && [0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(ch) >= 0;
}

// ECMA-262 11.3 Line Terminators

function isLineTerminator(ch) {
  return ch === 0x0A || ch === 0x0D || ch === 0x2028 || ch === 0x2029;
}

// ECMA-262 11.6 Identifier Names and Identifiers

function fromCodePoint(cp) {
  return cp < 0x10000 ? String.fromCharCode(cp) : String.fromCharCode(0xD800 + (cp - 0x10000 >> 10)) + String.fromCharCode(0xDC00 + (cp - 0x10000 & 1023));
}

function isIdentifierStart(ch) {
  return ch === 0x24 || ch === 0x5F || // $ (dollar) and _ (underscore)
  ch >= 0x41 && ch <= 0x5A || // A..Z
  ch >= 0x61 && ch <= 0x7A || // a..z
  ch === 0x5C;
}

function isIdentifierPart(ch) {
  return ch === 0x24 || ch === 0x5F || // $ (dollar) and _ (underscore)
  ch >= 0x41 && ch <= 0x5A || // A..Z
  ch >= 0x61 && ch <= 0x7A || // a..z
  ch >= 0x30 && ch <= 0x39 || // 0..9
  ch === 0x5C;
}

// ECMA-262 11.6.2.1 Keywords

function isKeyword(id) {
  return _labels.TokenList[id] !== void 0;
}

// ECMA-262 11.4 Comments

function addComment(type, value, start, end, loc) {
  var comment;

  assert(typeof start === 'number', 'Comment must have valid position');

  state.lastCommentStart = start;

  comment = {
    type: type,
    value: value
  };
  if (extra.range) {
    comment.range = [start, end];
  }
  if (extra.loc) {
    comment.loc = loc;
  }
  extra.comments.push(comment);
  if (extra.attachComment) {
    extra.leadingComments.push(comment);
    extra.trailingComments.push(comment);
  }
  if (extra.tokenize) {
    comment.type = comment.type + 'Comment';
    if (extra.delegate) {
      comment = extra.delegate(comment);
    }
    extra.tokens.push(comment);
  }
}

function skipSingleLineComment(offset) {
  var start, loc, ch, comment;

  start = index - offset;
  loc = {
    start: {
      line: lineNumber,
      column: index - lineStart - offset
    }
  };

  while (index < length) {
    ch = source.charCodeAt(index);
    ++index;
    if (isLineTerminator(ch)) {
      hasLineTerminator = true;
      if (extra.comments) {
        comment = source.slice(start + offset, index - 1);
        loc.end = {
          line: lineNumber,
          column: index - lineStart - 1
        };
        addComment('Line', comment, start, index - 1, loc);
      }
      if (ch === 13 && source.charCodeAt(index) === 10) {
        ++index;
      }
      ++lineNumber;
      lineStart = index;
      return;
    }
  }

  if (extra.comments) {
    comment = source.slice(start + offset, index);
    loc.end = {
      line: lineNumber,
      column: index - lineStart
    };
    addComment('Line', comment, start, index, loc);
  }
}

function skipMultiLineComment() {
  var start, loc, ch, comment;

  if (extra.comments) {
    start = index - 2;
    loc = {
      start: {
        line: lineNumber,
        column: index - lineStart - 2
      }
    };
  }

  while (index < length) {
    ch = source.charCodeAt(index);
    if (isLineTerminator(ch)) {
      if (ch === 0x0D && source.charCodeAt(index + 1) === 0x0A) {
        ++index;
      }
      hasLineTerminator = true;
      ++lineNumber;
      ++index;
      lineStart = index;
    } else if (ch === 0x2A) {
      // Block comment ends with '*/'.
      if (source.charCodeAt(index + 1) === 0x2F) {
        ++index;
        ++index;
        if (extra.comments) {
          comment = source.slice(start + 2, index - 2);
          loc.end = {
            line: lineNumber,
            column: index - lineStart
          };
          addComment('Block', comment, start, index, loc);
        }
        return;
      }
      ++index;
    } else {
      ++index;
    }
  }

  // Ran off the end of the file - the whole thing is a comment
  if (extra.comments) {
    loc.end = {
      line: lineNumber,
      column: index - lineStart
    };
    comment = source.slice(start + 2, index);
    addComment('Block', comment, start, index, loc);
  }
  tolerateUnexpectedToken();
}

function skipComment() {
  var ch, start;
  hasLineTerminator = false;

  start = index === 0;
  while (index < length) {
    ch = source.charCodeAt(index);

    if (isWhiteSpace(ch)) {
      ++index;
    } else if (isLineTerminator(ch)) {
      hasLineTerminator = true;
      ++index;
      if (ch === 0x0D && source.charCodeAt(index) === 0x0A) {
        ++index;
      }
      ++lineNumber;
      lineStart = index;
      start = true;
    } else if (ch === 0x2F) {
      // U+002F is '/'
      ch = source.charCodeAt(index + 1);
      if (ch === 0x2F) {
        ++index;
        ++index;
        skipSingleLineComment(2);
        start = true;
      } else if (ch === 0x2A) {
        // U+002A is '*'
        ++index;
        ++index;
        skipMultiLineComment();
      } else {
        break;
      }
    } else if (start && ch === 0x2D) {
      // U+002D is '-'
      // U+003E is '>'
      if (source.charCodeAt(index + 1) === 0x2D && source.charCodeAt(index + 2) === 0x3E) {
        // '-->' is a single-line comment
        index += 3;
        skipSingleLineComment(3);
      } else {
        break;
      }
    } else if (ch === 0x3C) {
      // U+003C is '<'
      if (source.slice(index + 1, index + 4) === '!--') {
        ++index; // `<`
        ++index; // `!`
        ++index; // `-`
        ++index; // `-`
        skipSingleLineComment(4);
      } else {
        break;
      }
    } else {
      break;
    }
  }
}

function scanHexEscape(prefix) {
  var i,
      len,
      ch,
      code = 0;

  len = prefix === 'u' ? 4 : 2;
  for (i = 0; i < len; ++i) {
    if (index < length && isHexDigit(source[index])) {
      ch = source[index++];
      code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
    } else {
      return '';
    }
  }
  return String.fromCharCode(code);
}

function scanUnicodeCodePointEscape() {
  var ch, code;

  ch = source[index];
  code = 0;

  // At least, one hex digit is required.
  if (ch === '}') {
    throwUnexpectedToken();
  }

  while (index < length) {
    ch = source[index++];
    if (!isHexDigit(ch)) {
      break;
    }
    code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
  }

  if (code > 0x10FFFF || ch !== '}') {
    throwUnexpectedToken();
  }

  return fromCodePoint(code);
}

function codePointAt(i) {
  var cp, first, second;

  cp = source.charCodeAt(i);
  if (cp >= 0xD800 && cp <= 0xDBFF) {
    second = source.charCodeAt(i + 1);
    if (second >= 0xDC00 && second <= 0xDFFF) {
      first = cp;
      cp = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
    }
  }

  return cp;
}

function getComplexIdentifier() {
  var cp, ch, id;

  cp = codePointAt(index);
  id = fromCodePoint(cp);
  index += id.length;

  // '\u' (U+005C, U+0075) denotes an escaped character.
  if (cp === 0x5C) {
    if (source.charCodeAt(index) !== 0x75) {
      throwUnexpectedToken();
    }
    ++index;
    if (source[index] === '{') {
      ++index;
      ch = scanUnicodeCodePointEscape();
    } else {
      ch = scanHexEscape('u');
      cp = ch.charCodeAt(0);
      if (!ch || ch === '\\' || !isIdentifierStart(cp)) {
        throwUnexpectedToken();
      }
    }
    id = ch;
  }

  while (index < length) {
    cp = codePointAt(index);
    if (!isIdentifierPart(cp)) {
      break;
    }
    ch = fromCodePoint(cp);
    id += ch;
    index += ch.length;

    // '\u' (U+005C, U+0075) denotes an escaped character.
    if (cp === 0x5C) {
      id = id.substr(0, id.length - 1);
      if (source.charCodeAt(index) !== 0x75) {
        throwUnexpectedToken();
      }
      ++index;
      if (source[index] === '{') {
        ++index;
        ch = scanUnicodeCodePointEscape();
      } else {
        ch = scanHexEscape('u');
        cp = ch.charCodeAt(0);
        if (!ch || ch === '\\' || !isIdentifierPart(cp)) {
          throwUnexpectedToken();
        }
      }
      id += ch;
    }
  }

  return id;
}

function getIdentifier() {
  var start, ch;

  start = index++;
  while (index < length) {
    ch = source.charCodeAt(index);
    if (ch === 0x5C) {
      // Blackslash (U+005C) marks Unicode escape sequence.
      index = start;
      return getComplexIdentifier();
    } else if (ch >= 0xD800 && ch < 0xDFFF) {
      // Need to handle surrogate pairs.
      index = start;
      return getComplexIdentifier();
    }
    if (isIdentifierPart(ch)) {
      ++index;
    } else {
      break;
    }
  }

  return source.slice(start, index);
}

function scanIdentifier() {
  var start, id, type;

  start = index;

  // Backslash (U+005C) starts an escaped character.
  id = source.charCodeAt(index) === 0x5C ? getComplexIdentifier() : getIdentifier();

  // There is no keyword or literal with only one character.
  // Thus, it must be an identifier.
  if (id.length === 1) {
    type = _labels.Token.Identifier;
  } else if (isKeyword(id)) {
    var tmp = source[index];
    // Dirty as? as! hack
    if (tmp === "?" || tmp === "!") {
      if (id.trim() === "as") {
        id += tmp;
        index++;
      }
    }
    type = _labels.Token.Keyword;
  } else if (id === 'null') {
    type = _labels.Token.NullLiteral;
  } else if (id === 'true' || id === 'false') {
    type = _labels.Token.BooleanLiteral;
  } else {
    type = _labels.Token.Identifier;
  }

  return {
    type: type,
    value: id,
    lineNumber: lineNumber,
    lineStart: lineStart,
    start: start,
    end: index
  };
}

function isPunctuator(cp) {
  return cp === 40 || cp === 123 || cp === 46 || cp === 41 || cp === 59 || cp === 44 || cp === 91 || cp === 93 || cp === 58 || cp === 63;
}

// ECMA-262 11.7 Punctuators
function scanPunctuator() {
  var token, str;

  token = {
    type: _labels.Token.Punctuator,
    value: '',
    lineNumber: lineNumber,
    lineStart: lineStart,
    start: index,
    end: index
  };

  // Check for most common single-character punctuators.
  str = source[index];
  switch (str) {

    case '(':
      if (extra.tokenize) {
        extra.openParenToken = extra.tokenValues.length;
      }
      ++index;
      break;

    case '{':
      if (extra.tokenize) {
        extra.openCurlyToken = extra.tokenValues.length;
      }
      state.curlyStack.push('{');
      ++index;
      break;

    case '.':
      ++index;
      if (source[index] === '.' && source[index + 1] === '.') {
        // Spread operator: ...
        index += 2;
        str = '...';
      }
      break;

    case '}':
      ++index;
      state.curlyStack.pop();
      break;
    case ')':
    case ';':
    case ',':
    case '[':
    case ']':
    case ':':
    case '?':
    case '~':
      ++index;
      break;

    default:
      var buf = "";
      var cp = source.charCodeAt(index);
      var res = "";
      while (!isDecimalDigit(cp) && !isWhiteSpace(cp) && !isPunctuator(cp) && !isIdentifierStart(cp)) {
        buf += source[index];
        index++;
        cp = source.charCodeAt(index);
        if (isKeyword(buf)) {
          res = buf;
        }
        if (isNaN(cp)) break;
      };
      res = res.trim();
      /** Unknown token, so turn into identifier */
      if (_labels.TokenList[buf] === void 0) {
        token.type = _labels.Token.Identifier;
      }
      str = buf.trim();
      break;

  };

  if (index === token.start) {
    throwUnexpectedToken();
  }

  token.end = index;
  token.value = str;
  return token;
}

// ECMA-262 11.8.3 Numeric Literals

function scanHexLiteral(start) {
  var number = '';

  while (index < length) {
    if (!isHexDigit(source[index])) {
      break;
    }
    number += source[index++];
  }

  if (number.length === 0) {
    throwUnexpectedToken();
  }

  if (isIdentifierStart(source.charCodeAt(index))) {
    throwUnexpectedToken();
  }

  return {
    type: _labels.Token.NumericLiteral,
    value: parseInt('0x' + number, 16),
    lineNumber: lineNumber,
    lineStart: lineStart,
    start: start,
    end: index
  };
}

function scanBinaryLiteral(start) {
  var ch, number;

  number = '';

  while (index < length) {
    ch = source[index];
    if (ch !== '0' && ch !== '1') {
      break;
    }
    number += source[index++];
  }

  if (number.length === 0) {
    // only 0b or 0B
    throwUnexpectedToken();
  }

  if (index < length) {
    ch = source.charCodeAt(index);
    /* istanbul ignore else */
    if (isIdentifierStart(ch) || isDecimalDigit(ch)) {
      throwUnexpectedToken();
    }
  }

  return {
    type: _labels.Token.NumericLiteral,
    value: parseInt(number, 2),
    lineNumber: lineNumber,
    lineStart: lineStart,
    start: start,
    end: index
  };
}

function scanOctalLiteral(prefix, start) {
  var number, octal;

  if (isOctalDigit(prefix)) {
    octal = true;
    number = '0' + source[index++];
  } else {
    octal = false;
    ++index;
    number = '';
  }

  while (index < length) {
    if (!isOctalDigit(source[index])) {
      break;
    }
    number += source[index++];
  }

  if (!octal && number.length === 0) {
    // only 0o or 0O
    throwUnexpectedToken();
  }

  if (isIdentifierStart(source.charCodeAt(index)) || isDecimalDigit(source.charCodeAt(index))) {
    throwUnexpectedToken();
  }

  return {
    type: _labels.Token.NumericLiteral,
    value: parseInt(number, 8),
    octal: octal,
    lineNumber: lineNumber,
    lineStart: lineStart,
    start: start,
    end: index
  };
}

function isImplicitOctalLiteral() {
  var i, ch;

  // Implicit octal, unless there is a non-octal digit.
  // (Annex B.1.1 on Numeric Literals)
  for (i = index + 1; i < length; ++i) {
    ch = source[i];
    if (ch === '8' || ch === '9') {
      return false;
    }
    if (!isOctalDigit(ch)) {
      return true;
    }
  }

  return true;
}

function scanNumericLiteral() {
  var number, start, ch;

  ch = source[index];
  assert(isDecimalDigit(ch.charCodeAt(0)) || ch === '.', 'Numeric literal must start with a decimal digit or a decimal point');

  start = index;
  number = '';
  if (ch !== '.') {
    number = source[index++];
    ch = source[index];

    // Hex number starts with '0x'.
    // Octal number starts with '0'.
    // Octal number in ES6 starts with '0o'.
    // Binary number in ES6 starts with '0b'.
    if (number === '0') {
      if (ch === 'x' || ch === 'X') {
        ++index;
        return scanHexLiteral(start);
      }
      if (ch === 'b' || ch === 'B') {
        ++index;
        return scanBinaryLiteral(start);
      }
      if (ch === 'o' || ch === 'O') {
        return scanOctalLiteral(ch, start);
      }

      if (isOctalDigit(ch)) {
        if (isImplicitOctalLiteral()) {
          return scanOctalLiteral(ch, start);
        }
      }
    }

    while (isDecimalDigit(source.charCodeAt(index))) {
      number += source[index++];
    }
    ch = source[index];
  }

  if (ch === '.' && !isIdentifierStart(source.charCodeAt(index + 1))) {
    number += source[index++];
    while (isDecimalDigit(source.charCodeAt(index))) {
      number += source[index++];
    }
    ch = source[index];
  }

  if (ch === 'e' || ch === 'E') {
    number += source[index++];

    ch = source[index];
    if (ch === '+' || ch === '-') {
      number += source[index++];
    }
    if (isDecimalDigit(source.charCodeAt(index))) {
      while (isDecimalDigit(source.charCodeAt(index))) {
        number += source[index++];
      }
    } else {
      throwUnexpectedToken();
    }
  }

  return {
    type: _labels.Token.NumericLiteral,
    value: parseFloat(number),
    lineNumber: lineNumber,
    lineStart: lineStart,
    start: start,
    end: index
  };
}

// ECMA-262 11.8.4 String Literals

function scanStringLiteral() {
  var str = '',
      quote,
      start,
      ch,
      unescaped,
      octToDec,
      octal = false;

  quote = source[index];

  start = index;
  ++index;

  while (index < length) {
    ch = source[index++];

    if (ch === quote) {
      quote = '';
      break;
    } else if (ch === '\\') {
      ch = source[index++];
      if (!ch || !isLineTerminator(ch.charCodeAt(0))) {
        switch (ch) {
          case 'u':
          case 'x':
            if (source[index] === '{') {
              ++index;
              str += scanUnicodeCodePointEscape();
            } else {
              unescaped = scanHexEscape(ch);
              if (!unescaped) {
                throw throwUnexpectedToken();
              }
              str += unescaped;
            }
            break;
          case 'n':
            str += '\n';
            break;
          case 'r':
            str += '\r';
            break;
          case 't':
            str += '\t';
            break;
          case 'b':
            str += '\b';
            break;
          case 'f':
            str += '\f';
            break;
          case 'v':
            str += '\x0B';
            break;
          case '8':
          case '9':
            str += ch;
            tolerateUnexpectedToken();
            break;

          default:
            if (isOctalDigit(ch)) {
              octToDec = octalToDecimal(ch);

              octal = octToDec.octal || octal;
              str += String.fromCharCode(octToDec.code);
            } else {
              str += ch;
            }
            break;
        }
      } else {
        ++lineNumber;
        if (ch === '\r' && source[index] === '\n') {
          ++index;
        }
        lineStart = index;
      }
    } else if (isLineTerminator(ch.charCodeAt(0))) {
      break;
    } else {
      str += ch;
    }
  }

  return {
    type: _labels.Token.StringLiteral,
    value: str,
    octal: octal,
    lineNumber: startLineNumber,
    lineStart: startLineStart,
    start: start,
    end: index
  };
}

function isIdentifierName(token) {
  return token.type === _labels.Token.Identifier || token.type === _labels.Token.Keyword || token.type === _labels.Token.BooleanLiteral || token.type === _labels.Token.NullLiteral;
}

function advance() {
  var cp, token;

  if (index >= length) {
    return {
      type: _labels.Token.EOF,
      lineNumber: lineNumber,
      lineStart: lineStart,
      start: index,
      end: index
    };
  }

  cp = source.charCodeAt(index);

  if (isIdentifierStart(cp)) {
    token = scanIdentifier();
    return token;
  }

  // Very common: ( and ) and ;
  if (cp === 0x28 || cp === 0x29 || cp === 0x3B) {
    return scanPunctuator();
  }

  // String literal starts with single quote (U+0027) or double quote (U+0022).
  if (cp === 0x27 || cp === 0x22) {
    return scanStringLiteral();
  }

  // Dot (.) U+002E can also start a floating-point number, hence the need
  // to check the next character.
  if (cp === 0x2E) {
    if (isDecimalDigit(source.charCodeAt(index + 1))) {
      return scanNumericLiteral();
    }
    return scanPunctuator();
  }

  if (isDecimalDigit(cp)) {
    return scanNumericLiteral();
  }

  // Possible identifier start in a surrogate pair.
  if (cp >= 0xD800 && cp < 0xDFFF) {
    cp = codePointAt(index);
    if (isIdentifierStart(cp)) {
      return scanIdentifier();
    }
  }

  //return scanStringLiteral(); // allows any character!!
  return scanPunctuator();
}

function collectToken() {
  var loc, token, value, entry;

  loc = {
    start: {
      line: lineNumber,
      column: index - lineStart
    }
  };

  token = advance();
  loc.end = {
    line: lineNumber,
    column: index - lineStart
  };

  if (token.type !== _labels.Token.EOF) {
    value = source.slice(token.start, token.end);
    if (_labels.TokenList[token.value] !== void 0 && Number.isInteger(_labels.TokenList[token.value])) {
      entry = {
        name: _labels.TokenList[token.value],
        range: [token.start, token.end],
        loc: loc
      };
    } else {
      entry = {
        name: token.type,
        value: value,
        range: [token.start, token.end],
        loc: loc
      };
    }
    if (extra.tokenValues) {
      extra.tokenValues.push(entry.type === 'Punctuator' || entry.type === 'Keyword' ? entry.value : null);
    }
    if (extra.tokenize) {
      if (!extra.range) {
        delete entry.range;
      }
      if (!extra.loc) {
        delete entry.loc;
      }
      if (extra.delegate) {
        entry = extra.delegate(entry);
      }
    }
    extra.tokens.push(entry);
  }
  return token;
}

function lex() {
  var token;
  scanning = true;

  lastIndex = index;
  lastLineNumber = lineNumber;
  lastLineStart = lineStart;

  skipComment();

  token = lookahead;

  startIndex = index;
  startLineNumber = lineNumber;
  startLineStart = lineStart;

  lookahead = typeof extra.tokens !== 'undefined' ? collectToken() : advance();
  scanning = false;
  return token;
}

function tokenize(code, options, delegate) {
  var toString, tokens;

  toString = String;
  if (typeof code !== 'string' && !(code instanceof String)) {
    code = toString(code);
  }

  source = code;
  index = 0;
  lineNumber = source.length > 0 ? 1 : 0;
  lineStart = 0;
  startIndex = index;
  startLineNumber = lineNumber;
  startLineStart = lineStart;
  length = source.length;
  lookahead = null;
  state = {
    allowIn: true,
    allowYield: true,
    labelSet: {},
    inFunctionBody: false,
    inIteration: false,
    inSwitch: false,
    lastCommentStart: -1,
    curlyStack: []
  };

  extra = {};

  // Options matching.
  options = options || {};

  // Of course we collect tokens here.
  options.tokens = true;
  extra.tokens = [];
  extra.tokenValues = [];
  extra.tokenize = true;
  extra.delegate = delegate;

  // The following two fields are necessary to compute the Regex tokens.
  extra.openParenToken = -1;
  extra.openCurlyToken = -1;

  extra.range = typeof options.range === 'boolean' && options.range;
  extra.loc = typeof options.loc === 'boolean' && options.loc;

  if (typeof options.comment === 'boolean' && options.comment) {
    extra.comments = [];
  }
  if (typeof options.tolerant === 'boolean' && options.tolerant) {
    extra.errors = [];
  }

  try {
    peek();
    if (lookahead.type === _labels.Token.EOF) {
      return extra.tokens;
    }

    lex();
    while (lookahead.type !== _labels.Token.EOF) {
      try {
        lex();
      } catch (lexError) {
        if (extra.errors) {
          recordError(lexError);
          // We have to break on the first error
          // to avoid infinite loops.
          break;
        } else {
          throw lexError;
        }
      }
    }

    tokens = extra.tokens;
    if (typeof extra.errors !== 'undefined') {
      tokens.errors = extra.errors;
    }
  } catch (e) {
    throw e;
  } finally {
    extra = {};
  }
  return tokens;
}

function peek() {
  scanning = true;

  skipComment();

  lastIndex = index;
  lastLineNumber = lineNumber;
  lastLineStart = lineStart;

  startIndex = index;
  startLineNumber = lineNumber;
  startLineStart = lineStart;

  lookahead = typeof extra.tokens !== 'undefined' ? collectToken() : advance();
  scanning = false;
}

exports.tokenize = tokenize;

},{"../labels":43,"./char":37}],40:[function(require,module,exports){
"use strict";

var _labels = require("./labels");

var _precedence = require("./precedence");

var PREFIX = _labels.TokenList.PREFIX;
var INFIX = _labels.TokenList.INFIX;
var POSTFIX = _labels.TokenList.POSTFIX;

/** PREFIX */
(0, _precedence.registerOperator)("!", -1, "none", "NOT", PREFIX);
(0, _precedence.registerOperator)("~", -1, "none", "BIT_NOT", PREFIX);
(0, _precedence.registerOperator)("+", -1, "none", "UNARY_ADD", PREFIX);
(0, _precedence.registerOperator)("-", -1, "none", "UNARY_SUB", PREFIX);

(0, _precedence.registerOperator)("++", -1, "none", "PRE_ADD", PREFIX); // removed in swift 3
(0, _precedence.registerOperator)("--", -1, "none", "PRE_SUB", PREFIX); // removed in swift 3

/** INFIX */
(0, _precedence.registerOperator)("*", 150, "left", "MUL", INFIX);
(0, _precedence.registerOperator)("/", 150, "left", "DIV", INFIX);
(0, _precedence.registerOperator)("%", 150, "left", "MOD", INFIX);
(0, _precedence.registerOperator)("&", 150, "left", "BIT_AND", INFIX);

(0, _precedence.registerOperator)("+", 140, "left", "ADD", INFIX);
(0, _precedence.registerOperator)("-", 140, "left", "SUB", INFIX);

(0, _precedence.registerOperator)("|", 140, "left", "BIT_OR", INFIX);
(0, _precedence.registerOperator)("^", 140, "left", "BIT_XOR", INFIX);

(0, _precedence.registerOperator)("is", 132, "left", "IS", INFIX);
(0, _precedence.registerOperator)("as", 132, "left", "AS", INFIX);
(0, _precedence.registerOperator)("as!", 132, "left", "AS_UNWRAP", INFIX);
(0, _precedence.registerOperator)("as?", 132, "left", "AS_EXPLICIT", INFIX);

(0, _precedence.registerOperator)("??", 131, "right", "NIL_COA", INFIX);

(0, _precedence.registerOperator)("<", 130, "none", "LT", INFIX);
(0, _precedence.registerOperator)("<=", 130, "none", "LE", INFIX);
(0, _precedence.registerOperator)(">", 130, "none", "GT", INFIX);
(0, _precedence.registerOperator)(">=", 130, "none", "GE", INFIX);

(0, _precedence.registerOperator)("==", 130, "none", "EQ", INFIX);
(0, _precedence.registerOperator)("!=", 130, "none", "NEQ", INFIX);

(0, _precedence.registerOperator)("===", 130, "none", "IDENT", INFIX);
(0, _precedence.registerOperator)("!==", 130, "none", "NIDENT", INFIX);

(0, _precedence.registerOperator)("&&", 120, "left", "AND", INFIX);
(0, _precedence.registerOperator)("||", 110, "left", "OR", INFIX);

(0, _precedence.registerOperator)("=", 90, "right", "ASSIGN", INFIX);
(0, _precedence.registerOperator)("*=", 90, "right", "CMP_MUL", INFIX);
(0, _precedence.registerOperator)("/=", 90, "right", "CMP_DIV", INFIX);
(0, _precedence.registerOperator)("%=", 90, "right", "CMP_MOD", INFIX);
(0, _precedence.registerOperator)("+=", 90, "right", "CMP_ADD", INFIX);
(0, _precedence.registerOperator)("-=", 90, "right", "CMP_SUB", INFIX);
(0, _precedence.registerOperator)("&=", 90, "right", "CMP_AND", INFIX);
(0, _precedence.registerOperator)("|=", 90, "right", "CMP_OR", INFIX);
(0, _precedence.registerOperator)("^=", 90, "right", "CMP_XOR", INFIX);
(0, _precedence.registerOperator)("&&=", 90, "right", "CMP_LAND", INFIX);
(0, _precedence.registerOperator)("||=", 90, "right", "CMP_LOR", INFIX);

/** POSTFIX */
(0, _precedence.registerOperator)("--", -1, "none", "POST_SUB", POSTFIX); // removed in swift 3
(0, _precedence.registerOperator)("++", -1, "none", "POST_ADD", POSTFIX); // removed in swift 3

},{"./labels":43,"./precedence":45}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var VERSION = exports.VERSION = require("../package.json").version;

},{"../package.json":1}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VERSION = exports.global = exports.compile = exports.evaluate = exports.generate = exports.tokenize = exports.parse = undefined;

var _Parser = require("./Parser");

var _Parser2 = _interopRequireDefault(_Parser);

var _Compiler = require("./Compiler");

var _Compiler2 = _interopRequireDefault(_Compiler);

var _Tokenizer = require("./Tokenizer");

var _Tokenizer2 = _interopRequireDefault(_Tokenizer);

var _global = require("./Environment/global");

var globals = _interopRequireWildcard(_global);

require("./build");

var _utils = require("./utils");

var _const = require("./const");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parse = function parse(tokens) {
  var parser = new _Parser2.default();
  return parser.parse(tokens);
};

var tokenize = function tokenize(code, opts) {
  var tokenizer = new _Tokenizer2.default();
  return tokenizer.scan(code, opts);
};

var generate = function generate(ast, opts) {
  var compiler = new _Compiler2.default();
  return compiler.compile(ast, opts);
};

var global = {};
for (var key in globals) {
  if (globals.hasOwnProperty(key)) {
    global[key] = globals[key];
  }
}

var compile = function compile(src) {

  var tokens = null;
  var ast = null;
  var code = null;

  tokens = tokenize(src);
  ast = parse(tokens);
  code = generate(ast, "JS");

  return code;
};

var evaluate = function evaluate(code) {
  new Function("__global", code)(global);
};

(0, _utils.greet)();

exports.parse = parse;
exports.tokenize = tokenize;
exports.generate = generate;
exports.evaluate = evaluate;
exports.compile = compile;
exports.global = global;
exports.VERSION = _const.VERSION;


if (typeof window !== "undefined") {
  window.hevia = {
    parse: parse,
    tokenize: tokenize,
    generate: generate,
    global: global,
    evaluate: evaluate,
    compile: compile,
    VERSION: _const.VERSION
  };
}

},{"./Compiler":6,"./Environment/global":11,"./Parser":32,"./Tokenizer":38,"./build":40,"./const":41,"./utils":47}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Operators = exports.TokenList = exports.Token = exports.Types = undefined;
exports.registerTT = registerTT;

var _precedence = require("./precedence");

var Types = exports.Types = {}; /**
                                 * This file contains all shit, to
                                 * provide a clean & fast way, to compare
                                 * nodes and tokens in later steps
                                 */

var Token = exports.Token = {};
var TokenList = exports.TokenList = {};
var Operators = exports.Operators = {};

var ii = 0;

/** Types */
(function (Label) {

  Label[Label["Program"] = ++ii] = "Program";

  Label[Label["MemberExpression"] = ++ii] = "MemberExpression";
  Label[Label["TernaryExpression"] = ++ii] = "TernaryExpression";
  Label[Label["BinaryExpression"] = ++ii] = "BinaryExpression";
  Label[Label["UnaryExpression"] = ++ii] = "UnaryExpression";
  Label[Label["CallExpression"] = ++ii] = "CallExpression";
  Label[Label["ParameterExpression"] = ++ii] = "ParameterExpression";

  Label[Label["BlockStatement"] = ++ii] = "BlockStatement";
  Label[Label["ReturnStatement"] = ++ii] = "ReturnStatement";
  Label[Label["IfStatement"] = ++ii] = "IfStatement";
  Label[Label["ForStatement"] = ++ii] = "ForStatement";
  Label[Label["ForInStatement"] = ++ii] = "ForInStatement";
  Label[Label["WhileStatement"] = ++ii] = "WhileStatement";
  Label[Label["RepeatStatement"] = ++ii] = "RepeatStatement";
  Label[Label["ExpressionStatement"] = ++ii] = "ExpressionStatement";

  Label[Label["ExtensionDeclaration"] = ++ii] = "ExtensionDeclaration";
  Label[Label["ClassDeclaration"] = ++ii] = "ClassDeclaration";
  Label[Label["FunctionDeclaration"] = ++ii] = "FunctionDeclaration";
  Label[Label["VariableDeclaration"] = ++ii] = "VariableDeclaration";
  Label[Label["OperatorDeclaration"] = ++ii] = "OperatorDeclaration";
  Label[Label["InitializerDeclaration"] = ++ii] = "InitializerDeclaration";
  Label[Label["ArrayDeclaration"] = ++ii] = "ArrayDeclaration";

  Label[Label["PseudoProperty"] = ++ii] = "PseudoProperty";
  Label[Label["TypeAnnotation"] = ++ii] = "TypeAnnotation";
  Label[Label["Parameter"] = ++ii] = "Parameter";
  Label[Label["TypeCast"] = ++ii] = "TypeCast";
  Label[Label["Identifier"] = ++ii] = "Identifier";
  Label[Label["Literal"] = ++ii] = "Literal";

  Label[Label["AssociativityExpression"] = ++ii] = "AssociativityExpression";
  Label[Label["PrecedenceExpression"] = ++ii] = "PrecedenceExpression";
})(Types);

/** Data types */
(function (Label) {

  Label[Label["EOF"] = ++ii] = "EOF";
  Label[Label["Keyword"] = ++ii] = "Keyword";
  Label[Label["Punctuator"] = ++ii] = "Punctuator";
  Label[Label["Identifier"] = ++ii] = "Identifier";
  Label[Label["BooleanLiteral"] = ++ii] = "BooleanLiteral";
  Label[Label["NullLiteral"] = ++ii] = "NullLiteral";
  Label[Label["StringLiteral"] = ++ii] = "StringLiteral";
  Label[Label["NumericLiteral"] = ++ii] = "NumericLiteral";
})(Token);

/** Tokens */
(function (Label) {

  /** Punctuators */
  Label[Label["("] = ++ii] = "LPAREN";
  Label[Label[")"] = ++ii] = "RPAREN";
  Label[Label["["] = ++ii] = "LBRACK";
  Label[Label["]"] = ++ii] = "RBRACK";
  Label[Label["{"] = ++ii] = "LBRACE";
  Label[Label["}"] = ++ii] = "RBRACE";
  Label[Label[":"] = ++ii] = "COLON";
  Label[Label[","] = ++ii] = "COMMA";
  Label[Label[";"] = ++ii] = "SEMICOLON";
  Label[Label["."] = ++ii] = "PERIOD";
  Label[Label["?"] = ++ii] = "CONDITIONAL";
  Label[Label["$"] = ++ii] = "DOLLAR";
  Label[Label["@"] = ++ii] = "ATSIGN";
  Label[Label["_"] = ++ii] = "UL";
  Label[Label["#"] = ++ii] = "HASH";
  Label[Label["->"] = ++ii] = "ARROW";
  /** Literals */
  Label[Label["nil"] = ++ii] = "NULL";
  Label[Label["true"] = ++ii] = "TRUE";
  Label[Label["false"] = ++ii] = "FALSE";
  /** Declaration keywords */
  Label[Label["func"] = ++ii] = "FUNCTION";
  Label[Label["var"] = ++ii] = "VAR";
  Label[Label["let"] = ++ii] = "CONST";
  Label[Label["class"] = ++ii] = "CLASS";
  Label[Label["init"] = ++ii] = "INIT";
  Label[Label["enum"] = ++ii] = "ENUM";
  Label[Label["extension"] = ++ii] = "EXTENSION";
  Label[Label["import"] = ++ii] = "IMPORT";
  Label[Label["inout"] = ++ii] = "INOUT";
  Label[Label["operator"] = ++ii] = "OPERATOR";
  Label[Label["protocol"] = ++ii] = "PROTOCOL";
  Label[Label["static"] = ++ii] = "STATIC";
  Label[Label["struct"] = ++ii] = "STRUCT";
  Label[Label["typealias"] = ++ii] = "TYPEALIAS";
  /** Access control */
  Label[Label["private"] = ++ii] = "PRIVATE";
  Label[Label["public"] = ++ii] = "PUBLIC";
  Label[Label["internal"] = ++ii] = "INTERNAL";
  /** Override */
  Label[Label["override"] = ++ii] = "OVERRIDE";
  Label[Label["final"] = ++ii] = "FINAL";
  /** Statement keywords */
  Label[Label["break"] = ++ii] = "BREAK";
  Label[Label["case"] = ++ii] = "CASE";
  Label[Label["continue"] = ++ii] = "CONTINUE";
  Label[Label["do"] = ++ii] = "DO";
  Label[Label["else"] = ++ii] = "ELSE";
  Label[Label["for"] = ++ii] = "FOR";
  Label[Label["guard"] = ++ii] = "GUARD";
  Label[Label["if"] = ++ii] = "IF";
  Label[Label["in"] = ++ii] = "IN";
  Label[Label["repeat"] = ++ii] = "REPEAT";
  Label[Label["return"] = ++ii] = "RETURN";
  Label[Label["switch"] = ++ii] = "SWITCH";
  Label[Label["where"] = ++ii] = "WHERE";
  Label[Label["while"] = ++ii] = "WHILE";
  /** Expression keywords */
  Label[Label["catch"] = ++ii] = "CATCH";
  Label[Label["super"] = ++ii] = "SUPER";
  Label[Label["self"] = ++ii] = "SELF";
  Label[Label["throw"] = ++ii] = "THROW";
  Label[Label["throws"] = ++ii] = "THROWS";
  Label[Label["try"] = ++ii] = "TRY";
  Label[Label["get"] = ++ii] = "GET";
  Label[Label["set"] = ++ii] = "SET";
  Label[Label["willSet"] = ++ii] = "WILLSET";
  Label[Label["didSet"] = ++ii] = "DIDSET";
  /** Operator declaration */
  Label[Label["prefix"] = ++ii] = "PREFIX";
  Label[Label["postfix"] = ++ii] = "POSTFIX";
  Label[Label["infix"] = ++ii] = "INFIX";
  /** Associative */
  Label[Label["associativity"] = ++ii] = "ASSOCIATIVITY";
  /** Precedence clause */
  Label[Label["precedence"] = ++ii] = "PRECEDENCE";
  /** Types */
  Label[Label["Void"] = ++ii] = "VOID";
  Label[Label["Int"] = ++ii] = "INT";
  Label[Label["Int8"] = ++ii] = "INT8";
  Label[Label["UInt8"] = ++ii] = "UINT8";
  Label[Label["Int32"] = ++ii] = "INT32";
  Label[Label["Int64"] = ++ii] = "INT64";
  Label[Label["UInt64"] = ++ii] = "UINT64";
  Label[Label["Double"] = ++ii] = "DOUBLE";
  Label[Label["Float"] = ++ii] = "FLOAT";
  Label[Label["Bool"] = ++ii] = "BOOLEAN";
  Label[Label["String"] = ++ii] = "STRING";
  Label[Label["Character"] = ++ii] = "CHARACTER";
})(TokenList);

/** 
 * Auto generate
 * str access key
 * for token list
 */
(function () {
  var index = 0;
  var length = Object.keys(TokenList).length;
  while (index < length) {
    if (TokenList[index] !== void 0) {
      TokenList[TokenList[index]] = index;
    }
    ++index;
  };
})();

/**
 * Register TokenList entry
 * @param {String} name
 * @param {String} value
 */
function registerTT(name, value) {
  TokenList[TokenList[value] = ++ii] = name;
  TokenList[TokenList[ii]] = ii;
}

},{"./precedence":45}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _labels = require("./labels");

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class AccessControl
 * @private
 */

var AccessControl = function AccessControl() {
  _classCallCheck(this, AccessControl);

  this.isFinal = false;
  this.isPublic = false;
  this.isPrivate = false;
  this.isInternal = false;
};

/**
 * @class Node
 * @export
 */


var Node = function () {
  function Node() {
    _classCallCheck(this, Node);
  }

  _createClass(Node, null, [{
    key: "Program",
    get: function get() {
      return function Program() {
        _classCallCheck(this, Program);

        this.kind = _labels.Types.Program;
        this.body = [];
      };
    }
  }, {
    key: "AssociativityExpression",
    get: function get() {
      return function AssociativityExpression() {
        _classCallCheck(this, AssociativityExpression);

        this.kind = _labels.Types.AssociativityExpression;
        this.associativity = null;
      };
    }
  }, {
    key: "PrecedenceExpression",
    get: function get() {
      return function PrecedenceExpression() {
        _classCallCheck(this, PrecedenceExpression);

        this.kind = _labels.Types.PrecedenceExpression;
        this.level = -1;
      };
    }
  }, {
    key: "InitializerDeclaration",
    get: function get() {
      return function InitializerDeclaration() {
        _classCallCheck(this, InitializerDeclaration);

        this.kind = _labels.Types.InitializerDeclaration;
        this.arguments = [];
        this.body = [];
      };
    }
  }, {
    key: "OperatorDeclaration",
    get: function get() {
      return function OperatorDeclaration() {
        _classCallCheck(this, OperatorDeclaration);

        this.kind = _labels.Types.OperatorDeclaration;
        this.name = null;
        this.body = [];
      };
    }
  }, {
    key: "ClassDeclaration",
    get: function get() {
      return function (_AccessControl) {
        _inherits(ClassDeclaration, _AccessControl);

        function ClassDeclaration() {
          _classCallCheck(this, ClassDeclaration);

          var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ClassDeclaration).call(this, null));

          _this.kind = _labels.Types.ClassDeclaration;
          _this.name = null;
          _this.extend = [];
          _this.body = [];
          return _this;
        }

        return ClassDeclaration;
      }(AccessControl);
    }
  }, {
    key: "ExtensionDeclaration",
    get: function get() {
      return function ExtensionDeclaration() {
        _classCallCheck(this, ExtensionDeclaration);

        this.kind = _labels.Types.ExtensionDeclaration;
        this.argument = null;
        this.body = [];
      };
    }
  }, {
    key: "RepeatStatement",
    get: function get() {
      return function RepeatStatement() {
        _classCallCheck(this, RepeatStatement);

        this.kind = _labels.Types.RepeatStatement;
        this.test = null;
        this.body = [];
      };
    }
  }, {
    key: "WhileStatement",
    get: function get() {
      return function WhileStatement() {
        _classCallCheck(this, WhileStatement);

        this.kind = _labels.Types.WhileStatement;
        this.test = null;
        this.body = [];
      };
    }
  }, {
    key: "ForInStatement",
    get: function get() {
      return function ForInStatement() {
        _classCallCheck(this, ForInStatement);

        this.kind = _labels.Types.ForInStatement;
        this.init = null;
        this.expression = null;
        this.body = [];
      };
    }
  }, {
    key: "ForStatement",
    get: function get() {
      return function ForStatement() {
        _classCallCheck(this, ForStatement);

        this.kind = _labels.Types.ForStatement;
        this.init = null;
        this.test = null;
        this.update = null;
        this.body = [];
      };
    }
  }, {
    key: "ParameterExpression",
    get: function get() {
      return function ParameterExpression() {
        _classCallCheck(this, ParameterExpression);

        this.kind = _labels.Types.ParameterExpression;
        this.arguments = [];
      };
    }
  }, {
    key: "Parameter",
    get: function get() {
      return function Parameter() {
        _classCallCheck(this, Parameter);

        this.kind = _labels.Types.Parameter;
        this.label = null;
        this.argument = null;
        this.init = null;
      };
    }
  }, {
    key: "IfStatement",
    get: function get() {
      return function IfStatement() {
        _classCallCheck(this, IfStatement);

        this.kind = _labels.Types.IfStatement;
        this.condition = null;
        this.consequent = null;
        this.alternate = null;
      };
    }
  }, {
    key: "ReturnStatement",
    get: function get() {
      return function ReturnStatement() {
        _classCallCheck(this, ReturnStatement);

        this.kind = _labels.Types.ReturnStatement;
        this.argument = null;
      };
    }
  }, {
    key: "PseudoProperty",
    get: function get() {
      return function PseudoProperty() {
        _classCallCheck(this, PseudoProperty);

        this.kind = _labels.Types.PseudoProperty;
        this.name = null;
        this.arguments = [];
        this.body = [];
      };
    }
  }, {
    key: "BlockStatement",
    get: function get() {
      return function BlockStatement() {
        _classCallCheck(this, BlockStatement);

        this.kind = _labels.Types.BlockStatement;
        this.body = [];
      };
    }
  }, {
    key: "FunctionDeclaration",
    get: function get() {
      return function (_AccessControl2) {
        _inherits(FunctionDeclaration, _AccessControl2);

        function FunctionDeclaration() {
          _classCallCheck(this, FunctionDeclaration);

          var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(FunctionDeclaration).call(this, null));

          _this2.kind = _labels.Types.FunctionDeclaration;
          _this2.name = null;
          _this2.type = null;
          _this2.arguments = [];
          _this2.body = [];
          _this2.isStatic = false;
          _this2.isOverride = false;
          _this2.isClassed = false;
          return _this2;
        }

        return FunctionDeclaration;
      }(AccessControl);
    }
  }, {
    key: "TypeCast",
    get: function get() {
      return function TypeCast() {
        _classCallCheck(this, TypeCast);

        this.kind = _labels.Types.TypeCast;
        this.expression = null;
        this.type = null;
        this.operator = null;
        this.isForced = false;
        this.isConditional = false;
      };
    }
  }, {
    key: "TernaryExpression",
    get: function get() {
      return function TernaryExpression() {
        _classCallCheck(this, TernaryExpression);

        this.kind = _labels.Types.TernaryExpression;
        this.condition = null;
        this.consequent = null;
        this.alternate = null;
      };
    }
  }, {
    key: "CallExpression",
    get: function get() {
      return function CallExpression() {
        _classCallCheck(this, CallExpression);

        this.kind = _labels.Types.CallExpression;
        this.callee = null;
        this.arguments = [];
      };
    }
  }, {
    key: "MemberExpression",
    get: function get() {
      return function MemberExpression() {
        _classCallCheck(this, MemberExpression);

        this.kind = _labels.Types.MemberExpression;
        this.object = null;
        this.property = null;
        this.isComputed = false;
      };
    }
  }, {
    key: "TypeAnnotation",
    get: function get() {
      return function TypeAnnotation() {
        _classCallCheck(this, TypeAnnotation);

        this.kind = _labels.Types.TypeAnnotation;
        this.type = null;
        this.isExplicit = false;
        this.isOptional = false;
        this.isReference = false;
        this.isUnwrap = false;
      };
    }
  }, {
    key: "ArrayDeclaration",
    get: function get() {
      return function ArrayDeclaration() {
        _classCallCheck(this, ArrayDeclaration);

        this.kind = _labels.Types.ArrayDeclaration;
        this.argument = [];
      };
    }
  }, {
    key: "VariableDeclaration",
    get: function get() {
      return function (_AccessControl3) {
        _inherits(VariableDeclaration, _AccessControl3);

        function VariableDeclaration() {
          _classCallCheck(this, VariableDeclaration);

          var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(VariableDeclaration).call(this, null));

          _this3.kind = _labels.Types.VariableDeclaration;
          _this3.symbol = null;
          _this3.declarations = [];
          _this3.init = null;
          _this3.isStatic = false;
          _this3.isOverride = false;
          _this3.isClassed = false;
          return _this3;
        }

        return VariableDeclaration;
      }(AccessControl);
    }
  }, {
    key: "AssignmentExpression",
    get: function get() {
      return function AssignmentExpression() {
        _classCallCheck(this, AssignmentExpression);

        this.kind = _labels.Types.AssignmentExpression;
        this.operator = null;
        this.left = null;
        this.right = null;
      };
    }
  }, {
    key: "UnaryExpression",
    get: function get() {
      return function UnaryExpression() {
        _classCallCheck(this, UnaryExpression);

        this.kind = _labels.Types.UnaryExpression;
        this.operator = null;
        this.argument = null;
        this.isPrefix = false;
      };
    }
  }, {
    key: "BinaryExpression",
    get: function get() {
      return function BinaryExpression() {
        _classCallCheck(this, BinaryExpression);

        this.kind = _labels.Types.BinaryExpression;
        this.operator = null;
        this.left = null;
        this.right = null;
        this.isParenthised = false;
      };
    }
  }, {
    key: "ExpressionStatement",
    get: function get() {
      return function ExpressionStatement() {
        _classCallCheck(this, ExpressionStatement);

        this.kind = _labels.Types.ExpressionStatement;
        this.expression = null;
      };
    }
  }, {
    key: "Identifier",
    get: function get() {
      return function Identifier() {
        _classCallCheck(this, Identifier);

        this.kind = _labels.Types.Identifier;
        this.name = null;
      };
    }
  }, {
    key: "Literal",
    get: function get() {
      return function Literal() {
        _classCallCheck(this, Literal);

        this.kind = _labels.Types.Literal;
        this.value = null;
        this.raw = null;
      };
    }
  }]);

  return Node;
}();

exports.default = Node;

},{"./labels":43}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POX_PRECEDENCE = exports.PEX_PRECEDENCE = exports.IFX_PRECEDENCE = undefined;
exports.registerOperator = registerOperator;

var _labels = require("./labels");

var IFX_PRECEDENCE = exports.IFX_PRECEDENCE = [];
var PEX_PRECEDENCE = exports.PEX_PRECEDENCE = [];
var POX_PRECEDENCE = exports.POX_PRECEDENCE = [];

/**
 * @param {String} op
 * @param {Number} lvl
 * @param {String} assoc
 * @param {String} name
 * @param {Number} type
 */
function registerOperator(op, lvl, assoc, name, type) {

  var obj = {
    op: op,
    level: lvl,
    associativity: assoc
  };

  // Operator already registered
  if (name in _labels.Operators) {
    // Just update its settings
    _labels.Operators[name] = obj;
    return void 0;
  }

  switch (type) {
    case _labels.TokenList.PREFIX:
      PEX_PRECEDENCE.push(obj);
      break;
    case _labels.TokenList.INFIX:
      IFX_PRECEDENCE.push(obj);
      IFX_PRECEDENCE.sort(function (a, b) {
        if (a.level > b.level) return 1;
        if (a.level < b.level) return -1;
        return 0;
      });
      break;
    case _labels.TokenList.POSTFIX:
      POX_PRECEDENCE.push(obj);
      break;
  };

  (0, _labels.registerTT)(name, op);
  _labels.Operators[name] = obj;
}

},{"./labels":43}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _labels = require("./labels");

var _nodes = require("./nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Scope
 * @export
 */

var Scope = function () {

  /**
   * @param {Node} scope
   * @param {Node} parent
   * @constructor
   */

  function Scope(scope, parent) {
    _classCallCheck(this, Scope);

    /**
     * Scope
     * @type {Node}
     */
    this.scope = scope;

    /**
     * Parent
     * @type {Node}
     */
    this.parent = parent;

    /**
     * Symbol table
     * @type {Object}
     */
    this.table = {};
  }

  /**
   * Get sth from table
   * @param  {String} name
   * @return {Node}
   */


  _createClass(Scope, [{
    key: "get",
    value: function get(name) {
      if (this.table[name] !== void 0) {
        return this.table[name];
      } else {
        if (this.parent !== void 0) {
          return this.parent.get(name);
        }
      }
    }

    /**
     * Get sth from scope by type
     * @param  {Number} type
     * @return {Node}
     */

  }, {
    key: "getByType",
    value: function getByType(type) {
      if (this.scope && this.scope.kind === type) {
        return this.scope;
      } else {
        if (this.parent !== void 0) {
          return this.parent.getByType(type);
        }
      }
    }

    /**
     * Get name of node
     * @param {Node} node
     * @return {String}
     */

  }, {
    key: "getName",
    value: function getName(node) {
      return node.value || node.name || node.id || (node.init ? node.init.value : void 0);
    }

    /**
     * Set sth into table
     * @param {Node} node
     */

  }, {
    key: "register",
    value: function register(node) {
      var name = this.getName(node);
      if (name !== void 0 && name !== null) {
        if (this.parent !== void 0) {
          //console.log(`Registered ${name}->${this.getName(this.scope)}:${getNameByLabel(this.scope.kind)}`);
        }
        this.table[name] = node;
      }
    }
  }]);

  return Scope;
}();

exports.default = Scope;

},{"./labels":43,"./nodes":44,"./utils":47}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inherit = inherit;
exports.uHash = uHash;
exports.getNameByLabel = getNameByLabel;
exports.getLabelByNumber = getLabelByNumber;
exports.isNumericType = isNumericType;
exports.isBoolean = isBoolean;
exports.getNumericType = getNumericType;
exports.greet = greet;

var _labels = require("./labels");

var _nodes = require("./nodes");

var _nodes2 = _interopRequireDefault(_nodes);

var _const = require("./const");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Object} cls
 * @param {Object} prot
 * @export
 */
function inherit(cls, prot) {

  var key = null;

  for (key in prot) {
    if (prot[key] instanceof Function) {
      cls.prototype[key] = prot[key];
    }
  };
}

var hashIndex = -1;
var hashes = [];

/**
 * Generate a unique hash
 * @return {Number}
 * @export
 */
function uHash() {

  var index = ++hashIndex;

  if (hashes.indexOf(index) > -1) return this.uHash();

  hashes.push(index);

  return index;
}

/**
 * Debug helper
 */
function getNameByLabel(name) {
  if (_labels.Token[name] !== void 0) {
    return _labels.Token[name];
  } else if (_labels.TokenList[name] !== void 0) {
    return _labels.TokenList[name];
  } else if (_labels.Types[name] !== void 0) {
    return _labels.Types[name];
  }
  return null;
}

/**
 * @param {Number} n
 * @return {String}
 */
function getLabelByNumber(n) {
  for (var key in _labels.TokenList) {
    if (_labels.TokenList[key] === n) {
      return key;
    }
  };
  return null;
}

/**
 * Numeric type check
 * @param  {Type}  type
 * @return {Boolean}
 */
function isNumericType(type) {
  return type === "Int" || type === "Int8" || type === "UInt8" || type === "Int32" || type === "UInt32" || type === "Int64" || type === "UInt64" || type === "Double" || type === "Float";
}

/**
 * @param  {Node} node
 * @return {Boolean}
 */
function isBoolean(node) {
  return node.kind === _labels.Types.Literal && (node.type === _labels.TokenList.TRUE || node.type === _labels.TokenList.FALSE);
}

/**
 * @param  {Number} n
 * @return {String}
 */
function getNumericType(n) {
  if (+n === n && !(n % 1)) {
    return "Int";
  }
  if (+n === n && !(n % 1) && n < 0x80 && n >= -0x80) {
    return "Int8";
  }
  if (+n === n && !(n % 1) && n < 0x8000 && n >= -0x8000) {
    return "Int16";
  }
  if (+n === n && !(n % 1) && n < 0x80000000 && n >= -0x80000000) {
    return "Int32";
  }
  if (+n === n && !(n % 1) && n >= 0) {
    return "Uint";
  }
  if (+n === n && !(n % 1) && n < 0x100 && n >= 0) {
    return "Uint8";
  }
  if (+n === n && !(n % 1) && n < 0x10000 && n >= 0) {
    return "Uint16";
  }
  if (+n === n && !(n % 1) && n < 0x100000000 && n >= 0) {
    return "Uint32";
  }
  if (+n === n && !(n % 1) && n < 0x100000000 && n >= 0) {
    return "Uint32";
  }
  if (+n === n) {
    return "Double";
  }
}

function greet() {

  if (typeof navigator !== "undefined" && navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
    var args = ["\n%c Hevia.js " + _const.VERSION + " %c %chttp://www.heviajs.com/ %c\n\n", "color: #fff; background: #030307; padding:5px 0;", "color: #9598b9; background: #2d316b; padding:5px 0;", "color: #9598b9; background: #2d316b; padding:5px 0;", "color: #9598b9; background: #2d316b; padding:5px 0;"];
    console.log.apply(console, args);
  } else {
    console.log("Hevia.js - " + _const.VERSION + " - http://www.heviajs.com/\n");
  }
}

},{"./const":41,"./labels":43,"./nodes":44}]},{},[42])(42)
});