import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import Repository from '../components/Repository'
import { RepositoryMock } from '../__mocks__/repositoriesMock'

describe('Test Repository component', () => {
  let mountedComponent = null

  beforeAll(() => {
    mountedComponent = mount(
      <Repository repository={RepositoryMock} />
    )
  })

  it('Renders correctly', () => {
    expect(toJson(mountedComponent)).toMatchSnapshot()
  })

  it('Component should be defined', () => {
    expect(mountedComponent).toBeDefined()
  })

  it('Must find a link of repository component', () => {
    expect(mountedComponent.find('a[href="https://github.com/vtex-apps/minicart"]')
      .exists()).toBe(true)
  })

  it('Must find a RemoveRepository component', () => {
    expect(mountedComponent.find('RemoveRepository').exists()).toBe(true)
  })
})
