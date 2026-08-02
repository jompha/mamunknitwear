# Contact

## Contact details

All public contact information is defined in `src/data/site.ts` and rendered
on `/contact-us/`.

| Field             | Value                                                 |
| ----------------- | ----------------------------------------------------- |
| Company           | Mamun Knitwear Ltd.                                   |
| Address           | Aambag Road, Konabari, Nilnagar, Gazipur, Bangladesh  |
| Public email      | info@mamunknitwear.com                                |
| Site contact (IT) | Md Mahfujur Rahman, Manager IT — robin@mmknitwear.com |
| Phone             | +880 9666 791791                                      |
| Alt phone         | +880 2 9298787                                        |
| Fax               | +880 9666768768                                       |
| Facebook          | facebook.com/mamunknitwearltd                         |
| Website           | https://mamunknitwear.com                             |

## The static contact form

The rebuilt site has no backend, so the contact form cannot submit to a
server the way the WordPress form did. Instead:

- By default (`contactFormEndpoint: ''` in `src/data/site.ts`) the form is a
  **JS-enhanced `mailto:` fallback**: on submit it opens the visitor's mail
  client pre-filled to `info@mamunknitwear.com` with the form contents.
- A hidden **honeypot field** (`website` — see `ContactForm.astro`) catches
  bots; submissions that fill it are silently dropped.
- `data-testid="contact-form"` is present for the Playwright E2E suite.

### Enabling real submissions

To receive form data server-side, set `contactFormEndpoint` in
`src/data/site.ts` to a POST endpoint (e.g. a serverless function, Formspree,
or similar) that accepts the fields `name`, `email`, `subject`, `message`.
`ContactForm.astro` already posts JSON to that endpoint when it is non-empty.
Never commit credentials or API keys to this repo.
