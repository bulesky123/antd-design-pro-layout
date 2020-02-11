
import React from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'
import styles from './index.less'

const IconSvg = ({ name = '', className = '', onClick = () => {} }) => {
  const clsName = className ? cls(styles['icon-svg'], className) : styles['icon-svg']
  return (
    <svg className={clsName} aria-hidden="true" onClick={onClick}>
      <use xlinkHref={name} />
    </svg>
  )
}

IconSvg.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
}
IconSvg.defaultProps = {
  name: '',
  className: '',
  onClick: null,
}

export default IconSvg
