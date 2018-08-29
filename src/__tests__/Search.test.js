import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import Search from '../components/Search'

describe('Test Search component', () => {
  let mountedComponent = null

  beforeAll(() => {
    mountedComponent = mount(
      <Search />
    )
  })

  it('Renders correctly', () => {
    expect(toJson(mountedComponent)).toMatchSnapshot()
  })

  it('Component should be defined', () => {
    expect(mountedComponent).toBeDefined()
  })

  it('Must find an input component', () => {
    expect(mountedComponent.find('input').exists()).toBe(true)
  })

  it('Must find the search icon', () => {
    expect(mountedComponent.find('img').exists()).toBe(true)
  })
})
