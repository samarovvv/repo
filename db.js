const mongoose = require("mongoose");

// Replace 'mydatabase' with your database name
const mongoURI =
  "mongodb+srv://josifj29:proektsvadba123@proektcluster.fvu25.mongodb.net/?retryWrites=true&w=majority&appName=ProektCluster";

// Connect to MongoDB without deprecated options
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected locally"))
  .catch((err) => console.log(err));
