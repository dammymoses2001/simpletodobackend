const AddTodos = (req, res, db) => {
  const { categories, email, todo, date, time, completed } = req.body;
  console.log(categories, email, todo, date, time, completed);
  db('todolist')
    .returning('*')
    .insert({
      categories: categories,
      todo: todo,
      date: date,
      time: time,
      email: email,
      completed: completed,
    })
    .then((data) => res.json(data[0]))
    .catch((err) => console.log(err));
};

module.exports = AddTodos;
