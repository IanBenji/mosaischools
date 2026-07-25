import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react'
import {
  CAMPUSES, DEFAULT_CAMPUS,
  getSavedCampus, saveCampus,
  hasChosenCampus, markCampusChosen,
} from '../lib/campus'

const CampusContext = createContext(null)

const SWAP_AT   = 450   // ms — swap content while the curtain covers the screen
const CLEAR_AT  = 950   // ms — remove the curtain once it has wiped away

/* Site-wide active campus. Defaults to the flagship (Nalugala); the visitor
 * picks their campus from the first-visit popup or the Navbar switcher, and the
 * choice persists in the browser. `chosen` records whether an explicit choice
 * has been made — the picker popup only appears while it is false, so a returning
 * visitor is never nagged again. Switching plays a brief campus-coloured curtain
 * wipe (see CampusTransition); `switching` holds the incoming slug while it runs. */
export function CampusProvider({ children }) {
  const [campus, setCampusState] = useState(() => getSavedCampus() ?? DEFAULT_CAMPUS)
  const [chosen, setChosen]       = useState(() => hasChosenCampus())
  const [switching, setSwitching] = useState(null)   // incoming slug during the wipe
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  /* Persist + switch to a campus. Used by both the picker and the navbar. Always
   * records the choice (so the popup stops appearing) even when the visitor picks
   * the campus they are already viewing; only plays the wipe when it changes. */
  const chooseCampus = useCallback((slug) => {
    if (!CAMPUSES[slug]) return
    markCampusChosen()
    setChosen(true)
    if (slug === campus) return
    saveCampus(slug)
    setSwitching(slug)
    timers.current.forEach(clearTimeout)
    timers.current = [
      setTimeout(() => setCampusState(slug), SWAP_AT),
      setTimeout(() => setSwitching(null), CLEAR_AT),
    ]
  }, [campus])

  return (
    <CampusContext.Provider
      value={{
        campus,
        campusInfo: CAMPUSES[campus],
        chosen,
        chooseCampus,
        setCampus: chooseCampus,   // alias — navbar switcher
        switching,
      }}
    >
      {children}
    </CampusContext.Provider>
  )
}

export function useCampus() {
  return useContext(CampusContext)
}
