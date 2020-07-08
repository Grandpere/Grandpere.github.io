let app = {
    init: function () {
        app.currentYear();
        app.addListeners();
        cv.init();
    },
    addListeners: function () {
        $('#formspree_name').on('input', app.handleValidateName);
        $('#formspree_email').on('input', app.handleValidateEmail);
        $('#formspree_message').on('keyup', app.handleValidateMessage);
        $('#formspree_contact').on('submit', app.handleValidateForm);
    },
    currentYear: function () {
        $('#year').html(new Date().getFullYear().toString());
    },
    handleValidateName: function() {
        let input = $(this);
        let isValid= app.validateName(input.val());

        if(false === isValid || input.val().length === 0) {
            input.removeClass('form-success').addClass('form-error');
        }
        else {
            input.removeClass('form-error').addClass('form-success');
        }
    },
    validateName: function(name) {
        let regex = /^([a-zA-Z]{2,})([ \-]?)([a-zA-z]{2,})*$/;

        return regex.test(name);
    },
    handleValidateEmail: function () {
        let input = $(this);
        let isValid = app.validateEmail(input.val());

        if(true === isValid){
            input.removeClass("form-error").addClass("form-success");
        }
        else{
            input.removeClass("form-success").addClass("form-error");
        }
    },
    validateEmail: function(email) {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        return regex.test(email);
    },
    handleValidateMessage: function () {
        let input = $(this);
        let isValid = app.validateMessage(input.val());

        if(true === isValid){
            input.removeClass("form-error").addClass("form-success");
        }
        else{
            input.removeClass("form-success").addClass("form-error");
        }
    },
    validateMessage: function(message) {
        return 0 < message.length;
    },
    handleValidateForm: function(evt) {
        evt.preventDefault();
        let form = $(this);
        let status = $('#formspree_status');
        let name = $('#formspree_name').val();
        let email = $('#formspree_email').val();
        let message = $('#formspree_message').val();

        if(true === app.validateName(name) && true === app.validateEmail(email) && true === app.validateMessage(message))
        {
            let data = form.serializeArray();
            app.contact(data);
        }
        else {
            status.html('At least one field is invalid');
            status.css('color', '#F46036');
            status.removeClass('hide');
            status.addClass('show');
        }
    },
    contact: function (data) {
        let form = $('#formspree_contact');
        let status = $('#formspree_status');

        function success() {
            form.trigger('reset');
            status.html('Thanks!');
            status.css('color', '#30cc8b');
            statusClass();
        }

        function error() {
            status.html('Oops! There was a problem.');
            status.css('color', '#F46036');
            statusClass();
        }

        function statusClass() {
            status.removeClass('hide');
            status.addClass('show');
        }

        $.ajax(
            {
                method: form.attr('method'),
                url: form.attr('action'),
                data: data,
                dataType: 'json'
            }
        ).done(function(response) {
            success();
        }).fail(function(response) {
            error();
        });
    }
};

document.addEventListener('DOMContentLoaded', app.init);