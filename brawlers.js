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

],


"Epic":[

{
name:"Bo",
image:"brawlers/bo.png"
},

{
name:"Emz",
image:"brawlers/emz.png"
},

{
name:"Stu",
image:"brawlers/stu.png"
},

{
name:"Piper",
image:"brawlers/piper.png"
},

{
name:"Pam",
image:"brawlers/pam.png"
},

{
name:"Frank",
image:"brawlers/frank.png"
},

{
name:"Bibi",
image:"brawlers/bibi.png"
},

{
name:"Bea",
image:"brawlers/bea.png"
},

{
name:"Nani",
image:"brawlers/nani.png"
},

{
name:"Edgar",
image:"brawlers/edgar.png"
},

{
name:"Griff",
image:"brawlers/griff.png"
},

{
name:"Grom",
image:"brawlers/grom.png"
},

{
name:"Bonnie",
image:"brawlers/bonnie.png"
},

{
name:"Gale",
image:"brawlers/gale.png"
},

{
name:"Colette",
image:"brawlers/colette.png"
},

{
name:"Belle",
image:"brawlers/belle.png"
},

{
name:"Ash",
image:"brawlers/ash.png"
},

{
name:"Lola",
image:"brawlers/lola.png"
},

{
name:"Sam",
image:"brawlers/sam.png"
},

{
name:"Mandy",
image:"brawlers/mandy.png"
},

{
name:"Maisie",
image:"brawlers/maisie.png"
},

{
name:"Hank",
image:"brawlers/hank.png"
},

{
name:"Pearl",
image:"brawlers/pearl.png"
},

{
name:"Larry & Lawrie",
image:"brawlers/larry_and_lawrie.png"
},

{
name:"Angelo",
image:"brawlers/angelo.png"
},

{
name:"Berry",
image:"brawlers/berry.png"
},

{
name:"Shade",
image:"brawlers/shade.png"
},

{
name:"Meeple",
image:"brawlers/meeple.png"
},

{
name:"Trunk",
image:"brawlers/trunk.png"
},

{
name:"Bolt",
image:"brawlers/bolt.png"
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
