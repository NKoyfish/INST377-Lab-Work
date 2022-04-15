function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function randomElements(array) {
  const range = [...Array(15).keys()];
  return range.map((m) => {
    const index = getRandomIntInclusive(0, array.length);
    return array[index];
  });
}

function htmlInjector(array) {
  const target = document.querySelector("#resto-list");
  target.innerHTML = "";
  console.log("inject", array);
  array.forEach((item) => {
    const str = `<li><strong>${item.name}</strong> <br> ${item.category} <br> ${item.zip}<br></li>`;
    target.innerHTML += str;
  });
}
function mapInit() {
  mymap = L.map("mymap").setView([38.974, -76.86609], 13);
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
async function mainEvent(evt) {
  mapInit();

  const form = document.querySelector(".main_form");
  const submit = document.querySelector('button[type="submit"]');
  const name = document.querySelector("#resto_name");
  const type = document.querySelector("#food_type");
  submit.style.display = "none";
  let retrievalVar = "restaurants";
  // TODO: figure out how to clear variable
  if (!localStorage.getItem(retrievalVar)) {
    // const results = await fetch('/api/foodServicesPG');
    const results = await fetch(
      "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"
    );
    const arrayFromJson = await results.json();
    console.log(arrayFromJson);
    localStorage.setItem(retrievalVar, JSON.stringify(arrayFromJson));
  }

  const arrayFromJson = JSON.parse(localStorage.getItem(retrievalVar));
  console.log("hello", localStorage.getItem(retrievalVar));
  //console.log(arrayFromJson.data);
  if (arrayFromJson.length > 0) {
    //console.log("made it here");
    submit.style.display = "block";
    let currentArray = [];
    form.addEventListener("submit", async (submitEvent) => {
      submitEvent.preventDefault();
      currentArray = randomElements(arrayFromJson);
      htmlInjector(currentArray); // we're passing the data set into the new function
    });
    // resto name filter
    name.addEventListener("input", (event) => {
      if (!currentArray.length) {
        return;
      }
      console.log("test", name.value);
      if (type.value) {
        console.log(event.target.value);
        console.log(currentArray);
        const restaurants = currentArray.filter(
          (item) =>
            item.name
              .toLowerCase()
              .includes(event.target.value.toLowerCase()) &&
            item.zip.includes(type.value)
        );
        htmlInjector(restaurants);
      } else {
        console.log(event.target.value);
        console.log(currentArray);
        const restaurants = currentArray.filter((item) =>
          item.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        htmlInjector(restaurants);
      }
    });
    // zipcode filter
    type.addEventListener("input", (event) => {
      if (!currentArray.length) {
        return;
      }
      console.log(event.target.value);
      console.log(currentArray);
      if (name.value) {
        const restaurants = currentArray.filter(
          (item) =>
            item.zip.includes(event.target.value) &&
            item.name.toLowerCase().includes(name.value.toLowerCase())
        );
        htmlInjector(restaurants);
      } else {
        const restaurants = currentArray.filter((item) =>
          item.zip.includes(event.target.value)
        );
        htmlInjector(restaurants);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => mainEvent());
