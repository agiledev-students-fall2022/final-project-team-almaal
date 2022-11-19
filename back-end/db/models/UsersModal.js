const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    "gender": {
        "type": "String"
    },
    "name": {
        "title": {
            "type": "String"
        },
        "first": {
            "type": "String"
        },
        "last": {
            "type": "String"
        }
    },
    "email": {
        "type": "String"
    },
    "login": {
        "uuid": {
            "type": "String"
        },
        "username": {
            "type": "String"
        },
        "password": {
            "type": "String"
        },
        "salt": {
            "type": "String"
        },
        "md5": {
            "type": "String"
        },
        "sha1": {
            "type": "String"
        },
        "sha256": {
            "type": "String"
        }
    },
    "dob": {
        "date": {
            "type": "Date"
        },
        "age": {
            "type": "Number"
        }
    },
    "registered": {
        "date": {
            "type": "Date"
        },
        "age": {
            "type": "Number"
        }
    },
    "picture": {
        "large": {
            "type": "String"
        },
        "medium": {
            "type": "String"
        },
        "thumbnail": {
            "type": "String"
        }
    },
    "friends": [],
    "incomingReuests": []
})

const UsersModel = mongoose.model("Users", UsersSchema)

module.exports = UsersModel