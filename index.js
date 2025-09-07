console.log("connected")
const categoriesContainer = document.getElementById("categories-container")
const itemsContainer = document.getElementById("items-container")

const loadCategories = () =>{
    const url = "https://openapi.programming-hero.com/api/categories"
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}

const displayCategories = (categories) =>{
    
    categories.forEach(cate => {
        categoriesContainer.innerHTML += `<li class="categories text-base font-medium hover:bg-green-400 list-none mb-4 rounded-lg p-1 " id="${cate.id}">${cate.category_name} </li>`
       
    });
     categoriesContainer.addEventListener("click" ,(e) =>{
            if(e.target.className.includes("categories")){
                const allCat = document.querySelectorAll(".categories")
                allCat.forEach(el => {
                    el.classList.remove("bg-green-900")
                    el.classList.remove("text-white")
                });
                const activeCat = e.target
                activeCat.classList.add("bg-green-900")
                activeCat.classList.add("text-white")
                loadItems(e.target.id)
            }
        })
}


// load items 

const loadItems= (id) =>{
    const url = `https://openapi.programming-hero.com/api/category/${id} `
    fetch(url)
    .then(res => res.json())
    .then(data => displayItems(data.plants))
}

// display items 

const displayItems = (items) =>{
    items.forEach(item =>{
        console.log(item)
    })
}



loadCategories();