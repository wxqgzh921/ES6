let express = require('express');
// let router = express.Router();
let bodyParser = require('body-parser')

let app = express()
app.set('view engine','ejs')
app.set('views','qiqiview')
app.use(bodyParser.json({type: 'application/json'}))


app.get('/',function(req,res,next){
	res.render('index',{title:'Express'});
})
//请求1
app.get('/hello1',function(req,res){
	res.json({name:'213213'});
});

// //请求2
// router.get('/hello2',funciton(req,res,next){
// 	setTimeout(funciton(){
// 		res.send('请求2完成');
// 	},2000);
// });
// //请求3
// router.get('/hello3',function(req,res,next){
// 	setTimeout(function(){
// 		res.send('请求3完成');
// 	},3000);
// });

app.set('port',process.env.port || 5000)
let appPort = app.get('port')

let server = app.listen(appPort,()=>{
	let port = server.address().port
	let host = server.address().address
})
