$(document).ready(function() {

  // Show/hide row buttons
  var toggleControls = function() {
    if (this.controls.hasClass('hidden')) {
      this.controls.removeClass('hidden');
    }
    else {
      this.controls.addClass('hidden');
    }
  };

  // Make study live
  var onClickMakeLive = function() {
    $.ajax({
      type: 'POST',
      url: window.location.origin + '/study/' + this.id + '/make_live',
      success: function(data, textStatus, jqXHR) {
        window.location.href = window.location.origin + '/admin';
      }
    });
  };

  // Edit study
  var onClickEdit = function() {

  };

  // Delete study
  var onClickDelete = function() {
    $.ajax({
      type: 'DELETE',
      url: window.location.origin + '/study/' + this.id,
      success: function(data, textStatus, jqXHR) {
        window.location.href = window.location.origin + '/admin';
      }
    });
  };

  var numStudyRows = -1;
  do {
    numStudyRows++;
    var studyRowName = '.study-row-' + numStudyRows;
    var studyRow = $(studyRowName);
    if (studyRow.length > 0) {
      var ctrlName = studyRowName + ' .study-row-controls';
      var ctrl = $(ctrlName);

      // Click listener to show/hide controls
      studyRow.click(toggleControls.bind({controls: ctrl}));

      // Click listener to make this study the current one
      var btnMakeLive = $('#btn-make-live-' + numStudyRows);
      btnMakeLive.click(onClickMakeLive.bind({id: btnMakeLive.attr('val')}));

      // Click listener to edit this study
      var btnEdit = $('#btn-edit-' + numStudyRows);
      btnEdit.click(onClickEdit.bind({id: btnEdit.attr('val')}));

      // Click listener to delete this study
      var btnDelete = $('#btn-delete-' + numStudyRows);
      btnDelete.click(onClickDelete.bind({id: btnDelete.attr('val')}));
    }
  }
  while (studyRow.length > 0);

  $('#create-new').click(function() {
    document.location.href = window.location.origin + '/admin/create';
  });

});