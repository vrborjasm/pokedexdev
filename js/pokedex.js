import { getPokemon, getSpecies } from "./api.js"
import { createChart } from "./charts.js"

const $image = document.querySelector('#image');
const $description = document.querySelector('#description');
const $screen = document.querySelector('#screen');
const $light = document.querySelector('#light');

export function setImage(image) {
    $image.src = image;
}

export function setDescription(text) {
    $description.textContent = text;
}

export function loader(isLoading = false) {
    const img = isLoading ? 'url(./images/loading.gif)' : '';
    $screen.style.backgroundImage = img;
}

function speech(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es';
    speechSynthesis.speak(utterance);
    $light.classList.add('is-animated');
    utterance.addEventListener('end', () => {
        $light.classList.remove('is-animated');
    })
}

export async function findPokemon(id) {
    const pokemon = await getPokemon(id);
    const species = await getSpecies(id);
    const description = species.flavor_text_entries.find((flavor) => flavor.language.name === 'es');
    const sprites = [pokemon.sprites.front_default]
    const stats = pokemon.stats.map(stat => stat.base_stat);
    for(const item in pokemon.sprites) {
        if(item !== 'front_default' && item !== 'other' && item !== 'versions' && pokemon.sprites[item]){
            sprites.push(pokemon.sprites[item]);
        }
    }
    return {
        description: description.flavor_text,
        sprites,
        id: pokemon.id,
        name: pokemon.name,
        stats
    }
}

let activeChart = null

export async function setPokemon(id) {
    loader(true);
    const pokemon = await findPokemon(id);
    loader();
    setImage(pokemon.sprites[0]);
    setDescription(pokemon.description);
    speech( `${pokemon.name}. ${pokemon.description}`);
    if(activeChart instanceof Chart) {
        activeChart.destroy();
    }
    activeChart = createChart(pokemon.stats,pokemon.name);
    return pokemon;
}


