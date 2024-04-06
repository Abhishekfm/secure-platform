import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignInPage from "./pages/SignInPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { MemoryRouter } from "react-router-dom";

describe("SignInPage", () => {
  test("renders sign-in form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignInPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByText("Don’t have an account yet?")).toBeInTheDocument();
  });
  it("submits sign in form", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignInPage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "eve.holt@reqres.in" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "cityslicka" },
    });
    fireEvent.click(screen.getByText("Sign in"));

    // Assert that the form is submitted correctly
    await waitFor(() => {
      const { token } = store.getState().authReducer;
      expect(token?.length).toBeGreaterThan(1);
    });
  });
});
