const path       =    require('path'),
      express    =    require('express');
      bodyParser =    require('body-parser'),
      mongoose   =    require('mongoose');

const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/user');

const app = express();

let cors = require('cors')
app.use(cors());

mongoose.connect(
  "mongodb+srv://aang:" + process.env.MONGO_ATLAS_PW + "@cluster0.hrf19.mongodb.net/angular-blog-app?retryWrites=true&w=majority", { useUnifiedTopology: true })
    .then(() => {
    console.log("Connected To The DataBase");
  })
  .catch((error) => {
    console.log("DisConnected From The DataBase");
    console.log(error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

// app.use( (req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers",  "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.setHeader("Access-Control-Allow-Methods", "HEAD", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
//   next();
// });

app.use("/api/posts", postRoutes);
app.use("/api/user", authRoutes);

module.exports = app;
