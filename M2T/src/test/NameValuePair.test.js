import React from "react"
import NameValuePair from "../components/NameValuePair"
import {shallow, mount} from "enzyme"
import {configure} from 'enzyme'
import adapter from 'enzyme-adapter-react-16'
import { Typography } from "@material-ui/core";

configure({adapter: new adapter()});
it("shows something", () =>{
    const comp = mount(<NameValuePair label="Hello" value="World!" />)
    expect(comp.html()).toContain("Hello")
});

it("shows children", () =>{
    const comp = mount(<NameValuePair label="Hello"  ><Typography >{"World!"}</Typography></NameValuePair>)
    expect(comp.html()).toContain("World!")
});

it("change size", () =>{
   
    global.window.innerWidth = 400
    const resizeEvent = document.createEvent('Event');
    resizeEvent.initEvent('resize', true, true);
    global.window.dispatchEvent(resizeEvent);
    const comp = mount(<NameValuePair label="Hello" xsLabel="xsLabel1" ><Typography >{"World!"}</Typography></NameValuePair>)
   const html = comp.html()
    expect(html).toContain("xsLabel1")
   expect(html.indexOf("xsLabel1")).toBeGreaterThan(0)
});

it("change size hide on xs", () =>{
   
    global.window.innerWidth = 400
    const resizeEvent = document.createEvent('Event');
    resizeEvent.initEvent('resize', true, true);
    global.window.dispatchEvent(resizeEvent);
    const comp = mount(<NameValuePair label="Hello" xsLabel="xsLabel1" hideOnSize="xs"><Typography >{"World!"}</Typography></NameValuePair>)
    const html = comp.html()
  
    expect(html).toBe(null)
   
});

it("change size hide size less then ms", () =>{
   
    global.window.innerWidth = 400
    const resizeEvent = document.createEvent('Event');
    resizeEvent.initEvent('resize', true, true);
    global.window.dispatchEvent(resizeEvent);
    const comp = mount(<NameValuePair label="Hello" xsLabel="xsLabel1" hideOnSize="sm"><Typography >{"World!"}</Typography></NameValuePair>)
    const html = comp.html()
  
    expect(html).toBe(null)
   
});


it("show md label when size is xs", () =>{
   
    global.window.innerWidth = 400
    const resizeEvent = document.createEvent('Event');
    resizeEvent.initEvent('resize', true, true);
    global.window.dispatchEvent(resizeEvent);
    const comp = mount(<NameValuePair label="Hello" mdLabel="mdLabel1" ><Typography >{"World!"}</Typography></NameValuePair>)
   const html = comp.html()
    expect(html).toContain("mdLabel")
   expect(html.indexOf("mdLabel1")).toBeGreaterThan(0)
});

it("show md label when size is md", () =>{
   
    global.window.innerWidth = 700
    const resizeEvent = document.createEvent('Event');
    resizeEvent.initEvent('resize', true, true);
    global.window.dispatchEvent(resizeEvent);
    const comp = mount(<NameValuePair label="Hello" mdLabel="mdLabel1" ><Typography >{"World!"}</Typography></NameValuePair>)
   const html = comp.html()
    expect(html).toContain("mdLabel")
   expect(html.indexOf("mdLabel1")).toBeGreaterThan(0)
});

it("show generic label when size is lg and md is set", () =>{
   
    global.window.innerWidth = 1300
    const resizeEvent = document.createEvent('Event');
    resizeEvent.initEvent('resize', true, true);
    global.window.dispatchEvent(resizeEvent);
    const comp = mount(<NameValuePair label="Hello" mdLabel="mdLabel1" ><Typography >{"World!"}</Typography></NameValuePair>)
   const html = comp.html()
    expect(html).toContain("Hello")
   expect(html.indexOf("Hello")).toBeGreaterThan(0)
});

it("show children when are set without value", () =>{
   
    global.window.innerWidth = 400
    const resizeEvent = document.createEvent('Event');
    resizeEvent.initEvent('resize', true, true);
    global.window.dispatchEvent(resizeEvent);
    const comp = mount(<NameValuePair label="Hello" mdLabel="mdLabel1" ><Typography >{"World!"}</Typography></NameValuePair>)
   const html = comp.html()
    expect(html).toContain("World")
   expect(html.indexOf("World")).toBeGreaterThan(0)
});

it("show children when are set with value", () =>{
   
    global.window.innerWidth = 400
    const resizeEvent = document.createEvent('Event');
    resizeEvent.initEvent('resize', true, true);
    global.window.dispatchEvent(resizeEvent);
    const comp = mount(<NameValuePair label="Hello" mdLabel="mdLabel1" value={"Mondo"} ><Typography >{"World!"}</Typography></NameValuePair>)
   const html = comp.html()
    expect(html).toContain("World")
   expect(html.indexOf("World")).toBeGreaterThan(0)
});

it("show value when are set without children", () =>{
   
    global.window.innerWidth = 400
    const resizeEvent = document.createEvent('Event');
    resizeEvent.initEvent('resize', true, true);
    global.window.dispatchEvent(resizeEvent);
    const comp = mount(<NameValuePair label="test without children" mdLabel="mdLabel1" value={"Mondo"} />)
   const html = comp.html()
    expect(html).toContain("Mondo")
   expect(html.indexOf("Mondo")).toBeGreaterThan(0)
});