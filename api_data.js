define({ "api": [
  {
    "type": "get",
    "url": "/api/v1/country",
    "title": "Country index",
    "group": "Country",
    "name": "CountryIndex",
    "description": "<p>Returns information from all countries.</p>",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Query params": [
          {
            "group": "Query params",
            "type": "Number",
            "size": "0..",
            "optional": true,
            "field": "page",
            "defaultValue": "0",
            "description": "<p>Page to show.</p>"
          },
          {
            "group": "Query params",
            "type": "Number",
            "size": "0..",
            "optional": true,
            "field": "per_page",
            "defaultValue": "20",
            "description": "<p>Element per page to show.</p>"
          },
          {
            "group": "Query params",
            "type": "String",
            "allowedValues": [
              "\"name\"",
              "\"confirmed\"",
              "\"recovered\"",
              "\"deaths\"",
              "\"active\"",
              "\"updatedAt\""
            ],
            "optional": true,
            "field": "order_by",
            "defaultValue": "name",
            "description": "<p>Order by value.</p>"
          },
          {
            "group": "Query params",
            "type": "String",
            "allowedValues": [
              "\"asc\"",
              "\"desc\""
            ],
            "optional": true,
            "field": "order_direction",
            "defaultValue": "asc",
            "description": "<p>Order direction.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "countries",
            "description": "<p>Countries list.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "countries._id",
            "description": "<p>Country id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "countries.name",
            "description": "<p>Country name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "countries.updatedAt",
            "description": "<p>Country last update.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "countries.latitude",
            "description": "<p>Country geo latitude.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "countries.longitude",
            "description": "<p>Country geo longitude.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "countries.confirmed",
            "description": "<p>Confirmed patients.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "countries.recovered",
            "description": "<p>Recovered patients.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "countries.deaths",
            "description": "<p>Deaths.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "countries.active",
            "description": "<p>Active.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "paginator",
            "description": "<p>Paginator object.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "paginator.page",
            "description": "<p>Indicates the current page.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "paginator.per_page",
            "description": "<p>Indicates the number of items per current page.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "paginator.total_elements",
            "description": "<p>Indicates the maximum number of items.</p>"
          }
        ]
      }
    },
    "filename": "/home/runner/work/coronavirusnumbers-express-api/coronavirusnumbers-express-api/src/routes/api/v1/Docs/CountryDoc.ts",
    "groupTitle": "Country"
  },
  {
    "type": "get",
    "url": "/api/v1/country/:id",
    "title": "Country show",
    "group": "Country",
    "name": "CountryShow",
    "description": "<p>Returns the information for the selected country.</p>",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Query params": [
          {
            "group": "Query params",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Country id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Country id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Country name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Country last update.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>Country geo latitude.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>Country geo longitude.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "confirmed",
            "description": "<p>Confirmed patients.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "recovered",
            "description": "<p>Recovered patients.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "deaths",
            "description": "<p>Deaths.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "active",
            "description": "<p>Active.</p>"
          }
        ]
      }
    },
    "filename": "/home/runner/work/coronavirusnumbers-express-api/coronavirusnumbers-express-api/src/routes/api/v1/Docs/CountryDoc.ts",
    "groupTitle": "Country"
  }
] });
