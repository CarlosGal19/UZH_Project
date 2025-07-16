import React from 'react'
import Aboutus from '../Components/Aboutus'
import Log_in_card from '../Components/Log_in_card'
import Register_card from '../Components/Register_card'

const Homepage = () => {
return (
    <div>
        <Aboutus />
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <Log_in_card />
            <Register_card />
        </div>
    </div>
)
}

export default Homepage