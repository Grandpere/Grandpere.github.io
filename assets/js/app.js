let app = {
    init: function () {
        document.getElementById("year").innerHTML = new Date().getFullYear().toString();
    }
}

document.addEventListener('DOMContentLoaded', app.init);