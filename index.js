
// Attach HTML  to do the performance
let filterEmojee = document.getElementById('filterEmoji');
let searchEmojee = document.getElementById('search');
let displayEmojee = document.getElementById('displayEmoji');


filterEmojee.addEventListener("click", (e) => {
    const button = e.target.closest(".btn");
    
    if (button) {
        e.preventDefault();
        const category = button.getAttribute("data-category");
        filterFunction(category);
    }
});

// filter the emojii
let filterFunction = (value) =>{
    let filterData;

    if(value.toLowerCase() === "all"){
        filterData = emojiList;
    }
    else{
        filterData = emojiList.filter(emoji => {
            if(emoji.description.toLowerCase().includes(value.toLowerCase())){
                return true;
            }
            if(emoji.aliases.some(alias => alias.toLowerCase().startsWith(value.toLowerCase()))){
                return true;
            }
            if(emoji.tags.some(tags => tags.toLowerCase().startsWith(value.toLowerCase()))){
                return true;
            }
            return false;
        })
    }
    displayEmojii(filterData);
}

// display the emojiiis
function displayEmojii(value = emojiList){
  displayEmojee.innerHTML = "";
    value.forEach(e =>{
        let newEmojiContainer = document.createElement('div');
        let emojeeBox = document.createElement('span');
        emojeeBox.innerText = e.emoji;
        emojeeBox.classList.add('box');
        emojeeBox.style.cursor = 'pointer';
        displayEmojee.append(emojeeBox);
    })
    
}

// for the first load
window.addEventListener('load', () => {
    displayEmojii(emojiList);
})

searchEmojee.addEventListener('keyup', (event) => {
    let value = event.target.value;
    filterFunction (event.target.value);
});


displayEmojee.addEventListener("click", (e) => {
    navigator.clipboard.writeText(e.target.innerText);
    const originalContent  = e.target.innerText;
    e.target.innerText = "Copied?";
    e.target.style.fontSize = '12px';
    setTimeout(() =>{
        e.target.innerText =  originalContent;
        e.target.style.fontSize = '40px';  
    },1000);
  
});


