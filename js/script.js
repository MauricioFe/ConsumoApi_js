let tabCountries = null;
let tabFavorites = null;

let countriesList = [];
let favoritesList = [];

let countCountries = null;
let countFavorites = null;

let totalPopulationList = null;
let totalPopulationFavorites = null;
let numberFormat = null;
window.addEventListener("load", () => {
  preencherElementos();
});

function preencherElementos() {
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');
  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');
  totalPopulationList = document.querySelector('#totalPopulationList');
  totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');
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
      flag,
      population,
      formattedPopulation : formatNumber(population),
    }
  })
  render();
}

function render() {
  renderCountryList();
  renderFavoriteList();
  renderSummary();
  handleCountryButtons();
}

function renderCountryList() {
  let countriesHTML = "<div class='countries'>";
  countriesList.forEach(country => {
    const { name, flag, id, formattedPopulation } = country;

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
              <p>${formattedPopulation}</p>
          </div>
      </div>
      `;
      countriesHTML += countryHTML;
    
  });
  tabCountries.innerHTML = countriesHTML;
}
function renderFavoriteList() {
  let favoritesHTML = "<div class='favoriteCountries'>";
  favoritesList.forEach(country => {
    const { name, flag, id, formattedPopulation } = country;
    const favoriteHTML =
      `
    <div class='country'>
        <div class='divButton'>
            <button class='btn red' id='${id}'>-</button>
        </div>
        <div class='divFlag'>
            <img class='flagCountry' src='${flag}' alt='bandeira do país: ${name}'>
        </div>
        <div class='contentCountry'>
            <p>${name}</p>
            <p>${formattedPopulation}</p>
        </div>
    </div>
    `;
   favoritesHTML += favoriteHTML;
  })
  tabFavorites.innerHTML = favoritesHTML; 
}
function renderSummary() {
  renderSummaryCountries();
  renderSummaryFavorites();
}

function renderSummaryCountries() {
  countCountries.textContent = countriesList.length;
  const totalPopulation = countriesList.reduce((acc, curr) => {
    return acc + curr.population;
  }, 0);
  totalPopulationList.textContent = formatNumber(totalPopulation);
}

function renderSummaryFavorites() {
  countFavorites.textContent = favoritesList.length;
  const totalPopulation = favoritesList.reduce((acc, curr) => {
    return acc + curr.population;
  }, 0)

  totalPopulationFavorites.textContent = formatNumber(totalPopulation);
}

function handleCountryButtons() {
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
  const favoritesButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

  countryButtons.forEach(button => {
    button.addEventListener('click', () => addToFavorites(button.id))
  });
  favoritesButtons.forEach(button => {
    button.addEventListener('click', () => removeFromFavorites(button.id))
  });
}

function addToFavorites(id) {
  const countryToAdd = countriesList.find(favorites => favorites.id === id);
  favoritesList = [...favoritesList, countryToAdd];

  favoritesList.sort((a, b) => {
    return a.name.localeCompare(b.name);
  })

  countriesList = countriesList.filter(country => country.id !== id);
  render();
}

function removeFromFavorites(id){
  const favoritesFromRemove = favoritesList.find(favorites => favorites.id === id);
  countriesList = [...countriesList, favoritesFromRemove];

  countriesList.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  favoritesList = favoritesList.filter(favorite => favorite.id !== id);
  render();
}

function formatNumber (number){
  return numberFormat.format(number);
}