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
    <div class="container conteudo">
      <div class="conteudo2">
        <form class="row row-cols-lg-auto g-3 align-items-center">
        <div class="col-12">
          <input id="inline-form-input-name" class="form-control mb-2 mb-sm-0 mr-sm-2" placeholder="Nome do Pokemon"
            v-model="search" />
        </div>
        <div class="col-12">
          <label class="visually-hidden" for="inlineFormSelectPref">Preference</label>
          <select class="form-select" id="inlineFormSelectPref">
            <option selected>Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </form>
      </div>
      
      <div class="row">
        <div class="col">
          <div class="card text-center">
            <div class="card-body row g-3">
              <ListPokemons v-for="pokemon in filteredItems" :key="pokemon.name" :name="pokemon.name"
                :url="pokemon.url" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
