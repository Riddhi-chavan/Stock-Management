// Route page (e.g., /pages/api/action.js)
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { action, slug, initialquantity } = await request.json();
  const uri = "mongodb+srv://riddhic164:riddhichavan@cluster0.9azx0hh.mongodb.net/";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    const database = client.db('stock');
    const inventory = database.collection('inventory');
    const filter = { slug: slug };

    if (action === "delete") {
      // Handle deletion
      const result = await inventory.deleteOne(filter);

      console.log(`${result.deletedCount} document(s) deleted`);

      // You can send a response back if needed
      return new NextResponse({
        body: { success: true },
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      // Handle other actions (e.g., plus/minus)
      let newquantity = action === "plus" ? (parseInt(initialquantity) + 1) : (parseInt(initialquantity) - 1);
      newquantity = Math.max(1, newquantity);

      const updateDoc = {
        $set: {
          quantity: newquantity
        },
      };

      // Update the first document that matches the filter
      const result = await inventory.updateOne(filter, updateDoc, {});

      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
      );

      // You can send a response back if needed
      return new NextResponse({
        body: { success: true },
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } finally {
    // Close the connection after the operation completes
    await client.close();
  }
}
