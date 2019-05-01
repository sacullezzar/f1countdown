import React from 'react'
import App from '../containers/App.js'
import testData from './testData/raceData'
import sinon from 'sinon'

describe('<App />', function () {
    it('should match snapshot', function () {
        const wrapper = shallow(<App />)
        expect(wrapper).toMatchSnapshot()
    })

    it('tests component did mount with mocked data', async (done) => {
        const wrapper = shallow(<App />)
        const mockSuccessResponse = testData;
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        await wrapper.instance().componentDidMount()
        expect(wrapper.state()).toEqual({isLoading: false, number: 0, raceData: testData})
        wrapper.update()
        expect(wrapper).toMatchSnapshot()
        global.fetch.mockClear()
        done()
    })

    it('tests method handleTimeChange', () => {
        const mockedDate = new Date(2019, 3, 30)
        global.Date = jest.fn(() => mockedDate)
        const wrapper = shallow(<App />)
        wrapper.instance().handleTimeChange()
        expect(wrapper).toMatchSnapshot()    
    })
})
