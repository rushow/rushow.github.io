# rushow.github.io

Personal website of **Md Moman Ul Haque Khan**: software engineer, machine learning researcher and computer science educator in Regina, Saskatchewan.

Live at <https://rushow.github.io/>.

## How it's built

Plain HTML, CSS and a few lines of vanilla JavaScript, served by GitHub Pages. There is no build step and no framework, so the site loads fast and needs no maintenance. The look is a modernized version of the original site: dark starry hero, Poppins headings and the original blue accent (#526AF5).

```
index.html               all page content
404.html                 not-found page
assets/css/style.css     all styles
assets/js/main.js        header on scroll, mobile menu, active nav link
assets/fonts/            self-hosted fonts (no Google Fonts requests)
assets/img/              portrait, background images, social preview image, icons
assets/Moman_Khan_Resume.pdf
favicon.svg, favicon.png
robots.txt, sitemap.xml
.nojekyll                tells GitHub Pages to serve files as-is
```

## Common updates

- **New resume:** replace `assets/Moman_Khan_Resume.pdf` and keep the same file name, so the download link keeps working.
- **New publication:** add an `<li>` to the `pubs` list in `index.html`, newest first.
- **New job or teaching role:** copy an existing `<li>` in the Experience or Teaching section and edit it.
- **New photo:** replace `assets/img/moman-khan.jpg` and `moman-khan.webp`. A square image of at least 400 × 400 px looks best.
- After editing, update the "Last updated" line in the footer and `lastmod` in `sitemap.xml`.

To preview locally, run `python3 -m http.server` in this folder and open <http://localhost:8000>.

## Credits

- Headings: [Poppins](https://fonts.google.com/specimen/Poppins) (SIL Open Font License), subset to Latin.
- Body text: [Lato](https://www.latofonts.com/) by Łukasz Dziedzic (SIL Open Font License), subset to Latin.
- Icons: [Font Awesome Free](https://fontawesome.com/license/free) (CC BY 4.0), inlined as an SVG sprite.
- Background photos: from the original site's template, sourced from [Unsplash](https://unsplash.com/).
