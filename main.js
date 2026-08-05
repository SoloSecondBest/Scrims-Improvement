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


let container = document.getElementById("mapSelectorContainer");


let html = `


<input 
id="mapSearch"
placeholder="Search map..."
onkeyup="searchMaps()">



<div class="map-dropdown">


`;



maps.forEach(map=>{


html += `


<div class="map-option" onclick='selectMap(${JSON.stringify(map)})'>


<span>
${map.name}
</span>


<img src="${map.image}">


</div>


`;


});



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



<div class="selected-map-info">


<div id="mapSelectorContainer">


<button class="center-map-button" onclick="openMapSelector()">

${map.mode} ▼

</button>


</div>


</div>



</div>


`;


}

window.onload = function(){

    loadMaps();

}