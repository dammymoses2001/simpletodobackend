const DeleteTodo = (req, res, db) => {
  const { id } = req.body;
  console.log(id);
  db('todolist')
    .returning('*')
    .where('id', id)
    .del()
    .then((data) => {
      if (data[0].id) {
        return res.json(data[0]);
      }
      return res.statu(400).json('sorry request not found');
    })
    .catch((err) => res.status(400).send('sorry request not found'));
};

module.exports = DeleteTodo;
