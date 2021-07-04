(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {

      $('#email2').change(function (e) {
        e.preventDefault();
        var email = $(this).val();
        if(!email){
          $('#validationEmail').addClass('error').find('span').empty().append(`<i class="fas fa-exclamation-circle"></i> Email is required`);
          $('#validationEmail').addClass('error');
          $('.form-group .login').attr('disabled', true);
        }
        else {
          $('#validationEmail').addClass('error').find('span').empty();
          $('#validationEmail').removeClass('error');
          $('.form-group .login').attr('disabled', false);
        }

        if(!email.trim().match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
          $('#validationEmail').addClass('error').find('span').empty().append(`<i class="fas fa-exclamation-circle"></i> Please include an '@' in the email, '${email}' is not a address`);
          $('#validationEmail').addClass('error');
          $('.form-group .login').attr('disabled', true);
        }
        else{
          $('#validationEmail').addClass('error').find('span').empty();
          $('#validationEmail').removeClass('error');
          $('.form-group .login').attr('disabled', false);
        }
      });

      $('#pass').change(function (e) {
        e.preventDefault();
        var pass = $(this).val();
        if(!pass){
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
          var emailInput = $('#email2').val();
          var passInput = $('#pass').val();

          if (emailInput && passInput) {
              $.ajax({
                  type: "POST",
                  url: '/user/sign-in',
                  data: {
                      'email': emailInput,
                      'password': passInput,
                  },
                  success: function (data) {
                    if(data.status){
                      $('.form-group .login').attr('disabled', false);
                      location.href = '/';
                    }
                  },
                  error: function (res) {
                    if(res.responseJSON.emailError){
                      $('#validationPassword').addClass('error').find('span').empty()
                      $('#validationEmail').addClass('error').find('span').empty().append(`<i class="fas fa-exclamation-circle"></i> ${res.responseJSON.emailError}`);
                      $('#email2').addClass('error');
                      $('.form-group .login').attr('disabled', true);
                    }
                    else if (res.responseJSON.passwordError){
                      $('#validationEmail').addClass('error').find('span').empty();
                      $('#validationPassword').addClass('error').find('span').empty().append(`<i class="fas fa-exclamation-circle"></i> ${res.responseJSON.passwordError}`);
                      $('#pass').addClass('error');
                      $('.form-group .login').attr('disabled', true);
                    }
                  }
              });
          }

      });

    });
}(jQuery));
