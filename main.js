let activeDropdown = null;

let selectedEnemyBrawlers = [null, null, null];

let selectedYourBrawlers = [null, null, null];

const allBrawlers = Object.values(brawlers).flat();

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

    selectedEnemyBrawlers = [null, null, null];
    selectedYourBrawlers = [null, null, null];

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



   for (const mode in maps) {

    maps[mode].forEach(map => {

        html += `
        <div class="map-option"
        onclick='selectMap(${JSON.stringify({
            ...map,
            mode: mode
        })})'>

            <span>${map.name}</span>

            <img src="${map.image}">

        </div>
        `;

    });

}



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

            <h3 class="team-title">Enemy Team</h3>

            <div class="enemy-brawler-container">

                ${createEnemyBrawlerSlot(0)}
                ${createEnemyBrawlerSlot(1)}
                ${createEnemyBrawlerSlot(2)}

            </div>

            <h3 class="team-title">Your Team</h3>

            <div class="your-brawler-container">

                ${createYourBrawlerSlot(0)}
                ${createYourBrawlerSlot(1)}
                ${createYourBrawlerSlot(2)}

            </div>

        </div>


    </div>


    `;


}

function createEnemyBrawlerSlot(index){

    const selectedBrawler = selectedEnemyBrawlers[index];

    if(selectedBrawler){

        return `
        <div
            class="enemy-brawler-slot"
            id="enemyBrawlerSlot${index}"
        >

            <button
                class="selected-brawler-button"
                onclick="openEnemyBrawlerSelector(event, ${index})"
            >
                <img
                    src="${selectedBrawler.image}"
                    alt="${selectedBrawler.name}"
                >
            </button>

            <p>${selectedBrawler.name}</p>

        </div>
        `;
    }

    return `
    <div
        class="enemy-brawler-slot"
        id="enemyBrawlerSlot${index}"
    >

        <button
            class="empty-brawler-button"
            onclick="openEnemyBrawlerSelector(event, ${index})"
        >
            Brawler ▼
        </button>

    </div>
    `;
}


function createYourBrawlerSlot(index){

    const selectedBrawler = selectedYourBrawlers[index];

    if(selectedBrawler){

        return `
        <div
            class="your-brawler-slot"
            id="yourBrawlerSlot${index}"
        >

            <button
                class="selected-brawler-button"
                onclick="openYourBrawlerSelector(event, ${index})"
            >
                <img
                    src="${selectedBrawler.image}"
                    alt="${selectedBrawler.name}"
                >
            </button>

            <p>${selectedBrawler.name}</p>

        </div>
        `;
    }

    return `
    <div
        class="your-brawler-slot"
        id="yourBrawlerSlot${index}"
    >

        <button
            class="empty-brawler-button"
            onclick="openYourBrawlerSelector(event, ${index})"
        >
            Brawler ▼
        </button>

    </div>
    `;
}

function openYourBrawlerSelector(event, index){

    event.stopPropagation();

    closeActiveDropdown();


    const container = document.getElementById(
        `yourBrawlerSlot${index}`
    );


    container.dataset.closed = createYourBrawlerSlot(index);

    activeDropdown = container;


    const alreadySelectedNames = [

        ...selectedEnemyBrawlers,

        ...selectedYourBrawlers.map((brawler, slotIndex) => {

            if(slotIndex === index){
                return null;
            }

            return brawler;

        })

    ]
    .filter(Boolean)
    .map(brawler => brawler.name);


    let html = `

    <input
        class="brawler-search"
        id="yourBrawlerSearch${index}"
        type="text"
        placeholder="Search brawler..."
        oninput="searchYourBrawlers(${index})"
    >

    <div class="brawler-picker-dropdown">

    `;


    allBrawlers.forEach((brawler, brawlerIndex) => {

        const isAlreadySelected =
            alreadySelectedNames.includes(brawler.name);


        if(isAlreadySelected){

            html += `

            <div
                class="brawler-picker-option disabled-brawler-option"
                data-brawler-name="${brawler.name.toLowerCase()}"
            >

                <span>${brawler.name}</span>

                <img
                    src="${brawler.image}"
                    alt="${brawler.name}"
                >

            </div>

            `;

        } else {

            html += `

            <div
                class="brawler-picker-option"
                data-brawler-name="${brawler.name.toLowerCase()}"
                onclick="selectYourBrawler(
                    event,
                    ${index},
                    ${brawlerIndex}
                )"
            >

                <span>${brawler.name}</span>

                <img
                    src="${brawler.image}"
                    alt="${brawler.name}"
                >

            </div>

            `;

        }

    });


    html += `

    </div>

    `;


    container.innerHTML = html;


    document
        .getElementById(`yourBrawlerSearch${index}`)
        .focus();

}

function searchYourBrawlers(index){

    const searchInput = document
        .getElementById(`yourBrawlerSearch${index}`)
        .value
        .toLowerCase();


    const options = document.querySelectorAll(
        `#yourBrawlerSlot${index} .brawler-picker-option`
    );


    options.forEach(option => {

        const brawlerName = option.dataset.brawlerName;

        option.style.display = brawlerName.includes(searchInput)
            ? "flex"
            : "none";

    });

}

function selectYourBrawler(event, slotIndex, brawlerIndex){

    event.stopPropagation();


    const chosenBrawler = allBrawlers[brawlerIndex];


    const duplicateExists = [

        ...selectedEnemyBrawlers,

        ...selectedYourBrawlers.filter(
            (brawler, index) => index !== slotIndex
        )

    ].some(selectedBrawler => {

        return (
            selectedBrawler &&
            selectedBrawler.name === chosenBrawler.name
        );

    });


    if(duplicateExists){
        return;
    }


    selectedYourBrawlers[slotIndex] = chosenBrawler;


    const container = document.getElementById(
        `yourBrawlerSlot${slotIndex}`
    );


    container.outerHTML = createYourBrawlerSlot(slotIndex);


    activeDropdown = null;
}

function openEnemyBrawlerSelector(event, index) {

    event.stopPropagation();

    closeActiveDropdown();


    const container = document.getElementById(
        `enemyBrawlerSlot${index}`
    );


    container.dataset.closed = createEnemyBrawlerSlot(index);

    activeDropdown = container;


    const alreadySelectedNames = [

        ...selectedYourBrawlers,

        ...selectedEnemyBrawlers.map((brawler, slotIndex) => {

        if(slotIndex === index){
            return null;
        }

        return brawler;

        })

    ]
        .filter(Boolean)
        .map(brawler => brawler.name);

    let html = `

    <input
        class="brawler-search"
        id="enemyBrawlerSearch${index}"
        type="text"
        placeholder="Search brawler..."
        oninput="searchEnemyBrawlers(${index})"
    >

    <div class="brawler-picker-dropdown">

    `;


    allBrawlers.forEach((brawler, brawlerIndex) => {

        const isAlreadySelected =
            alreadySelectedNames.includes(brawler.name);


        if (isAlreadySelected) {

            html += `

            <div
                class="brawler-picker-option disabled-brawler-option"
                data-brawler-name="${brawler.name.toLowerCase()}"
            >

                <span>${brawler.name}</span>

                <img
                    src="${brawler.image}"
                    alt="${brawler.name}"
                >

            </div>

            `;

        } else {

            html += `

            <div
                class="brawler-picker-option"
                data-brawler-name="${brawler.name.toLowerCase()}"
                onclick="selectEnemyBrawler(
                    event,
                    ${index},
                    ${brawlerIndex}
                )"
            >

                <span>${brawler.name}</span>

                <img
                    src="${brawler.image}"
                    alt="${brawler.name}"
                >

            </div>

            `;

        }

    });


    html += `

    </div>

    `;


    container.innerHTML = html;


    document
        .getElementById(`enemyBrawlerSearch${index}`)
        .focus();

}

function searchEnemyBrawlers(index){

    const searchInput = document
        .getElementById(`enemyBrawlerSearch${index}`)
        .value
        .toLowerCase();


    const options = document.querySelectorAll(
        `#enemyBrawlerSlot${index} .brawler-picker-option`
    );


    options.forEach(option => {

        const brawlerName = option.dataset.brawlerName;

        option.style.display = brawlerName.includes(searchInput)
            ? "flex"
            : "none";

    });

}

function selectEnemyBrawler(event, slotIndex, brawlerIndex) {

    event.stopPropagation();


    const chosenBrawler = allBrawlers[brawlerIndex];


    const duplicateExists = [

    ...selectedYourBrawlers,

    ...selectedEnemyBrawlers.filter(
        (brawler, index) => index !== slotIndex
    )

    ].some(selectedBrawler => {

    return (
        selectedBrawler &&
        selectedBrawler.name === chosenBrawler.name
    );

    });


    if (duplicateExists) {
        return;
    }


    selectedEnemyBrawlers[slotIndex] = chosenBrawler;


    const container = document.getElementById(
        `enemyBrawlerSlot${slotIndex}`
    );


    container.outerHTML = createEnemyBrawlerSlot(slotIndex);


    activeDropdown = null;

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