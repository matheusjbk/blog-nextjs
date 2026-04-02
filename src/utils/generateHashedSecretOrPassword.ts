import { hashPasswordOrSecret } from "@/lib/login/passwordHashing";

(async () => {
  const mySecretOrPassword = ""; // APAGAR DEPOIS DE GERAR O HASH

  const hashedSecretOrPassword = await hashPasswordOrSecret(mySecretOrPassword);

  console.log({ hashedSecretOrPassword });
})();
