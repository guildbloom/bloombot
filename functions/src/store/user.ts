import { store } from "../app";

export const userStore = () => store.collection("users");

export const countUser = () => userStore().count().get();

export const listUsers = () =>
  userStore()
    .listDocuments()
    .then((refs) => store.getAll(...refs))
    .then((docs) => docs.map((d) => d.data()));

export async function trackUser({ id, ...user }) {
  const idRef = userStore().doc(id);

  if (!(await idRef.get()).data()) {
    await idRef.create({ id, ...user });
  } else {
    await idRef.update({ id, ...user });
  }
}
