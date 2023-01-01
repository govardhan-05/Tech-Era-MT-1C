import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
// import Item from '../Item'
import './index.css'

const apiStatus = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  fail: 'fail',
}

class CourseItemDetails extends Component {
  state = {api: apiStatus.initial, courseList: []}

  componentDidMount() {
    this.getItem()
  }

  getItem = async () => {
    this.setState({api: apiStatus.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedCourse = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({courseList: updatedCourse, api: apiStatus.success})
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
      <div className="cr">
        <div className="view">
          <img className="vi" src={courseList.imageUrl} alt={courseList.name} />
          <div className="vc">
            <h1 className="vh">{courseList.name}</h1>
            <p className="vp">{courseList.description}</p>
          </div>
        </div>
      </div>
    )
  }

  failView = () => (
    <div>
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
        <button className="fail-button" type="button" onClick={this.getItem}>
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

export default CourseItemDetails
