(function() {
    'use strict';
    console.log('js running');

    //setting up different pages/overlays
    const galleryBtn = document.getElementById('galleryBtn');
    const instructionBtn = document.getElementById('instructionBtn');
    const gallery = document.querySelector('#gallery');
    let description = document.querySelector('#description');
    const instructions = document.querySelector('#instructions');
    const closeBtns = document.querySelectorAll('.close');
    const gameArea = document.querySelector('#gameArea')
    const popup = document.querySelector('#popup')

    galleryBtn.addEventListener('click', function() {
        gallery.className = 'showing';
        instructions.className = 'hidden';
        gameArea.className = 'hidden';
        popup.className = 'hidden';
    })

    instructionBtn.addEventListener('click', function() {
        instructions.className = 'showing';
        gallery.className = 'hidden';
        gameArea.className = 'hidden';
        popup.className = 'hidden';

    })

    closeBtns.forEach((closeBtn) => {
        closeBtn.addEventListener('click', function() {
            gallery.className = 'hidden';
            instructions.className = 'hidden';
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
        // document.querySelector('#description p').innerHTML = createDescriptionHeader(data);
        // createDescriptions();
    }

    let galleryContainer = document.querySelector('.container');

    function outputGallery(data) {
        const dataPoints = Object.keys(data);
        // console.log(dataPoints);
        let galleryContainer = "";
        // let galleryContainer = `<div id="description" class="hidden">
        //                             <img src="images/cormorant1.png" alt="double crested cormorant" width="120">
        //                             <h3></h3>
        //                             <p></p>
        //                             <div class="close button">close</div>
        //                         </div>`;

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

    // function createDescriptions(data) {
    //     const items = document.querySelectorAll('.item');
    //     console.log(items)
    //     console.log

    //     for (const item of items) {
    //         item.addEventListener('click', function(event) {
    //             const itemID = event.target.id;
    //             console.log(itemID)
    //             let image = `data.${itemID}.image`
    //             let html = `<section id="description" class="hidden">`;
    //             html += `<img src="images/${image}" alt="double crested cormorant" width="120">
    //             <h3></h3>
    //             <p></p>
    //             <div class="close button">close</div>`
    //             html += "</section>"
    //             description = html
    //             console.log(description)
    //             description.className = "showing"
    //         });
    //     }
    // }

    function createDescriptions(data) {
        const items = document.querySelectorAll('.item');
        console.log(items)

        for (const item of items) {
            item.addEventListener('click', function(event) {

                alert("Sorry, still under construction!");

                // const itemID = event.target.id;
                // console.log(itemID)
                // console.log(data[itemID])
                // if (data.itemID.hasOwnProperty('description')) {
                //     console.log(data[itemID].description);
                //   } else {
                //     console.log('Description property is missing for itemID:', itemID);
                //   }
                // console.log(data[itemID].name)

                
    //             description.innerHTML = 
    //                 `<img src="images/${data[itemID].image}" alt="double crested cormorant" width="120">
    //                 <h3>${data[itemID].name}</h3>
    //                 <p>${data[itemID].description}</p>
    //                 <div class="close button">close</div>`
    //   ;

                // let image = `data.${itemID}.image`
                // let html = `<section id="description" class="hidden">`;
                // html += `<img src="images/${image}" alt="double crested cormorant" width="120">
                // <h3></h3>
                // <p></p>
                // <div class="close button">close</div>`
                // html += "</section>"
                // description = html
                // console.log(data.arboretum1.name)
                // document.querySelector('#description p').innerHTML = data[itemID].name;
                // document.querySelector('#description h3').innerHTML =

               

                // console.log(description)
                // description.className = "showing"

            });
        }
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
    map.loadSprite("temparea", "images/boyDown.png")
    
    // for me: create a new one for front, side etc. -> player = boyfront onKeyDown
    map.add([
        map.sprite("tempbg")
    ])

    const tempCollisionArea = map.add([
        map.sprite("temparea"),
        map.scale(0.5),
        map.pos(200, 300),
        map.area(),
        "tempCollisionArea"
    ])

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
    })

    map.onKeyDown("right", () => {
        player.use(map.sprite('boyRight'))
        player.move(SPEED, 0)
    })

    map.onKeyDown("up", () => {
        player.move(0, -SPEED),
        player.use(map.sprite('boyUp'))
    })

    map.onKeyDown("down", () => {
        // boy = map.readd([
        //     map.sprite("boyDown"),
        //     map.area(),
        // ])
        player.move(0, SPEED),
        player.use(map.sprite('boyDown'))
    })
    
    player.onCollide("tempCollisionArea", (tempCollisionArea) => {
        popup.className = 'showing';
    })

    player.onCollideEnd("tempCollisionArea", (tempCollisionArea) => {
        popup.className = 'hidden';
    })

    //connecting levels to map
    const arboretumStart = document.querySelector('#arboretum');

    arboretumStart.addEventListener('click', arboretumLevel)



    //kaboom jumping levels
   function arboretumLevel() {
        popup.className = 'hidden';

        const arb = kaboom({
            global: false,
            canvas: document.querySelector('#gameArea'),
            scale: 2,
    })
    



    ////

    const FLOOR_HEIGHT = 48
    const JUMP_FORCE = 800
    const SPEED2 = 300

arb.setBackground(141, 183, 255)

// load assets
arb.loadSprite("bean", "/images/boy.png", {
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
arb.loadSprite("tree", "images/mexicanT.png")
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
	}

	// jump when user press space
	arb.onKeyPress("space", jump)
	arb.onClick(jump)

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
		arb.wait(arb.rand(3.9, 5.9), spawnTree)

	}

		// lose if player collides with any game obj with tag "tree"
		player.onCollide("tree",() => {
			// go to "lose" scene and pass the score
			arb.go("lose", score)
			arb.addKaboom(player.pos)
		})
	// start spawning trees
	spawnTree()

    setTimeout(() => {
	function spawnButterfly() {

		// add insect obj
		// arb.add([
        //     arb.sprite("butterfly"),
        //     arb.area({ scale: 0.1 }),
        //     arb.scale(1),
		// 	// rect(48, rand(32, 96)),
		// 	// area(),
		// 	arb.outline(4),
		// 	arb.pos(arb.width(), arb.height() - FLOOR_HEIGHT),
		// 	arb.anchor("botleft"),
		// 	arb.color(238, 143, 203),
		// 	arb.move(arb.vec2(-1, 0), SPEED2),
		// 	arb.offscreen({ destroy: true }),
		// 	"butterfly",
		// ])

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
		player.onCollide("butterfly",() => {
			// go to "lose" scene and pass the score
			arb.go("lose2", score)
			arb.addKaboom(player.pos)
		})

		// wait a random amount of time to spawn next tree
		arb.wait((2.8), spawnButterfly)

	}

	// start spawning trees
	spawnButterfly()

    }, 4000);


	


setTimeout(() => {
    console.log("delayed")
    function spawnBird() {
        console.log("bird spawned")

		// add bird obj
		// arb.add([
        //     arb.sprite("bird"),
        //     arb.scale(1),
		// 	// rect(48, rand(32, 96)),
		// 	arb.area(),
		// 	arb.outline(4),
		// 	arb.pos(arb.width(), 300 - FLOOR_HEIGHT),
        //     // pos(width(), height(10)),
		// 	arb.anchor("botleft"),
		// 	arb.color(238, 143, 203),
		// 	arb.move(arb.vec2(-1, 0), SPEED2),
		// 	arb.offscreen({ destroy: true }),
		// 	"bird",
		// ])

        const bird = arb.add([
            arb.sprite("bird"),
            arb.area({scale: 0.8}),
			arb.outline(4),
			arb.pos(arb.width(), arb.rand(200, 280) - FLOOR_HEIGHT),
            arb.anchor("botleft"),
            arb.color(238, 143, 203),
			arb.move(arb.vec2(-1, 0), SPEED2),
			arb.offscreen({ destroy: true }),
            "bird",
        ]);

        bird.play("fly"),

		// wait a random amount of time to spawn next bird
		arb.wait((4.0), spawnBird)

        // lose if player collides with any game obj with tag "bird"
        player.onCollide("bird", () => {
            // go to "lose2" scene and pass the score
            arb.go("lose3", score)
            arb.addKaboom(player.pos)
        })
        // start spawning birds
	}

    spawnBird()

}, 2000);






	// keep track of score
	let score = 0

	const scoreLabel = arb.add([
		arb.text(score),
		arb.pos(24, 24),
	])

	// increment score every frame
	arb.onUpdate(() => {
		score++
		scoreLabel.text = score
	})

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

	// display score
	arb.add([
		arb.text(score),
		arb.pos(arb.width() / 2, arb.height() / 2 + 64),
		arb.scale(2),
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
		arb.scale(4),
		arb.anchor("center"),
        arb.scale(0),
	])


	// display score
	arb.add([
		arb.text(score),
		arb.pos(arb.width() / 2, arb.height() / 2 + 64),
		arb.scale(2),
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

    function clearTimeout() {
        clearTimeout(spawnBird);
      }
    function clearTimeout() {
        clearTimeout(spawnButterfly);
      }

	// display score
	arb.add([
		arb.text(score),
		arb.pos(arb.width() / 2, arb.height() / 2 + 64),
		arb.scale(2),
		arb.anchor("center"),
	])



	// go back to game with space is pressed
	arb.onKeyPress("space", () => arb.go("game"))
	arb.onClick(() => arb.go("game"))

})
arb.go("game")

}





    ////



})();