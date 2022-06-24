import {useQuery} from 'react-query'



const Comment =  ( props ) => {

    const { id } = props


    const fetchComments = async () => {
        return await fetch(`https://dummyapi.io/data/v1/post/${id}/comment`,{
            method:'GET',
            headers:{
              'app-id':'62b29d7caca98c233bb0bf4c'
            }
        }).then(res=>res.json())
         
    }

    const {data:comment,isLoading} = useQuery(['comments',id],fetchComments)

    if(isLoading){
        return(
            <h1>Loading</h1>
        )
    }
    
    return(
        <>  
        
                <h1 className='text-grey-300 opacity-40'>{comment.data.length > 0 ? `View all ${comment.data.length} Comments` : 'No Comments Found'}</h1>
                {
                    comment.data.map(c =>{
                        return(
                            (comment.data.length > 0 )
                            ?
                            <>
                                <div className='flex gap-x-2 text-[11px] text-right'>
                                    <h1 className='font-semibold'>{c.owner.firstName}{c.owner.lastName}:</h1>
                                    <h1 className='text-right'>{c.message}</h1>
        
                                </div>
                            </>
                            :
                            <>
                            </>
                        )
                    })
                }
        </>
    )
}



export default Comment
