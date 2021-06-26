(function ($) {
    "use strict";

    $.ajax({
        type: "GET",
        url: '/ticket/selected-seat',
        data: {

        },
        success: function (data) {
          console.log(data);
        },
        error: function (res) {

        }
      });

    var selected = ["B2", "B1", "B7","A1","E3","H4","C3","C5","C6"];

    for (var i = 65; i <= 72; i++) {
      for (var j = 1; j <= 16; j++) {
        var column = String.fromCharCode(i) + j;
        $(`#${column}`).attr('data-price', 89000);
        if(selected.indexOf(column) > -1){
          $(`#${column}`).removeClass('seat-free');
          $(`#${column}`).find('img').remove();
          $(`#${column}`).find('span').remove();
          $(`#${column}`).append('<img src="../../assets/images/movie/seat01.png" alt="seat">')
        }
      }
    }

    var arrayseat = [];

    jQuery(document).ready(function ($) {
      var total = 0;
      $(".seat-free img").on('click', function(e) {
        e.preventDefault();
        if(!$(this).parent().hasClass('selected')) {
          $(this).attr("src","../../assets/images/movie/seat01-booked.png");
          $(this).parent().addClass('selected');
          arrayseat.push($(this).parent().attr('id'));
          $('#seat-selected').empty();
          $('#total').empty();
          $('#seat-selected').append(arrayseat.toString());
          total = total + $(this).parent().data('price');
          $('#total').append(`${total.toLocaleString()} đ`);

          console.log(arrayseat);
        }
        else{
          $(this).attr("src","../../assets/images/movie/seat01-free.png");
          $(this).parent().removeClass('selected');
          remove(arrayseat, $(this).parent().attr('id'));
          total = total - $(this).parent().data('price');
          $('#seat-selected').empty();
          $('#total').empty();
          $('#seat-selected').append(arrayseat.toString());
          $('#total').append(`${total.toLocaleString()} đ`);

          console.log(arrayseat);
        }
      });
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
