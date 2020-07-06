let app = {
    init: function () {
        app.currentYear();
        /*
        app.loadJson(function(response) {
            // Parse JSON string into object
            let actual_JSON = JSON.parse(response);

            app.createCvFromJson(actual_JSON);
        });
        */
        app.contact();
    },
    currentYear: function () {
        document.getElementById("year").innerHTML = new Date().getFullYear().toString();
    },
    loadJson: function (callback) {
        let xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'assets/data/data.json', true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState === 4 && xobj.status === 200) {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    },
    createCvFromJson: function (data) {
        // resume
        document.getElementById("resume_resume-info_h1").innerText = data.resume[0].fullname;
        document.getElementById("resume_resume-info_h2").innerText = data.resume[0].job;
        document.getElementById("resume_resume-info_h3").innerText = data.resume[0].localisation;
        // presentation
        document.getElementById("presentation_description").innerHTML = data.presentation[0].description;
        let buttonCv = document.getElementById("presentation_cv");
        buttonCv.href = data.presentation[0].link;
        buttonCv.title = data.presentation[0].alt;
        // experiences
        // xp 0
        document.getElementById("experiences_experiences-infos_h2").innerHTML = data.experiences[0].title;
        let ulTags = document.getElementById("experiences_experiences-infos_ul");
        for(let tag in data.experiences[0].tags) {
            let li = document.createElement("li");
            let span = document.createElement("span");
            span.classList.add("badge", "badge-secondary");
            span.innerText = data.experiences[0].tags[tag].title;
            li.appendChild(span);
            ulTags.appendChild(li);
        }
        document.getElementById("experiences_experiences-infos_description").innerHTML = data.experiences[0].description;
        let buttonGithub = document.getElementById("experiences_experiences-infos_link");
        buttonGithub.href = data.experiences[0].links[0].url;
        buttonGithub.title = data.experiences[0].links[0].title;
        buttonGithub.innerText = data.experiences[0].links[0].value;
        let image = document.getElementById("experiences_experiences-infos_media");
        image.src = data.experiences[0].media[0].url;
        image.alt = data.experiences[0].media[0].alt;
        // xp 1
        // xp 2
        // xp 3
        // xp 4
        // xp 5

        // competences
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