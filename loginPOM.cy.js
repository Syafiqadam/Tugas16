import loginPage from "../../support/PageLoginOrange/loginPage";

describe("Fitur Login - OrangeHRM dengan POM", () => {
  beforeEach(() => {
    loginPage.visitLoginPage();
  });

  it("Login berhasil dengan kredensial valid", () => {
    loginPage.interceptLogin();
    loginPage.interceptDashboard();
    loginPage.typeUsername("Admin");
    loginPage.typePassword("admin123");
    loginPage.clickLogin();
    loginPage.assertLoginSuccess();
  });

  it("Login gagal dengan password salah", () => {
    loginPage.interceptLogin();
    loginPage.typeUsername("Admin");
    loginPage.typePassword("adam123");
    loginPage.clickLogin();
    loginPage.assertLoginFailure();
  });

  it("Login gagal dengan username salah", () => {
    loginPage.interceptLogin();
    loginPage.typeUsername("syafiq121");
    loginPage.typePassword("admin123");
    loginPage.clickLogin();
    loginPage.assertLoginFailure();
  });

  it("Login gagal dengan username kosong", () => {
    loginPage.typePassword("admin123");
    loginPage.clickLogin();
    loginPage.assertRequiredError(1);
  });

  it("Login gagal dengan password kosong", () => {
    loginPage.typeUsername("Admin");
    loginPage.clickLogin();
    loginPage.assertRequiredError(1);
  });

  it("Login gagal dengan username dan password kosong", () => {
    loginPage.clickLogin();
    loginPage.assertRequiredError(2);
  });

  it("User diarahkan ke halaman reset password saat klik 'Forgot your password?'", () => {
    loginPage.clickForgotPassword();
    loginPage.assertResetPasswordPage();
  });

  it("Validasi link 'ahsik' tidak tersedia", () => {
    loginPage.assertLinkNotExist("ahsik");
  });

  it("Validasi link 'nmnmnm' tidak tersedia", () => {
    loginPage.assertLinkNotExist("nmnmnm");
  });
});
