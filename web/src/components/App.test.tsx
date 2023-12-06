import React from "react";
import { render, screen } from "@testing-library/react";
import Auth0 from "react-auth0-spa";

import App from "./App.tsx";

jest.mock("react-auth0-spa", () => {
  return {
    useAuth0() {
      return {};
    },
  };
});

describe("<App>", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("When loading", () => {
    beforeEach(() => {
      const spy = jest.spyOn(Auth0, "useAuth0");
      spy.mockImplementation(() => {
        return {
          loading: true,
        };
      });
    });

    it("renders loading text", () => {
      render(<App />);

      expect(screen.getByText(/Loading/)).toBeInTheDocument();
    });
  });

  describe("When loaded", () => {
    beforeEach(() => {
      const spy = jest.spyOn(Auth0, "useAuth0");
      spy.mockImplementation(() => {
        return {
          loading: false,
          isAuthenticated: true,
          user: {},
        };
      });
    });

    it("renders without crashing", () => {
      render(<App />);
    });
  });
});
