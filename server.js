const express = require("express");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.render("index", { title: "Dashboard" });
});

app.get("/contribute", (req, res) => {
  res.render("contributeData", {countries: null, cities: null, sources: null, categories: null});
});

app.get("/review", (req, res) => {
  res.render("contributorDashboard");
});

app.get("/others", (req, res) => {
  res.render("contributorLogin");
});

const dashboardApiRouter = require("./routes/dashboard")
app.use("/api/dashboard", dashboardApiRouter)

app.listen(port, () => {
  console.log(`Foodwaste app listening on port ${port}`);
});
