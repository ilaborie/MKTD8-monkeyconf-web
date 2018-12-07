import {render} from 'lit-html';
import {repeat} from 'lit-html/directives/repeat';

const body = document.querySelector("body");


const state = {
    talks: null,
    current: null
};


const listView = state => html`
<main class="${state.list ? 'list ' : ''}${state.current ? 'current ' : ''}">
  
${repeat(state.list || [], (talk) => talk.id, (talk) => html`<div class="talk">${JSON.stringify(talk)}</div>`}
  
  <div class="detail">${JSON.stringify(state.current)}</div>
</main>
    
`;

const display = state =>
    render(listView(state), body);

fetch('https://monkeyconf.herokuapp.com/')
    .then(res => res.json())
    .then(display);