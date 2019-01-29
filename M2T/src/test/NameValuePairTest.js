import React from "react"
import NameValuePair from "../components/NameValuePair"
import {shallow} from "enzyme"

it("shows something", () =>{
    const comp = shallow(<NameValuePair label="Hello" value="World!" />)
    const text = comp.text()
    console.log(text)
    expect(text.indexOf("World!") > 0)

});