// Fetches data from the api
function getEmps () {
  return fetch('/api/emp')
    .then(response => response.json())
    .then(emps => {
      return emps
    })
    .catch(error => console.error('GETEMPS:', error))
}

// Scroll to Top
$('#topArrow').on('click', function () {
  $('html, body').animate({
    scrollTop: 0
  }, 600)
})

/**
 * ADMIN PAGE
 */

// Render a list of emps for ADMIN page
function renderAdminEmps(emps) {
  const listItems = emps.map(emp => `
  <li class="list-group-item d-flex justify-content-between align-items-right">
  <div>${emp.name}</div>
  <span class="controls">
      <i class="far fa-coins"></i>
      <input type="number" id="" class="editCoins" size="5" value="${emp.coins}">
      <button name="editUser" id="" onclick="editEmp()" type="button" class="editBtn">
        <i class="far fa-edit"></i>
      </button>
      <button name="deleteUser" id="" onclick="delUser()" type="button" class="delBtn">
        <i class="fal fa-trash-alt"></i>
      </button>
  </span>
</li>`)

  const html = `
  <form action"" method="put">
  <ul class="list-group">${listItems.join('')}</ul>
  </form>`

  return html
}

// Fetch emps from the API and render to the page
function refreshAdminEmpList () {
  getEmps()
    .then(emps => {
      const html = renderAdminEmps(emps)
      $('#list-container').html(html)
    })
}

// Submit Coin changes
function submitCoins () {
  console.log('Save Clicked')
}

// Add User
function addUser () {
  console.log('Added User')

  const empData = {
    name: $('#fullname').val(),
    id: $('#username').val(),
    coins: '100'
  }

  fetch('/api/emp', {
    method: 'post',
    body: JSON.stringify(empData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(emp => {
      console.log('we have posted the data', emp)
      refreshAdminEmpList()
    })
    .catch(err => {
      console.error('A terrible thing has happened', err)
    })

  console.log('New user data ->', empData)
}

// Delete User
function delUser () {
  console.log('Deleted User')
}
