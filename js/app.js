const loadCocktail = (key, dataLimit) =>{
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${key}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayCocktail(data.drinks, dataLimit))
    .catch(error => console.log(error))
}
const displayCocktail = (datas , dataLimit) =>{
    const searchResultNumber = document.getElementById('search-result-number');
    const searchInfo = document.getElementById('search-info');
    const errorInfo = document.getElementById('error-info');
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    if(datas === null){
        errorInfo.classList.remove('hidden');
        searchInfo.classList.add('hidden');
        sprint(false);
    }
    else{
        console.log(dataLimit);
        errorInfo.classList.add('hidden');
        if(dataLimit && datas.length > 12){
            searchResultNumber.innerText = datas.length;
            searchInfo.classList.remove('hidden');
            datas = datas.slice(0,12);
        }
        else{
            searchInfo.classList.add('hidden');
        }
        datas.forEach(data => {
            const card = document.createElement('div');
            card.classList.add('card', 'bg-orange-500', 'shadow-xl');
            if(data.strDrink.includes("Margarita") ){
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
                            <label onclick="loadDetail(${data.idDrink})" for="my-modal" class="btn bg-white text-orange-500 border-0 modal-button">View Details</label> 
                        </div>
                    </div>
                `
            }
            cardContainer.appendChild(card);
            sprint(false);
        })

    }
    
}

document.getElementById('serach-filed').addEventListener('keyup', function (event){
    if(event.key === "Enter"){
        productSearchsd(12);
    }
    else{
        productSearchsd(12)
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
        <h2 class="card-title text-white">${data.strDrink}</h2>
        <p class="text-white">${data.strCategory}</p>
        <p class="text-white">${data.strInstructions}</p>
        <div class="modal-action">
            <label for="my-modal" class="btn bg-orange-500 text-white">Close</label>
        </div>
        </div>
    `
    modalContainer.appendChild(moderCard);
};

const productSearchsd = dataLimit => {
    sprint(true);
    const serachField = document.getElementById('serach-filed');
    const value = serachField.value
    const commonvalue = value.toLowerCase();
    loadCocktail(commonvalue, dataLimit);
    console.log(dataLimit);
}

document.getElementById('view-all').addEventListener('click',function(){
    productSearchsd();
})

loadCocktail('',10);