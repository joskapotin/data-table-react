import { filterEntries } from "~/lib/utilities/helpers"
import options from "~/lib/constants/options"
import { ActionTypes } from "./action-types"
import type { Action } from "./actions"
import type { DataTableState } from "~/lib/models"

const initialState: DataTableState = {
  labels: [],
  entries: [],
  currentPage: 1,
  totalPages: 0,
  pageSize: options.pageSizeOptions[0],
  filter: "",
  filterResults: [],
  sortBy: "",
  sortDirection: "none",
}

function reducer(state: DataTableState, action: Action) {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      }
    case ActionTypes.SET_TOTAL_PAGES:
      return { ...state, totalPages: action.payload }
    case ActionTypes.SET_PAGE_SIZE:
      return { ...state, pageSize: action.payload, totalPages: Math.ceil(state.filterResults.length / action.payload) }
    case ActionTypes.SET_FILTER:
      return { ...state, filter: action.payload, currentPage: 1, filterResults: filterEntries({ entries: state.entries, filter: action.payload }) }
    case ActionTypes.SET_FILTER_RESULTS:
      return { ...state, filterResults: action.payload, totalPages: Math.ceil(state.filterResults.length / state.pageSize) }
    case ActionTypes.SET_SORTBY:
      return { ...state, sortBy: action.payload }
    case ActionTypes.SET_SORTDIRECTION:
      return { ...state, sortDirection: action.payload }
    default:
      return state
  }
}

export default reducer
export { initialState }
