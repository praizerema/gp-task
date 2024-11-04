import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Register from "./Register";
import { CreateUserApi } from "../../services";
import { UserObject } from "../../vite-env";

// Mock the services and react-router-dom
vi.mock("../../services", () => ({
  CreateUserApi: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const renderRegister = () => {
  return render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );
};

describe("Register Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the register form", () => {
    renderRegister();
    expect(
      screen.getByRole("heading", { name: "Register" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Register" })
    ).toBeInTheDocument();
  });

  it("displays error messages for invalid inputs", async () => {
    renderRegister();
    const registerButton = screen.getByRole("button", { name: "Register" });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
      expect(
        screen.getByText("Enter at least 3 characters")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Password must be at least 8 characters")
      ).toBeInTheDocument();
    });
  });

  it("submits the form with valid data", async () => {
    vi.mocked(CreateUserApi).mockResolvedValue({
      username: "praizt",
      email: "eremyya@gmail.com",
      password: "$2a$08$5tiKFkkKyGzMJXRC444g6.dTsM/ABskwXVxK7gEs.R2iSGMD/Hzk2",
      updatedAt: "2024-11-03T23:18:37.587Z",
      createdAt: "2024-11-03T23:18:37.587Z",
      deletedAt: null,
      uuid: "70a375f0-2791-4fe0-8ae8-4d4285e39976",
    } as UserObject);
    renderRegister();

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "Password@123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "Password@123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(CreateUserApi).toHaveBeenCalledWith({
        username: "testuser",
        email: "test@example.com",
        password: "Password@123",
        confirm_password: "Password@123",
      });
    });
  });

  it("handles API error during registration", async () => {
    vi.mocked(CreateUserApi).mockRejectedValue(
      new Error("Registration failed")
    );
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    renderRegister();

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "Password@123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "Password@123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(new Error("Registration failed"));
    });

    consoleSpy.mockRestore();
  });

  //   it('shows success modal after successful registration', async () => {
  //     vi.mocked(CreateUserApi).mockResolvedValue({
  //         "username": "praizt",
  //         "email": "eremyya@gmail.com",
  //         "password": "$2a$08$5tiKFkkKyGzMJXRC444g6.dTsM/ABskwXVxK7gEs.R2iSGMD/Hzk2",
  //         "updatedAt": "2024-11-03T23:18:37.587Z",
  //         "createdAt": "2024-11-03T23:18:37.587Z",
  //         "deletedAt": null,
  //         "uuid": "70a375f0-2791-4fe0-8ae8-4d4285e39976"
  //     } as UserObject);
  //     renderRegister();

  //     fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
  //     fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'test@example.com' } });
  //     fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password@123' } });
  //     fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'Password@123' } });

  //     fireEvent.click(screen.getByRole('button', { name: 'Register' }));

  //     await waitFor(() => {
  //       expect(screen.getByText('Accound Registered Successfully')).toBeInTheDocument();
  //       expect(screen.getByText('Proceed to Log In')).toBeInTheDocument();
  //     });
  //   });
});
