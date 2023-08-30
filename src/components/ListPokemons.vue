<script setup>
const pokemon = defineProps(["name","url"]);

function formatName(inputName) {
  const parts = inputName.split("-");

  if (parts.length > 1) {
    const formattedParts = parts.map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    );
    return formattedParts.join(" ");
  } else {
    return inputName.charAt(0).toUpperCase() + inputName.slice(1).toLowerCase();
  }
}
</script>

<template>
  <div class="col-4">
    <div class="card mb-3">
      <div class="card" style="width: 18rem">
        <img src="..." class="card-img-top" alt="..." />
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
