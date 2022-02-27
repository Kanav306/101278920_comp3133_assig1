const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({


    username: {
        type: String,
        required: true,
        unique: true, 
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
   
    password: {
        type: String,
        required: true,
        minlength: 6,
        match: [/^[a-zA-Z0-9\#\$\&\_]+$/, ]
    },
  
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, ]
    },
   
    type: {
        type: String,
        enum: ['admin', 'customer'],
        required: true
    }

})

let User = mongoose.model('User', UserSchema)
module.exports = User