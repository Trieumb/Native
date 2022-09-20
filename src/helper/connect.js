const {MongoClient, ServerApiVersion} = require ('mongodb');
const db = {};

function constructURI () {
  const DB_PREFIX = 'mongodb+srv://';
  const DB_SUFFIX = '?retryWrites=true&w=majority';
  const DB_USERNAME = process.env.DB_USERNAME;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const DB_HOST = process.env.DB_HOST;
  return 'mongodb+srv://trieu-native:oqa5816Qj8bD85Lj@trieu-native.tyiygqc.mongodb.net/?retryWrites=true&w=majority';
}

function connectDB () {
  return new Promise ((resolve, reject) => {
    const uri = constructURI ();
    console.log (uri);
    const client = new MongoClient (uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });
    const DB_NAME = 'RN21TC';
    client.connect (err => {
      if (err) {
        console.log ('FUCKING err');
        console.log (err);
        reject (err);
        client.close ();
      }
      console.log ('connection to db...');
      db.db = client.db (DB_NAME);
      resolve (client);
    });
  });
}

module.exports = {connectDB: connectDB, db: db};
// mongodb+srv://mindx-sonlh-56:IUt6SsFX7ZmeXlyw@mymongodb-sonlh.rosho.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://mindx-sonlh-56:IUt6SsFX7ZmeXlyw@mymongodb-sonlh.rosho.mongodb.net/?retryWrites=true&w=majority
