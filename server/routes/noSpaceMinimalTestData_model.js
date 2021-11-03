//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var noSpaceMinimalTestDataSchema = new Schema({
        _id: mongoose.Schema.Types.ObjectId,
        "LatinName": { type: String },
        "CommonName": { type: String },
        "Habit": { type: String },
        "Height": { type: String },
        "Hardiness0": { type: String },
        "Hardiness1": { type: String },
        "Hardiness2": { type: String },
        "Hardiness3": { type: String },
        "Hardiness4": { type: String },
        "Hardiness5": { type: String },
        "Hardiness6": { type: String },
        "Hardiness7": { type: String },
        "Hardiness8": { type: String },
        "Hardiness9": { type: String },
        "Hardiness10": { type: String },
        "Hardiness11": { type: String },
        "Hardiness12": { type: String },
        "Growth": { type: String },
        "SoilLight": { type: String },
        "SoilMedium": { type: String },
        "SoilHeavy": { type: String },
        "ShadeFull": { type: String },
        "ShadeSemi": { type: String },
        "ShadeNone": { type: String },
        "MoistureDry": { type: String },
        "MoistureMoist": { type: String },
        "MoistureWet": { type: String },
        "MoistureWater": { type: String },
        "PHAcid": { type: String },
        "PHNeutral": { type: String },
        "PHBasicAlkaline": { type: String },
        "FloweringJan": { type: String },
        "FloweringFeb": { type: String },
        "FloweringMarch": { type: String },
        "FloweringApril": { type: String },
        "FloweringMay": { type: String },
        "FloweringJune": { type: String },
        "FloweringJuly": { type: String },
        "FloweringAugust": { type: String },
        "FloweringSept": { type: String },
        "FloweringOct": { type: String },
        "FloweringNov": { type: String },
        "FloweringDec": { type: String },
        "Native": { type: String },
        "Pathname": { type: String },
        "Name": { type: String },
        "Username": { type: String },
        "Copyright": { type: String },
        "Link": { type: String }
});

module.exports = mongoose.model("noSpaceMinimalTestData", noSpaceMinimalTestDataSchema, "noSpaceMinimalTestData");