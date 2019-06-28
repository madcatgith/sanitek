$( document ).ready(function() {
    $('.viewed-products-slider').owlCarousel({
        nav: true,
        loop: true,
        margin: 15,       
        autoWidth: true,
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