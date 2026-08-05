let activeDropdown = null;
function openPage(page, button){


    let buttons = document.querySelectorAll(".nav-button");


    buttons.forEach(btn => {
        btn.classList.remove("active");
    });


    button.classList.add("active");



    let content = document.getElementById("content");



    if(page === "brawlers"){

        loadBrawlers();

    }


    if(page === "maps"){

        loadMaps();

    }


    if(page === "players"){

        content.innerHTML = `

        <h1>Players</h1>

        `;

    }


    if(page === "drafts"){

        content.innerHTML = `

        <h1>Drafts</h1>

        `;

    }

}

function openNewMatch(){


document.getElementById("popupBackground").style.display="flex";


document.getElementById("matchMapArea").innerHTML = `


<div id="mapSelectorContainer">


<button class="center-map-button" onclick="openMapSelector()">

Select a map ▼

</button>


</div>


`;

}

function closeNewMatch(){

    document.getElementById("popupBackground").style.display="none";


    document.getElementById("matchMapArea").innerHTML = `


    <div id="mapSelectorContainer">


        <button class="center-map-button" onclick="openMapSelector()">

        Select a map ▼

        </button>


    </div>


    `;

}

function openMapSelector(){

closeActiveDropdown();


let container = document.getElementById("mapSelectorContainer");


container.dataset.closed = `

<button class="center-map-button" onclick="openMapSelector()">

Select a map ▼

</button>

`;


activeDropdown = container;


let html = `


<input 
id="mapSearch"
placeholder="Search map..."
onkeyup="searchMaps()">



<div class="map-dropdown">


`;



for(let mode in maps){

    maps[mode].forEach(map=>{


        html += `


        <div class="map-option" onclick='selectMap(${JSON.stringify({
            ...map,
            mode: mode
        })})'>


        <span>
        ${map.name}
        </span>


        <img src="${map.image}">


        </div>


        `;


    });

}



html += `

</div>

`;



container.innerHTML = html;


document.getElementById("mapSearch").focus();


}

function searchMaps(){


let input =
document.getElementById("mapSearch").value.toLowerCase();



let options =
document.querySelectorAll(".map-option");



options.forEach(option=>{


if(option.innerText.toLowerCase().includes(input)){


option.style.display="flex";


}

else{


option.style.display="none";


}


});


}

function selectMap(map){


let area = document.getElementById("matchMapArea");



area.innerHTML = `


<div class="selected-map-layout">


<div class="selected-map-image">


<h2>
${map.name}
</h2>


<img src="${map.image}">


</div>



<div class="map-right-side">


<div id="mapSelectorContainer">

<button class="center-map-button" onclick="openMapSelector()">

${map.mode} ▼

</button>

</div>



<div class="rank-container">


<div class="rank-box">

<button class="rank-button" onclick="openRankSelector(this)">
Rank ▼
</button>

</div>


<div class="rank-box">

<button class="rank-button" onclick="openRankSelector(this)">
Rank ▼
</button>

</div>


<div class="rank-box">

<button class="rank-button" onclick="openRankSelector(this)">
Rank ▼
</button>

</div>


</div>


</div>



</div>


`;


}

window.onload = function(){

    loadMaps();

}

function openRankSelector(button){

closeActiveDropdown();


let container = button.parentElement;


container.dataset.closed = `

<button class="rank-button" onclick="openRankSelector(this)">

Rank ▼

</button>

`;


activeDropdown = container;

let ranks = [

"L1",
"L2",
"L3",
"M1",
"M2",
"M3",
"Pro",
"Pro+MP"

];


let html = "";


ranks.forEach(rank=>{


html += `

<div onclick="selectRank(this, '${rank}')">

${rank}

</div>

`;


});


container.innerHTML = `

<div class="rank-dropdown">

${html}

</div>

`;

}

function selectRank(element, rank){


element.parentElement.parentElement.innerHTML = `


<button class="rank-button" onclick="openRankSelector(this)">

${rank}

</button>


`;


}


function closeActiveDropdown(){


if(activeDropdown){


activeDropdown.innerHTML = activeDropdown.dataset.closed;


activeDropdown = null;


}


}

document.addEventListener("click", function(event){


if(activeDropdown && !activeDropdown.contains(event.target)){


closeActiveDropdown();


}


});