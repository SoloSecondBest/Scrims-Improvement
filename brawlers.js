const brawlers = {

Rare: [

{
name:"Shelly",
image:"rare/shelly.png"
},

{
name:"Nita",
image:"rare/nita.png"
},

{
name:"Colt",
image:"rare/Colt.png"
},

{
name:"Bull",
image:"rare/Bull.png"
},

{
name:"Brock",
image:"rare/brock.png"
},

{
name:"El Primo",
image:"rare/el_primo.png"
},

{
name:"Barley",
image:"rare/barley.png"
},

{
name:"Poco",
image:"rare/poco.png"
},

{
name:"Rosa",
image:"rare/rosa.png"
}

],



"Super Rare":[

{
name:"Jessie",
image:"brawlers/jessie.png"
},

{
name:"Dynamike",
image:"brawlers/dynamike.png"
},

{
name:"Tick",
image:"brawlers/tick.png"
},

{
name:"8-Bit",
image:"brawlers/8-bit.png"
},

{
name:"Rico",
image:"brawlers/rico.png"
},

{
name:"Darryl",
image:"brawlers/darryl.png"
},

{
name:"Penny",
image:"brawlers/penny.png"
},

{
name:"Carl",
image:"brawlers/carl.png"
},

{
name:"Jacky",
image:"brawlers/jacky.png"
},

{
name:"Gus",
image:"brawlers/gus.png"
}

]

};

function loadBrawlers(){


let html = "<h1>Brawlers</h1>";



for(let rarity in brawlers){


html += `

<div class="brawler-section">

<h2>${rarity}</h2>

<div class="brawler-grid">

`;



brawlers[rarity].forEach(brawler => {


html += `

<div class="brawler-card">


<img src="${brawler.image}">


<p>${brawler.name}</p>


</div>


`;


});



html += `

</div>

</div>

`;

}


document.getElementById("content").innerHTML = html;


};
