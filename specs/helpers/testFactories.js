import LikeButtonPresenter from '../../src/scripts/utils/like-button-initiator';

const checkIfRestaurantLiked = async ({ id }) => {
  const isRestaurantFavorited = await LikeButtonPresenter._isDataExist(id);
  const likeButtonContainer = document.querySelector('#likeButtonContainer');
  if (!isRestaurantFavorited) {
    likeButtonContainer.innerHTML = `
        <button aria-label="Klik kalau suka" id="likeButton" class="like">
            <i class="fa fa-star-o" aria-hidden="true"></i>
        </button>
    `;
    return;
  }
  likeButtonContainer.innerHTML = `
        <button aria-label="Klik kalau gak jadi suka" id="likedButton" class="like">
            <i class="fa fa-star" aria-hidden="true"></i>
        </button>
  `;
};

const deleteCatalogueItemFromFavorite = async ({ id }) => {
  await LikeButtonPresenter._deleteFromFavorite(id);
};

const clickLikeButton = async ({ id }) => {
  await checkIfRestaurantLiked({ id });
  document.querySelector('.like').addEventListener('click', async (e) => {
    const idTarget = e.target.idName;

    if (idTarget === 'likedButton') {
      await LikeButtonPresenter._deleteFromFavorite(id);
      return;
    }
    await LikeButtonPresenter._addToFavorite({ id });
  });
};

export { checkIfRestaurantLiked, clickLikeButton, deleteCatalogueItemFromFavorite };
