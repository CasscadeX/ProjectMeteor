const mongoose = require('mongoose')
const config = require('config')

mongoose.set('useFindAndModify', false);

const URI = config.get('mongoURI')

//DB connection
const connectDB = async () =>{
    try {
        await mongoose.connect(URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log("DB connected")
    }catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = connectDB