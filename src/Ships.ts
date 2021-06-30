enum BoatSpeeds {
  RowBoat = 2, // knows
  Frigate = 12, // knots
  Barquentine = 16 // knots
}

class BoatBase {
  type: BoatSpeeds
  speed: number
  sprite: keyof typeof BoatSpeeds

  constructor(type: BoatSpeeds, speed: number, sprite: keyof typeof BoatSpeeds) {
    this.type = type
    this.speed = speed
    this.sprite = sprite
  }
}

class Barquentine extends BoatBase {
  constructor() {
    super(BoatSpeeds.Barquentine, BoatSpeeds.Barquentine, "Barquentine")
  }
}

class Frigate extends BoatBase {
  constructor() {
    super(BoatSpeeds.Frigate, BoatSpeeds.Frigate, "Frigate")
  }
}

class RowBoat extends BoatBase {
  constructor() {
    super(BoatSpeeds.RowBoat, BoatSpeeds.RowBoat, "RowBoat")
  }
}

export { BoatBase, Barquentine, Frigate, RowBoat, BoatSpeeds }