function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements

const url = new URL(document.URL)
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

const closeSpan = document.getElementsByClassName("close")[0];
const cityInputs = document.getElementsByClassName("city");
const submitBtn = document.getElementsByClassName("btn-submit")[0];



// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeSpan.addEventListener("click", launchModal);




// launch modal form
function launchModal() {
  modalbg.style.display === "block" 
    ? modalbg.style.display = "none" 
    : modalbg.style.display = "block";  
}



//disable submit button 
submitBtn.disabled = true
console.log(submitBtn)

//booleans 
let isFormValid;


///////////////////////////////objects 
let inputNews = {}
let surveyAnswers = {
  firstname:'' ,
  lastname :'',
  email:'',
  birthdate:'',
  quantity:'',
  city:'' ,
  agreement: true,
  news : '',
}
//patterns 
const patterns = {

  name : /^[a-z]{2,10}(([-])([a-z]{2,10}))?$/i,
  email : /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})$/g,
  birthdate:/^[\d\-]{10}$/,
  quantity :/^[0-9]{1,2}$/,
};

//arrays
let inputsFormData = []
let inputsCheckboxCity = []
const params = ['first', 'last', 'email', 'birthdate', 'quantity', 'location', 'agreemnent']
const errorMessages = {
  name: 'Il faut au moins deux caractères',
  email:'Email non valide',
  birthdate:'Date de naissance non valide',
  quantity:'Vous devez entrer un nombre',
  location :'Vous devez choisir une ville',
  agreement:'Vous devez accepter les conditions',
}


//____________________________________________LOOPS________________________________________

//loop for finding inputs and make objects ouf of them 

for(let div of formData){

  let children = div.childNodes

  if(params.find(el => el === children[4].id)){

    let inputObject = {

      name : children[4].id,

      input : children[4],

      pattern : (children[4].id === 'first' || children[4].id === 'last') 
                ? patterns.name 
                : (children[4].id === 'email' 
                ? patterns.email 
                : (children[4].id ==='birthdate' 
                ? patterns.birthdate 
                : (children[4].id === 'quantity'
                ? patterns.quantity : ''))),

      errorMessage: (children[4].id === 'first' || children[4].id === 'last') 
                  ? errorMessages.name 
                  : (children[4].id === 'email' 
                  ? errorMessages.email 
                  : (children[4].id ==='birthdate' 
                  ? errorMessages.birthdate 
                  : (children[4].id === 'quantity'
                  ? errorMessages.quantity : ''))),

      isValid : false,
    };
  
 
    inputsFormData.push(inputObject)
    


  }
  else {
  
    children = Array.from(children)
 
    for(let el of children){
      if(el.id) {
        if(el.id.startsWith('location')){

        
          let inputObject = {

            name : el.name,
    
            input : el,
      
            isSelected : false,

            errorMessage: errorMessages.location
          };

      
          inputsCheckboxCity.push(inputObject)

        }
      }
      
      if(el.name === 'agreement'){
          console.log('input agreement found', el)

          el.onchange = () => {
            console.log('agreement changed')
            if(surveyAnswers.agreement === true){

              surveyAnswers.agreement = false
              let newErrorParagraph = document.createElement('p');
              newErrorParagraph.innerText = errorMessages.agreement;
              newErrorParagraph.classList.add('error-message');
              newErrorParagraph.id = 'agreement-error'
              el.parentNode.append(newErrorParagraph);
              console.log('surveyAnswers', surveyAnswers)

            }
            else{

              surveyAnswers.agreement = true
              console.log('el.parentNode', el.parentNode)
              console.log('-----------------------')
              console.log('el.parentNode.lastChild', el.parentNode.lastElementChild)
              el.parentNode.removeChild(el.parentNode.lastChild)

            }
            console.log("survey post onchange obj inputsFormData", surveyAnswers)
            isFormValid =  (inputsFormData.length < 5 || inputsFormData.find(obj => obj.isValid === false) || surveyAnswers.agreement !== true || surveyAnswers.city ==='') ? false : true;
            isFormValid === true ? submitBtn.disabled = false : submitBtn.disabled = true ;
           

          }

      

      }
      
      if(el.name === 'news'){
    
          //continuer ici
          el.onchange = () => {
              console.log('news changed')
              if(inputNews.isSelected === true){

                inputNews.isSelected = false
                surveyAnswers.news = inputNews.isSelected
                console.log('-----------------------')
                console.log('surveyAnswers', surveyAnswers)
                console.log('-----------------------')

              }
              else{

                inputNews.isSelected = true
                surveyAnswers.news = inputNews.isSelected
                console.log('-----------------------')
                console.log('surveyAnswers', surveyAnswers)
                console.log('-----------------------')
          
              }

          }

      }
    }
  } 
}



//loop for handling the change event of first last email birthdate and quantity
for(let obj of inputsFormData){

  obj.input.onchange = (e) => {
    
    console.log('e.target.value', e.target.value);

        if((obj.pattern).test(e.target.value) ||  obj.name === 'quantity' && !e.target.value.includes('e') && obj.pattern.test(e.target.value)){ 

          console.log('e.target.value', e.target.value);
          //handling the test : true , but impossible birthdate case :

          //each year caracter tapped triggers the event so ...
          if(obj.input.parentNode.lastChild.id === 'error-message'){
            obj.input.parentNode.removeChild((obj.input.parentNode.lastChild))
          }

        

          if(obj.name === 'birthdate'){
            console.log('e.target.value', e.target.value)

            //getting the year from the e.target.value
            let date = e.target.value
            dateSplits = date.split('-')
            let year = dateSplits[0]
            console.log('typeof year', typeof year)
            let intYear = parseInt(year, 10)
            // end of getting the year and making it an Integer

            //checling if the intYear is not nonsensical
            if(intYear > 2010 || intYear < 1922){
              console.log('intYear', intYear)
              obj.errorMessage = 'Année de naissance incorrecte'
              obj.isValid = false
              
  
              //displaying error message 
              let newErrorParagraph = document.createElement('p');
              newErrorParagraph.innerText = obj.errorMessage;
              newErrorParagraph.classList.add('error-message');
              newErrorParagraph.id = 'error-message'
              obj.input.parentNode.append(newErrorParagraph)
            
              obj.input.style.border = "red solid 1px";
         
            
            
            }else {
              // if the intYear is correct 
              obj.isValid = true;
              //
              surveyAnswers.birthdate = e.target.value
                      
              console.log("survey post onchange obj inputsFormData", surveyAnswers)
              if(obj.input.parentNode.lastChild.id === 'error-message'){
                obj.input.parentNode.removeChild((obj.input.parentNode.lastChild))
              }
            }

            //ckecking a change in the value of isFormValid
            isFormValid =  ( inputsFormData.length < 5 || inputsFormData.find(obj => obj.isValid === false) || surveyAnswers.agreement !== true || surveyAnswers.city ==='') ? false : true;
            isFormValid === true ? submitBtn.disabled = false : submitBtn.disabled = true ;
            // end of the impossible birthdate handling
          } 
          else {

            obj.isValid = true;
            obj.name=== 'first' 
                        ? surveyAnswers.firstname = e.target.value 
                        : obj.name === 'last' 
                        ? surveyAnswers.lastname = e.target.value 
                        : obj.name === 'email' 
                        ? surveyAnswers.email = e.target.value
                        : obj.name === 'birthdate'
                        ? surveyAnswers.birthdate = e.target.value
                        : obj.name === 'quantity'
                        ? surveyAnswers.quantity =e.target.value
                        : ''
            
            console.log("survey post onchange obj inputsFormData", surveyAnswers)
            isFormValid =  (inputsFormData.length < 5 || inputsFormData.find(obj => obj.isValid === false) || surveyAnswers.agreement !== true || surveyAnswers.city ==='') ? false : true;
            isFormValid === true ? submitBtn.disabled = false : submitBtn.disabled = true ;

            if(obj.input.parentNode.lastChild.id === 'error-message'){
              obj.input.parentNode.removeChild((obj.input.parentNode.lastChild))
            }
          }
        }
        else {
          obj.isValid = false;
          isFormValid =  ( inputsFormData.length < 5 || inputsFormData.find(obj => obj.isValid === false) || surveyAnswers.agreement !== true || surveyAnswers.city ==='') ? false : true;
          isFormValid === true ? submitBtn.disabled = false : submitBtn.disabled = true ;
          let newErrorParagraph = document.createElement('p');
          newErrorParagraph.innerText = obj.errorMessage;
          newErrorParagraph.classList.add('error-message');
          newErrorParagraph.id = 'error-message'
          obj.input.parentNode.append(newErrorParagraph)

          obj.input.style.border = "red solid 1px";
          
          

        
        }
  }
}


//loop for handling the change event of the city checkboxes 

for(let obj of inputsCheckboxCity){

  obj.input.onchange = (e) => {

    if(!obj.isSelected){    
      console.log('never selected object')
      obj.isSelected = true;
 
      surveyAnswers.city = e.target.value
      console.log('surveyAnswers.city changed', surveyAnswers)
      
      if(obj.input.parentNode.lastChild.id === 'city-error'){
        obj.input.parentNode.removeChild(obg.input.parentNode.lastChild)
      }
 

    }
    else {
      console.log('already selected object')
      surveyAnswers.city = e.target.value

    
        //if no city is selected
        if(inputsCheckboxCity.find(el => el.isSelected === true) === 0){
          let newErrorParagraph = document.createElement('p');
          newErrorParagraph.innerText = obj.errorMessage;

          newErrorParagraph.classList.add('error-message');

          newErrorParagraph.id = 'city-error'
          obj.input.parentNode.append(newErrorParagraph);
          obj.input.style.border = "red solid 1px";
         

        }
        
     
    
    }
    //always checking after a change event if the survey is valid
    isFormValid =  (inputsFormData.length < 5 || inputsFormData.find(obj => obj.isValid === false) || surveyAnswers.agreement !== true|| surveyAnswers.city ==='') ? false : true;
    isFormValid === true ? submitBtn.disabled = false : submitBtn.disabled = true ;
 
    console.log('isFormValid', isFormValid)
    console.log('---------------------------')
    console.log('---------------------------')
    // end of the checking



  }


}

// when all inputs are checked the submit button is enabled and the validate function can be called 
const validate = () => {
  console.log('Formulaire complété correctement');

  let survey = surveyAnswers;
  console.log('survey to send', survey);

  let modalBody = document.getElementsByClassName('modal-body')[0];
 
  modalbg.style.display = "block" 
  modalbg.classList.add('bg-confirmation-div');

  //clean slate 
  modalBody.innerHTML = ''
  modalBody.classList.add('confirmation-div');

  //div message
  let messageDiv = document.createElement('div');
  messageDiv.classList.add('message-div');
  let messageParagraph = document.createElement('p');
  messageParagraph.innerHTML = "Merci pour"+"<br />"+"votre inscription";
  messageDiv.appendChild(messageParagraph);

  //div Exit button
  let exitButtonDiv = document.createElement('div');
  exitButtonDiv.classList.add('exit-button-div');
  let exitBtn = document.createElement('button');
  exitBtn.innerText = "Fermer"
  exitButtonDiv.appendChild(exitBtn)
  exitBtn.addEventListener('click', ()=> {
    launchModal()
  })

  //append messageDiv and exitButtonDiv
  modalBody.appendChild(messageDiv);
  modalBody.appendChild(exitButtonDiv)
  




}
