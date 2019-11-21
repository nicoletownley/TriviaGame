$(document).ready(function () {
    var facts = [
        {
            question: "What is the Minnesota state fruit?",
            choice: ["Honey Crisp Apple", "Blueberries", "Red Mulberry", "Elderberry"],
            answer: 0,
            photo: "assets/images/fruit.jpg"
        },
        {
            question: "What is Minnesota state gemstone?",
            choice: ["Silkstone", "Thomsonite", "Agate", "Mary Ellen Jasper"],
            answer: 2,
            photo: "assets/images/gemstone.jpg"
        },
        {
            question: 'In Minnesota, you can find some of the oldest "what" found on earth?',
            choice: ["Lakes", "Rocks", "Trees", "Caves"],
            answer: 1,
            photo: "assets/images/old.jpg"
        },
        {
            question: "What is the Minnesota state fish?",
            choice: ["Carp", "Trout", "Walleye", "Smelt"],
            answer: 2,
            photo: "assets/images/fish.jpg"
        },
        {
            question: "What is the Minnesota state tree",
            choice: ["Pine", "Maple", "Oak", "Birch"],
            answer: 0,
            photo: "assets/images/tree.jpg"
        },
        {
            question: "Where does the population of Minnestoa rank in the percentage of people engaging in regular exercise?",
            choice: ["first", "thirty-eighth", "fifteenth", "twenty-second"],
            answer: 0,
            photo: "assets/images/exercise.jpg"
        },
        {
            question: "What is the Minnesota state mushroom?",
            choice: ["Crimini", "Enoki", "Oyster", "Morel"],
            answer: 3,
            photo: "assets/images/mushrooms.jpg"
        },

        {
            question: "In the US, Minnesota has the 2nd largest of what?",
            choice: ["Lakes", "Timberwolves", "Red Mulberry", "Elderberry"],
            answer: 1,
            photo: "assets/images/Timberwolves.webp"
        },  

        {
            question: "The highest point in Minnesota is what?",
            choice: ["Carlton Peak", "Mount Josephine", "Disapointment Mountain", "Eagle Mountain"],
            answer: 3,
            photo: "assets/images/mountain.jpg"

        },
        {
            question: "Minnesota was admitted into the union in what year?",
            choice: ["1914", "1858", "1788", "1890"],
            answer: 1,
            photo: "assets/images/statesmn.jpg"

        }];
    //make variables for what I think will be needed for the game
    var rightCount = 0;
    var wrongCount = 0;
    var unanswered = 0;
    var timer = 15;
    
    //something to use in code to start and stop the timer
    var validate;
    var guessOPt = "";
    var redRun = false;
    var contents = facts.length;
    var choicy;
    var tablet;
    var nArray = [];
    //will be used to produces questions if questions have not all be anwered
    var nContainer = [];
     
    $("#reset").hide();
    // game start
    $("#start").on("click", function () {
        $("#start").hide();
        timerRun();
        showQuestion();
        for (var i = 0; i < facts.length; i++) {
            nContainer.push(facts[i]);
        }
    })
    //timer function
    function timerRun() {
        if (!redRun) {
            validate = setInterval(decrement, 1000);
            redRun = true;
        }
    }

    //countdown 
    function decrement() {
        $("#timeremaining").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;
        // if timer reaches 0:
        if (timer === 0) {
            unanswered++;
            stop();
            $("#answerarea").html("<p> Your time has expired. The correct answer is: " + choicy.answer + "</p>");
            hidepicture();
        }
    }
    //if there is no time left
    function stop() {
        redRun = false;
        clearInterval(validate);
    }
    //random question with possible answer array:
    function showQuestion() {
        tablet = Math.floor(Math.random() * facts.length);
        choicy = facts[tablet];
        $("#questionarea").html("<h2>" + choicy.question + "</h2>");
        for (var i = 0; i < choicy.choice.length; i++) {
            var userPick = $("<div>");
            userPick.addClass("answerchoice");
            userPick.html(choicy.choice[i]);
            userPick.attr("data-value", i);
            $("#answerarea").append(userPick);
        }
        //select answers
        $(".answerchoice").on("click", function () {
            guessOPt = parseInt($(this).attr("data-value"));
            if (guessOPt === choicy.answer) {
                stop();
                rightCount++;
                guessOPt = "";
                $("#answerarea").html('<p>Yay! Ja!</p>');
                hidepicture();
                  
            }
            else {
                stop();
                wrongCount++;
                guessOPt = "";
                $("#answerarea").html("<p>Uff-da! No. The correct answer: " + choicy.choice[choicy.answer] + "</p>");
                hidepicture();
            }
        })  
    }
        function hidepicture() {
        $("#answerarea").append("<img src=" + choicy.photo + ">");
            nArray.push(choicy);
            facts.splice(tablet, 1);

            var hpic = setTimeout(function () {
                $("#answerarea").empty();
                timer = 15;
                // score screen when all questions are answered   
                if ((wrongCount + rightCount + unanswered) === contents) {
                    $("#questionarea").empty();
                    $("#questionarea").html("<h3> Game Over! Here are your results: </h3>");
                    $("#answerarea").append("<h4> Correct: " + rightCount + "</h4>");
                    $("#answerarea").append("<h4> Incorrect: " + wrongCount + "</h4>");
                    $("#answerarea").append("<h4> Unanswered: " + unanswered + "</h4>");
                    $("#reset").show();
                    rightCount = 0;
                    wrongCount = 0;
                    unanswered = 0;
                }
                else {
                    timerRun();
                    showQuestion();
                }
            },
                3000);

        }
        $("#reset").on("click", function () {
            $("#reset").hide();
            $("#answerarea").empty();
            $("#questionarea").empty();
            for (var i=0; i<nContainer.length;i++){
                facts.push(nContainer[i]);
            }

            timerRun();
            showQuestion();

        })}

    )



