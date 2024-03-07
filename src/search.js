const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2Q1OTY5ZmZmMDY2NTljMDYxZWEzMDAyMzJhMmFmNyIsInN1YiI6IjY0YTU0ZmQxYTBiZTI4MDEwZGYyMzVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eqYoXN4u_CNpqiYUZU1o9TUR1JPPnYZJsug4XXI04W0",
    },
  };
  var t = []
  var first=""
  
  getapi()
  
  async function getapi(){
    await getMaindata()
      await test(first)
      mainsliders(t[0])
      var i = 0
      setInterval(() => {
        setTimeout(() =>{
          if (i < t.length) {
            mainsliders(t[i])
            i++
          } else {
            i = 0;
          }
        }, 100);
      }, 3000);
  }
  
  async function test(i){
    for (let index = 0; index < Object.keys(i).length ;index++) {
      await fetch(
        `https://api.themoviedb.org/3/movie/${i[index]["id"]}}?language=en-US`, options
      )
        .then((response) => response.json())
        .then((data) => {
          t.push(data)
        });
    }
  }
  
  async function getMaindata(){
    await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        first = data["results"]
      })
  }
  
  
  async function search() {
    var movname = document.getElementById("moviename").value;
    var temp = [];
    var anothertemp = []
    console.log(movname);
    var sresults = document.createElement("h1")
    sresults.id = "status"
    sresults.innerHTML = "Loading..."
    document.getElementById("search-results").innerHTML = "";
    
    var newRecommend =document.createElement("div");
    var recommendStats = document.createElement("h1")
    recommendStats.innerHTML = "Top Recommendations...";
    recommendStats.id = "rstats"
    newRecommend.id  = "recommend"
    newRecommend.appendChild(recommendStats)
    document.getElementById("search-results").appendChild(sresults)
    document.getElementById("search-results").insertBefore(newRecommend, document.getElementById("status"))
    window.location = "index.html#status";
    await preparesort(movname, temp)
    document.getElementById("status").innerHTML = "Search Results"
    await ratings(temp, anothertemp);
    anothertemp.sort( (p1, p2) => {
      console.log(parseInt(p1.imdbRating))
      if (parseFloat(p1.imdbRating) > parseFloat(p2.imdbRating)) return -1;
      if (parseFloat(p1.imdbRating) < parseFloat(p2.imdbRating)) return 1;
      return 0;
    })
    var stats = document.getElementById("rstats")
    stats.innerHTML = "Recommendations by Rating"
    recommendposter(anothertemp)
    console.log(anothertemp)
  }
  
  function recommendposter(array){
    var recommenddiv = document.createElement("div")
    recommenddiv.id = "recommendouter"
    for(var i=0; i<3; i++){
      var newContainer = document.createElement("div");
      newContainer.id = "newtextarea";
      var newPoster = document.createElement("img");
      var Title = document.createElement("h3");
      var Date = document.createElement("h2");
      var aidi = document.createElement("h2");
      var moviedetails = document.createElement("div");
      var link = document.createElement("a");
      var newTextArea = document.createElement("div");
      var Rates = document.createElement("h1");
      Rates.id = "rrate"
      Rates.innerHTML = array[i].imdbRating
      link.href = "details.html?i=" + array[i].imdbID;
      Title.innerHTML = array[i].Title;
      newTextArea.className = "newtitle"
      aidi.innerHTML = "IMDB ID"+"<br>"+array[i].imdbID
      Date.innerHTML = array[i].Year;
      moviedetails.className = "moviedateid"
      moviedetails.appendChild(aidi)
      moviedetails.appendChild(Date)
      newTextArea.appendChild(Title);
      link.appendChild(moviedetails);
      link.appendChild(Rates);
      var pos = array[i].Poster;
      if (pos == "N/A") {
        pos = "img/no-poster.png";
      }
      newPoster.src = pos;
      link.appendChild(newPoster);
      newContainer.appendChild(link);
      newContainer.appendChild(newTextArea);
      recommenddiv.appendChild(newContainer);
    }
    var next = document.getElementById("search-results").getElementsByTagName("h1")
    console.log(next[1])
    document.getElementById("search-results").insertBefore(recommenddiv,next[1] );
  }
  
  async function preparesort(m,t){
    var cont = "true"
    for (let index = 1; index < 5; index++) {
      if(cont==="false"){
        break
      }
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=30bc27f1&s=*${m}*&type=movie&page=${index}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(index, "loaded");
          cont = (data["Response"]).toLowerCase();
          console.log(cont)
          for (const key in data["Search"]) {
            poster(data["Search"][key]);
            t.push(data["Search"][key]);
          }
        })
    }
    console.log(5)
  }
  
  function poster(d) {
    var newContainer = document.createElement("div");
    newContainer.id = "newtextarea";
    var newPoster = document.createElement("img");
    var Title = document.createElement("h3");
    var Date = document.createElement("h2");
    var aidi = document.createElement("h2");
    var Awards = document.createElement("h4"); // Create element for displaying awards
    var moviedetails = document.createElement("div");
    var link = document.createElement("a");
    var newTextArea = document.createElement("div");
    link.href = "details.html?i=" + d.imdbID;
    Title.innerHTML = d.Title;
    newTextArea.className = "newtitle"
    aidi.innerHTML = "IMDB ID"+"<br>"+d.imdbID
    Date.innerHTML = d.Year;
    moviedetails.className = "moviedateid"
    moviedetails.appendChild(aidi)
    moviedetails.appendChild(Date)
  
    // Check if awards are available and display them
    if (d.Awards) {
      Awards.innerHTML = "Awards: " + d.Awards;
      moviedetails.appendChild(Awards);
    }
  
    newTextArea.appendChild(Title);
    link.appendChild(moviedetails);
    var pos = d.Poster;
    if (pos == "N/A") {
      pos = "img/no-poster.png";
    }
    newPoster.src = pos;
    link.appendChild(newPoster);
    newContainer.appendChild(link);
    newContainer.appendChild(newTextArea);
    document
      .getElementById("search-results")
      .appendChild(newContainer);
  }
  
  
  async function ratings(d,te) {
    temp = []
    for (let index = 0; index < d.length; index++) {
      current = d[index]["imdbID"];
      await fetch(
        `https://www.omdbapi.com/?apikey=30bc27f1&i=${current}`
      )
        .then((response) => response.json())
        .then((data) => {
          te.push(data);
        });
    }
  }