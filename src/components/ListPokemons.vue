<script setup>
import { computed, ref, onMounted } from "vue";
import { formatName, getTypeStyle, formatType } from "../functions/formatName";
import { selectedOption } from "../functions/TypePK.js";


const props = defineProps(["name", "url"]);

const urlParts = props.url.split("/");
const idpk = urlParts[urlParts.length - 2];


const getPokemonDetails = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do Pokémon:", error);
    return null;
  }
};

const pokemonDetails = ref(null);

onMounted(async () => {
  pokemonDetails.value = await getPokemonDetails(props.url);
});

const getTypes = computed(() => {
  if (pokemonDetails.value && pokemonDetails.value.types && pokemonDetails.value.types.length > 0) {
    return pokemonDetails.value.types.map((type) => type.type.name);
  }
  return ["Desconhecido"];
});


function filterPokemonByType() {
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
  <div class="col-12 col-sm-4 col-md-3 col-lg-3">
    <a class="link" :data-bs-target="`#exampleModal-${idpk}`" data-bs-toggle="modal">
      <div class="card mb-3" style="height: 100%;" v-if="filterPokemonByType()">
        <h5 class="th4">{{ formatName(props.name) }}</h5>
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idpk}.png`"
          class="card-img" alt="..." />
        <div class="card-body text-center">
          <div class="tipos">
            <span v-for="typeName in getTypes" :key="typeName" :class="['tipo', getTypeStyle(typeName)]">
              {{ formatType(typeName) }}
            </span>
          </div>
          <div class="container text-center">
            <div class="row">
              <div class="col">
                <img
                  :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${idpk}.gif`"
                  class="" width="39" alt="..." />
              </div>
              <div class="col">
                <h6 class="th4">{{ `#${idpk.toString().padStart(3, '0')}` }}</h6>
              </div>
              <div class="col">
                <img
                  :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${idpk}.gif`"
                  class="" width="39" alt="..." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
    <!-- Modal -->
    <div class="modal fade" :id="`exampleModal-${idpk}`" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">{{ formatName(props.name) }}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col">
                <img
                  :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idpk}.png`"
                  class="card-img" alt="..." />
              </div>
              <div class="col">
                <img
                  :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${idpk}.png`"
                  class="card-img" alt="..." />
              </div>
            </div>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.link {
  display: inline;
  text-decoration: none;
  cursor: pointer;
}

.th4 {
  margin: 0px;
  color: #000000;
  padding-top: 10px;
}

.tipo {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 4px;
}

.tipo.bug {
  background-color: #4b9b4e;
  border: 2px solid;
}

.tipo.dark {
  background-color: #4e493c;
  border: 2px solid;
}

.tipo.dragon {
  background: linear-gradient(180deg, #53a4cf 50%, #f16e57 50%);
  border: 2px solid;
}

.tipo.electric {
  background-color: #a89a16;
  border: 2px solid;
}

.tipo.fighting {
  background-color: #f10606;
  border: 2px solid;
}

.tipo.fire {
  background-color: #d35f01;
  border: 2px solid;
}

.tipo.flying {
  background: linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%);
  border: 2px solid;
}

.tipo.ghost {
  background-color: #6b15b1;
  border: 2px solid;
}

.tipo.grass {
  background-color: #04c20a;
  border: 2px solid;
}

.tipo.ground {
  background-color: #d3c22c;
  border: 2px solid;
}

.tipo.ice {
  background-color: #03bed6;
  border: 2px solid;
}

.tipo.normal {
  background-color: #d1c590;
  border: 2px solid;
}

.tipo.poison {
  background-color: #c448fd;
  border: 2px solid;
}

.tipo.psychic {
  background-color: #fa5eff;
  border: 2px solid;
}

.tipo.rock {
  background-color: #dbb300;
  border: 2px solid;
}

.tipo.steel {
  background-color: #dff9fc;
  border: 2px solid;
}

.tipo.water {
  background-color: #42a9fd;
  border: 2px solid;
}

.tipo.fairy {
  background-color: #fa92f1;
  border: 2px solid;
}
</style>