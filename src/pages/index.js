import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Carrousel from "../components/Carrousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import FloatingForm from "../components/Form";
import { useContext } from "react";
import { StateContext } from "@/contexts/stateContext";

const Home = () => {
  const { state } = useContext(StateContext);
  return (
    <div>
      {!state ? <></> : <FloatingForm />}

      <div className="hero-section">
        <Navbar />
        <Hero />
      </div>

      <div className="servicios-section">
        <h3 className="servicios-title">Nuestros Servicios</h3>
        <Carrousel />
      </div>

      <div className="about-us-section">
        <img
          alt="hairsalon"
          src="https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?cs=srgb&dl=pexels-delbeautybox-853427.jpg&fm=jpg"
        />
        <div className="about-us-content">
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </h2>

          <h3>Ubicacion</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>

          <motion.button
            className="primary-button"
            whileHover={{ scale: 1.1 }}
            onClick={() =>
              (window.location.href =
                "https://www.google.com/maps/uv?pb=!1s0x80d94960f080141b%3A0x7aa4e26a3c430cb8!3m1!7e115!4s%2Fmaps%2Fplace%2Fhouse%2Bof%2Belegance%2F%4032.5199549%2C-117.0280632%2C3a%2C75y%2C149.49h%2C90t%2Fdata%3D*213m4*211e1*213m2*211s2_MFESC5wLWwFTpXTQCtGg*212e0*214m2*213m1*211s0x80d94960f080141b%3A0x7aa4e26a3c430cb8%3Fsa%3DX!5shouse%20of%20elegance%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e2!2s2_MFESC5wLWwFTpXTQCtGg&hl=en&sa=X&ved=2ahUKEwjK_tKY1I__AhWtOUQIHaM3ALkQpx96BAhUEA0")
            }
          >
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{ color: "#434343", paddingInline: "8px" }}
            />
            Google Maps
          </motion.button>
        </div>

        <footer>
          <div className="footer-left">
            <h3>House Of Elegance</h3>
            <p>Copyright House of Elegance Inc.</p>
          </div>
          <div className="footer-right">
            <ul>
              <h4>Contactanos</h4>
              <li>Opcion 1</li>
              <li>Opcion 2</li>
              <li>Opcion 3</li>
            </ul>

            <ul>
              <h4>Otro</h4>
              <li>Opcion 1</li>
              <li>Opcion 2</li>
              <li>Opcion 3</li>
            </ul>

            <ul>
              <h4>Redes Sociales</h4>
              <li>Opcion 1</li>
              <li>Opcion 2</li>
              <li>Opcion 3</li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
