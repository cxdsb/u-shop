/*
  封装的promise
*/
function to(promise) {
    let p = promise.then(data => [null, data]) //sql查询出来之后又一个数据 data就是方法擦查询的数据
          .catch(err => [err, undefined]); //失败err undefined
    return p;
}
module.exports = to;