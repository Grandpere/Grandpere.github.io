let app = {
    init: function () {
        document.getElementById("year").innerHTML = new Date().getFullYear().toString();

        app.contact();
    },
    send: function (event) {
        event.preventDefault();

        let name = document.querySelector("#contact-me-name").value;
        let email = document.querySelector("#contact-me-email").value;
        let content = document.querySelector("#contact-me-message").value;

        Email.send({
            SecureToken : "c20cdf47-f67e-453e-8dbb-7e76cf8d0206",
            To : 'lorenzo.marozzo@gmail.com',
            From : email,
            Subject : name + " - Contact from portfolio",
            Body : "From "+ name + " " + email + "<br /><br />" +  content
        }).then(
            function (message) {
                document.querySelector("#contact-me-error").innerText = message;
                document.querySelector("#contact-me-error").classList.remove("hide");
                document.querySelector("#contact-me-error").classList.add("show");
            },
            /*setInterval(function () {
                document.querySelector("#contact-me-error").classList.remove("show");
                document.querySelector("#contact-me-error").classList.add("hide");
            }, 4000),*/
        );
    },
    contact: function () {
        let form = document.getElementById("formspree_contact");
        let button = document.getElementById("formspree_submit");
        let status = document.getElementById("formspree_status");

        function success() {
            form.reset();
            //button.style = "display: none;";
            status.innerHTML = "Thanks!";
            statusClass();
            status.style.color = "#30cc8b";
        }

        function error() {
            status.innerHTML = "Oops! There was a problem.";
            statusClass();
            status.style.color = "#F46036";
        }

        function  statusClass() {
            status.classList.remove("hide");
            status.classList.add("show");
        }

        form.addEventListener("submit", function(ev) {
            ev.preventDefault();
            let data = new FormData(form);
            app.ajax(form.method, form.action, data, success, error);
        });
    },
    ajax: function (method, url, data, success, error) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                success(xhr.response, xhr.responseType);
            } else {
                error(xhr.status, xhr.response, xhr.responseType);
            }
        };
        xhr.send(data);
    }
};

document.addEventListener('DOMContentLoaded', app.init);