import { store } from "../app";

export const guildStore = () => store.collection("guilds");

export const countGuilds = () => guildStore().count().get();

export const listGuilds = () =>
  guildStore()
    .listDocuments()
    .then((refs) => store.getAll(...refs))
    .then((docs) => docs.map((d) => d.data()));

export async function trackGuilds(guilds = []) {
  for (const { id, name, icon, features } of guilds) {
    const idRef = guildStore().doc(id);

    if (!(await idRef.get()).data()) {
      await idRef.create({ id, name, icon, features });
    } else {
      await idRef.create({ id, name, icon, features });
    }
  }
}
