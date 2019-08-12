function ajaxRequest(plateforme, player) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {

            var myArr = this.responseText;

            obj = JSON.parse(myArr);

            if (typeof obj.errors !== 'undefined') {
                document.getElementById('avatar').src = 'https://via.placeholder.com/40';
                document.getElementById('name').innerHTML = obj.errors['0'].message;
                document.getElementById('level').innerHTML = "N/A";
                document.getElementById('country').innerHTML = "N/A";
                document.getElementById('kills').innerHTML = "N/A";
                document.getElementById('damage').innerHTML = "N/A";
                document.getElementById('headshots').innerHTML = "N/A";
                document.getElementById('revives').innerHTML = "N/A";
            } else {
                document.getElementById('avatar').src = obj.data.metadata.avatarUrl;
                document.getElementById('name').innerHTML = obj.data.metadata.platformUserHandle;
                document.getElementById('level').innerHTML = obj.data.metadata.level;
                document.getElementById('country').innerHTML = obj.data.metadata.countryCode;

                document.getElementById('kills').innerHTML = obj.data.stats[1].value;
                document.getElementById('damage').innerHTML = obj.data.stats[2].value;
                document.getElementById('headshots').innerHTML = obj.data.stats[3].value;
                document.getElementById('revives').innerHTML = obj.data.stats[4].value;

                Object.keys(obj).forEach(function (key) {

                    var children = obj[key]['children'];

                    children.forEach(function (element) {

                        console.log(element);

                        $('#content').append("<div class='card' id='"+element.id+"'><img class=card-img-top src='" + element.metadata.icon + "'></div>");
                        $('#'+element.id+"").append("<div class='card-body'></div>");
                        console.log( $('#'+element.id+""));
                    });

                });

            }

        }
    };

    xhttp.open("GET", "api.php?plateforme=" + plateforme + "&player=" + player, true);
    xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhttp.send();

}

document.getElementById('submit').addEventListener('click', function () {

    let player = document.getElementById('player').value;
    let e = document.getElementById("plateforme");
    let plateforme = e.options[e.selectedIndex].value;

    ajaxRequest(plateforme, player);

});