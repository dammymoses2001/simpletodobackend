const index = (req, res, db) => {
  const { email } = req.body;
  // console.log('email', email);
  // if (email) {
  db.select('*')
    .from('todolist')
    .where('email', '=', email)
    .orderBy('id')
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
  // } else {
  //   res.status(400).json('oops Something went wrong');
  // }
};

module.exports = index;
