let ticketForm = document.querySelector("#tick-form");
let folderi = document.getElementById("folder");
let folderw = document.getElementById("folder2");
let reg = document.querySelector(".ticketreg");
let reg_cont = document.querySelector(".ticketreg-container");
let hardwareProblemContainer = document.getElementById("hardware_problem");
let softwareProblemContainer = document.getElementById("software_problem");
let projectProblemContainer = document.getElementById("project_problem");
let yes_btn = document.getElementById("yes-btn")
let edit_T = document.querySelector(".editT")
let closeM = document.getElementById("closeM")
let Cdone = document.querySelector(".done")
let Cstarted = document.querySelector(".Started")
let CNotDone = document.querySelector(".Not-Done")
const userlog = document.getElementById("userlog");
const logoutC = document.getElementById("logout-C");
const logout = document.getElementById("Logout")
const userInfo = document.querySelector("#user")

// Authenticated User

let authenticatedUser = {};

let isUserAuthenticated = sessionStorage.getItem("authenticated-user");
authenticatedUser = isUserAuthenticated
  ? { ...JSON.parse(isUserAuthenticated) }
  : (window.location.href = "index.html");
  userInfo.innerText = `Welcome ${authenticatedUser.firstname}`;
  
  // logout
  logout.addEventListener("click", () => {
    setTimeout(() => {
      sessionStorage.removeItem("authenticated-user");
      window.location.href = "index.html";
    }, 600);
  });  


function toggleUserlog() {
  if (logoutC.classList.contains("hidden")) {
    logoutC.classList.remove("hidden");
    logoutC.classList.add("visible");
  } else {
    logoutC.classList.remove("visible");
    logoutC.classList.add("hidden");
  }
}

userlog.addEventListener("click", toggleUserlog) ;


// show creaTE TICKETS MODAL
const showTicketModal = () => {
    reg.classList.remove('hide')
    reg_cont.classList.add('ani')
    reg_cont.classList.remove('ani2')
    folderi.classList.add('hide')
    folderw.classList.remove('hide')
}

folderi.addEventListener( "click" , () =>{
    showTicketModal();
})

// hide crerate tickets modal

const hideTicketModal = () => {
    reg.classList.add('hide')
    reg_cont.classList.remove('ani')
    reg_cont.classList.add('ani2')
    folderi.classList.remove('hide')
    folderw.classList.add('hide')
}


folderw.addEventListener("click" , ()=> {
    hideTicketModal()
})

const showEditTModal = () => {
    edit_T.classList.add('e-ani')
    edit_T.classList.remove('e-aniC')
} 
const hideEditTModal = () => {
    edit_T.classList.remove('e-ani')
    edit_T.classList.add('e-aniC')
} 

closeM.addEventListener( "click", () => { 
    hideEditTModal()
})

// hide and show progresscheck
// const done = () => {
//     Cdone.classList.remove('hide')
//     Cstarted.classList.add('hide')
//     CNotDone.classList.add('hide')
// } 
// const Started = () => {
//     Cdone.classList.add('hide')
//     Cstarted.classList.remove('hide')
//     CNotDone.classList.add('hide')
// } 
// const NotDone = () => {
//     Cdone.classList.add('hide')
//     Cstarted.classList.add('hide')
//     CNotDone.classList.remove('hide')
// }

// tickets array
let tickets = [];
let isTickectsAvailable = localStorage.getItem("tickets");
tickets = isTickectsAvailable ? JSON.parse(isTickectsAvailable) : tickets;
let kig = new Date() 
const dateTime = Intl.DateTimeFormat("en", {
    dateStyle: "short",
    timeStyle: "short"
})
console.log(dateTime.format(kig))

ticketForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = e.target[0].value;
    let desc = e.target[1].value;
    let category = e.target[2].value
    let priority = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
    console.log(title, desc, category, priority);
    let today = new Date ()
    
    let ticket = {
        id: "ticket-"+ new Date().getTime(),
        title,
        desc,
        category,
        priority,
        progress: 0,
        DT : dateTime.format(today)
    }
    
    tickets.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(tickets));
    generateTickets()
    console.log(tickets);
    ticketForm.reset();
    hideTicketModal();
    
})

// geerate tickets
const generateTickets = () => {
    hardwareProblemContainer.innerHTML = "";
    softwareProblemContainer.innerHTML = "";
    projectProblemContainer.innerHTML = "";
    tickets.forEach(ticket => {
        if(ticket.category === "hardware"){
            hardwareProblemContainer.innerHTML += `
            <div class="card" style="width: 23rem; height: 5cm;">
            <div class="card-body container">
            <div class="option">
            <ul class="cont">
            ${[...new Array(5)].map((_, idx) => {
                if(idx < ticket.priority) {
                    return `<li style="color: red;"><i class="bi bi-watch"></i></li>`
                } else {
                    return `<li><i class="bi bi-watch"></i></li>`
                }
            }).join("")}
            </ul>
            <ul class="cont2">
            <li><i class="bi bi-eye" data-bs-toggle="modal" data-bs-target="#myModal" onclick="dispT('${ticket.id}')"></i></li>
            <li><i class="bi bi-pencil-square" style="color:gold;" onclick = "editT('${ticket.id}')"></i></li>
            <li><i class="bi bi-x-lg" style="color: red;" id="del" data-bs-toggle="modal" data-bs-target="#tog" data-ticket-id="ticket-123" onclick="del('${ticket.id}')"></i></li>
            </ul>
            </div>
            <h5 class="card-title"><b>${ticket.title}</b></h5>
            <div class="line"></div>
            <div class="overflow-y-scroll">${ticket.desc}</div>
            <br>
            <h6 class="card-text"><b>${ticket.DT}</b></h6>
            <div class="ipt">
            <div>
            <input type="range" class="form-range w-50" id="customRange1" value="${ticket.progress}" disabled>
            <label>${ticket.progress}%</label>
            </div>
            <div>
            ${ticket.progress >= 100 ? '<span class="Done">Done</span>' : ticket.progress >= 50 ? '<span class="Started">Started</span>' : '<span class="Not-Done">Not started</span>'}
            </div>
            </div>
            </div>
            </div>
            </div>
            
            `
        } 
        else if (ticket.category === "software"){
                                softwareProblemContainer.innerHTML += `
                                <div class="card" style="width: 23rem; height: 5cm;">
                                <div class="card-body container">
                                <div class="option">
                                <ul class="cont">
                                ${[...new Array(5)].map((_, idx) => {
                                    if(idx < ticket.priority) {
                                        return `<li style="color: red;"><i class="bi bi-watch"></i></li>`
                                    } else {
                                        return `<li><i class="bi bi-watch"></i></li>`
                                    }
                                }).join("")}
                                </ul>
                                <div class="cont2">
                                <i class="bi bi-eye" data-bs-toggle="modal" data-bs-target="#myModal" onclick="dispT('${ticket.id}')"></i>
                                <i class="bi bi-pencil-square" style="color:gold;" onclick = "editT('${ticket.id}')"></i>
                                <i class="bi bi-x-lg" style="color: red;" id="del" data-bs-toggle="modal" data-bs-target="#tog" data-ticket-id="ticket-123" onclick="del('${ticket.id}')" ></i>
                                </div>
                                </div>
                                <h5 class="card-title"><b>${ticket.title}</b></h5>
                                <div class="line"></div>
                                <div class="overflow-y-scroll">${ticket.desc}</div>
                                <br>
                                <h6 class="card-text"><b>${ticket.DT}</b></h6>
                                <div class="ipt">
                                <div>
                                <input type="range" class="form-range w-50" id="customRange1" value="${ticket.progress}" disabled>
                                <label>${ticket.progress}%</label>
                                </div>
                                    <div>
                                    <div>
                                     ${ticket.progress >= 100 ? '<span class="Done">Done</span>' : ticket.progress >= 50 ? '<span class="Started">Started</span>' : '<span class="Not-Done">Not started</span>'}
                                     </div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    
                                    `
                                    
                                }
                                
                                else {
                                    projectProblemContainer.innerHTML += `
                                    <div class="card" style="width: 23rem; height: 5cm;">
                                    <div class="card-body container">
                                    <div class="option">
                                    <ul class="cont">
                                    ${[...new Array(5)].map((_, idx) => {
                                        if(idx < ticket.priority) {
                                return `<li style="color: red;"><i class="bi bi-watch"></i></li>`
                            } else {
                                return `<li><i class="bi bi-watch"></i></li>`
                                    }
                                }).join("")}
                                </ul>
                                <ul class="cont2">
                                <li><i class="bi bi-eye" data-bs-toggle="modal" data-bs-target="#myModal" onclick="dispT('${ticket.id}')"></i></li>
                                <li><i class="bi bi-pencil-square" style="color:gold;" onclick = "editT('${ticket.id}')"></i></li>
                                <li><i class="bi bi-x-lg" style="color: red;" data-bs-toggle="modal" data-bs-target="#tog" data-ticket-id="" onclick="del('${ticket.id}')" ></i></li>
                                </ul>
                                </div>
                                <h5 class="card-title"><b>${ticket.title}</b></h5>
                                <div class="line"></div>
                                <div class="overflow-y-scroll">${ticket.desc}</div>
                                <br>
                                <h6 class="card-text"><b>${ticket.DT}</b></h6>
                                <div class="ipt">
                                <div>
                                <input type="range" class="form-range w-50" id="customRange1" value="${ticket.progress}" disabled>
                                <label>${ticket.progress}%</label>
                                </div>
                                <div>
                                ${ticket.progress >= 100 ? '<span class="Done">Done</span>' : ticket.progress >= 50 ? '<span class="Started">Started</span>' : '<span class="Not-Done">Not started</span>'}
                                </div>
                                </div>
                                </div>
                                </div>
                                
                                `
                                }
                            })
                        }
                        
    // function del (){
        // } 
    // }
    
    
    
    
    function del(id){
        yes_btn.addEventListener("click", () => {
            let selectedid = id
            tickets = tickets.filter((ticket) => ticket.id !== selectedid)
            generateTickets()
            localStorage.setItem("tickets", JSON.stringify(tickets))
            console.log(tickets)  
        })
    }
    
    function displayTicketDetails (ticket){
        // const modalTitle = document.getElementById("ticketDetailsModalLabel")
        const modalBody = document.querySelector(".modal-body")

        modalBody.innerHTML = `
        <p><b> Ticket Id: </b> ${ticket.id}</p>
        <p><b> Ticket Title: </b>${ticket.title}</p>
        <p><b> Ticket category: </b>${ticket.category}</p>
        <p><b> Ticket Priority: </b>${ticket.priority}</p>
        <p><b> Ticket progress: </b>${ticket.progress}</p>
        <p><b> Ticket Status: </b></p>
        <p><b> Ticket Date: </b>${ticket.DT}</p>
        <div class="modal-footer">
        <p><b>Description</b>
        <br>
        ${ticket.desc}
        </p>
        </div>
        `
        
    }
    
    
    function dispT(id) {
        console.log("ghyjhuyhtuhiugi");
        // Find the corresponding ticket object
        let selectdID = id
        const ticket = tickets.find(ticket => ticket.id === selectdID);
        console.log(ticket)
        if(ticket){
            displayTicketDetails(ticket);
        }
    }
    
    // Function to populate edit form fields with ticket information
    function editT(id) {
        selectedID = id;
        const ticket = tickets.find(ticket => ticket.id === selectedID);
        if(ticket) {
            document.getElementById('title').value = ticket.title;
            document.getElementById('description').value = ticket.desc;
            document.getElementById('inputGroupSelect02').value = ticket.category;
            document.querySelector(`input[name="inlineRadioOptions"][value="${ticket.priority}"]`).checked = true;
            document.getElementById('editF-Progress').value = ticket.progress;
            document.getElementById('progress').innerText = ticket.progress + "%";
            
            // Show the edit modal
            console.log(ticket.progress);
            showEditTModal();
        }
        
        document.getElementById('editT-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const desc = document.getElementById('description').value;
            const category = document.getElementById('inputGroupSelect02').value;
            const priority = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
            const editedTicketIndex = tickets.findIndex(ticket => ticket.id === selectedID);
            const editTprogress = parseInt(document.getElementById('editF-Progress').value);            
            
            // Event listener for input event on progress input
            document.getElementById('editF-Progress').addEventListener("input", function(e) {
                document.getElementById('progress').innerText = e.target.value + "%";
            });
            
            if (editedTicketIndex !== -1) {
                tickets[editedTicketIndex] = {
                    ...tickets[editedTicketIndex],
                    title,
                    desc,
                    category,
                    priority,
                    progress: editTprogress // Update progress with editTprogress
                };
                localStorage.setItem("tickets", JSON.stringify(tickets));
                
                // Call progressCheck with the updated progress value
                // progressCheck(editTprogress);
                
                generateTickets();
                hideEditTModal();
                console.log(editTprogress);
            }
        });
    }

    // Function to update existing ticket with new information

    
generateTickets()

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))