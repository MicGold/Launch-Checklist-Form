// Write your JavaScript code here!

window.addEventListener("load", function() {
   let destination = document.getElementById("missionTarget");
   let form = document.querySelector('form');
   let pilotName = document.getElementById("pilotName");
   let launchStatus = document.getElementById("launchStatus");
   let faultyItems = document.getElementById("faultyItems");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");

   form.addEventListener("submit", function(event){
      event.preventDefault();
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");
      if(pilotName.value == "" || copilotName.value == "" || fuelLevel.value == "" || cargoMass.value == ""){
         faultyItems.style.visibility = "hidden";
         alert("All fields required");
      }else if(!isNaN(pilotName.value) || !isNaN(copilotName.value)){
         faultyItems.style.visibility = "hidden";
         alert("Pilot and Copilot names must include letters");
         //this validation currently allows user to input numbers AND letters, it only deters number only entries
      }else if(isNaN(fuelLevel.value) || isNaN(cargoMass.value)){
         faultyItems.style.visibility = "hidden";
         alert("Fuel Level and Cargo Mass must be numbers only");
      }else {
      faultyItems.style.visibility = "visible";
      pilotStatus.innerText = `Pilot ${pilotName.value} is ready for launch`;
      copilotStatus.innerText = `Co-pilot ${copilotName.value} is ready for launch`;
      if(Number(fuelLevel.value) < 10000){
         fuelStatus.innerText = "Not enough fuel for journey";
         launchStatus.innerText = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
      }else if(Number(cargoMass.value) > 10000){
         cargoStatus.innerText = "Too much mass";
         launchStatus.innerText = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
      }else {
         launchStatus.innerText = "Shuttle is ready for launch";
         launchStatus.style.color = "green";
         fuelStatus.innerText = "Fuel level high enough for launch";
         cargoStatus.innerText = "Cargo mass low enough for launch";
      }
      }
   });
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json){
         const planetsArr = json;
         console.log(planetsArr);
         let destinationObj = planetsArr[Math.floor(Math.random()*planetsArr.length)];
         console.log(destinationObj);
         destination.innerHTML = `
         <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${destinationObj.name}</li>
               <li>Diameter: ${destinationObj.diameter}</li>
               <li>Star: ${destinationObj.star}</li>
               <li>Distance from Earth: ${destinationObj.distance}</li>
               <li>Number of Moons: ${destinationObj.moons}</li>
            </ol>
         <img src="${destinationObj.image}">
         `
      });
   });
});

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
