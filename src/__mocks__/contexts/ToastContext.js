import PropTypes from 'prop-types'

export default {
  Provider,
  Consumer,
}

function Provider(props) {
  return props.children
}

Provider.propTypes = {
  children: PropTypes.element,
}

function Consumer(props) {
  return props.children
}

Consumer.propTypes = {
  children: PropTypes.element,
}

