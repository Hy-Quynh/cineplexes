(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {

      $('#username').change(function (e) {
        e.preventDefault();
        var username = $(this).val();
        if(!username || username == ''){
          $('#validationRole').addClass('error').find('span').empty();
          $('#validationUsername').addClass('error').find('span').empty().append(`<i class="fas fa-exclamation-circle"></i> Username is required`);
          $('#validationUsername').addClass('error');
          $('.form-group .login').attr('disabled', true);
        }
        else {
          $('#validationUsername').addClass('error').find('span').empty();
          $('#validationUsername').removeClass('error');
          $('.form-group .login').attr('disabled', false);
        }
      });

      $('#pass').change(function (e) {
        e.preventDefault();
        var pass = $(this).val();
        if(!pass || pass == ''){
          $('#validationRole').addClass('error').find('span').empty();
          $('#validationPassword').addClass('error').find('span').empty().append(`<i class="fas fa-exclamation-circle"></i> Password is required`);
          $('#validationPassword').addClass('error');
          $('.form-group .login').attr('disabled', true);
        }
        else{
          $('#validationPassword').addClass('error').find('span').empty();
          $('#validationPassword').removeClass('error');
          $('.form-group .login').attr('disabled', false);
        }
      });

      $(document).on('submit', '#form-account', function (e) {
          e.preventDefault();
          var usernameInput = $('#username').val();
          var passInput = $('#pass').val();
          if (usernameInput && passInput) {
              $.ajax({
                  type: "POST",
                  url: '/user/admin/auth',
                  data: {
                      username: usernameInput,
                      password: passInput,
                  },
                  success: function (data) {
                    if(data.status == 'success'){
                      $('.form-group .login').attr('disabled', false);
                      location.href = '/admin/dashboard';
                    }
                  },
                  error: function (res) {
                    if(res.responseJSON.usernameError){
                      $('#validationPassword').addClass('error').find('span').empty();
                      $('#validationRole').addClass('error').find('span').empty();
                      $('#validationUsername').addClass('error').find('span').empty().append(`<i class="fas fa-exclamation-circle"></i> ${res.responseJSON.usernameError}`);
                      $('#username').addClass('error');
                      $('.form-group .login').attr('disabled', true);
                    }
                    else if (res.responseJSON.passwordError){
                      $('#validationUsername').addClass('error').find('span').empty();
                      $('#validationRole').addClass('error').find('span').empty();
                      $('#validationPassword').addClass('error').find('span').empty().append(`<i class="fas fa-exclamation-circle"></i> ${res.responseJSON.passwordError}`);
                      $('#pass').addClass('error');
                      $('.form-group .login').attr('disabled', true);
                    }
                    else if(res.responseJSON.roleError){
                      $('#validationUsername').addClass('error').find('span').empty();
                      $('#validationPassword').addClass('error').find('span').empty();
                      $('#validationRole').addClass('error').find('span').empty().append(`<i class="fas fa-exclamation-circle"></i> ${res.responseJSON.roleError}`);
                      $('#validationRole').addClass('error');
                      $('.form-group .login').attr('disabled', true);
                    }
                  }
              });
          }

      });

    });
}(jQuery));
