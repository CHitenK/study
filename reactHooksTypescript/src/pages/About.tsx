import React from "react";
import { useHistory } from "react-router-dom";

const About = () => {
  const history = useHistory();
  return (
    <div>
      <h1>About</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam totam
        distinctio molestiae quas est illo ullam non iste pariatur nihil.
      </p>
      <button className="btn" onClick={() => history.push("/")}>
        Go back to tasks!!!
      </button>
    </div>
  );
};

export default About;
