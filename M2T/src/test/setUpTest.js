import {configure} from 'enzyme'
import adapter from 'enzyme-adapter-react-16'
import {shallow } from "enzyme"
import { isMainThread } from 'worker_threads';

configure({adapter: new adapter()});