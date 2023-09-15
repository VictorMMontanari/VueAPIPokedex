<template>
  <main class="principal">
    <div class="container conteudo">
      <div class="conteudo2">
        <form class="row row-cols-lg-auto g-3 align-items-center">
          <div class="col-12">
            <input
              id="inline-form-input-name"
              class="form-control mb-2 mb-sm-0 mr-sm-2"
              placeholder="Nome do Pokemon"
              v-model="search"
            />
          </div>
        </form>
      </div>

      <div class="row">
        <div class="col">
          <div class="card text-center">
            <div class="card-body row g-3">
              <ListPokemons
                v-for="pokemon in displayedPokemons"
                :key="pokemon.name"
                :name="pokemon.name"
                :url="pokemon.url"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="pagination">
        <button @click="loadPage(currentPage - 1)" :disabled="currentPage === 1">
          Anterior
        </button>
        
        <template v-for="page in totalPages">
          <button @click="loadPage(page)" :class="{ active: page === currentPage }">{{ page }}</button>
        </template>

        <button
          @click="loadPage(currentPage + 1)"
          :disabled="currentPage * limit >= totalPokemonCount"
        >
          Próximo
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ListPokemons from '../components/ListPokemons.vue';

const search = ref('');
const limit = 20; // Número de resultados por página
const currentPage = ref(1);
let totalPokemonCount = 0;
const allPokemons = ref([]);
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

const totalPages = computed(() => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(allPokemons.value.length / limit); i++) {
    pages.push(i);
  }
  return pages;
});
</script>
