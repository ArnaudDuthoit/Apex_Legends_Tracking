var originalDOM = document.getElementById('contenu').innerHTML;

function ajaxRequest(plateforme, player) {

    document.getElementById('contenu').innerHTML = originalDOM;

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {

            var myArr = this.responseText;

            obj = JSON.parse(myArr);

            if (typeof obj.errors !== 'undefined') {

                $('#contenu').append("<div class=\"alert alert-danger mt-4\" role=\"alert\">\n" +
                    "  Aucun joueur trouvé " +
                    "</div>");

            } else {

                $('#contenu').innerHTML ='';

                $('#player_overview').append("<div class=\"row mt-4 \">\n" +
                    "            <table class=\"table table-striped table-dark\">\n" +
                    "                <thead>\n" +
                    "                <tr>\n" +
                    "                    <th>Avatar</th>\n" +
                    "                    <th>Username</th>\n" +
                    "                    <th>Level</th>\n" +
                    "                    <th>Country</th>\n" +
                    "                </tr>\n" +
                    "                </thead>\n" +
                    "                <tbody>\n" +
                    "                <tr>\n" +
                    "                    <td><img id=\"avatar\" src="+ obj.data.metadata.avatarUrl +" width=\"40px\" height=\"40px\"></td>\n" +
                    "                    <td id=\"name\">" + obj.data.metadata.platformUserHandle +" </td>\n" +
                    "                    <td id=\"level\">"+ obj.data.metadata.level + "</td>\n" +
                    "                    <td id=\"country\">"+ obj.data.metadata.countryCode+ "</td>\n" +
                    "                </tr>\n" +
                    "                </tbody>\n" +
                    "            </table>\n" +
                    "        </div>\n");


                $('#player_overview_stats').append("<div class=\"row mt-4\">\n" +
                    "            <table class=\"table table-striped table-dark\">\n" +
                    "                <thead>\n" +
                    "                <tr>\n" +
                    "                    <th>Kills</th>\n" +
                    "                    <th>Damage</th>\n" +
                    "                    <th>Headshots</th>\n" +
                    "                    <th>Revives</th>\n" +
                    "                </tr>\n" +
                    "                </thead>\n" +
                    "                <tbody>\n" +
                    "                <tr>\n" +
                    "                    <td id=\"kills\">" + obj.data.stats[1].value +"</td>\n" +
                    "                    <td id=\"damage\">" + obj.data.stats[2].value +"</td>\n" +
                    "                    <td id=\"headshots\">" + obj.data.stats[3].value +"</td>\n" +
                    "                    <td id=\"revives\">" + obj.data.stats[4].value +"</td>\n" +
                    "                </tr>\n" +
                    "                </tbody>\n" +
                    "            </table>\n" +
                    "        </div>\n");



                    Object.keys(obj).forEach(function (key) {

                    var children = obj[key]['children'];

                    children.forEach(function (element) {

                        console.log(element);

                        $('#content').append("<div class='tnr-card' id='"+element.id+"' style='box-shadow: 0 1px 3px rgba(0, 0, 0, .2), 0 1px 1px rgba(0, 0, 0, .14), 0 2px 1px -1px rgba(0, 0, 0, .12);\n" +
                            "        background: #292929;\n" +
                            "        margin-bottom: 2.4rem;\n" +
                            "        display: block;'></div>");

                        $('#'+element.id+"").append("<div class='tnr-card_header' style='text-transform: uppercase;\n" +
                            "    font-family: nimbus-sans-condensed,Arial,Verdana,Helvetica,sans-serif;\n" +
                            "    font-size: 2rem;\n" +
                            "    font-weight: 400;\n" +
                            "    letter-spacing: .15em;\n" +
                            "    padding: 1.2rem 1.6rem;\n" +
                            "    margin: 0;\n" +
                            "    color: #da292a;'>" + element.metadata.legend_name + "</div>");

                        $('#'+element.id+"").append("<div class='ap-legend-stats' id='ap-legend-stats"+element.id+"' style='display: flex;\n" +
                            "    justify-content: space-between;'></div>");

                        $('#'+"ap-legend-stats"+element.id+"").append("<div class='ap-legend-stats__image' id='ap-legend-stats__image"+element.id+"'  style='width: 150px;\n" +
                            "    background: #363636;\n" +
                            "    min-height: 185px;\n" +
                            "    overflow: hidden;'></div>");

                        $('#'+"ap-legend-stats"+element.id+"").append("<div class='ap-legend-stats__stats' id='ap-legend-stats__stats"+element.id+"' style='flex-basis: 0;\n" +
                            "    flex-grow: 1;\n" +
                            "    margin: 1.6rem;'></div>");

                        $('#'+"ap-legend-stats__stats"+element.id+"").append("<div class='trn-defstats-grid trn-defstats-grid--col4' id='' style='grid-gap: 2.4rem;grid-auto-flow: row;\n" +
                            "    grid-template-columns: repeat(4,1fr);display: grid;justify-content: flex-start;'>");



                        $('#'+"ap-legend-stats__image"+element.id+"").append("<div style='background-image: url("+ element.metadata.icon +");background-size: cover;\n" +
                            "    width: 100%;\n" +
                            "    height: 100%;'> </div>");

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