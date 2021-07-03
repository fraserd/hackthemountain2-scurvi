import Page from "./Page";

interface AppState {
  page: Page
  data: AppData
}

interface AppData {
  speed: number // speed in knots
  pinData: Pin[] // set of pin placement data points
  results: ResultSet // some set of data w.r.t. the final results
}

interface Coordinate {
    x: number
    y: number
}

enum PinType {
    Start,
    Middle,
    End
}

interface Pin {
    coord: Coordinate
    type: PinType
}

interface ResultSet {
    days: number
    limes: number
    lemons: number
    oranges: number
}

interface AppStateAccessor {
  appStateSetter: (page: Page, data: AppData) => void
  appStateGetter: () => AppState
}

export type { AppState, AppStateAccessor, AppData, Pin, ResultSet, Coordinate }
export { PinType }