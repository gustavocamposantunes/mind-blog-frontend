import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";

import "vitest-localstorage-mock";
import { LocalStorageAdapter } from "./LocalStorageAdapter";

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe("LocalStorageAdapter", () => {
  it("should call localStorage.setItem with correct values", () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = { key: faker.database.column(), value: faker.word.adverb() };
    sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  })
});