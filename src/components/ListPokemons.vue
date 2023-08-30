<script setup>
import { formatName } from "../functions/formatName";
const pokemon = defineProps(["name","url"]);

// <-----Desafio Feito----->
const urlParts = pokemon.url.split('/');
const idpk = urlParts[urlParts.length - 2];


</script>

<template>
  <div class="col-4">
    <div class="card mb-3">
      <div class="card" style="width: 18rem">
        <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idpk}.png`" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{{ formatName(pokemon.name) }}</h5>
          <p class="card-text">
          </p>
          <a :href="pokemon.url" class="btn btn-primary">Informações</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
