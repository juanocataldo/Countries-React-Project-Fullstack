import React from "react" 
import { configure, shallow } from "enzyme"; 
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"; 
import { MemoryRouter } from "react-router-dom"
import configureStore from "redux-mock-store" 
import { Provider } from "react-redux";
import Home2 from "../components/Home2.jsx" 
import Landing from "../components/Landing.jsx";

configure({ adapter: new Adapter () });
describe("Home", () => { 
  let store; 
  const middlewares = []; 
  const mockStore = configureStore (middlewares);

  beforeEach(() => {
    store = mockStore([]);
  });

  describe("El componente Landing debe renderizar en la ruta /.", () => { 
    it('Debería renderizarse en la ruta "/"' , () => {
    const wrapper = shallow(
    <Provider store={store}>
    <MemoryRouter initialEntries={["/"]}>
    <Landing />
    </MemoryRouter>
    </Provider>
    );
  expect(wrapper.find(Landing)).toHaveLength(1);
  })
})
})