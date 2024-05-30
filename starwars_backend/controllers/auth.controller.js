const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

// Register a new user
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });

    // Return the token in the response
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get user profile
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update user favorites
exports.updateFavorites = async (req, res) => {
  const {
    favoritePlanets,
    favoritePeople,
    favoriteFilms,
    favoriteSpecies,
    favoriteVehicles,
    favoriteStarships,
  } = req.body;

  try {
    const user = await User.findById(req.user.userId);

    if (favoritePlanets) user.favoritePlanets = favoritePlanets;
    if (favoritePeople) user.favoritePeople = favoritePeople;
    if (favoriteFilms) user.favoriteFilms = favoriteFilms;
    if (favoriteSpecies) user.favoriteSpecies = favoriteSpecies;
    if (favoriteVehicles) user.favoriteVehicles = favoriteVehicles;
    if (favoriteStarships) user.favoriteStarships = favoriteStarships;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
