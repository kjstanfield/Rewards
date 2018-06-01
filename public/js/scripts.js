// Attempt to add main list elements

$.get('/api/emp', function (employees) {
  for (let emp in employees) {
    $('#mainlist ul').append(`                   
    <li class="list-group-item d-flex justify-content-between align-items-right">
    <div>${emp.name}</div>
    <span>
      ${emp.coins} <i class="far fa-coins"></i> 
    </span>
    </li>`)
  }
})
