"use strict"

class Movie {
    constructor(title, director) {
        this.title = title;
        this.director = director;
        this.stars = [];
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
        this.rating = rating;
    }

    getAverageRating() {

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



// const myMovie = new Movie('Get Out', 'Jordan Peele');
const myMovie = new Movie('The Shawshank Redemption', ' Frank Darabont');
// const myMovie = new Movie('Se7en', ' David Fincher');
// const myMovie = new Movie('Inception', ' Christopher Nolan');
// const myMovie = new Movie('Meet the Parents', 'Jay Roach');


// const firstActor = new StaffMember(' Daniel Kaluuya', 'Star', 1987);
const firstActor = new StaffMember('Tim Robbins', 'Star', 1958);
const secondActor = new StaffMember(' Morgan Freeman', 'Star', 1937);
// const fourthActor = new StaffMember('Leonardo DiCaprio', 'Star', 1974);
// const fifthActor = new StaffMember('Robert De Niro', 'Star', 1943);


myMovie.addStar(firstActor);
myMovie.addStar(secondActor);
// myMovie.addStar(thirdActor);
// myMovie.addStar(fourthActor);
// myMovie.addStar(fifthActor);



console.log(myMovie.getStars().map(actor => `${actor.getName()} ${actor.getAge()}`));
console.log(myMovie.getTitle());
const director = myMovie.getDirector();
console.log("Director :",director);
// console.log(`Director: ${director.getName()}`);