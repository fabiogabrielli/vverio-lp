VVERIO Agenzia waitlist patch

1) Replace your current script.js with the supplied script.js.
2) Insert the contents of waitlist-modal.html immediately before </body> in /it/index.html,
   before the existing <script src="../script.js"></script> or immediately above it.
3) Append the contents of waitlist-modal.css to the end of styles.css.

The existing Agenzia button is already correct:
onclick="document.getElementById('agenziaWaitlistModal').showModal()"

Endpoint:
POST https://app.vverio.com/api/public/agency-waitlist

Payload:
{"email":"...","marketCode":"IT","source":"landing_page"}
