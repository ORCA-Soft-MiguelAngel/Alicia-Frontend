import React from 'react'
import CompanyCard from '../components/Company/CompanyCard'

function Index() {

    React.useEffect(()=>{
console.log(process.env)
    },[])

    return (
        <div>
         {process.env.REACT_APP_API_URL}
        </div>
    )
}

export default Index
