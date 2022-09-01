const loadCocktail = (key) =>{
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${key}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayCocktail(data.drinks))
    .catch(error => console.log(error))
}
const displayCocktail = (datas) =>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    datas.forEach(data => {
        const card = document.createElement('div');
        card.classList.add('card', 'bg-orange-500', 'shadow-xl');
        if(data.strDrink.includes("Margarita","margarita") ){
            card.innerHTML = `
                <figure>
                    <img src=${data.strDrinkThumb} alt="" class="w-full"/>
                </figure>
                <div class="card-body">
                    <h2 class="card-title normal-case text-white">
                        ${data.strDrink}
                        <div class="badge bg-white text-orange-500 border-0">NEW</div>
                    </h2>
                    <p class="text-white text-justify">${data.strInstructions.slice(0,50)}</p>
                    <div class="card-actions justify-start">
                        <label onclick="loadDetail(${data.idDrink})" for="my-modal" class="btn bg-white text-orange-500 border-0 modal-button">View Details</label> 
                    </div>
                </div>
            `
        }
        else{
            card.innerHTML = `
                <figure>
                    <img src=${data.strDrinkThumb} alt="Shoes" class="w-full"/>
                </figure>
                <div class="card-body">
                    <h2 class="card-title normal-case text-white">
                        ${data.strDrink}
                    </h2>
                    <p class="text-white text-justify">${data.strInstructions.slice(0,50)}</p>
                    <div class="card-actions justify-start">
                        <button onclick="loadDetail(${data.idDrink})" for="my-modal" class="btn bg-white text-orange-500 border-0 modal-button">View Details</button> 
                    </div>
                </div>
            `
        }
        cardContainer.appendChild(card);
        sprint(false);
    })  
}

document.getElementById('serach-filed').addEventListener('keyup', function (event){
    sprint(true);
    const serachField = document.getElementById('serach-filed');
    const value = serachField.value
    const commonvalue = value.toLowerCase();
    if(event.key === "Enter"){
        loadCocktail(commonvalue);
    }
    else{
        loadCocktail(commonvalue);
    }
});


const sprint = isSpin =>{
    const spinner = document.getElementById('spinner');
    if(isSpin === true){    
        spinner.style.display = 'block';
    }
    else{
        spinner.style.display = 'none';
    }
};

const loadDetail = drinkId =>{
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetail(data.drinks[0]));
}

const displayDetail = data =>{
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = ` `;
    const moderCard = document.createElement('div');
    moderCard.classList.add('card', 'w-96', 'bg-base-100', 'shadow-xl', 'image-full');
    moderCard.innerHTML = `
        <figure><img src="${data.strDrinkThumb}" alt="" /></figure>
        <div class="card-body">
        <h2 class="card-title">${data.strDrink}</h2>
        <p>${data.strCategory}</p>
        <p>${data.strInstructions}</p>
        <div class="modal-action">
            <label for="my-modal" class="btn bg-orange-500 text-white">Close</label>
        </div>
        </div>
    `
    modalContainer.appendChild(moderCard);
}

loadCocktail('margarita');