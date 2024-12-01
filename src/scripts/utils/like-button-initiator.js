import FavIdb from '../data/database-idb';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, data }) {
    this._likeButtonContainer = likeButtonContainer;
    this._data = data;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._data;
    console.log(this._data);

    if (await this._isDataExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isDataExist(id) {
    const resto = await FavIdb.getFavorite(id);
    return !!resto;
  },

  async _addToFavorite(id) {
    await FavIdb.putFavorite(id);
  },

  async _deleteFromFavorite(id) {
    await FavIdb.deleteFavorite(id);
  },
};

export default LikeButtonInitiator;
