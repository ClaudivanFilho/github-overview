import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import RemoveRepository from '../components/RemoveRepository'

describe('Test RemoveRepository component', () => {
  let mountedComponent = null

  beforeAll(() => {
    mountedComponent = mount(
      <RemoveRepository />
    )
  })

  it('Renders correctly', () => {
    expect(toJson(mountedComponent)).toMatchSnapshot()
  })

  it('Component should be defined', () => {
    expect(mountedComponent).toBeDefined()
  })

  it('Must find the remove icon', () => {
    expect(mountedComponent.find('img').exists()).toBe(true)
  })
})
