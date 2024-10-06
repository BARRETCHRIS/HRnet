import { useEffect, useState } from 'react'; // Importation des hooks React
import './employeeList.scss';// Importation du style associé à la liste des employés

import ChevronUp from '../../assets/chevronUp.svg';  // Icône pour le tri ascendant
import ChevronDown from '../../assets/chevronDown.svg';  // Icône pour le tri descendant

import {
    flexRender,
    createColumnHelper,
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table';  // Importation des fonctions nécessaires pour créer la table

import { useEmployee } from '../../context/EmployeeContext';  // Importe le contexte des employés

// Composant principal pour afficher la liste des employés
export default function EmployeeList() {
    // Utilise le contexte pour obtenir les employés
    const { employees } = useEmployee();  // Extrait les employés du contexte
    const [globalFilter, setGlobalFilter] = useState('');

    const columnHelper = createColumnHelper();  // Création d'un helper pour définir les colonnes

    // Définition des colonnes de la table
    const columns = [
        columnHelper.accessor('firstName', {
            header: () => 'First Name',  // En-tête de colonne
            cell: info => info.renderValue(),  // Rendu de la valeur de la cellule
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

    // Configuration de la table avec des fonctionnalités avancées comme le tri, la pagination, et le filtrage
    const table = useReactTable({
        columns,
        data: employees, 
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,  // Nombre de lignes affichées par défaut
            }
        },
        getFilteredRowModel: getFilteredRowModel(), // Utilisation du filtrage global
        state: {
            globalFilter, // Lie l'état de recherche globale à la table
        },
        onGlobalFilterChange: setGlobalFilter, // Mise à jour du filtre global
    });

    // Calcul des indices de pagination pour afficher les entrées
    const paginationStart = table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1;
    const paginationEnd = Math.min(
        (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
        table.getFilteredRowModel().rows.length
    );

    return (
        <main id="employee-div" className="wrapper container-list">
            <h2 className='list-title'>Current Employees</h2>

            {/* Barre de recherche globale et sélecteur du nombre de lignes */}
            <section className="table-controls">
                <article className='table-controls-size'>
                    <label htmlFor="page-size-select">Show Entry:</label>
                    <select
                        id="page-size-select"  // Associe le label à cet id
                        className='table-controls-size-select'
                        value={table.getState().pagination.pageSize}
                        onChange={e => table.setPageSize(Number(e.target.value))}
                    >
                        {/* Options pour le sélecteur de taille de page */}
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
                            onClick={() => setGlobalFilter('')}  // Vide le champ de recherche
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
                                <th key={header.id} role="columnheader">
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
                        disabled={!table.getCanPreviousPage()}  // Désactive si pas de page précédente
                        aria-label="Go to previous page">
                        Previous
                    </button>
                    <span>
                        Page{' '}
                        <strong>
                            {table.getState().pagination.pageIndex + 1}  {/* Affichage du numéro de page courant */}
                        </strong>
                    </span>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}  // Désactive si pas de page suivante
                        aria-label="Go to next page">
                        Next
                    </button>
                </div>
            </section>
        </main>
    );
}