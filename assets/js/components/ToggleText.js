// =============================
//  Template
// =============================
const template = document.createElement('template');

template.innerHTML = /* html */ `
<style>
  .toggle-output{
    color: red
  }
</style>

<div class="toggle-output"></div>
`;

// =============================
//  Class
// =============================
class ToggleText extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this._output = [];

    this.DOM = {};
    this.DOM.toggleOutput = root.querySelector('div.toggle-output');
  }

  set output(value) {
    this._output = value;
    this.DOM.toggleOutput.textContent = value.join(' ');
  }

  get output() {
    return this._output;
  }
}

customElements.define('toggle-text', ToggleText);
