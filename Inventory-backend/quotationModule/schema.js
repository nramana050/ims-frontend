require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("quotation db connected");
  })
  .catch((err) => {
    console.log(err);
  });

const ProductSchema = new mongoose.Schema({
    itemName: String,
    hsnCode: String,
    quantity: String,
    price: String,
    discount: String,
    size: String,
    amount: String,
    sgst:String,
  cgst:String
});

const quotationSchema = new mongoose.Schema({
    customerName: String,
    mobile: String,
    quotationOrderNo: String,
    quotationOrderDate: String,
    billingAddress:String,
    gstNumber:String,
  
  product: [ProductSchema],
  totalGST:String,
  totalDiscount:String,
  totalAmount:String
});

const quotationModel = mongoose.model("quotation", quotationSchema);

module.exports = quotationModel;