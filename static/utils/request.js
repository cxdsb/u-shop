/*
 封装一个promise 使用ajax请求接口的数据
*/
function Ajax({url="",data={},type="GET"}) {
  
    return new Promise((resolve,reject)=>{
     //使用ajax
     $.ajax({
         url,
         data,
         type,
         success:function(res) {
            if(res.code===200)
            {
              //请求成功返回的数据 数据库返回的数据是数组的格式
              resolve(res["list"]);
              
            }
            else{
                //数据有错误，做一个提示
               alert(res.msg); 
               
            } 
         },
         error:function(err) {
             //请求失败的情况
             console.log(err);
         }

     })

    })
}