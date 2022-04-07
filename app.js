const elForm = document.querySelector(".form");
const elInput = document.querySelector(".form__input");
const elList = document.querySelector(".list");
const elModal = document.querySelector(".modal");
const elBox = document.querySelector(".box");



// const localTodo = JSON.parse(window.localStorage.getItem("list"));
const todos = [];
const modalArr = [];

// const basxicDelete = document.createElement("img");
// basxicDelete.classList.add("delete");
// elModal.appendChild(basxicDelete);


elModal.addEventListener("click" ,evt => {
    if(evt.target.matches(".delete")){
        elModal.classList.remove("block");
        elBox.classList.remove("opacoty");
    }
});

const lastImg = document.createElement("img");
const lastDiv = document.createElement("div");
const lastTitle = document.createElement("h1");
const lastYear = document.createElement("p");

function rendArr(arr , element){
    element.innerHTML = "";
    arr.forEach(e => {


        lastImg.classList.add("last-img");
        lastImg.setAttribute("src", e.Poster);

        lastDiv.classList.add("inner-box");
        lastTitle.classList.add("inner-title")
        lastYear.classList.add("modal-year");


        lastTitle.textContent = e.Title;
        lastYear.textContent = e.Year;

        lastDiv.appendChild(lastImg);
        lastDiv.appendChild(lastTitle);
        lastDiv.appendChild(lastYear);
        lastDiv.appendChild(lastYear);
        element.appendChild(lastDiv);
    });

}


elList.addEventListener("click", evt => {
    if(evt.target){
        elModal.classList.remove("block");
        elBox.classList.remove("opacoty");
        lastImg.classList.remove("last-img");
        lastTitle.classList.remove("inner-title")
        lastYear.classList.remove("modal-year");
    }


    if(evt.target.matches(".list__btn")){
        elModal.innerHTML = "";
        elModal.classList.add("block");
        elBox.classList.add("opacoty");

        const btnId = evt.target.dataset.filmID;

        const find = films.find(a => a.imdbID == btnId);
        modalArr.push(find);


        rendArr(modalArr, elModal);
    }

});



function renderTodos(arr, element) {
    element.innerHTML = "";
    const fragment = document.createDocumentFragment();

    arr.forEach(todo => {
        const newImg = document.createElement("img")
        const newItem = document.createElement("li");
        const newTitle = document.createElement("h1");
        const newText = document.createElement("p");
        const newBtn = document.createElement("button")

        newImg.setAttribute("src", todo.Poster)
        newTitle.textContent = todo.Title;
        newText.textContent = todo.Type;
        newBtn.textContent = "More";
        newBtn.dataset.filmID = todo.imdbID;

        newItem.classList.add("list__item");
        newBtn.classList.add("list__btn")

        // fragment.appendChild(newItem);
        newItem.appendChild(newImg);
        newItem.appendChild(newTitle);
        newItem.appendChild(newText);
        newItem.appendChild(newBtn);
        element.appendChild(newItem);
    })
}


let elInputVal = elInput.value;

const API_KEY = "78d6ef2c"


elForm.addEventListener("submit", evt => {
    let elInputVal = elInput.value;
    evt.preventDefault();
    const todo = {
        id:todos.length > 0 ? todos[todos.length -1].id + 1 : 1,
        title:elInputVal,
        isComplate:false
    }

    async function search(){
        const response  = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${elInputVal}`);
        const data = await response.json();
        films = data.Search;
        renderTodos(films, elList);

    }
    search()

    todos.push(todo);
    renderTodos(todos, elList);
    // window.localStorage.setItem("list" , JSON.stringify(todos));
    elInput.value = "";
});


let films;
console.log(films);