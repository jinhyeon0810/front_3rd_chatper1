import { Router } from "./classes/Router";
import { User } from "./classes/User";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { NotFound } from "./pages/NotFound";
import { ProfilePage } from "./pages/ProfilePage";

export const router = new Router();
export const user = new User();
export function isLoggedIn() {
  return user?.preferences?.username?.length > 0;
}

router.addRoute("/", HomePage);
router.addRoute("/profile", ProfilePage);
router.addRoute("/login", LoginPage);
router.addRoute("/404", NotFound);

export function handleRouting() {
  const links = document.querySelectorAll("a");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      router.navigateTo(e.target.getAttribute("href"));
    });
  });
}

export function Logout() {
  const logoutEl = document.querySelector("#logout");
  if (logoutEl)
    logoutEl.addEventListener("click", () => {
      user.clear();
      router.navigateTo("/");
      console.log("로그아웃");
    });
}

document.addEventListener("DOMContentLoaded", () => {
  router.handleRoute(window.location.pathname);
});
