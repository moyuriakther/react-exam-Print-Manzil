'use client'

import { useEffect, useState } from 'react'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDate } from '../utils/formattedDate'


export default function DataTable() {
const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedRows, setSelectedRows] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(8)
  // const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      let url = `https://api.razzakfashion.com`;
      if(searchTerm){
        url = `https://api.razzakfashion.com?paginate=${rowsPerPage}&search=${searchTerm}`;
      }
      try {
        const response = await fetch(url);
     
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const jsonData = await response.json()
        const dataArray = jsonData?.data || []
        setData(dataArray)
        // setTotalItems(dataArray.length)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [searchTerm, rowsPerPage])

    const filteredData = data?.filter(item => {
    const searchString = searchTerm.toLowerCase()
    const firstName = item.name?.split(' ')[0]?.toLowerCase() || ''
    const lastName = item.name?.split(' ')[1]?.toLowerCase() || ''
    const email = item.email?.toLowerCase() || ''

    return (
      firstName.includes(searchString) ||
      lastName.includes(searchString) ||
      email.includes(searchString)
    )
  })

    // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)


  const toggleSelectAll = () => {
    if (selectedRows?.length === data?.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(data?.map(row => row.id))
    }
  }

  const toggleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows?.filter(rowId => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

   // Pagination handlers
  const goToFirstPage = () => setCurrentPage(1)
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))
  const goToLastPage = () => setCurrentPage(totalPages)

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-64 text-red-500">Error: {error}</div>
  }


  return (
    <div className="container">
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search area"
          className="searchInput"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
             }}
        />
      </div>
      <div className="tableContainer">
        <table className="table">
          <thead>
            <tr>
              <th>
                <input
                   type="checkbox"
                  checked={selectedRows.length === currentData.length && currentData.length > 0}
                  onChange={toggleSelectAll}
                  className="checkbox"
                />
              </th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>email</th>
              <th>Created Date</th>
              <th>Updated Date</th>
            </tr>
          </thead>
          <tbody>
          {currentData?.map((row) => (
              <tr key={row.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => toggleSelectRow(row.id)}
                    className="checkbox"
                  />
                </td>
                <td>{row.name?.split(" ")[0]}</td>
                <td>{row.name?.split(" ")[1]}</td>
                <td>{row.email}</td> 
                <td>{formatDate(row?.created_at)}</td> 
                <td>{formatDate(row?.updated_at)}</td> 
              </tr>
            ))} 
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <div className="rowsPerPage">
          <span>Rows per page</span>
          <select
              value={rowsPerPage}
              onChange={(e) => {
              setRowsPerPage(Number(e.target.value))
              setCurrentPage(1)
            }}
            className="select"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="paginationInfo">
         {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length}
        </div>
        <div className="paginationControls">
          <button
              onClick={goToFirstPage}
              disabled={currentPage === 1}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronFirst className="w-4 h-4" />
            </button>
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLast className="w-4 h-4" />
            </button>
        </div>
      </div>
    </div>
  )
}
