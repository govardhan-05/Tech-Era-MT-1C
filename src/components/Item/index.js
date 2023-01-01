import {Link} from 'react-router-dom'

import './index.css'

const Item = props => {
  const {details} = props
  const {id, name, logoUrl} = details
  return (
    <ul className="li-container">
      <Link to={`/courses/${id}`} className="link-el el">
        <img className="image" src={logoUrl} alt={name} />
        <p className="paragraph">{name}</p>
      </Link>
    </ul>
  )
}

export default Item
