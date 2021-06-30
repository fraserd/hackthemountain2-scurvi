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

// TODO: add properties to the pin interface, as required, to represent one pin placement
interface Pin {

}

// TODO: add properties to the result set, as required, to collect data about the results
interface ResultSet {

}

interface AppStateAccessor {
  appStateSetter: (page: Page, data: AppData) => void
  appStateGetter: () => AppState
}

export type { AppState, AppStateAccessor, AppData, Pin, ResultSet }