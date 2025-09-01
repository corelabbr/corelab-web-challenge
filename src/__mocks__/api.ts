export const getTodos = jest.fn().mockResolvedValue({
  ok: true,
  data: [
    { id: 1, title: "Todo 1", description: "Description 1", is_favorite: false, color: "#FFA500" },
    { id: 2, title: "Todo 2", description: "Description 2", is_favorite: true, color: "#BFFF00" },
  ],
});