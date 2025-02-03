import { NextRequest, NextResponse } from "next/server";
import { Client } from "pg";
import fs from "fs";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const table = searchParams.get("table");

    if (!table) {
        return NextResponse.json({ error: "Table name is required" }, { status: 400 });
    }

    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: Number(process.env.DB_PORT),
        ssl: {
            rejectUnauthorized: true,
            ca: fs.readFileSync("public/ca.pem").toString(),
        },
    });

    try {
        await client.connect();

        const validTables = ["sheet1", "sheet2", "sheet3"];
        if (!validTables.includes(table)) {
            return NextResponse.json({ error: "Invalid table name" }, { status: 400 });
        }

        const result = await client.query(`SELECT * FROM "${table}"`);
        await client.end();

        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ error: "Database error", details: error }, { status: 500 });
    }
}
