import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const key = "1";
const config = {
    headers: { Authorization: `Bearer ${key}` },
};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/random-cocktail", async (req, res) => {
    try {
        const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php", config);
        const drink = result.data.drinks[0];
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
            const ingredient = drink[`strIngredient${i}`];
            const measure = drink[`strMeasure${i}`];
            if (ingredient) {
                ingredients.push(measure ? `${measure} ${ingredient}` : ingredient);
            }
        }
        res.render("index.ejs", {
            name: drink.strDrink,
            recipe: ingredients,
        });
    } catch (error) {
        res.status(404).send(error.message);
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

