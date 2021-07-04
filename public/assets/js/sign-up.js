(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {

      $('#name1').change(function (e) {
        e.preventDefault();
        var name = $(this).val();
        if(!name){
          // $(':input[type="submit"]').prop('disabled', true);
          $('#validationName').addClass('error').find('span').empty().append(`<i class="fas fa-exclamation-circle"></i> Name is required`);
          $(this).addClass('error');
          $('.form-group .signup').attr('disabled', true);
        }
        else{
          $('#validationName').addClass('error').find('span').empty();
          $(this).removeClass('error');
          $('.form-group .signup').attr('disabled', false);
        }
      });

      $('#phone1').change(function (e) {
        e.preventDefault();
        var phone = $(this).val();
        if(!phone){
          // $(':input[type="submit"]').prop('disabled', true);
          $('#validationPhone').addClass('error').find('span').empty().append(`<i class="fas fa-exclamation-circle"></i> Phone number is required`);
          $(this).addClass('error');
          $('.form-group .signup').attr('disabled', true);
        }
        else{
          $('#validationPhone').addClass('error').find('span').empty();
          $(this).removeClass('error');
          $('.form-group .signup').attr('disabled', false);
        }

        if(!phone.trim().match(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)){
          $('#validationPhone').addClass('error').find('span').empty().append(`<i class="fas fa-exclamation-circle"></i> Phone number is not in the correct format`);
          $(this).addClass('error');
          $('.form-group .signup').attr('disabled', true);
        }
        else{
          $('#validationPhone').addClass('error').find('span').empty();
          $(this).removeClass('error');
          $('.form-group .signup').attr('disabled', false);
        }
      });

      $('#email1').change(function (e) {
        e.preventDefault();
        var email = $(this).val();
        if(!email){
          $('#validationEmail').addClass('error').find('span').empty().append(`<i class="fas fa-exclamation-circle"></i> Email is required`);
          $(this).addClass('error');
          $('.form-group .signup').attr('disabled', true);
        }
        else{
          $('#validationEmail').addClass('error').find('span').empty();
          $(this).removeClass('error');
          $('.form-group .signup').attr('disabled', false);
        }
        if(!email.trim().match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
          $('#validationEmail').addClass('error').find('span').empty().append(`<i class="fas fa-exclamation-circle"></i> Please include an '@' in the email, '${email}' is not a address`);
          $(this).addClass('error');
          $('.form-group .signup').attr('disabled', true);
        }
        else{
          $('#validationEmail').addClass('error').find('span').empty();
          $(this).removeClass('error');
          $('.form-group .signup').attr('disabled', false);
        }
      });

      $('#pass1').change(function (e) {
        e.preventDefault();
        var pass1 = $(this).val();
        if(!pass1){
          $('#validationPassword').addClass('error').find('span').empty().append(`<i class="fas fa-exclamation-circle"></i> Password is required`);
          $(this).addClass('error');
          $('.form-group .signup').attr('disabled', true);
        }
        else{
          $('#validationPassword').addClass('error').find('span').empty();
          $(this).removeClass('error');
          $('.form-group .signup').attr('disabled', false);
        }
      });

      $('#pass2').change(function (e) {
        e.preventDefault();
        var pass1 = $('#pass1').val();
        var pass2 = $(this).val();
        if(!pass2){
          $('#validationConfirmPassword').addClass('error').find('span').empty().append(`<i class="fas fa-exclamation-circle"></i> Confirm password is required`);
          $(this).addClass('error');
          $('.form-group .signup').attr('disabled', true);
        }
        else{
          $('#validationConfirmPassword').addClass('error').find('span').empty();
          $(this).removeClass('error');
          $('.form-group .signup').attr('disabled', false);
        }

        if(pass1 != pass2){
          $('#validationPassword').addClass('error').find('span').empty().append(`<i class="fas fa-exclamation-circle"></i> Password and confirm password do not match`);
          $(this).addClass('error');
          $('#pass1').addClass('error');
          $('.form-group .signup').attr('disabled', true);
        }
        else{
          $('#validationPassword').addClass('error').find('span').empty();
          $(this).removeClass('error');
          $('#pass1').removeClass('error');
          $('.form-group .signup').attr('disabled', false);
        }

      });

      $(document).on('submit', '#form-account', function (e) {
          e.preventDefault();
          var nameInput = $('#name1').val();
          var phoneInput = $('#phone1').val();
          var emailInput = $('#email1').val();
          var passInput = $('#pass1').val();

          if (nameInput && phoneInput && emailInput && passInput) {
              $.ajax({
                  type: "POST",
                  url: '/user/sign-up',
                  data: {
                      'name': nameInput,
                      'email': emailInput,
                      'phoneNumber': phoneInput,
                      'password': passInput,
                  },
                  success: function (data) {
                    $('.validSuccess.success').empty();
                    $('.validSuccess').removeClass('success');
                    $('.form-group .signup').attr('disabled', false);
                    if(data.status){
                      $('.validSuccess').addClass('success').append(`<i class="far fa-check-circle"></i> ${data.status}`)
                    }
                  },
                  error: function (res) {
                    console.log(res.responseJSON.emailError);
                    if(res.responseJSON.emailError){
                      $('#validationEmail').addClass('error').find('span').empty().append(`<i class="fas fa-exclamation-circle"></i> ${res.responseJSON.emailError}`);
                      $('#email1').addClass('error');
                      $('.form-group .signup').attr('disabled', true);
                    }
                    else{
                      $('#validationEmail').addClass('error').find('span').empty();
                      $('#email1').removeClass('error');
                      $('.form-group .signup').attr('disabled', false);
                    }
                  }
              });
          }

      });

    });
}(jQuery));
