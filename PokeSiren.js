var request = require('request');
var ntp = require('ntp-client');

// My coordinates
var lat = 34.00872705055818; //40.063161596659775;
var lon = -118.49764466285706; //-105.20044326782227;

// List of Pokemon to look for
var watchlist = ["19", "46", "60"];

// URLs
var url = "https://pokevision.com/map/data/" + lat + "/" + lon;
var gMap = "maps.google.com/maps?q=loc:";

// Get page
request(url, function(error, response, html) {
    if (!error) {
        
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
            console.log(p["pokemonId"] + " -> " + watchlist.indexOf(p["pokemonId"]));
            
            // If Pokemon is in watchlist, construct Google Maps URL
            if (watchlist.indexOf(p["pokemonId"]) != -1) {
                console.log("Hit!");
                var loc = gMap + p["latitude"] + "," + p["longitude"];
                getTimeLeft(loc, p["expiration_time"]);
            }
        }
    }
});

// Get the local time, calculate expiration time, and print
function getTimeLeft(loc, expiration) {

    var now = new Date();
    
    // Calc time left in seconds
    var timeLeft = expiration - (now.getTime() / 1000);
    console.log(timeLeft);
    var minLeft = Math.floor(timeLeft / 60);
    var secLeft = timeLeft % 60;
    
    // Show how much time left and where
    console.log("Time left: " + minLeft + ":" + secLeft);
    console.log(loc);

/*
    ntp.getNetworkTime("pool.ntp.org", 123, function(err, date) {
        if (err) {
            console.error(err);
            return;
        }
        
        // Calc time left in seconds
        var timeLeft = expiration - (date.getTime() / 1000);
        console.log(timeLeft);
        var minLeft = Math.floor(timeLeft / 60);
        var secLeft = timeLeft % 60;
        
        // Show how much time left and where
        console.log("Time left: " + minLeft + ":" + secLeft);
        console.log(loc);
    });*/
}