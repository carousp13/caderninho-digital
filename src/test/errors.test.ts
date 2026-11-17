import { describe, it, expect } from "vitest";
import { errMsg } from "@/lib/format";
describe("errMsg pt-BR", () => {
  it("login", () => expect(errMsg({ message: "Invalid login credentials" })).toBe("E-mail ou senha incorretos."));
  it("rede", () => expect(errMsg(new TypeError("Failed to fetch"))).toMatch(/Sem conexão/));
  it("pt passa", () => expect(errMsg({ message: "Estoque insuficiente para X" })).toBe("Estoque insuficiente para X"));
});
