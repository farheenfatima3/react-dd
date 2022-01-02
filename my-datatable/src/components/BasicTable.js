import React, {useMemo} from 'react'
import {useTable,useGlobalFilter, useRowSelect,usePagination} from 'react-table';
import MOCK_DATA from './MOCK_DATA .json'
import {COLUMNS} from './headers'
import './styles.css'



export const BasicTable = () => {
    const columns=useMemo(()=> COLUMNS,[])//useMemo() hook is used to memorize given value avoiding recalculation,with dependencies in array if dependencies changes than recalculation is done else memorized value is returned
    const data=useMemo(()=> MOCK_DATA,[])
   const table= useTable({//useTable() is root hook for react table
        columns:columns,
        data:data,
        initialState:{pageSize:25}},useGlobalFilter,usePagination,useRowSelect,
   (hooks)=>{
       hooks.visibleColumns.push((columns)=>{
           return[
            {
                id:'selection',
                Header:({getToggleAllRowsSelectedProps})=>(
                    <CheckBox {...getToggleAllRowsSelectedProps()}/>
                ),
            
            Cell:({row})=>(
                <CheckBox {...row.getToggleRowSelectedProps()}/>
            ),
            sticky:'left'
            },
            ...columns
           ]
       })
   })

    const {getTableProps,getTableBodyProps,headerGroups,prepareRow,setGlobalFilter,state,page,nextPage,previousPage,canPreviousPage,canNextPage,pageOptions,selectedFlatRows}=table
    const {globalFilter,pageIndex}=state
    return(
        <>
        <header>
        <div class="nav-bar">
            <div class="btn-container">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
                <button className="dot" id="save">View</button>
                <button className="dot" id="edit">Edit</button>
                <select className="dot" name="select" id="select">
                    <option value="Status">Status</option>
                </select>
                <button className="dot">Send</button>
                <button className="dot">...</button>
            </div>
        </div>
    </header>
            <div className="table-container">
            
            <table {...getTableProps()}>
               <thead>
                   {headerGroups.map((headerGroup)=>(
                       <tr {...headerGroup.getHeaderGroupProps()}>
                           {headerGroup.headers.map((column)=>(
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                           ))}
                       </tr>
                       ))
                   }    
               </thead>
               <tbody {...getTableBodyProps()}>
                   {page.map((row)=>{
                       prepareRow(row)
                       return (
                           <tr {...row.getRowProps()}>
                               {row.cells.map((cell)=>{
                                   return <td {...cell.getCellProps()}>
                                       {cell.render('Cell')}</td>
                               })}
                           </tr>


                       )
                   })}
               </tbody> 
           </table>
           </div>
            {/* <code>
        {JSON.stringify({
        selectedFlatRows:selectedFlatRows.map((row)=>row.original)
    })}</code> */}
    
           
        <div className="pagination">
            <button onClick={()=>previousPage()} disabled={!canPreviousPage}>{'<'}</button>
            <span>
                 page {' '}
                 <strong>
                     {pageIndex+1} of {pageOptions.length}
                 </strong>
             </span>
            <button onClick={()=>nextPage()} disabled={!canNextPage}>{">"}</button>
        </div>
        
        </>
    )
            }



// search
const GlobalFilter=({filter,setFilter})=>{
    return(
        <span className="searchContainer">
            <i class="fa fa-search"></i>
            <input value={filter||''} onChange={((e)=>setFilter(e.target.value))} placeholder="1 of 150 contacts" id="search"/>
        </span>
    )
}

// checkbox
const CheckBox=React.forwardRef(({indeterminate,...rest},ref)=>{
    const defaultValue=React.useRef()
    const resolvedVal=ref||defaultValue
    React.useEffect(()=>{
        resolvedVal.current.indeterminate=indeterminate
    },[resolvedVal,indeterminate])
    
    return(
        <>
        <input type="checkbox" ref={resolvedVal}{...rest}/>
        </>
    )
})


