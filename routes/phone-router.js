const express = require("express");

const Phone = require("../models/phone-model.js");

const router = express.Router();


router.get("/phones", (req, res, next) => {
  Phone.find()
    .sort({ createdAt: -1 }) // newest phone first (reverse order)
    .then(phoneResults => res.json(phoneResults))
    .catch(err => next(err));
});

router.post("/phones", (req, res, next) => {
  const { brand, model, image, specs } = req.body;

  Phone.create({ brand, model, image, specs })
    .then(phoneDoc => res.json(phoneDoc))
    .catch(err => next(err));
});

router.get("/phones/:id", (req, res, next) => {
  const { id } = req.params;
  Phone.findById(id)
    .then(phoneDoc => res.json(phoneDoc))
    .catch(err => next(err));
});

router.delete("/phones/:id", (req, res, next) => {
  const { id } = req.params;
  Phone.findByIdAndRemove(id)
    .then(phoneDoc => res.json(phoneDoc))
    .catch(err => next(err));
});

router.put("/phones/:id", (req, res, next) => {
  const { id } = req.params;
  const { brand, model, image, specs } = req.body;

  Phone.findByIdAndUpdate(
    id,
    { $set: { brand, model, image, specs } },
    // "new" gets the updated version of the document
    { runValidators: true, new: true }
  )
    .then(phoneDoc => res.json(phoneDoc))
    .catch(err => next(err));
});


module.exports = router;
