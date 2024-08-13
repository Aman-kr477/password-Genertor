const slider = document.getElementById("myRange");
const output = document.getElementById("demo");
const passwordText=document.querySelector('.first-section>input');
const secondSection=document.querySelector('.second-section');
const button=document.querySelector('button');
const allCheckBox=document.querySelectorAll('.section-third>div>input')
//range slider
output.innerHTML = slider.value;
slider.oninput = function() {
  output.innerHTML = this.value;
}
// array for previuosly used password
const prevPassword=[];
// password generator 
let resultBox=document.createElement('div');
resultBox.style.cssText="color:red;font-size:16px;margin:8px";
secondSection.appendChild(resultBox);
button.addEventListener('click',()=>{

    let userPassword=passwordText.value;
    let userPasswordLength=userPassword.length;
    if(output.innerHTML!=userPasswordLength){
        if(output.innerHTML<userPasswordLength){
            resultBox.innerText=`Your password has ${userPasswordLength-output.innerHTML} extra letters than the range set`;
            setTimeout(resetFunction,5000);
        }
        else{
            resultBox.innerText=`Your password has ${output.innerHTML-userPasswordLength} less letters than the range set`;
            setTimeout(resetFunction,5000);
        }
  
       
    
    }
    else{
        if(userPassword!="Password" &&  userPassword!="password" && userPassword!="123456" && prevPassword.includes(userPassword)===false){
            prevPassword.push(userPassword);
            resultBox.innerText="Your password is good to go";
            resultBox.style.color="green";
            let numbersCount=0,  lowercaseLettersCount=0,  uppercaseLettersCount=0,punctuationCount=0;
            for(let i=0;i<userPasswordLength;i++){
                if(userPassword[i]>='0' &&userPassword[i]<='9'){
                    numbersCount++;
                }
                if((userPassword[i]>='a' &&userPassword[i]<='z' )){
                    lowercaseLettersCount++;
                }
                if((userPassword[i]>='A' && userPassword[i]<='Z')){
                    uppercaseLettersCount++;
                }
                if((userPassword[i].charCodeAt(0)>=38 && userPassword[i].charCodeAt(0)<=47)|| (userPassword[i].charCodeAt(0)>=58 && userPassword[i].charCodeAt(0)<=64)){
                    punctuationCount++;
                }

            }
            // selecting checkbox
            if(numbersCount>0){
                allCheckBox[0].checked=true;
            }
            if(uppercaseLettersCount>0 && lowercaseLettersCount>0){
                allCheckBox[1].checked=true;
                allCheckBox[2].checked=true;
            }
            else if(uppercaseLettersCount>0 || lowercaseLettersCount>0){
                allCheckBox[1].checked=true;
            }
            if(punctuationCount>0){
                allCheckBox[3].checked=true;
            }


            if(numbersCount<1||lowercaseLettersCount<1||uppercaseLettersCount<1||punctuationCount<1){

                resultBox.innerText="Your password is not strong enough";
                setTimeout(resetFunction,5000);
            }
            else{
                resultBox.innerText="Your password is strong enough";
              setTimeout(copyFunction,2000);
                setTimeout(resetFunction,5000);
            }
            //console.log(typeof(userPassword));
        }
        else if(prevPassword.includes(userPassword)===true){
            resultBox.innerText="Please enter a password which is not used previously";
            setTimeout(resetFunction,5000);
        }
        else{
            resultBox.innerText="Please enter a password in a given format";
            setTimeout(resetFunction,5000);
        }
    }
   
}
);


// reset function
const resetFunction=()=>{
    allCheckBox.forEach((ele)=>ele.checked=false)
    resultBox.innerText="";
    resultBox.style.color="red";
}

const copyFunction=()=> {
    
    // Select the text field
    passwordText.select();
    passwordText.setSelectionRange(0, 99999);
  
     // Copy the text inside the text field
    navigator.clipboard.writeText( passwordText.value);
  
    // Alert the copied text
    alert("Copied the text: " + passwordText.value);
  }