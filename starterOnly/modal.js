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



// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeSpan.addEventListener("click", launchModal);


// launch modal form
function launchModal() {
  modalbg.style.display === "block" 
    ? modalbg.style.display = "none" 
    : modalbg.style.display = "block";  
}

//patterns 
const patterns = {

  name : /^[a-z]{2,10}(([-])([a-z]{2,10}))?$/i,
  email : /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})$/g,
  quantity : /^\d{1,3}$/g,
};

//arrays
const params = ['first', 'last', 'email', 'birthdate', 'quantity', 'location']


//function validate()   
const validate = () => {

  let survey = {};

  let incorrectInputValues = 0;
 
  console.log('into  validate function ');

  for(let p of params){
 
    if(url.searchParams.has(p)){

      console.log('parameter found');

      if(url.searchParams.get(p) !== null && url.searchParams.get(p) !== undefined && url.searchParams.get(p) !==''){
        
        console.log('p has a value that is not null , undefined or nothing');
    
        if(p === params[0] || p === params[1]){

          alert(p);
          

          console.log(url.searchParams.get(p));
          let isValid = (patterns.name).test(url.searchParams.get(p));

          if(isValid){
            console.log('isValid', isValid, 'first/last');
            alert('valid firstname/lastname');
            if(p === params[0]){
              survey.firstname = url.searchParams.get(p) 
            }
            else {
              survey.lastname = url.searchParams.get(p)
            }
          }
          else {
            console.log('isValid', isValid, 'first/last');
            alert('firstname/lastname must have at least 2 letters');
            if(p === params[0]){
              survey.firstname = url.searchParams.get(p)
              incorrectInputValues++;
            }
            else {
              survey.lastname = url.searchParams.get(p)
              incorrectInputValues++;
            }
          }
        }
        else if(p === params[2]){
          let isValid = (patterns.email).test(url.searchParams.get(p));
          if(isValid){
           console.log('isValid', isValid, 'email');
           alert('valid e-mail');
          }else {
            alert('the email is incorrect');
            incorrectInputValues++;
          }
          survey.email = url.searchParams.get(p)
        }
        else if(p === params[3]){
          //birthdate case
   
          console.log('--birthdate---url.searchParams.get(p)----------',url.searchParams.get(p))
          let isTooLong = (url.searchParams.get(p)).length > 10;
          let year =  (url.searchParams.get(p)).split('-')[0];

          let isNonsensical = year > 2022 || year < 1922;
          console.log("params[3].split('-')[0]", year);

          if(isTooLong){
            alert('error : too long');
            incorrectInputValues++;
          }else if(isNonsensical){
            alert('error : impossible birthdate');
            incorrectInputValues++;
          }
          survey.birthdate = url.searchParams.get(p)

        }
        else if(p === params[4]){
          //quantity case
          let isValid = (patterns.quantity).test(url.searchParams.get(p))
          if(isValid){
            alert('valid quantity');
           
          }
          else {
            alert('not valid quantity');
            incorrectInputValues++;
          }
          survey.quantity = url.searchParams.get(p)
        }
        else if(p === params[5]){
          //location case
          survey.location = url.searchParams.get(p)
          
        }
       
      }
      else {
       
        alert('missing parameter'+' '+p);
        break;
        
      }
    }
    else {
      console.log('unknown parameter');
    }

    if(survey.firstname && survey.lastname && survey.email && survey.birthdate && survey.quantity && survey.location && incorrectInputValues > 0){
      console.log('saving survey data into the localStorage ...');
      localStorage.setItem('survey', {...survey});
    }
    else if(survey.firstname && survey.lastname && survey.email && survey.birthdate && survey.quantity && survey.location && incorrectInputValues === 0) {
      console.log('sending valid data to server ... ');

    }
    else{
      console.log('error : data neither sent to the server nor saved into the localStorage')
    }
    
  }
}

const keepSurveyAlive = (obj) => {





}