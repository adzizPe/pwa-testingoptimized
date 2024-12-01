/* eslint-disable no-undef */
import FavIdb from '../src/scripts/data/database-idb';
import * as TestFactories from './helpers/testFactories';

describe('Unliking A restaurant', () => {
  const addLikeContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeContainer();
    await FavIdb.putFavorite({ id: 1 });
  });

  afterEach(async () => {
    await FavIdb.deleteFavorite(1);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.checkIfRestaurantLiked({ id: 1 });

    expect(document.querySelector('[aria-label="Klik kalau gak jadi suka"]')).toBeTruthy();
  });

  it('should not display like widget when the restaurant has been liked', async () => {
    await TestFactories.checkIfRestaurantLiked({ id: 1 });

    expect(document.querySelector('[aria-label="Klik kalau suka"]')).toBeFalsy();
  });

  it('should be able to remove liked restaurant restaurant from the list', async () => {
    await TestFactories.clickLikeButton({ id: 1 });

    document.querySelector('[aria-label="Klik kalau gak jadi suka"]').dispatchEvent(new Event('click'));

    const restaurant = await FavIdb.getAllFavorite();
    expect(restaurant).toEqual([{ id: 1 }]);
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await TestFactories.clickLikeButton({ id: 1 });

    document.querySelector('[aria-label="Klik kalau gak jadi suka"]').dispatchEvent(new Event('click'));

    await FavIdb.deleteFavorite(1);

    expect(await FavIdb.getAllFavorite()).toEqual([]);
  });
});
