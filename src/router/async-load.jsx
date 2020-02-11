import React from 'react'
// import { history } from 'utils'

const defaultRoute = {
  acquisition: true,
  back: true,
  needLogin: false,
}

export default (loadCompoent, loading, config) => class AsyncComponet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
      C: null,
    }
    this.unmount = false
    this.config = Object.assign({}, defaultRoute, config)
  }

  async componentDidMount() {
    try {
      const { default: C } = await loadCompoent()
      if (this.unmount) return
      this.setState({ C, isReady: true })      // eslint-disable-line
    } catch (e) {
      console.log(e)
    }
  }

  componentWillUnmount() {
    this.unmount = true
  }

  render() {
    const { C, isReady } = this.state
    return (isReady && C) ? <C {...this.props} /> : loading
  }
}
