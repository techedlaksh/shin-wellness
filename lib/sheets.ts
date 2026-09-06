import { GoogleAuth } from "google-auth-library";
import { SignupNotConfiguredError, type Signup } from "./subscribe";

export async function appendSignup(signup: Signup): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!spreadsheetId || !clientEmail || !privateKey)
    throw new SignupNotConfiguredError();

  const auth = new GoogleAuth({
    credentials: { client_email: clientEmail, private_key: privateKey },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const client = await auth.getClient();
  await client.request({
    url: `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent("'Signups'!A:D")}:append`,
    method: "POST",
    params: { valueInputOption: "RAW", insertDataOption: "INSERT_ROWS" },
    data: {
      values: [
        [
          new Date().toISOString(),
          signup.email,
          signup.interest,
          signup.location,
        ],
      ],
    },
    timeout: 10000,
    retry: false,
  });
}
