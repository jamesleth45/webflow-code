# Custom Webflow Build

This project is a fully custom, clean-coded Webflow site using external CSS and JavaScript.  
Built in VS Code, pushed to Netlify, and linked into Webflow.

---

## 🧠 Project Philosophy

- Desktop-first, mobile-responsive using Webflow-style breakpoints
- CSS follows strict 13-part property order for all blocks
- Clean BEM class naming, matching HTML order
- DRY, modular, OCD-level perfection
- No utility classes (Webflow’s removed via JS)

---

## 📐 CSS Order (13-Part System)

1. Positioning  
2. Display & Box Model  
3. Flex/Grid  
4. Sizing  
5. Spacing  
6. Borders  
7. Background  
8. Typography  
9. Colors & Opacity  
10. Visuals (shadows, filters)  
11. Transitions & Animations  
12. Transforms  
13. Misc (cursor, overflow, etc.)

Each block must follow this order, with blank lines between categories.

---

## 🧱 Components & Order

- `header`
- `hero`
- `product-listing`
- `panel`
- `footer`

Each section’s CSS follows the HTML structure 1:1.

---

## 🎯 Dev Rules

- Don’t mix property groups
- No `!important`
- No unused classes
- Use regions for folding:

```css
/* #region Header */
/* #endregion */


<link rel="stylesheet" href="https://use.typekit.net/bcv4gbp.css">
<link rel="stylesheet" href="https://gregarious-lily-7e1293.netlify.app/css/style.css">
<script src="https://gregarious-lily-7e1293.netlify.app/js/script.js" defer></script>