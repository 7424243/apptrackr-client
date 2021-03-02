import React from 'react'

const ApptrackrContext = React.createContext({
    applications: [],
    getUserApplications: () => {},
    deleteApplication: () => {},
    addApplication: () => {},
    updateApplication: () => {},
    onLoginSuccess: () => {}
})

export default ApptrackrContext