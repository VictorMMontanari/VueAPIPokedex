

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

const getTypeStyle = (typeName) => {
  const typeStyles = {
      bug: 'bug', flying: 'flying', dark: 'dark', dragon: 'dragon',
      electric: 'electric', fighting: 'fighting', fire: 'fire', ghost: 'ghost',
      grass: 'grass', ground: 'ground', ice: 'ice', normal: 'normal',
      poison: 'poison', psychic: 'psychic', rock: 'rock', steel: 'steel',
      water: 'water', fairy: 'fairy'
  };

  return typeStyles[typeName.toLowerCase()] || '';
};

const formatType = (typeName) => {
  const typeNames = {
      normal: 'Normal', fire: 'Fire', water: 'Water', grass: 'Grass',
      flying: 'Flying', fighting: 'Fighting', poison: 'Poison', electric: 'Electric',
      ground: 'Ground', rock: 'Rock', psychic: 'Psychic', ice: 'Ice',
      bug: 'Bug', ghost: 'Ghost', steel: 'Steel', dragon: 'Dragon', dark: 'Dark', fairy: 'Fairy'
  };
  return typeNames[typeName.toLowerCase()] || typeName;
};

export { formatName, formatType, getTypeStyle};
