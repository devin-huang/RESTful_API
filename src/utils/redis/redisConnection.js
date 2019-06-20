const { port, address, password } = require('./config')
const redis = require('redis')
const client = redis.createClient(port, address, password)


module.exports = redisConnect = () => {
  client.on('connect', function() {
    console.log('Redis client connected')
    // 切换redis存储数据库
    // client.select('1', (err) => {
    //   if (err) throw err
    //   else console.log('Redis Select Successful')
    // })
    
    // Object类型写入
    client.hmset("hosts", {"name": "devin"})
    client.hmset("hosts", {"age": "20"})
    
    // Object类型读取
    client.hgetall("hosts", function (error, result) {
      if (error) {
        console.log(error)
        throw error
      }
      console.log(`Read Redis Data:`)
      console.dir(result)
    })
  })
  
  client.on('error', function (err) {
    console.log('Something went wrong ' + err)
  })
}


