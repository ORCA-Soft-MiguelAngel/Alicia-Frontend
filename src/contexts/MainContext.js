import React from 'react'
import { UserStore } from '../stores/UserStore'
import {CompanyStore} from '../stores/CompanyStore'

export const MainContext = React.createContext({
   UserStore: new UserStore(),
   CompanyStore: new CompanyStore()
})