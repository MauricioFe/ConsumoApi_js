let tabCountries = null;
let tabFavorites = null;

let countriesList = [];
let favoritesList = [];

let countCountries = null;
let countFavorites = null;

let totalPopulatioList = null;
let totalPopulatioFavorites = null;
let numberFormat = null;
window.addEventListener("load", () => {
  preencherElementos();
});

function preencherElementos() {
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');
  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');
  totalPopulatioList = document.querySelector('#totalPopulationList');
  totalPopulatioFavorites = document.querySelector('#totalPopulationFavorites');
  numberFormat = Intl.NumberFormat('pt-BR')
  fetcCountries();
}


async function fetcCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const data = await res.json();

  countriesList = data.map(country => {
    const { numericCode, translations, population, flag } = country;
    return {
      id: numericCode,
      name: translations.br,
      flag: flag,
      population: population,
    }
  })
  render();
}

function render() {
  renderCountryList();
}

function renderCountryList() {


  countriesList.forEach(country => {
      const {name, flag, id, population} = country;

      const countryHTML = 
      `
      <div class='country'>
          <div class='divButton'>
              <button class='btn' id='${id}'>+</button>
          </div>
          <div class='divFlag'>
              <img class='flagCountry' src='${flag}' alt='bandeira do país: ${name}'>
          </div>
          <div class='contentCountry'>
              <p>${name}</p>
              <p>${population}</p>
          </div>
      </div>
      `;
      tabCountries.innerHTML += countryHTML;

     
  });
 
}
function renderFavoriteList() { }
function renderSummary() { }
function handleCountryButtons() { }