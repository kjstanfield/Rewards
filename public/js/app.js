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
  $('html, body').animate({ scrollTop: 0 }, 600)
})

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
      // Sorts page to show employees with the most coins at top.
      function compare(a, b) {
        const coinsA = a.coins
        const coinsB = b.coins
        let comparison = 0

        if (coinsA > coinsB) {
          comparison = -1
        } else if (coinsA < coinsB) {
          comparison = 1
        }
        return comparison
      }
      emps.sort(compare)
      const sortedEmps = emps.sort(compare)
      const html = renderMainEmps(emps)
      $('#list-container').html(html)
    })
}
