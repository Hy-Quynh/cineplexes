(function ($) {
    "use strict";

    $(document).ready(function() {
      const currentPage = getUrlParameter('page');
      const total_page = $('.paging').text().length;
      $('.paging').each(function( index ) {
        if($(this).text() == currentPage) this.setAttribute('class', 'active');
      });
    });
    $('.prev').on('click', function () {
      const currentPage = getUrlParameter('page');
      const limit = $('.pagination-area').data('limit');
      if(currentPage > 1){
        const page = currentPage - 1;
        location.href = `/user/profile/history?page=${page}&limit=${limit}`
      }
    });
    $('.next').on('click', function () {
      const currentPage = getUrlParameter('page');
      const limit = $('.pagination-area').data('limit');
      const totalPage = $('.pagination-area').data('total');
      if(currentPage < totalPage){
        const page = Number(currentPage) + 1;
        location.href = `/user/profile/history?page=${page}&limit=${limit}`
      }
    });

    $(document).on('click', '.paging', function() {
      const page = this.getAttribute('data-page');
      const limit = this.getAttribute('data-limit');
      // this.setAttribute('class', 'active');
      this.setAttribute('href',`/user/profile/history?page=${page}&limit=${limit}`);
    });

    var info;
    var edit;
    $('.item .item-icon .edit').on('click', function (e) {
      e.preventDefault();
      info = $(this).data('info');
      edit = $(this).data('edit');
      const item = $(this).parent().parent();
      const item_content = item.find('.item-content');
      item_content.find('a').remove();
      item_content.find('span').after('<input>');
      item_content.find('input').attr('type', 'text');
      item_content.find('input').attr('id', 'edited');
      item_content.find('input').attr('value', info);
      item_content.after($('<div></div>').addClass('item-icon').attr('id','confirm'));
      item_content.after($('<div></div>').addClass('item-icon').attr('id','close'));
      item.find('#confirm').append('<button><i class="fas fa-check"></i></button>');
      item.find('#confirm').find('button').find('i').css('color', '#31d7a9');
      item.find('#confirm').find('button').addClass('edit');
      item.find('#confirm').find('button').attr('data-edit', edit);
      item.find('#close').append('<button><i class="fas fa-times"></i></button>');
      item.find('#close').find('button').find('i').css('color', '#f1481f');
      item.find('#close').find('button').addClass('edit');
      $(this).parent().remove();
    });

    $(document).on('click','.item #close .edit', function (e) {
      e.preventDefault();
      const item = $(this).parent().parent();
      const item_content = item.find('.item-content');
      item.find('#confirm').remove();
      item.find('#close').remove();
      item_content.after($('<div></div>').addClass('item-icon'));
      item.find('.item-icon').append('<button><i class="far fa-edit"></i></button>');
      item.find('.item-icon').find('button').addClass('edit');
      item.find('.item-icon').find('button').attr('data-info', info);
      item.find('.item-icon').find('button').attr('data-edit', edit);
      item_content.find('input').remove();
      item_content.append($('<a></a>').attr('href',`#${info}`).text(info));
    });

    $(document).on('click','.item #confirm .edit', function () {
      // e.preventDefault();
      const item = $(this).parent().parent();
      const item_content = item.find('.item-content');
      const data = item_content.find('input').val();
      const need_editing = $(this).data('edit');
      if(data){
        $.ajax({
            type: "POST",
            url: '/user/profile/edit',
            data: {
                information: data,
                need_editing: need_editing,
            },
            success: function (data) {
              if(data.status == 'success'){
                item.find('#confirm').remove();
                item.find('#close').remove();
                item_content.after($('<div></div>').addClass('item-icon'));
                item.find('.item-icon').append('<button><i class="far fa-edit"></i></button>');
                item.find('.item-icon').find('button').addClass('edit');
                item.find('.item-icon').find('button').attr('data-info', info);
                item.find('.item-icon').find('button').attr('data-edit', edit);
                item_content.find('input').remove();
                item_content.append($('<a></a>').attr('href',`#${data.edited_information}`).text(data.edited_information));
                if(need_editing == 'name'){
                  $('.header-wrapper .menu .profile .submenu li .name span').text(data.edited_information);
                }
                document.body.appendChild(divSuccess);
                CreateToastSuccess('success', 'Edited successfully!');
                var thisToastSuccessSelect = toastCounterSuccess - 1;
                $(document).find("#toast_success_"+thisToastSuccessSelect).slideDown(600);
                setTimeout(function(){
                  $(document).find("#toast_success_"+thisToastSuccessSelect).slideUp(600,function(){
                    $(this).remove();
                  });
                },2000);  // 2sec.
              }
            },
            error: function (res) {
              if(res.responseJSON){
                document.body.appendChild(div);
                CreateToast('error', 'Error!', `${res.responseJSON.message}`);
                var thisToastSelect = toastCounter - 1;
                $(document).find("#toast_"+thisToastSelect).slideDown(600);
                setTimeout(function(){
                  $(document).find("#toast_"+thisToastSelect).slideUp(600,function(){
                    $(this).remove();
                  });
                },3000);  // 3sec.
              }
            }
        });
      }

    });

    $(document).on('click', '.change-password', function (e) {
      e.preventDefault();
      $('.window-warning').removeClass('inActive');
    });

    $('.window-warning .warning-item .password-form .custom-button').on('click', function (e) {
      e.preventDefault();
      const password = $('.password-form #password').val();
      if(password && password != '') {
        $.ajax({
            type: "POST",
            url: '/user/profile/change-password',
            data: { password: password },
            success: function (data) {
              if(data.status == 'success'){
                document.body.appendChild(divSuccess);
                CreateToastSuccess('success', 'Successfully!');
                var thisToastSuccessSelect = toastCounterSuccess - 1;
                $(document).find("#toast_success_"+thisToastSuccessSelect).slideDown(600);
                setTimeout(function(){
                  $(document).find("#toast_success_"+thisToastSuccessSelect).slideUp(600,function(){
                    $(this).remove();
                  });
                  location.href = '/user/forgot-password';
                },2000);  // 2sec.
              }
            },
            error: function (res) {
              if(res.responseJSON){
                document.body.appendChild(div);
                CreateToast('error', 'Change the password', `${res.responseJSON.message}`);
                var thisToastSelect = toastCounter - 1;
                $(document).find("#toast_"+thisToastSelect).slideDown(600);
                setTimeout(function(){
                  $(document).find("#toast_"+thisToastSelect).slideUp(600,function(){
                    $(this).remove();
                  });
                },3000);  // 3sec.
              }
            }
        });
      }
      else {
        document.body.appendChild(div);
        CreateToast('error', 'Change the password', 'Please enter a password.');
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
    })

    var toastCounter=0;
    var div = document.createElement("div");
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
      toastCounter++;
    }

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

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};
