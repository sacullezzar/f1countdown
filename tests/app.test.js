import React from 'react'
import App from '../containers/App.js'

describe('<App />', function () {
    it('should match snapshot', function () {
        const wrapper = shallow(<App />)
        expect(wrapper).toMatchSnapshot()
    })

    it('mocks an event where the final key is enter, should change timer time prop', function () {
        const mockEvent = {
            key: 'Enter',
            target: {
                value: '10000'
            }
        }
        const wrapper = shallow(<App />)
        wrapper.instance().handleChange(mockEvent)
        expect(wrapper).toMatchSnapshot()
    })

    it('mocks an event where the final key is NOT enter, should change timer time prop', function () {
        const mockEvent = {
            key: 'a',
            target: {
                value: '10000'
            }
        }
        const wrapper = shallow(<App />)
        wrapper.instance().handleChange(mockEvent)
        expect(wrapper).toMatchSnapshot()
    })
})