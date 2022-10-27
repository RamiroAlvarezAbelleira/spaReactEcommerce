import { Footer } from "../Footer";
import { Header } from "../Header";


const EmptyWrapper = (props) => {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <Header />
        <div className="container-fluid">
          {props.children}
        </div>
        <Footer />
      </div>
    </div>
  );
};
export default EmptyWrapper;