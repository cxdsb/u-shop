//加载数据库
let mysql = require("mysql")

//链接数据库配置
let config = {
    host:"localhost", 
    port:3306,
    user:"root",
    database:"xiaou", //数据库名
    password:"root"
}

//声明一个类
class Dbconfig{
     //构造函数 //当类new实例是自动调用执行  
     constructor()
     {
        this.con = mysql.createConnection(config); 
        this.con.connect(err=>{
            if(err)
            {
              console.log("链接失败");
              return;
            }else
            {
                console.log("链接成功");
            }
        })
     }

     //定义方法
     //sql 参数  sql 执行sql语句
     getquery(sql)
     {
        //返回一个promise
      return new Promise((resolve,reject)=>{
        this.con.query(sql,(err,result)=>{
            if (err) { //失败
                resolve([err, '']);
            } else { //成功
                resolve(['', result]);
            }

        })
      }) 

     }

     async querys(sql)
     { 
        let data =  await this.getquery(sql);
        return data;

     }

}

module.exports = new Dbconfig();