/* ----------------- Start Document ----------------- */
(function($){
"use strict";
$(document).ready(function(){

/*----------------------------------------------------*/
 /*Mobile slick nav
/*----------------------------------------------------*/
  $('#navigation').slicknav({
      duration: 500,
      closedSymbol: '<i class="fas fa-plus"></i>',
      openedSymbol: '<i class="fas fa-minus"></i>',
      prependTo: '#dashboard-Navigation',
      allowParentLinks: true,
      duplicate: false,
      closeOnClick: true, // Close menu when a link is clicked.
      allowParentLinks: true, // Allow clickable links as parent elements.
  });

/*----------------------------------------------------*/
    /*  Counters
/*----------------------------------------------------*/
    var resizeTimer;
    $(window).on('load resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            $('.dashboard-stat-content h5').counterUp({
                delay: 100,
                time: 800
            });
        }, 250);
    });

    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
// ------------------ End Document ------------------ //
});

})(this.jQuery);