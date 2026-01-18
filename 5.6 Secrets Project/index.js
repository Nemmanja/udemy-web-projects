import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourBearerToken = "2b5b1668-9206-4694-9223-2ef7c07b756a";
const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get("https://secrets-api.appbrewery.com/random");
        res.render("index.ejs", {
            secret: result.data.secret,
            user: result.data.username,
    });
    } catch (error) {
        res.status(404).send(error.message);
    };
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});