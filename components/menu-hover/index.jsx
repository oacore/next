import React from 'react'
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Nav,
} from 'reactstrap'
import { bind } from 'decko'

class MenuHover extends React.Component {
  state = {
    isOpen: false,
  }

  @bind
  onMouseEnter() {
    this.setState({ isOpen: true })
  }

  @bind
  onMouseLeave() {
    this.setState({ isOpen: false })
  }

  @bind
  toggle(event) {
    event.preventDefault()

    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }))
  }

  render() {
    const { isOpen } = this.state

    return (
      <Nav className="ml-auto d-none d-md-block" navbar>
        <UncontrolledDropdown
          inNavbar
          nav
          className="menu-hover"
          onMouseOver={this.onMouseEnter}
          onFocus={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          isOpen={isOpen}
          toggle={this.toggle}
        >
          <a className="p-1" href="/home" nav>
            MenuHover
          </a>
          {/* <DropdownToggle nav /> */}

          <DropdownMenu right>
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem disabled>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Another Action</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    )
  }
}

export default MenuHover
