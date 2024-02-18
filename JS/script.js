import { dark_mode_switch } from "./functions.js";
let dark_mode_cont = document.querySelector(".dark_mode_cont");
let mode_p = document.getElementById("mode_p");
mode_p.textContent = "DARK";
dark_mode_cont.addEventListener("click", () => {
  dark_mode_switch();
});

import { check_user } from "./functions.js";
let search_button = document.getElementById("search_button");
search_button.addEventListener("click", () => {
  check_user();
});

let input = document.getElementById("input");
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    check_user();
  }
});
