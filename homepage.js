
//loading the movies

let movies = [];

  if (localStorage.getItem("movies") !== null) {
    let alldata= JSON.parse(localStorage.getItem("movies"));
    movies= alldata.filter((movie,index)=>{
      return movie.blocked===false;
    })
  } else {
    localStorage.setItem("movies", JSON.stringify(movies)); // when we first reload the site the blank local storage created for adding new movie
  }


  // movies cards generation function 

  function displayMovies(arr){
  document.getElementById('all_movies').innerHTML="";
 
  arr.forEach((movie,index) => {


    let card=document.createElement('div');
    card.classList.add('card');


       let imgContainer=document.createElement('div');
       imgContainer.classList.add('img_container');
       let img=document.createElement('img');
       img.setAttribute('src',movie.posterurl);
       imgContainer.appendChild(img);

       let content=document.createElement('div');
       content.classList.add('content');
         let title=document.createElement('h2');
         title.append(movie.title);
         let infoContainer=document.createElement('div');
         infoContainer.classList.add('info_container');

         let rating =document.createElement('div');
         rating.classList.add('rating');

          let ratingStar=document.createElement("div");
          ratingStar.classList.add("rating_star");


          //to generate the white stars
          let whitestars=document.createElement('span');
              whitestars.classList.add('whitestars');

                  for(let i=0; i<5;i++){
                    let icon=document.createElement('i');
                    icon.classList.add('fa-solid');
                    icon.classList.add('fa-star');
                    whitestars.appendChild(icon);
                  }   
              
                ratingStar.appendChild(whitestars);   

                   

            // to generate the yellow stars
              let yellowstars=document.createElement('span');
              yellowstars.classList.add('yellowstars');

                  for(let i=0; i<5;i++){
                    let icon=document.createElement('i');
                    icon.classList.add('fa-solid');
                    icon.classList.add('fa-star');
                    yellowstars.appendChild(icon);
                  }   
                  ratingStar.appendChild(yellowstars);  

                  let h3=document.createElement('h3');

                  if(movie.rating.length===0){
                        h3.append('( 0 )');
                        yellowstars.style.width="0px";
                  }
                  else{
                    let averating=aveRating(movie.rating);
                    h3.append(`( ${averating} )`);
                    yellowstars.style.width=averating*20+"%";
                  }
                


          rating.append(ratingStar,h3);
          
          let rateLink=document.createElement("p");
          rateLink.append("Rate Now");
          rateLink.onclick=function(){
            openModal()
            movieToRate=movie;
          }
          
          let btn=document.createElement('button');
          btn.classList.add('btn');
          btn.append('Details');


       infoContainer.append(rating,rateLink,btn);
       
       
    content.append(title,infoContainer);
    
    card.append(imgContainer,content);

    document.getElementById('all_movies').appendChild(card);

  });

  }

 displayMovies(movies);


//  funtion for average rating 

function aveRating(arr){

  let sum=0;
  arr.forEach((num,index)=>{
    sum+=num;
  })

  return sum/arr.length;
}


//  function to select rate 

let isSubmitting=false;

let movieToRate=null;

let ratingMyMovie=null;

function selectRate(event){
  let selectedRating=event.target.getAttribute("data-num");

  let stars=document.getElementsByClassName("rate_star");

  for(let i=0;i<selectedRating;i++){
    stars[i].style.color="gold";
  }


}

function confirmRating(event){

  if(isSubmitting===true){
    isSubmitting=false;
    clearUp();
  }

  isSubmitting=true;

 ratingMyMovie=event.target.getAttribute("data-num");


  let stars=document.getElementsByClassName("rate_star");

  for(let i=0;i<ratingMyMovie;i++){
    stars[i].style.color="gold";
  }

}

function clearUp(){

  if(isSubmitting===false){

    let stars=document.getElementsByClassName("rate_star");

  for(let i=0;i<5;i++){
    stars[i].style.color="#c3c3c3";
  }
  }
  

}




//function to submit rating 

function submitRating(){
// let rating=null;
movieToRate.rating.push(Number(ratingMyMovie));
localStorage.setItem("movies", JSON.stringify(movies)); 
console.log(movieToRate);
displayMovies(movies);
isSubmitting=false;
clearUp();
closeModal();


}


function openModal(){

  document.getElementById("modal").style.display="flex";
}

function closeModal(){

  document.getElementById("modal").style.display="none";
}