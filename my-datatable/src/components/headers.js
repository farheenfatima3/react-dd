import {format} from 'date-fns'


 export const Dots=()=>{
     return(
        <div class="dropdown" tabIndex="-1" >
        <i class="fas fa-ellipsis-h icon"></i>
            <div class="dropdown-menu">
                <ul>
                        <li>Update Status</li>
                        <li>Send a message</li>
                        <li>View Details</li>
                        <li>Edit</li>
                        <li>Copy</li>
                        <li>Move</li>
                        <li>Export</li>
                        <li>Delete</li>
                </ul>
            </div>
        </div>     
     )
 }



export const COLUMNS=[


    {
        Header:'Name',
        accessor:'full_name',
       
    },
    {
        id:'Name',
        Cell:<Dots/>
    },
    
    {
        Header:'Email',
        accessor:'email'
    },
    {
        Header:'Phone',
        accessor:'phone'
    },
    {
        Header:'Status',
        accessor:'status'
    },
    {
        Header:'Source',
        accessor:'source'
    },
    {
        Header:'Date added',
        accessor:'date_added',
        Cell:({value})=>{return format(new Date(value),'dd/MM/yyyy')}
    },
    {
        Header:'Company',
        accessor:'company'
    },
]

