const searchDestination = document.querySelector(".search .btnSearch");
const clearDestinationBtn = document.querySelector(".search .btnClear");

const recommend = document.querySelector(".recommend");
const detail = document.querySelector(".detail");


function showDestination() {
  const inputDestination = document.querySelector(".search input").value;
  var city = [];
  clearDestination()

  fetch("./travel_recommendation_api.json", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .then((response) => {
      for (const detination in response) {
        let keyword = inputDestination?.trim().toLowerCase();
        if (detination.includes(keyword) && keyword != "") {
          // console.log("city: ", response[detination]);
          city = response[detination];
          
          if (city[0].cities) {
            for (let index = 0; index < city.length; index++) {
              
              let itemCity = city[index];
              // console.log(itemCity.name);
              for (let index = 0; index < itemCity.cities.length; index++) {
                let itemCity2 = itemCity.cities[index];
                // console.log(itemCity2);
                
                recommend.innerHTML += `   
                  <div class="detail">
                    <img src="${itemCity2.imageUrl}" alt="">
                    <h3>${itemCity2.name}</h3>
                    <p>${itemCity2.description}</p>
                    <button >Visit</button>
                  </div>`;
              }
            }
          } else {
            for (let index = 0; index < city.length; index++) {
              let itemCity = city[index];
              // console.log(itemCity);
              recommend.innerHTML += `   
              <div class="detail">
                <img src="${itemCity.imageUrl}" alt="">
                <h3>${itemCity.name}</h3>
                <p>${itemCity.description}</p>
                <button onClick = 'showTime()'>Visit</button>
              </div>`;
            }
          }
        }
      }
    });

}
function clearDestination(){
  recommend.innerHTML = `<div class="border">`
}


searchDestination.addEventListener("click", showDestination);
clearDestinationBtn.addEventListener("click", clearDestination);
