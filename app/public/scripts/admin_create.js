var numAddlSections = 0;

$('#add-section').click(function() {
  var sectionTemplate = $('#section-template').html(); 
  var section = $(sectionTemplate);

  var header = section.find('.section-header');
  header.addClass('.addl-section-header-' + numAddlSections);
  var body = section.find('.section-body');
  body.addClass('.addl-section-body-' + numAddlSections);

  numAddlSections++;

  $('#section-container').append(section);
});