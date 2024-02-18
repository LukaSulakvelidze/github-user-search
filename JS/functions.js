export function dark_mode_switch() {
  let body = document.body;
  let mode_p = document.getElementById("mode_p");
  let moon_icon = document.getElementById("dark_icon");
  let sun_icon = document.getElementById("light_icon");
  moon_icon.style.display = "block";
  let input = document.getElementById("input");
  body.classList.toggle("body_dark");
  input.classList.toggle("input_dark");

  if (body.classList.contains("body_dark")) {
    // Dark Mode On
    mode_p.textContent = "LIGHT";
    mode_p.style.color = "white";
    moon_icon.style.display = "none";
    sun_icon.style.display = "inline-block";
  } else {
    // Dark Mode Off
    mode_p.textContent = "DARK";
    mode_p.style.color = "#4b6a9b";
    moon_icon.style.filter = "block";
    sun_icon.style.display = "none";
  }

  let user_personal_information = document.querySelector(
    ".user_personal_information_1"
  );
  user_personal_information.classList.toggle(
    "user_personal_information_1_dark"
  );

  let user_container = document.querySelector(".user_container");
  user_container.classList.toggle("user_container_dark");

  let user_join_date = document.querySelector(".user_join_date");
  user_join_date.classList.toggle("user_join_date_dark");

  let user_bio = document.querySelector(".user_bio");
  user_bio.classList.toggle("user_bio_dark");

  let user_stat = document.querySelector(".user_stat");
  user_stat.classList.toggle("user_stat_dark");

  let stat = document.querySelectorAll(".stat");
  stat.forEach((stat_changer) => {
    stat_changer.classList.toggle("stat_dark");
  });

  let stat_quantity = document.querySelectorAll(".stat_quantity");
  stat_quantity.forEach((stat_quantity_changer) => {
    stat_quantity_changer.classList.toggle("stat_quantity_dark");
  });

  let user_contact = document.querySelector(".user_contact");
  user_contact.classList.toggle("user_contact_dark");
}

export function no_result_response() {
  let screen_width = window.innerWidth;
  let input = document.getElementById("input");
  let form = document.querySelector(".form");

  if (screen_width < 500) {
    input.style.border = "1px solid #F74646";
  } else {
    let result_span = document.createElement("span");
    form.appendChild(result_span);
    result_span.textContent = "No result";
    result_span.classList.add("no_result");
    input.style.border = "none";
  }
}

export function remove_result_span() {
  let result_span = document.querySelector(".no_result");
  if (result_span) {
    result_span.remove();
  }
}

export function check_user() {
  let input = document.getElementById("input");
  let user_container = document.querySelector(".user_container");
  fetch(`https://api.github.com/users/${input.value}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.name == undefined || input.value === "") {
        loader();
        setTimeout(() => {
          stop_loader();
          no_result_response();
          user_container.style.display = "none";
        }, 1400);
        // console.log("test search");
      } else {
        // console.log("test else");
        api_search();
        loader();
        setTimeout(() => {
          stop_loader();
        }, 1400);
        user_container.style.display = "flex";
        input.style.border = "none";
        remove_result_span();
      }
    });
}

export function api_search() {
  let input = document.getElementById("input").value;

  fetch(`https://api.github.com/users/${input}`)
    .then((response) => response.json())
    .then((data) => {
      let user_avatar = document.querySelectorAll(".user_avatar");
      user_avatar.forEach((item) => {
        item.src = `${data.avatar_url}`;
      });

      let user_name = document.querySelector(".user_name");
      user_name.textContent = `${data.name}`;

      let username = document.querySelector(".username");
      username.textContent = `${data.login}`;

      let user_join_date = document.querySelector(".user_join_date");
      user_join_date.textContent = `${data.created_at}`;

      let bio = document.getElementById("bio");
      if (data.bio === null) {
        bio.textContent = "Bio: No Bio";
      } else {
        bio.textContent = `${data.bio}`;
      }

      let repos = document.getElementById("repos");
      repos.textContent = `${data.public_repos}`;

      let followers = document.getElementById("followers");
      followers.textContent = `${data.followers}`;

      let following = document.getElementById("following");
      following.textContent = `${data.following}`;

      let city_icon = document.getElementById("city_icon");
      let city = document.getElementById("city");
      if (data.location === null) {
        city.textContent = "No Location";
        city.style.opacity = ".5";
        city_icon.style.opacity = ".5";
      } else {
        city.textContent = `${data.location}`;
        city.style.opacity = "1";
        city_icon.style.opacity = "1";
      }

      let blog_icon = document.getElementById("blog_icon");
      let github_blog = document.getElementById("github_blog");
      if (data.blog === "") {
        github_blog.textContent = "No Blog";
        github_blog.style.opacity = ".5";
        blog_icon.style.opacity = ".5";
      } else {
        github_blog.textContent = `${data.blog}`;
        blog_icon.style.opacity = "1";
        blog_icon.style.opacity = "1";
      }

      let twitter_icon = document.getElementById("twitter_icon");
      let twitter = document.getElementById("twitter");
      if (data.twitter_username === null) {
        twitter.textContent = "Not Available";
        twitter.style.opacity = ".5";
        twitter_icon.style.opacity = ".5";
      } else {
        twitter.textContent = `${data.twitter_username}`;
        twitter_icon.style.opacity = "1";
        twitter_icon.style.opacity = "1";
      }

      let company_icon = document.getElementById("company_icon");
      let company = document.getElementById("company");
      if (data.company === null) {
        company.textContent = "Not Available";
        company.style.opacity = ".5";
        company_icon.style.opacity = ".5";
      } else {
        company.textContent = `${data.company}`;
        company_icon.style.opacity = "1";
        company_icon.style.opacity = "1";
      }
    });
}

export function loader() {
  let loader = document.querySelector(".loader");
  let desktop_avatar = document.getElementById("desktop_avatar");
  let user_general_information = document.querySelector(
    ".user_general_information"
  );
  desktop_avatar.style.display = "none";
  user_general_information.style.display = "none";
  loader.style.display = "block";
}

export function stop_loader() {
  let screen_width = window.innerWidth;
  let loader = document.querySelector(".loader");
  let desktop_avatar = document.getElementById("desktop_avatar");
  let user_general_information = document.querySelector(
    ".user_general_information"
  );
  loader.style.display = "none";
  if (screen_width > 1024) {
    desktop_avatar.style.display = "block";
  } else {
    desktop_avatar.style.display = "none";
  }
  user_general_information.style.display = "flex";
}
