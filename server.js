const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const uploadFolder = "./uploads";
let studentData = [];

if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, "students.xlsx")
});

const upload = multer({ storage });

app.use(express.static("public"));
app.use(express.json());

let isLoggedIn = false;

// Admin Login API
app.post("/login", (req, res) => {
  let data = "";
  req.on("data", chunk => data += chunk);
  req.on("end", () => {
    const { username, password } = JSON.parse(data);
    if (username === "9978524578" && password === "Password") {
      isLoggedIn = true;
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  });
});

// Upload XLSX API
app.post("/upload", upload.single("file"), (req, res) => {
  if (!isLoggedIn) return res.status(403).send("Unauthorized");

  const filePath = path.join(uploadFolder, "students.xlsx");
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  studentData = xlsx.utils.sheet_to_json(sheet, { defval: "" });

  res.redirect("/index.html");
});

// Search student
app.get("/search", (req, res) => {
  const { enroll, ug } = req.query;
  const student = studentData.find(
    s =>
      (s["ENROLLMENT NO."] || "").toString().trim() === enroll ||
      (s["UG Number"] || "").toString().trim() === ug
  );
  res.json(student || {});
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

