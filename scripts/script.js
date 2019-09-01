var originalDOM = document.getElementById('contenu').innerHTML;

function ajaxRequest(plateforme, player) {

    document.getElementById('contenu').innerHTML = originalDOM;

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {

            var myArr = this.responseText;

            obj = JSON.parse(myArr);

            if (typeof obj.errors !== 'undefined') {

                $('#contenu').append("<div class='alert alert-danger mt-4' role='alert'>" + "Aucun joueur trouvé" + "</div>");

            } else {

                $('#contenu').innerHTML = '';

                $('#player_overview').append("<div class='row mt-4 '><table class='table table-striped table-dark'><thead><tr><th>Avatar</th><th>Username</th><th>Level</th><th>Country</th></tr></thead><tbody><tr><td><img id='avatar' src=" + obj.data.metadata.avatarUrl + " + width='40px' height='40px'></td><td id='name'>" + obj.data.metadata.platformUserHandle + " </td><td id='level'>" + obj.data.metadata.level + "</td><td id='country'>" + obj.data.metadata.countryCode + "</td></tr></tbody></table></div>");

                $('#player_overview_stats').append("<div class='row mt-4'><table class='table table-striped table-dark'><thead><tr><th>Kills</th><th>Damage</th><th>Headshots</th><th>Revives</th></tr></thead><tbody><tr><td id=\"kills\">" + obj.data.stats[1].value + "</td><td id=\"damage\">" + obj.data.stats[2].value + "</td><td id=\"headshots\">" + obj.data.stats[3].value + "</td><td id=\"revives\">" + obj.data.stats[4].value + "</td></tr></tbody></table></div>");

                Object.keys(obj).forEach(function (key) {

                    var children = obj[key]['children'];

                    children.forEach(function (element) {

                        // console.log(element);

                        $('#content').append("<div class='tnr-card' id='" + element.id + "'></div>");

                        $('#' + element.id + "").append("<div class='tnr-card_header'>" + element.metadata.legend_name + "</div>");

                        $('#' + element.id + "").append("<div class='ap-legend-stats' id='ap-legend-stats" + element.id + "'></div>");

                        $('#' + "ap-legend-stats" + element.id + "").append("<div class='ap-legend-stats__image' id='ap-legend-stats__image" + element.id + "'></div>");

                        $('#' + "ap-legend-stats" + element.id + "").append("<div class='ap-legend-stats__stats' id='ap-legend-stats__stats" + element.id + "'></div>");

                        $('#' + "ap-legend-stats__stats" + element.id + "").append("<div class='trn-defstats-grid trn-defstats-grid--col4' id='grid" + element.id + "'>");

                        $('#' + "ap-legend-stats__image" + element.id + "").append("<div class='image' style='background-image: url(" + element.metadata.icon + ");'> </div>");

                        for (var item in element.stats) {

                            $('#' + "grid" + element.id + "").append("<div class='trn-defstat'><div class='trn-defstat__name'>" + element.stats[item]['metadata']['name'] + "</div><div class='trn-defstat__value'>" + element.stats[item]['displayValue'] + "</div>");

                            //console.log(element.stats[item])

                        }

                        //console.log($('#' + element.id + ""));

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