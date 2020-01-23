import React from 'react' ;
// class Istate {
//     users = []
// }
class Pagination extends React.PureComponent<any , any>{
    constructor(props: string ){
   const users = JSON.parse(localStorage.getItem('users')!);
        super(props);
        this.state={
            users : users,
            currentPage : 1,
            usersPerPage : 4 

        }
    }
    render(){
        const {users  ,currentPage , usersPerPage } = this.state ;
            
        //logic for displaying users
        
        const indexOfLastUsers = currentPage *  usersPerPage ;
        const indexOfFirtUsers = indexOfLastUsers - usersPerPage ;
        const currentUsersPage = users.slice(indexOfFirtUsers ,indexOfLastUsers );

    const renderCurrentUsersPage = currentUsersPage.map((e:Number , index:number )=>{
        return <li> {index} </li> 
        
    })
    console.log(currentPage);

    // logic for displaying page numbers
    const pageNumber = [] ; 
    for( let i = 1 ; i <= Math.ceil(users.length / usersPerPage); i++ )
    {pageNumber.push(i)}


    const renderPageNumber = pageNumber.map(number=>{
        return(

         <li
        className='ml-2'
        key={number}
        // id={number}
        // onClick={ ()=> this.handleClick}
        
        >
            {number}
        </li>
        );
    })
        return(
            <div>
                <h1>Pagination</h1>
             <ul>
                 {renderPageNumber}
             </ul>
            </div>
        );
    }
}
export default Pagination ; 