import zoomSdk from "@zoom/appssdk"

import { useEffect, useState } from 'react'
import { apis } from './apis'
import SetupVB from './components/setupVB'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [error, setError] = useState(null)
  const [user] = useState(null)
  const [runningContext, setRunningContext] = useState(null)
  const [counter, setCounter] = useState(0)
  const [userContextStatus, setUserContextStatus] = useState('')

  useEffect(() => {
    if (zoomSdk) {
      async function configureSdk() {
        // to account for the 2 hour timeout for config
        const configTimer = setTimeout(() => {
          setCounter(counter + 1)
        }, 120 * 60 * 1000)

        try {
          // Configure the JS SDK, required to call JS APIs in the Zoom App
          // These items must be selected in the Features -> Zoom App SDK -> Add APIs tool in Marketplace
          const configResponse = await zoomSdk.config({
            capabilities: [
              // apis demoed in the buttons
              ...apis.map((api) => api?.name), // IMPORTANT
            ],
            version: '0.16.0',
          })
          console.log('App configured', configResponse)
          // The config method returns the running context of the Zoom App
          setRunningContext(configResponse?.runningContext)
          setUserContextStatus(configResponse?.auth?.status)
          zoomSdk.onSendAppInvitation((data) => {
            console.log(data)
          })
          zoomSdk.onShareApp((data) => {
            console.log(data)
          })
        } catch (error) {
          console.log(error)
          setError('There was an error configuring the JS SDK')
        }
        return () => {
          clearTimeout(configTimer)
        }
      }
      configureSdk()
    }
  }, [counter])

  if (error) {
    console.log(error)
    return (
      <div className="App">
        <h1>{error.message} open Zoom App for testing</h1>
      </div>
    )
  }

  return (
    <div className="App">
      <h1>
        Hello
        {user ? ` ${user.first_name} ${user.last_name}` : ' Zoom Apps user'}!
      </h1>
      <p>{`User Context Status: ${userContextStatus}`}</p>
      <p>
        {runningContext
          ? `Running Context: ${runningContext}`
          : 'Configuring Zoom JavaScript SDK...'}
      </p>

      <SetupVB />
    </div>
  )
}

export default App
