const PATH__ASSETS = "../../assets";

export default class Game extends Phaser.Scene {
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
    this.add.image(240, 320, "background");

    // Adicionando o coelho
    const player = this.physics.add
      .sprite(240, 320, "bunny-stand")
      .setScale(0.5);

    // Adicionando um grupo de elementos
    const platforms = this.physics.add.staticGroup();

    for (let i = 0; i < 5; ++i) {
      const x = Phaser.Math.Between(80, 400);
      const y = 150 * i;

      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = platforms.create(x, y, "platform");
      platform.scale = 0.5;

      /** @type {Phaser.Physics.Arcade.StaticBody} */
      const body = platform.body;
      body.updateFromGameObject();
    }

    // Colisão do coelho com a plataforma
    this.physics.add.collider(platforms, player);
  }
}
