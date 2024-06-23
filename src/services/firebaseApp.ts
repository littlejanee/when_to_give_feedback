import { initializeApp } from 'firebase/app'
import { config } from '../configurations/configuration'

export const app = initializeApp(config.firebase)
