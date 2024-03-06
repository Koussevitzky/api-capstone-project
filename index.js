import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.jikan.moe/v4/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "anime", {
      params: {
        sfw: true,
        type: "tv",
        min_score: 9.0,
        limit: 10,
        order_by: "score",
        sort: "desc",
      },
    });

    const result = response.data;

    res.render("index.ejs", {
      shows: result.data,
    });
  } catch (error) {
    console.error("failed to make request:", error.message);
    // console.log(error.response);
  }
});

app.post("/results", async (req, res) => {
  try {
    let userGenres = req.body.genres;
    if (userGenres != null && userGenres.length > 1) {
      userGenres = userGenres.join(", ");
    }

    const response = await axios.get(API_URL + "anime", {
      params: {
        sfw: true,
        type: "tv",
        min_score: 8.0,
        genres: userGenres,
        limit: 5,
        order_by: "score",
        sort: "desc",
      },
    });

    const result = response.data;

    res.render("index.ejs", {
      shows: result.data,
    });
  } catch (error) {
    console.error("failed to make request:", error.message);
    // console.log(error.response);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
