const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favoritePlanets: [{ type: String }],
  favoritePeople: [{ type: String }],
  favoriteFilms: [{ type: String }],
  favoriteSpecies: [{ type: String }],
  favoriteVehicles: [{ type: String }],
  favoriteStarships: [{ type: String }],
});

module.exports = mongoose.model('User', UserSchema);
