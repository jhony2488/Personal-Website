var sendForm = document.querySelector('#chatform'),
    textInput = document.querySelector('.chatbox'),
    chatList = document.querySelector('.chatlist'),
    userBubble = document.querySelectorAll('.userInput'),
    botBubble = document.querySelectorAll('.bot__output'),
    animateBotBubble = document.querySelectorAll('.bot__input--animation'),
    overview = document.querySelector('.chatbot__overview'),
    hasCorrectInput,
    imgLoader = false,
    animationCounter = 1,
    animationBubbleDelay = 600,
    input,
    previousInput,
    isReaction = false,
    unkwnCommReaction = "Eu não entendi oque você falou .",
    chatbotButton = document.querySelector(".submit-button")

sendForm.onkeydown = function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();

        //No mix ups with upper and lowercases
        var input = textInput.value.toLowerCase();

        //Empty textarea fix
        if (input.length > 0) {
            createBubble(input)
        }
    }
};

sendForm.addEventListener('submit', function(e) {
        //so form doesnt submit page (no page refresh)
        e.preventDefault();

        //No mix ups with upper and lowercases
        var input = textInput.value.toLowerCase();

        //Empty textarea fix
        if (input.length > 0) {
            createBubble(input)
        }
    }) //end of eventlistener

var createBubble = function(input) {
    //create input bubble
    var chatBubble = document.createElement('li');
    chatBubble.classList.add('userInput');

    //adds input of textarea to chatbubble list item
    chatBubble.innerHTML = input;

    //adds chatBubble to chatlist
    chatList.appendChild(chatBubble)

    checkInput(input);
}

var checkInput = function(input) {
    hasCorrectInput = false;
    isReaction = false;
    //Checks all text values in possibleInput
    for (var textVal in possibleInput) {
        //If user reacts with "yes" and the previous input was in textVal
        if (input == "yes" || input.indexOf("yes") >= 0) {
            if (previousInput == textVal) {
                console.log("sausigheid");

                isReaction = true;
                hasCorrectInput = true;
                botResponse(textVal);
            }
        }
        if (input == "no" && previousInput == textVal) {
            unkwnCommReaction = "Para uma lista de comandos, digite: Comandos";
            unknownCommand("Estou triste por ouvir isto :(")
            unknownCommand(unkwnCommReaction);
            hasCorrectInput = true;
        }
        //Is a word of the input also in possibleInput object?
        if (input == textVal || input.indexOf(textVal) >= 0 && isReaction == false) {
            console.log("succes");
            hasCorrectInput = true;
            botResponse(textVal);
        }
    }
    //When input is not in possibleInput
    if (hasCorrectInput == false) {
        console.log("failed");
        unknownCommand(unkwnCommReaction);
        hasCorrectInput = true;
    }
}

// debugger;

function botResponse(textVal) {
    //sets previous input to that what was called
    // previousInput = input;

    //create response bubble
    var userBubble = document.createElement('li');
    userBubble.classList.add('bot__output');

    if (isReaction == true) {
        if (typeof reactionInput[textVal] === "function") {
            //adds input of textarea to chatbubble list item
            userBubble.innerHTML = reactionInput[textVal]();
        } else {
            userBubble.innerHTML = reactionInput[textVal];
        }
    }

    if (isReaction == false) {
        //Is the command a function?
        if (typeof possibleInput[textVal] === "function") {
            // console.log(possibleInput[textVal] +" is a function");
            //adds input of textarea to chatbubble list item
            userBubble.innerHTML = possibleInput[textVal]();
        } else {
            userBubble.innerHTML = possibleInput[textVal];
        }
    }
    //add list item to chatlist
    chatList.appendChild(userBubble) //adds chatBubble to chatlist

    // reset text area input
    textInput.value = "";
}

function unknownCommand(unkwnCommReaction) {
    // animationCounter = 1;

    //create response bubble
    var failedResponse = document.createElement('li');

    failedResponse.classList.add('bot__output');
    failedResponse.classList.add('bot__output--failed');

    //Add text to failedResponse
    failedResponse.innerHTML = unkwnCommReaction; //adds input of textarea to chatbubble list item

    //add list item to chatlist
    chatList.appendChild(failedResponse) //adds chatBubble to chatlist

    animateBotOutput();

    // reset text area input
    textInput.value = "";

    //Sets chatlist scroll to bottom
    chatList.scrollTop = chatList.scrollHeight;

    animationCounter = 1;
}

function responseText(e) {

    var response = document.createElement('li');

    response.classList.add('bot__output');

    //Adds whatever is given to responseText() to response bubble
    response.innerHTML = e;

    chatList.appendChild(response);

    animateBotOutput();

    console.log(response.clientHeight);

    //Sets chatlist scroll to bottom
    setTimeout(function() {
        chatList.scrollTop = chatList.scrollHeight;
        console.log(response.clientHeight);
    }, 0)
}

function responseImg(e) {
    var image = new Image();

    image.classList.add('bot__output');
    //Custom class for styling
    image.classList.add('bot__outputImage');
    //Gets the image
    image.src = "/images/" + e;
    chatList.appendChild(image);

    animateBotOutput()
    if (image.completed) {
        chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
    } else {
        image.addEventListener('load', function() {
            chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
        })
    }
}

//change to SCSS loop
function animateBotOutput() {
    chatList.lastElementChild.style.animationDelay = (animationCounter * animationBubbleDelay) + "ms";
    animationCounter++;
    chatList.lastElementChild.style.animationPlayState = "running";
}

function commandReset(e) {
    animationCounter = 1;
    previousInput = Object.keys(possibleInput)[e];
}

// hlep

var possibleInput = {
    // "hlep" : this.help(),
    "ajudar": function() {
        responseText("Você pode digitar um comando na caixa de bate-papo")
        responseText("Algo como 'sobre'")
        commandReset(0);
        return


    },

    "melhores trabalhos": function() {
        responseText("Esses são os melhores trabalhos de Jhonata");
        /*
        responseText("These are his <a href='#animation'>best animations</a>")
        responseText("These are his <a href='#projects'>best projects</a>")
        responseText("Gostaria de saber mais sobre o trabalho de jhonata? (Yes/No)")
        */
        responseText("Visite o Github de jhonata");
        responseText("<a href='https://github.com/jhony2488/' target='blanck' > Github</a>")
        commandReset(1);
        return
    },
    "sobre": function() {
        responseText("Ele e muito carismatico apesar de as vezes ser meio duro e serio demais.");
        responseText("Jhonata tem 18 anos, e procura sempre estar se desenvolvendo de maneira continua ");
        responseText("Jhonata possui diversas ambiçiões , mas a maior delas e poder desenvolver intelectualmente, emocionalmente, e espiritualmente o maior numero de pessoas possivel");
        responseText("Se realmente gostou de jhonata, gostaria de saber mais sobre a visão dele? '  (Yes/No)");
        commandReset(2);
        return
    },
    "experiência": function() {
        responseText("Experiência profissional:")
        responseText("Desenvolvedor Web Front-end freelancer");

        commandReset(3);
        return
    },
    "hobbies": function() {
        responseText(" Ele ama programar e desenvolver web sites softwares e animações interativas, tanto que as vezes ele exagera no tempo que faz essas coisas");
        responseText("Meditar");
        responseText("Passar um tempo com os amigos");
        responseText("Passar um  tempo com a familia");
        responseText("Ele e muito louco e entusiasmado em estudar e práticar robótica(eletrônica,mecânica,programação de microcontroladores) e automação residencial");
        commandReset(4);
        return
    },
    "interesses": function() {
        responseText(" Ele ama programar e desenvolver web sites softwares e animações interativas, tanto que as vezes ele exagera no tempo que faz essas coisas");
        responseText("Meditar");
        responseText("Passar um tempo com os amigos");
        responseText("Passar um  tempo com a familia");
        responseText("Ele e muito louco e entusiasmado em estudar e práticar robótica(eletrônica,mecânica,programação de microcontroladores) e automação residencial");
        commandReset(5);
        return
    },
    "visão": function() {
        responseText("Coisas que jhonata quer aprender ou fazer:");
        responseText("Desenvolver emocionalmente e intelectualmente diversas pessoas");
        responseText("Criar interações web ,mobile,descktop, que agradem os usuarios finais quanto no visual quanto nas funcionalidades");
        responseText("Criar uma casa totalmente automatica no qual não precise da intervenção humana ");
        responseText("Criar uma inteligência artificial de proposito geral");
        commandReset(6);
        return
    },
    "contato": function() {
        responseText("Email: jhon.araujo2488@gmail.com");
        responseText("Facebook: <a href='https://www.facebook.com/jhonata.vinicius.6'>Jhony Araujo</a>");
        commandReset(7);
        return
    },
    "biscuit": function() {
        responseText("Olá tudo bem , digite um dos comandos para saber mais sobre jhonata");
        commandReset(7);
        return
    },

    "comandos": function() {
        responseText("Essa e a lista de todos os comandos:")
        responseText("ajudar, sobre, visão, experiência, hobbies / interesses, contato,facebook,biscuit");
        commandReset(8);
        return
    },
    /*
        "youtube": function() {
            window.location.href.target = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },*/
    "facebook": function() {
        window.location.href = "https://www.facebook.com/jhonata.vinicius.6"
    },
    // work experience
}

var reactionInput = {
    "melhores trabalhos": function() {
        //Redirects you to a different page after 3 secs
        responseText("Visite o Github de jhonata");
        responseText("<a href='https://github.com/jhony2488/' target='blanck'> Github</a>")
        animationCounter = 1;
        return
    },
    "sobre": function() {
        responseText("Coisas que jhonata quer aprender ou fazer:");
        responseText("Desenvolver emocionalmente e intelectualmente diversas pessoas");
        responseText("Criar interações web ,mobile,descktop, que agradem os usuarios finais quanto no visual quanto nas funcionalidades");
        responseText("Criar uma casa totalmente automatica no qual não precise da intervenção humana ");
        responseText("Criar uma inteligência artificial de proposito geral");
        animationCounter = 1;
        return
    }
}