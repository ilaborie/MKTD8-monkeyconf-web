import {html, render} from 'lit-html';
import {repeat} from 'lit-html/directives/repeat';

const body = document.querySelector("body");

const talkListView = state => talk => html`
<div class="list-talk ${state.current && state.current.id === talk.id ? 'active' : ''}"
@click=${selectTalk(state, talk)}>
  <span class="startTime">${talk.startTime}</span>    
  <span class="endTime">${talk.endTime}</span>    
  <span class="title">${talk.title}</span>    
  <span class="speakers">${talk.speakers.map(it => `${it.firstName} ${it.lastName}`).join(" ")}</span>    
</div>`;

const speakerDetail = speaker => html`
<div class="speaker">
  <img alt="${speaker.avatar}" src="${speaker.avatar}">
  <span>${speaker.firstName} ${speaker.lastName}</span>
  <p>${speaker.bio}</p>
</div> 
`;

const talkDetail = talk => html`
<div class="detail">
  <span class="title">${talk.title}</span>
  <div class="when">
      <span class="room">${talk.room.name}</span>    
      <span class="startTime">${talk.startTime}</span>
      -    
      <span class="endTime">${talk.endTime}</span>
  </div>        
  <span class="difficulty">${(talk.techInfo || {difficulty: 'N/A'}).difficulty}</span>    
  <span class="themes">${(talk.techInfo || {themes: []}).themes.join(", ")}</span>    
  <p>${talk.description}</p>    
  <span class="speakers">
    ${repeat(talk.speakers || [], (speaker) => speaker.firstName + '_' + speaker.lastName, speakerDetail)}
  </span>
</div>`;

const listView = state => html`
<main class="${state.list ? 'list ' : ''}${state.current ? 'current ' : ''}">
${repeat(state.talks || [], (talk) => talk.id, talkListView(state))}
${state.current ? talkDetail(state.current) : ''}  
</main>`;

const display = state => render(listView(state), body);

const selectTalk = (state, talk) => () =>
    display({talks: state.talks, current: (state.current === talk) ? null : talk});

fetch('https://monkeyconf.herokuapp.com/')
    .then(res => res.json())
    .then(talks => display({talks, current: null}));