import React from 'react'

const ApptrackrContext = React.createContext({
    applications: [],
    deleteApplication: () => {},
    addApplication: () => {},
    updateApplication: () => {},
    onLoginSuccess: () => {}
})

export default ApptrackrContext