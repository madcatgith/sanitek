$( document ).ready(function() {

	//basket js
	$('.opener-item.basket a').click(function(event){
		event.preventDefault();		
		if ($(".basket-wrapper").hasClass("opened")) {
		 	HideBasket();
		}else{
			ShowBasket();
		}
	});
	//backet js end

	//слайдер брендов на главной странице
	$('#front-page-brads_slider').owlCarousel({
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

	//слайдер на главной странице
	$('#frontpage-slider').owlCarousel({
		nav: true,
		dots: true,
		autoplay: true,
		autoplayTimeout: 15000,
		autoplayHoverPause: true,
		autoplaySpeed: 4000,
		loop: true,
		margin: 15,	
		autoWidth: false,		
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			1000:{
				items:1
			}
		}
	});

	//слайдер просмотренных товаров
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
  	
  	//product detail quantity val changers
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

	/*Catalog max height Old*/
	/*$(".max-height-js .product-wrap").hover(
		function(){
			maxProductHeight = $(this).height();

			if(!(maxProductHeight<400))
				$(this).find(".product-item").css({'min-height':(maxProductHeight+62)+"px"});
			else{
				maxProductHeight = $(this).find(".product-item").height();
				$(this).find(".product-item").css({'min-height':(maxProductHeight+92)+"px"});
			}
			console.log(maxProductHeight);
		},
		function(){
			$(this).find(".product-item").css({'min-height':""});
		}
	);*/
	/*Catalog max height New*/
	setProductsHeight();

	var bignews = $(".news-standart").height();
	$(".big-news").height(bignews * 2 + 30);

	/*Sale(standart) list image hover*/
	$(".simple-list-item .image-wrap").hover(function(){
		$(this).parent().find(".body-info a").addClass("hover");
	},function(){
		$(this).parent().find(".hover").removeClass("hover");
	});

	/*Sale(standart) list image hover*/
	$(".simple-list-item .body-info").hover(function(){
		$(this).find("a").addClass("hover");
	},function(){
		$(this).find(".hover").removeClass("hover");
	});

	/*Share button*/
	$(".share-button").mouseenter(function(){
		$(this).prev(".share-items").addClass('show');
		$(this).addClass("hover");
	});
	$(".share-wrap.button span").mouseenter(function(){
		$(this).next(".share-items").addClass('show');
		$(this).parent().find(".share-button").addClass("hover");
	});
	$(".share-wrap").mouseleave(function(){
		$(this).find(".share-items.show").removeClass("show");
		$(this).find(".share-button.hover").removeClass("hover");
	});

});

function setProductsHeight(cName=".max-height-js",rName=".product-row",wName=".product-wrap",iName=".product-item"){
	var container = $(cName);
	var rows = container.find(rName);

	rows.each(function(){
        var maxItemHeight=Math.max.apply( Math, 
            $.map($(wName, this), function(x) {
                return $(x).height();
            })
        );
        maxHoverHeight = (parseInt(maxItemHeight) + 62) + "px";

        $(wName, this).data('height',maxHoverHeight);
        $(wName, this).css('min-height',maxItemHeight);

	});
	rows.find(wName).hover(function(){
		$(this).find(iName).css("min-height",$(this).data("height"));
	},function(){
		$(this).find(iName).css("min-height","");
	});
}

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


$(function() {
	if ($(window).width() > 1023) {
		if($('*').is('.sidebar')) {
			  var $window = $(window);
			  var $sidebar = $(".sidebar");
			  var $sidebarTop = $(".callback-label-wrapper").position().top;
			  var $sidebarHeight = $sidebar.height();	 
			  var $footer = $('footer');
			  var $footerTop = $footer.position().top - 30;
			  //console.log($footerTop);
			 
			  $window.scroll(function(event) {
			    $sidebar.addClass("fixed");
			    var $scrollTop = $window.scrollTop();
			    var $topPosition = Math.max(0, $sidebarTop - $scrollTop);
			    if($topPosition < 150){
			      	var $topPosition = 150;
			     }
			     
			    if (($scrollTop + $sidebarHeight) > ($footerTop - 150)) {	    	
			      var $topPosition = Math.min($topPosition, $footerTop - $scrollTop - $sidebarHeight);	      
			    }
			    	 
			    $sidebar.css("top", $topPosition);
			  });
		}
	}
});


//basket functions

function ShowBasket(e){
	$(".basket-wrapper").addClass('opened');
	$(".basket-wrapper").css('right', '0');
}

function HideBasket(e){
	$(".basket-wrapper").removeClass('opened');
	$(".basket-wrapper").css('right', '-800px');
}