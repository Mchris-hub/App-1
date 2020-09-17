var mongoose=require("mongoose");
var withdrawalsSchema=new mongoose.Schema({
    date:{
        type:Date,
        default:Date.now,
    },
    amount:String
});
mongoose.model('withdrawals', withdrawalsSchema);