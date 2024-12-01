class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class='menu_mobile'>
        <button class='icon_menu' id='menu' aria-label='Buka menu navigasi'>
            ☰
        </button>
        <div class='logo_mobile'>Nusa Kuliner</div>
        <div class='logo_mobile'>&nbsp;</div>
        </div>
        <nav id='drawer' class='nav_mobile'>
        <ul class='nav_list_mobile'>
            <li class='nav_items_mobile'><a href='/#'>Home</a></li>
            <li class='nav_items_mobile'><a href='/#/favorite'>Favorite</a></li>
            <li class='nav_items_mobile'>
            <a target='_blank' href='https://github.com/adzizPe'>About Us</a>
            </li>
        </ul>
        </nav>

        <nav class='nav'>
        <a class='logo' href=''>Nusa Kuliner</a>
        <ul class='nav_list'>
            <li class='nav_items'><a href='/#'>Home</a></li>
            <li class='nav_items'><a href='/#/favorite'>Favorite</a></li>
            <li class='nav_items'>
            <a target='_blank' href='https://github.com/adzizPe'>About Us</a>
            </li>
        </ul>
        </nav>

        <div class="hero">
          <div class="hero_inner">
            <h1 class="hero_title">Nusa Kuliner</h1>
            <p class="hero_subtitle">
              The Most Trusted Application to Find Your Favorite Restaurant!
            </p>
          </div>
        </div>
          `;
  }
}
customElements.define('app-bar', AppBar);
