import { ref } from 'vue';

export const selectedOption = ref('ALL...'); 
export function handleSelectedOption(option) {
  selectedOption.value = option;
  return selectedOption.value; 
}
