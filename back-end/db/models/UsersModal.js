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
    "portfolio": {
        "type": {
            "stock_code": {
                "type": "String",
                "required": "true"
            },
            "amount": {
                "type": "Number",
                "required": "true"
            }
        }
    },
     "investment":[],
    "investment_visibility": {
        "type": "Boolean",
        "required": "true"
    },
    "profile_visibility": {
        "type": "Boolean",
        "required": "true"
    },
    "feeds": {
        "type": "Array",
        "required": "true"
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
    "friendRequests": [],
    "total_profit": {
        "type": "String",
        "default": "$0"
    },
    "total_invested": {
        "type": "String",
        "default": "+0"
    },
    "investment_visibility": {
        "type": "Boolean",
        "default": "true"
    },
    "profile_visibility": {
        "type": "Boolean",
        "default": "false"
    }
})

const UsersModel = mongoose.model("Users", UsersSchema)

module.exports = UsersModel