const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./server/database");
const app = express();
const router = express.Router();

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));

router.get("/getAllImages", (req, res) => {
  db.collection("images")
    .find({ position: { $gte: 0 } })
    .toArray()
    .then((images) => {
      return res.json({
        success: true,
        images,
      });
    });
});

app.use("/api", router);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
