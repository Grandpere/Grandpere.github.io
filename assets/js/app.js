let app = {
    init: function () {
        app.currentYear();
        app.contact();
        cv.init();
    },
    currentYear: function () {
        document.getElementById("year").innerHTML = new Date().getFullYear().toString();
    },
    contact: function () {
        let form = document.getElementById("formspree_contact");
        let status = document.getElementById("formspree_status");

        function success() {
            form.reset();
            status.innerHTML = "Thanks!";
            status.style.color = "#30cc8b";
            statusClass();
        }

        function error() {
            status.innerHTML = "Oops! There was a problem.";
            status.style.color = "#F46036";
            statusClass();
        }

        function statusClass() {
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