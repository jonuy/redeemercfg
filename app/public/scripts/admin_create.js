var numAddlSections = 0;

// Add header/body section
$('#add-section').click(function() {
  var sectionTemplate = $('#section-template').html(); 
  var section = $(sectionTemplate);

  var header = section.find('.section-header');
  header.attr('id', 'addl-section-header-' + numAddlSections);
  var body = section.find('.section-body');
  body.attr('id', 'addl-section-body-' + numAddlSections);

  numAddlSections++;

  $('#section-container').append(section);
});

// Save to the database
$('#save').click(function() {
  var data = {};

  // Get the required fields
  data.name = $('#study-name').val();
  data.title = $('#study-title').val();
  data.subtitle = $('#study-subtitle').val();
  data.scripture_verse = $('#scripture-verse').val();
  data.scripture_body = $('#scripture-body').val();

  // Get the additional sections
  if (numAddlSections > 0) {
    data.sections = [];

    for (var i = 0; i < numAddlSections; i++) {
      data.sections[i] = {};
      data.sections[i].section_title = $('#addl-section-header-' + i).val();
      data.sections[i].section_body = $('#addl-section-body-' + i).val();
    }
  }


  var jsonData = JSON.stringify(data);
  console.log('Creating study with data: ' + jsonData);

  $.ajax({
    type: 'POST',
    url: window.location.origin + '/study',
    data: jsonData,
    contentType: 'application/json',
    success: function(data, textStatus, jqXHR) {
      window.location.href = window.location.origin + '/admin';
    }
  });
});