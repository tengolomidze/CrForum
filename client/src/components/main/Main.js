import Header from "../Header";
import MainBody from "./MainBody";

const Main = (props) => {
    return (
      <div>
        <Header app={props.app}/>
        <MainBody app={props.app}/>
      </div>
    );
  }
  
  export default Main;
  