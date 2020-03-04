import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import { bind } from 'decko'

class AlphabetFilter extends Component {
  static alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  @bind
  handleClick(event) {
    event.preventDefault()
    const { onChange } = this.props
    onChange(event.target.value)
  }

  render() {
    const { value: activeLetter, alphabet, tag: Tag = 'div' } = this.props
    const letters = !Array.isArray(alphabet) ? alphabet.split('') : alphabet

    return (
      <Tag className="alphabet-filter">
        <Button
          className="alphabet-filter-button alphabet-filter-button-all"
          color="primary"
          outline
          value=""
          active={!activeLetter}
          onClick={this.handleClick}
        >
          ALL
        </Button>
        <div className="alphabet-filter-letters">
          {letters.map(letter => (
            <Button
              className="alphabet-filter-button"
              color="primary"
              outline
              value={letter}
              active={letter === activeLetter}
              onClick={this.handleClick}
            >
              {letter}
            </Button>
          ))}
        </div>
      </Tag>
    )
  }
}

AlphabetFilter.defaultProps.alphabet = AlphabetFilter.alphabet
AlphabetFilter.propTypes = {
  alphabet: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  value: PropTypes.string,
  onChange: PropTypes.func,
}
AlphabetFilter.defaultProps = {
  value: '',
  onChange: () => {},
}
export default AlphabetFilter
