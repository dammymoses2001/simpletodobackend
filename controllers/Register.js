//const bcrypt = require('bcryptjs');

const Register = (req, res, bcrypt, db) => {
  const { username, email, password } = req.body;
  // console.log(username, email, password);
  // console.log(bcrypt.hashSync(password));
  db.select('*')
    .from('login')
    .where('email', '=', email)
    .then((userdetail) => {
      if (userdetail) {
        res.status(400).json('Username already exist ');

      }
      else {
        var hash = bcrypt.hashSync(password);
        console.log(hash);
        db.transaction((trx) => {
          trx
            .insert({
              email: email,
              hash: hash,
            })
            .into('login')
            .returning('email')
            .then((loginEmail) => {
              return trx('userdetails')
                .returning('*')
                .insert({
                  fullname: username,
                  email: loginEmail[0],
                  datejoined: new Date().toDateString(),
                })
                .then((user) => res.status(200).json(user[0]))
                .catch((err) => {
                  console.log(err)
                  res.status(400).json(err)
                });
            })
            .then(trx.commit)
            .catch(trx.rollback);
        }).catch((err) => {
          console.log(err)
          res.status(400).json(err)
        });
      }

    })
    .catch((err) => res.status(400).json('Wrong Username or Password'));


};
module.exports = Register;
