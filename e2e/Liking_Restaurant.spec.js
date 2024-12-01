/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

const emptyFavoriteRestoText = 'Tidak ada Restoran Favorite untuk ditampilkan';

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('.latest');
  I.see(emptyFavoriteRestoText, '.resto-item__not__found');
});

Scenario('liking one restaurant and verifying it is added to favorites', async ({ I }) => {
  I.see(emptyFavoriteRestoText, '.resto-item__not__found');

  I.amOnPage('/');
  I.waitForElement('.list_item_title a', 5);
  I.seeElement('.list_item_title a');
  const firstRestaurant = locate('.list_item_title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.list_item_title a');
  const likedRestaurantTitle = await I.grabTextFrom('.list_item_title a');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('unliking one restaurant and verifying it is removed from favorites', async ({ I }) => {
  I.see(emptyFavoriteRestoText, '.resto-item__not__found');

  I.amOnPage('/');
  I.waitForElement('.list_item_title a', 5);
  I.seeElement('.list_item_title a');
  const firstRestaurantTitle = await I.grabTextFrom('.list_item_title a');
  I.click(firstRestaurantTitle);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.list_item_title a');

  I.click(firstRestaurantTitle);
  I.waitForElement('#likedButton', 5);
  I.seeElement('#likedButton');
  I.click('#likedButton');

  I.amOnPage('/#/favorite');
  I.see(emptyFavoriteRestoText, '.resto-item__not__found');
});
