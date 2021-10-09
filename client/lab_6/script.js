let hashMap = new Map();
var mymap = L.map("mapid").setView([38.974, -76.86609], 13);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoibmtveWZpc2giLCJhIjoiY2t1aHRtZGgzMTcyOTJ2dDl1dDdpbjRtMiJ9.acTEbwBGCgecw_xcjJdubA",
  }
).addTo(mymap);

async function windowActions() {
  const endpoint =
    "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
  const request = await fetch(endpoint);
  const restaur = await request.json();
  const searchInput = document.querySelector(".search");
  const suggest = document.querySelector(".xd");
  const restCount = document.querySelector(".count");
  let count = 0;
  let count2 = 0;
  console.log(restaur);
  fetch(endpoint);

  function findMatches(wordToMatch, array) {
    if (!wordToMatch || wordToMatch === "") {
      document.querySelector(".xd").innerHTML = "";
    }
    return restaur.filter((search) => {
      const regex = new RegExp(wordToMatch, "gi");
      return (
        search.name.match(regex) ||
        search.category.match(regex) ||
        search.zip.match(regex)
      );
    });
  }
  function hello() {
    console.log(this.innerHTML, "stuff");
  }
  function displayMatches(event) {
    console.log(event.value);
    const matchArray = findMatches(event.target.value, restaur);
    count2 = 0;
    console.log('test',matchArray)
    const html = matchArray.map(
        (search) => `<li class="libutt"  style ="width:100%"> <span class="id${++count2}">
        ${search.name}
        <br>${search.category}
            <br>${search.address_line_1}
            <br>${search.city}
            <br>${search.zip}<br>
            </span></li>`
      )
      .join("");
    suggest.innerHTML = html;
    restCount.innerHTML = matchArray.length;
    //assigns each new list item a unique id
  }

  searchInput.addEventListener("change", displayMatches);
  searchInput.addEventListener("keyup", (evt) => {
    if (searchInput.value === '' || searchInput.value === undefined) {
      restCount.innerHTML = 0;
      suggest.innerHTML =
        "This is going to be something in two weeks and scrollable. <br><h1>Scrollable!!!</h1>";
    } else {
      displayMatches(evt);
    }
  });
} //end of async

window.onload = windowActions;
