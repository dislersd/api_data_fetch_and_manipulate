# Fetching Data

There are two main files here 
- `index.js` that fetches data using axios and then uses the file system module to write the response to a JSON file. The JSON file is called [data_from_api.json](https://github.com/dislersd/api_data_fetch_and_manipulate/blob/master/data_from_api.json)
- `createGraph.js` takes the JSON file and creates connections between the farms based on distance between lat and lon points and then writes another JSON file with this data called [farm_graph.json](https://github.com/dislersd/api_data_fetch_and_manipulate/blob/master/farm_graph.json)

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
  // each farm is a vertex
  "Farm Number One": {
    phone: "phone number",
    // array of farms that are within 5 miles
    // this is creating edges between farms
    closeFarms: [
      ["Farm Number Three"],
      ["Farm Number Five"],
      ["Farm Number Ten"]
    ]
  },
    "Farm Number Two": {
    phone: "phone number",
    closeFarms: [
      ["Farm Number Six"],
      ["Farm Number Five"],
      ["Farm Number Thirteen"],
      ["Farm Number Four"]
    ]
  }
}
```
