fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => {
        let allCountries = data;

        const countriesContainer = document.querySelector('.countries-container');
        const searchInput = document.getElementById('search');
        const filterSelect = document.getElementById('filter');

        // Function to display countries
        function displayCountries(countries) {
            countriesContainer.innerHTML = '';

                // Sort countries alphabetically by their name
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

            countries.forEach(country => {
                const countryCard = document.createElement('div');
                countryCard.classList.add('Country-card');

                countryCard.innerHTML = `
                    <img src="${country.flags.png}" alt="${country.name.common} flag" />
                    <h5>${country.name.common}</h5>
                    <p>Population: ${country.population.toLocaleString()}</p>
                    <p>Region: ${country.region}</p>
                    <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
                `;

                countriesContainer.appendChild(countryCard);
            });
        }

        displayCountries(allCountries);

        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredCountries = allCountries.filter(country => 
                country.name.common.toLowerCase().includes(searchTerm)
            );
            displayCountries(filteredCountries);
        });

        filterSelect.addEventListener('change', () => {
            const selectedRegion = filterSelect.value;

            if (selectedRegion === 'all') {
                displayCountries(allCountries); 
            } else {
                const filteredCountries = allCountries.filter(country => 
                    country.region === selectedRegion
                );
                displayCountries(filteredCountries);
            }
        });
    })
    .catch(error => console.log(error));
