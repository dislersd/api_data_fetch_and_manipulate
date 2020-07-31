const fs = require("fs");
const https = require("https");
// const axios = require("axios");

const apiURL = "https://data.ct.gov/resource/y6p2-px98.json?category=Fruit&item=Peaches";

const apiToJSON = (url) => {
  let data = "";
  https
    .get(url, (resp) => {
      resp.on("data", (chunk) => {
        // data you've recieved + the new chunk
        data += chunk;
      });

      resp.on("end", () => {
        // JSON.parse converts a json string into an object.
        let parsedData = JSON.parse(data);
        // take the JSON string and write a file with it ()
        fs.writeFile("./data_from_api.json", JSON.stringify(parsedData, null, 4), (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("File created");
        });
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

apiToJSON(apiURL);






// ==============
// AXIOS VERSION
// ==============

// cleaner but uses a library

// const getData = async (url) => {
//   try {
      // data will be in response.data so we can destructure using -> {data} = axios.get()
//     let { data } = await axios.get(url);
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// getData(url)
//   .then((data) =>
//     fs.writeFile("./data3.json", JSON.stringify(data, null, 4), (err) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       console.log("File created");
//     })
//   )
//   .catch((err) => console.error(err));