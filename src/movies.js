/*const fs = require('node:fs');
let fspath = '/';
// this file has been formatted as JSON that can be read by the node fs file system reader
fs.readFile(fspath+'lab-javascript-greatest-movies/src/data.js', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let movies = JSON.parse(data);

    console.log(movies[0], movies[movies.length-1]);
    console.log(movies.length);*/
// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    const newMoviesArray = [];
    moviesArray.map(movie => {
        newMoviesArray.push(movie.director)
    });
    return newMoviesArray;
}

const directorArray = getAllDirectors(movies);

console.log("----------------- ITERATION 1 -------------------");
//if(directorArray.length === movies.length) {
console.log(directorArray.slice(0, 10));
console.log(directorArray.length);
//}
console.log("----------------- END ITERATION 1 -------------------");

function uniqueDirectors(arr) {
    let arrFin = Object.entries(arr.reduce((acc, cur) => {
        acc[cur] = (acc[cur] ?? 0) + 1;
        return acc;
    }, {})).filter(item => item[1] === 1).map(it => it[0]);
    return arrFin;
}

console.log("----------------- BONUS ITERATION 1 -------------------");

let unique = uniqueDirectors(directorArray);
console.log(unique.length);
console.log(unique[0], unique[unique.length - 1]);

console.log("----------------- END BONUS ITERATION 1 -------------------");

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray, director, genre) {
    let counter = moviesArray.reduce((acc, movie, index) => {
        if (movie.director === director && movie.genre.includes(genre)) {
            acc++;
        }
        return acc;
    }, 0);
    return counter;
};

console.log("----------------- ITERATION 2 -------------------");
const countMovies = howManyMovies(movies, "Steven Spielberg", "Drama");
console.log("how many steven s movies ", countMovies);
console.log("----------------- END ITERATION 2 -------------------");

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    const scoresSum = moviesArray.reduce((acc, movie) => acc + movie.score, 0);
    let finalVal = (scoresSum / moviesArray.length).toFixed(2);
    return finalVal;
}

console.log("----------------- ITERATION 3-------------------");
console.log('average score', scoresAverage(movies));
console.log("----------------- END ITERATION 3-------------------");

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    const scoresSum = moviesArray.filter(movie => movie.genre.includes("Drama")).reduce((acc, movie) => acc + movie.score, 0);
    let finalVal = (scoresSum / moviesArray.length).toFixed(2);
    return finalVal;
}

console.log("----------------- ITERATION 4-------------------");
console.log('average score', dramaMoviesScore(movies));
console.log("----------------- END ITERATION 4-------------------");

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    const arr2 = [...moviesArray];
    let sortedArr = arr2.sort((a, b) => {
        if (a.year < b.year) {
            return -1;
        } else if (a.year > b.year) {
            return 1;
        } else {
            a.title.localeCompare(b.title);
            return 0;
        }
    });
    return sortedArr;
}

const newArr = orderByYear(movies);
console.log('--------------------ITERATION 5--------------------');
console.log(newArr.slice(0, 20));
console.log('-------------------- END ITERATION 5--------------------');

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    const newArr = [];
    sortedArr = moviesArray.sort((a, b) => (a.title).localeCompare(b.title));
    const sortedNow = sortedArr.map(movie => {
        newArr.push(movie.title)
    });
    return newArr;
}

console.log('--------------------ITERATION 6--------------------');
const newArr1 = orderAlphabetically(movies);
console.log(newArr1.slice(0, 10));
console.log('-------------------- END ITERATION 6--------------------');

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    const newArr = moviesArray.map(movie => {
        return {
            ...movie,
            duration: ((parseInt(movie.duration.split("h")[0]) * 60) + parseInt(movie.duration.split("min")[0].split("h")[1]))
        }
    });
    return newArr;
}

console.log('--------------------BONUS ITERATION 7--------------------');
let durationArr = turnHoursToMinutes(movies);
console.log(durationArr.slice(55, 60));
console.log('--------------------END BONUS ITERATION 7--------------------');

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {

    let counter = {};
    let sumscore = 0;


    let arrYears2 = Object.entries(moviesArray.reduce((acc, cur) => {
        acc[cur.year] = (acc[cur.year] ?? 0) + 1;
        return acc;
    }, {}));

    console.log(arrYears2);

    let finalArr = [];

    let finalVal = 0;
    let nYear = 0;

    for (let i = 0; i < arrYears2.length; i++) {
        let acc = 0;
        nYear = arrYears2[i][0];
        console.log(nYear);
        let finalNestedArr = [];
        const scoresSum = moviesArray.reduce((acc, movie) => {
            if (movie.year == nYear) {
                acc += movie.score;
            }
            return acc;
        }, 0);


        finalVal = (scoresSum / arrYears2[i][1]).toFixed(2);
        console.log(scoresSum, finalVal);

        finalNestedArr.push(nYear);
        finalNestedArr.push(finalVal);
        finalArr.push(finalNestedArr);
    }

    return finalArr;
}

let averagesByYear = bestYearAvg(movies);

//console.log(averagesByYear);

let max = averagesByYear[0][1];
let year;

for (let i = 0; i < averagesByYear.length; i++) {
    // compare every element with current max
    if (averagesByYear[i][1] > max) {
        max = averagesByYear[i][1];
        year = averagesByYear[i][0];
    }
}
console.log('--------------------BONUS ITERATION 8--------------------');
console.log(`The best year was ${year} with an average score of ${max}`);
console.log('--------------------END BONUS ITERATION 8--------------------');
;
