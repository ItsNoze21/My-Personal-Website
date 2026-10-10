# Devlog — Personal Portfolio Website

Development log for my first website. Entries are added in reverse-chronological order.

---

## Entry #1 — October 10, 2026

**Overview.** I am building a personal portfolio site to host my future work: coding projects, 3D art made in Blender, and writing. The site is currently under local development, with deployment to GitHub Pages planned once the core features are complete.

**Stack.** Plain HTML, CSS, and JavaScript — no frameworks or build tools. This was a deliberate choice: for a first site, I want to understand every line.

**Process.** This is my first experience writing code. I am building the site collaboratively with an AI mentor that explains concepts, provides patterns to follow, and reviews my work. Apart from the initial boilerplate, all code has been written by me.

**Completed:**

- Site skeleton: navigation, hero, About, Work, and Contact sections, plus footer
- Hero section (my first HTML): name, summary line, and links to my Linktree and work
- About and Contact content, including a `mailto:` link
- Design system: seven CSS color variables; selected Montserrat as the typeface
- Typography: fluid heading sizes with `clamp()`, `65ch` line lengths, centered section containers
- Self-directed additions beyond the planned steps:
  - Sections restyled as rounded cards
  - Replaced the mint accent with a monochrome gray palette and white hover states
  - Smooth color transitions on link hover
  - Footer styling, including an override of the global paragraph rule

**Issues encountered:**


1. Loaded Montserrat through Google Fonts but initially did not update `font-family` in the CSS
2. Known issue: the footer currently sits outside the `</body>` tag. Browsers correct this silently, but the markup is invalid and will be moved inside the body

**Learned:** CSS custom properties, hex color composition, `target="_blank"` for external links, in-page anchor links, `mailto:` links, `rem`/`ch`/`clamp()` units, margin-based centering, and the edit–save–refresh development loop.

**Next:** sticky navigation using flexbox, styled hero buttons, a Work section with category filtering (Code / 3D / Writing), a dark/light theme toggle, and deployment to GitHub Pages.

This is my first project and devlog entry for Hack Club Terra.
