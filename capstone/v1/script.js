(function() {
    const buttonGallery = document.getElementById('buttonGallery');
    const buttonInstructions = document.getElementById('buttonInstructions');
    const gallery = document.querySelector('#gallery')
    const instructions = document.querySelector('#instructions')


    buttonGallery.addEventListener('click', function() {
        gallery.className = 'showing';
    })

})();