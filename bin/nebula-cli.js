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
  .option('-r --resource', 'Add controller resources for your model')
  .action(addController)

program.command('add:migration <filename>')
  .description('generate table migration file')
  .action(addMigration)

program.command('add:seeder <filename>')
  .description('generate table seeder file')
  .action(addSeeder)

program.command('knex <command>')
  .description('using the Knex CLI with nebula configurations')
  .action(useKnex)

// program.command('build', 'build for production mode')
//   .action(function(file) { console.log(file); })

// program.command('run', 'start the project in development mode')
//   .action(function(file) { console.log(file); })

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
    console.log('Done.')
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

  mkdirp(appName)
  copyDirTemplate('core', dir)
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
  add('controller', fileName);
}

/**
 * Add table migration.
 *
 * @param {String} fileName
 */

function addMigration(fileName, cmd) {
  add('migration', fileName);
}

/**
 * Add table seeder
 *
 * @param {String} fileName
 */

function addSeeder(fileName, cmd) {
  add('seeder', fileName);
}


function useKnex(command, cmd) {
  var fileName = process.argv[4]

  if (!fileName) {
    process.exit();
  }

  shell.exec('knex ' + command + ' '  + fileName + ' --cwd');
}