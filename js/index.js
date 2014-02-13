window.onload = function () {
  $().getClass('member').hover(function () {
    $().getTagName('ul').show();
  }, function () {
    $().getTagName('ul').hide();
  });

  var login = $().getId("login")
  login.center(300,200);

  $().resize(function(){
    login.center(300,200)
    if(login.css("display") == "block"){
      $().getId("screen").lock();
    }
  })

  $().getClass("close").click(function(){
  	login.css("display", "none");
  	$().getId("screen").unlock();
  })

  $().getClass("login").click(function(){
  	login.css("display", "block");
  	$().getId("screen").lock();
  })
  login.drag([$().getTagName('h2').getElement(0)])
};
