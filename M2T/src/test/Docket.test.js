import React from "react"
import {shallow, mount} from "enzyme"
import Docket from "../components/Docket"
import adapter from "enzyme-adapter-react-16"


configure({adapter: new adapter()})
const docket =  {
                    docketId: "1qwert1235456",
                    code: "ABY",
                    fullName: "Dekay Pty Ltd, Kim Cropper",
                    phone: "02 9679 0400",
                    address: "1/30 Park Road Mulgrave NSW 2156",
                    gate: "*12245#",
                    lock: "12456",
                    toll: true,
                    keys: true,
                    boxes: {
                                panels: 40,
                                frames: 23,
                                hardware: 4,
                                blinds: 1,
                                total: 68,
                                sizes:{
                                   s:0,
                                   m:0,
                                   l:10,
                                   xl:30,
                                   xxl:0,
                                },
                            },
                    jobs:   [
                                    {
                                        jobId: "qqqejjjj2",
                                        jobRef: "AU1393834-99",
                                        code: "ABY",
                                        clientName: "SO087188-NSW-PETERS, Maria #2-PO028653",
                                        boxes: {
                                            panels: 30,
                                            frames: 15,
                                            hardware: 3,
                                            blinds: 1,
                                            total: 49,
                                            formattedSize: XL,
                                            size: 140.3

                                        }
                                    },
                                    {
                                        jobId: "nnnnn12nnn",
                                        code: "ABY",
                                        clientName: "GEORGE",
                                        boxes: {
                                            panels: 10,
                                            frames: 8,
                                            hardware: 1,
                                            blinds: 0,
                                            total: 19,
                                            formattedSize: L,
                                            size: 121.2

                                        }
                                    },
                                    
                                ]
                    }

it("Show bear minimum", () => {
    const comp = mount(<Docket variant="bearMinimum"  docket={docket} />)
    const html = comp.html()
    expect = expect(html)
    expect.toContain("ABY")
    expect.toContain("68")
    expect.toContain("2 jobs")
    expect(expect.toContain("Park Road")).toBe(false)
    expect(expect.toContain("1qwert1235456")).toBe(false)
    expect(expect.toContain("Dekay Pty Ltd")).toBe(false)
    expect(expect.toContain("23")).toBe(false)
    expect(expect.toContain("1")).toBe(false)
})

it("Show jobCentric", () => {
    const comp = mount(<Docket variant="jobCentric"  docket={docket} />)
    const html = comp.html()
    expect = expect(html)
    expect.toContain("ABY")
    expect.toContain("68")
    expect.toContain("2 jobs")
    expect(expect.toContain("Park Road")).toBe(false)
    expect(expect.toContain("1qwert1235456")).toBe(false)
    expect(expect.toContain("Dekay Pty Ltd")).toBe(false)
    expect(expect.toContain("23")).toBe(true)
    expect(expect.toContain("1")).toBe(true)
})

it("Show deliveryCentric", () => {
    const comp = mount(<Docket variant="deliveryCentric"  docket={docket} />)
    const html = comp.html()
    expect = expect(html)
    expect.toContain("ABY")
    expect.toContain("68")
    expect.toContain("2 jobs")
    expect(expect.toContain("Park Road")).toBe(true)
    expect(expect.toContain("1qwert1235456")).toBe(true)
    expect(expect.toContain("Dekay Pty Ltd")).toBe(true)
    expect(expect.toContain("23")).toBe(true)
    expect(expect.toContain("1")).toBe(true)
})

it("without passing the docket", () => {
    const comp = mount(<Docket variant="bearMinimum"   />)
    const html = comp.html()
    expect = expect(html).toBe(null)
})