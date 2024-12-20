import FavoriteIdb from '../../data/database-idb';
import CONFIG from '../../globals/config';

const Favorite = {
  async render() {
    return `
        <section class='content'>
            <div class='latest'>
                <h1>Explore Favorite Restaurant</h1>
                <div class='list' id='tes'></div>
                <div class='resto-item__not__found'></div>
            </div>
        </section>
        `;
  },

  async afterRender() {
    const resto = await FavoriteIdb.getAllFavorite();
    let dataList = '';
    if (resto.length === 0) {
      document.querySelector('.resto-item__not__found').innerHTML = 'Tidak ada Restoran Favorite untuk ditampilkan';
    } else {
      resto.forEach((data) => {
        dataList += `
                <div class='list_item'>
                    <!-- Load Gambar Lazy Loading -->
                    <img class='list_item_thumb' loading='lazy' tabindex='0' crossorigin='anonymous' src='${
  CONFIG.BASE_IMAGE_URL_SMALL + data.pictureId
}' alt='${data.name}' title='${data.name}'>
                    <div class='city'>${data.city}</div>
                    <div class='list_item_content'>
                        <p class='list_item_rating'>
                            Rating : 
                            <a href='#' class='list_item_rating_value'>${
  data.rating
}</a>
                        </p>
                        <h1 class='list_item_title'><a href='/#/detail/${
  data.id
}'>${data.name}</a></h1>
                        <div class='list_item_desc'>${data.description.slice(
    0,
    150,
  )}...</div>
                    </div>
                </div>
                `;
      });
      document.querySelector('#tes').innerHTML = dataList;
    }
  },
};

export default Favorite;
