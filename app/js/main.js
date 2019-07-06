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

	$('.product-slider').owlCarousel({
        items:1,
        dots: false,
        nav: true,
        loop:false,
        lazyLoad:true,
        center:true,
        margin:10,
        URLhashListener:true,
        autoplayHoverPause:true,
        startPosition: 'URLHash'
    });

    /*Header scripts*/
    $('.catalog-show').hover(function(){
    	
    	if($(this).hasClass('fixed-drop'))
    		$('.catalog-drop').addClass('fix-drop');
    	else
    		$('.catalog-drop').removeClass('fix-drop');
    	$('.catalog-drop').addClass('show');
    },
    function(){
    	$('.catalog-drop').removeClass('show');
    });

    /*$('.catalog-drop').hover(function(){
    	$(this).addClass('show');
    });*/

	$('.catalog-drop .expbutton').click(function(e){
		$(this).parent('li').parent('ul').addClass('expanded');
		$(this).hide();
	});

	/*Global overlay*/
	$('.overlay').click(function(e){
		if(!$(this).hasClass('dev')){
			e.preventDefault();
			var item = $(this).data('close');
			$(item).removeClass('show');
			$(this).removeAttr('data-close');
		}
	});

	$('.close-button').click(function(e){
		e.preventDefault();

		var item = $(this).data('close');
		if (Array.isArray(item)){
			$.each(function(index,value){
				$(value).removeClass('show');
			});
		}
		else{
			$(item).removeClass('show');
		}
		$('.overlay').removeAttr('data-close');
	});


	/*Search button*/
	$('.search-button').click(function(e){
		e.preventDefault();
		var show = ['#search-bar','#search-result'];
		var close = ['#search-bar', '#search-result'];
		showModal(show,close);
	});

	/*Rating stars*/
	$('.rating .star-wrap').not('.small').find('.star').hover(
		function(e){
			$(this).addClass('hover');
			$(this).prevAll().addClass('hover');
		},function(e){
			$(this).removeClass('hover');
			$(this).prevAll().removeClass('hover');
		});
});

function showModal(show,close){
	if(Array.isArray(show)){
		$.each(show,function(index,value){
			$(value).addClass('show');
		});
	}
	else{
		$(show).addClass('show');
	}
	$('.overlay').attr('data-close',close);
}

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