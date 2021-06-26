(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
      var date = new Date();
      var day = date.getDate().toString().padStart(2, '0');
      var month = (date.getMonth()+1).toString().padStart(2, '0');
      var year = date.getFullYear().toString().padStart(4, '0');
      var hours = date.getHours().toString().padStart(2, '0');
      var minutes = date.getMinutes().toString().padStart(2, '0');
      var seconds = date.getSeconds().toString().padStart(2, '0');

      var currentDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      var currentDateShow = `${day}/${month}/${year} ${hours}:${minutes}`;

      $('.booking-summery ul li .info .current').attr('data-currentdate', `${currentDate}`);
      $('.booking-summery ul li .info .current').text(`${currentDateShow}`);

      $('.proceed-area a').on('click', function () {
        var movieId = $('.booking-summery ul li .subtitle.movie').data('movie');
        var cinemaId = $('.booking-summery ul li .subtitle.cinema').data('cinema');
        var showAt = $('.checkout-widget .showAt').data('showat');
        var fare = $('.booking-summery ul li .subtitle .vnd').data('fare');
        var total = $('.proceed-area .subtitle .total').data('total');
        var selectedSeats = $('.booking-summery .side-shape li .info').data('selectedseats');
        var data = {
          movieId: movieId,
          cinemaId: cinemaId,
          showAt: showAt,
          currentDate: currentDate,
          fare: fare,
          totalPrice: total,
          selectedSeats: selectedSeats
        };
        var proceedJson = JSON.stringify(data);
        var proceedEncoded = encodeURIComponent(proceedJson);
        // var href =
        $(this).attr('href',`/ticket/ticket-payment/${proceedEncoded}`);
      });
    });
}(jQuery));
