/** @jsx jsx */
import {jsx} from '@emotion/core'

import './bootstrap'
import Tooltip from '@reach/tooltip'
import {FaSearch, FaTimes} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import { useEffect, useState } from 'react'
import { client } from 'utils/api-client'
import { danger } from 'styles/colors'
import { useAsync } from 'utils/hooks'
// 🐨 import the client from './utils/api-client'


/* 
// Exercise & extra 1
function DiscoverBooksScreen() {
  // 🐨 add state for status ('idle', 'loading', or 'success'), data, and query
  const [status, setStatus] = useState('idle')

  // const data = null // 💣 remove this, it's just here so the example doesn't explode
  const [data, setData] = useState({}) // Can be initialized as null

  const [query, setQuery] = useState('')

  // 🐨 you'll also notice that we don't want to run the search until the
  // user has submitted the form, so you'll need a boolean for that as well
  // 💰 I called it "queried"
  const [queried, setQueried] = useState(false)

  const [error, setError] = useState('')

  // 🐨 Add a useEffect callback here for making the request with the
  // client and updating the status and data.
  // 💰 Here's the endpoint you'll call: `books?query=${encodeURIComponent(query)}`
  // 🐨 remember, effect callbacks are called on the initial render too
  // so you'll want to check if the user has submitted the form yet and if
  // they haven't then return early (💰 this is what the queried state is for).
  useEffect(() => {
    if (!queried) return

    setStatus('loading')
    const endpoint = `books?query=${encodeURIComponent(query)}`
    client(endpoint)
      .then(data => {
        setData(data)
        setStatus('success')
        setQueried(false)
      })
      .catch(err => {
        console.log(err)
        setStatus('failed')
        setError(err)
        setQueried(false)
      })

  }, [queried, query])

  // 🐨 replace these with derived state values based on the status.
  // const isLoading = false
  // const isSuccess = false
  const isLoading = status === 'loading'
  const isSuccess = status === 'success'

  const isError = status === 'failed'

  function handleSearchSubmit(event) {
    // 🐨 call preventDefault on the event so you don't get a full page reload
    event.preventDefault()

    // 🐨 set the queried state to true
    setQueried(true)

    // 🐨 set the query value which you can get from event.target.elements
    // 💰 console.log(event.target.elements) if you're not sure.
    setQuery(event.target.elements.search.value)
    console.log(event.target.elements.search.value)
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading 
                ? <Spinner /> 
                : isError
                  ? <FaTimes aria-label="error" css={{color: danger}} />
                  : <FaSearch aria-label="search" />}
            </button>
          </label>
        </Tooltip>
      </form>

      {
        isError ? (
          <div css={{color: danger}}>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        ) : null
      }

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}
 */


// Extra 2
function DiscoverBooksScreen() {
  const [query, setQuery] = useState('')
  const [queried, setQueried] = useState(false)

  const {
    data, 
    error, 
    run, 
    isLoading, 
    isError, 
    isSuccess,
  } = useAsync()

  useEffect(() => {
    if (!queried) return

    const endpoint = `books?query=${encodeURIComponent(query)}`
    run(client(endpoint))
  }, [queried, query, run])

  function handleSearchSubmit(event) {
    event.preventDefault()
    setQueried(true)
    setQuery(event.target.elements.search.value)
    console.log(event.target.elements.search.value)
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading 
                ? <Spinner /> 
                : isError
                  ? <FaTimes aria-label="error" css={{color: danger}} />
                  : <FaSearch aria-label="search" />}
            </button>
          </label>
        </Tooltip>
      </form>

      {
        isError ? (
          <div css={{color: danger}}>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        ) : null
      }

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}



export {DiscoverBooksScreen}
