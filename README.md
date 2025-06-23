# 🔗 Status Code Checker (Chrome Extension)

A lightweight Chrome extension to highlight all anchor (`<a>`) links on a webpage and visually display their HTTP response status (e.g. 200, 301, 404, etc).

---

## 📌 Why I Built It

As an SEO and developer, I often needed to audit links on large pages to find:

- Broken (404) links  
- Redirects (301, 302)  
- Server errors (500s)  

Doing this manually through DevTools was tedious. So I built this tool to display **status badges inline on the page** – instantly.

---

## ⚙️ How It Works

- Click the extension icon to **toggle** it on/off  
- It scans all visible `<a>` tags
- Uses `fetch` to check each link’s HTTP status
- Adds a small badge (e.g., 200 ✅, 404 ❌) and colored borders

---

## 🧠 Tech Stack

- JavaScript (vanilla)
- Chrome Manifest V3
- Background & Content scripts

---

## 🚀 How to Install (Unpacked)

1. Clone or download this repo  
   👉 [github.com/amal-alexander/status-code-checker](https://github.com/amal-alexander/status-code-checker)

2. Open Chrome and go to:  
   `chrome://extensions/`

3. Enable **Developer Mode** (top-right)

4. Click **"Load unpacked"** and select this folder

5. Visit any webpage and click the extension icon to activate 🎯

---

## 👨‍💻 Author

Made with ❤️ by [Amal Alexander](https://www.linkedin.com/in/amal-alexander-305780131/)

---

## 📸 Screenshots!

![image](https://github.com/user-attachments/assets/3182954d-fafd-44af-997a-2a71f66a99fa)

