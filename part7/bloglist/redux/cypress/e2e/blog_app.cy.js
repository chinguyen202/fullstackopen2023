describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `http://localhost:3001/api/testing/reset`);

    const user1 = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    const user2 = {
      username: "smith",
      name: "John Smith",
      password: "john",
    };
    cy.request("POST", `http://localhost:3001/api/users/`, user1);
    cy.request("POST", `http://localhost:3001/api/users/`, user2);

    cy.visit("http://localhost:5173");
  });

  it("front page can be opened, login button is shown", function () {
    cy.contains("login");
  });

  describe("Login", function () {
    it("user can login with correct data", function () {
      cy.contains("login").click();
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();

      cy.contains("User logged in Matti Luukkainen");
    });

    it("login fails with wrong password", function () {
      cy.contains("login").click();
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();
      cy.get(".error").contains("Wrong credentials");
    });
  });

  describe("When user log in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("Test title");
      cy.get("#author").type("Test author");
      cy.get("#url").type("Test url");
      cy.get("#create-button").click();
      cy.get(".notify").contains("a new blog Test title by Test author added!");
      cy.contains("Test title - Test author");
    });

    it("A blog can be liked", function () {
      cy.createBlog({
        title: "A second blog",
        author: "Cypress created",
        url: "https://www.newblog.com",
      });
      cy.contains("A second blog").contains("View").click();
      cy.contains("like").click();
    });

    it("A blog can be delete by its owner", function () {
      cy.createBlog({
        title: "A third blog ",
        author: "Cypress created",
        url: "https://www.cypress.com",
      });
      cy.contains("A third blog").contains("View").click();
      cy.contains("Remove").click();
    });

    it("A blog can not be delete by its owner", function () {
      // Create a new blog
      cy.createBlog({
        title: "A fourth blog",
        author: "Cypress created",
        url: "https://www.newblog.com",
      });
      // Log out
      cy.contains("Log out").click();
      // Login
      cy.login({ username: "smith", password: "john" });
      cy.contains("A fourth blog").contains("View").click();
      cy.contains("Remove").should("not.exist");
    });

    it("Blogs are ordered by likes", function () {
      // Create a blog
      cy.createBlog({
        title: "A blog with more likes",
        author: "Cypress created",
        url: "https://www.newblog.com",
      });

      cy.createBlog({
        title: "A blog with no like",
        author: "Cypress created",
        url: "https://www.newblog.com",
      });

      cy.contains("A blog with more likes").contains("View").click();
      cy.get("#like-button").click();

      cy.get(".blog").eq(0).should("contain", "A blog with more likes");
      cy.get(".blog").eq(1).should("contain", "A blog with no like");
    });
  });
});
