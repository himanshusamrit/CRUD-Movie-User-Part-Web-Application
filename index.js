2
  let movies = [];

  if (localStorage.getItem("movies") !== null) {
    movies = JSON.parse(localStorage.getItem("movies"));
  } else {
    localStorage.setItem("movies", JSON.stringify(movies)); // when we first reload the site the blank local storage created for adding new movie
  }


let totalPages=null;

let start=null;
let end=null;
let paginate=[];


  //current page number
 let currentPage=1; 
  document.getElementById("current_page").innerText=currentPage;

setUpPagination();

  function setUpPagination(){

    document.getElementById("movies").innerHTML = "";

  //getting the number of pages
   totalPages = Math.ceil(movies.length / 10);


  start=(currentPage-1)*10;
  end=currentPage*10;

  generatePageLinks();

    ///gives the only 10 size array at a time
   paginate = movies.slice(start, end);
  document.getElementById("totalPages").innerHTML = totalPages;



  }





  function generatePageLinks(){

    document.getElementById("pages").innerHTML="";
    for(let i=1;i<=totalPages;i++){

      let link=document.createElement("a");
      link.append(i);
      link.onclick=openPage.bind(this,i);
      document.getElementById("pages").appendChild(link);

    }
  }


  //------------------- function to display toast message -----------------------

  //for add movie

        let isItemAdd=false;
        function toastMessageForMovieAdd(arr){
          document.getElementById("title").innerText="";
          arr.forEach((movie,index)=>{
            if(isItemAdd===true){
              let msg=document.getElementById("title").innerText = movie.title;
              document.getElementById("message").innerText=msg+ " is added successfully";
              document.getElementById("message").style.right="0%";
            }
            
            setTimeout(function(){
                document.getElementById("message").style.right="-20%";
            },2000)
          })
          

        }


   //for delete message

        function toastMessageForDeleteMovie(arr){
          // document.getElementById("title").innerText="";
         
              arr.forEach((movie,index)=>{
              
                if(isItemAdd===true){
                  let msg2=document.getElementById("title").innerText = movie.title;
                  document.getElementById("message").innerText=msg2+ " is deleted successfully";
                  document.getElementById("message").style.right="0%";
                }
                
                setTimeout(function(){
                    document.getElementById("message").style.right="-20%";
                },2000)
              })

        }

   // for movie edited

          function toastMessageForEditMovie(){

            if(isItemAdd===true){
              document.getElementById("message").innerText=" Movie Updated Successfully";
              document.getElementById("message").style.right="0%";
            }
            
            setTimeout(function(){
                document.getElementById("message").style.right="-20%";
            },2000)

          }




  //  --------------- function for displaymovies of  given  array ------------------------------

  function displayMoviesTable(moviesArr) {
    document.getElementById("movies").innerHTML = ""; //clear the old movies data

       //serial number 
       let serial=start+1;

    moviesArr.forEach((movie, index) => {
      let row = document.createElement("tr");

      let numbering = document.createElement("td");
      numbering.append(serial);
      row.appendChild(numbering);
      serial++;   

      let title = document.createElement("td");
      title.append(movie.title);
      row.appendChild(title);

      let releaseDate = document.createElement("td");
      releaseDate.append(movie.releaseDate);
      row.appendChild(releaseDate);

      let genres = document.createElement("td");
      movie.genres.forEach((genre, index) => {
        genres.append(genre + ". ");
      });
      row.appendChild(genres);

      let duration = document.createElement("td");
      duration.append(movie.duration);
      row.appendChild(duration);

      let imdbRating = document.createElement("td");
      imdbRating.append(movie.imdbRating);
      row.appendChild(imdbRating);

      let actions = document.createElement("td");

      actions.classList.add("actions"); //adding class like    <td class="actions">    </td>...

      // <i class="fa-solid fa-eye"></i>
      let view = document.createElement("i");
      view.classList.add("fa-solid");
      view.classList.add("fa-eye");
      view.onclick = openViewModal.bind(this, movie.id);

      // <i class="fa-solid fa-pen-to-square"></i>
      let edit = document.createElement("i");
      edit.classList.add("fa-solid");
      edit.classList.add("fa-pen-to-square");
      edit.onclick = setUpdate.bind(this, movie.id);

      // <i class="fa-solid fa-trash"></i>
      let trash = document.createElement("i");
      trash.classList.add("fa-solid");
      trash.classList.add("fa-trash");
      trash.onclick = deleteMovie.bind(this, movie.id);

      actions.appendChild(view);
      actions.appendChild(edit);
      actions.appendChild(trash);
 
      if(movie.blocked===true){

        let circle=document.createElement("p");
        circle.classList.add("blocked");
        actions.appendChild(circle);
      }
    

      row.appendChild(actions);

      document.getElementById("movies").appendChild(row);
    });
  }

  // first time call the function

  displayMoviesTable(paginate);

  //function to load next page
  function nextPage(){
   if(currentPage<totalPages){

    currentPage++;
   openPage(currentPage);
   }
   
  }

  //function to load previous page 
  function prevPage(){

    if(currentPage>1){
      currentPage--;
    openPage(currentPage);

    }
  }


  // function to open page 

  function openPage(pageNumber){

    if(pageNumber!==" " && pageNumber>=1 && pageNumber<=totalPages){

    currentPage=pageNumber;
    start=(currentPage-1)*10;
    end=(currentPage)*10;
     serial=start+1;

    paginate=movies.slice(start,end);

    displayMoviesTable(paginate);
    document.getElementById("current_page").innerText=currentPage;


    }
    
  }

  

  // --------------------- function to display a single movie info -------------------------

  // for open modal--------------

  function openViewModal(movieID) {
    let movie = movies.find((movie, index) => {
      return movie.id === movieID;
    });

    document.getElementById("title").innerText = movie.title;
    document.getElementById("poster").src = movie.posterurl;
    document.getElementById("genre").innerText = movie.genres;
    document.getElementById("storyline").innerText = movie.storyline;
    document.getElementById("actors").innerText = movie.actors;
    document.getElementById("releasedate").innerText = movie.releaseDate;
    document.getElementById("duration").innerText = movie.duration;
    document.getElementById("imdbrating").innerText = movie.imdbRating;

    document.getElementById("view_modal").style.display = "flex";
  }

  // ------------------- function to open create movie modal ----------------

  function openAddModal() {
    document.getElementById("add_modal").style.display = "flex";
  }

  // function to add movie----------------------

  function createMovie() {
    let lastId;
    if (movies.length !== 0) {
      lastId = movies[movies.length - 1].id; //last id
    } else {
      lastId = 0;
    }

    let movie = {
      rating: [],
      id: lastId + 1, //gives the id for adding array of object uniquely
      blocked: false,
    };

    movie.title = document.getElementById("add_title").value;
    movie.genres = document.getElementById("add_geners").value.split(","); // split convert the string to array form
    movie.duration = document.getElementById("add_duration").value;
    movie.releaseDate = document.getElementById("add_releasedate").value;
    movie.actors = document.getElementById("add_actors").value.split(",");
    movie.imdbRating = document.getElementById("add_imdbrating").value;
    movie.posterurl = document.getElementById("add_url").value;
    movie.storyline = document.getElementById("add_storyline").value;

    movies.push(movie); // it add the array of object to end of the array


    isItemAdd=true;
    if(isItemAdd===true) {
      toastMessageForMovieAdd(movies);
    }



    // alert("Movie added"); 
    localStorage.setItem("movies", JSON.stringify(movies)); // it convert the array of object into strings
    setUpPagination();


    displayMoviesTable(paginate); //display movies not a before wali movie
    closeModal("add_modal",true);

    document.getElementById("add_form").reset(); //problems in reseting the form

    document.getElementById("add_releasedate").type = "text";
  }

  // function to setup the data _---------------------

  let dataToUpdate = null;
  function setUpdate(id) {
    let movie = movies.find((movie, index) => {
      return movie.id === id;
    });

    dataToUpdate = movie;

    document.getElementById("update_title").value = movie.title;

    let genres = "";
    movie.genres.forEach((genre, index) => {
      genres += genre + ",";
    });

    document.getElementById("update_geners").value = genres.substring(
      0,
      genres.length - 1
    );

    document.getElementById("update_duration").value = movie.duration;
    document.getElementById("update_releasedate").value = movie.releaseDate;

    // let actors="";
    // movie.actors.forEach((actor,index)=>{
    //    actors+=actor+" , ";
    // })
    // document.getElementById("update_actors").value=movie.actors.substring(0,actors.length-2);
    document.getElementById("update_actors").value = movie.actors;
    document.getElementById("update_imdbrating").value = movie.imdbRating;
    document.getElementById("update_url").value = movie.posterurl;
    document.getElementById("update_storyline").value = movie.storyline;
    document.getElementById("update_blocked").value = movie.blocked;

    if(dataToUpdate.blocked===true){
      document.getElementById("update_blocked").checked=true;

       }
      else{
      document.getElementById("update_blocked").checked=false;
        }
    
  
    
      


    document.getElementById("update_modal").style.display = "flex";
  }

  function convertToCommaString(data) {
    let stringData = "";
    data.forEach((d, index) => {
      stringData += d + ",";
    });

    return stringData.substring(0, stringData.length - 1);
  }

  // function to update the data

  function updateMovie() {
    dataToUpdate.title = document.getElementById("update_title").value;
    dataToUpdate.genres = document
      .getElementById("update_geners")
      .value.split(","); // split convert the string to array form
    dataToUpdate.duration = document.getElementById("update_duration").value;
    dataToUpdate.releaseDate =
      document.getElementById("update_releasedate").value;
    dataToUpdate.actors = document
      .getElementById("update_actors")
      .value.split(",");
    dataToUpdate.imdbRating =
      document.getElementById("update_imdbrating").value;
    dataToUpdate.posterurl = document.getElementById("update_url").value;
    dataToUpdate.storyline = document.getElementById("update_storyline").value;

     
    if(document.getElementById("update_blocked").checked===true){
      dataToUpdate.blocked = true;
    }

    else{
      dataToUpdate.blocked = false;
    }

    isItemAdd=true;
    if(isItemAdd===true){

      toastMessageForEditMovie();

    } 
    

    localStorage.setItem("movies", JSON.stringify(movies)); // it convert the array of object into strings

   
    closeModal("update_modal",true);
    displayMoviesTable(paginate); //display movies not a before wali movie
  }

  // function to delete movies

  function deleteMovie(id) {
    let confirmation = confirm("Are you sure you want to delete.");
    if (confirmation === true) {
      let index = movies.findIndex((movie, index) => {
        return movie.id === id;
      });

      movies.splice(index, 1); // remove the only one element

      //toast message
      isItemAdd=true;
      if(isItemAdd===true){

        toastMessageForDeleteMovie(movies);

      }
     

      localStorage.setItem("movies", JSON.stringify(movies)); //update the movies array

      setUpPagination();

      displayMoviesTable(paginate); // display movies table
    }
  }

  // ---------------------- function to close any modal -------------------

  // ----------------function to close any modal ------------------------------

function closeModal(modal_id,target_id=false){


  if(target_id===modal_id || target_id===true){
    document.getElementById(modal_id).style.display="none";
  }

}


  function textToDate() {
    document.getElementById("add_releasedate").type = "date";
  }

  



