import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditNote from "../EditNote";
import NotesMock from "../../mocks/NotesMock";
import { INote } from "../../types/Note";
import { useFeedback } from "../../providers/FeedbackProvider";
import { updateNote } from "../../api/notes";
import COLORS from "../../constants/colors";

jest.mock("../../api/notes", () => ({
  updateNote: jest.fn(),
}));

jest.mock("../../providers/FeedbackProvider", () => ({
  useFeedback: jest.fn(),
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

describe("EditNote", () => {
  const mockShowLoading = jest.fn();
  const mockShowToast = jest.fn();
  const mockOnClose = jest.fn();
  const mockSetNotes = jest.fn();

  const noteToEdit: INote = NotesMock[0];

  beforeEach(() => {
    jest.clearAllMocks();
    (useFeedback as jest.Mock).mockReturnValue({
      showLoading: mockShowLoading,
      showToast: mockShowToast,
    });
  });

  it("renders NoteDialog with initial title", () => {
    render(
      <EditNote
        open={true}
        noteToEdit={noteToEdit}
        setNotes={mockSetNotes}
        onClose={mockOnClose}
      />
    );
    const input = screen.getByTestId("note-title-input") as HTMLInputElement;
    expect(input.value).toBe("Título");
  });

  it("shows error toast if title is empty", async () => {
    render(
      <EditNote
        open={true}
        noteToEdit={noteToEdit}
        setNotes={mockSetNotes}
        onClose={mockOnClose}
      />
    );
    const input = screen.getByTestId("note-title-input");
    const saveButton = screen.getByTestId("save-button");
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(saveButton);
    await waitFor(() => expect(mockShowToast).toHaveBeenCalled());
    expect(mockShowToast).toHaveBeenCalledWith({
      type: "error",
      title: "Erro",
      message: "Preencha ao menos o titulo!",
    });
    expect(updateNote).not.toHaveBeenCalled();
  });

  it("saves the note successfully", async () => {
    (updateNote as jest.Mock).mockResolvedValueOnce({});
    render(
      <EditNote
        open={true}
        noteToEdit={noteToEdit}
        setNotes={mockSetNotes}
        onClose={mockOnClose}
      />
    );
    const input = screen.getByTestId("note-title-input");
    const saveButton = screen.getByTestId("save-button");
    fireEvent.change(input, { target: { value: "New Title" } });
    fireEvent.click(saveButton);

    await waitFor(() => expect(mockOnClose).toHaveBeenCalled());

    expect(mockShowLoading).toHaveBeenCalledWith(true);
    expect(updateNote).toHaveBeenCalledWith("1", {
      id: "1",
      title: "New Title",
      body: "Clique ou arraste o arquivo para esta área para fazer upload",
      color: COLORS[0],
      isFavorite: false,
    });
    expect(mockShowToast).toHaveBeenCalledWith({
      type: "success",
      title: "Nota",
      message: "Nota alterada com sucesso!",
    });
    expect(mockSetNotes).toHaveBeenCalled();
    expect(mockShowLoading).toHaveBeenCalledWith(false);
  });

  it("shows error toast when update fails", async () => {
    (updateNote as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: "Server error" } },
    });
    render(
      <EditNote
        open={true}
        noteToEdit={noteToEdit}
        setNotes={mockSetNotes}
        onClose={mockOnClose}
      />
    );
    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);
    await waitFor(() => expect(mockShowToast).toHaveBeenCalled());
    expect(mockShowToast).toHaveBeenCalledWith({
      type: "error",
      title: "Erro",
      message: "Server error",
    });
    expect(mockShowLoading).toHaveBeenCalledWith(false);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
