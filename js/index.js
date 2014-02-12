window.onload = function () {
  $().getClass('member').hover(function () {
    $().getTagName('ul').show();
  }, function () {
    $().getTagName('ul').hide();
  });

  var login = $().getId("login")
  login.center(300,200).resize(function(){
    login.center(300,200)
  });
  $().getClass("close").click(function(){
  	login.css("display", "none");
  })
};
