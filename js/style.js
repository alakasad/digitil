var bwLink = document.querySelector('.bwLink');

bwLink.addEventListener('click', function(event) {
    
    event.preventDefault();
    
    if(bwLink.classList.contains('initial-style')){
        bwLink.classList.remove('initial-style');
        bwLink.classList.add('clicked-style');
    }else{
        bwLink.classList.remove('clicked-style');
        bwLink.classList.add('initial-style');
    }   
});

