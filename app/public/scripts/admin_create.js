var numAddlSections = 0;
var numWorshipSections = 0;

// Setup commonmark parsing
$(document).ready(function() {
  var writer = new commonmark.HtmlRenderer();
  var reader = new commonmark.DocParser();

  var timer;
  var parsed;
  var render = function() {
    if (parsed === undefined) {
      return;
    }
    var result = writer.renderBlock(parsed);
    $('#preview').html(result);
  };

  var parseAndRender = function () {
    clearTimeout(timer); // Clear the timer so we don't end up with dupes.
    timer = setTimeout(function() { // assign timer a new timeout
      parsed = reader.parse(compileUnparsedDoc());
      render();
    }, 0); // ms delay
  };

  parseAndRender();

  $('#study-name').bind('keyup paste cut mouseup', parseAndRender);
  $('#study-title').bind('keyup paste cut mouseup', parseAndRender);
  $('#study-subtitle').bind('keyup paste cut mouseup', parseAndRender);
  $('#scripture-verse').bind('keyup paste cut mouseup', parseAndRender);
  $('#scripture-body').bind('keyup paste cut mouseup', parseAndRender);


  // Compile all sections to be parsed
  var compileUnparsedDoc = function() {
    var text = '';

    var title = $('#study-title').val();
    if (title.length > 0) {
      text += '# ' + title + '\n\n';
    }

    var subtitle = $('#study-subtitle').val();
    if (subtitle.length > 0) {
      text += '## ' + subtitle + '\n\n';
    }

    var scripture_verse = $('#scripture-verse').val();
    if (scripture_verse.length > 0) {
      text += '### SCRIPTURE\n\n';
      text += scripture_verse + '\n\n';
    }

    var scripture_body = $('#scripture-body').val();
    if (scripture_body.length > 0) {
      text += scripture_body + '\n\n';
    }

    // Get the additional sections
    if (numAddlSections > 0) {
      for (var i = 0; i < numAddlSections; i++) {
        var section_title = $('#addl-section-header-' + i).val();
        if (section_title.length > 0) {
          text += '### ' + section_title + '\n\n';
        }

        var section_body = $('#addl-section-body-' + i).val();
        if (section_body.length > 0) {
          text += section_body + '\n\n';
        }
      }
    }

    // Get the worship sections
    if (numWorshipSections > 0) {
      text += "---\n\n## Worship\n\n";

      for (var i = 0; i < numWorshipSections; i++) {
        var section_title = $('#worship-section-header-' + i).val();
        if (section_title.length > 0) {
          text += '### ' + section_title + '\n\n';
        }

        var section_body = $('#worship-section-body-' + i).val();
        if (section_body.length > 0) {
          text += section_body + '\n\n';
        }
      }
    }

    return text;
  };


  // Add header/body section
  $('#add-section').click(function() {
    var sectionTemplate = $('#section-template').html(); 
    var section = $(sectionTemplate);

    var header = section.find('.section-header');
    header.attr('id', 'addl-section-header-' + numAddlSections);
    header.bind('keyup paste cut mouseup', parseAndRender);
    var body = section.find('.section-body');
    body.attr('id', 'addl-section-body-' + numAddlSections);
    body.bind('keyup paste cut mouseup', parseAndRender);

    numAddlSections++;

    $('#section-container').append(section);
  });

  // Add header/body worship section
  $('#add-worship-section').click(function() {
    var sectionTemplate = $('#section-template').html();
    var section = $(sectionTemplate);

    var header = section.find('.section-header');
    header.attr('id', 'worship-section-header-' + numWorshipSections);
    header.bind('keyup paste cut mouseup', parseAndRender);
    var body = section.find('.section-body');
    body.attr('id', 'worship-section-body-' + numWorshipSections);
    body.bind('keyup paste cut mouseup', parseAndRender);

    numWorshipSections++;

    $('#worship-section-container').append(section);
  });

  // Save to the database
  $('#save').click(function() {
    var data = {};

    // Get the required fields
    data.name = $('#study-name').val();
    data.title = $('#study-title').val();
    data.subtitle = $('#study-subtitle').val();
    data.scripture_verse = $('#scripture-verse').val();

    var scripture_body = $('#scripture-body').val();
    data.scripture_body = writer.renderBlock(reader.parse(scripture_body));

    // Get the additional sections
    if (numAddlSections > 0) {
      data.sections = [];

      for (var i = 0; i < numAddlSections; i++) {
        data.sections[i] = {};
        data.sections[i].section_title = $('#addl-section-header-' + i).val();
        var body = $('#addl-section-body-' + i).val();
        data.sections[i].section_body = writer.renderBlock(reader.parse(body));
      }
    }

    // Get the worship sections
    if (numWorshipSections > 0) {
      data.worship = [];

      for (var i = 0; i < numWorshipSections; i++) {
        data.worship[i] = {};
        data.worship[i].worship_title = $('#worship-section-header-' + i).val();
        var body = $('#worship-section-body-' + i).val();
        data.worship[i].worship_body = writer.renderBlock(reader.parse(body));
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

});