# Nursery-Nav

<p align="center">
    <img width="300" height="300" src="./img/promo.jpg">
</p>

NurseryNav simplifies the search for nearby nursery schools by providing an easy-to-use map interface to help you find the perfect childcare option for your little ones.

**Live URL:** TBD

---
This project is part of [100 commitow challenge](https://100commitow.pl/). It helps me learn frontend technologies like React and Typescript.

## Stack

* [React](https://react.dev/)
* [Typescript](https://www.typescriptlang.org/)
* [React Leaflet](https://react-leaflet.js.org/)
* [MUI](https://mui.com/material-ui/getting-started/)

## Getting Started

### Prerequisites

* Node v21.6.2

### Frontend

Go to `./src/nursery-nav` and run `npm start`.

### Backend

For MVP version, there is a static JSON file provided as backend API.
Check `./data/RZ-instytucje-enriched.json`

## Features

### MVP
* [x] Static data source
* [x] Map
* [x] Pins on map
* [x] Institution details view
* [x] Search
* [x] Display institution details on pin click
* [x] Basic component styling
* [x] Group pins on the map
* [x] SEO
* [x] Sorting
* [x] Filtering
* [x] Direct URLs to each institution
* [ ] CICD
* [ ] Live URL

### Phase 2
* [ ] DB data source
* [ ] API
* [ ] Infinite scroll
* [ ] CSV import

### Phase 3
* [ ] Institution profile
* [ ] Institution rating

## Data source

Static file `/data/RZ-instytucje.csv`.

Original data source - [Rejestr Żłobków - lista instytucji - dane.gov.pl](https://dane.gov.pl/pl/dataset/2106/resource/55499/table).

License: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/legalcode.pl)