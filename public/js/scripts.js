// Attempt to add main list elements

$.get('/api/emp', function (employees) {
  for (let emp of employees) {
    $('#mainlist ul').append(`                   
    <li class="list-group-item d-flex justify-content-between align-items-right">
    <div>${emp.name}</div>
    <span>
      ${emp.coins} <i class="far fa-coins"></i> 
    </span>
    </li>`)
  }
})

$.get('/api/emp', function (employees) {
  for (let emp of employees) {
    $('#adminlist ul').append(`                   
    <li class="list-group-item d-flex justify-content-between align-items-right">
    <div>${emp.name}</div>
    <span class="controls">
        <i class="far fa-coins"></i> ${emp.coins} 
        <i class="far fa-pencil"></i>
        <i class="fal fa-trash-alt"></i>
    </span>
</li>`)
  }
})
