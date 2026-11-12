import { createContext, useContext } from 'react'

/** { open(workId, listOfIds?) } — opens the project viewer from anywhere. */
export const WorkViewerContext = createContext({ open: () => {} })

export function useWorkViewer() {
  return useContext(WorkViewerContext)
}
