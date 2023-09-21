<script setup>
import { computed, ref } from "vue";
const props = defineProps(["pokemonDetails"]);

const getTypes = computed(() => {
  if (props.pokemonDetails && props.pokemonDetails.types && props.pokemonDetails.types.length > 0) {
    return props.pokemonDetails.types.map((type) => type.type.name);
  }
  return ["Desconhecido"];
});

function filterPokemonByType() {
  // You need to define 'selectedOption' in this component
  if (selectedOption.value === 'ALL...') {
    return true;
  } else {
    const selectedType = selectedOption.value;
    const types = getTypes.value;
    return types.includes(selectedType);
  }
}
</script>

<template>
  <div>
    <!-- Add your content for displaying Pokémon details here -->
    <div v-if="filterPokemonByType()">
      <!-- Display Pokémon details based on your requirements -->
    </div>
  </div>
</template>
