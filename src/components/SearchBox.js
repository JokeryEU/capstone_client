import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        className="mr-sm-2 ml-sm-5"
        name="q"
        placeholder="Search Products..."
        onChange={(e) => {
          setKeyword(e.target.value)
        }}
      ></Form.Control>
      <Button type="submit" hidden variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
