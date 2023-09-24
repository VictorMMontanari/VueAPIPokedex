<script setup>
import { computed, ref, onMounted } from "vue";
import { formatName, getTypeStyle, formatType } from "../functions/formatName";
const props = defineProps(["idpk", "url", "getTypes"]);
const pokemonData = ref(null);

onMounted(() => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${props.idpk}`)
    .then((response) => response.json())
    .then((data) => {
      pokemonData.value = data;
    });
});

const getstats = computed(() => {
  if (pokemonData.value && pokemonData.value.stats && pokemonData.value.stats.length > 0) {
    return pokemonData.value.stats;
  }
  return [];
});



</script>

<template>
  <div>
    <div class="row">
      <div class="col">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Normal Sprite</h1>
      </div>
      <div class="col">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Shiny Sprite</h1>
      </div>
    </div>
    <div class="row" style="margin-bottom: 1rem;">
      <div class="col">
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idpk}.png`"
          class="card-img img" alt="..." />
      </div>
      <div class="col">
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${idpk}.png`"
          class="card-img img" alt="..." />
      </div>
    </div>
  </div>
  <div class="titlebottom">
    <h1 class="modal-title fs-5" id="exampleModalLabel" style="margin-bottom: 10px;">Type</h1>
  </div>
  
  <div class="tipos">
    <span v-for="typeName in getTypes" :key="typeName" :class="['tipo', getTypeStyle(typeName)]">
      {{ formatType(typeName) }}
    </span>
  </div>
  <div style="margin-top: 10px;">
    <div class="titlebottom">
      <h1 class="modal-title fs-5" id="exampleModalLabel" style="margin-bottom: 10px;">Base Stats</h1>
    </div>
    <div class="row">
      <div class="col-3 mb-2">
        <b>HP:</b>
      </div>
      <div class="col-sm-9">
        <div class="progress" role="progressbar" aria-label="Default striped example" aria-valuenow="10" aria-valuemin="0"
          aria-valuemax="100" style="margin-top: 6px;">
          <div class="progress-bar progress-bar-striped"
            :style="{ width: getstats.length > 0 ? getstats[0].base_stat + 150 / 2 + 'px' : '0%' }" title="Hp">
            <b v-if="getstats.length > 0">{{ getstats[0].base_stat }}</b>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-3 mb-2">
        <b>Attack:</b>
      </div>
      <div class="col-sm-9">
        <div class="progress" role="progressbar" aria-label="Success striped example" aria-valuenow="25" aria-valuemin="0"
          aria-valuemax="100" style="margin-top: 6px;">
          <div class="progress-bar progress-bar-striped bg-success"
            :style="{ width: getstats.length > 0 ? getstats[1].base_stat + 150 / 2 + 'px' : '0%' }" title="attack">
            <b v-if="getstats.length > 0">{{ getstats[1].base_stat }}</b>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-3 mb-2">
        <b>Defense:</b>
      </div>
      <div class="col-sm-9">
        <div class="progress" role="progressbar" aria-label="Success striped example" aria-valuenow="25" aria-valuemin="0"
          aria-valuemax="100" style="margin-top: 6px;">
          <div class="progress-bar progress-bar-striped bg-info"
            :style="{ width: getstats.length > 0 ? getstats[2].base_stat + 150 / 2 + 'px' : '0%' }" title="defense">
            <b v-if="getstats.length > 0">{{ getstats[2].base_stat }}</b>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-3 mb-2">
        <b>Sp Attack:</b>
      </div>
      <div class="col-sm-9">
        <div class="progress" role="progressbar" aria-label="Success striped example" aria-valuenow="25" aria-valuemin="0"
          aria-valuemax="100" style="margin-top: 6px;">
          <div class="progress-bar progress-bar-striped bg-warning"
            :style="{ width: getstats.length > 0 ? getstats[3].base_stat + 150 / 2 + 'px' : '0%' }" title="special-attack">
            <b v-if="getstats.length > 0">{{ getstats[3].base_stat }}</b>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-3 mb-2">
        <b>Sp Defense:</b>
      </div>
      <div class="col-sm-9">
        <div class="progress" role="progressbar" aria-label="Success striped example" aria-valuenow="25" aria-valuemin="0"
          aria-valuemax="100" style="margin-top: 6px;">
          <div class="progress-bar progress-bar-striped bg-danger"
            :style="{ width: getstats.length > 0 ? getstats[4].base_stat + 150 / 2 + 'px' : '0%' }" title="special-defense">
            <b v-if="getstats.length > 0">{{ getstats[4].base_stat }}</b>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-3 mb-2">
        <b>Speed:</b>
      </div>
      <div class="col-sm-9">
        <div class="progress" role="progressbar" aria-label="Success striped example" aria-valuenow="25" aria-valuemin="0"
          aria-valuemax="100" style="margin-top: 6px;">
          <div class="progress-bar progress-bar-striped bg-dark"
            :style="{ width: getstats.length > 0 ? getstats[5].base_stat + 150 / 2 + 'px' : '0%' }" title="speed">
            <b v-if="getstats.length > 0">{{ getstats[5].base_stat }}</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.img {
  display: inline-block;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.041);
  border-radius: 8px;
  background-color: rgba(85, 84, 84, 0.13);
}

.titlebottom {
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.041);
  border-radius: 8px;
  background-color: rgba(85, 84, 84, 0.13);
}
</style>