<script setup>
import { onMounted, reactive, ref } from 'vue';
import ListPokemons from '../components/ListPokemons.vue';

// Professor ---->
let caseUrlSvg = ref("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/");
let pokemons = reactive(ref());

onMounted(() => {
  fetch("https://pokeapi.co/api/v2/pokemon/?limit=21&offset=0")
  .then(response => response.json())
  .then(response => {
    pokemons.value = response.results;
    console.log(response)
  })
})

</script>
<template>
  <main class="principal">
    <div class="container conteudo">
      <div class="row">
        <div class="col">
            <div class="card text-center">
              <div class="card-body row g-3">
                <ListPokemons 
                  v-for="pokemon in pokemons"
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


