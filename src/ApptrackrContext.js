import React from 'react'

const ApptrackrContext = React.createContext({
    applications: [],
    resources: [],
    user_id: -1,
    getUserApplications: () => {},
    getUserResources: () => {},
    deleteApplication: () => {},
    addApplication: () => {},
    addResource: () => {},
    addUserId: () => {},
    updateApplication: () => {},
    onLoginSuccess: () => {},
    deleteResource: () => {},
})

export default ApptrackrContext