import { RouterProvider } from "react-router-dom"
import { bananaRouter } from "./Router"

function App() {
  return (
    <>
      <RouterProvider router={bananaRouter} />
    </>
  )
}

export default App
