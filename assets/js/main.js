/**
* Template Name: Butterfly - v2.1.0
* Template URL: https://bootstrapmade.com/butterfly-free-bootstrap-theme/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 1;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle, .login', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
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

  // Initiate the venobox plugin
  $(window).on('load', function() {
    $('.venobox').venobox();
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });
})(jQuery);

//Fonction qui affiche l'image sélectionner par l'utilisateur
function loadFile() {
  var image = document.getElementById('carImage');
  var path = document.getElementById('input');
  if(path.files[0] != null) {
    image.src = URL.createObjectURL(path.files[0]);
    document.getElementById('nextBtn').removeAttribute("disabled");
  }
}

//Fonction qui envoie l'image de la voiture accidenter à l'api, récupère la réponse puis l'affiche
function getEval() {
  var path = document.getElementById('input');
  var eval = document.getElementById('evalImage');

  
  var formdata = new FormData();
  formdata.append("image", path.files[0], "/path/to/file");

  var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
  };

fetch("http://localhost:1337/damage", requestOptions)
  .then(response => response.blob())
  .then(result => {eval.src = URL.createObjectURL(result)})
  .catch(error => console.log('error', error));
}

//Variables pour  l'animation du modal démonstration, similaire au formulaire du contrat.js
var currentTab = 0;
showTab(currentTab);


//Affiche le n-em tab
function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";

  if(n == x.length - 1){
    getEval();
  }

  fixButton(n, x.length);
  fixStepIndicator(n);
}

function fixButton(n, l) {
  //Fix les boutons de bas de formulaire en fonction du tab
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").innerHTML = "Suivant";
  } 
  else if (n == 1) {
    document.getElementById("prevBtn").style.display = "inline";
    document.getElementById("nextBtn").innerHTML = "Fermer";
  }
}

// Fonction qui gère la maj de la barre de progression
function fixStepIndicator(n) {
  x = document.getElementsByClassName("step");

  if(n === 0) {
    x[n].className += " active";
    x[n+1].className = x[n+1].className.replace("active", "");
  }
  else if(n > 0) {
    x[n-1].className = x[n-1].className.replace("active", "");
    x[n].className += " active";
  }
}

// Fonction qui met à jour les variables pour suivre le tab courant
function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  if(currentTab + n <= 1) {
    //On désactive les boutons pour éviter les bugs
    toggleButton(0);
    //On fix les boutons en bas avant l'animation pour plus de fluiditer
    fixButton(currentTab+n, x.length);
    $("#tab"+currentTab).fadeOut("fast", function() {
      currentTab = currentTab + n;
      $("#tab"+currentTab).fadeIn("fast", function() {
        showTab(currentTab);
        toggleButton(1);
      });
    });
  }
  else { //Cas ou le bouton avancer est "terminer"
    $('#modalAi').modal('hide');
  }
      
}

//Active ou désactive les boutons pour avancer
function toggleButton(n) {
  if(n==0) {
    document.getElementById("prevBtn").disabled = true;
    document.getElementById("nextBtn").disabled = true;
  }
  else {
    document.getElementById("prevBtn").disabled = false;
    document.getElementById("nextBtn").disabled = false;
  }
}