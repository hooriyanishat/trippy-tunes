 /* About js */
 const main = document.getElementById("main");
 const scrollThreshold = 20;

 window.addEventListener('scroll', function(){
   const scrollY = window.scrollY || window.pageYOffset;

   if(scrollY > scrollThreshold){
     main.classList.add('scrolled');
   }else{
     main.classList.remove('scrolled');
   }
 })