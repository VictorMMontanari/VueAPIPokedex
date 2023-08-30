

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

export { formatName };
