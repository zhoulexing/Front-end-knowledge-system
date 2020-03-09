import { expect } from "chai";
import ES2020 from "@/routes/ES2020";
import { shallow, mount } from "enzyme";
import renderer from 'react-test-renderer'



describe("test ES2020 新特性", () => {
    const sWrapper = shallow(<ES2020 />);
    const mWrapper = mount(<ES2020 />);
    console.log(sWrapper, mWrapper);

    it("test chain", () => {
        const obj = {};
        expect(obj?.a?.b).equal(undefined);        
    });

    // Snapshot
    it('Snapshot', () => {
        const tree = renderer.create(<ES2020 />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});