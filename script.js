function myF() {
    document.getElementById("nav-links").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.click')) {
      var dropdowns = document.getElementsByClassName("nav-links");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
//**** AJAX 
 function DisplayMatche() {
    var xhttp = new XMLHttpRequest(); //Créer un objet XMLHttpRequest
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { 
             // appeler les deux fonction pour afficher les resultat des matches
             displayMainMatche(this);
             displayMatche(this);
      }
    };
    xhttp.open("GET", "matches.xml", true);
    xhttp.send();
  }
  function displayMainMatche(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var main = "<div class='main-contant'> <ul><li>";
    var result = xmlDoc.getElementsByTagName("mainMatche");
    //afficher logo du chaque club (qui dans tag <imgClub> dans le ficher xml) et les résultat du matche
    for(i=0;i<result.length;i++){
    
      main+="<figure><img src='img/" +
      result[i].getElementsByTagName("imgClub1")[0].childNodes[0].nodeValue+"'> </figure></li><li><section class='rst'><span>"+
      result[i].getElementsByTagName("scoreClub1")[0].childNodes[0].nodeValue+"</span><figure><img src='img/vs.png'></figure><span>"+
      result[i].getElementsByTagName("scoreClub2")[0].childNodes[0].nodeValue+"</span></section></li><li><figure><img src='img/"+
      result[i].getElementsByTagName("imgClub2")[0].childNodes[0].nodeValue+"'> </figure></li></ul></div>"
  }
   document.getElementById("score").innerHTML = main; // afficher contun de main dans tag <div id="score">
  }
  DisplayMatche();


  function displayMatche(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var charg = "";
    var r = xmlDoc.getElementsByTagName("matche");
    //  afficher la liste des matcher avec les resulta
    for(i=0;i<r.length;i++){
      charg+="<li><div><figure><img src='img/"+
      r[i].getElementsByTagName("imgClub1")[0].childNodes[0].nodeValue+"'></figure><span>"+
      r[i].getElementsByTagName("scoreClub1")[0].childNodes[0].nodeValue+"</span><span>-</span><span>"+
      r[i].getElementsByTagName("scoreClub2")[0].childNodes[0].nodeValue+"</span><figure><img src='img/"+
      r[i].getElementsByTagName("imgClub2")[0].childNodes[0].nodeValue+"'></figure></div><p><i class='fa-solid fa-location-dot'></i> "+
      r[i].getElementsByTagName("date")[0].childNodes[0].nodeValue+"</p></li>"
  }
   document.getElementById("list-matches").innerHTML = charg; // afficher contun de charg dans tag <ul id="list-matches">

  }

DisplayMatche();
//*** Création de quiz       
//Références
var quizContainer = document.getElementById("container");
var suivBtn = document.getElementById("suiv-button");
var countOfQuestion = document.querySelector(".nbr-question");
var displayContainer = document.getElementById("display-container");
var scoreContainer = document.querySelector(".score-container");
var restart = document.getElementById("restart");
var userScore = document.getElementById("user-score");
var startScreen = document.querySelector(".start-screen");
var questionCount;
var scoreCount = 0;
var count = 11;
var countdown;

// Tableau de questions et d'options
const quizArray = [
    {
        id : "0",
        question : "Un essai est marqué lorsque le ballon est à terre au-delà de la ligne de but adverse dans :",
        options : ["Ligne de touche", "Zone des 22 mètres", "Zone de touche de but", "Zone d'en-but"],
        correct : "Zone d'en-but",
    },
    {
        id : "1",
        question : "Dans Fifteens Rugby, le maillot numéro 15 est porté par :",
        options : ["Hooker", "Ailier gauche", "Arrière arrière", "Demi-volant"],
        correct : "Arrière arrière",
    },
    {
        id: "2",
        question : "Lorsque le ballon a été botté en touche depuis le jeu libre, l'arbitre recommence le jeu avec un :",
        options : ["Mêlée", "Pénalité", "Alignement", "Free kick"],
        correct : "Free kick",
    },
    {
        id: "3",
        question : "Lequel des éléments suivants constitue un jeu déloyal au rugby : ",
        options : ["Jeu déloyal", "Gêne ", "Jeu dangereux", "Tout ce qu'un joueur fait qui est contraire à la lettre et à l'esprit des Lois du Jeu "],
        correct : "Jeu dangereux",
    },
    {
        id : "4",
        question : "Il est recommandé aux joueurs de porter un protège-dents pour protéger les dents et la mâchoire. Est-ce vrai ou faux ?",
        options : ["Vrai", "Faux", "La réponse est A", "aucune"],
        correct : "Vrai",
    },
    {
        id: "5",
        question : "Organisé par l'arbitre, le tirage au sort avec les capitaines avant un match décide quelle équipe :",
        options : ["Sous la barre transversale et entre les poteaux", "En touche", "Au-dessus de la barre transversale et entre les poteaux", "De la ligne médiane à au moins la ligne des 10 mètres"],
        correct : "En touche",
    },
];
  
// Bouton Suivant
suivBtn.addEventListener(
    "click",
    (displaySuiv = () => {
       //incrémenter le nombre de questions
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) { // si on est dans dernière question
           //masquer le conteneur de questions et afficher le score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
           //Afficher un emoji en fonction des résultats obtenus par user
            var nbrq=quizArray.length;
            var emoji='';
             if(scoreCount==0){
                emoji="😬";
             }else{
              if(scoreCount/nbrq < 0.5){
                emoji="🙂";
              }else{
                 if(scoreCount/nbrq > 0.5 && scoreCount/nbrq< 1){
                    emoji= "😃";
                 }else{
                    emoji="🥳";
                 }
              }
             }
             //afficher  score de l'utilisateur dans la balise <h4> 
            userScore.innerHTML =
                "Votre score est de " + scoreCount + " sur " + questionCount + " "+emoji;
                
        } else {
            // affiche le nombre de questions dans <span class="nbr-question"> qui dans section quiz
            countOfQuestion.innerHTML =
                questionCount + 1 + " sur " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
    
);
//recommencer le quiz de l'debut si user clicker sur button recommencer 
restart.addEventListener("click", () => {
    window.location.href=window.location.href;
  
  });
 
//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
   //Masquer les autres cartes de quiz qui contient les question et options
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    // affiche la carte de question actuelle
    quizCards[questionCount].classList.remove("hide");
};

//Création de quiz
function quizCreator() {
     // trier les questions au hasard
    quizArray.sort(() => Math.random() - 0.5);
    // générer un quiz
    for (let i of quizArray) {
        //options de tri aléatoire
        i.options.sort(() => Math.random() - 0.5);
        //création de cartes de quiz
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //numéro de la question
        countOfQuestion.innerHTML = 1 + " sur " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
     <button class="option-div" onclick="verifier(this)">${i.options[0]}</button>
     <button class="option-div" onclick="verifier(this)">${i.options[1]}</button>
     <button class="option-div" onclick="verifier(this)">${i.options[2]}</button>
     <button class="option-div" onclick="verifier(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Fonction verifier pour vérifier si l'option est correcte ou non
function verifier(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

   //si l'utilisateur a cliqué sur la réponse == option correcte stockée dans l'objet
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
       //Pour ajouter class correct au la bonne option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }
    // désactiver toutes les options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//la configuration initiale
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    quizCreator();
    quizDisplay(questionCount);
