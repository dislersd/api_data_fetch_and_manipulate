# Fetching Data

There are two main files here 
- `index.js` that fetches data using Nodes built in https.get method and then uses the file system module to write the response to a JSON file
- `createGraph.js` takes the JSON file and creates connections between the farms based on distance between lat and lon points

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
