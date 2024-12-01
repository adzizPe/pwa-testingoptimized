/* eslint-disable no-prototype-builtins */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import { itActsAsFavoriteRestoModel } from './contract/favoriteRestaurantContract';

let favoriteRestos = [];

const FavoriteRestoArray = {
  getFavorite(id) {
    if (!id) {
      return;
    }

    return favoriteRestos.find((restaurant) => restaurant.id === id);
  },

  getAllFavorite() {
    return favoriteRestos;
  },

  putFavorite(resto) {
    if (!resto.hasOwnProperty('id')) {
      return;
    }

    if (this.getFavorite(resto.id)) {
      return;
    }

    favoriteRestos.push(resto);
  },

  deleteFavorite(id) {
    // cara boros menghapus restaurant dengan meng-copy restaurant yang ada
    // kecuali restaurant dengan id === id
    favoriteRestos = favoriteRestos.filter((resto) => resto.id !== id);
  },
};

describe('Favorite resto array contract test', () => {
  // eslint-disable-next-line no-return-assign
  afterEach(() => (favoriteRestos = []));

  itActsAsFavoriteRestoModel(FavoriteRestoArray);
});
