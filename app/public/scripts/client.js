window.mySwipe = new Swipe(document.getElementById('slider'), {startSlide: 1});

$('#goWorship').click(function() {
  window.mySwipe.prev();
});

$('#goStudy').click(function() {
  window.mySwipe.next();
  $('html, body').animate({scrollTop: 0}, 'slow');
});