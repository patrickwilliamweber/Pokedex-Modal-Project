let pokemonRepository = (function() {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/';
    return {
        add: function(pokemon) {
            pokemonList.push(pokemon)
            console.log(pokemonList);
        },
        getAll: function() {
            return pokemonList;
        },
        loadDetails: function loadDetails(item) {
            let url = item.detailsUrl;
            return fetch(url).then(function(response) {
                return response.json();
            }).then(function(details) {
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;

            }).catch(function(e) {
                console.error(e);
            });
        },
        showDetails: function(event) {
            console.log(event.target.innerText);
        },

        addListItem: function addListItem(pokemon) {
            let list = document.getElementById('list');
            let button = document.createElement('button');
            button.classList.add('btn');
            button.classList.add('btn-primary');
            button.id = "buttonForModal";
            // console.log(button.classList);
            // console.log(button);
            button.innerText = '';
            button.innerText = pokemon.name;
            list.appendChild(button);
            button.setAttribute("data-bs-toggle", "modal");
            button.setAttribute("data-bs-target", "#pokemonModal");
            button.addEventListener('click', function() {

                let modalText = document.getElementById('modalText');
                let modalHeader = document.getElementById('modalTitle');
                modalHeader.innerText = `${pokemon.name}`;
                console.log(pokemon);
                modalText.innerText = `Height: ${pokemon.height}`;
                let image = document.createElement('img');
                image.id = "pokemonImage";
                modalText.appendChild(image);
                image.src = pokemon.imageUrl;


            })
        },
        loadList: function loadList() {
            pokemonList = [];
            return fetch(apiURL).then(function(response) {
                return response.json();
            }).then(function(json) {
                console.log(json);
                json.results.forEach(function(item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    };
                    pokemonRepository.loadDetails(pokemon).then(function() {
                        pokemonRepository.add(pokemon)
                        pokemonRepository.addListItem(pokemon)
                    })
                });
            }).catch(function(e) {
                console.error(e);
            })
        },
    }
})();



pokemonRepository.loadList()