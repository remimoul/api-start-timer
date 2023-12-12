const User = require("../model/userModel");

exports.listAllUsers = async (req, res) => {

  try {
    const users = await User.find({});
    res.status(200);
    res.json(users);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ message: "Erreur serveur" });
  }
};


exports.createAUser = async (req, res) => {
  try {
  let newUser = new User(req.body);
  let user = await newUser.save();
  res.status(201).json(user);
  }catch (error){
    console.error(error);
    res.status(401).json({message : "requete invalide"});
  }
};


exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id_user, req.body, {
      new: true,
    });
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
    await User.findByIdAndDelete(req.params.id_user);
    res.status(200);
    res.json({ message: "Utilisateur supprimer" });
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ message: "Erreur serveur" });
  }
};
