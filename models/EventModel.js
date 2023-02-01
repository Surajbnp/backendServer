const mongoose = require('mongoose')

const modelSchema = mongoose.Schema({
    name : {type : String, required : true},
    startTime : {type : String, required : true},
    endTime : {type : String, required : true},
    startDate : {type : String, required : true},
    endDate : {type : String, required : true},
    city : {type : String, required : true},
    category : {type : String, required : true},
    banner : {type : String},
    description : {type : String, required : true}
})

const EventModel = mongoose.model('event', modelSchema)

module.exports = EventModel;