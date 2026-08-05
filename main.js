let activeDropdown = null;


let matchData = {

    map:null,

    ranks:[
        "Rank ▼",
        "Rank ▼",
        "Rank ▼"
    ],

    brawlers:[],

    bans:[]

};





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





function openNewMatch(){


    matchData = {

        map:null,

        ranks:[
            "Rank ▼",
            "Rank ▼",
            "Rank ▼"
        ],

        brawlers:[],

        bans:[]

    };



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






function closeNewMatch(){


    document.getElementById("popupBackground").style.display="none";


    closeActiveDropdown();


}








function openMapSelector(event){


    event.stopPropagation();


    closeActiveDropdown();



    let container = document.getElementById("mapSelectorContainer");



    container.dataset.closed = `


    <button class="center-map-button" onclick="openMapSelector(event)">

        ${matchData.map ? matchData.map.mode : "Select a map"} ▼

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


            <div class="map-option"

            onclick='selectMap(${JSON.stringify({
                ...map,
                mode:mode
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


    let input = document
    .getElementById("mapSearch")
    .value
    .toLowerCase();



    let options = document.querySelectorAll(".map-option");



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


    closeActiveDropdown();


    matchData.map = map;



    renderMatch();



}







function renderMatch(){


    let area = document.getElementById("matchMapArea");



    area.innerHTML = `



    <div class="selected-map-layout">



        <div class="selected-map-image">


            <h2>
            ${matchData.map.name}
            </h2>


            <img src="${matchData.map.image}">


        </div>





        <div class="map-right-side">



            <div id="mapSelectorContainer">


                <button class="center-map-button" onclick="openMapSelector(event)">

                    ${matchData.map.mode} ▼

                </button>


            </div>





            <div class="rank-container">


            ${matchData.ranks.map((rank,index)=>`


                <div class="rank-box">


                    <button class="rank-button"

                    onclick="openRankSelector(event,this,${index})">


                        ${rank}


                    </button>


                </div>


            `).join("")}



            </div>



        </div>



    </div>



    `;


}









function openRankSelector(event,button,index){


    event.stopPropagation();


    closeActiveDropdown();



    let container = button.parentElement;



    container.dataset.closed = `


    <button class="rank-button"

    onclick="openRankSelector(event,this,${index})">

        ${matchData.ranks[index]}

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




    let html="";




    ranks.forEach(rank=>{


        html += `


        <div class="rank-option"

        onclick="selectRank(event,'${rank}',${index})">


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








function selectRank(event,rank,index){


    event.stopPropagation();



    matchData.ranks[index] = rank;



    activeDropdown = null;



    renderMatch();



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







window.onload=function(){


    loadMaps();


}