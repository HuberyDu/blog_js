window.onload = function () {
  $('.member').hover(function () {
    $('ul').show();
  }, function () {
    $('ul').hide();
  });

  var login = $("#login");
  login.center(300,200);
  $().resize(function(){
    login.center(300,200);
    if(login.css(display) == "block"){
      $("#screen").lock();
    }
  })

  $(".close").click(function(){
    login.css("display", "none");
    $("#screen").unlock();
  })

  $(".login").click(function(){
    login.css("display", "block");
    $("#screen").lock();
  })

  login.drag([$('h2').getElement(0)])

  $("h2 span").css("color", "red")

  $("#boxinput").click(function(){
    $("#box").animate({
      attr  : "o",
      target : 100,
      step : 5
    });
  })
};
