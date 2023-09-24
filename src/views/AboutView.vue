<template>
  <main class="principal">
    <div class="container conteudo-about">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">VueAPIPokedex</h5>
        </div>
        <div class="card-body">
          <div>
            <h5 class="mt-4 card-title">Pokedex</h5>
            <p>Nesse projeto estarei usando a Api PokeAPI v2</p>
            <p>Site: <a href="https://pokeapi.co/docs/v2">https://pokeapi.co/docs/v2</a></p>

            <h5 class="mt-4 card-title">Descrição</h5>
            <p>Curso: SUPERIOR DE TECNOLOGIA EM ANALISE E DESENVOLVIMENTO DE SISTEMAS</p>
            <p>Matéria: DESENVOLV DE APLICACOES P/ A INTERNET 04A-2023/2</p>
            <p>Aluno: Victor Marinelli Montanari RA: 1950936</p>
            <p>Link GitHub: <a href="https://github.com/VictorMMontanari/VueAPIPokedex">https://github.com/VictorMMontanari/VueAPIPokedex</a></p>
            <p>Objetivo: Criar uma pokedex com utilizando o máximo de informação da API. Com objetivo de estudar como
              funciona a api e treinar a criação de um front-end responsivo suando bootstrap.</p>

            <h5 class="mt-4 card-title">Configuração Recomendada do IDE</h5>
            <p>
              <a href="https://code.visualstudio.com/">VSCode</a> +
              <a href="https://marketplace.visualstudio.com/items?itemName=Vue.volar">Volar</a> (e desative o Vetur) +
              <a href="https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin">TypeScript
                Vue Plugin (Volar)</a>
            </p>

            <h5 class="mt-4 card-title">Personalização da Configuração</h5>
            <p>Consulte <a href="https://vitejs.dev/config/">Vite Configuration Reference</a>.</p>

            <h5 class="mt-4 card-title">Configuração do Projeto</h5>
            <pre>
              <code class="language-sh">
                npm install
                npm run dev
                npm run build
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.conteudo-about {
  position: relative;
  height: 100%;
  overflow-y: scroll;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
</style>
