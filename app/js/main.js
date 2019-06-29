$( document ).ready(function() {
	$('.viewed-products-slider').owlCarousel({
		nav: true,
		loop: true,
		margin: 15,	
		autoWidth: false,
		dots: false,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:3
			},
			1000:{
				items:5
			}
		}
	});
});

if ($(window).width() > 1023) {
	$(window).scroll(function() {
		//change offset to 150 on dev
		if ($(this).scrollTop() >= 1) { 
			if($("#small-header").hasClass("show") === false){
				$("#small-header").addClass("show");
			}
		}else{
			$("#small-header").removeClass("show");
		}
	});
}

$( ".sections-wrapper .dropdown" ).each(function(e) {
	var width = $(".sections-list").width() + 30;
  	$(this).width(width);
});