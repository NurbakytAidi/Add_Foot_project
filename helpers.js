
export const  capitalize = (word) => {
    console.log(word)
    return word[0].toUpperCase() +  word.substring(1).toLowerCase();
    
}

export const calculateCalories  = (carbs = 0, protein = 0, fat  = 0) => {
   return (
    carbs * 4 + protein * 4 +  fat * 9
   );
};


export const successful = () => {
      snackbar.show("Food added successfully.");
}   


export const notWeel  = () => {
    snackbar.show("Some data is missing.");
}

const list = document.querySelector("#food-list");


export  const displayEntry = (name, protein, carbs, fat) => {

    list.insertAdjacentHTML("beforeend", `<li class="card">
            <div>
              <h3 class="name">${capitalize(name)}</h3>
              <div class="calories">${calculateCalories(carbs, protein, fat)} calories</div>
              <ul class="macros">
                <li class="carbs"><div>Carbs</div><div class="value">${carbs}g</div></li>
                <li class="protein"><div>Protein</div><div class="value">${protein}g</div></li>
                <li class="fat"><div>Fat</div><div class="value">${fat}g</div></li>
              </ul>
            </div>
                </li>`);

}