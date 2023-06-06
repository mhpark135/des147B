(function() {
    'use strict';
    console.log('js running');

    //usability test alert
    // alert("Imagine you are a fourth-grade elementary student at North Davis Elementary School. You’ve just started a new lesson in class on the history of Davis, and your teacher instructs you and your classmates to learn more about the Arboretum by playing this online desktop game. Try navigating the game and to learn more about the Arboretum.");

    //setting up different pages/overlays
    const galleryBtn = document.getElementById('galleryBtn');
    const instructionBtn = document.getElementById('instructionBtn');
    const gallery = document.querySelector('#gallery');
    let description = document.querySelector('#description');
    const instructions = document.querySelector('#instructions');
    const instructionsOverlay = document.querySelector('#instructionsOverlay');
    const closeBtns = document.querySelectorAll('.close');
    const gameArea = document.querySelector('#gameArea');
    const popup = document.querySelector('#popup');
    let arbInstructions = false;

    document.querySelector('#game').addEventListener('click', function(){
        gameArea.focus();
    });

    //opening/closing gallery + instructions
    galleryBtn.addEventListener('click', function() {
        gallery.className = 'showing';
        instructionsOverlay.className = 'hidden';
        gameArea.className = 'hidden';
        popup.className = 'hidden';
    })

    // instructionBtn.addEventListener('click', function() {
    //     instructions.className = 'showing';
    //     // gallery.className = 'hidden';
    //     // gameArea.className = 'hidden';
    //     popup.className = 'hidden';

    //     if (arbInstructions == false) {
    //         document.querySelector("#instructions h3").innerHTML = "Navigate to a part of the seal using the arrow keys and click “start” to play."
    //     }
    //     if (arbInstructions == true) {
    //         document.querySelector("#instructions h3").innerHTML = "Press “spacebar” to jump. Avoid the different items and creatures coming your way!"
    //     }
    // })

    closeBtns.forEach((closeBtn) => {
        closeBtn.addEventListener('click', function() {
            gallery.className = 'hidden';
            instructionsOverlay.className = 'hidden';
            gameArea.className = 'showing';
            gameArea.focus();
        });
    });


    //gathering data for gallery
    async function getData() {
        const arboretum = await fetch('data/arboretum.json');
        const data = await arboretum.json();
        console.log(data);
        document.querySelector('.container').innerHTML = outputGallery(data);
        document.querySelector('#description').innerHTML = createDescriptions(data);

        // createDescriptions();
    }

    let galleryContainer = document.querySelector('.container');

    function outputGallery(data) {
        const dataPoints = Object.keys(data);
        // console.log(dataPoints);
        let galleryContainer = "";

        for (let i = 0; i < dataPoints.length; i++) {
            let newItem = document.createElement("div");

            let html = `<div class="item" id="${data[dataPoints[i]].id}">`;
            html += `<img src="images/${data[dataPoints[i]].image}" alt="${data[dataPoints[i]].name}" width="120">
            <h3>${data[dataPoints[i]].name}</h3>`;
            html += '</div>';
            newItem = html;
            galleryContainer += newItem;
            
            // console.log(newItem)
           
        }
        return galleryContainer;
    }

    getData();


    function createDescriptions(data) {
        const container = document.querySelector('.container');

        container.addEventListener('click', function(event) {

            const item = event.target.closest('.item');

            if(!item){
                return;
            }

            const itemID = item.id;
            const itemData = data[itemID];
            
            description.innerHTML = `
                <article>
                    <img src="images/${itemData.image}" alt="${itemData.name}" width="120">
                    <h3>${itemData.name}</h3>
                    <p>${itemData.description}</p>
                    <div id="closeDescription" class="close button">close</div>
                </article>`

            document.querySelector('#closeDescription').addEventListener('click', function() {
                description.className = "hidden";
            });
    
            console.log(description)
            description.className = "showing"

        });
    
    }

    //kaboom seal map
    const map = kaboom({
        global: false,
        canvas: document.querySelector('#gameArea'),
    })
    
    map.loadSprite("boyDown", "images/boyDown.png")
    map.loadSprite("boyUp", "images/boyUp.png")
    map.loadSprite("boyRight", "images/boyRight.png")    
    map.loadSprite("boyLeft", "images/boyLeft.png")    
    map.loadSprite("tempbg", "images/background.png")
    map.loadSprite("temparea", "images/featherR.png")
    map.loadSprite("temparea2", "images/pigsqueak.png")
    map.loadSprite("temparea3", "images/turtle2.png")
    map.loadSprite("butterfly", "images/monarch1.png",{
        sliceX: 2,
        anims: {
            "fly": {
                from: 0,
                to: 1,
                speed: 8,
                loop: true,
            }
        }
    })

    
    // for me: create a new one for front, side etc. -> player = boyfront onKeyDown
    map.add([
        map.sprite("tempbg"),
        instructionsOverlay.className = "showing"
        // tempbg.scale(2)
    ])

    const tempCollisionArea = map.add([
        map.sprite("temparea"),
        map.scale(2),
        map.pos(490, 95),
        map.area(),
        "tempCollisionArea"
    ])

    const tempCollisionArea2 = map.add([
        map.sprite("temparea2"),
        map.scale(2),
        map.pos(450, 100),
        map.area(),
        "tempCollisionArea"
    ])

    const tempCollisionArea3 = map.add([
        map.sprite("temparea3"),
        map.scale(1),
        map.pos(480, 100),
        map.area(),
        "tempCollisionArea"
    ])

    const tempCollisionArea4 = map.add([
            map.sprite("butterfly"),
            map.scale(1),
            map.pos(500, 80),
            map.area(),
            "butterfly",
    ])
    tempCollisionArea4.play("fly");


    let boy = map.add([
        map.sprite("boyDown"),
        map.pos(470, 250),
        map.area(),
    ])

    let player = boy;
    const SPEED = 120

    map.onKeyDown("left", () => {
        player.use(map.sprite('boyLeft'))
        player.move(-SPEED, 0)
        instructionsOverlay.className = "hidden"
    })

    map.onKeyDown("right", () => {
        player.use(map.sprite('boyRight'))
        player.move(SPEED, 0)
        instructionsOverlay.className = "hidden"
    })

    map.onKeyDown("up", () => {
        player.move(0, -SPEED),
        player.use(map.sprite('boyUp'))
        instructionsOverlay.className = "hidden"
    })

    map.onKeyDown("down", () => {
        player.move(0, SPEED),
        player.use(map.sprite('boyDown'))
        instructionsOverlay.className = "hidden"
    })
    
    player.onCollide("tempCollisionArea", (tempCollisionArea) => {
        popup.className = 'showing';
    })

    player.onCollideEnd("tempCollisionArea", (tempCollisionArea) => {
        popup.className = 'hidden';
    })

    //connecting levels to map
    const arboretumStart = document.querySelector('#arboretum');

    arboretumStart.addEventListener('click', function() {
        arboretumLevel();
        arbInstructions = true;

        if (arbInstructions == false) {
            document.querySelector("#instructions p").innerHTML = "Navigate to a part of the seal using the arrow keys and click “start” to play.";
        }
        if (arbInstructions == true) {
            document.querySelector("#instructions p").innerHTML = "Press “spacebar” to jump. Avoid the different items and creatures coming your way!";
            document.querySelector("#instructionsOverlay h2").innerHTML = "Press “spacebar” to jump. Avoid the different items and creatures coming your way!";
            document.querySelector("#instructionsOverlay h3").innerHTML = "Press “spacebar” to continue.";
            instructionsOverlay.className = "showing";
        }
    });



    //kaboom jumping levels
   function arboretumLevel() {
        popup.className = 'hidden';

        const arb = kaboom({
            global: false,
            canvas: document.querySelector('#gameArea'),
            scale: 2,
    })

    const FLOOR_HEIGHT = 48
    const JUMP_FORCE = 800
    let SPEED2 = 300


    arb.setBackground(141, 183, 255)

   

    // load assets
    arb.loadSprite("bean", "images/boy.png", {
        sliceX: 6,
        anims: {
            "run": {
                from: 1,
                to: 4,
                speed: 10,
                loop: true,
            },

            "jump1": 5,
        }
    })
    // arb.loadSprite("tree1", "images/tree1.png")
    arb.loadSprite("reedD", "images/reedD.png")
    arb.loadSprite("butD", "images/butD.png")
    arb.loadSprite("turtleD", "images/turtleD.png")
    arb.loadSprite("pigD", "images/pigD.png")
    arb.loadSprite("corD", "images/corD.png")
    arb.loadSprite("treeD", "images/treeD.png")
    arb.loadSprite("tree", "images/mexicanT.png")
    arb.loadSprite("flower", "images/pigsqueak.png")
    arb.loadSprite("bush", "images/featherR.png")
    arb.loadSprite("bird", "images/cormorant1.png",{
        sliceX: 2,
        anims: {
            "fly": {
                from: 0,
                to: 1,
                speed: 3,
                loop: true,
            }
        }
    })
    arb.loadSprite("butterfly", "images/monarch1.png",{
        sliceX: 2,
        anims: {
            "fly": {
                from: 0,
                to: 1,
                speed: 8,
                loop: true,
            }
        }
    })
    arb.loadSprite("turtle", "images/turtle1.png",{
        sliceX: 2,
        anims: {
            "crawl": {
                from: 0,
                to: 1,
                speed: 8,
                loop: true,
            }
        }
    })
    
    arb.scene("game", () => {

	// define gravity
        arb.setGravity(2600)

        // add a game object to screen
        const player = arb.add([
            // list of components
            arb.sprite("bean"),
            arb.pos(80, 40),
            arb.anchor("center"),
            arb.area(),
            arb.body(),
        ])

        player.play("run")
        // player.onAnimEnd((anim) =>{
        //     if(anim === "run"){

        //     }
        // })

        player.onGround(() => {
            player.play("run")
        })

        // floor
        arb.add([
            arb.rect(arb.width(), FLOOR_HEIGHT),
            arb.outline(4),
            arb.pos(0, arb.height()),
            arb.anchor("botleft"),
            arb.area(),
            arb.body({ isStatic: true }),
            arb.color(50, 156, 50),
        ])

        function jump() {
            if (player.isGrounded()) {
                player.jump(JUMP_FORCE)
                player.play("jump1")
            }
            instructionsOverlay.className = "hidden"
        }

        // jump when user press space
        arb.onKeyPress("space", jump)
        arb.onClick(jump)


        // function spawnTree1() {

            // // add tree obj
            // arb.add([
            //     arb.sprite("tree1"),
            //     arb.area({ scale: 0.3 }),
            //     arb.scale(2),
            //     // rect(48, rand(32, 96)),
            //     // area(),
            //     arb.outline(4),
            //     arb.pos(arb.width(), arb.height() - FLOOR_HEIGHT),
            //     arb.anchor("botleft"),
            //     arb.color(238, 143, 203),
            //     arb.move(arb.vec2(-1, 0), SPEED2),
            //     arb.offscreen({ destroy: true }),
            //     "tree1",
            // ])

            // // wait a random amount of time to spawn next tree
            // arb.wait(arb.rand(2,1), spawnTree1)

        // }
        // start spawning trees
        // spawnTree1()

        function spawnTree() {

            // add tree obj
            arb.add([
                arb.sprite("tree"),
                arb.area({ scale: 0.3 }),
                arb.scale(2),
                // rect(48, rand(32, 96)),
                // area(),
                arb.outline(4),
                arb.pos(arb.width(), arb.height() - FLOOR_HEIGHT),
                arb.anchor("botleft"),
                arb.color(238, 143, 203),
                arb.move(arb.vec2(-1, 0), SPEED2),
                arb.offscreen({ destroy: true }),
                "tree",
            ])

            // wait a random amount of time to spawn next tree
            arb.wait(arb.rand(8, 13), spawnTree)

        }

            // lose if player collides with any game obj with tag "tree"
            player.onCollide("tree",() => {
                // go to "lose" scene and pass the score
                arb.go("lose", score)
            })
        // start spawning trees
        spawnTree()

        setTimeout(() => {
            function spawnButterfly() {

                const butterfly = arb.add([
                    arb.sprite("butterfly"),
                    arb.area({scale: 0.6}),
                    arb.outline(4),
                    arb.pos(arb.width(), arb.rand(250, 280) - FLOOR_HEIGHT),
                    arb.anchor("botleft"),
                    arb.color(238, 143, 203),
                    arb.move(arb.vec2(-1, 0), SPEED2),
                    arb.offscreen({ destroy: true }),
                    "butterfly",
                ]);

                butterfly.play("fly"),
                    // lose if player collides with any game obj with tag "tree"

                // wait a random amount of time to spawn next tree
                arb.wait((7, 14), spawnButterfly)

            }

            // start spawning trees
            spawnButterfly()


        }, 4500);

        player.onCollide("butterfly",() => {
            // go to "lose" scene and pass the score
            arb.go("lose2", score)
        })

        setTimeout(() => {
            function spawnFlower() {

                const bush = arb.add([
                    arb.sprite("flower"),
                    arb.scale(2),
                    arb.area({scale: 0.5}),
                    arb.outline(4),
                    arb.pos(arb.width(), arb.height() - FLOOR_HEIGHT),
                    arb.anchor("botleft"),
                    arb.color(238, 143, 203),
                    arb.move(arb.vec2(-1, 0), SPEED2),
                    arb.offscreen({ destroy: true }),
                    "flower",
                ]);

                // wait a random amount of time to spawn next tree
                arb.wait((7, 14), spawnFlower)

            }

            // start spawning trees
            spawnFlower()


        }, 7500);

        player.onCollide("flower",() => {
            // go to "lose" scene and pass the score
            arb.go("lose5", score)
        })


        setTimeout(() => {
            function spawnBush() {

                const bush = arb.add([
                    arb.sprite("bush"),
                    arb.scale(2),
                    arb.area({scale: 0.5}),
                    arb.outline(4),
                    arb.pos(arb.width(), arb.height() - FLOOR_HEIGHT),
                    arb.anchor("botleft"),
                    arb.color(238, 143, 203),
                    arb.move(arb.vec2(-1, 0), SPEED2),
                    arb.offscreen({ destroy: true }),
                    "bush",
                ]);

                // wait a random amount of time to spawn next tree
                arb.wait((14), spawnBush)

            }

            // start spawning trees
            spawnBush()


        }, 6200);

        player.onCollide("bush",() => {
            // go to "lose" scene and pass the score
            arb.go("lose6", score)
        })


        function spawnBird() {
            console.log("bird spawned")

            const bird = arb.add([
                arb.sprite("bird"),
                arb.area({scale: 0.8}),
                arb.outline(4),
                arb.pos(arb.width(), arb.rand(200, 170) - FLOOR_HEIGHT),
                arb.anchor("botleft"),
                arb.color(238, 143, 203),
                arb.move(arb.vec2(-1, 0), SPEED2),
                arb.offscreen({ destroy: true }),
                "bird",
            ]);

            bird.play("fly"),

            // wait a random amount of time to spawn next bird
            arb.wait((6, 12), spawnBird)


        }
        
        // start spawning birds
        setTimeout(spawnBird, 2000);
        

        // lose if player collides with any game obj with tag "bird"
        player.onCollide("bird", () => {
            // go to "lose2" scene and pass the score
            arb.go("lose3", score)

        })

        function spawnTurtle() {

            const turtle = arb.add([
                arb.sprite("turtle"),
                arb.area({scale: 0.6}),
                arb.outline(4),
                arb.pos(arb.width(), arb.height() - FLOOR_HEIGHT),
                arb.anchor("botleft"),
                arb.color(238, 143, 203),
                arb.move(arb.vec2(-1, 0), SPEED2),
                arb.offscreen({ destroy: true }),
                "turtle",
            ]);

            turtle.play("crawl"),

            // wait a random amount of time to spawn next bird
            arb.wait((15, 20), spawnTurtle)


        }
        
        // start spawning birds
        setTimeout(spawnTurtle, 9100); 
        

        // lose if player collides with any game obj with tag "bird"
        player.onCollide("turtle", () => {
            // go to "lose2" scene and pass the score
            arb.go("lose4", score)
        })


        // arb.random( spawnTurtle(), spawnBird(), spawnButterfly(), spawnTree())




        // keep track of score
        let score = 0

        const scoreLabel = arb.add([
            arb.text(score),
            arb.pos(24, 24),
        ])

        // increment score every frame
        arb.onUpdate(() => {
            score++
            // SPEED2+
            scoreLabel.text = score
        })
        
        // if (score > 200){
        //    const SPEED3 = 500
        //     SPEED2+
        // }

        // if (score > 200) {
        // 	const SPEED = add([
        // 		1000
        // 	])
        // }

    })

    arb.scene("lose", (score) => {

        arb.add([
            arb.sprite("tree"),
            arb.pos(arb.width() / 2, arb.height() / 2 - 64),
            arb.scale(4),
            arb.anchor("center"),
        ])

        arb.add([
            arb.sprite("treeD"),
            arb.pos(arb.width()/2, arb.height()/2 + 64),
            arb.scale(0.6),
            arb.anchor("center"),
        ])

        // display score
        arb.add([
            arb.text(score),
            arb.pos(arb.width() / 2, arb.height() / 2 - 100),
            arb.scale(1),
            arb.anchor("center"),
        ])

        // go back to game with space is pressed
        arb.onKeyPress("space", () => arb.go("game"))
        arb.onClick(() => arb.go("game"))

    })

    arb.scene("lose2", (score) => {

        arb.add([
            arb.sprite("butterfly"),
            arb.pos(arb.width() / 2, arb.height() / 2 - 64),
            arb.scale(2.5),
            arb.anchor("center"),
        ])


        arb.add([
            arb.sprite("butD"),
            arb.pos(arb.width()/2, arb.height()/2 + 64),
            arb.scale(0.6),
            arb.anchor("center"),
        ])

        // display score
        arb.add([
            arb.text(score),
            arb.pos(arb.width() / 2, arb.height() / 2 - 100),
            arb.scale(1),
            arb.anchor("center"),
        ])

        // go back to game with space is pressed
        arb.onKeyPress("space", () => arb.go("game"))
        arb.onClick(() => arb.go("game"))

    })

    arb.scene("lose3", (score) => {

        arb.add([
            arb.sprite("bird"),
            arb.pos(arb.width() / 2, arb.height() / 2 - 64),
            arb.scale(3),
            arb.anchor("center"),
        ])

        arb.add([
            arb.sprite("corD"),
            arb.pos(arb.width()/2, arb.height()/2 + 64),
            arb.scale(0.6),
            arb.anchor("center"),
        ])

        // display score
        arb.add([
            arb.text(score),
            arb.pos(arb.width() / 2, arb.height() / 2 - 100),
            arb.scale(1),
            arb.anchor("center"),
        ])
        // go back to game with space is pressed
        arb.onKeyPress("space", () => arb.go("game"))
        arb.onClick(() => arb.go("game"))

    })

    arb.scene("lose4", (score) => {

        arb.add([
            arb.sprite("turtle"),
            arb.pos(arb.width() / 2, arb.height() / 2 - 64),
            arb.scale(3),
            arb.anchor("center"),
        ])

        arb.add([
            arb.sprite("turtleD"),
            arb.pos(arb.width()/2, arb.height()/2 + 64),
            arb.scale(0.6),
            arb.anchor("center"),
        ])

        // display score
        arb.add([
            arb.text(score),
            arb.pos(arb.width() / 2, arb.height() / 2 - 100),
            arb.scale(1),
            arb.anchor("center"),
        ])
        // go back to game with space is pressed
        arb.onKeyPress("space", () => arb.go("game"))
        arb.onClick(() => arb.go("game"))

    })


    arb.scene("lose5", (score) => {

        arb.add([
            arb.sprite("flower"),
            arb.pos(arb.width() / 2, arb.height() / 2 - 64),
            arb.scale(3),
            arb.anchor("center"),
        ])

        arb.add([
            arb.sprite("pigD"),
            arb.pos(arb.width()/2, arb.height()/2 + 64),
            arb.scale(0.6),
            arb.anchor("center"),
        ])

        // display score
        arb.add([
            arb.text(score),
            arb.pos(arb.width() / 2, arb.height() / 2 - 100),
            arb.scale(1),
            arb.anchor("center"),
        ])
        // go back to game with space is pressed
        arb.onKeyPress("space", () => arb.go("game"))
        arb.onClick(() => arb.go("game"))

    })


    arb.scene("lose6", (score) => {

        arb.add([
            arb.sprite("bush"),
            arb.pos(arb.width() / 2, arb.height() / 2 - 64),
            arb.scale(3),
            arb.anchor("center"),
        ])

        arb.add([
            arb.sprite("reedD"),
            arb.pos(arb.width()/2, arb.height()/2 + 64),
            arb.scale(0.6),
            arb.anchor("center"),
        ])

        // display score
        arb.add([
            arb.text(score),
            arb.pos(arb.width() / 2, arb.height() / 2 - 100),
            arb.scale(1),
            arb.anchor("center"),
        ])
        // go back to game with space is pressed
        arb.onKeyPress("space", () => arb.go("game"))
        arb.onClick(() => arb.go("game"))

    })
    arb.go("game")

}

})();