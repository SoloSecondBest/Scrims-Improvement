let activeDropdown = null;



function openPage(page, button){

    let buttons = document.querySelectorAll(".nav-button");

    buttons.forEach(btn=>{
        btn.classList.remove("active");
    });


    button.classList.add("active");


    let content = document.getElementById("content");


    if(page === "maps"){
        loadMaps();
    }


    if(page === "brawlers"){
        loadBrawlers();
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

    <div class="map-right-side">

        <div id="mapSelectorContainer">

            <button class="center-map-button"
            onclick="event.stopPropagation(); openMapSelector()">

            Select a map ▼

            </button>

        </div>

    </div>

    `;

}





function closeNewMatch(){

    document.getElementById("popupBackground").style.display="none";

    activeDropdown=null;


    document.getElementById("matchMapArea").innerHTML="";

}





function openMapSelector(){


    closeActiveDropdown();


    let container=document.getElementById("mapSelectorContainer");


    container.dataset.closed=`

    <button class="center-map-button"
    onclick="event.stopPropagation(); openMapSelector()">

    Select a map ▼

    </button>

    `;



    activeDropdown=container;



    let html=`


    <input 
    id="mapSearch"
    placeholder="Search map..."
    onkeyup="searchMaps()">



    <div class="map-dropdown">


    `;



    mapList.forEach(map=>{


        html+=`

        <div class="map-option"
        onclick='selectMap(${JSON.stringify(map)})'>


        <span>
        ${map.name}
        </span>


        <img src="${map.image}">


        </div>


        `;


    });



    html+=`

    </div>

    `;



    container.innerHTML=html;


    document.getElementById("mapSearch").focus();


}






function searchMaps(){


    let input=document
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







function selectMap(map){


    closeActiveDropdown();


    let area=document.getElementById("matchMapArea");



    area.innerHTML=`


    <div class="selected-map-layout">



        <div class="selected-map-image">


            <h2>${map.name}</h2>


            <img src="${map.image}">


        </div>




        <div class="map-right-side">


            <div id="mapSelectorContainer">


                <button class="center-map-button"
                onclick="event.stopPropagation(); openMapSelector()">


                ${map.mode} ▼


                </button>


            </div>




            <div class="rank-container">


                <div class="rank-box">
                <button class="rank-button"
                onclick="event.stopPropagation();openRankSelector(this)">
                Rank ▼
                </button>
                </div>


                <div class="rank-box">
                <button class="rank-button"
                onclick="event.stopPropagation();openRankSelector(this)">
                Rank ▼
                </button>
                </div>


                <div class="rank-box">
                <button class="rank-button"
                onclick="event.stopPropagation();openRankSelector(this)">
                Rank ▼
                </button>
                </div>


            </div>


        </div>


    </div>


    `;


}









function openRankSelector(button){


    closeActiveDropdown();


    let container=button.parentElement;


    container.dataset.closed=`

    <button class="rank-button"
    onclick="event.stopPropagation();openRankSelector(this)">
    Rank ▼
    </button>

    `;



    activeDropdown=container;



    let ranks=[
        "L1",
        "L2",
        "L3",
        "M1",
        "M2",
        "M3",
        "Pro",
        "Pro+MP"
    ];



    let html="";



    ranks.forEach(rank=>{


        html+=`

        <div class="rank-option"
        onclick="selectRank(this,'${rank}')">

        ${rank}

        </div>

        `;


    });



    container.innerHTML=`

    <div class="rank-dropdown">

    ${html}

    </div>

    `;


}








function selectRank(element,rank){


    let container=element.parentElement.parentElement;



    container.innerHTML=`

    <button class="rank-button"
    onclick="event.stopPropagation();openRankSelector(this)">

    ${rank} ▼

    </button>


    `;


    activeDropdown=null;


}







function closeActiveDropdown(){


    if(activeDropdown){


        activeDropdown.innerHTML=
        activeDropdown.dataset.closed;


        activeDropdown=null;


    }


}








document.addEventListener("click",function(){


    closeActiveDropdown();


});





window.onload=function(){

    loadMaps();

};