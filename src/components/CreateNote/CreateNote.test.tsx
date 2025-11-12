import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateNote from "../CreateNote";
import { useFeedback } from "../../providers/FeedbackProvider";
import { useAuth } from "../../providers/AuthProvider";
import { createNote } from "../../api/notes";

jest.mock("../../api/notes", () => ({
  createNote: jest.fn(),
}));

jest.mock("../../providers/FeedbackProvider", () => ({
  useFeedback: jest.fn(),
}));

jest.mock("../../providers/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../NoteDialog", () => (props: any) => (
  <div data-testid="note-dialog">
    <input
      data-testid="note-title-input"
      value={props.note.title}
      onChange={(e) => props.setNote({ ...props.note, title: e.target.value })}
    />
    <button data-testid="save-button" onClick={props.onSave}>
      Save
    </button>
    <button data-testid="close-button" onClick={props.onClose}>
      Close
    </button>
  </div>
));

describe("CreateNote", () => {
  const mockShowLoading = jest.fn();
  const mockShowToast = jest.fn();
  const mockSetOpen = jest.fn();
  const mockSetNotes = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useFeedback as jest.Mock).mockReturnValue({
      showLoading: mockShowLoading,
      showToast: mockShowToast,
    });
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: "user-1" },
    });
  });

  it("renders create note card", () => {
    render(
      <CreateNote open={false} setOpen={mockSetOpen} setNotes={mockSetNotes} />
    );
    const title = screen.getByText("Título");
    const body = screen.getByText("Criar nota...");
    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });

  it("opens NoteDialog when card is clicked", () => {
    render(
      <CreateNote open={false} setOpen={mockSetOpen} setNotes={mockSetNotes} />
    );
    const card = screen.getByText("Título");
    fireEvent.click(card as HTMLElement);
    expect(mockSetOpen).toHaveBeenCalledWith(true);
  });

  it("shows error when saving without title", async () => {
    render(
      <CreateNote open={true} setOpen={mockSetOpen} setNotes={mockSetNotes} />
    );
    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);
    await waitFor(() => expect(mockShowToast).toHaveBeenCalled());
    expect(mockShowToast).toHaveBeenCalledWith({
      type: "error",
      title: "Erro",
      message: "Preencha ao menos o titulo!",
    });
    expect(createNote).not.toHaveBeenCalled();
  });

  it("creates note successfully", async () => {
    (createNote as jest.Mock).mockResolvedValueOnce({
      data: {
        id: "123",
        title: "New Note",
        body: "Body",
        color: "#FFF",
        isFavorite: false,
      },
    });
    render(
      <CreateNote open={true} setOpen={mockSetOpen} setNotes={mockSetNotes} />
    );
    const input = screen.getByTestId("note-title-input");
    const saveButton = screen.getByTestId("save-button");
    fireEvent.change(input, { target: { value: "New Note" } });
    fireEvent.click(saveButton);
    await waitFor(() => expect(mockSetOpen).toHaveBeenCalledWith(false));
    expect(mockShowLoading).toHaveBeenCalledWith(true);
    expect(createNote).toHaveBeenCalledWith({
      title: "New Note",
      body: "",
      color: "#FFF",
      isFavorite: false,
      userId: "user-1",
    });
    expect(mockShowToast).toHaveBeenCalledWith({
      type: "success",
      title: "Nota",
      message: "Nota criada com sucesso!",
    });
    expect(mockSetNotes).toHaveBeenCalledWith(expect.any(Function));
    expect(mockShowLoading).toHaveBeenCalledWith(false);
  });

  it("shows error toast when createNote fails", async () => {
    (createNote as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: "Server error" } },
    });
    render(
      <CreateNote open={true} setOpen={mockSetOpen} setNotes={mockSetNotes} />
    );
    const input = screen.getByTestId("note-title-input");
    fireEvent.change(input, { target: { value: "Error Note" } });
    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);
    await waitFor(() => expect(mockSetOpen).toHaveBeenCalledWith(false));
    expect(mockShowToast).toHaveBeenCalledWith({
      type: "error",
      title: "Erro",
      message: "Server error",
    });
    expect(mockShowLoading).toHaveBeenCalledWith(false);
  });
});
