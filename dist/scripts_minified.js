let pokemonRepository=function(){let t=[];return{add:function(e){t.push(e),console.log(t)},getAll:function(){return t},loadDetails:function(t){let e=t.detailsUrl;return fetch(e).then(function(t){return t.json()}).then(function(e){t.imageUrl=e.sprites.front_default,t.height=e.height,t.types=e.types}).catch(function(t){console.error(t)})},showDetails:function(t){console.log(t.target.innerText)},addListItem:function(t){let e=document.getElementById("list"),n=document.createElement("button");n.classList.add("btn"),n.classList.add("btn-primary"),n.id="buttonForModal",n.innerText="",n.innerText=t.name,e.appendChild(n),n.setAttribute("data-bs-toggle","modal"),n.setAttribute("data-bs-target","#pokemonModal"),n.addEventListener("click",function(){let e=document.getElementById("modalText");document.getElementById("modalTitle").innerText=`${t.name}`,console.log(t),e.innerText=`Height: ${t.height}`;let n=document.createElement("img");n.id="pokemonImage",e.appendChild(n),n.src=t.imageUrl})},loadList:function(){return t=[],fetch("https://pokeapi.co/api/v2/pokemon/").then(function(t){return t.json()}).then(function(t){console.log(t),t.results.forEach(function(t){let e={name:t.name,detailsUrl:t.url};pokemonRepository.loadDetails(e).then(function(){pokemonRepository.add(e),pokemonRepository.addListItem(e)})})}).catch(function(t){console.error(t)})}}}();pokemonRepository.loadList();