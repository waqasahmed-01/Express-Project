const Joi = require('joi');
const express = require('express');
const router = express.Router();

const subjects = [
  { id: 1, name: 'Formal Languages' },
  { id: 2, name: 'Data Structures' },
  { id: 3, name: 'Software Development' },
  { id: 4, name: 'Object Oriented Programming' },
];

router.get('/', (req, res) => {
  res.send(subjects);
});

//Route Parameters.
//Get or Read.
router.get('/:id', function (req, res) {
  const subject = subjects.find((find) => find.id === parseInt(req.params.id));
  if (subject) {
    res.send(subject);
  } else {
    res.status(404);
    res.send('Subject with givin ID not exists');
  }
});

//Post or Create.
router.post('/', function (req, res) {
  //Joi.
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const subject = {
    id: subjects.length + 1,
    name: req.body.name,
  };

  subjects.push(subject);
  res.send(subject);
});

//Put or Update.
router.put('/:id', (req, res) => {
  const subject = subjects.find(
    (subject) => subject.id === parseInt(req.params.id)
  );

  if (!subject) {
    res.status(404).send('Resource Not Found');
    return;
  }

  //Validating Input.

  const schema = {
    name: Joi.string().min(5).required(),
  };

  const validateResult = Joi.validate(req.body, schema);

  if (validateResult.error) {
    res.status(400).send(validateResult.error);
    return;
  }

  //Updation.

  subject.name = req.body.name;
  res.send(subject);
});

//Deletion.

router.delete('/:id', function (req, res) {
  const subject = subjects.find(
    (subject) => subject.id === parseInt(req.params.id)
  );
  if (!subject) {
    res.status(404).send('Givin ID does not exists');
    return;
  }
  // Delete Resource.
  const index = subjects.indexOf(subject);
  subjects.splice(index, 1);

  //Return Res.
  res.send('Operation was successfull');
});

module.exports = router;
