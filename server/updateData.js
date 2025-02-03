const { Client } = require("pg");
const xlsx = require("xlsx");
const fs = require("fs");
const pg = require('pg');
const url = require('url');
require("dotenv").config();

const filePath = "./data/ComparisonSheet.xlsx";
// const filePath = "./data/CustomersDeviceSheet.xlsx";
// const filePath = "./data/ProductsSheet.xlsx";
const workbook = xlsx.readFile(filePath);

const sheets = workbook.SheetNames;

// const client = new Client({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASS,
//     port: process.env.DB_PORT || 5432
// });

const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT || 13051,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('./data/ca.pem').toString()
    },
};

const client = new pg.Client(config);

async function connectAndQuery() {
    client.connect(function (err) {
        if (err)
            throw err;
        client.query("SELECT VERSION()", [], function (err, result) {
            if (err)
                throw err;

            console.log(result.rows[0].version);
            client.end(function (err) {
                if (err)
                    throw err;
            });
        });
    });
}

// const connectionString = process.env.DATABASE_URL;

// const client = new Client({
//     connectionString: connectionString,
// });

async function executeQuery(query, values = []) {
    try {
        await client.connect();
        console.log("Connected to Database ✅");

        const result = await client.query(query, values);
        console.log("✅ Query Executed Successfully!");

        if (result.rows.length > 0) {
            console.log("🔹 Result:", result.rows);
            return result.rows;
        } else {
            console.log("ℹ️ No results to display.");
            return null;
        }

    } catch (error) {
        console.error("❌ Error executing query:", error);
    } finally {
        await client.end();
        console.log("Database connection closed ✅");
    }
}

// executeQuery("SELECT * FROM Users;").then(data => console.log(data));
executeQuery("DROP TABLE IF EXISTS Sheet1;").then(data => console.log(data));