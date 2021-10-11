import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react"
import { Row, Col, CardTitle, CardText, Card, CardBody, Label, Button } from 'reactstrap'

import { verifAccount } from "../redux/actions/auth"

const VerifAccount = (props) => {

  const { message } = useSelector(state => state.message)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const verification_code = props.location.pathname.split("/").pop()

  useEffect(() => {
    setLoading(true)
    dispatch(verifAccount(verification_code))
      .then((response) => {
        console.log(response)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
        <Card className='mb-0'>
          <CardBody>
            <CardBody>
              <CardTitle tag="h4" className="mb-1 text-center">

                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <p> {message} </p>
              </CardTitle>
            </CardBody>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default VerifAccount
