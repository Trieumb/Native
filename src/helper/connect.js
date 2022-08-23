
const { MongoClient, ServerApiVersion } = require('mongodb');

function constructURI() {
    const DB_PREFIX = 'mongodb+srv://'
    const DB_SUFFIX = '?retryWrites=true&w=majority'
    const DB_USERNAME = process.env.DB_USERNAME
    const DB_PASSWORD = process.env.DB_PASSWORD
    const DB_HOST = process.env.DB_HOST
    return `${DB_PREFIX}${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_SUFFIX}`
}

function connectDB() {
    return new Promise((resolve, reject) => {
        const uri = constructURI()
        console.log(uri)
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        const DB_NAME = process.env.DB_NAME
        client.connect(err => {
            if (err) {
                console.log("FUCKING err")
                console.log(err)
                reject(err)
                client.close()
            }
            resolve(client.db(DB_NAME))
        });

    })
}

module.exports = { connectDB }
// mongodb+srv://mindx-sonlh-56:IUt6SsFX7ZmeXlyw@mymongodb-sonlh.rosho.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://mindx-sonlh-56:IUt6SsFX7ZmeXlyw@mymongodb-sonlh.rosho.mongodb.net/?retryWrites=true&w=majority
