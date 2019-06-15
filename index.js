// API
const express = require('express');
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
const FileStreamRotator = require('file-stream-rotator')

// Import modules
const swaggerDoc = require('./swaggerDoc');
const view = require('./src/view/index')

// Init
const app = express()
const logDirectory = path.join(__dirname, 'log')

// --Start-- 创建日志记录写入log路径下的文件 Start
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
let accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDDYYYY',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})
app.use(morgan('combined', {stream: accessLogStream}))
// --END--

swaggerDoc(app) // swagger setting
view(app)


app.listen(8002, function (){
  console.log('Example app listening on port 8002!');
  console.log(`Your application is running here: http://localhost:8002/`)
});