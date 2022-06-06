
import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {

        const component = create(<ProfileStatus userStatus="SUBSCRIBE" />);
        const instance = component.getInstance();
        expect(instance.state.userStatus).toBe("SUBSCRIBE");
    });
    test("span should be displayed at doubleClick", () => {
        const component = create(<ProfileStatus />);
        const root = component.root;
        const span = root.findByType("span");
        expect(span.length).not.toBeNull();
    });
    test("after creation <input> shouldn't be displayed", () => {
        const component = create(<ProfileStatus userStatus="it-kamasutra.com" />);
        const root = component.root;
        expect(() => {
            let input = root.toBeNull("input");
        }).toThrow();
    });
});