exports.ip = process.env.IP || "0.0.0.0";
exports.port = process.env.PORT || 3000;
exports.dbUrl = exports.ip + ":27017/haul";