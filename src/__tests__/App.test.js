import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import App from '../components/App'

jest.mock('../api')

describe('Test App component', () => {
  let mountedComponent = null

  beforeAll(() => {
    mountedComponent = mount(
      <App />
    )
  })

  it('Renders correctly', () => {
    const wrapper = mount(<App />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('App should be defined', () => {
    expect(mountedComponent).toBeDefined()
  })

  it('Must find a Link component', () => {
    expect(mountedComponent.find('Link').exists()).toBe(true)
  })
})
