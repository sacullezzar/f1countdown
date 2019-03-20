import React from 'react'
import App from '../containers/App.js'

describe('<App />', function () {
    it('should match snapshot', function () {
        const wrapper = shallow(<App />)
        expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', function () {
        const wrapper = shallow(<App />)
        wrapper.instance().handleClick()
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.instance().handleClick()).toEqual(true)
    })
})