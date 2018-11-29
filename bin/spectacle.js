#!/usr/bin/env node

const chokidar = require('chokidar')
const Queue = require('queue-promise')
const program = require('commander')
const { spawn } = require('child_process')
const { parse, join } = require('path')

const queue = new Queue({ concurrent: 1 })

program
  .version('0.0.0')
  .option('-p, --watchPath <path>', 'paths to watch, a glob')
  .option('-e, --subExtension <ext>', 'extension to insert, e.g. spec')
  .option('-c, --command <command>', 'the command to run for each changed file')
  .parse(process.argv)

async function watchWatchPath (watchPath) {
  return Promise.resolve(chokidar.watch(watchPath))
}

async function callbackOnEvent ({ emitter, eventName, callback }) {
  emitter.on(eventName, callback)
  return Promise.resolve(emitter)
}

function pathContainsSubExtension(pathString, subExtension) {
  // @todo

  // if path name contains sub extension, resolve it must not search the whole
  // path, just the last two "." delimited extensions
  const { name } = parse(pathString)
  const endsWithSubExtension = new RegExp(`(.+\\.${subExtension})$`)

  return endsWithSubExtension.test(name)
}

function targetFileExists(path) {
  return true
}

function createTransformPathName(subExtension) {
  return async function tranformPathName(pathString) {
    if (!pathString) return Promise.resolve(false)
    const { root, dir, base, ext } = parse(pathString)
    if (pathContainsSubExtension(pathString, subExtension)) {
      return Promise.resolve(pathString)
    }
    // otherwise, add the sub extension
    const targetFileName = base.replace(ext, `.${subExtension}${ext}`)
    const targetPath = join(root, dir, targetFileName)
    return Promise.resolve(targetPath)
  }
}

function createBuildCommand(command) {
  return async function buildCommand(pathName) {
    if (!pathName) return Promise.resolve(false)
    return Promise.resolve([command, pathName].join(' '))
  }
}

function createPromise(command) {
  if (!command) return Promise.resolve(false)
  // console.log('creating promise for: ' + command)
  return new Promise((resolve, reject) => {
    // console.log(`spawn: ${command}`)
    const commandArguments = command.split(' ')
    const commandExec = commandArguments.shift()
    const runningCommand = spawn(commandExec, commandArguments, { stdio: 'inherit'})
    runningCommand.stdout.pipe(process.stdout)
    runningCommand.stderr.pipe(process.stderr)
    runningCommand.on('error', reject)
    runningCommand.on('exit', resolve)
  })
}

async function addCommandToQueue (command) {
  if (!command) return Promise.resolve(false)
  queue.enqueue(() => createPromise(command))
}

function createQueueCommand({ subExtension, command }) {
  return async function queueCommand(pathName) {
    if (!pathName) return Promise.resolve(false)
    return createTransformPathName(subExtension)(pathName)
      .then(createBuildCommand(command))
      .then(addCommandToQueue)
  }
}

watchWatchPath(program.watchPath)
  .then(emitter => {
    return callbackOnEvent({
      eventName: 'change',
      callback: createQueueCommand(program),
      emitter
    })
  })
  .then(emitter => {
    emitter.on('ready', function () {
      console.log(`Listening for changes in ${program.watchPath}`)
    })
  })
  .catch(error => {
    throw error;
  })
