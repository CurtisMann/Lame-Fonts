var unpopular = [];
var untrendy = [];

// testing something lol

var apiCallPopular = new XMLHttpRequest();
var apiCallTrending = new XMLHttpRequest();
var urlPopular = "https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyBW7XfxQiYjO1GX7-Ob2NoYKe56HD8MTdw";
var urlTrending = "https://www.googleapis.com/webfonts/v1/webfonts?sort=trending&key=AIzaSyBW7XfxQiYjO1GX7-Ob2NoYKe56HD8MTdw";

/**
 * Gets the "top 4" fonts from the passed array of sorted fonts
 * @param {array} arr - Either the unpopular or untrendy array
 * @return {array} Array of "top 4" fonts
 */
function getTopFour(arr){
  // Start from end of array
  var fontIndex = arr.items.length - 1;
  var topFour = [];

  // Iterate through font array backwards to find top 4
  while(topFour.length < 4){
    // Check if fonts contain latin characters
    if(arr.items[fontIndex].subsets.includes("latin")){
      topFour.push(arr.items[fontIndex]);
    }
    fontIndex--;
  }

  // Load fonts via WebFont
  WebFont.load({
    google: {
      families: [topFour[0].family,
                 topFour[1].family,
                 topFour[2].family,
                 topFour[3].family]
    }
  });

  return topFour;
}

/**
 * Inserts font names, links, and samples
 * @param {string} prefix - "unt" (untrendy) or "unp" (unpopular) for targeting DOM elements
 * @param {array} arry - Either unpopular or untrendy array
 */
function placeFonts(prefix, arr){
  for(var i = 1; i <= 4; i++){
    document.getElementById(prefix+i+"Name").innerHTML = arr[i-1].family;
    document.getElementById(prefix+i+"Sample").style.fontFamily = arr[i-1].family;
    document.getElementById(prefix+i+"Link").href = "https://fonts.google.com/specimen/" + arr[i-1].family;
    document.getElementById(prefix+i+"Link").innerHTML = "fonts.google.com/specimen/" + arr[i-1].family;
    document.getElementById(prefix+i+"Shortcut").innerHTML = arr[i-1].family;
  }
}

apiCallPopular.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    unpopular = getTopFour(JSON.parse(this.responseText));
    placeFonts("unp", unpopular);
  }
};

apiCallTrending.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    untrendy = getTopFour(JSON.parse(this.responseText));
    placeFonts("unt", untrendy);
  }
}

apiCallPopular.open("GET", urlPopular, true);
apiCallPopular.send();
apiCallTrending.open("GET", urlTrending, true);
apiCallTrending.send();
