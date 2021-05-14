import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const getInline = (today, before, isAssigned) => ({
  cursor: before || isAssigned ? 'not-allowed' : 'inherit',
  background: isAssigned ? '#e99d86' : today
  ? 'rgba(141, 224, 229, 0.5)'
  : before ? 'rgba(155, 155, 155, .2)' : 'inherit',
})

const DefaultDayComponent = props => {
  const { label, date, isToday, isInThePast, isCurrentChannelSelected, isSelected, isAssigned } = props
  const disableDate = date.moment.isBefore(moment(), 'day')
  const onClick = (e) => {
    if (isAssigned || disableDate || (!isCurrentChannelSelected && isSelected)) {
      e.stopPropagation()
    }
  }

  return (
    <div onClick={onClick}
      className={getStyle(props)}
      style={getInline(isToday, isInThePast, isAssigned)}
      disabled={isInThePast || isAssigned}>
      {label}
    </div>)
}

DefaultDayComponent.propTypes = {
  label: PropTypes.number,
  date: PropTypes.object,
  isToday: PropTypes.bool,
  isInThePast: PropTypes.bool,
}

export const getStyle = function ({date, isSelected, isCurrentChannelSelected, isAssigned}) {
  return `${isAssigned ? 'date-assigned' : isCurrentChannelSelected 
    ? 'o_selected-current-channel-day' : isSelected ? 'o_selected-day' : ''} ${date.type}-day`
}

export default DefaultDayComponent
