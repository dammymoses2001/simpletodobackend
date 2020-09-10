const Login = (req, res, bcrypt, db) => {
  const { email, password } = req.body;
  console.log(email, password);
  db.select('*')
    .from('login')
    .where('email', '=', email)
    .then((userdetail) => {
      const validatepassword = bcrypt.compareSync(password, userdetail[0].hash);
      console.log(validatepassword);
      if (validatepassword) {
        db.select('*')
          .from('userdetails')
          .where('email', '=', email)
          .then((userdetail) => res.json(userdetail[0]))
          .catch((err) => res.status(400).json('Wrong Username or Password'));
      } else {
        res.status(400).json('wrong1');
      }
    })
    .catch((err) => res.status(400).json('Wrong Username or Password'));
};

module.exports = Login;
