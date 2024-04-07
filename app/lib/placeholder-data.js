const users = [
  {
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123', // Plain password (should be hashed before insertion)
    profile_image: 'users/john_profile.jpg'
  },
  {
    user_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    username: 'alice_smith',
    email: 'alice@example.com',
    password: 'password456', // Plain password (should be hashed before insertion)
    profile_image: '/users/alice_profile.jpg'
  },
  {
    user_id: '410544b2-4001-4271-9855-fec4b6a6442b',
    username: 'mike_jones',
    email: 'mike@example.com',
    password: 'password789', // Plain password (should be hashed before insertion)
    profile_image: '/users/mike_profile.jpg'
  },
];

const sellerProfiles = [
  {
    seller_name: 'Craftsman Enterprises',
    seller_description: 'Handcrafted items from artisans worldwide.',
    seller_image: 'craftsman_logo.jpg',
    seller_socialmedia: 'https://www.facebook.com/'
  },
  {
    seller_name: 'Artisan Creations',
    seller_description: 'Unique handmade crafts for every occasion.',
    seller_image: 'artisan_creations_logo.jpg',
    seller_socialmedia: 'https://www.instagram.com/'
  },
  {
    seller_name: 'Vintage Vibes',
    seller_description: 'Discover vintage treasures from around the world.',
    seller_image: 'vintage_vibes_logo.jpg',
    seller_socialmedia: 'https://www.twitter.com/'
  },
];

const productListings = [
  {
    seller_id: 1, // Assuming the seller ID of Craftsman Enterprises is 1
    product_name: 'Handcrafted Wooden Bowl',
    description: 'Beautifully carved wooden bowl made from high-quality teak wood.',
    price: 50.00,
    image: 'wooden_bowl.jpg'
  },
  {
    seller_id: 1,
    product_name: 'Handwoven Basket',
    description: 'Handwoven basket made from natural fibers.',
    price: 35.00,
    image: 'handwoven_basket.jpg'
  },
  {
    seller_id: 2,
    product_name: 'Vintage Silver Earrings',
    description: 'Beautiful vintage silver earrings with intricate designs.',
    price: 80.00,
    image: 'vintage_earrings.jpg'
  },
];

const reviewsAndRatings = [
  {
    product_id: 1,
    username: 'jane_doe',
    rating: 5,
    review_description: 'Absolutely stunning craftsmanship! Highly recommended.',
    timestamp: new Date()
  },
  {
    product_id: 2,
    username: 'john_smith',
    rating: 4,
    review_description: 'Love the design and quality of the handwoven basket.',
    timestamp: new Date()
  },
  {
    product_id: 3,
    username: 'alice_johnson',
    rating: 5,
    review_description: 'The vintage silver earrings exceeded my expectations!',
    timestamp: new Date()
  },
];



module.exports = {
  users,
  sellerProfiles,
  productListings,
  reviewsAndRatings,
};
