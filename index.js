

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
                // console.log(e.target.id)
            }
        })
}


// load items 


const loadItems= (id) =>{
    if( id ==="plants" ){
       const url = `https://openapi.programming-hero.com/api/plants`
       fetch(url)
       .then(res=>res.json())
       .then(data=> displayItems(data.plants))
        return ;
    }
    const url = `https://openapi.programming-hero.com/api/category/${id} `
    fetch(url)
    .then(res => res.json())
    .then(data => displayItems(data.plants))
}

// display items 

const displayItems = (items) =>{
  
    itemsContainer.innerHTML = "";
    items.forEach(item =>{

        const newItem = document.createElement("div")
        newItem.innerHTML = `   <div class=" rounded-xl bg-[whitesmoke] h-full ">
                        <div class="">
                            <img src="${item.image}" alt="${item.name} photo"  class=" w-full h-50 object-cover rounded-t-xl">
                        </div>
                        <div class="p-3">
                            <h2 class=" capitalize text-2xl font-bold item-name "> ${item.name}</h2>
                            <p class="text-lg font-normal">${item.description}</p>
                            <div class="flex justify-between">
                                <span class="bg-[#DCFCE7] p-2 text-green-500 rounded-xl"> ${item.category}</span>
                                <p> <span> ${item.price} </span>  BDT </p>
                            </div>
                            <div>
                                <button class="w-full rounded-xl bg-green-700 p-3"> add to cart </button>
                            </div>
                        </div>
                    </div>`

                    itemsContainer.append(newItem)
    })
}





loadCategories();