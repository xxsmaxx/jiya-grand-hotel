# Jiya Grand Hotel — Premium Website

## Files
- `index.html` — complete page content, forms, navigation and metadata
- `style.css` — responsive luxury styling
- `script.js` — mobile menu, form validation, WhatsApp enquiry handoff, gallery lightbox and reveal animations\n- `logo.svg` — custom Jiya Grand monogram crest used in the header, footer and browser tab

## Run locally
1. Download and extract `jiya_grand_hotel.zip`.
2. Open the `jiya_grand_hotel` folder in Visual Studio Code.
3. Open `index.html` in your browser, or install the VS Code extension **Live Server** and choose **Open with Live Server**.
4. Internet access is needed for Google Fonts, Unsplash image URLs, Google Maps and WhatsApp.

## Before publishing
- Confirm the hotel WhatsApp number. The current enquiry destination is `+91 99392 17115`, editable at the top of `script.js`.
- Confirm the room count (47), displayed ₹2,000 tariff, 10% offer and all terms.
- Confirm amenities, room categories, ₹699 vegetarian / ₹999 non-vegetarian plate rates.
- Confirm address spelling, exact map pin, and whether the location text is accurate.
- Replace illustrative Unsplash stock images with approved hotel photography where possible. The gallery explicitly labels imagery as illustrative.
- Add a real backend only if enquiries need to be stored or reservations confirmed. Current forms open a prefilled WhatsApp message and do not confirm a booking.
- Social media links are omitted because verified accounts were not supplied.

## Notes
- No build step or package installation is required.
- Forms perform browser-side required-field validation and date checks.
- This is a static front-end prototype; it does not store customer information on a server.
