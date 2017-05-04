function alturaJobs(){
	var alturaSmall = $('#jobs .small img').height();
	$('#jobs .small img').css('height', 'auto');
	$('#jobs ul li.small').css('height', alturaSmall);

	var alturaBig = $('#jobs .big img').height();
	$('#jobs .big img').css('height', 'auto');
	$('#jobs ul li.big').css('height', alturaBig);
};

function scroolMenu(){
	var ScroolH = $(window).scrollTop();
	var alturaTopo = $('.alturaScroll').height();

	if(ScroolH > alturaTopo-20){
		$('.button_container').addClass('color');
		$('.logo-topo').css('display', 'none');
	}else{
		$('.button_container').removeClass('color');
		$('.logo-topo').css('display', 'block');
	}
}

function scroolMenuJob(){
	var ScroolH = $(window).scrollTop();

	if(ScroolH > 680){
		$('#job .button_container').addClass('color');
		$('#job .logo-topo').css('display', 'none');
	}else{
		$('#job .button_container').removeClass('color');
		$('#job .logo-topo').css('display', 'block');
	}
}

function scrollSmoth(){
	$('a.anchor[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top+2
				}, 1000);
				return false;
			}
		}
	});
}

function allHeightSobre(){
	var largura = $(window).width();
	var alturaAll = $('.bgwhite').outerHeight();
	if(largura > 768 ){
		$('.pagesobre').css('height', alturaAll);
		$('.titulo').css('height', alturaAll);
	}
}

$(function(){ //Dessa forma é igual ao .ready();
	$(".typed").typed({
		strings: ["world^1000", "bruno"],
		showCursor: false,
		startDelay: 1000,
		typeSpeed: 50
	});

	$('#toggle').click(function() {
		$(this).toggleClass('active');
		$('#overlay').toggleClass('open');
		$('body').toggleClass('overflow');
	});

	//alturaJobs();
	scroolMenu();
	scroolMenuJob();
	scrollSmoth();
	allHeightSobre();
});

$(window).resize(function() {
	//alturaJobs();
	allHeightSobre();
});

$(window).scroll(function () {
	scroolMenu();
	scroolMenuJob();
});
