import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        className="mr-sm-2 ml-sm-3"
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
