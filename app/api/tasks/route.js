import { adminDb } from "@/utils/firebaseAdmin";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }

  const snapshot = await adminDb
    .collection("tasks")
    .where("userId", "==", userId)
    .get();

  const tasks = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return Response.json(tasks);
}

export async function POST(req) {
  const { text, notes, userId } = await req.json();

  if (!text || !userId) {
    return new Response("Missing fields", { status: 400 });
  }

  const docRef = await adminDb.collection("tasks").add({
    text,
    notes: notes || "",
    userId,
    completed: false,
    createdAt: Date.now(),
  });

  return Response.json({ id: docRef.id });
}
