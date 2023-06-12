import FetchWrapper from "./fetch_wrapper.js";
import { calculateCalories, capitalize, successful, notWeel, displayEntry} from "./helpers.js";
import  "./node_modules/chart.js/dist/chart.umd.js";
import  "./node_modules/snackbar/dist/snackbar.js"
import  AppData  from "./app-data.js";


const form = document.querySelector("#create-form");
const name = document.querySelector("#create-name");
const carbs = document.querySelector("#create-carbs");
const protein = document.querySelector("#create-protein");
const fat = document.querySelector("#create-fat");
const totalCalories = document.querySelector("#total-calories");

const API = new FetchWrapper("https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/{foot}");

const appData = new AppData

form.addEventListener("submit", event => {
  event.preventDefault();
  if(!(name.value || carbs.value || fat.value || protein.value)){
    notWeel();
  } else {

    API.post("/", {
        fields:{
            name: {stringValue: name.value },
            carbs: {integerValue: carbs.value},
            protein: {integerValue: protein.value },
            fat: {integerValue: fat.value }
        }

    })
        .then(data => {
            if(data.error){
                return;
            }
            successful();

            appData.addFood( carbs.value,
              protein.value,
              fat.value,
              name.value)
           
            displayEntry(name.value, protein.value, carbs.value, fat.value);

            render();
            

            name.value = "";
            carbs.value = "";
            protein.value = "";
            fat.value = "";
        });
      }
});


const init = () => {
    API.get("/?pageSize=5")
    
    .then(data => {
        // console.log(data.documents);
        data.documents?.forEach(document => {
            // console.log(document)
            const fields = document.fields  
            appData.addFood( fields.carbs.integerValue,
              fields.protein.integerValue,
              fields.fat.integerValue,
              fields.name.stringValue)
           displayEntry(
            fields.name.stringValue,
            fields.carbs.integerValue,
            fields.protein.integerValue,
            fields.fat.integerValue 
           )
        });
        render()
    });
    
}

init();


let chartInstance = null;

const render = () => {
  chartInstance?.destroy();

  const appChart = document.querySelector("#app-chart").getContext("2d");

  chartInstance =  new Chart (appChart, {
    type: "bar",
    data: {
      labels: ["Carbs", "Protein", "Fat"],
      datasets: [{  
        label: "# of Votes",
        data: [appData.getTotalCarbs(), appData.getTotalProtein(), appData.getTotalFat()],
        backgroundColor: [
          "#25AEEE",
          "#FECD52",
          "#57D269"
        ],
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)'
        // ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }

  });

  totalCalories.textContent = appData.getTotalCalories();

}
