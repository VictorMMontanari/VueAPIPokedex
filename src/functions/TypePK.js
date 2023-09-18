import { ref } from 'vue';

// Crie uma variável ref para armazenar o valor selecionado
export const selectedOption = ref('ALL...'); // Valor inicial

// Atualize o valor selecionado com a função
export function handleSelectedOption(option) {
  selectedOption.value = option;
  return selectedOption.value; // Retorna o valor selecionado
}
