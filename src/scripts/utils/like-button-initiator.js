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

  _renderLike() {
    // Render the "like" button HTML structure
    this._likeButtonContainer.innerHTML = `
      <button aria-label="like this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart-o" aria-hidden="true"></i>
      </button>
    `;
    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._addToFavorite(this._data.id);
      this._renderLiked();
    });
  },

  _renderLiked() {
    // Render the "liked" button HTML structure
    this._likeButtonContainer.innerHTML = `
      <button aria-label="unlike this restaurant" id="likeButton" class="liked">
        <i class="fa fa-heart" aria-hidden="true"></i>
      </button>
    `;
    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._deleteFromFavorite(this._data.id);
      this._renderLike();
    });
  },
};

export default LikeButtonInitiator;
