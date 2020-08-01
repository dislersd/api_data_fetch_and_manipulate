const fs = require("fs");
const axios = require("axios");

const apiURL = "https://data.ct.gov/resource/y6p2-px98.json?category=Fruit&item=Peaches";

const getData = async (url) => {
  try {
    // data will be in response.data so we can destructure using -> {data} = await axios.get()
    let { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(error);
  }
};

getData(apiURL)
  .then((data) =>
    fs.writeFile("./data_from_api.json", JSON.stringify(data, null, 4), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File created");
    })
  )
  .catch((err) => console.error(err));