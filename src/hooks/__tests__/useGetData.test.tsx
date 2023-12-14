import { renderHook, waitFor } from "@testing-library/react";
import { default as axios } from "axios";
import useGetData from "../useGetData";

jest.mock("axios");

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Testing Random API Reject Value", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  test("It fails if url is not correct", async () => {
    process.env.REACT_APP_BASE_URL = "https://example.com";
    mockedAxios.create = jest.fn(() => mockedAxios);
    mockedAxios.get.mockRejectedValue("Something went wrong");
    const { result } = renderHook(() => useGetData(NaN));
    await waitFor(() => expect(mockedAxios.get).toBeCalledTimes(1));
    await waitFor(() =>
      expect(mockedAxios.get).toBeCalledWith("https://example.com?results=20")
    );

    await waitFor(() => expect(result.current.loading).toBeFalsy());
    expect(result.current.error).toEqual("Something went wrong");
  });
});
