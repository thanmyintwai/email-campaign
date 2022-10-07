import React, { Component } from 'react'
import { connect } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../actions'

//amount is in USD cents - 500 = $5
//token is a callback - represending the chage - get back from Stripe

class Payments extends Component {
  render() {
    return (
        <StripeCheckout
          name="Emaily"
          description="$5 for 5 email credits"
          amount={500}
          token={token => this.props.handleToken(token)}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button className="btn">
            Add Credits
          </button>
        </StripeCheckout>
      );
  }
}


export default connect(null, actions)(Payments)