document.addEventListener('DOMContentLoaded', function() {
    const exampleButton = document.getElementById('example-button');
    const secondaryButton = document.querySelector('.secondary-button');
    const imageButton = document.querySelector('.image-button');
    
    exampleButton.addEventListener('click', function() {
        alert('Example button clicked!');
    });

    secondaryButton.addEventListener('click', function() {
        alert('Secondary button clicked!');
    });

    imageButton.addEventListener('click', function() {
        alert('Image button clicked!');
    });
});