// models/MigrationModel.js
const mongoose = require('mongoose');

const MigrationSchema = new mongoose.Schema({
  migrationName: {
    type: String,
    required: true,
    unique: true,
  },
  dateApplied: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Migration', MigrationSchema);
