document.addEventListener('DOMContentLoaded', function () {
    const card1 = document.querySelector('.pricing-card1');
    const card2 = document.querySelector('.pricing-card2');
    const card3 = document.querySelector('.pricing-card3');
  
    
    setTimeout(() => {
        card1.classList.add('animate-left');
    }, 100); 
  
    
    setTimeout(() => {
        card2.classList.add('animate-up');
    }, 100); 
  
  
    setTimeout(() => {
        card3.classList.add('animate-right');
    }, 100); 
  });
  