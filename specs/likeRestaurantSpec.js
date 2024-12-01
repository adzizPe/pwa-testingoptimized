/* eslint-disable no-undef */
import FavIdb from '../src/scripts/data/database-idb';
import * as TestFactories from './helpers/testFactories';

describe('Liking A Restaurant', () => {
  const addLikeContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeContainer();
  });

  it('shoud show the like button when restaurant has not been liked before', async () => {
    await TestFactories.checkIfRestaurantLiked({ id: 1 });

    expect(document.querySelector('[aria-label="Klik kalau suka"]')).toBeTruthy();
  });

  it('shoud not show the unlike button when restaurant has not been liked before', async () => {
    await TestFactories.checkIfRestaurantLiked({ id: 1 });

    expect(document.querySelector('[aria-label="Klik kalau gak jadi suka"]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await TestFactories.clickLikeButton({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    const restaurant = await FavIdb.getFavorite(1);
    expect(restaurant).toEqual({ id: 1 });
    await TestFactories.deleteCatalogueItemFromFavorite({ id: 1 });
  });

  it('should not add a restaurant again when its already liked', async () => {
    await TestFactories.clickLikeButton({ id: 1 });

    await FavIdb.putFavorite({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavIdb.getAllFavorite()).toEqual([{ id: 1 }]);

    FavIdb.deleteFavorite(1);
  });
});
