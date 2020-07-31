# Fetching Data

There are two main files here 
- `index.js` that fetches data using Nodes built in https.get method and then uses the file system module to write the response to a JSON file
- `createGraph.js` takes the JSON file and creates connections between the farms based on distance between lat and lon points and then writes another JSON file with this data called farm_graph.json

data is fetched from this url: "https://data.ct.gov/resource/y6p2-px98.json?category=Fruit&item=Peaches" 
<br>
<br>
(I know this is kind of random it's a list of peach farms in Conetticut but I saw each farm had lat and lon coordinate points which I used to make connections between each farm)

I use the [geodist library](https://www.npmjs.com/package/geodist) to determine distance between farms

use is like this

```
const geodist = require('geodist')

const dist = geodist({lat: 41.85, lon: -87.65}, {lat: 33.7489, lon: -84.3881})
console.log(dist)           
// => 587
```

graph looks like this
```javascript
{
  "Farm Number One": [
    {
      lat: number,
      lon: number,
    },
    // array of farms that are within 5 miles
    [
      ["Farm Number Three", [41.63, -72.85], "860-841-8898"],
      ["Farm Number Five", [41.64, -72.84], "860-229-4240"],
      ["Farm Number Ten", [41.59, -72.76], "860-828-5548"]
    ],
    "phone number"
  ],
  "Farm Number Two" [
    // data about this farm, and it's nearby farms
  ]
}
```
