# BEERME

## Purpose

Query the **[Open Brewery DB](https://www.openbrewerydb.org/)** for breweries around the US and display information about the breweries.

## Tech Used

- HTML
  -Bootstrap 5
  -Vanilla JS
  -Fetch API

## Additional Tools

[Universal Tutorials API](https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city) for populating the state and city dropdowns

## To Do Next

- Styles revamp
- Resolve Error with State and City Population
  - Use [promise-retry](https://www.npmjs.com/package/promise-retry) to overcome the occasional auth issue for list population
- Find better resource for state and city list population
  - Current API includes incorrect states and cities
