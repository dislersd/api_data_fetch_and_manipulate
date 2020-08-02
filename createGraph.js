// bring in json file we wrote containing api data that was fetched
const data = require("./data_from_api.json");
// fs to write new json file
const fs = require("fs");
// geodist is a library that computes the distance between to places using lat and lon points
const geodist = require("geodist");

// only three farms don't have a business name so we filter those out
// some farm objects don't have "farm name" property so we check "business" property to get farm names
let farmsWithNames = data.filter((farm) => farm["business"]);

// put farm name, coords, and phone num into an array of objects
// a single farm object will look like
// {
// name: 'Karabin Farms',
// coords: { lat: 41.61609643000048, lon: -72.82920259099967 },
// phone: '860-620-0194'
// }

let farms = farmsWithNames.map((farm) => ({
  name: farm.business,
  coords: {
    lat: farm.location_1.coordinates[1],
    lon: farm.location_1.coordinates[0],
  },
  phone: farm.phone1,
}));

// object to hold farms and the farms that are within 5 miles disance
let graph = {};

// place each farm into the object with the farm name as a key it's value as { phone num, [nearby farms] }
for (let i = 0; i < farms.length; i++) {
  let farmName = farms[i].name;
  let phone = farms[i].phone;

  graph[farmName] = {
    phone,
    closeFarms: [],
  };
}

// for each farm loop over every other farm and check distance from each other - make connections for farms that are close
for (let i = 0; i < farms.length; i++) {
  for (let j = 0; j < farms.length; j++) {
    if (farms[j] == farms[i]) {
      continue;
    }

    // using geodist library to find distance between farms
    let dist = geodist(
      { lat: farms[i].coords.lat, lon: farms[i].coords.lon },
      { lat: farms[j].coords.lat, lon: farms[j].coords.lon }
    );
    // if farm i & farm j are less than 5 miles away from each otehr - add farm j to farm i's list of nearby farms
    if (dist < 5) {
      console.log("nearby farm added");
      graph[farms[i].name].closeFarms.push(farms[j].name);
    }
  }
}

// We now have an object that contains each farm, the farm's phone, and the list of farms nearby 

fs.writeFile("./farm_graph.json", JSON.stringify(graph, null, 1), (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("File created");
});
