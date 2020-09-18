
const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({


    city: {
        type: String,
    },
    state_id: {
        type: String,
    },
    state_name: {
        type: String,
    },
    county_name: {
        type: String,
    },
    lat: {
        type: String,
    },
    lng: {
        type: String,
    },
    timezone: {
        type: String,
    },
    zips: {
        type: Array,
    },

});


const City = mongoose.model("City", citySchema);

module.exports = City;
