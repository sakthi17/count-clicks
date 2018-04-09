var ClickHandler = require(process.cwd() + '/controller/server_ClickHandler.js');

function routes(app,db){    
  var clickhandler = new ClickHandler(db);
    
  app.get('/',function(request,response){
    response.sendFile(process.cwd() + "/index.html");
  }); 
  
  app.get('/app/get',function(request,response){
    clickhandler.getClick(request,response);
  });
  
  app.get('/app/add',function(request,response){
    clickhandler.addClick(request,response);
  });
  
  app.delete('/app/delete',function(request,response){
    clickhandler.resetClick(request,response);
  }); 

  app.use(function(err,req,resp,next){
    console.log("Drained here: " + req.url + " " + req.method);
  });
  
}  

module.exports = routes;


