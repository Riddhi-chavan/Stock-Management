import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const uri = "mongodb+srv://riddhic164:riddhichavan@cluster0.9azx0hh.mongodb.net/";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db('stock');
    const inventory = database.collection('inventory');

    const query = {};
    const products = await inventory.find(query).toArray();

    console.log(products);
    return NextResponse.json({  products , ok :true });
  } finally {
    await client.close();
  }
}

export async function POST(request) {
  let body =  await request.json();
  console.log(body);
  const uri = "mongodb+srv://riddhic164:riddhichavan@cluster0.9azx0hh.mongodb.net/";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db('stock');
    const inventory = database.collection('inventory');

    const product = await inventory.insertOne(body);

    console.log(  "this is product",product);
    return NextResponse.json({ product, ok: true });
  } finally {
    await client.close();
  }
}

