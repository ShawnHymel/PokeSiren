var request = require('request');

// My coordinates
var lat = 40.059409; //40.063161596659775;
var lon = -105.2151322; //-105.20044326782227;

// List of Pokemon to look for
var watchlist = ["19"];

// URLs
var url = "https://pokevision.com/map/data/" + lat + "/" + lon;
var gMap = "maps.google.com/maps?q=loc:";

function parseList(html) {
   
    // ***TEST***
    //console.log(html);
    
    // Parse the received JSON
    var pokemon = JSON.parse(html);
    pokemon = pokemon["pokemon"];
    
    // ***TEST***
    console.log(pokemon);
    console.log("---");
    
    // Look for Pokemon in watchlist
    for (var i = 0; i < pokemon.length; i++) {
        var p = pokemon[i];
        //console.log(p["pokemonId"] + " -> " + watchlist.indexOf(p["pokemonId"]));
        
        // If Pokemon is in watchlist, send info
        if (watchlist.indexOf(p["pokemonId"]) != -1) {
            
            // Construct Google map URL
            var loc = gMap + p["latitude"] + "," + p["longitude"];
            
            // Calc time left in seconds
            var now = new Date();
            var timeLeft = p["expiration_time"] - (now.getTime() / 1000);
            var minLeft = Math.floor(timeLeft / 60);
            var secLeft = Math.round(timeLeft % 60);
            
            // Show how much time left and where
            console.log("Pokemon: " + p["pokemonId"]);
            console.log("Time left: " + minLeft + ":" + secLeft);
            console.log(loc);
            console.log("---");
        }
    }
}

// Start here
function doScan() {
    console.log("Scanning");
    request(url, function(error, response, html) {
        if (!error) {
            parseList(html);
        }
    });
    setTimeout(doScan, 45000);
}
doScan();