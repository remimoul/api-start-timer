const User = require("../model/userModel");
const Timer = require("../model/timerModel");

exports.createATimes = async (req, res) => {
    try {
      await Timer.findById(req.params.user_id);
      const newUser = new Timer({
        ...req.body,
        timer_id: req.params.user_id,
      });
  
      try {
        const Times = await newUser.save();
        res.status(201).json(Times);
      } catch (error) {
        res.status(500).json({ message: "Erreur serveur (db)." });
      }
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur (post inexistant)." });
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