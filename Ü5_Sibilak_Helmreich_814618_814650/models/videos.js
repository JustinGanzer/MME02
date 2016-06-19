var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
    _id: false,
    title: {type: String, required: true},
    description: {type: String, default: ""},
    src: {type: String, required: true},
    length: {type: Number, required: true},
    timestamps: {createdAt: "timestamp", default: Date.now},
    playcount: {type: Number, default: 0},
    ranking: {type: Number, default: 0}
});

module.exports = mongoose.model("Video", VideoSchema);