import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody, CardLink, Collapse } from 'reactstrap'
import { bind } from 'decko'

class AccordionItem extends Component {
  @bind
  toggle(event) {
    event.preventDefault()
    const { id, onToggle: handleToggle } = this.props
    handleToggle(id)
  }

  render() {
    const { id, title, children, isOpen, className = '' } = this.props
    return (
      <Card
        id={id}
        className={`accordion-item ${isOpen ? 'active' : ''} ${className}`}
        tag="section"
      >
        <CardHeader className="accordion-header">
          <h4 className="accordion-title">
            <CardLink
              href={`#${id}`}
              className="accordion-link"
              onClick={this.toggle}
            >
              {title}
            </CardLink>
          </h4>
        </CardHeader>
        <Collapse isOpen={isOpen}>
          <CardBody className="accordion-body">{children}</CardBody>
        </Collapse>
      </Card>
    )
  }
}
AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
}

AccordionItem.defaultProps = {
  isOpen: false,
  onToggle: () => {},
}

export default AccordionItem
