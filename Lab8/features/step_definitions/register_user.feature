Feature: User account
  Manipulating with user account

  Scenario: Register User
    When I launch browser and navigate to website
    Then homepage is visible
    When I click 'Signup and Login'
    Then 'New User Signup!' is visible
    Given my username
    And my email
    When I enter the email and password into "Signup" form
    When I click 'Signup'
    Then 'ENTER ACCOUNT INFORMATION' is visible
    When I fill the acount details
    And I click 'Create Account'
    Then 'ACCOUNT CREATED!' is visible
    When I click 'Continue'
    Then I logged and my username is visible
    When I click 'Delete Account'
    Then 'ACCOUNT DELETED!' is visible

  Scenario: User login
    Given the user has registered with username and email
    When I launch browser and navigate to website
    Then homepage is visible
    When I click 'Signup and Login'
    Then the "Login to your account" form is visible
    When I enter the email and password into "Login" form
    And I click the "login" button
    Then I logged and my username is visible
    When I click 'Delete Account'
    Then 'ACCOUNT DELETED!' is visible

  Scenario: Login with incorrect email and password
    When I launch browser and navigate to website
    Then homepage is visible
    When I click 'Signup and Login'
    Then the "Login to your account" form is visible
    When I enter incorrect email and password
    And I click the "login" button
    Then I should see the error message 'Your email or password is incorrect!'

  Scenario: Logout after logging in
    Given the user has registered with username and email
    When I launch browser and navigate to website
    Then homepage is visible
    When I click 'Signup and Login'
    Then the "Login to your account" form is visible
    When I enter the email and password into "Login" form
    And I click the "login" button
    Then I logged and my username is visible
    When I click the logout button
    Then I should be redirected to the login page

  Scenario: Register with an already used email
    Given the user has registered with username and email
    When I launch browser and navigate to website
    Then homepage is visible
    When I click 'Signup and Login'
    Then 'New User Signup!' is visible
    When I enter the email and password into "Signup" form
    And I click 'Signup'
    Then an error message about existing email should be displayed
