describe('product add test', () => {
  it('visits the product page and adds a product', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'products').click();
    cy.contains('control_point').click();
    cy.get('input[formcontrolname="id"]').type('MARIO000');
    cy.get('mat-select[formcontrolname="vendorid"]').click();
    cy.contains('ABC Supply Co.').click();
    cy.get('input[formcontrolname=name]').type('Mario Plumbing Suit');
    cy.get('input[formcontrolname=msrp]').clear();
    cy.get('input[formcontrolname=msrp]').type('69.99');
    cy.get('input[formcontrolname=costprice]').clear();
    cy.get('input[formcontrolname=costprice]').type('99.99');
    cy.get('.mat-expansion-indicator').eq(0).click();
    cy.get('.mat-expansion-indicator').eq(1).click();
    cy.get('input[formcontrolname=rop]').clear();
    cy.get('input[formcontrolname=rop]').type('10');
    cy.get('input[formcontrolname=eoq]').clear();
    cy.get('input[formcontrolname=eoq]').type('10');
    cy.get('input[formcontrolname=qoh]').clear();
    cy.get('input[formcontrolname=qoh]').type('10');
    cy.get('input[formcontrolname=qoo]').clear();
    cy.get('input[formcontrolname=qoo]').type('10');
    cy.get('button').contains('Save').click();
    cy.contains('added!');
  });
});
