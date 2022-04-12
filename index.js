const grid = document.querySelector('.grid');
const search = document.querySelector('.search-img');
const enter = document.getElementById('input');

function setFocus() {
    document.getElementById('input').focus();
}
function searchFunction() {
    removeData()
    input = document.getElementById('input').value;
    getData(`https://api.unsplash.com/search/photos?query=${input}&client_id=Y9wYEXZnc2THML9jU-wvo4VFtUUtg07MbcwhRZsGAvc`);
}
async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    data.results.map( x => {
        showThumbs(x.urls.regular, x.urls.full, x.alt_description )
    });
    ifNothing(data.results.length);
}

function showThumbs(thumbs, full, capt) {
    const caption = document.getElementById('caption')
    const thumb = document.createElement('div');
    thumb.classList.add('thumb');
    thumb.style.backgroundImage = 'url(' + `${thumbs}` + ')';
    thumb.alt = `${full}`
    grid.append(thumb);
    thumb.onclick = function () {
        modal.style.display = "block";
        modalImg.src =`${full}`;
        caption.innerText = `${capt}`
    }
}
function removeData(){
    grid.innerHTML = "";
}
function ifNothing(result) {
    if (result === 0) {
        grid.style.backgroundImage = 'url(' + './img/noimage.jpg' + ')';
    } else {grid.style.backgroundImage = 'none'}
}

enter.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        search.click();
    }
});

search.addEventListener('click', searchFunction)

getData(`https://api.unsplash.com/search/photos?query=hello&client_id=Y9wYEXZnc2THML9jU-wvo4VFtUUtg07MbcwhRZsGAvc`);
setFocus()

const span = document.querySelector('.close')
const modal = document.querySelector('.modal');
let modalImg = document.getElementById('modal-content');



span.onclick = function() {
    modal.style.display = "none";
}
modal.onclick = function (event) {
    let target = event.target;
   if (target.id === 'modal-content') {

   } else {
       modal.style.display = "none";
   }

}
