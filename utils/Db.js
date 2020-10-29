// 加载数据库
let mysql = require("mysql");
let to = require("./awaitTo");

// 配置连接数据库
let config = {
    host: "localhost",
    port: 3306,
    user: "root",
    database: "xiaou", //数据库名
    password: "root"
}

//   定义一个类

class Db {
    // 定义一个静态方法
    static connect2() {
        // 当前对象新增属性
      this.con = mysql.createConnection(config);
     
        this.con.connect(err => {
            if (err) {
                console.log("链接失败");
                return;
            } else {
                console.log("链接成功");
            }
        })
    }
    // 封装promise 异步处理sql语句
    static operator(sqlstr) {
        // 返回一个promise
       return new Promise((resolve, reject) => {
            this.con.query(sqlstr, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result)
                }
            })
        })
    }
     //Promise 处理得到结果
 static async query(sqlStr)
 {
     return await to(this.operator(sqlStr))
 }
}

module.exports = Db;