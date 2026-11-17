export const brl = (v: number | string | null | undefined) =>
  Number(v ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const dateBR = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

/** Known English messages from the backend/browser, mapped to friendly pt-BR text. */
const EN_TO_PT: Array<[RegExp, string]> = [
  [/invalid login credentials/i, "E-mail ou senha incorretos."],
  [/email not confirmed/i, "Confirme seu e-mail antes de entrar. Veja sua caixa de entrada."],
  [/user already registered|already been registered|already exists/i, "Já existe uma conta com esse e-mail."],
  [/pwned|leaked|known to be weak|compromised/i, "Essa senha apareceu em vazamentos de dados. Escolha outra senha."],
  [/password should be at least|password is too short/i, "A senha precisa ter pelo menos 6 caracteres."],
  [/should be different from the old/i, "Escolha uma senha diferente da atual."],
  [/current password|reauthentication/i, "Sua senha atual está incorreta."],
  [/unable to validate email|invalid email|email address .* is invalid/i, "E-mail inválido."],
  [/rate limit|too many requests|security purposes/i, "Muitas tentativas seguidas. Aguarde alguns minutos e tente de novo."],
  [/signups? not allowed|signup is disabled/i, "Novos cadastros estão desativados no momento."],
  [/user not found/i, "Usuário não encontrado."],
  [/jwt expired|session.*(missing|expired|not found)|refresh token/i, "Sua sessão expirou. Entre novamente."],
  [/not authorized|unauthorized|permission denied|row-level security|violates row level/i, "Você não tem permissão para fazer isso."],
  [/foreign key/i, "Não é possível excluir: há registros ligados a este item (por exemplo, vendas)."],
  [/duplicate key|unique constraint/i, "Já existe um registro com esses dados."],
  [/payload too large|exceeded the maximum allowed size|entity too large/i, "O arquivo é grande demais."],
  [/mime type|invalid file type/i, "Tipo de arquivo não aceito."],
  [/failed to fetch|network ?error|load failed|networkerror/i, "Sem conexão com o servidor. Verifique sua internet e tente de novo."],
  [/timeout|timed out/i, "O servidor demorou para responder. Tente de novo."],
  [/internal server error|unexpected failure/i, "Erro no servidor. Tente de novo em instantes."],
];

/** Translates known English error messages to pt-BR; other messages pass through. */
export function translateError(msg: string): string {
  for (const [re, pt] of EN_TO_PT) if (re.test(msg)) return pt;
  return msg;
}

export function errMsg(e: unknown): string {
  if (e && typeof e === "object" && "message" in e) {
    const m = String((e as { message: string }).message).trim();
    if (m) return translateError(m);
  }
  return "Algo deu errado. Tente novamente.";
}

/** Parse a non-negative number from a form field; returns null when invalid. */
export function parseNonNeg(v: string, integer = false): number | null {
  if (v.trim() === "") return null;
  const n = Number(v.replace(",", "."));
  if (!Number.isFinite(n) || n < 0) return null;
  if (integer && !Number.isInteger(n)) return null;
  return n;
}
