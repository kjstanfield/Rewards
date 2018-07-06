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

//
// Render a list of emps for ADMIN page
//
function renderAdminEmps (emps) {
  const listItems = emps.map(emp => `
  <li class="list-group-item d-flex justify-content-between align-items-right">
  <div>${emp.name}</div>
  <span class="controls">
      <i class="far fa-coins"></i>
      <input type="number" data-emp-id="${emp._id}" class="editCoins" size="5" value="${emp.coins}">
      <button name="editUser" data-emp-id="${emp._id}" onclick="editEmp(this)" type="button" class="editBtn">
        <i class="far fa-edit"></i>
      </button>
      <button name="deleteUser" data-emp-id="${emp._id}" data-emp-name="${emp.name}" onclick="handleDelUser(this)" type="button" class="delBtn">
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

//
// Fetch emps from the API and render to the page
//
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

//
// Add New Employee
//
function addEmployee () {
  $('#fullname').val('')
  $('#username').val('')

  const empData = {
    name: $('#fullname').val(),
    id: $('#username').val(),
    coins: '100'
  }

  fetch('/api/emp', {
    method: 'post',
    body: JSON.stringify(empData),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(emp => {
      refreshAdminEmpList()
    })
    .catch(err => {
      console.error('A terrible thing has happened', err)
    })

  $('#fullname').val('')
  $('#username').val('')
}

//
// Deletion Handler - Displays confirmation Modal
//
function handleDelUser (emp) {
  const empId = emp.getAttribute('data-emp-id')
  const empName = emp.getAttribute('data-emp-name')

  $('.modal-body').html(`Are you sure you want to delete <span class="bold">${empName}</span>?`)
  $('#confirmDelete').attr('onclick', `delUser("${empId}")`)
  $('#warningModal').modal('show')
}

//
// Delete User
//
function delUser (empId) {
  $('#warningModal').modal('hide')
  const url = '/api/emp/' + empId

  fetch(url, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => {
      refreshAdminEmpList()
    })
    .catch(err => {
      console.error('Delete Failed', err)
    })
}
