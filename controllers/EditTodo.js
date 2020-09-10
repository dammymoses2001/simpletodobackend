const EditTodos = (req, res, db) => {
  const { id, categories, todo, date, time, completed } = req.body;
  console.log('editi nah', id, categories, todo, date, time, completed);
  db('todolist')
    .where('id', id)
    .returning('*')
    .update({
      categories: categories,
      todo: todo,
      date: date,
      time: time,
      completed: completed,
    })
    .then((data) => {
      if (data[0].id) {
        return res.json(data[0]);
      }
    })
    .catch((err) => res.status(400).json(err));
};
module.exports = EditTodos;
