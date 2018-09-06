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
        newLink.href = "#";
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



        if (product.soldout) {
            clone.querySelector(".soldout").classList.remove("hide");
            clone.querySelector(".dishes").classList.add("filter-soldout")
        }

        clone.querySelector(".price span").textContent = product.price;

        if (product.discount) {
            const newPrice = Math.round(product.price - product.price * product.discount / 100);
            clone.querySelector(".price span").textContent = newPrice;
            clone.querySelector(".discount").classList.remove("hide");
            clone.querySelector(".dishes").classList.add("filter-discount")
        }

        clone.querySelector(".img-dishes").src = imgbase + "medium/" + product.image + "-md.jpg";

        if (product.vegetarian) {
            clone.querySelector(".vegetarian").classList.remove("hide");
            clone.querySelector(".dishes").classList.add("filter-vegetarian")
        }

        clone.querySelector("h3").textContent = product.name;
        clone.querySelector(".description").textContent = product.shortdescription;

        if (product.alcohol) {
            clone.querySelector(".alcohol span").textContent = product.alcohol;
            clone.querySelector(".alcohol").classList.remove("hide");
            clone.querySelector(".dishes").classList.add("filter-alcohol")
        }
         clone.querySelector("button.details-button").addEventListener("click", () => fetch(pLink+product.id).then(promise => promise.json()).then(dataProduct =>showDetails(dataProduct)));

        parent.appendChild(clone);

    });
}



// modal function

function showDetails(product){
    console.log(product);
    modal.querySelector("h2").textContent=product.name;
    modal.querySelector("p").textContent=product.longdescription;
    modal.classList.remove("hide");

}

modal.addEventListener("click", ()=>modal.classList.add("hide"));



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
