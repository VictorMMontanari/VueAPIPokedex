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
  <main>
    <div class="container">
      <div class="row mt-4">
        <div class="col-sm-12 col-md-6">

          <!-- <div class="card" style="width: 18rem">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" class="card-img-top" alt="img" />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div> -->

        </div>
        <div class="col-sm-16 col-md-12">
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
