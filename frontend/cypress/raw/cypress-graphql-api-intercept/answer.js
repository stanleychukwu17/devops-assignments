cy.intercept('POST', '/graphql', (req) => {
  // You can modify the request or response here
  req.reply((res) => {
    // Modify the response if needed
    res.send({ data: { yourField: 'yourValue' } });
  });
}).as('graphqlRequest');

// Trigger the request in your application
cy.get('your-selector').click();

// Wait for the intercepted request
cy.wait('@graphqlRequest');

// In this example, it intercepts any POST request to the /graphql endpoint and allows you
// to manipulate the request or response as needed.




// ----
// give me another example of using intercept with normal api

// Intercept the GET request to the /api/users endpoint
cy.intercept('GET', '/api/users', (req) => {
  // Modify the response if needed
  req.reply({
    statusCode: 200,
    body: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ],
  });
}).as('getUsers');

// Trigger the request in your application
cy.visit('/users'); // Assuming this triggers the API call

// Wait for the intercepted request
cy.wait('@getUsers');

// Now you can assert on the UI to verify the response is displayed correctly
cy.get('.user-list').should('contain', 'Alice');
cy.get('.user-list').should('contain', 'Bob');

// In this example, the GET request to /api/users is intercepted, and a mock response is provided.
// The test then waits for the request and checks that the UI reflects the mock data.