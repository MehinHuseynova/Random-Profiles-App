import { fireEvent, render, screen } from "@testing-library/react";
import { ProfileItem } from "../../ProfileItem/profile-item";
import { mockedResults } from "../../data/mock-data";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Profile Item rendered properly", () => {
  const handleDeleteProfile = jest.fn();
  test("it calls handleDeleteProfile when 'Delete' button clicked", () => {
    render(
      <ProfileItem
        profileInfo={mockedResults[0]}
        handleDeleteProfile={handleDeleteProfile}
      />
    );
    expect(screen.getByText(/Email:/i)).toBeInTheDocument();
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    expect(handleDeleteProfile).toBeCalledTimes(1);
  });

  test("It shows more details when 'More' button clicked", () => {
    render(
      <ProfileItem
        profileInfo={mockedResults[0]}
        handleDeleteProfile={handleDeleteProfile}
      />
    );
    const moreButton = screen.getByRole("button", { name: "More" });
    expect(moreButton).toBeInTheDocument();
    fireEvent.click(moreButton);
    expect(screen.getByText(/Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByText(/Cell/i)).toBeInTheDocument();
    expect(screen.getByText(/Salt/i)).toBeInTheDocument();
    expect(screen.getByText(/Age/i)).toBeInTheDocument();
  });
});
