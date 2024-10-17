
class LoginPage {
    visit() {
      cy.visit('/login'); // Update with your login URL
    }
  
    getEmailInput() {
      return cy.get('input[name="email"]'); // Update selector as needed
    }
  
    getPasswordInput() {
      return cy.get('input[name="password"]'); // Update selector as needed
    }
  
    getSubmitButton() {
      return cy.get('button[type="submit"]'); // Update selector as needed
    }
  
    login(email, password) {
      this.getEmailInput().type(email);
      this.getPasswordInput().type(password);
      this.getSubmitButton().click();
    }
  }
  
  export default new LoginPage();
  