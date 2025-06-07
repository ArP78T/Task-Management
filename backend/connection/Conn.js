const mongoose = require('mongoose')

let conn = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log("Database is Connected")
    }
    catch (err) {
        console.log(err);
    }
}
conn();