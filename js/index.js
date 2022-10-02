import './charts.js'
import { setPokemon, setImage, setDescription, loader } from './pokedex.js'

const $form = document.querySelector('#form');
const $next = document.querySelector('#next-pokemon');
const $prev = document.querySelector('#prev-pokemon');
const $nextImg = document.querySelector('#next-image');
const $prevImg = document.querySelector('#prev-image');
const $pokedex = document.querySelector('#pokedex');
const $input = document.querySelector('#id');

$form.addEventListener('submit', handleSubmit)
$next.addEventListener('click', handleNext)
$prev.addEventListener('click', handlePrev)
$nextImg.addEventListener('click', handleNextImg)
$prevImg.addEventListener('click', handlePrevImg)

let activePokemon = null;
let activeSprite = 0;

async function handleSubmit(event) {
    $pokedex.classList.add('is-open');
    event.preventDefault();
    const form = new FormData($form);
    const id = form.get('id');
    try{
        activePokemon = await setPokemon(id);
    } catch {
        setDescription(`El Pokémon numero ${id} no existe, intenta con otro.`);
        activePokemon = null;
        loader();
    }
    
}

async function handleNext() {
    const id = (activePokemon === null || activePokemon.id === 898) ? 1 : activePokemon.id + 1;
    $input.value = id;
    activePokemon = await setPokemon(id);
}

async function handlePrev() {
    const id = (activePokemon === null || activePokemon.id === 1) ? 898 : activePokemon.id - 1;
    $input.value = id;
    activePokemon = await setPokemon(id);
}

async function handleNextImg() {
    if(activePokemon === null) return false
    activeSprite = activeSprite >= activePokemon.sprites.length -1 ? 0 : activeSprite + 1;
    setImage(activePokemon.sprites[activeSprite]);
}

async function handlePrevImg() {
    if(activePokemon === null) return false
    activeSprite = activeSprite <= 0 ? activePokemon.sprites.length -1 : activeSprite - 1;
    setImage(activePokemon.sprites[activeSprite]);
}