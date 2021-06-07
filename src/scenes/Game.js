const PATH__ASSETS = "../../assets";

export default class Game extends Phaser.Scene {
  /** @type {Phaser.Physics.Arcade.Sprite} */
  player;
  /** @type {Phaser.Physics.Arcade.StaticGroup} */
  platform;
  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  cursors;

  constructor() {
    super("game");
  }

  preload() {
    // Carreagando uma imagem
    this.load.image("background", `${PATH__ASSETS}/background/bg_layer1.png`);
    this.load.image("platform", `${PATH__ASSETS}/environment/ground_grass.png`);

    // Carregando o coelho
    this.load.image("bunny-stand", `${PATH__ASSETS}/player/bunny1_stand.png`);

    this.cursors = this.input.keyboard.createCursorKeys();
  }
  create() {
    // Adicionando a imagem no canvas/tela
    this.add.image(240, 320, "background").setScrollFactor(1, 0);

    // Adicionando o coelho
    this.player = this.physics.add
      .sprite(240, 320, "bunny-stand")
      .setScale(0.5);

    // Config player
    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    // Fazendo a camera seguir o player
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(this.scale.width * 1.5);

    // Adicionando um grupo de elementos
    this.platforms = this.physics.add.staticGroup();

    for (let i = 0; i < 5; ++i) {
      const x = Phaser.Math.Between(80, 400);
      const y = 150 * i;

      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = this.platforms.create(x, y, "platform");
      platform.scale = 0.5;

      /** @type {Phaser.Physics.Arcade.StaticBody} */
      const body = platform.body;
      body.updateFromGameObject();
    }

    // Colisão do coelho com a plataforma
    this.physics.add.collider(this.platforms, this.player);
  }

  update() {
    this.platforms.children.iterate((child) => {
      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = child;

      const scrollY = this.cameras.main.scrollY;
      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 100);
        platform.body.updateFromGameObject();
      }
    });

    // Se o player tocar com a parte de baixo
    const touchingDown = this.player.body.touching.down;

    if (touchingDown) {
      this.player.setVelocityY(-300);
    }

    if (this.cursors.left.isDown && !touchingDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown && !touchingDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    this.horizontalWrap(this.player);
  }

  /** @param {Phaser.GameObjects.Sprite} sprite */
  horizontalWrap(sprite) {
    const halfWidth = sprite.displayWidth * 0.5;
    const gameWidth = this.scale.width;
    if (sprite.x < -halfWidth) {
      sprite.x = gameWidth + halfWidth;
    } else if (sprite.x > gameWidth + halfWidth) {
      sprite.x = -halfWidth;
    }
  }
}
