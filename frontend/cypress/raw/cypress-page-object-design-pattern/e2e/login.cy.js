
import LoginPage from '../pages/login_page';

describe('Login Page', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('should log in with valid credentials', () => {
    const email = 'user@example.com'; // Replace with valid email
    const password = 'password123';    // Replace with valid password

    LoginPage.login(email, password);

    // Add assertions to verify successful login
    cy.url().should('include', '/dashboard'); // Update with expected URL after login
    cy.get('.welcome-message').should('contain', 'Welcome'); // Update with actual selector
  });

  it('should show an error with invalid credentials', () => {
    const email = 'invalid@example.com';
    const password = 'wrongPassword';

    LoginPage.login(email, password);

    // Add assertions to verify the error message
    cy.get('.error-message').should('contain', 'Invalid credentials'); // Update with actual selector
  });
});
