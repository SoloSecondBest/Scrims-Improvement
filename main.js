function openPage(page, button){

    function openNewMatch(){

         document.getElementById("popupBackground").style.display="flex";

    }



     function closeNewMatch(){

        document.getElementById("popupBackground").style.display="none";

    }


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

window.onload = function(){

    document.getElementById("content").innerHTML = mapsPage;

}

loadMaps();