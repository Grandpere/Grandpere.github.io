let app = {
    init: function () {
        document.getElementById("year").innerHTML = new Date().getFullYear().toString();

        document.querySelector("#contact-me-button").addEventListener('click', function (event) {
            app.send(event);
        });
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
            Body : content + "<br />" + email
        }).then(
            function (message) {
                document.querySelector("#contact-me-error").innerText = message;
                document.querySelector("#contact-me-error").classList.remove("hide");
                document.querySelector("#contact-me-error").classList.add("show");
            },
            setInterval(function () {
                document.querySelector("#contact-me-error").classList.remove("show");
                document.querySelector("#contact-me-error").classList.add("hide");
            }, 4000),
        );
    }
}

document.addEventListener('DOMContentLoaded', app.init);