const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Convert Joke Text to Speech
function convertJokeTextToSpeech(joke) {
    VoiceRSS.speech({
        key: 'af2bf98288b94653b4adacf7ef322272',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 4,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Enable/Disable joke button
function toggleJokeButton() {
    button.disabled = !button.disabled;
}

//  Get Joke from JokeAPI
async function getJokeFromAPI() {
    let joke = '';
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit');
        const data = await response.json();
        if (data.type === 'single') {
            joke = data.joke;
        } else if (data.type === 'twopart') {
            joke = `${data.setup} ... ${data.delivery}`;
        }
        toggleJokeButton();     // Disable joke button
        convertJokeTextToSpeech(joke);
    } catch (error) {
        console.error('Error occurred in fetching joke from API', error);
    }
}

// Add Event Listeners
button.addEventListener('click', getJokeFromAPI);
audioElement.addEventListener('ended', toggleJokeButton);   // Enable joke button
