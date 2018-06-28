var fs = require('fs')
var path = require('path')
var Mustache = require('mustache')

var TEMPLATE_DIR = path.join(__dirname, '../..', 'lib/templates')

function snakeToCamel(s) {
  return s.replace(/(\_\w)/g, function(m){return m[1].toUpperCase();});
}

function snakeToSpace(s) {
  return s.replace('_', " ");
}

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

let name = 'Entity';
let templateArg = '';
let outputArg = '';
let config = {
    uppercaseEntity: "",
    tableName: "",
    lowercaseEntity: "",
    spacedEntity: ""
};

let temp = "";


function run (/*args*/) {
  var values = [];
  var fns = Array.prototype.slice.call(arguments);

  function invokeNextFn (val) {
      values.unshift(val);
      if (fns.length === 0) return;
      invoke(fns.shift());
  }

  function invoke (fn) {
      fn.apply(null, [invokeNextFn].concat(values));
  }

  invoke(fns.shift());
}

function readTemplate (cb) {
  let partial = fs.createReadStream(templateArg);
  streamToStr(partial, function onDone (str) {
      temp = str;
      cb();
  });
}

function streamToStr (stream, cb) {
  var data = '';

  stream.on('data', function onData (chunk) {
      data += chunk;
  }).once('end', function onEnd () {
      cb(data.toString());
  }).on('error', function onError (err) {
      if (wasNotFound(err)) {
      console.error('Could not find file:', err.path);
      } else {
      console.error('Error while reading file:', err.message);
      }
      process.exit(1);
  });
}

function renderFile (cb) {
  temp = Mustache.render(temp, config);
  cb();
}

function toStdout (cb) {
  console.log("File written at: " + outputArg);
  if (outputArg) {
      cb(fs.writeFileSync(outputArg, temp));
  } else {
      cb(process.stdout.write(temp));
  }
}

function wasNotFound (err) {
  return err.code && err.code === 'ENOENT';
}


/**
 * Generate Controller file.
 *
 * @param {*} name
 */
function generateController(name) {
  name = name;
  templateArg = path.join(TEMPLATE_DIR, '/controller/controller.mustache')
  outputArg =  'src/controllers/'+snakeToCamel(name)+'Controller.js';
  config = {
      uppercaseEntity: snakeToCamel(name).capitalizeFirstLetter(),
      tableName: name,
      lowercaseEntity: snakeToCamel(name),
      spacedEntity: snakeToSpace(name)
  };

  run(readTemplate, renderFile, toStdout);
}

/**
 * Generate Model file.
 *
 * @param {*} name
 */
function generateModel(name) {
  name = name;
  templateArg = path.join(TEMPLATE_DIR, '/model/model.mustache')
  outputArg =  'src/models/'+snakeToCamel(name)+'Model.js';
  config = {
      uppercaseEntity: snakeToCamel(name).capitalizeFirstLetter(),
      tableName: name,
      lowercaseEntity: snakeToCamel(name),
      spacedEntity: snakeToSpace(name)
  };

  run(readTemplate, renderFile, toStdout);
}

function add(type, name) {
  switch(type) {
    case 'controller':
      console.log('generating controller:', name)
      generateController(name)
      break;

    case 'model':
      console.log('Generating model:', name)
      generateModel(name)
      break;

    case 'migration':
      console.log('Generating migration table:', name)
      break;

    case 'seeder':
      console.log('Generating seeder table:', name)
      break;

    default:
      console.log('Cannot determine which type to add')
  }
}

module.exports = add;