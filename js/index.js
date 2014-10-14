window.onload = function () {
  $('#header .member').hover(function () {
    $(this).css('background', 'url(images/arrow2.png) no-repeat 55px center');
    $('#header .member_ul').show().animate({
      t : 30,
      step : 10,
      mul : {
        o : 100,
        h : 120
      }
    });
  }, function () {
    $(this).css('background', 'url(images/arrow.png) no-repeat 55px center');
    $('#header .member_ul').animate({
      t : 30,
      step : 10,
      mul : {
        o : 0,
        h : 0
      },
      fn : function () {
        $('#header .member_ul').hide();
      }
    });
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
