const Habbit = require("../../models/habbit");

module.exports.index = async (req, res) => {
  try {
    let habbits = await Habbit.find({}).sort("name");
    return res.status(200).json({
      data: habbits,
      message: "Habbits fetched Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch Habbits",
    });
  }
};

module.exports.detail = async function (req, res) {
    try {
      let habbits = await Habbit.find({}).sort("name");
  
      return res.status(200).json({
        data: habbits,
        message: "Weekly Report fetched Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Failed to fetch Weekly Report",
      });
    }
  };

module.exports.create = async function (req, res) {
    try {
      let habbit = await Habbit.find({name: req.body.name});
      if(habbit.length){
        return res.status(400).json({
          message: "Habbit Already Exists",
        });
      }
  
      habbit = await Habbit.create({
        name: req.body.name,
      });
  
      return res.status(200).json({
        data: habbit,
        message: "Habbit Added Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Habbit could not be Added",
      });
    }
  };

  module.exports.updateDateStatus = async function (req, res) {
    try {
      let checkDate = req.body.checkDate;
      let status = req.body.status;
      let habbit = await Habbit.findById(req.body.habbit_id);
      let index = habbit.tracks.findIndex((track) => track.date == checkDate);
      if (index != -1) {
        habbit.tracks[index].status = status;
        habbit.save();
      } else {    
        let track = {
          date: checkDate,
          status: status,
        };
        habbit.tracks.push(track);
        habbit.save();
      }
  
      return res.status(200).json({
        message: "Habbit Status Updated Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Habbit could not be Updated",
      });
    }
  };