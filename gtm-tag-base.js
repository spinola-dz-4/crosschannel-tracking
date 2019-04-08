<script> 
//get referrer info and shorten it
  var ref = {{Referrer}}
  function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}
  ref = extractDomain(ref);
  
//create cookie  
 
    function createCookie(name,value,days) {
        if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }
  
  var cookie = "";
  //check if the source cookie is already present and append |
  if({{sourceCookie}}){cookie = {{sourceCookie}} + "|"};
  
  //check if UTMs are present and set cookie content to the source utm
  if({{utm_source}}){
  createCookie("source",cookie+{{utm_source}},1000)
  //check if gclid is present and set cookie content to AdWords
  }else if({{gclid}}){
    createCookie("source",cookie+"AdWords",1000)
  //check if referrer is present and set cookie content to the referrer
  }else if(cookie && ref){
    createCookie("source",cookie+ref,1000);
  }else{
    createCookie("source",ref,1000);
  };
  </script>