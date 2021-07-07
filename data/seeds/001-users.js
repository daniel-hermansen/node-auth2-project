exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, colName: 'User 1'},
        {id: 2, colName: 'User 2'},
        {id: 3, colName: 'User 3'}
      ]);
    });
};
