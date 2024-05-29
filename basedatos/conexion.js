const mongoose = require("mongoose");

const conexion = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mi_blog");
    console.log(
      "Established a successful connection to the mi_blog database !!!"
    );
  } catch (error) {
    console.log(error);
    throw new Error("Database connection failed");
  }
};

module.exports = {
  conexion
};
