const maps = {

"Bounty":[

{
name:"Dry Season",
image:"images/dry_season.png"
},

{
name:"Hideout",
image:"images/hideout.png"
},

{
name:"Layer Cake",
image:"images/layer_cake.png"
}

],

"Heist":[

{
name:"Pit Stop",
image:"images/pit_stop.png"
},

{
name:"Safe Zone",
image:"images/safe_zone.png"
},

{
name:"Kaboom Canyon",
image:"images/kaboom_canyon.png"
}

],

"Hot Zone":[

{
name:"Ring of Fire",
image:"images/ring_of_fire.png"
},

{
name:"Open Business",
image:"images/open_business.png"
},

{
name:"Dueling Beetles",
image:"images/dueling_beetles.png"
}

],

"Brawl Ball":[

{
name:"Triple Dribble",
image:"images/triple_dribble.png"
},

{
name:"Pinhole Punt",
image:"images/pinhole_punt.png"
},

{
name:"Pinball Dreams",
image:"images/pinball_dreams.png"
}

],

"Gem Grab":[

{
name:"Hard Rock Mine",
image:"images/hard_rock_mine.png"
},

{
name:"Gem Fort",
image:"images/gem_fort.png"
},

{
name:"Crystal Arcade",
image:"images/crystal_arcade.png"
}

],

"Knockout":[

{
name:"Goldarm Gulch",
image:"images/goldarm_gulch.png"
},

{
name:"New Horizons",
image:"images/new_horizons.png"
},

{
name:"Out in the Open",
image:"images/out_in_the_open.png"
}

]

};

function loadMaps(){

let html = "<h1>Maps</h1>";

for(const mode in maps){

html += `
<div class="map-section">
<h2>${mode}</h2>
<div class="map-container">
`;

maps[mode].forEach(map=>{

html += `
<div class="map-card">
<h3>${map.name}</h3>
<img src="${map.image}">
</div>
`;

});

html += `
</div>
</div>
`;

}

document.getElementById("content").innerHTML = html;

}