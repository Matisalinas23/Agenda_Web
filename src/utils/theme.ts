export const toggleTheme = () => {
  const html = document.documentElement
  const isDark = html.classList.contains("dark")

  if (isDark) {
    html.classList.remove("dark")
    localStorage.setItem("theme", "light")
  } else {
    html.classList.add("dark")
    localStorage.setItem("theme", "dark")
  }
}

export const initTheme = () => {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark")
  }
}
