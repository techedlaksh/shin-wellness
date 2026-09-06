import { appendSignup } from "@/lib/sheets";
import { handleSubscribe } from "@/lib/subscribe";

export const runtime = "nodejs";
export async function POST(request: Request) {
  return handleSubscribe(request, appendSignup);
}
