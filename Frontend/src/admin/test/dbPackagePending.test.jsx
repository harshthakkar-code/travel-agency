import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DbPackagePending from "../db-package-pending";
import api from "../../utils/api";

// Mock API module
vi.mock("../../utils/api", () => ({
  default: {
    get: vi.fn(),
  },
}));

// Mock layout components
vi.mock("./dashboardSidebar", () => () => <div data-testid="sidebar" />);
vi.mock("./dashboardHeader", () => () => <div data-testid="header" />);

// Mock useNavigate
const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("DbPackagePending", () => {
  const makePackages = (count) =>
    Array.from({ length: count }).map((_, i) => ({
      _id: `${i + 1}`,
      title: `Pending ${i + 1}`,
      tripDuration: `${i + 2} day / ${i + 1} night`,
      destination: i % 2 === 0 ? "" : "Hanoi",
      status: "Pending",
    }));

  beforeEach(() => {
    vi.clearAllMocks();
    mockedNavigate.mockClear();
  });

  // Test 1: Basic rendering and initial API call
  it("renders header, sidebar, and calls fetch for page 1", async () => {
    api.get.mockResolvedValueOnce({ data: { packages: [], totalPages: 1 } });

    render(
      <MemoryRouter>
        <DbPackagePending />
      </MemoryRouter>
    );

    expect(screen.getByText(/Pending Packages List/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(api.get).toHaveBeenCalledWith("/packages", {
        params: { status: "Pending", page: 1, limit: 5 },
      })
    );
  });

  // Test 2: Empty state
  it("shows empty state when no pending packages found", async () => {
    api.get.mockResolvedValueOnce({ data: { packages: [], totalPages: 1 } });

    render(
      <MemoryRouter>
        <DbPackagePending />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalled());
    expect(screen.getByText(/No pending packages found/i)).toBeInTheDocument();
  });

  // Test 3: Rendering packages with data
  it("renders packages with destination fallback and pagination", async () => {
    api.get.mockResolvedValueOnce({
      data: { packages: makePackages(2), totalPages: 2 },
    });

    render(
      <MemoryRouter>
        <DbPackagePending />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));

    expect(screen.getByText("Pending 1")).toBeInTheDocument();
    expect(screen.getByText("Pending 2")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument(); // destination fallback
    expect(screen.getByText("Hanoi")).toBeInTheDocument();
    expect(screen.getAllByText("Pending").length).toBeGreaterThan(0);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  // Test 4: Edit button navigation
  it("navigates to edit page when clicking edit badge", async () => {
    api.get.mockResolvedValueOnce({
      data: {
        packages: [
          {
            _id: "1",
            title: "Pending 1",
            tripDuration: "3 day / 2 night",
            destination: "Goa",
            status: "Pending",
          },
        ],
        totalPages: 1,
      },
    });

    render(
      <MemoryRouter>
        <DbPackagePending />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalled());

    const row = screen.getByText("Pending 1").closest("tr");
    const editBadge = row.querySelector(".badge.badge-success");
    fireEvent.click(editBadge);

    expect(mockedNavigate).toHaveBeenCalledWith("/admin/edit-package/1");
  });

  // Test 5: Delete button click (no action implemented)
  it("renders delete button without triggering action", async () => {
    api.get.mockResolvedValueOnce({
      data: { packages: makePackages(1), totalPages: 1 },
    });

    render(
      <MemoryRouter>
        <DbPackagePending />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalled());

    const row = screen.getByText("Pending 1").closest("tr");
    const deleteButton = row.querySelector(".badge.badge-danger");
    expect(deleteButton).toBeTruthy();

    fireEvent.click(deleteButton);
    expect(deleteButton).toBeInTheDocument();
  });

  // Test 6: Error handling
  it("shows error message when fetch fails", async () => {
    api.get.mockRejectedValueOnce(new Error("network"));

    render(
      <MemoryRouter>
        <DbPackagePending />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalled());
    expect(screen.getByText(/Failed to fetch packages/i)).toBeInTheDocument();
  });

  // Test 11: Pagination - disabled prev on first page
  it("prev button disabled on first page", async () => {
    api.get.mockResolvedValueOnce({
      data: { packages: makePackages(2), totalPages: 3 },
    });

    render(
      <MemoryRouter>
        <DbPackagePending />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalled());

    const prevButton = document.querySelector(
      ".pagination .page-item:first-child"
    );
    expect(prevButton.classList.contains("disabled")).toBe(true);
  });

  // Test 12: Pagination - clicking disabled prev button
  it("does not navigate when clicking disabled prev button", async () => {
    api.get.mockResolvedValueOnce({
      data: { packages: makePackages(2), totalPages: 3 },
    });

    render(
      <MemoryRouter>
        <DbPackagePending />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));

    const prevButton = document.querySelector(
      ".pagination .page-item:first-child"
    );
    fireEvent.click(prevButton);

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));
  });

  // Test 13: Pagination navigation
  it("navigates between pages correctly", async () => {
    api.get.mockResolvedValueOnce({
      data: { packages: makePackages(2), totalPages: 3 },
    }); // Page 1
    api.get.mockResolvedValueOnce({
      data: { packages: makePackages(2), totalPages: 3 },
    }); // Page 2
    api.get.mockResolvedValueOnce({
      data: { packages: makePackages(2), totalPages: 3 },
    }); // Page 1

    render(
      <MemoryRouter>
        <DbPackagePending />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));

    const prevButton = document.querySelector(
      ".pagination .page-item:first-child"
    );
    expect(prevButton.classList.contains("disabled")).toBe(true);

    // Go to page 2
    fireEvent.click(screen.getByText("2"));
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(2));
    expect(prevButton.classList.contains("disabled")).toBe(false);

    // Go back to page 1 using prev button
    const prevLink = prevButton.querySelector(".page-link");
    fireEvent.click(prevLink);
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(3));
    expect(prevButton.classList.contains("disabled")).toBe(true);
  });

  // Test 14: Next button disabled on last page
  it("next button disabled on last page", async () => {
    api.get.mockResolvedValueOnce({
      data: { packages: makePackages(2), totalPages: 2 },
    }); // Page 1
    api.get.mockResolvedValueOnce({
      data: { packages: makePackages(2), totalPages: 2 },
    }); // Page 2

    render(
      <MemoryRouter>
        <DbPackagePending />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));

    // Go to last page
    fireEvent.click(screen.getByText("2"));
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(2));

    const nextButton = document.querySelector(
      ".pagination .page-item:last-child"
    );
    expect(nextButton.classList.contains("disabled")).toBe(true);
  });

  // Test 15: Clicking disabled next button
  it("does not navigate when clicking disabled next button", async () => {
    api.get.mockResolvedValueOnce({
      data: { packages: makePackages(2), totalPages: 2 },
    }); // Page 1
    api.get.mockResolvedValueOnce({
      data: { packages: makePackages(2), totalPages: 2 },
    }); // Page 2

    render(
      <MemoryRouter>
        <DbPackagePending />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));

    // Go to last page
    fireEvent.click(screen.getByText("2"));
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(2));

    const nextButton = document.querySelector(
      ".pagination .page-item:last-child"
    );
    fireEvent.click(nextButton);

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(2));
  });

  // Test 16: Single page pagination
  // Test 16: Single page pagination - CORRECTED

  // Test 17: Active page styling

  // Test 18: API call parameters verification

  // Test 19: handlePageChange function edge cases
  it("handlePageChange function ignores invalid page numbers", async () => {
    api.get.mockResolvedValueOnce({
      data: { packages: makePackages(2), totalPages: 3 },
    });

    render(
      <MemoryRouter>
        <DbPackagePending />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));

    // Test clicking disabled prev button (page < 1)
    const prevButton = document.querySelector(
      ".pagination .page-item:first-child"
    );
    fireEvent.click(prevButton);

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));
  });

  // Test 20: Next button navigation
  it("navigates to next page when clicking next button", async () => {
    api.get.mockResolvedValueOnce({
      data: { packages: makePackages(2), totalPages: 3 },
    }); // Page 1
    api.get.mockResolvedValueOnce({
      data: { packages: makePackages(2), totalPages: 3 },
    }); // Page 2

    render(
      <MemoryRouter>
        <DbPackagePending />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));

    const nextButton = document.querySelector(
      ".pagination .page-item:last-child .page-link"
    );
    fireEvent.click(nextButton);

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(2));

    expect(api.get).toHaveBeenLastCalledWith("/packages", {
      params: { status: "Pending", page: 2, limit: 5 },
    });
  });
});
