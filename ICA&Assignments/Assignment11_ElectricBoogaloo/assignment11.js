window.addEventListener('load',getQuote);

let contenedor;
const total_pokemons = 500;

window.onload = inicio;
// -- Pokemon Randomizer Call
function aleatorio(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// -- Button Functionality On-Click
const quoteButton = document.querySelector('.new-quote');
quoteButton.addEventListener('click',getQuote);


function inicio()
{
  contenedor = document.getElementById("vitrina");
  window.addEventListener("click",pintarVitrina);
}

function pintarVitrina(event){
  contenedor.innerHTML = "";
  traerDatos(aleatorio(1,total_pokemons));
}



function getQuote(){
    
}

function displayQuote(){
   
}




//https://pokeapi.co/api/v2/pokemon/5




function traerDatos(id){
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  .then(response => response.json())
  .then(function(data){
    let name = data.name;
    let url = data.sprites.other.dream_world.front_default;
    if(name && url)
    {
        displayTarget(name,url);
    }
  });
}

function displayTarget(name,url)
{
  let template = `<div class="tarjeta">
  <img src="${url}" alt="" >
    <br>
    <label for="">
      ${name}
    </label>
  </div>`;
  contenedor.innerHTML += template;
}