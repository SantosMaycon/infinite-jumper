const PATH__ASSETS = "../../assets";

export default class Game extends Phaser.Scene {
  /** @type {Phaser.Physics.Arcade.Sprite} */
  player;
  /** @type {Phaser.Physics.Arcade.StaticGroup} */
  platform;

  constructor() {
    super("game");
  }

  preload() {
    // Carreagando uma imagem
    this.load.image("background", `${PATH__ASSETS}/background/bg_layer1.png`);
    this.load.image("platform", `${PATH__ASSETS}/environment/ground_grass.png`);

    // Carregando o coelho
    this.load.image("bunny-stand", `${PATH__ASSETS}/player/bunny1_stand.png`);
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
  }
}
