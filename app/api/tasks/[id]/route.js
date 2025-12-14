import { adminDb } from "@/utils/firebaseAdmin";

export async function PATCH(req, context) {
  const { id } = await context.params;
  const body = await req.json();

  const updateData = {};
  if ('completed' in body) updateData.completed = body.completed;
  if ('text' in body) updateData.text = body.text;
  if ('notes' in body) updateData.notes = body.notes;

  await adminDb.collection("tasks").doc(id).update(updateData);
  return new Response("Updated", { status: 200 });
}

export async function DELETE(req, context) {
  const { id } = await context.params;

  await adminDb.collection("tasks").doc(id).delete();

  return new Response("Deleted", { status: 200 });
}
