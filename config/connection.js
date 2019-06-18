const mysql      = require('mysql');
const $dbInfo      = require('./info');
const pool = mysql.createPool($dbInfo);

// 链接数据库
const getConnection = (callback) => {
  pool.getConnection(function (err, connection) {
    if (err) {
      return console.log('[query] - :' + err);
    }
    typeof callback === 'function' && callback(connection)
  })
}
// 状态码
const statusCode = {
  200: 'Successful operation',
  301: 'Moved Permanently',
  404: 'Not Found',
  500: 'Internal Server Error'
}

module.exports = {
  // 对数据库SQL操作
  querySQL (sql, callback) {
    getConnection((connection) => {
      connection.query(sql, function(err, rows, fields) {
        if (err) {
          return console.log('[query] - :' + err);
        } else {
          typeof callback === 'function' && callback(rows)
          // 每次操作完毕释放
          connection.release();
        }
      });
    })
  },
  // 设置返回的数据格式
  dataFormat (data, status = 200) {
    
    return {
      "status": status,
      "data": data,
      "message": statusCode[status],
      "serverTime": new Date()
    }
  }
}
