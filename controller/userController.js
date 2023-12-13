const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require('validator');

// exports.listAllUsers = async (req, res) => {

//   try {
//     const users = await User.find({});
//     res.status(200);
//     res.json(users);
//   } catch (error) {
//     res.status(500);
//     console.log(error);
//     res.json({ message: "Erreur serveur" });
//   }
// };

exports.userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
      return;
    }

    const userData = {
      id: user._id,
      email: user.email,
      role: true,
    };
    const token = jwt.sign(userData, process.env.JWT_KEY, {
      expiresIn: "10h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Une erreur s'est produite lors de la connexion" });
  }
};

exports.createAUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });
  let user = await newUser.save();
  res.status(201).json(user);
  }catch (error){
    console.error(error);
    res.status(401).json({message : "requete invalide"});
  }
};


exports.updateUser = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Vérifie que l'email est valide
    const isValidEmail = validator.isEmail(req.body.email);
    if (!isValidEmail) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const user = await User.findByIdAndUpdate(req.params.id_user, req.body, {
      new: true,
    });

    if (!user) {
      res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }else{
      res.status(200).json({message: `Utilisateur modifié : ${user.email}`});
    }

    res.status(200);
    res.json(user);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ message: "Erreur serveur" });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.body.email });
    if (user) {
      res.status(200).json({ message: `Utilisateur supprimé : ${user.email}` });
    } else {
      res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la suppression de l'utilisateur",
    });
  }
};
