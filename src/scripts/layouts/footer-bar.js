class FooterBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <footer>
            <p>Copyright © adziz - 2023 - AdzizApps</p>
        </footer>     
          `;
  }
}
customElements.define('footer-bar', FooterBar);
