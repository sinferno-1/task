const mongoose= require('mongoose')

const eventsTable = mongoose.Schema({
    // createdBy: { type: mongoose.Types.ObjectId, required : true , },
    createdBy: { type: String, required : true , },
    title: { type: String, required: true},
    date: { type: Date, default : Date.now},
    desc: { type: String },
    joinedBy: [ { type: String,} ],
    status: { type: String,
              enum: ['active','cancelled'],
              default: 'active'    
    }
})

module.exports =mongoose.model('eventsTable',eventsTable)