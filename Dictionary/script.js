const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const word = form.elements.word.value.trim();
  if (word) {
    getWordInfo(word);
  }
});

const getWordInfo = async (word) => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();

    if (!data || !data[0]) {
      resultDiv.innerHTML = `<p>Sorry, the word could not be found.</p>`;
      return;
    }

    const definitions = data[0].meanings[0].definitions[0];

    resultDiv.innerHTML = `
      <h2><strong>Word:</strong> ${data[0].word}</h2>
      <p class="partOfSpeech"><strong>Part of Speech:</strong> ${data[0].meanings[0].partOfSpeech}</p>
      <p><strong>Meaning:</strong> ${definitions.definition || "Not Found"}</p>
      <p><strong>Example:</strong> ${definitions.example || "Not Found"}</p>
      <p><strong>Antonyms:</strong></p>
    `;

    // Display antonyms if available
    if (definitions.antonyms && definitions.antonyms.length > 0) {
      definitions.antonyms.forEach(antonym => {
        resultDiv.innerHTML += `<li>${antonym}</li>`;
      });
    } else {
      resultDiv.innerHTML += `<span>Not Found</span>`;
    }

    resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls[0]}" target="_blank">Read More</a></div>`;
  } catch (error) {
    resultDiv.innerHTML = `<p>Sorry, the word could not be found.</p>`;
  }
}
