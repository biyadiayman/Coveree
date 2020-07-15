# Coveree

## Test API
to run the api first install the modules with `npm install` then just run `node index.js` or use nodemon for auto reload

Doc links:
- http://expressjs.com/en/4x/api.html
- https://github.com/expressjs/multer

Endpoints:
|Method|Route|Description|
|----|----|-----|
|GET| /price | Takes a JSON object and returns a price in JSON format (example bellow table) |
|POST| /damage | Takes an image and returns another one (still static at the moment|

### example for the /price endpoint:

input:
```
{
    "name": "BOND James",
    "car": "Aston Martin DB5",
    "drink": "Martini shaken not stirred",
    "salary": 133700
}
```
output:
```{
    "price": 133769.42
}
```

### example for the /damage endpoint:

input:
![carCrash](TestAPI/images/90915185529ae2bb0b455e0cb8e5b23a)
output:
![carCrash](TestAPI/images/DB5Wasted.png)
