import FavIdb from '../data/database-idb';

// like-button-initiator.js

class LikeButtonInitiator {
  constructor({ likeButtonContainer, article }) {
    this._likeButtonContainer = likeButtonContainer;
    this._article = article;

    this._renderLike = this._renderLike.bind(this);
    this._renderLiked = this._renderLiked.bind(this);
  }

  // Fungsi untuk render tombol "Like"
  _renderLike() {
    this._likeButtonContainer.innerHTML = `
      <button aria-label="like this article" class="like-button">
        ❤️ Like
      </button>
    `;
    const likeButton = this._likeButtonContainer.querySelector('.like-button');
    likeButton.addEventListener('click', () => this._handleLikeClick());
  }

  // Fungsi untuk render tombol "Liked" ketika artikel sudah di-like
  _renderLiked() {
    this._likeButtonContainer.innerHTML = `
      <button aria-label="unlike this article" class="liked-button">
        💔 Unlike
      </button>
    `;
    const likedButton = this._likeButtonContainer.querySelector('.liked-button');
    likedButton.addEventListener('click', () => this._handleUnlikeClick());
  }

  // Fungsi untuk menangani klik pada tombol "Like"
  _handleLikeClick() {
    // Simpan status like (misalnya ke localStorage atau API)
    this._article.isLiked = true; 
    this._renderLiked();
  }

  // Fungsi untuk menangani klik pada tombol "Unlike"
  _handleUnlikeClick() {
    // Hapus status like
    this._article.isLiked = false; 
    this._renderLike();
  }

  // Inisialisasi dan render tombol like berdasarkan status article
  init() {
    if (this._article.isLiked) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  }
}

export default LikeButtonInitiator;
