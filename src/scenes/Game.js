const PATH__ASSETS = "../../assets";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload() {
    // Carreagando uma imagem
    this.load.image("background", `${PATH__ASSETS}/background/bg_layer1.png`);
    this.load.image("platform", `${PATH__ASSETS}/environment/ground_grass.png`);
  }
  create() {
    // Adicionando a imagem no canvas/tela
    this.add.image(240, 320, "background");
    this.add.image(240, 320, "platform");
  }
}
