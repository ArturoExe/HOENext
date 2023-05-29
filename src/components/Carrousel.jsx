import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimate, stagger } from "framer-motion";

const Carrousel = () => {
  const [width, setWidth] = useState(0);

  const ref = useRef();

  useEffect(() => {
    setWidth(ref.current.scrollWidth - ref.current.offsetWidth);
  }, []);

  return (
    <motion.div className="carousel" ref={ref}>
      <motion.div
        className="carousel-inner"
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        whileTap="grabbing"
      >
        <motion.div className="carousel-item">
          <img src="https://www.southernliving.com/thmb/bzfXhpyxOhvJZADlNkm9-U4oEhE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/casual-lob-dfb51dd5936941b98f3105c83b79f1df.jpg" />
          <h3>Titulo</h3>
          <p className="service-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet
            velit ultrices, cursus odio vitae, tincidunt lorem. Aliquam vel
            justo suscipit nibh accumsan malesuada.
          </p>
          <p>Price</p>
        </motion.div>
        <motion.div className="carousel-item">
          <img src="https://www.southernliving.com/thmb/bzfXhpyxOhvJZADlNkm9-U4oEhE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/casual-lob-dfb51dd5936941b98f3105c83b79f1df.jpg" />
          <h3>Titulo</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet
            velit ultrices, cursus odio vitae, tincidunt lorem. Aliquam vel
            justo suscipit nibh accumsan malesuada.
          </p>
          <p>Price</p>
        </motion.div>

        <motion.div className="carousel-item">
          <img src="https://www.southernliving.com/thmb/bzfXhpyxOhvJZADlNkm9-U4oEhE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/casual-lob-dfb51dd5936941b98f3105c83b79f1df.jpg" />

          <h3>Titulo</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet
            velit ultrices, cursus odio vitae, tincidunt lorem. Aliquam vel
            justo suscipit nibh accumsan malesuada.
          </p>
          <p>Price</p>
        </motion.div>

        <motion.div className="carousel-item">
          <img src="https://www.southernliving.com/thmb/bzfXhpyxOhvJZADlNkm9-U4oEhE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/casual-lob-dfb51dd5936941b98f3105c83b79f1df.jpg" />
          <h3>Titulo</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet
            velit ultrices, cursus odio vitae, tincidunt lorem. Aliquam vel
            justo suscipit nibh accumsan malesuada.
          </p>
          <p>Price</p>
        </motion.div>
        <motion.div className="carousel-item">
          <img src="https://www.southernliving.com/thmb/bzfXhpyxOhvJZADlNkm9-U4oEhE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/casual-lob-dfb51dd5936941b98f3105c83b79f1df.jpg" />

          <h3>Titulo</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet
            velit ultrices, cursus odio vitae, tincidunt lorem. Aliquam vel
            justo suscipit nibh accumsan malesuada.
          </p>
          <p>Price</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Carrousel;
