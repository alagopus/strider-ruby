var detect = require('strider-detection-rules')
var fs = require('fs')
var path = require('path')

function shellCommand(command) {
  if (!command || !command.replace(/#[^\n]*/g, '').trim().length) return
  return {
    command: 'sh',
    args: ['-x', '-c', command]
  }
}

module.exports = {
  init: function (config, job, context, done) {
    var test = undefined
    if (config && config.test !== 'none') {
      test = config.test
    }
    var defaultPrepare = function (context, done) {
        if (!fs.existsSync(path.join(context.dataDir, 'Gemfile'))) {
          // skip if default and no Gemfile exists
          // we assume that if you're configuring your own, you'll ensure the file exists
          return done(null, true)
        }
        context.cmd("bundle install", function (err) {
          done(err, true)
        })
    }
    var prepare = defaultPrepare
    if (config && config.prepare) {
      prepare = shellCommand(config.prepare)
    }
    done(null, {
      prepare: prepare,
      test: test
    })
  },
  autodetect: {
    filename: 'Gemfile',
    exists: true,
    language: 'ruby',
    framework: null
  }
}
