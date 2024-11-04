import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Dashboard from "./Dashboard";
import { CreateTitle, GetAllTitles } from "../../services";
import { useSDK } from "@metamask/sdk-react";
import { AxiosResponse } from "axios";
import { MemoryRouter } from "react-router-dom";
import { TitleObjType } from "../../vite-env";

// Mock the services
vi.mock("../../services", () => ({
  GetAllTitles: vi.fn(),
  CreateTitle: vi.fn(),
}));

// Mock the SDK to simulate MetaMask connection
vi.mock("@metamask/sdk-react", () => ({
  useSDK: vi.fn(),
}));

const renderDashboard = () => {
    return render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
  };

describe("Dashboard Component", () => {
  beforeEach(() => {
    vi.mocked(GetAllTitles).mockResolvedValue([
      {
        createdAt: "2024-11-02T17:03:59.726Z",
        deletedAt: null,
        title: "My title is here 1",
        updatedAt: "2024-11-02T17:03:59.726Z",
        uuid: "05a93078-e7c3-41c1-9002-39eddb08df76",
      },
    ] as TitleObjType[]);
    vi.mocked(CreateTitle).mockResolvedValue({
      data: { message: "Title created" },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    } as AxiosResponse);
    vi.mocked(useSDK).mockReturnValue({
      connected: true,
      ready: false,
      connecting: false,
      extensionActive: false,
      readOnlyCalls: false,
    });
  });

  it("renders the welcome message", () => {
    renderDashboard();
    screen.debug();
    const h1Elem = screen.getByText(/Welcome, User/i);
    expect(h1Elem).toBeInTheDocument();
  });

  it("disables Add Title button when wallet is not connected", () => {
    vi.mocked(useSDK).mockReturnValue({
      connected: false,
      ready: false,
      connecting: false,
      extensionActive: false,
      readOnlyCalls: false,
    });
    renderDashboard();
    const addButton = screen.getByRole("button", { name: /Add Title/i });
    expect(addButton).toBeDisabled();
  });

  it("enables Add Title button when wallet is connected", () => {
    renderDashboard();
    const addButton = screen.getByRole("button", { name: /Add Title/i });
    expect(addButton).not.toBeDisabled();
  });

  it("fetches and displays titles on load", async () => {
    renderDashboard();
    await waitFor(() => expect(GetAllTitles).toHaveBeenCalled());
    expect(screen.getByText(/My title is here 1/i)).toBeInTheDocument();
  });

  it("shows success modal after submitting a title", async () => {
    renderDashboard();
    const input = screen.getByPlaceholderText(/e.g Bitcoin mining/i);
    const addButton = screen.getByRole("button", { name: /Add Title/i });

    fireEvent.change(input, { target: { value: "New Title" } });
    fireEvent.click(addButton);

    await waitFor(() =>
      expect(CreateTitle).toHaveBeenCalledWith({ title: "New Title" })
    );
    await waitFor(() =>
      expect(
        screen.getByText(/Title Submitted Successfully/i)
      ).toBeInTheDocument()
    );
  });
});
