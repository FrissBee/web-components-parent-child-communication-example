// =============================
//  Template
// =============================
const template = document.createElement('template');

template.innerHTML = /* html */ `
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
  crossorigin="anonymous"
/>

<button>
  <slot></slot>
</button>
`;

// =============================
//  Class
// =============================
class BtnElem extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this.btn = root.querySelector('button');
  }

  connectedCallback() {
    this.btn.classList = this.hasAttribute('class-names') ? this.getAttribute('class-names') : 'btn btn-primary';
    if (!this.hasAttribute('btn-event')) this.setAttribute('btn-event', 'handle-btn-click');
    handleChildBtn(this);
  }
}

customElements.define('btn-elem', BtnElem);

// =============================
//  Functions
// =============================
function handleChildBtn(elem) {
  elem.btn.addEventListener('click', (e) => {
    const btnDatas = elem.hasAttribute('btn-datas') ? elem.getAttribute('btn-datas') : 'Default Value';
    elem.dispatchEvent(new CustomEvent(elem.getAttribute('btn-event'), { detail: btnDatas }));
  });
}
