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

	$('.product_detail_slider').owlCarousel({
   		thumbs: true,
    	thumbsPrerendered: true,
    	nav: true,
    	items: 1,
    	lazyLoad: true    	
  	});
  	
  	$('.minus').click(function () {
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
		return false;
	});
	$('.plus').click(function () {
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
		return false;
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

	/*Catalog max height*/
	$(".max-height-js .product-wrap").hover(
		function(){
			maxProductHeight = $(this).height();
			$(this).find(".product-item").css({'min-height':(maxProductHeight+62)+"px"});
		},
		function(){
			$(this).find(".product-item").css({'min-height':""});
		}
	);
});

function zoom(e){
	if($('.product_detail_slider .owl-item.active').length > 0){		
		$('.product_detail_slider .owl-item.active a').click();
	}else{		
		$('.product_whithout_slider .noimage').click();
	}
}

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
	var width = $(".right-side").width() + 30;
  	$(this).width(width);
});

$(".tab").click(function(){
	event.preventDefault();
	$(".tab.active").removeClass("active");
	$(this).addClass("active");
	$(".tab-pane.active").removeClass("active");
	var id = $(this).data("tab");
	$("#"+id).addClass("active");
});