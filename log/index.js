const path = require('path')
const fs = require('fs')
// 日志中间件
const morgan = require('morgan')
const FileStreamRotator = require('file-stream-rotator')

const logDirectory = path.join(__dirname, 'logRecord')

// --Start-- 创建日志根据日期记录并写入logRecord路径下的文件
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
let accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDDYYYY',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})
// --END--

module.exports = morgan('combined', {stream: accessLogStream})