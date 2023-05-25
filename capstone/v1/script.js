(function() {
    const buttonGallery = document.getElementById('buttonGallery');
    const buttonInstructions = document.getElementById('buttonInstructions');
    const gallery = document.querySelector('#gallery');
    const instructions = document.querySelector('#instructions');
    const close = document.querySelector('#buttonClose');

    buttonGallery.addEventListener('click', function() {
        gallery.className = 'showing';
    })

    close.addEventListener('click', function() {
        gallery.className = 'hidden';
    })


})();