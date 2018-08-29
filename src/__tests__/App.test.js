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
    expect(toJson(mountedComponent)).toMatchSnapshot()
  })

  it('Component should be defined', () => {
    expect(mountedComponent).toBeDefined()
  })

  it('Must find a Link component', () => {
    expect(mountedComponent.find('Link').exists()).toBe(true)
  })

  it('Must find the ToastContainer component', () => {
    expect(mountedComponent.find('ToastContainer').exists()).toBe(true)
  })

  it('Must find a ToastContainer component', () => {
    expect(mountedComponent.find('ToastContainer').exists()).toBe(true)
  })

  it('Must find a HomePage component', () => {
    expect(mountedComponent.find('HomePage').exists()).toBe(true)
  })

  it('Must find a RepositoriesPage component', () => {
    expect(mountedComponent.find('RepositoriesPage').exists()).toBe(true)
  })

  it('Must have two Routes', () => {
    expect(mountedComponent.find('Route')).toHaveLength(2)
  })
})
