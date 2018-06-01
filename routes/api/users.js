const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// Load User model
const User = require("../../models/User");

// @route   Get api/users/test
// #desc    Tests users route
// @access  Public

router.get("/test", (req, res) => res.json({ msg: "users Works" }));

// @route   Get api/users/register
// #desc    Register user
// @access  Public

router.post("/register", (req, res) => {
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({ email: "email already exists" });
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: 200, // Size
				r: "pg", // Rating
				d: "mm" // Default
			});

			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar,
				password: req.body.password
			});
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
	});
});

// @route   Get api/users/login
// #desc    Login user / Returning  JWT Tocken
// @access  Public
router.post("/login", (req, res) => {
	const { email } = req.body;
	const { password } = req.body;

	// Find user by email
	User.findOne({ email }).then(user => {
		if (!user) {
			return res.status(404).json({ email: "User not found" });
		}

		// Check Password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				res.json({ msg: "Succuss" });
			} else {
				return res.status(400).json({ password: "Password incorrect" });
			}
		});
	});
});
module.exports = router;
