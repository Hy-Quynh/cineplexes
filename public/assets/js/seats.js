(function ($) {
    "use strict";

    var arrayseat = [];
    let total = 0;

    jQuery(document).ready(function ($) {

      var movieIdSelectedDataMovie = $('.details-banner-wrapper .details-banner-content .title').data('movieid');
      var cinemaIdSelectedDataMovie = $('.page-title-area .item.cineplex p').data('cinemaid');
      var showAtSelectedDataMovie = $('.page-title-area .item.showtime p').data('showat');
      $.ajax({
          type: "GET",
          url: '/ticket/selected-seat',
          data: {
            movieId: movieIdSelectedDataMovie,
            cinemaId: cinemaIdSelectedDataMovie,
            showAt: showAtSelectedDataMovie
          },
          success: function (data) {
            var selected = [];
            data.selected.forEach((item) => {
              selected.push(item.seatCode);
            });
            for (var i = 65; i <= 72; i++) {
              for (var j = 1; j <= 16; j++) {
                var column = String.fromCharCode(i) + j;
                $(`#${column}`).attr('data-price', data.ticket.fare);
                if(selected.indexOf(column) > -1){
                  $(`#${column}`).removeClass('seat-free');
                  $(`#${column}`).find('img').remove();
                  $(`#${column}`).find('span').remove();
                  $(`#${column}`).append('<img src="../../assets/images/movie/seat01.png" alt="seat">')
                }
              }
            }
          },
          error: function (res) {

          }
       });

      $(".seat-free img").on('click', function(e) {
        e.preventDefault();
        if(!$(this).parent().hasClass('selected')) {
          $(this).attr("src","../../assets/images/movie/seat01-booked.png");
          $(this).parent().addClass('selected');
          arrayseat.push($(this).parent().attr('id'));
          $('#seat-selected').empty();
          $('#total').empty();
          $('#seat-selected').append(arrayseat.join(', '));
          total = total + $(this).parent().data('price');
          $('#total').append(`${total.toLocaleString()} đ`);
        }
        else{
          $(this).attr("src","../../assets/images/movie/seat01-free.png");
          $(this).parent().removeClass('selected');
          remove(arrayseat, $(this).parent().attr('id'));
          total = total - $(this).parent().data('price');
          $('#seat-selected').empty();
          $('#total').empty();
          $('#seat-selected').append(arrayseat.join(', '));
          $('#total').append(`${total.toLocaleString()} đ`);
        }
      });

      $('.proceed-to-book .book-item .custom-button').on('click', function (e) {
        e.preventDefault();
        if(arrayseat.length == 0 && total == 0 ){

        }
        else{
          var selectedSeats = JSON.stringify(arrayseat);
          var totalPrice = total;
          if(selectedSeats && totalPrice){
            var dataSelectedSeatsAndTotal = {
              cinemaId: cinemaIdSelectedDataMovie,
              movieId: movieIdSelectedDataMovie,
              showAt: showAtSelectedDataMovie,
              selectedSeats: selectedSeats,
              totalPrice: totalPrice
            };
            var dataSeatsAndTotalJson = JSON.stringify(dataSelectedSeatsAndTotal);
            var dataEncoded = encodeURIComponent(dataSeatsAndTotalJson);
            $.ajax({
                type: "POST",
                url: `/ticket/seat-plan/${dataEncoded}`,
                data: {},
                success: function (data) {
                  var dataInfo = JSON.stringify(data);
                  var encoded = encodeURIComponent(dataInfo);
                  window.location.href = `/ticket/checkout/${encoded}`;
                },
                error: function (res) {
                  // if(res.responseJSON.emailError){
                }
            });
          }
        }
      })

    });

    function remove(arr) {
      var what, a = arguments, L = a.length, ax;
      while (L > 1 && arr.length) {
          what = a[--L];
          while ((ax= arr.indexOf(what)) !== -1) {
              arr.splice(ax, 1);
          }
      }
      return arr;
    }
}(jQuery));
