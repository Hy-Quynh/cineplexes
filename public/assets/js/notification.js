(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
      $('.button').on('click', function () {
        $('.dialog').fadeIn('slow');
        setTimeout(function () {
          $('.dialog').hide();
       },2000);
      });
    });
}(jQuery));
