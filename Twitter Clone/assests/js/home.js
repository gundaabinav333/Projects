// Validations for user registration
$(document).ready(function () {
  $("#firstName").on("blur", firstNameValidation);
  $("#lastName").on("blur", lastNameValidation);
  $("#password").on("blur", passwordValidation);
  $("#phone").on("blur", phoneNumberValidation);
  $("#email ").on("blur", emailValidation);
});
function firstNameValidation() {
  let firstName = $("#firstName").val();
  let pattern = /^[A-Za-z]{3,}$/;
  if (firstName === "") {
    $("#firstNameError").text("First name should not be empty");
    return false;
  } else if (!pattern.test(firstName)) {
    $("#firstNameError").text(
      "First name should contain only alphabetic characters and should contact 3 letters"
    );
    return false;
  } else {
    $("#firstNameError").text("");
    return true;
  }
}
function lastNameValidation() {
  let lastName = $("#lastName").val();
  let pattern = /^[A-Za-z]{3,}$/;
  if (lastName === "") {
    $("#lastNameError").text("Last name should not be empty");
    return false;
  } else if (!pattern.test(lastName)) {
    $("#lastNameError").text(
      "Last name should have a minimum of 3 characters, and should not contain numbers or special characters"
    );
    return false;
  } else {
    $("#lastNameError").text("");
    return true;
  }
}

function phoneNumberValidation() {
  let phone = $("#phone").val();
  let pattern = /^\d{10}$/;

  if (phone === "") {
    $("#phoneError").text("Phone number is required.");
    return false;
  } else if (!pattern.test(phone)) {
    $("#phoneError").text("Phone number should be a 10-digit number.");
    return false;
  } else {
    $("#phoneError").text("");
    return true; // Clear the error
  }
}

function passwordValidation() {
  let password = $("#password").val();
  if (password.length < 8) {
    $("#passwordError").text("Password must be at least 8 characters");
    return false;
  } else {
    $("#passwordError").text("");
    return true;
  }
}

function emailValidation() {
  let email = $("#email").val();
  let emailError = $("#emailError");

  if (email.trim() === "") {
    emailError.text("Email should not be empty.");
    return false;
  } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
    emailError.text(
      "Please enter a valid email address. for ex:gunda@gmail.com"
    );
    return false;
  } else {
    emailError.text("");
    return true;
  }
}

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var isFirstNameValid = firstNameValidation();
  var isLastNameValid = lastNameValidation();
  var isPasswordValid = passwordValidation();
  var isPhoneValid = phoneNumberValidation();
  var isEmailValid = emailValidation();

  if (
    isFirstNameValid &&
    isLastNameValid &&
    isPasswordValid &&
    isPhoneValid &&
    isEmailValid
  ) {
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var phone = $("#phone").val();

    $.ajax({
      method: "POST",
      url: "./api/register.php",
      data: {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        email: email,
        password: password,
      },
      success: function (response) {
        response = JSON.parse(response);
        var status = response.status;
        if (response.status === false) {
          $("#failMessage").text(response.message);
        } else {
          $("#myForm").addClass("d-none");
          $("#successMessage").text("Registration Successful!");
        }
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  }
});

function login(event) {
  event.preventDefault();
  let email = $("#userEmail").val();
  let password = $("#userPassword").val();

  $.ajax({
    method: "POST",
    url: "./api/login.php",
    data: {
      email: email,
      password: password,
    },
    success: function (response) {
      console.log(response);

      var parsedResponse = JSON.parse(response);

      if (parsedResponse.status === true) {
        console.log(parsedResponse);
        window.localStorage.setItem("id", parsedResponse.data.id);
        window.localStorage.setItem("email", parsedResponse.data.email);
        window.localStorage.setItem(
          "first_name",
          parsedResponse.data.first_name
        );
        window.localStorage.setItem(
          "last_name",
          parsedResponse.data.user.last_name
        );
        window.location.replace("./dashboard");
      } else {
        $("#error").text(parsedResponse.message);
      }
    },
    error: function () {
      console.log("invalid");
    },
  });
}
