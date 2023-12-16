const express = require("express");
const session = require('express-session')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config();

const { findOneContributorLoginById } = require('./database/contributroDao')
const { authorizeContrubutor } = require('./middlewares/authorize')


const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET_KEY, maxAge: 60000, resave: false, saveUninitialized: true, }))
app.use(cookieParser())

app.get("/", async (req, res) => {
  res.render("index", { title: "Dashboard" });
});

app.get("/login", (req, res) => {
  let error = req.session?.error
  req.session.error = undefined
  res.render("contributorLogin", { title: "Please Login", error: error });
});

app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    console.log("Error occured during destroying session")
  })

  res.redirect('/')
})

app.post('/login', async (req, res) => {
  let contributorId = req.body.contributorId
  let password = req.body.password
  if (!contributorId || !password) {
    req.session.error = 'Id and password must not be blank'
    res.redirect('/login')
  } else {
    let contributor = await findOneContributorLoginById(contributorId);

    if (!contributor) {
      req.session.error = "No contributor found with proivded id!"
      res.redirect('/login')
      return
    }

    if (password != contributor.password) {
      req.session.error = "Id or password mismatch"
      res.redirect('/login')
      return
    }

    req.session.contributor = contributor
    res.redirect('/contribute/dashboard')
  }
})


const contributeRouter = require("./routes/contribute")
app.use('/contribute', authorizeContrubutor, contributeRouter)


app.get("/others", (req, res) => {
  res.render("others");
});

const dashboardApiRouter = require("./routes/dashboard")
app.use("/api/dashboard", dashboardApiRouter)

const cityApiRouter = require("./routes/city")
app.use("/api/cities", cityApiRouter)

const sourceApiRouter = require("./routes/source")
app.use("/api/sources", sourceApiRouter)

app.listen(port, () => {
  console.log(`Foodwaste app listening on port ${port}`);
});
