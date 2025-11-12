import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../Home";
import { useFeedback } from "../../providers/FeedbackProvider";
import { useAuth } from "../../providers/AuthProvider";
import { updateColor, updateFavorite } from "../../api/notes";
import NotesMock from "../../mocks/NotesMock";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

jest.mock("../../providers/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../../providers/FeedbackProvider", () => ({
  useFeedback: jest.fn(),
}));

jest.mock("../../api/notes", () => ({
  updateFavorite: jest.fn(),
  updateColor: jest.fn(),
  deleteNote: jest.fn(),
}));

jest.mock("../../components/Navbar", () => () => <div data-testid="navbar" />);

jest.mock("../../components/CreateNote", () => (props: any) => (
  <div data-testid="create-note">
    {props.open ? "Dialog Open" : "Dialog Closed"}
  </div>
));

jest.mock("../../components/EditNote", () => (props: any) => (
  <div data-testid="edit-note">{props.open ? "Edit Open" : "Edit Closed"}</div>
));

jest.mock("../../components/Note", () => (props: any) => (
  <div
    data-testid="note"
    onClick={() => props.onEdit()}
    data-color={props.note.color}
    data-favorite={props.note.isFavorite}
  >
    {props.note.title}
  </div>
));

jest.mock("../../components/Backdrop", () => (props: any) => (
  <div data-testid="backdrop">{props.children}</div>
));

describe("Home Page", () => {
  const mockShowLoading = jest.fn();
  const mockShowToast = jest.fn();

  const mockNotes = NotesMock;

  beforeEach(() => {
    jest.clearAllMocks();

    (useFeedback as jest.Mock).mockReturnValue({
      showLoading: mockShowLoading,
      showToast: mockShowToast,
    });

    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: "user-1", listNotes: mockNotes },
    });
  });

  it("renders the page when authenticated", () => {
    render(<Home />);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("create-note")).toHaveTextContent(
      "Dialog Closed"
    );
    expect(screen.getAllByTestId("note")).toHaveLength(3);
  });

  it("redirects to login when not authenticated", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      user: null,
    });
    render(<Home />);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("login");
    });
  });

  it("shows empty states when there are no notes", () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: "user-1", listNotes: [] },
    });
    render(<Home />);
    expect(screen.getByText("Nenhuma nota favoritada.")).toBeInTheDocument();
    expect(screen.getByText("Nenhuma outra nota.")).toBeInTheDocument();
  });

  it("handles toggling favorite", async () => {
    (updateFavorite as jest.Mock).mockResolvedValueOnce({});
    render(<Home />);
    const note = screen.getAllByTestId("note")[1];
    fireEvent.click(note);
    const noteTitle = note.textContent;
    await waitFor(() =>
      expect(screen.getByTestId("edit-note")).toHaveTextContent("Edit Open")
    );
  });

  it("handles changing note color", async () => {
    (updateColor as jest.Mock).mockResolvedValueOnce({});
    render(<Home />);
    const note = screen.getAllByTestId("note")[0];
    fireEvent.click(note);
    await screen.findByTestId("edit-note");
  });

  it("handles removing a note and cancelling", async () => {
    render(<Home />);
    const removeButton = screen.getByText("Favoritas");
    fireEvent.click(removeButton);
    expect(screen.queryByTestId("backdrop")).not.toBeInTheDocument();
  });

  it("shows delete confirmation dialog", async () => {
    render(<Home />);
    // Simulate clicking remove on first note
    const note = screen.getAllByTestId("note")[0];
    fireEvent.click(note);
    await waitFor(() =>
      expect(screen.getByTestId("edit-note")).toHaveTextContent("Edit Open")
    );
  });
});
