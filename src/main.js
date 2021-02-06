"use strict";

function loadItems() {
  //fetch는 데이터를 성공적으로 받아오면 respone obj를 전달
  return fetch("data/data.json") //fetch로 url경로 받아오기
    .then((response) => response.json()) // respone를 json으로 변환
    .then((json) => json.items); // json 안에 item만
}

// list
function displayItems(items) {
  const container = document.querySelector(".list");  //list 
  const list = items.map(item => createHTMLString(item)).join();  // items를 돌면서 새로운 배열을 만들어 createHTML를 호출 => items => join으로 변환
  return (container.innerHTML = list);
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if(key == null || value == null) {
      return;
    }else {
      displayItems(items.filter(item => item[key] === value));
    }
}

function setEventListeners (items) {
  const logo = document.querySelector('.title__logo');
  const button = document.querySelector('.main__nav');

  logo.addEventListener('click', () => displayItems(items));
  button.addEventListener('click', event => onButtonClick(event,items))
}

// item 
function createHTMLString(item) {
  return `
  <li class="list__item">
    <img
    class="list__item__thumbnail"
    src="${item.image}"
    alt="pink_p.png"
    />
    <span class="list__item__description">color :${item.color} type : ${item.type} size :${item.size}</span>
  </li>`;
}

// load
loadItems()
  .then((items) => {
    // chek items console.log(items); 
    displayItems(items);
    setEventListeners(items)
  })
  .catch(console.log);