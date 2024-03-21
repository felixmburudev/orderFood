const db = require('./db');


async function createTables() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS cart (
                cart_id VARCHAR(255) PRIMARY KEY,
                email VARCHAR(255),
                item_id INT,
                price INT,
                quantity INT
            )
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS food (
                item_id INT PRIMARY KEY,
                name VARCHAR(255),
                price INT,
                img BLOB,
                item_description TEXT
            )
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                name VARCHAR(255),
                email VARCHAR(255) PRIMARY KEY,
                password VARCHAR(255),
                phone VARCHAR(20)
            )
        `);
        await db.query(`
        CREATE TABLE IF NOT EXISTS ordered_history (
            order_id INT AUTO_INCREMENT PRIMARY KEY,
            user_email VARCHAR(255),
            item_id INT,
            order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_email) REFERENCES users(email),
            FOREIGN KEY (item_id) REFERENCES food(item_id)
        )
    `);


        console.log('Tables created successfully.');
    } catch (error) {
        console.error('Error creating tables:', error);
    } finally {
        db.end(); 
    }
}

createTables();
