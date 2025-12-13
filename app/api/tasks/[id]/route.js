import { adminDb } from "@/utils/firebaseAdmin";

export async function PATCH(req, context) {
  const { id } = await context.params;
  const { completed } = await req.json();

  await adminDb.collection("tasks").doc(id).update({ completed });

  return new Response("Updated", { status: 200 });
}

export async function DELETE(req, context) {
  const { id } = await context.params;

  await adminDb.collection("tasks").doc(id).delete();

  return new Response("Deleted", { status: 200 });
}
