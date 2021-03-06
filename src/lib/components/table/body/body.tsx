import { useMemo } from "react"
import { v4 as uuidv4 } from "uuid"
import useDataTableContext from "../../../hooks/useDataTableContext/useDataTableContext"
import { sortEntries } from "../../../utilities/helpers"
import Row from "./row/row"
import type { Entry } from "../../../models"

function Body() {
  const { state } = useDataTableContext()
  const { currentPage, pageSize, filterResults, sortBy, sortDirection } = state

  const sortedEntries = useMemo(() => sortEntries({ entries: filterResults, sortBy, sortDirection }), [filterResults, sortBy, sortDirection])
  const paginatedEntries = sortedEntries.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <tbody className="table-group-divider">
      {paginatedEntries.map((entry: Entry) => (
        <Row key={`row-${uuidv4()}`} entry={entry} />
      ))}
    </tbody>
  )
}

export default Body
