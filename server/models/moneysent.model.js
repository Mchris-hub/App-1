var mongoose = require("mongoose");
var moneySchema = new mongoose.Schema({
    name:String,
    surname:String,
    amount:String,
    date:{
        type:Date,
        default:Date.now,
    }
});
mongoose.model('moneySent', moneySchema);
