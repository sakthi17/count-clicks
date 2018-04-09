function clickHandler(db){
  var collection = db.collection("demo");
  
  this.addClick = function (request,response){
    collection.findAndModify({},{'_id': 1},{ $inc: { 'click' : 1}} ,function(err,result){
      if(err) throw err;
      response.json(result);
    });
  };
  
  this.resetClick = function (request,response){
    collection.updateOne({}, {$set : {click: 0}},function(err,result){
      if(err) throw err;
      response.json(result);
    });
  };
  
  this.getClick = function (request,response){
    collection.findOne({},{'_id' : true},function(err,doc){
     if(err) throw err;
     
     if(doc === null)
     {
        collection.insertOne({'click' : 0},function(err,result){
          if(err) throw err;
          
          collection.findOne({},{'_id' : true},function(err,doc){
            if(err) throw err;
            response.send(doc);           
          })
        }); 
     }
     else
     {
       response.json(doc);
     }       
    });  
  }; 

}

module.exports = clickHandler;
