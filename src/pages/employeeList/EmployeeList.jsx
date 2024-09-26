import { useMemo, useEffect, useState } from 'react';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';

import './employeeList.scss';
import chevronUp from '../../assets/chevronUp.svg';
import chevronDown from '../../assets/chevronDown.svg';


// Composant de filtre global (pour la barre de recherche)
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <span>
      Search: {' '}
      <input
        value={globalFilter || ''}
        onChange={e => setGlobalFilter(e.target.value || undefined)}
        placeholder="Search employees..."
      />
    </span>
  );
}

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  // Charger les employés depuis localStorage
  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  // Définir les colonnes pour React Table
  const columns = useMemo(() => [
    { Header: 'First Name', accessor: 'firstName' },
    { Header: 'Last Name', accessor: 'lastName' },
    {
      Header: 'Start Date',
      accessor: 'startDate',
      sortType: 'basic', // Utilisation du tri de base pour les dates
    },
    { Header: 'Department', accessor: 'department' },
    {
      Header: 'Date of Birth',
      accessor: 'dateOfBirth',
      sortType: 'basic', // Utilisation du tri de base pour les dates
    },
    { Header: 'Street', accessor: 'street' },
    { Header: 'City', accessor: 'city' },
    { Header: 'State', accessor: 'state' },
    { Header: 'Zip Code', accessor: 'zipCode' },
  ], []);

  // Initialiser React Table avec tri, pagination, et global filter
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
    setPageSize,
  } = useTable(
    {
      columns,
      data: employees,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Fonction pour réinitialiser le tri
  const resetSorting = () => {
    headerGroups.forEach(headerGroup => {
      headerGroup.headers.forEach(column => {
        column.clearSortBy(); // Réinitialiser le tri pour chaque colonne
      });
    });
  };

  return (
    <main id="employee-div" className="wrapper container">
      <h2>Current Employees</h2>

      <div className="table-controls">
        <label>
          Show {' '}
          <select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
          >
            {[10, 25, 50, 100].map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          {' '} entries
        </label>

        <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      </div>

      <table {...getTableProps()} className="employee-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {column.render('Header')}
                    
                    <span {...column.getSortByToggleProps({ title: undefined })}>
                      <button
                        onClick={() => {
                          resetSorting(); // Réinitialiser le tri avant d'appliquer un nouveau tri
                          column.toggleSortBy(false); // Tri ascendant
                        }}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          padding: '0 5px'
                        }}>
                        <img src={chevronUp} alt="sort by up" style={{ width: '20px', height: '20px', color: column.isSorted && !column.isSortedDesc ? 'black' : '#6e8706' }} />
                      </button>
                      <button
                        onClick={() => {
                          resetSorting(); // Réinitialiser le tri avant d'appliquer un nouveau tri
                          column.toggleSortBy(true); // Tri descendant
                        }}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          padding: '0 5px'
                        }}>
                        <img src={chevronDown} alt="sort by down" style={{ width: '20px', height: '20px', color: column.isSorted && column.isSortedDesc ? 'black' : '#6e8706' }} />
                      </button>
                      <button onClick={resetSorting} style={{ marginLeft: '10px' }}>
                        Reset Sorting
                      </button>
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className='pagination'>
        <div className="pagination-info">
          Showing {pageIndex * pageSize + 1} to {pageIndex * pageSize + page.length} of {rows.length} entries
        </div>

        <div className="pagination-controls">
          <button onClick={previousPage} disabled={!canPreviousPage}>
            Previous
          </button>
          <span>
            Page {' '}
            <strong>
              {pageIndex + 1}
            </strong>
          </span>
          <button onClick={nextPage} disabled={!canNextPage}>
            Next
          </button>
        </div>
      </div>
      <a href="/">Home</a>
    </main>
  );
};

export default EmployeeList;


// function EmployeeList(){
//     document.title = 'List | Wealth Health';
//     return (
//         <main className="wrapper">
//             <div className='content_error'>
//                 <h2>Current Employees</h2>
//             </div>
//         </main>
//     )
// }

// export default EmployeeList;