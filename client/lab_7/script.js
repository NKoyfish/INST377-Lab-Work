mymap = undefined;
myMarkers = [];
async function windowActions() {
  function mapInit() {
    mymap = L.map("mapid").setView([38.974, -76.86609], 13);
    L.tileLayer(
      "https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=0im19NFqvOVkTZzwiWhj",
      {
        attribution:
          '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoibmtveWZpc2giLCJhIjoiY2t1aHRtZGgzMTcyOTJ2dDl1dDdpbjRtMiJ9.acTEbwBGCgecw_xcjJdubA",
      }
    ).addTo(mymap);
  }

  const endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz";
  const request = await fetch(endpoint);
  const restaur = await request.json();
  let pointMap = [];
  const searchInput = document.querySelector(".search");
  const suggest = document.querySelector(".xd");
  const restCount = document.querySelector(".count");
  console.log(restaur);
  fetch(endpoint);

  function findMatches(wordToMatch, array) {
    if (!wordToMatch) {
      document.querySelector(".xd").innerHTML = "";
    }
    return restaur.filter((search) => {
      const regex = new RegExp(wordToMatch, "gi");
      return search.zip.match(regex);
    });
  }
  function displayMatches(event) {
    const matchArray1 = findMatches(event.target.value, restaur);
    matchArray = matchArray1.slice(0, 5);
    console.log("slice", matchArray);
    const html = matchArray
      .map(
        (
          search
        ) => `<li style ="width:100%">${search.name}<br>${search.category}
      <br>${search.address_line_1}
      <br>${search.city}
      <br>${search.zip}<br></li>`
      )
      .join("");
    suggest.innerHTML = html;
    restCount.innerHTML = matchArray.length;

    function getPoint(matchArrayElement) {
      if (
        matchArrayElement !== undefined &&
        matchArrayElement.geocoded_column_1 !== undefined &&
        matchArrayElement.geocoded_column_1.coordinates !== undefined
      ) {
        return [
          matchArrayElement.geocoded_column_1.coordinates[1],
          matchArrayElement.geocoded_column_1.coordinates[0],
        ];
      }
      return undefined;
    }
    //
    pointMap = matchArray.map((item) => getPoint(item));
  }
  function plotResults() {
    let count = 0;
    pointMap.forEach((ele) => {
      if (count === 0) {
        mymap.panTo(ele);
        count = 2;
      }
      if (ele !== undefined) {
        let marker = L.marker(ele).addTo(mymap);
        myMarkers.push(marker);
      }
    });
  }
  buttonClick = document.querySelector(".plot");
  buttonClick.addEventListener("click", plotResults);
  searchInput.addEventListener("change", displayMatches);
  searchInput.addEventListener("keyup", (evt) => {
    if (searchInput.value === "" || searchInput.value === undefined) {
      restCount.innerHTML = 0;
      suggest.innerHTML =
        "This is going to be something in two weeks and scrollable. <br><h1>Scrollable!!!</h1>";
    } else {
      displayMatches(evt);
      document.addEventListener("keyup", control);
      function control(e) {
        if (e.keyCode === 13) {
          if (myMarkers.length > 0) {
            myMarkers.forEach((marker) => {
              marker.remove();
            });
          }
          plotResults();
        }
      }
    }
  });
  mapInit();
}
window.onload = windowActions;
