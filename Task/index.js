var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var tableContent = document.getElementById("tableContent");

var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");

var submitBtn = document.getElementById("submitBtn");
submitBtn.onclick = function () {
        
    addSite()
    
}


if (localStorage.getItem('list') == null) {
    siteDetails = []
}
else 
{
    siteDetails = JSON.parse(localStorage.getItem('list'))
    display(siteDetails)
}


function addSite() {

    if
    (
        siteName.classList.contains("is-valid") &&
        siteURL.classList.contains("is-valid")
    )
    {
    var site = 
    {
        siteName: siteName.value,
        siteURL: siteURL.value,
    }

    siteDetails.push(site)
    
    localStorage.setItem('list', JSON.stringify(siteDetails))
    
    
    display(siteDetails)
    clearForm()
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
    }
    else
    {
        boxModal.classList.remove("d-none");
    }
    

}

function clearForm() {
    siteName.value = "";
    siteURL.value = "";
}


function display(siteArray) {

    var box = ''
    for (var i = 0; i < siteArray.length; i++) {
        box += `
               <tr class="text-center">
                    <td>${i+1}</td>
                    <td class="highlight">${siteArray[i].siteName}</td>
                    <td>
                        <button class="border-0 bg-transparent" onclick="visitSite(${i})">
                            <i class="fa-solid fa-eye" style="color: #6e8018;"></i>
                        </button>
                    </td>
                    <td>
                        <button class="border-0 bg-transparent" onclick="deleteSite(${i})">
                            <i class="fa-solid fa-trash-can" style="color: #ba081d;"></i>
                        </button>
                    </td>
                </tr>
    `
    }

    tableContent.innerHTML = box

}


// delete function, remove website completely from local storage when clicking trash icon //
function deleteSite(index)
{
    siteDetails.splice(index,1)
    localStorage.setItem('list', JSON.stringify(siteDetails))
    display(siteDetails)
}




// two variables holding regular expression of name and url //
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  
siteName.addEventListener("input", function () {
    validate(siteName, nameRegex);
});
  
siteURL.addEventListener("input", function () {
    validate(siteURL, urlRegex);
});
  

// function to toggle between validation and no-validation to help the user //
function validate(element, regex) {
    var testRegex = regex;
    if (testRegex.test(element.value)) {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
    } else {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
    }
  }


//function to make the modal by default display none //
// switch to normal display when clicking on submit in case of invalid data //
function closeModal() {
    boxModal.classList.add("d-none");
}
  
// function to close the modal when clicking on close button on top //  
closeBtn.onclick = function () {
        
    closeModal()
    
}
  
// function to close modal when clicking any where on the screen //
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
      closeModal();
  }
});




// Not working, I tried different ways but it is not working //
// function to go to visit the website when clicking on the eye icon //
function visitSite(e) {
    var websiteIndex = e.target.dataset.index;
    var httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(siteDetails[websiteIndex].siteURL)) {
      open(siteDetails[websiteIndex].siteURL);
    } else {
      open(`https://${siteDetails[websiteIndex].siteURL}`);
    }
  }
