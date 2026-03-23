import { describe } from "@jest/globals";
import { validateSortBy } from "./validators";

describe("validateSortBy", () => {
  it("should return true for valid sort by values", () => {
    expect(validateSortBy("title")).toBe(true);
    expect(validateSortBy("artist")).toBe(true);
    expect(validateSortBy("price")).toBe(true);
  });

  it("should return false for invalid sort by values", () => {
    expect(validateSortBy("invalid")).toBe(false);
    expect(validateSortBy("")).toBe(false);
    expect(validateSortBy(null)).toBe(false);
    expect(validateSortBy(undefined)).toBe(false);
  });
});


