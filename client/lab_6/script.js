async function windowActions() {
  const endpoint =
  "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
  const request = await fetch(endpoint)
  const restaur = await request.json();
  const searchInput = document.querySelector(".search");
  const suggest = document.querySelector(".xd");
  console.log(restaur)
  fetch(endpoint);

  function findMatches(wordToMatch, array) {
    if (!wordToMatch) {
      document.querySelector(".xd").innerHTML = "";
    }
    return restaur.filter((search) => {
      const regex = new RegExp(wordToMatch, "gi");
      return search.name.match(regex) || search.category.match(regex);
    });
  }
  function displayMatches(event) {
    console.log(event.value);
    const matchArray = findMatches(event.target.value, restaur);
    const html = matchArray
      .map((search) => `<li>${search.name}<br>${search.category}
      <br>${search.address_line_1}
      <br>${search.city}
      <br>${search.zip}<br></li>`)
      .join("");
    suggest.innerHTML = html;
  }

  searchInput.addEventListener("change", displayMatches);
  searchInput.addEventListener("keyup", (evt) => {
    if (searchInput.value === "") {
      suggest.innerHTML = "";
    } else {
      displayMatches(evt);
      console.log(`looking up ${searchInput.innerHTML}`);
    }
  });
}
window.onload = windowActions;
