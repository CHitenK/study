var mysql = require('mysql')
const sqldata = require('./libs/sql_source_test')
var connection = mysql.createConnection({  
  host: '10.10.102.208', // 连接的服务器
  port: 3306, // mysql服务运行的端口
  database: 'derp-system', // 选择的库
  user: 'root', // 用户名
  password: '123456' // 用户密码  
})

connection.connect() // 创建一个mysql的线程

const array = sqldata.newData // newData oldData

array.forEach( item => {
  const sql = `update st_permission_info set url='${item.url}', server_addr='${item.server_addr}' where authority_name='${item.authority_name}'`
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


/**
 * # SELECT * FROM st_permission_info WHERE id IN (10150, 10151, 10152, 10153)
 * 
 * #UPDATE st_permission_info SET url="http://depx.topideal.mobi/storage/resultlist?fom=oldsystem",server_addr="2" where authority_name="盘点结果列表";
#UPDATE st_permission_info SET url="http://depx.topideal.mobi/storage/typelist?fom=oldsystem",server_addr="3" where authority_name="仓储类型调整";
#UPDATE st_permission_info SET url="http://depx.topideal.mobi/storage/stocklist?fom=oldsystem",server_addr="4" where authority_name="仓储库存调整";
 */


