const aboutFood = document.getElementById('food-info');
const foodMore = document.getElementById('more');
const search = () => {
    const foodName = document.getElementById('search-area');
    const name = foodName.value;
    loadData(name);

}

const loadData = (text) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDisplay(data));
}

const showDisplay = (food) => {
    food.meals.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="images">
                    <div class="card-body">
                        <h5 class="card-title">${element.strMeal}</h5>
                        <p class="card-text">${element.strInstructions.slice(0, 200)}</p>
                        <button onclick='aboutMoreFood(${element.idMeal})' class="btn btn-danger">More</button>
                    </div>
                </div>
        `;
        aboutFood.appendChild(div);

    });
}

const aboutMoreFood = (data) => {
    const moreFood = `
    https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data}`;
    fetch(moreFood)
        .then(res => res.json())
        .then(data => about(data));
}

const about = (information) => {
    console.log(information);
    foodMore.innerHTML = `
    <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${information.meals[0].strMealThumb}" class="img-fluid rounded-start" alt="images">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${information.meals[0].strMeal}</h5>
          <p class="card-text">${information.meals[0].strInstructions}</p>
          <a href="${information.meals[0].strYoutube}"
          class="btn btn-success">Watch on YouTube</a>
        </div>
      </div>
    </div>
  </div>
    `;
}