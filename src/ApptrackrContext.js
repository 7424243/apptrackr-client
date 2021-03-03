import React from 'react'

const ApptrackrContext = React.createContext({
    applications: [],
    resources: [],
    getUserApplications: () => {},
    getUserResources: () => {},
    deleteApplication: () => {},
    addApplication: () => {},
    addResource: () => {},
    updateApplication: () => {},
    onLoginSuccess: () => {}
})

export default ApptrackrContext