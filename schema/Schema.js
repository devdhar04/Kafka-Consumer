
const mongoose = require('mongoose');

const CPUSchema = new mongoose.Schema({
  clientId: { type: String, required: true },
  groupId:  {type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  cpuUsage: { type: Number, required: true },
  // Other optional fields such as ipAddress, hardware, etc.
});

module.exports = mongoose.model('CPUData', CPUSchema);


