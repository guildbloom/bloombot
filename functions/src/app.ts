import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

import { defineSecret } from "firebase-functions/params";
import { SecretParam } from "firebase-functions/lib/params/types";
import { setGlobalOptions } from "firebase-functions/v2/options";

setGlobalOptions({ maxInstances: 10 });

const localServiceAccount = import.meta.env.FUNC_SERVICE_ACCOUNT === "LOCAL";

export const app = initializeApp(
  localServiceAccount
    ? {
        credential: credential.cert(
          require("../../.key/serviceAccountKey.json")
        ),
      }
    : undefined
);

export const auth = getAuth(app);
export const store = getFirestore(app);

const devCallback = import.meta.env.FUNC_CALLBACK_URL;
const devCallbackValue: SecretParam = {
  name: "DISCORD_CALLBACK_URL",
  value: () => devCallback,
};

export const DISCORD_BOT_TOKEN = defineSecret("DISCORD_BOT_TOKEN");
export const DISCORD_CLIENT_ID = defineSecret("DISCORD_CLIENT_ID");
export const DISCORD_CLIENT_SECRET = defineSecret("DISCORD_CLIENT_SECRET");
export const DISCORD_CALLBACK_URL = devCallback
  ? devCallbackValue
  : defineSecret("DISCORD_CALLBACK_URL");

export const SecretsDependency: SecretParam[] = [
  DISCORD_BOT_TOKEN,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  ...(devCallback ? [] : [DISCORD_CALLBACK_URL]),
];
