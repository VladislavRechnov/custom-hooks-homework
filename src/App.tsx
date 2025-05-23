import { useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import useClickOutside from './hooks/useClickOutside'
import useHover from './hooks/useHover'

interface User {
  id: number
  name: string
  username: string
  email: string
}

function App() {
  //1
  const [clickedOutsideCount, setClickedOutsideCount] = useState(0)
  const ulRef = useRef<HTMLUListElement>(null)

  //2
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()

  //3
  const { data, error, loading } = useFetch<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  )

  useClickOutside(ulRef, () => setClickedOutsideCount((count) => count + 1))

  return (
    <section>
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {!error && !loading && (
        <>
          <ul ref={ulRef}>
            {data?.slice(0, 10).map(({ id, email, name, username }) => {
              return (
                <li key={id}>
                  Name: {name}, UserName: {username}, email: {email}
                </li>
              )
            })}
          </ul>
          <div>Clicked outside list: {clickedOutsideCount}</div>
          <div
            ref={hoverRef}
            style={{
              background: isHovered ? 'black' : 'gray',
              height: '200px',
              marginTop: '20px',
              padding: '20px',
            }}
          >
            IsHovered: {String(isHovered)}
          </div>
        </>
      )}
    </section>
  )
}

export default App
