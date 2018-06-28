
var tableName = 'TABLE_NAME';

exports.up = function(knex, Promise) {

    function createTable() {
        return knex.schema.createTableIfNotExists(tableName, function(table){
            table.increments();
            table.string('field1')
            table.timestamps();
        })
    }

    return Promise.all([
        createTable()
    ]);
};

exports.down = function(knex, Promise) {

    function dropTable() {
        return knex.schema.dropTableIfExists(tableName);
    }

    return Promise.all([
        dropTable()
    ]);
  
};
