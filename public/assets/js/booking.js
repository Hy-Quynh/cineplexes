(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
      var movieId = $('.details-banner-content .title').data('movieid');
      $('#cineplexSelect').change(function (e) {
        e.preventDefault();
        var notifi = $('.notification');
        var value = $(this).val();
        if(value != '-1'){
          $.ajax({
            type: "POST",
            url: '/ticket/booking',
            data: {
              'cineplexId': value,
              'movieId': movieId
            },
            success: function (data) {
              if(data.cinemas){
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

                CreateToast('information', 'Success!', 'Please select cinema below');
                var thisToastSelect = toastCounter - 1;
                $(document).find("#toast_"+thisToastSelect).slideDown(600);
                setTimeout(function(){
                  $(document).find("#toast_"+thisToastSelect).slideUp(600,function(){
                    $(this).remove();
                  });
                },3000);  // 3sec.
              }
              else{
                CreateToast('error', 'No showtimes!', 'Please choose another cineplex.');
                var thisToastSelect = toastCounter - 1;
                $(document).find("#toast_"+thisToastSelect).slideDown(600);
                setTimeout(function(){
                  $(document).find("#toast_"+thisToastSelect).slideUp(600,function(){
                    $(this).remove();
                  });
                },3000);  // 3sec.
              }
            },
            error: function (res) { }
          });
        }
        else{
          CreateToast('error', 'Error!', 'Please select cineplex.');
          var thisToastSelect = toastCounter - 1;
          $(document).find("#toast_"+thisToastSelect).slideDown(600);
          setTimeout(function(){
            $(document).find("#toast_"+thisToastSelect).slideUp(600,function(){
              $(this).remove();
            });
          },3000);  // 3sec.
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

      var toastCounter=0;
      var div = document.createElement("div");
      document.body.appendChild(div);
      var notification = div.appendChild(document.createElement('div'))
      notification.className = 'ant-notification notification-topRight';
      notification.style.cssText = 'right: 0px; top: 24px; bottom: auto;';

      function CreateToast(status, header, description) {
        var toastDiv = notification.appendChild(document.createElement('div'));
        toastDiv.id = "toast_" + toastCounter;
        toastDiv.style.display = "none";
        var dialog;
        if (status == 'information') {
          dialog = `
            <div class="ant-notification-notice ant-notification-notice-error ant-notification-notice-closable">
              <div class="ant-notification-notice-content">
                <div class="ant-notification-notice-with-icon" role="alert">
                  <span role="img" aria-label="close-circle" class="anticon anticon-close-circle ant-notification-notice-icon ant-notification-notice-icon-info">
                    <svg viewBox="0 0 1000 1000" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                      <path d="M 500 0C 224 0 0 224 0 500C 0 776 224 1000 500 1000C 776 1000 1000 776 1000 500C 1000 224 776 0 500 0C 500 0 500 0 500 0M 500 75C 735 75 925 265 925 500C 925 735 735 925 500 925C 265 925 75 735 75 500C 75 265 265 75 500 75C 500 75 500 75 500 75 M 526 150C 576 150 602 175 601 224C 600 300 600 350 575 525C 570 560 560 575 525 575C 525 575 475 575 475 575C 440 575 430 560 425 525C 400 355 400 300 400 226C 400 175 425 150 475 150M 500 650C 527 650 552 661 571 679C 589 698 600 723 600 750C 600 805 555 850 500 850C 445 850 400 805 400 750C 400 723 411 698 429 679C 448 661 473 650 500 650C 500 650 500 650 500 650"/>
                    </svg>
                  </span>
                  <div class="ant-notification-notice-message">${header}</div>
                  <div class="ant-notification-notice-description">${description}</div>
                </div>
              </div>
              <a tabindex="0" class="ant-notification-notice-close">
                <span class="ant-notification-close-x">
                  <span role="img" aria-label="close" class="anticon anticon-close ant-notification-close-icon">
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                      <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                    </svg>
                  </span>
                </span>
              </a>
            </div>
          `;
        } else if(status == 'error') {
          dialog = `
            <div class="ant-notification-notice ant-notification-notice-error ant-notification-notice-closable">
              <div class="ant-notification-notice-content">
                <div class="ant-notification-notice-with-icon" role="alert">
                  <span role="img" aria-label="close-circle" class="anticon anticon-close-circle ant-notification-notice-icon ant-notification-notice-icon-error">
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                      <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0   1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path>
                      <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                    </svg>
                  </span>
                  <div class="ant-notification-notice-message">${header}</div>
                  <div class="ant-notification-notice-description">${description}</div>
                </div>
              </div>
              <a tabindex="0" class="ant-notification-notice-close">
                <span class="ant-notification-close-x">
                  <span role="img" aria-label="close" class="anticon anticon-close ant-notification-close-icon">
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                      <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                    </svg>
                  </span>
                </span>
              </a>
            </div>
          `;
        }
        toastDiv.innerHTML = dialog;
        // document.body.appendChild(toastDiv);
        toastCounter++;
      }

      $("#test1").on("click",function(){
        CreateToast('information', 'Không Thể Thêm Vào Giỏ Hành', 'Vui lòng chọn kích cỡ sản phẩm đó ?');
        var thisToast = toastCounter - 1;
        $(document).find("#toast_"+thisToast).slideDown(600);
        setTimeout(function(){
          $(document).find("#toast_"+thisToast).slideUp(600,function(){
            $(this).remove();
          });
        },3000);  // 3sec.
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
