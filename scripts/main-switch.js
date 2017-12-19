$(document).ready(function() {

    // Navigation gets focus by default
    $('.primary-navigation').addClass('active');
    $('.active .content-wrapper').eq(1).addClass('focus');

    goTo = "Not defined";

    // First child in container inner (and it's first child) first carousel gets focus by default
    // $('.container-inner').children().eq(0).addClass('active');
    // $('.active .content-wrapper:first').addClass('focus');

    // // For the horizontal adjustment of carousels
    function adjustContent() {

        total = $('.active .content-wrapper').length;
        current = $('.active .content-wrapper.focus').index() + 1;
        widthToMove = parseInt($('.active .content-wrapper.focus').width()) + parseInt($('.focus').css("margin-right")) + 4;

        //This makes sure only carousels and collections move horizontally and rows/grids don't
        if ($('.carousel').hasClass('active')) {
            carouselPositionX = parseInt($('.active .carousel-content').css('transform').split(',')[4]);
        } else if ($('.collection').hasClass('active')) {
            carouselPositionX = parseInt($('.active .carousel-content').css('transform').split(',')[4]);
        }

    }

    //For the vertical adjustment of sections
    function adjustSection() {

      // total = target the parent of the active slice and then grab all the children. i.e. All the siblings
      total = $('.active').parent().children().length;
      current = $('.active').index() + 1;
      sectionHeight = $('.active').height() + parseInt($('.active').css("margin-top")) + 3;

      if ($('.endlessgrid').hasClass('active')) {
        gridInnerPositionY = parseInt($('.endlessgrid.active').parent().css('transform').split(',')[5]);
      } else {
        containerInnerPositionY = parseInt($('.container-inner').css('transform').split(',')[5]);
      }

    }

    // On *any* keydown event
    $(document).keydown(function(e) {

      e.preventDefault();

        if ($('.primary-navigation').hasClass('active')) {

            // Press left on the navigation
            if (e.keyCode == 37) {

                adjustContent();

                if (current > 2) {

                    $('.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');

                }

            }

            //Press right on the navigation
            if (e.keyCode == 39) {

                adjustContent();

                if (current <= total) {

                    $('.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');

                }

            }

            //Press down on the navigation
            if (e.keyCode == 40) {

              //remove active class from navigation
              $('.active').removeClass('active');

              $('.container-inner').children().eq(1).addClass('active');

              //remove the focus state from the primary nav
              $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

              //if there's a wasfocus content item in the active slice then return focus to it
              if ($('.active .content-wrapper').hasClass('wasfocus')) {
                  $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
              } else {
                  $('.active .content-wrapper:eq(0)').addClass('focus');
              }
            }

            //Press enter
            if (e.keyCode == 13) {

                if ($('.primary-navigation').children().eq(1).hasClass('focus')) {

                    window.location.href = '/carousel-testing/';

                }
            }

        } else if ($('.carousel').hasClass('active')) {

            // Press left in a carousel
            if (e.keyCode == 37) {

              if ($('.active').hasClass('large')) {

                adjustContent();

                if (current > 1) {

                    if (current < total - 1) {

                        $('.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');

                        widthToMove = parseInt($('.active .content-wrapper.focus').width()) + parseInt($('.focus').css("margin-right")) + 4;
                        var adjust = carouselPositionX + widthToMove;

                        $('.carousel.active .carousel-content').css('transform', 'translateX(' + adjust + 'px)');

                    } else {

                        $('.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');

                    }
                  }

                } else if ($('.active').hasClass('medium')) {

                  adjustContent();

                  if (current > 1) {

                      if (current < total - 2) {

                          $('.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');

                          widthToMove = parseInt($('.active .content-wrapper.focus').width()) + parseInt($('.focus').css("margin-right")) + 4;
                          var adjust = carouselPositionX + widthToMove;

                          $('.carousel.active .carousel-content').css('transform', 'translateX(' + adjust + 'px)');

                      } else {

                          $('.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');

                      }
                    }
                }
              }

            // Press right
            if (e.keyCode == 39) {

              if ($('.active').hasClass('large')) {

                adjustContent();

                if (current < total) {

                    if (current < total - 2) {

                        var adjust = carouselPositionX - widthToMove;
                        $('.carousel.active .carousel-content').css('transform', 'translateX(' + adjust + 'px)');
                        $('.carousel.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');

                    } else {

                        $('.carousel.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');

                    }
                }

            } else if ($('.active').hasClass('medium')) {

              adjustContent();

              if (current < total) {

                  if (current < total - 3) {

                      var adjust = carouselPositionX - widthToMove;
                      $('.carousel.active .carousel-content').css('transform', 'translateX(' + adjust + 'px)');
                      $('.carousel.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');

                  } else {

                      $('.carousel.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');

                  }
              }
            }
          }

            // Press up
            if (e.keyCode == 38) {

                adjustSection();

                if (current > 1) {

                    $('.active').removeClass('active').prev().addClass('active');

                    sectionHeight = $('.active').height() + parseInt($('.active').css("margin-top")) + 3;

                    var adjust = containerInnerPositionY + sectionHeight;
                    $('.container-inner').css('transform', 'translateY(' + adjust + 'px)');

                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');
                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');

                    }

                } else if (current == 1) {

                    $('.active').removeClass('active');
                    $('.primary-navigation').addClass('active');
                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');

                    }

                }

            }

            // Press down
            if (e.keyCode == 40) {

                adjustSection();

                if (current < total) {

                    var adjust = containerInnerPositionY - sectionHeight;

                    $('.container-inner').css('transform', 'translateY(' + adjust + 'px)');
                    $('.active').removeClass('active').next().addClass('active');

                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(1)').addClass('focus');
                    }
                }
            }

            if (e.keyCode == 13 && $('.viewAll').hasClass('focus')) {

                //get the data-id of the current slice
                goTo = $('.active').attr("data-id");

                //replace the focus with a 'back to this' focus state
                $('.content-wrapper.focus').addClass('lastfocus').removeClass('focus');

                //replace the active section with a 'back to this' state
                $('.active').addClass('lastActive').removeClass('active');

                //hide the display of the current container and primary navigation
                $('.container.homepage').hide();
                $('.primary-navigation').hide();

                //using the data id: display the correct container
                $('.container.onwardJourney[data-id=' + goTo + ']').show();

                //give focus to the relevant content item
                $('.container.onwardJourney[data-id=' + goTo + '] .container-grid').children().eq(0).addClass('active');
                $('.active .content-wrapper:first').addClass('focus');

            }

            if (e.keyCode == 13 && $('.viewCat').hasClass('focus')) {

                //get the data-id of the current slice
                goTo = $('.active').attr("data-id");

                //replace the focus with a 'back to this' focus state
                $('.content-wrapper.focus').addClass('lastfocus').removeClass('focus');

                //replace the active section with a 'back to this' state
                $('.active').addClass('lastActive').removeClass('active');

                //hide the display of the current container
                $('.container.homepage').hide();

                //using the data id: display the correct container
                $('.container.category[data-id=' + goTo + ']').show();

                //give focus to the relevant content item
                $('.container.category[data-id=' + goTo + '] .container-grid').children().eq(0).addClass('active');
                $('.active .content-wrapper:first').addClass('focus');

            }

            if (e.keyCode == 13 && $('.viewAtoZ').hasClass('focus')) {

                //get the data-id of the current slice
                goTo = $('.active').attr("data-id");

                //replace the focus with a 'back to this' focus state
                $('.content-wrapper.focus').addClass('lastfocus').removeClass('focus');

                //replace the active section with a 'back to this' state
                $('.active').addClass('lastActive').removeClass('active');

                //hide the display of the current container
                $('.container.homepage').hide();
                $('.primary-navigation').hide();

                //using the data id: display the correct container
                $('.container.atoz[data-id=' + goTo + ']').show();

                //give focus to the relevant content item
                $('.container.atoz[data-id=' + goTo + '] .container-grid').children().eq(0).addClass('active');
                $('.active .content-wrapper:first').addClass('focus');

            }

            if (e.keyCode == 13 && $('.container-grid .app-footer').hasClass('focus')) {

              //remove the focus from the content item
              $('.content-wrapper.focus').removeClass('focus');

              //remove the active class from the grid and give back to lastActive
              $('.active').removeClass('active');

              //hide the display of the current container
              $('.container.onwardJourney').hide();
              $('.container.category').hide();
              $('.container.atoz').hide();

              //reset view back to 0
              $('.container-grid').css('transform', 'translateY(0px)');

              //show the homepage and nav
              $('.container.homepage').show();
              $('.primary-navigation').show();


              //find the lastActive div and make active
              $('.container.homepage').children().find('.lastActive').removeClass('lastActive').addClass('active');

              //give focus to the relevant content item
              $('.active .content-wrapper.lastfocus').addClass('focus').removeClass('lastfocus');

            }

            //Press back – Amazon Fire Back Keycode = 27!!
            if (e.keyCode == 27) {

              if ($('.container-grid .app-footer').hasClass('focus')) {

                  //remove the focus from the content item
                  $('.content-wrapper.focus').removeClass('focus');

                  //remove the active class from the grid and give back to lastActive
                  $('.active').removeClass('active');

                  //hide the display of the current container
                  $('.container.onwardJourney').hide();
                  $('.container.category').hide();
                  $('.container.atoz').hide();

                  //reset view back to 0
                  $('.container-grid').css('transform', 'translateY(0px)');

                  //show the homepage and nav
                  $('.container.homepage').show();
                  $('.primary-navigation').show();


                  //find the lastActive div and make active
                  $('.container.homepage').children().find('.lastActive').removeClass('lastActive').addClass('active');

                  //give focus to the relevant content item
                  $('.active .content-wrapper.lastfocus').addClass('focus').removeClass('lastfocus');

              } else {

                adjustContent();

                //if we are the first item in the carousel
                if (current == 1) {

                  console.log("I am the first item in a carousel");

                  //remove the focus from the content item
                  $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                  //reset view to top of page
                  $('.active').parent().css('transform', 'translateY(0px)');

                  //remove the active class from the grid and give back to lastActive
                  $('.active').addClass('lastActive').removeClass('active');

                  //give primary nav active state
                  $('.primary-navigation').addClass('active');

                  //give previously highlighted tab focus
                  if ($('.active .content-wrapper').hasClass('wasfocus')) {
                      $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                  } else {
                      $('.active .content-wrapper:eq(0)').addClass('focus');
                  }

                } else if (current > 1 ) {

                  console.log("I am not the first item in a carousel");

                  //remove the class of focus from the content item
                  $('.active .content-wrapper.focus').removeClass('focus');

                  //give focus to the first content item in the carousel
                  $('.active .content-wrapper:first').addClass('focus');

                  //reset the translateX position of the carousel
                  $('.carousel.active .carousel-content').css('transform', 'translateX(0px)');

                }

              }
            }

            // ROW KEY COMMANDS
        } else if ($('.row').hasClass('active')) {

            // Press left
            if (e.keyCode == 37) {

                adjustContent();

                if (current > 1) {

                    $('.row.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');
                }

            }

            // Press right
            if (e.keyCode == 39) {

                adjustContent();

                if (current < total) {

                    $('.row.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');

                }

            }

            // Press up
            if (e.keyCode == 38) {

                adjustSection();

                if (current > 1) {

                    $('.active').removeClass('active').prev().addClass('active');

                    sectionHeight = $('.active').height() + parseInt($('.active').css("margin-top")) + 3;

                    var adjust = containerInnerPositionY + sectionHeight;
                    $('.container-inner').css('transform', 'translateY(' + adjust + 'px)');

                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');
                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(1)').addClass('focus');
                    }

                } else if (current == 1) {

                    $('.active').removeClass('active');
                    $('.primary-navigation').addClass('active');
                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(1)').addClass('focus');

                    }

                }

            }

            // Press down
            if (e.keyCode == 40) {

                adjustSection();

                if (current < total) {

                    var adjust = containerInnerPositionY - sectionHeight;

                    $('.container-inner').css('transform', 'translateY(' + adjust + 'px)');
                    $('.active').removeClass('active').next().addClass('active');
                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(1)').addClass('focus');
                    }
                }
            }

            //Press enter
            if (e.keyCode == 13 && $('.viewAll').hasClass('focus')) {

                //get the data-id of the current slice
                goTo = $('.active').attr("data-id");

                //replace the focus with a 'back to this' focus state
                $('.content-wrapper.focus').addClass('lastfocus').removeClass('focus');

                //replace the active section with a 'back to this' state
                $('.active').addClass('lastActive').removeClass('active');

                //hide the display of the current container and primary navigation
                $('.container.homepage').hide();
                $('.primary-navigation').hide();

                //using the data id: display the correct container
                $('.container.onwardJourney[data-id=' + goTo + ']').show();

                //remember where the Yposition was

                //give focus to the relevant content item
                $('.container.onwardJourney[data-id=' + goTo + '] .container-grid').children().eq(0).addClass('active');
                $('.active .content-wrapper:first').addClass('focus');

            }

            //Press back – Amazon Fire Back Keycode = 27!!
            if (e.keyCode == 27) {

              adjustContent();

              //if we are the first item in the carousel
              if (current == 1 || current == 2) {

                console.log("I am the first item in a row");

                //remove the focus from the content item
                $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                //reset view to top of page
                $('.active').parent().css('transform', 'translateY(0px)');

                //remove the active class from the grid and give back to lastActive
                $('.active').addClass('lastActive').removeClass('active');

                //give primary nav active state
                $('.primary-navigation').addClass('active');

                //give previously highlighted tab focus
                if ($('.active .content-wrapper').hasClass('wasfocus')) {
                    $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                } else {
                    $('.active .content-wrapper:eq(0)').addClass('focus');
                }

              } else if (current > 2 ) {

                console.log("I am not the first item in a row");

                //remove the class of focus from the content item
                $('.active .content-wrapper.focus').removeClass('focus');

                //give focus to the first content item in the carousel
                $('.active .content-wrapper').eq(1).addClass('focus');

                //reset the translateX position of the carousel
                $('.carousel.active .carousel-content').css('transform', 'translateX(0px)');

              }

            }

            if (e.keyCode == 13 && $('.viewCat').hasClass('focus')) {

                //get the data-id of the current slice
                goTo = $('.active').attr("data-id");

                //replace the focus with a 'back to this' focus state
                $('.content-wrapper.focus').addClass('lastfocus').removeClass('focus');

                //replace the active section with a 'back to this' state
                $('.active').addClass('lastActive').removeClass('active');

                //hide the display of the current container
                $('.container.homepage').hide();

                //using the data id: display the correct container
                $('.container.category[data-id=' + goTo + ']').show();

                //give focus to the relevant content item
                $('.container.category[data-id=' + goTo + '] .container-grid').children().eq(0).addClass('active');
                $('.active .content-wrapper:first').addClass('focus');

            }

            if (e.keyCode == 13 && $('.viewAtoZ').hasClass('focus')) {

                //get the data-id of the current slice
                goTo = $('.active').attr("data-id");

                //replace the focus with a 'back to this' focus state
                $('.content-wrapper.focus').addClass('lastfocus').removeClass('focus');

                //replace the active section with a 'back to this' state
                $('.active').addClass('lastActive').removeClass('active');

                //hide the display of the current container
                $('.container.homepage').hide();
                $('.primary-navigation').hide();

                //using the data id: display the correct container
                $('.container.atoz[data-id=' + goTo + ']').show();

                //give focus to the relevant content item
                $('.container.atoz[data-id=' + goTo + '] .container-grid').children().eq(0).addClass('active');
                $('.active .content-wrapper:first').addClass('focus');

            }


          //GRID KEY COMMANDS
        }  else if ($('.endlessgrid').hasClass('active')) {

            // Press down
            if (e.keyCode == 40) {

              adjustSection();

              //if the grid is the only thing in the view (Not a A-Z to Cat page)
              if (total == 1) {

                //Do nothing

              //if the grid has another slice above or below it (ie. A back to home button)
              } else if (total > 1) {

                adjustContent();

                //if it's not any of the last 4 content items
                if (current < total -3) {

                  var adjust = gridInnerPositionY - 260;

                  $('.active .grid-content .content-wrapper.focus').removeClass('focus').nextAll().eq(3).addClass('focus');
                  $('.active').parent().css('transform', 'translateY(' + adjust + 'px)');

                // if it is one of the last 4 content items
                } else {

                  if (total % 4 == 0) {

                  $('.active').removeClass('active').next().addClass('active');

                  $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                  if ($('.active .content-wrapper').hasClass('wasfocus')) {
                      $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                  } else {
                      $('.active .content-wrapper:eq(0)').addClass('focus');
                  }

                } else if (total % 4 == 3) {

                  console.log("Modulus remainder 3");

                  if (current == total) {

                    $('.active').removeClass('active').next().addClass('active');

                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');
                    }

                  }

                  if (current == total -1 ) {

                    $('.active').removeClass('active').next().addClass('active');

                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');
                    }

                  } else if (current == total -2) {

                    $('.active').removeClass('active').next().addClass('active');

                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');
                    };

                  } else if (current == total -3) {

                    var adjust = gridInnerPositionY - 260;

                    console.log("I'm the forth to last item, I need to move X amount");
                    $('.active .grid-content .content-wrapper.focus').removeClass('focus').nextAll().eq(2).addClass('focus');
                    $('.active').parent().css('transform', 'translateY(' + adjust + 'px)');

                  }

                } else if (total % 4 == 2) {

                  console.log("Modulus remainder 2");

                  if (current == total) {

                    $('.active').removeClass('active').next().addClass('active');

                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');
                    }

                  }

                  if (current == total -1 ) {

                    var adjust = gridInnerPositionY - 260;

                    console.log("I'm the second to last item, I need to move X amount");

                    $('.active').removeClass('active').next().addClass('active');

                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');
                    }

                  } else if (current == total -2 ) {

                    var adjust = gridInnerPositionY - 260;

                    console.log("I'm the third to last item, I need to move X amount");
                    $('.active .grid-content .content-wrapper.focus').removeClass('focus').nextAll().eq(1).addClass('focus');
                    $('.active').parent().css('transform', 'translateY(' + adjust + 'px)');

                  } else if (current == total -3) {

                    var adjust = gridInnerPositionY - 260;

                    console.log("I'm the forth to last item, I need to move X amount");
                    $('.active .grid-content .content-wrapper.focus').removeClass('focus').nextAll().eq(2).addClass('focus');
                    $('.active').parent().css('transform', 'translateY(' + adjust + 'px)');

                  }

                } else if (total % 4 == 1) {

                  if (current == total) {

                    $('.active').removeClass('active').next().addClass('active');

                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');
                    }

                  }

                  if (current == total -1 ) {

                    var adjust = gridInnerPositionY - 260;

                    console.log("I'm the third to last item, I need to move X amount");
                    $('.active .grid-content .content-wrapper.focus').removeClass('focus').nextAll().eq(0).addClass('focus');
                    $('.active').parent().css('transform', 'translateY(' + adjust + 'px)');

                  } else if (current == total -2 ) {

                    var adjust = gridInnerPositionY - 260;

                    console.log("I'm the third to last item, I need to move X amount");
                    $('.active .grid-content .content-wrapper.focus').removeClass('focus').nextAll().eq(1).addClass('focus');
                    $('.active').parent().css('transform', 'translateY(' + adjust + 'px)');

                  } else if (current == total -3) {

                    var adjust = gridInnerPositionY - 260;

                    console.log("I'm the forth to last item, I need to move X amount");
                    $('.active .grid-content .content-wrapper.focus').removeClass('focus').nextAll().eq(2).addClass('focus');
                    $('.active').parent().css('transform', 'translateY(' + adjust + 'px)');

                  }

                }

              }

            }

          }

            // Press up
            if (e.keyCode == 38) {

                adjustContent();

                if (current > 4) {

                    adjustSection();
                    var adjust = gridInnerPositionY + 266;

                    $('.active .grid-content .content-wrapper.focus').removeClass('focus').prevAll().eq(3).addClass('focus');
                    $('.active').parent().css('transform', 'translateY(' + adjust + 'px)');

                }
            }

            // Press left
            if (e.keyCode == 37) {

                adjustContent();

                var dontGoLeft = [1, 5, 9, 13, 17, 21, 25, 29, 33, 37];
                index = $.inArray(current, dontGoLeft)

                if (index == -1) {

                    $('.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');

                }

            }

            // Press right
            if (e.keyCode == 39) {

                adjustContent();

                var dontGoRight = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40]
                index = $.inArray(current, dontGoRight)

                if (index == -1 && current != total) {

                    $('.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');

                }

            }

            //Press back – Amazon Fire Back Keycode == 27!!
            if (e.keyCode == 27) {

              e.preventDefault();

                //remove the focus from the content item
                $('.content-wrapper.focus').removeClass('focus');

                //remove the active class from the grid and give back to lastActive
                $('.active').removeClass('active');

                //hide the display of the current container
                $('.container.onwardJourney').hide();
                $('.container.category').hide();
                $('.container.atoz').hide();

                //reset view back to 0
                $('.container-grid').css('transform', 'translateY(0px)');

                //show the homepage and nav
                $('.container.homepage').show();
                $('.primary-navigation').show();


                //find the lastActive div and make active
                $('.container.homepage').children().find('.lastActive').removeClass('lastActive').addClass('active');

                //give focus to the relevant content item
                $('.active .content-wrapper.lastfocus').addClass('focus').removeClass('lastfocus');

              }

        }

        //COLLECTIONS
        else if ($('.collection.live').hasClass('active')) {

            // Press left
            if (e.keyCode == 37) {

                adjustContent();

                if (current > 1) {

                    if (current <= 2) {

                        $('.collection.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');

                    } else if (current == 3) {

                        $('.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');
                        var adjust = carouselPositionX + (parseInt($('.active .live-info').width()) + parseInt($('.focus').css("margin-right")) + 4);
                        $('.active .live-info').fadeIn(340)
                        $('.active .related-content').css('left', 472);
                        $('.active .carousel-content').css('transform', 'translateX(' + adjust + 'px)');

                    } else if (current > total - 3) {

                        $('.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');

                    } else {

                        var adjust = carouselPositionX + widthToMove;
                        $('.active .carousel-content').css('transform', 'translateX(' + adjust + 'px)');
                        $('.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');

                    }
                }
            }

            // Press right
            if (e.keyCode == 39) {

                adjustContent();

                if (current < total) {

                    if (current < 2) {

                        $('.collection.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');

                    } else if (current == 2) {

                        var adjust = carouselPositionX - (parseInt($('.active .live-info').width()) + parseInt($('.focus').css("margin-right")) + 4);
                        $('.active .live-info').fadeOut(10);
                        $('.active .related-content').css('left', 0);
                        $('.active .carousel-content').css('transform', 'translateX(' + adjust + 'px)');
                        $('.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');

                    } else if (current > total - 4) {

                        $('.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');

                    } else {

                        var adjust = carouselPositionX - widthToMove;
                        $('.active .carousel-content').css('transform', 'translateX(' + adjust + 'px)');
                        $('.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');

                    }
                }
            }

            // Press up
            if (e.keyCode == 38) {

                adjustSection();

                if (current > 1) {

                    $('.active').removeClass('active').prev().addClass('active');

                    sectionHeight = $('.active').height() + parseInt($('.active').css("margin-top")) + 3;

                    var adjust = containerInnerPositionY + sectionHeight;
                    $('.container-inner').css('transform', 'translateY(' + adjust + 'px)');

                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');
                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');
                    }

                } else if (current == 1) {

                    $('.active').removeClass('active');
                    $('.primary-navigation').addClass('active');
                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');

                    }

                }

            }

            // Press down
            if (e.keyCode == 40) {

                adjustSection();

                if (current < total) {

                    var adjust = containerInnerPositionY - sectionHeight;

                    $('.container-inner').css('transform', 'translateY(' + adjust + 'px)');
                    $('.active').removeClass('active').next().addClass('active');

                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');
                    }
                }

            }

        } else if ($('.collection').hasClass('active')) {

          //Press left
          if (e.keyCode == 37) {

              adjustContent();

              if (current > 1) {

                if (current == 2) {

                  var adjust = carouselPositionX + 530;
                  $('.active .live-info').fadeIn(300);
                  $('.active .carousel-content').css('transform', 'translateX(' + adjust + 'px)');
                  $('.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');

                } else if (current > total - 4) {

                  $('.active .content-wrapper.focus').removeClass('focus').prev().addClass('focus');

                }

              }
          }

          // Press right
          if (e.keyCode == 39) {

              adjustContent();

              if (current < total) {

                if (current == 1) {

                      var adjust = carouselPositionX - (parseInt($('.active .watch-now').width()) + parseInt($('.focus').css("margin-right")) + 4);
                      $('.active .live-info').fadeOut(100);
                      $('.active .carousel-content').css('transform', 'translateX(' + adjust + 'px)');
                      $('.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');

                  } else if (current > total - 4) {

                      $('.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');

                  } else {

                      var adjust = carouselPositionX - widthToMove;
                      $('.active .carousel-content').css('transform', 'translateX(' + adjust + 'px)');
                      $('.active .content-wrapper.focus').removeClass('focus').next().addClass('focus');

                  }
              }
          }

            // Press up
            if (e.keyCode == 38) {

                adjustSection();

                if (current > 1) {

                    $('.active').removeClass('active').prev().addClass('active');

                    sectionHeight = $('.active').height() + parseInt($('.active').css("margin-top")) + 3;

                    var adjust = containerInnerPositionY + sectionHeight;
                    $('.container-inner').css('transform', 'translateY(' + adjust + 'px)');

                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');
                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');
                    }

                } else if (current == 1) {

                    $('.active').removeClass('active');
                    $('.primary-navigation').addClass('active');
                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');

                    }

                }

            }

            // Press down
            if (e.keyCode == 40) {

                adjustSection();

                if (current < total) {

                    var adjust = containerInnerPositionY - sectionHeight;

                    $('.container-inner').css('transform', 'translateY(' + adjust + 'px)');
                    $('.active').removeClass('active').next().addClass('active');

                    $('.content-wrapper.focus').addClass('wasfocus').removeClass('focus');

                    if ($('.active .content-wrapper').hasClass('wasfocus')) {
                        $('.active .content-wrapper.wasfocus').addClass('focus').removeClass('wasfocus');
                    } else {
                        $('.active .content-wrapper:eq(0)').addClass('focus');
                    }
                }

            }
        }

        //Truncate to three lines

        // if ($('.content-detail').parents('content-wrapper')) {
        //     var item = $('.content-wrapper.focus .content-subtitle');
        //     $clamp(item[0], {
        //         clamp: 4
        //     });
        // }

        // delete window.total;
        // delete window.current;
        // delete window.sectionHeight;
        // delete window.containerInnerPositionY;
        delete window.widthToMove;
        delete window.carouselPositionX;

    });

    // On *any* keydown event
    $(document).keyup(function(e) {

      e.preventDefault();

    });

});
