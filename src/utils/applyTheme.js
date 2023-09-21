export function applyTheme() {
  const theme = localStorage.getItem("theme");
  console.log(theme);
  if (!theme || theme === "dark") {
    console.log("adding dark");
    document.documentElement.classList.add("dark");
  } else {
    console.log("removing dark");
    document.documentElement.classList.remove("dark");
  }
}
