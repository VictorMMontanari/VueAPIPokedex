<script setup>
import { ref, onMounted, computed } from 'vue';
import ListPokemons from '../components/ListPokemons.vue';
import { calculateDisplayedPages } from '../functions/pagination.js';

const limit = 20; // Número de resultados por página
const search = ref('');
const currentPage = ref(1);
let totalPokemonCount = 0;
const allPokemons = ref([]);
const displayedPages = calculateDisplayedPages(allPokemons, currentPage, limit);

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
}
</style>
