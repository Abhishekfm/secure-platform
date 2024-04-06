import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignUpPage from "./pages/SignUpPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { MemoryRouter } from "react-router-dom";

describe("SignUpPage", () => {
  test("renders sign-up form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByText("Create your account")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
  });
  it("submits sign up form", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "eve.holt@reqres.in" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "cityslicka" },
    });
    fireEvent.click(screen.getByText("Sign up"));

    // Assert that the form is submitted correctly
    await waitFor(() => {
      const { token } = store.getState().authReducer;
      expect(token?.length).toBeGreaterThan(1);
    });
  });
});
