const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const restaraunt = [];
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => restaraunt.push(...data));

function findMatches(wordToMatch, restaraunt) {
    return restaraunt.filter(place => {
        // here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.category.match(regex)
    });
}
function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    const matchArray = findMatches(this.value, restaraunt);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const restarauntName = place.name.replace(regex, `<span class="hl">${this.value}</span>`);
        const categoryName = place.category.replace(regex, `<span class="hl">${this.value}</span>`);
        const address_line_1Name = place.address_line_1.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
  
    <li> 
      <span class="name">${restarauntName}</span>
      <br>
      <span clas="category">${categoryName}</span>
      <br>
      <span class="address_line_1Name">${address_line_1Name}</span>
    </li>
   
  `;

    }).join('');
    suggestions.innerHTML = html;
}
function change(evt, list) {
    console.log(evt.value);
    const block = document.querySelector('catchme');
    block.innerText = list;
}

const searchInput = document.querySelector('.search');
searchInput.addEventListener('input', (displayMatches) => {

        const list = range(10);
        document.addEventListener('input', (event) => {change(event, list) });
});

const suggestions = document.querySelector('.suggestions');
searchInput.addEventListener('keyup', displayMatches);

