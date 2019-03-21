import React from 'react'
import App from '../containers/App.js'
import sinon from 'sinon'

describe('<App />', function () {
    it('should match snapshot', function () {
        const wrapper = shallow(<App />)
        expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', function () {
        const handleChangeSpy = sinon.spy(App.prototype, 'handleChange')
        const wrapper = shallow(<App handleChange={handleChangeSpy}/>)
        wrapper.simulate('change')
        expect(wrapper).toMatchSnapshot()
    })
})