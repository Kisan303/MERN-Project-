//Student Name: Kisan Rai 
//Student Number: C0910925
//populateData.js


require('dotenv').config();

const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('./models/User');

// MongoDB connection string from .env
const dbURI = process.env.MONGO_URI;

if (!dbURI) {
    console.error("MongoDB URI is not set in the .env file");
    process.exit(1);  // Exit if dbURI is not found
}

mongoose.connect(dbURI)
    .then(async () => {
        console.log('Connected to MongoDB');
        
        // Populate MongoDB with 10 random users
        for (let i = 0; i < 10; i++) {
            const user = new User({
                lastName: faker.person.lastName(),
                firstName: faker.person.firstName(),
                dateOfBirth: faker.date.past(30),
                address1: faker.location.streetAddress(),
                address2: faker.location.secondaryAddress(),
                city: faker.location.city(),
                postalCode: faker.location.zipCode(),
                country: faker.location.country(),
                phoneNumber: faker.phone.number(),
                email: faker.internet.email(),
                userNotes: faker.lorem.sentence()
            });

            await user.save();
            console.log(`User ${i + 1} added`);
        }

        mongoose.connection.close();
        console.log('Database populated with random users');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
