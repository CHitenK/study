var mysql = require('mysql')
const sqldata = require('./libs/sql_source_prod')
var connection = mysql.createConnection({  
  host: '10.10.102.208', // 连接的服务器
  port: 3306, // mysql服务运行的端口
  database: 'derp-system', // 选择的库
  user: 'root', // 用户名
  password: '123456' // 用户密码  
})

connection.connect() // 创建一个mysql的线程
return false
const array = sqldata.newData // newData oldData

array.forEach( item => {
  const sql = `update st_permission_info set url='${item.url}', server_addr='${item.server_addr}' where id=${item.id}`
  connection.query(sql, (err, results, fields) => {
      if (err) { 
          console.log('UPDATE ERROR - ', err.message);
          throw err
      }
      console.log(results)
  })
})

connection.end(function(err){
  console.log('all is ok')
});