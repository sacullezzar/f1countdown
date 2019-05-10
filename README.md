# F1Countdown

## Technologies used:
- React
- Webpack
- Babel
- Jest
- Enzyme

## To get started:
- Clone this repo to your local directory and install dependencies:

```
git clone https://github.com/sacullezzar/f1countdown/
cd f1countdown
npm install
```
- You can run the app in dev mode (live reload enabled) using:

`npm run dev`

Then go to http://localhost:8080

## Version Control:

- The default branch is set to staging.
- Please ensure you create a new branch for your work!
`git checkout -b <your branch name>`

## Testing

An aim of this app is to be Test Driven as much as possible. Currently in use are Jest and Enzyme. Jest being the main framework and assertion library and Enzyme to help render React components for testing.

### Results Data

Results are pulled from the API depending on the selected race.
The objects accessible from the component resultsData have the following structure:
```

{
    Constructor: {
        constructorId: "mercedes",
        name: "Mercedes",
        nationality: "German",
        url: "http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One"
        },
    Driver: {
        code: "BOT",
        dateOfBirth: "1989-08-28",
        driverId: "bottas",
        familyName: "Bottas",
        givenName: "Valtteri",
        nationality: "Finnish",
        permanentNumber: "77",
        url: "http://en.wikipedia.org/wiki/Valtteri_Bottas"
    },
    FastestLap: {
        AverageSpeed: {
            speed: "223.075",
            units: "kph"
        },
        Time: {
            time: "1:25.580"
        },
        lap: "57",
        rank: "1"
    },
    Time: {
        millis: "5127325",
        time: "1:25:27.325"
    }
    grid: "2",
    laps: "58",
    number: "77",
    points: "26",
    position: "1",
    positionText: "1",
    status: "Finished"
}
```