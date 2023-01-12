import zoomSdk from '@zoom/appssdk'

export const invokeZoomAppsSdk = (api, setIsLoading) => () => {
  setIsLoading(true)
  const { name, buttonName = '', options = null } = api
  const zoomAppsSdkApi = zoomSdk[name].bind(zoomSdk)

  zoomAppsSdkApi(options)
    .then((clientResponse) => {
      console.log(
        `${buttonName || name} success with response: ${JSON.stringify(
          clientResponse,
        )}`,
      )
      setIsLoading(false)
    })
    .catch((clientError) => {
      console.log(`${buttonName || name} error: ${JSON.stringify(clientError)}`)
    })
}

// New apis are constantly created and may not be included here
// Please visit the Zoom Apps developer docs for comprehensive list
export const apis = [
  {
    name: 'setVirtualBackground',
    buttonName: 'Set virtual background',
    options: {
      fileUrl:
        'https://images.unsplash.com/photo-1673379324638-1b0cc40f4bbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
  },
]
