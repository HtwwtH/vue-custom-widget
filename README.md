# vue-custom-widget

### Add widgets, drag & drop, remove widget from the main wigdet table!

### Using Vue 3, web components, vue-draggable-next

### Used API (you shoul get api keys here):

[Exchange Rates Data API](https://apilayer.com/marketplace/exchangerates_data-api)

[OpenWeather](https://openweathermap.org/)

![Screenshot](https://github.com/HtwwtH/vue-custom-widget/blob/main/Screenshot1.png)

![Screenshot](https://github.com/HtwwtH/vue-custom-widget/blob/main/Screenshot2.png)

## Project setup
```
npm install
```

## Copy .env.example to .env and add your api keys

```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

### ! Note that when you exceed the limit of requests, you will get an error (250 requests/monthly for exchange rates api, 1000 requests/daily for weather api). Date widget doesn't use an api.
