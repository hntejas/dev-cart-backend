const corsOptions = {
  origin: 'http://localhost:3000/',
  optionsSuccessStatus: 200
}

const mongoURL = "mongodb+srv://devCartUser:" + process.env['devCartMongoPassword'] + "@cluster0.593en.mongodb.net/inventory";

module.exports.corsOptions = corsOptions;
module.exports.mongoURL = mongoURL;