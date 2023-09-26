<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import ListPokemons from '../components/ListPokemons.vue';
import { calculateDisplayedPages } from '../functions/pagination.js';

const limit = 20;
const search = ref('');
const currentPage = ref(1);
let totalPokemonCount = 0;
const allPokemons = ref([]);
const displayedPages = calculateDisplayedPages(allPokemons, currentPage, limit);
const selectedOption = ref('ALL...');

const displayedPokemons = computed(() => {
  const startIndex = (currentPage.value - 1) * limit;
  const endIndex = startIndex + limit;
  return allPokemons.value
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.value.toLowerCase())
    )
    .slice(startIndex, endIndex);
});

onMounted(() => {
  loadAllPokemon();
});

const loadAllPokemon = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1300');
    const data = await response.json();
    totalPokemonCount = data.count;
    allPokemons.value = data.results;
  } catch (error) {
    console.error('Erro ao carregar os Pokémon:', error);
  }
};

const loadPage = (page) => {
  if (page === '...') {
    currentPage.value += 1;
  } else {
    currentPage.value = page;
  }
};

watch(selectedOption, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    currentPage.value = 1;
    if (newValue === 'ALL...') {
      loadAllPokemon();
    } else {
      loadPokemonByType(newValue);
    }
  }
});

const loadPokemonByType = async (type) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();
    const pokemonList = data.pokemon.map((entry) => entry.pokemon);
    totalPokemonCount = pokemonList.length;
    allPokemons.value = pokemonList;
  } catch (error) {
    console.error('Erro ao carregar os Pokémon do tipo', type, error);
  }
};
</script>

<template>
  <main class="principal">
    <div class="container conteudo">
      <div class="conteudo2">
        <form class="row row-cols-lg-auto g-3 align-items-center">
          <div class="col-12">
            <input id="inline-form-input-name" class="form-control mb-2 mb-sm-0 mr-sm-2" placeholder="Nome do Pokemon"
              v-model="search" />
          </div>
          <div class="col-12">
            <label class="visually-hidden" for="inlineFormSelectPref">Preference</label>
            <select class="form-select" id="inlineFormSelectPref" v-model="selectedOption">
              <option selected>ALL...</option>
              <option value="bug">bug</option>
              <option value="dragon">dragon</option>
              <option value="electric">electric</option>
              <option value="fairy">fairy</option>
              <option value="fighting">fighting</option>
              <option value="fire">fire</option>
              <option value="flying">flying</option>
              <option value="ghost">ghost</option>
              <option value="grass">grass</option>
              <option value="ground">ground</option>
              <option value="ice">ice</option>
              <option value="normal">normal</option>
              <option value="poison">poison</option>
              <option value="psychic">psychic</option>
              <option value="rock">rock</option>
              <option value="steel">steel</option>
              <option value="water">water</option>
            </select>
          </div>
        </form>
      </div>
      <div class="row">
        <div class="col">
          <div class="card text-center">
            <div class="card-body row g-3">
              <ListPokemons v-for="pokemon in displayedPokemons" :key="pokemon.name" :name="pokemon.name"
                :url="pokemon.url" />
            </div>
          </div>
        </div>
      </div>
      <div class="conteudo3">
        <div class="pagination">
          <button class="anterior" @click="loadPage(currentPage - 1)" :disabled="currentPage === 1">
            Anterior
          </button>
          <template v-for="page in displayedPages">
            <button @click="loadPage(page)" :class="{ active: page === currentPage }" id="num">{{ page }}</button>
          </template>
          <button class="proximo" @click="loadPage(currentPage + 1)" :disabled="currentPage * limit >= totalPokemonCount">
            Próximo
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.anterior {
  position: relative;
  display: block;
  font-size: var(--bs-pagination-font-size);
  color: var(--bs-pagination-color);
  border-top-left-radius: var(--bs-pagination-border-radius);
  border-bottom-left-radius: var(--bs-pagination-border-radius);
  border: var(--bs-pagination-border-width) solid var(--bs-pagination-border-color);
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.proximo {
  position: relative;
  display: block;
  font-size: var(--bs-pagination-font-size);
  color: var(--bs-pagination-color);
  border-top-right-radius: var(--bs-pagination-border-radius);
  border-bottom-right-radius: var(--bs-pagination-border-radius);
  border: var(--bs-pagination-border-width) solid var(--bs-pagination-border-color);
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

#num {
  position: relative;
  display: block;
  padding: var(--bs-pagination-padding-y) var(--bs-pagination-padding-x);
  font-size: var(--bs-pagination-font-size);
  color: var(--bs-pagination-color);
  text-decoration: none;
  border: var(--bs-pagination-border-width) solid var(--bs-pagination-border-color);
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.active {
  background-color: #bdbdbd;
}

.pagination {
  display: flex;
  list-style: none;
  justify-content: center;
  padding: 0;
  margin: 0;
  overflow-x: auto;
  max-width: 100%;
  flex-wrap: wrap;
}

@media (max-width: 350px) {
  .pagination li {
    margin: 2px;
    padding: 2px 5px;
    font-size: 12px;
    /* Reduz o tamanho da fonte em telas pequenas */
  }

  .pagination {
    display: block;
  }

  /* Ocultar alguns botões em telas estreitas */
  .pagination li:not(.active):not(.dots) {
    display: none;
  }
}
</style>