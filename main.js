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

}

function closeNewMatch(){

    document.getElementById("popupBackground").style.display="none";

}

function openMapSelector(){


let container = document.getElementById("mapSelectorContainer");


let html = `

<button class="center-map-button">

Select a map ▼

</button>

<div class="map-dropdown">

`;



for(let mode in maps){


maps[mode].forEach(map=>{


html += `


<div class="map-option" onclick='selectMap(${JSON.stringify(map)})'>


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


}

loadMaps();