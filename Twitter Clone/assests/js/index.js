//profile and home button functionality

function homeSection() {
  $("#profileSection").addClass("d-none");
  $("#subTweetSection").removeClass("d-none");
}
function profileSection() {
  $("#subTweetSection").addClass("d-none");
  $("#profileSection").removeClass("d-none");
}

//logout functionality

function logout() {
  window.location.replace("../home.html");
}

var id;
var first_name;
var last_name;
var followButton;
var profileImageUrl;
id = window.localStorage.getItem("id");
var path;

path = "../assests/images/";

$.ajax({
  type: "POST",
  url: "../api/getProfile.php",
  data: {
    id,
  },
  success: function (response) {
    response = JSON.parse(response);
    profileImageUrl = path + response.data[0].profile_image_url;
    $("#profileImage").attr("src", profileImageUrl);
    $("#profileName").text(
      response.data[0].first_name + " " + response.data[0].last_name
    );

    $("#tweetId").text("twitterid@" + response.data[0].id);
  },
});

//get user posts

$.ajax({
  type: "POST",
  url: "../api/getUserPosts.php",
  data: {
    id,
  },
  success: function (response) {
    response = JSON.parse(response);
    response.data.forEach(function (items) {
      let userPostImage = $("<img>")
        .attr("src", String(profileImageUrl))
        .addClass("userImage m-2");

      let userName = $("<span></span>").text(first_name + " " + last_name);

      if (items.tweet_image_url !== "empty") {
        items.tweet_image_url = path + items.tweet_image_url;
        let imageDivison = $("<div></div>").addClass(
          "d-flex justify-content-center mt-2 p-3"
        );
        let tweetImage = $("<img>")
          .attr("src", items.tweet_image_url)
          .attr("height", "350px")
          .css("max-width", "100%")
          .addClass("tweetImage");
        let tweetText = $("<p></p>").text(items.tweet_text).addClass(" ps-4");
        imageDivison.append(tweetImage);
        $("#userPosts").append(userPostImage);
        $("#userPosts").append(userName);
        $("#userPosts").append(tweetText);

        $("#userPosts").append(imageDivison);
        const hr = $("<hr>");
        $("#userPosts").append(hr);
      } else {
        let tweetText = $("<p></p>").text(items.tweet_text).addClass("ps-2");

        $("#userPosts").append(userPostImage);
        $("#userPosts").append(userName);
        $("#userPosts").append(tweetText);
        const hr = $("<hr>");
        $("#userPosts").append(hr);
      }
    });
  },
});

//profile image upload
$("#profileImageUpload").on("change", function () {
  let path = "../assests/images/";
  const profile_image_url = $("#profileImageUpload").val().split("\\").pop();
  $.ajax({
    type: "POST",
    url: "../api/updateProfile.php",
    data: {
      id,
      profile_image_url,
    },
    success: function (response) {
      response = JSON.parse(response);
      profileImageUrl = path + response.data;
      $("#profileImage").attr("src", profileImageUrl);
    },
  });
});

$(document).ready(function () {
  id = window.localStorage.getItem("id");
  first_name = window.localStorage.getItem("first_name");
  last_name = window.localStorage.getItem("last_name");
});
var filePath;
$("#tweetImages").click(function (event) {
  $("#tweetImage").click();
});
$("#tweetImage").on("change", function () {
  filePath = $("#tweetImage").val().split("\\").pop();
  console.log(filePath);
});
function like() {
  $("#likeButton").toggleClass("like-active");
}

$("#createTweet").on("submit", function (event) {
  let tweet_text = $("#tweetText").val();
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: "../api/createTweet.php",
    data: {
      id: id,
      tweet_text,
      filePath,
    },

    success: function (response) {
      let path = "../assests/images/";
      response = JSON.parse(response);
      $("#tweetText").val("");

      let tweetDivison = $("<div></div>").addClass("tweetDivison");
      let tweetText = $("<span></span>")
        .text(response.data.tweet_text)
        .addClass("p-0 m-0 d-block ps-3");
      let profileName = $("<span></span>")
        .text(first_name + " " + last_name)
        .addClass("usersName pt-0 pe-0 pb-0");
      tweetDivison.append(profileName);
      tweetDivison.append(tweetText);

      if (response.data.tweet_image_url !== "empty") {
        response.data.tweet_image_url = path + response.data.tweet_image_url;
        let imageDivison = $("<div></div>").addClass(
          "d-flex justify-content-center mt-2"
        );
        let tweetImage = $("<img>")
          .attr("src", response.data.tweet_image_url)
          .attr("height", "350px")
          .css("max-width", "100%")
          .addClass("tweetImage");
        let likeDivison = $("<div></div>").addClass("likeDivison");
        let likeButton = $("<button></button>")
          .html('<i class="bi bi-hand-thumbs-up-fill" id="likeButton"></i>')
          .addClass("text-center likeButton")
          .attr("onclick", "like()");
        let line = $("<hr>").addClass("p-0 m-0");
        imageDivison.append(tweetImage);
        tweetDivison.append(imageDivison);
        tweetDivison.append(line);
        tweetDivison.append(likeButton);
      }

      let tweetSection = $("#tweetUpload");
      tweetSection.prepend(tweetDivison);
      filePath = $("#tweetImage").val("");
    },
    error: function () {
      console.log("invalid");
    },
  });
});

$(document).ready(function () {
  $("#searchInput").on("input", function () {
    let searchText = $(this).val().trim();
    searchUsersByName(searchText);
  });
});

$(document).ready(function () {
  $("#searchInput").on("input", function () {
    let searchName = $(this).val().trim();
    searchUsersByName(searchName);
  });
});

const localStorage = window.localStorage;

function searchUsersByName(searchName) {
  $.ajax({
    type: "POST",
    url: "../api/getUsers.php",
    data: { searchName: searchName },
    success: function (response) {
      response = JSON.parse(response);
      const data = response.data;

      let searchResultsContainer = $("#searchResults");
      searchResultsContainer.empty();

      if (data.length > 0) {
        data.forEach(function (item) {
          let userDiv = $("<div></div>").addClass("getUser");
          let userId = $("<span></span>").text("@tweeterId:" + item.id);
          let userName = $("<p></p>")
            .text(item.first_name + " " + item.last_name)
            .addClass("p-0 m-0 getUserName");
          followButton = $("<button></button>")
            .text("Follow")
            .addClass("followButton")
            .attr("id", item.id);
          const isFollowed = localStorage.getItem("followedUser_" + item.id);
          if (isFollowed === "true") {
            followButton.text("Followed");
          } else {
            followButton.text("Follow");
          }

          followButton.on("click", function () {
            Follow(item.id, followButton);
          });

          userDiv.append(userName);
          userDiv.append(userId);
          userDiv.append(followButton);
          searchResultsContainer.append(userDiv);
        });
        searchResultsContainer.show();
      } else {
        searchResultsContainer.hide();
      }
    },
    error: function () {
      console.log("Error occurred during the search.");
    },
  });
}
function Follow(userId, button) {
  const isFollowed = localStorage.getItem("followedUser_" + userId);
  if (isFollowed === "true") {
    localStorage.setItem("followedUser_" + userId, "false");
    button.text("Follow");
  } else {
    localStorage.setItem("followedUser_" + userId, "true");
    button.text("Followed");
  }

  $.ajax({
    type: "POST",
    url: "../api/follow.php",
    data: {
      user_id: id,
      follower_id: userId,
    },

    success: function (response) {
      followButton.prop("disabled", true);
    },
    error: function (response) {
      console.log("already followed");
    },
  });
}

var likeCount = 0;

function hlo(tweetId) {
  $(`#likeButton-${tweetId} i.fa`).toggleClass("like-active");

  $.ajax({
    type: "POST",
    url: "../api/updatelikes.php",
    data: {
      tweet_id: tweetId,
      user_id: id,
    },
  });
}

// Ajax for laoding posts
var users_id = window.localStorage.getItem("id");
$.ajax({
  type: "POST",
  url: "../api/posts.php",
  data: {
    id: users_id,
  },
  success: function (response) {
    let path = "../assests/images/";
    response = JSON.parse(response);
    console.log("posts response");
    console.log(response);
    response.data.forEach(function (items) {
      let tweetDivison = $("<div></div>").addClass("tweetDivison");
      let tweetText = $("<span></span>")
        .text(items.tweet_text)
        .addClass("p-0 m-0 d-block ps-3");
      if (items.profile_image_url) {
        let profileImage = $("<img>")
          .attr("src", path + items.profile_image_url)
          .addClass("postsProfileImage");
        let profileName = $("<span></span>")
          .text(items.first_name + " " + items.last_name)
          .addClass("usersName pt-0 pe-0 pb-0");
        tweetDivison.append(profileImage);
        tweetDivison.append(profileName);
        tweetDivison.append(tweetText);
      } else {
        let profileName = $("<span></span>")
          .text(items.first_name + " " + items.last_name)
          .addClass("usersName pt-0 pe-0 pb-0");
        tweetDivison.append(profileName);
        tweetDivison.append(tweetText);
      }

      if (items.tweet_image_url !== "empty") {
        items.tweet_image_url = path + items.tweet_image_url;
        let imageDivison = $("<div></div>").addClass(
          "d-flex justify-content-center mt-2"
        );
        let tweetImage = $("<img>")
          .attr("src", items.tweet_image_url)
          .attr("height", "350px")
          .css("max-width", "100%")
          .addClass("tweetImage");
        let likeDivison = $("<div></div>").addClass("text-center");
        let likeButton = $("<button></button>")
          .html('<i style="font-size:24px" class="fa likeIcon">&#xf087;</i>')
          .addClass("text-center likeButton")
          .attr("id", `likeButton-${items.tweet_id}`)
          .attr("onclick", `hlo(${items.tweet_id})`);

        let likesCount = $("<span></span>").attr(
          "id",
          `likesCount-${items.tweet_id}`
        );

        $.ajax({
          type: "POST",
          url: "../api/likesCount.php",
          data: {
            tweet_id: items.tweet_id,
          },
          success: function (response) {
            response = JSON.parse(response);
            let count = response.data;
            $(`#likesCount-${items.tweet_id}`).text(count);
          },
        });

        let line = $("<hr>").addClass("p-0 m-1");
        let secondLine = $("<hr>").addClass("p-0 m-1");
        imageDivison.append(tweetImage);
        tweetDivison.append(imageDivison);
        likeDivison.append(line);
        likeDivison.append(likeButton);
        likeDivison.append(likesCount);
        likeDivison.append(secondLine);
        tweetDivison.append(likeDivison);
      }

      let tweetSection = $("#tweetUpload");
      tweetSection.prepend(tweetDivison);
    });
  },
  error: function (xhr, status, error) {
    console.log("hooo");
  },
});
