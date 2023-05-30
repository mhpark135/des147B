import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";
const FLOOR_HEIGHT = 48
const JUMP_FORCE = 800
const SPEED = 480

// initialize context
kaboom()

setBackground(141, 183, 255)

// load assets
loadSprite("bean", "../images/boyRight.png")
loadSprite("tree", "../images/mexicanT.png")
loadSprite("bird", "../images/cormorant1.png")
loadSprite("butterfly", "../images/monarch1.png")
scene("game", () => {

	// define gravity
	setGravity(2600)

	// add a game object to screen
	const player = add([
		// list of components
		sprite("bean"),
		pos(80, 40),
		area(),
		body(),
	])

	// floor
	add([
		rect(width(), FLOOR_HEIGHT),
		outline(4),
		pos(0, height()),
		anchor("botleft"),
		area(),
		body({ isStatic: true }),
		color(50, 156, 50),
	])

	function jump() {
		if (player.isGrounded()) {
			player.jump(JUMP_FORCE)
		}
	}

	// jump when user press space
	onKeyPress("space", jump)
	onClick(jump)

	function spawnTree() {

		// add tree obj
		add([
            sprite("tree"),
            area({ scale: 0.6 }),
            scale(2),
			// rect(48, rand(32, 96)),
			// area(),
			outline(4),
			pos(width(), height() - FLOOR_HEIGHT),
			anchor("botleft"),
			color(238, 143, 203),
			move(LEFT, SPEED),
			offscreen({ destroy: true }),
			"tree",
		])

		// wait a random amount of time to spawn next tree
		wait(rand(0.9, 1.9), spawnTree)

	}

		// lose if player collides with any game obj with tag "tree"
		player.onCollide("tree",() => {
			// go to "lose" scene and pass the score
			go("lose", score)
			addKaboom(player.pos)
		})
	// start spawning trees
	spawnTree()


	function spawnButterfly() {

		// add insect obj
		add([
            sprite("butterfly"),
            area({ scale: 0.1 }),
            scale(1),
			// rect(48, rand(32, 96)),
			// area(),
			outline(4),
			pos(width(), height() - FLOOR_HEIGHT),
			anchor("botleft"),
			color(238, 143, 203),
			move(LEFT, 550),
			offscreen({ destroy: true }),
			"butterfly",
		])

		// wait a random amount of time to spawn next tree
		wait((2.8), spawnButterfly)

	}

		// lose if player collides with any game obj with tag "tree"
		player.onCollide("butterfly",() => {
			// go to "lose" scene and pass the score
			go("lose2", score)
			addKaboom(player.pos)
		})
	// start spawning trees
	spawnButterfly()


	



    function spawnBird() {

		// add bird obj
		add([
            sprite("bird"),
            scale(1),
			// rect(48, rand(32, 96)),
			area(),
			outline(4),
			pos(width(), 750 - FLOOR_HEIGHT),
            // pos(width(), height(10)),
			anchor("botleft"),
			color(238, 143, 203),
			move(LEFT, 600),
			offscreen({ destroy: true }),
			"bird",
		])

		// wait a random amount of time to spawn next bird
		wait((4.0), spawnBird)

	}

	// lose if player collides with any game obj with tag "bird"
	player.onCollide("bird", () => {
		// go to "lose2" scene and pass the score
		go("lose3", score)
		addKaboom(player.pos)
	})
	// start spawning birds
	spawnBird()



	// keep track of score
	let score = 0

	const scoreLabel = add([
		text(score),
		pos(24, 24),
	])

	// increment score every frame
	onUpdate(() => {
		score++
		scoreLabel.text = score
	})

	// if (score > 200) {
	// 	const SPEED = add([
	// 		1000
	// 	])
	// }

})

scene("lose", (score) => {

	add([
		sprite("tree"),
		pos(width() / 2, height() / 2 - 64),
		scale(4),
		anchor("center"),
	])

	// display score
	add([
		text(score),
		pos(width() / 2, height() / 2 + 64),
		scale(2),
		anchor("center"),
	])

	// go back to game with space is pressed
	onKeyPress("space", () => go("game"))
	onClick(() => go("game"))

})

scene("lose2", (score) => {

	add([
		sprite("butterfly"),
		pos(width() / 2, height() / 2 - 64),
		scale(4),
		anchor("center"),
	])

	// display score
	add([
		text(score),
		pos(width() / 2, height() / 2 + 64),
		scale(2),
		anchor("center"),
	])

	// go back to game with space is pressed
	onKeyPress("space", () => go("game"))
	onClick(() => go("game"))

})

scene("lose3", (score) => {

	add([
		sprite("bird"),
		pos(width() / 2, height() / 2 - 64),
		scale(3),
		anchor("center"),
	])

	// display score
	add([
		text(score),
		pos(width() / 2, height() / 2 + 64),
		scale(2),
		anchor("center"),
	])

	// go back to game with space is pressed
	onKeyPress("space", () => go("game"))
	onClick(() => go("game"))

})
go("game")
