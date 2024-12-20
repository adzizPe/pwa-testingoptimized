import sourceData from '../../data/source';
import CONFIG from '../../globals/config';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <section class='content'>
        <div class='latest'>
            <h1 id='restoName'></h1>
            <div class='detail-content' id='detail'></div>
            <div id='likeButtonContainer'></div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    let dataDetail = '';
    let listCategory = '';
    let listMakanan = '';
    let listMinuman = '';
    let listReview = '';
    const data = await sourceData.detailResto(url.id);
    // eslint-disable-next-line no-shadow
    data.restaurant.categories.forEach((data) => {
      listCategory += `
                <div class='tag'>${data.name}</div>
            `;
    });
    // eslint-disable-next-line no-shadow
    data.restaurant.menus.foods.forEach((data) => {
      listMakanan += `
                ${data.name},
            `;
    });
    // eslint-disable-next-line no-shadow
    data.restaurant.menus.drinks.forEach((data) => {
      listMinuman += `
                ${data.name},
            `;
    });
    if (Array.isArray(data.restaurant.customerReviews)) {
      data.restaurant.customerReviews.forEach((review) => {
        listReview += `
              <div class='review-card'>
                  <p>${review.name},</p>
                  <p>${review.date},</p>
                  <p>${review.review},</p>
              </div>
              `;
      });
    } else {
      listReview += '<p>No reviews available</p>';
    }
    dataDetail += `
          <div class="list_item">
              <img class="list_item_img" tabindex="0"  crossorigin="anonymous" src="${CONFIG.BASE_IMAGE_URL_SMALL + data.restaurant.pictureId}" alt="${data.restaurant.name}" title="${data.restaurant.name}">
              <div class="city">${data.restaurant.city}</div>
              <div class="list_item_content" style="text-align:left;">
                  <p class="list_item_rating">
                      Rating : 
                      <a href="#" class="list_item_rating_value">${data.restaurant.rating}</a>
                  </p>
                  <h2>${data.restaurant.name}</h2>
                  <p class="alamat">${data.restaurant.address}</p>
                  <div class="list_item_desc_detail">${data.restaurant.description}</div>
                  <br>
                  <h2>Menu</h2>
                  <div style="margin-top:10px;margin-bottom:20px">${listCategory}</div>
                  <h3>Makanan</h3>
                  <div style="margin-top:10px;margin-bottom:20px">${listMakanan}</div>
                  <h3>Minuman</h3>
                  <div style="margin-top:10px;margin-bottom:20px">${listMinuman}</div>
                  <h2>Review</h2>
                  <p>Apa kata mereka yang sudah pernah berkunjung ke sini?</p>
                  <div style="margin-top:-15px;margin-bottom:20px; padding-top:20px;padding-bottom:20px">${listReview}</div>
              </div>
          </div>
        `;
    document.querySelector('#restoName').innerHTML = 'DETAIL RESTORAN';
    document.querySelector('#detail').innerHTML = dataDetail;

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      data: {
        id: data.restaurant.id,
        name: data.restaurant.name,
        description: data.restaurant.description,
        rating: data.restaurant.rating,
        pictureId: data.restaurant.pictureId,
        city: data.restaurant.city,
      },
    });
  },
};

export default Detail;
