<script setup>
import { onMounted, ref, computed, reactive } from 'vue';
import ListPokemons from '../components/ListPokemons.vue';

let search = ref(''); // Initialize the search variable with an empty string
let pokemons = ref([]); // Initialize the pokemons variable as an empty array

onMounted(() => {
  fetch('https://pokeapi.co/api/v2/pokemon/?limit=493&offset=0')
    .then((response) => response.json())
    .then((response) => {
      pokemons.value = response.results;
    });
});

const filteredItems = computed(() => {
  const filteredList = pokemons.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.value.toLowerCase())
  );
  return filteredList;
});
</script>

<template>
  <main class="principal">
    <div class="container mt-4">
      <form>
        <div class="form-group">
          <label for="campoTexto">Texto:</label>
          <input
            id="inline-form-input-name"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Nome do Pokemon"
            v-model="search"
          />
        </div>
      </form>
    </div>
    <div class="container conteudo">
      <div class="row">
        <div class="col">
          <div class="card text-center">
            <div class="card-body row g-3">
              <ListPokemons
                v-for="pokemon in filteredItems"
                :key="pokemon.name"
                :name="pokemon.name"
                :url="pokemon.url"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
