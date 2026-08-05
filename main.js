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
    
      content.innerHTML = mapsPage;

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