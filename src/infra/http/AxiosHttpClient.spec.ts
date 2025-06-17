import { beforeEach, describe, expect, it, vi } from "vitest";
import axios from "axios";
import { faker } from '@faker-js/faker';

import { AxiosHttpClient } from "./AxiosHttpClient";
import { mockGetRequest } from "@/data/test";

vi.mock("axios")

const mockedAxios = vi.mocked(axios, true)


const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

describe("AxiosHttpClient", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  
  describe("get", () => {
    beforeEach(() => {
      mockedAxios.get.mockResolvedValue({
        data: faker.helpers.objectValue,
        status: faker.number.int()
      })
    })
    it("Should call axios.get with correct values", async () => {
      const { url, queryParams } = mockGetRequest()
      const sut = makeSut()
      await sut.get({ url, queryParams })
      expect(mockedAxios.get).toHaveBeenCalledWith(url, { params: queryParams })
    })
  })
})