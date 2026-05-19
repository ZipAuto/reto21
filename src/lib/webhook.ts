// Replace with your actual n8n webhook URL
export const N8N_WEBHOOK_URL =
  (import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined) ||
  "https://n8n.zipautomationstudios.tech/webhook/english-community";

export const WHATSAPP_NUMBER = "573238119340"; // +57 323 811 9340
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola RETO 21, quiero unirme a la comunidad ✋",
)}`;

export type FormPayload = Record<string, unknown> & {
  form_type: string;
  timestamp?: string;
  source?: string;
};

export async function submitToWebhook(payload: FormPayload) {
  const body = {
    ...payload,
    timestamp: new Date().toISOString(),
    source: typeof window !== "undefined" ? window.location.href : "server",
  };
  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      mode: "cors",
    });
    return { ok: res.ok, status: res.status };
  } catch (e) {
    // Fallback no-cors so the webhook still receives the data
    try {
      await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        mode: "no-cors",
      });
      return { ok: true, status: 0 };
    } catch {
      return { ok: false, status: 0, error: String(e) };
    }
  }
}
