var mongoose=require("mongoose");
var moneyReceivedSchema=new mongoose.Schema({
    name:String,
    surname:String,
    amount:String,
    date:{
        type:Date,
        default:Date.now,
    }
})
mongoose.model('moneyReceived', moneyReceivedSchema);