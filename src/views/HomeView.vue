<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import ListPokemons from '../components/ListPokemons.vue';
import { calculateDisplayedPages } from '../functions/pagination.js';
import { handleSelectedOption } from '../functions/TypePK.js';

const limit = 20; // Número de resultados por página
const search = ref('');
const currentPage = ref(1);
let totalPokemonCount = 0;
const allPokemons = ref([]);
const displayedPages = calculateDisplayedPages(allPokemons, currentPage, limit);
const selectedOption = ref('ALL...'); // Defina selectedOption aqui

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
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=493');
    const data = await response.json();
    totalPokemonCount = data.count;
    allPokemons.value = data.results;
  } catch (error) {
    console.error('Erro ao carregar os Pokémon:', error);
  }
};

const loadPage = (page) => {
  currentPage.value = page;
};

// Use o watch aqui após a definição de selectedOption
watch(selectedOption, (newValue) => {
  handleSelectedOption(newValue);
});

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
                :url="pokemon.url"/>
            </div>
          </div>
        </div>
      </div>
      <div class="conteudo3">
        <div class="pagination">
          <button @click="loadPage(currentPage - 1)" :disabled="currentPage === 1">
            Anterior
          </button>

          <template v-for="page in displayedPages">
            <button @click="loadPage(page)" :class="{ active: page === currentPage }">{{ page }}</button>
          </template>

          <button @click="loadPage(currentPage + 1)" :disabled="currentPage * limit >= totalPokemonCount">
            Próximo
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.pagination {
  display: flex;
  list-style: none;
  justify-content: center;
  padding: 0;
  margin: 0;
  overflow-x: auto;
  max-width: 100%;
  flex-wrap: wrap;
  /* Usar flex-wrap para ajustar em telas estreitas */
}

.pagination li {
  margin: 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  cursor: pointer;
  white-space: nowrap;
}

.pagination li.active {
  background-color: #007bff;
  color: #fff;
}

.pagination li.dots {
  padding: 5px 10px;
  border: none;
  background-color: transparent;
  white-space: nowrap;
  display: none;
}

@media (max-width: 400px) {
  .pagination li {
    margin: 2px;
    padding: 2px 5px;
    font-size: 12px;
    /* Reduz o tamanho da fonte em telas pequenas */
  }

  .pagination li.dots {
    display: block;
  }

  /* Ocultar alguns botões em telas estreitas */
  .pagination li:not(.active):not(.dots) {
    display: none;
  }
}</style>
