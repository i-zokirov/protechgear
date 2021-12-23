import React from 'react'
import {Helmet} from 'react-helmet'



const Meta = ({title, description, keyword}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keyword' content={keyword}/>
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'ProTechGear',
    description: 'Best place tp buy electronices and tech gear',
    keyword: 'buy electronics'
}
export default Meta
