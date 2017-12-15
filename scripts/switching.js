$(document).ready(function(){

  // First child in container inner (and it's first child) first carousel gets focus by default
  $('.container-inner').children().eq(0).addClass('active');
  $('.active .content-wrapper').eq(2).addClass('focus');

  // // For the horizontal adjustment of carousels
  function adjustContent() {

    total = $('.active .content-wrapper').length;
    current = $('.active .content-wrapper.focus').index() +1;

    widthToMove = 260;

    //This makes sure only carousels move and rows/grids don't
    if ($('.carousel').hasClass('active')){
    carouselPositionX = parseInt($('.active .carousel-content').css('transform').split(',')[4]);
    }

    else if ($('.livecollection').hasClass('active')){
    carouselPositionX = parseInt($('.active .carousel-content').css('transform').split(',')[4]);
    }
  }

  // On *any* keypress
  $(document).keydown(function(e){

    e.preventDefault();

    if ($('.carousel').hasClass('active')) {

      // Press left in a carousel
      if(e.keyCode == 37) {

        adjustContent();

        if (current > 1) {

          var adjust = carouselPositionX + widthToMove;
            $('.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');
            $('.carousel.active .carousel-content').css('transform', 'translateX('+ adjust +'px)');

        }
      }
      //
      // Press right
      if(e.keyCode == 39) {

        adjustContent();

        if (current < total) {

          var adjust = carouselPositionX - widthToMove;
            $('.carousel.active .carousel-content').css('transform', 'translateX('+ adjust +'px)');
            $('.carousel.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');


        }
      }

      // Press up
      if(e.keyCode == 38) {

        adjustSection();

        if (current > 1) {

          $('.active').removeClass('active') .prev().addClass('active');

          sectionHeight = $('.active').height() + parseInt($('.active').css("margin-top")) + 3;

          var adjust = containerInnerPositionY+sectionHeight;
          $('.container-inner').css('transform', 'translateY('+ adjust +'px)');

          $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');
          if ($('.active .content-wrapper').hasClass('wasfocus')){
              $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
          } else {
            $('.active .content-wrapper:eq(0)').addClass('focus');

          }

        } else if (current == 1) {


          $('.active').removeClass('active')
          $('.primary-navigation').addClass('active').fadeIn( 250 );

          if ($('.active .content-wrapper').hasClass('wasfocus')){
              $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
          } else {
            $('.active .content-wrapper:eq(0)').addClass('focus');

          }

        }

      }

      // Press down
      if(e.keyCode == 40) {

        adjustSection();



        if (current < total) {

          var adjust = containerInnerPositionY-sectionHeight;

          $('.container-inner').css('transform', 'translateY('+ adjust +'px)');
          $('.active').removeClass('active').next().addClass('active');

          $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

          if ($('.active .content-wrapper').hasClass('wasfocus')){
              $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
          } else {
            $('.active .content-wrapper:eq(0)').addClass('focus');
          }

        }

      }

      if(e.keyCode == 13) {

        if ($('.carousel-content').children().eq(1).hasClass('focus')) {

          window.location.href = '/carousel-testing/prototypes/carousel-variant/'

        } else if ($('.carousel-content').children().eq(2).hasClass('focus')) {

          window.location.href = '/carousel-testing/prototypes/low-performant-variant/'

        } else if ($('.carousel-content').children().eq(3).hasClass('focus')) {

          window.location.href = '/carousel-testing/prototypes/low-performant-variant2/'

        }

      }

      if(e.keyCode == 8) {

        window.history.back();

      }

    }



    delete window.total;
    delete window.current;
    delete window.sectionHeight;
    delete window.containerInnerPositionY;
    delete window.carouselPositionX;

  });

});
