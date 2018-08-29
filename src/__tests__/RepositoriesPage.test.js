import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import RepositoriesPage from '../components/RepositoriesPage'
import repositoriesMock from '../__mocks__/repositoriesMock'

describe('Test RepositoriesPage component', () => {
  let mountedComponent = null

  beforeAll(() => {
    mountedComponent = mount(
      <RepositoriesPage repositories={repositoriesMock} />
    )
  })

  it('Renders correctly', () => {
    expect(toJson(mountedComponent)).toMatchSnapshot()
  })

  it('Component should be defined', () => {
    expect(mountedComponent).toBeDefined()
  })

  it('Must have one repository', () => {
    expect(mountedComponent.find('Repository').exists()).toBe(true)
    expect(mountedComponent.find('Repository')).toHaveLength(1)
  })

  it('Must have a OrderBy Component', () => {
    expect(mountedComponent.find('OrderBy').exists()).toBe(true)
  })

  it('Must have a Search Component', () => {
    expect(mountedComponent.find('Search').exists()).toBe(true)
  })

  it('Must have an AddRepository Component', () => {
    expect(mountedComponent.find('AddRepository').exists()).toBe(true)
  })
})
