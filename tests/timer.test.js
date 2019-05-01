import React from 'react'
import Timer from '../components/Timer.js'
import { JestEnvironment } from '@jest/environment'
import { JestFakeTimers } from '@jest/fake-timers'

describe('<Timer />', function () {
    beforeEach(function () {
        jest.useFakeTimers()
    })

    it('first test', function() {
        const wrapper = shallow(<Timer time={86400}/>)
        expect(wrapper).toMatchSnapshot()
    })

    describe('format function', function () {
        it('formats 1 day of time', function() {
            const wrapper = shallow(<Timer />)
            const initialSeconds = 86400
            const actual = "Weeks: 0 - Days: 1 - Hours: 0 - Minutes: 0 - Seconds: 0"
            const expected = wrapper.instance().formatTimer(initialSeconds)
            expect(expected).toEqual(actual)
        })
        it('formats 1 day and 1 hour of time', function() {
            const wrapper = shallow(<Timer />)
            const initialSeconds = 90000
            const actual = "Weeks: 0 - Days: 1 - Hours: 1 - Minutes: 0 - Seconds: 0"
            const expected = wrapper.instance().formatTimer(initialSeconds)
            expect(expected).toEqual(actual)
        })
        it('returns empty timer if initial seconds are negative', function() {
            const wrapper = shallow(<Timer />)
            const initialSeconds = -90000
            const actual = "Weeks: 0 - Days: 0 - Hours: 0 - Minutes: 0 - Seconds: 0"
            const expected = wrapper.instance().formatTimer(initialSeconds)
            expect(expected).toEqual(actual)
        })
    })

    describe('timer function', function () {
        it('expects setInterval to have been called', function () {
            const wrapper = shallow(<Timer />)
            expect(setInterval).toHaveBeenCalledTimes(1)
        })
        it('expects setInterval to have been called with format function and 1000ms', function () {
            const wrapper = shallow(<Timer />)
            wrapper.instance().timer(10000)
            expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000, expect.any(Object))
        })
        it('should match snapshot after Timer set to a day and wait 10 seconds', function () {
            const wrapper = shallow(<Timer time={86400}/>)
            jest.advanceTimersByTime(10000)
            expect(wrapper).toMatchSnapshot()
        })
        it('should match snapshot after Timer finishes', function () {
            const wrapper = shallow(<Timer time={5}/>)
            jest.advanceTimersByTime(10000)
            expect(wrapper).toMatchSnapshot()
        })
    })

    describe('componentDidUpdate function', function() {
        it('updates the component when set new props', function() {
            const wrapper = shallow(<Timer time={3600}/>)
            jest.advanceTimersByTime(5000)
            expect(wrapper).toMatchSnapshot()
            wrapper.setProps({ time: 1800 })
            jest.advanceTimersByTime(5000)
            expect(wrapper).toMatchSnapshot()
        })
    })
})