class LoginPage {
  // Navigasi ke halaman login
  visitLoginPage() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
  }

  // Input field
  typeUsername(username) {
    cy.get("input[name='username']").type(username);
  }

  typePassword(password) {
    cy.get("input[name='password']").type(password);
  }

  // Klik login
  clickLogin() {
    cy.get("button[type='submit']").click();
  }

  // Klik link lupa password
  clickForgotPassword() {
    cy.contains("Forgot your password?").click();
  }

  // Intercept login request
  interceptLogin() {
    cy.intercept(
      "POST",
      "https://opensource-demo.orangehrmlive.com/web/api/v2/dashboard/employees/action-summary"
    ).as("actionSummary");
  }

  // Intercept dashboard request setelah login
  interceptDashboard() {
    cy.intercept(
      "get",
      "https://opensource-demo.orangehrmlive.com/web/api/v2/dashboard/employees/action-summary"
    ).as("actionSummary");
  }
  // Assertion sukses login
  assertLoginSuccess() {
    cy.url().should("include", "/dashboard");
    cy.get("h6").should("contain.text", "Dashboard");
  }

  // Assertion gagal login
  assertLoginFailure() {
    cy.get(".oxd-alert-content").should("contain.text", "Invalid credentials");
  }

  // Validasi pesan Required
  assertRequiredError(minLength = 1) {
    cy.get(".oxd-input-field-error-message")
      .should("contain.text", "Required")
      .and("have.length.at.least", minLength);
  }

  // Validasi halaman reset password
  assertResetPasswordPage() {
    cy.url().should("include", "/requestPasswordResetCode");
    cy.get("h6").should("contain.text", "Reset Password");
  }

  // Validasi link tidak tersedia
  assertLinkNotExist(linkText) {
    cy.contains(linkText).should("not.exist");
    cy.get("body").then(($body) => {
      if ($body.text().includes(linkText)) {
        throw new Error(`Teks '${linkText}' tidak seharusnya muncul.`);
      } else {
        cy.log(`'${linkText}' tidak ditemukan, sesuai negative case.`);
      }
    });
  }
}

export default new LoginPage();
