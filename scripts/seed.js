const { db } = require('@vercel/postgres');

const {
  users,
  sellerProfiles,
  productListings,
  reviewsAndRatings,
} = require('../app/lib/placeholder-data.js');

const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE TABLE IF NOT EXISTS users1 (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      profile_image VARCHAR(255)
    );`;

    console.log('Created "users1" table');

    const insertedUsers = await Promise.all(
      users.map(async (user, index) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (username, email, password, profile_image)
          VALUES (${user.user_id}, ${user.username}, ${user.email}, ${hashedPassword}, ${user.profile_image})
          ON CONFLICT (email) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedSellerProfiles(client) {
  try {
    await client.sql`CREATE TABLE IF NOT EXISTS sellerProfiles (
      seller_id SERIAL PRIMARY KEY,
      seller_name VARCHAR(255) NOT NULL,
      seller_description TEXT NOT NULL,
      seller_image VARCHAR(255),
      seller_socialmedia VARCHAR(255)
    );`;

    console.log('Created "sellerProfiles" table');

    const insertedSellerProfiles = await Promise.all(
      sellerProfiles.map(async (profile) => {
        return client.sql`
          INSERT INTO sellerProfiles (seller_name, seller_description, seller_image, seller_socialmedia)
          VALUES (${profile.seller_name}, ${profile.seller_description}, ${profile.seller_image}, ${profile.seller_socialmedia})
          ON CONFLICT (seller_name) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedSellerProfiles.length} seller profiles`);
  } catch (error) {
    console.error('Error seeding seller profiles:', error);
    throw error;
  }
}

async function seedProductListings(client) {
  try {
    await client.sql`CREATE TABLE IF NOT EXISTS productListings (
      product_id SERIAL PRIMARY KEY,
      seller_id INTEGER REFERENCES sellerProfiles(seller_id),
      product_name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      image VARCHAR(255)
    );`;

    console.log('Created "productListings" table');

    const insertedProductListings = await Promise.all(
      productListings.map(async (product) => {
        return client.sql`
          INSERT INTO productListings (seller_id, product_name, description, price, image)
          VALUES (${product.seller_id}, ${product.product_name}, ${product.description}, ${product.price}, ${product.image})
          ON CONFLICT (product_name) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedProductListings.length} product listings`);
  } catch (error) {
    console.error('Error seeding product listings:', error);
    throw error;
  }
}

async function seedReviewsAndRatings(client) {
  try {
    await client.sql`CREATE TABLE IF NOT EXISTS reviewsAndRatings (
      review_id SERIAL PRIMARY KEY,
      product_id INTEGER REFERENCES productListings(product_id),
      username VARCHAR(255) NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      review_description TEXT NOT NULL,
      timestamp TIMESTAMP NOT NULL
    );`;

    console.log('Created "reviewsAndRatings" table');

    const insertedReviewsAndRatings = await Promise.all(
      reviewsAndRatings.map(async (review) => {
        return client.sql`
          INSERT INTO reviewsAndRatings (product_id, username, rating, review_description, timestamp)
          VALUES (${review.product_id}, ${review.username}, ${review.rating}, ${review.review_description}, ${review.timestamp})
          ON CONFLICT (review_id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedReviewsAndRatings.length} reviews and ratings`);
  } catch (error) {
    console.error('Error seeding reviews and ratings:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedSellerProfiles(client);
  await seedProductListings(client);
  await seedReviewsAndRatings(client);

  await client.end();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});
