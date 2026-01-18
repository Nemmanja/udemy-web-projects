import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "conetata";
const yourPassword = "Laki2020";
const yourAPIKey = "c19b869a-7311-4302-a5e2-c1d999c57151";
const yourBearerToken = "2b5b1668-9206-4694-9223-2ef7c07b756a";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const result = await axios.get("https://bored-api.appbrewery.com/random");
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
    };
  });

app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
    }
});

app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(`https://bored-api.appbrewery.com/filter?emScore=5&${yourAPIKey}`);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
    };
});

app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get(`https://bored-api.appbrewery.com/secrets/42`, {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
    };
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});