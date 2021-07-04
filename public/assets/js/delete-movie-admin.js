(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
      let movieId;
      $(document).on('click', '#delete', function (e) {
        e.preventDefault();
        movieId = $(this).data('movieid');
        $('.window-warning').removeClass('inActive');
      });

      $(document).on('click', '.window-warning .warning-item .button button', function () {
        var selected = $(this).data('select');
        if(selected == 'agree'){
          if(movieId){
            $.ajax({
                type: "POST",
                url: '/admin/delete-movie',
                data: { movieId: movieId },
                success: function (data) {
                  if(data.status == 'success'){
                    $('.window-warning').addClass('inActive');
                    document.body.appendChild(divSuccess);
                    CreateToastSuccess('success', 'Successfully Deleted!');
                    var thisToastSuccessSelect = toastCounterSuccess - 1;
                    $(document).find("#toast_success_"+thisToastSuccessSelect).slideDown(600);
                    setTimeout(function(){
                      $(document).find("#toast_success_"+thisToastSuccessSelect).slideUp(600,function(){
                        $(this).remove();
                        location.reload();
                      });
                    },1500);  // 2sec.
                  }
                },
                error: function (res) { }
            });
          }
        }
        else{
          $('.window-warning').addClass('inActive');
        }
      });


    });

    $('.window-warning .lay').on('click', function() {
      $('.window-warning').addClass('inActive');
    })

    var toastCounterSuccess = 0;
    var divSuccess = document.createElement("div");
    var notificationSuccess = divSuccess.appendChild(document.createElement('div'))
    notificationSuccess.className = 'ant-message';
    function CreateToastSuccess(status, header) {
      var toastDivSeccess = notificationSuccess.appendChild(document.createElement('div'));
      toastDivSeccess.id = "toast_success_" + toastCounterSuccess;
      toastDivSeccess.style.display = "none";
      var template;
      if(status == 'success'){
        template = `
          <div class="ant-message-notice ant-move-up-leave ant-move-up-leave-active ant-move-up">
            <div class="ant-message-notice-content">
              <div class="ant-message-custom-content ant-message-success">
                <span role="img" aria-label="check-circle" class="anticon anticon-check-circle">
                  <svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path>
                  </svg>
                </span>
                <span>${header}</span>
              </div>
            </div>
          </div>
        `
      }
      toastDivSeccess.innerHTML = template;
      toastCounterSuccess++;
    }
}(jQuery));
