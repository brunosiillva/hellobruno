function alturaJobs() {
  var alturaSmall = $("#jobs .small img").height();
  $("#jobs .small img").css("height", "auto");
  $("#jobs ul li.small").css("height", alturaSmall);

  var alturaBig = $("#jobs .big img").height();
  $("#jobs .big img").css("height", "auto");
  $("#jobs ul li.big").css("height", alturaBig);
}

function scroolMenu() {
  console.log("scroolMenu function");
}

function scroolMenuJob() {
  console.log("scroolMenuJob function");
}

function scrollSmoth() {
  $('a.anchor[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top + 2,
          },
          1000
        );
        return false;
      }
    }
  });
}

$(function () {
  //Dessa forma é igual ao .ready();
  $(".typed").typed({
    strings: ["world^1000", "bruno"],
    showCursor: false,
    startDelay: 1000,
    typeSpeed: 50,
  });

  $("#toggle").click(function () {
    $(this).toggleClass("active");
    $("#overlay").toggleClass("open");
    $("body").toggleClass("overflow");
  });

  //alturaJobs();
  scroolMenu();
  scroolMenuJob();
  scrollSmoth();
});

$(window).resize(function () {
  //alturaJobs();
});

$(window).scroll(function () {
  scroolMenu();
  scroolMenuJob();
});
