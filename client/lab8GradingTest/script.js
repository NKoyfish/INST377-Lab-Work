function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1) + newMin);
}

// Data Handler
function dataHandler(dataArray) {
  // console.log('fired dataHandler');
  // console.table(dataArray)
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const restNum = getRandomIntInclusive(0, dataArray.length - 1);
    return dataArray[restNum];
  });
  // console.log(listItems)
  return listItems;
}

function createHtmlList(collection) {
  // console.log('fired HTML creator');
  // console.log(collection);
  const targetList = document.querySelector('.resto-list');
  // console.log(targetList)
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const { name } = item;
    const displayName = name.toLowerCase();
    const injectThisItem = `<li>${displayName}</li>`;
    targetList.innerHTML += injectThisItem;
  });
}

function initMap(targetId) {
  const latLong = [38.784, -76.872];
  const map = L.map(targetId).setView(latLong, 13);
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
    }
  ).addTo(map);
  return map;
}

function addMapMarkers(map, collection) {
  // remove marker
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      layer.remove();
    }
  });
  // add marker
  collection.forEach((item) => {
    const point = item.geocoded_column_1?.coordinates;
    console.log(item.geocoded_column_1?.coordinates);
    L.marker([point[1], point[0]]).addTo(map);
  });
}

/*
function refreshList(target, storage) {
  target.addEventListener('click', async (event) => {
    event.preventDefault();
    localStorage.clear();
    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const arrayFromJson = await results.json();
    console.log('List reload complete');
    localStorage.setItem(storage, JSON.stringify(arrayFromJson.data));
    location.reload();
  });
} */

// Main function
async function mainEvent() {
  // the async keyword means we can make API requests
  console.log('script loaded');
  const form = document.querySelector('.main_form');
  const submit = document.querySelector('.submit_button');

  const resto = document.querySelector('#resto_name');
  const zipcode = document.querySelector('#zipcode');
  // const refresh = document.querySelector('#refresh_list');

  const map = initMap('map');
  const retrievalVar = 'restaurants';
  submit.style.display = 'none';

  // refreshList(refresh, retrievalVar);

  if (!localStorage.getItem(retrievalVar)) {
    const results = await fetch('/api/foodServicesPG');
    const arrayFromJson = await results.json();
    console.log(arrayFromJson);
    localStorage.setItem(retrievalVar, JSON.stringify(arrayFromJson.data));
  }

  const storedDataString = localStorage.getItem(retrievalVar);
  const storedDataArray = JSON.parse(storedDataString);
  console.log(storedDataArray);

}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
