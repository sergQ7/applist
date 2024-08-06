const list = document.querySelector('#list');
const filter = document.querySelector('#filter');
let USERS = [];
filter.addEventListener('input', (event) =>{
   const {value} = event.target;
   const filteredUsers = USERS.filter((user) => {
   return user.name.toLowerCase().includes(value.toLowerCase())
})
   render(filteredUsers)
})
async function start(){
   list.innerHTML = "Loading..."
   try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await resp.json()
      USERS = data
      setTimeout(() =>{
         render(data)
      }, 2000)
      
   //console.log(data)
   } catch (err) {
   list.style.color = 'red'
   list.innerHTML = err.message || 'Error fetching data'
   }
}
function render(users = []) {
   if (users.length === 0) {return list.innerHTML="No matched users found!!"}
   else{
   const html = users.map(toHTML).join('')
   list.innerHTML = html
      }
   }

function toHTML(user) {
   return ` <li class="list-group-item">${user.name}</li>`
   }

   start()