import supertest from "supertest";
import mockApp from "./mockApp";

describe("Todo CRUD", () => {
  describe("Try to register Todo without all its properties in the body", () => {
    test("Try to create todo without title", async () => {
      const response = await supertest(mockApp).post("/api/v1/todos").send({
        body: "generic task description",
        isFavorited: false,
        color: "#FFFFFF",
      });

      expect(response.status).toBe(200);
    });

    test("Try to create todo without body", async () => {
      const response = await supertest(mockApp).post("/api/v1/todos").send({
        title: "generic task title",
        isFavorited: false,
        color: "#FFFFFF",
      });

      expect(response.status).toBe(200);
    });

    test("Try to create todo without title and body", async () => {
      const response = await supertest(mockApp).post("/api/v1/todos").send({
        isFavorited: false,
        color: "#FFFFFF",
      });

      expect(response.status).toBe(200);
    });

    test("Try to create todo with empty body", async () => {
      const response = await supertest(mockApp).post("/api/v1/todos").send({});
      expect(response.status).toBe(200);
    });

    test("Try to create todo with no body", async () => {
      const response = await supertest(mockApp).post("/api/v1/todos");
      expect(response.status).toBe(200);
    });

    test("Try to create todo without isFavorited", async () => {
      const response = await supertest(mockApp).post("/api/v1/todos").send({
        title: "generic task title",
        body: "generic task description",
        color: "#FFFFFF",
      });
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        title: "generic task title",
        body: "generic task description",
        color: "#FFFFFF",
      });
    });

    test("Try to create todo without color", async () => {
      const response = await supertest(mockApp).post("/api/v1/todos").send({
        title: "generic task title",
        body: "generic task description",
        isFavorited: false,
      });
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        title: "generic task title",
        body: "generic task description",
        isFavorited: false,
      });
    });
  });

  describe("Try to create Todo with wrong hex color format", () => {
    test("Try to create todo without color", async () => {
      const response = await supertest(mockApp).post("/api/v1/todos").send({
        title: "generic task title",
        body: "generic task description",
        isFavorited: false,
        color: "#FFFFFFF",
      });
      expect(response.status).toBe(400);
    });
  });

  describe("Create Todo, Read Todo, Update Todo, Check if Todo was updated", () => {
    const title = "generic task title";
    const body = "generic task description";
    const isFavorited = true;

    test("Create todo", async () => {
      const createResponse = await supertest(mockApp).post("/api/v1/todos").send({
        title,
        body,
        isFavorited,
      });

      expect(createResponse.status).toBe(200);
      expect(createResponse.body).toMatchObject({
        title,
        body,
        isFavorited,
      });

      const id = createResponse.body._id;

      const firstReadResponse = await supertest(mockApp).get(`/api/v1/todos/${id}`);
      expect(firstReadResponse.status).toBe(200);
      expect(firstReadResponse.body[0]).toMatchObject({
        title,
        body,
        isFavorited,
      });

      const updateResponse = await supertest(mockApp).put(`/api/v1/todos/${id}`).send({ body: "updated body" });
      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body).toMatchObject({
        title,
        body: "updated body",
        isFavorited,
      });

      const secondReadResponse = await supertest(mockApp).get(`/api/v1/todos/${id}`);
      expect(secondReadResponse.status).toBe(200);
      expect(secondReadResponse.body[0]).toMatchObject({
        title,
        body: "updated body",
        isFavorited,
      });
    });
  });

  describe("Create Todo, Read Todo, Delete Todo, Check if Todo was deleted", () => {
    const title = "generic task title";
    const body = "generic task description";
    const isFavorited = true;

    test("Create todo", async () => {
      const createResponse = await supertest(mockApp).post("/api/v1/todos").send({
        title,
        body,
        isFavorited,
      });

      expect(createResponse.status).toBe(200);
      expect(createResponse.body).toMatchObject({
        title,
        body,
        isFavorited,
      });

      const id = createResponse.body._id;

      const firstReadResponse = await supertest(mockApp).get(`/api/v1/todos/${id}`);
      expect(firstReadResponse.status).toBe(200);
      expect(firstReadResponse.body[0]).toMatchObject({
        title,
        body,
        isFavorited,
      });

      const deleteResponse = await supertest(mockApp).delete(`/api/v1/todos/${id}`);
      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body).toMatchObject({
        title,
        body,
        isFavorited,
      });

      const secondReadResponse = await supertest(mockApp).get(`/api/v1/todos/${id}`);
      expect(secondReadResponse.status).toBe(404);
    });
  });

  describe("Try to delete Todo that does not exist", () => {
    test("Create todo", async () => {
      const deleteResponse = await supertest(mockApp).delete("/api/v1/todos/2");
      expect(deleteResponse.status).toBe(404);
    });
  });

  describe("Create Todos and Read them", () => {
    test("Create todo", async () => {
      const firstCreateTodoResponse = await supertest(mockApp).post("/api/v1/todos").send({
        title: "some cool todo",
        body: "some cool todo description",
        isFavorited: false,
      });

      const secondCreateTodoResponse = await supertest(mockApp).post("/api/v1/todos").send({
        title: "an even cooler todo",
        body: "an even cooler todo description",
        isFavorited: true,
      });

      const getAllTodosResponse = await supertest(mockApp).get("/api/v1/todos");

      expect(getAllTodosResponse.status).toBe(200);

      expect(getAllTodosResponse.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: "some cool todo",
            body: "some cool todo description",
            isFavorited: false,
          }),
          expect.objectContaining({
            title: "an even cooler todo",
            body: "an even cooler todo description",
            isFavorited: true,
          }),
        ])
      );
    });
  });

  describe("Try to update Todo that does not exist", () => {
    test("Update todo", async () => {
      const updateResponse = await supertest(mockApp).put("/api/v1/todos/2").send({ title: "generic task title", body: "generic task description", isFavorited: true });
      expect(updateResponse.status).toBe(400);
    });
  });
});
