const db = require('./db');


function createTables() {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS food (
        item_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price INT,
        img BLOB,
        item_description TEXT
    );

    CREATE TABLE IF NOT EXISTS users (
        name VARCHAR(255),
        email VARCHAR(255) PRIMARY KEY,
        password VARCHAR(255),
        phone VARCHAR(20)
    );
    CREATE TABLE IF NOT EXISTS cart (
        cart_id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        item_id INT,
        price INT,
        quantity INT
    );


    CREATE TABLE IF NOT EXISTS order_history (
        order_id INT AUTO_INCREMENT PRIMARY KEY,
        user_email VARCHAR(255),
        order_cost INT,
        order_derivered BOOLEAN,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_email) REFERENCES users(email)
            );

   
`;

const queries = createTableQuery.split(';').filter(query => query.trim() !== '');

for (const query of queries) {
    db.query(query, (error) => {
        if (error) {
            console.error('Error creating table:', error);
        } else {
            console.log('Table created successfully');
        }
    });
}

}
// createTables();
module.exports = createTables;
