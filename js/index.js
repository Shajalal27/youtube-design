// btn-container section java script coding here
const btnContainer = document.getElementById('btn-container');
const cardContainer = document.getElementById('card-container');
const errorElement = document.getElementById('error-element');

let selectedCategory = 1000;

const fetchCategories = () =>{
    const url = 'https://openapi.programming-hero.com/api/videos/categories';
    fetch(url)
    .then((res) => res.json())
    .then(({data}) => {

        data.forEach((card) =>{
            console.log(card);
            const newBtn = document.createElement('button');
            newBtn.className = 'btn btn-gost bg-slate-700 text-white';
            newBtn.innerText = card.category;
            // Click btn function use
            newBtn.addEventListener('click', () =>fetchDataByCategories(card.category_id))
            btnContainer.appendChild(newBtn);
        })
    })
}

const fetchDataByCategories = (categoryId) =>{
    // console.log(categoryId);
    selectedCategory = categoryId;

    const url = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    fetch(url)
    .then((res) => res.json())
    .then(({data}) => {
        if(data.length === 0){
            errorElement.classList.remove('hidden');
        }
        else{
            errorElement.classList.add('hidden');
        }
        // console.log(data);
        cardContainer.innerHTML = '';
        data.forEach((vedio) =>{
            let verifiedBadge = ''
            if(vedio.authors[0].verified){
                verifiedBadge = `<img class="w-6 h-6" src="./images/verify.png" alt=""> `
            }
            console.log(vedio)
            const newCard = document.createElement('div')
            newCard.innerHTML = `
            <div class="card  w-full bg-base-100 shadow-xl">
                <figure class="overflow-hidden h-72">
                    <img src="${vedio.thumbnail}" alt="Shoes" />
                    <h6 class="absolute bottom-[40%] right-12">0 hr</h6>
                </figure>
                <div class="card-body">
                    <div class="flex space-x-4 justify-start items-start">
                        <div>
                            <img class="w-12 h-12 rounded-full" src="${vedio.authors[0].profile_picture}" alt="">
                        </div>
                        <div>
                            <h2 class="card-title">${vedio.title}</h2>
                            <div class="flex mt-3">
                                <p class=" ">${vedio.authors[0].profile_name}</p>
                                ${verifiedBadge}
                            </div>
                            <p class="mt-3">${vedio.others.views
                            }</p>
                        </div>
                    </div>
                </div>
            </div>
            `
            cardContainer.appendChild(newCard)
    })

})

}

fetchCategories()

fetchDataByCategories(selectedCategory)