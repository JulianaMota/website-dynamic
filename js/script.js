const catLink = "http://kea-alt-del.dk/t5/api/categories";
const pListlink = "http://kea-alt-del.dk/t5/api/productlist";
const imgbase = "http://kea-alt-del.dk/t5/site/imgs/";

const pLink = "http://kea-alt-del.dk/t5/api/product?id=";
const modal = document.querySelector("#modal");

const main = document.querySelector(".menugrid");
const allLink = document.querySelector("#allLink");
const nav = document.querySelector("nav");


const template = document.querySelector("#dishTemplate").content;


//all botttun

allLink.addEventListener("click", () => filterBy("all"));


//create categories

fetch(catLink).then(promise => promise.json()).then(data => buildCategories(data));


function buildCategories(data) {
    data.forEach(category => {
        //console.log(category);
        const newSection = document.createElement("section");
        const newH2 = document.createElement("h2");
        const newLink = document.createElement("a");
        newLink.href = "#Menu";
        newLink.textContent = category;
        newLink.addEventListener("click", () => filterBy(category));

        newSection.id = category;
        newH2.textContent = category;
        nav.appendChild(newLink);
        newSection.appendChild(newH2);
        main.appendChild(newSection);

    })
    fetch(pListlink).then(promise => promise.json()).then(dataProduct => show(dataProduct));
}


//Function Categoryes

function filterBy(category) {
    document.querySelectorAll("section").forEach(section => {
        if (section.id == category || category == "all") {
            section.classList.remove("hide");
        } else {
            section.classList.add("hide");
        }
    })
}


// Product Clone


function show(plist) {
    plist.forEach(product => {
        console.log(product.category);
        const parent = document.querySelector("#" + product.category);
        const clone = template.cloneNode(true);


// product list sold out
        if (product.soldout) {
            clone.querySelector(".soldout").classList.remove("hide");
            clone.querySelector(".dishes").classList.add("filter-soldout")
        }


// product price

        clone.querySelector(".price span").textContent = product.price;


// droduct with discount
        if (product.discount) {
            const newPrice = Math.round(product.price - product.price * product.discount / 100);
            clone.querySelector(".price span").textContent = newPrice;
            clone.querySelector(".discount").classList.remove("hide");
            clone.querySelector(".dishes").classList.add("filter-discount")
        }


 //product image
        clone.querySelector(".img-dishes").src = imgbase + "medium/" + product.image + "-md.jpg";

        if (product.vegetarian) {
            clone.querySelector(".vegetarian").classList.remove("hide");
            clone.querySelector(".dishes").classList.add("filter-vegetarian")
        }

// product name

        clone.querySelector("h3").textContent = product.name;


//procuct description
        clone.querySelector(".description").textContent = product.shortdescription;

// products with alcohol

        if (product.alcohol) {
            clone.querySelector(".alcohol span").textContent = product.alcohol;
            clone.querySelector(".alcohol").classList.remove("hide");
            clone.querySelector(".dishes").classList.add("filter-alcohol")
        }

//Button for modal

        clone.querySelector("button.details-button").addEventListener("click", () => fetch(pLink + product.id).then(promise => promise.json()).then(dataProduct => showDetails(dataProduct)));



        parent.appendChild(clone);

    });
}



// modal function

function showDetails(product) {
    console.log(product);

//image
    modal.querySelector(".img-details").src = imgbase + "large/" + product.image + ".jpg";

//name
    modal.querySelector("h2").textContent = product.name;

//category
    modal.querySelector("h3").textContent = product.category;

//short description
    modal.querySelector("p.short-des").textContent = product.shortdescription;

//long description
    modal.querySelector("p.long-des").textContent = product.longdescription;


//region of product
    modal.querySelector("li.region span").textContent = product.region;

//allergens to products
    if (product.allergens) {
        modal.querySelector("li.allergens span").textContent = product.allergens;

        modal.querySelector("li.allergens").classList.remove("hide");
    }


// contain alcohol
    if (product.alcohol) {
        modal.querySelector("li.alcohol span").textContent = product.alcohol;
        modal.querySelector("li.alcohol").classList.remove("hide");

    }


//price
    modal.querySelector("li.price span").textContent = product.price;

//vegetation modal
    if (product.vegetarian) {
        modal.querySelector(".vegetarian-modal").classList.remove("hide");

    } else {
        modal.querySelector(".vegetarian-modal").classList.add("hide");
    }


 //sold out modal
    if (product.soldout) {
        modal.querySelector(".soldout-modal").classList.remove("hide");

    } else {
        modal.querySelector(".soldout-modal").classList.add("hide");
    }



    modal.classList.remove("hide");
}


//close modal

modal.addEventListener("click", () => modal.classList.add("hide"));



// discount filter

document.querySelector("button.sale-filter").addEventListener("click", () => {
    console.log("working")
    document.querySelectorAll(".dishes").forEach(article => {
        if (!article.classList.contains('filter-discount')) {

            article.classList.add("hide")
        }
    })
})



// out sale filter

document.querySelector("button.filter-instock").addEventListener("click", () => {
    console.log("working")
    document.querySelectorAll(".dishes").forEach(article => {
        if (!article.classList.contains('filter-soldout')) {

        } else {
            article.classList.add("hide")
        }
    })
})



// vegetarian filter

document.querySelector("button.filter-veg").addEventListener("click", () => {
    console.log("working")
    document.querySelectorAll(".dishes").forEach(article => {
        if (!article.classList.contains('filter-vegetarian')) {

            article.classList.add("hide")
        }
    })
})



//open filter

document.querySelector(".open-filters").addEventListener("click", () => {
    document.querySelector(".filter-container").classList.toggle("hide")
});

document.querySelector("button.filter-alc").addEventListener("click", () => {
    console.log("working")
    document.querySelectorAll(".dishes").forEach(article => {
        if (!article.classList.contains('filter-alcohol')) {

            article.classList.add("hide")
        }
    })
})



//clear filter

document.querySelector("button.clear-filter").addEventListener("click", () => {
    console.log("is working")
    document.querySelectorAll(".dishes").forEach(article => {
        if (!article.classList.contains('.dishes')) {

            article.classList.remove("hide")
        }
    })
})
