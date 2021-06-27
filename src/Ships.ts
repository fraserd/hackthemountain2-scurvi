enum BoatSpeeds {
  RowBoat = 2, // knows
  Frigate = 12, // knots
  Barquentine = 16// knots
}

class Boat {
  speed: number

  constructor(speed: number) {
    this.speed = speed
  }
}

class Barquentine extends Boat {
  constructor() {
    super(BoatSpeeds.Barquentine);
  }
}

class Frigate extends Boat {
  constructor() {
    super(BoatSpeeds.Frigate);
  }
}

class RowBoat extends Boat {
  constructor() {
    super(BoatSpeeds.RowBoat);
  }
}

export type { Boat, Barquentine, Frigate, RowBoat, BoatSpeeds }