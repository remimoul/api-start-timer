const User = require("../model/userModel");
const Timer = require("../model/timerModel");

exports.createATimes = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur inexistant" });
    }


      const newTimer = new Timer({
        ...req.body,
        user_id: user._id,
      });
  
      try {
        const Times = await newTimer.save();
        res.status(201).json(Times);
      } catch (error) {
        res.status(500).json({ message: "Erreur serveur (db)." });
      }
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur (utilisateur inexistant)." });
    }
  };
  

  exports.listAllTimes = async (req, res) => {
    try {
      const times = await Timer.find({});
  
      if (times) { 
        res.status(200);
        res.json(times);
      } else {
        res.status(204);
        console.log(error);
        res.json({ message: "Times not find" });
      }
    } catch (error) {
      res.status(500);
      console.log(error);
      res.json({ message: "Erreur serveur" });
    }
  };