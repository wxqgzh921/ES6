var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	res.render('index',{title:'Express'});
})
//请求1
router.get('/hello1',function(req,res,next){
	setTimeout(function(){
		res.send('请求1完成');
	},1000);
});
//请求2
router.get('/hello2',funciton(req,res,next){
	setTimeout(funciton(){
		res.send('请求2完成');
	},2000);
});
//请求3
router.get('/hello3',function(req,res,next){
	setTimeout(function(){
		res.send('请求3完成');
	},3000);
});
module.exports = router ;