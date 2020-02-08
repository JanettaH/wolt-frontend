describe("Wolt App", function() {
  it("front page can be opened", function() {
    cy.visit("http://localhost:3000");
    cy.contains("Not All Heroes Wear Capes");
  });

  it("sorting feature a to ö", function() {
    cy.visit("http://localhost:3000");
    cy.get("select")
      .select("A to Ö")
      .should("have.value", "1");
  });
  it("sorting feature ö to z", function() {
    cy.contains("Arnolds");
    cy.get("select")
      .select("Ö to A")
      .should("have.value", "2");
    cy.contains("Zhonghua");
  });
});
