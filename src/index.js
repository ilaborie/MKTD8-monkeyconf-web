import {html, render} from 'lit-html';
import {repeat} from 'lit-html/directives/repeat';
import {data} from './data'

const body = document.querySelector("body");

const talkListView = talk => html`
<div class="list-talk">
  <span class="startTime">${talk.startTime}</span>    
  <span class="endTime">${talk.endTime}</span>    
  <span class="title">${talk.title}</span>    
  <span class="speakers">${talk.speakers.map(it => `${it.firstName} ${it.lastName}`)}</span>    
</div>`;

const listView = state => html`
<main class="${state.list ? 'list ' : ''}${state.current ? 'current ' : ''}">
  
${repeat(state.talks || [], (talk) => talk.id, talkListView)}

${state.current ? `<div class="detail">${JSON.stringify(state.current)}</div>` : ''}  
  
</main>`;

const display = state => {
    console.dir(state);
    render(listView(state), body);
};

// fetch('https://monkeyconf.herokuapp.com/', {mode: "no-cors"})
// fetch('/data.json')
//     .then(res => res.json())
//     .then(talks => display({talks, current: null}));

display({talks: data, current: null});