/*jshint esversion: 6 */

// constant that will be used in different blocks in the code below
const button1 = document.querySelector('#requestResourceButton');
const options = document.querySelector('#resourceType');
const input = document.querySelector('#resourceId');
const contentEl1 = document.querySelector('#contentContainer');

// General function that will be used to request data
function onRequestData(listener, url){
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', listener);
    oReq.open('GET',url);
    oReq.send();
}

// Main event listener when user clicks on a button
button1.addEventListener("click",function(){
  // Reinitialize the DOM to be blank every time the user clicks on the button
  contentEl1.innerHTML = "";
  // People display; when no id is specified
  if(options.value === "people" && input.value ===""){

    onRequestData(reqListener1,'http://swapi.co/api/people/');

    function reqListener1() {
      const requestData = JSON.parse(this.responseText);
      console.log(this);
      contentEl1.innerHTML= JSON.stringify(requestData.results);
    }
  }
  // People display; when id is specified
  else if(options.value === "people"){

    onRequestData(reqListener2,`http://swapi.co/api/people/${input.value}`);

    function reqListener2() {
      if(this.status === 404){
        const h2 = document.createElement("h2");
        h2.innerHTML = "Unknown People ID; Please enter a valid ID";
        contentEl1.appendChild(h2);
        h2.style.color = 'red';
      } else{
        const requestData = JSON.parse(this.responseText);
        const h2 = document.createElement("h2");
        const gender = document.createElement("p");

        h2.innerHTML= `name: ${requestData.name}`;
        gender.innerHTML = `gender: ${requestData.gender}`;

        contentEl1.appendChild(h2);
        h2.appendChild(gender);

        onRequestData(reqListener3,requestData.species[0]);

        function reqListener3() {
          const requestData = JSON.parse(this.responseText);
          const species = document.createElement(requestData.species);
          species.innerHTML = `species: ${requestData.name}`;
          h2.appendChild(species);
        }
      }
    }
  }

  // Planet display; when no id is specified
  else if (options.value === "planets" &&  input.value ==="") {

    onRequestData(reqListener4,"http://swapi.co/api/planets/");

    function reqListener4() {
      const requestData = JSON.parse(this.responseText);
      const contentEl1 = document.querySelector('#contentContainer');
      console.log(requestData.results);
      contentEl1.innerHTML= JSON.stringify(requestData.results);
    }
  }

  // People display; when id is specified
  else if(options.value === "planets"){

    onRequestData(reqListener5,`http://swapi.co/api/planets/${input.value}`);

    function reqListener5() {
      if(this.status === 404){
        const h2 = document.createElement("h2");
        h2.innerHTML = "Unknown Planet ID; Please enter a valid ID";
        contentEl1.appendChild(h2);
        h2.style.color = 'red';
      } else{
        const requestData = JSON.parse(this.responseText);
        const h2 = document.createElement("h2");
        const terrain = document.createElement("p");
        const population = document.createElement("p");
        const films = document.createElement("h2");
        const ul = document.createElement("ul");

        h2.innerHTML= `name: ${requestData.name}`;
        terrain.innerHTML = `terrain: ${requestData.terrain}`;
        population.innerHTML = `population: ${requestData.population}`;
        films.innerHTML = "list of films";

        contentEl1.appendChild(h2);
        h2.appendChild(terrain);
        h2.appendChild(population);
        contentEl1.appendChild(films);
        films.appendChild(ul);

        let leng = requestData.films.length;

        // The for loop will check all the films where the planet is
        for(let i = 0; i < leng; i++){
          onRequestData(reqListener6,`${requestData.films[i]}`);
        }
        function reqListener6() {
          const requestData = JSON.parse(this.responseText);
          const li = document.createElement("li");
          li.innerHTML = requestData.title ;
          ul.appendChild(li);
        }
      }
    }
  }

  // Starships display; when no id is specified
  else if(options.value === "starships" && input.value === ""){
    onRequestData(reqListener7,"http://swapi.co/api/starships/");

    function reqListener7() {
      const requestData = JSON.parse(this.responseText);
      const contentEl1 = document.querySelector('#contentContainer');
      console.log(requestData.results);
      contentEl1.innerHTML= JSON.stringify(requestData.results);
    }
  }

  else if(options.value === "starships"){

    onRequestData(reqListener8,`http://swapi.co/api/starships/${input.value}`);

    function reqListener8() {
      const requestData = JSON.parse(this.responseText);

      if(this.status === 404){
        const h2 = document.createElement("h2");
        h2.innerHTML = "Unknown Starships ID; Please enter a valid ID";
        contentEl1.appendChild(h2);
        h2.style.color = 'red';
      } else{
        const h2 = document.createElement("h2");
        const manufacturer = document.createElement("p");
        const class_starship = document.createElement("p");
        const films = document.createElement("h2");
        const ul = document.createElement("ul");

        h2.innerHTML= `name: ${requestData.name}`;
        manufacturer.innerHTML = `manufacturer: ${requestData.manufacturer}`;
        class_starship.innerHTML = `class: ${requestData.starship_class}`;
        films.innerHTML = "list of films";

        contentEl1.appendChild(h2);
        h2.appendChild(manufacturer);
        h2.appendChild(class_starship);
        contentEl1.appendChild(films);
        films.appendChild(ul);

        let leng = requestData.films.length;

        //// The for loop will check all the films where the starship is
        for(let i = 0; i < leng; i++){
          onRequestData(reqListener9,`${requestData.films[i]}`);
        }
        function reqListener9() {
          const requestData = JSON.parse(this.responseText);
          const li = document.createElement("li");
          li.innerHTML = requestData.title ;
          ul.appendChild(li);
        }
      }
    }
  }
});








