

console.log("connected")
const categoriesContainer = document.getElementById("categories-container");
const itemsContainer = document.getElementById("items-container");
const modalContainer = document.getElementById("modal-container");
const cartContainer = document.getElementById("cart-container");
const totalPrice = document.getElementById("total-price")

// add spinner  here 
const manageSpinner = ((status) => {
    if (status === true) {
        document.getElementById("spinner").classList.remove("hidden")
        itemsContainer.classList.add("hidden")
    }
    else {
        document.getElementById("spinner").classList.add("hidden")
        itemsContainer.classList.remove("hidden")
    }

})

// load categories 
const loadCategories = () => {
    const url = "https://openapi.programming-hero.com/api/categories"
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}

// displayCategories function here 
const displayCategories = (categories) => {
    categories.forEach(cate => {
        categoriesContainer.innerHTML += `<li class="categories text-base font-medium hover:bg-green-400 list-none mb-4 rounded-lg p-1 " id="${cate.id}">${cate.category_name} </li>`

    });
    // function for active button 
    categoriesContainer.addEventListener("click", (e) => {
        if (e.target.className.includes("categories")) {
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


// load items by categories function
const loadItems = (id) => {
    manageSpinner(true)
    // for defult items 
    if (id === "plants") {
        const url = `https://openapi.programming-hero.com/api/plants`
        fetch(url)
            .then(res => res.json())
            .then(data => displayItems(data.plants))
        return;
    }
    const url = `https://openapi.programming-hero.com/api/category/${id} `
    fetch(url)
        .then(res => res.json())
        .then(data => displayItems(data.plants))
}
// display items by categories
const displayItems = (items) => {
    itemsContainer.innerHTML = "";
    
    items.forEach(item => {
        // const longDescription = ${item.description}
        const newItem = document.createElement("div")
        newItem.innerHTML = `   <div class=" rounded-xl bg-[whitesmoke] shadow-lg h-full">
                        <div class="">
                            <img src="${item.image}" alt="${item.name} photo"  class=" w-full h-50 object-cover rounded-t-xl">
                        </div>
                        <div class="p-3" id="${item.id}">
                            <h2 class=" capitalize text-2xl font-bold item-name " > ${item.name}</h2>
                            <p class="text-lg font-normal line-clamp-3">${item.description}</p>
                            <div class="flex justify-between mb-2">
                                <span class="bg-[#DCFCE7] p-2 text-green-500 rounded-xl"> ${item.category}</span>
                                <p class="p-2"> <span id="${item.name}"> ${item.price} </span>  BDT </p>
                            </div>
                            <div>
                                <button class="w-full rounded-xl bg-green-700 p-3 capitalize text-lg font-bold cart-btn"> add to cart </button>
                            </div>
                        </div>
                    </div>`

        itemsContainer.append(newItem)

    })
    manageSpinner(false)

}
//  addEventListener for cart click and titleclick 
itemsContainer.addEventListener("click", (e) => {
    if (e.target.className.includes("item-name")) {
        const title = e.target.parentNode.id
        loadTreeDetails(title)
    }
    if (e.target.className.includes("cart-btn")) {
        {
            const button = e.target
            const title = button.parentNode.parentNode.children[0].innerText
            const price = button.parentNode.parentNode.children[2].children[1].children[0].innerText
            cartContainer.innerHTML += ` <div class=" p-2 " >
                            <div class="flex bg-gray-100 rounded-xl justify-between p-2 items-center ">
                                <div class="pl-1"> 
                                    <h1 class="text-xl font-bold"> ${title} </h1>
                                    <p > <span id=""> ${price}</span> BDT </p>
                                </div>
                                <div class="text-red-800 text-2xl pr-1"> 
                                    <i class="fa-solid fa-xmark deleteBtn"></i>
                                </div>
                            </div>
                        </div>`

            currentPrice = Number(totalPrice.innerText) + Number(price)
            totalPrice.innerText = currentPrice;

        }
    }
})
// load deatails for title click 
const loadTreeDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showTreeDetails(data.plants))
}
//  display modal 
const showTreeDetails = (plant => {
    plant_tree_modal.showModal();
    modalContainer.innerHTML = `<h3 class="text-xl font-bold mb-2 "> ${plant.name}</h3>
        <div class=" rounded-xl mb-2"> 
            <img src="${plant.image}" alt="${plant.name} photo" class="w-full h-80  object-cover rounded-xl">
        </div>
        <div class="flex flex-col gap-2">
            <h2 class="text-base font-medium"> Categories : <span class=" text-sm font-normal">${plant.category}</span> </h2>
            <h2 class="text-base font-medium"> Price : <span class=" text-base font-medium"> ${plant.price}</span> BDT</h2>
            <h2 class="text-base font-medium"> description :  <span class=" text-sm font-normal">${plant.description}</span></h2>
        </div>`
})

// addEventListener for cart items delete 
cartContainer.addEventListener("click", (e) => {
    if (e.target.className.includes("deleteBtn")) {
        // const allDeleteBtn = document.querySelectorAll(".deleteBtn");
        const activeDeleteBtn = e.target.parentNode.parentNode.parentNode
        cartContainer.removeChild(activeDeleteBtn)
        // console.log(activeDeleteBtn)
        const price = e.target.parentNode.parentNode.children[0].children[1].children[0].innerText
        currentPrice = Number(totalPrice.innerText ) - Number(price)
        totalPrice.innerText = Number(currentPrice)

    }
})

// call function for display default categories
loadCategories();
loadItems('plants');