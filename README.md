Some useful documentation links for the Oracle Digital Assistant YAML API:

- https://docs.oracle.com/en/cloud/paas/digital-assistant/use-chatbot/dialog-flow-definition.html#GUID-0B6FC815-E528-4DA3-A59C-87C083F042FD
- https://cdn.app.compendium.com/uploads/user/e7c690e8-6ff9-102a-ac6d-e4aebca50425/e6ee15e8-2e68-4a1a-adad-eac941a469d4/File/e7d9cf54cd5f543e83971fd26588e232/apachefreemarkerinbotml_v2.pdf
- https://docs.oracle.com/en/cloud/paas/mobile-suite/develop/toc.htm
- https://docs.oracle.com/en/cloud/paas/digital-assistant/index.html

This JavaScript library aims to make developing an instance of an Oracle Digital Assistant a better UX, specifically when it comes to defining the Flow of a Digital Assistant (formerly known as a chatbot). With this library, a Digital Assistant developer shall be able to specify a bot's Flow using JavaScript, rather than using YAML. The JavaScript need only be converted to a corresponding YAML format (by a script which this project shall provide) which may then be copy-pasted in the Digital Assistant cloud console.

Furthermore, this is an open-source library to promote ease of access to Oracle's Digital Assistant product.

Currently, `usage.js` is where I'm working out my inspiration for how `lib.ts` should feel and work. The project structure and API will definitely change over the next week or so.

DISCLAIMER: This is very much a work in-progress as of Friday, 3-1-19 and is still being designed and implemented. This project was started on the evening of Thursday, 2-28-19.