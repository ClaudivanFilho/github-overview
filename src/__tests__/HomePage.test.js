import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import HomePage from '../components/HomePage'
import repositoriesMock from '../__mocks__/repositoriesMock'

describe('Test HomePage component', () => {
  let mountedComponent = null

  beforeAll(() => {
    mountedComponent = mount(
      <HomePage repositories={repositoriesMock} />
    )
  })

  it('Renders correctly', () => {
    expect(toJson(mountedComponent)).toMatchSnapshot()
  })

  it('Component should be defined', () => {
    expect(mountedComponent).toBeDefined()
  })
})
