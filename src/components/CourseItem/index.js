import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Item from '../Item'
import './index.css'

const apiStatus = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  fail: 'fail',
}

class CourseItem extends Component {
  state = {api: apiStatus.initial, courseList: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({api: apiStatus.loading})
    const url = ' https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.courses.map(item => ({
        id: item.id,
        name: item.name,
        logoUrl: item.logo_url,
      }))
      this.setState({courseList: formattedData, api: apiStatus.success})
    } else {
      this.setState({
        api: apiStatus.fail,
      })
    }
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" width={50} height={50} />
    </div>
  )

  successView = () => {
    const {courseList} = this.state
    return (
      <div className="success-container">
        <h1 className="header">Courses</h1>
        <ul className="list-container">
          {courseList.map(item => (
            <Item details={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
  }

  failView = () => (
    <div>
      <Link to="/" className="link-el">
        <nav className="nav-el">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
          />
        </nav>
      </Link>
      <div className="fail-container">
        <img
          className="fail-image"
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
        />
        <h1 className="fail-heading">Oops! Something Went Wrong</h1>
        <p className="fail-para">
          We cannot seem to find the page you are looking for
        </p>
        <button className="fail-button" type="button" onClick={this.getData}>
          Retry
        </button>
      </div>
    </div>
  )

  finalRender = () => {
    const {api} = this.state
    switch (api) {
      case apiStatus.loading:
        return this.loadingView()
      case apiStatus.success:
        return this.successView()
      case apiStatus.fail:
        return this.failView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Link to="/" className="link-el">
          <nav className="nav-el">
            <img
              className="logo"
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
            />
          </nav>
        </Link>
        {this.finalRender()}
      </div>
    )
  }
}

export default CourseItem
