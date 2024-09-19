const wordInput = document.getElementById('word-input');
const searchButton = document.getElementById('search-button');
const definitionElement = document.getElementById('definition');
const synonymsElement = document.getElementById('synonyms');
const antonymsElement = document.getElementById('antonyms');

// Replace with your actual API key (consider environment variables for security)
const apiKey = 'YOUR_API_KEY'; 

searchButton.addEventListener('click', () => {
  const word = wordInput.value.trim(); // Trim any leading/trailing spaces
  if (word) {
    fetch(`https://api.dictionary.com/v1/references/collegiate/json/${word}?key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const definition = data[0].shortdef[0];
          const synonyms = data[0].meta.syns || []; // Handle cases where synonyms might be empty
          const antonyms = data[0].meta.ants || []; // Handle cases where antonyms might be empty

          definitionElement.textContent = `Definition: ${definition}`;
          synonymsElement.textContent = `Synonyms: ${synonyms.join(', ')}`;
          antonymsElement.textContent = `Antonyms: ${antonyms.join(', ')}`;
        } else {
          definitionElement.textContent = 'Word not found.';
          synonymsElement.textContent = '';
          antonymsElement.textContent = '';
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        definitionElement.textContent = 'Error fetching definition.';
        synonymsElement.textContent = '';
        antonymsElement.textContent = '';
      });
  }
});
