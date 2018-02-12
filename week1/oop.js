"use strict"

class Movie {
    constructor(title, director) {
        this.title = title;
        this.director = director;
        this.stars = [];
        this.ratings = [];
    }

    getTitle() {

        return this.title;
    }

    getDirector() {

        return this.director;
    }

    addStar(star) {
        this.stars.push(star);
    }

    getStars() {
        return this.stars;
    }

    addWriter(writer) {
        this.writer = writer;
    }

    getWriters() {
        return this.writer;
    }

    addRating(rating) {
        this.ratings.push(rating);
    }

    getAverageRating() {
        let sum = 0;
        for (let i = 0; i < this.ratings.length; i++) {
            sum += this.ratings[i];
        }
        return console.log(`the Average Rating is : ${sum / this.ratings.length}`);
    }

}

class StaffMember {
    constructor(name, role, dateOfBirth) {
        this.name = name;
        this.role = role;
        this.dateOfBirth = dateOfBirth;
    }

    addMovie(movie) {
        this.movie = movie;
    }

    getName() {
        return this.name;
    }

    getRole() {
        return this.role;
    }

    getAge() {
        let currentYear = new Date().getFullYear();
        return currentYear - this.dateOfBirth;
    }
}

const myMovie = new Movie('The Shawshank Redemption', ' Frank Darabont');


const firstActor = new StaffMember('Tim Robbins', 'Star', 1958);
const secondActor = new StaffMember(' Morgan Freeman', 'Star', 1937);


myMovie.addStar(firstActor);
myMovie.addStar(secondActor);


console.log(myMovie.getStars().map(actor => `${actor.getName()} ${actor.getAge()}`));
console.log(myMovie.getTitle());
const director = myMovie.getDirector();

myMovie.addRating(9);
myMovie.addRating(9);
myMovie.addRating(8);
myMovie.addRating(6);
myMovie.addRating(7);

console.log(`Director: ${director}`);
console.log(myMovie.getAverageRating());
