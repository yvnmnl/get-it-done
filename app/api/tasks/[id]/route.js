import { adminDb } from "@/utils/firebaseAdmin";

export async function PATCH(req, { params }) {
  const { id } = params;
  const { completed } = await req.json();

  await adminDb.collection("tasks").doc(id).update({ completed });

  return new Response("Updated", { status: 200 });
}

export async function DELETE(req, { params }) {
  const { id } = params;

  await adminDb.collection("tasks").doc(id).delete();

  return new Response("Deleted", { status: 200 });
}
