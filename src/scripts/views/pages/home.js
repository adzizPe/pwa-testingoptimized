import sourceData from '../../data/source';
import CONFIG from '../../globals/config';

const Home = {
  async render() {
    return `
        <section class='content' tabindex='0'>
            <div class='latest'>
                <h1>Jelajari Restoran</h1>
                <div class='list' id='tes'></div>
            </div>
        </section>
        `;
  },

  async afterRender() {
    const resto = await sourceData.listResto();
    let dataList = '';
    resto.restaurants.forEach((data) => {
      dataList += `
            <div tabindex="0" class='list_item'>
                <img class='lazyload list_item_thumb' data-src='${CONFIG.BASE_IMAGE_URL_SMALL + data.pictureId}' alt='${data.name}' title='${data.name}'>
                <div class='city'>${data.city}</div>
                <div class='list_item_content'>
                    <p class='list_item_rating'>
                        Rating : 
                        <a href='#' class='list_item_rating_value'>${data.rating}</a>
                    </p>
                    <h1 tabindex="0" class='list_item_title'>
                      <a href='/#/detail/${data.id}'>${data.name}</a>
                    </h1>
                    <div class='list_item_desc'>${data.description.slice(0, 150)}...</div>
                </div>
            </div>
            `;
    });
    document.querySelector('#tes').innerHTML = dataList;
  },
};

export default Home;
