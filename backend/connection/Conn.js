const mongoose = require('mongoose')

let conn = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify:false
        })
        console.log("Database is Connected")
    }
    catch (err) {
        console.log("No connection");
    }
}
conn();