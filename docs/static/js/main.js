(function($) {

    "use strict";

    // Preloader (if the #preloader div exists)
    $(window).on('load', function() {
        if ($('#preloader').length) {
            $('#preloader').delay(100).fadeOut('slow', function() {
                $(this).remove();
            });
        }
    });


    $(document).ready(function() {
        $('.select2').select2({
            closeOnSelect: false
        });
    });


    


    const $tabsToDropdown = $(".tabs-to-dropdown");

    function generateDropdownMarkup(container) {
        const $navWrapper = container.find(".nav-wrapper");
        const $navPills = container.find(".nav-pills");
        const firstTextLink = $navPills.find("li:first-child a").text();
        const $items = $navPills.find("li");
        const markup = `
    <div class="dropdown d-md-none">
      <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ${firstTextLink}
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
        ${generateDropdownLinksMarkup($items)}
      </div>
    </div>
  `;
        $navWrapper.prepend(markup);
    }

    function generateDropdownLinksMarkup(items) {
        let markup = "";
        items.each(function() {
            const textLink = $(this).find("a").text();
            markup += `<a class="dropdown-item" href="#">${textLink}</a>`;
        });

        return markup;
    }

    function showDropdownHandler(e) {
        // works also
        //const $this = $(this);
        const $this = $(e.target);
        const $dropdownToggle = $this.find(".dropdown-toggle");
        const dropdownToggleText = $dropdownToggle.text().trim();
        const $dropdownMenuLinks = $this.find(".dropdown-menu a");
        const dNoneClass = "d-none";
        $dropdownMenuLinks.each(function() {
            const $this = $(this);
            if ($this.text() == dropdownToggleText) {
                $this.addClass(dNoneClass);
            } else {
                $this.removeClass(dNoneClass);
            }
        });
    }



    
    

    function clickHandler(e) {
        e.preventDefault();
        const $this = $(this);
        const index = $this.index();
        const text = $this.text();
        $this.closest(".dropdown").find(".dropdown-toggle").text(`${text}`);
        $this
            .closest($tabsToDropdown)
            .find(`.nav-pills li:eq(${index}) a`)
            .tab("show");
    }

    function shownTabsHandler(e) {
        // works also
        //const $this = $(this);
        const $this = $(e.target);
        const index = $this.parent().index();
        const $parent = $this.closest($tabsToDropdown);
        const $targetDropdownLink = $parent.find(".dropdown-menu a").eq(index);
        const targetDropdownLinkText = $targetDropdownLink.text();
        $parent.find(".dropdown-toggle").text(targetDropdownLinkText);
    }











    $tabsToDropdown.each(function() {
        const $this = $(this);
        const $pills = $this.find('a[data-toggle="pill"]');

        generateDropdownMarkup($this);

        const $dropdown = $this.find(".dropdown");
        const $dropdownLinks = $this.find(".dropdown-menu a");

        $dropdown.on("show.bs.dropdown", showDropdownHandler);
        $dropdownLinks.on("click", clickHandler);
        $pills.on("shown.bs.tab", shownTabsHandler);
    });


    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });

    // Initiate the wowjs animation library
    new WOW().init();

    // Header scroll class
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    if ($(window).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
    }

    // Smooth scroll for the navigation and links with .scrollto classes
    $('.main-nav a, .mobile-nav a, .scrollto').on('click', function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                var top_space = 0;

                if ($('#header').length) {
                    top_space = $('#header').outerHeight();

                    if (!$('#header').hasClass('header-scrolled')) {
                        top_space = top_space - 40;
                    }
                }

                $('html, body').animate({
                    scrollTop: target.offset().top - top_space
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.main-nav, .mobile-nav').length) {
                    $('.main-nav .active, .mobile-nav .active').removeClass('active');
                    $(this).closest('li').addClass('active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('.mobile-nav-overly').fadeOut();
                }
                return false;
            }
        }
    });

    // Navigation active state on scroll
    var nav_sections = $('section');
    var main_nav = $('.main-nav, .mobile-nav');
    var main_nav_height = $('#header').outerHeight();

    $(window).on('scroll', function() {
        var cur_pos = $(this).scrollTop();

        nav_sections.each(function() {
            var top = $(this).offset().top - main_nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                main_nav.find('li').removeClass('active');
                main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
            }
        });
    });

    // jQuery counterUp (used in Whu Us section)
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000
    });

    // Porfolio isotope and filter
    $(window).on('load', function() {
        var portfolioIsotope = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item'
        });
        $('#portfolio-flters li').on('click', function() {
            $("#portfolio-flters li").removeClass('filter-active');
            $(this).addClass('filter-active');

            portfolioIsotope.isotope({
                filter: $(this).data('filter')
            });
        });
    });

    // Testimonials carousel (uses the Owl Carousel library)
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1
    });

    // Clients carousel (uses the Owl Carousel library)
    $(".clients-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0: {
                items: 2
            },
            768: {
                items: 4
            },
            900: {
                items: 6
            }
        }
    });

})(jQuery);