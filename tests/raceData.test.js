import React from 'react'
import RaceData from '../components/raceData'
import raceDataProp from './testData/raceData'
import App from '../containers/App'

describe('<raceData />', function () {
    it('first test', function() {
        const wrapper = shallow(<RaceData raceData={raceDataProp}/>)
        expect(wrapper).toMatchSnapshot()
    })

    it('expects the props function to have been called on select change', function() {
        const mockFn = jest.fn()
        const wrapper = shallow(<RaceData raceData={raceDataProp} handleTimeChange={mockFn}/>)
        wrapper.find('select').simulate('change', {target : { value : 'foo'}});
        expect(mockFn).toHaveBeenCalledTimes(1)
    })
})