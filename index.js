import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.jikan.moe/v4/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.post("/results", async (req, res) => {
  try {
    let userGenres = req.body.genres;
    const response = await axios.get(API_URL + "anime", {
      params: {
        sfw: true,
        type: "tv",
        min_score: 8.0,
        genres: userGenres,
        limit: 5,
      },
    });
    const result = response.data;

    console.log(result.data[0].title);

    res.render("index.ejs", {
      shows: result.data,
    });
  } catch (error) {
    console.error("failed to make request:", error.message);
    console.log(error.response);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
