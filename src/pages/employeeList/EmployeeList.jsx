import { useEffect, useState } from 'react';
import './employeeList.scss';

import ChevronUp from '../../assets/chevronUp.svg';
import ChevronDown from '../../assets/chevronDown.svg';

import {
    flexRender,
    createColumnHelper,
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table';

export default function EmployeeListNew() {
    const [employees, setEmployees] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');

    // Charger les employés depuis localStorage
    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(storedEmployees);
    }, []);

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor('firstName', {
            header: () => 'First Name',
            cell: info => info.renderValue(),
        }),
        columnHelper.accessor('lastName', {
            header: () => 'Last Name',
            cell: info => info.renderValue(),
        }),
        columnHelper.accessor('startDate', {
            header: () => 'Start Date',
            cell: info => info.renderValue(),
        }),
        columnHelper.accessor('department', {
            header: () => 'Department',
            cell: info => info.renderValue(),
        }),
        columnHelper.accessor('dateOfBirth', {
            header: () => 'Date of Birth',
            cell: info => info.renderValue(),
        }),
        columnHelper.accessor('street', {
            header: () => 'Street',
            cell: info => info.renderValue(),
        }),
        columnHelper.accessor('city', {
            header: () => 'City',
            cell: info => info.renderValue(),
        }),
        columnHelper.accessor('state', {
            header: () => 'State',
            cell: info => info.renderValue(),
        }),
        columnHelper.accessor('zipCode', {
            header: () => 'Zip Code',
            cell: info => info.renderValue(),
        }),
    ];

    const table = useReactTable({
        columns,
        data: employees,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),  // Ajout de la pagination
        initialState: {
            pagination: {
                pageSize: 10,  // Nombre de lignes affichées par défaut
            }
        },
        getFilteredRowModel: getFilteredRowModel(), // Utilisation du filtrage global
        state: {
            globalFilter, // Lier l'état de recherche globale à la table
        },
        onGlobalFilterChange: setGlobalFilter, // Mise à jour du filtre global
    });

    const paginationStart = table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1;
    const paginationEnd = Math.min(
        (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
        table.getFilteredRowModel().rows.length
    );

    return (
        <main id="employee-div" className="wrapper container">
            <h2 className='list-title'>Current Employees</h2>

            {/* Barre de recherche globale et sélecteur du nombre de lignes */}
            <section className="table-controls">
                <article className='table-controls-size'>
                    <label htmlFor="page-size-select">Show Entry:</label>
                    <select
                        id="page-size-select"  // Associer le label à cet id
                        className='table-controls-size-select'
                        value={table.getState().pagination.pageSize}
                        onChange={e => table.setPageSize(Number(e.target.value))}
                    >
                        {[10, 25, 50, 100].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </article>
        
                {/* Input pour la recherche globale avec croix pour vider l'input */}
                <article className="search-container">
                    <label htmlFor="search-input" className="visually-hidden">Search:</label> 
                    <input
                        id="search-input"
                        type="text"
                        placeholder="Search all columns..."
                        value={globalFilter}
                        onChange={e => setGlobalFilter(e.target.value)} // Mise à jour du filtre global
                        className="search-input"
                    />
                    {globalFilter && (
                        <button
                            className="clear-button"
                            onClick={() => setGlobalFilter('')}  // Vider le champ de recherche
                        >
                            &#x2715; {/* Symbole de croix (X) */}
                        </button>
                    )}
                </article>
            </section>

            <table className="employee-table">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} role="row">
                            {headerGroup.headers.map(header => (
                                <th key={header.id}  role="columnheader">
                                    <div onClick={header.column.getToggleSortingHandler()} className="header-cell">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        <span className="sorting-icons">
                                            <img
                                                src={ChevronUp}
                                                alt="Sort Ascending"
                                                className={`chevron-up ${header.column.getIsSorted() === 'asc' ? 'active' : ''}`}
                                            />
                                            <img
                                                src={ChevronDown}
                                                alt="Sort Descending"
                                                className={`chevron-down ${header.column.getIsSorted() === 'desc' ? 'active' : ''}`}
                                            />
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody role="rowgroup">
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} role="row">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} role="gridcell">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Contrôles de pagination (Page précédente/suivante et numéro de page) */}
            <section className="pagination-controls">
                <span>
                    Showing {paginationStart} to {paginationEnd} of {table.getFilteredRowModel().rows.length} entries
                </span>
                <div>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        aria-label="Go to previous page">
                        Previous
                    </button>
                    <span>
                        Page{' '}
                        <strong>
                            {table.getState().pagination.pageIndex + 1}
                        </strong>
                    </span>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        aria-label="Go to next page">
                    </button>
                </div>
            </section>
        </main>
    );
}


// import { useEffect, useState } from 'react';
// import './employeeList.scss';

// import {
//     flexRender,
//     createColumnHelper,
//     useReactTable,
//     getCoreRowModel,
//     getSortedRowModel,
//     getPaginationRowModel,
//     getFilteredRowModel,
// } from '@tanstack/react-table';

// export default function EmployeeListNew() {
//     const [employees, setEmployees] = useState([]);
//     const [globalFilter, setGlobalFilter] = useState('');

//     // Charger les employés depuis localStorage
//     useEffect(() => {
//         const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
//         setEmployees(storedEmployees);
//     }, []);

//     const columnHelper = createColumnHelper();

//     const columns = [
//         columnHelper.accessor('firstName', {
//             header: () => 'First Name',
//             cell: info => info.renderValue(),
//         }),
//         columnHelper.accessor('lastName', {
//             header: () => 'Last Name',
//             cell: info => info.renderValue(),
//         }),
//         columnHelper.accessor('startDate', {
//             header: () => 'Start Date',
//             cell: info => info.renderValue(),
//         }),
//         columnHelper.accessor('department', {
//             header: () => 'Department',
//             cell: info => info.renderValue(),
//         }),
//         columnHelper.accessor('dateOfBirth', {
//             header: () => 'Date of Birth',
//             cell: info => info.renderValue(),
//         }),
//         columnHelper.accessor('street', {
//             header: () => 'Street',
//             cell: info => info.renderValue(),
//         }),
//         columnHelper.accessor('city', {
//             header: () => 'City',
//             cell: info => info.renderValue(),
//         }),
//         columnHelper.accessor('state', {
//             header: () => 'State',
//             cell: info => info.renderValue(),
//         }),
//         columnHelper.accessor('zipCode', {
//             header: () => 'Zip Code',
//             cell: info => info.renderValue(),
//         }),
//     ];

//     const table = useReactTable({
//         columns,
//         data: employees,
//         getCoreRowModel: getCoreRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),  // Ajout de la pagination
//         initialState: {
//             pagination: {
//                 pageSize: 5,  // Nombre de lignes affichées par défaut
//             }
//         },
//         getFilteredRowModel: getFilteredRowModel(), // Utilisation du filtrage global
//         state: {
//             globalFilter, // Lier l'état de recherche globale à la table
//         },
//         onGlobalFilterChange: setGlobalFilter, // Mise à jour du filtre global
//     });

//     const paginationStart = table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1;
//     const paginationEnd = Math.min(
//         (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
//         table.getFilteredRowModel().rows.length
//     );

//     return (
//         <main id="employee-div" className="wrapper container">
//             <h2 className='list-title'>Current Employees</h2>

//             {/* Barre de recherche globale et sélecteur du nombre de lignes */}
//             <div className="table-controls">
//                 <span className='table-controls-size'>
//                     Show 
//                     <select className='table-controls-size-select'
//                         value={table.getState().pagination.pageSize}
//                         onChange={e => table.setPageSize(Number(e.target.value))}
//                     >
//                         {[5, 10, 20, 50].map(pageSize => (
//                             <option key={pageSize} value={pageSize}>
//                                 {pageSize}
//                             </option>
//                         ))}
//                     </select>
//                     entries
//                 </span>

//                 {/* Input pour la recherche globale avec croix pour vider l'input */}
//                 <span className="search-container">
//                     Search: 
//                     <input
//                         type="text"
//                         placeholder="Search all columns..."
//                         value={globalFilter}
//                         onChange={e => setGlobalFilter(e.target.value)} // Mise à jour du filtre global
//                         className="search-input"
//                     />
//                     {globalFilter && (
//                         <button
//                             className="clear-button"
//                             onClick={() => setGlobalFilter('')}  // Vider le champ de recherche
//                         >
//                             &#x2715; {/* Symbole de croix (X) */}
//                         </button>
//                     )}
//                 </span>
//             </div>

//             <table className="employee-table">
//                 <thead>
//                     {table.getHeaderGroups().map(headerGroup => (
//                         <tr key={headerGroup.id}>
//                             {headerGroup.headers.map(header => (
//                                 <th key={header.id}>
//                                     <div onClick={header.column.getToggleSortingHandler()}>
//                                         {header.isPlaceholder
//                                             ? null
//                                             : flexRender(
//                                                 header.column.columnDef.header,
//                                                 header.getContext()
//                                             )}
//                                         <span className="sorting-icons">
//                                             <span
//                                                 className={`chevron-up ${header.column.getIsSorted() === 'asc' ? 'active' : ''}`}
//                                             >🔼</span>
//                                             <span
//                                                 className={`chevron-down ${header.column.getIsSorted() === 'desc' ? 'active' : ''}`}
//                                             >🔽</span>
//                                         </span>
//                                     </div>
//                                 </th>
//                             ))}
//                         </tr>
//                     ))}
//                 </thead>
//                 <tbody>
//                     {table.getRowModel().rows.map(row => (
//                         <tr key={row.id}>
//                             {row.getVisibleCells().map(cell => (
//                                 <td key={cell.id}>
//                                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Contrôles de pagination (Page précédente/suivante et numéro de page) */}
//             <div className="pagination-controls">
//                 <span>
//                     Showing {paginationStart} to {paginationEnd} of {table.getFilteredRowModel().rows.length} entries
//                 </span>
//                 <div>
//                     <button
//                         onClick={() => table.previousPage()}
//                         disabled={!table.getCanPreviousPage()}>
//                         Previous
//                     </button>
//                     <span>
//                         Page{' '}
//                         <strong>
//                             {table.getState().pagination.pageIndex + 1}
//                         </strong>
//                     </span>
//                     <button
//                         onClick={() => table.nextPage()}
//                         disabled={!table.getCanNextPage()}>
//                         Next
//                     </button>
//                 </div>
//             </div>
//         </main>
//     );
// }


// import { useEffect, useState } from 'react';
// import './employeeList.scss';

// import {
//     flexRender,
//     createColumnHelper,
//     useReactTable,
//     getCoreRowModel,
//     getSortedRowModel,
//     getPaginationRowModel,
//     getFilteredRowModel,
// } from '@tanstack/react-table';

// export default function EmployeeListNew() {
//     const [employees, setEmployees] = useState([]);
//     const [globalFilter, setGlobalFilter] = useState('');

//     // Charger les employés depuis localStorage
//     useEffect(() => {
//         const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
//         setEmployees(storedEmployees);
//     }, []);

//     const columnHelper = createColumnHelper();

//     const columns = [
//         columnHelper.accessor('firstName', {
//             header: () => 'First Name',
//             cell: info => info.renderValue(),
//         }),
//         columnHelper.accessor('lastName', {
//             header: () => 'Last Name',
//             cell: info => info.renderValue(),
//         }),
//         columnHelper.accessor('startDate', {
//             header: () => 'Start Date',
//             cell: info => info.renderValue(),
//         }),
//         columnHelper.accessor('department', {
//             header: () => 'Department',
//             cell: info => info.renderValue(),
//         }),
//         columnHelper.accessor('dateOfBirth', {
//             header: () => 'Date of Birth',
//             cell: info => info.renderValue(),
//         }),
//         columnHelper.accessor('street', {
//             header: () => 'Street',
//             cell: info => info.renderValue(),
//         }),
//         columnHelper.accessor('city', {
//             header: () => 'City',
//             cell: info => info.renderValue(),
//         }),
//         columnHelper.accessor('state', {
//             header: () => 'State',
//             cell: info => info.renderValue(),
//         }),
//         columnHelper.accessor('zipCode', {
//             header: () => 'Zip Code',
//             cell: info => info.renderValue(),
//         }),
//     ];

//     const table = useReactTable({
//         columns,
//         data: employees,
//         getCoreRowModel: getCoreRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),  // Ajout de la pagination
//         initialState: {
//             pagination: {
//                 pageSize: 5,  // Nombre de lignes affichées par défaut
//             }
//         },
//         getFilteredRowModel: getFilteredRowModel(), // Utilisation du filtrage global
//         state: {
//             globalFilter, // Lier l'état de recherche globale à la table
//         },
//         onGlobalFilterChange: setGlobalFilter, // Mise à jour du filtre global
//     });

//     const paginationStart = table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1;
//     const paginationEnd = Math.min(
//         (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
//         table.getFilteredRowModel().rows.length
//     );

//     return (
//         <main id="employee-div" className="wrapper container">
//             <h2 className='list-title'>Current Employees</h2>

//             {/* Barre de recherche globale et sélecteur du nombre de lignes */}
//             <div className="table-controls">
//                 <span className='table-controls-size'>
//                     Show 
//                     <select className='table-controls-size-select'
//                         value={table.getState().pagination.pageSize}
//                         onChange={e => table.setPageSize(Number(e.target.value))}
//                     >
//                         {[5, 10, 20, 50].map(pageSize => (
//                             <option key={pageSize} value={pageSize}>
//                                 {pageSize}
//                             </option>
//                         ))}
//                     </select>
//                     entries
//                 </span>

//                 {/* Input pour la recherche globale avec croix pour vider l'input */}
//                 <span className="search-container">
//                     Search: 
//                     <input
//                         type="text"
//                         placeholder="Search all columns..."
//                         value={globalFilter}
//                         onChange={e => setGlobalFilter(e.target.value)} // Mise à jour du filtre global
//                         className="search-input"
//                     />
//                     {globalFilter && (
//                         <button
//                             className="clear-button"
//                             onClick={() => setGlobalFilter('')}  // Vider le champ de recherche
//                         >
//                             &#x2715; {/* Symbole de croix (X) */}
//                         </button>
//                     )}
//                 </span>
//             </div>

//             <table className="employee-table">
//                 <thead>
//                     {table.getHeaderGroups().map(headerGroup => (
//                         <tr key={headerGroup.id}>
//                             {headerGroup.headers.map(header => (
//                                 <th key={header.id}>
//                                     <div onClick={header.column.getToggleSortingHandler()}>
//                                         {header.isPlaceholder
//                                             ? null
//                                             : flexRender(
//                                                 header.column.columnDef.header,
//                                                 header.getContext()
//                                             )}
//                                         {{
//                                             asc: ' 🔼',
//                                             desc: ' 🔽',
//                                         }[header.column.getIsSorted()] ?? null}
//                                     </div>
//                                 </th>
//                             ))}
//                         </tr>
//                     ))}
//                 </thead>
//                 <tbody>
//                     {table.getRowModel().rows.map(row => (
//                         <tr key={row.id}>
//                             {row.getVisibleCells().map(cell => (
//                                 <td key={cell.id}>
//                                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Contrôles de pagination (Page précédente/suivante et numéro de page) */}
//             <div className="pagination-controls">
//                 <span>
//                     Showing {paginationStart} to {paginationEnd} of {table.getFilteredRowModel().rows.length} entries
//                 </span>
//                 <div>
//                     <button
//                         onClick={() => table.previousPage()}
//                         disabled={!table.getCanPreviousPage()}>
//                         Previous
//                     </button>
//                     <span>
//                         Page{' '}
//                         <strong>
//                             {table.getState().pagination.pageIndex + 1}
//                         </strong>
//                     </span>
//                     <button
//                         onClick={() => table.nextPage()}
//                         disabled={!table.getCanNextPage()}>
//                         Next
//                     </button>
//                 </div>
//             </div>
//         </main>
//     );
// }