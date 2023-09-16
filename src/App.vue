<script setup>
import { ref } from 'vue';
</script>

<template>
  <header class="cabecalho">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-body">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">Pokedex</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link" aria-current="page">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <div class="main">
    <RouterView></RouterView>
  </div>  

  <footer class="bg-dark text-light rodape">
    <div> Unimar | ADS {{ new Date().getFullYear() }}</div>
  </footer>

</template>

<style>
.cabecalho {
    grid-area: cabecalho;
    display: contents;
}

.principal {
    grid-area: principal;
    height: calc(100vh - 110px);
    background-color: #f0f0f0;
    padding: 20px;
}

.conteudo {
    position: relative;
    height: 100%;
    overflow-y: scroll;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.2);
    text-align: center;
    border-radius: 10px;
}

.conteudo2 {
    position: relative;
    padding: 10px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
    text-align: center;
    margin-bottom: 10px;
    border-radius: 10px;
}

.conteudo3 {
    position: relative;
    padding: 10px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
    text-align: center;
    margin-top: 10px;
    border-radius: 10px;
}

::-webkit-scrollbar {
  width: 15px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  height: 3rem;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #1a1a1a;
}

.rodape {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
}

</style>