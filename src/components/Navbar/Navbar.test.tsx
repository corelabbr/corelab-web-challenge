import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./index";

jest.mock("../../providers/AuthProvider", () => ({
  useAuth: () => ({
    logout: jest.fn(),
  }),
}));

jest.mock("../../assets/imgs/search.svg", () => ({
  ReactComponent: () => <svg data-testid="search-icon" />,
}));
jest.mock("../../assets/imgs/remove.svg", () => ({
  ReactComponent: () => <svg data-testid="remove-icon" />,
}));

describe("<Navbar />", () => {
  const setSearch = jest.fn();
  const setColorFilter = jest.fn();

  const defaultProps = {
    search: "",
    setSearch,
    colorFilter: [],
    setColorFilter,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders logo, input and buttons", () => {
    render(<Navbar {...defaultProps} />);

    expect(screen.getByAltText(/corenotes icon/i)).toBeInTheDocument();
    expect(screen.getByText(/corenotes/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/pesquisar notas/i)).toBeInTheDocument();

    expect(screen.getByTestId("search-icon")).toBeInTheDocument();

    const colorButtons = screen.getAllByRole("button", {
      name: /filtrar por cor/i,
    });
    expect(colorButtons.length).toBeGreaterThan(0);
  });

  test("updates search when typing", () => {
    render(<Navbar {...defaultProps} />);
    const input = screen.getByPlaceholderText(/pesquisar notas/i);
    fireEvent.change(input, { target: { value: "test" } });
    expect(setSearch).toHaveBeenCalledWith("test");
  });

  test("toggles a color filter when clicking on a color button", () => {
    render(<Navbar {...defaultProps} />);
    const colorButton = screen.getAllByRole("button", {
      name: /filtrar por cor/i,
    })[0];

    fireEvent.click(colorButton);

    expect(setColorFilter).toHaveBeenCalledTimes(1);
  });

  test("renders and clears filters when clear button is clicked", () => {
    render(<Navbar {...defaultProps} colorFilter={["#FFF"]} />);

    const clearButton = screen.getByRole("button", { name: /limpar/i });
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(setColorFilter).toHaveBeenCalledWith([]);
  });

  test("calls logout when logout button is clicked", () => {
    const mockLogout = jest.fn();

    jest
      .spyOn(require("../../providers/AuthProvider"), "useAuth")
      .mockReturnValue({
        logout: mockLogout,
      });

    render(<Navbar {...defaultProps} />);

    const logoutButton = screen.getByRole("button", { name: "" });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
