import { describe, expect, it, vi } from "vitest";

import { GetProfileSpy } from "../test";
import { render, screen, waitFor } from "../test/test-utils";

import { ProfilePage } from "./ProfilePage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => ({
  ...await vi.importActual("react-router-dom"),
  useNavigate: () => mockNavigate
}));

type SutTypes = {
  getProfileSpy: GetProfileSpy;
}

const makeSut = (): SutTypes => {
  const getProfileSpy = new  GetProfileSpy()

  render(<ProfilePage getProfile={getProfileSpy} />)

  return {
    getProfileSpy
  }
}

describe("ProfilePage", () => {
  it("should render the fields with returned data from get profile api", async () => {
    const { getProfileSpy } = makeSut();

    const nameParts = getProfileSpy.user.name.split(' ')
    const name = nameParts[0];
    const surrname = nameParts.slice(1).join(' ');

    const inputName = screen.getByTestId("input-name") as HTMLInputElement;
    const inputSurrname = screen.getByTestId("input-surrname") as HTMLInputElement;

    await waitFor(() => {
      expect(inputName.value).toBe(name);
      expect(inputSurrname.value).toBe(surrname);
    });
  });
});