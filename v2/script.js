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
        console.log(description);
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
        // document.querySelector('#description').innerHTML = createDescriptions(data);
    }

    let galleryContainer = document.querySelector('.container');

    function outputGallery(data) {
        const dataPoints = Object.keys(data);
        // console.log(dataPoints);
        // let galleryContainer = "";
        let galleryContainer = `<div id="description" class="hidden">
                                    <img src="images/cormorant1.png" alt="double crested cormorant" width="120">
                                    <h3></h3>
                                    <p></p>
                                    <div class="close button">close</div>
                                </div>`;

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

    //kaboom seal map
    const map = kaboom({
        global: false,
        canvas: document.querySelector('#gameArea'),
    })
    
    map.loadSprite("boyDown", "images/boyDown.png")
    map.loadSprite("boyUp", "images/boyUp.png")
    map.loadSprite("boyRight", "images/boyRight.png")    
    map.loadSprite("boyLeft", "images/boyLeft.png")    
    map.loadSprite("tempbg", "images/tempbg.png")
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
        map.sprite("boyRight"),
        map.pos(500, 300),
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

        const arboretum = kaboom({
            global: false,
            canvas: document.querySelector('#gameArea'),
    })

    }


})();