// Fetches data from the api
function getEmps () {
  return fetch('/api/emp')
    .then(response => response.json())
    .then(emps => {
      return emps
    })
    .catch(error => console.error('GETEMPS:', error))
}

/**
 * MAIN PAGE
 */

// Render a list of emps for MAIN page
function renderMainEmps (emps) {
  const listItems = emps.map(emp => `                   
  <li class="list-group-item d-flex justify-content-between align-items-right">
  <div>${emp.name}</div>
  <span>
    ${emp.coins} <i class="far fa-coins"></i> 
  </span>
  </li>`)
  const html = `<ul class="list-group">${listItems.join('')}</ul>`

  return html
}

// Fetch emps from the API and render to the page
function refreshMainEmpList () {
  getEmps()
    .then(emps => {
      const html = renderMainEmps(emps)
      $('#list-container').html(html)
    })
}

/**
 * ADMIN PAGE
 */

// Render a list of emps for ADMIN page
function renderAdminEmps (emps) {
  const listItems = emps.map(emp => `
  <li class="list-group-item d-flex justify-content-between align-items-right">
  <div>${emp.name}</div>
  <span class="controls">
      <i class="far fa-coins"></i> ${emp.coins}
      <i class="far fa-pencil"></i>
      <i class="fal fa-trash-alt"></i>
  </span>
</li>`)
  const html = `<ul class="list-group">${listItems.join('')}</ul>`

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
