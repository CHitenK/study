import React from 'react'

class If extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      kl: true
    }
  }
  render() {
    return (
      <div>
        {
          this.state.kl &&
           <p>4555</p>
        }
      </div>
    )
  }
}

export default If