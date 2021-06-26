(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
      var movieId = $('.details-banner-content .title').data('movieid');
      $('#cineplexSelect').change(function (e) {
        e.preventDefault();
        var notifi = $('.notification');
        var value = $(this).val();
        if(value !== -1){
          $.ajax({
            type: "POST",
            url: '/ticket/booking',
            data: {
              'cineplexId': value,
              'movieId': movieId
            },
            success: function (data) {
              $('.seat-plan-wrapper').addClass('bg-five').empty();
              $.each(data.cinemas, function (key, value) {
                $('.seat-plan-wrapper').addClass('bg-five').append(
                  `<li>
                    <div class="movie-name">
                      <div class="icons"><i class="fas fa-film"></i><i class="fas fa-film"></i></div>
                      <a href="#0" class="name" data-cinemaid="${value._cinemaID}" >${value.cinemaName}</a>
                      <div class="location-icon"><i class="fas fa-map-marker-alt"></i></div>
                    </div>
                    <div class="movie-schedule">
                      <div class="item">${value.showAt}</div>
                    </div>
                  </li>`);
              });
              notifi.text('please select cinema below');
            },
            error: function (res) {

            }
          });
        }

      });


      $('.window-warning .lay').on('click', function() {
        $('.window-warning').addClass('inActive');
        // if($('.seat-plan-wrapper li').hasClass('active')){
        //   $('.seat-plan-wrapper li').removeClass('active');
        // }
        $('.seat-plan-wrapper li').toggleClass('active').removeClass('active')

      })

      $(document).on('click', '.seat-plan-wrapper li .movie-schedule .item', function(event) {
        $('.window-warning').removeClass('inActive');
        $(this).parent().parent().addClass('active');

        // console.log($('.seat-plan-wrapper .active .movie-name .name').data('cinemaid'));
        // console.log($('.seat-plan-wrapper .active .movie-schedule .item').text());
      });

      $('.window-warning .warning-item a').on('click', function () {
        var selectedcinema = $('.seat-plan-wrapper .active .movie-name .name').data('cinemaid');
        var showAt = $('.seat-plan-wrapper .active .movie-schedule .item').text();
        var data = {
          movieId: movieId,
          cinemaId: selectedcinema,
          showAt: showAt
        }
        var infoSelected = JSON.stringify(data);
        var encoded = encodeURIComponent(infoSelected);
        var href = $(this).attr('href', `/ticket/seat-plan/${encoded}`);
        window.location.href = href;
      });

    });
}(jQuery));

// $('.seat-plan-wrapper li').empty();
// $('.seat-plan-wrapper').addClass('bg-five').append('<li></li>');
// $('.seat-plan-wrapper li').append($('<div/>').addClass('movie-name'));
// $('.seat-plan-wrapper li .movie-name').append('<div class="icons"><i class="fas fa-film"></i><i class="fas fa-film"></i></div>');
// $('.seat-plan-wrapper li .movie-name .icons').after($('<a/>').addClass('name'));
// $('.seat-plan-wrapper li .movie-name .name').attr('href',"#0");
// $('.seat-plan-wrapper li .movie-name .name').text(`${value.cinemaName}`);
// $('.seat-plan-wrapper li .movie-name .name').after($('<div/>').addClass('location-icon'));
// $('.seat-plan-wrapper li .movie-name .location-icon').append('<i class="fas fa-map-marker-alt"></i>');
// $('.seat-plan-wrapper li').append($('<div/>').addClass('movie-schedule'));
// $('.seat-plan-wrapper li .movie-schedule').append($('<div/>').addClass('item'));
// $('.seat-plan-wrapper li .movie-schedule .item').text(`${value.showAt}`);
// return false;

// $('.seat-plan-wrapper li .movie-schedule .item').on('click', function() {
//   $(this).addClass('active');
//   $('.window-warning').removeClass('inActive');
// })
