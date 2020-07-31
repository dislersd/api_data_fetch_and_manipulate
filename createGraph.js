const data = require("./data_from_api.json");

const fs = require("fs");
const geodist = require("geodist");

// helper function to round decimal points ie: 41.38958856000045 => 41.38
// function round(num) {
//   let rounded = num.toFixed(2);
//   // toFixed returns a string so putting a "+" before rounded turns it into a number
//   return +rounded;
// }

// only three farms don't have a business name so we filter thos out
// some farm objects don't have "farm name" property so we check "business" property to get farm names
let farmsWithNames = data.filter((farm) => farm["business"]);

// put farm name and coords into an array
// a single farm array will look like ["farm name", [latittude, longitude], phone number]
let farms = farmsWithNames.map((el) => [
  el.business,
  [el.location_1.coordinates[1], el.location_1.coordinates[0]],
  el.phone1,
]);

// create graph to hold farms
let graph = {};

// place each farm into graph with name as key and [ {coords}, [nearby farms], phone num ] as values
for (let i = 0; i < farms.length; i++) {
  let fName = farms[i][0];
  let [fCoords1, fCoords2] = farms[i][1];
  let phoneNum = farms[i][2];

  // let roundedLat = round(fCoords1);
  // let roundedLon = round(fCoords2);

  graph[fName] = [{ lat: fCoords1, lon: fCoords2 }, [], phoneNum];
}

// for each farm loop over list of farms and compare lat and lon to determine distance from each other
// max(farm[i] lattitude, farm[j] lattitude) - min(farm[i] lattitude, farm[j] lattitude) for distance between lat
// max(farm[i] longitude, farm[j] longitude) - min(farm[i] longitude, farm[j] longitude) for distance between lon
// With this info we can start making graph connections by checking the distances we calculated to see which farms are nearby

// problem with nested for loops
// 1. Farm will check itself when looping with j
// 2. O(n^2) - Slow runtime

for (let i = 0; i < farms.length; i++) {
  for (let j = 0; j < farms.length; j++) {
    if (farms[j][0] == farms[i][0]) {
      continue;
    }

        let dist = geodist({
      lat: farms[i][1][0], lon: farms[i][1][1]
    }, {
      lat: farms[j][1][0], lon: farms[j][1][1]
    })

    // was trying to calculate distance myself, ended up using a library that does this called "geodist"
    // Math.max(farms[i][1][1], farms[j][1][1]) - Math.min(farms[i][1][1], farms[j][1][1]) < 0.1 &&
    // Math.max(farms[i][1][0], farms[j][1][0]) - Math.min(farms[i][1][0], farms[j][1][0]) < 0.1

    if (dist < 5) {
      console.log('nearby farm added')
      graph[farms[i][0]][1].push(farms[j]);
    }
  }
}

fs.writeFile("./farm_graph.json", JSON.stringify(graph, null, 1), (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("File created");
});

// Loop over array of farms
// Looking for farms that are 0.2 points away

// for (let farm of farms) {
//   let closeLat = round(farm[1][1] - 0.2);
//   let closeLon = round(farm[1][0] - 0.2);

//   // let vector = round(closeLat - closeLon)

//   if (latGraph[closeLat]) {
//     latGraph[closeLat][1].push(farm);
//     latGraph[closeLat][1].push(farm);
//   }

//   if (lonGraph[closeLon]) {
//     lonGraph[closeLon][1].push(farm);
//   }
// }
