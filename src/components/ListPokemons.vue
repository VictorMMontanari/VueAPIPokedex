<script setup>
import { reactive } from "vue";
import { formatName } from "../functions/formatName";
const pokemon = defineProps(["name","url"]);

// <-----Desafio Feito----->
const urlParts = pokemon.url.split('/');
const idpk = urlParts[urlParts.length - 2];

</script>

<template>
  <div class="col-12 col-sm-4 col-md-3 col-lg-3">
    <div class="card mb-3" style="height: 100%;">
      <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idpk}.png`" class="card-img" alt="..."/>
      <div class="card-body text-center">
        <h5 class="card-title">{{ formatName(pokemon.name) }}</h5>
        <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${idpk}.gif`" class="" width="39" alt="..." />
        <a :href="pokemon.url" target="_blank" class="btn btn-primary">Informações</a>
        <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${idpk}.gif`" class="" width="39" alt="..." />
      </div>
    </div>
  </div>
</template>




<style></style>
