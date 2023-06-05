const Habbit = require("../models/habbit");
const endOfDay = require("date-fns/endOfDay");
const startOfDay = require("date-fns/startOfDay");
const { name } = require("ejs");

module.exports.home = async function (req, res) {
  // let today = new Date();
  // console.log(startOfDay(today))
  // console.log(endOfDay(today))
  try {
    let habbits = await Habbit.find({}).sort("name");

    return res.render("habbit", {
      title: "Habbit Tracker",
      habbits: habbits,
    });
  } catch (error) {
    console.log(error);
    return res.render("habbit", {
      title: "Habbit Tracker",
      habbits: [],
    });
  }
};

module.exports.detail = async function (req, res) {
  // let today = new Date();
  // console.log(startOfDay(today))
  // console.log(endOfDay(today))
  try {
    let habbits = await Habbit.find({}).sort("name");

    return res.render("detail", {
      title: "Weekly Report",
      habbits: habbits,
    });
  } catch (error) {
    console.log(error);
    return res.render("detail", {
      title: "Weekly Report",
      habbits: [],
    });
  }
};

// create new habbit
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
      data: {
        habbit: habbit,
      },
      message: "Habbit Added Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Habbit could not be Added",
    });
  }
};

// Update the status of habbit of a particular date
module.exports.updateDateStatus = async function (req, res) {
  try {
    let checkDate = req.body.checkDate;
    let status = req.body.status;
    let habbit = await Habbit.findById(req.body.habbit_id);
    // Finding in the array if a record with the date already exists
    let index = habbit.tracks.findIndex((track) => track.date == checkDate);
    // If the record already exists, update the status
    if (index != -1) {
      habbit.tracks[index].status = status;
      habbit.save();
    } else {    // If tno record with the given date exists, create a new record and push to the habbit's records
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

module.exports.delete = async function (req, res) {
  try {
    let habbit = await Habbit.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Habbit Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Habbit could not be Deleted",
    });
  }
};
