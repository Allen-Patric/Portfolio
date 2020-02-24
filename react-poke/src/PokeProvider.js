// import React from "react";
// import axios from "axios";
// const { Provider, Consumer } = React.createContext();

// class TodoProvider extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       // title: "",
//       // description: "",
//       // imgUrl: "",
//       pokes: [],
//       sprites: []
//     };
//   }

//   getPoke = () => {
//     axios
//       .get(`https://pokeapi.co/api/v2/pokemon/${props.match.params.name}`)
//       .then(response => {
//         this.setState({ pokes: response.data });
//         console.log(response.data);
//       });
//   };

//   render() {
//     return (
//       <Provider
//         value={{
//           ...this.state,
//           getPoke: this.getPoke
//         }}>
//         {this.props.children}
//       </Provider>
//     );
//   }
// }

// export default TodoProvider;

// export function withPoke(Comp) {
//   return props => (
//     <Consumer>{value => <Comp {...props} {...value} />}</Consumer>
//   );
// }
