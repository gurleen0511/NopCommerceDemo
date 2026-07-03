export const defaultPassword = "Abc123";

export function uniqueEmail(prefix = "qa-user"): string {
  const safeRandom = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${Date.now()}-${safeRandom}@example.com`;
}

export function buildUser(
  overrides: Partial<{
    gender: "male" | "female";
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    password: string;
  }> = {},
) {
  return {
    gender: "male" as const,
    firstName: "Rex",
    lastName: "Tee",
    email: uniqueEmail(),
    company: "Portfolio QA",
    password: defaultPassword,
    ...overrides,
  };
}

export function parsePrice(priceText: string): number {
  const normalized = priceText.replace(/[^0-9.]/g, "");
  return Number.parseFloat(normalized);
}
