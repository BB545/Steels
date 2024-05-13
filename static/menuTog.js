$(document).ready(function () {
    $(".nav__toggle").click(function () {
      $(".nav__div").toggle();
    });

    $(window).resize(function () {
      $(".nav__div").hide();
    });
});