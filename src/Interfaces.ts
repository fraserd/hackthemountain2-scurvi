import Page from "./Page";

interface AppStateSetter {
  appStateSetter: (page: Page) => void
}

export type { AppStateSetter }