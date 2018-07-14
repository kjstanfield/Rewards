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
// When Arrow at bottom of page is clicked
$('#topArrow').on('click', function () {
  $('html, body').animate({
    scrollTop: 0
  }, 600)
})

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
      <button name="editUser" type="button" class="editBtn" data-emp-id="${emp._id}" onclick="handleEditEmp(this)" data-container="body" data-toggle="popover" data-placement="right"  data-offset="" data-content="Saved!">
        <i class="far fa-edit"></i>
      </button>
      <button name="deleteUser" type="button" class="delBtn" data-emp-id="${emp._id}" data-emp-name="${emp.name}" onclick="handleDelUser(this)">
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
      // Sorts Names into alphabetical
      function compare (a, b) {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase()
        let comparison = 0

        if (nameA > nameB) {
          comparison = 1
        } else if (nameA < nameB) {
          comparison = -1
        }
        return comparison
      }
      emps.sort(compare)
      const sortedEmps = emps.sort(compare)
      const html = renderAdminEmps(sortedEmps)
      $('#list-container').html(html)

      $(function () {
        $('[data-toggle="popover"]').popover()
      })
      $(document).ready(function () {
        $('[data-toggle="popover"]').popover({
          placement: 'bottom',
          delay: {
            show: 200,
            hide: 100
          }
        })
        $('[data-toggle="popover"]').click(function () {
          setTimeout(function () {
            $('.popover').fadeOut('slow')
          }, 2000)
        })
      })
    })
}

//
// Add New Employee
//
function addEmployee () {
  const empData = {
    name: $('#fullname').val(),
    id: $('#username').val(),
    coins: '100'
  }

  fetch('/api/emp', {
    method: 'POST',
    body: JSON.stringify(empData),
    headers: {
      'Content-Type': 'application/json'
    }
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
  $('#confirmDelete').attr('onclick', `delEmp("${empId}")`)
  $('#warningModal').modal('show')
}

//
// Delete Employee
//
function delEmp (empId) {
  $('#warningModal').modal('hide')
  const url = '/api/emp/' + empId

  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      refreshAdminEmpList()
    })
    .catch(err => {
      console.error('Delete Failed', err)
    })
}

//
// Edit Handler
//
function handleEditEmp (employee) {
  const empId = employee.getAttribute('data-emp-id')
  const newCoins = $(`input[data-emp-id=${empId}]`).val()

  if (empId) {
    editEmp(empId, newCoins)
  }
}

//
// Edit Employee
//
function editEmp (empId, newCoins) {
  const empData = {
    coins: newCoins
  }
  fetch(`/api/emp/${empId}`, {
    method: 'PUT',
    body: JSON.stringify(empData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(emp => {
      console.log('Successfully updated', emp.name)
      refreshAdminEmpList()
    })
    .catch(err => {
      console.error('Something went wrong', err)
    })
}
