var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
    //_id: {type: String, required:true},
    title: {type: String, required: true},
    description: {type: String, default: ""},
    src: {type: String, required: true},
    length: {type: Number, required: true},
    playcount: {type: Number, default: 0, min:0},
    ranking: {type: Number, default: 0, min:0}
},{
    timestamps: {createdAt: "timestamp"}
});

module.exports = mongoose.model("Video", VideoSchema);