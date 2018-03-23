(function($) {
  $.ajax({
    url : "http://localhost:9000/file/list",
    dataType : "jsonp",
    jsonp : "callback",
    data : ''
  });
})($);

