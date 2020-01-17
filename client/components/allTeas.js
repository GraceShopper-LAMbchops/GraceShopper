import React from 'react'
import {connect} from 'react-redux'
import {fetchTeas} from '../store/teas'
import {Link} from 'react-router-dom'
import {findPrice} from './helperFuncs'
class AllTea extends React.Component {
  componentDidMount() {
    this.props.getAllTeas()
  }

  render() {
    const teas = this.props.teas
    return (
      <div>
        <h1>ALL TEAS!!!</h1>
        {teas.map(tea => {
          return (
            <div key={tea.id}>
              <h3>
                <Link to={`/teas/${tea.id}`}>{tea.name}</Link>
              </h3>
              <p>{tea.description}</p>
              <p>Price: ${findPrice(tea.price).toFixed(2)}</p>
              <Link to={`/teas/${tea.id}`}>
                <img src={tea.imageUrl} width={200} height={200} mode="fit" />
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    teas: state.teas.allTeas
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllTeas: () => dispatch(fetchTeas())
  }
}

const allTeaContainer = connect(mapStateToProps, mapDispatchToProps)(AllTea)

export default allTeaContainer
