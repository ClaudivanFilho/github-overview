import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import OrderBy from '../components/OrderBy'

describe('Test OrderBy component', () => {
  let mountedComponent = null

  beforeAll(() => {
    mountedComponent = mount(
      <OrderBy />
    )
  })

  it('Renders correctly', () => {
    expect(toJson(mountedComponent)).toMatchSnapshot()
  })

  it('Component should be defined', () => {
    expect(mountedComponent).toBeDefined()
  })

  it('Must find a select component', () => {
    expect(mountedComponent.find('select').exists()).toBe(true)
  })

  it('Must find six options', () => {
    expect(mountedComponent.find('option')).toHaveLength(6)
  })
})
