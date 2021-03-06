import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  SingleTea,
  allOrders,
  singleOrder,
  userProfile,
  AdminAllTeas,
  AdminPage,
  AdminAddTea,
  AdminEditTea,
  AdminAllUsers,
  AdminEditUser,
  AdminAllOrders,
  LandingPage
} from './components'
import allTeaContainer from './components/allTeas'
import {me} from './store'
import cartContainer from './components/cart'
import checkoutPageContainer from './components/checkout-page'
import ConfirmationContainer from './components/Confirmation'
import shippingAddressForm from './components/shippingAddressForm'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    console.log(this.props)
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/teas" component={allTeaContainer} />
        <Route exact path="/cart/" component={cartContainer} />
        <Route path="/teas/:teaId" component={SingleTea} />
        <Route path="/checkout" component={checkoutPageContainer} />
        <Route path="/confirmation" component={ConfirmationContainer} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/orders/:userId/:orderId" component={singleOrder} />
            <Route exact path="/orders" component={allOrders} />
            <Route path="/profile" component={userProfile} />
            {isAdmin && (
              <Switch>
                <Route exact path="/admin" component={AdminPage} />
                <Route exact path="/admin/teas" component={AdminAllTeas} />
                <Route exact path="/admin/addTea" component={AdminAddTea} />
                <Route path="/admin/editTea/:teaId" component={AdminEditTea} />

                <Route exact path="/admin/users" component={AdminAllUsers} />
                <Route
                  path="/admin/editUser/:userId"
                  component={AdminEditUser}
                />

                <Route exact path="/admin/orders" component={AdminAllOrders} />
              </Switch>
            )}
          </Switch>
        )}

        {/* Displays our Login component as a fallback */}
        <Route component={LandingPage} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
