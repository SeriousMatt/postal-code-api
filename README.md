# Postal-code-api

A Node.js + Express API that serves the GeoName’s Postal Code file for the US. The file data is imported into a PostgreSQL database and queried to build the results. Two API endpoint(s) exist:

1. Find a single place by zip code (f.e. http://localhost:3000/postcodes/76579)

2. Find all of the zip codes in a state, including a way to paginate through the results (f.e. http://localhost:3000/states/TX?page=1&limit=12).

Pure postal awesomeness.

## Getting Started

git clone https://gitlab.com/SeriousMatt/postal-code-api.git

### Prerequisites

Recommended to install the [PostgresApp](http://postgresapp.com/documentation/install.html) for local use.

### Installing

```
npm install
```

### Running

```
npm start
```

### Creating data

```
npm run-script create-db
```

Note: The file in the "data" folder named "postal_codes.sql" has a path relative to my setup. Line 19 will need to be changed for your setup.

### Tests

According to [Google's JavaScript style guide](https://google.github.io/styleguide/jsguide.html).

```
npm run-script lint
```

## Deployment

```
npm run-script deploy
```
## Built With

* [NodeJS](https://expressjs.com/) - The web framework used.


## Versioning

1.0

## Authors

* **Matt Reynolds** - *Initial work* - [SeriousMatt](https://github.com/SeriousMatt)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
