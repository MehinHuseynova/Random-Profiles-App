import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";

import { default as axios } from "axios";
import useGetData from "../../hooks/useGetData";
import { mockedResults } from "../../data/mock-data";
import { ProfileList } from "../../ProfileList/profile-list";
jest.mock("axios");

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("App component rendered", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.get.mockResolvedValue({ data: { results: mockedResults } });
  render(<ProfileList />);
  test("It shows profiles after API call", async () => {
    const { result } = renderHook(() => useGetData(0));

    await waitFor(() => expect(mockedAxios.get).toBeCalledTimes(1));
    await waitFor(() =>
      expect(mockedAxios.get).toBeCalledWith(
        "https://randomuser.me/api/?results=20"
      )
    );
    await waitFor(() => expect(result.current.loading).toBeTruthy());
    await waitFor(() => expect(result.current.loading).toBeFalsy());

    expect(await screen.findByRole("img")).toBeInTheDocument();
  });
  test("It fetches data when 'Reload' button is clicked", async () => {
    render(<ProfileList />);
    renderHook(() => useGetData(0));
    await waitFor(() => expect(mockedAxios.get).toBeCalledTimes(2));
    await waitFor(() =>
      expect(mockedAxios.get).toBeCalledWith(
        "https://randomuser.me/api/?results=20"
      )
    );

    await waitFor(() => expect(mockedAxios.get).toBeCalledTimes(2));
    const reloadBtn = await screen.findByRole("button", { name: /Reload/i });
    fireEvent.click(reloadBtn);
    await waitFor(() => expect(mockedAxios.get).toBeCalledTimes(3));
  });

  test("Add Profile button adds profiles incrementally", async () => {
    render(<ProfileList />);
    const addProfilesBtn = await screen.findByRole("button", {
      name: "Add Profile (s)",
    });
    // first click
    fireEvent.click(addProfilesBtn);
    // second click
    fireEvent.click(addProfilesBtn);
    // total 3 calls:
    //    1 call during the initial readme
    //    2 calls when 'Add Profiles' clicked 2 times
    await waitFor(() => expect(mockedAxios.get).toBeCalledTimes(3));
    await waitFor(() =>
      expect(mockedAxios.get).toBeCalledWith(
        "https://randomuser.me/api/?results=1"
      )
    );
    await waitFor(() =>
      expect(mockedAxios.get).toBeCalledWith(
        "https://randomuser.me/api/?results=2"
      )
    );
  });
});
