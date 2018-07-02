#!/usr/bin/env node

var program = require('commander')
var shell = require('shelljs');
var fs = require('fs')
var ncp = require('ncp').ncp
var mkdirp = require('mkdirp')
var path = require('path')
var readline = require('readline')

var add = require('./scripts/add');

var VERSION = require('../package').version
var TEMPLATE_DIR = path.join(__dirname, '..', 'lib/templates')
var PROJECT_CORE_URL = 'https://github.com/jeescu/nebula-core.git'

program
  .name('nebula')
  .version(VERSION, '--version')
  .usage('[command] [dir/file] [options]')

program.command('create <dir>')
  .description('create new project template')
  .action(createApplication)

program.command('add:model <filename>')
  .description('generate model file')
  .action(addModel)

program.command('add:controller <filename>')
  .description('generate controller file with resource (--resource) options')
  .option('-r, --resource', 'Add controller resources for your model')
  .action(addController)

program.command('add:migration <filename>')
  .description('generate table migration file, (uses Knex command)')
  .action(addMigration)

program.command('add:seeder <filename>')
  .description('generate table seeder file, (uses Knex command)')
  .action(addSeeder)

// program.command('build', 'build for production mode')
//   .action(function(file) { console.log(file); })

program.command('run')
  .description('start the project in development mode')
  .action(runDevelopment)

program.parse(process.argv);


/**
 * Copy file from template directory.
 */

function copyTemplate (from, to) {
  write(to, fs.readFileSync(path.join(TEMPLATE_DIR, from), 'utf-8'))
}

function copyDirTemplate (from, to, fn) {
  ncp(path.join(TEMPLATE_DIR, from), to, function(err) {
    if (err) {
      console.error(err)
      return;
    }
    fn()
  });
}

/**
 * Copy multiple files from template directory.
 */

function copyTemplateMulti (fromDir, toDir, nameGlob) {
  fs.readdirSync(path.join(TEMPLATE_DIR, fromDir))
    .filter(minimatch.filter(nameGlob, { matchBase: true }))
    .forEach(function (name) {
      copyTemplate(path.join(fromDir, name), path.join(toDir, name))
    })
}

/**
 * Create application from a directory path
 *
 * @param {String} dir
 */

function createApplication(dir, cmd) {
  var appName = dir || 'hello-world'
  console.info('Generating application:', appName)

  // getting core project template
  shell.exec('git clone --depth=1 ' + PROJECT_CORE_URL + ' ' + appName + ' && rm -rf ' + appName + '/.git')

  // var installDependencies = function() {
  console.log('Installing npm dependencies ...')
  shell.exec('npm install --prefix ' + process.cwd() + '/' + appName)
}

/**
 * Add a model from an existing project.
 *
 * @param {String} fileName
 */

function addModel(fileName, cmd) {
  add('model', fileName);
}

/**
 * Add a controller from an existing project.
 *
 * @param {String} fileName
 */

function addController(fileName, cmd) {
  add('controller', fileName, cmd);
}

/**
 * Add table migration.
 *
 * @param {String} fileName
 */

function addMigration(fileName, cmd) {
  useKnex({
    cmd: 'migrate:make',
    fileName: fileName
  });
}

/**
 * Add table seeder
 *
 * @param {String} fileName
 */

function addSeeder(fileName, cmd) {
  useKnex({
    cmd: 'seed:make',
    fileName: fileName
  });
}

function runDevelopment() {
  var runScript = 'nodemon -w src --exec \"babel-node src --presets es2015,stage-0\" --prefix ' + process.cwd()
  shell.exec(runScript)
}

/**
 * Knex commands
 * 
 * @param {*} config 
 */
function useKnex(config) {
  var fileName = config.fileName || ''
  var knexfilePath = __dirname + '/../knexfile.js'
  shell.exec('knex --knexfile=' + knexfilePath + ' ' + config.cmd + ' '  + fileName + ' --cwd');
}