var Q = require('q');
var request = require('request');

function createPromise(url){
	var deferred = Q.defer(); //创建任务
	request(url,function(err,response,body){
		console.log("request" + url);
		if(err){
			deferred.reject(err); //错误返回
		}else{
			deferred.resolve(body);//成功返回
		}
	});
	return deferred.promise; //返回一个承诺
}
createPromise('http://localhost:3000/hello1').then(function(data){
	console.log(data);
},function(err){
	console.log(err);
})

