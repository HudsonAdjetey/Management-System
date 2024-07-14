const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      return callback(null, true);
    } else {
      callback(new Error("Origin not allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  preflightContinue: false,
  // some legacy browsers (IE11, various versions of Android) choke on 204 /* TODO: Note that */
  optionsSuccessStatus: 204,
};
module.exports = corsOptions;
