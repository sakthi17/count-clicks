$(document).ready(function(){
  
  sendAjax("app/get","GET",updateClickCount);
  
  $(".btn-add").click(function(){
    //console.log("Add Button clicked");
    sendAjax("app/add","GET",function(){
      sendAjax("app/get","GET",updateClickCount);
    });
  });
  
  $(".btn-delete").click(function(){
    //console.log("delete Button clicked");
    sendAjax("app/delete","DELETE",function(){
      sendAjax("app/get","GET",updateClickCount);
    });  
  });
  
  function updateClickCount(result,status,xhr){
    //console.log("In updateClickCount... " + JSON.stringify(result) + JSON.stringify(status));
    $("#click-nbr").html(result.click);
  }
  
  /* there is no $.delete() or $.put() in jquery like $.get(). we need to use $.ajax for such requests. So generalizing this as sendAjax() */
  function sendAjax(url,method,callback){
    if(callback === undefined){
      callback = function(){ console.log("AJAX " + method + " request to " + url + "success !!")}
    }
    
    $.ajax({
      url      :  url,
      method   :  method,
      success  :  callback  , 
      error    : function(xhr,status,error){ console.log("status : " + status + "error: " + error)}
    });   
  }
});

