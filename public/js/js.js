$(document).ready(function(){
   
    $('.back-to-top').click(function (){
       $('body, html').animate({
          scrollTop: '0px' 
       }, 0); 
    });
    
    $(window).scroll(function (){
       if( $(this).scrollTop()>0){
           $('.back-to-top').slideDown(300);
       } else {
           $('.back-to-top').slideUp(300);
       }
    });
    
 });