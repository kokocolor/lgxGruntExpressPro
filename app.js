var express=require('express');  
var app=express();

//路由
app.get('/index',function(req,res){
	res.render("index");

});
app.get('/pro',function(req,res){
	res.render("pro");

});
app.get('/aboutme',function(req,res){
	res.render("aboutme");

});
 
//静态资源文件
app.use(express.static('./dist/public'));

//模板引擎
var swig=require('swig');
 
app.set('view engine', 'html');
app.set('views', __dirname + '/dist/views');
app.engine('html', swig.renderFile);

//定义错误处理
app.get('*',function(req, res, next) {
     
    res.status(404);
    res.end('404');
    
});

app.use(function(err, req, res, next) {
   
  res.status(500);
  res.end('error...');
});

//监听端口
app.listen(3000,function(){
	console.log('lgx-server is running!');
});