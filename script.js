const foodContainer = document.getElementsByClassName("foodContainer")[0];
const searchBox = document.getElementById('search-input');
const mainContainer = document.getElementsByClassName('search-area')[0];


const modalBox = document.querySelector('.modalBox');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalCountry = document.getElementById('modalCountry');
const modalInstructions = document.getElementById('modalInstructions');
const modalIngredients = document.getElementById('modalIngredients');



 

function fetchData() {
  const term = searchBox.value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then(res => res.json())
    .then(data => {
      allMeals = data.meals; 
      displayData(allMeals);
      console.log(data.meals)
    });
}

// diplayy fnction
function displayData(data) {

  foodContainer.innerHTML = "";

  data.map((obj) => {

    let foodDiv = document.createElement("div");
    foodDiv.className = "foodDiv";

    let foodImg = document.createElement("img");
    foodImg.src = obj.strMealThumb;
    foodImg.className='foodImg';

    let foodTitle = document.createElement("h2");
    foodTitle.innerText = obj.strMeal;
    foodTitle.className = 'foodTitle';

     let foodDesc = document.createElement("h2");
    foodDesc.innerText = obj.strArea + " " + "Recipe";
    foodDesc.className = 'foodDesc';

    let foodSubTitle= document.createElement('p')
    foodSubTitle.className='foodSubTitle';
    foodSubTitle.innerText= 'Please Click Here to see Details...';


    let clickBtn = document.createElement('button');
    clickBtn.className = 'clickBtn';
    clickBtn.innerText = 'Click Here';


    //model fnction

    function showModel(obj){
    foodContainer.style.filter = 'blur(2px)';
    modalBox.style.display = 'flex';

  // data set 
  modalImg.src = obj.strMealThumb;
  modalTitle.innerText = obj.strMeal;
  modalCountry.innerText = obj.strArea;
  modalInstructions.innerText = obj.strInstructions;

    modalIngredients.innerHTML = `
    <li>${obj.strIngredient1}</li>
    <li>${obj.strIngredient2}</li>
    <li>${obj.strIngredient3}</li>
    <li>${obj.strIngredient4}</li>
    <li>${obj.strIngredient5}</li>
    <li>${obj.strIngredient6}</li>
    <li>${obj.strIngredient7}</li>
    <li>${obj.strIngredient8}</li>
    <li>${obj.strIngredient9}</li>
    <li>${obj.strIngredient10}</li>
    
  `; 
   
  };
    clickBtn.onclick = () => {
    showModel(obj);
      };


    //append childdd
    foodDiv.appendChild(foodImg);
    foodDiv.appendChild(foodTitle);
    foodDiv.appendChild(foodDesc);
    foodDiv.appendChild(foodSubTitle);
    foodDiv.appendChild(clickBtn);

    foodContainer.appendChild(foodDiv);

  });
}
//close btn
let closeBtn = document.createElement('i');
closeBtn.className = "far fa-window-close closeBtn";

modalBox.appendChild(closeBtn);

// function close btn
closeBtn.onclick = () => {
  modalBox.style.display = 'none';
  foodContainer.style.filter = 'blur(0)';
};

fetchData();