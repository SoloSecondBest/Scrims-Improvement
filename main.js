let activeDropdown = null;

let selectedMap = null;
let selectedRanks = ["Rank", "Rank", "Rank"];


// NAVIGATION

function openPage(page, button){

    let buttons = document.querySelectorAll(".nav-button");

    buttons.forEach(btn=>{
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



// OPEN MATCH

function openNewMatch(){

    document.getElementById("popupBackground").style.display="flex";


    document.getElementById("matchMapArea").innerHTML = `

    <div class="map-right-side">

        <div id="mapSelectorContainer">

            <button class="center-map-button" onclick="openMapSelector(event)">
                Select a map ▼
            </button>

        </div>

    </div>

    `;

}



// CLOSE MATCH

function closeNewMatch(){

    document.getElementById("popupBackground").style.display="none";

    selectedMap = null;
    selectedRanks = ["Rank","Rank","Rank"];

}



// MAP SELECTOR

function openMapSelector(event){

    if(event){
        event.stopPropagation();
    }


    closeActiveDropdown();


    let container = document.getElementById("mapSelectorContainer");


    container.dataset.closed = `

    <button class="center-map-button" onclick="openMapSelector(event)">
        ${selectedMap ? selectedMap.mode : "Select a map"} ▼
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
                mode:mode
            })})'>


                <span>${map.name}</span>

                <img src="${map.image}">

            </div>

            `;


        });

    }



    html += `</div>`;


    container.innerHTML = html;


    document.getElementById("mapSearch").focus();

}



// SEARCH MAPS

function searchMaps(){

    let input = document
    .getElementById("mapSearch")
    .value
    .toLowerCase();



    document.querySelectorAll(".map-option")
    .forEach(option=>{


        if(option.innerText.toLowerCase().includes(input)){

            option.style.display="flex";

        }
        else{

            option.style.display="none";

        }

    });

}



// SELECT MAP

function selectMap(map){

    selectedMap = map;


    activeDropdown = null;


    document.getElementById("matchMapArea").innerHTML = `


    <div class="selected-map-layout">


        <div class="selected-map-image">

            <h2>${map.name}</h2>

            <img src="${map.image}">

        </div>



        <div class="map-right-side">


            <div id="mapSelectorContainer">

                <button class="rank-button" onclick="openRankSelector(event,this)">
                     Rank ▼
                </button>

            </div>



            <div class="rank-container">


                ${createRankBox(0)}

                ${createRankBox(1)}

                ${createRankBox(2)}


            </div>


        </div>


    </div>


    `;

}



// CREATE RANK BUTTON

function createRankBox(index){

return `

<div class="rank-box">

<button class="rank-button" onclick="openRankSelector(event,this)">
${selectedRanks[index]} ▼
</button>

</div>

`;

}



// RANK SELECTOR

function openRankSelector(event, button){

    event.stopPropagation();

    closeActiveDropdown();


    let container = button.parentElement;


    container.dataset.closed = `
    <button class="rank-button" onclick="openRankSelector(event,this)">
        ${button.innerText}
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
        <div class="rank-option"
        onclick="selectRank(event,this,'${rank}')">

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



function selectRank(event, element, rank){

    event.stopPropagation();


    let container = element.closest(".rank-box");


    container.innerHTML = `

    <button class="rank-button" onclick="openRankSelector(event,this)">
        ${rank} ▼
    </button>

    `;


    activeDropdown = null;

}



function closeActiveDropdown(){

    if(activeDropdown){

        activeDropdown.innerHTML = activeDropdown.dataset.closed;

        activeDropdown = null;

    }

}



document.addEventListener("click",function(event){

    if(activeDropdown && !activeDropdown.contains(event.target)){

        closeActiveDropdown();

    }

});