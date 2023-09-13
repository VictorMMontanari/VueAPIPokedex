<script setup>
import { computed, ref, onMounted } from "vue";
import { formatName } from "../functions/formatName";

const props = defineProps(["name", "url"]);

const urlParts = props.url.split("/");
const idpk = urlParts[urlParts.length - 2];

onMounted(() => {
  fetch(props.url)
    .then(response => response.json())
    .then(data => {
      pokemonDetails.value = data;
    })
    .catch(error => {
      console.error("Erro ao buscar detalhes do Pokémon:", error);
    });
});

const pokemonDetails = ref(null);

const getTypes = computed(() => {
  if (pokemonDetails.value && pokemonDetails.value.types && pokemonDetails.value.types.length > 0) {
    const types = pokemonDetails.value.types.map((type) => type.type.name);
    return types.join(", ");
  }
  return "Desconhecido";
});


</script>

<template>
  <div class="col-12 col-sm-4 col-md-3 col-lg-3">
    <div class="card mb-3" style="height: 100%;">
      <img
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idpk}.png`"
        class="card-img"
        alt="..."
      />
      <div class="card-body text-center">
        <h5 class="card-title">{{ formatName(props.name) }}</h5>
        <p>Tipos: {{ getTypes }}</p>
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${idpk}.gif`"
          class=""
          width="39"
          alt="..."
        />
        <a :href="props.url" target="_blank" class="btn btn-primary">Informações</a>
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${idpk}.gif`"
          class=""
          width="39"
          alt="..."
        />
      </div>
    </div>
  </div>
</template>

<style></style>
