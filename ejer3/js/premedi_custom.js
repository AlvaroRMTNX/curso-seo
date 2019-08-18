function premedi_fix_height() {
    $(".image-caption").css({
        'height': ($("img.home-banner").height() + 'px')
    });
}
$(function () {

    var sticky_navigation_offset_top = $('#sticky_navigation').offset().top;
    var premedi_sticky_navigation = function () {
        var scroll_top = $(window).scrollTop();
        
        if (scroll_top > sticky_navigation_offset_top) {
            $('#sticky_navigation').css({
                'position': 'fixed',
                'top': 0,
                'left': 0
            });
        } else {
            $('#sticky_navigation').css({
                'position': 'relative'
            });
        }
    };

    premedi_sticky_navigation();

    $(window).scroll(function () {
        premedi_sticky_navigation();
    });

});



$(window).load(function () {
    premedi_fix_height();
    //loader
    $('body').addClass('loaded');
    $('.loader').fadeOut(400);
    var wow = new WOW({
        offset: 0,
        mobile: false
    });
    wow.init();

    $('.appoinment-form-fields').formValidation().on('success.form.fv', function (e) {
        e.preventDefault();

        var $form = $(e.target),
            fv = $form.data('formValidation');

        var $btn = $form.find("button").button('loading');
        $.ajax({
          url: $form.attr('action'),
          type: 'POST',
          dataType: 'json',
          data: $form.serialize()
        })
        .done(function(response){
          if(response.success)
          {
            $btn.button("reset");
            $form.prepend(response.mensaje);
            $form[0].reset();
            fv.resetForm();
          }
          else
          {
            $form.prepend("Error al enviar mensaje.");
          }
        });
    });
    $('#contact-form-fields').formValidation().on('success.form.fv', function (e) {
        e.preventDefault();

        var $form = $(e.target),
            fv = $form.data('formValidation');

        var $btn = $form.find("button").button('loading');
        $.ajax({
          url: $form.attr('action'),
          type: 'POST',
          dataType: 'json',
          data: $form.serialize()
        })
        .done(function(response){
          if(response.success)
          {
            $btn.button("reset");
            $form.prepend(response.mensaje);
            $form[0].reset();
            fv.resetForm();
          }
          else
          {
            $form.prepend("Error al enviar mensaje.");
          }
        });
    });
    $('#replay-form-fields').formValidation();
    $('#search-form').formValidation();
    $(window).resize(function () {
        premedi_fix_height();
    });

    $('.panel-heading').click(function (e) {
        e.preventDefault();
        $('.panel-heading').removeClass('active');
        $(this).addClass('active');
    });

    // ------------------------------------------------------------------------------ //
    // Toggle Search
    // ------------------------------------------------------------------------------ //
    $(".navbar-primary .search-part").each(function () {
        $(".menu-search > a", this).on("click", function (e) {
            e.preventDefault();
            $(".top-search").slideToggle();
        });
    });
    
    $(".input-group-addon.close-search").on("click", function () {
        $(".top-search").slideUp();
    });

    $('.parents-feedback-carousel').owlCarousel({
        margin: 10,
        responsiveClass: true,
        items: 3,
        autoPlay: true,

        responsive: {
            0: {
                items: 1,
                nav: true
            },
            900: {
                items: 2,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: true,
                loop: false
            }
        }

    })

    $('.about-feedback-carousel').owlCarousel({
        margin: 10,
        responsiveClass: true,
        items: 1,
        autoPlay: true,

        responsive: {
            0: {
                items: 1,
                nav: true
            },
            900: {
                items: 1,
                nav: false
            },
            600: {
                items: 1,
                nav: false
            },
            1000: {
                items: 1,
                nav: true,
                loop: false
            }
        }
    })

    $('.recent-post-carousel').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        items: 2,
        autoPlay: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: false
            },
            900: {
                items: 2,
                nav: false
            },
            1000: {
                items: 2,
                nav: true,
                loop: false
            }
        }
    })

    $('.clients-logo-carousel').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        items: 6,
        autoPlay: true,
        responsive: {
            0: {
                items: 2,
                nav: true
            },
            600: {
                items: 4,
                nav: false
            },
            900: {
                items: 4,
                nav: false
            },
            1000: {
                items: 6,
                nav: true,
                loop: false
            }
        }

    })


    $('.our-specialist-carousel').imagesLoaded(function () {
        //team members carousel
        $('.our-specialist-carousel').owlCarousel({
            loop: true,
            margin: 10,
            responsiveClass: true,
            items: 3,
            autoPlay: true,
            lazyLoad: true,
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                900: {
                    items: 3,
                    nav: false
                },
                600: {
                    items: 2,
                    nav: false
                },
                1000: {
                    items: 3,
                    nav: true,
                    loop: false
                }
            }
        })

        var owl = $('.our-specialist-carousel');
        owl.owlCarousel();
        
        // Go to the next item
        $('.customNextBtn').click(function () {
            owl.trigger('next.owl.carousel');
        })

        // Go to the previous item
        $('.customPrevBtn').click(function () {
            owl.trigger('prev.owl.carousel', [300]);
        });

        // images have loaded
    });
    
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy'
    }).on('changeDate', function (e) {
        $('.appoinment-form-fields').formValidation('revalidateField', 'dateTo');
    });
});
